import { Request, Response } from "express";
import { fail } from "../utils/response";

/**
 * Bắt mọi request không khớp route nào -> trả 404 đúng format chung.
 * Đặt SAU tất cả các route, TRƯỚC errorHandler trong app.ts.
 */
export function notFound(req: Request, res: Response): void {
  fail(res, `Không tìm thấy route: ${req.method} ${req.originalUrl}`, 404);
}
