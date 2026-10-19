import { prisma } from "../config/prisma";
import { AppError } from "../utils/AppError";
import { convertToPinyin } from "../utils/pinyin";
import { CreateUserSentenceInput, UpdateUserSentenceInput } from "../validators/userSentence.validator";
import { sentenceKey } from "./learning/sentenceRules";

export async function createUserSentence(userId: string, input: CreateUserSentenceInput) {
  const vocabulary = await prisma.vocabulary.findUnique({ where: { id: input.vocabularyId } });
  if (!vocabulary) throw new AppError("Không tìm thấy từ vựng.", 404);

  // Câu tự viết: giữ nguyên hành vi cũ.
  if (input.source === "manual") {
    return prisma.userSentence.create({
      data: { userId, vocabularyId: input.vocabularyId, sentence: input.sentence, pinyin: input.pinyin },
      include: { vocabulary: true },
    });
  }

  // Câu do hệ thống tạo: không tin dữ liệu client gửi lên - kiểm tra lại ở server.
  if (!input.sentence.includes(vocabulary.hanzi)) {
    throw new AppError(`Câu không chứa từ mục tiêu "${vocabulary.hanzi}" nên không thể lưu.`, 400);
  }

  const mine = await prisma.userVocabulary.findUnique({ where: { userId_vocabularyId: { userId, vocabularyId: input.vocabularyId } } });
  if (!mine) throw new AppError("Từ này chưa có trong danh sách học của bạn.", 400);

  const sameWord = await prisma.userSentence.findMany({ where: { userId, vocabularyId: input.vocabularyId }, select: { sentence: true } });
  if (sameWord.some((s) => sentenceKey(s.sentence) === sentenceKey(input.sentence))) {
    throw new AppError("Câu này đã có trong danh sách câu đã lưu của bạn.", 409);
  }

  // usedWords: chỉ giữ từ THUỘC danh sách của user và thực sự xuất hiện trong câu; Hán tự lấy từ DB, không từ client.
  const requested = new Map(input.usedWords?.map((w) => [w.vocabularyId, w.role]) ?? []);
  requested.set(input.vocabularyId, "target");
  const owned = await prisma.userVocabulary.findMany({
    where: { userId, vocabularyId: { in: [...requested.keys()] } },
    include: { vocabulary: { select: { id: true, hanzi: true } } },
  });
  const usedWords = owned
    .filter((o) => input.sentence.includes(o.vocabulary.hanzi))
    .map((o) => ({ vocabularyId: o.vocabulary.id, hanzi: o.vocabulary.hanzi, role: requested.get(o.vocabulary.id) ?? "known" }));

  return prisma.userSentence.create({
    data: {
      userId,
      vocabularyId: input.vocabularyId,
      sentence: input.sentence,
      // Pinyin luôn tính lại bằng thư viện trên cả câu (đúng từ đa âm theo ngữ cảnh).
      pinyin: convertToPinyin(input.sentence, "sentence").pinyin,
      translation: input.translation,
      explanation: input.explanation,
      topic: input.topic,
      level: input.level,
      source: input.source,
      usedWords,
    },
    include: { vocabulary: true },
  });
}

/** Dạng "câu ví dụ" mà exercise engine hiểu (khớp VocabularyExample). */
export interface PracticeExample {
  id: string;
  sentenceHanzi: string;
  sentencePinyin: string;
  sentenceMeaning: string;
}

/**
 * Câu đã lưu CỦA USER (có bản dịch) dưới dạng câu ví dụ, để các dạng bài Điền từ / Sắp xếp / Dịch dùng được.
 * Câu tự viết không có bản dịch nên không dùng cho các dạng này.
 */
export async function listSavedSentencesAsExamples(userId: string, vocabularyIds: string[]): Promise<(PracticeExample & { vocabularyId: string })[]> {
  if (vocabularyIds.length === 0) return [];
  const rows = await prisma.userSentence.findMany({
    where: { userId, vocabularyId: { in: vocabularyIds }, translation: { not: null } },
    orderBy: { createdAt: "desc" },
  });
  return rows.map((r) => ({
    id: r.id,
    vocabularyId: r.vocabularyId,
    sentenceHanzi: r.sentence,
    sentencePinyin: r.pinyin ?? "",
    sentenceMeaning: r.translation ?? "",
  }));
}

/** Tìm câu nền của một câu hỏi: câu ví dụ của từ HOẶC câu đã lưu của chính user (không bao giờ của user khác). */
export async function findPracticeExample(userId: string, vocabularyId: string, exampleId: string): Promise<PracticeExample | null> {
  const shared = await prisma.vocabularyExample.findFirst({ where: { id: exampleId, vocabularyId } });
  if (shared) return shared;
  const mine = await prisma.userSentence.findFirst({ where: { id: exampleId, userId, vocabularyId, translation: { not: null } } });
  return mine ? { id: mine.id, sentenceHanzi: mine.sentence, sentencePinyin: mine.pinyin ?? "", sentenceMeaning: mine.translation ?? "" } : null;
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
