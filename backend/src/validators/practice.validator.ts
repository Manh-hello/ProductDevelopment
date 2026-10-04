import { z } from "zod";

export const startSessionSchema = z.object({
  sessionType: z.enum(["mixed", "daily_review", "practice"]).default("mixed"),
  sessionSize: z.coerce.number().int().min(1).max(50).optional(),
});

export const submitAnswerSchema = z.object({
  vocabularyId: z.string().uuid("vocabularyId phải là UUID hợp lệ"),
  exerciseId: z.string().uuid("exerciseId phải là UUID hợp lệ"),
  exerciseType: z.enum(["QUIZ", "REVERSE_QUIZ", "PINYIN", "LISTENING", "WRITING", "SENTENCE", "SPEAKING"]),
  selectedAnswer: z.string().min(1, "Vui lòng chọn một đáp án"),
  responseTimeMs: z.coerce.number().int().positive().optional(),
});

export type StartSessionInput = z.infer<typeof startSessionSchema>;
export type SubmitAnswerInput = z.infer<typeof submitAnswerSchema>;
