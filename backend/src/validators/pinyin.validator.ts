import { z } from "zod";

export const convertPinyinSchema = z.object({
  text: z.string().trim().min(1, "Vui lòng nhập nội dung cần chuyển").max(500, "Nội dung quá dài"),
  /** word: ghép liền (lǎoshī) – dùng cho từ; sentence: tách bằng khoảng trắng (wǒ ài nǐ) – dùng cho câu. */
  style: z.enum(["word", "sentence"]).optional().default("word"),
});

export type ConvertPinyinInput = z.infer<typeof convertPinyinSchema>;
