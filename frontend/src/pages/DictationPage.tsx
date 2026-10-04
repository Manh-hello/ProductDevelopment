import AppShell from '../layouts/AppShell';
import usePracticeNext from '../lib/usePracticeFlow';

export default function DictationPage() {
  const goNext = usePracticeNext();

  return (
    <AppShell>
      <div className="flex flex-col w-full">
        <section className="flex flex-col gap-space-sm pb-space-lg">
          <div className="flex flex-wrap items-center justify-between gap-space-md">
            <div className="flex flex-wrap items-center gap-space-sm">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary">
                LUYỆN TẬP ĐA CHIỀU
              </span>
              <span className="material-symbols-outlined text-[14px] text-on-surface-variant">chevron_right</span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                LUYỆN NGHE &amp; CHÉP CHÍNH TẢ
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm ml-space-xs shadow-sm">
                <span className="material-symbols-outlined text-[14px] text-secondary">verified</span>
                <span>CCTV-1 Bản Xứ (Standard Audio)</span>
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm font-bold">
                {' '}
                HSK 1 - 2 Cốt Lõi{' '}
              </span>
            </div>
            <div className="flex items-center gap-space-sm">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-md text-label-md shadow-sm">
                <span className="material-symbols-outlined text-[16px] text-tertiary">local_fire_department</span>
                <span>5 Đúng liên tiếp</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest text-on-surface font-label-md text-label-md shadow-sm">
                <span className="material-symbols-outlined text-[16px] text-primary">timer</span>
                <span>02:15</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-md text-label-md shadow-sm">
                <span className="material-symbols-outlined text-[16px] text-secondary">graphic_eq</span>
                <span>94% Phản xạ</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-space-md pt-space-xs">
            <div className="md:col-span-3 flex items-baseline gap-2">
              <span className="font-headline-lg text-headline-lg text-primary font-serif">Câu 05</span>
              <span className="font-title-sm text-title-sm text-on-surface-variant font-medium">/ 10 câu phản xạ</span>
            </div>
            <div className="md:col-span-6 flex flex-col gap-1.5">
              <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden flex shadow-inner">
                <div className="h-full bg-secondary transition-all duration-500" style={{ width: '40%' }}></div>
                <div className="h-full bg-primary transition-all duration-500" style={{ width: '10%' }}></div>
                <div className="h-full bg-surface-container-high" style={{ width: '50%' }}></div>
              </div>
              <div className="flex justify-between items-center text-on-surface-variant font-label-sm text-label-sm">
                <span>Phân đoạn: Câu phức đơn giản (SVOC)</span>
                <span className="text-secondary font-bold">50% Hoàn thành</span>
              </div>
            </div>
            <div className="md:col-span-3 flex justify-end gap-1.5">
              <button
                className="h-8 px-2.5 rounded-lg bg-surface-container hover:bg-surface-container-highest text-on-surface font-label-sm text-label-sm inline-flex items-center gap-1 transition-all"
                title="Lùi lại 5 giây"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">replay_5</span>
                <span>-5s</span>
              </button>
              <button
                className="h-8 px-2.5 rounded-lg bg-surface-container hover:bg-surface-container-highest text-on-surface font-label-sm text-label-sm inline-flex items-center gap-1 transition-all"
                title="Phím tắt: Space"
                type="button"
              >
                <kbd className="px-1 py-0.5 rounded bg-surface-container-lowest text-[10px] font-mono shadow-xs">
                  Space
                </kbd>
                <span>Phát lại</span>
              </button>
            </div>
          </div>
        </section>
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-gutter items-start">
          <div className="xl:col-span-8 flex flex-col gap-space-lg">
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md relative overflow-hidden">
              <div className="absolute -right-6 -bottom-10 text-[180px] font-headline-xl text-surface-container pointer-events-none select-none opacity-40 leading-none">
                {' '}
                听{' '}
              </div>
              <div className="flex flex-wrap items-center justify-between border-b border-surface-container pb-space-sm gap-space-sm">
                <div className="inline-flex p-1 rounded-lg bg-surface-container gap-1">
                  <button
                    className="px-3 py-1.5 rounded-md bg-surface-container-lowest text-primary font-title-sm text-title-sm font-bold shadow-xs"
                    type="button"
                  >
                    {' '}
                    Nghe Chép Chính Tả (Dictation){' '}
                  </button>
                  <button
                    className="px-3 py-1.5 rounded-md text-on-surface-variant hover:text-on-surface font-title-sm text-title-sm transition-colors"
                    type="button"
                  >
                    {' '}
                    Nghe Chọn Hán Tự (Multi-choice){' '}
                  </button>
                  <button
                    className="px-3 py-1.5 rounded-md text-on-surface-variant hover:text-on-surface font-title-sm text-title-sm transition-colors"
                    type="button"
                  >
                    {' '}
                    Điền Pinyin &amp; Thanh Điệu{' '}
                  </button>
                </div>
                <div className="inline-flex items-center gap-2">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Tốc độ:</span>
                  <span className="inline-flex rounded-lg bg-surface-container p-0.5 text-label-sm font-bold font-label-sm">
                    <button className="px-2 py-1 rounded text-on-surface-variant hover:text-on-surface">0.75x</button>
                    <button className="px-2.5 py-1 rounded bg-surface-container-lowest text-primary shadow-xs">
                      1.0x
                    </button>
                    <button className="px-2 py-1 rounded text-on-surface-variant hover:text-on-surface">1.25x</button>
                  </span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-space-lg pt-space-xs">
                <div className="relative flex items-center justify-center shrink-0">
                  <div className="absolute w-20 h-20 rounded-full bg-primary/10 animate-ping"></div>
                  <button
                    className="relative z-10 w-16 h-16 rounded-full bg-primary hover:bg-primary-container text-on-primary flex items-center justify-center shadow-lg transition-transform active:scale-95 group"
                    id="audioToggleBtn"
                    type="button"
                  >
                    <span
                      className="material-symbols-outlined text-[34px] group-hover:scale-105 transition-transform"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      play_arrow
                    </span>
                  </button>
                </div>
                <div className="flex-1 w-full flex flex-col gap-2">
                  <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                    <span className="font-mono text-primary font-bold">00:01.8</span>
                    <span className="flex items-center gap-1 text-tertiary">
                      <span className="material-symbols-outlined text-[14px]">graphic_eq</span>
                      <span>Phát âm chuẩn Giọng Bắc Kinh (CCTV Chuẩn)</span>
                    </span>
                    <span className="font-mono">00:04.2</span>
                  </div>
                  <div className="h-16 w-full bg-surface-container-low rounded-xl px-4 flex items-center justify-between gap-1 cursor-pointer hover:bg-surface-container transition-colors relative overflow-hidden">
                    <div className="absolute top-0 bottom-0 left-0 bg-primary/10 w-[42%] pointer-events-none"></div>
                    <div className="absolute top-0 bottom-0 left-[42%] w-0.5 bg-primary z-20 pointer-events-none"></div>
                    <span className="w-1 rounded-full h-3 bg-primary/40"></span>
                    <span className="w-1 rounded-full h-5 bg-primary"></span>
                    <span className="w-1 rounded-full h-8 bg-primary"></span>
                    <span className="w-1 rounded-full h-11 bg-primary"></span>
                    <span className="w-1 rounded-full h-7 bg-primary"></span>
                    <span className="w-1 rounded-full h-4 bg-primary/60"></span>
                    <span className="w-1 rounded-full h-9 bg-primary"></span>
                    <span className="w-1 rounded-full h-12 bg-primary"></span>
                    <span className="w-1 rounded-full h-10 bg-primary"></span>
                    <span className="w-1 rounded-full h-4 bg-primary/70"></span>
                    <span className="w-1 rounded-full h-2 bg-on-surface-variant/30"></span>
                    <span className="w-1 rounded-full h-6 bg-on-surface-variant/40"></span>
                    <span className="w-1 rounded-full h-14 bg-on-surface-variant/40"></span>
                    <span className="w-1 rounded-full h-10 bg-on-surface-variant/30"></span>
                    <span className="w-1 rounded-full h-5 bg-on-surface-variant/30"></span>
                    <span className="w-1 rounded-full h-12 bg-on-surface-variant/40"></span>
                    <span className="w-1 rounded-full h-8 bg-on-surface-variant/30"></span>
                    <span className="w-1 rounded-full h-3 bg-on-surface-variant/20"></span>
                    <span className="w-1 rounded-full h-7 bg-on-surface-variant/30"></span>
                    <span className="w-1 rounded-full h-11 bg-on-surface-variant/40"></span>
                    <span className="w-1 rounded-full h-6 bg-on-surface-variant/30"></span>
                    <span className="w-1 rounded-full h-2 bg-on-surface-variant/20"></span>
                    <span className="w-1 rounded-full h-1 bg-on-surface-variant/20"></span>
                  </div>
                  <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                    <span className="inline-flex items-center gap-1 text-secondary font-bold">
                      <span className="material-symbols-outlined text-[14px]">psychology</span>
                      <span>Gợi ý âm tiết: 11 chữ • 3 cụm ngữ nghĩa</span>
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        className="hover:text-primary transition-colors inline-flex items-center gap-1"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[14px]">slow_motion_video</span>
                        <span>Nghe chậm (0.75x)</span>
                      </button>
                      <button
                        className="hover:text-primary transition-colors inline-flex items-center gap-1"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[14px]">volume_up</span>
                        <span>Lặp lại câu [R]</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-surface-container p-space-sm flex items-center justify-between">
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-primary text-[20px]">translate</span>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                      Nghĩa tiếng Việt gợi ý:
                    </span>
                    <span className="font-body-md text-body-md font-medium text-on-surface">
                      Thầy giáo Vương đã mượn hai quyển sách ở thư viện.
                    </span>
                  </div>
                </div>
                <button
                  className="px-2.5 py-1 rounded-md bg-surface-container-lowest text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm shadow-xs flex items-center gap-1"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[14px]">visibility</span>
                  <span>Ẩn/Hiện</span>
                </button>
              </div>
            </div>
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-lg">
              <div className="flex items-center justify-between border-b border-surface-container pb-space-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="font-title-sm text-title-sm font-bold text-on-surface">
                    Khung Chép Chính Tả Theo Cụm Âm Tiết
                  </span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Nhập Pinyin có dấu hoặc dùng bộ gõ IME trực tiếp
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-secondary-fixed/30 min-w-[110px] shadow-xs">
                  <div className="flex items-center gap-1">
                    <span className="font-label-sm text-label-sm text-secondary font-bold">Wáng lǎoshī</span>
                    <span className="material-symbols-outlined text-[16px] text-secondary">check_circle</span>
                  </div>
                  <div className="font-headline-lg text-headline-lg font-serif text-on-surface font-bold"> 王老师 </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Chủ ngữ</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-secondary-fixed/30 min-w-[130px] shadow-xs">
                  <div className="flex items-center gap-1">
                    <span className="font-label-sm text-label-sm text-secondary font-bold">zài túshūguǎn</span>
                    <span className="material-symbols-outlined text-[16px] text-secondary">check_circle</span>
                  </div>
                  <div className="font-headline-lg text-headline-lg font-serif text-on-surface font-bold">
                    {' '}
                    在图书馆{' '}
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Trạng ngữ nơi chốn</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-primary-fixed min-w-[120px] shadow-md transform -translate-y-1 transition-all">
                  <div className="flex items-center gap-1">
                    <span className="font-label-sm text-label-sm text-primary font-bold">jiè le...</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                  </div>
                  <div className="relative flex items-center justify-center">
                    <input
                      autoFocus
                      className="w-24 text-center bg-surface-container-lowest rounded-lg py-1 px-2 font-headline-lg text-headline-lg font-serif text-primary font-bold focus:outline-none shadow-inner"
                      type="text"
                      defaultValue="借了"
                    />
                  </div>
                  <span className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider">
                    Đang gõ [3]
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-surface-container-low min-w-[110px] min-h-[96px] shadow-inner">
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">_ _ _ _</span>
                  <div className="font-headline-lg text-headline-lg font-serif text-on-surface-variant/40 mt-1">
                    {' '}
                    两本{' '}
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant/60">Số lượng từ</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-surface-container-low min-w-[90px] min-h-[96px] shadow-inner">
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">_ _</span>
                  <div className="font-headline-lg text-headline-lg font-serif text-on-surface-variant/40 mt-1">
                    {' '}
                    书。{' '}
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant/60">Tân ngữ</span>
                </div>
              </div>
              <div className="flex flex-col gap-space-sm bg-surface-container p-space-md rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">
                    Gợi ý từ IME thông minh (Pinyin: "jiele")
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Nhấn phím [1] - [3] để chọn nhanh
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-lowest hover:bg-primary-fixed text-left shadow-xs transition-colors group"
                    type="button"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary font-bold font-mono text-[11px] flex items-center justify-center">
                        1
                      </span>
                      <span className="font-headline-md text-headline-md font-serif text-on-surface group-hover:text-primary font-bold">
                        借了
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">jiè le (Đã mượn)</span>
                  </button>
                  <button
                    className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container-high text-left shadow-xs transition-colors"
                    type="button"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-surface-container text-on-surface-variant font-bold font-mono text-[11px] flex items-center justify-center">
                        2
                      </span>
                      <span className="font-headline-md text-headline-md font-serif text-on-surface font-bold">
                        接着
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">jiē zhe (Tiếp tục)</span>
                  </button>
                  <button
                    className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container-high text-left shadow-xs transition-colors"
                    type="button"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-surface-container text-on-surface-variant font-bold font-mono text-[11px] flex items-center justify-center">
                        3
                      </span>
                      <span className="font-headline-md text-headline-md font-serif text-on-surface font-bold">
                        介绍了
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">jiè shào le</span>
                  </button>
                </div>
                <div className="flex items-center justify-between pt-1 text-on-surface-variant font-label-sm text-label-sm">
                  <span className="text-[12px]">Bộ gõ dấu thanh mẫu:</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      className="w-8 h-7 rounded bg-surface-container-lowest hover:bg-surface-container-high font-serif font-bold text-on-surface shadow-xs"
                      type="button"
                    >
                      ā 1
                    </button>
                    <button
                      className="w-8 h-7 rounded bg-surface-container-lowest hover:bg-surface-container-high font-serif font-bold text-on-surface shadow-xs"
                      type="button"
                    >
                      á 2
                    </button>
                    <button
                      className="w-8 h-7 rounded bg-surface-container-lowest hover:bg-surface-container-high font-serif font-bold text-on-surface shadow-xs"
                      type="button"
                    >
                      ǎ 3
                    </button>
                    <button
                      className="w-8 h-7 rounded bg-surface-container-lowest hover:bg-surface-container-high font-serif font-bold text-on-surface shadow-xs"
                      type="button"
                    >
                      à 4
                    </button>
                    <button
                      className="w-8 h-7 rounded bg-surface-container-lowest hover:bg-surface-container-high font-serif font-bold text-on-surface shadow-xs"
                      type="button"
                    >
                      · nhẹ
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    Ngân hàng từ vựng đề xuất (Hoặc nhấp chọn trực tiếp):
                  </span>
                  <span className="font-label-sm text-label-sm text-secondary font-bold">Nhấn [Alt + 1..7]</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    className="h-10 px-3.5 rounded-lg bg-primary text-on-primary font-headline-md text-headline-md font-serif font-bold hover:opacity-90 shadow-sm flex items-center gap-2 transition-all"
                    type="button"
                  >
                    <span>借了</span>
                    <kbd className="text-[10px] font-sans px-1 rounded bg-on-primary/20 text-on-primary">1</kbd>
                  </button>
                  <button
                    className="h-10 px-3.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-headline-md text-headline-md font-serif font-bold shadow-xs flex items-center gap-2 transition-all"
                    type="button"
                  >
                    <span>两本</span>
                    <kbd className="text-[10px] font-sans px-1 rounded bg-surface-container-highest text-on-surface-variant">
                      2
                    </kbd>
                  </button>
                  <button
                    className="h-10 px-3.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-headline-md text-headline-md font-serif font-bold shadow-xs flex items-center gap-2 transition-all"
                    type="button"
                  >
                    <span>书</span>
                    <kbd className="text-[10px] font-sans px-1 rounded bg-surface-container-highest text-on-surface-variant">
                      3
                    </kbd>
                  </button>
                  <button
                    className="h-10 px-3.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant/80 font-headline-md text-headline-md font-serif font-medium shadow-xs flex items-center gap-2 transition-all"
                    type="button"
                  >
                    <span>买了</span>
                    <kbd className="text-[10px] font-sans px-1 rounded bg-surface-container-highest text-on-surface-variant">
                      4
                    </kbd>
                  </button>
                  <button
                    className="h-10 px-3.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant/80 font-headline-md text-headline-md font-serif font-medium shadow-xs flex items-center gap-2 transition-all"
                    type="button"
                  >
                    <span>三本</span>
                    <kbd className="text-[10px] font-sans px-1 rounded bg-surface-container-highest text-on-surface-variant">
                      5
                    </kbd>
                  </button>
                  <button
                    className="h-10 px-3.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant/80 font-headline-md text-headline-md font-serif font-medium shadow-xs flex items-center gap-2 transition-all"
                    type="button"
                  >
                    <span>看</span>
                    <kbd className="text-[10px] font-sans px-1 rounded bg-surface-container-highest text-on-surface-variant">
                      6
                    </kbd>
                  </button>
                  <button
                    className="h-10 px-3.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant/80 font-headline-md text-headline-md font-serif font-medium shadow-xs flex items-center gap-2 transition-all"
                    type="button"
                  >
                    <span>写</span>
                    <kbd className="text-[10px] font-sans px-1 rounded bg-surface-container-highest text-on-surface-variant">
                      7
                    </kbd>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="xl:col-span-4 flex flex-col gap-space-md">
            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-[20px]">hearing</span>
                  <span className="font-title-sm text-title-sm font-bold text-on-surface">
                    Chẩn Đoán Biến Điệu &amp; Trọng Âm
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
                  {' '}
                  Phân tích AI{' '}
                </span>
              </div>
              <div className="flex flex-col gap-2.5 pt-1">
                <div className="p-3 rounded-lg bg-surface-container flex flex-col gap-1">
                  <div className="flex items-center justify-between font-label-md text-label-md font-bold text-on-surface">
                    <span className="text-tertiary">Quy tắc biến điệu "两" (liǎng)</span>
                    <span className="font-mono text-label-sm">Thanh 3 + Thanh 3</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    {' '}
                    Khi đi với lượng từ <strong className="text-on-surface font-serif">本 (běn)</strong>, chữ{' '}
                    <span className="text-primary font-bold">两</span> biến âm thành nửa thanh ba (half-third tone), cao
                    độ không vút lên mà chuyển trọng âm tự nhiên sang danh từ tiếp theo.{' '}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-surface-container flex flex-col gap-1">
                  <div className="flex items-center justify-between font-label-md text-label-md font-bold text-on-surface">
                    <span className="text-secondary">Trợ từ động thái "了" (le)</span>
                    <span className="font-mono text-label-sm">Khinh thanh (0.15s)</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    {' '}
                    Đọc cực ngắn và nhẹ ngay sau động từ{' '}
                    <span className="font-serif font-bold text-on-surface">借 (jiè)</span>. Học viên thường dễ bỏ quên
                    âm này khi nghe ở tốc độ người bản xứ 1.0x.{' '}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-surface-container flex flex-col gap-1">
                  <div className="flex items-center justify-between font-label-md text-label-md font-bold text-on-surface">
                    <span className="text-primary">Cặp âm dễ nhầm lẫn</span>
                    <span className="font-mono text-label-sm">j / q &amp; zh / z</span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-on-surface text-title-sm">借 (jiè)</span>
                      <span className="text-on-surface-variant font-label-sm">vs</span>
                      <span className="font-serif font-medium text-on-surface-variant text-title-sm">切 (qiè)</span>
                    </div>
                    <span className="font-label-sm text-label-sm text-secondary bg-surface-container-lowest px-2 py-0.5 rounded">
                      Không bật hơi
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[20px]">cognition</span>
                  <span className="font-title-sm text-title-sm font-bold text-on-surface">
                    Bắt Âm &amp; Trí Nhớ Vỏ Não
                  </span>
                </div>
                <span className="font-mono font-bold text-secondary font-label-sm text-label-sm">SRS Stage IV</span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="p-3 rounded-lg bg-surface-container-low flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Tốc độ bắt âm</span>
                  <span className="font-headline-lg text-headline-lg font-bold text-secondary font-mono mt-1">
                    1.4s
                  </span>
                  <span className="font-label-sm text-label-sm text-secondary">Rất nhanh • Chuẩn</span>
                </div>
                <div className="p-3 rounded-lg bg-surface-container-low flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Độ trễ nhận diện</span>
                  <span className="font-headline-lg text-headline-lg font-bold text-on-surface font-mono mt-1">
                    -0.3s
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Cải thiện so với hôm qua</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-primary-fixed/40 flex flex-col gap-1.5 mt-1">
                <div className="flex items-center justify-between text-on-primary-fixed">
                  <span className="font-title-sm text-title-sm font-bold">Lịch giãn cách SRS đề xuất</span>
                  <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface leading-snug">
                  {' '}
                  Cụm Hán tự <strong className="font-serif font-bold text-primary">借</strong> (Tá - Mượn) và{' '}
                  <strong className="font-serif font-bold text-primary">馆</strong> (Quán) sẽ được đưa vào chu kỳ lặp
                  lại sau:{' '}
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <span className="px-2.5 py-1 rounded-full bg-primary-container text-on-primary font-label-md text-label-md font-bold">
                    {' '}
                    +4 Ngày (Guru){' '}
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Thứ 6, 24 Tháng 10</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-space-xs">
              <button
                className="flex-1 py-3 px-4 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-title-sm text-title-sm font-medium transition-all text-center flex items-center justify-center gap-1.5 shadow-xs"
                type="button"
                onClick={goNext}
              >
                <span className="material-symbols-outlined text-[18px]">skip_next</span>
                <span>Bỏ qua [Esc]</span>
              </button>
              <button
                className="flex-[2] py-3 px-4 rounded-lg bg-primary-container hover:opacity-95 text-on-primary font-title-sm text-title-sm font-bold transition-all text-center flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(190,18,60,0.25)] active:scale-[0.99]"
                type="button"
                onClick={goNext}
              >
                <span className="material-symbols-outlined text-[20px]">check</span>
                <span>Kiểm Tra [Enter]</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
