import { z, ZodSchema } from "zod";
import { AppError } from "./AppError";

/**
 * Parse input bằng Zod; nếu sai, throw AppError(400) kèm chi tiết lỗi
 * theo từng field (để frontend hiển thị đúng field bị lỗi).
 * Dùng ở đầu mỗi controller thay vì try/catch lặp lại thủ công.
 *
 * Generic ràng buộc theo chính kiểu Schema (thay vì ZodSchema<T> cố định)
 * để TypeScript suy ra đúng OUTPUT type sau transform/coerce/default,
 * không bị lẫn với INPUT type (vd z.coerce.number().default(1)).
 */
export function parseOrThrow<Schema extends ZodSchema>(
  schema: Schema,
  input: unknown
): z.infer<Schema> {
  const result = schema.safeParse(input);
  if (!result.success) {
    throw new AppError("Dữ liệu không hợp lệ.", 400, result.error.flatten().fieldErrors);
  }
  return result.data;
}
