import { Request, Response } from "express";
import { ok } from "../utils/response";

/**
 * GET /api/health
 * Dùng để xác nhận backend đã start thành công, chưa liên quan
 * tới business logic. Không cần authentication.
 */
export function getHealth(_req: Request, res: Response): void {
  ok(res, { status: "ok" });
}
