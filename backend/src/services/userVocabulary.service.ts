import { prisma } from "../config/prisma";
import { AppError } from "../utils/AppError";
import { addDays } from "../utils/dates";
import { ListUserVocabularyQuery, UpdateUserVocabularyInput } from "../validators/userVocabulary.validator";
import { computeSkills } from "./skill.service";

const WEAK_INCORRECT_THRESHOLD = 2;
const VOCAB_INCLUDE = { examples: true, tags: { include: { tag: true } } } as const;

type UserVocabRow = {
  id: string;
  status: string;
  correctCount: number;
  incorrectCount: number;
  nextReviewAt: Date | null;
  vocabulary: { tags: { tag: { name: string } }[] } & Record<string, unknown>;
};

/** Trạng thái hiển thị: mastered > due (đến hạn ôn) > new > learning. */
function deriveState(row: Pick<UserVocabRow, "status" | "nextReviewAt">, now: Date): "new" | "learning" | "due" | "mastered" {
  if (row.status === "mastered") return "mastered";
  if (row.nextReviewAt && row.nextReviewAt <= now) return "due";
  if (row.status === "new") return "new";
  return "learning";
}

function decorate(row: UserVocabRow, intervalDays: number | null, now: Date) {
  const answered = row.correctCount + row.incorrectCount;
  return {
    ...row,
    vocabulary: { ...row.vocabulary, tags: row.vocabulary.tags.map((t) => t.tag.name) },
    state: deriveState(row, now),
    isWeak: row.incorrectCount >= WEAK_INCORRECT_THRESHOLD,
    accuracy: answered > 0 ? Math.round((row.correctCount / answered) * 100) : null,
    intervalDays,
  };
}

async function latestIntervals(userVocabularyIds: string[]): Promise<Map<string, number>> {
  if (userVocabularyIds.length === 0) return new Map();
  const reviews = await prisma.srsReview.findMany({
    where: { userVocabularyId: { in: userVocabularyIds } },
    orderBy: { reviewedAt: "desc" },
    select: { userVocabularyId: true, newInterval: true },
  });
  const map = new Map<string, number>();
  for (const r of reviews as { userVocabularyId: string; newInterval: number }[]) {
    if (!map.has(r.userVocabularyId)) map.set(r.userVocabularyId, r.newInterval);
  }
  return map;
}

export async function listUserVocabularies(userId: string, query: ListUserVocabularyQuery) {
  const now = new Date();
  const { filter, search, page, limit } = query;

  const searchWhere = search
    ? { vocabulary: { OR: [{ hanzi: { contains: search } }, { pinyin: { contains: search } }, { meaning: { contains: search } }] } }
    : {};
  const filterWhere =
    filter === "new" ? { status: "new" }
    : filter === "learning" ? { status: "learning" }
    : filter === "mastered" ? { status: "mastered" }
    : filter === "due" ? { nextReviewAt: { lte: now } }
    : filter === "weak" ? { incorrectCount: { gte: WEAK_INCORRECT_THRESHOLD } }
    : {};

  const [rows, total, all, newC, learning, mastered, due, weak] = await Promise.all([
    prisma.userVocabulary.findMany({
      where: { userId, ...searchWhere, ...filterWhere },
      include: { vocabulary: { include: VOCAB_INCLUDE } },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.userVocabulary.count({ where: { userId, ...searchWhere, ...filterWhere } }),
    prisma.userVocabulary.count({ where: { userId } }),
    prisma.userVocabulary.count({ where: { userId, status: "new" } }),
    prisma.userVocabulary.count({ where: { userId, status: "learning" } }),
    prisma.userVocabulary.count({ where: { userId, status: "mastered" } }),
    prisma.userVocabulary.count({ where: { userId, nextReviewAt: { lte: now } } }),
    prisma.userVocabulary.count({ where: { userId, incorrectCount: { gte: WEAK_INCORRECT_THRESHOLD } } }),
  ]);

  const intervals = await latestIntervals(rows.map((r: { id: string }) => r.id));
  return {
    items: (rows as UserVocabRow[]).map((r) => decorate(r, intervals.get(r.id) ?? null, now)),
    pagination: { page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)) },
    counts: { all, new: newC, learning, due, mastered, weak },
  };
}

export async function getUserVocabularyById(userId: string, id: string) {
  const record = await prisma.userVocabulary.findFirst({
    where: { id, userId },
    include: { vocabulary: { include: VOCAB_INCLUDE } },
  });
  if (!record) throw new AppError("Không tìm thấy mục từ vựng này trong danh sách học của bạn.", 404);
  const intervals = await latestIntervals([record.id]);
  return decorate(record as UserVocabRow, intervals.get(record.id) ?? null, new Date());
}

