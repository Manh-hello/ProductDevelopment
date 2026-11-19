import { Vocabulary } from "@prisma/client";
import { prisma } from "../config/prisma";
import { EXERCISE_CATALOG } from "../constants/exerciseCatalog";
import { ALL_EXERCISE_TYPE_KEYS, EXERCISE_TYPES, InputMode, MVP_EXERCISE_TYPES } from "../constants/exerciseTypes";
import { AppError } from "../utils/AppError";
import { shuffleDifferent, shuffleInPlace, tokenizeSentence } from "../utils/text";
import { MixedItem } from "./mixing.service";
import { computeSm2, SM2_DEFAULTS } from "./srs.service";
import { listSavedSentencesAsExamples, PracticeExample } from "./userSentence.service";

const OPTIONS_PER_QUESTION = 4;
const BLANK = "＿＿";

/** Phần được phép hiển thị cho người học - KHÔNG chứa đáp án (trừ dạng tự chấm/flashcard, xem `reveal`). */
export interface QuestionDisplay {
  hanzi?: string;
  pinyin?: string;
  meaning?: string;
  sentence?: string;
  sentenceMeaning?: string;
  /** Văn bản để frontend đọc bằng TTS (dạng nghe/chính tả). */
  audioText?: string;
}

export interface QuestionReveal {
  hanzi: string;
  pinyin: string;
  meaning: string;
  level: string | null;
  partOfSpeech: string | null;
  example: { hanzi: string; pinyin: string; meaning: string } | null;
  reviewCount: number;
  accuracy: number | null;
  masteryLevel: number;
  /** Khoảng cách ôn dự kiến (ngày) theo từng mức tự đánh giá của thẻ ghi nhớ. */
  preview?: { again: number; hard: number; good: number; easy: number };
}

export interface GeneratedQuestion {
  vocabularyId: string;
  exerciseId: string;
  exerciseType: string;
  inputMode: InputMode;
  prompt: string;
  display: QuestionDisplay;
  options: string[];
  /** Các mảnh đã xáo trộn (dạng SENTENCE_ORDER). */
  tokens?: string[];
  /** Câu ví dụ làm nền cho câu hỏi (bắt buộc gửi lại khi trả lời các dạng dựa trên câu). */
  exampleId?: string;
  hint?: string;
  /** Chỉ có ở dạng tự chấm (WRITING/SPEAKING/FLASHCARD): thông tin để lật thẻ/đối chiếu. */
  reveal?: QuestionReveal;
}

/** Đảm bảo catalog `exercises` có đủ các loại cần dùng (tự bù thay vì báo lỗi "chưa seed"). */
export async function ensureExercises(types: readonly string[] = ALL_EXERCISE_TYPE_KEYS): Promise<Map<string, string>> {
  const wanted = [...new Set(types)];
  let rows = await prisma.exercise.findMany({ where: { type: { in: wanted } } });
  const missing = wanted.filter((t) => !rows.some((r: { type: string }) => r.type === t));
  for (const type of missing) {
    const def = EXERCISE_CATALOG.find((e) => e.type === type);
    if (!def) throw new AppError(`Loại bài "${type}" không tồn tại trong catalog.`, 400);
    await prisma.exercise.upsert({ where: { type }, create: def, update: {} });
  }
  if (missing.length > 0) rows = await prisma.exercise.findMany({ where: { type: { in: wanted } } });
  return new Map(rows.map((r: { type: string; id: string }) => [r.type, r.id] as [string, string]));
}

export function resolveExerciseTypes(requested?: string[]): string[] {
  if (!requested || requested.length === 0) return MVP_EXERCISE_TYPES;
  const valid = requested.filter((t) => (ALL_EXERCISE_TYPE_KEYS as string[]).includes(t));
  if (valid.length === 0) throw new AppError("Danh sách loại bài tập không hợp lệ.", 400);
  return valid;
}

