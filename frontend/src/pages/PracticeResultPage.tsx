import { Link, useNavigate } from 'react-router-dom';
import AppShell from '../layouts/AppShell';
import { speak } from '../lib/speak';

export default function PracticeResultPage() {
  const navigate = useNavigate();

  return (
    <AppShell>
      <div className="flex flex-col w-full gap-space-lg pb-16">
        <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-lg lg:p-space-xl shadow-md">
          <div className="absolute -right-6 -bottom-10 select-none pointer-events-none opacity-5 text-on-surface font-display-character text-[220px] leading-none">
            {' '}
            成{' '}
          </div>
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-lg">
            <div className="flex items-start gap-space-md">
              <div className="w-16 h-16 rounded-xl bg-primary-container/10 flex items-center justify-center shrink-0 shadow-sm text-primary">
                <span className="material-symbols-outlined text-[36px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  workspace_premium
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-space-xs flex-wrap mb-1">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary/10 text-secondary font-label-sm text-label-sm font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>SRS Level 4 Thăng Tiến{' '}
                  </span>
                  <span className="text-on-surface-variant font-label-sm text-label-sm">• Hán Tự HSK 2-3 •</span>
                  <span className="text-on-surface-variant font-label-sm text-label-sm">Phiên #138</span>
                </div>
                <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
                  {' '}
                  Hoàn thành xuất sắc phiên luyện tập!{' '}
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
                  {' '}
                  Dữ liệu ghi nhớ của bạn đã được thuật toán Anki/SM-2 cập nhật chuẩn xác vào chu kỳ não bộ.{' '}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap lg:flex-nowrap items-center gap-space-sm shrink-0 w-full lg:w-auto">
              <div className="flex-1 lg:flex-none flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface-container font-label-md text-label-md text-on-surface shadow-sm">
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant">timer</span>
                <span className="font-bold">6m 40s</span>
                <span className="text-on-surface-variant text-[11px]">Tổng thời gian</span>
              </div>
              <div className="flex-1 lg:flex-none flex items-center gap-2 px-3.5 py-2 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed font-label-md text-label-md shadow-sm">
                <span
                  className="material-symbols-outlined text-[19px] text-tertiary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  local_fire_department
                </span>
                <span className="font-bold">12 Ngày</span>
                <span className="text-on-tertiary-fixed-variant text-[11px]">Streak giữ vững!</span>
              </div>
              <div className="flex-1 lg:flex-none flex items-center gap-2 px-3.5 py-2 rounded-lg bg-primary-fixed text-on-primary-fixed font-label-md text-label-md shadow-sm">
                <span
                  className="material-symbols-outlined text-[19px] text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  bolt
                </span>
                <span className="font-bold">+150 XP</span>
                <span className="text-on-primary-fixed-variant text-[11px]">Kinh nghiệm</span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-md">
          <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                Độ chính xác (Accuracy)
              </span>
              <span className="material-symbols-outlined text-[20px] text-secondary">verified</span>
            </div>
            <div className="flex items-center justify-between mt-space-md">
              <div>
                <div className="font-headline-xl text-headline-xl font-bold text-on-surface">83.3%</div>
                <div className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">15 / 18 thẻ đạt chuẩn</div>
              </div>
              <div className="relative w-16 h-16 shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-surface-container"
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
                    strokeDasharray="83.3, 100"
                    strokeLinecap="round"
                    strokeWidth="3.5"
                  />
                </svg>{' '}
                <span className="absolute inset-0 flex items-center justify-center font-label-sm text-label-sm font-bold text-secondary">
                  {' '}
                  +3.5%{' '}
                </span>
              </div>
            </div>
            <div className="mt-space-sm pt-space-xs text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1">
              <span className="text-secondary font-bold">Vượt mục tiêu</span>
              {' phiên hàng ngày (>80%) '}
            </div>
          </div>
          <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                Số câu trả lời đúng
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
            </div>
            <div className="mt-space-md">
              <div className="font-headline-xl text-headline-xl font-bold text-secondary">15 câu</div>
              <div className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Phản hồi chuẩn xác</div>
            </div>
            <div className="mt-space-sm flex items-center gap-1 w-full h-2 rounded-full overflow-hidden bg-surface-container">
              <div className="bg-secondary h-full rounded-full" style={{ width: '83.3%' }}></div>
            </div>
            <div className="mt-space-xs text-on-surface-variant font-label-sm text-label-sm">
              {' '}
              Được cộng vào điểm trí nhớ ổn định{' '}
            </div>
          </div>
          <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                Cần chỉnh sửa (Sai)
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
            </div>
            <div className="mt-space-md">
              <div className="font-headline-xl text-headline-xl font-bold text-primary-container">3 câu</div>
              <div className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Đã lưu vào danh sách lỗi</div>
            </div>
            <div className="mt-space-sm flex items-center gap-1 w-full h-2 rounded-full overflow-hidden bg-surface-container">
              <div className="bg-primary-container h-full rounded-full" style={{ width: '16.7%' }}></div>
            </div>
            <div className="mt-space-xs text-on-surface-variant font-label-sm text-label-sm">
              {' '}
              Cần học củng cố để tránh quên sâu{' '}
            </div>
          </div>
          <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                Tốc độ phản xạ trung bình
              </span>
              <span className="material-symbols-outlined text-[20px] text-tertiary">speed</span>
            </div>
            <div className="mt-space-md">
              <div className="font-headline-xl text-headline-xl font-bold text-on-surface">
                2.3 s<span className="font-body-sm text-body-sm text-on-surface-variant font-normal"> /câu</span>
              </div>
              <div className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Tối ưu cho phản xạ giao tiếp
              </div>
            </div>
            <div className="mt-space-sm flex items-center gap-2">
              <div className="flex-1 bg-surface-container h-2 rounded-full overflow-hidden">
                <div className="bg-tertiary h-full rounded-full" style={{ width: '76%' }}></div>
              </div>
              <span className="font-label-sm text-label-sm font-bold text-tertiary">Nhanh</span>
            </div>
            <div className="mt-space-xs text-on-surface-variant font-label-sm text-label-sm">
              {' '}
              Nhanh hơn 0.4s so với trung bình tuần{' '}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            <div className="flex items-center justify-between px-space-xs">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-primary-container text-[24px]">crisis_alert</span>
                <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight">
                  Từ cần ôn tập ngay (3 từ)
                </h2>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-bold">
                {' '}
                Ưu tiên hàng đầu{' '}
              </span>
            </div>
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md transition-all hover:shadow-md">
              <div className="flex items-center gap-space-md">
                <div className="w-16 h-16 rounded-xl bg-surface-container flex items-center justify-center font-display-character-mobile text-display-character-mobile text-on-surface font-bold shrink-0">
                  {' '}
                  老师{' '}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-space-xs">
                    <span className="font-title-sm text-title-sm font-bold text-on-surface">lǎoshī</span>
                    <button
                      className="w-7 h-7 rounded-full bg-surface-container-high hover:bg-surface-container-highest flex items-center justify-center text-on-surface-variant transition-colors"
                      title="Nghe phát âm chuẩn"
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        speak('');
                      }}
                    >
                      <span className="material-symbols-outlined text-[16px]">volume_up</span>
                    </button>
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-error-container text-on-error-container font-label-sm text-label-sm font-bold">
                      {' '}
                      Sai 2 lần{' '}
                    </span>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    Giáo viên, thầy cô giáo
                  </span>
                  <div className="flex items-center gap-1.5 mt-2 font-label-sm text-label-sm text-primary">
                    <span className="material-symbols-outlined text-[14px]">history</span>
                    <span>
                      Chu kỳ SRS giảm về: <strong>10 phút</strong>
                    </span>
                  </div>
                </div>
              </div>
              <button
                className="w-full sm:w-auto px-space-md py-2 rounded-lg bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface font-title-sm text-body-sm transition-all flex items-center justify-center gap-1.5 shrink-0"
                type="button"
                onClick={() => navigate('/review')}
              >
                <span className="material-symbols-outlined text-[18px]">replay</span>
                <span>Ôn ngay thẻ này</span>
              </button>
            </div>
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md transition-all hover:shadow-md">
              <div className="flex items-center gap-space-md">
                <div className="w-16 h-16 rounded-xl bg-surface-container flex items-center justify-center font-display-character-mobile text-display-character-mobile text-on-surface font-bold shrink-0">
                  {' '}
                  名字{' '}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-space-xs">
                    <span className="font-title-sm text-title-sm font-bold text-on-surface">míngzi</span>
                    <button
                      className="w-7 h-7 rounded-full bg-surface-container-high hover:bg-surface-container-highest flex items-center justify-center text-on-surface-variant transition-colors"
                      title="Nghe phát âm chuẩn"
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        speak('');
                      }}
                    >
                      <span className="material-symbols-outlined text-[16px]">volume_up</span>
                    </button>
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm">
                      {' '}
                      Sai 1 lần{' '}
                    </span>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Tên gọi, danh tính</span>
                  <div className="flex items-center gap-1.5 mt-2 font-label-sm text-label-sm text-tertiary">
                    <span className="material-symbols-outlined text-[14px]">warning</span>
                    <span>
                      Nhầm lẫn thanh điệu: <strong>zi (khinh thanh) / zì (thanh 4)</strong>
                    </span>
                  </div>
                </div>
              </div>
              <button
                className="w-full sm:w-auto px-space-md py-2 rounded-lg bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface font-title-sm text-body-sm transition-all flex items-center justify-center gap-1.5 shrink-0"
                type="button"
                onClick={() => navigate('/review')}
              >
                <span className="material-symbols-outlined text-[18px]">replay</span>
                <span>Ôn ngay thẻ này</span>
              </button>
            </div>
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md transition-all hover:shadow-md">
              <div className="flex items-center gap-space-md">
                <div className="w-16 h-16 rounded-xl bg-surface-container flex items-center justify-center font-display-character-mobile text-display-character-mobile text-on-surface font-bold shrink-0">
                  {' '}
                  学生{' '}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-space-xs">
                    <span className="font-title-sm text-title-sm font-bold text-on-surface">xuéshēng</span>
                    <button
                      className="w-7 h-7 rounded-full bg-surface-container-high hover:bg-surface-container-highest flex items-center justify-center text-on-surface-variant transition-colors"
                      title="Nghe phát âm chuẩn"
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        speak('');
                      }}
                    >
                      <span className="material-symbols-outlined text-[16px]">volume_up</span>
                    </button>
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm">
                      {' '}
                      Sai 1 lần{' '}
                    </span>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Học sinh, sinh viên</span>
                  <div className="flex items-center gap-1.5 mt-2 font-label-sm text-label-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[14px]">edit_note</span>
                    <span>
                      Nhầm lẫn bộ thủ: <strong>Bộ Tử (子) phía dưới</strong>
                    </span>
                  </div>
                </div>
              </div>
              <button
                className="w-full sm:w-auto px-space-md py-2 rounded-lg bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface font-title-sm text-body-sm transition-all flex items-center justify-center gap-1.5 shrink-0"
                type="button"
                onClick={() => navigate('/review')}
              >
                <span className="material-symbols-outlined text-[18px]">replay</span>
                <span>Ôn ngay thẻ này</span>
              </button>
            </div>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-space-md">
            <div className="flex items-center justify-between px-space-xs">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-[24px]">psychology</span>
                <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight">
                  Tác động thuật toán SRS
                </h2>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant">SuperMemo SM-2</span>
            </div>
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
              <div className="p-space-md rounded-lg bg-secondary/5 flex items-start gap-space-sm">
                <div className="w-9 h-9 rounded-lg bg-secondary text-on-secondary flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  <span className="material-symbols-outlined text-[20px]">arrow_upward</span>
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-title-sm text-title-sm font-bold text-secondary">
                      12 từ thăng hạng "Mastered"
                    </span>
                    <span className="font-label-sm text-label-sm font-bold text-secondary px-2 py-0.5 rounded-full bg-secondary/15">
                      +3 ngày
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                    {' '}
                    Trí nhớ đã ổn định vào vùng dài hạn. Thẻ sẽ không làm phiền bạn và tự động xuất hiện lại vào sáng
                    thứ 6 tới.{' '}
                  </p>
                </div>
              </div>
              <div className="p-space-md rounded-lg bg-primary-container/5 flex items-start gap-space-sm">
                <div className="w-9 h-9 rounded-lg bg-primary-container text-on-primary flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  <span className="material-symbols-outlined text-[20px]">schedule</span>
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-title-sm text-title-sm font-bold text-primary-container">
                      3 từ rơi về hàng đợi gấp
                    </span>
                    <span className="font-label-sm text-label-sm font-bold text-primary-container px-2 py-0.5 rounded-full bg-primary-container/15">
                      10 phút
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                    {' '}
                    Được đưa vào chu kỳ ôn tập ngắn để tạo liên kết nơ-ron trước khi quên hoàn toàn.{' '}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-1.5 pt-space-xs">
                <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                  <span>Phân phối toàn kho thẻ cá nhân</span>
                  <span className="font-bold text-on-surface">1,842 từ</span>
                </div>
                <div className="w-full h-3 rounded-full bg-surface-container flex overflow-hidden">
                  <div
                    className="bg-secondary-fixed-dim h-full"
                    style={{ width: '20%' }}
                    title="Apprentice (20%)"
                  ></div>
                  <div className="bg-secondary h-full" style={{ width: '45%' }} title="Guru / Master (45%)"></div>
                  <div className="bg-tertiary h-full" style={{ width: '25%' }} title="Enlightened (25%)"></div>
                  <div className="bg-primary h-full" style={{ width: '10%' }} title="Burned (10%)"></div>
                </div>
                <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm pt-1">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-secondary-fixed-dim"></span>Apprentice
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-secondary"></span>Master
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-tertiary"></span>Enlightened
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>Burned
                  </span>
                </div>
              </div>
            </div>
            <div className="p-space-md rounded-xl bg-surface-container flex items-start gap-space-sm">
              <span className="material-symbols-outlined text-tertiary text-[22px] shrink-0 mt-0.5">lightbulb</span>
              <div className="flex flex-col">
                <span className="font-title-sm text-title-sm font-bold text-on-surface">
                  Mẹo ghi nhớ từ 老师 (lǎoshī)
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  {' '}
                  Bộ Lão (老) tượng trưng cho người tóc dài chống gậy thông thái, kết hợp cùng Sư (师) biểu trưng cho
                  quân sư và người dẫn dắt.{' '}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-space-md p-space-lg rounded-xl bg-surface-container-lowest shadow-md flex flex-col sm:flex-row items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-secondary text-[22px]">check_circle</span>
            <span className="font-body-md text-body-md">
              Phiên học đã được đồng bộ tự động lên đám mây. Bạn đã sẵn sàng cho bước tiếp theo?
            </span>
          </div>
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-space-sm w-full sm:w-auto">
            <Link
              className="flex-1 sm:flex-none px-space-lg py-3 rounded-lg bg-surface-container hover:bg-surface-container-highest text-on-surface font-title-sm text-title-sm transition-all text-center"
              data-path="dashboard"
              to="/dashboard"
            >
              {' '}
              Về Dashboard{' '}
            </Link>
            <Link
              className="flex-1 sm:flex-none px-space-lg py-3 rounded-lg bg-surface-container hover:bg-surface-container-highest text-on-surface font-title-sm text-title-sm transition-all text-center flex items-center justify-center gap-1.5"
              data-path="review"
              to="/practice"
            >
              <span>Luyện tiếp phiên mới</span>
              <span className="material-symbols-outlined text-[18px]">navigate_next</span>
            </Link>
            <button
              className="w-full sm:w-auto px-space-xl py-3 rounded-lg bg-primary-container text-on-primary font-title-sm text-title-sm hover:opacity-95 shadow-[0_4px_16px_rgba(190,18,60,0.3)] transition-all flex items-center justify-center gap-2"
              type="button"
              onClick={() => navigate('/review')}
            >
              <span className="material-symbols-outlined text-[20px]">cached</span>
              <span>Ôn lại các từ sai ngay (3 từ)</span>
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
