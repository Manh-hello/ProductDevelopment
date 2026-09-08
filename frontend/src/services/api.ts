import axios from "axios";

/**
 * Axios instance dùng chung cho toàn bộ frontend.
 *
 * Phase 2: chưa có authentication -> chưa cần interceptor gắn token.
 * Phase 3 sẽ thêm request interceptor để tự động gắn:
 *   Authorization: Bearer <token>
 * vào mọi request, đọc token từ nơi lưu trữ (ví dụ AuthContext).
 */
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
