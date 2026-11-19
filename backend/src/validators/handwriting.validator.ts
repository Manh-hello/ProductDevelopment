import { z } from "zod";

export const recognizeQuerySchema = z.object({
  vocabularyId: z.string().uuid("vocabularyId phải là UUID hợp lệ").optional(),
});

export const listAttemptsQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(20),
});
