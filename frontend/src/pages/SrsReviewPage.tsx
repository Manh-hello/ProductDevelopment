import { useNavigate } from 'react-router-dom';
import AppShell from '../layouts/AppShell';
import { useState } from 'react';
import { useEffect } from 'react';
import { speak } from '../lib/speak';

export default function SrsReviewPage() {
  const navigate = useNavigate();
  const [revealed, setRevealed] = useState(true);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (document.activeElement?.tagName ?? '').toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;
      if (e.code === 'Space') {
        e.preventDefault();
        setRevealed((v) => !v);
      } else if (['1', '2', '3', '4'].includes(e.key)) navigate('/review/complete');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navigate]);

  return (
    <AppShell>
      <div className="flex flex-col w-full">
        <div className="w-full max-w-7xl mx-auto space-y-space-lg">
          <header className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col md:flex-row items-center justify-between gap-space-md">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-space-md w-full md:w-auto">
              <div className="flex items-center gap-space-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-primary-container animate-pulse"></span>
                <span className="font-headline-md text-headline-md text-on-surface">Ôn Tập SRS Hôm Nay</span>
                <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm uppercase font-bold">
                  FSRS v4.5
                </span>
              </div>
              <div className="flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
                <span>Tiến độ:</span>
                <span className="font-headline-md text-headline-md text-primary font-bold">8 / 23</span>
                <span>từ</span>
                <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container font-semibold text-secondary">
                  35%
                </span>
              </div>
            </div>
            <div className="flex items-center gap-space-md w-full md:w-auto justify-end flex-wrap sm:flex-nowrap">
              <div className="flex items-center gap-2">
                <div className="flex flex-col gap-1 w-48 sm:w-64">
                  <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden flex">
                    <div className="h-full bg-primary-container" style={{ width: '22%' }}></div>
                    <div className="h-full bg-tertiary-container" style={{ width: '52%' }}></div>
                    <div className="h-full bg-secondary" style={{ width: '26%' }}></div>
                  </div>
                  <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                      {'5 khẩn cấp (<10m)'}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-tertiary-container"></span>12 chu kỳ (3d)
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>6 dài hạn (7d)
                    </span>
                  </div>
                </div>
              </div>
              <button
                className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant transition-all"
                id="fullscreen-toggle"
                title="Toàn màn hình tập trung"
                onClick={() =>
                  (document.fullscreenElement
                    ? document.exitFullscreen()
                    : document.documentElement.requestFullscreen()
                  ).catch(() => undefined)
                }
              >
                <span className="material-symbols-outlined text-[20px]">fullscreen</span>
              </button>
            </div>
          </header>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
            <div className="lg:col-span-8 flex flex-col items-center gap-space-md w-full">
              <div
                className="relative w-full bg-surface-container-lowest rounded-2xl shadow-sm p-space-lg md:p-space-xl flex flex-col justify-between min-h-[510px] transition-all duration-300"
                id="flashcard"
              >
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center gap-space-xs">
                    <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
                      HSK 1 • Bài 2
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm flex items-center gap-1 font-semibold">
                      <span className="material-symbols-outlined text-[14px]">psychology</span> SRS Cấp 3 (Khoảng cách 3
                      ngày){' '}
                    </span>
                  </div>
                  <div className="flex items-center gap-space-xs text-on-surface-variant">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider">Độ khó FSRS:</span>
                    <span className="font-label-sm text-label-sm font-bold text-on-surface">4.2 / 10</span>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center my-space-md text-center">
                  <div className="relative group cursor-pointer" id="hanzi-focus">
                    <span className="font-display-character text-display-character text-on-surface font-headline-xl select-none tracking-normal transition-transform duration-200 group-hover:scale-105 inline-block">
                      {' '}
                      老师{' '}
                    </span>{' '}
                    <button
                      className="absolute -right-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-primary-container hover:text-on-primary shadow-sm transition-all"
                      id="audio-btn"
                      title="Nghe phát âm chuẩn Bắc Kinh"
                      type="button"
                      onClick={() => speak('老师')}
                    >
                      <span className="material-symbols-outlined text-[22px]">volume_up</span>
                    </button>
                  </div>
                  <div className="mt-space-xs flex items-center gap-space-xs">
                    <span className="font-headline-md text-headline-md font-semibold text-primary tracking-wide">
                      lǎoshī
                    </span>
                    <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
                      Thanh 3 + Thanh 1
                    </span>
                  </div>
                </div>
                <div
                  id="answer-box"
                  className={`space-y-space-md transition-all duration-300 ${revealed ? '' : 'opacity-0 pointer-events-none max-h-0 overflow-hidden'}`}
                >
                  <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col gap-1">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">
                      Nghĩa tiếng Việt chuẩn
                    </span>
                    <p className="font-headline-md text-headline-md text-on-surface font-bold">
                      giáo viên, thầy cô giáo
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Danh từ chỉ nghề nghiệp giáo dục; người truyền thụ kiến thức.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                    <div className="bg-surface-container-low rounded-xl p-space-sm flex items-start gap-space-sm">
                      <div className="w-9 h-9 rounded-lg bg-surface-container-highest flex items-center justify-center font-display-character text-headline-md text-on-surface font-bold shrink-0">
                        老
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-sm text-label-sm text-on-surface-variant font-bold">
                          Bộ Lão (老)
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface">
                          Người lớn tuổi, bậc tiền bối đức cao vọng trọng
                        </span>
                      </div>
                    </div>
                    <div className="bg-surface-container-low rounded-xl p-space-sm flex items-start gap-space-sm">
                      <div className="w-9 h-9 rounded-lg bg-surface-container-highest flex items-center justify-center font-display-character text-headline-md text-on-surface font-bold shrink-0">
                        巾
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-sm text-label-sm text-on-surface-variant font-bold">
                          Bộ Cân (巾)
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface">
                          Vạt áo, khăn xếp của bậc nho sĩ giảng dạy
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col gap-1">
                    <span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">format_quote</span> Ví dụ ngữ cảnh{' '}
                    </span>
                    <div className="flex items-baseline gap-space-xs">
                      <span className="font-title-sm text-title-sm font-bold text-on-surface">我是老师。</span>
                      <span className="font-body-sm text-body-sm text-primary">Wǒ shì lǎoshī.</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant italic">
                      "Tôi là giáo viên (thầy/cô giáo)."
                    </p>
                  </div>
                </div>
                <div className="w-full pt-space-md flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">history</span> Đã ôn 4 lần • Tỷ lệ đúng
                    88%{' '}
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface text-[10px] font-bold shadow-sm">
                      Space
                    </kbd>{' '}
                    Hiện / Ẩn đáp án{' '}
                  </span>
                </div>
              </div>
              <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-space-sm">
                <button
                  className="srs-btn flex flex-col items-center justify-center p-space-md rounded-xl bg-surface-container-lowest hover:bg-primary-container text-on-surface hover:text-on-primary shadow-sm transition-all group active:scale-95"
                  data-rating="1"
                  type="button"
                  onClick={() => navigate('/review/complete')}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider opacity-70 group-hover:opacity-100">
                      Again
                    </span>
                    <kbd className="w-5 h-5 rounded bg-surface-container group-hover:bg-on-primary/20 text-[11px] font-bold flex items-center justify-center">
                      1
                    </kbd>
                  </div>
                  <span className="font-title-sm text-title-sm font-bold mt-1 text-primary-container group-hover:text-on-primary">
                    Lặp Lại
                  </span>
                  <span className="font-label-sm text-label-sm mt-0.5 opacity-80">{'< 10 phút'}</span>
                </button>
                <button
                  className="srs-btn flex flex-col items-center justify-center p-space-md rounded-xl bg-surface-container-lowest hover:bg-tertiary-container text-on-surface hover:text-on-tertiary shadow-sm transition-all group active:scale-95"
                  data-rating="2"
                  type="button"
                  onClick={() => navigate('/review/complete')}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider opacity-70 group-hover:opacity-100">
                      Hard
                    </span>
                    <kbd className="w-5 h-5 rounded bg-surface-container group-hover:bg-on-tertiary/20 text-[11px] font-bold flex items-center justify-center">
                      2
                    </kbd>
                  </div>
                  <span className="font-title-sm text-title-sm font-bold mt-1 text-tertiary-container group-hover:text-on-tertiary">
                    Khó
                  </span>
                  <span className="font-label-sm text-label-sm mt-0.5 opacity-80">+1 ngày</span>
                </button>
                <button
                  className="srs-btn flex flex-col items-center justify-center p-space-md rounded-xl bg-surface-container-lowest hover:bg-inverse-surface text-on-surface hover:text-inverse-on-surface shadow-sm transition-all group active:scale-95"
                  data-rating="3"
                  type="button"
                  onClick={() => navigate('/review/complete')}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider opacity-70 group-hover:opacity-100">
                      Good
                    </span>
                    <kbd className="w-5 h-5 rounded bg-surface-container group-hover:bg-inverse-on-surface/20 text-[11px] font-bold flex items-center justify-center">
                      3
                    </kbd>
                  </div>
                  <span className="font-title-sm text-title-sm font-bold mt-1 text-on-surface group-hover:text-inverse-on-surface">
                    Nhớ Tốt
                  </span>
                  <span className="font-label-sm text-label-sm mt-0.5 opacity-80">+3 ngày</span>
                </button>
                <button
                  className="srs-btn flex flex-col items-center justify-center p-space-md rounded-xl bg-surface-container-lowest hover:bg-secondary text-on-surface hover:text-on-secondary shadow-sm transition-all group active:scale-95"
                  data-rating="4"
                  type="button"
                  onClick={() => navigate('/review/complete')}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider opacity-70 group-hover:opacity-100">
                      Easy
                    </span>
                    <kbd className="w-5 h-5 rounded bg-surface-container group-hover:bg-on-secondary/20 text-[11px] font-bold flex items-center justify-center">
                      4
                    </kbd>
                  </div>
                  <span className="font-title-sm text-title-sm font-bold mt-1 text-secondary group-hover:text-on-secondary">
                    Rất Dễ
                  </span>
                  <span className="font-label-sm text-label-sm mt-0.5 opacity-80">+7 ngày</span>
                </button>
              </div>
              <div className="flex items-center justify-center gap-space-md py-space-xs text-on-surface-variant font-label-sm text-label-sm">
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface text-[10px] font-bold">
                    Space
                  </kbd>{' '}
                  Lật thẻ
                </span>
                <span className="text-surface-container-highest">•</span>
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface text-[10px] font-bold">
                    1
                  </kbd>{' '}
                  Lặp lại
                </span>
                <span className="text-surface-container-highest">•</span>
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface text-[10px] font-bold">
                    2
                  </kbd>{' '}
                  Khó
                </span>
                <span className="text-surface-container-highest">•</span>
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface text-[10px] font-bold">
                    3
                  </kbd>{' '}
                  Nhớ tốt
                </span>
                <span className="text-surface-container-highest">•</span>
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface text-[10px] font-bold">
                    4
                  </kbd>{' '}
                  Rất dễ
                </span>
              </div>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-space-md">
              <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-secondary text-[20px]">show_chart</span>
                    <h3 className="font-headline-md text-headline-md text-on-surface">Đường Quên Lãng</h3>
                  </div>
                  <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-bold">
                    R = 92%
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Dự báo độ lưu giữ từ vựng '老师' theo thời gian thực:
                </p>
                <div className="w-full bg-surface-container-low rounded-xl p-space-sm relative overflow-hidden">
                  <svg className="w-full h-28 text-secondary" fill="none" viewBox="0 0 300 100">
                    <line
                      stroke="currentColor"
                      strokeDasharray="4"
                      strokeOpacity="0.1"
                      x1="0"
                      x2="300"
                      y1="20"
                      y2="20"
                    ></line>
                    <line
                      stroke="currentColor"
                      strokeDasharray="4"
                      strokeOpacity="0.1"
                      x1="0"
                      x2="300"
                      y1="50"
                      y2="50"
                    ></line>
                    <line
                      stroke="currentColor"
                      strokeDasharray="4"
                      strokeOpacity="0.1"
                      x1="0"
                      x2="300"
                      y1="80"
                      y2="80"
                    ></line>
                    <path
                      d="M 0 10 Q 50 70, 100 78 T 200 85 T 300 90"
                      fill="none"
                      stroke="currentColor"
                      strokeOpacity="0.3"
                      strokeWidth="2"
                    />
                    <path
                      d="M 0 10 Q 30 50, 60 55 L 60 15 Q 110 45, 160 50 L 160 20 Q 230 35, 300 40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    />
                    <circle className="fill-primary-container" cx="160" cy="20" r="4" />
                  </svg>
                  <div className="flex justify-between text-[11px] text-on-surface-variant font-label-sm mt-1 px-1">
                    <span>Hôm nay</span>
                    <span>Sau 1 ngày</span>
                    <span>Sau 3 ngày</span>
                    <span>Sau 7 ngày</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm pt-1">
                  <span>
                    Ổn định trí nhớ (S): <strong className="text-on-surface">3.8 ngày</strong>
                  </span>
                  <span>
                    Khả năng truy xuất: <strong className="text-secondary">92%</strong>
                  </span>
                </div>
              </div>
              <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-[20px]">calendar_month</span>
                    <h3 className="font-headline-md text-headline-md text-on-surface">Phân Bổ Ôn 7 Ngày Tới</h3>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Tổng: 148 từ</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-primary-fixed/40">
                    <div className="flex items-center gap-2">
                      <span className="w-16 font-label-sm text-label-sm font-bold text-primary">Hôm nay</span>
                      <span className="font-body-sm text-body-sm text-on-surface">23 từ cần ôn</span>
                    </div>
                    <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-primary text-on-primary font-bold">
                      Đang ôn
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-container-low transition-colors">
                    <div className="flex items-center gap-2">
                      <span className="w-16 font-label-sm text-label-sm text-on-surface-variant">Thứ 3 (Mai)</span>
                      <span className="font-body-sm text-body-sm text-on-surface">18 từ</span>
                    </div>
                    <div className="w-20 h-1.5 bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-secondary" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-container-low transition-colors">
                    <div className="flex items-center gap-2">
                      <span className="w-16 font-label-sm text-label-sm text-on-surface-variant">Thứ 4</span>
                      <span className="font-body-sm text-body-sm text-on-surface">32 từ</span>
                    </div>
                    <div className="w-20 h-1.5 bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-tertiary" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-container-low transition-colors">
                    <div className="flex items-center gap-2">
                      <span className="w-16 font-label-sm text-label-sm text-on-surface-variant">Thứ 5</span>
                      <span className="font-body-sm text-body-sm text-on-surface">14 từ</span>
                    </div>
                    <div className="w-20 h-1.5 bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-secondary" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-container-low transition-colors">
                    <div className="flex items-center gap-2">
                      <span className="w-16 font-label-sm text-label-sm text-on-surface-variant">Thứ 6</span>
                      <span className="font-body-sm text-body-sm text-on-surface">25 từ</span>
                    </div>
                    <div className="w-20 h-1.5 bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-secondary" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-container-low transition-colors">
                    <div className="flex items-center gap-2">
                      <span className="w-16 font-label-sm text-label-sm text-on-surface-variant">Thứ 7</span>
                      <span className="font-body-sm text-body-sm text-on-surface">20 từ</span>
                    </div>
                    <div className="w-20 h-1.5 bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-secondary" style={{ width: '55%' }}></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-container-low transition-colors">
                    <div className="flex items-center gap-2">
                      <span className="w-16 font-label-sm text-label-sm text-on-surface-variant">Chủ Nhật</span>
                      <span className="font-body-sm text-body-sm text-on-surface">16 từ</span>
                    </div>
                    <div className="w-20 h-1.5 bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-secondary" style={{ width: '48%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-surface-container-low rounded-2xl p-space-md flex items-start gap-space-sm">
                <span className="material-symbols-outlined text-tertiary text-[20px] shrink-0 mt-0.5">
                  tips_and_updates
                </span>
                <div className="flex flex-col gap-1">
                  <span className="font-title-sm text-title-sm font-bold text-on-surface">
                    Mẹo nhớ nhanh bộ Lão &amp; Cân
                  </span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    {' '}
                    Hãy hình dung một người thầy cao tuổi (老) khoác trên vai chiếc khăn bào (巾), nghiêm túc đứng trên
                    bục giảng.{' '}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
