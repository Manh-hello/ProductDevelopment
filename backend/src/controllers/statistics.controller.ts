import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ok } from "../utils/response";
import { parseOrThrow } from "../utils/validate";
import { statisticsQuerySchema } from "../validators/statistics.validator";
import { getStatisticsOverview } from "../services/statistics.service";
import { AuthRequest } from "../types/express";

export const overview = asyncHandler(async (req: Request, res: Response) => {
  const { range } = parseOrThrow(statisticsQuerySchema, req.query);
  ok(res, await getStatisticsOverview((req as AuthRequest).user.id, range), 200);
});
