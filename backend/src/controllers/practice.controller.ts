import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ok } from "../utils/response";
import { parseOrThrow } from "../utils/validate";
import { listSessionsQuerySchema, startSessionSchema, submitAnswerSchema } from "../validators/practice.validator";
import * as practiceService from "../services/practice.service";
import { AuthRequest } from "../types/express";

export const startSession = asyncHandler(async (req: Request, res: Response) => {
  const input = parseOrThrow(startSessionSchema, req.body);
  const result = await practiceService.startSession(
    (req as AuthRequest).user.id,
    input
  );
  ok(res, result, 201);
});

export const submitAnswer = asyncHandler(async (req: Request, res: Response) => {
  const input = parseOrThrow(submitAnswerSchema, req.body);
  const result = await practiceService.submitAnswer(
    (req as AuthRequest).user.id,
    req.params.sessionId,
    input
  );
  ok(res, result, 200);
});

export const completeSession = asyncHandler(async (req: Request, res: Response) => {
  const result = await practiceService.completeSession(
    (req as AuthRequest).user.id,
    req.params.sessionId
  );
  ok(res, result, 200);
});

export const getSessionSummary = asyncHandler(async (req: Request, res: Response) => {
  ok(res, await practiceService.getSessionSummary((req as AuthRequest).user.id, req.params.sessionId), 200);
});

export const listSessions = asyncHandler(async (req: Request, res: Response) => {
  const { limit } = parseOrThrow(listSessionsQuerySchema, req.query);
  ok(res, await practiceService.listSessions((req as AuthRequest).user.id, limit), 200);
});
