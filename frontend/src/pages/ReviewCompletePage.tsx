import { Link, useNavigate } from 'react-router-dom';
import AppShell from '../layouts/AppShell';

export default function ReviewCompletePage() {
  const navigate = useNavigate();

  return (
    <AppShell>
      <div className="flex flex-col w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md mb-space-lg">
          <div className="flex items-center gap-space-sm">
            <div className="w-11 h-11 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary shadow-sm">
              <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                task_alt
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-space-xs">
                <span className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                  Ôn Tập Hàng Ngày SRS
                </span>
                <span className="inline-flex items-center px-space-xs py-0.5 rounded-full bg-secondary/10 text-secondary font-label-sm text-label-sm">
                  {' '}
                  Tất Cả Thẻ Đã Xong{' '}
                </span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Khoang ôn tập tự động tính chu kỳ Spaced Repetition Hệ FSRS-5
              </span>
            </div>
          </div>
          <div className="flex items-center gap-space-sm self-start md:self-auto">
            <div className="flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container-lowest shadow-sm">
              <span className="material-symbols-outlined text-secondary text-[20px]">verified</span>
              <span className="font-label-md text-label-md text-on-surface">Phiên học #142 Hoàn Tất</span>
            </div>
            <div className="flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-tertiary-fixed shadow-sm">
              <span className="material-symbols-outlined text-tertiary text-[18px]">local_fire_department</span>
              <span className="font-label-sm text-label-sm text-on-tertiary-fixed font-bold">12 Ngày Liên Tục</span>
            </div>
          </div>
        </div>
        <div className="relative w-full rounded-2xl bg-surface-container-lowest shadow-md overflow-hidden p-space-md md:p-space-xl mb-space-xl">
          <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none"></div>
          <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-primary-fixed/25 blur-3xl pointer-events-none"></div>
          <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="relative mb-space-lg flex items-center justify-center">
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-tr from-secondary/15 via-secondary-container/30 to-transparent flex items-center justify-center shadow-lg">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-primary flex flex-col items-center justify-center shadow-[0_4px_16px_rgba(149,0,42,0.3)] transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                  <span className="font-headline-xl text-headline-xl text-on-primary font-bold tracking-widest select-none">
                    無缺
                  </span>
                  <span className="font-label-sm text-[10px] text-on-primary/80 uppercase tracking-widest">
                    Vô Khuyết
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-3 bg-secondary text-on-secondary px-space-xs py-0.5 rounded-md font-label-sm text-label-sm shadow-md flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">done_all</span>
                <span>44/44 Thẻ</span>
              </div>
            </div>
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold mb-space-xs">
              {' '}
              Viên Mãn Kỳ Công • Hán Tự Định Hình{' '}
            </span>
            <h1 className="font-headline-xl text-headline-xl text-on-surface mb-space-sm">
              {' '}
              Công Đức Viên Mãn! Bạn Đã Quét Sạch Hàng Đợi Ôn Tập{' '}
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl leading-relaxed mb-space-lg">
              {' '}
              Hôm nay bạn đã chinh phục trọn vẹn <span className="text-primary font-bold">44/44 thẻ Hán tự</span> đến
              hạn. Dựa theo thuật toán phân phối khoảng cách{' '}
              <span className="text-on-surface font-semibold">Ebbinghaus &amp; Spaced Repetition (FSRS)</span>, các dấu
              vết ký ức ngắn hạn vừa được tái kích hoạt thành công, dịch chuyển vững chắc vào tầng lưu trữ dài hạn an
              toàn của vỏ não.{' '}
            </p>
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-space-sm mb-space-lg text-left">
              <div className="bg-surface-container-low rounded-xl p-space-sm flex flex-col justify-between">
                <div className="flex items-center justify-between text-on-surface-variant mb-space-xs">
                  <span className="font-label-sm text-label-sm">Thời Gian</span>
                  <span className="material-symbols-outlined text-[18px]">timer</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-headline-lg text-headline-lg text-on-surface font-bold">18</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">phút</span>
                </div>
                <span className="font-label-sm text-[10px] text-secondary font-medium mt-1">
                  24.5s / từ tốc độ chuẩn
                </span>
              </div>
              <div className="bg-surface-container-low rounded-xl p-space-sm flex flex-col justify-between">
                <div className="flex items-center justify-between text-on-surface-variant mb-space-xs">
                  <span className="font-label-sm text-label-sm">Độ Chính Xác</span>
                  <span className="material-symbols-outlined text-[18px] text-secondary">gps_fixed</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-headline-lg text-headline-lg text-secondary font-bold">91.5</span>
                  <span className="font-label-sm text-label-sm text-secondary">%</span>
                </div>
                <span className="font-label-sm text-[10px] text-secondary font-medium mt-1">
                  Vượt ngưỡng kỳ vọng 85%
                </span>
              </div>
              <div className="bg-surface-container-low rounded-xl p-space-sm flex flex-col justify-between">
                <div className="flex items-center justify-between text-on-surface-variant mb-space-xs">
                  <span className="font-label-sm text-label-sm">Thăng Hạng</span>
                  <span className="material-symbols-outlined text-[18px] text-primary">auto_stories</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-headline-lg text-headline-lg text-primary font-bold">12</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Hán tự</span>
                </div>
                <span className="font-label-sm text-[10px] text-primary font-medium mt-1">
                  Lên bậc Master &amp; Burned
                </span>
              </div>
              <div className="bg-surface-container-low rounded-xl p-space-sm flex flex-col justify-between">
                <div className="flex items-center justify-between text-on-surface-variant mb-space-xs">
                  <span className="font-label-sm text-label-sm">Công Lực Nạp</span>
                  <span className="material-symbols-outlined text-[18px] text-secondary">bolt</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-headline-lg text-headline-lg text-on-surface font-bold">+85</span>
                  <span className="font-label-sm text-label-sm text-secondary font-bold">XP</span>
                </div>
                <span className="font-label-sm text-[10px] text-on-surface-variant mt-1">+15 Bonus chuẩn xác</span>
              </div>
              <div className="bg-surface-container-low rounded-xl p-space-sm flex flex-col justify-between col-span-2 sm:col-span-1">
                <div className="flex items-center justify-between text-tertiary mb-space-xs">
                  <span className="font-label-sm text-label-sm">Ngọn Lửa Chuỗi</span>
                  <span className="material-symbols-outlined text-[18px]">local_fire_department</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-headline-lg text-headline-lg text-tertiary font-bold">12</span>
                  <span className="font-label-sm text-label-sm text-tertiary">Ngày</span>
                </div>
                <span className="font-label-sm text-[10px] text-tertiary font-medium mt-1">Đạt kỷ lục tuần này</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-space-sm w-full">
              <button
                className="flex items-center gap-space-xs bg-secondary hover:bg-on-secondary-container text-on-secondary font-title-sm text-title-sm px-space-lg py-space-sm rounded-lg shadow-sm transition-all transform hover:-translate-y-0.5"
                type="button"
                onClick={() => navigate('/practice/reverse-quiz')}
              >
                <span className="material-symbols-outlined text-[20px]">sync_problem</span>
                <span>Luyện Thêm Từ Yếu (8 từ hay nhầm)</span>
              </button>
              <button
                className="flex items-center gap-space-xs bg-primary-container hover:bg-primary text-on-primary font-title-sm text-title-sm px-space-lg py-space-sm rounded-lg shadow-[0_2px_8px_rgba(190,18,60,0.2)] transition-all transform hover:-translate-y-0.5"
                type="button"
                onClick={() => navigate('/vocabulary/new')}
              >
                <span className="material-symbols-outlined text-[20px]">add_circle</span>
                <span>Học Thêm 5 Từ Mới HSK 4</span>
              </button>
              <Link
                className="flex items-center gap-space-xs bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-title-sm text-title-sm px-space-lg py-space-sm rounded-lg transition-colors"
                data-path="dashboard"
                to="/dashboard"
              >
                <span className="material-symbols-outlined text-[20px]">dashboard</span>
                <span>Về Bảng Điều Khiển</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg mb-space-lg">
          <div className="lg:col-span-7 bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-space-sm">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-secondary text-[20px]">hourglass_top</span>
                  <h2 className="font-headline-md text-headline-md text-on-surface">Dự Báo Đợt Ôn Tiếp Theo</h2>
                </div>
                <span className="font-label-sm text-label-sm bg-surface-container px-space-xs py-0.5 rounded text-on-surface-variant font-mono">
                  FSRS-v4.5
                </span>
              </div>
              <div className="flex items-center gap-space-md p-space-sm rounded-xl bg-surface-container-low mb-space-md">
                <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary flex-shrink-0">
                  <span className="material-symbols-outlined text-[22px]">schedule</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-space-xs">
                    <span className="font-title-sm text-title-sm text-on-surface">Đợt ôn tập kế tiếp sau</span>
                    <span
                      className="font-headline-md text-headline-md text-primary font-bold font-mono"
                      id="countdown-timer"
                    >
                      04:24:59
                    </span>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Dự kiến mở lúc <span className="font-semibold text-on-surface">20:30 tối nay</span> (khoảng 8 từ chu
                    kỳ ngắn lặp lại)
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    Khối lượng ôn tập 7 ngày tới (Không quá tải)
                  </span>
                  <span className="font-label-sm text-label-sm text-secondary font-bold">Cân bằng tối ưu</span>
                </div>
                <div className="w-full bg-surface-container-low rounded-xl p-space-sm">
                  <div className="grid grid-cols-7 gap-2 items-end h-28 pt-2">
                    <div className="flex flex-col items-center gap-1 h-full justify-end">
                      <span className="font-label-sm text-[10px] text-on-surface-variant">8</span>
                      <div
                        className="w-full bg-primary/20 rounded-t-md hover:bg-primary/40 transition-colors"
                        style={{ height: '25%' }}
                      ></div>
                      <span className="font-label-sm text-[11px] text-primary font-bold">Tối nay</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 h-full justify-end">
                      <span className="font-label-sm text-[10px] text-on-surface-variant">19</span>
                      <div
                        className="w-full bg-secondary rounded-t-md hover:bg-secondary/80 transition-colors"
                        style={{ height: '52%' }}
                      ></div>
                      <span className="font-label-sm text-[11px] text-on-surface-variant">T3</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 h-full justify-end">
                      <span className="font-label-sm text-[10px] text-on-surface-variant">14</span>
                      <div
                        className="w-full bg-secondary/70 rounded-t-md hover:bg-secondary/90 transition-colors"
                        style={{ height: '40%' }}
                      ></div>
                      <span className="font-label-sm text-[11px] text-on-surface-variant">T4</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 h-full justify-end">
                      <span className="font-label-sm text-[10px] text-on-surface-variant">26</span>
                      <div
                        className="w-full bg-tertiary-container rounded-t-md hover:bg-tertiary transition-colors"
                        style={{ height: '72%' }}
                      ></div>
                      <span className="font-label-sm text-[11px] text-on-surface-variant">T5</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 h-full justify-end">
                      <span className="font-label-sm text-[10px] text-on-surface-variant">18</span>
                      <div
                        className="w-full bg-secondary/80 rounded-t-md hover:bg-secondary transition-colors"
                        style={{ height: '50%' }}
                      ></div>
                      <span className="font-label-sm text-[11px] text-on-surface-variant">T6</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 h-full justify-end">
                      <span className="font-label-sm text-[10px] text-on-surface-variant">32</span>
                      <div
                        className="w-full bg-primary-container rounded-t-md hover:bg-primary transition-colors"
                        style={{ height: '88%' }}
                      ></div>
                      <span className="font-label-sm text-[11px] text-on-surface-variant">T7</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 h-full justify-end">
                      <span className="font-label-sm text-[10px] text-on-surface-variant">11</span>
                      <div
                        className="w-full bg-secondary/60 rounded-t-md hover:bg-secondary transition-colors"
                        style={{ height: '32%' }}
                      ></div>
                      <span className="font-label-sm text-[11px] text-on-surface-variant">CN</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between pt-space-md mt-space-sm border-none gap-space-xs text-on-surface-variant">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-surface-variant"></span>
                <span className="font-label-sm text-label-sm">Tập sự (48)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                <span className="font-label-sm text-label-sm">Thuần thục (126)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span>
                <span className="font-label-sm text-label-sm">Cao thủ (84)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                <span className="font-label-sm text-label-sm">Khắc cốt (412)</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-surface-container-high p-space-lg shadow-sm relative overflow-hidden">
            <span className="absolute -right-6 -bottom-6 font-display-character text-display-character text-on-surface/[0.04] pointer-events-none select-none">
              {' '}
              学{' '}
            </span>
            <div className="flex items-center justify-between mb-space-md">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-primary text-[20px]">format_quote</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">
                  Cổ Huấn Khuyến Học
                </span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant text-[18px]">bookmark_heart</span>
            </div>
            <div className="my-auto py-space-sm">
              <div className="mb-space-sm">
                <span className="font-headline-xl text-headline-xl text-primary block tracking-wide font-headline-xl">
                  {' '}
                  学如逆水行舟{' '}
                </span>{' '}
                <span className="font-headline-lg text-headline-lg text-on-surface block tracking-wide">
                  {' '}
                  不进则退{' '}
                </span>{' '}
                <span className="font-body-sm text-body-sm text-on-surface-variant italic mt-1 block">
                  {' '}
                  “Học như nghịch thủy hành chu, bất tiến tắc thoái.”{' '}
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                {' '}
                “Học tập tựa như con thuyền bơi ngược dòng nước xiết, nếu không dốc sức chèo tiến về phía trước ắt sẽ bị
                dòng nước đẩy lùi về sau.”{' '}
              </p>
            </div>
            <div className="flex items-center justify-between pt-space-sm bg-surface-container-lowest/60 rounded-xl p-space-sm mt-space-sm">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-tertiary text-[20px]">alarm_on</span>
                <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                  Nhắc nhở chuông báo ôn tập
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input defaultChecked className="sr-only peer" type="checkbox" />
                <div className="w-9 h-5 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-secondary"></div>
              </label>
            </div>
          </div>
        </div>
        <div className="w-full bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs mb-space-md">
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface">12 Hán Tự Vừa Thăng Cấp Thành Công</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Các ký tự đã đạt chuỗi nhớ liên tiếp 5 lần và chuyển sang cấp độ bền vững
              </p>
            </div>
            <button
              className="inline-flex items-center gap-1 font-label-md text-label-md text-primary hover:underline self-start sm:self-auto"
              type="button"
              onClick={() => navigate('/statistics')}
            >
              <span>Xem toàn bộ lịch sử phiên</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-space-sm">
            <div className="bg-surface-container-low rounded-xl p-space-sm flex items-center gap-space-sm hover:shadow-md transition-shadow">
              <span className="font-display-character text-[32px] leading-none text-primary font-bold">悟</span>
              <div className="flex flex-col min-w-0">
                <span className="font-title-sm text-title-sm text-on-surface truncate">wù • Ngộ</span>
                <span className="font-label-sm text-[11px] text-secondary font-semibold">Mastered</span>
              </div>
            </div>
            <div className="bg-surface-container-low rounded-xl p-space-sm flex items-center gap-space-sm hover:shadow-md transition-shadow">
              <span className="font-display-character text-[32px] leading-none text-primary font-bold">德</span>
              <div className="flex flex-col min-w-0">
                <span className="font-title-sm text-title-sm text-on-surface truncate">dé • Đức</span>
                <span className="font-label-sm text-[11px] text-secondary font-semibold">Mastered</span>
              </div>
            </div>
            <div className="bg-surface-container-low rounded-xl p-space-sm flex items-center gap-space-sm hover:shadow-md transition-shadow">
              <span className="font-display-character text-[32px] leading-none text-primary font-bold">渊</span>
              <div className="flex flex-col min-w-0">
                <span className="font-title-sm text-title-sm text-on-surface truncate">yuān • Uyên</span>
                <span className="font-label-sm text-[11px] text-primary font-semibold">Burned 🔥</span>
              </div>
            </div>
            <div className="bg-surface-container-low rounded-xl p-space-sm flex items-center gap-space-sm hover:shadow-md transition-shadow">
              <span className="font-display-character text-[32px] leading-none text-primary font-bold">博</span>
              <div className="flex flex-col min-w-0">
                <span className="font-title-sm text-title-sm text-on-surface truncate">bó • Bác</span>
                <span className="font-label-sm text-[11px] text-secondary font-semibold">Mastered</span>
              </div>
            </div>
            <div className="bg-surface-container-low rounded-xl p-space-sm flex items-center gap-space-sm hover:shadow-md transition-shadow">
              <span className="font-display-character text-[32px] leading-none text-primary font-bold">勤</span>
              <div className="flex flex-col min-w-0">
                <span className="font-title-sm text-title-sm text-on-surface truncate">qín • Cần</span>
                <span className="font-label-sm text-[11px] text-secondary font-semibold">Mastered</span>
              </div>
            </div>
            <div className="bg-surface-container-low rounded-xl p-space-sm flex items-center gap-space-sm hover:shadow-md transition-shadow">
              <span className="font-display-character text-[32px] leading-none text-primary font-bold">恒</span>
              <div className="flex flex-col min-w-0">
                <span className="font-title-sm text-title-sm text-on-surface truncate">héng • Hằng</span>
                <span className="font-label-sm text-[11px] text-primary font-semibold">Burned 🔥</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
