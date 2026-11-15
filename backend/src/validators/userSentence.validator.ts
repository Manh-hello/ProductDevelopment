import { z } from "zod";
import { HSK_LEVELS, SENTENCE_TOPIC_KEYS } from "../constants/sentenceTopics";
import { MAX_SELECTED_WORDS } from "./ai.validator";

const usedWordSchema = z.object({
  vocabularyId: z.string().uuid(),
  role: z.enum(["target", "known"]).default("known"),
});

export const createUserSentenceSchema = z
  .object({
    vocabularyId: z.string().uuid("vocabularyId phải là UUID hợp lệ"),
    sentence: z.string().trim().min(1, "Câu không được để trống").max(2000),
    pinyin: z.string().trim().max(500).optional(),

    // --- Chỉ dùng khi lưu câu do hệ thống sinh (source = ai | existing); câu tự viết bỏ qua các trường này ---
    translation: z.string().trim().max(500).optional(),
    explanation: z.string().trim().max(2000).optional(),
    topic: z.enum(SENTENCE_TOPIC_KEYS).optional(),
    level: z.enum(HSK_LEVELS).optional(),
    source: z.enum(["manual", "ai", "existing"]).default("manual"),
    usedWords: z.array(usedWordSchema).max(MAX_SELECTED_WORDS + 8).optional(),
  })
  .refine((v) => v.source === "manual" || Boolean(v.translation), {
    message: "Câu do hệ thống tạo phải có bản dịch tiếng Việt.",
    path: ["translation"],
  });

export const updateUserSentenceSchema = z.object({
  correction: z.string().trim().max(2000).optional(),
  status: z.enum(["pending", "reviewed"]).optional(),
});

export type CreateUserSentenceInput = z.infer<typeof createUserSentenceSchema>;
export type UpdateUserSentenceInput = z.infer<typeof updateUserSentenceSchema>;
