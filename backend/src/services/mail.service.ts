import nodemailer, { Transporter } from "nodemailer";
import { env } from "../config/env";
import { AppError } from "../utils/AppError";

let transporter: Transporter | null = null;

/** Đã cấu hình đủ để gửi email chưa (cần MAIL_HOST và MAIL_FROM). */
export function isMailConfigured(): boolean {
  return Boolean(env.MAIL_HOST && env.MAIL_FROM);
}

function getTransporter(): Transporter {
  if (!isMailConfigured()) throw new AppError("Dịch vụ email chưa được cấu hình.", 503);
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: env.MAIL_HOST,
      port: env.MAIL_PORT,
      secure: env.MAIL_SECURE,
      ...(env.MAIL_USER ? { auth: { user: env.MAIL_USER, pass: env.MAIL_PASSWORD ?? "" } } : {}),
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });
  }
  return transporter;
}

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/**
 * Gửi email đặt lại mật khẩu. Ném lỗi nếu SMTP lỗi - NGƯỜI GỌI phải bắt và chỉ log thông điệp lỗi
 * (không log liên kết/token) để không lộ dữ liệu nhạy cảm.
 */
export async function sendPasswordResetEmail(to: string, displayName: string, resetUrl: string, ttlMinutes: number): Promise<void> {
  const name = escapeHtml(displayName);
  const url = escapeHtml(resetUrl);
  await getTransporter().sendMail({
    from: env.MAIL_FROM,
    to,
    subject: "Đặt lại mật khẩu HanziSRS",
    text: [
      `Xin chào ${displayName},`,
      "",
      "Bạn (hoặc ai đó) đã yêu cầu đặt lại mật khẩu cho tài khoản HanziSRS.",
      `Mở liên kết sau để đặt mật khẩu mới (hiệu lực ${ttlMinutes} phút, chỉ dùng được một lần):`,
      resetUrl,
      "",
      "Nếu bạn không yêu cầu, hãy bỏ qua email này - mật khẩu hiện tại vẫn giữ nguyên.",
    ].join("\n"),
    html: `<p>Xin chào ${name},</p>
<p>Bạn (hoặc ai đó) đã yêu cầu đặt lại mật khẩu cho tài khoản HanziSRS.</p>
<p><a href="${url}">Đặt mật khẩu mới</a><br>Liên kết có hiệu lực ${ttlMinutes} phút và chỉ dùng được một lần.</p>
<p>Nếu nút không hoạt động, sao chép địa chỉ này vào trình duyệt:<br>${url}</p>
<p>Nếu bạn không yêu cầu, hãy bỏ qua email này - mật khẩu hiện tại vẫn giữ nguyên.</p>`,
  });
}
