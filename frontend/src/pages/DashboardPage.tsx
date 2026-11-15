import { useNavigate } from 'react-router-dom';
import { dashboardApi } from '../api';
import { useAuth } from '../lib/auth';
import useApi from '../lib/useApi';
import AppShell from '../layouts/AppShell';
import LibrarySection from '../components/library/LibrarySection';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, summary, refreshSummary } = useAuth();
  const weakState = useApi(() => dashboardApi.weakWords());
  const skillsState = useApi(() => dashboardApi.skills());
  const challengeState = useApi(() => dashboardApi.challenge());
  const growthState = useApi(() => dashboardApi.growth());
  const weak = (weakState.data ?? []).slice(0, 3);
  const challenge = challengeState.data;
  const growth = growthState.data;
  const nextTask = challenge?.tasks.find((t) => !t.done);
  const pct = (n: number | undefined) => Math.round(((n ?? 0) / Math.max(summary?.totalWords ?? 0, 1)) * 100);
  const skillNum = (key: string) => skillsState.data?.find((x) => x.key === key)?.accuracy ?? 0;
  const skill = (key: string) => {
    const v = skillsState.data?.find((x) => x.key === key)?.accuracy;
    return v == null ? '—' : `${v}%`;
  };
  const weakest = [...(skillsState.data ?? [])].filter((x) => x.accuracy !== null).sort((a, b) => (a.accuracy ?? 0) - (b.accuracy ?? 0))[0];
  const pace = growth ? Math.round((growth.addedInRange / 7) * 10) / 10 : 0;
  const paceLabel = summary && summary.dailyGoal > 0 ? (pace >= summary.dailyGoal ? 'Đạt mục tiêu ngày' : `Mục tiêu ${summary.dailyGoal} từ/ngày`) : '';
  const chart = (() => {
    if (!growth || growth.series.length === 0) return null;
    const totals = growth.series.map((g) => g.total);
    const min = Math.min(...totals);
    const max = Math.max(...totals);
    const pts = growth.series.map((g, i) => ({
      x: 10 + (i * 470) / Math.max(growth.series.length - 1, 1),
      y: max === min ? 80 : 135 - ((g.total - min) / (max - min)) * 115,
    }));
    const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    return { points: pts, line, area: `${line} L ${pts[pts.length - 1].x} 150 L ${pts[0].x} 150 Z` };
  })();
  const claimChallenge = async () => {
    await dashboardApi.claimChallenge();
    challengeState.reload();
    void refreshSummary();
  };

  return (
    <AppShell>
      <div className="flex flex-col w-full gap-space-lg pb-space-xl">
        <section className="relative overflow-hidden rounded-xl bg-gradient-to-br from-surface-container-lowest via-surface-container-low to-surface-container p-gutter shadow-sm">
          <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>
          <div className="absolute right-8 bottom-0 opacity-10 pointer-events-none select-none font-display-character text-[160px] leading-none text-primary">
            {' '}
            學{' '}
          </div>
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-md">
            <div className="flex flex-col gap-space-xs max-w-2xl">
              <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span>SRS Dynamic Session Active</span>
              </div>
              <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
                {' '}
                Chào mừng trở lại, {user?.displayName}!{' '}
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                {' '}
                {(summary?.dueWords ?? 0) > 0 ? (
                  <>Hôm nay còn <span className="font-bold text-primary">{summary?.dueWords} từ cần ôn</span> để duy trì chuỗi học {summary?.currentStreak ?? 0} ngày liên tục.</>
                ) : (
                  <>Bạn đã ôn xong các từ đến hạn. Chuỗi học hiện tại: <span className="font-bold text-primary">{summary?.currentStreak ?? 0} ngày</span>.</>
                )}{' '}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-space-sm">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm shadow-sm">
                <span className="material-symbols-outlined text-[16px] text-primary">tune</span>
                <span>
                  Mixing Engine: <strong className="text-on-surface">20% Mới</strong> +{' '}
                  <strong className="text-on-surface">50% Ôn</strong> +{' '}
                  <strong className="text-on-surface">30% Yếu</strong>
                </span>
              </div>
              <button
                className="group relative inline-flex items-center gap-space-sm px-6 py-3.5 rounded-lg bg-primary-container text-on-primary font-title-sm text-title-sm shadow-md hover:shadow-xl transition-all duration-200"
                type="button"
                onClick={() => navigate('/review')}
              >
                <span className="material-symbols-outlined text-[22px] group-hover:translate-x-0.5 transition-transform">
                  rocket_launch
                </span>
                <span>Bắt Đầu Phiên Học Hôm Nay ({Math.min(summary?.dueWords ?? 0, 20)} từ)</span>
              </button>
            </div>
          </div>
        </section>
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-gutter-sm">
          <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-md shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Tổng Từ Vựng
              </span>
              <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[20px]">library_books</span>
              </div>
            </div>
            <div className="mt-space-sm flex items-baseline gap-2">
              <span className="font-headline-lg text-[32px] font-bold text-on-surface tracking-tight">{summary?.totalWords ?? 0}</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">từ vựng</span>
            </div>
            <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-secondary-container/40 text-on-secondary-container font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[15px]">trending_up</span>
              <span>Tuần này +{growth?.addedInRange ?? 0}</span>
            </div>
            <div className="mt-3 w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: `${Math.min(100, pct(summary?.newWords) + pct(summary?.learningWords) + pct(summary?.masteredWords))}%` }}></div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-md shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Đã Ghi Nhớ (Mastered)
              </span>
              <div className="w-9 h-9 rounded-lg bg-secondary-container/40 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[20px]">verified</span>
              </div>
            </div>
            <div className="mt-space-sm flex items-baseline gap-2">
              <span className="font-headline-lg text-[32px] font-bold text-secondary tracking-tight">{summary?.masteredWords ?? 0}</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">từ</span>
            </div>
            <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[15px]">check_circle</span>
              <span>{pct(summary?.masteredWords)}% Tổng kho từ</span>
            </div>
            <div className="mt-3 w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
              <div className="bg-secondary h-full rounded-full" style={{ width: `${pct(summary?.masteredWords)}%` }}></div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-md shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Đang Học (Learning)
              </span>
              <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant">
                <span className="material-symbols-outlined text-[20px]">hourglass_top</span>
              </div>
            </div>
            <div className="mt-space-sm flex items-baseline gap-2">
              <span className="font-headline-lg text-[32px] font-bold text-on-surface tracking-tight">{summary?.learningWords ?? 0}</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">từ</span>
            </div>
            <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[15px]">timelapse</span>
              <span>Giai đoạn SRS 1-3</span>
            </div>
            <div className="mt-3 w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
              <div className="bg-outline h-full rounded-full" style={{ width: `${pct(summary?.learningWords)}%` }}></div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-md shadow-sm hover:shadow-md transition-all">
            <div className="absolute top-0 right-0 w-24 h-24 bg-tertiary-fixed/30 rounded-bl-full pointer-events-none"></div>
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider font-bold">
                Cần Ôn Tập Ngay
              </span>
              <div className="w-9 h-9 rounded-lg bg-tertiary-fixed flex items-center justify-center text-tertiary shadow-[0_2px_6px_rgba(217,119,6,0.2)]">
                <span className="material-symbols-outlined text-[20px]">warning</span>
              </div>
            </div>
            <div className="mt-space-sm flex items-baseline gap-2">
              <span className="font-headline-lg text-[32px] font-bold text-tertiary tracking-tight">{summary?.dueWords ?? 0}</span>
              <span className="font-body-sm text-body-sm text-tertiary">từ đến hạn</span>
            </div>
            <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[15px]">timer</span>
              <span>Cần ôn trước 23:59</span>
            </div>
            <div className="mt-3 w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
              <div className="bg-tertiary h-full rounded-full" style={{ width: `${pct(summary?.dueWords)}%` }}></div>
            </div>
          </div>
        </section>
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          <div className="lg:col-span-7 flex flex-col rounded-xl bg-surface-container-lowest p-space-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[22px]">radar</span>
                  <h2 className="font-headline-md text-headline-md text-on-surface">6 Chiều Kỹ Năng Ngôn Ngữ</h2>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  Đánh giá toàn diện theo tiêu chuẩn HanziSRS Mastery Model
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                Hôm nay
              </span>
            </div>
            <div className="mt-space-md flex flex-col gap-3.5">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between font-body-sm text-body-sm">
                  <span className="font-medium text-on-surface flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-secondary">visibility</span> Nhận diện
                    Hán tự{' '}
                  </span>
                  <span className="font-bold text-on-surface">{skill("recognition")}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                  <div className="h-full bg-secondary rounded-full" style={{ width: `${skillNum("recognition")}%` }}></div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between font-body-sm text-body-sm">
                  <span className="font-medium text-on-surface flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-secondary">record_voice_over</span>{' '}
                    Luyện nói Speaking{' '}
                  </span>
                  <span className="font-bold text-on-surface">{skill("speaking")}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                  <div className="h-full bg-secondary-fixed-dim rounded-full" style={{ width: `${skillNum("speaking")}%` }}></div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between font-body-sm text-body-sm">
                  <span className="font-medium text-on-surface flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-primary">music_note</span> Pinyin &amp;
                    Thanh điệu{' '}
                  </span>
                  <span className="font-bold text-on-surface">{skill("pinyin")}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                  <div className="h-full bg-primary-fixed-dim rounded-full" style={{ width: `${skillNum("pinyin")}%` }}></div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between font-body-sm text-body-sm">
                  <span className="font-medium text-on-surface flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-tertiary">headphones</span> Nghe hiểu
                    Audio{' '}
                  </span>
                  <span className="font-bold text-on-surface">{skill("listening")}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                  <div className="h-full bg-tertiary-fixed-dim rounded-full" style={{ width: `${skillNum("listening")}%` }}></div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between font-body-sm text-body-sm">
                  <span className="font-medium text-on-surface flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-tertiary">edit_note</span> Đặt câu &amp;
                    Ngữ cảnh{' '}
                  </span>
                  <span className="font-bold text-on-surface">{skill("sentence")}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                  <div className="h-full bg-tertiary rounded-full" style={{ width: `${skillNum("sentence")}%` }}></div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between font-body-sm text-body-sm">
                  <span className="font-medium text-primary flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">draw</span> Viết &amp; Chính tả{' '}
                    {weakest?.key === "writing" && <span className="text-label-sm font-bold uppercase tracking-wider text-primary">(Yếu nhất)</span>}
                  </span>
                  <span className="font-bold text-primary">{skill("writing")}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${skillNum("writing")}%` }}></div>
                </div>
              </div>
            </div>
            <div className="mt-space-md p-space-sm rounded-lg bg-surface-container flex items-start gap-space-sm">
              <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[18px]">smart_toy</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm font-bold text-primary uppercase tracking-wider">
                  Khuyến nghị từ AI Tutor
                </span>
                <p className="font-body-sm text-body-sm text-on-surface mt-0.5">
                  {' '}
                  {weakest ? (
                    <>Kỹ năng <strong className="text-primary">{weakest.label}</strong> đang thấp nhất ({weakest.accuracy}%). Hãy dành thêm thời gian luyện dạng bài này hôm nay.</>
                  ) : (
                    <>Hãy hoàn thành vài bài luyện tập để hệ thống đánh giá điểm mạnh/yếu của bạn.</>
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 flex flex-col justify-between rounded-xl bg-surface-container-lowest p-space-lg shadow-sm">
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-[22px]">emoji_events</span>
                  <h2 className="font-headline-md text-headline-md text-on-surface">Thử Thách Hôm Nay</h2>
                </div>
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold shadow-sm">
                  <span className="material-symbols-outlined text-[14px]">timer</span>
                  <span>Còn {challenge?.hoursLeft ?? 0} giờ</span>
                </div>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Hoàn thành để nhận thưởng bổ sung: <strong className="text-tertiary">+{challenge?.bonusXp ?? 150} XP</strong>
              </span>
              <div className="mt-space-md flex flex-col gap-space-sm">
                {challenge?.tasks.map((t) => (
                  <div key={t.key} className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low cursor-pointer" onClick={() => navigate(t.link)}>
                    <div className="flex items-center gap-2.5">
                      <span className={`material-symbols-outlined text-[20px] ${t.done ? 'text-secondary' : t.current > 0 ? 'text-tertiary' : 'text-on-surface-variant'}`}>
                        {t.done ? 'check_circle' : t.current > 0 ? 'pending' : 'radio_button_unchecked'}
                      </span>
                      <span className="font-body-sm text-body-sm font-medium text-on-surface">{t.label} ({t.target})</span>
                    </div>
                    <span className={`font-label-sm text-label-sm font-bold ${t.done ? 'text-secondary' : t.current > 0 ? 'text-tertiary' : 'text-on-surface-variant'}`}>
                      {t.current}/{t.target}{t.done ? ' ✓' : ''}
                    </span>
                  </div>
                ))}
                {challenge?.allDone && !challenge.claimed && (
                  <button type="button" onClick={claimChallenge} className="mt-1 px-4 py-2 rounded-lg bg-tertiary text-on-tertiary font-title-sm font-bold">
                    Nhận thưởng +{challenge.bonusXp} XP
                  </button>
                )}
                {challenge?.claimed && <p className="text-secondary font-label-md font-bold text-center">Đã nhận thưởng hôm nay 🎉</p>}
              </div>
            </div>
            <div className="mt-space-md pt-space-sm flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Tiến độ ngày</span>
                <span className="font-title-sm text-title-sm font-bold text-on-surface">{challenge ? `${challenge.completedItems} / ${challenge.totalItems} Mục` : '—'}</span>
              </div>
              <button
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-title-sm text-title-sm transition-all"
                type="button"
                onClick={() => navigate(nextTask?.link ?? '/practice')}
              >
                <span>Tiếp tục thử thách</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </section>
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          <div className="lg:col-span-6 flex flex-col rounded-xl bg-surface-container-lowest p-space-lg shadow-sm">
            <div className="flex items-center justify-between mb-space-sm">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[22px]">history_edu</span>
                  <h2 className="font-headline-md text-headline-md text-on-surface">Từ Cần Củng Cố - Hay Sai</h2>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  Xếp hạng theo tần suất nhầm lẫn trong các phiên SRS gần đây
                </span>
              </div>
              <button
                className="text-primary hover:underline font-label-md text-label-md"
                type="button"
                onClick={() => navigate('/vocabulary')}
              >
                Xem tất cả ({weak.length})
              </button>
            </div>
            <div className="flex flex-col gap-space-sm mt-space-xs">
              {weak.length === 0 && <p className="text-on-surface-variant font-body-sm p-space-sm">Chưa có từ nào hay sai. Hãy luyện tập để hệ thống phát hiện điểm yếu!</p>}
              {weak.map((w) => (
                <div key={w.id} className="flex items-center justify-between p-space-sm rounded-xl bg-surface-container-low hover:bg-surface-container transition-all">
                  <div className="flex items-center gap-space-md">
                    <div className="w-14 h-14 rounded-lg bg-surface-container-lowest flex items-center justify-center font-display-character text-[28px] text-primary shadow-sm cursor-pointer" onClick={() => navigate(`/vocabulary/${w.vocabulary.id}`)}>
                      {w.vocabulary.hanzi}
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-title-sm text-title-sm font-bold text-on-surface">{w.vocabulary.pinyin}</span>
                        <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-bold">Sai {w.incorrectCount} lần</span>
                      </div>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        {w.vocabulary.meaning}{w.vocabulary.level ? ` • ${w.vocabulary.level}` : ''}
                      </span>
                    </div>
                  </div>
                  <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md shadow-sm hover:opacity-90 transition-all" type="button" onClick={() => navigate('/review')}>
                    <span className="material-symbols-outlined text-[16px]">replay</span>
                    <span>Ôn ngay</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-6 flex flex-col justify-between rounded-xl bg-surface-container-lowest p-space-lg shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-space-xs">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[22px]">monitoring</span>
                  <h2 className="font-headline-md text-headline-md text-on-surface">Tăng Trưởng Từ Vựng Tích Lũy</h2>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container font-label-sm text-label-sm font-bold">
                  +{growth?.addedInRange ?? 0} từ tuần này
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Biểu đồ 7 ngày gần nhất
              </p>
              <div className="mt-space-md w-full">
                <svg
                  className="w-full h-44 overflow-visible"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 500 160"
                >
                  <line stroke="#e3e2e0" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="500" y1="30" y2="30"></line>
                  <line stroke="#e3e2e0" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="500" y1="80" y2="80"></line>
                  <line stroke="#e3e2e0" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="500" y1="130" y2="130"></line>
                  <defs>
                    <linearGradient id="vocabGrowthGrad" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#006c4a" stopOpacity="0.25"></stop>
                      <stop offset="100%" stopColor="#006c4a" stopOpacity="0.0"></stop>
                    </linearGradient>
                  </defs>
                  {chart && <path d={chart.area} fill="url(#vocabGrowthGrad)" />}
                  {chart && <path d={chart.line} fill="none" stroke="#006c4a" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />}
                  {chart?.points.map((pt, i) => (
                    <circle key={i} cx={pt.x} cy={pt.y} fill={i === chart.points.length - 1 ? '#be123c' : '#ffffff'} r={i === chart.points.length - 1 ? 5 : 4} stroke={i === chart.points.length - 1 ? '#ffffff' : '#006c4a'} strokeWidth="2.5" />
                  ))}
                </svg>
                <div className="flex justify-between text-on-surface-variant font-label-sm text-label-sm mt-2 px-1">
                  {growth?.series.map((g, i, arr) => (
                    <span key={g.date} className={i === arr.length - 1 ? 'font-bold text-primary' : ''}>
                      {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'][new Date(g.date).getUTCDay()]} ({g.total})
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-space-md p-3 rounded-lg bg-surface-container flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">workspace_premium</span>
                <span className="font-body-sm text-body-sm text-on-surface font-medium">
                  Tốc độ ghi nhớ: <strong>~{pace} từ/ngày</strong>
                </span>
              </div>
              <span className="font-label-sm text-label-sm text-secondary font-bold">{paceLabel}</span>
            </div>
          </div>
        </section>
        <LibrarySection embedded />
      </div>
    </AppShell>
  );
}
