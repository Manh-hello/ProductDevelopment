import AppShell from '../layouts/AppShell';
import usePracticeNext from '../lib/usePracticeFlow';

export default function ReverseQuizPage() {
  const goNext = usePracticeNext();

  return (
    <AppShell>
      <div className="flex flex-col w-full max-w-6xl mx-auto pb-space-xl space-y-space-lg">
        <header className="w-full flex flex-col md:flex-row md:items-center justify-between gap-space-md pb-space-sm">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-label-sm text-label-sm tracking-widest uppercase text-primary font-bold">
                Luyện Tập Phản Xạ Active Recall
              </span>
              <span className="text-on-surface-variant/40 text-xs">•</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                Trắc Nghiệm Ngược (Nghĩa Tiếng Việt ➔ Nhận Diện Hán Tự)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm">
                HSK 1 - 2 Cốt Lõi
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">warning</span> Bẫy Tự Hình &amp; Nhầm Lẫn Bộ
                Thủ{' '}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-space-sm bg-surface-container-lowest p-2 rounded-xl shadow-sm self-start md:self-auto">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-container">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Câu</span>
              <span className="font-title-sm text-title-sm font-bold text-on-surface">
                05<span className="text-on-surface-variant font-normal">/10</span>
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed font-label-md text-label-md shadow-[0_2px_8px_rgba(217,119,6,0.15)]">
              <span className="material-symbols-outlined text-[16px] text-tertiary">local_fire_department</span>
              <span>6 Chuỗi (+25 XP)</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-container-high text-on-surface font-label-md text-label-md">
              <span className="material-symbols-outlined text-[16px] text-primary">timer</span>
              <span className="font-mono font-bold" id="quiz-timer">
                01:45
              </span>
            </div>
          </div>
        </header>
        <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden flex">
          <div className="bg-secondary h-full rounded-full transition-all duration-500" style={{ width: '50%' }}></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          <section className="lg:col-span-8 flex flex-col gap-space-lg">
            <article className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/5 rounded-full pointer-events-none blur-xl"></div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                  <p className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
                    {' '}
                    Chọn Hán tự tương thích ngữ nghĩa chính xác{' '}
                  </p>
                </div>
                <span className="text-on-surface-variant font-label-sm text-label-sm bg-surface-container px-2.5 py-0.5 rounded-full">
                  {' '}
                  Độ khó: ★★★☆☆{' '}
                </span>
              </div>
              <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight leading-snug mb-3">
                {' '}
                “Thầy giáo, cô giáo; bậc tiền bối truyền thụ tri thức”{' '}
              </h1>
              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 pt-1 text-on-surface-variant font-body-sm text-body-sm">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-tertiary">category</span>
                  <span>
                    Từ loại: <strong className="text-on-surface font-semibold">Danh từ (名词)</strong>
                  </span>
                </div>
                <span className="text-surface-container-highest">•</span>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-secondary">school</span>
                  <span>
                    Ngữ cảnh: <strong className="text-on-surface font-semibold">Trường học, kính ngữ sư phạm</strong>
                  </span>
                </div>
              </div>
              <div className="mt-space-md pt-space-sm flex items-center justify-between bg-surface-container-low rounded-xl px-space-md py-2.5">
                <div className="flex items-center gap-3">
                  <button
                    className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary shadow-xs transition-colors"
                    id="btn-audio-hint"
                    title="Nghe ngữ điệu mẫu (Phím Space)"
                  >
                    <span className="material-symbols-outlined text-[18px]">volume_up</span>
                  </button>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Gợi ý phát âm (Bấm mở)</span>
                    <span
                      className="font-title-sm text-title-sm font-semibold tracking-wider text-on-surface cursor-pointer select-none"
                      id="pinyin-hint"
                    >
                      lǎo · · · <span className="text-xs text-primary font-normal underline ml-1">Hiện đầy đủ</span>
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[16px]">keyboard</span>
                  <kbd className="px-1.5 py-0.5 rounded bg-surface-container-highest font-mono text-[10px] text-on-surface">
                    Space
                  </kbd>
                </div>
              </div>
            </article>
            <div
              aria-label="Danh sách lựa chọn Hán tự"
              className="grid grid-cols-1 sm:grid-cols-2 gap-space-md"
              role="radiogroup"
            >
              <div
                className="relative group cursor-pointer p-space-md rounded-2xl bg-surface-container-lowest shadow-md transition-all duration-300 ring-2 ring-secondary bg-gradient-to-b from-surface-container-lowest to-secondary-container/10"
                id="choice-a"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="w-7 h-7 rounded-lg bg-secondary text-on-secondary flex items-center justify-center font-bold font-title-sm text-title-sm shadow-xs">
                    {' '}
                    A{' '}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span> Đang Chọn{' '}
                  </span>
                </div>
                <div className="relative w-full aspect-[2/1] rounded-xl bg-surface-bright flex items-center justify-center overflow-hidden my-1 shadow-inner">
                  <svg className="absolute inset-0 w-full h-full text-outline-variant/30 pointer-events-none">
                    <line
                      stroke="currentColor"
                      strokeDasharray="3 3"
                      strokeWidth="1"
                      x1="0"
                      x2="100%"
                      y1="0"
                      y2="100%"
                    ></line>
                    <line
                      stroke="currentColor"
                      strokeDasharray="3 3"
                      strokeWidth="1"
                      x1="100%"
                      x2="0"
                      y1="0"
                      y2="100%"
                    ></line>
                    <line
                      stroke="currentColor"
                      strokeDasharray="4 4"
                      strokeWidth="1.2"
                      x1="50%"
                      x2="50%"
                      y1="0"
                      y2="100%"
                    ></line>
                    <line
                      stroke="currentColor"
                      strokeDasharray="4 4"
                      strokeWidth="1.2"
                      x1="0"
                      x2="100%"
                      y1="50%"
                      y2="50%"
                    ></line>
                  </svg>
                  <span className="relative z-10 font-display-character text-display-character text-on-surface tracking-widest select-none drop-shadow-xs">
                    {' '}
                    老师{' '}
                  </span>
                </div>
                <div className="mt-space-sm flex items-center justify-between pt-1">
                  <div>
                    <span className="font-title-sm text-title-sm font-bold text-secondary">lǎoshī</span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Bộ Lão (耂) + Bộ Cân (巾)</p>
                  </div>
                  <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-semibold">
                    Chính Xác
                  </span>
                </div>
              </div>
              <div
                className="relative group cursor-pointer p-space-md rounded-2xl bg-surface-container-lowest hover:bg-surface-container-low shadow-sm transition-all duration-200"
                id="choice-b"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="w-7 h-7 rounded-lg bg-surface-container-highest text-on-surface flex items-center justify-center font-bold font-title-sm text-title-sm group-hover:bg-primary-container group-hover:text-on-primary transition-colors">
                    {' '}
                    B{' '}
                  </span>
                  <span className="font-label-sm text-label-sm text-error bg-error-container/60 px-2 py-0.5 rounded-full font-medium">
                    Bẫy nét cong dưới
                  </span>
                </div>
                <div className="relative w-full aspect-[2/1] rounded-xl bg-surface-bright flex items-center justify-center overflow-hidden my-1 shadow-inner">
                  <svg className="absolute inset-0 w-full h-full text-outline-variant/30 pointer-events-none">
                    <line
                      stroke="currentColor"
                      strokeDasharray="3 3"
                      strokeWidth="1"
                      x1="0"
                      x2="100%"
                      y1="0"
                      y2="100%"
                    ></line>
                    <line
                      stroke="currentColor"
                      strokeDasharray="3 3"
                      strokeWidth="1"
                      x1="100%"
                      x2="0"
                      y1="0"
                      y2="100%"
                    ></line>
                    <line
                      stroke="currentColor"
                      strokeDasharray="4 4"
                      strokeWidth="1.2"
                      x1="50%"
                      x2="50%"
                      y1="0"
                      y2="100%"
                    ></line>
                    <line
                      stroke="currentColor"
                      strokeDasharray="4 4"
                      strokeWidth="1.2"
                      x1="0"
                      x2="100%"
                      y1="50%"
                      y2="50%"
                    ></line>
                  </svg>
                  <span className="relative z-10 font-display-character text-display-character text-on-surface tracking-widest select-none">
                    {' '}
                    考师{' '}
                  </span>
                </div>
                <div className="mt-space-sm flex items-center justify-between pt-1">
                  <div>
                    <span className="font-title-sm text-title-sm font-semibold text-on-surface">kǎoshī</span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Chữ Khảo 考 (Thi cử, kiểm tra)</p>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">[B]</span>
                </div>
              </div>
              <div
                className="relative group cursor-pointer p-space-md rounded-2xl bg-surface-container-lowest hover:bg-surface-container-low shadow-sm transition-all duration-200"
                id="choice-c"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="w-7 h-7 rounded-lg bg-surface-container-highest text-on-surface flex items-center justify-center font-bold font-title-sm text-title-sm group-hover:bg-primary-container group-hover:text-on-primary transition-colors">
                    {' '}
                    C{' '}
                  </span>
                  <span className="font-label-sm text-label-sm text-tertiary bg-tertiary-fixed px-2 py-0.5 rounded-full font-medium">
                    Bẫy bộ Tử (子)
                  </span>
                </div>
                <div className="relative w-full aspect-[2/1] rounded-xl bg-surface-bright flex items-center justify-center overflow-hidden my-1 shadow-inner">
                  <svg className="absolute inset-0 w-full h-full text-outline-variant/30 pointer-events-none">
                    <line
                      stroke="currentColor"
                      strokeDasharray="3 3"
                      strokeWidth="1"
                      x1="0"
                      x2="100%"
                      y1="0"
                      y2="100%"
                    ></line>
                    <line
                      stroke="currentColor"
                      strokeDasharray="3 3"
                      strokeWidth="1"
                      x1="100%"
                      x2="0"
                      y1="0"
                      y2="100%"
                    ></line>
                    <line
                      stroke="currentColor"
                      strokeDasharray="4 4"
                      strokeWidth="1.2"
                      x1="50%"
                      x2="50%"
                      y1="0"
                      y2="100%"
                    ></line>
                    <line
                      stroke="currentColor"
                      strokeDasharray="4 4"
                      strokeWidth="1.2"
                      x1="0"
                      x2="100%"
                      y1="50%"
                      y2="50%"
                    ></line>
                  </svg>
                  <span className="relative z-10 font-display-character text-display-character text-on-surface tracking-widest select-none">
                    {' '}
                    孝师{' '}
                  </span>
                </div>
                <div className="mt-space-sm flex items-center justify-between pt-1">
                  <div>
                    <span className="font-title-sm text-title-sm font-semibold text-on-surface">xiàoshī</span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Chữ Hiếu 孝 (Hiếu thảo, gia đình)
                    </p>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">[C]</span>
                </div>
              </div>
              <div
                className="relative group cursor-pointer p-space-md rounded-2xl bg-surface-container-lowest hover:bg-surface-container-low shadow-sm transition-all duration-200"
                id="choice-d"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="w-7 h-7 rounded-lg bg-surface-container-highest text-on-surface flex items-center justify-center font-bold font-title-sm text-title-sm group-hover:bg-primary-container group-hover:text-on-primary transition-colors">
                    {' '}
                    D{' '}
                  </span>
                  <span className="font-label-sm text-label-sm text-primary bg-primary-fixed px-2 py-0.5 rounded-full font-medium">
                    Bẫy nét phẩy đầu
                  </span>
                </div>
                <div className="relative w-full aspect-[2/1] rounded-xl bg-surface-bright flex items-center justify-center overflow-hidden my-1 shadow-inner">
                  <svg className="absolute inset-0 w-full h-full text-outline-variant/30 pointer-events-none">
                    <line
                      stroke="currentColor"
                      strokeDasharray="3 3"
                      strokeWidth="1"
                      x1="0"
                      x2="100%"
                      y1="0"
                      y2="100%"
                    ></line>
                    <line
                      stroke="currentColor"
                      strokeDasharray="3 3"
                      strokeWidth="1"
                      x1="100%"
                      x2="0"
                      y1="0"
                      y2="100%"
                    ></line>
                    <line
                      stroke="currentColor"
                      strokeDasharray="4 4"
                      strokeWidth="1.2"
                      x1="50%"
                      x2="50%"
                      y1="0"
                      y2="100%"
                    ></line>
                    <line
                      stroke="currentColor"
                      strokeDasharray="4 4"
                      strokeWidth="1.2"
                      x1="0"
                      x2="100%"
                      y1="50%"
                      y2="50%"
                    ></line>
                  </svg>
                  <span className="relative z-10 font-display-character text-display-character text-on-surface tracking-widest select-none">
                    {' '}
                    老帅{' '}
                  </span>
                </div>
                <div className="mt-space-sm flex items-center justify-between pt-1">
                  <div>
                    <span className="font-title-sm text-title-sm font-semibold text-on-surface">lǎoshuài</span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Chữ Soái 帅 (Đẹp trai, nguyên soái)
                    </p>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">[D]</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-space-md p-space-md rounded-2xl bg-surface-container-low">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span> Phím tắt:{' '}
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="px-2 py-0.5 rounded bg-surface-container-highest font-mono text-[11px] font-bold text-on-surface">
                    A
                  </kbd>
                  <kbd className="px-2 py-0.5 rounded bg-surface-container-highest font-mono text-[11px] font-bold text-on-surface">
                    B
                  </kbd>
                  <kbd className="px-2 py-0.5 rounded bg-surface-container-highest font-mono text-[11px] font-bold text-on-surface">
                    C
                  </kbd>
                  <kbd className="px-2 py-0.5 rounded bg-surface-container-highest font-mono text-[11px] font-bold text-on-surface">
                    D
                  </kbd>
                </div>
              </div>
              <div className="flex items-center gap-space-sm">
                <button
                  className="px-space-md py-2.5 rounded-lg bg-surface-container text-on-surface font-title-sm text-title-sm hover:bg-surface-container-high transition-all"
                  type="button"
                  onClick={goNext}
                >
                  {' '}
                  Bỏ qua / Xem lại sau{' '}
                </button>
                <button
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary-container text-on-primary font-title-sm text-title-sm hover:opacity-95 shadow-md transition-all active:scale-[0.99]"
                  id="btn-submit-answer"
                  type="button"
                  onClick={goNext}
                >
                  <span>Xác nhận đáp án</span>
                  <kbd className="px-1.5 py-0.5 rounded bg-on-primary/20 text-on-primary font-mono text-[10px]">
                    Enter
                  </kbd>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </section>
          <aside className="lg:col-span-4 flex flex-col gap-space-lg">
            <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm">
              <div className="flex items-center justify-between pb-space-sm">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">troubleshoot</span>
                  <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Giải Phẫu Bẫy Nét</h3>
                </div>
                <span className="font-label-sm text-label-sm text-tertiary bg-tertiary-fixed px-2 py-0.5 rounded-full font-bold">
                  Điểm Dễ Sai
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 mb-space-md">
                {' '}
                Sự khác biệt cực nhỏ giữa bộ chữ <strong className="text-on-surface">Lão (老)</strong> và chữ{' '}
                <strong className="text-on-surface">Khảo (考)</strong>:{' '}
              </p>
              <div className="grid grid-cols-2 gap-space-sm p-space-sm rounded-xl bg-surface-container-low mb-space-md">
                <div className="flex flex-col items-center text-center p-space-sm rounded-lg bg-surface-container-lowest shadow-xs">
                  <div className="relative w-16 h-16 flex items-center justify-center font-display-character text-headline-xl text-primary font-bold">
                    {' '}
                    老{' '}
                    <div
                      className="absolute bottom-1 right-2 w-3 h-3 rounded-full bg-secondary ring-2 ring-surface-container-lowest"
                      title="Nét phẩy kéo dài qua ngang"
                    ></div>
                  </div>
                  <span className="font-title-sm text-title-sm font-bold text-on-surface mt-1">老 (Lão)</span>
                  <span className="font-label-sm text-label-sm text-secondary font-medium">Nét phẩy đâm xuyên</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant text-[11px] mt-0.5 leading-tight">
                    Có nét cong móc (匕) phía dưới bên phải
                  </span>
                </div>
                <div className="flex flex-col items-center text-center p-space-sm rounded-lg bg-surface-container-lowest shadow-xs">
                  <div className="relative w-16 h-16 flex items-center justify-center font-display-character text-headline-xl text-on-surface-variant font-bold">
                    {' '}
                    考{' '}
                    <div
                      className="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-error ring-2 ring-surface-container-lowest"
                      title="Nét gấp khúc không xiên dài"
                    ></div>
                  </div>
                  <span className="font-title-sm text-title-sm font-bold text-on-surface mt-1">考 (Khảo)</span>
                  <span className="font-label-sm text-label-sm text-error font-medium">Nét gấp khúc (丂)</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant text-[11px] mt-0.5 leading-tight">
                    Nét cong gập dưới, không kéo vát đuôi
                  </span>
                </div>
              </div>
              <div className="p-space-sm rounded-xl bg-error-container/40 flex items-start gap-2.5 text-on-surface">
                <span className="material-symbols-outlined text-error text-[20px] mt-0.5">query_stats</span>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm font-bold text-error uppercase">
                    Cảnh báo thuật toán HanziSRS
                  </span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant text-[12px] leading-relaxed mt-0.5">
                    <strong className="text-error font-semibold">86% người học</strong> nhầm lẫn cặp chữ{' '}
                    <span className="font-bold">老</span> &amp; <span className="font-bold">考</span>
                    {' trong các bài đọc lướt tốc độ cao (<1.5 giây). '}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[20px]">psychology</span>
                  <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Dự Báo Ghi Nhớ SRS</h3>
                </div>
                <span className="font-label-sm text-label-sm text-secondary font-bold">+15% Tăng vọt</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-on-surface font-title-sm text-title-sm">
                  <span className="text-on-surface-variant">Độ bền hồi tưởng:</span>
                  <span className="font-bold font-mono text-secondary">65% ➔ 80%</span>
                </div>
                <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden flex">
                  <div className="bg-secondary-fixed-dim h-full" style={{ width: '65%' }}></div>
                  <div className="bg-secondary h-full animate-pulse" style={{ width: '15%' }}></div>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant text-right">
                  Mục tiêu: Đạt Guru Level 3
                </span>
              </div>
              <div className="p-space-sm rounded-xl bg-surface-container-low flex items-start gap-2.5">
                <span className="material-symbols-outlined text-tertiary text-[18px] mt-0.5">lightbulb</span>
                <p className="font-body-sm text-body-sm text-on-surface-variant text-[12px] leading-snug">
                  <strong className="text-on-surface font-semibold">Cơ chế Active Recall:</strong> Nhận diện phản xạ
                  ngược kích hoạt hồi hải mã gấp <strong className="text-secondary font-bold">3.2 lần</strong> so với
                  trắc nghiệm thuận từ chữ sang nghĩa.{' '}
                </p>
              </div>
              <div className="flex items-center justify-between p-space-sm rounded-xl bg-primary-fixed/40">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-primary-container text-on-primary flex items-center justify-center font-bold text-xs shadow-xs">
                    {' '}
                    師{' '}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm font-bold text-on-primary-fixed">Từ vựng Cấp 1</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant text-[11px]">
                      Tần suất HSK 3.0: #24
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-primary text-[20px]">verified</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
