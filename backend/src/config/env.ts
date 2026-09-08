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
const envSchema = z.object({
  PORT: z
    .string()
    .default("5000")
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().int().positive()),
  DATABASE_URL: z
    .string()
    .min(1, "DATABASE_URL không được để trống")
    .startsWith("postgresql://", "DATABASE_URL phải là connection string PostgreSQL"),
  JWT_SECRET: z.string().min(1, "JWT_SECRET không được để trống"),
  JWT_EXPIRES_IN: z.string().default("7d"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Environment variables không hợp lệ:");
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
