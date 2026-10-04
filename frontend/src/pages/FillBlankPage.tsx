import AppShell from '../layouts/AppShell';
import usePracticeNext from '../lib/usePracticeFlow';

export default function FillBlankPage() {
  const goNext = usePracticeNext();

  return (
    <AppShell>
      <div className="flex flex-col w-full gap-space-lg pb-space-xl">
        <div className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-space-md">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm uppercase tracking-wider">
              <span>Luyện Tập Đa Chiều</span>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span>Điền Từ &amp; Hư Từ</span>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="text-primary font-bold">Câu 07 / 10</span>
            </div>
            <div className="flex items-center gap-space-sm">
              <span className="px-space-sm py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm">
                Hư Từ Cốt Lõi HSK 2–3
              </span>
              <span className="px-space-sm py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm flex items-center gap-1">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                  local_fire_department
                </span>{' '}
                Chuỗi Đúng: 5 Câu (+20 XP){' '}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-space-md justify-between md:justify-end">
            <div className="flex items-center gap-space-xs bg-surface-container-low px-space-md py-1.5 rounded-lg text-on-surface">
              <span className="material-symbols-outlined text-primary text-base">timer</span>
              <span className="font-label-md tracking-wider font-bold" id="countdown-timer">
                01:45
              </span>
            </div>
            <div className="w-36 flex flex-col gap-1">
              <div className="flex justify-between font-label-sm text-on-surface-variant">
                <span>Tiến Trình Đợt Học</span>
                <span className="font-bold text-primary">70%</span>
              </div>
              <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden flex">
                <div
                  className="bg-secondary h-full rounded-full transition-all duration-500"
                  style={{ width: '70%' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          <div className="lg:col-span-8 flex flex-col gap-space-lg">
            <div className="w-full bg-surface-container-lowest rounded-2xl p-space-lg md:p-space-xl shadow-sm relative overflow-hidden flex flex-col gap-space-lg">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-primary"></div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs text-primary font-label-sm tracking-widest uppercase">
                  <span className="w-2 h-2 rounded-full bg-primary"></span> Chuyên Đề: Điền Trợ Từ / Hư Từ Chính Xác Vào
                  Vị Trí Khuyết{' '}
                </div>
                <button
                  className="flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors text-label-sm"
                  id="btn-audio"
                  title="Phát âm mẫu câu"
                >
                  <span className="material-symbols-outlined text-lg">volume_up</span>
                  <span>Mẫu Âm Chuẩn</span>
                </button>
              </div>
              <div className="flex flex-col gap-space-md py-space-sm">
                <div className="flex flex-wrap items-center gap-x-space-sm gap-y-space-md text-headline-lg md:text-headline-xl font-headline-xl text-on-surface leading-loose">
                  <div className="inline-flex flex-col items-center">
                    <span className="font-label-sm text-on-surface-variant font-sans font-normal text-xs">tā</span>
                    <span>他</span>
                  </div>
                  <div className="inline-flex flex-col items-center gap-1">
                    <span className="font-label-sm text-secondary font-sans font-bold text-xs">[ 1 ] bǎ</span>
                    <div
                      className="min-w-[4.25rem] h-14 px-space-sm bg-secondary-container/30 text-on-secondary-container rounded-xl flex items-center justify-center font-display-character text-2xl font-bold transition-all shadow-sm"
                      data-answer="把"
                      data-slot-id="1"
                      id="slot-1"
                    >
                      {' '}
                      把{' '}
                    </div>
                  </div>
                  <div className="inline-flex flex-col items-center">
                    <span className="font-label-sm text-on-surface-variant font-sans font-normal text-xs">zuótiān</span>
                    <span>昨天</span>
                  </div>
                  <div className="inline-flex flex-col items-center">
                    <span className="font-label-sm text-on-surface-variant font-sans font-normal text-xs">mǎi</span>
                    <span>买</span>
                  </div>
                  <div className="inline-flex flex-col items-center">
                    <span className="font-label-sm text-on-surface-variant font-sans font-normal text-xs">de</span>
                    <span>的</span>
                  </div>
                  <div className="inline-flex flex-col items-center">
                    <span className="font-label-sm text-on-surface-variant font-sans font-normal text-xs">píngguǒ</span>
                    <span>苹果</span>
                  </div>
                  <div className="inline-flex flex-col items-center">
                    <span className="font-label-sm text-on-surface-variant font-sans font-normal text-xs">quán</span>
                    <span>全</span>
                  </div>
                  <div className="inline-flex flex-col items-center gap-1">
                    <span className="font-label-sm text-primary font-sans font-bold text-xs">[ 2 ] dōu</span>
                    <div
                      className="min-w-[4.25rem] h-14 px-space-sm bg-primary-fixed/40 text-primary font-display-character text-2xl font-bold rounded-xl flex items-center justify-center transition-all shadow-sm"
                      data-answer="都"
                      data-slot-id="2"
                      id="slot-2"
                    >
                      {' '}
                      都{' '}
                    </div>
                  </div>
                  <div className="inline-flex flex-col items-center">
                    <span className="font-label-sm text-on-surface-variant font-sans font-normal text-xs">chī</span>
                    <span>吃</span>
                  </div>
                  <div className="inline-flex flex-col items-center">
                    <span className="font-label-sm text-on-surface-variant font-sans font-normal text-xs">le</span>
                    <span>了。</span>
                  </div>
                </div>
                <div className="p-space-sm bg-surface-container-low rounded-lg flex items-start gap-space-sm mt-space-xs">
                  <span className="material-symbols-outlined text-on-surface-variant text-base mt-0.5">translate</span>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-on-surface-variant uppercase tracking-wider">
                      Bản dịch khảo cứu
                    </span>
                    <p className="font-body-md text-on-surface font-medium">
                      "Anh ấy đã ăn sạch toàn bộ số táo hôm qua mua."
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-space-sm pt-space-xs">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-on-surface-variant uppercase tracking-wider">
                    Ngân Hàng Từ Lựa Chọn (Word Bank)
                  </span>
                  <span className="font-label-sm text-on-surface-variant">Chạm hoặc kéo thả vào ô khuyết</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-space-sm" id="word-bank">
                  <button
                    className="word-card p-space-sm bg-surface-container-low text-on-surface rounded-xl flex flex-col items-center justify-center transition-all hover:bg-surface-container-high opacity-50 cursor-not-allowed"
                    data-word="把"
                    disabled
                  >
                    <span className="font-display-character text-xl font-bold">把</span>
                    <span className="font-label-sm text-on-surface-variant">bǎ (xử trí)</span>
                    <span className="mt-1 text-xs px-2 py-0.5 rounded-full bg-secondary text-on-secondary font-label-sm">
                      Đã đặt [1]
                    </span>
                  </button>
                  <button
                    className="word-card p-space-sm bg-surface-container text-on-surface rounded-xl flex flex-col items-center justify-center hover:bg-surface-container-high transition-all shadow-sm"
                    data-word="被"
                  >
                    <span className="font-display-character text-xl font-bold">被</span>
                    <span className="font-label-sm text-on-surface-variant">bèi (bị động)</span>
                    <span className="mt-1 text-xs px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm">
                      Khả dụng
                    </span>
                  </button>
                  <button
                    className="word-card p-space-sm bg-primary-fixed text-on-primary-fixed rounded-xl flex flex-col items-center justify-center hover:bg-primary-fixed-dim transition-all shadow-sm"
                    data-word="都"
                  >
                    <span className="font-display-character text-xl font-bold text-primary">都</span>
                    <span className="font-label-sm text-on-primary-fixed-variant">dōu (toàn bộ)</span>
                    <span className="mt-1 text-xs px-2 py-0.5 rounded-full bg-primary text-on-primary font-label-sm">
                      Đang đặt [2]
                    </span>
                  </button>
                  <button
                    className="word-card p-space-sm bg-surface-container text-on-surface rounded-xl flex flex-col items-center justify-center hover:bg-surface-container-high transition-all shadow-sm"
                    data-word="也"
                  >
                    <span className="font-display-character text-xl font-bold">也</span>
                    <span className="font-label-sm text-on-surface-variant">yě (cũng)</span>
                    <span className="mt-1 text-xs px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm">
                      Khả dụng
                    </span>
                  </button>
                  <button
                    className="word-card p-space-sm bg-surface-container text-on-surface rounded-xl flex flex-col items-center justify-center hover:bg-surface-container-high transition-all shadow-sm"
                    data-word="在"
                  >
                    <span className="font-display-character text-xl font-bold">在</span>
                    <span className="font-label-sm text-on-surface-variant">zài (ở / đang)</span>
                    <span className="mt-1 text-xs px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm">
                      Khả dụng
                    </span>
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-space-md pt-space-md">
                <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm">
                  <span className="px-2 py-1 rounded bg-surface-container font-mono text-xs text-on-surface">Esc</span>
                  <span>Bỏ qua / Xem đáp án</span>
                </div>
                <div className="flex items-center gap-space-sm">
                  <button
                    className="px-space-md py-space-sm rounded-lg bg-surface-container-high text-on-surface font-title-sm hover:bg-surface-container-highest transition-all flex items-center gap-space-xs"
                    id="btn-replay"
                  >
                    <span className="material-symbols-outlined text-base">replay</span>
                    <span>Làm Lại</span>
                  </button>
                  <button
                    className="px-space-lg py-space-sm rounded-lg bg-primary-container text-on-primary font-title-sm shadow-md hover:bg-primary transition-all flex items-center gap-space-xs"
                    id="btn-submit"
                    onClick={goNext}
                  >
                    <span>Kiểm Tra</span>
                    <span className="px-1.5 py-0.5 rounded bg-on-primary/20 text-xs font-mono">Enter ↵</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center gap-space-sm pb-space-xs">
                <div className="w-8 h-8 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg">psychology</span>
                </div>
                <div className="flex flex-col">
                  <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                    Chẩn Đoán Cú Pháp &amp; Bẫy Hán Ngữ
                  </h2>
                  <span className="font-label-sm text-on-surface-variant">
                    Khảo luận cấu trúc câu chữ 把 (Bǎ) &amp; phó từ nhấn mạnh 都 (Dōu)
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
                  <div className="flex items-center gap-1.5 text-secondary font-label-md">
                    <span className="material-symbols-outlined text-base">check_circle</span>
                    <span>Cơ Chế Vận Hành Ngữ Pháp</span>
                  </div>
                  <p className="font-body-md text-on-surface leading-relaxed text-sm">
                    {' '}
                    Cấu trúc câu chữ <span className="font-bold text-primary font-display-character">把</span> biểu thị
                    hành động tác động xử trí lên một đối tượng xác định (
                    <span className="italic font-medium">"昨天买的苹果" - số táo đã mua</span>). Khi kết hợp phó từ{' '}
                    <span className="font-bold text-primary font-display-character">全/都</span>, nó quy tụ và nhấn mạnh
                    tuyệt đối trạng thái diệt trừ / tiêu thụ hoàn toàn của tân ngữ.{' '}
                  </p>
                </div>
                <div className="p-space-md rounded-xl bg-error-container/20 flex flex-col gap-space-xs">
                  <div className="flex items-center gap-1.5 text-error font-label-md">
                    <span className="material-symbols-outlined text-base">warning</span>
                    <span>Bẫy Thói Quen (Lỗi 72% Thí Sinh)</span>
                  </div>
                  <p className="font-body-md text-on-surface leading-relaxed text-sm">
                    <span className="font-bold text-error">72%</span> người học nhầm lẫn giữa{' '}
                    <span className="font-display-character font-bold">把</span> và{' '}
                    <span className="font-display-character font-bold">被</span> do thói quen suy nghĩ câu bị động tiếng
                    Việt ("bị/được ăn"). Trong câu này, chủ ngữ "他" (anh ấy) là chủ thể trực tiếp thực hiện hành động,
                    do đó câu chữ <span className="font-display-character font-bold">把</span> là lựa chọn duy nhất
                    đúng.{' '}
                  </p>
                </div>
              </div>
              <div className="mt-space-xs flex flex-col gap-space-xs">
                <span className="font-label-sm text-on-surface-variant uppercase tracking-wider">
                  Bảng Quy Tắc Cốt Lõi Hư Từ HSK
                </span>
                <div className="overflow-x-auto rounded-xl bg-surface-container-low p-space-xs">
                  <table className="w-full text-left font-body-sm text-on-surface">
                    <thead>
                      <tr className="font-label-sm text-on-surface-variant uppercase">
                        <th className="p-space-sm">Hư Từ</th>
                        <th className="p-space-sm">Vị Trí Cú Pháp</th>
                        <th className="p-space-sm">Ý Nghĩa Cốt Lõi</th>
                        <th className="p-space-sm">Dấu Hiệu Nhận Biết</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-container">
                      <tr className="hover:bg-surface-container transition-colors">
                        <td className="p-space-sm font-display-character text-lg font-bold text-primary">把 (bǎ)</td>
                        <td className="p-space-sm font-medium">Chủ ngữ + [把] + Tân ngữ + Động từ + Kết quả</td>
                        <td className="p-space-sm">Xử trí, làm biến đổi đối tượng</td>
                        <td className="p-space-sm text-on-surface-variant">Động từ kèm bổ ngữ kết quả, 了</td>
                      </tr>
                      <tr className="hover:bg-surface-container transition-colors">
                        <td className="p-space-sm font-display-character text-lg font-bold text-on-surface">
                          被 (bèi)
                        </td>
                        <td className="p-space-sm font-medium">Đối tượng + [被] + (Tác nhân) + V + Thành phần khác</td>
                        <td className="p-space-sm">Bị động, gánh chịu kết quả</td>
                        <td className="p-space-sm text-on-surface-variant">Tân ngữ đứng đầu câu làm chủ ngữ</td>
                      </tr>
                      <tr className="hover:bg-surface-container transition-colors">
                        <td className="p-space-sm font-display-character text-lg font-bold text-secondary">都 (dōu)</td>
                        <td className="p-space-sm font-medium">Danh từ số nhiều/toàn thể + [都] + V/Adj</td>
                        <td className="p-space-sm">Quy nạp toàn bộ, "đều"</td>
                        <td className="p-space-sm text-on-surface-variant">Đi kèm 全, 很多, 所有</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-space-lg">
            <div className="w-full bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-primary text-xl">sync_saved_locally</span>
                  <h3 className="font-title-sm text-title-sm text-on-surface">Tác Động Chu Kỳ SRS</h3>
                </div>
                <span className="px-space-sm py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm font-bold">
                  Thăng Hạng
                </span>
              </div>
              <div className="flex flex-col gap-space-sm">
                <div className="p-space-sm rounded-xl bg-surface-container-low flex items-center justify-between">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-12 h-12 rounded-lg bg-surface-container-lowest flex items-center justify-center font-display-character text-2xl font-bold text-primary shadow-xs">
                      {' '}
                      把{' '}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-title-sm text-sm text-on-surface font-bold">bǎ (Bả - Cầm, Nắm)</span>
                      <span className="font-label-sm text-secondary flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">arrow_upward</span> Lên cấp: Sư Phụ
                        (Master){' '}
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <span className="font-label-sm text-on-surface-variant">Chu kỳ ôn sau</span>
                    <span className="font-label-md font-bold text-on-surface">21 ngày</span>
                  </div>
                </div>
                <div className="p-space-sm rounded-xl bg-surface-container-low flex items-center justify-between">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-12 h-12 rounded-lg bg-surface-container-lowest flex items-center justify-center font-display-character text-2xl font-bold text-on-surface shadow-xs">
                      {' '}
                      都{' '}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-title-sm text-sm text-on-surface font-bold">dōu (Đô - Toàn bộ)</span>
                      <span className="font-label-sm text-tertiary flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">published_with_changes</span> Cố định: Bậc
                        Đồ Đệ{' '}
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <span className="font-label-sm text-on-surface-variant">Chu kỳ ôn sau</span>
                    <span className="font-label-md font-bold text-on-surface">5 ngày</span>
                  </div>
                </div>
              </div>
              <div className="p-space-sm bg-surface-container rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-on-surface-variant text-base">speed</span>
                  <span className="font-label-sm text-on-surface-variant">Thời gian phản xạ:</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-label-md font-bold text-secondary">1.8s</span>
                  <span className="font-label-sm text-on-surface-variant">(Phản xạ chuẩn)</span>
                </div>
              </div>
            </div>
            <div className="w-full bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-on-surface-variant uppercase tracking-wider">Khảo Cứu Tự Hình</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-mono">
                  Bộ Thủ 扌
                </span>
              </div>
              <div className="relative w-full h-36 rounded-xl bg-surface-container-low overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 opacity-10 flex items-center justify-center font-display-character text-9xl text-primary select-none">
                  {' '}
                  把{' '}
                </div>
                <div className="relative z-10 text-center px-space-md">
                  <span className="font-headline-md font-display-character text-on-surface font-bold text-2xl">
                    扌(Thủ) + 巴 (Ba)
                  </span>
                  <p className="font-body-sm text-on-surface-variant mt-1">
                    {' '}
                    "Thủ" là bàn tay nắm giữ; "Ba" là âm đọc. Biểu trưng hành động nắm lấy sự vật rồi định đoạt kết
                    quả.{' '}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-space-xs font-label-sm text-on-surface-variant">
                <span>Số nét: 7 nét</span>
                <span>Cấp độ HSK: HSK 3</span>
              </div>
            </div>
            <div className="w-full bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col gap-space-sm">
              <span className="font-label-sm text-on-surface-variant uppercase tracking-wider">Phím Tắt Thao Tác</span>
              <div className="grid grid-cols-2 gap-space-xs text-xs text-on-surface">
                <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
                  <span className="text-on-surface-variant">Phát âm</span>
                  <kbd className="px-1.5 py-0.5 bg-surface-container-highest rounded text-on-surface font-mono">
                    Space
                  </kbd>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
                  <span className="text-on-surface-variant">Xác nhận</span>
                  <kbd className="px-1.5 py-0.5 bg-surface-container-highest rounded text-on-surface font-mono">
                    Enter
                  </kbd>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
                  <span className="text-on-surface-variant">Xóa ô</span>
                  <kbd className="px-1.5 py-0.5 bg-surface-container-highest rounded text-on-surface font-mono">
                    Backspace
                  </kbd>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
                  <span className="text-on-surface-variant">Đổi ô</span>
                  <kbd className="px-1.5 py-0.5 bg-surface-container-highest rounded text-on-surface font-mono">
                    Tab
                  </kbd>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="fixed bottom-6 right-6 max-w-sm bg-surface-container-lowest shadow-xl rounded-xl p-space-md border border-secondary transition-all transform translate-y-20 opacity-0 pointer-events-none flex items-start gap-space-sm z-50"
          id="feedback-drawer"
        >
          <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-base">task_alt</span>
          </div>
          <div className="flex flex-col">
            <h4 className="font-title-sm text-sm font-bold text-on-surface">Chính Xác Xuất Sắc!</h4>
            <p className="font-body-sm text-xs text-on-surface-variant">
              Bạn đã làm chủ cấu trúc câu chữ 把 với phó từ nhấn mạnh 都.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