/**
 * Sinh câu hỏi cho từng từ trong phiên. Loại bài xoay vòng qua `exerciseTypes`.
 * Dạng cần câu ví dụ mà từ chưa có ví dụ sẽ tự hạ cấp xuống QUIZ (để `exerciseType` luôn phản ánh đúng câu hỏi).
 * Câu hỏi sinh động từ Vocabulary tại runtime; đáp án KHÔNG nằm trong response - server tự chấm (answer.service.ts).
 */
/** Các dạng bài BẮT BUỘC có câu nền (câu ví dụ / câu đã lưu có bản dịch). */
export const SENTENCE_BASED_TYPES: string[] = [
  EXERCISE_TYPES.FILL_BLANK,
  EXERCISE_TYPES.SENTENCE_ORDER,
  EXERCISE_TYPES.TRANSLATION,
  EXERCISE_TYPES.TRANSLATION_HUB,
];

export interface GenerateOptions {
  /**
   * true: từ không dựng được câu hỏi đúng loại (thiếu câu nền) bị BỎ khỏi phiên thay vì hạ cấp âm thầm xuống QUIZ.
   * Dùng khi mọi loại bài được yêu cầu đều cần câu nền (trang Điền từ / Sắp xếp / Dịch...).
   */
  strict?: boolean;
  /** Chỉ dùng câu đã lưu của user (có bản dịch) làm câu nền khi từ đó có câu như vậy; ngược lại vẫn dùng câu ví dụ của từ. */
  preferSaved?: boolean;
}

export async function generateQuestionsForItems(
  items: MixedItem[],
  exerciseTypes: string[] = MVP_EXERCISE_TYPES,
  options: GenerateOptions = {}
): Promise<GeneratedQuestion[]> {
  if (items.length === 0) return [];

  const typePlan = items.map((_, i) => exerciseTypes[i % exerciseTypes.length]);
  const exerciseIds = await ensureExercises([...new Set([...typePlan, EXERCISE_TYPES.QUIZ])]);

  const sessionIds = items.map((i) => i.vocabulary.id);
  // Câu đã lưu của CHÍNH user (items đều thuộc cùng 1 user) cũng được dùng làm câu nền, cùng với câu ví dụ của từ.
  const [examples, saved, extraVocab, extraExamples] = await Promise.all([
    prisma.vocabularyExample.findMany({ where: { vocabularyId: { in: sessionIds } } }),
    listSavedSentencesAsExamples(items[0].userId, sessionIds),
    prisma.vocabulary.findMany({ where: { id: { notIn: sessionIds } }, take: 40 }),
    prisma.vocabularyExample.findMany({ where: { vocabularyId: { notIn: sessionIds } }, take: 40 }),
  ]);

  const examplesByVocab = new Map<string, PracticeExample[]>();
  const addExample = (vocabularyId: string, ex: PracticeExample) => {
    const list = examplesByVocab.get(vocabularyId) ?? [];
    list.push(ex);
    examplesByVocab.set(vocabularyId, list);
  };
  const savedVocabIds = new Set(saved.map((s) => s.vocabularyId));
  for (const ex of examples) {
    if (options.preferSaved && savedVocabIds.has(ex.vocabularyId)) continue;
    addExample(ex.vocabularyId, ex);
  }
  for (const ex of saved) addExample(ex.vocabularyId, ex);

  const vocabPool: Vocabulary[] = [...items.map((i) => i.vocabulary), ...extraVocab];
  const examplePool: PracticeExample[] = [...examples, ...saved, ...extraExamples];
  const knownWords = vocabPool.map((v) => v.hanzi);

  const generated = items.map((item, index): GeneratedQuestion | null => {
    const requestedType = typePlan[index];
    const vocabulary = item.vocabulary;
    const ownExamples = examplesByVocab.get(vocabulary.id) ?? [];
    const example = ownExamples.length > 0 ? ownExamples[Math.floor(Math.random() * ownExamples.length)] : undefined;

    const ctx: BuildContext = { item, vocabulary, example, vocabPool, examplePool, knownWords };
    let built = buildQuestion(requestedType, ctx);
    let finalType = requestedType;
    if (!built) {
      if (options.strict) return null;
      finalType = EXERCISE_TYPES.QUIZ;
      built = buildQuestion(EXERCISE_TYPES.QUIZ, ctx)!;
    }
    return {
      vocabularyId: vocabulary.id,
      exerciseId: exerciseIds.get(finalType)!,
      exerciseType: finalType,
      ...built,
    };
  });
  return generated.filter((q): q is GeneratedQuestion => q !== null);
}

