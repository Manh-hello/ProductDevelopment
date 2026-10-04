/**
 * XP thưởng khi trả lời ĐÚNG, theo loại bài (PRD mục 8.16).
 * Khoá là `Exercise.type` (xem prisma/seed.ts - catalog 7 dòng cố định),
 * không còn là Prisma enum (schema mới dùng bảng `exercises` thay vì enum).
 */
export const XP_PER_CORRECT_ANSWER: Record<string, number> = {
  QUIZ: 10,
  REVERSE_QUIZ: 10,
  PINYIN: 10,
  LISTENING: 10,
  WRITING: 10,
  SENTENCE: 20,
  SPEAKING: 20,
};

export const DEFAULT_XP_PER_CORRECT_ANSWER = 10;

export const XP_DAILY_REVIEW_COMPLETION_BONUS = 50;

/** Khớp "+150 XP" hiển thị ở thẻ "Thử Thách Hôm Nay" trên DashboardPage (frontend hanzi-srs).
 *  CHƯA có logic/endpoint tạo & hoàn thành daily challenge ở backend - chỉ khai báo
 *  hằng số trước để khi triển khai không lệch con số với UI. */
export const XP_DAILY_CHALLENGE_BONUS = 150;
