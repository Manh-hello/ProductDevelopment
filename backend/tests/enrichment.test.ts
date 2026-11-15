import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { chunk, cleanEnrichment, cleanHanViet, enrichmentBatchSchema, enrichmentUserPrompt } from "../src/services/learning/vocabEnrichment";

const base = { hanzi: "学校", collocations: [], synonyms: [], antonyms: [], examples: [] };

describe("làm giàu từ vựng bằng AI: kiểm tra đầu ra", () => {
  it("cleanHanViet: số âm tiết phải khớp số chữ Hán", () => {
    assert.equal(cleanHanViet("学校", "Học Hiệu"), "học hiệu");
    assert.equal(cleanHanViet("学校", "học"), null);
    assert.equal(cleanHanViet("学校", "học hiệu trường"), null);
    assert.equal(cleanHanViet("的", null), null);
    assert.equal(cleanHanViet("学校", "học 123"), null);
  });

  it("ví dụ: bắt buộc chứa từ, bỏ câu trùng câu cũ, giới hạn số câu mới, pinyin do thư viện tạo", () => {
    const item = enrichmentBatchSchema.parse({
      items: [{ ...base, examples: [
        { sentence: "我在学校学习。", meaning: "Tôi học ở trường." },
        { sentence: "我喜欢苹果。", meaning: "câu không chứa từ" },
        { sentence: "他去学校了。", meaning: "Anh ấy đi học rồi." },
        { sentence: "学校很大。", meaning: "Trường rất lớn." },
      ] }],
    }).items[0]!;
    const c = cleanEnrichment("学校", item, ["学校很大。"], 2);
    assert.deepEqual(c.examples.map((e) => e.sentenceHanzi), ["我在学校学习。", "他去学校了。"]);
    assert.ok(c.examples[0].sentencePinyin.includes("xué"));
  });

  it("phồn thể bỏ nếu trùng giản thể; lượng từ phải là chữ Hán; đồng nghĩa không lặp chính từ", () => {
    const item = enrichmentBatchSchema.parse({
      items: [{ ...base, traditional: "学校", measureWord: "ge", synonyms: [{ word: "学校", note: "" }, { word: "学院", note: "viện" }] }],
    }).items[0]!;
    const c = cleanEnrichment("学校", item, [], 3);
    assert.equal(c.traditional, null);
    assert.equal(c.measureWord, null);
    assert.deepEqual(c.synonyms.map((s) => s.word), ["学院"]);
    assert.ok(c.synonyms[0].pinyin.length > 0);
  });

  it("phần tử hỏng chỉ bị loại riêng, không làm hỏng cả lô", () => {
    const r = enrichmentBatchSchema.parse({ items: [{ ...base }, { oops: true }, "rác"] });
    assert.equal(r.items.length, 3);
    assert.ok(r.items[0]);
    assert.equal(r.items[1], null);
    assert.equal(r.items[2], null);
  });

  it("chunk và prompt", () => {
    assert.deepEqual(chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
    const p = enrichmentUserPrompt([{ hanzi: "学校", pinyin: "xuéxiào", meaning: "trường học", partOfSpeech: "Danh từ", level: "HSK 1" }]);
    assert.ok(p.includes("学校") && p.includes("trường học"));
  });
});
