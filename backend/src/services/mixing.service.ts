import { prisma } from "../config/prisma";
import { UserVocabulary, Vocabulary } from "@prisma/client";

export type MixedItem = UserVocabulary & { vocabulary: Vocabulary };

export interface MixedSessionComposition {
  items: MixedItem[];
  newWordsCount: number;
  dueWordsCount: number;
  weakWordsCount: number;
}

const DEFAULT_SESSION_SIZE = 10;
// Tỷ lệ đề xuất ở PRD mục 8.6: 20% từ mới, 50% từ cần ôn, 30% từ yếu.
const NEW_RATIO = 0.2;
const DUE_RATIO = 0.5;
const WEAK_INCORRECT_THRESHOLD = 2;

/**
 * Mixing Engine — PRD mục 8.6. Chọn theo tỷ lệ CỐ ĐỊNH cho từng nhóm
 * (không random hoàn toàn), chỉ xáo trộn THỨ TỰ hiển thị cuối cùng.
 *
 * Field name khớp schema mới: status/lastReviewedAt/nextReviewAt/incorrectCount
 * (thay cho lastReview/nextReview/wrongCount ở thiết kế cũ).
 */
export async function buildMixedSession(
  userId: string,
  sessionSize: number = DEFAULT_SESSION_SIZE
): Promise<MixedSessionComposition> {
  const now = new Date();

  const newTarget = Math.round(sessionSize * NEW_RATIO);
  const dueTarget = Math.round(sessionSize * DUE_RATIO);
  const weakTarget = Math.max(0, sessionSize - newTarget - dueTarget);

  const dueWords = await prisma.userVocabulary.findMany({
    where: { userId, lastReviewedAt: { not: null }, nextReviewAt: { lte: now } },
    include: { vocabulary: true },
    orderBy: { nextReviewAt: "asc" },
    take: dueTarget,
  });
  const pickedIds = new Set(dueWords.map((w: { id: string }) => w.id));

  const weakWords = await prisma.userVocabulary.findMany({
    where: {
      userId,
      incorrectCount: { gte: WEAK_INCORRECT_THRESHOLD },
      id: { notIn: [...pickedIds] },
    },
    include: { vocabulary: true },
    orderBy: { incorrectCount: "desc" },
    take: weakTarget,
  });
  weakWords.forEach((w: { id: string }) => pickedIds.add(w.id));

  const newWords = await prisma.userVocabulary.findMany({
    where: { userId, status: "new", id: { notIn: [...pickedIds] } },
    include: { vocabulary: true },
    orderBy: { createdAt: "asc" },
    take: newTarget,
  });
  newWords.forEach((w: { id: string }) => pickedIds.add(w.id));

  let items: MixedItem[] = [...newWords, ...dueWords, ...weakWords];

  if (items.length < sessionSize) {
    const remaining = sessionSize - items.length;
    const backfill = await prisma.userVocabulary.findMany({
      where: { userId, id: { notIn: [...pickedIds] } },
      include: { vocabulary: true },
      orderBy: { nextReviewAt: "asc" },
      take: remaining,
    });
    items = [...items, ...backfill];
  }

  shuffleInPlace(items);

  return {
    items,
    newWordsCount: newWords.length,
    dueWordsCount: dueWords.length,
    weakWordsCount: weakWords.length,
  };
}

/**
 * Daily Review (PRD mục 8.7): ưu tiên TUYỆT ĐỐI từ đến hạn ôn, sau đó mới
 * bổ sung từ yếu + từ mới nếu còn chỗ.
 */
export async function buildDailyReviewSession(
  userId: string,
  sessionSize: number = DEFAULT_SESSION_SIZE
): Promise<MixedSessionComposition> {
  const now = new Date();

  const dueWords = await prisma.userVocabulary.findMany({
    where: { userId, lastReviewedAt: { not: null }, nextReviewAt: { lte: now } },
    include: { vocabulary: true },
    orderBy: { nextReviewAt: "asc" },
    take: sessionSize,
  });
  const pickedIds = new Set(dueWords.map((w: { id: string }) => w.id));

  let items: MixedItem[] = [...dueWords];

  if (items.length < sessionSize) {
    const weakWords = await prisma.userVocabulary.findMany({
      where: { userId, incorrectCount: { gte: WEAK_INCORRECT_THRESHOLD }, id: { notIn: [...pickedIds] } },
      include: { vocabulary: true },
      orderBy: { incorrectCount: "desc" },
      take: sessionSize - items.length,
    });
    weakWords.forEach((w: { id: string }) => pickedIds.add(w.id));
    items = [...items, ...weakWords];
  }

  if (items.length < sessionSize) {
    const newWords = await prisma.userVocabulary.findMany({
      where: { userId, status: "new", id: { notIn: [...pickedIds] } },
      include: { vocabulary: true },
      orderBy: { createdAt: "asc" },
      take: sessionSize - items.length,
    });
    items = [...items, ...newWords];
  }

  shuffleInPlace(items);

  const dueIds = new Set(dueWords.map((w: { id: string }) => w.id));
  const newIds = new Set(
    items.filter((i: MixedItem) => i.status === "new" && !dueIds.has(i.id)).map((i: MixedItem) => i.id)
  );

  return {
    items,
    newWordsCount: newIds.size,
    dueWordsCount: dueWords.length,
    weakWordsCount: items.length - dueWords.length - newIds.size,
  };
}

/** Fisher-Yates - chỉ xáo trộn THỨ TỰ, không ảnh hưởng đến việc từ nào được chọn. */
function shuffleInPlace<T>(arr: T[]): void {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
