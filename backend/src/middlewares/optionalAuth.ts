import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import { AuthRequest } from "../types/express";

/**
 * Dành cho endpoint công khai (vd thư viện từ vựng trên trang chủ): có token hợp lệ thì gắn req.user
 * để trả thêm dữ liệu cá nhân (từ nào đã có trong danh sách học); thiếu/sai token thì vẫn cho qua như khách.
 */
export function optionalAuth(req: Request, _res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  if (header?.startsWith("Bearer ")) {
    try {
      (req as AuthRequest).user = { id: verifyToken(header.slice(7).trim()).userId };
    } catch {
      /* token lỗi → coi như khách */
    }
  }
  next();
}
