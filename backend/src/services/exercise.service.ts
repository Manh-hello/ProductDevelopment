import { Vocabulary } from "@prisma/client";
import { prisma } from "../config/prisma";
import { MVP_EXERCISE_TYPES } from "../constants/exerciseTypes";
import { MixedItem } from "./mixing.service";
import { AppError } from "../utils/AppError";

const OPTIONS_PER_QUESTION = 4;

export interface GeneratedQuestion {
  vocabularyId: string;
  exerciseId: string;
  exerciseType: string;
  hanzi: string;
  prompt: string;
  options: string[];
}

/**
 * Sinh câu hỏi trắc nghiệm cho từng từ trong phiên luyện tập.
 * Loại bài xoay vòng (round-robin) qua 3 dạng MVP. Câu hỏi vẫn được sinh
 * ĐỘNG từ Vocabulary tại runtime (không phải chọn từ ngân hàng câu hỏi có
 * sẵn) — `exerciseId` chỉ tham chiếu tới LOẠI bài trong bảng `exercises`
 * (catalog cố định 7 dòng, xem prisma/seed.ts), không phải 1 câu hỏi cụ thể.
 *
 * KHÔNG trả về đáp án đúng trong response — client chỉ nhận options, server
 * tự so khớp khi nhận câu trả lời (xem practice.service.ts).
 */
export async function generateQuestionsForItems(items: MixedItem[]): Promise<GeneratedQuestion[]> {
  if (items.length === 0) return [];

  const exercises = await prisma.exercise.findMany({ where: { type: { in: MVP_EXERCISE_TYPES } } });
  const exerciseByType = new Map<string, { type: string; id: string }>(
    exercises.map((e: { type: string; id: string }) => [e.type, e] as [string, { type: string; id: string }])
  );

  for (const type of MVP_EXERCISE_TYPES) {
    if (!exerciseByType.has(type)) {
      throw new AppError(
        `Chưa seed catalog exercise cho loại "${type}". Chạy lại "npm run prisma:seed".`,
        500
      );
    }
  }

  const poolFromSession = items.map((i) => i.vocabulary);
  const extraPool = await prisma.vocabulary.findMany({
    where: { id: { notIn: poolFromSession.map((v: Vocabulary) => v.id) } },
    take: 30,
  });
  const distractorPool = [...poolFromSession, ...extraPool];

  return items.map((item, index) => {
    const exerciseType = MVP_EXERCISE_TYPES[index % MVP_EXERCISE_TYPES.length];
    const exercise = exerciseByType.get(exerciseType)!;
    return buildQuestion(item.vocabulary, exercise.id, exerciseType, distractorPool);
  });
}

function buildQuestion(
  vocabulary: Vocabulary,
  exerciseId: string,
  exerciseType: string,
  pool: Vocabulary[]
): GeneratedQuestion {
  const field: keyof Vocabulary =
    exerciseType === "QUIZ" ? "meaning" : exerciseType === "REVERSE_QUIZ" ? "hanzi" : "pinyin";

  const correctValue = String(vocabulary[field]);
  const distractors = pickDistractors(pool, vocabulary.id, field, correctValue, OPTIONS_PER_QUESTION - 1);
  const options = shuffleInPlace([correctValue, ...distractors]);

  const prompt =
    exerciseType === "QUIZ"
      ? "Từ này có nghĩa là gì?"
      : exerciseType === "REVERSE_QUIZ"
        ? `"${vocabulary.meaning}" viết bằng chữ Hán là gì?`
        : "Pinyin của từ này là gì?";

  return {
    vocabularyId: vocabulary.id,
    exerciseId,
    exerciseType,
    hanzi: vocabulary.hanzi,
    prompt,
    options,
  };
}

function pickDistractors(
  pool: Vocabulary[],
  excludeId: string,
  field: keyof Vocabulary,
  excludeValue: string,
  count: number
): string[] {
  const candidates = pool
    .filter((v) => v.id !== excludeId)
    .map((v) => String(v[field]))
    .filter((value, idx, arr) => value !== excludeValue && arr.indexOf(value) === idx);

  shuffleInPlace(candidates);
  return candidates.slice(0, count);
}

function shuffleInPlace<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
