import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ok } from "../utils/response";
import * as userVocabularyService from "../services/userVocabulary.service";
import { AuthRequest } from "../types/express";

export const listUserVocabularies = asyncHandler(async (req: Request, res: Response) => {
  const items = await userVocabularyService.listUserVocabularies((req as AuthRequest).user.id);
  ok(res, items, 200);
});

export const getUserVocabulary = asyncHandler(async (req: Request, res: Response) => {
  const item = await userVocabularyService.getUserVocabularyById(
    (req as AuthRequest).user.id,
    req.params.id
  );
  ok(res, item, 200);
});

export const addUserVocabulary = asyncHandler(async (req: Request, res: Response) => {
  const item = await userVocabularyService.addVocabularyToUser(
    (req as AuthRequest).user.id,
    req.params.vocabularyId
  );
  ok(res, item, 201);
});

export const removeUserVocabulary = asyncHandler(async (req: Request, res: Response) => {
  await userVocabularyService.removeVocabularyFromUser(
    (req as AuthRequest).user.id,
    req.params.vocabularyId
  );
  ok(res, { vocabularyId: req.params.vocabularyId }, 200);
});
