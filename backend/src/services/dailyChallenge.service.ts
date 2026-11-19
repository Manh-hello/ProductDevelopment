import { prisma } from "../config/prisma";
import { XP_DAILY_CHALLENGE_BONUS } from "../constants/xp";
import { AppError } from "../utils/AppError";
import { localDayBounds, startOfDay } from "../utils/dates";
import { createNotification } from "./notification.service";
import { maybeUnlockAchievements } from "./achievement.service";

interface TaskDef { key: string; label: string; target: number; link: string }

const TASKS: TaskDef[] = [
  { key: "new", label: "Học từ mới", target: 5, link: "/practice/multi" },
  { key: "review", label: "Ôn từ cũ", target: 15, link: "/review" },
  { key: "listening", label: "Bài nghe", target: 5, link: "/practice/listening" },
  { key: "sentences", label: "Đặt câu", target: 3, link: "/practice/sentence-creation" },
  { key: "speaking", label: "Luyện nói", target: 2, link: "/practice/speaking" },
];

export async function getDailyChallenge(userId: string) {
  const { start, end } = localDayBounds();
  const [stat, attempts, exercises, claimed] = await Promise.all([
    prisma.dailyStatistic.findUnique({ where: { userId_statisticDate: { userId, statisticDate: startOfDay() } } }),
    prisma.exerciseAttempt.groupBy({
      by: ["exerciseId"],
      where: { session: { userId }, createdAt: { gte: start, lt: end } },
      _count: { _all: true },
    }),
    prisma.exercise.findMany({ select: { id: true, type: true } }),
    prisma.xpTransaction.findFirst({ where: { userId, source: "daily_challenge_bonus", createdAt: { gte: start, lt: end } } }),
  ]);
  const typeById = new Map<string, string>(exercises.map((e: { id: string; type: string }) => [e.id, e.type] as [string, string]));
  const count = (...types: string[]) =>
    (attempts as { exerciseId: string; _count: { _all: number } }[])
      .filter((a) => types.includes(typeById.get(a.exerciseId) ?? ""))
      .reduce((s, a) => s + a._count._all, 0);

  const learned = stat?.wordsLearned ?? 0;
  const progress: Record<string, number> = {
    new: learned,
    review: Math.max(0, (stat?.wordsReviewed ?? 0) - learned),
    listening: count("LISTENING", "DICTATION"),
    sentences: count("SENTENCE_CREATION", "SENTENCE"),
    speaking: count("SPEAKING"),
  };

  const tasks = TASKS.map((t) => {
    const current = Math.min(progress[t.key], t.target);
    return { ...t, current, done: current >= t.target };
  });
  const completedItems = tasks.reduce((s, t) => s + t.current, 0);
  const totalItems = tasks.reduce((s, t) => s + t.target, 0);
  const allDone = tasks.every((t) => t.done);
  const msLeft = Math.max(0, end.getTime() - Date.now());

  return {
    bonusXp: XP_DAILY_CHALLENGE_BONUS,
    tasks,
    completedItems,
    totalItems,
    allDone,
    claimed: Boolean(claimed),
    hoursLeft: Math.ceil(msLeft / 3_600_000),
  };
}

export async function claimDailyChallenge(userId: string) {
  const challenge = await getDailyChallenge(userId);
  if (challenge.claimed) throw new AppError("Bạn đã nhận thưởng thử thách hôm nay rồi.", 409);
  if (!challenge.allDone) throw new AppError("Bạn chưa hoàn thành tất cả nhiệm vụ của thử thách.", 400);

  // Khoá hàng người dùng rồi kiểm tra lại "đã nhận chưa": hai lần nhận song song không thể cùng cộng XP.
  const { start, end } = localDayBounds();
  await prisma.$transaction(async (tx) => {
    await tx.$queryRaw`SELECT id FROM users WHERE id = ${userId} FOR UPDATE`;
    const already = await tx.xpTransaction.findFirst({
      where: { userId, source: "daily_challenge_bonus", createdAt: { gte: start, lt: end } },
      select: { id: true },
    });
    if (already) throw new AppError("Bạn đã nhận thưởng thử thách hôm nay rồi.", 409);
    await tx.xpTransaction.create({ data: { userId, amount: XP_DAILY_CHALLENGE_BONUS, source: "daily_challenge_bonus" } });
    await tx.user.update({ where: { id: userId }, data: { totalXp: { increment: XP_DAILY_CHALLENGE_BONUS } } });
  });
  await createNotification(userId, {
    category: "achievement",
    title: "Hoàn thành Thử Thách Hôm Nay",
    body: `Bạn nhận được +${XP_DAILY_CHALLENGE_BONUS} XP.`,
    link: "/dashboard",
  });
  const newAchievements = await maybeUnlockAchievements(userId);
  return { xpAwarded: XP_DAILY_CHALLENGE_BONUS, newAchievements };
}
