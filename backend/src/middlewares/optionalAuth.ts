import { NextFunction, Request, Response } from "express";
import { prisma } from "../config/prisma";
import { verifyToken } from "../utils/jwt";
import { AuthRequest } from "../types/express";

/**
 * Dành cho endpoint công khai (vd thư viện từ vựng trên trang chủ): có token hợp lệ thì gắn req.user
 * để trả thêm dữ liệu cá nhân (từ nào đã có trong danh sách học); thiếu/sai token thì vẫn cho qua như khách.
 * Token của tài khoản đã xoá hoặc cấp trước lần đặt lại mật khẩu gần nhất cũng bị coi như khách.
 */
export function optionalAuth(req: Request, _res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) return next();

  let payload: ReturnType<typeof verifyToken>;
  try {
    payload = verifyToken(header.slice(7).trim());
  } catch {
    return next(); // token lỗi → coi như khách
  }

  prisma.user
    .findUnique({ where: { id: payload.userId }, select: { id: true, passwordChangedAt: true } })
    .then((user) => {
      const stale = user?.passwordChangedAt && (payload.iat ?? 0) < Math.floor(user.passwordChangedAt.getTime() / 1000);
      if (user && !stale) (req as AuthRequest).user = { id: user.id };
      next();
    })
    .catch(() => next()); // lỗi DB: không chặn endpoint công khai
}
