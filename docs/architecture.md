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

## Thành phần bổ sung
- `services/mail.service.ts` (nodemailer/SMTP) + `services/passwordReset.service.ts`: luồng quên mật khẩu. Email cấu hình hoàn toàn bằng biến môi trường `MAIL_*`.
- `services/handwriting/` (adapter) + `services/handwriting.service.ts`: nhận diện chữ viết. Route/controller chỉ biết interface `HandwritingRecognizer`; đổi model = viết adapter mới và đổi `getRecognizer()`.
- `handwriting-service/` (Python, FastAPI): tiến trình riêng bọc `Recognizer` của model đã train; backend gọi qua HTTP (`HANDWRITING_SERVICE_URL`). Frontend **không** gọi trực tiếp dịch vụ này.

`Frontend → Express /api/handwriting/recognize → adapter HTTP → handwriting-service (PyTorch) → kết quả → Express → Frontend`
