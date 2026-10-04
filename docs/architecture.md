# Architecture

`Frontend (React) → REST API → Express → Route → Controller → Service → Prisma → MySQL`

| Layer | Trách nhiệm |
|---|---|
| routes/ | Khai báo endpoint + middleware (`authenticateToken`) |
| controllers/ | Đọc request, validate (Zod), gọi service, trả response chuẩn |
| services/ | Business logic: `auth`, `vocabulary`, `userVocabulary`, `mixing` (Mixing Engine), `exercise` (sinh câu hỏi), `srs` (SM-2), `practice` (điều phối phiên học), `achievement`, `dashboard`, `tag`, `userSentence` |
| middlewares/ | `authenticateToken`, `errorHandler` (tập trung), `notFound` |
| validators/ | Schema Zod cho input |
| config/ | `env.ts` (validate biến môi trường), `prisma.ts` (singleton) |

Lỗi nghiệp vụ `throw AppError(message, status)`; `asyncHandler` chuyển lỗi async về `errorHandler`. Frontend không truy cập DB trực tiếp: `DATABASE_URL` là bí mật phía server và mọi rule phải chạy ở nơi tin cậy.

**Luồng học:** `POST /practice/sessions` (Mixing → sinh câu hỏi) → `POST .../answers` (chấm, SM-2, XP, streak, thành tích) → `PUT .../complete`.
