import { z } from "zod";
import { convertToPinyin } from "../../utils/pinyin";

/**
 * Làm giàu dữ liệu từ vựng bằng AI (dùng bởi prisma/enrichVocabulary.ts).
 * Phần thuần (prompt, schema, làm sạch) tách riêng để test được mà không cần AI/DB.
 * Nguyên tắc: KHÔNG tin đầu ra của LLM — mọi trường đều bị cắt độ dài, kiểm tra và loại bỏ nếu nghi ngờ.
 */

const text = (max: number) => z.string().trim().max(max).nullish().catch(null);

const pair = z.object({ word: z.string().trim().min(1).max(30), note: z.string().trim().max(200).catch("") });

export const enrichmentItemSchema = z.object({
  hanzi: z.string().trim().min(1),
  hanViet: text(100),
  traditional: text(50),
  measureWord: text(100),
  usage: text(800),
  collocations: z
    .array(z.object({ phrase: z.string().trim().min(1).max(40), meaning: z.string().trim().max(120).catch("") }))
    .max(6)
    .catch([]),
  synonyms: z.array(pair).max(4).catch([]),
  antonyms: z.array(pair).max(3).catch([]),
  examples: z
    .array(
      z
        .object({
          sentence: z.string().trim().min(2).max(120),
          meaning: z.string().trim().min(1).max(300),
          explanation: text(300),
        })
        .nullable()
        .catch(null)
    )
    .max(6)
    .catch([]),
});

/** Từng phần tử hỏng chỉ bị loại riêng (→ null), không làm hỏng cả lô. */
export const enrichmentBatchSchema = z.object({ items: z.array(enrichmentItemSchema.nullable().catch(null)) });

export type EnrichmentItem = z.infer<typeof enrichmentItemSchema>;
export type EnrichmentBatch = z.infer<typeof enrichmentBatchSchema>;

export interface WordForEnrichment {
  hanzi: string;
  pinyin: string;
  meaning: string;
  partOfSpeech: string | null;
  level: string | null;
}

export function enrichmentSystemPrompt(): string {
  return `Bạn là giáo viên tiếng Trung cho người học Việt Nam, đang soạn từ điển học tập. CHỈ trả về MỘT JSON object hợp lệ, không markdown, không văn bản ngoài JSON.
Quy tắc chung:
- KHÔNG bịa. Không chắc thì để null hoặc mảng rỗng.
- Chữ Hán giản thể. Mọi giải thích bằng tiếng Việt, ngắn gọn.
Định dạng:
{"items":[{"hanzi":"đúng chữ Hán đã cho","hanViet":"...|null","traditional":"...|null","measureWord":"...|null","usage":"...|null","collocations":[{"phrase":"cụm chữ Hán","meaning":"nghĩa Việt"}],"synonyms":[{"word":"chữ Hán","note":"khác biệt"}],"antonyms":[{"word":"chữ Hán","note":""}],"examples":[{"sentence":"...","meaning":"...","explanation":"...|null"}]}]}
Từng trường:
- "hanzi": sao chép NGUYÊN VĂN từ đầu vào; trả về đủ MỘT phần tử cho mỗi từ.
- "hanViet": âm Hán Việt viết thường, mỗi chữ Hán một âm tiết (vd 学校 → "học hiệu"). null nếu là từ thuần chức năng không có âm Hán Việt thông dụng (vd 的, 吗) hoặc không chắc.
- "traditional": dạng phồn thể CHỈ khi khác giản thể; nếu giống nhau thì null.
- "measureWord": lượng từ thường đi với danh từ này (vd "个", "本", "张"); null nếu không phải danh từ đếm được.
- "usage": cách dùng và cấu trúc ngữ pháp thường gặp (1–2 câu).
- "collocations": 3 đến 5 kết hợp từ thông dụng chứa từ đang xét (hoặc [] nếu không có).
- "synonyms": CHỈ khi giúp phân biệt, tối đa 3; "antonyms": CHỈ khi có từ trái nghĩa rõ ràng, tối đa 2.
- "examples": đúng 3 câu tự nhiên, ngắn, đúng ngữ pháp, từ vựng đơn giản (khoảng HSK 1–3 trừ khi bản thân từ khó hơn). MỖI câu phải chứa NGUYÊN VĂN từ đang xét, KHÔNG viết pinyin cho câu; "meaning" là bản dịch tiếng Việt tự nhiên; "explanation" giải thích ngắn cách dùng từ trong câu (hoặc null). Ba câu phải khác nhau về ngữ cảnh.`;
}

