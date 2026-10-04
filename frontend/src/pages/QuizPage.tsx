import { useNavigate } from 'react-router-dom';
import AppShell from '../layouts/AppShell';
import usePracticeNext from '../lib/usePracticeFlow';

export default function QuizPage() {
  const navigate = useNavigate();
  const goNext = usePracticeNext();

  return (
    <AppShell>
      <div className="flex flex-col w-full max-w-5xl mx-auto gap-space-lg pb-space-xl">
        <div className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-[0_2px_12px_rgba(15,23,42,0.03)] flex flex-col gap-space-sm">
          <div className="flex flex-wrap items-center justify-between gap-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span> HSK 1 Cốt Lõi{' '}
              </span>
              <span className="text-on-surface-variant font-label-md text-label-md">/</span>
              <span className="font-label-md text-label-md text-on-surface-variant font-semibold">
                Trắc Nghiệm Thuận (Hán Tự → Nghĩa)
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-md text-label-md font-bold shadow-[0_2px_6px_rgba(217,119,6,0.15)]">
                <span className="material-symbols-outlined text-[18px] text-tertiary">local_fire_department</span>
                <span>4 Đúng Liên Tiếp</span>
                <span className="text-tertiary font-bold text-label-sm">(+15 XP)</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-container text-on-surface font-title-sm text-title-sm">
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant">timer</span>
                <span className="font-mono font-bold tracking-tight">02:45</span>
              </div>
              <button
                className="w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant flex items-center justify-center transition-colors"
                title="Tạm dừng phiên ôn tập"
                type="button"
                onClick={() => navigate('/practice')}
              >
                <span className="material-symbols-outlined text-[18px]">pause</span>
              </button>
            </div>
          </div>
          <div className="flex items-center gap-space-md pt-1">
            <div className="flex-1">
              <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden flex">
                <div className="h-full bg-primary transition-all duration-500 ease-out" style={{ width: '30%' }}></div>
              </div>
            </div>
            <div className="flex items-baseline gap-1 shrink-0 font-label-sm text-label-sm text-on-surface-variant">
              <span>Tiến độ:</span>
              <span className="font-bold text-on-surface text-label-md">03</span>
              <span>/</span>
              <span>10 Câu</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          <div className="lg:col-span-5 flex flex-col gap-space-md">
            <div className="relative bg-surface-container-lowest rounded-2xl p-space-lg shadow-[0_4px_20px_rgba(15,23,42,0.04)] overflow-hidden flex flex-col items-center text-center">
              <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-primary-fixed/30 blur-2xl pointer-events-none"></div>
              <div className="absolute -left-8 -bottom-8 w-36 h-36 rounded-full bg-secondary-fixed/20 blur-2xl pointer-events-none"></div>
              <div className="w-full flex items-center justify-between pb-space-md">
                <span className="px-2.5 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-semibold tracking-wider">
                  HSK 1 • BẬC 1
                </span>
                <span className="px-2.5 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-semibold tracking-wider">
                  DANH TỪ (名词)
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-sm">
                Chọn ý nghĩa tiếng Việt chính xác của từ vựng:
              </p>
              <div className="relative my-2 py-3 px-8 rounded-2xl bg-surface-container-low/60 flex items-center justify-center min-w-[220px]">
                <div className="absolute inset-0 pointer-events-none opacity-20 flex items-center justify-center">
                  <div className="w-full h-px bg-primary"></div>
                  <div className="h-full w-px bg-primary absolute"></div>
                </div>
                <span className="font-display-character text-display-character text-on-surface tracking-wider select-none font-bold">
                  老师
                </span>
              </div>
              <div className="flex items-center gap-2 mt-2 mb-1">
                <span className="font-headline-lg text-headline-lg text-primary font-bold tracking-wide">lǎoshī</span>
                <button
                  className="w-9 h-9 rounded-full bg-primary-fixed text-on-primary-fixed hover:bg-primary hover:text-on-primary flex items-center justify-center transition-all shadow-sm group"
                  title="Phát âm chuẩn giọng Bắc Kinh (Space)"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">
                    volume_up
                  </span>
                </button>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-0.5 rounded bg-surface-container text-[11px] font-label-sm text-on-surface-variant">
                  Thanh 3 (ǎ) + Thanh 1 (ī)
                </span>
                <span className="px-2 py-0.5 rounded bg-surface-container text-[11px] font-label-sm text-on-surface-variant">
                  2 Âm tiết • 10 Nét
                </span>
              </div>
            </div>
            <div className="bg-surface-container-low rounded-xl p-space-md flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[22px]">psychology</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                  Mẹo liên tưởng tức thì
                </span>
                <span className="font-body-sm text-body-sm text-on-surface">
                  "Lão" trong kỳ cựu uyên bác, "Sư" trong bậc danh sư tri thức.
                </span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            <div className="grid grid-cols-1 gap-space-sm">
              <button
                className="group relative w-full text-left p-space-md rounded-xl bg-surface-container-lowest hover:bg-surface-container-low shadow-[0_1px_4px_rgba(15,23,42,0.04)] transition-all flex items-center justify-between opacity-80 hover:opacity-100"
                type="button"
              >
                <div className="flex items-center gap-space-md">
                  <span className="w-8 h-8 rounded-lg bg-surface-container group-hover:bg-surface-container-high text-on-surface-variant font-title-sm text-title-sm flex items-center justify-center font-bold">
                    A
                  </span>
                  <div className="flex flex-col">
                    <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                      Học sinh, sinh viên
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">学生 (xuésheng)</span>
                  </div>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant/60 font-mono tracking-wider">
                  [Phím A]
                </span>
              </button>
              <div className="relative w-full text-left p-space-md rounded-xl bg-secondary-container text-on-secondary-container shadow-[0_4px_16px_rgba(0,108,74,0.12)] flex items-center justify-between scale-[1.01] transition-transform">
                <div className="flex items-center gap-space-md">
                  <span className="w-8 h-8 rounded-lg bg-secondary text-on-secondary font-title-sm text-title-sm flex items-center justify-center font-bold shadow-sm">
                    <span className="material-symbols-outlined text-[18px]">check</span>
                  </span>
                  <div className="flex flex-col">
                    <span className="font-title-sm text-title-sm font-bold text-secondary">
                      Giáo viên, thầy cô giáo
                    </span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-secondary font-bold">
                        <span className="material-symbols-outlined text-[14px]">verified</span> Chính xác! +10 XP{' '}
                      </span>
                      <span className="font-label-sm text-label-sm text-on-secondary-container/80">
                        • Tốc độ 1.2s (Rất nhanh)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm font-bold tracking-wider">
                    ĐÁP ÁN ĐÚNG
                  </span>
                </div>
              </div>
              <button
                className="group relative w-full text-left p-space-md rounded-xl bg-surface-container-lowest hover:bg-surface-container-low shadow-[0_1px_4px_rgba(15,23,42,0.04)] transition-all flex items-center justify-between opacity-80 hover:opacity-100"
                type="button"
              >
                <div className="flex items-center gap-space-md">
                  <span className="w-8 h-8 rounded-lg bg-surface-container group-hover:bg-surface-container-high text-on-surface-variant font-title-sm text-title-sm flex items-center justify-center font-bold">
                    C
                  </span>
                  <div className="flex flex-col">
                    <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                      Trung Quốc, đất nước
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">中国 (zhōngguó)</span>
                  </div>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant/60 font-mono tracking-wider">
                  [Phím C]
                </span>
              </button>
              <button
                className="group relative w-full text-left p-space-md rounded-xl bg-surface-container-lowest hover:bg-surface-container-low shadow-[0_1px_4px_rgba(15,23,42,0.04)] transition-all flex items-center justify-between opacity-80 hover:opacity-100"
                type="button"
              >
                <div className="flex items-center gap-space-md">
                  <span className="w-8 h-8 rounded-lg bg-surface-container group-hover:bg-surface-container-high text-on-surface-variant font-title-sm text-title-sm flex items-center justify-center font-bold">
                    D
                  </span>
                  <div className="flex flex-col">
                    <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                      Bác sĩ, thầy thuốc
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">医生 (yīshēng)</span>
                  </div>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant/60 font-mono tracking-wider">
                  [Phím D]
                </span>
              </button>
            </div>
            <div className="w-full bg-surface-container-lowest rounded-2xl p-space-lg shadow-[0_8px_24px_rgba(15,23,42,0.05)] flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
                    <span className="material-symbols-outlined text-[16px] font-bold">thumb_up</span>
                  </div>
                  <span className="font-title-sm text-title-sm font-bold text-secondary">
                    Xuất Sắc! Phản Xạ Chuẩn Xác
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">
                  <span className="material-symbols-outlined text-[14px]">military_tech</span> Cấp SRS: Bậc Thầy (Guru
                  II){' '}
                </span>
              </div>
              <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-primary">
                    Chiết tự Hán tự
                  </span>
                  <span className="text-on-surface-variant text-[11px]">• Thâm nhập ý nghĩa cốt lõi</span>
                </div>
                <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                  <strong className="font-headline-xl text-[16px] text-primary">老</strong> (Bộ Lão: người cao tuổi từng
                  trải, dày dặn trí huệ) + <strong className="font-headline-xl text-[16px] text-primary">师</strong> (Bộ
                  Cân / Đạo quân: chỉ người đứng đầu chỉ dẫn) →{' '}
                  <span className="italic text-on-surface-variant">
                    Người thầy tôn kính truyền thụ tri thức và đạo lý.
                  </span>
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-on-surface-variant">
                  Câu Ví Dụ Ứng Dụng Thực Tế
                </span>
                <div className="p-space-md rounded-xl bg-surface-container flex items-start justify-between gap-space-sm">
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-headline-xl text-headline-md font-bold text-on-surface">
                        王老师是好老师。
                      </span>
                      <button
                        className="text-primary hover:opacity-80 transition-opacity"
                        title="Nghe câu mẫu"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">volume_up</span>
                      </button>
                    </div>
                    <span className="font-body-sm text-body-sm text-primary font-semibold">
                      Wáng lǎoshī shì hǎo lǎoshī.
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Thầy Vương là một người thầy rất tốt.
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm shrink-0">
                    HSK 1 Chuẩn
                  </span>
                </div>
              </div>
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-bold">
                      Độ bền trí nhớ:
                    </span>
                    <div className="flex items-center gap-1 font-label-md text-label-md font-bold">
                      <span className="text-on-surface-variant line-through">72%</span>
                      <span className="material-symbols-outlined text-[14px] text-secondary">trending_up</span>
                      <span className="text-secondary">84%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px] text-primary">schedule</span>
                  <span>Chu kỳ ôn tập tiếp theo:</span>
                  <span className="font-bold text-on-surface">Sau 3 ngày (14:00)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-[0_2px_12px_rgba(15,23,42,0.03)] flex flex-col sm:flex-row items-center justify-between gap-space-md">
          <div className="hidden md:flex items-center gap-space-md text-on-surface-variant font-label-sm text-label-sm">
            <div className="flex items-center gap-1.5">
              <kbd className="px-2 py-1 rounded bg-surface-container font-mono text-[11px] font-bold text-on-surface shadow-sm">
                A - D
              </kbd>
              <span>Chọn đáp án</span>
            </div>
            <span className="opacity-40">•</span>
            <div className="flex items-center gap-1.5">
              <kbd className="px-2 py-1 rounded bg-surface-container font-mono text-[11px] font-bold text-on-surface shadow-sm">
                Space
              </kbd>
              <span>Phát âm lại</span>
            </div>
            <span className="opacity-40">•</span>
            <div className="flex items-center gap-1.5">
              <kbd className="px-2 py-1 rounded bg-surface-container font-mono text-[11px] font-bold text-on-surface shadow-sm">
                Enter
              </kbd>
              <span>Chuyển câu tiếp</span>
            </div>
          </div>
          <div className="w-full sm:w-auto flex items-center justify-end gap-space-sm">
            <button
              className="px-3.5 py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface font-title-sm text-title-sm inline-flex items-center gap-1.5 transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">edit_note</span>
              <span className="hidden sm:inline">Ghi chú</span>
            </button>
            <button
              className="px-3.5 py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface font-title-sm text-title-sm inline-flex items-center gap-1.5 transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">flag</span>
              <span className="hidden sm:inline">Báo cáo</span>
            </button>
            <button
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-lg bg-primary-container text-on-primary font-title-sm text-title-sm font-bold shadow-[0_4px_14px_rgba(190,18,60,0.3)] hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] transition-all inline-flex items-center justify-center gap-2"
              id="btn-next-quiz"
              type="button"
              onClick={goNext}
            >
              <span>Câu Tiếp Theo</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-black/20 font-mono text-[11px]">
                Enter
              </kbd>
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
