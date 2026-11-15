import { prisma } from "../config/prisma";
import { AppError } from "../utils/AppError";
import {
  CreateVocabularyInput,
  ListVocabularyQuery,
  UpdateVocabularyInput,
} from "../validators/vocabulary.validator";
import { addVocabularyToUser, countOtherLearners } from "./userVocabulary.service";

export const INCLUDE_RELATIONS = {
  examples: true,
  tags: { include: { tag: true } },
} as const;

/** Chuyển `tags: [{tag:{name}}]` (bảng trung gian) thành `tags: ["name"]` cho client dễ dùng. */
export function flattenTags<T extends { tags: { tag: { name: string } }[] }>(v: T) {
  return { ...v, tags: v.tags.map((t) => t.tag.name) };
}

export async function listVocabularies(query: ListVocabularyQuery) {
  const { page, limit, search, tag, level } = query;

  const where = {
    ...(search
      ? { OR: [{ hanzi: { contains: search } }, { pinyin: { contains: search } }, { meaning: { contains: search } }] }
      : {}),
    ...(level ? { level } : {}),
    ...(tag ? { tags: { some: { tag: { name: tag } } } } : {}),
  };

  const [items, total] = await Promise.all([
    prisma.vocabulary.findMany({
      where,
      include: INCLUDE_RELATIONS,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.vocabulary.count({ where }),
  ]);

  return {
    items: items.map(flattenTags),
    pagination: { page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)) },
  };
}

/**
 * Tra cứu nhanh trong kho từ chung theo Hán tự / Pinyin / nghĩa (bước "hệ thống tìm thông tin" khi thêm từ).
 * Ưu tiên khớp chính xác Hán tự; dùng để điền sẵn form và tránh tạo trùng.
 */
export async function lookupVocabulary(q: string, userId: string) {
  const matches = await prisma.vocabulary.findMany({
    where: { OR: [{ hanzi: { contains: q } }, { pinyin: { contains: q } }, { meaning: { contains: q } }] },
    include: INCLUDE_RELATIONS,
    take: 10,
  });
  const sorted = matches.sort((a: { hanzi: string }, b: { hanzi: string }) => Number(b.hanzi === q) - Number(a.hanzi === q));
  const mine = await prisma.userVocabulary.findMany({
    where: { userId, vocabularyId: { in: sorted.map((m: { id: string }) => m.id) } },
    select: { vocabularyId: true },
  });
  const mineIds = new Set<string>(mine.map((m: { vocabularyId: string }) => m.vocabularyId));
  return {
    items: sorted.map((m: (typeof sorted)[number]) => ({ ...flattenTags(m), inMyList: mineIds.has(m.id) })),
    exactMatch: sorted.some((m: { hanzi: string }) => m.hanzi === q),
  };
}

export async function getVocabularyById(id: string) {
  const vocabulary = await prisma.vocabulary.findUnique({ where: { id }, include: INCLUDE_RELATIONS });
  if (!vocabulary) throw new AppError("Không tìm thấy từ vựng.", 404);
  return flattenTags(vocabulary);
}

/**
 * Kho từ là dùng chung giữa các tài khoản. Chỉ cho sửa/xoá khi KHÔNG có người dùng khác đang học từ đó,
 * để một tài khoản không thể làm hỏng dữ liệu học của người khác.
 */
async function assertCanModify(userId: string, vocabularyId: string) {
  const others = await countOtherLearners(userId, vocabularyId);
  if (others > 0) {
    throw new AppError("Từ này đang được người dùng khác sử dụng nên bạn không thể sửa/xoá bản gốc. Hãy xoá nó khỏi danh sách học của bạn.", 403);
  }
}

/**
 * Form gửi chuỗi rỗng khi người dùng xoá trắng một ô. Với các cột cho phép NULL, lưu `null` thay vì "" (và để
 * PUT thật sự xoá được giá trị cũ — trước đây client bỏ trường rỗng nên không thể xoá ghi chú/cấp độ/từ loại).
 */
const NULLABLE_TEXT_FIELDS = ["pronunciation", "audioUrl", "level", "partOfSpeech", "notes"] as const;
function blankToNull<T extends object>(data: T): T {
  const out: Record<string, unknown> = { ...data };
  for (const k of NULLABLE_TEXT_FIELDS) if (out[k] === "") out[k] = null;
  return out as T;
}

export async function createVocabulary(userId: string, input: CreateVocabularyInput) {
  const { examples, tags, addToMyList, initialStage, reviewNow, ...rest } = input;
  const data = blankToNull(rest);

  // Chặn bản ghi trùng hoàn toàn (cùng Hán tự + Pinyin + nghĩa) - người dùng nên thêm từ có sẵn vào danh sách thay vì tạo bản sao.
  const duplicate = await prisma.vocabulary.findFirst({ where: { hanzi: data.hanzi, pinyin: data.pinyin, meaning: data.meaning }, select: { id: true } });
  if (duplicate) {
    throw new AppError('Từ này (cùng Hán tự, Pinyin và nghĩa) đã có trong kho chung. Hãy bấm "Tra cứu kho từ" rồi chọn "Thêm vào danh sách" thay vì tạo bản mới.', 409);
  }

  const created = await prisma.vocabulary.create({
    data: {
      ...data,
      examples: examples ? { create: examples } : undefined,
      tags: tags
        ? { create: tags.map((name) => ({ tag: { connectOrCreate: { where: { name }, create: { name } } } })) }
        : undefined,
    },
    include: INCLUDE_RELATIONS,
  });

  const userVocabulary = addToMyList ? await addVocabularyToUser(userId, created.id, { initialStage, reviewNow }) : null;
  return { ...flattenTags(created), userVocabulary };
}

export async function updateVocabulary(userId: string, id: string, input: UpdateVocabularyInput) {
  await getVocabularyById(id);
  await assertCanModify(userId, id);
  const { examples, tags, ...rest } = input;
  const data = blankToNull(rest);

  const updated = await prisma.vocabulary.update({
    where: { id },
    data: {
      ...data,
      // Nếu client gửi `examples`/`tags` -> thay thế TOÀN BỘ (replace semantics), đơn giản và dễ đoán hơn merge.
      ...(examples ? { examples: { deleteMany: {}, create: examples } } : {}),
      ...(tags
        ? {
            tags: {
              deleteMany: {},
              create: tags.map((name) => ({ tag: { connectOrCreate: { where: { name }, create: { name } } } })),
            },
          }
        : {}),
    },
    include: INCLUDE_RELATIONS,
  });
  return flattenTags(updated);
}

export async function deleteVocabulary(userId: string, id: string) {
  await getVocabularyById(id);
  await assertCanModify(userId, id);
  await prisma.vocabulary.delete({ where: { id } });
}
