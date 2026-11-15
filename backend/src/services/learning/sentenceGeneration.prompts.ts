import { z } from "zod";

export const aiSentenceSchema = z.object({
  hanzi: z.string().trim().min(2).max(120),
  meaning: z.string().trim().max(300).catch(""),
  explanation: z.string().trim().max(300).nullish().catch(null),
});

/** Từng câu hỏng chỉ bị loại riêng lẻ, không làm hỏng cả lô. */
export const aiSentencesSchema = z.object({
  sentences: z.array(aiSentenceSchema.nullable().catch(null)).min(1).max(8),
});

export function sentencesSystemPrompt(level: string): string {
  return `Bạn là giáo viên tiếng Trung cho người học Việt Nam. CHỈ trả về MỘT JSON object hợp lệ, không markdown.
Định dạng: {"sentences":[{"hanzi":"câu tiếng Trung","meaning":"bản dịch tiếng Việt tự nhiên","explanation":"giải thích ngắn tiếng Việt hoặc null"}]}
Quy tắc:
- Câu tiếng Trung TỰ NHIÊN, đúng ngữ pháp, đời thường, ngắn gọn (khoảng 5-20 chữ Hán), không gượng ép.
- MỖI câu phải chứa NGUYÊN VĂN ít nhất MỘT từ trong "targetWords" (dùng 2 từ nếu vẫn tự nhiên). Không đổi chữ Hán của từ mục tiêu.
- Ngoài từ mục tiêu, chỉ dùng thêm từ trong "knownWords" và từ rất cơ bản (độ khó khoảng ${level} trở xuống). Không nhồi từ khó.
- Các câu phải khác nhau về nội dung và cấu trúc.
- "explanation": tối đa 1 câu về ngữ pháp/cách dùng từ trong câu, hoặc null nếu không cần.
- Không viết pinyin.`;
}

export interface SentencesPromptInput {
  count: number;
  targetWords: { hanzi: string; meaning: string }[];
  knownWords: string[];
  topic?: string;
  level: string;
}

export function sentencesUserPrompt(p: SentencesPromptInput): string {
  return JSON.stringify({
    count: p.count,
    targetWords: p.targetWords,
    knownWords: p.knownWords,
    ...(p.topic ? { topic: p.topic } : {}),
    level: p.level,
  });
}
