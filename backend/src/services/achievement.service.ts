import { prisma } from "../config/prisma";

/**
 * Điều kiện mở khoá từng `achievement.code` - vẫn giữ trong CODE (không có
 * cột "condition" trong bảng `achievements` theo ERD), catalog metadata
 * (tên/mô tả/icon/xp_reward) đã có ở DB thật (xem prisma/seed.ts), chỉ
 * ĐIỀU KIỆN kiểm tra là giữ ở đây.
 */
export interface AchievementStats {
  wordsLearned: number;
  currentStreak: number;
}

const ACHIEVEMENT_CONDITIONS: Record<string, (stats: AchievementStats) => boolean> = {
  WORDS_10: (s) => s.wordsLearned >= 10,
  WORDS_50: (s) => s.wordsLearned >= 50,
  WORDS_100: (s) => s.wordsLearned >= 100,
  STREAK_7: (s) => s.currentStreak >= 7,
  STREAK_30: (s) => s.currentStreak >= 30,
};

/**
 * Kiểm tra và mở khoá thành tích mới sau mỗi lần trả lời (gọi từ
 * practice.service.ts). Mở khoá 1 thành tích -> tạo UserAchievement +
 * XpTransaction (source="achievement") + cộng users.total_xp theo xp_reward.
 */
export async function maybeUnlockAchievements(userId: string): Promise<string[]> {
  const [user, wordsLearned, alreadyUnlocked, catalog] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId } }),
    prisma.userVocabulary.count({ where: { userId, correctCount: { gt: 0 } } }),
    prisma.userAchievement.findMany({ where: { userId }, include: { achievement: true } }),
    prisma.achievement.findMany(),
  ]);
  if (!user) return [];

  const unlockedCodes = new Set(
    alreadyUnlocked.map((a: { achievement: { code: string } }) => a.achievement.code)
  );
  const stats: AchievementStats = { wordsLearned, currentStreak: user.currentStreak };

  const newlyUnlocked = catalog.filter(
    (def: { code: string }) =>
      !unlockedCodes.has(def.code) && ACHIEVEMENT_CONDITIONS[def.code]?.(stats)
  );
  if (newlyUnlocked.length === 0) return [];

  for (const def of newlyUnlocked) {
    await prisma.$transaction([
      prisma.userAchievement.create({ data: { userId, achievementId: def.id } }),
      ...(def.xpReward > 0
        ? [
            prisma.xpTransaction.create({
              data: { userId, amount: def.xpReward, source: "achievement", referenceId: def.id },
            }),
            prisma.user.update({ where: { id: userId }, data: { totalXp: { increment: def.xpReward } } }),
          ]
        : []),
    ]);
  }

  return newlyUnlocked.map((def: { code: string }) => def.code);
}

/** Danh sách toàn bộ thành tích kèm trạng thái đã mở khoá của user (cho trang Achievements). */
export async function listAchievementsForUser(userId: string) {
  const [catalog, unlocked] = await Promise.all([
    prisma.achievement.findMany({ orderBy: { xpReward: "asc" } }),
    prisma.userAchievement.findMany({ where: { userId } }),
  ]);
  const earnedAtById = new Map<string, Date>(
    unlocked.map((u: { achievementId: string; earnedAt: Date }) => [u.achievementId, u.earnedAt] as [string, Date])
  );
  return catalog.map((a: { id: string }) => ({
    ...a,
    unlocked: earnedAtById.has(a.id),
    earnedAt: earnedAtById.get(a.id) ?? null,
  }));
}
