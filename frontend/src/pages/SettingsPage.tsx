import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api';
import AppShell from '../layouts/AppShell';
import { ApiError } from '../lib/api';
import { useAuth } from '../lib/auth';

const card = 'bg-surface-container-lowest rounded-2xl p-space-lg shadow-[0_4px_20px_rgba(15,23,42,0.04)] flex flex-col gap-space-md';
const input = 'w-full bg-surface-container-low rounded-xl px-4 py-3 font-body-md outline-none focus:ring-2 focus:ring-primary-fixed-dim';
const label = 'font-label-md text-label-md font-semibold';

export default function SettingsPage() {
  const { user, setUser, logout, refreshSummary } = useAuth();
  const navigate = useNavigate();
  const s = user?.settings ?? {};
  const [name, setName] = useState(user?.displayName ?? '');
  const [goal, setGoal] = useState(user?.dailyGoal ?? 20);
  const [sessionSize, setSessionSize] = useState(Number(s.sessionSize ?? 20));
  const [autoplay, setAutoplay] = useState(Boolean(s.autoplayAudio ?? true));
  const [level, setLevel] = useState(String(s.level ?? 'hsk1'));
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [cur, setCur] = useState('');
  const [next, setNext] = useState('');
  const [delPw, setDelPw] = useState('');

  const wrap = async (fn: () => Promise<string>) => {
    setMsg(null);
    try {
      setMsg({ ok: true, text: await fn() });
    } catch (e) {
      setMsg({ ok: false, text: e instanceof ApiError ? (Object.values(e.fieldErrors ?? {})[0]?.[0] ?? e.message) : 'Đã xảy ra lỗi.' });
    }
  };

  const saveProfile = (e: FormEvent) => {
    e.preventDefault();
    void wrap(async () => {
      const u = await authApi.updateMe({ displayName: name.trim(), dailyGoal: goal, settings: { sessionSize, autoplayAudio: autoplay, level } });
      setUser(u);
      void refreshSummary();
      return 'Đã lưu cài đặt.';
    });
  };

  const exportData = () =>
    wrap(async () => {
      const data = await authApi.exportData();
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));
      a.download = `hanzi-backup-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(a.href);
      return 'Đã xuất bản sao lưu dữ liệu.';
    });

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto flex flex-col gap-space-lg pb-space-xl">
        <h1 className="font-headline-xl text-headline-xl font-bold">Cài Đặt</h1>
        {msg && <p role="status" className={`rounded-lg px-space-md py-2 font-body-sm ${msg.ok ? 'bg-secondary-container text-on-secondary-container' : 'bg-error-container text-on-error-container'}`}>{msg.text}</p>}

        <form onSubmit={saveProfile} className={card}>
          <h2 className="font-title-md font-bold">Hồ sơ & mục tiêu học</h2>
          <div className="flex flex-col gap-1.5"><label className={label} htmlFor="name">Tên hiển thị</label><input id="name" className={input} value={name} onChange={(e) => setName(e.target.value)} required maxLength={100} /></div>
          <div className="flex flex-col gap-1.5"><label className={label}>Email</label><input className={`${input} opacity-60`} value={user?.email ?? ''} disabled /></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            <div className="flex flex-col gap-1.5"><label className={label} htmlFor="goal">Mục tiêu hằng ngày (từ)</label><input id="goal" type="number" min={1} max={200} className={input} value={goal} onChange={(e) => setGoal(Number(e.target.value))} /></div>
            <div className="flex flex-col gap-1.5"><label className={label} htmlFor="size">Số câu mỗi phiên</label><input id="size" type="number" min={5} max={50} className={input} value={sessionSize} onChange={(e) => setSessionSize(Number(e.target.value))} /></div>
            <div className="flex flex-col gap-1.5">
              <label className={label} htmlFor="level">Trình độ khởi điểm</label>
              <select id="level" className={input} value={level} onChange={(e) => setLevel(e.target.value)}>
                {['hsk1', 'hsk2', 'hsk3', 'hsk4', 'hsk5', 'hsk6'].map((l) => <option key={l} value={l}>{l.toUpperCase().replace('HSK', 'HSK ')}</option>)}
              </select>
            </div>
            <label className="inline-flex items-center gap-2 font-body-md mt-6"><input type="checkbox" checked={autoplay} onChange={(e) => setAutoplay(e.target.checked)} /> Tự phát âm khi gặp từ</label>
          </div>
          <button type="submit" className="self-end px-space-lg py-2.5 rounded-lg bg-primary-container text-on-primary font-title-sm font-bold">Lưu thay đổi</button>
        </form>

        <form
          className={card}
          onSubmit={(e) => {
            e.preventDefault();
            void wrap(async () => {
              await authApi.changePassword(cur, next);
              setCur('');
              setNext('');
              return 'Đã đổi mật khẩu.';
            });
          }}
        >
          <h2 className="font-title-md font-bold">Đổi mật khẩu</h2>
          <input className={input} type="password" placeholder="Mật khẩu hiện tại" value={cur} onChange={(e) => setCur(e.target.value)} autoComplete="current-password" required />
          <input className={input} type="password" placeholder="Mật khẩu mới (tối thiểu 6 ký tự)" value={next} onChange={(e) => setNext(e.target.value)} autoComplete="new-password" required minLength={6} />
          <button type="submit" className="self-end px-space-lg py-2.5 rounded-lg bg-surface-container font-title-sm font-bold">Đổi mật khẩu</button>
        </form>

        <div className={card}>
          <h2 className="font-title-md font-bold">Dữ liệu & tài khoản</h2>
          <div className="flex flex-wrap gap-space-sm">
            <button type="button" onClick={exportData} className="px-4 py-2 rounded-lg bg-surface-container font-label-md font-bold inline-flex items-center gap-1"><span className="material-symbols-outlined text-[18px]">download</span> Xuất bản sao lưu (JSON)</button>
            <button type="button" onClick={() => { logout(); navigate('/auth'); }} className="px-4 py-2 rounded-lg bg-surface-container font-label-md font-bold inline-flex items-center gap-1"><span className="material-symbols-outlined text-[18px]">logout</span> Đăng xuất</button>
          </div>
          <div className="rounded-xl bg-error-container/40 p-space-md flex flex-col gap-space-sm">
            <p className="font-body-sm text-on-error-container">Xóa tài khoản sẽ xóa vĩnh viễn toàn bộ từ vựng, tiến độ và thành tích của bạn.</p>
            <div className="flex gap-space-sm">
              <input className={input} type="password" placeholder="Nhập mật khẩu để xác nhận" value={delPw} onChange={(e) => setDelPw(e.target.value)} />
              <button
                type="button"
                disabled={!delPw}
                onClick={() => {
                  if (!window.confirm('Bạn chắc chắn muốn xóa vĩnh viễn tài khoản?')) return;
                  void wrap(async () => {
                    await authApi.deleteAccount(delPw);
                    logout();
                    navigate('/');
                    return 'Đã xóa tài khoản.';
                  });
                }}
                className="px-4 rounded-lg bg-error text-on-error font-label-md font-bold disabled:opacity-40 whitespace-nowrap"
              >
                Xóa tài khoản
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
