import { useState } from 'react';
import { Link } from 'react-router-dom';
import { statsApi } from '../api';
import AppShell from '../layouts/AppShell';
import PageState from '../components/PageState';
import useApi from '../lib/useApi';

const RANGES = [
  { key: '7d', label: '7 ngày' },
  { key: '30d', label: '30 ngày' },
  { key: 'quarter', label: 'Quý này (90 ngày)' },
  { key: 'all', label: 'Tất cả' },
];
const card = 'bg-surface-container-lowest rounded-2xl p-space-lg shadow-[0_4px_20px_rgba(15,23,42,0.04)] flex flex-col gap-space-sm';

function delta(cur: number | null, prev: number | null, unit = '') {
  if (cur === null || prev === null) return null;
  const d = Math.round((cur - prev) * 10) / 10;
  return { text: `${d >= 0 ? '▲' : '▼'} ${Math.abs(d)}${unit} so với kỳ trước`, good: d >= 0 };
}

export default function StatisticsPage() {
  const [range, setRange] = useState('7d');
  const state = useApi(() => statsApi.overview(range), [range]);
  return (
    <AppShell>
      <div className="max-w-6xl mx-auto flex flex-col gap-space-lg pb-space-xl">
        <div className="flex flex-wrap items-end justify-between gap-space-md">
          <div>
            <span className="font-label-sm uppercase tracking-wider text-primary font-bold">Phân tích tiến trình</span>
            <h1 className="font-headline-xl text-headline-xl font-bold">Thống Kê Học Tập</h1>
          </div>
          <div className="flex gap-2 flex-wrap">
            {RANGES.map((r) => (
              <button key={r.key} type="button" onClick={() => setRange(r.key)} className={`px-4 py-2 rounded-lg font-label-md ${range === r.key ? 'bg-primary-container text-on-primary shadow-sm' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'}`}>
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <PageState state={state}>
          {(d) => {
            const maxReviewed = Math.max(...d.series.map((s) => s.wordsReviewed), 1);
            const dAcc = delta(d.totals.accuracy, d.previous.accuracy, '%');
            const dNew = delta(d.totals.newWords, d.previous.newWords);
            const dMin = delta(d.totals.studyMinutes, d.previous.studyMinutes, ' phút');
            const showDelta = range !== 'all';
            return (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md">
                  <Kpi label="Từ mới đã học" value={d.totals.newWords} sub={showDelta ? dNew : null} />
                  <Kpi label="Độ chính xác" value={d.totals.accuracy !== null ? `${d.totals.accuracy}%` : '—'} sub={showDelta ? dAcc : null} />
                  <Kpi label="Thời gian học" value={`${d.totals.studyMinutes} phút`} sub={showDelta ? dMin : null} extra={d.totals.activeDays ? `TB ${d.totals.avgMinutesPerActiveDay} phút/ngày học` : undefined} />
                  <Kpi label="Chuỗi ngày học" value={`${d.user.currentStreak} ngày`} extra={`Kỷ lục ${d.user.longestStreak} ngày • ${d.user.totalXp.toLocaleString('vi-VN')} XP`} />
                </div>

                <div className={card}>
                  <h2 className="font-title-md font-bold">Từ đã ôn mỗi ngày</h2>
                  <div className="flex items-end gap-1 h-44 overflow-x-auto">
                    {d.series.map((s) => (
                      <div key={s.date} className="flex-1 min-w-[10px] flex flex-col items-center justify-end gap-1 h-full" title={`${s.date}: ${s.wordsReviewed} từ, ${s.accuracy ?? '—'}% đúng, ${s.studyMinutes} phút`}>
                        <span className="font-label-sm text-on-surface-variant">{d.series.length <= 14 ? s.wordsReviewed : ''}</span>
                        <div className="w-full rounded-t-md bg-primary-container" style={{ height: `${Math.max((s.wordsReviewed / maxReviewed) * 100, s.wordsReviewed ? 4 : 1)}%`, opacity: s.wordsReviewed ? 1 : 0.2 }}></div>
                        {d.series.length <= 14 && <span className="font-label-sm text-on-surface-variant">{s.date.slice(8)}/{s.date.slice(5, 7)}</span>}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg">
                  <div className={card}>
                    <h2 className="font-title-md font-bold">Điểm kỹ năng</h2>
                    {d.skills.map((s) => (
                      <div key={s.key} className="flex items-center gap-space-sm">
                        <span className="w-44 font-label-md">{s.label}</span>
                        <div className="flex-1 h-2 rounded-full bg-surface-container-highest overflow-hidden"><div className="h-full bg-primary" style={{ width: `${s.accuracy ?? 0}%` }}></div></div>
                        <span className="w-24 text-right font-label-md font-bold">{s.accuracy === null ? '—' : `${s.accuracy}%`} <span className="font-normal text-on-surface-variant">({s.attempts})</span></span>
                      </div>
                    ))}
                  </div>
                  <div className={card}>
                    <h2 className="font-title-md font-bold">Kho từ vựng ({d.vocabulary.total} từ)</h2>
                    {([['Mới', d.vocabulary.new, 'bg-secondary-fixed-dim'], ['Đang học', d.vocabulary.learning, 'bg-tertiary'], ['Mastered', d.vocabulary.mastered, 'bg-secondary']] as const).map(([l, n, c]) => (
                      <div key={l} className="flex items-center gap-space-sm">
                        <span className="w-24 font-label-md">{l}</span>
                        <div className="flex-1 h-2 rounded-full bg-surface-container-highest overflow-hidden"><div className={`h-full ${c}`} style={{ width: `${(n / Math.max(d.vocabulary.total, 1)) * 100}%` }}></div></div>
                        <span className="w-10 text-right font-label-md font-bold">{n}</span>
                      </div>
                    ))}
                    <p className="font-body-sm text-on-surface-variant">Đang đến hạn ôn: <strong>{d.vocabulary.due}</strong> từ • Tỷ lệ ghi nhớ: <strong>{d.retention ?? '—'}{d.retention !== null ? '%' : ''}</strong></p>
                  </div>
                </div>

                <div className={card}>
                  <h2 className="font-title-md font-bold">Từ hay sai nhất</h2>
                  {d.topErrors.length === 0 && <p className="text-on-surface-variant font-body-sm">Chưa có dữ liệu lỗi sai.</p>}
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-space-sm">
                    {d.topErrors.map((e) => (
                      <Link key={e.vocabularyId} to={`/vocabulary/${e.vocabularyId}`} className="rounded-xl bg-surface-container-low p-space-md flex flex-col gap-0.5 hover:bg-surface-container">
                        <span className="font-display-character text-[28px] font-bold">{e.hanzi}</span>
                        <span className="text-primary font-bold">{e.pinyin}</span>
                        <span className="font-body-sm text-on-surface-variant">{e.meaning}</span>
                        <span className="font-label-sm text-error font-bold">Sai {e.incorrectCount} lần • đúng {e.accuracy}%</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            );
          }}
        </PageState>
      </div>
    </AppShell>
  );
}

function Kpi({ label, value, sub, extra }: { label: string; value: string | number; sub?: { text: string; good: boolean } | null; extra?: string }) {
  return (
    <div className={card}>
      <span className="font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">{label}</span>
      <span className="font-headline-lg text-headline-lg font-bold">{value}</span>
      {sub && <span className={`font-label-sm font-bold ${sub.good ? 'text-secondary' : 'text-error'}`}>{sub.text}</span>}
      {extra && <span className="font-label-sm text-on-surface-variant">{extra}</span>}
    </div>
  );
}
