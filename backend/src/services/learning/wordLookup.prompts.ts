import { z } from "zod";

/** HSK từ AI: chấp nhận 3 | "HSK 3" | "HSK3"; giá trị lạ (7-9, chữ...) → null thay vì làm hỏng cả phản hồi. */
const hskLevel = z
  .preprocess((v) => {
    if (typeof v === "number") return v;
    if (typeof v === "string") {
      const m = v.match(/[1-9]/);
      return m ? Number(m[0]) : null;
    }
    return null;
  }, z.number().int().min(1).max(6).nullable())
  .catch(null);

const optionalText = (max: number) => z.string().trim().max(max).nullish().catch(null);

export const aiExampleSchema = z.object({
  sentence: z.string().trim().min(2).max(120),
  meaning: z.string().trim().min(1).max(300),
  explanation: optionalText(300),
});

/** Phần tử ví dụ hỏng chỉ bị loại riêng lẻ (→ null) chứ không làm hỏng cả phản hồi. */
const lenientExamples = z.array(aiExampleSchema.nullable().catch(null)).max(6);

export const aiWordSchema = z.object({
  pinyin: z.string().trim().max(100).catch(""),
  meaning: z.string().trim().min(1).max(400),
  partOfSpeech: optionalText(50),
  hskLevel: hskLevel.optional(),
  usage: optionalText(800),
  collocations: z
    .array(z.object({ phrase: z.string().trim().min(1).max(40), meaning: z.string().trim().max(120).catch("") }))
    .max(6)
    .catch([]),
  synonyms: z
    .array(z.object({ word: z.string().trim().min(1).max(30), note: z.string().trim().max(200).catch("") }))
    .max(4)
    .catch([]),
  readings: z
    .array(z.object({ pinyin: z.string().trim().min(1).max(60), meaning: z.string().trim().max(200).catch("") }))
    .max(4)
    .catch([]),
  examples: lenientExamples,
});

export const aiExamplesOnlySchema = z.object({ examples: lenientExamples });

export type AiWord = z.infer<typeof aiWordSchema>;
export type AiExample = z.infer<typeof aiExampleSchema>;

const RULES = `Bạn là giáo viên tiếng Trung cho người học Việt Nam. CHỈ trả về MỘT JSON object hợp lệ, không markdown, không văn bản ngoài JSON.
Quy tắc:
- KHÔNG bịa. Không chắc thì để null hoặc mảng rỗng.
- "meaning": nghĩa tiếng Việt phổ biến, ngắn gọn (tối đa 3 nghĩa chính, ngăn cách bằng "; ").
- "partOfSpeech": từ loại bằng tiếng Việt (động từ, danh từ, tính từ, phó từ, lượng từ, liên từ, giới từ, trợ từ, đại từ, thành ngữ, cụm từ...).
- "hskLevel": số 1-6 CHỈ khi bạn chắc chắn từ thuộc cấp HSK đó; nếu không chắc phải là null.
- Ví dụ: câu tiếng Trung tự nhiên, ngắn gọn, đúng ngữ pháp, dùng từ vựng đơn giản (khoảng HSK 1-3 trừ khi bản thân từ khó hơn). MỖI câu phải chứa NGUYÊN VĂN từ/cụm từ cần tra. Không cần viết pinyin cho câu. "meaning" của ví dụ là bản dịch tiếng Việt tự nhiên; "explanation" là giải thích ngắn tiếng Việt về cách dùng từ trong câu (hoặc null).`;

export function wordSystemPrompt(): string {
  return `${RULES}
Định dạng JSON:
{"pinyin":"pinyin có dấu thanh của từ","meaning":"...","partOfSpeech":"...|null","hskLevel":1-6|null,"usage":"cách dùng và cấu trúc ngữ pháp thường gặp, tiếng Việt, ngắn gọn|null","collocations":[{"phrase":"cụm hán tự","meaning":"nghĩa việt"}],"synonyms":[{"word":"hán tự","note":"khác biệt/điểm dễ nhầm"}],"readings":[{"pinyin":"...","meaning":"..."}],"examples":[{"sentence":"...","meaning":"...","explanation":"...|null"}]}
- "collocations": tối đa 5 kết hợp từ thông dụng. "synonyms": CHỈ khi thực sự giúp phân biệt (có thể []). "readings": CHỈ khi từ có nhiều cách đọc với nghĩa khác nhau (có thể []).
- "examples": từ 2 đến 3 câu.`;
}

export function wordUserPrompt(text: string, knownMeaning?: string): string {
  return `Từ/cụm từ cần tra: """${text}"""${knownMeaning ? `\nNghĩa hiện có trong kho (chỉ để tham khảo, không bắt buộc theo): ${knownMeaning}` : ""}`;
}

export function examplesSystemPrompt(): string {
  return `${RULES}
Định dạng JSON: {"examples":[{"sentence":"...","meaning":"...","explanation":"...|null"}]}
Tạo đúng 2 câu ví dụ MỚI.`;
}

export function examplesUserPrompt(text: string, avoid: string[]): string {
  return `Từ/cụm từ: """${text}"""${avoid.length ? `\nKHÔNG lặp lại hoặc diễn đạt gần giống các câu này: ${JSON.stringify(avoid)}` : ""}`;
}
