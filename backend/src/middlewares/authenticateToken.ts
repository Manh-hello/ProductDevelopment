import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { verifyToken } from "../utils/jwt";
import { AuthRequest } from "../types/express";

/**
 * Lấy JWT từ header `Authorization: Bearer <token>`, verify, gắn
 * req.user = { id }. Áp dụng cho mọi route cần đăng nhập.
 *
 * Không tự ý cho qua khi thiếu/sai token - luôn throw AppError(401)
 * để centralized error handler trả đúng status code.
 */
export function authenticateToken(req: Request, _res: Response, next: NextFunction): void {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    throw new AppError("Thiếu hoặc sai định dạng token xác thực.", 401);
  }

  const token = header.slice("Bearer ".length).trim();

  try {
    const payload = verifyToken(token);
    (req as AuthRequest).user = { id: payload.userId };
    next();
  } catch {
    throw new AppError("Token không hợp lệ hoặc đã hết hạn.", 401);
  }
}
