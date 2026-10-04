import { prisma } from "../config/prisma";
import { AppError } from "../utils/AppError";
import {
  CreateVocabularyInput,
  ListVocabularyQuery,
  UpdateVocabularyInput,
} from "../validators/vocabulary.validator";

const INCLUDE_RELATIONS = {
  examples: true,
  tags: { include: { tag: true } },
} as const;

/** Chuyển `tags: [{tag:{name}}]` (bảng trung gian) thành `tags: ["name"]` cho client dễ dùng. */
function flattenTags<T extends { tags: { tag: { name: string } }[] }>(v: T) {
  return { ...v, tags: v.tags.map((t) => t.tag.name) };
}

export async function listVocabularies(query: ListVocabularyQuery) {
  const { page, limit, search, tag, level } = query;

  const where = {
    ...(search
      ? {
          OR: [
            { hanzi: { contains: search } },
            { pinyin: { contains: search } },
            { meaning: { contains: search } },
          ],
        }
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

export async function getVocabularyById(id: string) {
  const vocabulary = await prisma.vocabulary.findUnique({ where: { id }, include: INCLUDE_RELATIONS });
  if (!vocabulary) {
    throw new AppError("Không tìm thấy từ vựng.", 404);
  }
  return flattenTags(vocabulary);
}

export async function createVocabulary(input: CreateVocabularyInput) {
  const { examples, tags, ...data } = input;

  const created = await prisma.vocabulary.create({
    data: {
      ...data,
      examples: examples ? { create: examples } : undefined,
      tags: tags
        ? {
            create: tags.map((name) => ({
              tag: { connectOrCreate: { where: { name }, create: { name } } },
            })),
          }
        : undefined,
    },
    include: INCLUDE_RELATIONS,
  });
  return flattenTags(created);
}

export async function updateVocabulary(id: string, input: UpdateVocabularyInput) {
  await getVocabularyById(id);
  const { examples, tags, ...data } = input;

  const updated = await prisma.vocabulary.update({
    where: { id },
    data: {
      ...data,
      // Nếu client gửi `examples`/`tags` -> thay thế TOÀN BỘ (replace semantics), đơn giản và dễ đoán hơn merge.
      ...(examples
        ? { examples: { deleteMany: {}, create: examples } }
        : {}),
      ...(tags
        ? {
            tags: {
              deleteMany: {},
              create: tags.map((name) => ({
                tag: { connectOrCreate: { where: { name }, create: { name } } },
              })),
            },
          }
        : {}),
    },
    include: INCLUDE_RELATIONS,
  });
  return flattenTags(updated);
}

export async function deleteVocabulary(id: string) {
  await getVocabularyById(id);
  await prisma.vocabulary.delete({ where: { id } });
}
