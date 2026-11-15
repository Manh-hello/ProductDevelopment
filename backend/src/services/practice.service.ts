import { prisma } from "../config/prisma";
import { AppError } from "../utils/AppError";
import { DEFAULT_XP_PER_CORRECT_ANSWER, XP_DAILY_REVIEW_COMPLETION_BONUS, XP_PER_CORRECT_ANSWER } from "../constants/xp";
import { addDays, startOfDay } from "../utils/dates";
import { buildDailyReviewSession, buildMixedSession, buildSavedSentenceSession, buildScopedSession } from "./mixing.service";
import { ensureExercises, generateQuestionsForItems, resolveExerciseTypes } from "./exercise.service";
import { computeSm2, SM2_DEFAULTS } from "./srs.service";
import { evaluateAnswer } from "./answer.service";
import { maybeUnlockAchievements } from "./achievement.service";
import { createNotification } from "./notification.service";
import { StartSessionInput, SubmitAnswerInput } from "../validators/practice.validator";
import { findPracticeExample } from "./userSentence.service";

const MASTERED_REPETITION_THRESHOLD = 5;
/** Thời gian ước lượng cho 1 câu khi client không gửi responseTimeMs (dùng để tính phút học). */
const FALLBACK_ATTEMPT_MS = 15_000;
const MAX_ATTEMPT_MS = 120_000;

export async function startSession(userId: string, input: Pick<StartSessionInput, "sessionType" | "sessionSize" | "exerciseTypes" | "sentenceSource" | "scope">) {
  const { sessionType, sessionSize } = input;
  const exerciseTypes = resolveExerciseTypes(input.exerciseTypes);
  const fromSaved = input.sentenceSource === "saved";

  const hasScope = Boolean(input.scope && (input.scope.level || input.scope.topic || input.scope.band));

  const composition = fromSaved
    ? await buildSavedSentenceSession(userId, sessionSize)
    : hasScope
      ? await buildScopedSession(userId, input.scope!, sessionSize)
      : sessionType === "daily_review"
      ? await buildDailyReviewSession(userId, sessionSize)
      : await buildMixedSession(userId, sessionSize);

  if (composition.items.length === 0) {
    throw new AppError(
      fromSaved
        ? "Bạn chưa lưu câu nào có bản dịch để luyện tập. Hãy tạo và lưu câu ở mục Luyện Câu trước."
        : hasScope
          ? "Bạn chưa có từ nào thuộc bộ này trong danh sách học. Hãy bấm \"Học bộ này\" ở Thư viện từ vựng trước."
          : "Chưa có từ vựng nào để luyện tập. Hãy thêm từ vào danh sách học trước.",
      400
    );
  }

  const questions = await generateQuestionsForItems(composition.items, exerciseTypes, { preferSaved: fromSaved });

  const session = await prisma.studySession.create({
    data: { userId, sessionType, totalQuestions: questions.length },
  });

  return {
    sessionId: session.id,
    sessionType: session.sessionType,
    composition: {
      newWords: composition.newWordsCount,
      dueWords: composition.dueWordsCount,
      weakWords: composition.weakWordsCount,
    },
    questions,
  };
}

