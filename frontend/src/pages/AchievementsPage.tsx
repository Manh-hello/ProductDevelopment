import AppShell from '../layouts/AppShell';
import { useState } from 'react';
const CARDS = [
  { s: 'unlocked', r: null },
  { s: 'unlocked', r: null },
  { s: 'in-progress', r: null },
  { s: 'unlocked', r: null },
  { s: 'unlocked', r: null },
  { s: 'in-progress', r: null },
  { s: 'unlocked', r: null },
  { s: 'unlocked', r: null },
  { s: 'in-progress', r: null },
  { s: 'in-progress', r: null },
  { s: 'unlocked', r: 'rare' },
  { s: 'unlocked', r: 'rare' },
];
const FILTERS = ['all', 'unlocked', 'in-progress', 'rare'];

export default function AchievementsPage() {
  const [flt, setFlt] = useState(0);
  const cardVisible = (i: number) => {
    const f = FILTERS[flt];
    const c = CARDS[i];
    return f === 'all' || (f === 'rare' ? c.r === 'rare' : c.s === f);
  };

  return (
    <AppShell>
      <div className="flex flex-col w-full">
        <div className="relative w-full overflow-hidden pb-space-xl">
          <div className="absolute -top-16 -right-16 w-96 h-96 rounded-full bg-primary-container/5 blur-3xl pointer-events-none"></div>
          <div className="absolute top-80 -left-20 w-80 h-80 rounded-full bg-secondary-container/15 blur-3xl pointer-events-none"></div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg">
            <div className="flex flex-col gap-space-xs max-w-2xl">
              <div className="flex items-center gap-space-xs">
                <span className="inline-block w-2 h-2 rounded-full bg-primary"></span>
                <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">
                  Hàn Lâm Viện · Hệ Thống Thành Tựu
                </span>
              </div>
              <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
                Bảng Phong Thần &amp; Thành Tích Học Giả
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Hệ thống huân chương tôn vinh nỗ lực bền bỉ và các mốc đột phá trên con đường chinh phục Hán tự thông
                qua giải thuật lặp lại ngắt quãng SRS.
              </p>
            </div>
            <div className="flex items-center gap-space-sm self-start md:self-auto bg-surface-container-low px-space-md py-space-sm rounded-xl shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-tertiary-fixed flex items-center justify-center text-tertiary">
                <span className="material-symbols-outlined text-[24px]">verified</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant">Đã Chinh Phục</span>
                <span className="font-title-sm text-title-sm text-on-surface font-bold">
                  14 <span className="text-outline font-normal">/ 24 Huân chương</span>
                </span>
              </div>
            </div>
          </div>
          <div className="relative rounded-2xl bg-surface-container-lowest p-space-lg shadow-md mb-space-xl overflow-hidden">
            <div className="absolute -right-6 -bottom-10 pointer-events-none select-none opacity-5 font-display-character text-[220px] text-primary leading-none">
              {' '}
              博{' '}
            </div>
            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-lg">
              <div className="flex items-center gap-space-md">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary via-primary-container to-primary-fixed-variant flex items-center justify-center shadow-lg text-on-primary font-display-character text-[36px] font-bold">
                    {' '}
                    君{' '}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-secondary-fixed flex items-center justify-center shadow-sm">
                    <span
                      className="material-symbols-outlined text-secondary text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      workspace_premium
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-space-xs">
                  <div className="flex flex-wrap items-center gap-space-xs">
                    <h2 className="font-headline-md text-headline-md text-on-surface">Minh Quân</h2>
                    <span className="px-space-sm py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm uppercase tracking-wider font-bold">
                      Lv.5 Học Giả
                    </span>
                    <span className="px-space-sm py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
                      Cử Nhân Hàn Lâm
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-[16px] text-secondary">school</span> Gia nhập từ
                    tháng 10, 2023 · Bộ gõ Lục Chiều Toàn Diện{' '}
                  </p>
                  <div className="flex items-center gap-space-xs mt-space-xs">
                    <span className="px-space-sm py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm flex items-center gap-1 shadow-sm">
                      <span
                        className="material-symbols-outlined text-[16px] text-tertiary"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        military_tech
                      </span>{' '}
                      Huân chương danh dự: Bậc Thầy Spaced Repetition{' '}
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-space-md w-full lg:w-auto">
                <div className="bg-surface-container-low rounded-xl p-space-sm flex flex-col justify-center">
                  <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-tertiary">local_fire_department</span>{' '}
                    Chuỗi Streak{' '}
                  </span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="font-headline-md text-headline-md text-on-surface font-bold">12</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">ngày</span>
                  </div>
                  <span className="font-body-sm text-[11px] text-outline">Kỷ lục: 21 ngày</span>
                </div>
                <div className="bg-surface-container-low rounded-xl p-space-sm flex flex-col justify-center">
                  <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-primary">auto_stories</span> Hán Tự
                    Thuần Thục{' '}
                  </span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="font-headline-md text-headline-md text-primary font-bold">128</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">chữ</span>
                  </div>
                  <span className="font-body-sm text-[11px] text-secondary font-semibold">SRS Burned: 42</span>
                </div>
                <div className="bg-surface-container-low rounded-xl p-space-sm flex flex-col justify-center">
                  <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-secondary">bolt</span> Công Lực Tích
                    Luỹ{' '}
                  </span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="font-headline-md text-headline-md text-secondary font-bold">2,450</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">XP</span>
                  </div>
                  <span className="font-body-sm text-[11px] text-outline">Top 3% toàn khoá</span>
                </div>
              </div>
              <div className="w-full lg:w-72 bg-surface-container-low p-space-sm rounded-xl flex flex-col justify-between gap-space-xs">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    Tiến Độ Lv.6 Tiến Sĩ
                  </span>
                  <span className="font-label-sm text-label-sm text-primary font-bold">81%</span>
                </div>
                <div className="w-full h-2.5 bg-surface-container-highest rounded-full overflow-hidden flex">
                  <div
                    className="h-full bg-primary-container rounded-full transition-all duration-700"
                    style={{ width: '81%' }}
                  ></div>
                </div>
                <div className="flex items-center justify-between font-body-sm text-body-sm">
                  <span className="text-on-surface-variant">2,450 XP</span>
                  <span className="text-on-surface font-semibold">Mục tiêu: 3,000 XP</span>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start">
            <div className="xl:col-span-8 flex flex-col gap-space-lg">
              <div className="flex flex-wrap items-center justify-between gap-space-sm pb-space-xs">
                <div
                  className="flex items-center gap-space-xs bg-surface-container-low p-1 rounded-xl"
                  id="filterTabGroup"
                >
                  <button
                    data-filter="all"
                    type="button"
                    onClick={() => setFlt(0)}
                    className={
                      flt === 0
                        ? 'px-space-md py-space-xs rounded-lg font-title-sm text-body-sm bg-surface-container-lowest text-primary shadow-sm font-bold transition-all filter-btn'
                        : 'px-space-md py-space-xs rounded-lg font-title-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-all filter-btn'
                    }
                  >
                    {' '}
                    Tất cả <span className="font-normal opacity-75">(24)</span>
                  </button>
                  <button
                    data-filter="unlocked"
                    type="button"
                    onClick={() => setFlt(1)}
                    className={
                      flt === 1
                        ? 'px-space-md py-space-xs rounded-lg font-title-sm text-body-sm bg-surface-container-lowest text-primary shadow-sm font-bold transition-all filter-btn'
                        : 'px-space-md py-space-xs rounded-lg font-title-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-all filter-btn'
                    }
                  >
                    {' '}
                    Đã đạt được <span className="font-normal opacity-75">(14)</span>
                  </button>
                  <button
                    data-filter="in-progress"
                    type="button"
                    onClick={() => setFlt(2)}
                    className={
                      flt === 2
                        ? 'px-space-md py-space-xs rounded-lg font-title-sm text-body-sm bg-surface-container-lowest text-primary shadow-sm font-bold transition-all filter-btn'
                        : 'px-space-md py-space-xs rounded-lg font-title-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-all filter-btn'
                    }
                  >
                    {' '}
                    Đang tiến hành <span className="font-normal opacity-75">(7)</span>
                  </button>
                  <button
                    data-filter="rare"
                    type="button"
                    onClick={() => setFlt(3)}
                    className={
                      flt === 3
                        ? 'px-space-md py-space-xs rounded-lg font-title-sm text-body-sm bg-surface-container-lowest text-primary shadow-sm font-bold transition-all filter-btn'
                        : 'px-space-md py-space-xs rounded-lg font-title-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-all filter-btn'
                    }
                  >
                    {' '}
                    Huân chương hiếm <span className="font-normal opacity-75">(3)</span>
                  </button>
                </div>
                <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[16px]">tune</span>
                  <span>Sắp xếp theo cấp bậc thư phòng</span>
                </div>
              </div>
              <section className="flex flex-col gap-space-md achievement-section" data-group="intro">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center font-display-character text-title-sm text-primary font-bold">
                      {' '}
                      始{' '}
                    </div>
                    <div>
                      <h3 className="font-headline-md text-headline-md text-on-surface">Khởi Điểm Nhập Môn</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Các cột mốc tích lũy kho từ vựng và chạm ngõ thư pháp chữ Hán.
                      </p>
                    </div>
                  </div>
                  <span className="font-label-sm text-label-sm px-space-sm py-space-xs bg-secondary-fixed text-on-secondary-fixed rounded-full font-bold">
                    2/3 Hoàn thành
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
                  <div
                    className="achievement-card bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-space-sm"
                    data-status="unlocked"
                    style={{ display: cardVisible(0) ? undefined : 'none' }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-sm">
                        <span className="material-symbols-outlined text-[28px]">mark_email_read</span>
                      </div>
                      <span className="inline-flex items-center gap-1 font-label-sm text-label-sm bg-secondary-fixed text-on-secondary-fixed font-bold px-2 py-0.5 rounded-full">
                        <span className="material-symbols-outlined text-[14px]">check</span> Đã đạt{' '}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-title-sm text-title-sm text-on-surface font-bold">Sơ Kiến Hán Tự</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                        Nạp và ghi nhớ 10 từ vựng đầu tiên vào bộ nhớ tạm.
                      </p>
                    </div>
                    <div className="pt-space-xs flex items-center justify-between">
                      <span className="font-label-sm text-label-sm text-secondary font-bold">+50 XP</span>
                      <span className="text-[11px] font-label-sm text-outline">Hoàn thành 04/10</span>
                    </div>
                  </div>
                  <div
                    className="achievement-card bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-space-sm"
                    data-status="unlocked"
                    style={{ display: cardVisible(1) ? undefined : 'none' }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-sm">
                        <span className="material-symbols-outlined text-[28px]">collections_bookmark</span>
                      </div>
                      <span className="inline-flex items-center gap-1 font-label-sm text-label-sm bg-secondary-fixed text-on-secondary-fixed font-bold px-2 py-0.5 rounded-full">
                        <span className="material-symbols-outlined text-[14px]">check</span> Đã đạt{' '}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-title-sm text-title-sm text-on-surface font-bold">Bách Tự Thông</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                        Chinh phục 100 chữ Hán căn bản đầu tiên vượt qua SRS Guru.
                      </p>
                    </div>
                    <div className="pt-space-xs flex items-center justify-between">
                      <span className="font-label-sm text-label-sm text-secondary font-bold">+150 XP</span>
                      <span className="text-[11px] font-label-sm text-outline">Hoàn thành 12/10</span>
                    </div>
                  </div>
                  <div
                    className="achievement-card bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-space-sm"
                    data-status="in-progress"
                    style={{ display: cardVisible(2) ? undefined : 'none' }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-xl bg-surface-container-high text-on-surface-variant flex items-center justify-center">
                        <span className="material-symbols-outlined text-[28px]">auto_stories</span>
                      </div>
                      <span className="font-label-sm text-label-sm bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded-full font-bold">
                        Đang tiến hành
                      </span>
                    </div>
                    <div>
                      <h4 className="font-title-sm text-title-sm text-on-surface font-bold">Thiên Tự Văn</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                        Chinh phục 1,000 chữ Hán toàn diện (HSK1 đến HSK4).
                      </p>
                      <div className="mt-space-sm flex flex-col gap-1">
                        <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: '24.5%' }}></div>
                        </div>
                        <div className="flex justify-between text-[11px] font-label-sm text-on-surface-variant">
                          <span>245 / 1,000 từ</span>
                          <span className="font-bold text-primary">24%</span>
                        </div>
                      </div>
                    </div>
                    <div className="pt-space-xs flex items-center justify-between">
                      <span className="font-label-sm text-label-sm text-primary font-bold">Thưởng +500 XP</span>
                      <span className="material-symbols-outlined text-outline text-[16px]">lock_clock</span>
                    </div>
                  </div>
                </div>
              </section>
              <section className="flex flex-col gap-space-md achievement-section" data-group="streak">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center font-display-character text-title-sm text-tertiary font-bold">
                      {' '}
                      恒{' '}
                    </div>
                    <div>
                      <h3 className="font-headline-md text-headline-md text-on-surface">Bền Bỉ Tu Luyện</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Giữ vững ngọn lửa kỷ luật và chuỗi ngày rèn luyện không ngắt quãng.
                      </p>
                    </div>
                  </div>
                  <span className="font-label-sm text-label-sm px-space-sm py-space-xs bg-tertiary-fixed text-on-tertiary-fixed rounded-full font-bold">
                    2/3 Mở khoá
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
                  <div
                    className="achievement-card bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-space-sm"
                    data-status="unlocked"
                    style={{ display: cardVisible(3) ? undefined : 'none' }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center shadow-sm">
                        <span
                          className="material-symbols-outlined text-[28px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          local_fire_department
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 font-label-sm text-label-sm bg-secondary-fixed text-on-secondary-fixed font-bold px-2 py-0.5 rounded-full">
                        <span className="material-symbols-outlined text-[14px]">check</span> Đã đạt{' '}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-title-sm text-title-sm text-on-surface font-bold">Thất Nhật Kỳ Tích</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                        Duy trì ôn tập liên tục 7 ngày liên tiếp không đứt gãy.
                      </p>
                    </div>
                    <div className="pt-space-xs flex items-center justify-between">
                      <span className="font-label-sm text-label-sm text-tertiary font-bold">+100 XP</span>
                      <span className="text-[11px] font-label-sm text-outline">Hoàn tất tuần trước</span>
                    </div>
                  </div>
                  <div
                    className="achievement-card relative bg-gradient-to-b from-primary-fixed/30 via-surface-container-lowest to-surface-container-lowest rounded-xl p-space-md shadow-md transition-all flex flex-col justify-between gap-space-sm scale-[1.01]"
                    data-status="unlocked"
                    style={{ display: cardVisible(4) ? undefined : 'none' }}
                  >
                    <div className="absolute -top-2.5 right-3 px-2 py-0.5 bg-primary text-on-primary rounded-full font-label-sm text-[10px] uppercase tracking-wider font-bold shadow-sm flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">celebration</span> Hôm nay{' '}
                    </div>
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shadow-sm">
                        <span
                          className="material-symbols-outlined text-[28px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          wb_twilight
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 font-label-sm text-label-sm bg-primary-fixed text-on-primary-fixed-variant font-bold px-2 py-0.5 rounded-full mt-2">
                        {' '}
                        Mở khoá 🎉{' '}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-title-sm text-title-sm text-primary font-bold">Thập Nhị Thiên Đăng</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                        Chuỗi 12 ngày thắp sáng đèn hàn thư liên tiếp.
                      </p>
                    </div>
                    <div className="pt-space-xs flex items-center justify-between">
                      <span className="font-label-sm text-label-sm text-primary font-bold">+200 XP Nhận Ngay</span>
                      <button
                        className="px-space-sm py-0.5 rounded bg-primary-container hover:bg-primary text-on-primary font-label-sm text-[11px] font-semibold transition-all"
                        type="button"
                      >
                        Chia sẻ
                      </button>
                    </div>
                  </div>
                  <div
                    className="achievement-card bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-space-sm"
                    data-status="in-progress"
                    style={{ display: cardVisible(5) ? undefined : 'none' }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-xl bg-surface-container-high text-on-surface-variant flex items-center justify-center">
                        <span className="material-symbols-outlined text-[28px]">waves</span>
                      </div>
                      <span className="font-label-sm text-label-sm bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded-full font-bold">
                        Đang tích lũy
                      </span>
                    </div>
                    <div>
                      <h4 className="font-title-sm text-title-sm text-on-surface font-bold">Nguyệt Vô Khuyết</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                        Chuỗi 30 ngày hoàn hảo trọn một vòng nguyệt tuần.
                      </p>
                      <div className="mt-space-sm flex flex-col gap-1">
                        <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                          <div className="h-full bg-tertiary" style={{ width: '40%' }}></div>
                        </div>
                        <div className="flex justify-between text-[11px] font-label-sm text-on-surface-variant">
                          <span>12 / 30 ngày</span>
                          <span className="font-bold text-tertiary">40%</span>
                        </div>
                      </div>
                    </div>
                    <div className="pt-space-xs flex items-center justify-between">
                      <span className="font-label-sm text-label-sm text-tertiary font-bold">Thưởng +600 XP</span>
                      <span className="text-[11px] font-label-sm text-outline">Còn 18 ngày</span>
                    </div>
                  </div>
                </div>
              </section>
              <section className="flex flex-col gap-space-md achievement-section" data-group="dimensions">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center font-display-character text-title-sm text-secondary font-bold">
                      {' '}
                      六{' '}
                    </div>
                    <div>
                      <h3 className="font-headline-md text-headline-md text-on-surface">Lục Chiều Toàn Năng</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Làm chủ đồng thời 6 chiều giác quan: Nhận diện, Nét bút, Nghe, Phát âm, Đặt câu và Phản xạ.
                      </p>
                    </div>
                  </div>
                  <span className="font-label-sm text-label-sm px-space-sm py-space-xs bg-secondary-fixed text-on-secondary-fixed rounded-full font-bold">
                    2/4 Đã đạt
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                  <div
                    className="achievement-card bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-space-sm"
                    data-status="unlocked"
                    style={{ display: cardVisible(6) ? undefined : 'none' }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-space-sm">
                        <div className="w-12 h-12 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-sm">
                          <span className="material-symbols-outlined text-[28px]">draw</span>
                        </div>
                        <div>
                          <h4 className="font-title-sm text-title-sm text-on-surface font-bold">Thuận Bút Như Thần</h4>
                          <span className="font-label-sm text-label-sm text-secondary font-bold">
                            Kỹ năng Viết (Stroke Order)
                          </span>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 font-label-sm text-label-sm bg-secondary-fixed text-on-secondary-fixed font-bold px-2 py-0.5 rounded-full">
                        <span className="material-symbols-outlined text-[14px]">check</span>
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Viết chuẩn xác 50 nét bút phức tạp liên tiếp không phạm lỗi quy tắc trước sau.
                    </p>
                    <div className="pt-space-xs flex items-center justify-between">
                      <span className="font-label-sm text-label-sm text-secondary font-bold">+180 XP</span>
                      <span className="text-[11px] font-label-sm text-outline">Độ chính xác: 98.4%</span>
                    </div>
                  </div>
                  <div
                    className="achievement-card bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-space-sm"
                    data-status="unlocked"
                    style={{ display: cardVisible(7) ? undefined : 'none' }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-space-sm">
                        <div className="w-12 h-12 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-sm">
                          <span className="material-symbols-outlined text-[28px]">hearing</span>
                        </div>
                        <div>
                          <h4 className="font-title-sm text-title-sm text-on-surface font-bold">Bách Nhĩ Biến Điệu</h4>
                          <span className="font-label-sm text-label-sm text-secondary font-bold">
                            Kỹ năng Nghe (Tone Sandhi)
                          </span>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 font-label-sm text-label-sm bg-secondary-fixed text-on-secondary-fixed font-bold px-2 py-0.5 rounded-full">
                        <span className="material-symbols-outlined text-[14px]">check</span>
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Đạt 100% bài nghe phân biệt quy tắc biến điệu thanh 3 và thanh nhẹ.
                    </p>
                    <div className="pt-space-xs flex items-center justify-between">
                      <span className="font-label-sm text-label-sm text-secondary font-bold">+150 XP</span>
                      <span className="text-[11px] font-label-sm text-outline">Thính lực cấp HSK3</span>
                    </div>
                  </div>
                  <div
                    className="achievement-card bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-space-sm"
                    data-status="in-progress"
                    style={{ display: cardVisible(8) ? undefined : 'none' }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-space-sm">
                        <div className="w-12 h-12 rounded-xl bg-surface-container-high text-on-surface-variant flex items-center justify-center">
                          <span className="material-symbols-outlined text-[28px]">psychology</span>
                        </div>
                        <div>
                          <h4 className="font-title-sm text-title-sm text-on-surface font-bold">Văn Ý Tương Thông</h4>
                          <span className="font-label-sm text-label-sm text-primary font-bold">
                            Ứng Dụng Ngữ Cảnh AI
                          </span>
                        </div>
                      </div>
                      <span className="font-label-sm text-label-sm bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded-full font-bold">
                        38/50
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      {'Tự đặt 50 câu hoàn chỉnh bằng từ vựng đã học được AI đánh giá độ tự nhiên >90%.'}
                    </p>
                    <div className="flex flex-col gap-1">
                      <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: '76%' }}></div>
                      </div>
                      <div className="flex justify-between text-[11px] font-label-sm text-on-surface-variant">
                        <span>Còn 12 câu mẫu</span>
                        <span className="font-bold text-primary">76%</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="achievement-card bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-space-sm"
                    data-status="in-progress"
                    style={{ display: cardVisible(9) ? undefined : 'none' }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-space-sm">
                        <div className="w-12 h-12 rounded-xl bg-surface-container-high text-on-surface-variant flex items-center justify-center">
                          <span className="material-symbols-outlined text-[28px]">record_voice_over</span>
                        </div>
                        <div>
                          <h4 className="font-title-sm text-title-sm text-on-surface font-bold">Khẩu Khí Bản Xứ</h4>
                          <span className="font-label-sm text-label-sm text-tertiary font-bold">Ngữ Âm Bản Địa</span>
                        </div>
                      </div>
                      <span className="font-label-sm text-label-sm bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded-full font-bold">
                        19/30
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      {'Phát âm AI chấm thanh điệu đạt >90 điểm cho 30 câu đàm thoại phức hợp.'}
                    </p>
                    <div className="flex flex-col gap-1">
                      <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                        <div className="h-full bg-tertiary" style={{ width: '63.3%' }}></div>
                      </div>
                      <div className="flex justify-between text-[11px] font-label-sm text-on-surface-variant">
                        <span>19 / 30 câu đạt chuẩn</span>
                        <span className="font-bold text-tertiary">63%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section className="flex flex-col gap-space-md achievement-section" data-group="legends">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center font-display-character text-title-sm text-primary font-bold">
                      {' '}
                      神{' '}
                    </div>
                    <div>
                      <h3 className="font-headline-md text-headline-md text-on-surface">Huyền Thoại Trí Nhớ</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Các huân chương vàng cao quý dành cho học giả kiểm soát đường cong lãng quên SuperMemo.
                      </p>
                    </div>
                  </div>
                  <span className="font-label-sm text-label-sm px-space-sm py-space-xs bg-tertiary-fixed text-on-tertiary-fixed rounded-full font-bold">
                    Hạng Vàng
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                  <div
                    className="achievement-card relative bg-surface-container-lowest rounded-xl p-space-md shadow-md hover:shadow-xl transition-all flex flex-col justify-between gap-space-sm overflow-hidden"
                    data-rarity="rare"
                    data-status="unlocked"
                    style={{ display: cardVisible(10) ? undefined : 'none' }}
                  >
                    <div className="absolute -right-8 -bottom-8 w-28 h-28 rounded-full bg-tertiary-fixed/30 pointer-events-none blur-xl"></div>
                    <div className="flex items-start justify-between">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-tertiary-container via-tertiary to-on-tertiary-fixed flex items-center justify-center shadow-lg text-tertiary-fixed">
                        <span
                          className="material-symbols-outlined text-[32px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          neurology
                        </span>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="font-label-sm text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed shadow-sm">
                          Huân Chương Vàng
                        </span>
                        <span className="text-[11px] font-label-sm text-secondary font-bold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">verified</span> Đã mở khoá{' '}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-headline-md text-headline-md text-on-surface font-bold">
                        Ebbinghaus Bất Diệt
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                        {
                          'Giữ vững tỷ lệ lưu giữ trí nhớ thực tế >90% trong suốt 14 ngày liên tục với thuật toán Anki/SuperMemo.'
                        }
                      </p>
                    </div>
                    <div className="p-space-xs rounded-lg bg-surface-container-low flex items-center justify-between">
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Tỷ lệ chính xác ghi nhận:
                      </span>
                      <span className="font-title-sm text-title-sm text-secondary font-bold">94.2%</span>
                    </div>
                    <div className="pt-space-xs flex items-center justify-between">
                      <span className="font-label-sm text-label-sm text-tertiary font-bold">+300 XP Tinh Anh</span>
                      <span className="text-[11px] font-label-sm text-outline">Chỉ 4% học giả đạt được</span>
                    </div>
                  </div>
                  <div
                    className="achievement-card relative bg-surface-container-lowest rounded-xl p-space-md shadow-md hover:shadow-xl transition-all flex flex-col justify-between gap-space-sm"
                    data-rarity="rare"
                    data-status="unlocked"
                    style={{ display: cardVisible(11) ? undefined : 'none' }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center shadow-lg text-on-secondary">
                        <span
                          className="material-symbols-outlined text-[32px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          restore
                        </span>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="font-label-sm text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed shadow-sm">
                          Tốc Chiến SRS
                        </span>
                        <span className="text-[11px] font-label-sm text-secondary font-bold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">verified</span> Đã mở khoá{' '}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-headline-md text-headline-md text-on-surface font-bold">Hồi Sinh Kịp Thời</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                        Ôn tập và giải quyết triệt để 100 từ vựng chạm ngưỡng đến hạn (Due Review) chỉ trong 1 ngày duy
                        nhất.
                      </p>
                    </div>
                    <div className="p-space-xs rounded-lg bg-surface-container-low flex items-center justify-between">
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Kỷ lục xử lý:</span>
                      <span className="font-title-sm text-title-sm text-primary font-bold">114 từ / ngày</span>
                    </div>
                    <div className="pt-space-xs flex items-center justify-between">
                      <span className="font-label-sm text-label-sm text-secondary font-bold">+250 XP Tinh Anh</span>
                      <span className="text-[11px] font-label-sm text-outline">Hoàn thành hôm qua</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className="xl:col-span-4 flex flex-col gap-space-lg">
              <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-md flex flex-col gap-space-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-xs">
                    <span
                      className="material-symbols-outlined text-primary text-[22px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      leaderboard
                    </span>
                    <h3 className="font-headline-md text-headline-md text-on-surface">Đồng Môn Tuần Này</h3>
                  </div>
                  <span className="font-label-sm text-label-sm text-secondary font-bold px-2 py-0.5 rounded-full bg-secondary-fixed">
                    Bảng Tuần 42
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Xếp hạng dựa trên lượng XP tu luyện và độ chuẩn xác SRS trong 7 ngày qua.
                </p>
                <div className="flex flex-col gap-space-xs">
                  <div className="flex items-center justify-between p-space-sm rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-7 h-7 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-title-sm text-body-sm font-bold flex items-center justify-center">
                        {' '}
                        1{' '}
                      </div>
                      <div className="w-9 h-9 rounded-full bg-primary-fixed flex items-center justify-center font-display-character text-title-sm text-primary font-bold">
                        {' '}
                        龙{' '}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-title-sm text-title-sm text-on-surface font-semibold">Hoàng Long</span>
                        <span className="font-label-sm text-[11px] text-on-surface-variant">Lv.7 Thái Học Sinh</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-title-sm text-title-sm text-primary font-bold">2,890 XP</span>
                      <span className="text-[11px] font-label-sm text-secondary">🔥 28 Ngày</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-space-sm rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-7 h-7 rounded-full bg-surface-container-highest text-on-surface-variant font-title-sm text-body-sm font-bold flex items-center justify-center">
                        {' '}
                        2{' '}
                      </div>
                      <div className="w-9 h-9 rounded-full bg-secondary-fixed flex items-center justify-center font-display-character text-title-sm text-secondary font-bold">
                        {' '}
                        玉{' '}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-title-sm text-title-sm text-on-surface font-semibold">Bích Ngọc</span>
                        <span className="font-label-sm text-[11px] text-on-surface-variant">Lv.6 Học Sĩ</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-title-sm text-title-sm text-primary font-bold">2,620 XP</span>
                      <span className="text-[11px] font-label-sm text-secondary">🔥 19 Ngày</span>
                    </div>
                  </div>
                  <div className="relative flex items-center justify-between p-space-sm rounded-xl bg-primary-fixed/40 shadow-sm">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-7 h-7 rounded-full bg-primary text-on-primary font-title-sm text-body-sm font-bold flex items-center justify-center shadow-xs">
                        {' '}
                        3{' '}
                      </div>
                      <div className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center font-display-character text-title-sm font-bold">
                        {' '}
                        君{' '}
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                          <span className="font-title-sm text-title-sm text-primary font-bold">Minh Quân</span>
                          <span className="text-[10px] px-1 rounded bg-primary text-on-primary font-label-sm">Bạn</span>
                        </div>
                        <span className="font-label-sm text-[11px] text-on-primary-fixed-variant">Lv.5 Cử Nhân</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-title-sm text-title-sm text-primary font-bold">2,450 XP</span>
                      <span className="text-[11px] font-label-sm text-secondary font-bold">🔥 12 Ngày</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-space-sm rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-7 h-7 rounded-full bg-surface-container-highest text-on-surface-variant font-title-sm text-body-sm font-bold flex items-center justify-center">
                        {' '}
                        4{' '}
                      </div>
                      <div className="w-9 h-9 rounded-full bg-surface-container-highest flex items-center justify-center font-display-character text-title-sm text-on-surface-variant font-bold">
                        {' '}
                        敏{' '}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-title-sm text-title-sm text-on-surface font-semibold">Tuệ Mẫn</span>
                        <span className="font-label-sm text-[11px] text-on-surface-variant">Lv.5 Cử Nhân</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-title-sm text-title-sm text-on-surface font-bold">2,110 XP</span>
                      <span className="text-[11px] font-label-sm text-outline">🔥 8 Ngày</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-space-sm rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-7 h-7 rounded-full bg-surface-container-highest text-on-surface-variant font-title-sm text-body-sm font-bold flex items-center justify-center">
                        {' '}
                        5{' '}
                      </div>
                      <div className="w-9 h-9 rounded-full bg-surface-container-highest flex items-center justify-center font-display-character text-title-sm text-on-surface-variant font-bold">
                        {' '}
                        科{' '}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-title-sm text-title-sm text-on-surface font-semibold">Anh Khoa</span>
                        <span className="font-label-sm text-[11px] text-on-surface-variant">Lv.4 Tú Tài</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-title-sm text-title-sm text-on-surface font-bold">1,980 XP</span>
                      <span className="text-[11px] font-label-sm text-outline">🔥 14 Ngày</span>
                    </div>
                  </div>
                </div>
                <div className="p-space-sm rounded-xl bg-secondary-fixed/30 flex items-center justify-between text-body-sm">
                  <span className="text-on-secondary-fixed-variant">Cách Top 2 (Bích Ngọc):</span>
                  <span className="font-bold text-secondary">Chỉ còn 170 XP</span>
                </div>
              </div>
              <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-md flex flex-col gap-space-md">
                <div className="flex items-center justify-between">
                  <h4 className="font-title-sm text-title-sm text-on-surface font-bold">Cân Bằng Lục Giác</h4>
                  <span className="font-label-sm text-label-sm text-primary font-bold">92% Đồng Đều</span>
                </div>
                <p className="font-body-sm text-[13px] text-on-surface-variant">
                  Biểu đồ đánh giá mức độ đồng đều giữa các giác quan luyện tập.
                </p>
                <div className="relative w-full flex items-center justify-center py-space-xs">
                  <svg className="w-56 h-56 text-surface-container-highest" fill="none" viewBox="0 0 200 200">
                    <polygon
                      points="100,15 173,57 173,142 100,185 26,142 26,57"
                      stroke="currentColor"
                      strokeDasharray="3 3"
                      strokeWidth="1.5"
                    ></polygon>
                    <polygon
                      points="100,45 148,73 148,127 100,155 51,127 51,73"
                      stroke="currentColor"
                      strokeWidth="1"
                    ></polygon>
                    <polygon
                      points="100,70 126,85 126,115 100,130 74,115 74,85"
                      stroke="currentColor"
                      strokeWidth="1"
                    ></polygon>
                    <line stroke="currentColor" strokeWidth="1" x1="100" x2="100" y1="100" y2="15"></line>
                    <line stroke="currentColor" strokeWidth="1" x1="100" x2="173" y1="100" y2="57"></line>
                    <line stroke="currentColor" strokeWidth="1" x1="100" x2="173" y1="100" y2="142"></line>
                    <line stroke="currentColor" strokeWidth="1" x1="100" x2="100" y1="100" y2="185"></line>
                    <line stroke="currentColor" strokeWidth="1" x1="100" x2="26" y1="100" y2="142"></line>
                    <line stroke="currentColor" strokeWidth="1" x1="100" x2="26" y1="100" y2="57"></line>
                    <polygon
                      fill="#be123c"
                      fillOpacity="0.22"
                      points="100,28 162,64 150,135 100,172 40,130 38,62"
                      stroke="#be123c"
                      strokeWidth="2.5"
                    ></polygon>
                    <circle cx="100" cy="28" fill="#be123c" r="4" />
                    <circle cx="162" cy="64" fill="#be123c" r="4" />
                    <circle cx="150" cy="135" fill="#be123c" r="4" />
                    <circle cx="100" cy="172" fill="#be123c" r="4" />
                    <circle cx="40" cy="130" fill="#be123c" r="4" />
                    <circle cx="38" cy="62" fill="#be123c" r="4" />
                  </svg>
                  <span className="absolute top-0 text-[10px] font-label-sm font-bold text-on-surface">Nhận diện</span>
                  <span className="absolute top-10 right-2 text-[10px] font-label-sm font-bold text-on-surface">
                    Nét bút
                  </span>
                  <span className="absolute bottom-10 right-2 text-[10px] font-label-sm font-bold text-on-surface">
                    Nghe hiểu
                  </span>
                  <span className="absolute bottom-0 text-[10px] font-label-sm font-bold text-on-surface">Phát âm</span>
                  <span className="absolute bottom-10 left-3 text-[10px] font-label-sm font-bold text-on-surface">
                    Ngữ cảnh
                  </span>
                  <span className="absolute top-10 left-3 text-[10px] font-label-sm font-bold text-on-surface">
                    Phản xạ
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-label-sm text-on-surface-variant pt-space-xs">
                  <span>
                    Điểm mạnh nhất: <strong>Nét bút (98%)</strong>
                  </span>
                  <span>
                    Cần bổ sung: <strong>Phát âm (63%)</strong>
                  </span>
                </div>
              </div>
              <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-md flex flex-col gap-space-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-xs">
                    <span
                      className="material-symbols-outlined text-tertiary text-[22px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      redeem
                    </span>
                    <h3 className="font-headline-md text-headline-md text-on-surface">Bảo Các Hàn Lâm</h3>
                  </div>
                  <span className="font-label-sm text-label-sm text-tertiary font-bold">2,450 XP Khả Dụng</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Đổi điểm công lực XP tích luỹ để sở hữu các mẫu bút tích thư pháp cổ phong và huy hiệu phong ấn bài
                  danh.
                </p>
                <div className="p-space-sm rounded-xl bg-surface-container-low flex items-center justify-between gap-space-sm">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-12 h-12 rounded-xl bg-surface-container-highest overflow-hidden flex items-center justify-center">
                      <img
                        className="w-full h-full object-cover"
                        data-alt="Traditional Chinese calligraphy ink stone and wolf-hair brush lying on aged parchment paper with delicate crimson seal stamp in a scholar study with warm ambient lighting"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwb340QT3irGTnxj0VaJkhZ_xXqu0CdDQ1ICDww9XlHRPp2jRnBgqL2ULTVyawkh6dhTA8HgPuFoPTAJxEYXp2dswgw2TVI3bSp5ySFJpxgZlwxD_yzS7xQ85voGOqoWfxjp-ls2a_Oj_TjPtwAKs4tpHWbaEm8rBtmGXX3vO-LSaSZSRSeBjzvIkcOxVxEgRWq_ReTFN18T40SwaiPbnOGyObGR1TLoigEzwFWK2LVC1NZ3d7eOmd"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                        Giao Diện Khải Thư Cổ
                      </span>
                      <span className="font-body-sm text-[12px] text-on-surface-variant">
                        Bút tích mực nho vương triều Đường
                      </span>
                    </div>
                  </div>
                  <button
                    className="px-space-md py-space-xs rounded-lg bg-surface-container-highest hover:bg-primary-container hover:text-on-primary text-on-surface font-label-sm text-label-sm font-bold transition-colors"
                    type="button"
                  >
                    {' '}
                    1,500 XP{' '}
                  </button>
                </div>
                <div className="p-space-sm rounded-xl bg-surface-container-low flex items-center justify-between gap-space-sm">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-12 h-12 rounded-xl bg-surface-container-highest overflow-hidden flex items-center justify-center">
                      <img
                        className="w-full h-full object-cover"
                        data-alt="Ancient Imperial scholar seal carved out of natural translucent emerald jade with ornate dragon motif engraving resting on red ink velvet"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC87NXcFRJKEsLorLuFD5oTeRIbzco2H8Pv6lcmBU3HJIdKl7IcVjpK6BQck1SDygubfpEBbE3RfZQgQPCVCIEErk47XLs689sWNHXhugW-csuPInd_DZ0qjUmwracRxhemd9t1hZ5ZcyNxuCkDdPBTsNd6oand29BIGo5EMuzH2e0ghkNuxP7smLKsbBPJBnLC2AEJolM0CpMRVVH2Chher4FGfB0nsZRMteNBmFTjLIcQP77gXMgv"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                        Ấn Tín Phỉ Thúy Hàn Lâm
                      </span>
                      <span className="font-body-sm text-[12px] text-on-surface-variant">
                        Dấu triện phong danh kế bên Avatar
                      </span>
                    </div>
                  </div>
                  <button
                    className="px-space-md py-space-xs rounded-lg bg-primary-container text-on-primary font-label-sm text-label-sm font-bold shadow-sm hover:bg-primary transition-all"
                    type="button"
                  >
                    {' '}
                    2,000 XP{' '}
                  </button>
                </div>
                <div className="p-space-sm rounded-xl bg-surface-container-low flex items-center justify-between gap-space-sm">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-12 h-12 rounded-xl bg-surface-container-highest overflow-hidden flex items-center justify-center">
                      <img
                        className="w-full h-full object-cover"
                        data-alt="Classical Chinese wooden library shelf filled with stitched scroll books and ancient porcelain tea cup bathed in serene morning sun rays"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnvT7ZDebQIAs4dhTmdWGVbc8ViF9we6rThIQNUI_8cgGz6YV4QeVi_7mPnkITOgy3UFT2QGZIfMHHzNZyR5fe5TYiX6hNTxIHqvR96TLBYKlqBfPJaCZfwGcmcxC9t3mxsAaJAOTSK6qjTy5rCtTxZprh-Uhad7CQFR9UjAvD62LOHJALhHauYc4Dahq3865krVfTrXfOT9dtguhwajqIKQo96nNBiAILi-xLEFkq1NeFvU9mhiNx"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                        Thanh Âm Cổ Cầm Luyện Tập
                      </span>
                      <span className="font-body-sm text-[12px] text-on-surface-variant">
                        Nhạc nền đàn tranh tập trung sóng não α
                      </span>
                    </div>
                  </div>
                  <button
                    className="px-space-md py-space-xs rounded-lg bg-surface-container-highest text-outline font-label-sm text-label-sm font-bold cursor-not-allowed"
                    type="button"
                  >
                    {' '}
                    3,200 XP{' '}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
