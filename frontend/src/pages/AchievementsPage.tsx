import { achievementsApi } from '../api';
import AppShell from '../layouts/AppShell';
import PageState from '../components/PageState';
import { useAuth } from '../lib/auth';
import useApi from '../lib/useApi';

const GROUPS: Record<string, string> = { vocabulary: 'Từ vựng', streak: 'Chuỗi ngày học', practice: 'Luyện tập', skills: 'Kỹ năng' };

export default function AchievementsPage() {
  const state = useApi(() => achievementsApi.list());
  const { summary } = useAuth();
  return (
    <AppShell>
      <PageState state={state}>
        {(list) => {
          const unlocked = list.filter((a) => a.unlocked).length;
          return (
            <div className="max-w-6xl mx-auto flex flex-col gap-space-lg pb-space-xl">
              <div className="flex flex-wrap items-end justify-between gap-space-md">
                <div>
                  <span className="font-label-sm uppercase tracking-wider text-primary font-bold">Hồ sơ vinh danh</span>
                  <h1 className="font-headline-xl text-headline-xl font-bold">Thành Tích</h1>
                  <p className="text-on-surface-variant font-body-md">Đã mở khoá {unlocked}/{list.length} thành tích{summary ? ` • Lv.${summary.level} ${summary.levelTitle} • ${summary.xp.toLocaleString('vi-VN')} XP` : ''}.</p>
                </div>
                <div className="w-64 h-3 rounded-full bg-surface-container-highest overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${list.length ? (unlocked / list.length) * 100 : 0}%` }}></div>
                </div>
              </div>

              {Object.entries(GROUPS).map(([group, title]) => {
                const items = list.filter((a) => a.group === group);
                if (items.length === 0) return null;
                return (
                  <section key={group} className="flex flex-col gap-space-md">
                    <h2 className="font-title-lg text-title-lg font-bold">{title}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
                      {items.map((a) => {
                        const pct = Math.round((a.progress.current / a.progress.target) * 100);
                        return (
                          <div key={a.id} className={`rounded-2xl p-space-lg shadow-sm flex flex-col gap-space-sm ${a.unlocked ? 'bg-surface-container-lowest' : 'bg-surface-container-low opacity-80'}`}>
                            <div className="flex items-center gap-space-md">
                              <span className={`w-14 h-14 rounded-2xl flex items-center justify-center ${a.unlocked ? (a.rarity === 'rare' ? 'bg-tertiary-container text-on-tertiary' : 'bg-primary-fixed text-on-primary-fixed') : 'bg-surface-container-high text-on-surface-variant'}`}>
                                <span className="material-symbols-outlined text-[32px]">{a.unlocked ? (a.icon ?? 'emoji_events') : 'lock'}</span>
                              </span>
                              <div className="flex flex-col">
                                <span className="font-title-sm font-bold">{a.name}</span>
                                <span className="font-body-sm text-on-surface-variant">{a.description}</span>
                              </div>
                            </div>
                            <div className="h-2 rounded-full bg-surface-container-highest overflow-hidden"><div className={`h-full ${a.unlocked ? 'bg-secondary' : 'bg-primary'}`} style={{ width: `${pct}%` }}></div></div>
                            <div className="flex items-center justify-between font-label-sm text-on-surface-variant">
                              <span>{a.unlocked ? `Mở khoá ${new Date(a.earnedAt!).toLocaleDateString('vi-VN')}` : `${a.progress.current}/${a.progress.target}`}</span>
                              <span className="font-bold text-tertiary">+{a.xpReward} XP</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                );
              })}
            </div>
          );
        }}
      </PageState>
    </AppShell>
  );
}
