import { prisma } from "../config/prisma";

/** Tổng hợp số liệu cho Dashboard (PRD mục 8.15). */
export async function getDashboardSummary(userId: string) {
  const today = startOfDay(new Date());

  const [user, totalWords, masteredWords, dueWords, todayStat] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: { totalXp: true, currentStreak: true, longestStreak: true, dailyGoal: true },
    }),
    prisma.userVocabulary.count({ where: { userId } }),
    prisma.userVocabulary.count({ where: { userId, status: "mastered" } }),
    prisma.userVocabulary.count({ where: { userId, nextReviewAt: { lte: new Date() } } }),
    prisma.dailyStatistic.findUnique({ where: { userId_statisticDate: { userId, statisticDate: today } } }),
  ]);

  const wordsReviewedToday = todayStat?.wordsReviewed ?? 0;
  const correctToday = todayStat?.correctAnswers ?? 0;
  const totalAnsweredToday = correctToday + (todayStat?.incorrectAnswers ?? 0);

  return {
    xp: user?.totalXp ?? 0,
    dailyGoal: user?.dailyGoal ?? 20,
    currentStreak: user?.currentStreak ?? 0,
    longestStreak: user?.longestStreak ?? 0,
    totalWords,
    masteredWords,
    dueWords,
    wordsLearnedToday: todayStat?.wordsLearned ?? 0,
    wordsReviewedToday,
    accuracyToday: totalAnsweredToday > 0 ? Math.round((correctToday / totalAnsweredToday) * 100) : null,
  };
}

/** Danh sách "từ yếu" (PRD mục 8.9). */
export async function getWeakWords(userId: string, limit = 10) {
  return prisma.userVocabulary.findMany({
    where: { userId, incorrectCount: { gt: 0 } },
    include: { vocabulary: true },
    orderBy: { incorrectCount: "desc" },
    take: limit,
  });
}

/** Biểu đồ hoạt động 7 ngày gần nhất - trực tiếp từ bảng daily_statistics (không cần quét exercise_attempts). */
export async function getWeeklyActivity(userId: string) {
  const today = startOfDay(new Date());
  const sevenDaysAgo = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000);

  const stats = await prisma.dailyStatistic.findMany({
    where: { userId, statisticDate: { gte: sevenDaysAgo } },
    orderBy: { statisticDate: "asc" },
  });

  type Stat = { statisticDate: Date; wordsReviewed: number; xpEarned: number };
  const byDate = new Map<string, Stat>(
    stats.map((s: Stat) => [s.statisticDate.toISOString().slice(0, 10), s] as [string, Stat])
  );

  const days: { date: string; wordsReviewed: number; xpEarned: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
    const key = d.toISOString().slice(0, 10);
    const stat = byDate.get(key);
    days.push({ date: key, wordsReviewed: stat?.wordsReviewed ?? 0, xpEarned: stat?.xpEarned ?? 0 });
  }

  return days;
}

/** Lịch sử XP gần đây (PRD - "hoạt động gần đây" ở Dashboard). */
export async function getRecentXpTransactions(userId: string, limit = 10) {
  return prisma.xpTransaction.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setUTCHours(0, 0, 0, 0);
  return d;
}
