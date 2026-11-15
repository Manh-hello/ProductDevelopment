import { AppError } from "../../utils/AppError";

/**
 * Phân loại lỗi AI để service phía trên quyết định fallback:
 *  - NOT_CONFIGURED: chưa có AI_PROVIDER/AI_API_KEY/AI_MODEL
 *  - TIMEOUT: quá AI_TIMEOUT_MS
 *  - UPSTREAM: nhà cung cấp lỗi / từ chối / quá hạn mức
 *  - INVALID_OUTPUT: trả về không phải JSON hợp lệ hoặc sai schema (sau khi đã thử lại)
 */
export type AiErrorCode = "NOT_CONFIGURED" | "TIMEOUT" | "UPSTREAM" | "INVALID_OUTPUT";

/**
 * Message luôn là tiếng Việt, KHÔNG chứa API key, URL nội bộ hay nội dung phản hồi thô của nhà cung cấp.
 * `code` chỉ dùng ở server (không đưa vào response).
 */
export class AiError extends AppError {
  public readonly code: AiErrorCode;

  constructor(code: AiErrorCode, message: string, statusCode: number) {
    super(message, statusCode);
    this.name = "AiError";
    this.code = code;
    Object.setPrototypeOf(this, AiError.prototype);
  }
}

export interface AiJsonRequest {
  system: string;
  user: string;
}

/**
 * Adapter nhà cung cấp LLM. Chỉ cần trả về CHUỖI văn bản (kỳ vọng là JSON);
 * việc parse + kiểm tra schema nằm ở `generateValidatedJson` (không tin dữ liệu LLM).
 */
export interface AiProvider {
  readonly name: string;
  readonly model: string;
  completeJson(req: AiJsonRequest, signal: AbortSignal): Promise<string>;
}
