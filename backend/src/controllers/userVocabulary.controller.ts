import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ok } from "../utils/response";
import { parseOrThrow } from "../utils/validate";
import * as service from "../services/userVocabulary.service";
import { listUserVocabularyQuerySchema, updateUserVocabularySchema } from "../validators/userVocabulary.validator";
import { AuthRequest } from "../types/express";

const uid = (req: Request) => (req as AuthRequest).user.id;

export const listUserVocabularies = asyncHandler(async (req: Request, res: Response) => {
  ok(res, await service.listUserVocabularies(uid(req), parseOrThrow(listUserVocabularyQuerySchema, req.query)), 200);
});

export const getUserVocabulary = asyncHandler(async (req: Request, res: Response) => {
  ok(res, await service.getUserVocabularyById(uid(req), req.params.id), 200);
});

export const addUserVocabulary = asyncHandler(async (req: Request, res: Response) => {
  ok(res, await service.addVocabularyToUser(uid(req), req.params.vocabularyId), 201);
});

export const updateUserVocabulary = asyncHandler(async (req: Request, res: Response) => {
  ok(res, await service.updateUserVocabulary(uid(req), req.params.vocabularyId, parseOrThrow(updateUserVocabularySchema, req.body)), 200);
});

export const removeUserVocabulary = asyncHandler(async (req: Request, res: Response) => {
  await service.removeVocabularyFromUser(uid(req), req.params.vocabularyId);
  ok(res, { vocabularyId: req.params.vocabularyId }, 200);
});
