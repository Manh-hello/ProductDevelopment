import { prisma } from "../config/prisma";
import { ACHIEVEMENT_DEFS, AchievementDef, AchievementMetric, RARE_XP_THRESHOLD } from "../constants/achievementCatalog";
import { createNotification } from "./notification.service";

export type AchievementStats = Record<AchievementMetric, number>;

/** Gom toàn bộ số liệu cần để kiểm tra điều kiện thành tích (các truy vấn count nhẹ, chạy song song). */
export async function loadAchievementStats(userId: string): Promise<AchievementStats> {
  const [user, wordsLearned, wordsMastered, sentencesWritten, sessionsCompleted, perfectSessions, byType, dailyChallenges] =
    await Promise.all([
      prisma.user.findUnique({ where: { id: userId }, select: { currentStreak: true, totalXp: true } }),
      prisma.userVocabulary.count({ where: { userId, correctCount: { gt: 0 } } }),
      prisma.userVocabulary.count({ where: { userId, status: "mastered" } }),
      prisma.userSentence.count({ where: { userId } }),
      prisma.studySession.count({ where: { userId, completedAt: { not: null } } }),
      countPerfectSessions(userId),
      prisma.exerciseAttempt.groupBy({
        by: ["exerciseId"],
        where: { session: { userId } },
        _count: { _all: true },
      }),
      prisma.xpTransaction.count({ where: { userId, source: "daily_challenge_bonus" } }),
    ]);

  const exercises = await prisma.exercise.findMany({ select: { id: true, type: true } });
  const typeById = new Map<string, string>(exercises.map((e: { id: string; type: string }) => [e.id, e.type] as [string, string]));
  const attemptsOf = (...types: string[]) =>
    (byType as { exerciseId: string; _count: { _all: number } }[])
      .filter((g) => types.includes(typeById.get(g.exerciseId) ?? ""))
      .reduce((sum, g) => sum + g._count._all, 0);

  return {
    wordsLearned,
    wordsMastered,
    currentStreak: user?.currentStreak ?? 0,
    totalXp: user?.totalXp ?? 0,
    sentencesWritten,
    perfectSessions,
    sessionsCompleted,
    listeningAttempts: attemptsOf("LISTENING", "DICTATION"),
    speakingAttempts: attemptsOf("SPEAKING"),
    writingAttempts: attemptsOf("WRITING"),
    dailyChallenges,
  };
}

async function countPerfectSessions(userId: string): Promise<number> {
  const sessions = await prisma.studySession.findMany({
    where: { userId, completedAt: { not: null }, totalQuestions: { gte: 5 } },
    select: { totalQuestions: true, correctAnswers: true },
  });
  return sessions.filter((s: { totalQuestions: number; correctAnswers: number }) => s.correctAnswers >= s.totalQuestions).length;
}

export interface UnlockedAchievement {
  code: string;
  name: string;
  icon: string | null;
  xpReward: number;
}

/**
 * Kiểm tra và mở khoá thành tích mới (gọi sau mỗi câu trả lời / khi hoàn thành phiên / claim thử thách).
 * Mở khoá → tạo UserAchievement + XpTransaction (source="achievement") + cộng users.total_xp + thông báo.
 */
export async function maybeUnlockAchievements(userId: string): Promise<UnlockedAchievement[]> {
  const [stats, alreadyUnlocked, catalog] = await Promise.all([
    loadAchievementStats(userId),
    prisma.userAchievement.findMany({ where: { userId }, select: { achievementId: true } }),
    prisma.achievement.findMany(),
  ]);

  const unlockedIds = new Set<string>(alreadyUnlocked.map((a: { achievementId: string }) => a.achievementId));
  const defByCode = new Map<string, AchievementDef>(ACHIEVEMENT_DEFS.map((d) => [d.code, d] as [string, AchievementDef]));

  const newly = catalog.filter((row: { id: string; code: string }) => {
    const def = defByCode.get(row.code);
    return def && !unlockedIds.has(row.id) && stats[def.metric] >= def.target;
  });

  const unlocked: UnlockedAchievement[] = [];
  for (const row of newly as { id: string; code: string; name: string; icon: string | null; xpReward: number }[]) {
    try {
      await prisma.$transaction([
        prisma.userAchievement.create({ data: { userId, achievementId: row.id } }),
        ...(row.xpReward > 0
          ? [
              prisma.xpTransaction.create({ data: { userId, amount: row.xpReward, source: "achievement", referenceId: row.id } }),
              prisma.user.update({ where: { id: userId }, data: { totalXp: { increment: row.xpReward } } }),
            ]
          : []),
      ]);
    } catch {
      continue; // đã được mở khoá bởi request song song (unique user_id+achievement_id)
    }
    await createNotification(userId, {
      category: "achievement",
      title: `Mở khoá thành tích “${row.name}”`,
      body: row.xpReward > 0 ? `Bạn nhận được +${row.xpReward} XP.` : undefined,
      link: "/achievements",
    });
    unlocked.push({ code: row.code, name: row.name, icon: row.icon, xpReward: row.xpReward });
  }
  return unlocked;
}

/** Danh sách toàn bộ thành tích kèm trạng thái + tiến độ (cho trang Achievements). */
export async function listAchievementsForUser(userId: string) {
  const [catalog, unlocked, stats] = await Promise.all([
    prisma.achievement.findMany(),
    prisma.userAchievement.findMany({ where: { userId } }),
    loadAchievementStats(userId),
  ]);
  const earnedAtById = new Map<string, Date>(
    unlocked.map((u: { achievementId: string; earnedAt: Date }) => [u.achievementId, u.earnedAt] as [string, Date])
  );
  const defByCode = new Map<string, AchievementDef>(ACHIEVEMENT_DEFS.map((d) => [d.code, d] as [string, AchievementDef]));
  const order = new Map<string, number>(ACHIEVEMENT_DEFS.map((d, i) => [d.code, i] as [string, number]));

  return (catalog as { id: string; code: string; xpReward: number }[])
    .map((a) => {
      const def = defByCode.get(a.code);
      const isUnlocked = earnedAtById.has(a.id);
      const current = def ? stats[def.metric] : 0;
      const target = def?.target ?? 1;
      return {
        ...a,
        group: def?.group ?? "practice",
        rarity: a.xpReward >= RARE_XP_THRESHOLD ? "rare" : "common",
        unlocked: isUnlocked,
        earnedAt: earnedAtById.get(a.id) ?? null,
        progress: { current: isUnlocked ? target : Math.min(current, target), target },
      };
    })
    .sort((x, y) => (order.get(x.code) ?? 999) - (order.get(y.code) ?? 999));
}

/** Tổng hợp nhanh cho Dashboard/Statistics. */
export async function countUnlocked(userId: string): Promise<{ unlocked: number; total: number }> {
  const [unlocked, total] = await Promise.all([prisma.userAchievement.count({ where: { userId } }), prisma.achievement.count()]);
  return { unlocked, total };
}