interface BuildContext {
  item: MixedItem;
  vocabulary: Vocabulary;
  example?: PracticeExample;
  vocabPool: Vocabulary[];
  examplePool: PracticeExample[];
  knownWords: string[];
}

type BuiltQuestion = Omit<GeneratedQuestion, "vocabularyId" | "exerciseId" | "exerciseType">;

function buildQuestion(type: string, ctx: BuildContext): BuiltQuestion | null {
  const { vocabulary: v, example } = ctx;

  switch (type) {
    case EXERCISE_TYPES.QUIZ:
      return {
        inputMode: "choice",
        prompt: "Từ này có nghĩa là gì?",
        display: { hanzi: v.hanzi, pinyin: v.pinyin },
        options: choiceOptions(ctx, "meaning"),
      };

    case EXERCISE_TYPES.REVERSE_QUIZ:
      return {
        inputMode: "choice",
        prompt: "Chọn chữ Hán đúng với nghĩa sau:",
        display: { meaning: v.meaning },
        hint: v.pinyin,
        options: choiceOptions(ctx, "hanzi"),
      };

    case EXERCISE_TYPES.PINYIN:
      return {
        inputMode: "choice",
        prompt: "Pinyin của từ này là gì?",
        display: { hanzi: v.hanzi, meaning: v.meaning },
        options: choiceOptions(ctx, "pinyin"),
      };

    case EXERCISE_TYPES.LISTENING:
      return {
        inputMode: "choice",
        prompt: "Nghe và chọn chữ Hán đúng:",
        display: { audioText: v.hanzi },
        hint: v.meaning,
        options: choiceOptions(ctx, "hanzi"),
      };

    case EXERCISE_TYPES.DICTATION:
      return {
        inputMode: "text",
        prompt: "Nghe và gõ lại chữ Hán (hoặc Pinyin):",
        display: { audioText: v.hanzi },
        hint: v.meaning,
        options: [],
      };

    case EXERCISE_TYPES.FILL_BLANK: {
      if (!example || !example.sentenceHanzi.includes(v.hanzi)) return null;
      const options = choiceOptions(ctx, "hanzi");
      return {
        inputMode: "choice",
        prompt: "Điền từ còn thiếu vào chỗ trống:",
        display: { sentence: example.sentenceHanzi.replace(v.hanzi, BLANK), sentenceMeaning: example.sentenceMeaning },
        exampleId: example.id,
        options,
      };
    }

    case EXERCISE_TYPES.SENTENCE_ORDER: {
      if (!example) return null;
      const tokens = tokenizeSentence(example.sentenceHanzi, ctx.knownWords);
      if (tokens.length < 2) return null;
      return {
        inputMode: "order",
        prompt: "Sắp xếp các mảnh thành câu đúng:",
        display: { sentenceMeaning: example.sentenceMeaning },
        exampleId: example.id,
        tokens: shuffleDifferent(tokens),
        options: [],
      };
    }

    case EXERCISE_TYPES.TRANSLATION: {
      if (!example) return null;
      const distractors = pickDistinct(
        ctx.examplePool.filter((e) => e.id !== example.id).map((e) => e.sentenceMeaning),
        example.sentenceMeaning,
        OPTIONS_PER_QUESTION - 1
      );
      if (distractors.length === 0) return null;
      return {
        inputMode: "choice",
        prompt: "Chọn bản dịch tiếng Việt đúng của câu:",
        display: { sentence: example.sentenceHanzi, pinyin: example.sentencePinyin },
        exampleId: example.id,
        options: shuffleInPlace([example.sentenceMeaning, ...distractors]),
      };
    }

    case EXERCISE_TYPES.TRANSLATION_HUB: {
      if (!example) return null;
      return {
        inputMode: "text",
        prompt: "Dịch câu sau sang tiếng Trung:",
        display: { sentenceMeaning: example.sentenceMeaning },
        hint: v.hanzi,
        exampleId: example.id,
        options: [],
      };
    }

    case EXERCISE_TYPES.SENTENCE_CREATION:
    case EXERCISE_TYPES.SENTENCE:
      return {
        inputMode: "text",
        prompt: "Đặt một câu hoàn chỉnh có chứa từ sau:",
        display: { hanzi: v.hanzi, pinyin: v.pinyin, meaning: v.meaning },
        exampleId: example?.id,
        options: [],
      };

    case EXERCISE_TYPES.WRITING:
      return {
        inputMode: "self",
        prompt: "Viết chữ Hán cho nghĩa sau, rồi lật xem đáp án và tự đánh giá:",
        display: { meaning: v.meaning, pinyin: v.pinyin },
        options: [],
        reveal: buildReveal(ctx),
      };

    case EXERCISE_TYPES.SPEAKING:
      return {
        inputMode: "self",
        prompt: "Đọc to từ sau và tự đánh giá phát âm của bạn:",
        display: { hanzi: v.hanzi, pinyin: v.pinyin, meaning: v.meaning, audioText: v.hanzi },
        options: [],
        reveal: buildReveal(ctx),
      };

    case EXERCISE_TYPES.FLASHCARD:
      return {
        inputMode: "flashcard",
        prompt: "Bạn còn nhớ từ này không?",
        display: { hanzi: v.hanzi, pinyin: v.pinyin, audioText: v.hanzi },
        options: [],
        reveal: buildReveal(ctx, true),
      };

    default:
      return null;
  }
}

