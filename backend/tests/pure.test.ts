import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { AppError } from "../src/utils/AppError";
import { convertToPinyin } from "../src/utils/pinyin";
import { TtlCache } from "../src/utils/ttlCache";
import { parseJsonLoose } from "../src/services/ai/json";
import { classifyInput } from "../src/services/learning/classifyInput";
import { composeNotes } from "../src/services/learning/composeNotes";
import { CandidateWord, findUsedWords, validateGeneratedSentence } from "../src/services/learning/sentenceRules";
import { aiExamplesOnlySchema, aiWordSchema } from "../src/services/learning/wordLookup.prompts";
import { WordRow, selectWords } from "../src/services/learning/wordSelection";
import { generateSentencesSchema } from "../src/validators/ai.validator";
import { userRateLimit } from "../src/middlewares/rateLimit";

const now = new Date("2026-10-19T00:00:00Z");
const row = (id: string, hanzi: string, over: Partial<WordRow> = {}): WordRow => ({
  vocabularyId: id, hanzi, pinyin: "", meaning: "m", level: null, tags: [], status: "learning", incorrectCount: 0, nextReviewAt: null, createdAt: now, ...over,
});

describe("classifyInput", () => {
  it("nhận diện từ / cụm từ / câu / không phải tiếng Trung", () => {
    assert.equal(classifyInput("休息").kind, "word");
    assert.equal(classifyInput("  休息 ").normalized, "休息");
    assert.equal(classifyInput("一石二鸟").kind, "word");
    assert.equal(classifyInput("实事求是的精神").kind, "phrase");
    assert.equal(classifyInput("你好，我是小明").kind, "sentence");
    assert.equal(classifyInput("我喜欢吃苹果因为很好吃啊").kind, "sentence");
    assert.equal(classifyInput("一 二").kind, "sentence");
    assert.equal(classifyInput("hello").kind, "not_chinese");
  });
});

describe("kiểm tra câu do AI sinh", () => {
  const cands: CandidateWord[] = [
    { vocabularyId: "a", hanzi: "休息", role: "target" },
    { vocabularyId: "b", hanzi: "今天", role: "known" },
  ];

  it("chỉ tính từ thực sự xuất hiện trong câu, bỏ qua lời AI tự khai", () => {
    const used = findUsedWords("今天我想休息。", cands);
    assert.deepEqual(used.map((u) => u.vocabularyId).sort(), ["a", "b"]);
    assert.deepEqual(findUsedWords("我想睡觉。", cands), []);
  });

  it("nhận câu hợp lệ, loại câu thiếu từ mục tiêu / thiếu dịch / trùng / quá ngắn", () => {
    const seen = new Set<string>();
    assert.equal(validateGeneratedSentence({ hanzi: "今天我想休息。", meaning: "Hôm nay tôi muốn nghỉ." }, cands, seen).ok, true);
    assert.deepEqual(validateGeneratedSentence({ hanzi: "今天天气很好。", meaning: "x" }, cands, seen), { ok: false, reason: "no_target_word" }); // chỉ có từ "known"
    assert.deepEqual(validateGeneratedSentence({ hanzi: "我想休息一下。", meaning: "  " }, cands, seen), { ok: false, reason: "no_translation" });
    assert.deepEqual(validateGeneratedSentence({ hanzi: "今天我想休息", meaning: "trùng, khác dấu câu" }, cands, seen), { ok: false, reason: "duplicate" });
    assert.deepEqual(validateGeneratedSentence({ hanzi: "休", meaning: "x" }, cands, seen), { ok: false, reason: "invalid" });
  });
});

describe("chọn từ theo chế độ", () => {
  const rows = [
    row("1", "休息", { status: "new" }),
    row("2", "学校", { tags: ["Trường học"], level: "HSK 1" }),
    row("3", "老师", { tags: ["Trường học"], level: "HSK 2", nextReviewAt: new Date("2026-10-01") }),
    row("4", "苹果", { level: "HSK 1" }),
    row("5", "工作", { incorrectCount: 3 }),
  ];
  const gen = (v: unknown) => generateSentencesSchema.parse(v);

  it("từ chưa có trong danh sách của user bị từ chối (không rò dữ liệu người khác)", () => {
    assert.throws(() => selectWords(rows, gen({ mode: "new_word", vocabularyId: "11111111-1111-4111-8111-111111111111" }), now), (e) => e instanceof AppError && e.statusCode === 404);
    assert.throws(() => selectWords(rows, gen({ mode: "selected_words", vocabularyIds: ["11111111-1111-4111-8111-111111111111"] }), now), (e) => e instanceof AppError && e.statusCode === 400);
  });

  it("vốn từ rỗng → lỗi rõ ràng", () => {
    assert.throws(() => selectWords([], gen({ mode: "review_mix" }), now), (e) => e instanceof AppError && e.statusCode === 400);
  });

  it("new_word: mục tiêu đúng 1 từ, từ bổ trợ không chứa chính nó", () => {
    const id = "00000000-0000-4000-8000-000000000001";
    const rs = [row(id, "休息", { status: "new" }), ...rows.slice(1)];
    const sel = selectWords(rs, gen({ mode: "new_word", vocabularyId: id }), now);
    assert.deepEqual(sel.targets.map((t) => t.vocabularyId), [id]);
    assert.ok(sel.helpers.length > 0 && sel.helpers.every((h) => h.vocabularyId !== id));
  });

  it("review_mix: có từ mới + từ đến hạn, tối đa 5 mục tiêu, không trùng", () => {
    const sel = selectWords(rows, gen({ mode: "review_mix" }), now);
    const ids = sel.targets.map((t) => t.vocabularyId);
    assert.ok(ids.includes("1") && ids.includes("3"));
    assert.ok(ids.length <= 5 && new Set(ids).size === ids.length);
  });

  it("topic: ưu tiên từ gắn thẻ chủ đề; không có thẻ thì cảnh báo", () => {
    const hit = selectWords(rows, gen({ mode: "topic", topic: "school" }), now);
    assert.ok(hit.targets.every((t) => t.tags.includes("Trường học")));
    const miss = selectWords(rows, gen({ mode: "topic", topic: "family" }), now);
    assert.ok(miss.warnings.length === 1);
  });

  it("level: chỉ lấy từ có cấp ≤ cấp chọn; thiếu dữ liệu cấp độ thì cảnh báo ước lượng", () => {
    const hit = selectWords(rows, gen({ mode: "level", level: "HSK 1" }), now);
    assert.ok(hit.targets.every((t) => t.level === "HSK 1"));
    const noLevel = selectWords(rows.map((r) => ({ ...r, level: null })), gen({ mode: "level", level: "HSK 3" }), now);
    assert.equal(noLevel.warnings.length, 1);
  });

  it("validator: thiếu tham số bắt buộc của chế độ bị từ chối; count tối đa 5", () => {
    assert.equal(generateSentencesSchema.safeParse({ mode: "topic" }).success, false);
    assert.equal(generateSentencesSchema.safeParse({ mode: "selected_words", vocabularyIds: [] }).success, false);
    assert.equal(generateSentencesSchema.safeParse({ mode: "review_mix", count: 6 }).success, false);
    assert.equal(generateSentencesSchema.parse({ mode: "review_mix" }).count, 3);
  });
});

