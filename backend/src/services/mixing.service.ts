import { prisma } from "../config/prisma";
import { UserVocabulary, Vocabulary } from "@prisma/client";
import { scopeWhere } from "./catalog.service";
import type { ScopeInput } from "../validators/catalog.validator";

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
  const pickedIds = new Set<string>(dueWords.map((w: { id: string }) => w.id));

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
  const pickedIds = new Set<string>(dueWords.map((w: { id: string }) => w.id));

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

  const dueIds = new Set<string>(dueWords.map((w: { id: string }) => w.id));
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

/**
 * Phiên luyện từ CÂU ĐÃ LƯU: chỉ lấy các từ trong danh sách học mà user đã lưu câu có bản dịch
 * (câu tự viết không có bản dịch nên không dùng được cho Dịch/Điền từ/Sắp xếp). Từ đến hạn/chưa ôn xếp trước.
 */
export async function buildSavedSentenceSession(
  userId: string,
  sessionSize: number = DEFAULT_SESSION_SIZE
): Promise<MixedSessionComposition> {
  const now = new Date();
  const saved = await prisma.userSentence.findMany({
    where: { userId, translation: { not: null } },
    select: { vocabularyId: true },
    distinct: ["vocabularyId"],
  });
  if (saved.length === 0) return { items: [], newWordsCount: 0, dueWordsCount: 0, weakWordsCount: 0 };

  const items: MixedItem[] = await prisma.userVocabulary.findMany({
    where: { userId, vocabularyId: { in: saved.map((s: { vocabularyId: string }) => s.vocabularyId) } },
    include: { vocabulary: true },
    orderBy: { nextReviewAt: "asc" },
    take: sessionSize,
  });
  shuffleInPlace(items);

  const isNew = (i: MixedItem) => i.status === "new";
  const isDue = (i: MixedItem) => i.nextReviewAt !== null && i.nextReviewAt <= now;
  return {
    items,
    newWordsCount: items.filter(isNew).length,
    dueWordsCount: items.filter(isDue).length,
    weakWordsCount: items.filter((i) => !isNew(i) && !isDue(i) && i.incorrectCount >= WEAK_INCORRECT_THRESHOLD).length,
  };
}

/**
 * Phiên luyện tập theo một "bộ từ" (cấp độ HSK / chủ đề / trình độ): chỉ lấy từ user ĐÃ thêm vào danh sách học.
 * Ưu tiên: đến hạn ôn → từ yếu → từ mới → còn lại; trong mỗi nhóm chọn ngẫu nhiên, thứ tự hiển thị cuối được xáo trộn.
 */
export async function buildScopedSession(
  userId: string,
  scope: ScopeInput,
  sessionSize: number = DEFAULT_SESSION_SIZE
): Promise<MixedSessionComposition> {
  const now = new Date();
  const rows: MixedItem[] = await prisma.userVocabulary.findMany({
    where: { userId, vocabulary: scopeWhere(scope) },
    include: { vocabulary: true },
  });

  const isDue = (w: MixedItem) => w.lastReviewedAt !== null && w.nextReviewAt !== null && w.nextReviewAt <= now;
  const isWeak = (w: MixedItem) => w.incorrectCount >= WEAK_INCORRECT_THRESHOLD;

  const due = rows.filter(isDue);
  const weak = rows.filter((w) => !isDue(w) && isWeak(w));
  const fresh = rows.filter((w) => !isDue(w) && !isWeak(w) && w.status === "new");
  const rest = rows.filter((w) => !isDue(w) && !isWeak(w) && w.status !== "new");

  [due, weak, fresh, rest].forEach((g) => shuffleInPlace(g));
  const items = [...due, ...weak, ...fresh, ...rest].slice(0, sessionSize);
  const picked = new Set(items.map((i) => i.id));
  shuffleInPlace(items);

  return {
    items,
    newWordsCount: fresh.filter((w) => picked.has(w.id)).length,
    dueWordsCount: due.filter((w) => picked.has(w.id)).length,
    weakWordsCount: weak.filter((w) => picked.has(w.id)).length,
  };
}

/** Fisher-Yates - chỉ xáo trộn THỨ TỰ, không ảnh hưởng đến việc từ nào được chọn. */
function shuffleInPlace<T>(arr: T[]): void {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
