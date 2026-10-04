import { useNavigate } from 'react-router-dom';
import AppShell from '../layouts/AppShell';
import usePracticeNext from '../lib/usePracticeFlow';
import { useState } from 'react';

export default function MultiPracticePage() {
  const navigate = useNavigate();
  const goNext = usePracticeNext();
  const [sel, setSel] = useState(1);

  return (
    <AppShell>
      <div className="flex flex-col w-full gap-space-lg pb-space-xl">
        <header className="w-full bg-surface-container-lowest rounded-xl shadow-sm p-space-md flex flex-col gap-space-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
            <div className="flex items-center gap-space-sm">
              <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[24px]">tune</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h1 className="font-headline-md text-headline-md text-on-surface">Phiên Học Hôm Nay: Câu 7 / 20</h1>
                  <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm">
                    Session SRS #104
                  </span>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  SRS Mixing Engine v4.2 • Tự động cân bằng trí nhớ dài hạn
                </span>
              </div>
            </div>
            <div className="flex items-center flex-wrap gap-space-sm">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-md text-label-md shadow-sm">
                <span
                  className="material-symbols-outlined text-[18px] text-tertiary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  local_fire_department
                </span>
                <span>12 Ngày Streak</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-label-md shadow-sm">
                <span className="material-symbols-outlined text-[18px] text-secondary">military_tech</span>
                <span className="font-bold">+70 XP Tích lũy</span>
              </div>
              <button
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest transition-all font-label-md text-label-md"
                type="button"
                onClick={() => navigate('/practice')}
              >
                <span className="material-symbols-outlined text-[18px]">pause_circle</span>
                <span>✕ Tạm dừng &amp; Lưu kết quả</span>
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-1.5 mt-space-xs pt-space-xs">
            <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
              <div className="flex items-center gap-space-md">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>🟢 20% Từ Mới (4)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span>🟡 50% Cần Ôn SRS (10)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>🔴 30% Từ Yếu (6)
                </span>
              </div>
              <span className="font-bold text-on-surface">35% Hoàn thành</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-surface-container-highest overflow-hidden flex p-0.5 gap-0.5">
              <div className="h-full bg-secondary rounded-l-full" style={{ width: '20%' }} title="Từ Mới"></div>
              <div className="h-full bg-tertiary" style={{ width: '50%' }} title="Cần Ôn SRS"></div>
              <div className="h-full bg-primary rounded-r-full" style={{ width: '30%' }} title="Từ Hay Quên"></div>
            </div>
          </div>
        </header>
        <section
          aria-label="Practice Dimensions"
          className="w-full bg-surface-container-low rounded-xl p-space-sm flex items-center justify-between overflow-x-auto gap-space-sm shadow-sm"
        >
          <div className="flex items-center gap-2 min-w-max">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              <span>Chiều 1: Chọn Nghĩa</span>
            </div>
            <div className="w-4 h-0.5 bg-surface-container-highest"></div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm font-bold shadow-sm">
              <span className="material-symbols-outlined text-[16px]">psychology</span>
              <span>Chiều 2: Nhớ Hán Tự (Đang Làm)</span>
            </div>
            <div className="w-4 h-0.5 bg-surface-container-highest"></div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[16px]">record_voice_over</span>
              <span>Chiều 3: Pinyin &amp; Thanh Điệu</span>
            </div>
            <div className="w-4 h-0.5 bg-surface-container-highest"></div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[16px]">hearing</span>
              <span>Chiều 4: Luyện Nghe</span>
            </div>
            <div className="w-4 h-0.5 bg-surface-container-highest"></div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[16px]">draw</span>
              <span>Chiều 5: Điền Khuyết</span>
            </div>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant hidden lg:inline-block">
            5 Chiều Ghi Nhớ Sâu
          </span>
        </section>
        <main className="w-full grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          <div className="lg:col-span-8 flex flex-col gap-space-md">
            <article className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col items-center text-center relative overflow-hidden">
              <div className="w-full flex items-center justify-between pb-space-md mb-space-sm border-b border-surface-container-high">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[16px] text-primary">visibility</span>
                  <span>DẠNG BÀI: NHÌN NGHĨA NHỚ CHỮ HÁN (ACTIVE RECALL)</span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant tracking-wider uppercase">
                  HSK Cấp Độ 1 • Mục Từ #042
                </span>
              </div>
              <div className="py-space-md flex flex-col items-center gap-space-xs max-w-xl">
                <span className="font-title-sm text-title-sm text-on-surface-variant">Nghĩa của từ cần tìm là:</span>
                <h2 className="font-headline-xl text-headline-xl text-on-surface tracking-tight font-bold my-1">
                  {' '}
                  Giáo viên / Thầy cô{' '}
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  {' '}
                  Hãy chọn đúng tổ hợp chữ Hán biểu đạt ngữ nghĩa trên mà không cần dựa vào phiên âm.{' '}
                </p>
              </div>
              <div className="mt-space-xs mb-space-md">
                <button
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-all shadow-sm"
                  id="btnAudioHint"
                  type="button"
                >
                  <span className="material-symbols-outlined text-primary text-[20px]">volume_up</span>
                  <span>
                    Nghe gợi ý phát âm: <strong className="text-primary tracking-wide">lǎoshī</strong>
                  </span>
                </button>
              </div>
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-space-md mt-space-sm text-left">
                <button
                  type="button"
                  onClick={() => setSel(0)}
                  className={
                    sel === 0
                      ? 'relative p-space-md rounded-xl bg-secondary-container text-on-secondary-container transition-all flex items-center justify-between shadow-md'
                      : 'group relative p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex items-center justify-between shadow-sm'
                  }
                >
                  <div className="flex items-center gap-space-md">
                    <span className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center font-title-sm text-title-sm font-bold text-on-surface-variant">
                      A
                    </span>
                    <div className="flex flex-col">
                      <span className="font-headline-xl text-headline-xl text-on-surface leading-none font-display-character">
                        学生
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant opacity-70 mt-1">
                        xuéshēng • Học sinh
                      </span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-surface-container-highest group-hover:text-on-surface-variant text-[24px]">
                    radio_button_unchecked
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setSel(1)}
                  className={
                    sel === 1
                      ? 'relative p-space-md rounded-xl bg-secondary-container text-on-secondary-container transition-all flex items-center justify-between shadow-md'
                      : 'group relative p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex items-center justify-between shadow-sm'
                  }
                >
                  <div className="flex items-center gap-space-md">
                    <span className="w-8 h-8 rounded-lg bg-secondary text-on-secondary flex items-center justify-center font-title-sm text-title-sm font-bold">
                      B
                    </span>
                    <div className="flex flex-col">
                      <span className="font-headline-xl text-headline-xl text-on-surface leading-none font-display-character font-bold">
                        老师
                      </span>
                      <span className="font-body-sm text-body-sm text-on-secondary-container font-bold mt-1">
                        lǎoshī • Giáo viên
                      </span>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-[20px]">check</span>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setSel(2)}
                  className={
                    sel === 2
                      ? 'relative p-space-md rounded-xl bg-secondary-container text-on-secondary-container transition-all flex items-center justify-between shadow-md'
                      : 'group relative p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex items-center justify-between shadow-sm'
                  }
                >
                  <div className="flex items-center gap-space-md">
                    <span className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center font-title-sm text-title-sm font-bold text-on-surface-variant">
                      C
                    </span>
                    <div className="flex flex-col">
                      <span className="font-headline-xl text-headline-xl text-on-surface leading-none font-display-character">
                        中国
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant opacity-70 mt-1">
                        Zhōngguó • Trung Quốc
                      </span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-surface-container-highest group-hover:text-on-surface-variant text-[24px]">
                    radio_button_unchecked
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setSel(3)}
                  className={
                    sel === 3
                      ? 'relative p-space-md rounded-xl bg-secondary-container text-on-secondary-container transition-all flex items-center justify-between shadow-md'
                      : 'group relative p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex items-center justify-between shadow-sm'
                  }
                >
                  <div className="flex items-center gap-space-md">
                    <span className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center font-title-sm text-title-sm font-bold text-on-surface-variant">
                      D
                    </span>
                    <div className="flex flex-col">
                      <span className="font-headline-xl text-headline-xl text-on-surface leading-none font-display-character">
                        名字
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant opacity-70 mt-1">
                        míngzi • Tên gọi
                      </span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-surface-container-highest group-hover:text-on-surface-variant text-[24px]">
                    radio_button_unchecked
                  </span>
                </button>
              </div>
              <div className="w-full flex items-center justify-between mt-space-md pt-space-sm text-on-surface-variant font-label-sm text-label-sm">
                <span>Phím tắt: Bấm phím [A, B, C, D] hoặc [1, 2, 3, 4] để chọn nhanh</span>
                <button className="hover:text-primary underline flex items-center gap-1" type="button">
                  <span className="material-symbols-outlined text-[16px]">help</span>
                  <span>Mẹo ghi nhớ Hán tự</span>
                </button>
              </div>
            </article>
            <section className="w-full bg-surface-container-lowest rounded-xl shadow-md p-space-lg flex flex-col gap-space-md overflow-hidden relative">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
                <div className="flex items-center gap-space-sm">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-on-secondary shadow-sm">
                    <span className="material-symbols-outlined text-[24px]">done_all</span>
                  </div>
                  <div>
                    <h3 className="font-headline-md text-headline-md text-secondary font-bold">
                      Chính xác hoàn hảo! +10 XP
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Bạn đã phản hồi trong 1.8 giây (Rất nhanh)
                    </p>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-label-md font-bold self-start sm:self-auto">
                  <span className="material-symbols-outlined text-[16px]">trending_up</span>
                  <span>Đạt mốc Master Lv.2</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md p-space-md rounded-xl bg-surface-container-low">
                <div className="flex flex-col gap-1">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    Từ Vựng Phân Tích
                  </span>
                  <div className="flex items-baseline gap-space-sm">
                    <span className="font-display-character text-[32px] font-bold text-on-surface">老师</span>
                    <span className="font-title-sm text-title-sm text-primary font-bold">lǎoshī</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">• Âm Hán Việt: Lão Sư</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface mt-1">
                    <strong>老 (Lão):</strong> Kính ngữ, người nhiều kinh nghiệm; <strong>师 (Sư):</strong> Người dạy
                    học, bậc thầy tri thức.{' '}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    Câu Ví Dụ Thực Tế
                  </span>
                  <p className="font-headline-md text-headline-md text-on-surface font-display-character">我是老师。</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Wǒ shì lǎoshī. • Tôi là giáo viên.
                  </p>
                  <div className="flex items-center gap-space-xs mt-1">
                    <button
                      className="inline-flex items-center gap-1 text-primary hover:opacity-80 font-label-sm text-label-sm font-bold"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">volume_up</span>
                      <span>Nghe câu mẫu</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-space-sm rounded-lg bg-surface-container flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs text-on-surface">
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-secondary text-[22px]">calendar_clock</span>
                  <span className="font-body-sm text-body-sm">
                    <strong>Thuật toán SRS:</strong> Chu kỳ ôn tập tiếp theo chuyển từ{' '}
                    <del className="text-on-surface-variant">1 ngày</del> ➔{' '}
                    <span className="font-bold text-secondary">3 ngày</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Độ bền vững trí nhớ:</span>
                  <span className="font-label-sm text-label-sm font-bold px-2 py-0.5 rounded bg-secondary text-on-secondary">
                    70%
                  </span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-space-md pt-space-xs">
                <button
                  className="inline-flex items-center gap-1.5 text-on-surface-variant hover:text-error transition-all font-body-sm text-body-sm"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">flag</span>
                  <span>Báo lỗi câu hỏi</span>
                </button>
                <div className="flex items-center gap-space-sm w-full sm:w-auto">
                  <button
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-title-sm text-title-sm transition-all shadow-sm"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">bookmark_add</span>
                    <span>Lưu vào Sổ Tay</span>
                  </button>
                  <button
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-primary-container text-on-primary font-title-sm text-title-sm hover:opacity-95 shadow-md transition-all"
                    id="btnNextExercise"
                    type="button"
                    onClick={goNext}
                  >
                    <span>Câu tiếp theo</span>
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </section>
          </div>
          <aside className="lg:col-span-4 flex flex-col gap-space-md">
            <div className="w-full bg-surface-container-lowest rounded-xl shadow-sm p-space-md flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <h4 className="font-title-sm text-title-sm text-on-surface font-bold">Cấu Trúc Chi Tiết Hán Tự</h4>
                <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
                  Bộ thủ liên quan
                </span>
              </div>
              <div className="grid grid-cols-2 gap-space-sm">
                <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center gap-space-sm">
                  <div className="w-10 h-10 rounded-md bg-surface-container-high flex items-center justify-center font-display-character text-headline-md font-bold text-primary">
                    {' '}
                    老{' '}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-title-sm text-title-sm text-on-surface truncate">Bộ Lão (耂)</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant truncate">6 nét • Già, thọ</span>
                  </div>
                </div>
                <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center gap-space-sm">
                  <div className="w-10 h-10 rounded-md bg-surface-container-high flex items-center justify-center font-display-character text-headline-md font-bold text-secondary">
                    {' '}
                    巾{' '}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-title-sm text-title-sm text-on-surface truncate">Bộ Cân (巾)</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                      3 nét • Khăn, vải
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-space-md rounded-xl bg-tertiary-fixed text-on-tertiary-fixed flex flex-col gap-1 shadow-sm">
                <div className="flex items-center gap-1.5 font-label-md text-label-md font-bold text-tertiary">
                  <span className="material-symbols-outlined text-[18px]">lightbulb</span>
                  <span>Mẹo ghi nhớ trực quan</span>
                </div>
                <p className="font-body-sm text-body-sm mt-1">
                  {' '}
                  "Vị <strong>thầy giáo</strong> lớn tuổi (老) dắt chiếc khăn thắt lưng (巾) chỉ huy toàn bộ môn sinh
                  trong lớp học."{' '}
                </p>
              </div>
              <div className="flex flex-col gap-space-xs pt-space-xs border-t border-surface-container-high">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Lịch Trình Ôn Lại Tiếp Theo
                </span>
                <div className="flex items-center justify-between text-body-sm font-body-sm">
                  <span className="text-on-surface">Lần 1 (Hiện tại)</span>
                  <span className="text-secondary font-bold">Hôm nay</span>
                </div>
                <div className="flex items-center justify-between text-body-sm font-body-sm">
                  <span className="text-on-surface">Lần 2 (SRS Level 3)</span>
                  <span className="text-on-surface-variant font-medium">3 ngày nữa (18/10)</span>
                </div>
                <div className="flex items-center justify-between text-body-sm font-body-sm">
                  <span className="text-on-surface">Lần 3 (SRS Level 4)</span>
                  <span className="text-on-surface-variant font-medium">8 ngày nữa (23/10)</span>
                </div>
              </div>
            </div>
            <div className="w-full bg-surface-container-lowest rounded-xl shadow-sm p-space-md flex flex-col gap-space-sm">
              <div className="flex items-center justify-between">
                <h4 className="font-title-sm text-title-sm text-on-surface font-bold">Thống Kê Phiên Này</h4>
                <span className="material-symbols-outlined text-on-surface-variant text-[20px]">insights</span>
              </div>
              <div className="grid grid-cols-3 gap-space-xs text-center">
                <div className="p-2 rounded-lg bg-surface-container-low flex flex-col">
                  <span className="font-headline-md text-headline-md font-bold text-secondary">6/7</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Chính xác</span>
                </div>
                <div className="p-2 rounded-lg bg-surface-container-low flex flex-col">
                  <span className="font-headline-md text-headline-md font-bold text-tertiary">2.1s</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Tốc độ TB</span>
                </div>
                <div className="p-2 rounded-lg bg-surface-container-low flex flex-col">
                  <span className="font-headline-md text-headline-md font-bold text-primary">85.7%</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Tỉ lệ đúng</span>
                </div>
              </div>
              <div className="flex items-center gap-space-md p-space-xs mt-1">
                <svg className="w-12 h-12 shrink-0 transform -rotate-90" viewBox="0 0 36 36">
                  <circle
                    className="text-surface-container-highest"
                    cx="18"
                    cy="18"
                    fill="transparent"
                    r="15.91549430918954"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                  <circle
                    className="text-secondary"
                    cx="18"
                    cy="18"
                    fill="transparent"
                    r="15.91549430918954"
                    stroke="currentColor"
                    strokeDasharray="86 14"
                    strokeLinecap="round"
                    strokeWidth="3"
                  />
                </svg>
                <div className="flex flex-col">
                  <span className="font-title-sm text-title-sm font-bold text-on-surface leading-snug">
                    Khả năng ghi nhớ tốt
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Đạt chỉ tiêu tốc độ và độ chuẩn xác SRS
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full p-space-md rounded-xl bg-surface-container-low flex items-start gap-space-sm">
              <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">verified_user</span>
              <div className="flex flex-col">
                <span className="font-title-sm text-title-sm font-bold text-on-surface">
                  Thuật toán SuperMemo-2 tinh chỉnh
                </span>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  {' '}
                  Các từ bạn phản hồi đúng dưới 3 giây sẽ tự động được gia tăng khoảng cách xuất hiện để tối ưu thời
                  gian học tập.{' '}
                </p>
              </div>
            </div>
          </aside>
        </main>
      </div>
    </AppShell>
  );
}
