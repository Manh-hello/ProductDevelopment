# Authentication

JWT qua header `Authorization: Bearer <token>`. Mật khẩu hash bằng bcryptjs (10 rounds), không bao giờ trả `password_hash` về client (dùng `select` tường minh). Token chỉ chứa `{ userId }`, ký bằng `JWT_SECRET`, hết hạn theo `JWT_EXPIRES_IN` (mặc định `7d`). Middleware: `src/middlewares/authenticateToken.ts`.

## Quên / đặt lại mật khẩu
`POST /auth/forgot-password` → email chứa liên kết `FRONTEND_URL/reset-password#token=…` → `POST /auth/reset-password`. Token 256 bit ngẫu nhiên, chỉ lưu hash SHA-256, hiệu lực `PASSWORD_RESET_TOKEN_TTL_MINUTES` (30 phút), dùng một lần. Sau khi đặt lại, `users.password_changed_at` được cập nhật và **mọi JWT cấp trước đó bị từ chối** (kiểm tra trong `authenticateToken`/`optionalAuth`, so sánh `iat` theo giây). Đổi mật khẩu khi đang đăng nhập (`PUT /auth/password`) **không** thu hồi JWT hiện có. Chi tiết: `docs/api.md`.
