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

## Lỗi thường gặp

| Lỗi                                     | Cách xử lý                              |
| --------------------------------------- | --------------------------------------- |
| `Environment variables không hợp lệ`    | Thiếu/sai `backend/.env`                |
| `Can't reach database server`           | MySQL chưa chạy hoặc sai `DATABASE_URL` |
| `Authentication failed`                 | Sai user/mật khẩu trong `DATABASE_URL`  |
| `@prisma/client did not initialize yet` | Chạy `npx prisma generate`              |
| Seed báo "Chưa seed catalog exercise"   | Chạy `npm run prisma:seed`              |

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
