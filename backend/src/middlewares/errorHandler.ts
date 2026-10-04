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
 */
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof AppError) {
    fail(res, err.message, err.statusCode, err.details);
    return;
  }

  // Lỗi Prisma đã biết (vd unique constraint). Nhận diện bằng field `code`
  // (dạng "P20xx") thay vì `instanceof Prisma.PrismaClientKnownRequestError`
  // để không phụ thuộc cứng vào namespace Prisma đã generate.
  if (isPrismaKnownError(err)) {
    if (err.code === "P2002") {
      fail(res, "Dữ liệu đã tồn tại (vi phạm ràng buộc unique).", 409);
      return;
    }
    if (err.code === "P2025") {
      fail(res, "Không tìm thấy dữ liệu.", 404);
      return;
    }
  }

  // Lỗi không lường trước: log đầy đủ ở server, KHÔNG trả chi tiết cho client.
  console.error("[Unexpected Error]", err);
  fail(res, "Đã xảy ra lỗi phía server.", 500);
}

function isPrismaKnownError(err: unknown): err is { code: string } {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    typeof (err as { code: unknown }).code === "string" &&
    (err as { code: string }).code.startsWith("P")
  );
}
