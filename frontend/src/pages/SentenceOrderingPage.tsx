import AppShell from '../layouts/AppShell';
import usePracticeNext from '../lib/usePracticeFlow';

export default function SentenceOrderingPage() {
  const goNext = usePracticeNext();

  return (
    <AppShell>
      <div className="flex flex-col w-full">
        <div className="w-full flex flex-col gap-space-lg pb-space-xl">
          <section className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-md">
            <div className="flex flex-wrap items-center justify-between gap-space-md">
              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                  <span>Cấu Trúc Ngữ Pháp &amp; Cú Pháp Hán Ngữ</span>
                  <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                  <span className="text-primary font-bold">Luyện Sắp Xếp Trật Tự Câu</span>
                </div>
                <div className="flex items-center gap-space-sm flex-wrap">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-bold">
                    <span className="material-symbols-outlined text-[14px] text-primary">bookmark</span> HSK 2{' '}
                  </span>
                  <h1 className="font-headline-md text-headline-md text-on-surface font-bold">
                    {' '}
                    Cấu Trúc Trạng Ngữ Chỉ Nơi Chốn &amp; Giới Từ 在 (Zài){' '}
                  </h1>
                </div>
              </div>
              <div className="flex items-center gap-space-sm flex-wrap">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-md text-label-md shadow-sm">
                  <span className="material-symbols-outlined text-[18px] text-tertiary">bolt</span>
                  <span>+30 XP Ngữ Pháp</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-high text-on-surface font-label-md text-label-md">
                  <span className="material-symbols-outlined text-[18px] text-secondary">timer</span>
                  <span className="font-bold tabular-nums" id="session-timer">
                    02:15
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md font-bold">
                  <span>Câu 04 / 08</span>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col gap-1">
              <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden flex">
                <div className="h-full bg-secondary transition-all" style={{ width: '12.5%' }}></div>
                <div className="h-full bg-secondary transition-all" style={{ width: '12.5%' }}></div>
                <div className="h-full bg-secondary transition-all" style={{ width: '12.5%' }}></div>
                <div className="h-full bg-primary-container transition-all" style={{ width: '12.5%' }}></div>
                <div className="h-full bg-surface-container-highest transition-all" style={{ width: '50%' }}></div>
              </div>
              <div className="flex justify-between items-center text-on-surface-variant font-label-sm text-label-sm">
                <span>Tiến độ bài học: 50% hoàn tất</span>
                <span className="font-bold text-primary">Tỉ lệ chính xác: 100%</span>
              </div>
            </div>
          </section>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md items-stretch">
            <div className="lg:col-span-8 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between gap-space-md relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-primary-fixed/20 pointer-events-none blur-2xl"></div>
              <div className="flex flex-col gap-space-xs relative z-10">
                <div className="flex items-center gap-space-xs">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
                    Đề bài mục tiêu (Ngữ nghĩa Hán - Việt)
                  </span>
                </div>
                <div className="font-headline-xl text-headline-xl text-on-surface tracking-tight leading-snug">
                  {' '}
                  “Thầy Vương chiều nay ở thư viện đọc sách tiếng Trung.”{' '}
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {' '}
                  Hãy sắp đặt lại các khối từ vựng bên dưới theo đúng trật tự cú pháp Hán ngữ tiêu chuẩn. Chú ý vị trí
                  của cụm giới từ chỉ địa điểm.{' '}
                </p>
              </div>
              <div className="flex items-center gap-space-sm pt-space-xs border-t border-surface-container flex-wrap">
                <span className="inline-flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[16px] text-tertiary">translate</span> Thành phần câu:
                  5 khối logic + 1 dấu chấm câu{' '}
                </span>
                <span className="text-surface-container-highest">•</span>
                <span className="inline-flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[16px] text-secondary">psychology</span> Mẹo: Thời
                  gian có thể đứng trước hoặc sau chủ ngữ{' '}
                </span>
              </div>
            </div>
            <div className="lg:col-span-4 bg-gradient-to-br from-tertiary-fixed/40 via-surface-container-low to-surface-container rounded-xl p-space-md shadow-sm flex flex-col justify-between gap-space-sm relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-tertiary font-title-sm text-title-sm font-bold">
                  <span className="material-symbols-outlined text-[20px]">lightbulb</span>
                  <span>Quy Tắc Vàng Cú Pháp</span>
                </div>
                <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-surface-container-highest text-tertiary font-bold">
                  S + T + P + V + O
                </span>
              </div>
              <div className="p-space-sm rounded-lg bg-surface-container-lowest/80 backdrop-blur-sm flex flex-col gap-1.5 shadow-sm">
                <div className="font-label-sm text-label-sm font-bold text-on-surface uppercase tracking-wider">
                  Trật Tự Cốt Lõi:
                </div>
                <div className="font-body-sm text-body-sm text-on-surface flex flex-col gap-1 leading-relaxed">
                  <span className="font-bold text-primary">1. Ai</span> (Chủ ngữ) +{' '}
                  <span className="font-bold text-tertiary">2. Khi nào</span> (Thời gian) +{' '}
                  <span className="font-bold text-secondary">3. Ở đâu</span> (Nơi chốn - 在...) +{' '}
                  <span className="font-bold text-on-surface">4. Làm gì</span> (Hành động &amp; Tân ngữ){' '}
                </div>
              </div>
              <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                <span className="italic text-[12px]">*Khác tiếng Việt: Địa điểm luôn đi TRƯỚC động từ chính.</span>
              </div>
            </div>
          </div>
          <div className="w-full bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-lg">
            <div className="flex items-center justify-between flex-wrap gap-space-sm">
              <div className="flex items-center gap-space-sm">
                <span className="w-8 h-8 rounded-lg bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-bold font-title-sm text-title-sm">
                  <span className="material-symbols-outlined text-[18px]">drag_handle</span>
                </span>
                <div>
                  <h2 className="font-title-sm text-title-sm font-bold text-on-surface">Khung Sắp Xếp Câu Trực Quan</h2>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    Bấm số thứ tự phím tắt [1 - 6] hoặc nhấp thẻ để thu hồi về hàng dự trữ
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-space-xs">
                <button
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container text-on-surface font-title-sm text-title-sm hover:bg-surface-container-high transition-all"
                  id="btn-listen-sentence"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px] text-primary">volume_up</span>
                  <span>Nghe mẫu</span>
                </button>
                <button
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container text-on-surface font-title-sm text-title-sm hover:bg-surface-container-high transition-all"
                  id="btn-reset-order"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px] text-on-surface-variant">restart_alt</span>
                  <span>Đặt lại vị trí</span>
                </button>
              </div>
            </div>
            <div
              className="w-full p-space-md md:p-space-lg rounded-xl bg-surface-container-low min-h-[160px] flex flex-wrap items-center gap-space-md"
              id="drop-zone-container"
            >
              <div className="flex flex-col items-center gap-1.5 flex-1 min-w-[130px]">
                <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">
                  [ 1. Chủ ngữ ]
                </span>
                <div className="w-full bg-surface-container-lowest p-space-sm rounded-xl shadow-sm flex flex-col items-center justify-center cursor-pointer hover:scale-[1.02] transition-all">
                  <span className="font-display-character-mobile text-display-character-mobile font-bold text-on-surface leading-none">
                    王老师
                  </span>
                  <span className="font-body-sm text-body-sm text-primary font-bold mt-1">Wáng lǎoshī</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Thầy Vương</span>
                </div>
              </div>
              <div className="hidden sm:flex items-center justify-center text-outline-variant pt-4">
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 flex-1 min-w-[120px]">
                <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">
                  [ 2. Thời gian ]
                </span>
                <div className="w-full bg-surface-container-lowest p-space-sm rounded-xl shadow-sm flex flex-col items-center justify-center cursor-pointer hover:scale-[1.02] transition-all">
                  <span className="font-display-character-mobile text-display-character-mobile font-bold text-on-surface leading-none">
                    下午
                  </span>
                  <span className="font-body-sm text-body-sm text-primary font-bold mt-1">xiàwǔ</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Buổi chiều</span>
                </div>
              </div>
              <div className="hidden sm:flex items-center justify-center text-outline-variant pt-4">
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 flex-1 min-w-[140px]">
                <span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider">
                  [ 3. Ở đâu (在) ]
                </span>
                <div className="w-full bg-secondary-fixed/30 p-space-sm rounded-xl shadow-sm flex flex-col items-center justify-center cursor-pointer hover:scale-[1.02] transition-all">
                  <span className="font-display-character-mobile text-display-character-mobile font-bold text-secondary leading-none">
                    在图书馆
                  </span>
                  <span className="font-body-sm text-body-sm text-secondary font-bold mt-1">zài túshūguǎn</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Ở thư viện</span>
                </div>
              </div>
              <div className="hidden sm:flex items-center justify-center text-outline-variant pt-4">
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 flex-1 min-w-[100px]">
                <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">
                  [ 4. Động từ ]
                </span>
                <div className="w-full bg-surface-container-lowest p-space-sm rounded-xl shadow-sm flex flex-col items-center justify-center cursor-pointer hover:scale-[1.02] transition-all">
                  <span className="font-display-character-mobile text-display-character-mobile font-bold text-on-surface leading-none">
                    看
                  </span>
                  <span className="font-body-sm text-body-sm text-primary font-bold mt-1">kàn</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Đọc/Xem</span>
                </div>
              </div>
              <div className="hidden sm:flex items-center justify-center text-outline-variant pt-4">
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 flex-1 min-w-[130px]">
                <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">
                  [ 5. Tân ngữ ]
                </span>
                <div className="w-full bg-surface-container-lowest p-space-sm rounded-xl shadow-sm flex flex-col items-center justify-center cursor-pointer hover:scale-[1.02] transition-all">
                  <span className="font-display-character-mobile text-display-character-mobile font-bold text-on-surface leading-none">
                    中文书
                  </span>
                  <span className="font-body-sm text-body-sm text-primary font-bold mt-1">zhōngwén shū</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Sách tiếng Trung</span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1.5 w-16">
                <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">
                  [ Dấu ]
                </span>
                <div className="w-full bg-surface-container-lowest p-space-sm rounded-xl shadow-sm flex flex-col items-center justify-center cursor-pointer hover:scale-[1.02] transition-all">
                  <span className="font-display-character-mobile text-display-character-mobile font-bold text-on-surface leading-none">
                    。
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant mt-1">jùhào</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Hết câu</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-space-sm">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm uppercase font-bold text-on-surface-variant tracking-wider">
                  {' '}
                  Ngân hàng khối từ vựng (Nhấp phím số tương ứng để chọn nhanh):{' '}
                </span>
                <span className="font-label-sm text-label-sm text-secondary font-bold inline-flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span> 6/6 Khối đã được đặt vào câu{' '}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-space-sm">
                <button
                  className="group relative p-space-sm rounded-xl bg-surface-container hover:bg-surface-container-high transition-all flex flex-col items-center justify-center gap-1 opacity-60 cursor-pointer"
                  type="button"
                >
                  <span className="absolute top-2 left-2 w-5 h-5 rounded bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm font-bold flex items-center justify-center">
                    1
                  </span>
                  <span className="font-headline-lg text-headline-lg font-headline-xl text-on-surface font-bold">
                    王老师
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Wáng lǎoshī</span>
                  <span className="font-label-sm text-label-sm text-secondary font-bold">Đã chọn</span>
                </button>
                <button
                  className="group relative p-space-sm rounded-xl bg-surface-container hover:bg-surface-container-high transition-all flex flex-col items-center justify-center gap-1 opacity-60 cursor-pointer"
                  type="button"
                >
                  <span className="absolute top-2 left-2 w-5 h-5 rounded bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm font-bold flex items-center justify-center">
                    2
                  </span>
                  <span className="font-headline-lg text-headline-lg font-headline-xl text-on-surface font-bold">
                    下午
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">xiàwǔ</span>
                  <span className="font-label-sm text-label-sm text-secondary font-bold">Đã chọn</span>
                </button>
                <button
                  className="group relative p-space-sm rounded-xl bg-surface-container hover:bg-surface-container-high transition-all flex flex-col items-center justify-center gap-1 opacity-60 cursor-pointer"
                  type="button"
                >
                  <span className="absolute top-2 left-2 w-5 h-5 rounded bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm font-bold flex items-center justify-center">
                    3
                  </span>
                  <span className="font-headline-lg text-headline-lg font-headline-xl text-secondary font-bold">
                    在图书馆
                  </span>
                  <span className="font-label-sm text-label-sm text-secondary">zài túshūguǎn</span>
                  <span className="font-label-sm text-label-sm text-secondary font-bold">Đã chọn</span>
                </button>
                <button
                  className="group relative p-space-sm rounded-xl bg-surface-container hover:bg-surface-container-high transition-all flex flex-col items-center justify-center gap-1 opacity-60 cursor-pointer"
                  type="button"
                >
                  <span className="absolute top-2 left-2 w-5 h-5 rounded bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm font-bold flex items-center justify-center">
                    4
                  </span>
                  <span className="font-headline-lg text-headline-lg font-headline-xl text-on-surface font-bold">
                    看
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">kàn</span>
                  <span className="font-label-sm text-label-sm text-secondary font-bold">Đã chọn</span>
                </button>
                <button
                  className="group relative p-space-sm rounded-xl bg-surface-container hover:bg-surface-container-high transition-all flex flex-col items-center justify-center gap-1 opacity-60 cursor-pointer"
                  type="button"
                >
                  <span className="absolute top-2 left-2 w-5 h-5 rounded bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm font-bold flex items-center justify-center">
                    5
                  </span>
                  <span className="font-headline-lg text-headline-lg font-headline-xl text-on-surface font-bold">
                    中文书
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">zhōngwén shū</span>
                  <span className="font-label-sm text-label-sm text-secondary font-bold">Đã chọn</span>
                </button>
                <button
                  className="group relative p-space-sm rounded-xl bg-surface-container hover:bg-surface-container-high transition-all flex flex-col items-center justify-center gap-1 opacity-60 cursor-pointer"
                  type="button"
                >
                  <span className="absolute top-2 left-2 w-5 h-5 rounded bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm font-bold flex items-center justify-center">
                    6
                  </span>
                  <span className="font-headline-lg text-headline-lg font-headline-xl text-on-surface font-bold">
                    。
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">jùhào</span>
                  <span className="font-label-sm text-label-sm text-secondary font-bold">Đã chọn</span>
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md">
            <div className="lg:col-span-8 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-primary text-[22px]">account_tree</span>
                  <span className="font-title-sm text-title-sm font-bold text-on-surface">
                    Sơ Đồ Phân Tích Cây Cú Pháp (Syntax Tree Diagram)
                  </span>
                </div>
                <span className="font-label-sm text-label-sm px-2.5 py-1 rounded bg-surface-container text-on-surface-variant font-bold">
                  {' '}
                  Chuẩn Ngữ Pháp Hán Ngữ Hiện Đại{' '}
                </span>
              </div>
              <div className="w-full bg-surface-container-low p-space-md rounded-xl flex flex-col gap-space-md">
                <div className="flex justify-center">
                  <div className="px-4 py-2 rounded-lg bg-surface-container-highest text-on-surface font-title-sm text-title-sm font-bold shadow-sm">
                    {' '}
                    Câu Hoàn Chỉnh: 王老师下午在图书馆看中文书。{' '}
                  </div>
                </div>
                <div className="w-full flex justify-center -my-2 text-surface-dim">
                  <svg className="w-full max-w-lg h-8" fill="none" viewBox="0 0 500 32">
                    <path
                      d="M250 0 V14 M80 32 V20 H420 V32 M250 14 H80 M250 14 H420"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm">
                  <div className="bg-surface-container-lowest p-space-sm rounded-lg shadow-sm flex flex-col gap-1">
                    <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
                      [ 1. Chủ ngữ (S) ]
                    </span>
                    <div className="font-headline-md text-headline-md font-bold text-on-surface font-headline-xl">
                      王老师
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Chủ thể hành vi trong câu. Có thể hoán đổi vị trí với Trạng từ thời gian.
                    </p>
                  </div>
                  <div className="bg-surface-container-lowest p-space-sm rounded-lg shadow-sm flex flex-col gap-1">
                    <span className="font-label-sm text-label-sm text-tertiary uppercase font-bold tracking-wider">
                      [ 2. Trạng ngữ (AdvP) ]
                    </span>
                    <div className="font-headline-md text-headline-md font-bold text-tertiary font-headline-xl">
                      下午 · 在图书馆
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Quy tắc thời gian trước - nơi chốn sau. Giới từ 在 mở đầu cụm chỉ địa điểm.
                    </p>
                  </div>
                  <div className="bg-surface-container-lowest p-space-sm rounded-lg shadow-sm flex flex-col gap-1">
                    <span className="font-label-sm text-label-sm text-secondary uppercase font-bold tracking-wider">
                      [ 3. Cụm Vị ngữ (VP) ]
                    </span>
                    <div className="font-headline-md text-headline-md font-bold text-secondary font-headline-xl">
                      看中文书
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Động từ hành động [看] chi phối trực tiếp tân ngữ chỉ đối tượng [中文书].
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm pt-space-xs">
                <div className="p-space-sm rounded-lg bg-surface-container flex flex-col gap-1">
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase">
                    Trật Tự Tiếng Việt:
                  </span>
                  <div className="font-body-md text-body-md text-on-surface">
                    {' '}
                    Thầy Vương + <span className="text-tertiary font-bold">chiều nay</span> +{' '}
                    <span className="font-bold underline">đọc sách</span> +{' '}
                    <span className="text-secondary font-bold">Ở THƯ VIỆN</span>.{' '}
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant italic">
                    → Tiếng Việt đặt địa điểm ở CUỐI câu sau động từ.
                  </span>
                </div>
                <div className="p-space-sm rounded-lg bg-primary-fixed/30 flex flex-col gap-1">
                  <span className="font-label-sm text-label-sm text-primary font-bold uppercase">
                    Trật Tự Tiếng Trung (Bắt Buộc):
                  </span>
                  <div className="font-body-md text-body-md text-on-surface">
                    {' '}
                    王老师 + <span className="text-tertiary font-bold">下午</span> +{' '}
                    <span className="text-secondary font-bold">在图书馆</span> +{' '}
                    <span className="font-bold underline">看中文书</span>。{' '}
                  </div>
                  <span className="font-label-sm text-label-sm text-primary font-bold italic">
                    → Tiếng Trung đặt địa điểm TRƯỚC động từ hành vi!
                  </span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-space-md">
              <div className="bg-error-container/40 rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm">
                <div className="flex items-center gap-space-xs text-error font-title-sm text-title-sm font-bold">
                  <span className="material-symbols-outlined text-[20px]">warning</span>
                  <span>Bẫy Lỗi Sai Thường Gặp</span>
                </div>
                <div className="p-space-sm rounded-lg bg-surface-container-lowest shadow-sm flex flex-col gap-1">
                  <div className="flex items-center gap-1 text-error font-body-sm text-body-sm font-bold">
                    <span className="material-symbols-outlined text-[16px]">cancel</span>
                    <span>Lỗi dịch Word-by-Word:</span>
                  </div>
                  <div className="font-title-sm text-title-sm line-through text-on-surface-variant font-headline-xl">
                    {' '}
                    *王老师看中文书在图书馆。{' '}
                  </div>
                  <p className="font-label-sm text-label-sm text-error">
                    {' '}
                    Sai hoàn toàn! Trong tiếng Hán, không được đặt cụm "在 + nơi chốn" sau động từ thường (ngoại trừ một
                    số động từ đặc biệt như 住, 停, 站).{' '}
                  </p>
                </div>
                <div className="p-space-sm rounded-lg bg-surface-container-lowest shadow-sm flex flex-col gap-1">
                  <div className="flex items-center gap-1 text-secondary font-body-sm text-body-sm font-bold">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    <span>Cấu trúc đúng chuẩn:</span>
                  </div>
                  <div className="font-title-sm text-title-sm text-secondary font-bold font-headline-xl">
                    {' '}
                    王老师在图书馆看中文书。{' '}
                  </div>
                </div>
              </div>
              <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-xs">
                <div className="flex items-center gap-1.5 text-on-surface font-title-sm text-title-sm font-bold">
                  <span className="material-symbols-outlined text-[18px] text-tertiary">menu_book</span>
                  <span>Phân Tích Chữ 在 (Zài)</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  {' '}
                  Chữ <strong>在</strong> bao gồm bộ Thổ (土 - đất đai), ban đầu mô tả sự sinh sôi của cỏ cây cắm rễ vào
                  mảnh đất. Trong ngữ pháp hiện đại, nó đóng vai trò giới từ cố định tọa độ trước khi hành động diễn
                  ra.{' '}
                </p>
                <div className="flex items-center justify-between pt-space-xs border-t border-surface-container font-label-sm text-label-sm text-on-surface-variant">
                  <span>Bộ thủ: 土 (Thổ)</span>
                  <span>Tổng nét: 6 nét</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-wrap items-center justify-between gap-space-md sticky bottom-4 z-30">
            <div className="flex items-center gap-space-xs flex-wrap">
              <button
                className="inline-flex items-center gap-1.5 px-space-md py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-title-sm text-title-sm transition-all"
                id="btn-show-hint"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px] text-tertiary">tips_and_updates</span>
                <span>Xem Gợi Ý Ngữ Pháp</span>
                <span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm font-bold">
                  [H]
                </span>
              </button>
              <button
                className="inline-flex items-center gap-1.5 px-space-md py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant font-title-sm text-title-sm transition-all"
                id="btn-skip-question"
                type="button"
                onClick={goNext}
              >
                <span className="material-symbols-outlined text-[18px]">fast_forward</span>
                <span>Bỏ Qua Câu Này</span>
                <span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm font-bold">
                  [Esc]
                </span>
              </button>
            </div>
            <div className="flex items-center gap-space-sm flex-wrap">
              <div
                className="hidden items-center gap-1.5 text-secondary font-label-md text-label-md font-bold"
                id="feedback-message"
              >
                <span className="material-symbols-outlined text-[20px]">check_circle</span>{' '}
                <span>Chính xác! Cấu trúc câu chuẩn xác tuyệt đối.</span>
              </div>
              <button
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-container text-on-primary font-title-sm text-title-sm hover:opacity-95 shadow-[0_4px_12px_rgba(190,18,60,0.25)] hover:scale-[1.01] transition-all"
                id="btn-submit-answer"
                type="button"
                onClick={goNext}
              >
                <span className="material-symbols-outlined text-[20px]">task_alt</span>
                <span>Kiểm Tra &amp; Xác Nhận Đáp Án</span>
                <span className="px-2 py-0.5 rounded bg-primary text-on-primary font-label-sm text-label-sm font-bold">
                  [Enter]
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
