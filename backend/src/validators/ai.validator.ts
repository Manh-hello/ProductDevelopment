import { z } from "zod";
import { HSK_LEVELS, SENTENCE_TOPIC_KEYS } from "../constants/sentenceTopics";

export const MAX_GENERATED_SENTENCES = 5;
export const MAX_SELECTED_WORDS = 8;

export const aiLookupSchema = z.object({
  text: z.string().trim().min(1, "Vui lòng nhập từ cần tra cứu").max(50, "Từ/cụm từ quá dài (tối đa 50 ký tự)"),
  /** `all`: toàn bộ thông tin; `examples`: chỉ tạo lại câu ví dụ (nhẹ và rẻ hơn). */
  focus: z.enum(["all", "examples"]).default("all"),
  /** Các câu ví dụ hiện có - yêu cầu AI không lặp lại khi tạo lại ví dụ. */
  avoidSentences: z.array(z.string().trim().max(200)).max(10).optional(),
  /** Bỏ qua cache / quyết định "đã đủ dữ liệu trong kho" và gọi AI. */
  force: z.boolean().optional(),
});

const baseGenerate = z.object({
  count: z.coerce.number().int().min(1).max(MAX_GENERATED_SENTENCES).default(3),
  vocabularyId: z.string().uuid().optional(),
  vocabularyIds: z.array(z.string().uuid()).min(1).max(MAX_SELECTED_WORDS).optional(),
  topic: z.enum(SENTENCE_TOPIC_KEYS).optional(),
  level: z.enum(HSK_LEVELS).optional(),
});

/** 5 chế độ tạo câu - mỗi chế độ bắt buộc đúng các trường nó cần. */
export const generateSentencesSchema = z
  .discriminatedUnion("mode", [
    baseGenerate.extend({ mode: z.literal("new_word") }),
    baseGenerate.extend({ mode: z.literal("review_mix") }),
    baseGenerate.extend({ mode: z.literal("topic") }),
    baseGenerate.extend({ mode: z.literal("level") }),
    baseGenerate.extend({ mode: z.literal("selected_words") }),
  ])
  .superRefine((v, ctx) => {
    const need = (ok: boolean, path: string, message: string) => {
      if (!ok) ctx.addIssue({ code: z.ZodIssueCode.custom, path: [path], message });
    };
    if (v.mode === "new_word") need(Boolean(v.vocabularyId), "vocabularyId", "Vui lòng chọn từ mới cần đặt câu.");
    if (v.mode === "topic") need(Boolean(v.topic), "topic", "Vui lòng chọn chủ đề.");
    if (v.mode === "level") need(Boolean(v.level), "level", "Vui lòng chọn trình độ.");
    if (v.mode === "selected_words") need(Boolean(v.vocabularyIds?.length), "vocabularyIds", "Vui lòng chọn ít nhất 1 từ.");
  });

export type AiLookupInput = z.infer<typeof aiLookupSchema>;
export type GenerateSentencesInput = z.infer<typeof generateSentencesSchema>;
