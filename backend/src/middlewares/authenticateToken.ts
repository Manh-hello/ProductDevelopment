import { NextFunction, Request, Response } from "express";
import { prisma } from "../config/prisma";
import { AppError } from "../utils/AppError";
import { verifyToken } from "../utils/jwt";
import { AuthRequest } from "../types/express";

/**
 * Lấy JWT từ header `Authorization: Bearer <token>`, verify, gắn
 * req.user = { id }. Áp dụng cho mọi route cần đăng nhập.
 *
 * Ngoài chữ ký/hạn của JWT, middleware còn kiểm tra trong DB:
 *  - người dùng còn tồn tại (tài khoản đã xoá thì token cũ vô hiệu);
 *  - token được cấp SAU lần đặt lại mật khẩu gần nhất (`password_changed_at`) - phiên cũ bị đăng xuất sau khi reset.
 *
 * Không tự ý cho qua khi thiếu/sai token - luôn trả AppError(401).
 */
export function authenticateToken(req: Request, _res: Response, next: NextFunction): void {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    throw new AppError("Thiếu hoặc sai định dạng token xác thực.", 401);
  }

  const token = header.slice("Bearer ".length).trim();

  let payload: ReturnType<typeof verifyToken>;
  try {
    payload = verifyToken(token);
  } catch {
    throw new AppError("Token không hợp lệ hoặc đã hết hạn.", 401);
  }

  prisma.user
    .findUnique({ where: { id: payload.userId }, select: { id: true, passwordChangedAt: true } })
    .then((user) => {
      if (!user) throw new AppError("Token không hợp lệ hoặc đã hết hạn.", 401);
      // So sánh theo GIÂY (iat là số nguyên giây) để token cấp ngay sau khi reset không bị loại nhầm.
      if (user.passwordChangedAt && (payload.iat ?? 0) < Math.floor(user.passwordChangedAt.getTime() / 1000)) {
        throw new AppError("Phiên đăng nhập đã hết hiệu lực. Vui lòng đăng nhập lại.", 401);
      }
      (req as AuthRequest).user = { id: user.id };
      next();
    })
    .catch(next);
}
