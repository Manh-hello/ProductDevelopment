/**
 * Khoá loại bài luyện tập - khớp `type` trong bảng `exercises` (catalog, xem
 * constants/exerciseCatalog.ts). Câu hỏi được sinh động từ dữ liệu từ vựng
 * (xem services/exercise.service.ts), chấm điểm ở services/answer.service.ts.
 */
export const EXERCISE_TYPES = {
  QUIZ: "QUIZ",
  REVERSE_QUIZ: "REVERSE_QUIZ",
  PINYIN: "PINYIN",
  LISTENING: "LISTENING",
  DICTATION: "DICTATION",
  FILL_BLANK: "FILL_BLANK",
  SENTENCE_ORDER: "SENTENCE_ORDER",
  TRANSLATION: "TRANSLATION",
  TRANSLATION_HUB: "TRANSLATION_HUB",
  WRITING: "WRITING",
  SPEAKING: "SPEAKING",
  SENTENCE_CREATION: "SENTENCE_CREATION",
  /** Thẻ ghi nhớ lật mặt (trang /review): người học tự chấm Again/Hard/Good/Easy. */
  FLASHCARD: "FLASHCARD",
  /** Giữ lại để tương thích dữ liệu cũ (đã seed ở bản trước). */
  SENTENCE: "SENTENCE",
} as const;

export type ExerciseTypeKey = (typeof EXERCISE_TYPES)[keyof typeof EXERCISE_TYPES];

export const ALL_EXERCISE_TYPE_KEYS = Object.values(EXERCISE_TYPES) as ExerciseTypeKey[];

/** 3 dạng trắc nghiệm MVP - mặc định khi client không chỉ định `exerciseTypes`. */
export const MVP_EXERCISE_TYPES: ExerciseTypeKey[] = [
  EXERCISE_TYPES.QUIZ,
  EXERCISE_TYPES.REVERSE_QUIZ,
  EXERCISE_TYPES.PINYIN,
];

/** Cách người học tương tác với câu hỏi - frontend dựa vào đây để chọn giao diện. */
export type InputMode = "choice" | "text" | "order" | "self" | "flashcard";

/** Nhóm kỹ năng (radar 6 chiều ở Dashboard / Statistics). */
export const SKILL_GROUPS: { key: string; label: string; types: string[] }[] = [
  { key: "recognition", label: "Nhận diện Hán tự", types: ["QUIZ", "REVERSE_QUIZ", "FLASHCARD"] },
  { key: "pinyin", label: "Pinyin & Thanh điệu", types: ["PINYIN"] },
  { key: "listening", label: "Nghe hiểu", types: ["LISTENING", "DICTATION"] },
  { key: "sentence", label: "Đặt câu & Ngữ cảnh", types: ["SENTENCE_ORDER", "FILL_BLANK", "TRANSLATION", "TRANSLATION_HUB", "SENTENCE_CREATION", "SENTENCE"] },
  { key: "speaking", label: "Luyện nói", types: ["SPEAKING"] },
  { key: "writing", label: "Viết & Chính tả", types: ["WRITING"] },
];
