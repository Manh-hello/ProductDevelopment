import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ok } from "../utils/response";
import { parseOrThrow } from "../utils/validate";
import { aiLookupSchema } from "../validators/ai.validator";
import * as wordLookupService from "../services/learning/wordLookup.service";
import {
  createVocabularySchema,
  listVocabularyQuerySchema,
  lookupVocabularyQuerySchema,
  updateVocabularySchema,
} from "../validators/vocabulary.validator";
import * as vocabularyService from "../services/vocabulary.service";
import * as userVocabularyService from "../services/userVocabulary.service";
import { AuthRequest } from "../types/express";

const uid = (req: Request) => (req as AuthRequest).user.id;

export const listVocabularies = asyncHandler(async (req: Request, res: Response) => {
  ok(res, await vocabularyService.listVocabularies(parseOrThrow(listVocabularyQuerySchema, req.query)), 200);
});

export const lookupVocabulary = asyncHandler(async (req: Request, res: Response) => {
  const { q } = parseOrThrow(lookupVocabularyQuerySchema, req.query);
  ok(res, await vocabularyService.lookupVocabulary(q, uid(req)), 200);
});

/** Tra cứu + gợi ý dữ liệu từ vựng bằng AI. Chỉ trả gợi ý — KHÔNG ghi gì vào database (lưu qua POST /vocabularies khi người dùng xác nhận). */
export const aiLookupVocabulary = asyncHandler(async (req: Request, res: Response) => {
  ok(res, await wordLookupService.lookupWordWithAi(uid(req), parseOrThrow(aiLookupSchema, req.body)), 200);
});

export const getVocabulary = asyncHandler(async (req: Request, res: Response) => {
  ok(res, await vocabularyService.getVocabularyById(req.params.id), 200);
});

export const getVocabularyProgress = asyncHandler(async (req: Request, res: Response) => {
  ok(res, await userVocabularyService.getVocabularyProgress(uid(req), req.params.id), 200);
});

export const createVocabulary = asyncHandler(async (req: Request, res: Response) => {
  ok(res, await vocabularyService.createVocabulary(uid(req), parseOrThrow(createVocabularySchema, req.body)), 201);
});

export const updateVocabulary = asyncHandler(async (req: Request, res: Response) => {
  ok(res, await vocabularyService.updateVocabulary(uid(req), req.params.id, parseOrThrow(updateVocabularySchema, req.body)), 200);
});

export const deleteVocabulary = asyncHandler(async (req: Request, res: Response) => {
  await vocabularyService.deleteVocabulary(uid(req), req.params.id);
  ok(res, { id: req.params.id }, 200);
});
