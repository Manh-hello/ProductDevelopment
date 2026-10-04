import { useNavigate } from 'react-router-dom';
import AppShell from '../layouts/AppShell';

export default function PracticeHubPage() {
  const navigate = useNavigate();

  return (
    <AppShell>
      <div className="flex flex-col w-full gap-space-xl">
        <section className="relative w-full overflow-hidden rounded-xl bg-surface-container-lowest p-space-xl shadow-sm">
          <div className="absolute -right-12 -top-16 select-none pointer-events-none opacity-5 text-primary font-headline-xl text-[240px] leading-none">
            {' '}
            練{' '}
          </div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-space-lg">
            <div className="max-w-3xl flex flex-col gap-space-xs">
              <div className="flex items-center gap-space-sm">
                <span className="px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm uppercase tracking-wider font-bold inline-flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span> Lục Tầng Ký Ức • 六层记忆{' '}
                </span>
                <span className="text-on-surface-variant font-label-md text-label-md">
                  Đồng bộ thuật toán SRS Anki/SuperMemo v4.2
                </span>
              </div>
              <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight mt-1 font-bold">
                {' '}
                Trung Tâm Luyện Tập Đa Chiều{' '}
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                {' '}
                Chọn hình thức rèn luyện theo 6 tầng phản xạ trí nhớ. Hệ thống tự động cân bằng tỷ lệ từ mới, từ đến hạn
                và các tử huyệt ngữ nghĩa thường sai lệch.{' '}
              </p>
            </div>
            <div className="flex items-center gap-space-sm bg-surface-container p-1.5 rounded-xl self-start md:self-auto">
              <div className="flex items-center gap-2 px-space-md py-2 rounded-lg bg-surface-container-lowest shadow-sm">
                <span className="material-symbols-outlined text-secondary text-[20px]">psychology</span>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Sẵn Sàng</span>
                  <span className="font-title-sm text-title-sm font-bold text-on-surface">20 Hán tự</span>
                </div>
              </div>
              <div className="flex items-center gap-2 px-space-md py-2 rounded-lg bg-surface-container-lowest shadow-sm">
                <span className="material-symbols-outlined text-tertiary text-[20px]">timer</span>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Thời Gian</span>
                  <span className="font-title-sm text-title-sm font-bold text-on-surface">~10 Phút</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="relative w-full rounded-xl bg-surface-container-lowest overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div className="lg:col-span-8 p-space-xl flex flex-col justify-between gap-space-lg">
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center gap-space-sm">
                  <span className="px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold inline-flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">auto_awesome</span> Khuyên dùng hôm nay{' '}
                  </span>
                  <span className="font-label-md text-label-md text-on-surface-variant font-medium">
                    Khoảng cách lặp tối ưu: Giờ vàng 14:00 - 18:00
                  </span>
                </div>
                <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
                  {' '}
                  Phiên Luyện Tổng Hợp • Dynamic Mixing Session{' '}
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
                  {' '}
                  Tối ưu hoá đường cong quên Ebbinghaus bằng cách phối trộn chuẩn mực giữa nạp kiến thức mới, củng cố rễ
                  thần kinh và triệt tiêu phản xạ nhầm lẫn.{' '}
                </p>
                <div className="mt-space-md flex flex-col gap-space-xs">
                  <div className="flex items-center justify-between text-on-surface-variant font-label-md text-label-md">
                    <span className="font-bold text-on-surface">Tỷ lệ phân bổ 20 thẻ tự động:</span>
                    <span className="text-primary-container font-semibold">Tự động cân bằng AI</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-surface-container-highest overflow-hidden flex shadow-inner">
                    <div
                      className="h-full bg-primary-container transition-all"
                      style={{ width: '20%' }}
                      title="Từ mới (20%)"
                    ></div>
                    <div
                      className="h-full bg-secondary transition-all"
                      style={{ width: '50%' }}
                      title="Đến hạn SRS (50%)"
                    ></div>
                    <div
                      className="h-full bg-tertiary-container transition-all"
                      style={{ width: '30%' }}
                      title="Cần củng cố (30%)"
                    ></div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm pt-space-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary-container shrink-0"></span>
                      <span className="font-body-sm text-body-sm text-on-surface">
                        <strong className="font-title-sm text-title-sm">20%</strong> Từ mới (4 từ)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-secondary shrink-0"></span>
                      <span className="font-body-sm text-body-sm text-on-surface">
                        <strong className="font-title-sm text-title-sm">50%</strong> Đến hạn SRS (10 từ)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-tertiary-container shrink-0"></span>
                      <span className="font-body-sm text-body-sm text-on-surface">
                        <strong className="font-title-sm text-title-sm">30%</strong> Cần củng cố (6 từ)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-space-md flex flex-wrap items-center justify-between gap-space-md">
                <div className="flex items-center gap-space-lg">
                  <div className="flex items-center gap-2 text-on-surface-variant font-label-md text-label-md">
                    <span className="material-symbols-outlined text-on-surface text-[18px]">schedule</span>
                    <span>8 - 12 phút</span>
                  </div>
                  <div className="flex items-center gap-2 text-secondary font-label-md text-label-md font-bold">
                    <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
                    <span>+120 XP Thưởng</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold shadow-sm">
                    <span className="material-symbols-outlined text-tertiary text-[16px]">local_fire_department</span>
                    <span>12 Ngày Streak</span>
                  </div>
                </div>
                <button
                  className="group inline-flex items-center gap-space-sm px-space-lg py-3.5 rounded-lg bg-primary-container text-on-primary font-title-sm text-title-sm shadow-md hover:bg-primary transition-all cursor-pointer"
                  type="button"
                  onClick={() => navigate('/practice/multi')}
                >
                  <span>Bắt đầu phiên tổng hợp ngay</span>
                  <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
            <div className="lg:col-span-4 bg-surface-container relative p-space-lg flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
                <svg className="text-on-surface" height="340" viewBox="0 0 100 100" width="340">
                  <circle
                    cx="50"
                    cy="50"
                    fill="none"
                    r="46"
                    stroke="currentColor"
                    strokeDasharray="2,2"
                    strokeWidth="0.75"
                  />
                  <circle cx="50" cy="50" fill="none" r="36" stroke="currentColor" strokeWidth="0.5" />
                  <circle cx="50" cy="50" fill="none" r="24" stroke="currentColor" strokeWidth="1" />
                  <line
                    stroke="currentColor"
                    strokeDasharray="1,2"
                    strokeWidth="0.5"
                    x1="50"
                    x2="50"
                    y1="4"
                    y2="96"
                  ></line>
                  <line
                    stroke="currentColor"
                    strokeDasharray="1,2"
                    strokeWidth="0.5"
                    x1="4"
                    x2="96"
                    y1="50"
                    y2="50"
                  ></line>
                </svg>
              </div>
              <div className="relative z-10 flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold tracking-widest">
                  Khung Học Tập HSK 4+
                </span>
                <div className="w-7 h-7 rounded-lg bg-primary-container/10 flex items-center justify-center text-primary-container font-bold font-headline-xl text-title-sm">
                  {' '}
                  印{' '}
                </div>
              </div>
              <div className="relative z-10 my-space-md text-center flex flex-col items-center">
                <div className="relative inline-block">
                  <div className="font-display-character text-display-character text-primary-container leading-none select-none drop-shadow-sm font-headline-xl">
                    {' '}
                    融{' '}
                  </div>
                  <span className="absolute -bottom-2 -right-3 px-2 py-0.5 rounded bg-surface-container-lowest font-label-sm text-label-sm text-on-surface font-semibold shadow-sm">
                    róng
                  </span>
                </div>
                <span className="font-title-sm text-title-sm font-bold text-on-surface mt-space-sm">
                  Dung Hội Quán Thông
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Hoà hợp, thấu suốt mạch nghĩa tự nhiên
                </span>
              </div>
              <div className="relative z-10 p-3 rounded-lg bg-surface-container-lowest shadow-sm flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Tỷ lệ nhớ mặt chữ tuần qua
                  </span>
                  <span className="font-title-sm text-title-sm font-bold text-secondary">86.4% Khả quan</span>
                </div>
                <svg className="w-14 h-8 text-secondary" fill="none" viewBox="0 0 56 24">
                  <path
                    d="M2 20 L12 16 L22 18 L32 10 L42 12 L52 4"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                  />
                  <circle cx="52" cy="4" fill="currentColor" r="2.5" />
                </svg>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full flex flex-col gap-space-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-sm">
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
                {' '}
                Lục Giác Rèn Luyện (6 Tầng Phản Xạ){' '}
              </h2>
              <span className="text-on-surface-variant font-label-md text-label-md">
                Tự do chọn chế độ chuyên sâu độc lập
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
              <span className="w-2 h-2 rounded-full bg-secondary"></span> <span>Chuẩn nhận diện HSK 3.0</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-space-lg">
            <div className="group relative rounded-xl bg-surface-container-lowest p-space-lg flex flex-col justify-between gap-space-lg shadow-sm hover:shadow-md transition-all">
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary-container group-hover:bg-primary-container group-hover:text-on-primary transition-colors shadow-sm">
                    <span className="material-symbols-outlined text-[26px]">psychology</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-semibold">
                    {' '}
                    Cơ bản • Nhận diện{' '}
                  </span>
                </div>
                <div className="flex flex-col mt-1">
                  <div className="flex items-center gap-2">
                    <span className="font-headline-xl text-title-sm text-primary-container font-bold">識</span>
                    <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Trắc Nghiệm Thuận</h3>
                  </div>
                  <span className="font-label-md text-label-md text-on-surface-variant mt-0.5">
                    Quiz: Hán tự → Nghĩa tiếng Việt
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  {' '}
                  Quan sát chữ Hán gốc kết hợp nhận thức trực quan để tìm tầng nghĩa tiếng Việt tương ứng. Thích ứng câu
                  hỏi tự động.{' '}
                </p>
              </div>
              <div className="flex flex-col gap-space-sm pt-space-xs">
                <div className="flex items-center justify-between text-label-sm font-label-sm">
                  <span className="text-on-surface-variant">Chính xác gần đây</span>
                  <span className="font-bold text-secondary">91% Tinh thông</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
                  <div className="h-full bg-secondary rounded-full" style={{ width: '91%' }}></div>
                </div>
                <div className="flex items-center justify-between mt-2 pt-2">
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                    10 Câu • Thích ứng
                  </span>
                  <button
                    className="inline-flex items-center gap-1 text-primary-container font-title-sm text-title-sm font-bold hover:gap-2 transition-all cursor-pointer"
                    type="button"
                    onClick={() => navigate('/practice/quiz')}
                  >
                    <span>Bắt đầu</span>
                    <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="group relative rounded-xl bg-surface-container-lowest p-space-lg flex flex-col justify-between gap-space-lg shadow-sm hover:shadow-md transition-all">
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary-container group-hover:bg-primary-container group-hover:text-on-primary transition-colors shadow-sm">
                    <span className="material-symbols-outlined text-[26px]">sync_alt</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">
                    {' '}
                    Active Recall cốt lõi{' '}
                  </span>
                </div>
                <div className="flex flex-col mt-1">
                  <div className="flex items-center gap-2">
                    <span className="font-headline-xl text-title-sm text-primary-container font-bold">憶</span>
                    <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Trắc Nghiệm Ngược</h3>
                  </div>
                  <span className="font-label-md text-label-md text-on-surface-variant mt-0.5">
                    Reverse: Nghĩa → Nhớ Hán tự
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  {' '}
                  Kích hoạt vùng gợi nhớ chủ động (Active Recall). Đi từ nghĩa khái niệm và ví dụ minh hoạ để tái hiện
                  chính xác cấu trúc chữ.{' '}
                </p>
              </div>
              <div className="flex flex-col gap-space-sm pt-space-xs">
                <div className="flex items-center justify-between text-label-sm font-label-sm">
                  <span className="text-on-surface-variant">Độ bền trí nhớ</span>
                  <span className="font-bold text-on-surface">78% Ổn định</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
                  <div className="h-full bg-primary-container rounded-full" style={{ width: '78%' }}></div>
                </div>
                <div className="flex items-center justify-between mt-2 pt-2">
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                    10 Câu • Thử thách
                  </span>
                  <button
                    className="inline-flex items-center gap-1 text-primary-container font-title-sm text-title-sm font-bold hover:gap-2 transition-all cursor-pointer"
                    type="button"
                    onClick={() => navigate('/practice/reverse-quiz')}
                  >
                    <span>Bắt đầu</span>
                    <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="group relative rounded-xl bg-surface-container-lowest p-space-lg flex flex-col justify-between gap-space-lg shadow-sm hover:shadow-md transition-all">
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary-container group-hover:bg-primary-container group-hover:text-on-primary transition-colors shadow-sm">
                    <span className="material-symbols-outlined text-[26px]">spellcheck</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
                    {' '}
                    Phát âm &amp; Thanh điệu 1-4{' '}
                  </span>
                </div>
                <div className="flex flex-col mt-1">
                  <div className="flex items-center gap-2">
                    <span className="font-headline-xl text-title-sm text-primary-container font-bold">音</span>
                    <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                      Pinyin &amp; Thanh Điệu
                    </h3>
                  </div>
                  <span className="font-label-md text-label-md text-on-surface-variant mt-0.5">
                    Pinyin, thanh 1-4 &amp; biến điệu
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  {' '}
                  Rèn độ nhạy nguyên âm, phụ âm kép và nhận biết biến âm quy tắc (như tam thanh, biến điệu 不 &amp; 一)
                  mượt mà chuẩn Bắc Kinh.{' '}
                </p>
              </div>
              <div className="flex flex-col gap-space-sm pt-space-xs">
                <div className="flex items-center justify-between text-label-sm font-label-sm">
                  <span className="text-on-surface-variant">Tỷ lệ chính xác</span>
                  <span className="font-bold text-secondary">87% Chuẩn thanh</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
                  <div className="h-full bg-secondary rounded-full" style={{ width: '87%' }}></div>
                </div>
                <div className="flex items-center justify-between mt-2 pt-2">
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                    Chọn nhanh &amp; Ghép vần
                  </span>
                  <button
                    className="inline-flex items-center gap-1 text-primary-container font-title-sm text-title-sm font-bold hover:gap-2 transition-all cursor-pointer"
                    type="button"
                    onClick={() => navigate('/practice/pinyin')}
                  >
                    <span>Bắt đầu</span>
                    <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="group relative rounded-xl bg-surface-container-lowest p-space-lg flex flex-col justify-between gap-space-lg shadow-sm hover:shadow-md transition-all">
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary-container group-hover:bg-primary-container group-hover:text-on-primary transition-colors shadow-sm">
                    <span className="material-symbols-outlined text-[26px]">headphones</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-semibold">
                    {' '}
                    Audio bản xứ AI HD{' '}
                  </span>
                </div>
                <div className="flex flex-col mt-1">
                  <div className="flex items-center gap-2">
                    <span className="font-headline-xl text-title-sm text-primary-container font-bold">聽</span>
                    <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Luyện Nghe Phản Xạ</h3>
                  </div>
                  <span className="font-label-md text-label-md text-on-surface-variant mt-0.5">
                    Listening: Âm điệu → Chữ Hán
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  {' '}
                  Phát triển phản xạ thính giác không phụ thuộc vào phiên âm chữ Latin. Nghe ngữ điệu tự nhiên và bắt
                  ngay từ khóa chính xác.{' '}
                </p>
              </div>
              <div className="flex flex-col gap-space-sm pt-space-xs">
                <div className="flex items-center justify-between text-label-sm font-label-sm">
                  <span className="text-on-surface-variant">Tỷ lệ chính xác</span>
                  <span className="font-bold text-secondary">82% Rõ nét</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
                  <div className="h-full bg-secondary rounded-full" style={{ width: '82%' }}></div>
                </div>
                <div className="flex items-center justify-between mt-2 pt-2">
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                    Tốc độ: 1.0x &amp; 1.25x
                  </span>
                  <button
                    className="inline-flex items-center gap-1 text-primary-container font-title-sm text-title-sm font-bold hover:gap-2 transition-all cursor-pointer"
                    type="button"
                    onClick={() => navigate('/practice/listening')}
                  >
                    <span>Bắt đầu</span>
                    <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="group relative rounded-xl bg-surface-container-lowest p-space-lg flex flex-col justify-between gap-space-lg shadow-sm hover:shadow-md transition-all">
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary-container group-hover:bg-primary-container group-hover:text-on-primary transition-colors shadow-sm">
                    <span className="material-symbols-outlined text-[26px]">draw</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold">
                    {' '}
                    Chính tả &amp; Bộ thủ{' '}
                  </span>
                </div>
                <div className="flex flex-col mt-1">
                  <div className="flex items-center gap-2">
                    <span className="font-headline-xl text-title-sm text-primary-container font-bold">寫</span>
                    <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                      Viết &amp; Nét Bút Thuận
                    </h3>
                  </div>
                  <span className="font-label-md text-label-md text-on-surface-variant mt-0.5">
                    Stroke Order: Quy tắc bút thuận
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  {' '}
                  Mô phỏng viết thư pháp chuẩn: ngang trước dọc sau, phẩy trước mác sau. Ghi khắc trí nhớ cơ bắp (muscle
                  memory) hiệu quả.{' '}
                </p>
              </div>
              <div className="flex flex-col gap-space-sm pt-space-xs">
                <div className="flex items-center justify-between text-label-sm font-label-sm">
                  <span className="text-on-surface-variant">Tỷ lệ chính xác</span>
                  <span className="font-bold text-error">65% Cần cải thiện</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
                  <div className="h-full bg-error rounded-full" style={{ width: '65%' }}></div>
                </div>
                <div className="flex items-center justify-between mt-2 pt-2">
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                    Khung chữ Mễ Điền (米)
                  </span>
                  <button
                    className="inline-flex items-center gap-1 text-primary-container font-title-sm text-title-sm font-bold hover:gap-2 transition-all cursor-pointer"
                    type="button"
                    onClick={() => navigate('/practice/writing')}
                  >
                    <span>Bắt đầu</span>
                    <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="group relative rounded-xl bg-surface-container-lowest p-space-lg flex flex-col justify-between gap-space-lg shadow-sm hover:shadow-md transition-all">
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary-container group-hover:bg-primary-container group-hover:text-on-primary transition-colors shadow-sm">
                    <span className="material-symbols-outlined text-[26px]">chat_bubble</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-semibold">
                    {' '}
                    Ứng dụng &amp; Ngữ pháp{' '}
                  </span>
                </div>
                <div className="flex flex-col mt-1">
                  <div className="flex items-center gap-2">
                    <span className="font-headline-xl text-title-sm text-primary-container font-bold">句</span>
                    <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                      Câu &amp; Ngữ Cảnh AI
                    </h3>
                  </div>
                  <span className="font-label-md text-label-md text-on-surface-variant mt-0.5">
                    Context: Sắp xếp &amp; Chấm điểm ngữ pháp
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  {' '}
                  Đưa Hán tự vào câu thực chiến. Điền khuyết từ hợp ngữ cảnh, sửa lỗi logic cấu trúc câu với nhận xét
                  chi tiết từ gia sư AI.{' '}
                </p>
              </div>
              <div className="flex flex-col gap-space-sm pt-space-xs">
                <div className="flex items-center justify-between text-label-sm font-label-sm">
                  <span className="text-on-surface-variant">Tỷ lệ chính xác</span>
                  <span className="font-bold text-on-surface">73% Khá tốt</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
                  <div className="h-full bg-secondary rounded-full" style={{ width: '73%' }}></div>
                </div>
                <div className="flex items-center justify-between mt-2 pt-2">
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                    Hội thoại đời sống
                  </span>
                  <button
                    className="inline-flex items-center gap-1 text-primary-container font-title-sm text-title-sm font-bold hover:gap-2 transition-all cursor-pointer"
                    type="button"
                    onClick={() => navigate('/practice/sentence-order')}
                  >
                    <span>Bắt đầu</span>
                    <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full rounded-xl bg-surface-container p-space-lg flex flex-col gap-space-md shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-title-sm text-title-sm font-bold text-on-surface uppercase tracking-wide">
                {' '}
                Chế Độ Luyện Tập Đặc Biệt{' '}
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                {' '}
                Các bộ công cụ tăng tốc phản xạ chuyên biệt cho kỳ thi và vá lỗ hổng kiến thức{' '}
              </p>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant">Tùy biến mục tiêu học</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            <button
              className="flex items-center justify-between p-space-md rounded-xl bg-surface-container-lowest hover:bg-surface-bright transition-all text-left shadow-sm cursor-pointer group"
              type="button"
              onClick={() => navigate('/practice/reverse-quiz')}
            >
              <div className="flex items-center gap-space-sm min-w-0">
                <div className="w-10 h-10 rounded-lg bg-error-container text-on-error-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">healing</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-title-sm text-title-sm font-bold text-on-surface truncate group-hover:text-primary-container transition-colors">
                    {' '}
                    Chữa Lỗi Sai Gấp{' '}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                    {' '}
                    8 từ nhầm lẫn cần khắc phục{' '}
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-error text-on-error font-label-sm text-label-sm font-bold shrink-0 ml-2">
                {' '}
                Cấp tốc{' '}
              </span>
            </button>
            <button
              className="flex items-center justify-between p-space-md rounded-xl bg-surface-container-lowest hover:bg-surface-bright transition-all text-left shadow-sm cursor-pointer group"
              type="button"
              onClick={() => navigate('/practice/multi')}
            >
              <div className="flex items-center gap-space-sm min-w-0">
                <div className="w-10 h-10 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">flash_on</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-title-sm text-title-sm font-bold text-on-surface truncate group-hover:text-primary-container transition-colors">
                    {' '}
                    Thử Thách Tốc Độ 60s{' '}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                    {' '}
                    Phản xạ cực hạn • Nhân đôi XP{' '}
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-tertiary text-on-tertiary font-label-sm text-label-sm font-bold shrink-0 ml-2">
                {' '}
                2x XP{' '}
              </span>
            </button>
            <button
              className="flex items-center justify-between p-space-md rounded-xl bg-surface-container-lowest hover:bg-surface-bright transition-all text-left shadow-sm cursor-pointer group"
              type="button"
              onClick={() => navigate('/practice/writing')}
            >
              <div className="flex items-center gap-space-sm min-w-0">
                <div className="w-10 h-10 rounded-lg bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">account_tree</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-title-sm text-title-sm font-bold text-on-surface truncate group-hover:text-primary-container transition-colors">
                    {' '}
                    Luyện Theo Bộ Thủ{' '}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                    {' '}
                    Nắm vững 214 Khang Hy{' '}
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold shrink-0 ml-2">
                {' '}
                Cội nguồn{' '}
              </span>
            </button>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
