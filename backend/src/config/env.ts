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
