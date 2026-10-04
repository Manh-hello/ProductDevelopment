import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ok } from "../utils/response";
import { parseOrThrow } from "../utils/validate";
import { AuthRequest } from "../types/express";
import * as tagService from "../services/tag.service";
import * as achievementService from "../services/achievement.service";
import * as userSentenceService from "../services/userSentence.service";
import { createUserSentenceSchema, updateUserSentenceSchema } from "../validators/userSentence.validator";

const uid = (req: Request) => (req as AuthRequest).user.id;

export const listTags = asyncHandler(async (_req: Request, res: Response) => {
  ok(res, await tagService.listTags(), 200);
});

export const listAchievements = asyncHandler(async (req: Request, res: Response) => {
  ok(res, await achievementService.listAchievementsForUser(uid(req)), 200);
});

export const createUserSentence = asyncHandler(async (req: Request, res: Response) => {
  const input = parseOrThrow(createUserSentenceSchema, req.body);
  ok(res, await userSentenceService.createUserSentence(uid(req), input), 201);
});

export const listUserSentences = asyncHandler(async (req: Request, res: Response) => {
  const vocabularyId = typeof req.query.vocabularyId === "string" ? req.query.vocabularyId : undefined;
  ok(res, await userSentenceService.listUserSentences(uid(req), vocabularyId), 200);
});

export const updateUserSentence = asyncHandler(async (req: Request, res: Response) => {
  const input = parseOrThrow(updateUserSentenceSchema, req.body);
  ok(res, await userSentenceService.updateUserSentence(uid(req), req.params.id, input), 200);
});

export const deleteUserSentence = asyncHandler(async (req: Request, res: Response) => {
  await userSentenceService.deleteUserSentence(uid(req), req.params.id);
  ok(res, { id: req.params.id }, 200);
});
