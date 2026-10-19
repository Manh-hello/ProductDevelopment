import { prisma } from "../config/prisma";
import { LEVEL_TITLES, XP_PER_LEVEL } from "../constants/xp";
import { addDays, startOfDay, toDateKey } from "../utils/dates";
import { getUnreadCount } from "./notification.service";
import { computeSkills } from "./skill.service";

/** Tổng hợp số liệu cho Dashboard (PRD mục 8.15). */
export async function getDashboardSummary(userId: string) {
  const today = startOfDay(new Date());

  const [user, totalWords, masteredWords, dueWords, todayStat, learningWords, unreadNotifications] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: { totalXp: true, currentStreak: true, longestStreak: true, dailyGoal: true },
    }),
    prisma.userVocabulary.count({ where: { userId } }),
    prisma.userVocabulary.count({ where: { userId, status: "mastered" } }),
    prisma.userVocabulary.count({ where: { userId, nextReviewAt: { lte: new Date() } } }),
    prisma.dailyStatistic.findUnique({ where: { userId_statisticDate: { userId, statisticDate: today } } }),
    prisma.userVocabulary.count({ where: { userId, status: "learning" } }),
    getUnreadCount(userId),
  ]);
  const totalXp = user?.totalXp ?? 0;
  const levelIndex = Math.floor(totalXp / XP_PER_LEVEL);

  const wordsReviewedToday = todayStat?.wordsReviewed ?? 0;
  const correctToday = todayStat?.correctAnswers ?? 0;
  const totalAnsweredToday = correctToday + (todayStat?.incorrectAnswers ?? 0);

  return {
    xp: totalXp,
    level: levelIndex + 1,
    levelTitle: LEVEL_TITLES[Math.min(levelIndex, LEVEL_TITLES.length - 1)],
    xpIntoLevel: totalXp % XP_PER_LEVEL,
    xpPerLevel: XP_PER_LEVEL,
    learningWords,
    unreadNotifications,
    dailyGoal: user?.dailyGoal ?? 20,
    currentStreak: user?.currentStreak ?? 0,
    longestStreak: user?.longestStreak ?? 0,
    totalWords,
    masteredWords,
    dueWords,
    wordsLearnedToday: todayStat?.wordsLearned ?? 0,
    newWords: await prisma.userVocabulary.count({ where: { userId, status: "new" } }),
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
  const sevenDaysAgo = addDays(today, -6);

  const stats = await prisma.dailyStatistic.findMany({
    where: { userId, statisticDate: { gte: sevenDaysAgo } },
    orderBy: { statisticDate: "asc" },
  });

  type Stat = { statisticDate: Date; wordsReviewed: number; xpEarned: number };
  const byDate = new Map<string, Stat>(
    stats.map((s: Stat) => [toDateKey(s.statisticDate), s] as [string, Stat])
  );

  const days: { date: string; wordsReviewed: number; xpEarned: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const key = toDateKey(addDays(today, -i));
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

/** Điểm 6 kỹ năng của người dùng (radar Dashboard). */
export async function getSkills(userId: string) {
  return computeSkills({ session: { userId } });
}

/** Số từ tích luỹ trong kho qua N ngày gần nhất (biểu đồ "Tăng trưởng từ vựng"). */
export async function getVocabularyGrowth(userId: string, days = 7) {
  const today = startOfDay(new Date());
  const from = addDays(today, -(days - 1));
  const fromInstant = new Date(from.getTime());
  const [before, recent] = await Promise.all([
    prisma.userVocabulary.count({ where: { userId, createdAt: { lt: fromInstant } } }),
    prisma.userVocabulary.findMany({ where: { userId, createdAt: { gte: fromInstant } }, select: { createdAt: true } }),
  ]);
  const perDay = new Map<string, number>();
  for (const r of recent as { createdAt: Date }[]) {
    const key = toDateKey(startOfDay(r.createdAt));
    perDay.set(key, (perDay.get(key) ?? 0) + 1);
  }
  let total = before;
  const series: { date: string; added: number; total: number }[] = [];
  for (let i = 0; i < days; i++) {
    const key = toDateKey(addDays(from, i));
    const added = perDay.get(key) ?? 0;
    total += added;
    series.push({ date: key, added, total });
  }
  return { series, addedInRange: series.reduce((sum, d) => sum + d.added, 0) };
}
