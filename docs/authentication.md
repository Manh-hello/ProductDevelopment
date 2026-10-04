# Authentication

JWT qua header `Authorization: Bearer <token>`. Mật khẩu hash bằng bcryptjs (10 rounds), không bao giờ trả `password_hash` về client (dùng `select` tường minh). Token chỉ chứa `{ userId }`, ký bằng `JWT_SECRET`, hết hạn theo `JWT_EXPIRES_IN` (mặc định `7d`). Middleware: `src/middlewares/authenticateToken.ts`.
