import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { AuthRequest } from "../types/express";

interface Options {
  /** Tên nhóm giới hạn (chỉ để log/thông báo). */
  name: string;
  windowMs: number;
  max: number;
}

/**
 * Giới hạn số request THEO NGƯỜI DÙNG đã đăng nhập (cửa sổ trượt, lưu trong bộ nhớ tiến trình).
 * Phải đặt SAU authenticateToken. Dùng cho endpoint tốn phí (AI) để một tài khoản không đốt hạn mức của cả hệ thống.
 *
 * Lưu ý vận hành: bộ đếm nằm trong RAM của 1 tiến trình - nếu chạy nhiều instance thì mỗi instance đếm riêng
 * (cần Redis nếu muốn giới hạn toàn cục).
 */
export function userRateLimit({ name, windowMs, max }: Options) {
  const hits = new Map<string, number[]>();

  return (req: Request, res: Response, next: NextFunction): void => {
    const userId = (req as AuthRequest).user?.id;
    if (!userId) throw new AppError("Thiếu thông tin xác thực.", 401);

    const now = Date.now();
    const recent = (hits.get(userId) ?? []).filter((t) => now - t < windowMs);

    if (recent.length >= max) {
      const retryAfterSec = Math.max(1, Math.ceil((windowMs - (now - recent[0])) / 1000));
      res.setHeader("Retry-After", String(retryAfterSec));
      console.warn(`[RateLimit:${name}] user bị giới hạn (${max}/${Math.round(windowMs / 1000)}s)`);
      throw new AppError(`Bạn thao tác với AI quá nhanh. Vui lòng thử lại sau khoảng ${retryAfterSec} giây.`, 429);
    }

    recent.push(now);
    hits.set(userId, recent);

    // Dọn bộ nhớ định kỳ để Map không phình mãi.
    if (hits.size > 5000) {
      for (const [id, times] of hits) if (times.every((t) => now - t >= windowMs)) hits.delete(id);
    }
    next();
  };
}

/** Một bộ đếm dùng chung cho MỌI endpoint AI (tra cứu + tạo câu): 30 lần / 10 phút / người dùng. */
export const aiRateLimit = userRateLimit({ name: "ai", windowMs: 10 * 60 * 1000, max: 30 });
