import { FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { authApi } from '../api';
import AuthCard, { inputClass, primaryBtn } from '../components/AuthCard';
import { ApiError } from '../lib/api';

const RESEND_SECONDS = 60;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const submit = async (e?: FormEvent) => {
    e?.preventDefault();
    if (sending || cooldown > 0) return;
    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      setError('Vui lòng nhập một địa chỉ email hợp lệ.');
      return;
    }
    setSending(true);
    setError(null);
    try {
      await authApi.forgotPassword(value);
      setSent(true);
      setCooldown(RESEND_SECONDS);
    } catch (err) {
      // 0 = lỗi mạng, 503 = server chưa cấu hình email, 429 = quá giới hạn: đều hiển thị đúng thông điệp từ API.
      setError(err instanceof ApiError ? err.message : 'Không gửi được yêu cầu. Vui lòng thử lại.');
    } finally {
      setSending(false);
    }
  };

  return (
    <AuthCard title="Quên mật khẩu" subtitle="Nhập email tài khoản, chúng tôi sẽ gửi liên kết để bạn đặt mật khẩu mới.">
      {sent ? (
        <div className="flex flex-col gap-space-md">
          <div role="status" className="rounded-xl bg-surface-container-low p-space-md font-body-md text-on-surface">
            Nếu email này đã đăng ký, bạn sẽ nhận được hướng dẫn đặt lại mật khẩu trong ít phút. Hãy kiểm tra cả thư mục spam. Liên kết chỉ dùng được một lần và sẽ hết hạn sau một thời gian ngắn.
          </div>
          <button type="button" onClick={() => void submit()} disabled={sending || cooldown > 0} className={primaryBtn}>
            {sending ? 'Đang gửi…' : cooldown > 0 ? `Gửi lại sau ${cooldown}s` : 'Gửi lại email'}
          </button>
          {error && <p role="alert" className="text-error font-label-md">{error}</p>}
        </div>
      ) : (
        <form onSubmit={submit} className="flex flex-col gap-space-md" noValidate>
          <label className="flex flex-col gap-1">
            <span className="font-label-md text-on-surface-variant">Email</span>
            <input type="email" autoComplete="email" autoFocus value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ban@example.com" className={inputClass} />
          </label>
          {error && <p role="alert" className="text-error font-label-md">{error}</p>}
          <button type="submit" disabled={sending} className={primaryBtn}>{sending ? 'Đang gửi…' : 'Gửi liên kết đặt lại'}</button>
        </form>
      )}
      <Link to="/auth" className="text-primary font-label-md font-bold self-center">← Quay lại đăng nhập</Link>
    </AuthCard>
  );
}
