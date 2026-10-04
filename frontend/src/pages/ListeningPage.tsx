import AppShell from '../layouts/AppShell';
import usePracticeNext from '../lib/usePracticeFlow';

export default function ListeningPage() {
  const goNext = usePracticeNext();

  return (
    <AppShell>
      <div className="flex flex-col w-full gap-space-lg pb-12">
        <section className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col md:flex-row items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-md w-full md:w-auto">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary-container animate-pulse"></span>
              <span className="font-label-md text-label-md text-on-surface uppercase tracking-wider font-bold">
                Luyện Nghe &amp; Nhận Diện Âm
              </span>
            </div>
            <div className="h-4 w-px bg-surface-container-highest hidden sm:block"></div>
            <div className="flex items-center gap-1.5 text-on-surface-variant font-label-md text-label-md">
              <span className="font-bold text-on-surface">Câu 3</span>
              <span>/ 10</span>
            </div>
            <div className="w-32 lg:w-48 h-2 rounded-full bg-surface-container overflow-hidden flex">
              <div className="h-full bg-primary-container transition-all duration-500" style={{ width: '30%' }}></div>
            </div>
          </div>
          <div className="flex items-center gap-space-sm w-full md:w-auto justify-end flex-wrap">
            <div className="h-8 px-3 rounded-full bg-surface-container flex items-center gap-1.5 text-on-surface font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[16px] text-on-surface-variant">timer</span>
              <span id="sessionTimer">03:42</span>
            </div>
            <div className="h-8 px-3 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center gap-1 font-label-sm text-label-sm shadow-sm font-bold">
              <span className="material-symbols-outlined text-[16px] text-tertiary">local_fire_department</span>
              <span>12 Ngày</span>
            </div>
            <div className="h-8 px-3 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center gap-1 font-label-sm text-label-sm font-bold">
              <span className="material-symbols-outlined text-[16px] text-secondary">bolt</span>
              <span>+30 XP</span>
            </div>
          </div>
        </section>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          <div className="lg:col-span-8 flex flex-col gap-space-lg">
            <section className="w-full bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm relative overflow-hidden flex flex-col items-center text-center">
              <span className="absolute -right-6 -bottom-8 font-display-character text-[140px] text-surface-container-high/40 select-none pointer-events-none font-bold">
                听
              </span>
              <div className="flex items-center justify-between w-full mb-space-sm">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary-container font-bold bg-primary-fixed px-2.5 py-1 rounded-full">
                  HSK 1-2 • Từ Vựng Cơ Bản
                </span>
                <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[16px]">headphones</span>
                  <span>Bắc Kinh Chuẩn (Standard Mandarin)</span>
                </div>
              </div>
              <p className="font-headline-md text-headline-md text-on-surface mb-space-md tracking-tight font-bold">
                {' '}
                Bạn vừa nghe thấy từ / cụm từ nào dưới đây?{' '}
              </p>
              <div className="relative flex flex-col items-center justify-center my-space-sm">
                <div
                  className="absolute w-36 h-36 rounded-full bg-primary-container/10 transition-all duration-700 animate-ping opacity-60"
                  id="audioPulseRing"
                ></div>
                <button
                  className="relative w-28 h-28 rounded-full bg-primary-container text-on-primary shadow-xl hover:scale-105 active:scale-95 transition-all flex flex-col items-center justify-center group focus:outline-none focus:ring-4 focus:ring-primary-container/20"
                  id="mainAudioBtn"
                  title="Phím tắt: [Space]"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[48px] group-hover:scale-110 transition-transform">
                    volume_up
                  </span>
                  <span className="font-label-sm text-[10px] tracking-wider uppercase font-bold text-on-primary/90 mt-0.5">
                    Phát Âm
                  </span>
                </button>
              </div>
              <div className="w-full max-w-sm h-12 flex items-center justify-center gap-1.5 my-space-sm px-4">
                <span
                  className="w-1.5 h-3 rounded-full bg-primary-container/30 transition-all duration-300"
                  id="wave1"
                ></span>
                <span
                  className="w-1.5 h-6 rounded-full bg-primary-container/50 transition-all duration-300"
                  id="wave2"
                ></span>
                <span
                  className="w-1.5 h-10 rounded-full bg-primary-container transition-all duration-300"
                  id="wave3"
                ></span>
                <span
                  className="w-1.5 h-5 rounded-full bg-primary-container/60 transition-all duration-300"
                  id="wave4"
                ></span>
                <span
                  className="w-1.5 h-8 rounded-full bg-primary-container/80 transition-all duration-300"
                  id="wave5"
                ></span>
                <span
                  className="w-1.5 h-12 rounded-full bg-primary-container transition-all duration-300"
                  id="wave6"
                ></span>
                <span
                  className="w-1.5 h-7 rounded-full bg-primary-container/70 transition-all duration-300"
                  id="wave7"
                ></span>
                <span
                  className="w-1.5 h-4 rounded-full bg-primary-container/40 transition-all duration-300"
                  id="wave8"
                ></span>
                <span
                  className="w-1.5 h-9 rounded-full bg-primary-container/90 transition-all duration-300"
                  id="wave9"
                ></span>
                <span
                  className="w-1.5 h-5 rounded-full bg-primary-container/50 transition-all duration-300"
                  id="wave10"
                ></span>
              </div>
              <div className="flex items-center justify-center flex-wrap gap-space-sm mt-2">
                <button
                  className="speed-btn px-3 py-1.5 rounded-lg bg-surface-container text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high transition-all"
                  data-speed="0.75"
                  type="button"
                >
                  {' '}
                  0.75x (Chậm rõ){' '}
                </button>
                <button
                  className="speed-btn px-3 py-1.5 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md shadow-sm transition-all"
                  data-speed="1.0"
                  type="button"
                >
                  {' '}
                  1.0x (Chuẩn){' '}
                </button>
                <button
                  className="speed-btn px-3 py-1.5 rounded-lg bg-surface-container text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high transition-all"
                  data-speed="1.25"
                  type="button"
                >
                  {' '}
                  1.25x (Thực tế){' '}
                </button>
                <div className="h-5 w-px bg-surface-container-highest mx-1"></div>
                <button
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-all"
                  id="replayBtn"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">replay</span>
                  <span>Nghe lại (Space)</span>
                </button>
              </div>
            </section>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
              <div
                className="choice-card group cursor-pointer bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-all flex flex-col justify-between min-h-[140px] relative overflow-hidden"
                data-choice="A"
                data-correct="false"
              >
                <div className="flex items-start justify-between">
                  <span className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center font-label-sm text-label-sm font-bold text-on-surface-variant group-hover:bg-primary-container group-hover:text-on-primary transition-all">
                    A
                  </span>
                  <button
                    className="option-audio-preview p-1 rounded-full text-on-surface-variant hover:text-primary-container hover:bg-surface-container transition-all"
                    title="Nghe so sánh phát âm này"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">volume_up</span>
                  </button>
                </div>
                <div className="my-2">
                  <span className="font-headline-xl text-headline-lg font-bold text-on-surface tracking-wide">
                    老师
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-title-sm text-title-sm text-primary-container font-semibold">lǎoshī</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">giáo viên</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-label-sm text-[11px] text-on-surface-variant opacity-60">Nhấn phím [A]</span>
                </div>
              </div>
              <div
                className="choice-card group cursor-pointer bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-all flex flex-col justify-between min-h-[140px] relative overflow-hidden"
                data-choice="B"
                data-correct="true"
              >
                <div className="flex items-start justify-between">
                  <span className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center font-label-sm text-label-sm font-bold text-on-surface-variant group-hover:bg-primary-container group-hover:text-on-primary transition-all">
                    B
                  </span>
                  <button
                    className="option-audio-preview p-1 rounded-full text-on-surface-variant hover:text-primary-container hover:bg-surface-container transition-all"
                    title="Nghe so sánh phát âm này"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">volume_up</span>
                  </button>
                </div>
                <div className="my-2">
                  <span className="font-headline-xl text-headline-lg font-bold text-on-surface tracking-wide">
                    学生
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-title-sm text-title-sm text-primary-container font-semibold">xuéshēng</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">học sinh</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-label-sm text-[11px] text-on-surface-variant opacity-60">Nhấn phím [B]</span>
                </div>
              </div>
              <div
                className="choice-card group cursor-pointer bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-all flex flex-col justify-between min-h-[140px] relative overflow-hidden"
                data-choice="C"
                data-correct="false"
              >
                <div className="flex items-start justify-between">
                  <span className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center font-label-sm text-label-sm font-bold text-on-surface-variant group-hover:bg-primary-container group-hover:text-on-primary transition-all">
                    C
                  </span>
                  <button
                    className="option-audio-preview p-1 rounded-full text-on-surface-variant hover:text-primary-container hover:bg-surface-container transition-all"
                    title="Nghe so sánh phát âm này"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">volume_up</span>
                  </button>
                </div>
                <div className="my-2">
                  <span className="font-headline-xl text-headline-lg font-bold text-on-surface tracking-wide">
                    名字
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-title-sm text-title-sm text-primary-container font-semibold">míngzi</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">tên gọi</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-label-sm text-[11px] text-on-surface-variant opacity-60">Nhấn phím [C]</span>
                </div>
              </div>
              <div
                className="choice-card group cursor-pointer bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-all flex flex-col justify-between min-h-[140px] relative overflow-hidden"
                data-choice="D"
                data-correct="false"
              >
                <div className="flex items-start justify-between">
                  <span className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center font-label-sm text-label-sm font-bold text-on-surface-variant group-hover:bg-primary-container group-hover:text-on-primary transition-all">
                    D
                  </span>
                  <button
                    className="option-audio-preview p-1 rounded-full text-on-surface-variant hover:text-primary-container hover:bg-surface-container transition-all"
                    title="Nghe so sánh phát âm này"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">volume_up</span>
                  </button>
                </div>
                <div className="my-2">
                  <span className="font-headline-xl text-headline-lg font-bold text-on-surface tracking-wide">
                    中国
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-title-sm text-title-sm text-primary-container font-semibold">Zhōngguó</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Trung Quốc</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-label-sm text-[11px] text-on-surface-variant opacity-60">Nhấn phím [D]</span>
                </div>
              </div>
            </div>
            <section className="w-full bg-surface-container-low rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[20px]">hearing</span>
                  <span className="font-title-sm text-title-sm font-bold text-on-surface">
                    Bài nghe ngữ cảnh mở rộng (Contextual Sentence)
                  </span>
                </div>
                <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold">
                  Thử thách nâng cao
                </span>
              </div>
              <div className="bg-surface-container-lowest rounded-lg p-space-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm">
                <div className="flex items-center gap-space-sm">
                  <button
                    className="w-10 h-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-sm hover:opacity-90 transition-all flex-shrink-0"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[22px]">volume_up</span>
                  </button>
                  <div className="flex flex-col">
                    <span className="font-title-sm text-title-sm font-semibold text-on-surface">
                      "Wǒ shì xuéshēng."
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Chọn câu chính xác bạn vừa nhận diện:
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm pt-1">
                <label className="cursor-pointer flex items-center gap-2.5 p-3 rounded-lg bg-surface-container-lowest hover:bg-surface-container transition-all">
                  <input
                    className="text-primary-container focus:ring-primary-container w-4 h-4"
                    name="contextSentence"
                    type="radio"
                    defaultValue="1"
                  />
                  <span className="font-title-sm text-title-sm text-on-surface font-semibold">A. 我是老师。</span>
                </label>
                <label className="cursor-pointer flex items-center gap-2.5 p-3 rounded-lg bg-surface-container-lowest hover:bg-surface-container transition-all">
                  <input
                    defaultChecked
                    className="text-primary-container focus:ring-primary-container w-4 h-4"
                    name="contextSentence"
                    type="radio"
                    defaultValue="2"
                  />
                  <span className="font-title-sm text-title-sm text-on-surface font-semibold">B. 我是学生。</span>
                </label>
                <label className="cursor-pointer flex items-center gap-2.5 p-3 rounded-lg bg-surface-container-lowest hover:bg-surface-container transition-all">
                  <input
                    className="text-primary-container focus:ring-primary-container w-4 h-4"
                    name="contextSentence"
                    type="radio"
                    defaultValue="3"
                  />
                  <span className="font-title-sm text-title-sm text-on-surface font-semibold">C. 我是中国人。</span>
                </label>
              </div>
            </section>
            <footer className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col sm:flex-row items-center justify-between gap-space-md">
              <div className="flex items-center gap-space-sm text-on-surface-variant font-label-md text-label-md">
                <span className="material-symbols-outlined text-[18px]">keyboard</span>
                <span>Phím tắt:</span>
                <kbd className="px-2 py-0.5 rounded bg-surface-container font-mono text-[11px] font-bold text-on-surface">
                  A
                </kbd>
                <kbd className="px-2 py-0.5 rounded bg-surface-container font-mono text-[11px] font-bold text-on-surface">
                  B
                </kbd>
                <kbd className="px-2 py-0.5 rounded bg-surface-container font-mono text-[11px] font-bold text-on-surface">
                  C
                </kbd>
                <kbd className="px-2 py-0.5 rounded bg-surface-container font-mono text-[11px] font-bold text-on-surface">
                  D
                </kbd>
                <span className="mx-1">•</span>
                <kbd className="px-2 py-0.5 rounded bg-surface-container font-mono text-[11px] font-bold text-on-surface">
                  Space
                </kbd>
                <span>Nghe</span>
              </div>
              <div className="flex items-center gap-space-sm w-full sm:w-auto justify-end">
                <button
                  className="px-space-md py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container font-title-sm text-title-sm transition-all"
                  id="skipBtn"
                  type="button"
                  onClick={goNext}
                >
                  {' '}
                  Bỏ qua{' '}
                </button>
                <button
                  className="inline-flex items-center gap-2 px-space-xl py-2.5 rounded-lg bg-primary-container text-on-primary font-title-sm text-title-sm hover:opacity-95 shadow-md active:scale-95 transition-all"
                  id="submitBtn"
                  type="button"
                  onClick={goNext}
                >
                  <span>Xác nhận &amp; Tiếp tục</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </footer>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-space-lg">
            <div className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-tertiary-fixed flex items-center justify-center text-tertiary">
                  <span className="material-symbols-outlined text-[20px]">psychology</span>
                </div>
                <div className="flex flex-col">
                  <h2 className="font-title-sm text-title-sm font-bold text-on-surface">Bẫy Âm Thanh Thường Gặp</h2>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Phân tích âm học đối chiếu
                  </span>
                </div>
              </div>
              <div className="bg-surface-container-low rounded-lg p-3 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-label-md font-bold text-primary-container">
                    1. Bật hơi vs. Không bật hơi
                  </span>
                  <span className="font-label-sm text-label-sm text-secondary font-semibold">Tỉ lệ nhầm: 34%</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  {' '}
                  Cặp âm <span className="font-bold text-on-surface">x / sh</span> và{' '}
                  <span className="font-bold text-on-surface">j / q</span> thường gây nhiễu. Trong từ{' '}
                  <span className="font-bold text-primary-container">xuéshēng</span>, phụ âm đầu "x" là âm mặt lưỡi,
                  luồng hơi thoát ra êm mượt, không bật mạnh như "q".{' '}
                </p>
              </div>
              <div className="bg-surface-container-low rounded-lg p-3 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-label-md font-bold text-tertiary">
                    2. Thanh nhẹ (Neutral Tone)
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Quy tắc thanh điệu</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  {' '}
                  Âm tiết <span className="font-bold text-on-surface">sheng</span> trong khẩu ngữ thường đọc ngắn và nhẹ
                  thành thanh nhẹ (neutral tone), không nhấn mạnh như thanh 1 chuẩn.{' '}
                </p>
              </div>
              <div className="pt-1 border-t border-surface-container flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                <span>Gợi ý: Lắng nghe luồng hơi ở vòm họng</span>
                <span className="material-symbols-outlined text-[16px] text-tertiary">lightbulb</span>
              </div>
            </div>
            <div className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-secondary-fixed flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-[20px]">graphic_eq</span>
                  </div>
                  <h2 className="font-title-sm text-title-sm font-bold text-on-surface">Nhạy Bén Thính Giác</h2>
                </div>
                <span className="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-bold">
                  HSK 2-3
                </span>
              </div>
              <div className="flex items-center gap-space-md bg-surface-container-low rounded-lg p-space-md">
                <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center">
                  <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-surface-container-highest"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                    />
                    <path
                      className="text-secondary"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeDasharray="78, 100"
                      strokeLinecap="round"
                      strokeWidth="3.5"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="font-title-sm text-title-sm font-bold text-on-surface leading-none">78%</span>
                    <span className="font-label-sm text-[9px] text-on-surface-variant uppercase mt-0.5 font-bold">
                      Chuẩn xác
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="font-title-sm text-title-sm font-bold text-secondary truncate">
                    Phản xạ âm học Tốt
                  </span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                    {' '}
                    Thời gian phản hồi trung bình: <strong className="text-on-surface">1.4s</strong>. Bạn nhận diện
                    chính xác 18/23 âm tiết khó.{' '}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 font-label-md text-label-md">
                <div className="flex items-center justify-between text-on-surface-variant">
                  <span>Phân biệt thanh điệu (Tones):</span>
                  <span className="font-bold text-on-surface">92%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-surface-container overflow-hidden">
                  <div className="h-full bg-secondary" style={{ width: '92%' }}></div>
                </div>
                <div className="flex items-center justify-between text-on-surface-variant mt-1">
                  <span>Âm đầu uốn lưỡi (zh, ch, sh):</span>
                  <span className="font-bold text-on-surface">65%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-surface-container overflow-hidden">
                  <div className="h-full bg-tertiary" style={{ width: '65%' }}></div>
                </div>
              </div>
            </div>
            <div className="w-full bg-surface-container-high/40 rounded-xl p-space-md flex items-start gap-space-sm">
              <span className="material-symbols-outlined text-primary-container text-[24px]">menu_book</span>
              <div className="flex flex-col">
                <h3 className="font-title-sm text-title-sm font-bold text-on-surface">Bí Quyết Học Giả</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  {' '}
                  "Muốn nhớ chữ sâu, trước hết phải nghe rõ âm. Khi tai không còn nhầm lẫn giữa <em>xué</em> và{' '}
                  <em>shuō</em>, tay viết Hán tự tự khắc chuẩn xác."{' '}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
