import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ok } from "../utils/response";
import * as dashboardService from "../services/dashboard.service";
import { AuthRequest } from "../types/express";

const uid = (req: Request) => (req as AuthRequest).user.id;

export const getDashboardSummary = asyncHandler(async (req: Request, res: Response) => {
  ok(res, await dashboardService.getDashboardSummary(uid(req)), 200);
});

export const getWeakWords = asyncHandler(async (req: Request, res: Response) => {
  ok(res, await dashboardService.getWeakWords(uid(req)), 200);
});

export const getWeeklyActivity = asyncHandler(async (req: Request, res: Response) => {
  ok(res, await dashboardService.getWeeklyActivity(uid(req)), 200);
});

export const getRecentXp = asyncHandler(async (req: Request, res: Response) => {
  ok(res, await dashboardService.getRecentXpTransactions(uid(req)), 200);
});
