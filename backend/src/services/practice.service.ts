import { prisma } from "../config/prisma";
import { AppError } from "../utils/AppError";
import { DEFAULT_XP_PER_CORRECT_ANSWER, XP_DAILY_REVIEW_COMPLETION_BONUS, XP_PER_CORRECT_ANSWER } from "../constants/xp";
import { buildDailyReviewSession, buildMixedSession } from "./mixing.service";
import { generateQuestionsForItems } from "./exercise.service";
import { computeSm2, isCorrectToQuality, SM2_DEFAULTS } from "./srs.service";
import { maybeUnlockAchievements } from "./achievement.service";

const FIELD_BY_EXERCISE_TYPE: Record<string, "meaning" | "hanzi" | "pinyin"> = {
  QUIZ: "meaning",
  REVERSE_QUIZ: "hanzi",
  PINYIN: "pinyin",
  LISTENING: "meaning",
  WRITING: "hanzi",
  SENTENCE: "meaning",
  SPEAKING: "pinyin",
};

const MASTERED_REPETITION_THRESHOLD = 5;

export async function startSession(userId: string, sessionType: "mixed" | "daily_review" | "practice", sessionSize?: number) {
  const composition =
    sessionType === "daily_review"
      ? await buildDailyReviewSession(userId, sessionSize)
      : await buildMixedSession(userId, sessionSize);

  if (composition.items.length === 0) {
    throw new AppError(
      "Chưa có từ vựng nào để luyện tập. Hãy thêm từ vào danh sách học trước.",
      400
    );
  }

  const questions = await generateQuestionsForItems(composition.items);

  const session = await prisma.studySession.create({
    data: {
      userId,
      sessionType,
      totalQuestions: questions.length,
    },
  });

  return { sessionId: session.id, sessionType: session.sessionType, questions };
}

export interface SubmitAnswerInput {
  vocabularyId: string;
  exerciseId: string;
  exerciseType: string;
  selectedAnswer: string;
  responseTimeMs?: number;
}

export async function submitAnswer(userId: string, sessionId: string, input: SubmitAnswerInput) {
  const session = await prisma.studySession.findFirst({ where: { id: sessionId, userId } });
  if (!session) {
    throw new AppError("Không tìm thấy phiên luyện tập.", 404);
  }

  const vocabulary = await prisma.vocabulary.findUnique({ where: { id: input.vocabularyId } });
  if (!vocabulary) {
    throw new AppError("Không tìm thấy từ vựng.", 404);
  }

  const field = FIELD_BY_EXERCISE_TYPE[input.exerciseType];
  if (!field) {
    throw new AppError(`Loại bài "${input.exerciseType}" không hợp lệ.`, 400);
  }
  const correctAnswer = vocabulary[field];
  const isCorrect = normalize(input.selectedAnswer) === normalize(String(correctAnswer));
  const xpAwarded = isCorrect ? (XP_PER_CORRECT_ANSWER[input.exerciseType] ?? DEFAULT_XP_PER_CORRECT_ANSWER) : 0;

  const userVocabulary = await prisma.userVocabulary.findUnique({
    where: { userId_vocabularyId: { userId, vocabularyId: input.vocabularyId } },
  });
  if (!userVocabulary) {
    throw new AppError("Từ này chưa có trong danh sách học của bạn.", 400);
  }

  const isFirstReview = userVocabulary.reviewCount === 0;

  const lastReview = await prisma.srsReview.findFirst({
    where: { userVocabularyId: userVocabulary.id },
    orderBy: { reviewedAt: "desc" },
  });

  const sm2State = lastReview
    ? {
        repetition: Math.min(userVocabulary.masteryLevel, MASTERED_REPETITION_THRESHOLD),
        previousInterval: lastReview.newInterval,
        previousEaseFactor: lastReview.newEaseFactor,
      }
    : { repetition: 0, previousInterval: SM2_DEFAULTS.interval, previousEaseFactor: SM2_DEFAULTS.easeFactor };

  const quality = isCorrectToQuality(isCorrect);
  const sm2Result = computeSm2(sm2State, quality);

  const nextMasteryLevel = sm2Result.isRecall
    ? Math.min(MASTERED_REPETITION_THRESHOLD, userVocabulary.masteryLevel + 1)
    : Math.max(0, userVocabulary.masteryLevel - 1);
  const nextStatus =
    nextMasteryLevel >= MASTERED_REPETITION_THRESHOLD ? "mastered" : "learning";

  const now = new Date();

  const [attempt] = await prisma.$transaction([
    prisma.exerciseAttempt.create({
      data: {
        sessionId,
        exerciseId: input.exerciseId,
        vocabularyId: input.vocabularyId,
        userAnswer: input.selectedAnswer,
        isCorrect,
        responseTimeMs: input.responseTimeMs,
      },
    }),
    prisma.srsReview.create({
      data: {
        userVocabularyId: userVocabulary.id,
        quality,
        previousInterval: sm2State.previousInterval,
        newInterval: sm2Result.newInterval,
        previousEaseFactor: sm2State.previousEaseFactor,
        newEaseFactor: sm2Result.newEaseFactor,
        nextReviewAt: sm2Result.nextReviewAt,
      },
    }),
    prisma.userVocabulary.update({
      where: { id: userVocabulary.id },
      data: {
        status: nextStatus,
        masteryLevel: nextMasteryLevel,
        reviewCount: { increment: 1 },
        correctCount: isCorrect ? { increment: 1 } : undefined,
        incorrectCount: isCorrect ? undefined : { increment: 1 },
        lastReviewedAt: now,
        nextReviewAt: sm2Result.nextReviewAt,
        learnedAt: isFirstReview ? now : undefined,
      },
    }),
    prisma.studySession.update({
      where: { id: sessionId },
      data: {
        correctAnswers: isCorrect ? { increment: 1 } : undefined,
        xpEarned: xpAwarded > 0 ? { increment: xpAwarded } : undefined,
      },
    }),
    ...(xpAwarded > 0
      ? [
          prisma.xpTransaction.create({
            data: { userId, amount: xpAwarded, source: "exercise_correct" },
          }),
          prisma.user.update({ where: { id: userId }, data: { totalXp: { increment: xpAwarded } } }),
        ]
      : []),
  ]);

  await updateStreakAndDailyStats(userId, { isCorrect, xpAwarded, isFirstReview });
  await maybeUnlockAchievements(userId);

  return {
    attemptId: attempt.id,
    isCorrect,
    correctAnswer,
    xpAwarded,
    nextReviewAt: sm2Result.nextReviewAt,
    masteryLevel: nextMasteryLevel,
    status: nextStatus,
  };
}

