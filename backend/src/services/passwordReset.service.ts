import crypto from "crypto";
import bcrypt from "bcryptjs";
import { prisma } from "../config/prisma";
import { env } from "../config/env";
import { AppError } from "../utils/AppError";
import { isMailConfigured, sendPasswordResetEmail } from "./mail.service";

const SALT_ROUNDS = 10;
/** Mỗi tài khoản tối đa N token được phát hành trong cửa sổ này (chống spam hộp thư của nạn nhân). */
const MAX_TOKENS_PER_WINDOW = 3;
const WINDOW_MS = 60 * 60 * 1000;

const hashToken = (token: string) => crypto.createHash("sha256").update(token).digest("hex");

/**
 * Bước 1: yêu cầu email đặt lại mật khẩu.
 *
 * Hàm này LUÔN hoàn tất êm (không ném lỗi theo email) để phản hồi giống hệt nhau dù email có tồn tại hay không.
 * Ngoại lệ duy nhất là 503 khi hệ thống chưa cấu hình email - áp dụng cho mọi email nên không lộ gì về tài khoản.
 * Email được gửi nền (không await) để thời gian phản hồi không phụ thuộc SMTP; lỗi gửi chỉ được log.
 */
export async function requestPasswordReset(email: string): Promise<void> {
  if (!isMailConfigured()) {
    throw new AppError("Chức năng khôi phục mật khẩu chưa được cấu hình trên máy chủ. Vui lòng liên hệ quản trị viên.", 503);
  }

  const user = await prisma.user.findUnique({ where: { email }, select: { id: true, email: true, displayName: true } });
  if (!user) return;

  const since = new Date(Date.now() - WINDOW_MS);
  const recent = await prisma.passwordResetToken.count({ where: { userId: user.id, createdAt: { gte: since } } });
  if (recent >= MAX_TOKENS_PER_WINDOW) return; // im lặng bỏ qua, phản hồi vẫn như bình thường

  const token = crypto.randomBytes(32).toString("base64url"); // 256 bit ngẫu nhiên
  const record = await prisma.passwordResetToken.create({
    data: {
      userId: user.id,
      tokenHash: hashToken(token),
      expiresAt: new Date(Date.now() + env.PASSWORD_RESET_TOKEN_TTL_MINUTES * 60_000),
    },
    select: { id: true },
  });

  // Token đặt trong fragment (#) để không bị gửi lên server/Referer/log của hosting frontend.
  const resetUrl = `${env.FRONTEND_URL.replace(/\/$/, "")}/reset-password#token=${token}`;

  void sendPasswordResetEmail(user.email, user.displayName, resetUrl, env.PASSWORD_RESET_TOKEN_TTL_MINUTES).catch(async (err: unknown) => {
    // Chỉ log loại lỗi, KHÔNG log liên kết/token/địa chỉ email.
    console.error("[PasswordReset] Gửi email thất bại:", err instanceof Error ? err.message : "unknown error");
    await prisma.passwordResetToken.delete({ where: { id: record.id } }).catch(() => undefined); // token không còn ý nghĩa
  });
}

/**
 * Bước 2: đổi mật khẩu bằng token.
 * - Thông báo lỗi chung cho mọi trường hợp token sai/hết hạn/đã dùng.
 * - Dùng token nguyên tử: `updateMany ... WHERE used_at IS NULL` nên hai request song song chỉ một request thắng.
 * - Mọi token reset khác của user bị vô hiệu; `password_changed_at` được đặt để JWT cũ bị từ chối.
 */
export async function resetPassword(token: string, newPassword: string): Promise<void> {
  const invalid = () => new AppError("Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn. Vui lòng yêu cầu liên kết mới.", 400);
  const tokenHash = hashToken(token);
  const passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);

  await prisma.$transaction(async (tx) => {
    const now = new Date();
    const claimed = await tx.passwordResetToken.updateMany({
      where: { tokenHash, usedAt: null, expiresAt: { gt: now } },
      data: { usedAt: now },
    });
    if (claimed.count !== 1) throw invalid();

    const record = await tx.passwordResetToken.findUnique({ where: { tokenHash }, select: { userId: true } });
    if (!record) throw invalid();

    await tx.user.update({ where: { id: record.userId }, data: { passwordHash, passwordChangedAt: now } });
    await tx.passwordResetToken.updateMany({ where: { userId: record.userId, usedAt: null }, data: { usedAt: now } });
  });
}

/** Dọn token đã hết hạn/đã dùng quá 1 ngày. Gọi định kỳ từ server.ts. */
export async function purgeExpiredResetTokens(): Promise<void> {
  const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
  await prisma.passwordResetToken.deleteMany({ where: { OR: [{ expiresAt: { lt: cutoff } }, { usedAt: { lt: cutoff } }] } });
}
