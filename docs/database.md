# Database Documentation

Database: **PostgreSQL**, quản lý qua **Prisma ORM**.
Toàn bộ primary key dùng **UUID** (không dùng auto-increment int) để tránh lộ số lượng record qua URL và thuận tiện khi hệ thống lớn dần.

## ERD (dạng text)

```
User
 |
 | 1 : N
 v
UserVocabulary
 |
 | N : 1
 v
Vocabulary
```

Ngoài ra còn một quan hệ phụ: `Vocabulary.createdByUserId → User.id` (một user có thể là người tạo ra 0..N vocabulary).

---

## 1. `users`

**Mục đích:** lưu tài khoản người dùng của hệ thống.

| Column | Type | Nullable | Unique | Ghi chú |
|---|---|---|---|---|
| `id` | UUID | Không | PK | `gen_random_uuid()` |
| `email` | TEXT | Không | Có | Dùng để đăng nhập, phải duy nhất |
| `password_hash` | TEXT | Không | Không | Mật khẩu đã hash (bcrypt), **không bao giờ lưu plain text** |
| `name` | TEXT | Không | Không | Tên hiển thị |
| `created_at` | TIMESTAMP | Không | — | Tự động gán khi tạo |
| `updated_at` | TIMESTAMP | Không | — | Tự động cập nhật mỗi lần sửa |

**Lý do thiết kế:**
- `email` unique để đảm bảo mỗi email chỉ đăng ký được 1 tài khoản, đồng thời dùng làm điều kiện lookup nhanh khi login (nên implicit unique index đã đủ, không cần index riêng).
- Không lưu password dạng plain text — chỉ lưu `password_hash` (bcrypt), tuân thủ nguyên tắc bảo mật cơ bản.

---

## 2. `vocabularies`

**Mục đích:** lưu kho từ vựng tiếng Trung (kho chung của hệ thống, hoặc do một user tự tạo).

| Column | Type | Nullable | Unique | Ghi chú |
|---|---|---|---|---|
| `id` | UUID | Không | PK | |
| `hanzi` | TEXT | Không | Không | Chữ Hán |
| `pinyin` | TEXT | Không | Không | Phiên âm |
| `meaning` | TEXT | Không | Không | Nghĩa tiếng Việt |
| `example` | TEXT | Có | Không | Câu ví dụ (chữ Hán) |
| `example_pinyin` | TEXT | Có | Không | Pinyin của câu ví dụ |
| `example_meaning` | TEXT | Có | Không | Nghĩa của câu ví dụ |
| `created_by_user_id` | UUID | Có | Không | FK → `users.id`, xem giải thích bên dưới |
| `created_at` | TIMESTAMP | Không | — | |
| `updated_at` | TIMESTAMP | Không | — | |

**`created_by_user_id` — giải thích quan trọng:**

- **`null`** → vocabulary thuộc **kho chung / system vocabulary** (ví dụ: dữ liệu seed, hoặc do admin thêm). Đây là trường hợp mặc định ở Phase 2.
- **khác `null`** → vocabulary do **chính một user tự tạo** (chuẩn bị cho tính năng "kho từ vựng cá nhân" ở giai đoạn sau, theo báo cáo đề xuất).
- Quan hệ này dùng `onDelete: SetNull`: nếu user tạo ra từ đó bị xoá tài khoản, **từ vựng không bị xoá theo** (dữ liệu học tập dùng chung không nên biến mất chỉ vì 1 user rời đi) — chỉ mất thông tin "ai đã tạo ra nó".

**Index:**
- `hanzi`, `pinyin`: hai trường được tìm kiếm/lọc thường xuyên nhất khi user search từ vựng (`GET /api/vocabularies?search=...` ở Phase 4).
- `created_by_user_id`: phục vụ truy vấn "lấy tất cả từ vựng do user X tạo" ở giai đoạn sau.

---

## 3. `user_vocabularies`

**Mục đích:** bảng trung gian (many-to-many) thể hiện **user nào đang học từ nào**, cùng với tiến độ ghi nhớ của riêng user đó với từ đó.

| Column | Type | Nullable | Unique | Ghi chú |
|---|---|---|---|---|
| `id` | UUID | Không | PK | |
| `user_id` | UUID | Không | — | FK → `users.id`, `onDelete: Cascade` |
| `vocabulary_id` | UUID | Không | — | FK → `vocabularies.id`, `onDelete: Cascade` |
| `mastery` | INTEGER | Không (default 0) | — | Mức độ ghi nhớ, hiện tại là số nguyên đơn giản |
| `correct_count` | INTEGER | Không (default 0) | — | Số lần trả lời đúng |
| `wrong_count` | INTEGER | Không (default 0) | — | Số lần trả lời sai |
| `interval` | INTEGER | Không (default 0) | — | Số ngày tới lần ôn kế tiếp — **chuẩn bị cho SRS**, chưa có thuật toán ở Phase này |
| `last_review` | TIMESTAMP | Có | — | Lần ôn gần nhất, `null` nếu chưa ôn lần nào |
| `next_review` | TIMESTAMP | Có | — | Lịch ôn kế tiếp — **chuẩn bị cho SRS** |
| `created_at` | TIMESTAMP | Không | — | |
| `updated_at` | TIMESTAMP | Không | — | |

**Ràng buộc quan trọng:**
- **`UNIQUE (user_id, vocabulary_id)`**: một user không thể thêm trùng 1 từ 2 lần vào danh sách học của mình. Ràng buộc đặt ở tầng database (không chỉ ở logic code) để an toàn ngay cả khi có bug ở tầng API.
- **`onDelete: Cascade`** cho cả 2 FK: xoá user hoặc xoá vocabulary sẽ tự động xoá các dòng `user_vocabularies` liên quan, tránh dữ liệu mồ côi (orphan record).

**Index:**
- `user_id`: phục vụ truy vấn phổ biến nhất — "lấy danh sách từ vựng của user X".
- `next_review`: **chưa dùng ở Phase 2**, nhưng chuẩn bị sẵn cho Phase Review/SRS khi cần query "những từ cần ôn hôm nay" (`WHERE next_review <= now()`) — có index từ đầu để tránh phải migrate lại schema khi feature đó cần hiệu năng tốt.

---

## Vì sao chưa có bảng cho Exercise / SRS thuật toán / Statistics / Gamification?

Theo đúng nguyên tắc "không tạo bảng chưa cần" của Phase 2: các bảng như `exercises`, `exercise_results`, `review_sessions`, `user_statistics`... sẽ được thêm ở các phase sau dưới dạng **migration mới**, tham chiếu tới `users` và `vocabularies` qua foreign key. Việc không tạo trước không làm hỏng khả năng mở rộng — ngược lại, tránh phải sửa lại 3 bảng gốc này khi các bảng mới xuất hiện.
