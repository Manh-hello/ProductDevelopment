import { useNavigate } from 'react-router-dom';
import AppShell from '../layouts/AppShell';

export default function SentencePracticePage() {
  const navigate = useNavigate();

  return (
    <AppShell>
      <div className="flex flex-col w-full">
        <div className="flex flex-col gap-space-lg w-full max-w-[1400px] mx-auto pb-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
            <div className="flex flex-col">
              <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                <span>Luyện Tập Nâng Cao</span>
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                <span className="text-primary font-bold">Ngữ Cảnh &amp; AI Pronunciation</span>
              </div>
              <div className="flex items-center gap-space-sm mt-1">
                <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
                  Luyện Câu Ngữ Cảnh &amp; Phát Âm AI
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold flex items-center gap-1 shadow-sm">
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    auto_awesome
                  </span>{' '}
                  AI Engine v4.2 Active{' '}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-space-xs sm:gap-space-sm p-1.5 rounded-xl bg-surface-container-high shadow-sm self-start lg:self-auto">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md shadow-sm">
                <span className="material-symbols-outlined text-[18px] text-secondary">check_circle</span>
                <span>
                  Tiến trình: <b className="text-primary">4/12</b> câu
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md shadow-sm">
                <span className="material-symbols-outlined text-[18px] text-tertiary">star</span>
                <span>
                  Điểm thưởng: <b className="text-tertiary">+85 XP</b>
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-space-xs overflow-x-auto pb-1">
            <button
              className="inline-flex items-center gap-2 px-space-md py-2.5 rounded-xl bg-primary-container text-on-primary font-title-sm text-title-sm shadow-md transition-all"
              type="button"
              onClick={() => navigate('/practice/sentence-order')}
            >
              <span className="material-symbols-outlined text-[20px]">extension</span>
              <span>Sắp Xếp &amp; Đặt Câu</span>
              <span className="w-2 h-2 rounded-full bg-secondary-fixed"></span>
            </button>
            <button
              className="inline-flex items-center gap-2 px-space-md py-2.5 rounded-xl bg-surface-container-lowest text-on-surface-variant hover:text-on-surface hover:bg-surface-container font-title-sm text-title-sm shadow-sm transition-all"
              type="button"
              onClick={() => navigate('/practice/speaking')}
            >
              <span className="material-symbols-outlined text-[20px]">mic</span>
              <span>Luyện Nói &amp; Chấm Phát Âm AI</span>
            </button>
            <button
              className="inline-flex items-center gap-2 px-space-md py-2.5 rounded-xl bg-surface-container-lowest text-on-surface-variant hover:text-on-surface hover:bg-surface-container font-title-sm text-title-sm shadow-sm transition-all"
              type="button"
              onClick={() => navigate('/practice/translation')}
            >
              <span className="material-symbols-outlined text-[20px]">translate</span>
              <span>Điền Từ &amp; Dịch Việt - Trung</span>
            </button>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg">
            <div className="xl:col-span-7 flex flex-col gap-space-md bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-secondary-fixed/30 blur-2xl pointer-events-none"></div>
              <div className="flex items-start justify-between gap-space-sm">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-secondary text-on-secondary flex items-center justify-center font-label-sm text-label-sm font-bold">
                      10
                    </span>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                      Cú pháp &amp; Trật tự từ (Word Ordering)
                    </span>
                  </div>
                  <h2 className="font-headline-md text-headline-md text-on-surface font-bold mt-1">
                    Sắp xếp câu hoàn chỉnh
                  </h2>
                </div>
                <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm">
                  HSK 1 - Bài 3
                </span>
              </div>
              <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-1.5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">
                <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">
                  Nghĩa tiếng Việt đích:
                </span>
                <p className="font-body-lg text-body-lg font-semibold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">format_quote</span> “Bạn tên là
                  gì?”{' '}
                </p>
              </div>
              <div className="flex flex-col gap-space-xs mt-1">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">
                    Vùng ghép câu (Thứ tự đúng):
                  </span>
                  <span className="font-label-sm text-label-sm text-secondary font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">check</span> Đã gắn 5/5 mảnh{' '}
                  </span>
                </div>
                <div
                  className="min-h-[96px] p-space-md rounded-xl bg-surface-container-high/60 flex flex-wrap items-center gap-space-sm shadow-inner transition-all"
                  id="dropzone-area"
                >
                  <div className="group relative flex flex-col items-center justify-center px-4 py-2.5 rounded-xl bg-surface-container-lowest text-on-surface shadow-sm cursor-grab active:cursor-grabbing hover:scale-105 transition-all">
                    <span className="font-label-sm text-label-sm text-primary font-semibold">nǐ</span>
                    <span className="font-headline-xl text-headline-md font-display-character leading-tight text-on-surface">
                      你
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">Bạn</span>
                  </div>
                  <div className="group relative flex flex-col items-center justify-center px-4 py-2.5 rounded-xl bg-surface-container-lowest text-on-surface shadow-sm cursor-grab active:cursor-grabbing hover:scale-105 transition-all">
                    <span className="font-label-sm text-label-sm text-primary font-semibold">jiào</span>
                    <span className="font-headline-xl text-headline-md font-display-character leading-tight text-on-surface">
                      叫
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">gọi là</span>
                  </div>
                  <div className="group relative flex flex-col items-center justify-center px-4 py-2.5 rounded-xl bg-surface-container-lowest text-on-surface shadow-sm cursor-grab active:cursor-grabbing hover:scale-105 transition-all">
                    <span className="font-label-sm text-label-sm text-primary font-semibold">shénme</span>
                    <span className="font-headline-xl text-headline-md font-display-character leading-tight text-on-surface">
                      什么
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">cái gì</span>
                  </div>
                  <div className="group relative flex flex-col items-center justify-center px-4 py-2.5 rounded-xl bg-surface-container-lowest text-on-surface shadow-sm cursor-grab active:cursor-grabbing hover:scale-105 transition-all">
                    <span className="font-label-sm text-label-sm text-primary font-semibold">míngzi</span>
                    <span className="font-headline-xl text-headline-md font-display-character leading-tight text-on-surface">
                      名字
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">tên</span>
                  </div>
                  <div className="group relative flex flex-col items-center justify-center px-3 py-2.5 rounded-xl bg-surface-container-lowest text-primary shadow-sm cursor-grab active:cursor-grabbing hover:scale-105 transition-all">
                    <span className="font-label-sm text-label-sm opacity-0">?</span>
                    <span className="font-headline-xl text-headline-md font-display-character leading-tight font-bold">
                      ？
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">dấu câu</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-space-xs">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">
                  Kho từ vựng có sẵn (Word Bank):
                </span>
                <div className="p-space-md rounded-xl bg-surface-container flex flex-wrap items-center gap-space-sm min-h-[82px]">
                  <button
                    className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface-container-highest text-on-surface-variant/50 cursor-not-allowed font-title-sm text-title-sm opacity-60"
                    type="button"
                  >
                    <span className="font-display-character">名字</span>
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  </button>
                  <button
                    className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface-container-highest text-on-surface-variant/50 cursor-not-allowed font-title-sm text-title-sm opacity-60"
                    type="button"
                  >
                    <span className="font-display-character">什么</span>
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  </button>
                  <button
                    className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-bright shadow-sm hover:scale-105 active:scale-95 transition-all font-title-sm text-title-sm"
                    type="button"
                  >
                    <span className="font-display-character font-semibold">是</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">shì</span>
                  </button>
                  <button
                    className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface-container-highest text-on-surface-variant/50 cursor-not-allowed font-title-sm text-title-sm opacity-60"
                    type="button"
                  >
                    <span className="font-display-character">你</span>
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  </button>
                  <button
                    className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface-container-highest text-on-surface-variant/50 cursor-not-allowed font-title-sm text-title-sm opacity-60"
                    type="button"
                  >
                    <span className="font-display-character">叫</span>
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  </button>
                  <button
                    className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-bright shadow-sm hover:scale-105 active:scale-95 transition-all font-title-sm text-title-sm"
                    type="button"
                  >
                    <span className="font-display-character font-semibold">吗</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">ma</span>
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between pt-space-xs mt-auto">
                <button
                  className="inline-flex items-center gap-1.5 px-space-md py-2 rounded-lg bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all font-title-sm text-title-sm"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">replay</span>
                  <span>Tạo lại</span>
                </button>
                <div className="flex items-center gap-space-sm">
                  <button
                    className="inline-flex items-center gap-1.5 px-space-md py-2.5 rounded-lg bg-secondary text-on-secondary font-title-sm text-title-sm shadow-md hover:opacity-95 transition-all"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">task_alt</span>
                    <span>Kiểm tra câu</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="xl:col-span-5 flex flex-col gap-space-md bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm relative overflow-hidden">
              <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-primary-fixed/40 blur-3xl pointer-events-none"></div>
              <div className="flex items-start justify-between gap-space-sm">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-primary text-on-primary flex items-center justify-center font-label-sm text-label-sm font-bold">
                      09
                    </span>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                      Tự do đặt câu (Contextual Composition)
                    </span>
                  </div>
                  <h2 className="font-headline-md text-headline-md text-on-surface font-bold mt-1">
                    Luyện Đặt Câu Với AI
                  </h2>
                </div>
                <span className="material-symbols-outlined text-primary text-[24px]">psychology</span>
              </div>
              <div className="flex items-center gap-space-sm p-3 rounded-xl bg-primary-fixed/30 text-on-surface">
                <span className="material-symbols-outlined text-primary text-[20px]">lightbulb</span>
                <div className="text-body-sm font-body-sm">
                  {' '}
                  Sử dụng từ khóa bắt buộc:{' '}
                  <span className="font-headline-md font-display-character text-primary font-bold ml-1 mr-1">
                    老师
                  </span>{' '}
                  <span className="text-on-surface-variant">(lǎoshī - giáo viên)</span> để viết 1 câu hoàn chỉnh.{' '}
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-label-sm font-label-sm text-on-surface-variant">
                  <span>Câu văn của bạn (Hỗ trợ Pinyin IME tự động):</span>
                  <span>13 ký tự</span>
                </div>
                <div className="relative">
                  <textarea
                    className="w-full p-3.5 rounded-xl bg-surface-container-low text-on-surface font-headline-xl-mobile font-display-character text-headline-md leading-relaxed resize-none focus:outline-none focus:bg-surface-container-lowest focus:shadow-md transition-all"
                    rows={2}
                    defaultValue={`我是汉语老师，我也喜欢学生。`}
                  />
                  <button
                    className="absolute right-3 bottom-3 p-1.5 rounded-lg bg-surface-container text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-all"
                    title="Đọc phát âm câu này"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">volume_up</span>
                  </button>
                </div>
              </div>
              <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-sm shadow-sm">
                <div className="flex items-center justify-between pb-2 border-b-0">
                  <div className="flex items-center gap-2">
                    <span className="flex h-3 w-3 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
                    </span>
                    <span className="font-title-sm text-title-sm font-bold text-secondary flex items-center gap-1">
                      {' '}
                      ✓ Câu tự nhiên &amp; đúng ngữ pháp!{' '}
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold shadow-sm">
                    {' '}
                    +20 XP{' '}
                  </span>
                </div>
                <div className="flex flex-col gap-1 bg-surface-container-lowest p-3 rounded-lg shadow-inner">
                  <span className="font-body-sm text-body-sm text-primary font-semibold tracking-wide">
                    {' '}
                    Wǒ shì hànyǔ lǎoshī, wǒ yě xǐhuan xuéshēng.{' '}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface font-medium">
                    {' '}
                    “Tôi là giáo viên tiếng Trung, tôi cũng thích học sinh.”{' '}
                  </span>
                </div>
                <div className="flex items-start gap-2 text-on-surface-variant font-body-sm text-body-sm">
                  <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">verified</span>
                  <p>
                    <strong className="text-on-surface">Đánh giá AI:</strong> Sử dụng từ vựng chính xác (
                    <span className="text-primary font-bold">老师</span>), kết hợp mượt mà các từ cũ đã nhớ trong kho
                    SRS (<span className="font-semibold text-on-surface">是</span>,{' '}
                    <span className="font-semibold text-on-surface">喜欢</span>,{' '}
                    <span className="font-semibold text-on-surface">学生</span>). Cấu trúc liên từ{' '}
                    <span className="italic text-on-surface">‘...也...’</span> rất tự nhiên.{' '}
                  </p>
                </div>
              </div>
              <button
                className="w-full py-2.5 rounded-lg bg-primary-container text-on-primary font-title-sm text-title-sm shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">neurology</span>
                <span>Lưu câu mẫu vào Kho cá nhân</span>
              </button>
            </div>
          </div>
          <div className="w-full flex flex-col gap-space-lg bg-surface-container-lowest p-space-lg lg:p-space-xl rounded-2xl shadow-sm relative overflow-hidden">
            <div className="absolute left-1/2 -top-24 -translate-x-1/2 w-96 h-96 bg-primary-fixed/30 rounded-full blur-3xl pointer-events-none"></div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-md">
                  <span className="material-symbols-outlined text-[24px]">record_voice_over</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                      Phân Tích Âm Thanh Đa Tần Số
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-semibold">
                      SRS Stage: Guru
                    </span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface">
                    Luyện Nói &amp; Chấm Điểm Phát Âm AI
                  </h2>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high text-on-surface font-title-sm text-body-sm hover:bg-surface-container-highest transition-all"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">tune</span>
                  <span>Độ nhạy mic: Cao</span>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center relative z-10">
              <div className="lg:col-span-7 flex flex-col gap-space-md p-space-lg rounded-2xl bg-surface-container-low shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">
                    Câu hỏi cần luyện đọc:
                  </span>
                  <button
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest text-primary hover:bg-primary hover:text-on-primary transition-all font-label-md text-label-md shadow-sm"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">volume_up</span>
                    <span>Nghe giọng đọc bản xứ</span>
                  </button>
                </div>
                <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 py-4">
                  <div className="flex flex-col items-center">
                    <span className="font-title-sm text-title-sm text-primary font-bold">nǐ</span>
                    <span className="font-headline-xl text-headline-xl font-display-character text-on-surface">你</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-title-sm text-title-sm text-primary font-bold">shì</span>
                    <span className="font-headline-xl text-headline-xl font-display-character text-on-surface">是</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-title-sm text-title-sm text-primary font-bold">Zhōng</span>
                    <span className="font-headline-xl text-headline-xl font-display-character text-on-surface">中</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-title-sm text-title-sm text-primary font-bold">guó</span>
                    <span className="font-headline-xl text-headline-xl font-display-character text-on-surface">国</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-title-sm text-title-sm text-primary font-bold">rén</span>
                    <span className="font-headline-xl text-headline-xl font-display-character text-on-surface">人</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-title-sm text-title-sm text-primary font-bold">ma</span>
                    <span className="font-headline-xl text-headline-xl font-display-character text-on-surface">吗</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-title-sm text-title-sm opacity-0">?</span>
                    <span className="font-headline-xl text-headline-xl font-display-character text-primary">？</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-surface-container-lowest text-on-surface-variant font-body-md text-body-md shadow-inner flex items-center justify-between">
                  <span>
                    Bản dịch: <strong className="text-on-surface">Bạn có phải là người Trung Quốc không?</strong>
                  </span>
                  <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container text-on-surface">
                    Câu nghi vấn ma
                  </span>
                </div>
                <div className="flex flex-col gap-2 pt-1">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">
                    Chi tiết độ chuẩn từng âm tiết:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    <div className="p-2 rounded-xl bg-surface-container-lowest flex flex-col items-center gap-1 shadow-sm">
                      <span className="font-display-character text-title-sm font-bold text-on-surface">你</span>
                      <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">
                        95%
                      </span>
                      <span className="font-label-sm text-label-sm text-secondary flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[12px]">done</span> Chuẩn{' '}
                      </span>
                    </div>
                    <div className="p-2 rounded-xl bg-surface-container-lowest flex flex-col items-center gap-1 shadow-sm">
                      <span className="font-display-character text-title-sm font-bold text-on-surface">是</span>
                      <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">
                        90%
                      </span>
                      <span className="font-label-sm text-label-sm text-secondary flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[12px]">done</span> Chuẩn{' '}
                      </span>
                    </div>
                    <div className="p-2 rounded-xl bg-surface-container-lowest flex flex-col items-center gap-1 shadow-sm">
                      <span className="font-display-character text-title-sm font-bold text-on-surface">中国</span>
                      <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">
                        92%
                      </span>
                      <span className="font-label-sm text-label-sm text-secondary flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[12px]">done</span> Chuẩn{' '}
                      </span>
                    </div>
                    <div className="p-2 rounded-xl bg-tertiary-fixed/30 flex flex-col items-center gap-1 shadow-sm">
                      <span className="font-display-character text-title-sm font-bold text-tertiary">人</span>
                      <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
                        75%
                      </span>
                      <span className="font-label-sm text-label-sm text-tertiary font-bold flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[12px]">warning</span> Uốn lưỡi rén{' '}
                      </span>
                    </div>
                    <div className="p-2 rounded-xl bg-surface-container-lowest flex flex-col items-center gap-1 shadow-sm">
                      <span className="font-display-character text-title-sm font-bold text-on-surface">吗</span>
                      <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">
                        96%
                      </span>
                      <span className="font-label-sm text-label-sm text-secondary flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[12px]">done</span> Khinh thanh{' '}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5 flex flex-col items-center justify-center gap-space-md p-space-lg rounded-2xl bg-surface-container-low shadow-sm text-center">
                <div className="relative flex items-center justify-center">
                  <span className="absolute w-28 h-28 rounded-full bg-primary/20 animate-ping"></span>
                  <span className="absolute w-36 h-36 rounded-full bg-primary/10"></span>
                  <button
                    className="relative w-20 h-20 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all"
                    id="mic-trigger-btn"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[36px]">mic</span>
                  </button>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-bold">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    <span>🔴 Đang nhận diện &amp; chấm điểm...</span>
                  </div>
                  <div className="flex items-end gap-1 h-8 px-4 py-1">
                    <span className="w-1 bg-primary rounded-full h-3 animate-pulse"></span>
                    <span
                      className="w-1 bg-primary rounded-full h-6 animate-pulse"
                      style={{ animationDelay: '0.1s' }}
                    ></span>
                    <span
                      className="w-1 bg-primary rounded-full h-8 animate-pulse"
                      style={{ animationDelay: '0.2s' }}
                    ></span>
                    <span
                      className="w-1 bg-primary rounded-full h-4 animate-pulse"
                      style={{ animationDelay: '0.3s' }}
                    ></span>
                    <span
                      className="w-1 bg-primary rounded-full h-7 animate-pulse"
                      style={{ animationDelay: '0.15s' }}
                    ></span>
                    <span
                      className="w-1 bg-primary rounded-full h-5 animate-pulse"
                      style={{ animationDelay: '0.25s' }}
                    ></span>
                    <span
                      className="w-1 bg-primary rounded-full h-2 animate-pulse"
                      style={{ animationDelay: '0.05s' }}
                    ></span>
                  </div>
                </div>
                <div className="w-full bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 flex items-center justify-center">
                        <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
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
                            strokeDasharray="88, 100"
                            strokeLinecap="round"
                            strokeWidth="3.5"
                          />
                        </svg>
                        <span className="absolute font-label-md text-label-md font-bold text-on-surface">88%</span>
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                          Tổng điểm AI
                        </span>
                        <span className="font-title-sm text-title-sm font-bold text-secondary">
                          Rất tốt! (HSK Fluent)
                        </span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">
                      Xuất sắc
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 pt-1">
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between font-label-sm text-label-sm">
                        <span className="text-on-surface-variant">Thanh điệu (Tone Accuracy)</span>
                        <span className="font-bold text-on-surface">85%</span>
                      </div>
                      <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between font-label-sm text-label-sm">
                        <span className="text-on-surface-variant">Độ chuẩn từ vựng (Word Accuracy)</span>
                        <span className="font-bold text-on-surface">92%</span>
                      </div>
                      <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                        <div className="h-full bg-secondary" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between font-label-sm text-label-sm">
                        <span className="text-on-surface-variant">Độ lưu loát (Fluency &amp; Speed)</span>
                        <span className="font-bold text-on-surface">87%</span>
                      </div>
                      <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                        <div className="h-full bg-secondary-fixed-dim" style={{ width: '87%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-space-sm w-full">
                  <button
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container transition-all font-title-sm text-body-sm shadow-sm"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">play_circle</span>
                    <span>Nghe lại bản ghi</span>
                  </button>
                  <button
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-on-primary hover:opacity-95 transition-all font-title-sm text-body-sm shadow-md"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">refresh</span>
                    <span>Thử lại</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-space-md p-space-md rounded-2xl bg-surface-container-high/70">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-surface-container-lowest text-primary flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-[20px]">lightbulb</span>
              </div>
              <div className="flex flex-col">
                <span className="font-title-sm text-title-sm font-bold text-on-surface">Mẹo luyện ngữ âm HanziSRS</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Âm uốn lưỡi (rén): Đặt đầu lưỡi chạm vào phần ngạc cứng trên trước khi bật hơi ra ngoài, không phát âm
                  thành ‘d’ hoặc ‘gi’.
                </span>
              </div>
            </div>
            <button
              className="inline-flex items-center gap-1.5 px-space-md py-2 rounded-lg bg-surface-container-lowest text-on-surface font-title-sm text-title-sm shadow-sm hover:bg-surface-container transition-all whitespace-nowrap"
              type="button"
              onClick={() => navigate('/practice/pinyin')}
            >
              <span>Xem bài giảng âm r-</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
