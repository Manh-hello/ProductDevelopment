# Mapping Frontend (hanzi-srs) ↔ Backend API

Nguồn sự thật: `frontend/src/App.tsx` (route), `frontend/src/api/index.ts` (API), `frontend/src/layouts/navigation.ts` (nav). Frontend **đã nối API thật**; bản mapping cũ mô tả frontend tĩnh/mock đã được thay thế hoàn toàn bằng tài liệu này.

## Điều hướng (sidebar)
Mục nav được xác định theo **tiền tố route dài nhất** (`navKeyForPath`), nên route cụ thể thắng tiền tố tổng quát `/practice`. Trang kết quả dùng chung (`/practice/result`, `/review/complete`) giữ mục nav của trang đã dẫn tới nhờ `location.state.navFrom`.

| Mục nav | Route thuộc mục |
|---|---|
| Dashboard & Tổng Quan | `/dashboard` |
| Kho Từ Vựng Cá Nhân | `/vocabulary`, `/vocabulary/new`, `/vocabulary/:id`, `/vocabulary/:id/edit` |
| Thư Viện Từ Vựng HSK | `/library`, `/learn` |
| **Luyện Tập** | `/practice`, `/practice/quiz`, `/reverse-quiz`, `/pinyin`, `/listening`, `/dictation`, `/writing`, `/multi`, `/set`, `/review`, `/review/complete` |
| **Luyện Câu** | `/sentences`, `/practice/sentence-order`, `/fill-blank`, `/translation`, `/translation-hub`, `/sentence-creation`, `/saved-sentences` |
| **Luyện Phát Âm** | `/practice/speaking` |
| Thống Kê & Tiến Độ / Thành Tích / Cài Đặt | `/statistics` / `/achievements` / `/settings` |

Nút thoát phiên: khu Luyện Câu quay về `/sentences`, các khu khác về `/practice`. `/notifications` mở từ Header (không có mục sidebar).

## Trang ↔ API
| Trang | API | Chấm / dữ liệu |
|---|---|---|
| `/auth` | `POST /auth/login`, `/auth/register` | Thật |
| `/forgot-password` (mới) | `POST /auth/forgot-password` | Thật; 503 nếu server chưa cấu hình email |
| `/reset-password` (mới) | `POST /auth/reset-password` (token trong `#token=`) | Thật |
| `/dashboard`, `/statistics`, `/achievements` | `/dashboard/*`, `/statistics/overview`, `/achievements` | Thật (XP, streak, kỹ năng, thử thách ngày) |
| `/notifications` | `/notifications*` | Thật |
| `/settings` | `PUT /auth/me`, `PUT /auth/password`, `GET /auth/export`, `DELETE /auth/me` | Thật |
| `/vocabulary*` | `/vocabularies*`, `/user-vocabularies*`, `/tags`, `POST /vocabularies/ai-lookup` | Thật |
| `/library`, `/learn` | `/catalog/*` | Thật |
| `/practice` (hub) | `GET /dashboard/skills`, điều hướng tới các bài | **Số liệu kỹ năng lấy từ lịch sử thật**; chưa có lượt nào hiển thị "Chưa có dữ liệu". Đã bỏ các số cố định (86.4%, +120 XP, 12 ngày streak...) |
| `/practice/*` (mọi bài), `/review` | `POST /practice/sessions`, `POST .../answers`, `PUT .../complete`, `GET .../:id` | Xem bảng chấm bài dưới đây |
| `/sentences` | `/user-sentences*` (`POST /user-sentences/generate` dùng AI) | Câu do người học viết/lưu |
| `/practice/writing` | như trên + `GET /handwriting/status`, `POST /handwriting/recognize` | Tự đánh giá + nhận diện model (tuỳ chọn) |

## Đã tự động chấm hay người học tự đánh giá?
| Bài | Route | Cách chấm |
|---|---|---|
| Trắc nghiệm / ngược / Pinyin / Nghe từ vựng | `/practice/quiz`, `reverse-quiz`, `pinyin`, `listening` | Server tự chấm |
| Điền chỗ trống, Dịch Trung→Việt | `/practice/fill-blank`, `translation` | Server tự chấm (cần câu nền; thiếu thì từ bị bỏ khỏi phiên) |
| Sắp xếp câu, Dịch Việt→Trung, Chính tả | `/practice/sentence-order`, `translation-hub`, `dictation` | Server tự chấm bằng so khớp chuỗi (không chấm đồng nghĩa) |
| Tự đặt câu | `/practice/sentence-creation` | Server chỉ kiểm tra **có chứa từ mục tiêu** + độ dài; **không chấm ngữ pháp** |
| Luyện viết | `/practice/writing` | **Tự đánh giá**. Model nhận diện chỉ cho kết quả tham khảo, không đổi điểm/XP/SRS |
| Luyện phát âm | `/practice/speaking` | **Tự đánh giá**. Transcript của trình duyệt chỉ hiển thị, không gửi lên server |
| Flashcard / Ôn tập SRS | `/review` | **Tự đánh giá** (Again/Hard/Good/Easy) |

## Hạng mục phụ thuộc cấu hình bên ngoài
| Tính năng | Cần gì | Khi thiếu |
|---|---|---|
| Quên mật khẩu | `MAIL_HOST`, `MAIL_FROM` (+ `MAIL_USER/PASSWORD`), `FRONTEND_URL` | `forgot-password` trả 503, trang hiển thị thông báo chưa cấu hình |
| Nhận diện chữ viết | `handwriting-service` chạy + `HANDWRITING_SERVICE_URL` | Panel báo chưa cấu hình / dịch vụ không phản hồi, nút gửi bị khoá, **không có kết quả giả** |
| Tra từ / sinh câu bằng AI | `AI_*` (xem `.env.example`) | Trả `ai.status = unavailable`, vẫn dùng được các chức năng khác |
