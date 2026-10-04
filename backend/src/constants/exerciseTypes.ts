/**
 * Danh sách khoá loại bài luyện tập - khớp với `type` trong bảng `exercises`
 * (đã seed sẵn 7 dòng, xem prisma/seed.ts). Khác với thiết kế cũ (Prisma
 * enum `ExerciseType`), schema mới dùng bảng catalog thật (theo ERD),
 * nên các khoá này chỉ còn là hằng số string dùng trong code.
 */
export const EXERCISE_TYPES = {
  QUIZ: "QUIZ",
  REVERSE_QUIZ: "REVERSE_QUIZ",
  PINYIN: "PINYIN",
  LISTENING: "LISTENING",
  WRITING: "WRITING",
  SENTENCE: "SENTENCE",
  SPEAKING: "SPEAKING",
} as const;

export type ExerciseTypeKey = (typeof EXERCISE_TYPES)[keyof typeof EXERCISE_TYPES];

/** MVP (PRD mục 13 - Definition of Done): chỉ 3 dạng bài đầu tiên sinh câu hỏi trắc nghiệm. */
export const MVP_EXERCISE_TYPES: ExerciseTypeKey[] = [
  EXERCISE_TYPES.QUIZ,
  EXERCISE_TYPES.REVERSE_QUIZ,
  EXERCISE_TYPES.PINYIN,
];
