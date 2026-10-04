import { prisma } from "../config/prisma";
import { AppError } from "../utils/AppError";

export async function listUserVocabularies(userId: string) {
  return prisma.userVocabulary.findMany({
    where: { userId },
    include: { vocabulary: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getUserVocabularyById(userId: string, id: string) {
  const record = await prisma.userVocabulary.findFirst({
    where: { id, userId },
    include: { vocabulary: true },
  });
  if (!record) {
    throw new AppError("Không tìm thấy mục từ vựng này trong danh sách học của bạn.", 404);
  }
  return record;
}

export async function addVocabularyToUser(userId: string, vocabularyId: string) {
  const vocabulary = await prisma.vocabulary.findUnique({ where: { id: vocabularyId } });
  if (!vocabulary) {
    throw new AppError("Không tìm thấy từ vựng.", 404);
  }

  const existing = await prisma.userVocabulary.findUnique({
    where: { userId_vocabularyId: { userId, vocabularyId } },
  });
  if (existing) {
    throw new AppError("Từ này đã có trong danh sách học của bạn.", 409);
  }

  // Khởi tạo trạng thái "new": chưa từng ôn (lastReviewedAt/nextReviewAt = null).
  // SrsReview đầu tiên + nextReviewAt sẽ được tạo khi có ExerciseAttempt đầu tiên.
  return prisma.userVocabulary.create({
    data: {
      userId,
      vocabularyId,
      status: "new",
      masteryLevel: 0,
      reviewCount: 0,
      correctCount: 0,
      incorrectCount: 0,
      lastReviewedAt: null,
      nextReviewAt: null,
    },
    include: { vocabulary: true },
  });
}

export async function removeVocabularyFromUser(userId: string, vocabularyId: string) {
  const existing = await prisma.userVocabulary.findUnique({
    where: { userId_vocabularyId: { userId, vocabularyId } },
  });
  if (!existing) {
    throw new AppError("Từ này không có trong danh sách học của bạn.", 404);
  }
  await prisma.userVocabulary.delete({ where: { id: existing.id } });
}