describe("parse & schema dữ liệu AI", () => {
  it("parseJsonLoose xử lý code fence và lời dẫn, ném lỗi với JSON hỏng", () => {
    assert.deepEqual(parseJsonLoose('```json\n{"a":1}\n```'), { a: 1 });
    assert.deepEqual(parseJsonLoose('Đây là kết quả: {"a":1} xong'), { a: 1 });
    assert.throws(() => parseJsonLoose("không có json"));
    assert.throws(() => parseJsonLoose('{"a":'));
  });

  it("aiWordSchema: trường tuỳ chọn hỏng không làm hỏng cả phản hồi; thiếu nghĩa thì bị từ chối", () => {
    const ok = aiWordSchema.parse({
      pinyin: "xiūxi", meaning: "nghỉ ngơi", hskLevel: "HSK 9", partOfSpeech: 5, collocations: "sai kiểu",
      examples: [{ sentence: "我想休息。", meaning: "Tôi muốn nghỉ." }, { sentence: "x" }, "rác"],
    });
    assert.equal(ok.hskLevel, null);
    assert.equal(ok.partOfSpeech, null);
    assert.deepEqual(ok.collocations, []);
    assert.deepEqual(ok.examples.map((e) => e?.sentence ?? null), ["我想休息。", null, null]);
    assert.equal(aiWordSchema.safeParse({ pinyin: "x", examples: [] }).success, false);
    assert.equal(aiWordSchema.parse({ meaning: "m", hskLevel: 3, examples: [] }).hskLevel, 3);
    assert.equal(aiExamplesOnlySchema.safeParse({ examples: "sai" }).success, false);
  });

  it("composeNotes gom cách dùng / kết hợp từ / từ dễ nhầm", () => {
    const text = composeNotes({ usage: "Động từ không mang tân ngữ.", collocations: [{ phrase: "休息一下", meaning: "nghỉ một lát" }], synonyms: [{ word: "休憩", note: "văn viết" }] });
    assert.match(text ?? "", /Cách dùng: .*\nKết hợp thường gặp: 休息一下 \(nghỉ một lát\)\nTừ đồng nghĩa \/ dễ nhầm: 休憩 — văn viết/);
    assert.equal(composeNotes({ usage: null, collocations: [], synonyms: [] }), null);
  });
});

describe("pinyin theo ngữ cảnh (từ đa âm)", () => {
  it("银行 đọc là háng, không đọc từng ký tự độc lập", () => {
    assert.match(convertToPinyin("我去银行", "sentence").pinyin, /yín háng/);
    assert.match(convertToPinyin("银行", "word").pinyin, /yínháng/);
  });
});

describe("TtlCache", () => {
  it("hết hạn đúng hạn và giới hạn số phần tử", async () => {
    const c = new TtlCache<number>(30, 2);
    c.set("a", 1);
    assert.equal(c.get("a"), 1);
    await new Promise((r) => setTimeout(r, 50));
    assert.equal(c.get("a"), undefined);
    c.set("x", 1); c.set("y", 2); c.set("z", 3);
    assert.equal(c.get("x"), undefined);
    assert.equal(c.get("z"), 3);
  });
});

describe("userRateLimit", () => {
  const call = (limit: ReturnType<typeof userRateLimit>, id: string) => {
    const headers: Record<string, string> = {};
    let passed = false;
    const req = { user: { id } } as never;
    const res = { setHeader: (k: string, v: string) => (headers[k] = v) } as never;
    limit(req, res, () => (passed = true));
    return { passed, headers };
  };

  it("chặn sau khi vượt ngưỡng, theo từng user, kèm Retry-After", () => {
    const limit = userRateLimit({ name: "t", windowMs: 60_000, max: 2 });
    assert.equal(call(limit, "u1").passed, true);
    assert.equal(call(limit, "u1").passed, true);
    assert.throws(() => call(limit, "u1"), (e) => e instanceof AppError && e.statusCode === 429);
    assert.equal(call(limit, "u2").passed, true); // user khác không bị ảnh hưởng
  });
});
