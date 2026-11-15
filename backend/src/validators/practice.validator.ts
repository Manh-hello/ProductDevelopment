import { z } from "zod";
import { ALL_EXERCISE_TYPE_KEYS } from "../constants/exerciseTypes";
import { scopeSchema } from "./catalog.validator";

const exerciseTypeEnum = z.enum(ALL_EXERCISE_TYPE_KEYS as [string, ...string[]]);

export const startSessionSchema = z.object({
  sessionType: z.enum(["mixed", "daily_review", "practice"]).default("mixed"),
  sessionSize: z.coerce.number().int().min(1).max(50).optional(),
  /** Giới hạn các dạng bài trong phiên (vd ["QUIZ"] cho trang Trắc nghiệm). Bỏ trống = 3 dạng trắc nghiệm MVP. */
  exerciseTypes: z.array(exerciseTypeEnum).min(1).max(20).optional(),
  /** `saved`: chỉ luyện các từ mà bạn đã lưu câu (có bản dịch), dùng chính các câu đó làm câu nền. */
  sentenceSource: z.enum(["saved"]).optional(),
  /** Chỉ luyện các từ TRONG DANH SÁCH HỌC của bạn thuộc bộ này (cấp độ HSK / chủ đề / trình độ). */
  scope: scopeSchema.optional(),
});

export const submitAnswerSchema = z
  .object({
    vocabularyId: z.string().uuid("vocabularyId phải là UUID hợp lệ"),
    /** Không bắt buộc: server tự tra theo `exerciseType`. Giữ lại để tương thích client cũ. */
    exerciseId: z.string().uuid().optional(),
    exerciseType: exerciseTypeEnum,
    selectedAnswer: z.string().max(2000).optional(),
    /** Câu ví dụ nền của câu hỏi (các dạng TRANSLATION / FILL_BLANK / SENTENCE_ORDER / TRANSLATION_HUB). */
    exampleId: z.string().uuid().optional(),
    /** Tự đánh giá SM-2 0-5 (thẻ ghi nhớ, luyện viết, luyện nói). */
    quality: z.coerce.number().int().min(0).max(5).optional(),
    responseTimeMs: z.coerce.number().int().positive().max(3_600_000).optional(),
  })
  .refine((v) => v.quality !== undefined || (v.selectedAnswer !== undefined && v.selectedAnswer.trim().length > 0), {
    message: "Vui lòng chọn/nhập đáp án hoặc tự đánh giá.",
    path: ["selectedAnswer"],
  });

export const listSessionsQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(50).default(10),
});

export type StartSessionInput = z.infer<typeof startSessionSchema>;
export type SubmitAnswerInput = z.infer<typeof submitAnswerSchema>;
