import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notificationsApi } from '../api';
import AppShell from '../layouts/AppShell';
import PageState, { EmptyState } from '../components/PageState';
import { useAuth } from '../lib/auth';
import type { AppNotification } from '../lib/types';
import useApi from '../lib/useApi';

const TABS = [
  { key: '', label: 'Tất cả' },
  { key: 'srs', label: 'Nhắc ôn SRS' },
  { key: 'achievement', label: 'Thành tích' },
  { key: 'system', label: 'Hệ thống' },
] as const;
const ICON: Record<AppNotification['category'], string> = { srs: 'schedule', achievement: 'emoji_events', ai: 'psychology', system: 'campaign' };

function ago(iso: string) {
  const m = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (m < 1) return 'Vừa xong';
  if (m < 60) return `${m} phút trước`;
  if (m < 1440) return `${Math.floor(m / 60)} giờ trước`;
  return `${Math.floor(m / 1440)} ngày trước`;
}

export default function NotificationsPage() {
  const navigate = useNavigate();
  const { refreshSummary } = useAuth();
  const [tab, setTab] = useState<string>('');
  const state = useApi(() => notificationsApi.list({ category: tab || undefined }), [tab]);

  const open = async (n: AppNotification) => {
    if (!n.isRead) {
      await notificationsApi.markRead(n.id);
      void refreshSummary();
    }
    if (n.link) navigate(n.link);
    else state.reload();
  };
  const readAll = async () => {
    await notificationsApi.markAllRead(tab || undefined);
    state.reload();
    void refreshSummary();
  };
  const remove = async (id: string) => {
    await notificationsApi.remove(id);
    state.reload();
    void refreshSummary();
  };

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto flex flex-col gap-space-lg pb-space-xl">
        <div className="flex items-end justify-between flex-wrap gap-space-sm">
          <div>
            <h1 className="font-headline-xl text-headline-xl font-bold">Thông Báo</h1>
            <p className="text-on-surface-variant font-body-md">Nhắc ôn tập, thành tích và tổng kết phiên học.</p>
          </div>
          <button type="button" onClick={readAll} className="px-4 py-2 rounded-lg bg-surface-container font-label-md font-bold">Đánh dấu tất cả đã đọc</button>
        </div>
        <div className="flex gap-2 flex-wrap">
          {TABS.map((t) => (
            <button key={t.key} type="button" onClick={() => setTab(t.key)} className={`px-4 py-2 rounded-lg font-label-md ${tab === t.key ? 'bg-primary-container text-on-primary shadow-sm' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'}`}>
              {t.label}{state.data && (t.key ? state.data.counts[t.key] : state.data.counts.all) ? ` (${t.key ? state.data.counts[t.key] : state.data.counts.all})` : ''}
            </button>
          ))}
        </div>
        <PageState state={state}>
          {(d) =>
            d.items.length === 0 ? (
              <EmptyState icon="notifications_off" title="Chưa có thông báo nào" hint="Thông báo sẽ xuất hiện khi có từ đến hạn ôn, thành tích mới hoặc khi bạn hoàn thành phiên học." />
            ) : (
              <div className="flex flex-col gap-space-sm">
                {d.items.map((n) => (
                  <div key={n.id} className={`rounded-2xl p-space-md flex items-start gap-space-md shadow-sm ${n.isRead ? 'bg-surface-container-low' : 'bg-surface-container-lowest border-l-4 border-primary'}`}>
                    <span className="w-10 h-10 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined">{ICON[n.category]}</span>
                    </span>
                    <button type="button" onClick={() => open(n)} className="flex-1 text-left">
                      <p className={`font-title-sm ${n.isRead ? '' : 'font-bold'}`}>{n.title}</p>
                      {n.body && <p className="font-body-sm text-on-surface-variant">{n.body}</p>}
                      <p className="font-label-sm text-on-surface-variant mt-1">{ago(n.createdAt)}</p>
                    </button>
                    <button type="button" onClick={() => remove(n.id)} className="p-1.5 rounded-lg text-on-surface-variant hover:text-error hover:bg-error-container" title="Xóa">
                      <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                  </div>
                ))}
              </div>
            )
          }
        </PageState>
      </div>
    </AppShell>
  );
}
