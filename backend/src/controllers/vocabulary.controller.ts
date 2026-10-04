import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ok } from "../utils/response";
import { parseOrThrow } from "../utils/validate";
import {
  createVocabularySchema,
  listVocabularyQuerySchema,
  updateVocabularySchema,
} from "../validators/vocabulary.validator";
import * as vocabularyService from "../services/vocabulary.service";

export const listVocabularies = asyncHandler(async (req: Request, res: Response) => {
  const query = parseOrThrow(listVocabularyQuerySchema, req.query);
  const result = await vocabularyService.listVocabularies(query);
  ok(res, result, 200);
});

export const getVocabulary = asyncHandler(async (req: Request, res: Response) => {
  const vocabulary = await vocabularyService.getVocabularyById(req.params.id);
  ok(res, vocabulary, 200);
});

export const createVocabulary = asyncHandler(async (req: Request, res: Response) => {
  const input = parseOrThrow(createVocabularySchema, req.body);
  const vocabulary = await vocabularyService.createVocabulary(input);
  ok(res, vocabulary, 201);
});

export const updateVocabulary = asyncHandler(async (req: Request, res: Response) => {
  const input = parseOrThrow(updateVocabularySchema, req.body);
  const vocabulary = await vocabularyService.updateVocabulary(req.params.id, input);
  ok(res, vocabulary, 200);
});

export const deleteVocabulary = asyncHandler(async (req: Request, res: Response) => {
  await vocabularyService.deleteVocabulary(req.params.id);
  ok(res, { id: req.params.id }, 200);
});
