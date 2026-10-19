import { useNavigate } from 'react-router-dom';
import AppShell from '../layouts/AppShell';
import { PageLoading } from '../lib/auth';
import { EmptyState, ErrorBox } from '../components/PageState';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { myWordsApi } from '../api';
import useApi from '../lib/useApi';
import type { UserVocabulary } from '../lib/types';
import { speak } from '../lib/speak';
const TAB_FILTERS = ['all', 'new', 'learning', 'due', 'mastered', 'weak'];
const PAGE_SIZE = 20;

function badgeFor(w: UserVocabulary) {
  if (w.state === 'mastered') return { cls: 'bg-secondary-container text-on-secondary-container', icon: 'verified', label: 'Mastered' };
  if (w.isWeak) return { cls: 'bg-error-container text-on-error-container', icon: 'error', label: w.state === 'due' ? 'Cần ôn gấp' : 'Hay sai' };
  if (w.state === 'due') return { cls: 'bg-primary-fixed text-on-primary-fixed', icon: 'schedule', label: 'Cần ôn' };
  if (w.state === 'new') return { cls: 'bg-surface-container-high text-on-surface', icon: 'fiber_new', label: 'Từ mới' };
  return { cls: 'bg-tertiary-fixed text-on-tertiary-fixed', icon: 'trending_up', label: 'Đang học' };
}

