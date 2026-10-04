import { useNavigate } from 'react-router-dom';
import AppShell from '../layouts/AppShell';
import usePracticeNext from '../lib/usePracticeFlow';

export default function TranslationPracticePage() {
  const navigate = useNavigate();
  const goNext = usePracticeNext();

  return (
    <AppShell>
      <div className="flex flex-col w-full gap-space-lg">
        <div className="flex flex-wrap items-center justify-between gap-space-md pb-space-xs">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm uppercase tracking-wider">
              <span>Luyện Tập Nâng Cao</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-primary font-bold">Ngữ Cảnh &amp; Dịch Thuật</span>
            </div>
            <div className="flex items-center gap-space-md">
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                Thực Hành Điền Khuyết &amp; Dịch 2 Chiều
              </h1>
              <span className="inline-flex items-center gap-space-xs px-space-sm py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-sm font-semibold">
                <span className="w-2 h-2 rounded-full bg-secondary"></span> HSK 2 - Module Ngữ Pháp{' '}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-space-md">
            <div className="flex flex-col gap-1 min-w-[140px]">
              <div className="flex justify-between font-label-sm text-on-surface-variant font-medium">
                <span>Tiến độ bài</span>
                <span className="text-primary font-bold">4 / 10</span>
              </div>
              <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-container rounded-full transition-all duration-300"
                  style={{ width: '40%' }}
                ></div>
              </div>
            </div>
            <div className="flex items-center gap-space-xs bg-surface-container px-space-md py-space-xs rounded-full shadow-sm">
              <span className="material-symbols-outlined text-primary text-[18px]">timer</span>
              <span
                className="font-label-md text-label-md text-on-surface font-semibold tabular-nums"
                id="countdownTimer"
              >
                04:15
              </span>
            </div>
            <div className="flex items-center gap-space-xs bg-tertiary-fixed px-space-md py-space-xs rounded-full shadow-[0_2px_8px_rgba(217,119,6,0.18)]">
              <span className="material-symbols-outlined text-tertiary text-[18px]">local_fire_department</span>
              <span className="font-label-sm text-label-sm text-on-tertiary-fixed font-bold">12 Ngày</span>
            </div>
            <div className="flex items-center gap-space-xs bg-secondary-fixed px-space-md py-space-xs rounded-full">
              <span className="material-symbols-outlined text-secondary text-[18px]">stars</span>
              <span className="font-label-sm text-label-sm text-on-secondary-fixed font-bold">+40 XP</span>
            </div>
          </div>
        </div>
        <div className="bg-surface-container-low p-space-xs rounded-xl flex items-center justify-between gap-space-xs overflow-x-auto">
          <div className="flex items-center gap-space-xs">
            <button
              className="flex items-center gap-space-xs px-space-md py-space-sm rounded-lg bg-surface-container-lowest text-primary shadow-sm font-title-sm text-title-sm transition-all"
              type="button"
              onClick={() => navigate('/practice/fill-blank')}
            >
              <span className="material-symbols-outlined text-[18px]">edit_square</span>
              <span>Điền Từ Vào Chỗ Trống</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-bold">
                Active
              </span>
            </button>
            <button
              className="flex items-center gap-space-xs px-space-md py-space-sm rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all font-title-sm text-title-sm"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">translate</span>
              <span>Dịch Việt ➔ Trung (Active Recall)</span>
            </button>
            <button
              className="flex items-center gap-space-xs px-space-md py-space-sm rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all font-title-sm text-title-sm"
              type="button"
              onClick={() => navigate('/practice/translation-hub')}
            >
              <span className="material-symbols-outlined text-[18px]">file_copy</span>
              <span>Dịch Trung ➔ Việt (Đọc Hiểu)</span>
            </button>
          </div>
          <div className="hidden lg:flex items-center gap-space-sm px-space-sm text-on-surface-variant font-label-sm">
            <span className="material-symbols-outlined text-[16px]">keyboard</span>{' '}
            <span>Phím tắt IME tự động kích hoạt</span>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          <div className="lg:col-span-6 flex flex-col gap-space-md">
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-primary/5 pointer-events-none"></div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                    Phần 1: Ngữ cảnh khuyết từ
                  </span>
                </div>
                <span className="px-space-sm py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm font-semibold">
                  {' '}
                  Cấp độ 1 • Chọn từ chuẩn xác{' '}
                </span>
              </div>
              <div className="bg-surface-container-low rounded-xl p-space-lg flex flex-col items-center justify-center gap-space-sm text-center">
                <div className="font-headline-xl text-headline-xl text-on-surface tracking-wide flex items-center gap-space-xs flex-wrap justify-center">
                  <span>我</span>
                  <span
                    className="inline-flex items-center justify-center min-w-[72px] h-12 bg-secondary/10 text-secondary font-headline-lg text-headline-lg rounded-lg px-space-sm font-bold shadow-sm transition-all duration-300"
                    id="targetBlank"
                  >
                    是
                  </span>
                  <span>学生。</span>
                </div>
                <div className="flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
                  <span>Pinyin:</span>
                  <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                    Wǒ <span className="text-secondary underline underline-offset-4">shì</span> xuéshēng.
                  </span>
                </div>
                <div className="inline-flex items-center gap-space-xs bg-surface-container-lowest px-space-md py-1 rounded-full text-on-surface-variant font-label-sm">
                  <span className="material-symbols-outlined text-[16px] text-primary">lightbulb</span>
                  <span>
                    Gợi ý: Tôi <strong>[là]</strong> học sinh.
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-space-xs">
                <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wide">
                  Chọn đáp án điền vào chỗ trống:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm" id="blankOptions">
                  <button
                    className="group relative flex flex-col items-center justify-center p-space-md rounded-xl bg-secondary-container text-on-secondary-container shadow-md transition-all"
                    data-val="是"
                    type="button"
                  >
                    <span className="font-headline-xl text-headline-xl font-bold">是</span>
                    <span className="font-label-sm text-label-sm mt-1">shì • là</span>
                    <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-secondary text-on-secondary flex items-center justify-center text-[10px]">
                      <span className="material-symbols-outlined text-[12px]">check</span>
                    </span>
                  </button>
                  <button
                    className="group flex flex-col items-center justify-center p-space-md rounded-xl bg-surface-container-low text-on-surface hover:bg-surface-container hover:shadow-sm transition-all"
                    data-val="在"
                    type="button"
                  >
                    <span className="font-headline-xl text-headline-xl font-medium text-on-surface">在</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">zài • ở</span>
                  </button>
                  <button
                    className="group flex flex-col items-center justify-center p-space-md rounded-xl bg-surface-container-low text-on-surface hover:bg-surface-container hover:shadow-sm transition-all"
                    data-val="有"
                    type="button"
                  >
                    <span className="font-headline-xl text-headline-xl font-medium text-on-surface">有</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">yǒu • có</span>
                  </button>
                  <button
                    className="group flex flex-col items-center justify-center p-space-md rounded-xl bg-surface-container-low text-on-surface hover:bg-surface-container hover:shadow-sm transition-all"
                    data-val="很"
                    type="button"
                  >
                    <span className="font-headline-xl text-headline-xl font-medium text-on-surface">很</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">hěn • rất</span>
                  </button>
                </div>
              </div>
              <div className="bg-surface-container-high/60 rounded-xl p-space-md flex gap-space-md items-start">
                <div className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center text-primary shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[20px]">auto_stories</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-title-sm text-title-sm text-primary font-bold">
                    Hư từ &amp; Động từ hệ từ (Copula Verb)
                  </span>
                  <p className="font-body-sm text-body-sm text-on-surface">
                    {' '}
                    Động từ <strong>"是" (shì)</strong> dùng để nối chủ ngữ và vị ngữ chỉ danh tính, nghề nghiệp, quốc
                    tịch hoặc tương đương. Không dùng "很" trước danh từ nghề nghiệp.{' '}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-space-md">
                <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary font-bold">
                  <span className="material-symbols-outlined text-[22px]">psychology</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-title-sm text-title-sm text-on-surface">Kho từ SRS hôm nay</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    2/4 cấu trúc ngữ pháp đạt trạng thái <strong>Guru</strong>
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 font-label-sm text-secondary font-bold">
                <span>+10 Mnemonic Score</span>
                <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 flex flex-col gap-space-md">
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                    Phần 2: Dịch 2 Chiều Chuyên Sâu
                  </span>
                </div>
                <span className="px-space-sm py-0.5 rounded-full bg-primary-fixed text-primary font-label-sm font-bold">
                  {' '}
                  Độ khó: Active Production{' '}
                </span>
              </div>
              <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col gap-space-xs">
                <div className="flex items-center justify-between text-on-surface-variant font-label-sm">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-secondary">language</span> Ngữ cảnh
                    nguồn (Tiếng Việt){' '}
                  </span>
                  <span className="text-xs text-on-surface-variant">HSK 2 Standard Exam</span>
                </div>
                <p className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">
                  {' '}
                  "Thầy Vương là giáo viên tiếng Trung của chúng tôi."{' '}
                </p>
                <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm mt-1">
                  <span className="material-symbols-outlined text-[16px] text-tertiary">tune</span>
                  <span>Yêu cầu: Ghép từ từ ngân hàng hoặc gõ Pinyin có trợ lý thanh điệu.</span>
                </div>
              </div>
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wide">
                    Ngân hàng cụm từ (Word Bank):
                  </span>
                  <button
                    className="text-primary hover:text-primary-container font-label-sm text-label-sm flex items-center gap-0.5"
                    id="resetChipsBtn"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[14px]">refresh</span> Đặt lại{' '}
                  </button>
                </div>
                <div className="flex flex-wrap gap-space-xs" id="wordBank">
                  <button
                    className="chip-btn px-space-md py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-title-sm text-title-sm transition-all shadow-sm flex items-center gap-1"
                    data-token="王老师"
                    type="button"
                  >
                    <span>王老师</span>
                    <span className="text-[11px] text-on-surface-variant font-normal">Wáng lǎoshī</span>
                  </button>
                  <button
                    className="chip-btn px-space-md py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-title-sm text-title-sm transition-all shadow-sm flex items-center gap-1"
                    data-token="是"
                    type="button"
                  >
                    <span>是</span>
                    <span className="text-[11px] text-on-surface-variant font-normal">shì</span>
                  </button>
                  <button
                    className="chip-btn px-space-md py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-title-sm text-title-sm transition-all shadow-sm flex items-center gap-1"
                    data-token="我们"
                    type="button"
                  >
                    <span>我们</span>
                    <span className="text-[11px] text-on-surface-variant font-normal">wǒmen</span>
                  </button>
                  <button
                    className="chip-btn px-space-md py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-title-sm text-title-sm transition-all shadow-sm flex items-center gap-1"
                    data-token="的"
                    type="button"
                  >
                    <span>的</span>
                    <span className="text-[11px] text-on-surface-variant font-normal">de</span>
                  </button>
                  <button
                    className="chip-btn px-space-md py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-title-sm text-title-sm transition-all shadow-sm flex items-center gap-1"
                    data-token="汉语"
                    type="button"
                  >
                    <span>汉语</span>
                    <span className="text-[11px] text-on-surface-variant font-normal">hànyǔ</span>
                  </button>
                  <button
                    className="chip-btn px-space-md py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-title-sm text-title-sm transition-all shadow-sm flex items-center gap-1"
                    data-token="老师"
                    type="button"
                  >
                    <span>老师</span>
                    <span className="text-[11px] text-on-surface-variant font-normal">lǎoshī</span>
                  </button>
                  <button
                    className="chip-btn px-space-md py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant font-title-sm text-title-sm transition-all opacity-60"
                    data-token="学生"
                    type="button"
                  >
                    <span>学生</span> <span className="text-[11px] text-on-surface-variant font-normal">xuéshēng</span>
                  </button>
                  <button
                    className="chip-btn px-space-md py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant font-title-sm text-title-sm transition-all opacity-60"
                    data-token="吗"
                    type="button"
                  >
                    <span>吗</span> <span className="text-[11px] text-on-surface-variant font-normal">ma</span>
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between font-label-sm text-on-surface-variant">
                  <span>Bản dịch hoàn thiện của bạn:</span>
                  <span className="text-secondary font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">spellcheck</span> IME Pinyin hỗ trợ: wáng
                    lǎoshī shì wǒmen de...{' '}
                  </span>
                </div>
                <div className="bg-surface-container rounded-xl p-space-md flex items-center justify-between gap-space-md shadow-inner">
                  <div className="flex-1">
                    <div
                      className="font-headline-md text-headline-md text-on-surface tracking-wide min-h-[32px] flex items-center flex-wrap gap-1"
                      id="assembledText"
                    >
                      <span className="bg-surface-container-lowest px-2 py-0.5 rounded shadow-sm">王老师</span>
                      <span className="bg-surface-container-lowest px-2 py-0.5 rounded shadow-sm">是</span>
                      <span className="bg-surface-container-lowest px-2 py-0.5 rounded shadow-sm">我们</span>
                      <span className="bg-surface-container-lowest px-2 py-0.5 rounded shadow-sm">的</span>
                      <span className="bg-surface-container-lowest px-2 py-0.5 rounded shadow-sm">汉语</span>
                      <span className="bg-surface-container-lowest px-2 py-0.5 rounded shadow-sm">老师</span>
                      <span className="text-on-surface font-bold">。</span>
                    </div>
                  </div>
                  <button
                    className="w-10 h-10 rounded-lg bg-surface-container-lowest hover:bg-secondary hover:text-on-secondary text-primary flex items-center justify-center shadow-sm transition-all"
                    id="audioBtn"
                    title="Nghe phát âm chuẩn Bắc Kinh"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">volume_up</span>
                  </button>
                </div>
              </div>
              <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-xs font-title-sm text-title-sm text-on-surface font-bold">
                    <span className="material-symbols-outlined text-secondary text-[20px]">verified</span>
                    <span>Trợ lý Phản hồi Thời Gian Thực (AI Tutor)</span>
                  </div>
                  <span className="px-space-sm py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm font-bold">
                    98% Khẩu ngữ chuẩn
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
                  <div className="bg-surface-container-lowest rounded-lg p-space-sm flex flex-col gap-1 shadow-sm">
                    <div className="flex items-center gap-1 text-secondary font-label-sm font-bold">
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      <span>Cấu trúc ngữ pháp</span>
                    </div>
                    <p className="text-xs text-on-surface">
                      Hoàn hảo. Định ngữ "我们的汉语老师" kết hợp trợ từ 的 chuẩn xác.
                    </p>
                  </div>
                  <div className="bg-surface-container-lowest rounded-lg p-space-sm flex flex-col gap-1 shadow-sm">
                    <div className="flex items-center gap-1 text-secondary font-label-sm font-bold">
                      <span className="material-symbols-outlined text-[16px]">record_voice_over</span>
                      <span>Độ tự nhiên âm luật</span>
                    </div>
                    <p className="text-xs text-on-surface">
                      Nhịp điệu 2-1-2-2 tự nhiên, chuẩn phong cách phát thanh CCTV.
                    </p>
                  </div>
                  <div className="bg-surface-container-lowest rounded-lg p-space-sm flex flex-col gap-1 shadow-sm">
                    <div className="flex items-center gap-1 text-primary font-label-sm font-bold">
                      <span className="material-symbols-outlined text-[16px]">sync</span>
                      <span>Từ vựng SRS tích hợp</span>
                    </div>
                    <p className="text-xs text-on-surface">
                      Thẻ <strong>老师</strong> (lǎoshī) đã được đưa vào chu kỳ lặp lại 6 ngày.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-md flex flex-wrap items-center justify-between gap-space-md sticky bottom-4 z-30">
          <div className="flex items-center gap-space-md">
            <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[24px]">task_alt</span>
            </div>
            <div className="flex flex-col">
              <span className="font-title-sm text-title-sm text-on-surface font-bold">
                Bạn đã sẵn sàng để kiểm tra câu trả lời?
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Điểm bài tập sẽ được lưu trực tiếp vào thuật toán SRS Spaced Repetition.
              </span>
            </div>
          </div>
          <div className="flex items-center gap-space-sm ml-auto">
            <button
              className="px-space-lg py-space-sm rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container font-title-sm text-title-sm transition-all"
              type="button"
              onClick={goNext}
            >
              {' '}
              Bỏ qua{' '}
            </button>
            <div className="hidden sm:flex items-center gap-1 text-on-surface-variant font-label-sm mr-space-xs">
              <kbd className="px-1.5 py-0.5 bg-surface-container rounded shadow-inner text-[10px] font-mono">Enter</kbd>{' '}
              <span>để nộp</span>
            </div>
            <button
              className="flex items-center gap-space-xs px-space-xl py-space-sm rounded-lg bg-primary-container hover:bg-primary text-on-primary font-title-sm text-title-sm shadow-md transition-all active:scale-[0.99]"
              id="submitPracticeBtn"
              type="button"
              onClick={goNext}
            >
              <span className="material-symbols-outlined text-[20px]">grading</span>
              <span>Kiểm Tra &amp; Chấm Điểm</span>
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
