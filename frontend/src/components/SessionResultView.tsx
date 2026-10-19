import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { dashboardApi, practiceApi } from '../api';
import AppShell from '../layouts/AppShell';
import { speak } from '../lib/speak';
import useApi from '../lib/useApi';
import PageState, { EmptyState } from './PageState';

const card = 'bg-surface-container-lowest rounded-2xl p-space-lg shadow-[0_4px_20px_rgba(15,23,42,0.04)]';
const fmtDuration = (s: number) => (s >= 60 ? `${Math.floor(s / 60)}m ${s % 60}s` : `${s}s`);
const WEEKDAY = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

export default function SessionResultView({ variant }: { variant: 'practice' | 'review' }) {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = params.get('session');
  const state = useApi(() => (sessionId ? practiceApi.summary(sessionId) : Promise.reject(new Error('missing'))), [sessionId]);
  const forecast = useApi(() => (variant === 'review' ? dashboardApi.forecast() : Promise.resolve(null)), [variant]);

  if (!sessionId) {
    return (
      <AppShell>
        <EmptyState icon="assignment" title="Chưa có phiên nào để hiển thị" hint="Hãy hoàn thành một phiên luyện tập để xem kết quả." action={<Link to="/practice" className="px-space-md py-2.5 rounded-lg bg-primary-container text-on-primary font-title-sm">Đến trang luyện tập</Link>} />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <PageState state={state}>
        {(d) => {
          const accuracy = d.stats.accuracy ?? 0;
          const great = accuracy >= 80;
          return (
            <div className="max-w-5xl mx-auto flex flex-col gap-space-lg pb-space-xl">
              <div className={`${card} text-center flex flex-col items-center gap-space-sm`}>
                <span className="font-display-character text-[64px] text-primary">{great ? '成' : '继'}</span>
                <span className="px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm uppercase tracking-wider">
                  {variant === 'review' ? 'Ôn tập SRS' : 'Luyện tập'} • Phiên #{d.session.sessionNumber}
                </span>
                <h1 className="font-headline-xl text-headline-xl font-bold text-on-surface">
                  {d.stats.answered === 0 ? 'Phiên chưa có câu trả lời nào' : great ? 'Hoàn thành xuất sắc phiên luyện tập!' : 'Đã hoàn thành phiên — cố gắng hơn ở lần sau!'}
                </h1>
                <p className="text-on-surface-variant font-body-md max-w-xl">Kết quả đã được thuật toán SM-2 ghi nhận và cập nhật lịch ôn cho từng từ.</p>
                <div className="flex flex-wrap justify-center gap-space-sm mt-2">
                  <Chip icon="timer" text={`${fmtDuration(d.stats.durationSeconds)} tổng thời gian`} />
                  <Chip icon="local_fire_department" text={`${d.user.currentStreak} ngày streak`} />
                  <Chip icon="bolt" text={`+${d.session.xpEarned} XP`} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-space-md">
                <Stat label="Độ chính xác" value={d.stats.accuracy !== null ? `${d.stats.accuracy}%` : '—'} sub={`${d.stats.correct} / ${d.stats.answered} câu đúng`} />
                <Stat label="Câu đúng" value={`${d.stats.correct}`} sub="Được cộng vào trí nhớ ổn định" tone="text-secondary" />
                <Stat label="Câu sai" value={`${d.stats.incorrect}`} sub="Đã lưu vào danh sách từ yếu" tone="text-error" />
                <Stat label="Tốc độ trung bình" value={d.stats.avgResponseMs ? `${(d.stats.avgResponseMs / 1000).toFixed(1)}s` : '—'} sub="mỗi câu" />
              </div>

              {d.wrongWords.length > 0 && (
                <div className={card}>
                  <h2 className="font-title-md text-title-md font-bold mb-space-md">Từ cần ôn tập ngay ({d.wrongWords.length} từ)</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
                    {d.wrongWords.map((w) => (
                      <div key={w.vocabularyId} className="rounded-xl bg-surface-container-low p-space-md flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <span className="font-display-character text-[32px] font-bold">{w.hanzi}</span>
                          <button type="button" onClick={() => speak(w.hanzi)} className="w-8 h-8 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center">
                            <span className="material-symbols-outlined text-[18px]">volume_up</span>
                          </button>
                        </div>
                        <span className="text-primary font-bold">{w.pinyin}</span>
                        <span className="text-on-surface-variant font-body-sm">{w.meaning}</span>
                        <span className="font-label-sm text-error">Sai {w.incorrectCount} lần</span>
                        <Link to={`/vocabulary/${w.vocabularyId}`} className="mt-1 text-primary font-label-md font-bold">Xem chi tiết từ →</Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {d.promoted.length > 0 && (
                <div className={card}>
                  <h2 className="font-title-md text-title-md font-bold mb-space-sm">{d.promoted.length} từ đạt mức Mastered</h2>
                  <div className="flex flex-wrap gap-space-sm">
                    {d.promoted.map((p) => (
                      <span key={p.vocabularyId} className="px-3 py-1.5 rounded-lg bg-secondary-container text-on-secondary-container font-display-character text-[22px]">
                        {p.hanzi} <span className="font-label-sm">{p.pinyin}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className={card}>
                <div className="flex items-center justify-between mb-space-sm">
                  <h2 className="font-title-md text-title-md font-bold">Phân phối toàn kho từ</h2>
                  <span className="text-on-surface-variant font-label-md">{d.distribution.total} từ</span>
                </div>
                <div className="h-3 rounded-full bg-surface-container overflow-hidden flex">
                  {(['new', 'learning', 'mastered'] as const).map((k, i) => (
                    <div key={k} className={['bg-secondary-fixed-dim', 'bg-tertiary', 'bg-secondary'][i]} style={{ width: `${(d.distribution[k] / Math.max(d.distribution.total, 1)) * 100}%` }} title={`${k}: ${d.distribution[k]}`}></div>
                  ))}
                </div>
                <div className="flex gap-space-md mt-2 font-label-sm text-on-surface-variant">
                  <span>Mới: {d.distribution.new}</span>
                  <span>Đang học: {d.distribution.learning}</span>
                  <span>Mastered: {d.distribution.mastered}</span>
                </div>
              </div>

              {variant === 'review' && forecast.data && (
                <div className={card}>
                  <h2 className="font-title-md text-title-md font-bold mb-1">Dự báo ôn tập 7 ngày tới</h2>
                  <p className="text-on-surface-variant font-body-sm mb-space-md">
                    {forecast.data.nextReviewAt ? `Từ kế tiếp đến hạn lúc ${new Date(forecast.data.nextReviewAt).toLocaleString('vi-VN')}.` : 'Hiện chưa có từ nào được lên lịch.'}
                  </p>
                  <div className="flex items-end gap-space-sm h-32">
                    {forecast.data.days.map((day, i) => {
                      const max = Math.max(...forecast.data!.days.map((x) => x.count), 1);
                      return (
                        <div key={day.date} className="flex-1 flex flex-col items-center gap-1">
                          <span className="font-label-sm">{day.count}</span>
                          <div className="w-full rounded-t-lg bg-primary-container" style={{ height: `${Math.max((day.count / max) * 100, 4)}%` }}></div>
                          <span className="font-label-sm text-on-surface-variant">{i === 0 ? 'Nay' : WEEKDAY[new Date(day.date).getUTCDay()]}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex flex-wrap gap-space-md mt-space-md font-label-sm text-on-surface-variant">
                    <span>Tập sự ({forecast.data.buckets.apprentice})</span>
                    <span>Thuần thục ({forecast.data.buckets.proficient})</span>
                    <span>Cao thủ ({forecast.data.buckets.expert})</span>
                    <span>Khắc cốt ({forecast.data.buckets.mastered})</span>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-space-sm justify-center">
                <Link to="/dashboard" className="px-space-lg py-2.5 rounded-lg bg-surface-container font-title-sm font-bold">Về Dashboard</Link>
                <button type="button" onClick={() => navigate(variant === 'review' ? '/review' : '/practice')} className="px-space-lg py-2.5 rounded-lg bg-primary-container text-on-primary font-title-sm font-bold">
                  {variant === 'review' ? 'Ôn tiếp thẻ đến hạn' : 'Luyện tiếp phiên mới'}
                </button>
                <Link to="/vocabulary/new" className="px-space-lg py-2.5 rounded-lg bg-surface-container font-title-sm font-bold">Thêm từ mới</Link>
              </div>
            </div>
          );
        }}
      </PageState>
    </AppShell>
  );
}

function Chip({ icon, text }: { icon: string; text: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container font-label-md">
      <span className="material-symbols-outlined text-[18px] text-primary">{icon}</span> {text}
    </span>
  );
}

function Stat({ label, value, sub, tone = 'text-on-surface' }: { label: string; value: string; sub: string; tone?: string }) {
  return (
    <div className={`${card} flex flex-col gap-1`}>
      <span className="font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">{label}</span>
      <span className={`font-headline-xl text-headline-xl font-bold ${tone}`}>{value}</span>
      <span className="font-body-sm text-on-surface-variant">{sub}</span>
    </div>
  );
}
