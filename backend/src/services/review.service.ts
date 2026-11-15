import { prisma } from "../config/prisma";
import { addDays, localDayBounds, startOfDay, toDateKey } from "../utils/dates";

/** Dự báo khối lượng ôn 7 ngày tới + phân bố mức thuần thục (trang hoàn tất ôn tập / ôn SRS). */
export async function getReviewForecast(userId: string) {
  const now = new Date();
  const today = startOfDay(now);
  const { start: todayStart } = localDayBounds(now);

  const [dueNow, upcoming, byMastery, nextOne] = await Promise.all([
    prisma.userVocabulary.count({ where: { userId, nextReviewAt: { lte: now } } }),
    prisma.userVocabulary.findMany({
      where: { userId, nextReviewAt: { gt: now, lt: new Date(todayStart.getTime() + 7 * 24 * 3600 * 1000) } },
      select: { nextReviewAt: true },
    }),
    prisma.userVocabulary.groupBy({ by: ["masteryLevel"], where: { userId }, _count: { _all: true } }),
    prisma.userVocabulary.findFirst({ where: { userId, nextReviewAt: { gt: now } }, orderBy: { nextReviewAt: "asc" }, select: { nextReviewAt: true } }),
  ]);

  const days = Array.from({ length: 7 }, (_, i) => ({ date: toDateKey(addDays(today, i)), count: i === 0 ? dueNow : 0 }));
  for (const u of upcoming as { nextReviewAt: Date | null }[]) {
    if (!u.nextReviewAt) continue;
    const key = toDateKey(startOfDay(u.nextReviewAt));
    const day = days.find((d) => d.date === key);
    if (day) day.count += 1;
  }

  const buckets = { apprentice: 0, proficient: 0, expert: 0, mastered: 0 };
  for (const g of byMastery as { masteryLevel: number; _count: { _all: number } }[]) {
    const n = g._count._all;
    if (g.masteryLevel <= 1) buckets.apprentice += n;
    else if (g.masteryLevel === 2) buckets.proficient += n;
    else if (g.masteryLevel <= 4) buckets.expert += n;
    else buckets.mastered += n;
  }

  return { dueNow, days, buckets, nextReviewAt: nextOne?.nextReviewAt ?? null };
}
