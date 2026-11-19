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
   npx prisma migrate dev
   npm run prisma:seed
   npm run prisma:enrich -- --dry-run --limit=8
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

> `npx prisma migrate dev` áp dụng **toàn bộ** migration trong `backend/prisma/migrations` (kể cả `20261115000000_add_password_reset` và `20261115010000_add_handwriting_and_session_plan`). Production dùng `npx prisma migrate deploy`. Sau khi pull code mới có `nodemailer`, chạy lại `npm install` trong `backend/`.

> Nếu trước đây bạn đã chạy migration PostgreSQL: xoá thư mục `backend/prisma/migrations` cũ (zip này đã bỏ sẵn) vì đổi provider sang MySQL cần lịch sử migration mới.

## Cấu hình AI (tuỳ chọn)

Tính năng "Tra cứu bằng AI" và "Tạo câu" cần một nhà cung cấp LLM. **Không cấu hình thì ứng dụng vẫn chạy bình thường**; các tính năng AI báo "chưa cấu hình" (tra cứu vẫn điền Pinyin, tạo câu dùng câu ví dụ có sẵn nếu có).

Trong `backend/.env`:

| Biến            | Ý nghĩa                                                           |
| --------------- | ----------------------------------------------------------------- |
| `AI_PROVIDER`   | `openai` (cả gateway tương thích OpenAI) hoặc `gemini`            |
| `AI_API_KEY`    | API key — chỉ ở backend, **không commit**                         |
| `AI_MODEL`      | Tên model theo tài liệu nhà cung cấp (không có mặc định)          |
| `AI_BASE_URL`   | Tuỳ chọn, chỉ cho `openai` (mặc định `https://api.openai.com/v1`) |
| `AI_TIMEOUT_MS` | Timeout mỗi lần gọi (mặc định 20000)                              |

Cần đủ `AI_PROVIDER`, `AI_API_KEY`, `AI_MODEL` mới coi là đã cấu hình. Mỗi tài khoản bị giới hạn 30 lượt gọi AI / 10 phút (bộ đếm trong RAM của 1 tiến trình). Sau khi cập nhật code chạy `npx prisma migrate dev` để áp migration mới. Chạy test logic: `npm test` (trong `backend/`).

## Quên mật khẩu qua email (cấu hình SMTP)

Không cấu hình thì ứng dụng vẫn chạy; `POST /auth/forgot-password` trả **503** "chưa cấu hình" và trang Quên mật khẩu hiển thị đúng thông báo đó.

Trong `backend/.env` (không commit giá trị thật):

| Biến | Ý nghĩa |
|---|---|
| `MAIL_HOST`, `MAIL_FROM` | **Bắt buộc** để coi là đã cấu hình. `MAIL_FROM` ví dụ `HanziSRS <no-reply@your-domain>` |
| `MAIL_PORT` | Mặc định `587` |
| `MAIL_SECURE` | `true` cho port 465 (TLS ngay); `false` cho 587/25 (STARTTLS nếu server hỗ trợ) |
| `MAIL_USER`, `MAIL_PASSWORD` | Bỏ trống nếu relay nội bộ không cần đăng nhập (vd Mailpit). Gmail/Outlook: dùng mật khẩu ứng dụng (app password) |
| `FRONTEND_URL` | URL gốc frontend để dựng liên kết `…/reset-password#token=…`. Dev: `http://localhost:5173`. Production: URL công khai của frontend |
| `PASSWORD_RESET_TOKEN_TTL_MINUTES` | Hiệu lực liên kết, mặc định 30 (5–1440) |
| `TRUST_PROXY` | Số proxy đứng trước backend (nginx/LB) để giới hạn tần suất theo IP đúng; local để `0` |

Thử local không cần tài khoản email thật: chạy Mailpit (`docker run -p 8025:8025 -p 1025:1025 axllent/mailpit`), đặt `MAIL_HOST=127.0.0.1`, `MAIL_PORT=1025`, `MAIL_FROM=HanziSRS <no-reply@localhost>`, rồi mở `http://localhost:8025` xem email.

Thử API:
```bash
curl -X POST http://localhost:5000/api/auth/forgot-password -H "Content-Type: application/json" -d '{"email":"you@example.com"}'
# lấy token trong liên kết email (phần sau #token=), rồi:
curl -X POST http://localhost:5000/api/auth/reset-password -H "Content-Type: application/json" -d '{"token":"<token>","newPassword":"matkhaumoi123"}'
```

## Nhận diện chữ viết (model đã train)

Chi tiết đầy đủ: [`handwriting-model.md`](handwriting-model.md). Tóm tắt:
```bash
cd handwriting-service
python -m venv .venv && .venv\Scripts\activate        # Linux/macOS: source .venv/bin/activate
pip install -r requirements.txt
uvicorn app:app --host 127.0.0.1 --port 8001
```
Rồi trong `backend/.env`: `HANDWRITING_SERVICE_URL=http://127.0.0.1:8001` (và `HANDWRITING_SERVICE_TOKEN` nếu đặt token cho dịch vụ). Không đặt `HANDWRITING_SERVICE_URL` thì API `/handwriting/recognize` trả 503 và giao diện báo chưa cấu hình (không có kết quả giả).

