import { z } from "zod";
import { parseHskLevel } from "../constants/catalog";

/** Phạm vi một "bộ từ": theo cấp độ HSK, chủ đề hoặc trình độ người học (kết hợp được). */
export const scopeShape = {
  level: z
    .string()
    .trim()
    .max(20)
    .optional()
    .refine((v) => v === undefined || v === "" || parseHskLevel(v) !== null, "Cấp độ phải là HSK 1 đến HSK 6"),
  topic: z.string().trim().max(50).optional(),
  band: z.enum(["beginner", "intermediate", "advanced"]).optional(),
};

export const scopeSchema = z.object(scopeShape);

export const catalogWordsQuerySchema = z.object({
  ...scopeShape,
  search: z.string().trim().max(100).optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(30),
});

export const enrollSchema = z
  .object({
    ...scopeShape,
    /** Số từ MỚI tối đa thêm vào danh sách học trong một lần (mặc định 20). */
    limit: z.coerce.number().int().min(1).max(300).default(20),
  })
  .refine((v) => Boolean(v.level || v.topic || v.band), { message: "Hãy chọn cấp độ, chủ đề hoặc trình độ." });

export type CatalogWordsQuery = z.infer<typeof catalogWordsQuerySchema>;
export type EnrollInput = z.infer<typeof enrollSchema>;
export type ScopeInput = z.infer<typeof scopeSchema>;
