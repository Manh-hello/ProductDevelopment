import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { fail } from "../utils/response";

/**
 * Centralized error handler - middleware CUỐI CÙNG trong app.ts
 * (Express nhận diện middleware xử lý lỗi qua đúng 4 tham số).
 *
 * Mọi controller/service KHÔNG cần try/catch lặp lại thủ công cho
 * từng loại lỗi - chỉ cần throw AppError (lỗi nghiệp vụ đã biết trước)
 * hoặc để lỗi bất ngờ (bug, lỗi Prisma...) tự rơi xuống đây.
 *
 * Ở Phase 2 chưa có nhiều loại lỗi nghiệp vụ (chưa có auth,
 * chưa có validation phức tạp) nên handler này còn đơn giản.
 * Từ Phase 3 trở đi sẽ bổ sung thêm nhánh xử lý cho:
 * - lỗi validation (Zod)
 * - lỗi authentication/authorization
 * - lỗi Prisma (unique constraint, not found...)
 */
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof AppError) {
    fail(res, err.message, err.statusCode);
    return;
  }

  // Lỗi không lường trước: log đầy đủ ở server, KHÔNG trả chi tiết cho client.
  console.error("[Unexpected Error]", err);
  fail(res, "Đã xảy ra lỗi phía server.", 500);
}
