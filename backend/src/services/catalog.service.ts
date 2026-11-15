import type { Prisma } from "@prisma/client";
import { prisma } from "../config/prisma";
import { AppError } from "../utils/AppError";
import {
  LEARNER_BANDS,
  TOPICS,
  TOPIC_ICON_BY_NAME,
  bandOfLevel,
  formatHskLevel,
  levelVariants,
  parseHskLevel,
} from "../constants/catalog";
import { CatalogWordsQuery, EnrollInput, ScopeInput } from "../validators/catalog.validator";

const VOCAB_ORDER = [{ createdAt: "asc" }, { hanzi: "asc" }] as const;

/** Điều kiện Prisma cho một "bộ từ" (dùng cho catalog, enroll và luyện tập theo bộ). */
export function scopeWhere(scope: ScopeInput & { search?: string }): Prisma.VocabularyWhereInput {
  const and: Prisma.VocabularyWhereInput[] = [];

  const level = scope.level ? parseHskLevel(scope.level) : null;
  if (level) and.push({ level: { in: levelVariants(level) } });

  if (scope.band) {
    const band = LEARNER_BANDS.find((b) => b.key === scope.band);
    if (band) and.push({ level: { in: band.levels.flatMap(levelVariants) } });
  }
  if (scope.topic) and.push({ tags: { some: { tag: { name: scope.topic } } } });
  if (scope.search) {
    and.push({ OR: [{ hanzi: { contains: scope.search } }, { pinyin: { contains: scope.search } }, { meaning: { contains: scope.search } }] });
  }
  return and.length ? { AND: and } : {};
}

/** Chuẩn hoá level của một từ ("HSK1" → "HSK 1"); giữ nguyên nếu không phải HSK. */
function normalizeLevel(level: string | null): string | null {
  const n = parseHskLevel(level);
  return n ? formatHskLevel(n) : level;
}

type Mine = { level: string | null; tags: string[] }[];

/** Danh sách (level, tags) của các từ user đang học - 1 query, tính tiến độ từng bộ trong bộ nhớ. */
async function loadMine(userId?: string): Promise<Mine | null> {
  if (!userId) return null;
  const rows = await prisma.userVocabulary.findMany({
    where: { userId },
    select: { vocabulary: { select: { level: true, tags: { select: { tag: { select: { name: true } } } } } } },
  });
  return rows.map((r: { vocabulary: { level: string | null; tags: { tag: { name: string } }[] } }) => ({
    level: normalizeLevel(r.vocabulary.level),
    tags: r.vocabulary.tags.map((t) => t.tag.name),
  }));
}

export async function getOverview(userId?: string) {
  const [levelRows, tagRows, mine, total] = await Promise.all([
    prisma.vocabulary.groupBy({ by: ["level"], _count: { _all: true } }),
    prisma.tag.findMany({ select: { name: true, _count: { select: { vocabularies: true } } } }),
    loadMine(userId),
    prisma.vocabulary.count(),
  ]);

  // Gộp "HSK1" và "HSK 1" về cùng một mức.
  const levelTotals = new Map<number, number>();
  for (const r of levelRows as unknown as { level: string | null; _count: { _all: number } }[]) {
    const n = parseHskLevel(r.level);
    if (n) levelTotals.set(n, (levelTotals.get(n) ?? 0) + r._count._all);
  }
  const learnedByLevel = (n: number) => (mine ? mine.filter((m) => parseHskLevel(m.level) === n).length : null);

  const levels = [1, 2, 3, 4, 5, 6].map((n) => ({
    level: formatHskLevel(n),
    number: n,
    band: bandOfLevel(n),
    total: levelTotals.get(n) ?? 0,
    learned: learnedByLevel(n),
  }));

  const bands = LEARNER_BANDS.map((b) => ({
    key: b.key,
    label: b.label,
    description: b.description,
    levels: b.levels.map(formatHskLevel),
    total: b.levels.reduce((s, n) => s + (levelTotals.get(n) ?? 0), 0),
    learned: mine ? b.levels.reduce((s, n) => s + (learnedByLevel(n) ?? 0), 0) : null,
  }));

  const counts = new Map<string, number>(
    (tagRows as unknown as { name: string; _count: { vocabularies: number } }[]).map((t) => [t.name, t._count.vocabularies])
  );
  const featured = TOPICS.filter((t) => (counts.get(t.name) ?? 0) > 0).map((t) => t.name);
  const extra = [...counts.entries()]
    .filter(([name, c]) => !TOPIC_ICON_BY_NAME.has(name) && c >= 5)
    .sort((a, b) => b[1] - a[1])
    .map(([name]) => name);
  const topics = [...featured, ...extra].map((name) => ({
    name,
    icon: TOPIC_ICON_BY_NAME.get(name) ?? "label",
    total: counts.get(name) ?? 0,
    learned: mine ? mine.filter((m) => m.tags.includes(name)).length : null,
  }));

  return { totalWords: total, levels, bands, topics, authenticated: Boolean(userId) };
}

