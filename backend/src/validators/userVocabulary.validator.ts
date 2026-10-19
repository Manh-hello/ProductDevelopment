import { z } from "zod";

export const USER_VOCAB_FILTERS = ["all", "new", "learning", "due", "mastered", "weak"] as const;

export const listUserVocabularyQuerySchema = z.object({
  filter: z.enum(USER_VOCAB_FILTERS).default("all"),
  search: z.string().trim().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(200).default(50),
});

export const updateUserVocabularySchema = z.object({
  note: z.string().trim().max(5000).nullable().optional(),
  mnemonic: z.string().trim().max(5000).nullable().optional(),
  /** Đưa từ về trạng thái "mới" (xoá lịch sử tiến độ) - vd khi liên tục nhận diện sai. */
  resetProgress: z.boolean().optional(),
});

export type ListUserVocabularyQuery = z.infer<typeof listUserVocabularyQuerySchema>;
export type UpdateUserVocabularyInput = z.infer<typeof updateUserVocabularySchema>;