## Lỗi thường gặp

| Lỗi                                     | Cách xử lý                              |
| --------------------------------------- | --------------------------------------- |
| `Environment variables không hợp lệ`    | Thiếu/sai `backend/.env`                |
| `Can't reach database server`           | MySQL chưa chạy hoặc sai `DATABASE_URL` |
| `Authentication failed`                 | Sai user/mật khẩu trong `DATABASE_URL`  |
| `@prisma/client did not initialize yet` | Chạy `npx prisma generate`              |
| Seed báo "Chưa seed catalog exercise"   | Chạy `npm run prisma:seed`              |
| `forgot-password` trả 503 "chưa được cấu hình" | Thiếu `MAIL_HOST`/`MAIL_FROM` trong `backend/.env` (xem mục SMTP) |
| `forgot-password` trả 200 nhưng không có email | Lỗi SMTP chỉ được log phía server (`[PasswordReset] Gửi email thất bại`) vì phản hồi không được lộ thông tin; kiểm tra log, `MAIL_*`, mật khẩu ứng dụng, thư mục spam |
| Liên kết trong email trỏ sai địa chỉ | Sửa `FRONTEND_URL` rồi khởi động lại backend |
| `reset-password` trả 400 "không hợp lệ hoặc đã hết hạn" | Token quá 30 phút, đã dùng, hoặc có yêu cầu mới hơn nhưng bạn dùng liên kết cũ (liên kết cũ vẫn dùng được tới khi hết hạn; dùng xong thì mọi liên kết còn lại bị vô hiệu) |
| 429 ở quên/đặt lại mật khẩu | Vượt giới hạn theo IP; chờ theo `Retry-After`. Sau reverse proxy mà mọi người cùng bị giới hạn → đặt `TRUST_PROXY` |
| Sau khi đặt lại mật khẩu, thiết bị khác bị đăng xuất | Đúng thiết kế: JWT cấp trước đó bị vô hiệu |
| `/handwriting/recognize` trả 503 | Chưa đặt `HANDWRITING_SERVICE_URL`, hoặc dịch vụ Python chưa chạy / sai token (xem `docs/handwriting-model.md`) |
| `/handwriting/recognize` trả 413/415 | Ảnh > `HANDWRITING_MAX_IMAGE_BYTES` (2 MB) hoặc không phải PNG/JPEG/WebP gửi dạng ảnh thô |
| Trang Điền từ/Sắp xếp/Dịch báo "chưa có câu ví dụ phù hợp" | Từ trong danh sách học chưa có câu ví dụ; thêm câu ở form từ vựng hoặc lưu câu ở mục Luyện Câu |

## Dữ liệu từ vựng HSK (thư viện từ)

`npm run prisma:seed` nạp **595 từ HSK 1–3** (150 / 147 / 298 từ) từ `backend/prisma/data/hsk-vi.txt` (Hán tự, nghĩa tiếng Việt, loại từ, chủ đề; Pinyin tạo bằng `pinyin-pro`, ghi đè thủ công ở cột 5 khi cần thanh nhẹ/tên riêng). Seed chạy lại được nhiều lần: không tạo trùng, không ghi đè từ đã có, chỉ chuẩn hoá cấp độ `HSK1` → `HSK 1` và bổ sung chủ đề còn thiếu.

- Thêm/sửa từ: chỉnh `hsk-vi.txt` (định dạng `hanzi|nghĩa|loại từ|mã chủ đề[|pinyin]`, mã chủ đề trong `src/constants/catalog.ts`) rồi chạy lại seed.
- Từ HSK mới seed chưa có câu ví dụ: dùng nút AI ở form thêm từ, hoặc thêm thủ công, để các bài Điền từ / Sắp xếp câu / Dịch câu hoạt động.
- HSK 4–6 chưa có dữ liệu: thư viện hiển thị "Sắp có", người học vẫn tự thêm từ như bình thường.

## Làm giàu từ vựng bằng AI (Hán Việt, ví dụ, kết hợp từ...)

Sau khi cấu hình `AI_*` trong `backend/.env`:

```bash
cd backend
npx prisma migrate dev --name add_vocabulary_enrichment   # thêm cột mới vào DB
npx prisma generate
npm run prisma:enrich -- --dry-run --limit=8              # chạy thử, chỉ in kết quả
npm run prisma:enrich -- --limit=40                       # ghi DB 40 từ; chạy lại để làm tiếp
```

Tuỳ chọn: `--level="HSK 1"`, `--batch=8`, `--delay=6000` (ms giữa các lô, mặc định ≈10 lượt/phút), `--force` (làm lại từ đã làm giàu). Script chạy lại được, bỏ qua từ đã có `enriched_at`, chỉ điền trường còn trống và chỉ thêm câu ví dụ (đảm bảo mỗi từ ≥ 3 câu).
