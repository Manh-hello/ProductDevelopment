import { z } from "zod";

const exampleSchema = z.object({
  sentenceHanzi: z.string().trim().min(1).max(500),
  sentencePinyin: z.string().trim().min(1).max(500),
  sentenceMeaning: z.string().trim().min(1).max(500),
  audioUrl: z.string().trim().max(500).optional(),
});

export const createVocabularySchema = z.object({
  hanzi: z.string().trim().min(1, "Hán tự không được để trống").max(50),
  pinyin: z.string().trim().min(1, "Pinyin không được để trống").max(200),
  meaning: z.string().trim().min(1, "Nghĩa không được để trống").max(500),
  pronunciation: z.string().trim().max(200).optional(),
  audioUrl: z.string().trim().max(500).optional(),
  level: z.string().trim().max(20).optional(),
  partOfSpeech: z.string().trim().max(50).optional(),
  notes: z.string().trim().max(5000).optional(),
  examples: z.array(exampleSchema).max(20).optional(),
  tags: z.array(z.string().trim().min(1).max(50)).max(20).optional(),
});

export const updateVocabularySchema = createVocabularySchema.partial();

export const listVocabularyQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  search: z.string().trim().optional(),
  tag: z.string().trim().optional(),
  level: z.string().trim().optional(),
});

export type CreateVocabularyInput = z.infer<typeof createVocabularySchema>;
export type UpdateVocabularyInput = z.infer<typeof updateVocabularySchema>;
export type ListVocabularyQuery = z.infer<typeof listVocabularyQuerySchema>;
