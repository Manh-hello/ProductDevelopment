import AppShell from '../layouts/AppShell';
import usePracticeNext from '../lib/usePracticeFlow';

export default function SpeakingPage() {
  const goNext = usePracticeNext();

  return (
    <AppShell>
      <div className="flex flex-col w-full gap-space-lg max-w-7xl mx-auto pb-space-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-md p-space-md rounded-2xl bg-surface-container-low shadow-sm">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm uppercase tracking-widest">
              <span>Phản Xạ Khẩu Ngữ &amp; Ngữ Âm Bản Xứ</span>
              <span className="text-outline">/</span>
              <span className="text-primary font-bold">AI Pronunciation &amp; Tone Scorer</span>
            </div>
            <div className="flex flex-wrap items-center gap-space-sm pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-highest text-on-surface font-label-md text-label-md">
                <span className="material-symbols-outlined text-[16px] text-secondary">verified</span> HSK 1 - 2 Khẩu
                Ngữ Thực Chiến{' '}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-md text-label-md">
                <span className="material-symbols-outlined text-[16px] text-primary">psychology</span> Mô Hình Âm Vị Học
                AI &amp; Deep Learning{' '}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-space-md w-full lg:w-auto justify-between lg:justify-end">
            <div className="flex items-center gap-space-sm bg-surface-container-lowest px-space-md py-2 rounded-xl shadow-sm">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant">Tiến độ bài học</span>
                <span className="font-title-sm text-title-sm font-bold text-on-surface">
                  Câu 06 <span className="text-on-surface-variant font-normal">/ 10</span>
                </span>
              </div>
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center">
                <svg className="w-7 h-7 -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-surface-container-highest"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                  />
                  <path
                    className="text-primary"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="60, 100"
                    strokeLinecap="round"
                    strokeWidth="3.5"
                  />
                </svg>
              </div>
            </div>
            <div className="flex items-center gap-space-sm bg-surface-container-lowest px-space-md py-2 rounded-xl shadow-sm">
              <div className="flex flex-col text-right">
                <span className="font-label-sm text-label-sm text-on-surface-variant">TB Phiên học</span>
                <span className="font-title-sm text-title-sm font-bold text-secondary">
                  92<span className="text-body-sm font-normal">/100</span>
                </span>
              </div>
              <span className="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">
                Cực tốt
              </span>
            </div>
            <div className="h-11 px-3.5 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center gap-2 font-label-md text-label-md shadow-sm">
              <span
                className="material-symbols-outlined text-[20px] text-tertiary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                local_fire_department
              </span>
              <span className="font-bold">12 Ngày</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          <div className="lg:col-span-7 flex flex-col gap-space-lg">
            <div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-space-lg shadow-sm">
              <div className="absolute -right-6 -bottom-8 pointer-events-none select-none font-display-character text-[140px] text-surface-container-high/40 leading-none opacity-60">
                {' '}
                声{' '}
              </div>
              <div className="flex items-center justify-between mb-space-md">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
                  <span className="font-label-sm text-label-sm uppercase font-bold text-on-surface-variant tracking-wider">
                    Mẫu Khẩu Ngữ Trọng Tâm
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[16px]">record_voice_over</span> CCTV-1 Standard
                  Accent (Bắc Kinh){' '}
                </div>
              </div>
              <div className="flex flex-col items-center justify-center text-center py-space-md px-2">
                <div className="flex items-baseline gap-4 text-primary font-headline-md text-headline-md tracking-wide">
                  <div className="flex flex-col items-center">
                    <span className="text-body-sm font-semibold opacity-70 tracking-normal">↗ 35</span>
                    <span>Wáng</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-body-sm font-semibold opacity-70 tracking-normal">ᵥ 214</span>
                    <span>lǎoshī,</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-body-sm font-semibold opacity-70 tracking-normal">ᵥ 214</span>
                    <span>zǎoshang</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-body-sm font-semibold opacity-70 tracking-normal">ᵥ 214</span>
                    <span>hǎo!</span>
                  </div>
                </div>
                <div className="font-display-character text-display-character text-on-surface tracking-wider my- space-xs select-text">
                  {' '}
                  王老师，早上好！{' '}
                </div>
                <div className="font-headline-md text-title-sm text-on-surface-variant font-medium mt-1">
                  {' '}
                  “Thầy Vương, chào buổi sáng!”{' '}
                </div>
              </div>
              <div className="mt-space-md pt-space-md bg-surface-container-low rounded-xl p-space-md flex flex-col sm:flex-row items-center justify-between gap-space-sm">
                <div className="flex items-center gap-space-sm w-full sm:w-auto">
                  <button
                    className="w-10 h-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-md hover:opacity-95 transition-all"
                    id="play-native-btn"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[22px]">volume_up</span>
                  </button>
                  <div className="flex flex-col">
                    <span className="font-title-sm text-body-sm font-bold text-on-surface">Giọng Đọc Mẫu Bản Xứ</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Nữ phát thanh viên • Tốc độ chuẩn
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-space-md w-full sm:w-auto justify-end">
                  <div className="flex items-end gap-1 h-6 px-2">
                    <span className="w-1 bg-secondary rounded-full h-3 animate-pulse"></span>
                    <span className="w-1 bg-secondary rounded-full h-5"></span>
                    <span className="w-1 bg-secondary rounded-full h-2 animate-pulse"></span>
                    <span className="w-1 bg-secondary rounded-full h-6"></span>
                    <span className="w-1 bg-secondary rounded-full h-4"></span>
                    <span className="w-1 bg-secondary rounded-full h-2"></span>
                  </div>
                  <div className="flex rounded-lg bg-surface-container-highest p-0.5">
                    <button
                      className="px-2.5 py-1 rounded-md bg-surface-container-lowest text-on-surface font-label-sm text-label-sm font-bold shadow-sm"
                      type="button"
                    >
                      1.0x
                    </button>
                    <button
                      className="px-2.5 py-1 rounded-md text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm"
                      type="button"
                    >
                      0.8x Chậm
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[22px]">graphic_eq</span>
                  <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
                    Đối Sánh Âm Thanh Phổ Ký (Acoustic Matching)
                  </h3>
                </div>
                <span className="font-label-sm text-label-sm px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-semibold">
                  Khớp 94.2%
                </span>
              </div>
              <div className="rounded-xl bg-surface-container-high p-space-md relative overflow-hidden flex flex-col gap-space-md">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                    <div className="flex items-center gap-1.5 font-bold text-secondary">
                      <span className="w-2 h-2 rounded-full bg-secondary"></span>
                      <span>Luồng 1: Giọng Phát Âm Mẫu Bản Xứ (CCTV Native Reference)</span>
                    </div>
                    <span>240 Hz - Chuẩn Ngữ Điệu</span>
                  </div>
                  <div className="h-16 w-full rounded-lg bg-surface-container-lowest/80 p-2 flex items-center">
                    <svg className="w-full h-full text-secondary" preserveAspectRatio="none" viewBox="0 0 500 60">
                      <line
                        stroke="currentColor"
                        strokeDasharray="4 4"
                        strokeOpacity="0.1"
                        x1="0"
                        x2="500"
                        y1="30"
                        y2="30"
                      ></line>
                      <line stroke="currentColor" strokeOpacity="0.06" x1="0" x2="500" y1="15" y2="15"></line>
                      <line stroke="currentColor" strokeOpacity="0.06" x1="0" x2="500" y1="45" y2="45"></line>
                      <path
                        d="M0,32 Q35,28 65,14 T130,22 Q170,48 210,40 T270,16 Q315,44 350,38 T420,20 Q460,42 500,28"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      />
                      <path
                        d="M0,32 Q35,28 65,14 T130,22 Q170,48 210,40 T270,16 Q315,44 350,38 T420,20 Q460,42 500,28 L500,60 L0,60 Z"
                        fill="currentColor"
                        fillOpacity="0.08"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                    <div className="flex items-center gap-1.5 font-bold text-primary">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      <span>Luồng 2: Giọng Nói Bạn Vừa Thu Âm (Minh Quân)</span>
                    </div>
                    <span className="text-primary font-bold">Điểm Trùng Khớp: 94/100</span>
                  </div>
                  <div className="h-16 w-full rounded-lg bg-surface-container-lowest/80 p-2 flex items-center relative">
                    <svg className="w-full h-full text-primary" preserveAspectRatio="none" viewBox="0 0 500 60">
                      <path
                        d="M0,34 Q35,30 65,15 T130,24 Q170,46 210,44 T270,22 Q315,42 350,37 T420,21 Q460,40 500,29"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      />
                      <path
                        d="M0,34 Q35,30 65,15 T130,24 Q170,46 210,44 T270,22 Q315,42 350,37 T420,21 Q460,40 500,29 L500,60 L0,60 Z"
                        fill="currentColor"
                        fillOpacity="0.1"
                      />
                    </svg>
                    <div className="absolute inset-0 flex justify-between px-6 pointer-events-none items-end pb-1 font-label-sm text-[10px] text-on-surface-variant font-mono">
                      <span>Wáng</span>
                      <span>lǎo</span>
                      <span className="text-tertiary font-bold">shī (uốn lưỡi)</span>
                      <span>zǎo</span>
                      <span>shang</span>
                      <span>hǎo</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center pt-space-sm pb-space-xs">
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-24 h-24 rounded-full bg-primary/10 animate-ping pointer-events-none"></div>
                  <div className="absolute w-20 h-20 rounded-full bg-primary/20 pointer-events-none"></div>
                  <button
                    className="relative z-10 w-16 h-16 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all"
                    id="mic-trigger-btn"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[32px]">mic</span>
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-3 font-title-sm text-body-sm font-bold text-on-surface">
                  <span>Bấm vào Micro hoặc giữ</span>
                  <kbd className="px-2 py-0.5 rounded bg-surface-container font-mono text-label-sm shadow-sm text-primary font-bold">
                    Phím Space
                  </kbd>
                  <span>để ghi âm lại</span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                  Tự động nhận diện dừng sau 2.4s ngắt hơi
                </span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-space-lg">
            <div className="rounded-2xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider">
                    Hệ Thống Đánh Giá Âm Vị
                  </span>
                  <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
                    Chẩn Đoán Khẩu Ngữ 4 Chiều
                  </h3>
                </div>
                <span className="material-symbols-outlined text-secondary text-[28px]">verified</span>
              </div>
              <div className="flex items-center gap-space-md p-space-md rounded-xl bg-surface-container-low">
                <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-surface-container-highest"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    />
                    <path
                      className="text-secondary"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeDasharray="94, 100"
                      strokeLinecap="round"
                      strokeWidth="3"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-headline-lg text-headline-lg font-bold text-on-surface leading-none">94</span>
                    <span className="font-label-sm text-[10px] text-on-surface-variant font-bold">/ 100</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-title-sm text-title-sm font-bold text-secondary flex items-center gap-1">
                    {' '}
                    Xuất Sắc! Khẩu Âm Tự Nhiên{' '}
                  </span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    {' '}
                    Độ chuẩn thanh điệu tương đương 96% người bản xứ vùng Hà Bắc - Bắc Kinh. Âm sắc đầy đặn, không có
                    tạp âm phụ âm.{' '}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                <div className="p-space-sm rounded-xl bg-surface-container flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="font-title-sm text-body-sm font-bold text-on-surface">Thanh Điệu (Tones)</span>
                    <span className="font-label-md text-label-md font-bold text-secondary">96%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
                    <div className="h-full bg-secondary rounded-full" style={{ width: '96%' }}></div>
                  </div>
                  <span className="font-body-sm text-[11px] text-on-surface-variant leading-tight mt-1">
                    {' '}
                    Thanh 2 "Wáng" lên dốc mượt mà; Thanh 3 "lǎo" hạ sâu đúng 214; Thanh nhẹ dứt khoát.{' '}
                  </span>
                </div>
                <div className="p-space-sm rounded-xl bg-surface-container flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="font-title-sm text-body-sm font-bold text-on-surface">
                      Âm Uốn Lưỡi (Retroflex)
                    </span>
                    <span className="font-label-md text-label-md font-bold text-tertiary">92%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
                    <div className="h-full bg-tertiary rounded-full" style={{ width: '92%' }}></div>
                  </div>
                  <span className="font-body-sm text-[11px] text-on-surface-variant leading-tight mt-1">
                    {' '}
                    Đầu lưỡi cong chuẩn sát vòm họng cứng "shī", không bị bè thành âm "s".{' '}
                  </span>
                </div>
                <div className="p-space-sm rounded-xl bg-surface-container flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="font-title-sm text-body-sm font-bold text-on-surface">Vận Mẫu (Vowels)</span>
                    <span className="font-label-md text-label-md font-bold text-secondary">95%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
                    <div className="h-full bg-secondary rounded-full" style={{ width: '95%' }}></div>
                  </div>
                  <span className="font-body-sm text-[11px] text-on-surface-variant leading-tight mt-1">
                    {' '}
                    Các vận mẫu "ang", "ao" tròn vành rõ chữ, cộng hưởng khoang miệng tốt.{' '}
                  </span>
                </div>
                <div className="p-space-sm rounded-xl bg-surface-container flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="font-title-sm text-body-sm font-bold text-on-surface">
                      Lưu Loát &amp; Nhịp Điệu
                    </span>
                    <span className="font-label-md text-label-md font-bold text-secondary">93%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
                    <div className="h-full bg-secondary rounded-full" style={{ width: '93%' }}></div>
                  </div>
                  <span className="font-body-sm text-[11px] text-on-surface-variant leading-tight mt-1">
                    {' '}
                    Khoảng ngắt giữa xưng hô và lời chào chuẩn 0.3s, tự nhiên không ngập ngừng.{' '}
                  </span>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col gap-space-sm">
              <div className="flex items-center justify-between">
                <h4 className="font-title-sm text-title-sm font-bold text-on-surface">
                  Phân Tích Chi Tiết Từng Âm Tiết
                </h4>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Nhấp vào từ để nghe lại</span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                <div className="p-2.5 rounded-xl bg-surface-container-low flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-0.5 cursor-pointer">
                  <span className="font-headline-md text-headline-md font-bold text-on-surface font-headline-xl">
                    王
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Wáng</span>
                  <span className="mt-1 px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-[11px] font-bold">
                    98
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-surface-container-low flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-0.5 cursor-pointer">
                  <span className="font-headline-md text-headline-md font-bold text-on-surface font-headline-xl">
                    老
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">lǎo</span>
                  <span className="mt-1 px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-[11px] font-bold">
                    95
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-tertiary-fixed/40 flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-0.5 cursor-pointer">
                  <span className="font-headline-md text-headline-md font-bold text-on-surface font-headline-xl">
                    师
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">shī</span>
                  <span className="mt-1 px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-[11px] font-bold">
                    89
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-surface-container-low flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-0.5 cursor-pointer">
                  <span className="font-headline-md text-headline-md font-bold text-on-surface font-headline-xl">
                    早
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">zǎo</span>
                  <span className="mt-1 px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-[11px] font-bold">
                    96
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-surface-container-low flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-0.5 cursor-pointer">
                  <span className="font-headline-md text-headline-md font-bold text-on-surface font-headline-xl">
                    上
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">shang</span>
                  <span className="mt-1 px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-[11px] font-bold">
                    94
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-surface-container-low flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-0.5 cursor-pointer">
                  <span className="font-headline-md text-headline-md font-bold text-on-surface font-headline-xl">
                    好
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">hǎo</span>
                  <span className="mt-1 px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-[11px] font-bold">
                    97
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-space-sm rounded-xl bg-surface-container-high text-on-surface">
                <span className="material-symbols-outlined text-tertiary text-[20px] mt-0.5">tips_and_updates</span>
                <div className="flex flex-col">
                  <span className="font-title-sm text-body-sm font-bold">Lời khuyên ngữ âm cho "师 (shī)":</span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    {' '}
                    Hãy cuộn lưỡi sâu hơn khoảng 10% về phía vòm họng ngạc cứng. Luồng hơi ma sát cần ấm và dày hơn để
                    tránh nhầm sang âm mặt lưỡi "sī".{' '}
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center gap-space-sm p-space-sm rounded-xl bg-primary-fixed/40">
                <div className="w-10 h-10 rounded-lg bg-primary text-on-primary flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[24px]">workspace_premium</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm uppercase font-bold text-primary tracking-wider">
                    SRS Retention Level-Up
                  </span>
                  <span className="font-body-sm text-body-sm font-bold text-on-surface">
                    {' '}
                    Kỹ năng Khẩu khí bản xứ của chữ <span className="text-primary font-headline-xl">
                      老师
                    </span> &amp; <span className="text-primary font-headline-xl">王</span> đã thăng hạng Master!{' '}
                  </span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch gap-space-sm pt-space-xs">
                <button
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-surface-container text-on-surface font-title-sm text-body-md font-bold hover:bg-surface-container-highest transition-all shadow-sm"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">replay</span>
                  <span>Thu Âm Lại</span>
                  <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-surface-container-lowest text-[10px] font-mono text-on-surface-variant">
                    Space
                  </kbd>
                </button>
                <button
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-surface-container text-on-surface font-title-sm text-body-md font-bold hover:bg-surface-container-highest transition-all shadow-sm"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">play_circle</span>
                  <span>Bản Thu Của Bạn</span>
                </button>
              </div>
              <button
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-on-primary font-title-sm text-title-sm font-bold hover:opacity-95 shadow-[0_4px_12px_rgba(149,0,42,0.25)] hover:scale-[1.01] active:scale-[0.99] transition-all"
                type="button"
                onClick={goNext}
              >
                <span>Tiếp Tục Câu Kế Tiếp (Câu 07)</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                <kbd className="px-2 py-0.5 rounded bg-on-primary/20 text-[10px] font-mono text-on-primary ml-1">
                  Enter
                </kbd>
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
