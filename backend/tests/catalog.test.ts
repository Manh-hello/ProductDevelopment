import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { LEARNER_BANDS, TOPICS, bandOfLevel, levelVariants, parseHskLevel } from "../src/constants/catalog";
import { catalogWordsQuerySchema, enrollSchema } from "../src/validators/catalog.validator";
import { startSessionSchema } from "../src/validators/practice.validator";
import { loadHskWords } from "../prisma/hskSeedData";

describe("catalog: cấp độ HSK", () => {
  it("parseHskLevel chấp nhận 'HSK 1', 'HSK1', 'hsk 3', '2' và từ chối giá trị khác", () => {
    assert.equal(parseHskLevel("HSK 1"), 1);
    assert.equal(parseHskLevel("HSK1"), 1);
    assert.equal(parseHskLevel("hsk 3"), 3);
    assert.equal(parseHskLevel("2"), 2);
    assert.equal(parseHskLevel("HSK 7"), null);
    assert.equal(parseHskLevel("abc"), null);
    assert.equal(parseHskLevel(undefined), null);
  });
  it("levelVariants gồm cả dạng cũ 'HSK1' và dạng mới 'HSK 1'", () => {
    assert.deepEqual(levelVariants(2), ["HSK 2", "HSK2"]);
  });
  it("mỗi cấp HSK 1-6 thuộc đúng một trình độ", () => {
    for (let n = 1; n <= 6; n++) assert.ok(bandOfLevel(n));
    assert.equal(LEARNER_BANDS.flatMap((b) => b.levels).length, 6);
  });
});

describe("catalog: validator", () => {
  it("enroll cần ít nhất một phạm vi và giới hạn mặc định 20", () => {
    assert.equal(enrollSchema.safeParse({}).success, false);
    const r = enrollSchema.parse({ level: "HSK 1" });
    assert.equal(r.limit, 20);
    assert.equal(enrollSchema.safeParse({ level: "HSK 9" }).success, false);
    assert.equal(enrollSchema.safeParse({ band: "expert" }).success, false);
  });
  it("words: limit tối đa 100, mặc định 30", () => {
    assert.equal(catalogWordsQuerySchema.parse({}).limit, 30);
    assert.equal(catalogWordsQuerySchema.safeParse({ limit: "500" }).success, false);
  });
  it("phiên luyện tập nhận scope tuỳ chọn", () => {
    assert.ok(startSessionSchema.parse({ scope: { topic: "Ăn uống" } }).scope);
    assert.equal(startSessionSchema.parse({}).scope, undefined);
  });
});

describe("dữ liệu HSK (prisma/data/hsk-vi.txt)", () => {
  const words = loadHskWords();
  it("đủ HSK 1-3, không trùng Hán tự", () => {
    assert.equal(words.length, new Set(words.map((w) => w.hanzi)).size);
    for (const lv of ["HSK 1", "HSK 2", "HSK 3"]) assert.ok(words.filter((w) => w.level === lv).length >= 140, lv);
  });
  it("mỗi từ có pinyin, nghĩa, loại từ và chủ đề hợp lệ", () => {
    const topics = new Set(TOPICS.map((t) => t.name));
    for (const w of words) {
      assert.ok(w.pinyin && w.meaning && w.partOfSpeech, w.hanzi);
      assert.ok(topics.has(w.topic), w.hanzi);
    }
  });
});
