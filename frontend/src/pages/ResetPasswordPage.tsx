import { FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { authApi } from '../api';
import AuthCard, { inputClass, primaryBtn } from '../components/AuthCard';
import { ApiError } from '../lib/api';

/** Token nằm trong fragment (#token=...) để không bị gửi lên server; vẫn chấp nhận ?token= cho tương thích. */
function readToken(): string {
  const fromHash = new URLSearchParams(window.location.hash.replace(/^#/, '')).get('token');
  return (fromHash ?? new URLSearchParams(window.location.search).get('token') ?? '').trim();
}

export default function ResetPasswordPage() {
  const [token] = useState(readToken);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [invalid, setInvalid] = useState(!token);
  const [done, setDone] = useState(false);

  // Xoá token khỏi thanh địa chỉ/lịch sử ngay khi đã đọc.
  useEffect(() => {
    if (token) window.history.replaceState(null, '', window.location.pathname);
  }, [token]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (busy) return;
    if (password.length < 6) return setError('Mật khẩu cần ít nhất 6 ký tự.');
    if (password.length > 72) return setError('Mật khẩu quá dài (tối đa 72 ký tự).');
    if (password !== confirm) return setError('Mật khẩu xác nhận không khớp.');
    setBusy(true);
    setError(null);
    try {
      await authApi.resetPassword(token, password);
      setDone(true);
    } catch (err) {
      if (err instanceof ApiError && err.status === 400 && (!err.fieldErrors || err.fieldErrors.token)) {
        setInvalid(true); // token sai / hết hạn / đã dùng
      } else if (err instanceof ApiError && err.fieldErrors?.newPassword) {
        setError(err.fieldErrors.newPassword[0]);
      } else {
        setError(err instanceof ApiError ? err.message : 'Không đặt lại được mật khẩu. Vui lòng thử lại.');
      }
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <AuthCard title="Đã đặt lại mật khẩu" subtitle="Các phiên đăng nhập cũ đã bị đăng xuất. Hãy đăng nhập bằng mật khẩu mới.">
        <Link to="/auth" className={`${primaryBtn} text-center`}>Đến trang đăng nhập</Link>
      </AuthCard>
    );
  }

  if (invalid) {
    return (
      <AuthCard title="Liên kết không dùng được" subtitle="Liên kết đặt lại mật khẩu không hợp lệ, đã hết hạn hoặc đã được sử dụng.">
        <Link to="/forgot-password" className={`${primaryBtn} text-center`}>Yêu cầu liên kết mới</Link>
        <Link to="/auth" className="text-primary font-label-md font-bold self-center">← Quay lại đăng nhập</Link>
      </AuthCard>
    );
  }

  return (
    <AuthCard title="Đặt mật khẩu mới" subtitle="Nhập mật khẩu mới cho tài khoản của bạn (6–72 ký tự).">
      <form onSubmit={submit} className="flex flex-col gap-space-md" noValidate>
        <label className="flex flex-col gap-1">
          <span className="font-label-md text-on-surface-variant">Mật khẩu mới</span>
          <input type={show ? 'text' : 'password'} autoComplete="new-password" autoFocus value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-label-md text-on-surface-variant">Nhập lại mật khẩu</span>
          <input type={show ? 'text' : 'password'} autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className={inputClass} />
        </label>
        <label className="inline-flex items-center gap-2 font-label-md text-on-surface-variant">
          <input type="checkbox" checked={show} onChange={(e) => setShow(e.target.checked)} /> Hiện mật khẩu
        </label>
        {error && <p role="alert" className="text-error font-label-md">{error}</p>}
        <button type="submit" disabled={busy} className={primaryBtn}>{busy ? 'Đang lưu…' : 'Đặt lại mật khẩu'}</button>
      </form>
    </AuthCard>
  );
}
