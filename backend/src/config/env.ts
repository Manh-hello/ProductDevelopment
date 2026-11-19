import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

/**
 * Schema mô tả các biến môi trường bắt buộc cho backend.
 *
 * Nếu thiếu hoặc sai định dạng, ứng dụng sẽ log lỗi rõ ràng và
 * dừng lại ngay lập tức (KHÔNG chạy tiếp với giá trị mặc định ngầm),
 * để tránh các lỗi khó debug về sau (ví dụ: kết nối sai database).
 */
/** Biến để trống trong .env (vd `AI_API_KEY=`) được coi như chưa cấu hình, không làm ứng dụng dừng khởi động. */
const emptyToUndefined = (v: unknown) => (typeof v === "string" && v.trim() === "" ? undefined : v);

const envSchema = z.object({
  PORT: z
    .string()
    .default("5000")
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().int().positive()),
  DATABASE_URL: z
    .string()
    .min(1, "DATABASE_URL không được để trống")
    .startsWith("mysql://", "DATABASE_URL phải là connection string MySQL"),
  JWT_SECRET: z.string().min(1, "JWT_SECRET không được để trống"),
  JWT_EXPIRES_IN: z.string().default("7d"),
  /** Origin frontend được phép gọi API (CORS), phân tách bằng dấu phẩy. Để trống = cho phép mọi origin (chỉ nên dùng khi dev). */
  CORS_ORIGIN: z.string().optional(),
  /** Lệch múi giờ của người học so với UTC (phút) để tính "ngày học"/streak. Mặc định 420 = UTC+7 (Việt Nam). */
  TZ_OFFSET_MINUTES: z
    .string()
    .default("420")
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().int().min(-720).max(840)),

  /** URL gốc của frontend, dùng dựng liên kết đặt lại mật khẩu trong email (không có dấu "/" cuối). */
  FRONTEND_URL: z.preprocess(emptyToUndefined, z.string().url().default("http://localhost:5173")),
  /** Số "hop" proxy tin cậy (nginx, load balancer...) để `req.ip` đúng khi giới hạn tần suất theo IP. 0/để trống = không tin proxy. */
  TRUST_PROXY: z.preprocess(emptyToUndefined, z.coerce.number().int().min(0).max(10).default(0)),

  // ---- Email / SMTP (tuỳ chọn): thiếu cấu hình thì chức năng quên mật khẩu báo "chưa cấu hình" (503) ----
  MAIL_HOST: z.preprocess(emptyToUndefined, z.string().optional()),
  MAIL_PORT: z.preprocess(emptyToUndefined, z.coerce.number().int().min(1).max(65535).default(587)),
  /** true = TLS ngay khi kết nối (thường port 465); false = STARTTLS nếu server hỗ trợ (port 587/25). */
  MAIL_SECURE: z.preprocess(emptyToUndefined, z.enum(["true", "false"]).default("false").transform((v) => v === "true")),
  MAIL_USER: z.preprocess(emptyToUndefined, z.string().optional()),
  MAIL_PASSWORD: z.preprocess(emptyToUndefined, z.string().optional()),
  /** Địa chỉ người gửi, vd `HanziSRS <no-reply@example.com>`. */
  MAIL_FROM: z.preprocess(emptyToUndefined, z.string().optional()),
  /** Hiệu lực liên kết đặt lại mật khẩu (phút). */
  PASSWORD_RESET_TOKEN_TTL_MINUTES: z.preprocess(emptyToUndefined, z.coerce.number().int().min(5).max(1440).default(30)),

  // ---- Nhận diện chữ viết (tuỳ chọn): thiếu HANDWRITING_SERVICE_URL thì API báo "chưa cấu hình" (503) ----
  /** URL dịch vụ model (xem docs/handwriting-model.md), vd http://127.0.0.1:8001 */
  HANDWRITING_SERVICE_URL: z.preprocess(emptyToUndefined, z.string().url().optional()),
  /** Token Bearer gửi tới dịch vụ model (nếu dịch vụ yêu cầu). */
  HANDWRITING_SERVICE_TOKEN: z.preprocess(emptyToUndefined, z.string().optional()),
  HANDWRITING_TIMEOUT_MS: z.preprocess(emptyToUndefined, z.coerce.number().int().min(1000).max(60000).default(8000)),
  /** Dưới ngưỡng này kết quả được coi là "độ tin cậy thấp". Mặc định 0.5 = threshold mặc định của Recognizer. */
  HANDWRITING_MIN_CONFIDENCE: z.preprocess(emptyToUndefined, z.coerce.number().min(0).max(1).default(0.5)),
  HANDWRITING_MAX_IMAGE_BYTES: z.preprocess(emptyToUndefined, z.coerce.number().int().min(10_000).max(10_000_000).default(2_000_000)),

  // ---- AI (tuỳ chọn): thiếu cấu hình thì tính năng AI báo "chưa cấu hình", phần còn lại của app vẫn chạy bình thường ----
  /** Nhà cung cấp LLM: `openai` (cũng dùng cho gateway tương thích OpenAI qua AI_BASE_URL) hoặc `gemini`. */
  AI_PROVIDER: z.preprocess(emptyToUndefined, z.enum(["openai", "gemini"]).optional()),
  /** API key của nhà cung cấp - CHỈ đọc ở backend, không bao giờ trả về client. */
  AI_API_KEY: z.preprocess(emptyToUndefined, z.string().optional()),
  /** Tên model (không có mặc định vì tên model thay đổi theo thời gian - xem tài liệu nhà cung cấp). */
  AI_MODEL: z.preprocess(emptyToUndefined, z.string().optional()),
  /** Chỉ cho `AI_PROVIDER=openai`: base URL tuỳ chọn (mặc định https://api.openai.com/v1). */
  AI_BASE_URL: z.preprocess(emptyToUndefined, z.string().url().optional()),
  /** Thời gian chờ tối đa cho mỗi lần gọi AI (ms). */
  AI_TIMEOUT_MS: z.preprocess(emptyToUndefined, z.coerce.number().int().min(1000).max(120000).default(20000)),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Environment variables không hợp lệ:");
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
