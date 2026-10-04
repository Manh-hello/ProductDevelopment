import { Link, useNavigate } from 'react-router-dom';
import AppShell from '../layouts/AppShell';
import { useState } from 'react';

export default function StatisticsPage() {
  const navigate = useNavigate();
  const [range, setRange] = useState(0);

  return (
    <AppShell>
      <div className="flex flex-col w-full gap-space-lg">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md pb-space-sm border-b border-surface-container-highest">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm uppercase tracking-wider">
                Hồ Sơ Hàn Lâm SRS
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Kỳ đánh giá học kỳ HSK 3-4</span>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
              Thống Kê &amp; Hồ Sơ Năng Lực Học Thuật
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Phân tích chuyên sâu chu kỳ lưu giữ trí nhớ dài hạn và quỹ đạo nạp Hán tự cá nhân.
            </p>
          </div>
          <div className="flex items-center bg-surface-container-high p-1 rounded-xl shadow-sm self-start md:self-auto">
            <button
              type="button"
              onClick={() => setRange(0)}
              className={
                range === 0
                  ? 'px-3.5 py-1.5 rounded-lg bg-surface font-title-sm text-title-sm text-primary shadow-sm font-semibold transition-all'
                  : 'px-3.5 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface font-title-sm text-title-sm transition-all'
              }
            >
              7 ngày qua
            </button>
            <button
              type="button"
              onClick={() => setRange(1)}
              className={
                range === 1
                  ? 'px-3.5 py-1.5 rounded-lg bg-surface font-title-sm text-title-sm text-primary shadow-sm font-semibold transition-all'
                  : 'px-3.5 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface font-title-sm text-title-sm transition-all'
              }
            >
              30 ngày qua
            </button>
            <button
              type="button"
              onClick={() => setRange(2)}
              className={
                range === 2
                  ? 'px-3.5 py-1.5 rounded-lg bg-surface font-title-sm text-title-sm text-primary shadow-sm font-semibold transition-all'
                  : 'px-3.5 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface font-title-sm text-title-sm transition-all'
              }
            >
              Quý này
            </button>
            <button
              type="button"
              onClick={() => setRange(3)}
              className={
                range === 3
                  ? 'px-3.5 py-1.5 rounded-lg bg-surface font-title-sm text-title-sm text-primary shadow-sm font-semibold transition-all'
                  : 'px-3.5 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface font-title-sm text-title-sm transition-all'
              }
            >
              Toàn bộ
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md">
          <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-[0_2px_10px_rgba(15,23,42,0.03)] flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
            <div className="absolute -right-3 -top-3 w-20 h-20 bg-primary-fixed/30 rounded-full blur-xl pointer-events-none"></div>
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                Từ Mới Nạp Tuần Này
              </span>
              <div className="w-8 h-8 rounded-lg bg-primary-fixed text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">auto_stories</span>
              </div>
            </div>
            <div className="my-space-sm flex items-baseline gap-2">
              <span className="font-headline-xl text-headline-xl font-bold text-on-surface">42</span>
              <span className="font-label-md text-label-md text-secondary font-semibold flex items-center">
                <span className="material-symbols-outlined text-[16px]">trending_up</span>+18%{' '}
              </span>
            </div>
            <div className="flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm pt-2 border-t border-surface-container-high">
              <span>Vượt mục tiêu tuần (+6 từ)</span>
              <span className="font-semibold text-primary">HSK 3</span>
            </div>
          </div>
          <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-[0_2px_10px_rgba(15,23,42,0.03)] flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
            <div className="absolute -right-3 -top-3 w-20 h-20 bg-secondary-fixed/40 rounded-full blur-xl pointer-events-none"></div>
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                Độ Chính Xác Tổng Thể
              </span>
              <div className="w-8 h-8 rounded-lg bg-secondary-fixed text-on-secondary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">verified</span>
              </div>
            </div>
            <div className="my-space-sm flex items-baseline gap-2">
              <span className="font-headline-xl text-headline-xl font-bold text-on-surface">87.4%</span>
              <span className="font-label-md text-label-md text-secondary font-semibold flex items-center">
                <span className="material-symbols-outlined text-[16px]">arrow_upward</span>+2.8%{' '}
              </span>
            </div>
            <div className="flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm pt-2 border-t border-surface-container-high">
              <span>328 / 375 lượt kiểm tra</span>
              <span className="font-semibold text-secondary">Tối Ưu</span>
            </div>
          </div>
          <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-[0_2px_10px_rgba(15,23,42,0.03)] flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
            <div className="absolute -right-3 -top-3 w-20 h-20 bg-tertiary-fixed/40 rounded-full blur-xl pointer-events-none"></div>
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                Thời Gian Tập Trung
              </span>
              <div className="w-8 h-8 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">schedule</span>
              </div>
            </div>
            <div className="my-space-sm flex items-baseline gap-2">
              <span className="font-headline-xl text-headline-xl font-bold text-on-surface">5h 45m</span>
              <span className="font-label-md text-label-md text-tertiary font-semibold flex items-center">
                <span className="material-symbols-outlined text-[16px]">timelapse</span>Đạt 96%{' '}
              </span>
            </div>
            <div className="flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm pt-2 border-t border-surface-container-high">
              <span>Trung bình 49m / ngày</span>
              <span className="font-semibold text-tertiary">Pomodoro x12</span>
            </div>
          </div>
          <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-[0_2px_10px_rgba(15,23,42,0.03)] flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
            <div className="absolute -right-3 -top-3 w-20 h-20 bg-primary-fixed/30 rounded-full blur-xl pointer-events-none"></div>
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                Tích Lũy Công Lực
              </span>
              <div className="w-8 h-8 rounded-lg bg-primary-container text-on-primary flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-[20px]">military_tech</span>
              </div>
            </div>
            <div className="my-space-sm flex items-baseline gap-2">
              <span className="font-headline-xl text-headline-xl font-bold text-primary">2,450</span>
              <span className="font-title-sm text-title-sm text-on-surface font-semibold">XP</span>
            </div>
            <div className="flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm pt-2 border-t border-surface-container-high">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-primary-container inline-block"></span> Bảng Vàng Viện Sĩ{' '}
              </span>
              <span className="font-title-sm text-title-sm text-primary font-bold">Hạng 3</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
          <div className="lg:col-span-8 p-space-lg rounded-2xl bg-surface-container-lowest shadow-[0_2px_12px_rgba(15,23,42,0.03)] flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-md">
              <div>
                <h2 className="font-headline-lg text-headline-lg text-on-surface flex items-center gap-2">
                  <span>Tăng Trưởng Kho Từ &amp; Độ Bền Trí Nhớ</span>
                  <span className="material-symbols-outlined text-primary text-[20px]">insights</span>
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  Mô phỏng đường cong quên lãng Ebbinghaus kết hợp mô hình tăng trưởng lũy tiến 7 ngày
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-primary-container"></span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Quy mô từ vựng</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-1 rounded-full bg-secondary"></span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Lưu giữ SRS</span>
                </div>
              </div>
            </div>
            <div className="w-full relative h-72 flex items-end">
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
                <div className="w-full border-b border-dashed border-surface-container-highest"></div>
                <div className="w-full border-b border-dashed border-surface-container-highest"></div>
                <div className="w-full border-b border-dashed border-surface-container-highest"></div>
                <div className="w-full border-b border-dashed border-surface-container-highest"></div>
              </div>
              <svg
                className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-10"
                preserveAspectRatio="none"
                viewBox="0 0 700 240"
              >
                <path
                  className="text-secondary"
                  d="M 40 180 C 130 150, 220 120, 310 95 C 400 70, 520 50, 660 38"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="3"
                />
                <path
                  className="text-secondary/5"
                  d="M 40 180 C 130 150, 220 120, 310 95 C 400 70, 520 50, 660 38 L 660 240 L 40 240 Z"
                  fill="currentColor"
                />
                <circle className="text-secondary" cx="660" cy="38" fill="currentColor" r="5" />
              </svg>
              <div className="grid grid-cols-7 w-full h-56 gap-2 sm:gap-4 items-end z-20 pb-1">
                <div className="flex flex-col items-center gap-2 group h-full justify-end">
                  <span className="font-label-sm text-label-sm text-on-surface-variant group-hover:text-primary font-bold transition-all">
                    203
                  </span>
                  <div
                    className="w-full max-w-[42px] bg-surface-container-highest group-hover:bg-primary-container rounded-t-md transition-all duration-300"
                    style={{ height: '60%' }}
                  ></div>
                  <span className="font-title-sm text-title-sm text-on-surface-variant mt-1">T2</span>
                </div>
                <div className="flex flex-col items-center gap-2 group h-full justify-end">
                  <span className="font-label-sm text-label-sm text-on-surface-variant group-hover:text-primary font-bold transition-all">
                    208
                  </span>
                  <div
                    className="w-full max-w-[42px] bg-surface-container-highest group-hover:bg-primary-container rounded-t-md transition-all duration-300"
                    style={{ height: '64%' }}
                  ></div>
                  <span className="font-title-sm text-title-sm text-on-surface-variant mt-1">T3</span>
                </div>
                <div className="flex flex-col items-center gap-2 group h-full justify-end">
                  <span className="font-label-sm text-label-sm text-on-surface-variant group-hover:text-primary font-bold transition-all">
                    214
                  </span>
                  <div
                    className="w-full max-w-[42px] bg-surface-container-highest group-hover:bg-primary-container rounded-t-md transition-all duration-300"
                    style={{ height: '70%' }}
                  ></div>
                  <span className="font-title-sm text-title-sm text-on-surface-variant mt-1">T4</span>
                </div>
                <div className="flex flex-col items-center gap-2 group h-full justify-end">
                  <span className="font-label-sm text-label-sm text-on-surface-variant group-hover:text-primary font-bold transition-all">
                    222
                  </span>
                  <div
                    className="w-full max-w-[42px] bg-surface-container-highest group-hover:bg-primary-container rounded-t-md transition-all duration-300"
                    style={{ height: '77%' }}
                  ></div>
                  <span className="font-title-sm text-title-sm text-on-surface-variant mt-1">T5</span>
                </div>
                <div className="flex flex-col items-center gap-2 group h-full justify-end">
                  <span className="font-label-sm text-label-sm text-on-surface-variant group-hover:text-primary font-bold transition-all">
                    231
                  </span>
                  <div
                    className="w-full max-w-[42px] bg-surface-container-highest group-hover:bg-primary-container rounded-t-md transition-all duration-300"
                    style={{ height: '85%' }}
                  ></div>
                  <span className="font-title-sm text-title-sm text-on-surface-variant mt-1">T6</span>
                </div>
                <div className="flex flex-col items-center gap-2 group h-full justify-end">
                  <span className="font-label-sm text-label-sm text-on-surface-variant group-hover:text-primary font-bold transition-all">
                    239
                  </span>
                  <div
                    className="w-full max-w-[42px] bg-surface-container-highest group-hover:bg-primary-container rounded-t-md transition-all duration-300"
                    style={{ height: '92%' }}
                  ></div>
                  <span className="font-title-sm text-title-sm text-on-surface-variant mt-1">T7</span>
                </div>
                <div className="flex flex-col items-center gap-2 group h-full justify-end">
                  <span className="font-label-sm text-label-sm text-primary font-bold">245</span>
                  <div
                    className="w-full max-w-[42px] bg-primary-container rounded-t-md transition-all duration-300 shadow-md shadow-primary/20"
                    style={{ height: '98%' }}
                  ></div>
                  <span className="font-title-sm text-title-sm text-primary font-bold mt-1">CN</span>
                </div>
              </div>
            </div>
            <div className="mt-space-md p-space-md rounded-xl bg-surface-container flex flex-col sm:flex-row items-center justify-between gap-space-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary-fixed text-on-secondary-container flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-[20px]">psychology</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-title-sm text-title-sm font-bold text-on-surface">
                      Tỷ Lệ Lưu Giữ Dài Hạn (Retention Rate):
                    </span>
                    <span className="font-headline-md text-headline-md text-secondary font-bold">92%</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Hệ số suy hao trí nhớ ở ngưỡng an toàn lý tưởng nhờ duy trì chuỗi phản hồi SRS liên tục 12 ngày.
                  </p>
                </div>
              </div>
              <button
                className="whitespace-nowrap px-4 py-2 rounded-lg bg-surface font-title-sm text-title-sm text-on-surface shadow-sm hover:bg-surface-container-lowest transition-all"
                type="button"
              >
                Chi tiết Ebbinghaus
              </button>
            </div>
          </div>
          <div className="lg:col-span-4 p-space-lg rounded-2xl bg-surface-container-lowest shadow-[0_2px_12px_rgba(15,23,42,0.03)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h2 className="font-headline-lg text-headline-lg text-on-surface">Trạng Thái Kho Từ</h2>
                <span className="material-symbols-outlined text-on-surface-variant text-[20px]">inventory_2</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                Phân bố 245 từ Hán theo các chặng chu kỳ lặp lại SRS
              </p>
              <div className="flex items-center justify-center py-4 relative">
                <svg className="w-48 h-48 -rotate-90" viewBox="0 0 160 160">
                  <circle
                    className="text-surface-container-high"
                    cx="80"
                    cy="80"
                    fill="none"
                    r="62"
                    stroke="currentColor"
                    strokeWidth="14"
                  />
                  <circle
                    className="text-secondary"
                    cx="80"
                    cy="80"
                    fill="none"
                    r="62"
                    stroke="currentColor"
                    strokeDasharray="390"
                    strokeDashoffset="186"
                    strokeLinecap="round"
                    strokeWidth="14"
                  />
                  <circle
                    className="text-tertiary"
                    cx="80"
                    cy="80"
                    fill="none"
                    r="62"
                    stroke="currentColor"
                    strokeDasharray="390"
                    strokeDashoffset="274"
                    strokeLinecap="round"
                    strokeWidth="14"
                  />
                  <circle
                    className="text-primary-container"
                    cx="80"
                    cy="80"
                    fill="none"
                    r="62"
                    stroke="currentColor"
                    strokeDasharray="390"
                    strokeDashoffset="320"
                    strokeLinecap="round"
                    strokeWidth="14"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
                    Tổng số từ
                  </span>
                  <span className="font-headline-xl text-headline-xl font-bold text-on-surface font-headline-xl">
                    245
                  </span>
                  <span className="font-label-sm text-label-sm text-secondary font-bold">52.2% Bền Vững</span>
                </div>
              </div>
              <div className="flex flex-col gap-2.5 mt-2">
                <div className="p-2.5 rounded-lg bg-surface-container flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-secondary"></span>
                    <div>
                      <span className="font-title-sm text-title-sm font-semibold text-on-surface block">
                        Đã Thành Thạo (Mastered)
                      </span>{' '}
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        {'Chu kỳ dãn cách > 30 ngày'}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-title-sm text-title-sm font-bold text-secondary">128 từ</span>{' '}
                    <span className="font-label-sm text-label-sm text-on-surface-variant block">52.2%</span>
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-container flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-tertiary"></span>
                    <div>
                      <span className="font-title-sm text-title-sm font-semibold text-on-surface block">
                        Đang Củng Cố (Learning)
                      </span>{' '}
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        Chu kỳ dãn cách 3 - 14 ngày
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-title-sm text-title-sm font-bold text-tertiary">73 từ</span>{' '}
                    <span className="font-label-sm text-label-sm text-on-surface-variant block">29.8%</span>
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-primary-fixed/40 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-primary-container"></span>
                    <div>
                      <span className="font-title-sm text-title-sm font-bold text-primary block">
                        Đến Hạn Ôn Hôm Nay
                      </span>{' '}
                      <span className="font-label-sm text-label-sm text-primary/80">Cần xử lý để không gãy chuỗi</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-title-sm text-title-sm font-bold text-primary">44 từ</span>{' '}
                    <span className="font-label-sm text-label-sm text-primary/80 block">18.0%</span>
                  </div>
                </div>
              </div>
            </div>
            <Link
              className="mt-space-md w-full py-2.5 rounded-lg bg-primary-container text-on-primary text-center font-title-sm text-title-sm hover:opacity-95 shadow-sm transition-all flex items-center justify-center gap-2"
              to="/review"
            >
              <span className="material-symbols-outlined text-[18px]">play_circle</span>
              <span>Bắt đầu ôn 44 từ đến hạn</span>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
          <div className="lg:col-span-6 p-space-lg rounded-2xl bg-surface-container-lowest shadow-[0_2px_12px_rgba(15,23,42,0.03)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <div>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface">Radar Năng Lực &amp; Dạng Bài</h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Phân tích 6 chiều kỹ năng ngôn ngữ từ 1,240 thao tác kiểm tra
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface-variant font-semibold">
                  6 Kỹ Năng
                </span>
              </div>
              <div className="my-space-md flex flex-col gap-3.5">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="font-title-sm text-title-sm font-semibold text-on-surface flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-secondary">checklist</span> Trắc
                      nghiệm Hán tự{' '}
                    </span>
                    <span className="font-title-sm text-title-sm font-bold text-secondary">91%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                    <div className="h-full bg-secondary rounded-full" style={{ width: '91%' }}></div>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="font-title-sm text-title-sm font-semibold text-on-surface flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-secondary">record_voice_over</span>{' '}
                      Pinyin &amp; Thanh điệu{' '}
                    </span>
                    <span className="font-title-sm text-title-sm font-bold text-secondary">87%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                    <div className="h-full bg-secondary rounded-full" style={{ width: '87%' }}></div>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="font-title-sm text-title-sm font-semibold text-on-surface flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-tertiary">hearing</span> Luyện nghe
                      phản xạ{' '}
                    </span>
                    <span className="font-title-sm text-title-sm font-bold text-tertiary">82%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                    <div className="h-full bg-tertiary rounded-full" style={{ width: '82%' }}></div>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="font-title-sm text-title-sm font-semibold text-on-surface flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-tertiary">segment</span> Sắp xếp &amp;
                      Đặt câu{' '}
                    </span>
                    <span className="font-title-sm text-title-sm font-bold text-tertiary">84%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                    <div className="h-full bg-tertiary rounded-full" style={{ width: '84%' }}></div>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="font-title-sm text-title-sm font-semibold text-on-surface flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-tertiary">graphic_eq</span> Luyện nói
                      &amp; Phát âm{' '}
                    </span>
                    <span className="font-title-sm text-title-sm font-bold text-tertiary">79%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                    <div className="h-full bg-tertiary rounded-full" style={{ width: '79%' }}></div>
                  </div>
                </div>
                <div className="flex flex-col gap-1 p-2.5 rounded-lg bg-primary-fixed/30">
                  <div className="flex items-center justify-between">
                    <span className="font-title-sm text-title-sm font-bold text-primary flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">draw</span> Viết &amp; Nét bút (Quy tắc
                      bút thuận){' '}
                    </span>
                    <span className="font-title-sm text-title-sm font-bold text-primary">65%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                    <div className="h-full bg-primary-container rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <span className="font-label-sm text-label-sm text-primary font-medium mt-0.5">
                    ⚠️ Kỹ năng cần tập trung tuần tới - Tỉ lệ sai thứ tự nét cao ở các bộ thủ phức
                  </span>
                </div>
              </div>
            </div>
            <div className="pt-2 border-t border-surface-container-high flex items-center justify-between">
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                {'Chuẩn đầu ra đề xuất: HSK 4 Đọc hiểu > 85%'}
              </span>
              <button
                className="font-title-sm text-title-sm text-primary font-semibold hover:underline"
                type="button"
                onClick={() => navigate('/vocabulary')}
              >
                Xem ma trận lỗi
              </button>
            </div>
          </div>
          <div className="lg:col-span-6 p-space-lg rounded-2xl bg-surface-container-lowest shadow-[0_2px_12px_rgba(15,23,42,0.03)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <div>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface">Top 5 Lỗ Hổng Kiến Thức</h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    {'Các cụm Hán tự hình cận - âm cận và quy tắc biến điệu có tần suất nhầm > 35%'}
                  </p>
                </div>
                <span className="material-symbols-outlined text-primary text-[24px]">troubleshoot</span>
              </div>
              <div className="my-space-md flex flex-col gap-space-sm">
                <div className="p-space-sm rounded-xl bg-surface-container flex items-center justify-between hover:bg-surface-container-high transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-surface flex items-center justify-center font-headline-md text-headline-md text-primary font-serif">
                      混
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-title-sm text-title-sm font-bold text-on-surface">老师 (lǎoshī)</span>
                        <span className="text-on-surface-variant font-body-sm">vs</span>
                        <span className="font-title-sm text-title-sm font-bold text-on-surface">老实 (lǎoshi)</span>
                      </div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        Nhầm lẫn thanh 1 (thầy cô) với thanh nhẹ (thật thà) • Sai 6 lần
                      </span>
                    </div>
                  </div>
                  <span className="px-2 py-1 rounded bg-error-container text-on-error-container font-label-sm text-label-sm font-bold">
                    42% Lỗi
                  </span>
                </div>
                <div className="p-space-sm rounded-xl bg-surface-container flex items-center justify-between hover:bg-surface-container-high transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-surface flex items-center justify-center font-headline-md text-headline-md text-primary font-serif">
                      形
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-title-sm text-title-sm font-bold text-on-surface">字 (zì)</span>
                        <span className="text-on-surface-variant font-body-sm">vs</span>
                        <span className="font-title-sm text-title-sm font-bold text-on-surface">子 (zǐ)</span>
                      </div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        Bỏ quên bộ Miên (宀) khi viết tốc ký • Sai 5 lần
                      </span>
                    </div>
                  </div>
                  <span className="px-2 py-1 rounded bg-error-container text-on-error-container font-label-sm text-label-sm font-bold">
                    38% Lỗi
                  </span>
                </div>
                <div className="p-space-sm rounded-xl bg-surface-container flex items-center justify-between hover:bg-surface-container-high transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-surface flex items-center justify-center font-headline-md text-headline-md text-primary font-serif">
                      调
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-title-sm text-title-sm font-bold text-on-surface">Biến điệu 不 (bù)</span>
                        <span className="text-on-surface-variant font-body-sm">&amp;</span>
                        <span className="font-title-sm text-title-sm font-bold text-on-surface">一 (yī)</span>
                      </div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        Quên đổi bù → bú trước âm tiết thanh 4 (不是, 不要)
                      </span>
                    </div>
                  </div>
                  <span className="px-2 py-1 rounded bg-error-container text-on-error-container font-label-sm text-label-sm font-bold">
                    36% Lỗi
                  </span>
                </div>
                <div className="p-space-sm rounded-xl bg-surface-container flex items-center justify-between hover:bg-surface-container-high transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-surface flex items-center justify-center font-headline-md text-headline-md text-primary font-serif">
                      似
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-title-sm text-title-sm font-bold text-on-surface">买 (mǎi)</span>
                        <span className="text-on-surface-variant font-body-sm">vs</span>
                        <span className="font-title-sm text-title-sm font-bold text-on-surface">卖 (mài)</span>
                      </div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        Nhầm hướng giao dịch Mua / Bán do nét Thập (十) đầu chữ
                      </span>
                    </div>
                  </div>
                  <span className="px-2 py-1 rounded bg-error-container text-on-error-container font-label-sm text-label-sm font-bold">
                    33% Lỗi
                  </span>
                </div>
                <div className="p-space-sm rounded-xl bg-surface-container flex items-center justify-between hover:bg-surface-container-high transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-surface flex items-center justify-center font-headline-md text-headline-md text-primary font-serif">
                      笔
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-title-sm text-title-sm font-bold text-on-surface">Bộ Xước 辶 (chuò)</span>
                        <span className="text-on-surface-variant font-body-sm">trong</span>
                        <span className="font-title-sm text-title-sm font-bold text-on-surface">进, 这, 道</span>
                      </div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        Lỗi viết bộ Xước trước phần thân bên trong
                      </span>
                    </div>
                  </div>
                  <span className="px-2 py-1 rounded bg-error-container text-on-error-container font-label-sm text-label-sm font-bold">
                    31% Lỗi
                  </span>
                </div>
              </div>
            </div>
            <div className="pt-space-sm">
              <button
                className="w-full py-3 rounded-xl bg-primary-container text-on-primary font-title-sm text-title-sm font-bold shadow-[0_4px_14px_rgba(190,18,60,0.28)] hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                id="btn-blitz"
                type="button"
                onClick={() => navigate('/practice/fill-blank')}
              >
                <span className="material-symbols-outlined text-[20px]">flash_on</span>
                <span>Tạo phiên luyện tập bổ khuyết ngay (Blitz Weakness)</span>
              </button>
            </div>
          </div>
        </div>
        <div className="p-space-lg rounded-2xl bg-surface-container-low flex flex-col md:flex-row items-center justify-between gap-space-md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm">
              <span className="material-symbols-outlined text-[28px]">workspace_premium</span>
            </div>
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface">Đề Xuất Lộ Trình Từ AI Hàn Lâm</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Với tốc độ hấp thụ 42 từ/tuần và độ chính xác 87.4%, bạn dự kiến sẽ hoàn tất trọn bộ HSK 4 vào ngày 18
                tháng 6.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              className="flex-1 md:flex-none px-4 py-2.5 rounded-lg bg-surface font-title-sm text-title-sm text-on-surface shadow-sm hover:bg-surface-container-lowest transition-all"
              type="button"
              onClick={() => window.print()}
            >
              Xuất Báo Cáo PDF
            </button>
            <button
              className="flex-1 md:flex-none px-4 py-2.5 rounded-lg bg-secondary text-on-secondary font-title-sm text-title-sm hover:opacity-95 shadow-sm transition-all"
              type="button"
            >
              Chia sẻ Thành tích
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