export async function completeSession(userId: string, sessionId: string) {
  const session = await prisma.studySession.findFirst({ where: { id: sessionId, userId } });
  if (!session) {
    throw new AppError("Không tìm thấy phiên luyện tập.", 404);
  }
  if (session.completedAt) {
    throw new AppError("Phiên luyện tập này đã hoàn thành trước đó.", 409);
  }

  const bonus = session.sessionType === "daily_review" ? XP_DAILY_REVIEW_COMPLETION_BONUS : 0;

  const [updatedSession] = await prisma.$transaction([
    prisma.studySession.update({
      where: { id: sessionId },
      data: { completedAt: new Date(), xpEarned: bonus > 0 ? { increment: bonus } : undefined },
    }),
    ...(bonus > 0
      ? [
          prisma.xpTransaction.create({
            data: { userId, amount: bonus, source: "daily_review_bonus", referenceId: sessionId },
          }),
          prisma.user.update({ where: { id: userId }, data: { totalXp: { increment: bonus } } }),
        ]
      : []),
  ]);

  return {
    sessionId: updatedSession.id,
    totalQuestions: updatedSession.totalQuestions,
    correctAnswers: updatedSession.correctAnswers,
    xpEarned: updatedSession.xpEarned,
    completionBonus: bonus,
  };
}

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

/**
 * Cập nhật streak + daily_statistics sau mỗi câu trả lời.
 *
 * Schema mới KHÔNG có `users.last_active_date` như thiết kế cũ — streak
 * được suy ra từ chính bảng `daily_statistics` (đã có UNIQUE(user_id,
 * statistic_date)): nếu hôm nay CHƯA có dòng nào cho user này, đây là lần
 * hoạt động đầu tiên trong ngày -> kiểm tra hôm qua có dòng không để quyết
 * định nối chuỗi hay reset.
 */
async function updateStreakAndDailyStats(
  userId: string,
  info: { isCorrect: boolean; xpAwarded: number; isFirstReview: boolean }
): Promise<void> {
  const today = startOfDay(new Date());
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);

  const todayStat = await prisma.dailyStatistic.findUnique({
    where: { userId_statisticDate: { userId, statisticDate: today } },
  });

  if (!todayStat) {
    const yesterdayStat = await prisma.dailyStatistic.findUnique({
      where: { userId_statisticDate: { userId, statisticDate: yesterday } },
    });
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user) {
      const nextStreak = yesterdayStat ? user.currentStreak + 1 : 1;
      await prisma.user.update({
        where: { id: userId },
        data: { currentStreak: nextStreak, longestStreak: Math.max(user.longestStreak, nextStreak) },
      });
    }
  }

  await prisma.dailyStatistic.upsert({
    where: { userId_statisticDate: { userId, statisticDate: today } },
    create: {
      userId,
      statisticDate: today,
      wordsReviewed: 1,
      wordsLearned: info.isFirstReview ? 1 : 0,
      correctAnswers: info.isCorrect ? 1 : 0,
      incorrectAnswers: info.isCorrect ? 0 : 1,
      xpEarned: info.xpAwarded,
    },
    update: {
      wordsReviewed: { increment: 1 },
      wordsLearned: info.isFirstReview ? { increment: 1 } : undefined,
      correctAnswers: info.isCorrect ? { increment: 1 } : undefined,
      incorrectAnswers: info.isCorrect ? undefined : { increment: 1 },
      xpEarned: { increment: info.xpAwarded },
    },
  });
}

function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setUTCHours(0, 0, 0, 0);
  return d;
}
