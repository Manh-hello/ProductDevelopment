# Tra cứu từ & tạo câu bằng AI

- Backend: lớp adapter AI (`services/ai/`: OpenAI-compatible + Gemini), `POST /vocabularies/ai-lookup`, `POST /user-sentences/generate`, `POST /user-sentences` mở rộng (câu AI), `POST /practice/sessions` thêm `sentenceSource`, rate limit theo user (`middlewares/rateLimit.ts`), migration `user_sentences`.
- `POST /vocabularies` trả 409 khi trùng hoàn toàn Hán tự + Pinyin + nghĩa.
- Frontend: `VocabularyForm` (Tra cứu bằng AI / Tạo lại ví dụ / nhãn "AI gợi ý"), `SentenceGenerator` trong `/sentences`, trang `/practice/saved-sentences`.

---

# Nối frontend ↔ backend & hoàn thiện API (đợt này)

## Backend – mới / thay đổi

| Nhóm | Endpoint | Ghi chú |
|---|---|---|
| Auth | `PUT /auth/me` | Sửa `displayName`, `avatarUrl`, `dailyGoal`, `settings` (JSON phẳng, **merge** vào settings cũ) |
| Auth | `PUT /auth/password`, `DELETE /auth/me` (body `{password}`), `GET /auth/export` | Đổi mật khẩu / xoá tài khoản / sao lưu JSON |
| Auth | `POST /auth/register` | Nhận thêm `dailyGoal`, `level` |
| Vocabulary | `GET /vocabularies/lookup?q=` | Tra cứu kho chung theo Hán tự/Pinyin/nghĩa (kèm `inMyList`) |
| Vocabulary | `GET /vocabularies/:id/progress` | Hồ sơ SRS của từ + 6 kỹ năng + lịch sử + câu đã đặt |
| Vocabulary | `POST /vocabularies` | Thêm `addToMyList`, `initialStage` (`new`/`learning`/`familiar`), `reviewNow` |
| Vocabulary | `PUT/DELETE /vocabularies/:id` | **Chỉ cho phép khi không có user khác đang học từ đó** (kho từ dùng chung) |
| My words | `GET /user-vocabularies?filter=&search=&page=&limit=` | Trả `{items, pagination, counts}`; `items` có `state`, `accuracy`, `intervalDays`, `isWeak` |
| My words | `PATCH /user-vocabularies/:vocabularyId` | `note`, `mnemonic` (riêng của user), `resetProgress` |
| Practice | `POST /practice/sessions` | Nhận `exerciseTypes[]` (13 dạng bài), `sessionType: mixed/daily_review/practice` |
| Practice | `POST /practice/sessions/:id/answers` | Server **tự chấm**; hỗ trợ `quality` (0-5) cho thẻ ghi nhớ/viết/nói, `exampleId` cho dạng dựa trên câu |
| Practice | `GET /practice/sessions/:id`, `GET /practice/sessions` | Tổng kết phiên / lịch sử |
| Dashboard | `/dashboard/skills`, `/vocabulary-growth`, `/daily-challenge` (+`POST /claim`), `/review-forecast` | |
| Statistics | `GET /statistics/overview?range=7d\|30d\|quarter\|all` | KPI, chuỗi theo ngày, kỹ năng, từ hay sai |
| Notifications | `GET /notifications`, `GET /unread-count`, `PATCH /:id/read`, `POST /read-all`, `DELETE /:id` | Nhắc ôn SRS sinh "lười" khi mở danh sách |
| Achievements | `GET /achievements` | 20 thành tích + tiến độ `progress {current,target}` |

### Dạng bài (`exerciseType`)
`QUIZ`, `REVERSE_QUIZ`, `PINYIN`, `LISTENING`, `DICTATION`, `FILL_BLANK`, `SENTENCE_ORDER`, `TRANSLATION`, `TRANSLATION_HUB`, `SENTENCE_CREATION`, `WRITING`, `SPEAKING`, `FLASHCARD`.
Câu hỏi trả về `inputMode` (`choice|text|order|self|flashcard`) và `display` – **không chứa đáp án**.
Dạng cần câu ví dụ mà từ chưa có ví dụ sẽ tự hạ xuống `QUIZ`.

### Sửa lỗi
- `REVERSE_QUIZ` trước đây trả `hanzi` (chính là đáp án) cho client.
- Mốc "hôm nay"/streak tính theo UTC → nay theo `TZ_OFFSET_MINUTES` (mặc định 420 = UTC+7).
- Trả lời trùng một từ trong cùng phiên → 409; phiên đã hoàn thành → 409 (chống farm XP).
- `server.ts` log nhầm "PostgreSQL".
- Catalog `exercises` tự bù (không còn lỗi "chưa seed" khi thiếu loại bài).

### Migration mới
`20261013000000_add_notifications_user_settings`: bảng `notifications`, cột `users.settings` (JSON), `user_vocabularies.note/mnemonic`.
Chạy: `npx prisma migrate deploy && npm run prisma:seed` (seed nạp thêm thành tích, idempotent).

### Biến môi trường mới (backend)
`CORS_ORIGIN` (vd `http://localhost:5173`), `TZ_OFFSET_MINUTES`.

## Frontend
- `src/lib/api.ts` (fetch + JWT + chuẩn hoá lỗi), `src/api/index.ts` (toàn bộ endpoint), `src/lib/auth.tsx` (AuthProvider, `RequireAuth`), `src/lib/useApi.ts`.
- Cấu hình: `VITE_API_URL` (xem `frontend/.env.example`, mặc định `http://localhost:5000/api`).
- Route cần đăng nhập đều được bảo vệ; token lưu `localStorage`, 401 → tự đăng xuất.
- 13 trang luyện tập + `/review` dùng chung `PracticeRunner` (giữ ngôn ngữ thiết kế của Quiz).

## Nhập Pinyin trực tiếp (không bị chuyển thành chữ Hán)
- Backend: `POST /pinyin/convert` (`utils/pinyin.ts`, thư viện `pinyin-pro` cho Hán tự → Pinyin; bộ đổi số thanh → dấu thanh tự viết). Cần chạy `npm install` ở `backend/`.
- Frontend: `components/PinyinInput.tsx` dùng ở `VocabularyForm` (Pinyin của từ và của câu ví dụ). Có nút "Tạo từ Hán tự"; rời ô Hán tự mà Pinyin trống thì tự điền.
