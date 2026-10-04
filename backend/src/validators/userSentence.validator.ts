import { z } from "zod";

export const createUserSentenceSchema = z.object({
  vocabularyId: z.string().uuid("vocabularyId phải là UUID hợp lệ"),
  sentence: z.string().trim().min(1, "Câu không được để trống").max(2000),
  pinyin: z.string().trim().max(500).optional(),
});

export const updateUserSentenceSchema = z.object({
  correction: z.string().trim().max(2000).optional(),
  status: z.enum(["pending", "reviewed"]).optional(),
});

export type CreateUserSentenceInput = z.infer<typeof createUserSentenceSchema>;
export type UpdateUserSentenceInput = z.infer<typeof updateUserSentenceSchema>;
