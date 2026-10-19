import { prisma } from "../config/prisma";
import { SKILL_GROUPS } from "../constants/exerciseTypes";

export interface SkillScore {
  key: string;
  label: string;
  /** % trả lời đúng (làm tròn), null nếu chưa có dữ liệu. */
  accuracy: number | null;
  attempts: number;
}

/**
 * Điểm kỹ năng theo 6 nhóm (radar ở Dashboard / Statistics / chi tiết từ) từ lịch sử `exercise_attempts`.
 * `where` giới hạn phạm vi (theo user, theo từ vựng, theo khoảng ngày...).
 */
export async function computeSkills(where: Record<string, unknown>): Promise<SkillScore[]> {
  const [grouped, exercises] = await Promise.all([
    prisma.exerciseAttempt.groupBy({ by: ["exerciseId", "isCorrect"], where, _count: { _all: true } }),
    prisma.exercise.findMany({ select: { id: true, type: true } }),
  ]);
  const typeById = new Map<string, string>(exercises.map((e: { id: string; type: string }) => [e.id, e.type] as [string, string]));

  const totals = new Map<string, { correct: number; total: number }>();
  for (const g of grouped as { exerciseId: string; isCorrect: boolean; _count: { _all: number } }[]) {
    const type = typeById.get(g.exerciseId);
    const group = SKILL_GROUPS.find((s) => type && s.types.includes(type));
    if (!group) continue;
    const t = totals.get(group.key) ?? { correct: 0, total: 0 };
    t.total += g._count._all;
    if (g.isCorrect) t.correct += g._count._all;
    totals.set(group.key, t);
  }

  return SKILL_GROUPS.map((s) => {
    const t = totals.get(s.key);
    return { key: s.key, label: s.label, accuracy: t && t.total > 0 ? Math.round((t.correct / t.total) * 100) : null, attempts: t?.total ?? 0 };
  });
}
