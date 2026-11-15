import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { catalogApi, myWordsApi } from '../../api';
import { ApiError } from '../../lib/api';
import { useAuth } from '../../lib/auth';
import { speak } from '../../lib/speak';
import useApi from '../../lib/useApi';
import { ErrorBox } from '../PageState';

interface Props {
  wordId: string;
  onClose: () => void;
  /** Gọi sau khi từ được thêm vào danh sách học (để cha cập nhật trạng thái "Đã có"). */
  onAdded?: (wordId: string) => void;
}

/** Popup chi tiết một từ trong kho chung: nghĩa, từ loại, cấp độ, chủ đề, ghi chú cách dùng, câu ví dụ. Dùng được cả khi chưa đăng nhập. */
export default function WordDetailModal({ wordId, onClose, onAdded }: Props) {
  const { user, refreshSummary } = useAuth();
  const navigate = useNavigate();
  const state = useApi(() => catalogApi.word(wordId), [wordId, user?.id]);
  const [added, setAdded] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const w = state.data;
  const inList = added || w?.inMyList === true;

  const add = async () => {
    if (!user) {
      onClose();
      navigate('/auth', { state: { from: window.location.pathname + window.location.search } });
      return;
    }
    setBusy(true);
    setError(null);
    try {
      await myWordsApi.add(wordId);
    } catch (e) {
      if (!(e instanceof ApiError && e.status === 409)) {
        setError(e instanceof ApiError ? e.message : 'Không thêm được từ.');
        setBusy(false);
        return;
      }
    }
    setAdded(true);
    setBusy(false);
    onAdded?.(wordId);
    void refreshSummary();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 p-0 sm:p-gutter-sm" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-label="Chi tiết từ vựng" onClick={(e) => e.stopPropagation()} className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-surface-container-lowest shadow-xl p-space-lg flex flex-col gap-space-md">
        <button type="button" onClick={onClose} aria-label="Đóng" className="absolute right-3 top-3 p-2 rounded-full hover:bg-surface-container text-on-surface-variant">
          <span className="material-symbols-outlined">close</span>
        </button>

        {state.loading && !w && <p className="text-on-surface-variant font-body-md py-space-lg text-center">Đang tải...</p>}
        {state.error && !w && <ErrorBox message={state.error} onRetry={state.reload} />}

        {w && (
          <>
            <div className="flex flex-col items-center text-center gap-1 pt-space-sm">
              <span className="font-display-character text-[72px] leading-none text-primary" lang="zh">{w.hanzi}</span>
              <div className="flex items-center gap-2">
                <span className="font-title-md font-bold text-on-surface">{w.pinyin}</span>
                <button type="button" onClick={() => speak(w.hanzi)} aria-label={`Nghe ${w.hanzi}`} className="p-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-primary">
                  <span className="material-symbols-outlined text-[20px]">volume_up</span>
                </button>
              </div>
              {(w.hanViet || w.traditional) && (
                <p className="font-body-sm text-on-surface-variant">
                  {w.hanViet && <>Hán Việt: <span className="font-bold text-on-surface">{w.hanViet}</span></>}
                  {w.hanViet && w.traditional && ' · '}
                  {w.traditional && <>Phồn thể: <span className="font-display-character text-[16px] text-on-surface" lang="zh-Hant">{w.traditional}</span></>}
                </p>
              )}
              <p className="font-title-md text-on-surface mt-1">{w.meaning}</p>
              <div className="flex flex-wrap justify-center gap-1.5 mt-1">
                {w.partOfSpeech && <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm">{w.partOfSpeech}</span>}
                {w.measureWord && <span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm">Lượng từ: <span lang="zh">{w.measureWord}</span></span>}
                {w.level && <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm font-bold">{w.level}</span>}
                {w.tags.map((t) => <span key={t} className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm">{t}</span>)}
              </div>
            </div>

            {w.usage && (
              <div className="rounded-xl bg-surface-container-low p-space-md">
                <span className="font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Cách dùng</span>
                <p className="font-body-md text-on-surface mt-1 whitespace-pre-line">{w.usage}</p>
              </div>
            )}

            {w.collocations && w.collocations.length > 0 && (
              <div className="flex flex-col gap-space-xs">
                <span className="font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Kết hợp từ thường gặp</span>
                {w.collocations.map((c, i) => (
                  <div key={i} className="flex flex-wrap items-baseline gap-x-space-sm rounded-lg bg-surface-container-low px-space-md py-2">
                    <span className="font-display-character text-[18px] font-bold" lang="zh">{c.phrase}</span>
                    {c.pinyin && <span className="text-primary font-body-sm">{c.pinyin}</span>}
                    {c.meaning && <span className="text-on-surface-variant font-body-sm">— {c.meaning}</span>}
                  </div>
                ))}
              </div>
            )}

            {([['Đồng nghĩa / gần nghĩa', w.synonyms], ['Trái nghĩa', w.antonyms]] as const).map(([label, list]) =>
              list && list.length > 0 ? (
                <div key={label} className="flex flex-col gap-space-xs">
                  <span className="font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">{label}</span>
                  <div className="flex flex-wrap gap-space-xs">
                    {list.map((r, i) => (
                      <span key={i} className="rounded-lg bg-surface-container-low px-space-sm py-1.5 font-body-sm" title={r.note || undefined}>
                        <span className="font-display-character text-[16px] font-bold" lang="zh">{r.word}</span>
                        {r.pinyin && <span className="text-primary"> {r.pinyin}</span>}
                        {r.note && <span className="text-on-surface-variant"> · {r.note}</span>}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null
            )}

            {w.notes && (
              <div className="rounded-xl bg-surface-container-low p-space-md">
                <span className="font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Cách dùng / ghi chú</span>
                <p className="font-body-md text-on-surface mt-1 whitespace-pre-line">{w.notes}</p>
              </div>
            )}

            <div className="flex flex-col gap-space-xs">
              <span className="font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Câu ví dụ</span>
              {w.examples.length === 0 && <p className="font-body-sm text-on-surface-variant">Từ này chưa có câu ví dụ.</p>}
              {w.examples.map((e) => (
                <div key={e.id} className="rounded-xl bg-surface-container-low p-space-md flex items-start justify-between gap-space-sm">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-display-character text-[20px] font-bold text-on-surface" lang="zh">{e.sentenceHanzi}</span>
                    {e.sentencePinyin && <span className="text-primary font-body-sm">{e.sentencePinyin}</span>}
                    <span className="text-on-surface-variant font-body-sm">{e.sentenceMeaning}</span>
                    {e.explanation && <span className="text-on-surface-variant/80 font-label-sm italic">{e.explanation}</span>}
                  </div>
                  <button type="button" onClick={() => speak(e.sentenceHanzi)} aria-label="Nghe câu" className="shrink-0 p-1.5 rounded-full hover:bg-surface-container text-primary">
                    <span className="material-symbols-outlined text-[20px]">volume_up</span>
                  </button>
                </div>
              ))}
            </div>

            {error && <p role="alert" className="text-error font-body-sm">{error}</p>}
            <div className="flex flex-wrap gap-space-sm justify-end">
              {inList ? (
                <Link to={`/vocabulary/${w.id}`} className="px-space-md py-2.5 rounded-lg bg-secondary-container text-on-secondary-container font-title-sm font-bold">Đã có trong danh sách · Xem tiến độ</Link>
              ) : (
                <button type="button" onClick={() => void add()} disabled={busy} className="px-space-md py-2.5 rounded-lg bg-primary-container text-on-primary font-title-sm font-bold disabled:opacity-60">
                  {busy ? 'Đang thêm...' : user ? 'Thêm vào danh sách học' : 'Đăng nhập để thêm từ'}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
