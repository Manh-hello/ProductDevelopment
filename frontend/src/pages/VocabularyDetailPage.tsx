import { Link, useNavigate, useParams } from 'react-router-dom';
import { myWordsApi, vocabularyApi } from '../api';
import AppShell from '../layouts/AppShell';
import PageState from '../components/PageState';
import { speak } from '../lib/speak';
import useApi from '../lib/useApi';

const card = 'bg-surface-container-lowest rounded-2xl p-space-lg shadow-[0_4px_20px_rgba(15,23,42,0.04)] flex flex-col gap-space-sm';
const STATE_LABEL = { new: 'Từ mới', learning: 'Đang học', due: 'Cần ôn', mastered: 'Mastered' } as const;
const fmtDate = (d: string | null) => (d ? new Date(d).toLocaleString('vi-VN') : '—');

export default function VocabularyDetailPage() {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const state = useApi(async () => {
    const [vocab, progress] = await Promise.all([vocabularyApi.get(id), vocabularyApi.progress(id)]);
    return { vocab, progress };
  }, [id]);

  const add = async () => {
    await myWordsApi.add(id);
    state.reload();
  };

  return (
    <AppShell>
      <PageState state={state}>
        {({ vocab: v, progress: p }) => {
          const uv = p.userVocabulary;
          return (
            <div className="max-w-5xl mx-auto flex flex-col gap-space-lg pb-space-xl">
              <div className="flex items-center gap-2 font-label-md text-on-surface-variant">
                <Link to="/vocabulary" className="hover:text-primary">Kho từ vựng</Link> <span>/</span> <span className="text-on-surface font-semibold">{v.hanzi}</span>
              </div>

              <div className={`${card} items-center text-center relative overflow-hidden`}>
                <div className="flex gap-2">
                  {v.level && <span className="px-2.5 py-0.5 rounded bg-surface-container font-label-sm font-semibold">{v.level}</span>}
                  {v.partOfSpeech && <span className="px-2.5 py-0.5 rounded bg-surface-container font-label-sm font-semibold uppercase">{v.partOfSpeech}</span>}
                  {uv && <span className="px-2.5 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-label-sm font-bold">{STATE_LABEL[uv.state]}</span>}
                </div>
                <span className="font-display-character text-[96px] leading-none font-bold">{v.hanzi}</span>
                <div className="flex items-center gap-2">
                  <span className="font-headline-lg text-headline-lg text-primary font-bold">{v.pinyin}</span>
                  <button type="button" onClick={() => speak(v.hanzi)} className="w-10 h-10 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center" title="Phát âm">
                    <span className="material-symbols-outlined">volume_up</span>
                  </button>
                </div>
                <span className="font-title-lg text-title-lg">{v.meaning}</span>
                {v.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {v.tags.map((t) => <span key={t} className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm">#{t}</span>)}
                  </div>
                )}
                <div className="flex flex-wrap gap-space-sm justify-center mt-2">
                  {!p.inMyList ? (
                    <button type="button" onClick={add} className="px-space-lg py-2.5 rounded-lg bg-primary-container text-on-primary font-title-sm font-bold">Thêm vào danh sách học</button>
                  ) : (
                    <button type="button" onClick={() => navigate('/review')} className="px-space-lg py-2.5 rounded-lg bg-primary-container text-on-primary font-title-sm font-bold">Ôn tập ngay</button>
                  )}
                  <Link to={`/vocabulary/${v.id}/edit`} className="px-space-lg py-2.5 rounded-lg bg-surface-container font-title-sm font-bold">Chỉnh sửa</Link>
                  {p.inMyList && <Link to={`/sentences?word=${v.id}`} className="px-space-lg py-2.5 rounded-lg bg-surface-container font-title-sm font-bold">Tạo câu với từ này</Link>}
                </div>
              </div>

              {v.notes && <div className={card}><h2 className="font-title-md font-bold">Ghi chú</h2><p className="font-body-md text-on-surface-variant">{v.notes}</p></div>}

              <div className={card}>
                <h2 className="font-title-md font-bold">Câu ví dụ</h2>
                {v.examples.length === 0 && <p className="text-on-surface-variant font-body-sm">Chưa có câu ví dụ.</p>}
                {v.examples.map((ex, i) => (
                  <div key={ex.id ?? i} className="rounded-xl bg-surface-container-low p-space-md flex items-start justify-between gap-space-sm">
                    <div>
                      <p className="font-display-character text-[24px] font-bold">{ex.sentenceHanzi}</p>
                      <p className="text-primary font-semibold">{ex.sentencePinyin}</p>
                      <p className="text-on-surface-variant">{ex.sentenceMeaning}</p>
                    </div>
                    <button type="button" onClick={() => speak(ex.sentenceHanzi)} className="w-9 h-9 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[20px]">volume_up</span>
                    </button>
                  </div>
                ))}
              </div>

              {uv && (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md">
                    <Metric label="Số lần ôn" value={uv.reviewCount} />
                    <Metric label="Độ chính xác" value={uv.accuracy !== null ? `${uv.accuracy}%` : '—'} />
                    <Metric label="Khoảng cách ôn" value={uv.intervalDays !== null ? `${uv.intervalDays} ngày` : '—'} />
                    <Metric label="Mức thuần thục" value={`${uv.masteryLevel}/5`} />
                  </div>
                  <div className={card}>
                    <h2 className="font-title-md font-bold">Hồ sơ trí nhớ (SRS)</h2>
                    <div className="h-2 rounded-full bg-surface-container-highest overflow-hidden"><div className="h-full bg-secondary" style={{ width: `${uv.retention}%` }}></div></div>
                    <p className="font-body-sm text-on-surface-variant">Ôn gần nhất: {fmtDate(uv.lastReviewedAt)} • Ôn tiếp theo: {fmtDate(uv.nextReviewAt)}</p>
                    {p.history.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-1">
                        {p.history.map((h) => (
                          <span key={h.id} className={`px-2.5 py-1 rounded-lg font-label-sm font-bold ${h.quality >= 3 ? 'bg-secondary-container text-on-secondary-container' : 'bg-error-container text-on-error-container'}`} title={fmtDate(h.reviewedAt)}>
                            q{h.quality} → {h.newInterval}d
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className={card}>
                    <h2 className="font-title-md font-bold">Mức độ 6 chiều</h2>
                    {p.skills.map((s) => (
                      <div key={s.key} className="flex items-center gap-space-sm">
                        <span className="w-44 font-label-md">{s.label}</span>
                        <div className="flex-1 h-2 rounded-full bg-surface-container-highest overflow-hidden"><div className="h-full bg-primary" style={{ width: `${s.accuracy ?? 0}%` }}></div></div>
                        <span className="w-12 text-right font-label-md font-bold">{s.accuracy === null ? '—' : `${s.accuracy}%`}</span>
                      </div>
                    ))}
                  </div>
                  {(uv.note || uv.mnemonic) && (
                    <div className={card}>
                      <h2 className="font-title-md font-bold">Ghi chú riêng của bạn</h2>
                      {uv.mnemonic && <p className="font-body-md"><strong>Mẹo nhớ:</strong> {uv.mnemonic}</p>}
                      {uv.note && <p className="font-body-md text-on-surface-variant">{uv.note}</p>}
                    </div>
                  )}
                  {p.sentences.length > 0 && (
                    <div className={card}>
                      <h2 className="font-title-md font-bold">Câu bạn đã đặt</h2>
                      {p.sentences.map((s) => <p key={s.id} className="font-display-character text-[20px]">{s.sentence}</p>)}
                    </div>
                  )}
                </>
              )}
            </div>
          );
        }}
      </PageState>
    </AppShell>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className={card}>
      <span className="font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">{label}</span>
      <span className="font-headline-lg text-headline-lg font-bold">{value}</span>
    </div>
  );
}
