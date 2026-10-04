import { useNavigate } from 'react-router-dom';
import AppShell from '../layouts/AppShell';
import { useState } from 'react';

export default function SettingsPage() {
  const navigate = useNavigate();
  const [goal, setGoal] = useState('20');
  const [saved, setSaved] = useState(false);
  const [g0, setG0] = useState(1);
  const [g1, setG1] = useState(0);
  const [g2, setG2] = useState(1);

  return (
    <AppShell>
      <div className="flex flex-col w-full">
        <div className="relative w-full overflow-hidden pb-space-xl">
          <div className="flex flex-col gap-space-xs mb-space-lg">
            <div className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md">
              <span className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[16px]">tune</span>
                <span>Hệ thống</span>
              </span>
              <span className="text-outline/40">/</span>
              <span className="text-primary font-title-sm">Thiết lập học tập</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mt-space-xs">
              <div>
                <div className="flex items-center gap-space-sm">
                  <span className="font-headline-xl text-headline-xl text-primary font-bold tracking-tight">
                    Cài Đặt &amp; Tu Tùy Học Giả
                  </span>
                  <span className="bg-primary-fixed text-on-primary-fixed px-space-sm py-0.5 rounded-full font-label-sm text-label-sm uppercase tracking-wider font-bold">
                    Hanzi SRS v2.4
                  </span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs max-w-3xl">
                  {' '}
                  Tùy chỉnh thuật toán giãn cách SRS, tần suất nhắc nhở học tập, giọng đọc bản xứ và quản lý tài khoản
                  cá nhân theo phong cách tối giản học thuật.{' '}
                </p>
              </div>
              <div className="flex items-center gap-space-sm self-start md:self-auto">
                <div className="flex items-center gap-space-xs px-space-md py-space-xs bg-surface-container rounded-full text-on-surface-variant font-label-sm text-label-sm shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  <span>Đồng bộ máy chủ Bắc Kinh (Ping 42ms)</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-low rounded-xl p-space-xs mb-space-lg shadow-sm">
            <div className="flex items-center gap-space-xs overflow-x-auto no-scrollbar" id="settings-tab-bar">
              <button
                className="tab-btn flex items-center gap-space-xs px-space-md py-space-sm rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all font-title-sm text-title-sm whitespace-nowrap"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">account_circle</span>
                <span>Hồ sơ học thuật</span>
              </button>
              <button
                className="tab-btn active-tab flex items-center gap-space-xs px-space-md py-space-sm rounded-lg bg-primary-container text-on-primary font-title-sm text-title-sm font-bold shadow-md whitespace-nowrap"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  auto_graph
                </span>
                <span>Thuật toán SRS &amp; Mục tiêu ngày</span>
              </button>
              <button
                className="tab-btn flex items-center gap-space-xs px-space-md py-space-sm rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all font-title-sm text-title-sm whitespace-nowrap"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">graphic_eq</span>
                <span>Âm thanh &amp; Nhận diện giọng nói</span>
              </button>
              <button
                className="tab-btn flex items-center gap-space-xs px-space-md py-space-sm rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all font-title-sm text-title-sm whitespace-nowrap"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">translate</span>
                <span>Giao diện &amp; Hiển thị Hán tự</span>
              </button>
              <button
                className="tab-btn flex items-center gap-space-xs px-space-md py-space-sm rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all font-title-sm text-title-sm whitespace-nowrap"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">database</span>
                <span>Sao lưu dữ liệu &amp; Tài khoản</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
            <div className="lg:col-span-7 flex flex-col gap-space-lg">
              <section className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm transition-all hover:shadow-md">
                <div className="flex items-center justify-between mb-space-md">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary shadow-sm">
                      <span className="material-symbols-outlined text-[22px]">target</span>
                    </div>
                    <div>
                      <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
                        Mục Tiêu Từ Vựng Hàng Ngày
                      </h2>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Lượng từ mới nạp vào hệ thống để thuật toán lập lịch ôn tập
                      </p>
                    </div>
                  </div>
                  <span className="font-label-sm text-label-sm bg-secondary-fixed text-on-secondary-fixed font-bold px-space-sm py-1 rounded-full flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">psychology</span> Tối ưu não bộ{' '}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm mb-space-md">
                  <label className="group relative flex flex-col p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container cursor-pointer transition-all">
                    <input className="peer sr-only" name="daily_goal" type="radio" defaultValue="10" />
                    <div className="peer-checked:border-primary-container peer-checked:bg-surface-container-lowest peer-checked:shadow-sm absolute inset-0 rounded-xl pointer-events-none transition-all"></div>
                    <div className="relative z-10 flex flex-col">
                      <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">
                        Khởi Động
                      </span>
                      <span className="font-headline-xl text-headline-xl font-bold text-on-surface my-space-xs">
                        10{' '}
                        <span className="font-body-sm text-body-sm font-normal text-on-surface-variant">từ/ngày</span>
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant leading-snug">
                        Nhẹ nhàng, 15 phút ôn tập thư thái
                      </span>
                    </div>
                  </label>
                  <label className="group relative flex flex-col p-space-md rounded-xl bg-surface-container-lowest shadow-md cursor-pointer transition-all">
                    <input defaultChecked className="peer sr-only" name="daily_goal" type="radio" defaultValue="20" />
                    <div className="peer-checked:ring-2 peer-checked:ring-primary-container peer-checked:bg-surface-container-lowest absolute inset-0 rounded-xl pointer-events-none transition-all"></div>
                    <div className="relative z-10 flex flex-col">
                      <div className="flex items-center justify-between">
                        <span className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider">
                          Tiêu Chuẩn
                        </span>
                        <span
                          className="material-symbols-outlined text-primary text-[18px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check_circle
                        </span>
                      </div>
                      <span className="font-headline-xl text-headline-xl font-bold text-primary my-space-xs">
                        20{' '}
                        <span className="font-body-sm text-body-sm font-normal text-on-surface-variant">từ/ngày</span>
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant leading-snug">
                        Cân đối vàng, bền bỉ theo chu kỳ SRS
                      </span>
                    </div>
                  </label>
                  <label className="group relative flex flex-col p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container cursor-pointer transition-all">
                    <input className="peer sr-only" name="daily_goal" type="radio" defaultValue="35" />
                    <div className="peer-checked:border-primary-container peer-checked:bg-surface-container-lowest peer-checked:shadow-sm absolute inset-0 rounded-xl pointer-events-none transition-all"></div>
                    <div className="relative z-10 flex flex-col">
                      <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">
                        Tăng Tốc HSK
                      </span>
                      <span className="font-headline-xl text-headline-xl font-bold text-on-surface my-space-xs">
                        35{' '}
                        <span className="font-body-sm text-body-sm font-normal text-on-surface-variant">từ/ngày</span>
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant leading-snug">
                        Chinh phục 1,000 từ vựng trong 30 ngày
                      </span>
                    </div>
                  </label>
                </div>
                <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col gap-space-xs">
                  <div className="flex items-center justify-between font-label-md text-label-md text-on-surface">
                    <span>Tùy biến chính xác số lượng thẻ mới:</span>
                    <span
                      className="font-bold text-primary text-title-sm"
                      id="goal-val-display"
                    >{`${goal} Hán tự / ngày`}</span>
                  </div>
                  <input
                    className="w-full h-2 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary-container"
                    id="goal-range"
                    max="50"
                    min="5"
                    step="5"
                    type="range"
                    defaultValue="20"
                    onChange={(e) => setGoal(e.target.value)}
                  />
                  <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant">
                    <span>5 từ (Tối thiểu)</span>
                    <span>25 từ (Khuyên dùng)</span>
                    <span>50 từ (Căng thẳng cao)</span>
                  </div>
                </div>
              </section>
              <section className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm transition-all hover:shadow-md">
                <div className="flex items-center justify-between mb-space-md">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-10 h-10 rounded-xl bg-secondary-fixed flex items-center justify-center text-secondary shadow-sm">
                      <span className="material-symbols-outlined text-[22px]">memory</span>
                    </div>
                    <div>
                      <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
                        Bộ Điều Chỉnh Thuật Toán SRS
                      </h2>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Lõi tính toán chu kỳ lặp lại ngắt quãng &amp; chỉ số ghi nhớ
                      </p>
                    </div>
                  </div>
                  <span className="font-label-sm text-label-sm bg-surface-container-high text-on-surface font-bold px-space-sm py-1 rounded-full">
                    v4.5.2 Pro
                  </span>
                </div>
                <div className="flex flex-col gap-space-md">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm">
                    <div className="relative p-space-md rounded-xl bg-surface-container-lowest shadow-sm cursor-pointer hover:shadow-md transition-all">
                      <div className="flex items-start justify-between">
                        <div className="flex flex-col">
                          <span className="font-title-sm text-title-sm text-primary font-bold">
                            FSRS v4.5 (Free Spaced Repetition)
                          </span>
                          <span className="font-label-sm text-label-sm text-secondary font-bold mt-0.5">
                            Khuyến nghị học giả • Chính xác 92%
                          </span>
                        </div>
                        <span
                          className="material-symbols-outlined text-primary text-[20px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          radio_button_checked
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-sm">
                        {' '}
                        Dựa trên mô hình DSR (Difficulty, Stability, Retrievability) tối ưu hoá dựa theo lịch sử phản xạ
                        của cá nhân bạn.{' '}
                      </p>
                    </div>
                    <div className="relative p-space-md rounded-xl bg-surface-container-low cursor-pointer hover:bg-surface-container transition-all">
                      <div className="flex items-start justify-between">
                        <div className="flex flex-col">
                          <span className="font-title-sm text-title-sm text-on-surface font-bold">
                            SuperMemo SM-2 (Cổ Điển)
                          </span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                            Mô hình chuẩn Anki 1987
                          </span>
                        </div>
                        <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                          radio_button_unchecked
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-sm">
                        {' '}
                        Phương pháp phân khoảng số nhân cố định dựa trên Ease Factor. Đơn giản, truyền thống và ổn
                        định.{' '}
                      </p>
                    </div>
                  </div>
                  <div className="p-space-md bg-surface-container-low rounded-xl flex flex-col gap-space-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-title-sm text-title-sm text-on-surface font-bold">
                          Mục tiêu ghi nhớ mong muốn (Retention Rate)
                        </span>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Tỷ lệ thẻ nhớ đúng khi gặp lại ở chu kỳ kế tiếp
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="font-headline-md text-headline-md text-primary font-bold">90%</span>{' '}
                        <span className="block font-label-sm text-label-sm text-secondary font-bold">
                          Cân bằng tối ưu
                        </span>
                      </div>
                    </div>
                    <input
                      className="w-full h-2 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary-container"
                      max="97"
                      min="80"
                      type="range"
                      defaultValue="90"
                    />
                    <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                      <span>80% (Ôn ít thẻ nhất, dễ quên)</span>
                      <span className="text-primary font-bold">90% (Tiêu chuẩn Hàn Lâm)</span>
                      <span>97% (Thuộc tuyệt đối, số bài ôn tăng gấp đôi)</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                    <div className="p-space-md bg-surface-container-low rounded-xl flex flex-col justify-between">
                      <div>
                        <span className="font-title-sm text-title-sm text-on-surface font-bold">
                          Thời gian phiên ôn tập
                        </span>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                          Ngắt phiên tự động tránh bão hòa trí nhớ
                        </p>
                      </div>
                      <div className="flex gap-space-xs mt-space-md">
                        <button
                          type="button"
                          onClick={() => setG0(0)}
                          className={
                            g0 === 0
                              ? 'flex-1 py-space-xs px-space-sm rounded-lg bg-primary text-on-primary font-title-sm text-body-sm font-bold shadow-sm'
                              : 'flex-1 py-space-xs px-space-sm rounded-lg bg-surface-container-highest text-on-surface font-title-sm text-body-sm hover:bg-surface-container-lowest transition-all'
                          }
                        >
                          15 Phút
                        </button>
                        <button
                          type="button"
                          onClick={() => setG0(1)}
                          className={
                            g0 === 1
                              ? 'flex-1 py-space-xs px-space-sm rounded-lg bg-primary text-on-primary font-title-sm text-body-sm font-bold shadow-sm'
                              : 'flex-1 py-space-xs px-space-sm rounded-lg bg-surface-container-highest text-on-surface font-title-sm text-body-sm hover:bg-surface-container-lowest transition-all'
                          }
                        >
                          25 Phút (Pomodoro)
                        </button>
                        <button
                          type="button"
                          onClick={() => setG0(2)}
                          className={
                            g0 === 2
                              ? 'flex-1 py-space-xs px-space-sm rounded-lg bg-primary text-on-primary font-title-sm text-body-sm font-bold shadow-sm'
                              : 'flex-1 py-space-xs px-space-sm rounded-lg bg-surface-container-highest text-on-surface font-title-sm text-body-sm hover:bg-surface-container-lowest transition-all'
                          }
                        >
                          Không giới hạn
                        </button>
                      </div>
                    </div>
                    <div className="p-space-md bg-surface-container-low rounded-xl flex flex-col justify-between">
                      <div>
                        <span className="font-title-sm text-title-sm text-on-surface font-bold">
                          Tỷ lệ Dynamic Deck Mixing
                        </span>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                          Pha trộn thông minh trong mỗi phiên ôn
                        </p>
                      </div>
                      <div className="mt-space-md">
                        <div className="w-full h-3 rounded-full overflow-hidden flex shadow-inner mb-space-xs">
                          <div className="h-full bg-secondary" style={{ width: '20%' }} title="20% Từ mới"></div>
                          <div className="h-full bg-primary" style={{ width: '50%' }} title="50% Đến hạn"></div>
                          <div
                            className="h-full bg-tertiary-container"
                            style={{ width: '30%' }}
                            title="30% Yếu/Hay sai"
                          ></div>
                        </div>
                        <div className="flex items-center justify-between font-label-sm text-label-sm">
                          <span className="flex items-center gap-1 text-on-surface">
                            <span className="w-2 h-2 rounded-full bg-secondary"></span> 20% Mới{' '}
                          </span>
                          <span className="flex items-center gap-1 text-on-surface font-bold">
                            <span className="w-2 h-2 rounded-full bg-primary"></span> 50% Đến Hạn{' '}
                          </span>
                          <span className="flex items-center gap-1 text-on-surface">
                            <span className="w-2 h-2 rounded-full bg-tertiary-container"></span> 30% Yếu/Sai{' '}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm transition-all hover:shadow-md">
                <div className="flex items-center gap-space-sm mb-space-md">
                  <div className="w-10 h-10 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary shadow-sm">
                    <span className="material-symbols-outlined text-[22px]">brush</span>
                  </div>
                  <div>
                    <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
                      Hiển Thị Hán Tự &amp; Quy Tắc Thẻ Học
                    </h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Tùy biến giao diện trực quan flashcard theo thẩm mỹ thi pháp
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-space-md">
                  <div className="flex items-center justify-between p-space-md bg-surface-container-low rounded-xl">
                    <div>
                      <span className="font-title-sm text-title-sm text-on-surface font-bold">Hệ chữ Hán mục tiêu</span>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Chuyển đổi toàn bộ ngân hàng từ vựng và câu ví dụ
                      </p>
                    </div>
                    <div className="flex bg-surface-container p-1 rounded-lg">
                      <button
                        type="button"
                        onClick={() => setG1(0)}
                        className={
                          g1 === 0
                            ? 'px-space-md py-space-xs rounded-md bg-surface-container-lowest text-primary font-title-sm text-title-sm font-bold shadow-sm'
                            : 'px-space-md py-space-xs rounded-md text-on-surface-variant hover:text-on-surface font-title-sm text-title-sm transition-colors'
                        }
                      >
                        {' '}
                        Giản thể (简体){' '}
                      </button>
                      <button
                        type="button"
                        onClick={() => setG1(1)}
                        className={
                          g1 === 1
                            ? 'px-space-md py-space-xs rounded-md bg-surface-container-lowest text-primary font-title-sm text-title-sm font-bold shadow-sm'
                            : 'px-space-md py-space-xs rounded-md text-on-surface-variant hover:text-on-surface font-title-sm text-title-sm transition-colors'
                        }
                      >
                        {' '}
                        Phồn thể (繁体){' '}
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                    <div className="p-space-md bg-surface-container-low rounded-xl flex items-center justify-between">
                      <div className="pr-space-sm">
                        <span className="font-title-sm text-title-sm text-on-surface font-bold">
                          Ẩn Pinyin mặc định
                        </span>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                          Buộc Active Recall nhận diện mặt chữ
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                        <input defaultChecked className="sr-only peer" type="checkbox" />
                        <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                      </label>
                    </div>
                    <div className="p-space-md bg-surface-container-low rounded-xl flex items-center justify-between">
                      <div className="pr-space-sm">
                        <span className="font-title-sm text-title-sm text-on-surface font-bold">
                          Gợi ý màu thanh điệu
                        </span>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                          T1 Đỏ • T2 Cam • T3 Xanh lục • T4 Lam
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                        <input defaultChecked className="sr-only peer" type="checkbox" />
                        <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                      </label>
                    </div>
                  </div>
                  <div className="p-space-md bg-surface-container-low rounded-xl flex flex-col sm:flex-row items-center justify-between gap-space-md">
                    <div className="flex items-center gap-space-md">
                      <div
                        className="w-16 h-16 rounded-xl bg-surface-container-lowest shadow-sm flex items-center justify-center font-display-character text-[44px] text-primary select-none cursor-pointer hover:bg-primary hover:text-on-primary transition-all"
                        title="Click để xem nét bút"
                      >
                        {' '}
                        学{' '}
                      </div>
                      <div>
                        <span className="font-title-sm text-title-sm text-on-surface font-bold">
                          Bút Thuận Động (Stroke Order Animation)
                        </span>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Tự động phát thứ tự nét cọ thảo khi nhấp chuột vào Hán tự
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                      <input defaultChecked className="sr-only peer" type="checkbox" />
                      <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                    </label>
                  </div>
                </div>
              </section>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-space-lg">
              <section className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm transition-all hover:shadow-md">
                <div className="flex items-center gap-space-sm mb-space-md">
                  <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-[22px]">record_voice_over</span>
                  </div>
                  <div>
                    <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
                      Âm Thanh &amp; Phát Âm
                    </h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Hệ thống tổng hợp giọng đọc và kiểm âm AI
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-space-md">
                  <div className="flex flex-col gap-space-xs">
                    <label className="font-label-md text-label-md text-on-surface font-bold">
                      Giọng đọc chuẩn (Neural TTS):
                    </label>
                    <div className="grid grid-cols-2 gap-space-xs">
                      <label className="p-space-sm rounded-xl bg-primary-fixed text-on-primary-fixed flex items-center justify-between cursor-pointer">
                        <input defaultChecked className="sr-only" name="tts_voice" type="radio" />
                        <div className="flex items-center gap-space-xs">
                          <span className="material-symbols-outlined text-[20px]">female</span>
                          <span className="font-title-sm text-title-sm font-bold">Bắc Kinh (Nữ)</span>
                        </div>
                        <span className="material-symbols-outlined text-[18px]">volume_up</span>
                      </label>
                      <label className="p-space-sm rounded-xl bg-surface-container-low text-on-surface hover:bg-surface-container flex items-center justify-between cursor-pointer transition-colors">
                        <input className="sr-only" name="tts_voice" type="radio" />
                        <div className="flex items-center gap-space-xs">
                          <span className="material-symbols-outlined text-[20px]">male</span>
                          <span className="font-title-sm text-title-sm">Tiêu chuẩn (Nam)</span>
                        </div>
                        <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                          play_circle
                        </span>
                      </label>
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Phát thanh viên CCTV cấp 1-Giáp (一级甲等)
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-xl">
                    <div>
                      <span className="font-label-md text-label-md text-on-surface font-bold">Tốc độ phát âm:</span>{' '}
                      <span className="block font-body-sm text-body-sm text-on-surface-variant">
                        Chuẩn ngữ lưu khẩu ngữ
                      </span>
                    </div>
                    <div className="flex items-center gap-1 bg-surface-container rounded-lg p-1">
                      <button
                        type="button"
                        onClick={() => setG2(0)}
                        className={
                          g2 === 0
                            ? 'px-space-sm py-1 rounded bg-surface-container-lowest text-primary font-label-md text-label-md font-bold shadow-sm'
                            : 'px-space-xs py-1 rounded text-on-surface-variant hover:text-on-surface font-label-md text-label-md'
                        }
                      >
                        0.8x
                      </button>
                      <button
                        type="button"
                        onClick={() => setG2(1)}
                        className={
                          g2 === 1
                            ? 'px-space-sm py-1 rounded bg-surface-container-lowest text-primary font-label-md text-label-md font-bold shadow-sm'
                            : 'px-space-xs py-1 rounded text-on-surface-variant hover:text-on-surface font-label-md text-label-md'
                        }
                      >
                        1.0x
                      </button>
                      <button
                        type="button"
                        onClick={() => setG2(2)}
                        className={
                          g2 === 2
                            ? 'px-space-sm py-1 rounded bg-surface-container-lowest text-primary font-label-md text-label-md font-bold shadow-sm'
                            : 'px-space-xs py-1 rounded text-on-surface-variant hover:text-on-surface font-label-md text-label-md'
                        }
                      >
                        1.2x
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-xl">
                    <div>
                      <span className="font-label-md text-label-md text-on-surface font-bold">
                        Tự động phát âm thanh
                      </span>{' '}
                      <span className="block font-body-sm text-body-sm text-on-surface-variant">
                        Ngay khi lật mặt thẻ đáp án
                      </span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                      <input defaultChecked className="sr-only peer" type="checkbox" />
                      <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                    </label>
                  </div>
                  <div className="p-space-md bg-surface-container-low rounded-xl flex flex-col gap-space-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-label-md text-label-md text-on-surface font-bold">
                        AI Chấm Uốn Lưỡi (zh/ch/sh)
                      </span>
                      <span className="font-label-sm text-label-sm bg-secondary-fixed text-on-secondary-fixed font-bold px-2 py-0.5 rounded-full">
                        Độ nhạy: Cao
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      {' '}
                      Phân tích phổ âm thanh 40ms kiểm tra vị trí cuống lưỡi và âm mũi trước/sau (-n vs -ng).{' '}
                    </p>
                  </div>
                </div>
              </section>
              <section className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm transition-all hover:shadow-md">
                <div className="flex items-center gap-space-sm mb-space-md">
                  <div className="w-10 h-10 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-[22px]">alarm_on</span>
                  </div>
                  <div>
                    <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
                      Thời Gian Vàng &amp; Nhắc Ôn
                    </h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Bảo vệ chuỗi ngọn lửa Streak không bị đứt đoạn
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-space-sm">
                  <div className="p-space-md bg-surface-container-low rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-10 h-10 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary">
                        <span className="material-symbols-outlined text-[20px]">bedtime</span>
                      </div>
                      <div>
                        <span className="font-title-sm text-title-sm text-on-surface font-bold">
                          Giờ vàng cố định ký ức
                        </span>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Trước giấc ngủ sâu để cố định Synapse
                        </p>
                      </div>
                    </div>
                    <input
                      className="bg-surface-container-lowest font-title-sm text-title-sm text-primary font-bold px-space-sm py-1.5 rounded-lg border-none outline-none shadow-sm cursor-pointer"
                      type="time"
                      defaultValue="20:00"
                    />
                  </div>
                  <div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-xl">
                    <div>
                      <span className="font-label-md text-label-md text-on-surface font-bold">
                        Thông báo trình duyệt &amp; Email
                      </span>{' '}
                      <span className="block font-body-sm text-body-sm text-on-surface-variant">
                        {'Chỉ gửi khi có >30 từ sắp rơi rụng'}
                      </span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                      <input defaultChecked className="sr-only peer" type="checkbox" />
                      <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                    </label>
                  </div>
                </div>
              </section>
              <section className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm transition-all hover:shadow-md">
                <div className="flex items-center gap-space-sm mb-space-md">
                  <div className="w-10 h-10 rounded-xl bg-surface-container-high text-on-surface flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-[22px]">manage_accounts</span>
                  </div>
                  <div>
                    <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
                      Tài Khoản &amp; Học Điển
                    </h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Thông tin cử nhân và an toàn dữ liệu
                    </p>
                  </div>
                </div>
                <div className="p-space-md bg-surface-container-low rounded-xl flex items-center justify-between mb-space-md">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-on-secondary font-headline-md text-headline-md font-bold shadow-sm">
                      {' '}
                      学{' '}
                    </div>
                    <div>
                      <div className="flex items-center gap-space-xs">
                        <span className="font-title-sm text-title-sm text-on-surface font-bold">Minh Quân</span>
                        <span className="bg-secondary-fixed text-on-secondary-fixed-variant px-1.5 py-0.5 rounded font-label-sm text-label-sm font-bold">
                          Học Giả Lv.5
                        </span>
                      </div>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        minhquan.scholar@hanzisrs.edu.vn
                      </span>
                    </div>
                  </div>
                  <button
                    className="text-primary hover:text-primary-container font-label-md text-label-md font-bold transition-colors"
                    type="button"
                  >
                    {' '}
                    Chỉnh sửa{' '}
                  </button>
                </div>
                <div className="flex flex-col gap-space-xs">
                  <button
                    className="w-full flex items-center justify-between p-space-sm bg-surface-container-low hover:bg-surface-container rounded-xl text-on-surface transition-all"
                    type="button"
                  >
                    <span className="flex items-center gap-space-xs font-title-sm text-body-md">
                      <span className="material-symbols-outlined text-[18px] text-on-surface-variant">lock_reset</span>
                      <span>Thay đổi mật khẩu xác thực 2 lớp</span>
                    </span>
                    <span className="material-symbols-outlined text-[18px] text-on-surface-variant">chevron_right</span>
                  </button>
                  <button
                    className="w-full flex items-center justify-between p-space-sm bg-surface-container-low hover:bg-surface-container rounded-xl text-on-surface transition-all"
                    type="button"
                  >
                    <span className="flex items-center gap-space-xs font-title-sm text-body-md">
                      <span className="material-symbols-outlined text-[18px] text-secondary">file_download</span>
                      <span>Xuất toàn bộ Hán tự (CSV / Anki Package)</span>
                    </span>
                    <span className="material-symbols-outlined text-[18px] text-on-surface-variant">chevron_right</span>
                  </button>
                  <button
                    className="w-full flex items-center justify-between p-space-sm bg-error-container/40 hover:bg-error-container rounded-xl text-error transition-all mt-space-xs"
                    type="button"
                    onClick={() => navigate('/auth')}
                  >
                    <span className="flex items-center gap-space-xs font-title-sm text-body-md font-bold">
                      <span className="material-symbols-outlined text-[18px]">logout</span>
                      <span>Đăng xuất khỏi phiên làm việc an toàn</span>
                    </span>
                    <span className="material-symbols-outlined text-[18px]">logout</span>
                  </button>
                </div>
              </section>
            </div>
          </div>
          <div className="sticky bottom-4 z-30 mt-space-xl bg-surface-container-lowest/95 backdrop-blur-md rounded-2xl p-space-md shadow-xl flex flex-col sm:flex-row items-center justify-between gap-space-md">
            <div className="flex items-center gap-space-sm">
              <div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  cloud_done
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-title-sm text-title-sm text-on-surface font-bold">
                  Mọi tùy biến được đồng bộ tức thì
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Lần sửa đổi gần nhất: Hôm nay lúc 14:32
                </span>
              </div>
            </div>
            <div className="flex items-center gap-space-sm w-full sm:w-auto">
              <button
                className="flex-1 sm:flex-none px-space-md py-space-sm rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-title-sm text-title-sm transition-all"
                id="btn-reset-defaults"
                type="button"
                onClick={() => window.location.reload()}
              >
                {' '}
                Khôi phục mặc định{' '}
              </button>
              <button
                className="flex-1 sm:flex-none flex items-center justify-center gap-space-xs px-space-lg py-space-sm rounded-lg bg-primary-container hover:bg-primary text-on-primary font-title-sm text-title-sm font-bold shadow-md hover:shadow-lg hover:scale-[1.01] transition-all"
                id="btn-save-settings"
                type="button"
                onClick={() => {
                  setSaved(true);
                  setTimeout(() => setSaved(false), 1500);
                }}
              >
                <span className="material-symbols-outlined text-[20px]">save</span>
                <span>{saved ? 'Đã lưu thiết lập' : 'Lưu Thiết Lập Học Thuật'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
