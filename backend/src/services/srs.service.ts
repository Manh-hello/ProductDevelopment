/**
 * Thuật toán SM-2 (SuperMemo-2) thật — khớp theo ERD (bảng `srs_reviews`
 * có quality/previous_interval/new_interval/previous_ease_factor/
 * new_ease_factor), thay cho SRS tuyến tính đơn giản ở thiết kế cũ.
 *
 * Tham khảo công thức gốc: https://en.wikipedia.org/wiki/SuperMemo#Description_of_SM-2_algorithm
 *
 * Hàm thuần (pure function) để dễ unit test độc lập với DB.
 */

const MIN_EASE_FACTOR = 1.3;
const DEFAULT_EASE_FACTOR = 2.5;

export interface Sm2State {
  /** Số lần ôn ĐÚNG liên tiếp gần nhất (reset về 0 khi quality < 3). Dùng review_count trên UserVocabulary làm proxy. */
  repetition: number;
  previousInterval: number; // số ngày
  previousEaseFactor: number;
}

export interface Sm2Result {
  newInterval: number; // số ngày
  newEaseFactor: number;
  nextReviewAt: Date;
  /** true nếu quality >= 3 (coi là "nhớ được") - dùng để cập nhật correct/incorrect count. */
  isRecall: boolean;
}

/**
 * @param quality Chất lượng câu trả lời theo thang SM-2: 0-5.
 *   Ở MVP, câu trả lời trắc nghiệm chỉ có đúng/sai nên map: đúng -> 4, sai -> 2
 *   (xem mapping trong services/practice.service.ts). Cho phép nhận quality
 *   0-5 trực tiếp để tương lai hỗ trợ UI tự chấm "Again/Hard/Good/Easy".
 */
export function computeSm2(state: Sm2State, quality: number, now: Date = new Date()): Sm2Result {
  const clampedQuality = Math.max(0, Math.min(5, Math.round(quality)));
  const isRecall = clampedQuality >= 3;

  let newInterval: number;
  let nextRepetition: number;

  if (!isRecall) {
    // Quên -> reset về đầu chu kỳ, ôn lại sớm (1 ngày) thay vì đợi lâu.
    nextRepetition = 0;
    newInterval = 1;
  } else {
    nextRepetition = state.repetition + 1;
    if (nextRepetition === 1) {
      newInterval = 1;
    } else if (nextRepetition === 2) {
      newInterval = 6;
    } else {
      newInterval = Math.round(state.previousInterval * state.previousEaseFactor);
    }
  }

  const easeDelta = 0.1 - (5 - clampedQuality) * (0.08 + (5 - clampedQuality) * 0.02);
  const newEaseFactor = Math.max(MIN_EASE_FACTOR, state.previousEaseFactor + easeDelta);

  const nextReviewAt = new Date(now.getTime() + newInterval * 24 * 60 * 60 * 1000);

  return { newInterval, newEaseFactor, nextReviewAt, isRecall };
}

export const SM2_DEFAULTS = {
  easeFactor: DEFAULT_EASE_FACTOR,
  interval: 0,
};

/** Map kết quả đúng/sai (trắc nghiệm MVP) sang thang quality SM-2. */
export function isCorrectToQuality(isCorrect: boolean): number {
  return isCorrect ? 4 : 2;
}