function buildReveal(ctx: BuildContext, withPreview = false): QuestionReveal {
  const { item, vocabulary: v, example } = ctx;
  const total = item.correctCount + item.incorrectCount;
  return {
    hanzi: v.hanzi,
    pinyin: v.pinyin,
    meaning: v.meaning,
    level: v.level,
    partOfSpeech: v.partOfSpeech,
    example: example ? { hanzi: example.sentenceHanzi, pinyin: example.sentencePinyin, meaning: example.sentenceMeaning } : null,
    reviewCount: item.reviewCount,
    accuracy: total > 0 ? Math.round((item.correctCount / total) * 100) : null,
    masteryLevel: item.masteryLevel,
    ...(withPreview ? { preview: previewIntervals(item) } : {}),
  };
}

/**
 * Dự báo khoảng cách ôn (ngày) cho 4 nút đánh giá, dựa trên trạng thái SM-2 hiện tại của từ.
 * Dùng xấp xỉ: nếu từ đã từng ôn thì lấy interval/ease mặc định theo mức thuần thục (không truy vấn thêm DB).
 */
function previewIntervals(item: MixedItem) {
  const repetition = Math.min(item.masteryLevel, 5);
  const state = {
    repetition,
    previousInterval: repetition === 0 ? SM2_DEFAULTS.interval : Math.max(1, estimateInterval(repetition)),
    previousEaseFactor: SM2_DEFAULTS.easeFactor,
  };
  return {
    again: computeSm2(state, 1).newInterval,
    hard: computeSm2(state, 3).newInterval,
    good: computeSm2(state, 4).newInterval,
    easy: computeSm2(state, 5).newInterval,
  };
}

function estimateInterval(repetition: number): number {
  if (repetition <= 1) return 1;
  if (repetition === 2) return 6;
  return Math.round(6 * Math.pow(2.5, repetition - 2));
}

function choiceOptions(ctx: BuildContext, field: "meaning" | "hanzi" | "pinyin"): string[] {
  const correct = String(ctx.vocabulary[field]);
  const candidates = ctx.vocabPool.filter((v) => v.id !== ctx.vocabulary.id).map((v) => String(v[field]));
  return shuffleInPlace([correct, ...pickDistinct(candidates, correct, OPTIONS_PER_QUESTION - 1)]);
}

function pickDistinct(candidates: string[], exclude: string, count: number): string[] {
  const unique = candidates.filter((value, idx, arr) => value !== exclude && arr.indexOf(value) === idx);
  return shuffleInPlace(unique).slice(0, count);
}
