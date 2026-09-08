/**
 * Lỗi nghiệp vụ có chủ đích (validation, not found, unauthorized...).
 *
 * Controller/service throw AppError với statusCode phù hợp,
 * centralized error handler (middlewares/errorHandler.ts) sẽ bắt
 * và trả response đúng format, đúng status code.
 *
 * Các lỗi KHÔNG phải AppError (bug, lỗi không lường trước) sẽ được
 * error handler coi là lỗi 500 và không lộ chi tiết ra client.
 */
export class AppError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    this.name = "AppError";
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