export async function listCatalogWords(query: CatalogWordsQuery, userId?: string) {
  const { page, limit } = query;
  const where = scopeWhere(query);

  const [rows, total] = await Promise.all([
    prisma.vocabulary.findMany({
      where,
      include: { tags: { include: { tag: true } }, examples: { take: 1 } },
      orderBy: [...VOCAB_ORDER],
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.vocabulary.count({ where }),
  ]);

  const ids = (rows as unknown as { id: string }[]).map((r) => r.id);
  const mineRows = userId && ids.length
    ? await prisma.userVocabulary.findMany({ where: { userId, vocabularyId: { in: ids } }, select: { vocabularyId: true } })
    : [];
  const mineIds = new Set<string>((mineRows as unknown as { vocabularyId: string }[]).map((m) => m.vocabularyId));

  return {
    items: (rows as unknown as (Record<string, unknown> & { id: string; level: string | null; tags: { tag: { name: string } }[] })[]).map((r) => ({
      ...r,
      level: normalizeLevel(r.level),
      tags: r.tags.map((t) => t.tag.name),
      inMyList: userId ? mineIds.has(r.id) : null,
    })),
    pagination: { page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)) },
  };
}

/** Chi tiết một từ trong kho chung: nghĩa, từ loại, cấp độ, chủ đề, ghi chú, toàn bộ câu ví dụ (+ đã có trong danh sách học chưa). */
export async function getCatalogWord(id: string, userId?: string) {
  const row = await prisma.vocabulary.findUnique({
    where: { id },
    include: { tags: { include: { tag: true } }, examples: { orderBy: { id: "asc" } } },
  });
  if (!row) throw new AppError("Không tìm thấy từ vựng.", 404);

  const mine = userId ? await prisma.userVocabulary.findFirst({ where: { userId, vocabularyId: id }, select: { id: true } }) : null;
  const r = row as unknown as Record<string, unknown> & { level: string | null; tags: { tag: { name: string } }[] };
  return { ...r, level: normalizeLevel(r.level), tags: r.tags.map((t) => t.tag.name), inMyList: userId ? Boolean(mine) : null };
}

/**
 * "Học bộ này": thêm tối đa `limit` từ CHƯA có trong danh sách học của user vào danh sách (trạng thái "mới").
 * Idempotent: gọi lại chỉ thêm tiếp các từ còn thiếu.
 */
export async function enrollScope(userId: string, input: EnrollInput) {
  const where = scopeWhere(input);
  const totalInScope = await prisma.vocabulary.count({ where });
  if (totalInScope === 0) throw new AppError("Bộ từ này chưa có từ vựng nào.", 404);

  const candidates = await prisma.vocabulary.findMany({
    where: { AND: [where, { userVocabularies: { none: { userId } } }] },
    orderBy: [...VOCAB_ORDER],
    take: input.limit,
    select: { id: true },
  });

  const result = candidates.length
    ? await prisma.userVocabulary.createMany({
        data: (candidates as unknown as { id: string }[]).map((c) => ({ userId, vocabularyId: c.id, status: "new", masteryLevel: 0 })),
        skipDuplicates: true,
      })
    : { count: 0 };

  const inList = await prisma.userVocabulary.count({ where: { userId, vocabulary: where } });
  return { added: result.count, totalInScope, inMyList: inList, remaining: Math.max(0, totalInScope - inList) };
}
