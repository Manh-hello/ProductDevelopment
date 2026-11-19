import { z } from "zod";

/** Quy tắc mật khẩu dùng chung cho đăng ký và đặt lại mật khẩu (đổi mật khẩu có thông điệp riêng nhưng cùng giới hạn 6-72). */
export const passwordSchema = z.string().min(6, "Mật khẩu cần ít nhất 6 ký tự").max(72, "Mật khẩu quá dài");

export const registerSchema = z.object({
  name: z.string().trim().min(1, "Tên không được để trống").max(100, "Tên quá dài"),
  email: z.string().trim().email("Email không hợp lệ"),
  password: passwordSchema,
  dailyGoal: z.coerce.number().int().min(1).max(200).optional(),
  /** Trình độ khởi điểm (vd "hsk1") - lưu vào settings.level. */
  level: z.string().trim().max(20).optional(),
});

export const loginSchema = z.object({
  email: z.string().trim().email("Email không hợp lệ"),
  password: z.string().min(1, "Vui lòng nhập mật khẩu"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

export const updateProfileSchema = z.object({
  displayName: z.string().trim().min(1, "Tên không được để trống").max(100).optional(),
  avatarUrl: z.string().trim().max(500).nullable().optional(),
  dailyGoal: z.coerce.number().int().min(1, "Mục tiêu tối thiểu 1 từ").max(200).optional(),
  /** Tuỳ chọn cá nhân dạng JSON phẳng (thuật toán, giao diện, âm thanh...). Được gộp (merge) vào settings hiện có. */
  settings: z.record(z.union([z.string().max(200), z.number(), z.boolean(), z.null()])).optional(),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Vui lòng nhập mật khẩu hiện tại"),
  newPassword: z.string().min(6, "Mật khẩu mới cần ít nhất 6 ký tự").max(72, "Mật khẩu quá dài"),
});

export const deleteAccountSchema = z.object({ password: z.string().min(1, "Vui lòng nhập mật khẩu để xác nhận") });

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().trim().toLowerCase().email("Email không hợp lệ").max(255),
});

export const resetPasswordSchema = z.object({
  /** Token base64url 43 ký tự; giới hạn độ dài để không băm chuỗi khổng lồ. */
  token: z.string().trim().min(20, "Liên kết không hợp lệ").max(200, "Liên kết không hợp lệ"),
  newPassword: passwordSchema,
});
