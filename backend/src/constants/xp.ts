/**
 * XP thưởng khi trả lời ĐÚNG, theo loại bài (PRD mục 8.16).
 * Khoá là `Exercise.type` (catalog trong constants/exerciseCatalog.ts).
 */
export const XP_PER_CORRECT_ANSWER: Record<string, number> = {
  QUIZ: 10,
  REVERSE_QUIZ: 10,
  PINYIN: 10,
  LISTENING: 10,
  DICTATION: 15,
  WRITING: 10,
  FILL_BLANK: 15,
  SENTENCE_ORDER: 20,
  TRANSLATION: 15,
  TRANSLATION_HUB: 20,
  SENTENCE: 20,
  SENTENCE_CREATION: 20,
  SPEAKING: 20,
  FLASHCARD: 5,
};

export const DEFAULT_XP_PER_CORRECT_ANSWER = 10;

export const XP_DAILY_REVIEW_COMPLETION_BONUS = 50;

/** Thưởng khi hoàn thành "Thử Thách Hôm Nay" (khớp +150 XP ở DashboardPage). */
export const XP_DAILY_CHALLENGE_BONUS = 150;

/** Mỗi cấp cần thêm XP_PER_LEVEL (Lv1 = 0-499 XP...). */
export const XP_PER_LEVEL = 500;
export const LEVEL_TITLES = ["Tân Học Giả", "Học Giả", "Học Giả Cần Mẫn", "Hàn Lâm", "Đại Học Sĩ", "Bậc Thầy"];
