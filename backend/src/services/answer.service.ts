import { Vocabulary } from "@prisma/client";
import { EXERCISE_TYPES } from "../constants/exerciseTypes";
import { AppError } from "../utils/AppError";
import { normalize, stripPinyinTones, stripPunctuation } from "../utils/text";
import type { PracticeExample } from "./userSentence.service";

export interface EvaluationInput {
  exerciseType: string;
  vocabulary: Vocabulary;
  example?: PracticeExample | null;
  selectedAnswer?: string;
  /** Tự đánh giá theo thang SM-2 (0-5) - bắt buộc với WRITING / FLASHCARD, tuỳ chọn với SPEAKING. */
  quality?: number;
}

export interface EvaluationResult {
  isCorrect: boolean;
  /** Đáp án chuẩn để hiển thị lại cho người học. */
  correctAnswer: string;
  /** Thang SM-2 0-5 dùng để cập nhật lịch ôn. */
  quality: number;
  feedback?: string;
}

const CORRECT_QUALITY = 4;
const WRONG_QUALITY = 2;
const PASS_QUALITY = 3;

function byQuality(quality: number, correctAnswer: string, feedback?: string): EvaluationResult {
  const q = Math.max(0, Math.min(5, Math.round(quality)));
  return { isCorrect: q >= PASS_QUALITY, correctAnswer, quality: q, feedback };
}

function byCorrectness(isCorrect: boolean, correctAnswer: string, feedback?: string): EvaluationResult {
  return { isCorrect, correctAnswer, quality: isCorrect ? CORRECT_QUALITY : WRONG_QUALITY, feedback };
}

/**
 * Chấm một câu trả lời. Đáp án đúng luôn được suy ra từ DB (không tin dữ liệu client gửi lên).
 * Các dạng chọn đáp án so khớp chuỗi; dạng gõ chấp nhận biến thể hợp lý (bỏ dấu câu, pinyin không dấu thanh);
 * các dạng tự chấm dùng `quality` do người học chọn.
 */
export function evaluateAnswer(input: EvaluationInput): EvaluationResult {
  const { exerciseType, vocabulary: v, example, quality } = input;
  const answer = input.selectedAnswer ?? "";

  switch (exerciseType) {
    case EXERCISE_TYPES.QUIZ:
      return byCorrectness(normalize(answer) === normalize(v.meaning), v.meaning);

    case EXERCISE_TYPES.REVERSE_QUIZ:
    case EXERCISE_TYPES.LISTENING:
    case EXERCISE_TYPES.FILL_BLANK:
      return byCorrectness(normalize(answer) === normalize(v.hanzi), v.hanzi);

    case EXERCISE_TYPES.PINYIN:
      return byCorrectness(normalize(answer) === normalize(v.pinyin), v.pinyin);

    case EXERCISE_TYPES.TRANSLATION: {
      const expected = requireExample(example).sentenceMeaning;
      return byCorrectness(normalize(answer) === normalize(expected), expected);
    }

    case EXERCISE_TYPES.DICTATION: {
      const typed = answer.trim();
      const hanziOk = stripPunctuation(typed) === stripPunctuation(v.hanzi);
      const pinyinExact = normalize(typed).replace(/\s/g, "") === normalize(v.pinyin).replace(/\s/g, "");
      const pinyinToneless = stripPinyinTones(typed) === stripPinyinTones(v.pinyin) && typed.length > 0;
      const isCorrect = hanziOk || pinyinExact || pinyinToneless;
      const feedback = isCorrect && !hanziOk && !pinyinExact ? "Đúng âm, nhưng hãy chú ý dấu thanh." : undefined;
      return byCorrectness(isCorrect, `${v.hanzi} (${v.pinyin})`, feedback);
    }

    case EXERCISE_TYPES.SENTENCE_ORDER:
    case EXERCISE_TYPES.TRANSLATION_HUB: {
      const expected = requireExample(example).sentenceHanzi;
      return byCorrectness(stripPunctuation(answer) === stripPunctuation(expected), expected);
    }

    case EXERCISE_TYPES.SENTENCE_CREATION:
    case EXERCISE_TYPES.SENTENCE: {
      const sentence = answer.trim();
      const containsWord = stripPunctuation(sentence).includes(stripPunctuation(v.hanzi));
      const longEnough = Array.from(stripPunctuation(sentence)).length > Array.from(v.hanzi).length;
      const isCorrect = containsWord && longEnough;
      const feedback = !containsWord
        ? `Câu chưa chứa từ "${v.hanzi}".`
        : !longEnough
          ? "Hãy đặt một câu đầy đủ hơn, không chỉ viết lại riêng từ."
          : "Câu đã dùng đúng từ khoá. (Chấm ngữ pháp bằng AI sẽ có ở giai đoạn sau.)";
      return byCorrectness(isCorrect, example?.sentenceHanzi ?? v.hanzi, feedback);
    }

    case EXERCISE_TYPES.SPEAKING: {
      if (quality !== undefined) return byQuality(quality, v.hanzi);
      // Có thể nhận bản ghi âm đã nhận dạng thành chữ từ trình duyệt.
      const heard = stripPunctuation(answer);
      const ok = heard === stripPunctuation(v.hanzi) || stripPinyinTones(heard) === stripPinyinTones(v.pinyin);
      return byCorrectness(ok, v.hanzi);
    }

    case EXERCISE_TYPES.WRITING:
      if (quality === undefined) throw new AppError("Vui lòng tự đánh giá mức nhớ (quality 0-5) cho bài luyện viết.", 400);
      return byQuality(quality, v.hanzi);

    case EXERCISE_TYPES.FLASHCARD:
      if (quality === undefined) throw new AppError("Vui lòng chọn mức đánh giá (quality 0-5) cho thẻ ghi nhớ.", 400);
      return byQuality(quality, v.meaning);

    default:
      throw new AppError(`Loại bài "${exerciseType}" không hợp lệ.`, 400);
  }
}

function requireExample(example?: PracticeExample | null): PracticeExample {
  if (!example) throw new AppError("Thiếu exampleId hợp lệ cho dạng bài dựa trên câu ví dụ.", 400);
  return example;
}
