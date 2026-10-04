import { Link, useNavigate } from 'react-router-dom';
import AppShell from '../layouts/AppShell';
import { useState } from 'react';
const CATS = ['srs', 'ai', 'achievement', 'srs', 'srs'];
const TAB_CATS = ['all', 'srs', 'achievement', 'ai'];

export default function NotificationsPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const show = (i: number) => TAB_CATS[tab] === 'all' || CATS[i] === TAB_CATS[tab];

  return (
    <AppShell>
      <div className="flex flex-col w-full gap-space-lg pb-space-xl">
        <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm p-space-lg lg:p-space-xl">
          <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none select-none font-display-character text-[180px] text-primary leading-none">
            {' '}
            省{' '}
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md relative z-10">
            <div className="flex flex-col gap-space-xs">
              <div className="flex items-center gap-space-xs text-primary font-label-sm uppercase tracking-widest">
                <span className="inline-block w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
                <span>Khảo Thư Các • Hệ Thống Trí Nhớ FSRS-v4.5</span>
              </div>
              <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
                {' '}
                Thông Báo Học Viện &amp; Lịch Trình Nhắc Ôn Ký Ức{' '}
              </h1>
              <p className="font-body-md text-on-surface-variant max-w-3xl">
                {' '}
                Theo dõi sát sao từng chu kỳ suy giảm đường cong Ebbinghaus. Điều chỉnh nhịp điệu tiếp thu Hán tự qua
                thuật toán lặp lại ngắt quãng tối ưu theo năng lực cá nhân.{' '}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-space-sm pt-space-xs lg:pt-0">
              <button
                className="inline-flex items-center gap-space-xs px-space-md py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-title-sm transition-all shadow-sm active:scale-95"
                id="markAllReadBtn"
              >
                <span className="material-symbols-outlined text-base text-primary">done_all</span>
                <span>Đánh dấu đã đọc</span>
              </button>
              <button
                className="inline-flex items-center gap-space-xs px-space-md py-2.5 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-title-sm transition-all shadow-sm hover:shadow-md active:scale-95"
                id="configModalTrigger"
                onClick={() => navigate('/settings')}
              >
                <span className="material-symbols-outlined text-base">tune</span>
                <span>Cấu hình kênh nhận tin</span>
              </button>
            </div>
          </div>
          <div className="mt-space-lg flex flex-wrap items-center gap-space-xs pt-space-md">
            <button
              data-filter="all"
              onClick={() => setTab(0)}
              className={
                tab === 0
                  ? 'tab-btn px-space-md py-2 rounded-full font-label-md transition-all bg-primary-container text-on-primary shadow-sm'
                  : 'tab-btn px-space-md py-2 rounded-full font-label-md transition-all bg-surface-container-low hover:bg-surface-container text-on-surface-variant'
              }
            >
              {' '}
              Tất Cả (14){' '}
            </button>
            <button
              data-filter="srs"
              onClick={() => setTab(1)}
              className={
                tab === 1
                  ? 'tab-btn px-space-md py-2 rounded-full font-label-md transition-all bg-primary-container text-on-primary shadow-sm'
                  : 'tab-btn px-space-md py-2 rounded-full font-label-md transition-all bg-surface-container-low hover:bg-surface-container text-on-surface-variant'
              }
            >
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary-container"></span> Nhắc Ôn SRS Đến Hạn (6){' '}
              </span>
            </button>
            <button
              data-filter="achievement"
              onClick={() => setTab(2)}
              className={
                tab === 2
                  ? 'tab-btn px-space-md py-2 rounded-full font-label-md transition-all bg-primary-container text-on-primary shadow-sm'
                  : 'tab-btn px-space-md py-2 rounded-full font-label-md transition-all bg-surface-container-low hover:bg-surface-container text-on-surface-variant'
              }
            >
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-secondary"></span> Thành Tích &amp; XP (4){' '}
              </span>
            </button>
            <button
              data-filter="ai"
              onClick={() => setTab(3)}
              className={
                tab === 3
                  ? 'tab-btn px-space-md py-2 rounded-full font-label-md transition-all bg-primary-container text-on-primary shadow-sm'
                  : 'tab-btn px-space-md py-2 rounded-full font-label-md transition-all bg-surface-container-low hover:bg-surface-container text-on-surface-variant'
              }
            >
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-tertiary"></span> AI Đánh Giá &amp; Góp Ý (4){' '}
              </span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          <div className="lg:col-span-8 flex flex-col gap-space-lg">
            <div className="flex flex-col gap-space-sm" data-section="today">
              <div className="flex items-center justify-between px-space-xs">
                <div className="flex items-center gap-space-xs">
                  <span className="font-display-character text-headline-md text-primary font-bold">今</span>
                  <span className="font-label-md uppercase tracking-widest text-on-surface font-bold">
                    Hôm Nay • 24 Tháng 10
                  </span>
                </div>
                <span className="font-label-sm text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded-full">
                  3 thông báo mới
                </span>
              </div>
              <article
                className="group relative rounded-xl bg-surface-container-lowest p-space-lg shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-space-md overflow-hidden"
                data-category="srs"
                style={{ display: show(0) ? undefined : 'none' }}
              >
                <div className="w-1.5 absolute left-0 top-0 bottom-0 bg-primary-container"></div>
                <div className="flex-shrink-0 flex sm:flex-col items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary-fixed text-primary shadow-inner">
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    alarm
                  </span>
                </div>
                <div className="flex-1 flex flex-col justify-between gap-space-sm min-w-0">
                  <div className="flex flex-col gap-space-xs">
                    <div className="flex flex-wrap items-center justify-between gap-space-xs">
                      <div className="flex items-center gap-space-xs">
                        <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm uppercase tracking-wider">
                          {' '}
                          Ưu tiên cao • SRS Tới Hạn{' '}
                        </span>
                        <span className="font-body-sm text-on-surface-variant">18:30 (15 phút trước)</span>
                      </div>
                      <span className="w-2.5 h-2.5 rounded-full bg-primary-container" title="Chưa đọc"></span>
                    </div>
                    <h2 className="font-title-sm text-headline-md text-on-surface font-bold pt-1">
                      {' '}
                      Đợt ôn tập buổi tối: 44 Hán tự đang rơi vào vùng quên Ebbinghaus!{' '}
                    </h2>
                    <p className="font-body-md text-on-surface-variant leading-relaxed">
                      {' '}
                      Các bộ thủ liên quan đến Thủy (氵) và Hỏa (灬) đang ở ngưỡng phân hủy trí nhớ 38%. Hoàn thành
                      trước <strong className="text-primary font-bold">22:00</strong> hôm nay để bảo toàn chuỗi{' '}
                      <span className="font-bold text-tertiary">12 ngày Streak</span> liên tục.{' '}
                    </p>
                  </div>
                  <div className="bg-surface-container-low rounded-lg p-space-sm flex flex-col sm:flex-row items-center justify-between gap-space-sm">
                    <div className="flex items-center gap-space-sm w-full sm:w-auto">
                      <svg className="w-16 h-8 text-primary overflow-visible" viewBox="0 0 64 32">
                        <path
                          d="M 2 4 C 18 4, 30 24, 62 28"
                          fill="none"
                          opacity="0.3"
                          stroke="currentColor"
                          strokeDasharray="2 2"
                          strokeWidth="2.5"
                        />
                        <path d="M 2 4 C 18 4, 26 12, 38 16" fill="none" stroke="currentColor" strokeWidth="2.5" />
                        <circle className="fill-primary animate-ping" cx="38" cy="16" r="3.5" />
                        <circle className="fill-primary" cx="38" cy="16" r="3" />
                      </svg>
                      <div className="flex flex-col">
                        <span className="font-label-sm text-on-surface">Điểm rơi trí nhớ: 38%</span>
                        <span className="font-body-sm text-on-surface-variant text-xs">
                          Cần kích hoạt lại tế bào nhớ
                        </span>
                      </div>
                    </div>
                    <Link
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-md py-2 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-title-sm transition-all shadow-sm"
                      to="/review"
                    >
                      <span>Vào Ôn Ngay [44 Từ]</span>
                      <span className="material-symbols-outlined text-base">bolt</span>
                    </Link>
                  </div>
                </div>
              </article>
              <article
                className="group relative rounded-xl bg-surface-container-lowest p-space-lg shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-space-md overflow-hidden"
                data-category="ai"
                style={{ display: show(1) ? undefined : 'none' }}
              >
                <div className="w-1.5 absolute left-0 top-0 bottom-0 bg-tertiary"></div>
                <div className="flex-shrink-0 flex sm:flex-col items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-tertiary-fixed text-tertiary shadow-inner">
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    psychology
                  </span>
                </div>
                <div className="flex-1 flex flex-col justify-between gap-space-sm min-w-0">
                  <div className="flex flex-col gap-space-xs">
                    <div className="flex flex-wrap items-center justify-between gap-space-xs">
                      <div className="flex items-center gap-space-xs">
                        <span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm uppercase tracking-wider">
                          {' '}
                          AI Khảo Thư Điểm Luận{' '}
                        </span>
                        <span className="font-body-sm text-on-surface-variant">14:15 • Bài tập Đặt câu HSK4</span>
                      </div>
                      <span className="w-2.5 h-2.5 rounded-full bg-primary-container" title="Chưa đọc"></span>
                    </div>
                    <h2 className="font-title-sm text-headline-md text-on-surface font-bold pt-1">
                      {' '}
                      AI Grammar Scorer đã hoàn tất phân tích bài đặt câu: Đạt 96/100 điểm{' '}
                    </h2>
                    <p className="font-body-md text-on-surface-variant leading-relaxed">
                      {' '}
                      Cấu trúc câu chữ 把 (<span className="font-display-character text-base">把书放在桌子上</span>) và
                      trợ từ phó từ 地 được vận dụng tự nhiên như bản ngữ. AI đề xuất thay thế từ <em>“看”</em> bằng{' '}
                      <em>“翻阅”</em> để nâng phong cách hàn lâm.{' '}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-xs">
                    <div className="flex items-center gap-space-sm">
                      <span className="font-label-sm px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-bold">
                        HSK 4+
                      </span>
                      <span className="font-label-sm text-secondary font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">auto_awesome</span> +45 XP Hàn Lâm{' '}
                      </span>
                    </div>
                    <button
                      className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md transition-all"
                      onClick={() => navigate('/practice/sentence-creation')}
                    >
                      <span>Xem Nhận Xét Chi Tiết</span>
                      <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </article>
              <article
                className="group relative rounded-xl bg-surface-container-lowest p-space-lg shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-space-md overflow-hidden"
                data-category="achievement"
                style={{ display: show(2) ? undefined : 'none' }}
              >
                <div className="w-1.5 absolute left-0 top-0 bottom-0 bg-secondary"></div>
                <div className="flex-shrink-0 flex sm:flex-col items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-secondary-container text-secondary shadow-inner">
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    military_tech
                  </span>
                </div>
                <div className="flex-1 flex flex-col justify-between gap-space-sm min-w-0">
                  <div className="flex flex-col gap-space-xs">
                    <div className="flex flex-wrap items-center justify-between gap-space-xs">
                      <div className="flex items-center gap-space-xs">
                        <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm uppercase tracking-wider">
                          {' '}
                          Thăng Cấp Huân Chương{' '}
                        </span>
                        <span className="font-body-sm text-on-surface-variant">09:00</span>
                      </div>
                      <span className="font-label-sm text-secondary font-bold">Hoàn tất</span>
                    </div>
                    <h2 className="font-title-sm text-headline-md text-on-surface font-bold pt-1">
                      {' '}
                      Chúc mừng Minh Quân vừa mở khóa danh hiệu “Bậc Thầy Nét Bút”{' '}
                    </h2>
                    <p className="font-body-md text-on-surface-variant leading-relaxed">
                      {' '}
                      Đạt mốc viết chuẩn xác 100 chữ Hán liên tiếp trên hệ thống lưới Cửu Cung Cách mà không cần gợi ý
                      thứ tự nét. Bạn nhận được con dấu Chu Sa danh dự trong hồ sơ học giả.{' '}
                    </p>
                  </div>
                  <div className="flex items-center gap-space-md pt-space-xs">
                    <div className="flex items-center gap-space-xs text-primary font-display-character text-sm font-bold bg-primary-fixed/40 px-3 py-1 rounded">
                      <span>印</span>
                      <span className="font-label-sm font-sans text-primary">Triện son • Bút Lực Quán Triệt</span>
                    </div>
                    <span className="font-label-sm text-on-surface-variant">• Cấp bậc SRS: Guru Lv.3</span>
                  </div>
                </div>
              </article>
            </div>
            <div className="flex flex-col gap-space-sm mt-space-md" data-section="earlier">
              <div className="flex items-center justify-between px-space-xs">
                <div className="flex items-center gap-space-xs">
                  <span className="font-display-character text-headline-md text-on-surface-variant font-bold">昨</span>
                  <span className="font-label-md uppercase tracking-widest text-on-surface-variant font-bold">
                    Hôm Qua &amp; Tuần Này
                  </span>
                </div>
                <span className="font-label-sm text-on-surface-variant">Lưu trữ 7 ngày gần nhất</span>
              </div>
              <article
                className="group relative rounded-xl bg-surface-container-lowest p-space-lg shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-space-md overflow-hidden opacity-95"
                data-category="srs"
                style={{ display: show(3) ? undefined : 'none' }}
              >
                <div className="flex-shrink-0 flex sm:flex-col items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-surface-container text-on-surface-variant">
                  <span className="material-symbols-outlined text-2xl">compare_arrows</span>
                </div>
                <div className="flex-1 flex flex-col justify-between gap-space-sm min-w-0">
                  <div className="flex flex-col gap-space-xs">
                    <div className="flex flex-wrap items-center justify-between gap-space-xs">
                      <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm uppercase tracking-wider">
                        {' '}
                        Cảnh Báo Bẫy Chữ • Tự Động Drill{' '}
                      </span>
                      <span className="font-body-sm text-on-surface-variant">Hôm qua 16:40</span>
                    </div>
                    <h2 className="font-title-sm text-headline-md text-on-surface font-bold pt-1">
                      {' '}
                      Phát hiện xu hướng nhầm lẫn cặp chữ 考 (Khảo) và 老 (Lão){' '}
                    </h2>
                    <p className="font-body-md text-on-surface-variant leading-relaxed">
                      {' '}
                      Tỷ lệ phân vân tăng 42% ở bài trắc nghiệm lật nhanh. Hệ thống đã bổ sung 8 thẻ đối chiếu dị biệt
                      tự hình vào hàng đợi tái củng cố sau 24 giờ.{' '}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-space-xs">
                    <div className="flex items-center gap-space-sm">
                      <span className="font-display-character text-headline-md text-primary">考</span>
                      <span className="text-on-surface-variant">↔</span>
                      <span className="font-display-character text-headline-md text-on-surface">老</span>
                      <span className="text-xs text-on-surface-variant pl-2 font-body-sm">
                        (Khác biệt nét ngoặc dưới cuối cùng)
                      </span>
                    </div>
                    <Link
                      className="text-primary font-label-md hover:underline inline-flex items-center gap-1"
                      to="/practice/fill-blank"
                    >
                      {' '}
                      Luyện bẫy chữ <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </Link>
                  </div>
                </div>
              </article>
              <article
                className="group relative rounded-xl bg-surface-container-lowest p-space-lg shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-space-md overflow-hidden opacity-95"
                data-category="srs"
                style={{ display: show(4) ? undefined : 'none' }}
              >
                <div className="flex-shrink-0 flex sm:flex-col items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-surface-container text-on-surface-variant">
                  <span className="material-symbols-outlined text-2xl">date_range</span>
                </div>
                <div className="flex-1 flex flex-col justify-between gap-space-sm min-w-0">
                  <div className="flex flex-col gap-space-xs">
                    <div className="flex flex-wrap items-center justify-between gap-space-xs">
                      <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm uppercase tracking-wider">
                        {' '}
                        Dự Báo Tuần • Thuật Toán FSRS{' '}
                      </span>
                      <span className="font-body-sm text-on-surface-variant">3 ngày trước</span>
                    </div>
                    <h2 className="font-title-sm text-headline-md text-on-surface font-bold pt-1">
                      {' '}
                      Lộ trình ôn tập 7 ngày tới đã được tối ưu hóa cân bằng tải trí nhớ{' '}
                    </h2>
                    <p className="font-body-md text-on-surface-variant leading-relaxed">
                      {' '}
                      Dự báo tải trung bình duy trì ổn định <strong>20 từ/ngày</strong>
                      {'. Không có ngày nào vượt quá ngưỡng bão hòa 50 từ, đảm bảo hệ số ghi nhớ dài hạn (R > 90%). '}
                    </p>
                  </div>
                  <div className="pt-space-xs flex items-end gap-2 h-14 bg-surface-container-low p-space-sm rounded-lg">
                    <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                      <div className="w-full bg-secondary rounded-t" style={{ height: '60%' }}></div>
                      <span className="font-label-sm text-[10px] text-on-surface-variant">T2</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                      <div className="w-full bg-secondary rounded-t" style={{ height: '45%' }}></div>
                      <span className="font-label-sm text-[10px] text-on-surface-variant">T3</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                      <div className="w-full bg-primary-container rounded-t" style={{ height: '85%' }}></div>
                      <span className="font-label-sm text-[10px] text-primary font-bold">Nay</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                      <div className="w-full bg-surface-container-highest rounded-t" style={{ height: '40%' }}></div>
                      <span className="font-label-sm text-[10px] text-on-surface-variant">T5</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                      <div className="w-full bg-surface-container-highest rounded-t" style={{ height: '50%' }}></div>
                      <span className="font-label-sm text-[10px] text-on-surface-variant">T6</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                      <div className="w-full bg-surface-container-highest rounded-t" style={{ height: '30%' }}></div>
                      <span className="font-label-sm text-[10px] text-on-surface-variant">T7</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                      <div className="w-full bg-surface-container-highest rounded-t" style={{ height: '20%' }}></div>
                      <span className="font-label-sm text-[10px] text-on-surface-variant">CN</span>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
          <aside className="lg:col-span-4 flex flex-col gap-space-lg w-full">
            <div className="rounded-xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col gap-space-md relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-primary">hourglass_top</span>
                  <span className="font-label-md uppercase tracking-widest text-on-surface font-bold">
                    Đồng Hồ Ký Ức
                  </span>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" title="SRS Active"></span>
              </div>
              <div className="flex flex-col items-center justify-center py-space-md bg-surface-container-low rounded-xl relative">
                <span className="font-label-sm text-on-surface-variant uppercase tracking-wider mb-1">
                  Đợt ôn tập tiếp theo sau
                </span>
                <div
                  className="font-display-character text-headline-xl text-primary font-bold tracking-normal"
                  id="countdownTimer"
                >
                  {' '}
                  03:20:15{' '}
                </div>
                <div className="flex items-center gap-space-xs mt-2 text-on-surface-variant font-label-sm">
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  <span>Khung giờ vàng: 21:50 Tối nay</span>
                </div>
              </div>
              <div className="flex flex-col gap-space-xs">
                <div className="flex justify-between font-label-sm text-on-surface-variant">
                  <span>Độ vững chắc bộ nhớ (R):</span>
                  <strong className="text-secondary font-bold">89.4%</strong>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                  <div className="bg-secondary h-full rounded-full" style={{ width: '89.4%' }}></div>
                </div>
                <p className="font-body-sm text-xs text-on-surface-variant pt-1">
                  {' '}
                  Duy trì tỷ lệ gợi nhớ trên 85% sẽ kích hoạt tính năng miễn giảm bài test sơ cấp.{' '}
                </p>
              </div>
            </div>
            <div className="rounded-xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-secondary">verified</span>
                  <span className="font-label-md uppercase tracking-widest text-on-surface font-bold">
                    Tuân Thủ Lịch Nhắc
                  </span>
                </div>
                <span className="font-label-sm px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-bold">
                  Tháng 10
                </span>
              </div>
              <div className="flex items-center gap-space-md">
                <div className="relative w-24 h-24 flex-shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-surface-container-high"
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
                      strokeDasharray="95.8, 100"
                      strokeLinecap="round"
                      strokeWidth="3.5"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-headline-md text-on-surface font-bold leading-none">95.8%</span>
                    <span className="font-label-sm text-[10px] text-on-surface-variant uppercase">Kỷ luật</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1 min-w-0">
                  <h3 className="font-title-sm text-on-surface font-bold leading-tight">Tuyệt đối chuẩn xác</h3>
                  <p className="font-body-sm text-on-surface-variant text-xs leading-relaxed">
                    {' '}
                    Bạn không bỏ lỡ đợt nhắc nhở nào trong suốt 28 ngày qua. Xếp hạng top 3% học giả chuyên cần.{' '}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-space-xs">
                <div className="p-space-sm bg-surface-container-low rounded-lg flex flex-col">
                  <span className="font-label-sm text-on-surface-variant">Đúng giờ</span>
                  <span className="font-title-sm text-on-surface font-bold">114 lượt</span>
                </div>
                <div className="p-space-sm bg-surface-container-low rounded-lg flex flex-col">
                  <span className="font-label-sm text-on-surface-variant">Bỏ lỡ</span>
                  <span className="font-title-sm text-primary font-bold">2 lượt</span>
                </div>
              </div>
            </div>
            <div className="rounded-xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-tertiary">notifications_active</span>
                  <span className="font-label-md uppercase tracking-widest text-on-surface font-bold">
                    Thiết Lập Nhắc Nhanh
                  </span>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant text-lg">settings</span>
              </div>
              <div className="flex flex-col gap-space-md">
                <label className="flex items-start justify-between gap-space-sm cursor-pointer group select-none">
                  <div className="flex flex-col">
                    <span className="font-title-sm text-on-surface group-hover:text-primary transition-colors">
                      Âm thanh chuông ngọc cảnh báo
                    </span>
                    <span className="font-body-sm text-on-surface-variant text-xs">
                      Phát thanh âm chuông khánh cổ truyền khi có từ đến hạn nguy cấp
                    </span>
                  </div>
                  <input
                    defaultChecked
                    className="mt-1 w-5 h-5 rounded accent-primary-container cursor-pointer"
                    type="checkbox"
                  />
                </label>
                <div className="w-full h-px bg-surface-container"></div>
                <label className="flex items-start justify-between gap-space-sm cursor-pointer group select-none">
                  <div className="flex flex-col">
                    <span className="font-title-sm text-on-surface group-hover:text-primary transition-colors">
                      Bản tin học giả chủ nhật
                    </span>
                    <span className="font-body-sm text-on-surface-variant text-xs">
                      Gửi tóm tắt thống kê FSRS vào 08:00 sáng Chủ Nhật hàng tuần qua email
                    </span>
                  </div>
                  <input
                    defaultChecked
                    className="mt-1 w-5 h-5 rounded accent-primary-container cursor-pointer"
                    type="checkbox"
                  />
                </label>
                <div className="w-full h-px bg-surface-container"></div>
                <label className="flex items-start justify-between gap-space-sm cursor-pointer group select-none">
                  <div className="flex flex-col">
                    <span className="font-title-sm text-on-surface group-hover:text-primary transition-colors">
                      Trình đẩy Webhook / Telegram
                    </span>
                    <span className="font-body-sm text-on-surface-variant text-xs">
                      Đồng bộ tín hiệu ôn từ vựng sang bot cá nhân tức thì
                    </span>
                  </div>
                  <input className="mt-1 w-5 h-5 rounded accent-primary-container cursor-pointer" type="checkbox" />
                </label>
              </div>
              <button className="mt-space-xs w-full py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md transition-all">
                {' '}
                Lưu Tùy Chọn Nhắc Nhở{' '}
              </button>
            </div>
          </aside>
        </div>
        <div
          className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-sm hidden items-center justify-center p-space-md"
          id="configModal"
        >
          <div className="bg-surface-container-lowest max-w-lg w-full rounded-2xl p-space-xl shadow-xl flex flex-col gap-space-lg relative animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
                <h2 className="font-headline-md text-headline-md text-on-surface font-bold">Kênh Tiếp Nhận Tín Hiệu</h2>
              </div>
              <button
                className="p-1 rounded-full text-on-surface-variant hover:bg-surface-container transition-all"
                id="closeModalBtn"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="flex flex-col gap-space-md">
              <div className="p-space-md bg-surface-container-low rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-primary">mail</span>
                  <div className="flex flex-col">
                    <span className="font-title-sm text-on-surface font-bold">Email Học Viện</span>
                    <span className="font-body-sm text-on-surface-variant text-xs">minhquan.hanzisrs@scholar.edu</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-secondary-container text-secondary font-label-sm font-bold">
                  Đã kích hoạt
                </span>
              </div>
              <div className="p-space-md bg-surface-container-low rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-tertiary">send</span>
                  <div className="flex flex-col">
                    <span className="font-title-sm text-on-surface font-bold">Telegram Bot SRS</span>
                    <span className="font-body-sm text-on-surface-variant text-xs">@HanziSRSReminder_Bot</span>
                  </div>
                </div>
                <button className="px-3 py-1 rounded bg-surface-container-highest text-on-surface font-label-sm font-bold hover:bg-surface-dim">
                  {' '}
                  Kết nối lại{' '}
                </button>
              </div>
              <div className="p-space-md bg-surface-container-low rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-secondary">notifications</span>
                  <div className="flex flex-col">
                    <span className="font-title-sm text-on-surface font-bold">Trình duyệt Web Push</span>
                    <span className="font-body-sm text-on-surface-variant text-xs">
                      Cho phép thông báo màn hình nền
                    </span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-secondary-container text-secondary font-label-sm font-bold">
                  Bật
                </span>
              </div>
            </div>
            <div className="flex justify-end gap-space-sm pt-space-xs">
              <button
                className="px-space-md py-2 rounded-lg bg-surface-container text-on-surface font-label-md"
                id="closeModalBtn2"
              >
                Đóng
              </button>
              <button
                className="px-space-md py-2 rounded-lg bg-primary-container text-on-primary font-label-md shadow-sm"
                id="saveChannelsBtn"
              >
                Lưu Thay Đổi
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
