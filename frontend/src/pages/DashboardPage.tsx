import { useNavigate } from 'react-router-dom';
import AppShell from '../layouts/AppShell';

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <AppShell>
      <div className="flex flex-col w-full gap-space-lg pb-space-xl">
        <section className="relative overflow-hidden rounded-xl bg-gradient-to-br from-surface-container-lowest via-surface-container-low to-surface-container p-gutter shadow-sm">
          <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>
          <div className="absolute right-8 bottom-0 opacity-10 pointer-events-none select-none font-display-character text-[160px] leading-none text-primary">
            {' '}
            學{' '}
          </div>
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-md">
            <div className="flex flex-col gap-space-xs max-w-2xl">
              <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span>SRS Dynamic Session Active</span>
              </div>
              <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
                {' '}
                Chào mừng trở lại, Minh Tuấn!{' '}
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                {' '}
                Mục tiêu hôm nay còn <span className="font-bold text-primary">15 từ cần ôn</span> để duy trì chuỗi học
                12 ngày liên tục. Thuật toán SRS đã sẵn sàng tái kích hoạt trí nhớ dài hạn.{' '}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-space-sm">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm shadow-sm">
                <span className="material-symbols-outlined text-[16px] text-primary">tune</span>
                <span>
                  Mixing Engine: <strong className="text-on-surface">20% Mới</strong> +{' '}
                  <strong className="text-on-surface">50% Ôn</strong> +{' '}
                  <strong className="text-on-surface">30% Yếu</strong>
                </span>
              </div>
              <button
                className="group relative inline-flex items-center gap-space-sm px-6 py-3.5 rounded-lg bg-primary-container text-on-primary font-title-sm text-title-sm shadow-md hover:shadow-xl transition-all duration-200"
                type="button"
                onClick={() => navigate('/review')}
              >
                <span className="material-symbols-outlined text-[22px] group-hover:translate-x-0.5 transition-transform">
                  rocket_launch
                </span>
                <span>Bắt Đầu Phiên Học Hôm Nay (25 từ)</span>
              </button>
            </div>
          </div>
        </section>
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-gutter-sm">
          <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-md shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Tổng Từ Vựng
              </span>
              <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[20px]">library_books</span>
              </div>
            </div>
            <div className="mt-space-sm flex items-baseline gap-2">
              <span className="font-headline-lg text-[32px] font-bold text-on-surface tracking-tight">245</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">từ vựng</span>
            </div>
            <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-secondary-container/40 text-on-secondary-container font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[15px]">trending_up</span>
              <span>Tuần này +42</span>
            </div>
            <div className="mt-3 w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-md shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Đã Ghi Nhớ (Mastered)
              </span>
              <div className="w-9 h-9 rounded-lg bg-secondary-container/40 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[20px]">verified</span>
              </div>
            </div>
            <div className="mt-space-sm flex items-baseline gap-2">
              <span className="font-headline-lg text-[32px] font-bold text-secondary tracking-tight">128</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">từ</span>
            </div>
            <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[15px]">check_circle</span>
              <span>52% Tổng kho từ</span>
            </div>
            <div className="mt-3 w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
              <div className="bg-secondary h-full rounded-full" style={{ width: '52%' }}></div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-md shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Đang Học (Learning)
              </span>
              <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant">
                <span className="material-symbols-outlined text-[20px]">hourglass_top</span>
              </div>
            </div>
            <div className="mt-space-sm flex items-baseline gap-2">
              <span className="font-headline-lg text-[32px] font-bold text-on-surface tracking-tight">73</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">từ</span>
            </div>
            <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[15px]">timelapse</span>
              <span>Giai đoạn SRS 1-3</span>
            </div>
            <div className="mt-3 w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
              <div className="bg-outline h-full rounded-full" style={{ width: '30%' }}></div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-md shadow-sm hover:shadow-md transition-all">
            <div className="absolute top-0 right-0 w-24 h-24 bg-tertiary-fixed/30 rounded-bl-full pointer-events-none"></div>
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider font-bold">
                Cần Ôn Tập Ngay
              </span>
              <div className="w-9 h-9 rounded-lg bg-tertiary-fixed flex items-center justify-center text-tertiary shadow-[0_2px_6px_rgba(217,119,6,0.2)]">
                <span className="material-symbols-outlined text-[20px]">warning</span>
              </div>
            </div>
            <div className="mt-space-sm flex items-baseline gap-2">
              <span className="font-headline-lg text-[32px] font-bold text-tertiary tracking-tight">44</span>
              <span className="font-body-sm text-body-sm text-tertiary">từ đến hạn</span>
            </div>
            <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[15px]">timer</span>
              <span>Cần ôn trước 23:59</span>
            </div>
            <div className="mt-3 w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
              <div className="bg-tertiary h-full rounded-full" style={{ width: '78%' }}></div>
            </div>
          </div>
        </section>
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          <div className="lg:col-span-7 flex flex-col rounded-xl bg-surface-container-lowest p-space-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[22px]">radar</span>
                  <h2 className="font-headline-md text-headline-md text-on-surface">6 Chiều Kỹ Năng Ngôn Ngữ</h2>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  Đánh giá toàn diện theo tiêu chuẩn HanziSRS Mastery Model
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                Hôm nay
              </span>
            </div>
            <div className="mt-space-md flex flex-col gap-3.5">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between font-body-sm text-body-sm">
                  <span className="font-medium text-on-surface flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-secondary">visibility</span> Nhận diện
                    Hán tự{' '}
                  </span>
                  <span className="font-bold text-on-surface">90%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                  <div className="h-full bg-secondary rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between font-body-sm text-body-sm">
                  <span className="font-medium text-on-surface flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-secondary">record_voice_over</span>{' '}
                    Luyện nói Speaking{' '}
                  </span>
                  <span className="font-bold text-on-surface">81%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                  <div className="h-full bg-secondary-fixed-dim rounded-full" style={{ width: '81%' }}></div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between font-body-sm text-body-sm">
                  <span className="font-medium text-on-surface flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-primary">music_note</span> Pinyin &amp;
                    Thanh điệu{' '}
                  </span>
                  <span className="font-bold text-on-surface">80%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                  <div className="h-full bg-primary-fixed-dim rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between font-body-sm text-body-sm">
                  <span className="font-medium text-on-surface flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-tertiary">headphones</span> Nghe hiểu
                    Audio{' '}
                  </span>
                  <span className="font-bold text-on-surface">78%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                  <div className="h-full bg-tertiary-fixed-dim rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between font-body-sm text-body-sm">
                  <span className="font-medium text-on-surface flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-tertiary">edit_note</span> Đặt câu &amp;
                    Ngữ cảnh{' '}
                  </span>
                  <span className="font-bold text-on-surface">73%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                  <div className="h-full bg-tertiary rounded-full" style={{ width: '73%' }}></div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between font-body-sm text-body-sm">
                  <span className="font-medium text-primary flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">draw</span> Viết &amp; Chính tả{' '}
                    <span className="text-label-sm font-bold uppercase tracking-wider text-primary">(Yếu nhất)</span>
                  </span>
                  <span className="font-bold text-primary">65%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
            </div>
            <div className="mt-space-md p-space-sm rounded-lg bg-surface-container flex items-start gap-space-sm">
              <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[18px]">smart_toy</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm font-bold text-primary uppercase tracking-wider">
                  Khuyến nghị từ AI Tutor
                </span>
                <p className="font-body-sm text-body-sm text-on-surface mt-0.5">
                  {' '}
                  Kỹ năng <strong className="text-primary">Viết &amp; Đặt câu</strong> cần tăng cường thêm bài tập. Đã
                  chuẩn bị 4 bài tập thực hành theo nét bút tự động cho buổi hôm nay.{' '}
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 flex flex-col justify-between rounded-xl bg-surface-container-lowest p-space-lg shadow-sm">
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-[22px]">emoji_events</span>
                  <h2 className="font-headline-md text-headline-md text-on-surface">Thử Thách Hôm Nay</h2>
                </div>
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold shadow-sm">
                  <span className="material-symbols-outlined text-[14px]">timer</span>
                  <span>Còn 6 giờ</span>
                </div>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Hoàn thành để nhận thưởng bổ sung: <strong className="text-tertiary">+150 XP</strong>
              </span>
              <div className="mt-space-md flex flex-col gap-space-sm">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low">
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-[20px]">check_circle</span>
                    <span className="font-body-sm text-body-sm font-medium text-on-surface">5 từ mới</span>
                  </div>
                  <span className="font-label-sm text-label-sm font-bold text-secondary">5/5 ✓</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low">
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-tertiary text-[20px]">pending</span>
                    <span className="font-body-sm text-body-sm font-medium text-on-surface">Ôn 15 từ cũ</span>
                  </div>
                  <span className="font-label-sm text-label-sm font-bold text-tertiary">10/15</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low">
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-[20px]">check_circle</span>
                    <span className="font-body-sm text-body-sm font-medium text-on-surface">Bài nghe 5 câu</span>
                  </div>
                  <span className="font-label-sm text-label-sm font-bold text-secondary">5/5 ✓</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low">
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                      radio_button_unchecked
                    </span>
                    <span className="font-body-sm text-body-sm font-medium text-on-surface">Đặt câu 3 câu</span>
                  </div>
                  <span className="font-label-sm text-label-sm font-bold text-on-surface-variant">1/3</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low">
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                      radio_button_unchecked
                    </span>
                    <span className="font-body-sm text-body-sm font-medium text-on-surface">Luyện nói 2 câu</span>
                  </div>
                  <span className="font-label-sm text-label-sm font-bold text-on-surface-variant">0/2</span>
                </div>
              </div>
            </div>
            <div className="mt-space-md pt-space-sm flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Tiến độ ngày</span>
                <span className="font-title-sm text-title-sm font-bold text-on-surface">17 / 25 Mục</span>
              </div>
              <button
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-title-sm text-title-sm transition-all"
                type="button"
                onClick={() => navigate('/practice')}
              >
                <span>Tiếp tục thử thách</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </section>
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          <div className="lg:col-span-6 flex flex-col rounded-xl bg-surface-container-lowest p-space-lg shadow-sm">
            <div className="flex items-center justify-between mb-space-sm">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[22px]">history_edu</span>
                  <h2 className="font-headline-md text-headline-md text-on-surface">Từ Cần Củng Cố - Hay Sai</h2>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  Xếp hạng theo tần suất nhầm lẫn trong các phiên SRS gần đây
                </span>
              </div>
              <button
                className="text-primary hover:underline font-label-md text-label-md"
                type="button"
                onClick={() => navigate('/vocabulary')}
              >
                Xem tất cả (8)
              </button>
            </div>
            <div className="flex flex-col gap-space-sm mt-space-xs">
              <div className="flex items-center justify-between p-space-sm rounded-xl bg-surface-container-low hover:bg-surface-container transition-all">
                <div className="flex items-center gap-space-md">
                  <div className="w-14 h-14 rounded-lg bg-surface-container-lowest flex items-center justify-center font-display-character text-[28px] text-primary shadow-sm">
                    {' '}
                    学生{' '}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-title-sm text-title-sm font-bold text-on-surface">xuéshēng</span>
                      <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-bold">
                        Sai 3 lần
                      </span>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Học sinh, sinh viên • HSK 1
                    </span>
                  </div>
                </div>
                <button
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md shadow-sm hover:opacity-90 transition-all"
                  type="button"
                  onClick={() => navigate('/review')}
                >
                  <span className="material-symbols-outlined text-[16px]">replay</span>
                  <span>Ôn ngay</span>
                </button>
              </div>
              <div className="flex items-center justify-between p-space-sm rounded-xl bg-surface-container-low hover:bg-surface-container transition-all">
                <div className="flex items-center gap-space-md">
                  <div className="w-14 h-14 rounded-lg bg-surface-container-lowest flex items-center justify-center font-display-character text-[28px] text-on-surface shadow-sm">
                    {' '}
                    名字{' '}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-title-sm text-title-sm font-bold text-on-surface">míngzi</span>
                      <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
                        Sai 2 lần
                      </span>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Tên gọi • Nhầm thanh nhẹ (zi)
                    </span>
                  </div>
                </div>
                <button
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md shadow-sm hover:opacity-90 transition-all"
                  type="button"
                  onClick={() => navigate('/review')}
                >
                  <span className="material-symbols-outlined text-[16px]">replay</span>
                  <span>Ôn ngay</span>
                </button>
              </div>
              <div className="flex items-center justify-between p-space-sm rounded-xl bg-surface-container-low hover:bg-surface-container transition-all">
                <div className="flex items-center gap-space-md">
                  <div className="w-14 h-14 rounded-lg bg-surface-container-lowest flex items-center justify-center font-display-character text-[28px] text-on-surface shadow-sm">
                    {' '}
                    喜欢{' '}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-title-sm text-title-sm font-bold text-on-surface">xǐhuan</span>
                      <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
                        Sai 2 lần
                      </span>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Thích thú, yêu thích • Viết sai bộ Khẩu
                    </span>
                  </div>
                </div>
                <button
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md shadow-sm hover:opacity-90 transition-all"
                  type="button"
                  onClick={() => navigate('/review')}
                >
                  <span className="material-symbols-outlined text-[16px]">replay</span>
                  <span>Ôn ngay</span>
                </button>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 flex flex-col justify-between rounded-xl bg-surface-container-lowest p-space-lg shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-space-xs">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[22px]">monitoring</span>
                  <h2 className="font-headline-md text-headline-md text-on-surface">Tăng Trưởng Từ Vựng Tích Lũy</h2>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container font-label-sm text-label-sm font-bold">
                  +42 từ tuần này
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Biểu đồ 7 ngày gần nhất (Thứ 2 - Chủ Nhật)
              </p>
              <div className="mt-space-md w-full">
                <svg
                  className="w-full h-44 overflow-visible"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 500 160"
                >
                  <line stroke="#e3e2e0" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="500" y1="30" y2="30"></line>
                  <line stroke="#e3e2e0" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="500" y1="80" y2="80"></line>
                  <line stroke="#e3e2e0" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="500" y1="130" y2="130"></line>
                  <defs>
                    <linearGradient id="vocabGrowthGrad" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#006c4a" stopOpacity="0.25"></stop>
                      <stop offset="100%" stopColor="#006c4a" stopOpacity="0.0"></stop>
                    </linearGradient>
                  </defs>
                  <path
                    d="M 10 135 L 80 122 L 160 110 L 240 85 L 320 68 L 400 42 L 480 20 L 480 150 L 10 150 Z"
                    fill="url(#vocabGrowthGrad)"
                  />
                  <path
                    d="M 10 135 L 80 122 L 160 110 L 240 85 L 320 68 L 400 42 L 480 20"
                    stroke="#006c4a"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                  />
                  <circle cx="10" cy="135" fill="#ffffff" r="4" stroke="#006c4a" strokeWidth="2.5" />
                  <circle cx="80" cy="122" fill="#ffffff" r="4" stroke="#006c4a" strokeWidth="2.5" />
                  <circle cx="160" cy="110" fill="#ffffff" r="4" stroke="#006c4a" strokeWidth="2.5" />
                  <circle cx="240" cy="85" fill="#ffffff" r="4" stroke="#006c4a" strokeWidth="2.5" />
                  <circle cx="320" cy="68" fill="#ffffff" r="4" stroke="#006c4a" strokeWidth="2.5" />
                  <circle cx="400" cy="42" fill="#ffffff" r="4" stroke="#006c4a" strokeWidth="2.5" />
                  <circle cx="480" cy="20" fill="#be123c" r="5" stroke="#ffffff" strokeWidth="2" />
                </svg>
                <div className="flex justify-between text-on-surface-variant font-label-sm text-label-sm mt-2 px-1">
                  <span>T2 (203)</span>
                  <span>T3 (208)</span>
                  <span>T4 (214)</span>
                  <span>T5 (222)</span>
                  <span>T6 (231)</span>
                  <span>T7 (239)</span>
                  <span className="font-bold text-primary">CN (245)</span>
                </div>
              </div>
            </div>
            <div className="mt-space-md p-3 rounded-lg bg-surface-container flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">workspace_premium</span>
                <span className="font-body-sm text-body-sm text-on-surface font-medium">
                  Tốc độ ghi nhớ: <strong>~6 từ/ngày</strong>
                </span>
              </div>
              <span className="font-label-sm text-label-sm text-secondary font-bold">Vượt mục tiêu +18%</span>
            </div>
          </div>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter-sm">
          <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-md shadow-sm flex items-center gap-space-md">
            <div className="relative w-16 h-20 bg-surface-container-low rounded-lg flex flex-col items-center justify-center shrink-0">
              <span className="font-display-character text-[36px] text-primary leading-none">学</span>
              <span className="font-label-sm text-[10px] text-on-surface-variant mt-1">HỌC</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
                Hán Tự Cốt Lõi
              </span>
              <span className="font-title-sm text-title-sm font-bold text-on-surface">xué • 8 nét</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Bộ Tử (子) phía dưới, mô phỏng đứa trẻ học dưới mái nhà.
              </span>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-md shadow-sm flex items-center gap-space-md">
            <div className="relative w-16 h-20 bg-surface-container-low rounded-lg flex flex-col items-center justify-center shrink-0">
              <span className="font-display-character text-[36px] text-on-surface leading-none">语</span>
              <span className="font-label-sm text-[10px] text-on-surface-variant mt-1">NGỮ</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-secondary uppercase font-bold tracking-wider">
                Bộ Thủ Quan Trọng
              </span>
              <span className="font-title-sm text-title-sm font-bold text-on-surface">yǔ • Bộ Ngôn (讠)</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Xuất hiện trong hơn 38 từ vựng đang học tại HSK 2-3.
              </span>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-md shadow-sm flex items-center gap-space-md">
            <div className="relative w-16 h-20 bg-surface-container-low rounded-lg flex flex-col items-center justify-center shrink-0">
              <span className="font-display-character text-[36px] text-tertiary leading-none">习</span>
              <span className="font-label-sm text-[10px] text-on-surface-variant mt-1">TẬP</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-tertiary uppercase font-bold tracking-wider">
                SRS Mnemonic
              </span>
              <span className="font-title-sm text-title-sm font-bold text-on-surface">xí • Luyện tập</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Chim non vỗ cánh nhiều lần trên tổ để học bay thành thạo.
              </span>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