export interface AddVocabularyOptions {
  initialStage?: "new" | "learning" | "familiar";
  reviewNow?: boolean;
}

export async function addVocabularyToUser(userId: string, vocabularyId: string, options: AddVocabularyOptions = {}) {
  const vocabulary = await prisma.vocabulary.findUnique({ where: { id: vocabularyId } });
  if (!vocabulary) throw new AppError("Không tìm thấy từ vựng.", 404);

  const existing = await prisma.userVocabulary.findUnique({
    where: { userId_vocabularyId: { userId, vocabularyId } },
  });
  if (existing) throw new AppError("Từ này đã có trong danh sách học của bạn.", 409);

  const now = new Date();
  const stage = options.initialStage ?? "new";
  // "new": chưa từng ôn (lastReviewedAt/nextReviewAt = null) - SrsReview đầu tiên tạo khi có câu trả lời đầu tiên.
  // "learning"/"familiar": người học tự đánh giá đã biết chút ít → đặt sẵn mức thuần thục và lịch ôn (1 / 3 ngày).
  const seeded =
    stage === "new" ? null : { masteryLevel: stage === "learning" ? 1 : 2, nextReviewAt: addDays(now, stage === "learning" ? 1 : 3) };

  return prisma.userVocabulary.create({
    data: {
      userId,
      vocabularyId,
      status: seeded ? "learning" : "new",
      masteryLevel: seeded?.masteryLevel ?? 0,
      lastReviewedAt: seeded || options.reviewNow ? now : null,
      nextReviewAt: options.reviewNow ? now : (seeded?.nextReviewAt ?? null),
    },
    include: { vocabulary: true },
  });
}

export async function updateUserVocabulary(userId: string, vocabularyId: string, input: UpdateUserVocabularyInput) {
  const existing = await prisma.userVocabulary.findUnique({ where: { userId_vocabularyId: { userId, vocabularyId } } });
  if (!existing) throw new AppError("Từ này không có trong danh sách học của bạn.", 404);

  if (input.resetProgress) {
    await prisma.$transaction([
      prisma.srsReview.deleteMany({ where: { userVocabularyId: existing.id } }),
      prisma.userVocabulary.update({
        where: { id: existing.id },
        data: {
          status: "new",
          masteryLevel: 0,
          reviewCount: 0,
          correctCount: 0,
          incorrectCount: 0,
          learnedAt: null,
          lastReviewedAt: null,
          nextReviewAt: null,
        },
      }),
    ]);
  }

  return prisma.userVocabulary.update({
    where: { id: existing.id },
    data: {
      ...(input.note !== undefined ? { note: input.note } : {}),
      ...(input.mnemonic !== undefined ? { mnemonic: input.mnemonic } : {}),
    },
    include: { vocabulary: true },
  });
}

export async function removeVocabularyFromUser(userId: string, vocabularyId: string) {
  const existing = await prisma.userVocabulary.findUnique({
    where: { userId_vocabularyId: { userId, vocabularyId } },
  });
  if (!existing) throw new AppError("Từ này không có trong danh sách học của bạn.", 404);
  await prisma.userVocabulary.delete({ where: { id: existing.id } });
}

/** Hồ sơ trí nhớ của một từ (trang chi tiết từ): SRS, lịch sử, kỹ năng theo dạng bài, câu tự đặt. */
export async function getVocabularyProgress(userId: string, vocabularyId: string) {
  const vocabulary = await prisma.vocabulary.findUnique({ where: { id: vocabularyId } });
  if (!vocabulary) throw new AppError("Không tìm thấy từ vựng.", 404);

  const uv = await prisma.userVocabulary.findUnique({ where: { userId_vocabularyId: { userId, vocabularyId } } });
  if (!uv) return { inMyList: false as const, userVocabulary: null, skills: [], history: [], sentences: [] };

  const [reviews, skills, sentences] = await Promise.all([
    prisma.srsReview.findMany({ where: { userVocabularyId: uv.id }, orderBy: { reviewedAt: "desc" }, take: 10 }),
    computeSkills({ vocabularyId, session: { userId } }),
    prisma.userSentence.findMany({ where: { userId, vocabularyId }, orderBy: { createdAt: "desc" }, take: 10 }),
  ]);

  const now = new Date();
  const answered = uv.correctCount + uv.incorrectCount;
  return {
    inMyList: true as const,
    userVocabulary: {
      ...uv,
      state: deriveState(uv, now),
      accuracy: answered > 0 ? Math.round((uv.correctCount / answered) * 1000) / 10 : null,
      intervalDays: reviews[0]?.newInterval ?? null,
      /** Độ bền trí nhớ ước lượng: mức thuần thục 0-5 quy ra %. */
      retention: Math.round((uv.masteryLevel / 5) * 100),
    },
    skills,
    history: reviews,
    sentences,
  };
}
