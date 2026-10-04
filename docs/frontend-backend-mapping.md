# Mapping Frontend (hanzi-srs) ↔ Backend API

Frontend hiện tại (`frontend/`, package `hanzi-srs`) là UI **tĩnh, chưa gọi API nào** (không có `fetch`/`axios`/biến môi trường trong code — dữ liệu là mock cứng trong từng trang, trạng thái tạm lưu qua `useStoredState` = localStorage). Bảng dưới đây map từng trang tới API đã có sẵn, để việc nối API thật sau này chỉ còn là thay `ROWS`/mock bằng kết quả `fetch`, không cần đổi lại thiết kế.

| Trang (route) | API tương ứng | Trạng thái |
|---|---|---|
| `/auth` | `POST /auth/register`, `POST /auth/login` | ✅ Sẵn sàng |
| `/dashboard` | `GET /dashboard/summary`, `/weak-words`, `/weekly-activity`, `/recent-xp` | ✅ Sẵn sàng, **trừ** khối "Thử Thách Hôm Nay" (+150 XP) — xem Gap #1 |
| `/vocabulary` | `GET /vocabularies`, `GET /user-vocabularies` | ✅ Sẵn sàng (UI có tab `due/weak` — đây là giá trị **suy ra** từ `nextReviewAt <= now` / `incorrectCount >= 2`, không phải `status` lưu trong DB, xem `docs/database.md`) |
| `/vocabulary/new` | `POST /vocabularies` | ✅ (hỗ trợ `examples[]`, `tags[]` lồng nhau) |
| `/vocabulary/:id`, `/vocabulary/:id/edit` | `GET/PUT /vocabularies/:id` | ✅ |
| `/practice` (Practice Hub) | `POST /practice/sessions` | ✅ |
| `/practice/quiz`, `/practice/reverse-quiz`, `/practice/pinyin` | `POST /practice/sessions/:id/answers` (`exerciseType`: `QUIZ`\|`REVERSE_QUIZ`\|`PINYIN`) | ✅ Sinh câu hỏi thật (Exercise Engine) |
| `/practice/multi` | `POST /practice/sessions` với `sessionType="mixed"` | ✅ (Mixing Engine 20/50/30) |
| `/practice/result` | `PUT /practice/sessions/:id/complete` | ✅ |
| `/review`, `/review/complete` | `POST /practice/sessions` (`sessionType="daily_review"`), `PUT .../complete` | ✅ |
| `/practice/dictation`, `/translation`, `/fill-blank`, `/sentence-order`, `/sentence-creation`, `/translation-hub`, `/writing`, `/listening`, `/speaking` | Catalog `exercises` đã có dòng tương ứng (`DICTATION`, `TRANSLATION`, `FILL_BLANK`, `SENTENCE_ORDER`, `SENTENCE_CREATION`, `TRANSLATION_HUB`, `WRITING`, `LISTENING`, `SPEAKING`) | ⚠️ **Catalog có sẵn nhưng Exercise Engine (`exercise.service.ts`) chưa sinh câu hỏi cho các loại này** — mới hỗ trợ 3 loại MVP (`QUIZ`/`REVERSE_QUIZ`/`PINYIN`) đúng PRD mục 13. Xem Gap #2 |
| `/statistics` | `GET /dashboard/weekly-activity`, `/weak-words` | ✅ (chưa có endpoint riêng cho biểu đồ theo tháng — dùng tạm weekly) |
| `/achievements` | `GET /achievements` | ⚠️ UI hiện có ~20 thẻ thành tích tĩnh (nhiều nhóm: streak, dimensions, legends...); backend mới seed **5 thành tích cơ bản** (`WORDS_10/50/100`, `STREAK_7/30`). Xem Gap #3 |
| `/notifications` | *(chưa có endpoint)* | ❌ Chưa làm — xem Gap #4 |
| `/settings` | `PUT /auth/me` *(chưa có)* | ❌ Hiện chỉ có `GET /auth/me`, chưa có API cập nhật `dailyGoal`/`displayName`/`avatarUrl`. Xem Gap #5 |

## Các khoảng trống (Gap) cần làm tiếp khi nối API thật

1. **Daily Challenge (+150 XP)**: chưa có bảng/endpoint. Đã khai báo sẵn hằng số `XP_DAILY_CHALLENGE_BONUS = 150` (`constants/xp.ts`) để khỏi lệch số với UI, nhưng logic tạo/hoàn thành challenge riêng biệt với `study_sessions` thường chưa có.
2. **7 dạng bài tập UI đã có nhưng Exercise Engine chưa sinh câu hỏi**: `DICTATION, TRANSLATION, FILL_BLANK, SENTENCE_ORDER, SENTENCE_CREATION, TRANSLATION_HUB, WRITING, LISTENING, SPEAKING`. Cần viết thêm generator cho từng loại trong `exercise.service.ts` (nhiều loại cần audio/AI chấm điểm — ngoài phạm vi MVP theo PRD).
3. **Achievement catalog UI phong phú hơn DB**: cần bổ sung thêm dòng vào bảng `achievements` (seed) + điều kiện tương ứng trong `ACHIEVEMENT_CONDITIONS` (`achievement.service.ts`) để khớp số lượng thẻ UI hiển thị.
4. **Notifications**: chưa có bảng/API. Cần thiết kế thêm nếu muốn trang `/notifications` hoạt động thật (không có trong ERD gốc bạn cung cấp).
5. **Cập nhật hồ sơ**: cần thêm `PUT /auth/me` để trang Settings lưu được `dailyGoal`/`displayName`/`avatarUrl` (hiện chỉ đọc được qua `GET /auth/me`).

Không có gap nào phá vỡ phần đã làm — tất cả là **bổ sung thêm**, phần Auth/Vocabulary/Practice (MVP)/Dashboard/Achievements cơ bản đã hoạt động đầy đủ với schema MySQL hiện tại.
