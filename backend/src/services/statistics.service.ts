import { prisma } from "../config/prisma";
import { addDays, startOfDay, toDateKey } from "../utils/dates";
import { computeSkills } from "./skill.service";

export const STATS_RANGES = ["7d", "30d", "quarter", "all"] as const;
export type StatsRange = (typeof STATS_RANGES)[number];

function rangeDays(range: StatsRange): number | null {
  return range === "7d" ? 7 : range === "30d" ? 30 : range === "quarter" ? 90 : null;
}

interface Totals { newWords: number; reviewed: number; correct: number; incorrect: number; studyMinutes: number; xp: number }

function sumStats(rows: { wordsLearned: number; wordsReviewed: number; correctAnswers: number; incorrectAnswers: number; studyMinutes: number; xpEarned: number }[]): Totals {
  return rows.reduce(
    (t, r) => ({
      newWords: t.newWords + r.wordsLearned,
      reviewed: t.reviewed + r.wordsReviewed,
      correct: t.correct + r.correctAnswers,
      incorrect: t.incorrect + r.incorrectAnswers,
      studyMinutes: t.studyMinutes + r.studyMinutes,
      xp: t.xp + r.xpEarned,
    }),
    { newWords: 0, reviewed: 0, correct: 0, incorrect: 0, studyMinutes: 0, xp: 0 }
  );
}

const accuracyOf = (t: Totals) => (t.correct + t.incorrect > 0 ? Math.round((t.correct / (t.correct + t.incorrect)) * 1000) / 10 : null);

export async function getStatisticsOverview(userId: string, range: StatsRange) {
  const today = startOfDay();
  const days = rangeDays(range);
  const from = days ? addDays(today, -(days - 1)) : null;
  const prevFrom = days && from ? addDays(from, -days) : null;

  const [rows, prevRows, user, firstStat, totalWords, mastered, learning, newW, due, topErrors, skills] = await Promise.all([
    prisma.dailyStatistic.findMany({ where: { userId, ...(from ? { statisticDate: { gte: from } } : {}) }, orderBy: { statisticDate: "asc" } }),
    prevFrom && from ? prisma.dailyStatistic.findMany({ where: { userId, statisticDate: { gte: prevFrom, lt: from } } }) : Promise.resolve([]),
    prisma.user.findUnique({ where: { id: userId }, select: { totalXp: true, currentStreak: true, longestStreak: true } }),
    prisma.dailyStatistic.findFirst({ where: { userId }, orderBy: { statisticDate: "asc" }, select: { statisticDate: true } }),
    prisma.userVocabulary.count({ where: { userId } }),
    prisma.userVocabulary.count({ where: { userId, status: "mastered" } }),
    prisma.userVocabulary.count({ where: { userId, status: "learning" } }),
    prisma.userVocabulary.count({ where: { userId, status: "new" } }),
    prisma.userVocabulary.count({ where: { userId, nextReviewAt: { lte: new Date() } } }),
    prisma.userVocabulary.findMany({
      where: { userId, incorrectCount: { gt: 0 } },
      include: { vocabulary: true },
      orderBy: { incorrectCount: "desc" },
      take: 5,
    }),
    computeSkills({ session: { userId }, ...(from ? { createdAt: { gte: from } } : {}) }),
  ]);

  const totals = sumStats(rows);
  const previous = sumStats(prevRows as typeof rows);

  const start = from ?? firstStat?.statisticDate ?? today;
  const spanDays = Math.max(1, Math.round((today.getTime() - start.getTime()) / 86_400_000) + 1);
  const byDate = new Map<string, (typeof rows)[number]>(rows.map((r: (typeof rows)[number]) => [toDateKey(r.statisticDate), r] as [string, (typeof rows)[number]]));
  const series = Array.from({ length: Math.min(spanDays, 366) }, (_, i) => {
    const date = toDateKey(addDays(start, i));
    const r = byDate.get(date);
    const answered = (r?.correctAnswers ?? 0) + (r?.incorrectAnswers ?? 0);
    return {
      date,
      wordsLearned: r?.wordsLearned ?? 0,
      wordsReviewed: r?.wordsReviewed ?? 0,
      xpEarned: r?.xpEarned ?? 0,
      studyMinutes: r?.studyMinutes ?? 0,
      accuracy: answered > 0 ? Math.round(((r?.correctAnswers ?? 0) / answered) * 100) : null,
    };
  });
  const activeDays = series.filter((d) => d.wordsReviewed > 0).length;

  return {
    range,
    from: toDateKey(start),
    to: toDateKey(today),
    totals: { ...totals, accuracy: accuracyOf(totals), answered: totals.correct + totals.incorrect, activeDays, avgMinutesPerActiveDay: activeDays > 0 ? Math.round(totals.studyMinutes / activeDays) : 0 },
    previous: { newWords: previous.newWords, accuracy: accuracyOf(previous), studyMinutes: previous.studyMinutes },
    series,
    vocabulary: { total: totalWords, mastered, learning, new: newW, due },
    skills,
    retention: accuracyOf(totals),
    topErrors: (topErrors as { vocabularyId: string; incorrectCount: number; correctCount: number; vocabulary: { hanzi: string; pinyin: string; meaning: string } }[]).map((e) => ({
      vocabularyId: e.vocabularyId,
      hanzi: e.vocabulary.hanzi,
      pinyin: e.vocabulary.pinyin,
      meaning: e.vocabulary.meaning,
      incorrectCount: e.incorrectCount,
      accuracy: Math.round((e.correctCount / (e.correctCount + e.incorrectCount)) * 100),
    })),
    user: user ?? { totalXp: 0, currentStreak: 0, longestStreak: 0 },
  };
}
