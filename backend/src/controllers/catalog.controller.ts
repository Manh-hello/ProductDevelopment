import { Request, Response } from "express";
import { z } from "zod";
import { asyncHandler } from "../utils/asyncHandler";
import { ok } from "../utils/response";
import { parseOrThrow } from "../utils/validate";
import { AuthRequest } from "../types/express";
import * as catalogService from "../services/catalog.service";
import { catalogWordsQuerySchema, enrollSchema } from "../validators/catalog.validator";

/** req.user chỉ có khi đã qua optionalAuth/authenticateToken. */
const maybeUid = (req: Request) => (req as Partial<AuthRequest>).user?.id;

export const overview = asyncHandler(async (req: Request, res: Response) => {
  ok(res, await catalogService.getOverview(maybeUid(req)), 200);
});

export const words = asyncHandler(async (req: Request, res: Response) => {
  ok(res, await catalogService.listCatalogWords(parseOrThrow(catalogWordsQuerySchema, req.query), maybeUid(req)), 200);
});

export const word = asyncHandler(async (req: Request, res: Response) => {
  const { id } = parseOrThrow(z.object({ id: z.string().uuid("id phải là UUID hợp lệ") }), req.params);
  ok(res, await catalogService.getCatalogWord(id, maybeUid(req)), 200);
});

export const enroll = asyncHandler(async (req: Request, res: Response) => {
  ok(res, await catalogService.enrollScope((req as AuthRequest).user.id, parseOrThrow(enrollSchema, req.body)), 200);
});
