import AppShell from '../layouts/AppShell';
import usePracticeNext from '../lib/usePracticeFlow';

export default function WritingPracticePage() {
  const goNext = usePracticeNext();

  return (
    <AppShell>
      <div className="flex flex-col w-full gap-space-lg">
        <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-space-md p-space-md rounded-xl bg-surface-container-lowest shadow-sm">
          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
              <span className="text-primary font-bold">Luyện Tập Phản Xạ Active Recall</span>
              <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
              <span className="truncate">Luyện Viết &amp; Thuận Bút Hán Tự</span>
            </div>
            <div className="flex items-center gap-space-sm flex-wrap mt-0.5">
              <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-bold">
                HSK 1 Cốt Lõi
              </span>
              <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm">
                Quy Tắc 7 Bút Thuận
              </span>
              <div className="flex items-center gap-1.5 ml-1 text-on-surface-variant font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[16px] text-tertiary">history_edu</span>
                <span>Khung Mễ Thư Pháp (米字格)</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-space-md flex-wrap justify-between md:justify-end">
            <div className="flex items-center gap-space-md pr-space-md md:border-r border-surface-container-highest">
              <div className="flex flex-col items-end">
                <span className="font-label-sm text-label-sm text-on-surface-variant">Tiến độ bài thi</span>
                <span className="font-title-sm text-title-sm font-bold text-on-surface">
                  Câu 04 <span className="text-on-surface-variant font-normal">/ 10</span>
                </span>
              </div>
              <div className="w-24 h-2 rounded-full bg-surface-container-high overflow-hidden flex">
                <div className="h-full bg-secondary" style={{ width: '40%' }}></div>
              </div>
              <div className="flex flex-col items-start pl-2">
                <span className="font-label-sm text-label-sm text-secondary font-bold flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span> 96.5%{' '}
                </span>
                <span className="font-label-sm text-label-sm text-tertiary font-bold">+25 XP</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface transition-all flex items-center justify-center"
                id="btn-undo"
                title="Hoàn tác nét (Z)"
              >
                <span className="material-symbols-outlined text-[20px]">undo</span>
              </button>
              <button
                className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface transition-all flex items-center justify-center"
                id="btn-clear"
                title="Xoá bảng (C)"
              >
                <span className="material-symbols-outlined text-[20px]">ink_eraser</span>
              </button>
              <button
                className="px-3 py-2 rounded-lg bg-primary-fixed text-on-primary-fixed-variant hover:bg-primary-container hover:text-on-primary font-title-sm text-title-sm flex items-center gap-1.5 transition-all shadow-sm"
                id="btn-replay"
                title="Phát lại mẫu bút thuận (Space)"
              >
                <span className="material-symbols-outlined text-[18px]">play_circle</span>
                <span className="font-label-md text-label-md">Xem mẫu</span>
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start">
          <div className="xl:col-span-7 flex flex-col gap-space-md">
            <div className="relative bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm overflow-hidden flex flex-col items-center">
              <div className="w-full flex items-center justify-between pb-space-md mb-space-sm border-b border-surface-container-high">
                <div className="flex items-center gap-space-sm">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-headline-md font-bold">
                    {' '}
                    老{' '}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-title-sm text-title-sm font-bold text-on-surface">Lǎo</span>
                      <span className="px-2 py-0.2 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
                        Âm Hán Việt: LÃO
                      </span>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Ý nghĩa: Già, lâu năm, quen thuộc (Bộ Lão: 耂 - 6 nét)
                    </span>
                  </div>
                </div>
                <button
                  className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-primary transition-all flex items-center justify-center"
                  title="Nghe phát âm chuẩn Bắc Kinh"
                >
                  <span className="material-symbols-outlined text-[18px]">volume_up</span>
                </button>
              </div>
              <div className="relative w-full max-w-[500px] aspect-square rounded-2xl bg-[#fdfcf9] shadow-[inset_0_2px_12px_rgba(0,0,0,0.03)] p-3 select-none">
                <div className="absolute right-4 bottom-4 w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center border-2 border-primary/20 text-primary/40 font-headline-xl text-title-sm pointer-events-none uppercase">
                  {' '}
                  書院{' '}
                </div>
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none p-3"
                  fill="none"
                  viewBox="0 0 400 400"
                >
                  <rect
                    height="396"
                    rx="12"
                    stroke="#be123c"
                    strokeOpacity="0.25"
                    strokeWidth="2"
                    width="396"
                    x="2"
                    y="2"
                  ></rect>
                  <rect
                    height="340"
                    stroke="#be123c"
                    strokeDasharray="4 4"
                    strokeOpacity="0.12"
                    strokeWidth="1"
                    width="340"
                    x="30"
                    y="30"
                  ></rect>
                  <line
                    opacity="0.6"
                    stroke="#e3bdbf"
                    strokeDasharray="4 4"
                    strokeWidth="1"
                    x1="30"
                    x2="370"
                    y1="30"
                    y2="370"
                  ></line>
                  <line
                    opacity="0.6"
                    stroke="#e3bdbf"
                    strokeDasharray="4 4"
                    strokeWidth="1"
                    x1="370"
                    x2="30"
                    y1="30"
                    y2="370"
                  ></line>
                  <line
                    opacity="0.4"
                    stroke="#be123c"
                    strokeDasharray="6 4"
                    strokeWidth="1.5"
                    x1="30"
                    x2="370"
                    y1="200"
                    y2="200"
                  ></line>
                  <line
                    opacity="0.4"
                    stroke="#be123c"
                    strokeDasharray="6 4"
                    strokeWidth="1.5"
                    x1="200"
                    x2="200"
                    y1="30"
                    y2="370"
                  ></line>
                  <circle cx="200" cy="200" fill="#be123c" fillOpacity="0.4" r="3" />
                </svg>
                <div className="relative w-full h-full cursor-crosshair" id="canvas-interaction-stage">
                  <svg className="w-full h-full" viewBox="0 0 400 400">
                    <defs>
                      <filter height="140%" id="jade-glow" width="140%" x="-20%" y="-20%">
                        <feDropShadow
                          dx="0"
                          dy="2"
                          floodColor="#006c4a"
                          floodOpacity="0.25"
                          stdDeviation="3"
                        ></feDropShadow>
                      </filter>
                      <filter height="140%" id="active-stroke-glow" width="140%" x="-20%" y="-20%">
                        <feDropShadow
                          dx="0"
                          dy="4"
                          floodColor="#be123c"
                          floodOpacity="0.35"
                          stdDeviation="6"
                        ></feDropShadow>
                      </filter>
                      <marker
                        id="arrow"
                        markerHeight="6"
                        markerWidth="6"
                        orient="auto-start-reverse"
                        refX="5"
                        refY="5"
                        viewBox="0 0 10 10"
                      >
                        <path d="M 0 1 L 10 5 L 0 9 z" fill="#be123c" />
                      </marker>
                    </defs>
                    <g className="text-surface-container-highest transition-opacity duration-300" id="ghost-layer">
                      <path
                        d="M125 108 C155 105, 235 103, 268 102"
                        fill="none"
                        opacity="0.35"
                        stroke="#dadad8"
                        strokeLinecap="round"
                        strokeWidth="18"
                      />
                      <path
                        d="M198 62 C198 88, 197 122, 196 156"
                        fill="none"
                        opacity="0.35"
                        stroke="#dadad8"
                        strokeLinecap="round"
                        strokeWidth="17"
                      />
                      <path
                        d="M82 165 C145 160, 255 156, 322 153"
                        fill="none"
                        opacity="0.35"
                        stroke="#dadad8"
                        strokeLinecap="round"
                        strokeWidth="21"
                      />
                      <path
                        d="M280 135 C250 200, 175 300, 95 348"
                        fill="none"
                        opacity="0.35"
                        stroke="#dadad8"
                        strokeLinecap="round"
                        strokeWidth="19"
                      />
                      <path
                        d="M172 230 C190 248, 206 265, 212 278"
                        fill="none"
                        opacity="0.35"
                        stroke="#dadad8"
                        strokeLinecap="round"
                        strokeWidth="16"
                      />
                      <path
                        d="M216 215 L216 308 C216 338, 240 342, 282 342 C302 342, 308 338, 314 316"
                        fill="none"
                        opacity="0.35"
                        stroke="#dadad8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="18"
                      />
                    </g>
                    <path
                      d="M124 109 C150 106, 230 104, 267 103 C272 103, 276 106, 274 110 C270 114, 255 116, 240 116 C190 117, 140 118, 122 118 C118 118, 116 113, 124 109 Z"
                      fill="#1a1c1b"
                      filter="url(#jade-glow)"
                    />
                    <circle cx="125" cy="113" fill="#006c4a" r="4" />
                    <circle cx="268" cy="108" fill="#006c4a" r="4" />
                    <path
                      d="M194 65 C198 65, 202 72, 202 85 C201 110, 199 135, 197 158 C194 163, 189 161, 189 155 C190 132, 191 95, 191 75 C191 67, 192 65, 194 65 Z"
                      fill="#1a1c1b"
                      filter="url(#jade-glow)"
                    />
                    <circle cx="196" cy="68" fill="#006c4a" r="4" />
                    <circle cx="194" cy="155" fill="#006c4a" r="4" />
                    <g id="active-stroke-group">
                      <path
                        d="M84 164 C145 160, 255 156, 320 153"
                        fill="none"
                        opacity="0.6"
                        stroke="#ffd0d2"
                        strokeLinecap="round"
                        strokeWidth="26"
                      />
                      <path
                        d="M82 165 C120 162, 168 160, 205 159"
                        fill="none"
                        filter="url(#active-stroke-glow)"
                        stroke="#95002a"
                        strokeLinecap="round"
                        strokeWidth="19"
                      />
                      <circle cx="205" cy="159" fill="#be123c" r="9" />
                      <circle
                        cx="205"
                        cy="159"
                        opacity="0.8"
                        r="16"
                        stroke="#be123c"
                        strokeDasharray="3 3"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M220 159 L290 155"
                        markerEnd="url(#arrow)"
                        stroke="#be123c"
                        strokeDasharray="5 5"
                        strokeWidth="2.5"
                      />
                      <text
                        className="font-label-sm text-label-sm font-bold tracking-widest"
                        fill="#95002a"
                        x="235"
                        y="145"
                      >
                        KÉO TỪ TRÁI QUA PHẢI
                      </text>
                    </g>
                    <g transform="translate(180, 185)">
                      <rect fill="#1a1c1b" height="24" opacity="0.85" rx="12" width="105" x="0" y="0"></rect>
                      <circle cx="12" cy="12" fill="#68dba9" r="4" />
                      <text className="font-label-sm text-label-sm font-bold" fill="#ffffff" x="24" y="16">
                        Lệch tâm: 0.8mm
                      </text>
                    </g>
                  </svg>
                </div>
              </div>
              <div className="w-full grid grid-cols-3 gap-space-sm mt-space-md pt-space-sm border-t border-surface-container-high">
                <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-surface-container-low text-center">
                  <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">brush</span> Áp lực ngòi{' '}
                  </span>
                  <span className="font-title-sm text-title-sm font-bold text-on-surface mt-0.5">62% (Vừa vặn)</span>
                </div>
                <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-surface-container-low text-center">
                  <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">speed</span> Tốc độ lướt{' '}
                  </span>
                  <span className="font-title-sm text-title-sm font-bold text-secondary mt-0.5">Chuẩn mực (Ổn)</span>
                </div>
                <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-surface-container-low text-center">
                  <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">screen_rotation</span> Góc nghiêng bút{' '}
                  </span>
                  <span className="font-title-sm text-title-sm font-bold text-on-surface mt-0.5">58° Thư Pháp</span>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-wrap items-center justify-between gap-space-md p-space-md rounded-xl bg-surface-container-lowest shadow-sm">
              <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-xl">
                <button
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-lowest shadow-sm text-primary font-title-sm text-title-sm font-bold transition-all"
                  id="brush-mao"
                >
                  <span className="material-symbols-outlined text-[18px]">draw</span>
                  <span>Mao Bút (Lông mềm)</span>
                </button>
                <button
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface font-title-sm text-title-sm transition-all"
                  id="brush-hard"
                >
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                  <span>Cương Bút (Bút máy)</span>
                </button>
              </div>
              <div className="flex items-center gap-space-sm">
                <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase">
                  Cỡ ngòi:
                </span>
                <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-lg">
                  <button className="w-7 h-7 rounded flex items-center justify-center hover:bg-surface-container-lowest text-on-surface-variant text-label-sm font-bold">
                    S
                  </button>
                  <button className="w-7 h-7 rounded bg-surface-container-lowest shadow-sm text-primary text-label-sm font-bold">
                    M
                  </button>
                  <button className="w-7 h-7 rounded flex items-center justify-center hover:bg-surface-container-lowest text-on-surface-variant text-label-sm font-bold">
                    L
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-space-sm">
                <button
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary-container text-on-secondary-container font-label-md text-label-md transition-all"
                  id="toggle-ghost"
                >
                  <span className="material-symbols-outlined text-[18px]">visibility</span>
                  <span>Bóng Nét Hướng Dẫn</span>
                </button>
                <button
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-all"
                  id="toggle-blind"
                  title="Ẩn toàn bộ bóng nét để thử thách trí nhớ"
                >
                  <span className="material-symbols-outlined text-[18px]">visibility_off</span>
                  <span>Thi Đấu (Giấu Nét)</span>
                </button>
              </div>
            </div>
          </div>
          <div className="xl:col-span-5 flex flex-col gap-space-lg">
            <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                  <h3 className="font-title-sm text-title-sm font-bold text-on-surface">Phân Rã 6 Nét Chữ 「 老 」</h3>
                </div>
                <span className="font-label-sm text-label-sm text-primary font-bold px-2 py-0.5 rounded-full bg-primary-fixed">
                  Nét 3/6
                </span>
              </div>
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-secondary-container/30 transition-all">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-label-sm text-label-sm font-bold">
                      1
                    </span>
                    <div className="flex flex-col">
                      <span className="font-title-sm text-title-sm font-bold text-on-surface">Ngang ngắn (一)</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Từ trái sang phải ở phần đầu
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-secondary font-label-sm text-label-sm font-bold">
                    <span className="material-symbols-outlined text-[18px]">done</span>
                    <span>100%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-secondary-container/30 transition-all">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-label-sm text-label-sm font-bold">
                      2
                    </span>
                    <div className="flex flex-col">
                      <span className="font-title-sm text-title-sm font-bold text-on-surface">Sổ dọc ngắn (丨)</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Cắt qua nét ngang số 1</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-secondary font-label-sm text-label-sm font-bold">
                    <span className="material-symbols-outlined text-[18px]">done</span>
                    <span>98%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-primary-fixed/40 shadow-sm transition-all scale-[1.01]">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-sm text-label-sm font-bold animate-pulse">
                      3
                    </span>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-title-sm text-title-sm font-bold text-primary">
                          Ngang dài đỡ dưới (一)
                        </span>
                        <span className="px-1.5 py-0.2 rounded bg-primary text-on-primary font-label-sm text-label-sm uppercase font-bold">
                          Đang viết
                        </span>
                      </div>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Dài hơn nét 1, đỡ bộ Thổ (土) biến thể
                      </span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-primary text-[20px] animate-bounce">edit</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low opacity-75">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-label-sm text-label-sm font-bold">
                      4
                    </span>
                    <div className="flex flex-col">
                      <span className="font-title-sm text-title-sm text-on-surface">Nét phẩy đâm xiên (丿)</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Kéo dài vát chéo từ trên xuống góc trái
                      </span>
                    </div>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Đợi viết</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low opacity-75">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-label-sm text-label-sm font-bold">
                      5
                    </span>
                    <div className="flex flex-col">
                      <span className="font-title-sm text-title-sm text-on-surface">Nét quẹt xiên / Chấm (丶)</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Tựa như nét phẩy nhỏ của chữ Chủy (匕)
                      </span>
                    </div>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Đợi viết</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low opacity-75">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-label-sm text-label-sm font-bold">
                      6
                    </span>
                    <div className="flex flex-col">
                      <span className="font-title-sm text-title-sm text-on-surface">Nét cong móc (乚)</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Cong tròn từ trên xuống rồi hất nhẹ sang phải
                      </span>
                    </div>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Đợi viết</span>
                </div>
              </div>
              <div className="p-space-md rounded-xl bg-error-container/25 flex items-start gap-space-sm">
                <span className="material-symbols-outlined text-error text-[22px] shrink-0 mt-0.5">error_outline</span>
                <div className="flex flex-col gap-0.5">
                  <span className="font-title-sm text-title-sm font-bold text-on-surface">
                    Cảnh Báo Lỗi Sai Phổ Biến
                  </span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    <strong>78% học viên sơ cấp</strong> thường vẽ nét phẩy (nét 4) trước khi hoàn thành nét ngang dài
                    số 3, hoặc móc chữ Chủy (匕) sai thứ tự. Hãy tuân thủ:{' '}
                    <em>"Trên trước dưới sau - Hoàn tất phần đầu mới vát nét chéo xuyên."</em>
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-[22px]">menu_book</span>
                  <h4 className="font-title-sm text-title-sm font-bold text-on-surface">
                    7 Quy Tắc Vàng Bút Thuận Hán Ngữ
                  </h4>
                </div>
                <span className="font-label-sm text-label-sm text-tertiary-container font-bold uppercase">
                  Nguyên Lý Cổ Điển
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-body-sm font-body-sm">
                <div className="p-2.5 rounded-lg bg-surface-container-low flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm flex items-center justify-center font-bold">
                    1
                  </span>
                  <span className="text-on-surface font-medium">
                    Ngang trước sổ sau <span className="text-on-surface-variant text-[11px] block">(先横后竖)</span>
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-container-low flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm flex items-center justify-center font-bold">
                    2
                  </span>
                  <span className="text-on-surface font-medium">
                    Phẩy trước mác sau <span className="text-on-surface-variant text-[11px] block">(先撇后捺)</span>
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-container-low flex items-center gap-2 bg-primary-fixed/30 font-bold text-primary">
                  <span className="w-5 h-5 rounded-full bg-primary text-on-primary font-label-sm text-label-sm flex items-center justify-center">
                    3
                  </span>
                  <span>
                    Trên trước dưới sau{' '}
                    <span className="text-primary/70 text-[11px] block font-normal">(从上到下) • Áp dụng</span>
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-container-low flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm flex items-center justify-center font-bold">
                    4
                  </span>
                  <span className="text-on-surface font-medium">
                    Trái trước phải sau <span className="text-on-surface-variant text-[11px] block">(从左到右)</span>
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-container-low flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm flex items-center justify-center font-bold">
                    5
                  </span>
                  <span className="text-on-surface font-medium">
                    Ngoài trước trong sau <span className="text-on-surface-variant text-[11px] block">(从外到内)</span>
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-container-low flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm flex items-center justify-center font-bold">
                    6
                  </span>
                  <span className="text-on-surface font-medium">
                    Vào trước đóng sau{' '}
                    <span className="text-on-surface-variant text-[11px] block">(先里后外再封口)</span>
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-container-low flex items-center gap-2 sm:col-span-2">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm flex items-center justify-center font-bold">
                    7
                  </span>
                  <span className="text-on-surface font-medium">
                    Giữa trước hai bên sau{' '}
                    <span className="text-on-surface-variant text-[11px] inline ml-1">(先中间后两边) - vd: 小, 水</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[22px]">psychology</span>
                  <h4 className="font-title-sm text-title-sm font-bold text-on-surface">
                    Trí Nhớ Cơ Bắp &amp; SRS Impact
                  </h4>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">
                  SRS Guru
                </span>
              </div>
              <div className="grid grid-cols-2 gap-space-sm">
                <div className="p-space-sm rounded-xl bg-surface-container-low flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Phản xạ xúc giác</span>
                  <span className="font-headline-md text-headline-md font-bold text-secondary mt-1">+18%</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                    Tăng độ bền liên kết nơ-ron
                  </span>
                </div>
                <div className="p-space-sm rounded-xl bg-surface-container-low flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Chu kỳ ôn tới</span>
                  <span className="font-headline-md text-headline-md font-bold text-tertiary mt-1">5 Ngày</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                    {'Nếu đạt độ chuẩn > 90%'}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
                <div className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-surface-container font-mono text-[10px] text-on-surface">
                    Z
                  </kbd>{' '}
                  Hoàn tác{' '}
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-surface-container font-mono text-[10px] text-on-surface">
                    Space
                  </kbd>{' '}
                  Xem mẫu{' '}
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-surface-container font-mono text-[10px] text-on-surface">
                    Enter
                  </kbd>{' '}
                  Chấm điểm AI{' '}
                </div>
              </div>
              <div className="flex flex-col gap-2 pt-space-xs">
                <button
                  className="w-full py-3 px-space-lg rounded-xl bg-primary-container hover:bg-primary text-on-primary font-title-sm text-title-sm font-bold transition-all shadow-[0_4px_16px_rgba(190,18,60,0.25)] flex items-center justify-center gap-2"
                  id="btn-submit-score"
                >
                  <span className="material-symbols-outlined text-[20px]">smart_toy</span>
                  <span>Chấm Điểm Nét Bút AI (AI Stroke Scorer)</span>
                </button>
                <button
                  className="w-full py-2.5 px-space-md rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface font-title-sm text-title-sm transition-all flex items-center justify-center gap-1.5"
                  id="btn-skip"
                  onClick={goNext}
                >
                  <span>Bỏ qua nét này / Xem đáp án</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
