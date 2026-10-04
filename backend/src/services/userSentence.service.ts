import { prisma } from "../config/prisma";
import { AppError } from "../utils/AppError";
import { CreateUserSentenceInput, UpdateUserSentenceInput } from "../validators/userSentence.validator";

export async function createUserSentence(userId: string, input: CreateUserSentenceInput) {
  const vocabulary = await prisma.vocabulary.findUnique({ where: { id: input.vocabularyId } });
  if (!vocabulary) throw new AppError("Không tìm thấy từ vựng.", 404);

  return prisma.userSentence.create({
    data: { userId, vocabularyId: input.vocabularyId, sentence: input.sentence, pinyin: input.pinyin },
    include: { vocabulary: true },
  });
}

export async function listUserSentences(userId: string, vocabularyId?: string) {
  return prisma.userSentence.findMany({
    where: { userId, ...(vocabularyId ? { vocabularyId } : {}) },
    include: { vocabulary: true },
    orderBy: { createdAt: "desc" },
  });
}

async function findOwned(userId: string, id: string) {
  const item = await prisma.userSentence.findFirst({ where: { id, userId } });
  if (!item) throw new AppError("Không tìm thấy câu của bạn.", 404);
  return item;
}

/**
 * Cập nhật correction/status. Ở MVP đây là bước thủ công (user tự ghi chú
 * sửa lỗi); chấm tự động bằng AI là tính năng giai đoạn sau (xem PRD - AI).
 */
export async function updateUserSentence(userId: string, id: string, input: UpdateUserSentenceInput) {
  await findOwned(userId, id);
  return prisma.userSentence.update({ where: { id }, data: input, include: { vocabulary: true } });
}

export async function deleteUserSentence(userId: string, id: string) {
  await findOwned(userId, id);
  await prisma.userSentence.delete({ where: { id } });
}