export async function submitAnswer(userId: string, sessionId: string, input: SubmitAnswerInput) {
  const session = await prisma.studySession.findFirst({ where: { id: sessionId, userId } });
  if (!session) throw new AppError("Không tìm thấy phiên luyện tập.", 404);
  if (session.completedAt) throw new AppError("Phiên luyện tập này đã hoàn thành.", 409);

  const vocabulary = await prisma.vocabulary.findUnique({ where: { id: input.vocabularyId } });
  if (!vocabulary) throw new AppError("Không tìm thấy từ vựng.", 404);

  const userVocabulary = await prisma.userVocabulary.findUnique({
    where: { userId_vocabularyId: { userId, vocabularyId: input.vocabularyId } },
  });
  if (!userVocabulary) throw new AppError("Từ này chưa có trong danh sách học của bạn.", 400);

  const alreadyAnswered = await prisma.exerciseAttempt.findFirst({
    where: { sessionId, vocabularyId: input.vocabularyId },
    select: { id: true },
  });
  if (alreadyAnswered) throw new AppError("Câu hỏi này đã được trả lời trong phiên.", 409);

  const example = input.exampleId ? await findPracticeExample(userId, input.vocabularyId, input.exampleId) : null;

  const evaluation = evaluateAnswer({
    exerciseType: input.exerciseType,
    vocabulary,
    example,
    selectedAnswer: input.selectedAnswer,
    quality: input.quality,
  });
  const { isCorrect, quality } = evaluation;

  const exerciseId = (await ensureExercises([input.exerciseType])).get(input.exerciseType)!;
  const xpAwarded = isCorrect ? (XP_PER_CORRECT_ANSWER[input.exerciseType] ?? DEFAULT_XP_PER_CORRECT_ANSWER) : 0;

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
  const sm2Result = computeSm2(sm2State, quality);

  const nextMasteryLevel = sm2Result.isRecall
    ? Math.min(MASTERED_REPETITION_THRESHOLD, userVocabulary.masteryLevel + 1)
    : Math.max(0, userVocabulary.masteryLevel - 1);
  const nextStatus = nextMasteryLevel >= MASTERED_REPETITION_THRESHOLD ? "mastered" : "learning";
  const now = new Date();
  const typedSentence = (input.selectedAnswer ?? "").trim();
  const savesSentence = (input.exerciseType === "SENTENCE_CREATION" || input.exerciseType === "SENTENCE") && typedSentence.length > 0;

  const [attempt] = await prisma.$transaction([
    prisma.exerciseAttempt.create({
      data: {
        sessionId,
        exerciseId,
        vocabularyId: input.vocabularyId,
        userAnswer: (typedSentence || `quality:${quality}`).slice(0, 500),
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
          prisma.xpTransaction.create({ data: { userId, amount: xpAwarded, source: "exercise_correct" } }),
          prisma.user.update({ where: { id: userId }, data: { totalXp: { increment: xpAwarded } } }),
        ]
      : []),
    ...(savesSentence
      ? [
          prisma.userSentence.create({
            data: { userId, vocabularyId: input.vocabularyId, sentence: typedSentence.slice(0, 2000) },
          }),
        ]
      : []),
  ]);

  const streak = await updateStreakAndDailyStats(userId, { isCorrect, xpAwarded, isFirstReview });
  const newAchievements = await maybeUnlockAchievements(userId);

  return {
    attemptId: attempt.id,
    isCorrect,
    correctAnswer: evaluation.correctAnswer,
    feedback: evaluation.feedback ?? null,
    xpAwarded,
    quality,
    intervalDays: sm2Result.newInterval,
    nextReviewAt: sm2Result.nextReviewAt,
    masteryLevel: nextMasteryLevel,
    status: nextStatus,
    currentStreak: streak,
    newAchievements,
  };
}

export async function completeSession(userId: string, sessionId: string) {
  const session = await prisma.studySession.findFirst({ where: { id: sessionId, userId } });
  if (!session) throw new AppError("Không tìm thấy phiên luyện tập.", 404);
  if (session.completedAt) throw new AppError("Phiên luyện tập này đã hoàn thành trước đó.", 409);

  const attempts = await prisma.exerciseAttempt.findMany({
    where: { sessionId },
    select: { isCorrect: true, responseTimeMs: true },
  });
  const answered = attempts.length;
  const correct = attempts.filter((a: { isCorrect: boolean }) => a.isCorrect).length;
  const durationMs = attempts.reduce(
    (sum: number, a: { responseTimeMs: number | null }) => sum + Math.min(a.responseTimeMs ?? FALLBACK_ATTEMPT_MS, MAX_ATTEMPT_MS),
    0
  );
  const studyMinutes = answered > 0 ? Math.max(1, Math.round(durationMs / 60_000)) : 0;

  const bonus = session.sessionType === "daily_review" && answered > 0 ? XP_DAILY_REVIEW_COMPLETION_BONUS : 0;
  const today = startOfDay(new Date());

  const [updatedSession] = await prisma.$transaction([
    prisma.studySession.update({
      where: { id: sessionId },
      data: { completedAt: new Date(), xpEarned: bonus > 0 ? { increment: bonus } : undefined },
    }),
    prisma.dailyStatistic.upsert({
      where: { userId_statisticDate: { userId, statisticDate: today } },
      create: { userId, statisticDate: today, studyMinutes, xpEarned: bonus },
      update: { studyMinutes: { increment: studyMinutes }, xpEarned: bonus > 0 ? { increment: bonus } : undefined },
    }),
    ...(bonus > 0
      ? [
          prisma.xpTransaction.create({ data: { userId, amount: bonus, source: "daily_review_bonus", referenceId: sessionId } }),
          prisma.user.update({ where: { id: userId }, data: { totalXp: { increment: bonus } } }),
        ]
      : []),
  ]);

  const accuracy = answered > 0 ? Math.round((correct / answered) * 100) : null;
  if (answered > 0) {
    await createNotification(userId, {
      category: "system",
      title: `Hoàn thành phiên luyện tập: ${correct}/${answered} câu đúng`,
      body: `Độ chính xác ${accuracy}%, nhận +${updatedSession.xpEarned} XP.`,
      link: `/practice/result?session=${sessionId}`,
    });
  }
  const newAchievements = await maybeUnlockAchievements(userId);

  return {
    sessionId: updatedSession.id,
    sessionType: updatedSession.sessionType,
    totalQuestions: updatedSession.totalQuestions,
    answeredQuestions: answered,
    correctAnswers: correct,
    accuracy,
    xpEarned: updatedSession.xpEarned,
    completionBonus: bonus,
    durationSeconds: Math.round(durationMs / 1000),
    newAchievements,
  };
}

/** Chi tiết một phiên (trang kết quả luyện tập / hoàn tất ôn tập). */
export async function getSessionSummary(userId: string, sessionId: string) {
  const session = await prisma.studySession.findFirst({ where: { id: sessionId, userId } });
  if (!session) throw new AppError("Không tìm thấy phiên luyện tập.", 404);

  const attempts = await prisma.exerciseAttempt.findMany({
    where: { sessionId },
    include: { exercise: { select: { type: true } }, vocabulary: true },
    orderBy: { createdAt: "asc" },
  });
  const vocabIds = [...new Set(attempts.map((a: { vocabularyId: string }) => a.vocabularyId))] as string[];

  const [userVocabs, user, statusGroups, sessionNumber] = await Promise.all([
    prisma.userVocabulary.findMany({ where: { userId, vocabularyId: { in: vocabIds } } }),
    prisma.user.findUnique({ where: { id: userId }, select: { currentStreak: true, longestStreak: true, totalXp: true } }),
    prisma.userVocabulary.groupBy({ by: ["status"], where: { userId }, _count: { _all: true } }),
    prisma.studySession.count({ where: { userId, startedAt: { lte: session.startedAt } } }),
  ]);
  const uvByVocab = new Map<string, { incorrectCount: number; status: string; masteryLevel: number; nextReviewAt: Date | null }>(
    userVocabs.map((u: { vocabularyId: string; incorrectCount: number; status: string; masteryLevel: number; nextReviewAt: Date | null }) => [u.vocabularyId, u] as [string, typeof u])
  );

  type Attempt = (typeof attempts)[number];
  const rows = attempts.map((a: Attempt) => ({
    vocabularyId: a.vocabularyId,
    exerciseType: a.exercise.type,
    hanzi: a.vocabulary.hanzi,
    pinyin: a.vocabulary.pinyin,
    meaning: a.vocabulary.meaning,
    userAnswer: a.userAnswer,
    isCorrect: a.isCorrect,
    responseTimeMs: a.responseTimeMs,
  }));

  const answered = rows.length;
  const correct = rows.filter((r: { isCorrect: boolean }) => r.isCorrect).length;
  const timed = rows.filter((r: { responseTimeMs: number | null }) => r.responseTimeMs != null) as { responseTimeMs: number }[];
  const durationMs = attempts.reduce(
    (sum: number, a: Attempt) => sum + Math.min(a.responseTimeMs ?? FALLBACK_ATTEMPT_MS, MAX_ATTEMPT_MS),
    0
  );

  const wrongWords = rows
    .filter((r: { isCorrect: boolean }) => !r.isCorrect)
    .map((r: (typeof rows)[number]) => ({
      vocabularyId: r.vocabularyId,
      hanzi: r.hanzi,
      pinyin: r.pinyin,
      meaning: r.meaning,
      exerciseType: r.exerciseType,
      incorrectCount: uvByVocab.get(r.vocabularyId)?.incorrectCount ?? 1,
    }));

  const promoted = vocabIds
    .filter((id) => uvByVocab.get(id)?.status === "mastered")
    .map((id) => {
      const v = attempts.find((a: Attempt) => a.vocabularyId === id)!.vocabulary;
      return { vocabularyId: id, hanzi: v.hanzi, pinyin: v.pinyin };
    });

  const distribution: Record<string, number> = { new: 0, learning: 0, mastered: 0 };
  for (const g of statusGroups as { status: string; _count: { _all: number } }[]) distribution[g.status] = g._count._all;

  return {
    session: {
      id: session.id,
      sessionType: session.sessionType,
      sessionNumber,
      totalQuestions: session.totalQuestions,
      correctAnswers: session.correctAnswers,
      xpEarned: session.xpEarned,
      startedAt: session.startedAt,
      completedAt: session.completedAt,
    },
    stats: {
      answered,
      correct,
      incorrect: answered - correct,
      accuracy: answered > 0 ? Math.round((correct / answered) * 1000) / 10 : null,
      avgResponseMs: timed.length > 0 ? Math.round(timed.reduce((s, r) => s + r.responseTimeMs, 0) / timed.length) : null,
      durationSeconds: Math.round(durationMs / 1000),
    },
    attempts: rows,
    wrongWords,
    promoted,
    user: user ?? { currentStreak: 0, longestStreak: 0, totalXp: 0 },
    distribution: { ...distribution, total: distribution.new + distribution.learning + distribution.mastered },
  };
}

export async function listSessions(userId: string, limit: number) {
  return prisma.studySession.findMany({ where: { userId }, orderBy: { startedAt: "desc" }, take: limit });
}

/**
 * Cập nhật streak + daily_statistics sau mỗi câu trả lời. Trả về streak hiện tại.
 * Streak suy ra từ `daily_statistics`: hôm nay chưa có dòng → hôm qua có thì nối chuỗi, không thì reset về 1.
 */
async function updateStreakAndDailyStats(
  userId: string,
  info: { isCorrect: boolean; xpAwarded: number; isFirstReview: boolean }
): Promise<number> {
  const today = startOfDay(new Date());
  const yesterday = addDays(today, -1);

  const todayStat = await prisma.dailyStatistic.findUnique({
    where: { userId_statisticDate: { userId, statisticDate: today } },
  });

  let streak: number | null = null;
  if (!todayStat) {
    const [yesterdayStat, user] = await Promise.all([
      prisma.dailyStatistic.findUnique({ where: { userId_statisticDate: { userId, statisticDate: yesterday } } }),
      prisma.user.findUnique({ where: { id: userId } }),
    ]);
    if (user) {
      const nextStreak: number = yesterdayStat ? user.currentStreak + 1 : 1;
      streak = nextStreak;
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

  if (streak !== null) return streak;
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { currentStreak: true } });
  return user?.currentStreak ?? 0;
}