export function enrichmentUserPrompt(words: WordForEnrichment[]): string {
  const lines = words.map((w) => {
    const meta = [w.pinyin, w.partOfSpeech, w.level].filter(Boolean).join(" | ");
    return `- ${w.hanzi} (${meta}): ${w.meaning}`;
  });
  return `Làm giàu dữ liệu cho ${words.length} từ sau (nghĩa chỉ để xác định đúng nghĩa cần nói tới):\n${lines.join("\n")}`;
}

export interface CleanEnrichment {
  hanViet: string | null;
  traditional: string | null;
  measureWord: string | null;
  usage: string | null;
  collocations: { phrase: string; pinyin: string; meaning: string }[];
  synonyms: { word: string; pinyin: string; note: string }[];
  antonyms: { word: string; pinyin: string; note: string }[];
  examples: { sentenceHanzi: string; sentencePinyin: string; sentenceMeaning: string; explanation: string | null }[];
}

const HAN = /\p{Script=Han}/u;
const hanCount = (s: string) => Array.from(s).filter((c) => HAN.test(c)).length;
/** Âm Hán Việt hợp lệ: chữ cái tiếng Việt + khoảng trắng/dấu gạch, số âm tiết = số chữ Hán (儿 hoá âm cuối cho phép thiếu 1). */
const VI_SYLLABLES = /^[\p{L}]+(?:[\s-]+[\p{L}]+)*$/u;

export function cleanHanViet(hanzi: string, raw: string | null | undefined): string | null {
  const v = raw?.trim().toLowerCase();
  if (!v || !VI_SYLLABLES.test(v)) return null;
  const want = hanCount(hanzi);
  const got = v.split(/[\s-]+/).length;
  return got === want || (hanzi.endsWith("儿") && got === want - 1) ? v : null;
}

/**
 * Làm sạch kết quả AI cho MỘT từ:
 * - ví dụ phải chứa nguyên văn từ, không trùng câu đã có, tối đa `maxNewExamples` câu mới;
 * - Hán Việt phải có số âm tiết khớp số chữ Hán;
 * - phồn thể bỏ nếu trùng giản thể hoặc không phải chữ Hán;
 * - pinyin của câu/cụm/từ đồng-trái nghĩa luôn do pinyin-pro tạo (không tin pinyin AI).
 */
export function cleanEnrichment(hanzi: string, item: EnrichmentItem, existingSentences: string[], maxNewExamples: number): CleanEnrichment {
  const seen = new Set(existingSentences.map((s) => s.replace(/\s+/g, "")));
  const examples: CleanEnrichment["examples"] = [];
  for (const e of item.examples) {
    if (!e || examples.length >= maxNewExamples) continue;
    const key = e.sentence.replace(/\s+/g, "");
    if (!e.sentence.includes(hanzi) || seen.has(key)) continue;
    seen.add(key);
    examples.push({
      sentenceHanzi: e.sentence,
      sentencePinyin: convertToPinyin(e.sentence, "sentence").pinyin,
      sentenceMeaning: e.meaning,
      explanation: e.explanation?.trim() || null,
    });
  }

  const traditional = item.traditional?.trim() ?? "";
  const measureWord = item.measureWord?.trim() ?? "";
  const withPinyin = <T extends { word: string }>(arr: T[]) => arr.filter((x) => HAN.test(x.word) && x.word !== hanzi).map((x) => ({ ...x, pinyin: convertToPinyin(x.word, "sentence").pinyin }));

  return {
    hanViet: cleanHanViet(hanzi, item.hanViet),
    traditional: traditional && traditional !== hanzi && HAN.test(traditional) ? traditional : null,
    measureWord: measureWord && HAN.test(measureWord) ? measureWord : null,
    usage: item.usage?.trim() || null,
    collocations: item.collocations
      .filter((c) => HAN.test(c.phrase))
      .map((c) => ({ phrase: c.phrase, pinyin: convertToPinyin(c.phrase, "sentence").pinyin, meaning: c.meaning })),
    synonyms: withPinyin(item.synonyms),
    antonyms: withPinyin(item.antonyms),
    examples,
  };
}

export function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}