export default function VocabularyPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [tab, setTab] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(params.get('q') ?? '');
  const [debounced, setDebounced] = useState(search);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(search), 300);
    return () => clearTimeout(t);
  }, [search]);
  useEffect(() => setPage(1), [tab, debounced]);

  const state = useApi(() => myWordsApi.list({ filter: TAB_FILTERS[tab], search: debounced, page, limit: PAGE_SIZE }), [tab, debounced, page]);
  const list = state.data?.items ?? [];
  const counts = state.data?.counts ?? { all: 0, new: 0, learning: 0, due: 0, mastered: 0, weak: 0 };
  const total = state.data?.pagination.total ?? 0;
  const totalPages = state.data?.pagination.totalPages ?? 1;
  const masteredPct = counts.all ? Math.round((counts.mastered / counts.all) * 100) : 0;
  const duePct = counts.all ? Math.round((counts.due / counts.all) * 100) : 0;

  const removeWord = async (w: UserVocabulary) => {
    if (!window.confirm(`Xóa "${w.vocabulary.hanzi}" khỏi danh sách học? Tiến độ SRS của từ này sẽ mất.`)) return;
    await myWordsApi.remove(w.vocabularyId);
    state.reload();
  };

  const exportCsv = () => {
    const csv = ['hanzi,pinyin,meaning,state,accuracy']
      .concat(list.map((w) => [w.vocabulary.hanzi, w.vocabulary.pinyin, w.vocabulary.meaning, w.state, w.accuracy ?? ''].map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')))
      .join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' }));
    a.download = 'hanzi-vocabulary.csv';
    a.click();
    URL.revokeObjectURL(a.href);
  };


  return (
    <AppShell>
      <div className="flex flex-col w-full">
        <div className="relative w-full overflow-hidden">
          <div className="absolute -top-32 right-12 w-96 h-96 rounded-full bg-primary-fixed-dim/20 blur-3xl pointer-events-none"></div>
          <div className="absolute top-48 left-1/3 w-80 h-80 rounded-full bg-secondary-fixed-dim/25 blur-3xl pointer-events-none"></div>
          <div className="relative flex flex-col gap-space-lg mb-space-xl">
            <div className="flex flex-wrap items-center justify-between gap-space-md">
              <div className="flex items-center gap-space-sm">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                  Quản lý Tri thức
                </span>
                <span className="text-on-surface-variant font-label-sm text-label-sm">•</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Quy trình SRS SuperMemo-2</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Đồng bộ tự động{' '}
                </span>
              </div>
              <div className="flex items-center gap-space-sm text-on-surface-variant font-body-sm text-body-sm">
                <span className="material-symbols-outlined text-[18px] text-tertiary">cloud_done</span>
                <span>
                  Dữ liệu lưu trên máy chủ: <strong>đồng bộ theo tài khoản</strong>
                </span>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg">
              <div className="flex flex-col gap-space-xs max-w-2xl">
                <div className="flex items-center gap-space-md">
                  <h1 className="font-headline-xl text-headline-xl text-on-surface font-bold tracking-tight">
                    Kho Từ Vựng Cá Nhân
                  </h1>
                  <span className="px-3 py-1 rounded-full bg-surface-container-highest text-on-surface font-headline-md text-headline-md font-bold">
                    {counts.all} từ
                  </span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {' '}
                  Hệ thống ngân hàng Hán tự cá nhân hóa theo tiến trình lặp lại ngắt quãng. Toàn bộ từ vựng được trí tuệ
                  nhân tạo mổ xẻ 6 chiều: ngữ nghĩa, âm thanh, bộ thủ, cấu trúc câu và mẫu kiểm tra phản xạ.{' '}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-space-sm">
                <button
                  className="inline-flex items-center gap-2 px-space-md py-2.5 rounded-lg bg-surface-container-high text-on-surface font-title-sm text-title-sm hover:bg-surface-container-highest shadow-sm transition-all"
                  type="button"
                  onClick={exportCsv}
                >
                  <span className="material-symbols-outlined text-[20px] text-on-surface-variant">download</span>
                  <span>Xuất dữ liệu</span>
                </button>
                <button
                  className="inline-flex items-center gap-2 px-space-md py-2.5 rounded-lg bg-tertiary-container text-on-tertiary font-title-sm text-title-sm hover:opacity-90 shadow-sm transition-all"
                  type="button"
                  onClick={() => navigate('/review')}
                >
                  <span className="material-symbols-outlined text-[20px]">bolt</span>
                  <span>Ôn tập danh sách lọc</span>
                </button>
                <button
                  className="inline-flex items-center gap-2 px-space-lg py-2.5 rounded-lg bg-primary-container text-on-primary font-title-sm text-title-sm shadow-md hover:bg-primary transition-all"
                  id="open-ai-modal-btn"
                  type="button"
                  onClick={() => navigate('/vocabulary/new')}
                >
                  <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                  <span>+ Thêm từ vựng mới AI</span>
                </button>
              </div>
            </div>
            <div className="p-space-md rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md">
              <div className="relative w-full">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[22px]">
                  search
                </span>{' '}
                <input
                  className="w-full pl-12 pr-28 py-3 rounded-xl bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/80 font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest focus:shadow-md transition-all"
                  placeholder="🔍 Tìm kiếm theo chữ Hán, Pinyin hoặc nghĩa tiếng Việt (ví dụ: 老师, laoshi, giáo viên)..."
                  type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm px-2 py-1 rounded bg-surface-container">
                  <span>ESC để xóa</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1">
                <button
                  onClick={() => setTab(0)}
                  className={
                    tab === 0
                      ? 'inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md shadow-sm transition-all'
                      : 'inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-label-md text-label-md transition-all'
                  }
                >
                  <span>Tất cả</span>{' '}
                  <span
                    className={
                      tab === 0
                        ? 'px-1.5 py-0.5 rounded-full bg-surface-container-lowest/20 font-bold text-label-sm'
                        : 'px-1.5 py-0.5 rounded-full bg-surface-container-highest text-on-surface font-bold text-label-sm'
                    }
                  >
                    {counts.all}
                  </span>
                </button>
                <button
                  onClick={() => setTab(1)}
                  className={
                    tab === 1
                      ? 'inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md shadow-sm transition-all'
                      : 'inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-label-md text-label-md transition-all'
                  }
                >
                  <span>Từ mới</span>{' '}
                  <span
                    className={
                      tab === 1
                        ? 'px-1.5 py-0.5 rounded-full bg-surface-container-lowest/20 font-bold text-label-sm'
                        : 'px-1.5 py-0.5 rounded-full bg-surface-container-highest text-on-surface font-bold text-label-sm'
                    }
                  >
                    {counts.new}
                  </span>
                </button>
                <button
                  onClick={() => setTab(2)}
                  className={
                    tab === 2
                      ? 'inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md shadow-sm transition-all'
                      : 'inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-label-md text-label-md transition-all'
                  }
                >
                  <span>Đang học</span>{' '}
                  <span
                    className={
                      tab === 2
                        ? 'px-1.5 py-0.5 rounded-full bg-surface-container-lowest/20 font-bold text-label-sm'
                        : 'px-1.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold text-label-sm'
                    }
                  >
                    {counts.learning}
                  </span>
                </button>
                <button
                  onClick={() => setTab(3)}
                  className={
                    tab === 3
                      ? 'inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md shadow-sm transition-all'
                      : 'inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-fixed text-on-primary-fixed hover:bg-primary-fixed-dim font-label-md text-label-md transition-all'
                  }
                >
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span> <span>Cần ôn SRS</span>{' '}
                  <span className="px-1.5 py-0.5 rounded-full bg-primary text-on-primary font-bold text-label-sm">
                    {counts.due}
                  </span>
                </button>
                <button
                  onClick={() => setTab(4)}
                  className={
                    tab === 4
                      ? 'inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md shadow-sm transition-all'
                      : 'inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-label-md text-label-md transition-all'
                  }
                >
                  <span>Đã nhớ</span>{' '}
                  <span
                    className={
                      tab === 4
                        ? 'px-1.5 py-0.5 rounded-full bg-surface-container-lowest/20 font-bold text-label-sm'
                        : 'px-1.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-bold text-label-sm'
                    }
                  >
                    {counts.mastered}
                  </span>
                </button>
                <button
                  onClick={() => setTab(5)}
                  className={
                    tab === 5
                      ? 'inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md shadow-sm transition-all'
                      : 'inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-error-container text-on-error-container hover:opacity-90 font-label-md text-label-md transition-all'
                  }
                >
                  <span className="material-symbols-outlined text-[16px]">warning</span> <span>Hay sai</span>{' '}
                  <span className="px-1.5 py-0.5 rounded-full bg-error text-on-error font-bold text-label-sm">16</span>
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-space-lg mb-space-xl">
            <div className="w-full bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden flex flex-col">
              <div className="px-space-lg py-space-md bg-surface-container-low flex flex-wrap items-center justify-between gap-space-md">
                <div className="flex items-center gap-space-md">
                  <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                    Danh mục từ vựng hoạt động
                  </span>
                  <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-secondary font-bold">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span> 6 chiều dữ liệu đã thẩm
                    định{' '}
                  </span>
                </div>
                <div className="flex items-center gap-space-sm text-on-surface-variant font-body-sm text-body-sm">
                  <span>
                    Hiển thị <strong>{list.length}</strong> trên <strong>{total}</strong> mục
                  </span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container/60 text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                      <th className="py-3 px-space-lg font-bold">Hán tự</th>
                      <th className="py-3 px-space-md font-bold">Pinyin &amp; Nghĩa</th>
                      <th className="py-3 px-space-md font-bold">Ví dụ thực tế</th>
                      <th className="py-3 px-space-md font-bold">Trạng thái SRS</th>
                      <th className="py-3 px-space-md font-bold">Mức độ 6 Chiều</th>
                      <th className="py-3 px-space-lg text-right font-bold">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-0">
              {list.map((w) => {
                const ex = w.vocabulary.examples[0];
                const badge = badgeFor(w);
                return (
                    <tr key={w.id} className="hover:bg-surface-container-low/80 transition-colors group">
                      <td className="py-4 px-space-lg align-top">
                        <div className="flex items-center gap-space-sm">
                          <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center font-display-character text-[28px] font-bold text-primary group-hover:scale-105 transition-transform shadow-xs">
                            {w.vocabulary.hanzi}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-label-sm text-label-sm text-on-surface-variant">{w.vocabulary.level ?? '—'}</span>
                            <span className="font-label-sm text-label-sm text-tertiary">{w.vocabulary.partOfSpeech ?? ''}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-space-md align-top">
                        <div className="flex flex-col gap-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="font-title-sm text-title-sm font-bold text-on-surface">{w.vocabulary.pinyin}</span>
                            <button
                              className="w-6 h-6 rounded-full flex items-center justify-center text-primary hover:bg-primary-fixed transition-colors"
                              title="Nghe phát âm chuẩn"
                              type="button"
                              onClick={() => speak(w.vocabulary.hanzi)}
                            >
                              <span className="material-symbols-outlined text-[16px]">volume_up</span>
                            </button>
                          </div>
                          <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                            {w.vocabulary.meaning}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-space-md align-top max-w-xs">
                        <div className="flex flex-col">
                          <span className="font-body-md text-body-md text-on-surface font-semibold">{ex?.sentenceHanzi ?? '—'}</span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">
                            {ex ? `${ex.sentencePinyin} (${ex.sentenceMeaning})` : ''}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-space-md align-top">
                        <div className="flex flex-col gap-1">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-bold w-fit ${badge.cls}`}>
                          <span className="material-symbols-outlined text-[14px]">{badge.icon}</span> {badge.label}
                        </span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">
                            {w.reviewCount === 0 ? 'Chưa ôn lần nào' : `Khoảng cách: ${w.intervalDays ?? 0} ngày`}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-space-md align-top min-w-[160px]">
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center justify-between font-label-sm text-label-sm">
                            <span className="text-on-surface-variant">Độ chuẩn xác</span>
                            <span className="font-bold text-tertiary">{w.accuracy ?? 0}%</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
                            <div className="h-full bg-tertiary rounded-full" style={{ width: `${w.accuracy ?? 0}%` }}></div>
                          </div>
                          <span className="font-label-sm text-label-sm text-on-surface-variant/80">
                            {w.correctCount}/{w.correctCount + w.incorrectCount} câu đúng
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-space-lg align-top text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            className="p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors"
                            title="Nghe"
                            type="button"
                            onClick={() => speak(w.vocabulary.hanzi)}
                          >
                            <span className="material-symbols-outlined text-[18px]">volume_up</span>
                          </button>
                          <button
                            className="p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
                            title="Chi tiết ngữ nghĩa & etymology"
                            type="button"
                            onClick={() => navigate(`/vocabulary/${w.vocabularyId}`)}
                          >
                            <span className="material-symbols-outlined text-[18px]">menu_book</span>
                          </button>
                          <button
                            className="p-2 rounded-lg text-on-surface-variant hover:text-error hover:bg-error-container transition-colors"
                            title="Xóa khỏi danh sách học"
                            type="button"
                            onClick={() => removeWord(w)}
                          >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                );
              })}
                  </tbody>
                </table>
              </div>
              <div className="px-space-lg py-4 bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-space-md">
                <div className="flex items-center gap-space-sm">
                <span className="font-body-sm text-body-sm text-on-surface-variant">Trang {page} / {totalPages}</span>
                <div className="h-4 w-px bg-surface-container-highest"></div>
                <span className="font-label-sm text-label-sm text-on-surface-variant">{PAGE_SIZE} từ mỗi trang</span>
                </div>
                <div className="flex items-center gap-1.5">
              <button type="button" disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="w-8 h-8 rounded-lg bg-surface-container text-on-surface-variant flex items-center justify-center hover:bg-surface-container-highest disabled:opacity-40">
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>
              <button type="button" className="w-8 h-8 rounded-lg bg-primary text-on-primary font-bold text-label-sm flex items-center justify-center">{page}</button>
              <button type="button" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)} className="w-8 h-8 rounded-lg bg-surface-container text-on-surface flex items-center justify-center hover:bg-surface-container-highest disabled:opacity-40">
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-space-lg">
              <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between mb-space-sm">
                  <span className="font-title-sm text-title-sm font-bold text-on-surface">Phân bố Trí nhớ Dài hạn</span>
                  <span className="material-symbols-outlined text-secondary text-[20px]">donut_large</span>
                </div>
                <div className="flex items-center gap-space-lg my-space-xs">
                  <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" fill="transparent" r="14" stroke="#e3e2e0" strokeWidth="3" />
                      <circle
                        cx="18"
                        cy="18"
                        fill="transparent"
                        r="14"
                        stroke="#006c4a"
                        strokeDasharray={`${(88 * masteredPct) / 100} 88`}
                        strokeDashoffset="0"
                        strokeWidth="3.5"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        fill="transparent"
                        r="14"
                        stroke="#be123c"
                        strokeDasharray={`${(88 * duePct) / 100} 88`}
                        strokeDashoffset={`${-(88 * masteredPct) / 100}`}
                        strokeWidth="3.5"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="font-headline-md text-headline-md font-bold text-on-surface">{masteredPct}%</span>
                      <span className="font-label-sm text-[10px] text-on-surface-variant uppercase">Bền vững</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 font-label-sm text-label-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-sm bg-secondary"></span>
                      <span className="text-on-surface">Đã lưu sâu ({counts.mastered})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-sm bg-tertiary"></span>
                      <span className="text-on-surface">Củng cố ({counts.learning})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-sm bg-primary-container"></span>
                      <span className="text-on-surface">Cần ôn ({counts.due})</span>
                    </div>
                  </div>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs">
                  Hiện có {counts.due} từ đang chờ ôn hôm nay.
                </p>
              </div>

          </div>
        </div>

        </div>
      </div>
    </AppShell>
  );
}
