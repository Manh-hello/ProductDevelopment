import { useNavigate } from 'react-router-dom';
import AppShell from '../layouts/AppShell';
import usePracticeNext from '../lib/usePracticeFlow';
import { useState } from 'react';

export default function PinyinPracticePage() {
  const navigate = useNavigate();
  const goNext = usePracticeNext();
  const [sel, setSel] = useState(0);

  return (
    <AppShell>
      <div className="flex flex-col w-full max-w-5xl mx-auto gap-space-lg pb-space-xl">
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm">
          <div className="flex flex-wrap items-center justify-between gap-space-sm">
            <div className="flex items-center gap-space-md">
              <span className="font-label-sm text-label-sm text-primary-container uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary-fixed font-bold">
                {' '}
                Chuyên đề: Pinyin &amp; Thanh Điệu Hán Ngữ{' '}
              </span>
              <div className="flex items-center gap-1.5 text-on-surface-variant font-label-md text-label-md">
                <span className="material-symbols-outlined text-[18px]">timelapse</span>
                <span>
                  Tiến độ: <strong className="text-on-surface font-title-sm">Câu 5 / 10</strong>
                </span>
              </div>
            </div>
            <div className="flex items-center gap-space-sm">
              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-md text-label-md">
                <span className="material-symbols-outlined text-[16px] text-tertiary">stars</span>
                <span>+10 XP Thưởng</span>
              </div>
              <button
                className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant flex items-center justify-center transition-all"
                title="Tạm dừng"
                type="button"
                onClick={() => navigate('/practice')}
              >
                <span className="material-symbols-outlined text-[18px]">pause</span>
              </button>
            </div>
          </div>
          <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden flex">
            <div className="h-full bg-secondary transition-all duration-500" style={{ width: '50%' }}></div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          <div className="lg:col-span-5 flex flex-col gap-space-md">
            <div className="relative bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col items-center justify-center text-center overflow-hidden">
              <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                <span>HSK 1</span>
                <span className="text-outline-variant">•</span>
                <span>Đại từ</span>
              </div>
              <div className="absolute top-4 right-4">
                <button
                  className="w-10 h-10 rounded-full bg-primary-fixed hover:bg-primary-container text-primary-container hover:text-on-primary flex items-center justify-center shadow-sm transition-all"
                  id="audio-btn"
                  title="Phát âm chuẩn (TTS)"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    volume_up
                  </span>
                </button>
              </div>
              <div className="py-space-md flex flex-col items-center">
                <span className="font-display-character text-display-character text-primary-container leading-none select-none tracking-tight">
                  我
                </span>
                <div className="mt-space-sm flex items-center gap-space-sm">
                  <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-label-sm text-label-sm font-bold">
                    Hán-Việt: NGÃ
                  </span>
                  <span className="text-on-surface-variant font-body-sm text-body-sm">Bộ: 戈 (Qua - Vũ khí)</span>
                </div>
                <p className="mt-space-xs font-headline-md text-headline-md text-on-surface italic font-serif">
                  {' '}
                  "Tôi, ta, bản thân mình"{' '}
                </p>
              </div>
              <div className="w-full bg-surface-container-low rounded-xl p-space-sm flex items-center justify-between text-left">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded bg-primary-container/10 text-primary-container flex items-center justify-center font-bold font-serif text-sm">
                    印
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Thứ tự nét viết (7 nét)</span>
                    <span className="font-body-sm text-body-sm font-bold text-on-surface">ノ 一 丨 提 ㇂ 丿 丶</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-secondary text-[20px]">check_circle</span>
              </div>
            </div>
            <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col gap-space-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-tertiary-container text-[18px]">graphic_eq</span>
                  <span className="font-title-sm text-title-sm text-on-surface">
                    Cao độ Thanh 3 (214: Thượng Thanh)
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">
                  Chuẩn Bắc Kinh
                </span>
              </div>
              <div className="relative w-full h-36 bg-surface-container-low rounded-xl p-space-sm flex items-center justify-center">
                <svg className="w-full h-full" fill="none" viewBox="0 0 340 120">
                  <line
                    className="text-surface-container-highest"
                    stroke="currentColor"
                    strokeDasharray="3 3"
                    strokeWidth="1"
                    x1="40"
                    x2="320"
                    y1="15"
                    y2="15"
                  ></line>
                  <line
                    className="text-surface-container-highest"
                    stroke="currentColor"
                    strokeDasharray="3 3"
                    strokeWidth="1"
                    x1="40"
                    x2="320"
                    y1="38"
                    y2="38"
                  ></line>
                  <line
                    className="text-surface-container-highest"
                    stroke="currentColor"
                    strokeDasharray="3 3"
                    strokeWidth="1"
                    x1="40"
                    x2="320"
                    y1="61"
                    y2="61"
                  ></line>
                  <line
                    className="text-surface-container-highest"
                    stroke="currentColor"
                    strokeDasharray="3 3"
                    strokeWidth="1"
                    x1="40"
                    x2="320"
                    y1="84"
                    y2="84"
                  ></line>
                  <line
                    className="text-surface-container-highest"
                    stroke="currentColor"
                    strokeDasharray="3 3"
                    strokeWidth="1"
                    x1="40"
                    x2="320"
                    y1="107"
                    y2="107"
                  ></line>
                  <text className="font-label-sm text-[10px] fill-on-surface-variant font-sans" x="18" y="19">
                    5 (Cao)
                  </text>
                  <text className="font-label-sm text-[10px] fill-on-surface-variant font-sans" x="18" y="42">
                    4
                  </text>
                  <text className="font-label-sm text-[10px] fill-on-surface-variant font-sans" x="18" y="65">
                    3 (Trung)
                  </text>
                  <text className="font-label-sm text-[10px] fill-on-surface-variant font-sans" x="18" y="88">
                    2
                  </text>
                  <text className="font-label-sm text-[10px] fill-on-surface-variant font-sans" x="18" y="111">
                    1 (Thấp)
                  </text>
                  <path
                    className="text-outline-variant opacity-40"
                    d="M 50 15 L 170 15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    className="text-outline-variant opacity-40"
                    d="M 50 61 L 170 15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    className="text-outline-variant opacity-40"
                    d="M 50 15 L 170 107"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    className="text-primary-container"
                    d="M 60 84 C 95 107, 130 112, 175 105 C 220 98, 250 35, 290 38"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="3.5"
                  />
                  <circle className="fill-primary-container" cx="60" cy="84" r="4" />
                  <circle className="fill-primary-container" cx="160" cy="107" r="4" />
                  <circle className="fill-primary-container" cx="290" cy="38" r="4" />
                  <text className="text-[11px] font-bold fill-primary-container font-sans" x="56" y="74">
                    2 (Bắt đầu)
                  </text>
                  <text className="text-[11px] font-bold fill-primary-container font-sans" x="140" y="119">
                    1 (Trũng thấp)
                  </text>
                  <text className="text-[11px] font-bold fill-primary-container font-sans" x="270" y="30">
                    4 (Nâng cao)
                  </text>
                </svg>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant text-center">
                {' '}
                Thanh 3 bắt đầu ở mức 2, võng sâu xuống đáy mức 1 rồi vút ngược lên mức 4 khi đọc đơn lẻ.{' '}
              </p>
            </div>
            <div className="bg-surface-container-low rounded-xl p-space-sm flex items-center gap-space-sm">
              <div
                className="w-16 h-16 rounded-lg bg-cover bg-center shrink-0 shadow-sm"
                data-alt="Traditional Chinese desk with calligraphic brush, ancient scroll paper with hand-drawn pinyin notations, red cinnabar seal, warm golden atmospheric lighting, scholar workspace"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCbcIRejuv72lUvKV5Ra-V9sCxIXBeDhlUk1DCX6WAj-OGQyT8we4zXw5W7WmYbOoDmmml8N-Q-z5vRRUVNDIvgx6e1x3VFsgDicHefK1lbOWVxYzfnYy46bIVVi4UNp4O1mUZSYhKzdwc96TGNk5cBgoExfE5GovRwqsyisjcm02QhwH9ENo0GesjKQWiN13gzrtuKxrGLaPZbYWB4DTmePifWaAE2tYCwdN1gECIl3-feDpFgGtIV')",
                }}
              ></div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-sm text-label-sm text-primary-container font-bold uppercase tracking-wide">
                  Mẹo Ghi Nhớ Nhanh
                </span>
                <span className="font-title-sm text-title-sm text-on-surface truncate">
                  Vần "o" đi với "w" luôn giữ nguyên âm tròn môi
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                  Môi chúm tròn như chữ 'u' rồi lướt sang 'o'.
                </span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 flex flex-col gap-space-lg">
            <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-xs">
                    1
                  </span>
                  <h3 className="font-headline-md text-headline-md text-on-surface">
                    Chọn Pinyin chuẩn xác của từ "我":
                  </h3>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Phím tắt: [A - D]</span>
              </div>
              <div className="grid grid-cols-2 gap-space-sm" id="pinyin-options">
                <button
                  type="button"
                  onClick={() => setSel(0)}
                  className={
                    sel === 0
                      ? 'group relative p-space-md rounded-xl bg-primary-fixed/40 text-left transition-all flex items-center justify-between shadow-sm'
                      : 'group relative p-space-md rounded-xl bg-surface-container hover:bg-surface-container-high text-left transition-all flex items-center justify-between'
                  }
                >
                  <div className="flex items-center gap-space-sm">
                    <span className="w-8 h-8 rounded-lg bg-primary-container text-on-primary flex items-center justify-center font-title-sm text-title-sm font-bold">
                      A
                    </span>
                    <span className="font-headline-lg text-headline-lg text-primary-container font-serif">wǒ</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-label-sm text-label-sm text-primary-container font-bold">Đang chọn</span>
                    <span
                      className="material-symbols-outlined text-primary-container text-[20px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setSel(1)}
                  className={
                    sel === 1
                      ? 'group relative p-space-md rounded-xl bg-primary-fixed/40 text-left transition-all flex items-center justify-between shadow-sm'
                      : 'group relative p-space-md rounded-xl bg-surface-container hover:bg-surface-container-high text-left transition-all flex items-center justify-between'
                  }
                >
                  <div className="flex items-center gap-space-sm">
                    <span className="w-8 h-8 rounded-lg bg-surface-container-highest group-hover:bg-surface-container-lowest text-on-surface flex items-center justify-center font-title-sm text-title-sm font-bold">
                      B
                    </span>
                    <span className="font-headline-lg text-headline-lg text-on-surface font-serif">wó</span>
                  </div>
                  <span className="material-symbols-outlined text-surface-container-highest text-[20px]">
                    radio_button_unchecked
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setSel(2)}
                  className={
                    sel === 2
                      ? 'group relative p-space-md rounded-xl bg-primary-fixed/40 text-left transition-all flex items-center justify-between shadow-sm'
                      : 'group relative p-space-md rounded-xl bg-surface-container hover:bg-surface-container-high text-left transition-all flex items-center justify-between'
                  }
                >
                  <div className="flex items-center gap-space-sm">
                    <span className="w-8 h-8 rounded-lg bg-surface-container-highest group-hover:bg-surface-container-lowest text-on-surface flex items-center justify-center font-title-sm text-title-sm font-bold">
                      C
                    </span>
                    <span className="font-headline-lg text-headline-lg text-on-surface font-serif">wò</span>
                  </div>
                  <span className="material-symbols-outlined text-surface-container-highest text-[20px]">
                    radio_button_unchecked
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setSel(3)}
                  className={
                    sel === 3
                      ? 'group relative p-space-md rounded-xl bg-primary-fixed/40 text-left transition-all flex items-center justify-between shadow-sm'
                      : 'group relative p-space-md rounded-xl bg-surface-container hover:bg-surface-container-high text-left transition-all flex items-center justify-between'
                  }
                >
                  <div className="flex items-center gap-space-sm">
                    <span className="w-8 h-8 rounded-lg bg-surface-container-highest group-hover:bg-surface-container-lowest text-on-surface flex items-center justify-center font-title-sm text-title-sm font-bold">
                      D
                    </span>
                    <span className="font-headline-lg text-headline-lg text-on-surface font-serif">wō</span>
                  </div>
                  <span className="material-symbols-outlined text-surface-container-highest text-[20px]">
                    radio_button_unchecked
                  </span>
                </button>
              </div>
            </div>
            <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold text-xs">
                    2
                  </span>
                  <h3 className="font-headline-md text-headline-md text-on-surface">
                    Xác định thanh điệu của âm tiết "<span className="text-primary-container font-serif">wǒ</span>":
                  </h3>
                </div>
                <span className="font-label-sm text-label-sm text-secondary font-bold">4 Thanh Tiêu Chuẩn</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                <div className="p-space-sm rounded-xl bg-surface-container flex flex-col gap-1 transition-all hover:bg-surface-container-high cursor-pointer">
                  <div className="flex items-center justify-between">
                    <span className="font-title-sm text-title-sm font-bold text-on-surface">① Thanh 1 (Âm Bình)</span>
                    <span className="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm font-bold">
                      55
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Cao bằng phẳng</span>
                    <span className="font-headline-md text-headline-md font-serif text-on-surface">wō</span>
                  </div>
                </div>
                <div className="p-space-sm rounded-xl bg-surface-container flex flex-col gap-1 transition-all hover:bg-surface-container-high cursor-pointer">
                  <div className="flex items-center justify-between">
                    <span className="font-title-sm text-title-sm font-bold text-on-surface">
                      ② Thanh 2 (Dương Bình)
                    </span>
                    <span className="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm font-bold">
                      35
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Lên cao dốc</span>
                    <span className="font-headline-md text-headline-md font-serif text-on-surface">wó</span>
                  </div>
                </div>
                <div className="p-space-sm rounded-xl bg-secondary-container text-on-secondary-container flex flex-col gap-1 shadow-sm transition-all cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px]">check_circle</span>
                      <span className="font-title-sm text-title-sm font-bold">③ Thanh 3 (Thượng Thanh)</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-secondary text-on-secondary font-label-sm text-label-sm font-bold">
                      214
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-body-sm text-body-sm text-on-secondary-container/80">
                      Hạ sâu rồi nâng cao (wǒ)
                    </span>
                    <span className="font-headline-md text-headline-md font-serif font-bold text-secondary">wǒ ✓</span>
                  </div>
                </div>
                <div className="p-space-sm rounded-xl bg-surface-container flex flex-col gap-1 transition-all hover:bg-surface-container-high cursor-pointer">
                  <div className="flex items-center justify-between">
                    <span className="font-title-sm text-title-sm font-bold text-on-surface">④ Thanh 4 (Khứ Thanh)</span>
                    <span className="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm font-bold">
                      51
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Rơi nhanh, dứt khoát</span>
                    <span className="font-headline-md text-headline-md font-serif text-on-surface">wò</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col gap-space-md">
              <div className="flex items-start gap-space-sm">
                <div className="w-10 h-10 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[24px]">school</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-space-xs">
                    <span className="font-headline-md text-headline-md text-on-surface">
                      Quy tắc biến điệu Thanh 3 (三声变调)
                    </span>
                    <span className="px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
                      Trọng tâm HSK 1-3
                    </span>
                  </div>
                  <p className="mt-1 font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    {' '}
                    Khi hai âm tiết mang <strong>Thanh 3 (Thượng thanh)</strong> đi liền kề nhau, âm tiết đầu tiên bắt
                    buộc phải chuyển hoá đọc thành <strong>Thanh 2 (Dương bình: 35)</strong>. Tuy nhiên, mặt chữ Pinyin
                    in ấn vẫn giữ nguyên ký hiệu dấu thanh 3 gốc.{' '}
                  </p>
                  <div className="mt-space-sm p-space-sm rounded-lg bg-surface-container-low flex items-center gap-space-md">
                    <div className="flex items-center gap-2 font-serif font-bold text-on-surface text-title-sm">
                      <span>你好</span>
                      <span className="text-on-surface-variant font-sans font-normal">(nǐ hǎo)</span>
                    </div>
                    <span className="material-symbols-outlined text-primary-container text-[18px]">trending_flat</span>
                    <div className="flex items-center gap-1.5 font-sans font-bold text-primary-container">
                      <span>Đọc thực tế:</span>
                      <span className="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-serif">
                        ní hǎo
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-space-md rounded-xl bg-surface-container flex items-start gap-space-sm">
                <div className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-title-sm text-title-sm text-on-surface font-bold">
                    Ghi chú từ Trợ lý HanziSRS
                  </span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    {' '}
                    Bạn đã nhận diện chuẩn xác <strong>9/10</strong> câu hỏi về thanh 3 trong tuần này! Lưu ý phân biệt
                    rõ giữa <em>độ dốc thẳng dứt khoát</em> của thanh 4 (51) và <em>độ võng ngắt quãng lượn sóng</em>{' '}
                    của thanh 3 (214).{' '}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sticky bottom-4 z-30 bg-surface/90 backdrop-blur-xl rounded-2xl p-space-md shadow-xl flex flex-wrap items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-sm text-on-surface-variant font-label-md text-label-md">
            <span className="material-symbols-outlined text-[18px] text-tertiary">keyboard</span>
            <span>
              Phím tắt: Bấm{' '}
              <kbd className="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface font-mono font-bold shadow-xs">
                1
              </kbd>
              ,{' '}
              <kbd className="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface font-mono font-bold shadow-xs">
                2
              </kbd>
              ,{' '}
              <kbd className="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface font-mono font-bold shadow-xs">
                3
              </kbd>
              ,{' '}
              <kbd className="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface font-mono font-bold shadow-xs">
                4
              </kbd>{' '}
              để chọn thanh
            </span>
          </div>
          <div className="flex items-center gap-space-sm">
            <button
              className="inline-flex items-center gap-1.5 px-space-md py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant font-title-sm text-title-sm transition-all"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">flag</span>
              <span>Báo lỗi câu hỏi</span>
            </button>
            <button
              className="inline-flex items-center gap-2 px-space-lg py-2.5 rounded-lg bg-primary-container hover:opacity-95 text-on-primary font-title-sm text-title-sm font-bold shadow-[0_4px_16px_rgba(190,18,60,0.28)] transition-all"
              id="next-question-btn"
              type="button"
              onClick={goNext}
            >
              <span>Câu tiếp theo</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
