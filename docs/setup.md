# Setup (Windows)

1. Cài **Node.js 20+** và **MySQL 8** (MySQL Installer, nhớ mật khẩu `root`).
2. Tạo database (MySQL Workbench hoặc CLI):
   ```sql
   CREATE DATABASE chinese_vocabulary CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```
3. Backend:
   ```bash
   cd backend
   npm install
   copy .env.example .env
   ```
   Sửa `DATABASE_URL="mysql://root:<mật-khẩu>@localhost:3306/chinese_vocabulary"` (ký tự đặc biệt trong mật khẩu cần URL-encode) và đặt `JWT_SECRET` riêng.
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init_mysql_schema
   npm run prisma:seed
   npm run dev
   ```
   Kiểm tra: `http://localhost:5000/api/health`.
4. Frontend:
   ```bash
   cd frontend
   npm install
   copy .env.example .env
   npm run dev
   ```
   Mở `http://localhost:5173`.

> Nếu trước đây bạn đã chạy migration PostgreSQL: xoá thư mục `backend/prisma/migrations` cũ (zip này đã bỏ sẵn) vì đổi provider sang MySQL cần lịch sử migration mới.

## Lỗi thường gặp
| Lỗi | Cách xử lý |
|---|---|
| `Environment variables không hợp lệ` | Thiếu/sai `backend/.env` |
| `Can't reach database server` | MySQL chưa chạy hoặc sai `DATABASE_URL` |
| `Authentication failed` | Sai user/mật khẩu trong `DATABASE_URL` |
| `@prisma/client did not initialize yet` | Chạy `npx prisma generate` |
| Seed báo "Chưa seed catalog exercise" | Chạy `npm run prisma:seed` |
