# Architecture Documentation

## Luồng xử lý một request

```
Frontend (React)
      │
      ▼
   REST API  (HTTP/JSON)
      │
      ▼
   Express (app.ts)
      │
      ▼
  Middleware (cors, json parser, [authenticateToken ở Phase 3])
      │
      ▼
    Route  (routes/*.routes.ts)
      │
      ▼
  Controller  (controllers/*.controller.ts)
      │
      ▼
   Service  (services/*.service.ts)
      │
      ▼
   Prisma Client
      │
      ▼
   PostgreSQL
```

Nếu có lỗi ở bất kỳ bước nào, lỗi được `throw` lên và bắt bởi
**centralized error handler** (`middlewares/errorHandler.ts`) — controller/service
không cần tự viết `try/catch` lặp lại ở từng chỗ.

## Trách nhiệm của từng lớp (layer)

| Layer | Trách nhiệm | KHÔNG làm gì |
|---|---|---|
| **routes/** | Khai báo endpoint (method + path) và middleware áp dụng cho endpoint đó (ví dụ `authenticateToken`) | Không chứa logic xử lý |
| **controllers/** | Đọc request (params/query/body), gọi service tương ứng, format response bằng `utils/response.ts` | Không chứa business logic, không gọi Prisma trực tiếp |
| **services/** | Chứa business logic thật sự (validate nghiệp vụ, tính toán, gọi Prisma) | Không biết gì về `req`/`res` của Express |
| **middlewares/** | Logic chạy trước/sau route: auth, error handling, not-found | Không chứa logic nghiệp vụ riêng của 1 tính năng |
| **validators/** | Định nghĩa schema Zod để validate input trước khi vào service | Không tự trả response — chỉ throw lỗi validation |
| **config/** | Đọc & validate biến môi trường (`env.ts`), khởi tạo Prisma Client singleton (`prisma.ts`) | Không chứa logic nghiệp vụ |
| **utils/** | Helper dùng chung: format response, `AppError` | Không phụ thuộc vào 1 tính năng cụ thể nào |
| **types/** | Định nghĩa TypeScript type/interface dùng chung | — |

## Vì sao tách controller / service?

- **Controller** chỉ là lớp "phiên dịch" giữa HTTP và logic nghiệp vụ — dễ đọc, dễ test.
- **Service** chứa toàn bộ logic thật, có thể tái sử dụng ở nơi khác (ví dụ: script seed, cron job sau này) mà không phụ thuộc Express.
- Nếu sau này đổi framework HTTP (ví dụ Express → Fastify), chỉ cần viết lại controller, service giữ nguyên.

## Vì sao frontend không truy cập database trực tiếp?

1. **Bảo mật**: connection string database (`DATABASE_URL`) chứa thông tin nhạy cảm — nếu đặt ở frontend (chạy trên trình duyệt người dùng), ai cũng có thể đọc được.
2. **Kiểm soát nghiệp vụ**: mọi validate, authorization, business rule cần chạy ở một nơi tin cậy (server) — trình duyệt có thể bị người dùng can thiệp (sửa code, gọi trực tiếp).
3. **Tính nhất quán**: nếu sau này có thêm client khác (mobile app, admin panel), tất cả đều đi qua cùng một REST API, đảm bảo logic nghiệp vụ chỉ tồn tại ở một chỗ duy nhất thay vì lặp lại ở từng client.

Vì vậy, frontend **chỉ** giao tiếp với backend qua `frontend/src/services/api.ts` (Axios), không bao giờ import Prisma hay kết nối PostgreSQL trực tiếp.

## Khả năng mở rộng ở các phase sau

Kiến trúc layer (route → controller → service → Prisma) cho phép thêm tính năng mới **mà không cần sửa code cũ**:

- **Phase 3 (Authentication):** thêm `middlewares/authenticateToken.ts`, `routes/auth.routes.ts`, `controllers/auth.controller.ts`, `services/auth.service.ts`.
- **Phase 4 (Vocabulary CRUD):** thêm route/controller/service tương ứng cho `vocabularies` và `user-vocabularies`.
- **Các phase sau (Exercise, SRS, AI, Statistics, Gamification):** mỗi tính năng là một bộ route/controller/service mới, cộng thêm bảng database mới (migration mới) — không đụng vào 3 bảng và các module đã có ở Phase 2.
