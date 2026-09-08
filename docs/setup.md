# Setup Guide (Windows)

Hướng dẫn cài đặt và chạy project trên **Windows**.

## 1. Cài Node.js

Tải và cài Node.js LTS (khuyến nghị v20 trở lên) tại: https://nodejs.org

Kiểm tra sau khi cài:

```bash
node --version
npm --version
```

## 2. Cài PostgreSQL

Tải và cài PostgreSQL tại: https://www.postgresql.org/download/windows/

Trong lúc cài đặt, ghi nhớ:
- Port (mặc định `5432`)
- Password cho user `postgres`

Sau khi cài, có thể dùng **pgAdmin** (đi kèm bộ cài) hoặc `psql` trong Command Prompt để thao tác.

## 3. Clone project

```bash
git clone <đường-dẫn-repository>
cd chinese-vocabulary-app
```

## 4. Cài đặt dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

## 5. Tạo database

Mở `psql` hoặc pgAdmin, chạy:

```sql
CREATE DATABASE chinese_vocabulary;
```

## 6. Cấu hình `.env`

**Backend** — copy file mẫu rồi chỉnh sửa:

```bash
cd backend
copy .env.example .env
```

Mở `backend/.env`, sửa `DATABASE_URL` theo thông tin PostgreSQL của bạn:

```
PORT=5000
DATABASE_URL="postgresql://postgres:<mật-khẩu-của-bạn>@localhost:5432/chinese_vocabulary"
JWT_SECRET="change-me"
JWT_EXPIRES_IN="7d"
```

**Frontend:**

```bash
cd ../frontend
copy .env.example .env
```

Giữ nguyên giá trị mặc định trong `frontend/.env` nếu backend chạy ở `localhost:5000`.

## 7. Prisma generate

```bash
cd ../backend
npx prisma generate
```

Lệnh này tạo Prisma Client (kèm type TypeScript) dựa trên `prisma/schema.prisma`.

## 8. Prisma migrate

```bash
npx prisma migrate dev --name init_database
```

Lệnh này sẽ:
- Tạo các bảng `users`, `vocabularies`, `user_vocabularies` trong database
- Tạo file migration trong `backend/prisma/migrations/`
- Tự động chạy `prisma generate` lại sau khi migrate xong

## 9. Prisma seed

```bash
npm run prisma:seed
```

Seed 10 từ tiếng Trung cơ bản (我, 你, 是, 学生, 老师, 名字, 什么, 中国, 美国, 人) vào database. Script được viết để **chạy nhiều lần không bị duplicate** — an toàn khi chạy lại.

## 10. Chạy backend

```bash
npm run dev
```

Backend chạy tại `http://localhost:5000`. Kiểm tra:

```bash
curl http://localhost:5000/api/health
```

Kết quả mong đợi:

```json
{ "success": true, "data": { "status": "ok" } }
```

## 11. Chạy frontend

Mở terminal mới:

```bash
cd frontend
npm run dev
```

Frontend chạy tại `http://localhost:5173` (Vite mặc định). Mở trình duyệt để xem các page placeholder.

---

## Xử lý sự cố thường gặp

| Lỗi | Nguyên nhân thường gặp | Cách xử lý |
|---|---|---|
| `Environment variables không hợp lệ` khi chạy `npm run dev` | Thiếu hoặc sai `.env` | Kiểm tra `backend/.env` đã copy từ `.env.example` và điền đủ giá trị |
| `Can't reach database server` | PostgreSQL chưa chạy, hoặc sai `DATABASE_URL` | Kiểm tra PostgreSQL service đang chạy (Services app trên Windows), kiểm tra port/password |
| `@prisma/client did not initialize yet` | Chưa chạy `npx prisma generate` | Chạy lại bước 7 |
| Port `5000` hoặc `5173` đã bị chiếm | Có process khác đang dùng port đó | Đổi `PORT` trong `.env` (backend) hoặc dùng `npm run dev -- --port <số-khác>` (frontend) |
