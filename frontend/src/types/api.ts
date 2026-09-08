/**
 * Format response chuẩn mà mọi API backend trả về (xem docs/api.md).
 * Dùng chung để không cần định nghĩa lại type ở từng service.
 */
export interface ApiSuccess<T> {
  success: true;
  data: T;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: unknown;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;
