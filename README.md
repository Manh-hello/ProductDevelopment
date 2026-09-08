# Chinese Vocabulary Learning Website

Website hỗ trợ học, luyện tập và ghi nhớ từ vựng tiếng Trung, hướng tới một hệ thống học tập đa chiều (không chỉ flashcard đơn thuần): kết hợp nhận diện chữ Hán, Pinyin, nghĩa, nghe, viết, đặt câu, phát âm — cùng cơ chế Spaced Repetition để tối ưu việc ghi nhớ dài hạn.

## Features

Trạng thái hiện tại: dự án đang ở **Phase 2 — nền móng kỹ thuật**. Chưa có tính năng học tập nào hoàn chỉnh; xem [Development Status](#development-status) bên dưới.

## Tech Stack

**Frontend**
- React + TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios

**Backend**
- Node.js + Express + TypeScript
- REST API

**Database**
- PostgreSQL

**ORM**
- Prisma

**Authentication** *(sẽ dùng từ Phase 3)*
- JWT
- bcryptjs

## Project Structure

```
chinese-vocabulary-app/
├── frontend/          # React + TypeScript + Vite
├── backend/           # Node.js + Express + TypeScript + Prisma
├── docs/              # Tài liệu kiến trúc, database, setup...
├── database/          # (Dự trữ cho tài liệu/script liên quan database)
├── README.md
├── .gitignore
└── .env.example
```

Chi tiết cấu trúc bên trong `backend/` và `frontend/`, xem [docs/architecture.md](docs/architecture.md).

## Requirements

- Node.js (v20+)
- PostgreSQL
- npm

## Installation

Hướng dẫn cài đặt đầy đủ, từng bước: [docs/setup.md](docs/setup.md)

Tóm tắt nhanh:

```bash
# Backend
cd backend
npm install
copy .env.example .env      # rồi chỉnh DATABASE_URL
npx prisma generate
npx prisma migrate dev --name init_database
npm run prisma:seed
npm run dev

# Frontend (terminal khác)
cd frontend
npm install
copy .env.example .env
npm run dev
```

## Environment Variables

**backend/.env**

| Biến | Ý nghĩa |
|---|---|
| `PORT` | Port backend lắng nghe (mặc định `5000`) |
| `DATABASE_URL` | Connection string PostgreSQL |
| `JWT_SECRET` | Secret ký JWT — **sẽ dùng từ Phase 3**, cần khai báo sẵn |
| `JWT_EXPIRES_IN` | Thời hạn token JWT (ví dụ `7d`) |

**frontend/.env**

| Biến | Ý nghĩa |
|---|---|
| `VITE_API_URL` | Base URL của backend API (ví dụ `http://localhost:5000/api`) |

**KHÔNG commit file `.env` thật** — chỉ commit `.env.example`.

## Database

3 bảng nền tảng: `users`, `vocabularies`, `user_vocabularies`. Chi tiết đầy đủ từng column, quan hệ và lý do thiết kế: [docs/database.md](docs/database.md)

## API Documentation

Ở Phase 2 chỉ có `GET /api/health` để xác nhận backend chạy được. Tài liệu API đầy đủ (`docs/api.md`) sẽ được tạo khi các API thật (Authentication, Vocabulary CRUD) được triển khai ở Phase 3–4.

## Development Status

- [x] Project structure (monorepo)
- [x] Frontend setup (React + TS + Vite + Tailwind + Router)
- [x] Backend setup (Express + TypeScript)
- [x] PostgreSQL
- [x] Prisma schema (`users`, `vocabularies`, `user_vocabularies`)
- [x] Prisma migration *(chạy trên máy dev — xem lưu ý ở báo cáo Phase 2)*
- [x] Prisma seed (10 từ cơ bản)
- [x] Health check (`GET /api/health`)
- [ ] Authentication (JWT)
- [ ] Vocabulary CRUD
- [ ] Exercise Engine
- [ ] Spaced Repetition
- [ ] Listening
- [ ] Speaking
- [ ] AI (tạo bài tập, phân tích từ vựng)
- [ ] Statistics
- [ ] Gamification

## Roadmap

| Phase | Nội dung |
|---|---|
| 1 | Phân tích requirement, đề xuất architecture & database schema *(đã duyệt)* |
| 2 | Project structure, setup frontend/backend, Prisma migration, seed *(hiện tại)* |
| 3 | Authentication API + JWT middleware |
| 4 | Vocabulary CRUD API + User Vocabulary API |
| 5 | Frontend: authentication, vocabulary page, kết nối backend |
| 6 | Documentation đầy đủ, Postman collection |
| 7 | Kiểm tra toàn bộ project, fix lỗi, build production |
