import { Link, useNavigate } from 'react-router-dom';
import AppShell from '../layouts/AppShell';
import { useState } from 'react';

export default function AddVocabularyPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState(0);
  const [prio, setPrio] = useState(1);
  const [saved, setSaved] = useState(false);
  const [draft, setDraft] = useState(false);
  const confirmAdd = () => {
    const el = document.getElementById('vocabInput') as HTMLInputElement | HTMLTextAreaElement | null;
    if (el && !el.value.trim()) {
      el.focus();
      return;
    }
    setSaved(true);
    setTimeout(() => navigate('/vocabulary'), 700);
  };

  return (
    <AppShell>
      <div className="flex flex-col w-full">
        <div className="relative w-full overflow-hidden">
          <div className="absolute -top-32 right-12 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>
          <div className="absolute top-64 left-1/3 w-80 h-80 rounded-full bg-secondary/5 blur-3xl pointer-events-none"></div>
          <div className="flex flex-col gap-space-sm mb-space-lg">
            <div className="flex flex-wrap items-center justify-between gap-space-sm">
              <div className="flex items-center gap-space-xs text-on-surface-variant">
                <Link
                  className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors"
                  to="/vocabulary"
                >
                  Kho Từ Vựng
                </Link>
                <span className="text-outline-variant font-label-sm">/</span>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                  Thêm Từ Vựng Mới
                </span>
                <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> AI Engine v4.2 Active{' '}
                </span>
              </div>
              <div className="flex items-center gap-space-sm bg-surface-container-low px-space-md py-1.5 rounded-full shadow-sm">
                <span className="material-symbols-outlined text-[18px] text-tertiary">inventory_2</span>
                <div className="flex items-center gap-1.5 font-label-sm text-label-sm">
                  <span className="text-on-surface-variant">Dung lượng:</span>
                  <span className="font-bold text-on-surface">245 / 500 từ</span>
                  <span className="text-outline">|</span>
                  <span className="text-on-surface-variant">Hạn mức đề xuất hôm nay:</span>
                  <span className="text-primary font-bold">còn 18/20</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md">
              <div>
                <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight leading-none mt-1">
                  {' '}
                  Nạp Hán Tự &amp; Kích Hoạt Lộ Trình SRS{' '}
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-3xl">
                  {' '}
                  Hệ thống trích xuất tự động bằng AI học thuật từ Hán tự, Pinyin, tài liệu OCR hoặc ngữ cảnh thực tế,
                  kiến tạo đường cong lãng quên tối ưu ngay từ phiên đầu tiên.{' '}
                </p>
              </div>
              <div className="flex flex-col gap-1 w-full lg:w-64 bg-surface-container p-space-sm rounded-xl shadow-sm">
                <div className="flex justify-between items-center text-label-sm font-label-sm">
                  <span className="text-on-surface-variant">Tải bộ nhớ HSK 1-4</span>
                  <span className="font-bold text-primary">49% Đạt chuẩn</span>
                </div>
                <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden flex">
                  <div className="bg-secondary h-full" style={{ width: '32%' }}></div>
                  <div className="bg-tertiary-fixed-dim h-full" style={{ width: '17%' }}></div>
                </div>
                <span className="text-[10px] text-on-surface-variant">
                  Khuyến nghị nạp tối đa 20 từ/ngày để chống quá tải SRS
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-space-xs p-1 bg-surface-container-low rounded-xl mb-space-lg shadow-sm max-w-fit overflow-x-auto">
            <button
              onClick={() => setMode(0)}
              className={
                mode === 0
                  ? 'inline-flex items-center gap-2 px-space-md py-2 rounded-lg bg-surface-container-lowest text-primary font-title-sm text-title-sm shadow-sm transition-all'
                  : 'inline-flex items-center gap-2 px-space-md py-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all font-title-sm text-title-sm'
              }
            >
              <span className="material-symbols-outlined text-[20px] text-primary">auto_fix_high</span>{' '}
              <span>Nhập Hán Tự &amp; AI Chiết Tự</span> <span className="w-2 h-2 rounded-full bg-primary ml-1"></span>
            </button>
            <button
              onClick={() => setMode(1)}
              className={
                mode === 1
                  ? 'inline-flex items-center gap-2 px-space-md py-2 rounded-lg bg-surface-container-lowest text-primary font-title-sm text-title-sm shadow-sm transition-all'
                  : 'inline-flex items-center gap-2 px-space-md py-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all font-title-sm text-title-sm'
              }
            >
              <span className="material-symbols-outlined text-[20px]">document_scanner</span>{' '}
              <span>Quét Ảnh OCR &amp; Tài Liệu PDF</span>
            </button>
            <button
              onClick={() => setMode(2)}
              className={
                mode === 2
                  ? 'inline-flex items-center gap-2 px-space-md py-2 rounded-lg bg-surface-container-lowest text-primary font-title-sm text-title-sm shadow-sm transition-all'
                  : 'inline-flex items-center gap-2 px-space-md py-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all font-title-sm text-title-sm'
              }
            >
              <span className="material-symbols-outlined text-[20px]">upload_file</span>{' '}
              <span>Nhập Hàng Loạt (CSV / Anki Package)</span>
            </button>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start">
            <div className="xl:col-span-8 flex flex-col gap-space-lg">
              <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary via-primary-container to-secondary"></div>
                <div className="flex flex-col gap-space-sm">
                  <div className="flex items-center justify-between">
                    <label className="font-label-md text-label-md text-on-surface uppercase tracking-wider flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[18px]">edit_note</span> Hán Tự Hoặc
                      Cụm Từ Cần Nạp{' '}
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        Nhận diện song ngữ &amp; Pinyin tự do
                      </span>
                      <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface font-label-sm text-label-sm">
                        Ctrl + Space gợi ý
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-space-sm items-stretch">
                    <div className="relative flex-1">
                      <input
                        className="w-full bg-surface-container-low text-on-surface font-headline-lg text-headline-lg px-space-md py-3 rounded-xl focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/30 transition-all placeholder:text-on-surface-variant/60"
                        id="vocabInput"
                        placeholder="Nhập chữ Hán, Pinyin hoặc câu ngắn (ví dụ: 学习, nǐhǎo, bạn bè)..."
                        type="text"
                        defaultValue="学习"
                      />{' '}
                      <button
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors p-1"
                        title="Xóa nội dung"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[20px]">cancel</span>
                      </button>
                    </div>
                    <button
                      className="inline-flex items-center justify-center gap-2 px-space-lg py-3 rounded-xl bg-gradient-to-r from-primary to-primary-container text-on-primary font-title-sm text-title-sm hover:opacity-95 shadow-md hover:shadow-lg transition-all active:scale-[0.99] whitespace-nowrap"
                      id="btnParseAI"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[20px] animate-pulse">magic_button</span>
                      <span>AI Trích Xuất &amp; Phân Tích</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-space-xs flex-wrap pt-1">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Gợi ý từ mới theo HSK 1:
                    </span>
                    <button className="px-2.5 py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors">
                      电脑 (Máy tính)
                    </button>
                    <button className="px-2.5 py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors">
                      高兴 (Vui mừng)
                    </button>
                    <button className="px-2.5 py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors">
                      苹果 (Quả táo)
                    </button>
                    <button className="px-2.5 py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors">
                      喝茶 (Uống trà)
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col gap-space-md">
                <div className="flex flex-wrap items-center justify-between gap-space-sm pb-space-sm border-b border-surface-container-highest/60">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-2.5 h-2.5 rounded-full bg-secondary"></div>
                    <span className="font-title-sm text-title-sm font-bold text-on-surface">
                      Kết Quả Phân Tích Thực Thể Ngôn Ngữ
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">
                      {' '}
                      Độ chính xác 99.8%{' '}
                    </span>
                  </div>
                  <div className="flex items-center gap-space-xs">
                    <button
                      className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors"
                      title="Nghe phát âm chuẩn"
                    >
                      <span className="material-symbols-outlined text-[20px] text-primary">volume_up</span>
                    </button>
                    <button
                      className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors"
                      title="Xem thứ tự nét bút Stroke Order"
                    >
                      <span className="material-symbols-outlined text-[20px]">draw</span>
                    </button>
                    <button
                      className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors"
                      title="Tải lại từ điển"
                    >
                      <span className="material-symbols-outlined text-[20px]">sync</span>
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-space-md items-center bg-surface-container-low p-space-lg rounded-xl">
                  <div className="md:col-span-5 flex items-center justify-center gap-space-md py-space-sm">
                    <div className="flex flex-col items-center group cursor-pointer">
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-surface-container-lowest flex items-center justify-center shadow-md relative group-hover:scale-105 transition-all">
                        <div className="absolute inset-2 border border-dashed border-outline-variant/30 rounded-xl pointer-events-none"></div>
                        <span className="font-display-character text-display-character text-primary leading-none select-none">
                          学
                        </span>
                        <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm">
                          10 nét
                        </span>
                      </div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant mt-2">Bộ: 子 (Tử)</span>
                    </div>
                    <div className="flex flex-col items-center group cursor-pointer">
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-surface-container-lowest flex items-center justify-center shadow-md relative group-hover:scale-105 transition-all">
                        <div className="absolute inset-2 border border-dashed border-outline-variant/30 rounded-xl pointer-events-none"></div>
                        <span className="font-display-character text-display-character text-primary leading-none select-none">
                          习
                        </span>
                        <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm">
                          3 nét
                        </span>
                      </div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant mt-2">
                        Bộ: 冫(Băng) / 羽
                      </span>
                    </div>
                  </div>
                  <div className="md:col-span-7 flex flex-col gap-space-xs pl-0 md:pl-space-md md:border-l md:border-surface-container-highest/60">
                    <div className="flex items-center gap-space-sm flex-wrap">
                      <span className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
                        xuéxí
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md bg-tertiary-fixed text-on-tertiary-fixed font-title-sm text-title-sm font-bold">
                        {' '}
                        Hán-Việt: HỌC TẬP{' '}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">
                        {' '}
                        HSK 1 Cốt Lõi{' '}
                      </span>
                    </div>
                    <div className="mt-1">
                      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                        Định nghĩa chính
                      </span>
                      <p className="font-title-sm text-title-sm text-on-surface font-semibold mt-0.5">
                        {' '}
                        1. Học, học tập, nghiên cứu (Động từ) <br />
                        <span className="text-on-surface-variant font-body-sm text-body-sm">
                          To learn, to study (Eng)
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center gap-space-xs mt-2 flex-wrap">
                      <span className="text-on-surface-variant font-label-sm text-label-sm">Phân loại:</span>
                      <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface font-label-sm text-label-sm">
                        Động từ
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface font-label-sm text-label-sm">
                        Danh từ
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface font-label-sm text-label-sm">
                        Tần suất: Cực cao (#42)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                  <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col justify-between gap-space-xs">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5 text-primary font-title-sm text-title-sm font-bold">
                          <span className="material-symbols-outlined text-[18px]">account_tree</span>
                          <span>Chiết Tự Cấu Thành</span>
                        </div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          Cổ văn &amp; Giản thể
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface leading-relaxed">
                        <strong className="text-primary font-bold">学 (Học):</strong> Mái nhà che chở đứa trẻ (子 - Tử)
                        đang rèn luyện tri thức bên dưới.
                        <br />
                        <strong className="text-primary font-bold">习 (Tập):</strong> Giản thể của chữ 習 (đôi cánh chim
                        vỗ nhiều lần để học bay liên tục).{' '}
                      </p>
                    </div>
                    <div className="pt-2 text-right">
                      <button className="font-label-sm text-label-sm text-primary hover:underline inline-flex items-center gap-1">
                        <span>Xem cây từ đồng gốc (Radial Lexicon)</span>
                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                  <div className="bg-surface-container p-space-md rounded-xl flex flex-col justify-between gap-space-xs relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-tertiary/5 pointer-events-none"></div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5 text-tertiary font-title-sm text-title-sm font-bold">
                          <span className="material-symbols-outlined text-[18px]">psychology</span>
                          <span>Mẹo Nhớ Mnemonic Độc Quyền</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
                          AI Sinh
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface italic leading-relaxed">
                        {' '}
                        "Đứa trẻ (<span className="font-bold text-primary not-italic">Tử</span>) ngồi trong trường học
                        ngày ngày vỗ cánh (<span className="font-bold text-primary not-italic">Tập</span>) kiên trì rèn
                        luyện thì nhất định sẽ bay cao."{' '}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        Dành cho não phải hình ảnh
                      </span>
                      <button className="font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface inline-flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">edit</span>
                        <span>Sửa mẹo nhớ</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-space-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md text-on-surface uppercase tracking-wider flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px] text-secondary">record_voice_over</span>{' '}
                      Ngữ Cảnh Câu Ví Dụ (AI Contextualizer){' '}
                    </span>
                    <button className="font-label-sm text-label-sm text-secondary hover:underline inline-flex items-center gap-1 font-bold">
                      <span className="material-symbols-outlined text-[16px]">add</span>
                      <span>Tạo thêm câu ví dụ</span>
                    </button>
                  </div>
                  <div className="p-space-md rounded-xl bg-surface-container-low flex items-start justify-between gap-space-md hover:bg-surface-container transition-colors">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-space-sm">
                        <span className="font-headline-md text-headline-md text-on-surface">
                          {' '}
                          他在大学努力<span className="text-primary font-bold">学习</span>中文。{' '}
                        </span>
                        <button className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-surface-container-highest transition-colors">
                          <span className="material-symbols-outlined text-[16px]">volume_up</span>
                        </button>
                      </div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant">
                        <span className="font-mono text-[12px] text-outline">Pinyin:</span> Tā zài dàxué nǔlì{' '}
                        <strong className="text-on-surface">xuéxí</strong> zhōngwén.{' '}
                      </div>
                      <div className="font-body-sm text-body-sm text-on-surface mt-0.5">
                        <span className="font-semibold text-secondary">Dịch:</span> Anh ấy rất chăm chỉ học tiếng Trung
                        ở trường đại học.{' '}
                      </div>
                    </div>
                    <span className="px-2 py-1 rounded bg-surface-container-highest text-on-surface font-label-sm text-label-sm whitespace-nowrap">
                      {' '}
                      HSK 1-2{' '}
                    </span>
                  </div>
                  <div className="p-space-md rounded-xl bg-surface-container-low flex items-start justify-between gap-space-md hover:bg-surface-container transition-colors">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-space-sm">
                        <span className="font-headline-md text-headline-md text-on-surface">
                          {' '}
                          我们一起<span className="text-primary font-bold">学习</span>吧！{' '}
                        </span>
                        <button className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-surface-container-highest transition-colors">
                          <span className="material-symbols-outlined text-[16px]">volume_up</span>
                        </button>
                      </div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant">
                        <span className="font-mono text-[12px] text-outline">Pinyin:</span> Wǒmen yīqǐ{' '}
                        <strong className="text-on-surface">xuéxí</strong> ba!{' '}
                      </div>
                      <div className="font-body-sm text-body-sm text-on-surface mt-0.5">
                        <span className="font-semibold text-secondary">Dịch:</span> Chúng ta cùng nhau học nhé!{' '}
                      </div>
                    </div>
                    <span className="px-2 py-1 rounded bg-surface-container-highest text-on-surface font-label-sm text-label-sm whitespace-nowrap">
                      {' '}
                      Khẩu ngữ{' '}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-space-xs pt-space-xs">
                  <span className="font-label-sm text-label-sm text-on-surface-variant mr-1">
                    Thẻ phân loại (Tags):
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm">
                    {' '}
                    #Học_Đường{' '}
                    <button className="hover:text-error ml-0.5">
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm">
                    {' '}
                    #HSK_1_Cốt_Lõi{' '}
                    <button className="hover:text-error ml-0.5">
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm">
                    {' '}
                    #Động_Từ_Thường_Dùng{' '}
                    <button className="hover:text-error ml-0.5">
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  </span>
                  <button className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-dashed border-outline-variant text-on-surface-variant hover:text-primary font-label-sm text-label-sm transition-colors">
                    <span className="material-symbols-outlined text-[14px]">add</span>
                    <span>Thêm thẻ</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="xl:col-span-4 flex flex-col gap-space-lg">
              <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col gap-space-md">
                <div className="flex items-center justify-between pb-space-xs border-b border-surface-container-highest/60">
                  <h3 className="font-title-sm text-title-sm font-bold text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[20px]">folder_special</span>
                    <span>Đích Đến &amp; Phân Vùng Deck</span>
                  </h3>
                  <span className="font-label-sm text-label-sm text-secondary font-bold">Đã đồng bộ</span>
                </div>
                <div className="flex flex-col gap-space-xs">
                  <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    Chọn Bộ Thẻ (Deck)
                  </label>
                  <div className="relative">
                    <select
                      className="w-full bg-surface-container-low text-on-surface font-title-sm text-title-sm px-space-md py-3 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                      defaultValue="Bộ từ HSK 1 - Giao tiếp thực chiến"
                    >
                      <option>Bộ từ HSK 1 - Giao tiếp thực chiến</option>
                      <option>Hán tự Đại học Ngoại Ngữ (Chuyên ngành)</option>
                      <option>214 Bộ Thủ &amp; Chiết Tự Cốt Lõi</option>
                      <option>HSK 2 Nâng Cao (Chuẩn bị thi)</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant text-[20px]">
                      expand_more
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-space-xs">
                  <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    Cấp Độ Ưu Tiên Lộ Trình
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPrio(0)}
                      className={
                        prio === 0
                          ? 'py-2 px-1 text-center rounded-lg bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-bold shadow-sm'
                          : 'py-2 px-1 text-center rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-all'
                      }
                    >
                      Thấp
                    </button>
                    <button
                      type="button"
                      onClick={() => setPrio(1)}
                      className={
                        prio === 1
                          ? 'py-2 px-1 text-center rounded-lg bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-bold shadow-sm'
                          : 'py-2 px-1 text-center rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-all'
                      }
                    >
                      Tiêu chuẩn
                    </button>
                    <button
                      type="button"
                      onClick={() => setPrio(2)}
                      className={
                        prio === 2
                          ? 'py-2 px-1 text-center rounded-lg bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-bold shadow-sm'
                          : 'py-2 px-1 text-center rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-all'
                      }
                    >
                      Khẩn cấp
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col gap-space-md">
                <div className="flex items-center justify-between pb-space-xs border-b border-surface-container-highest/60">
                  <h3 className="font-title-sm text-title-sm font-bold text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[20px]">timelapse</span>
                    <span>Thiết Lập Chu Kỳ SRS Ban Đầu</span>
                  </h3>
                  <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                    FSRS v5
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  {' '}
                  Hãy tự đánh giá khách quan mức độ quen thuộc để thuật toán phân bố khoảng cách lặp lại chính xác
                  nhất.{' '}
                </p>
                <div className="flex flex-col gap-2.5">
                  <label className="flex items-start gap-3 p-space-sm rounded-xl bg-primary-fixed/30 border border-primary/20 cursor-pointer transition-all">
                    <input
                      defaultChecked
                      className="mt-1 accent-primary text-primary focus:ring-primary w-4 h-4"
                      name="srs_stage"
                      type="radio"
                    />
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-title-sm text-title-sm font-bold text-on-surface">
                          Mới Toanh (Newbie)
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface font-label-sm text-label-sm">
                          Chu kỳ 10 phút
                        </span>
                      </div>
                      <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                        {' '}
                        Chưa từng tiếp xúc hoặc hay nhầm lẫn nét viết. Cần drill lặp lại ngay hôm nay.{' '}
                      </span>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 p-space-sm rounded-xl bg-surface-container-low hover:bg-surface-container cursor-pointer transition-all">
                    <input
                      className="mt-1 accent-primary text-primary focus:ring-primary w-4 h-4"
                      name="srs_stage"
                      type="radio"
                    />
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-title-sm text-title-sm font-bold text-on-surface">
                          Biết Lờ Mờ (Learning)
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface font-label-sm text-label-sm">
                          Chu kỳ 1 ngày
                        </span>
                      </div>
                      <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                        {' '}
                        Nhận ra mặt chữ khi nhìn nhưng chưa thể tự viết tay hoặc nhớ thanh điệu.{' '}
                      </span>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 p-space-sm rounded-xl bg-surface-container-low hover:bg-surface-container cursor-pointer transition-all">
                    <input
                      className="mt-1 accent-primary text-primary focus:ring-primary w-4 h-4"
                      name="srs_stage"
                      type="radio"
                    />
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-title-sm text-title-sm font-bold text-on-surface">
                          Khá Quen Thuộc (Mastered)
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface font-label-sm text-label-sm">
                          Chu kỳ 3 ngày
                        </span>
                      </div>
                      <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                        {' '}
                        Đã sử dụng thành thạo, chỉ cần đưa vào chu kỳ kiểm tra duy trì trí nhớ dài hạn.{' '}
                      </span>
                    </div>
                  </label>
                </div>
                <div className="pt-space-xs">
                  <div className="flex items-center justify-between p-space-sm rounded-xl bg-surface-container-low">
                    <div className="flex flex-col pr-2">
                      <span className="font-title-sm text-title-sm font-semibold text-on-surface">
                        Nạp vào phiên ôn tập ngay
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Thêm trực tiếp vào Dynamic Mixing deck hôm nay
                      </span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                      <input defaultChecked className="sr-only peer" type="checkbox" />
                      <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                    </label>
                  </div>
                </div>
              </div>
              <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-label-md text-on-surface uppercase tracking-wider flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-tertiary">analytics</span> Dự Báo Tác
                    Động Thuật Toán{' '}
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Mô phỏng 7 ngày</span>
                </div>
                <div className="grid grid-cols-2 gap-space-sm pt-1">
                  <div className="p-space-sm rounded-xl bg-surface-container-low flex flex-col">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Dung lượng mới</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="font-headline-md text-headline-md font-bold text-on-surface">246</span>
                      <span className="text-secondary font-bold font-label-sm text-label-sm">(+1 từ)</span>
                    </div>
                  </div>
                  <div className="p-space-sm rounded-xl bg-surface-container-low flex flex-col">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Tải ôn tập ngày mai</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="font-headline-md text-headline-md font-bold text-primary">+1.5</span>
                      <span className="text-on-surface-variant font-label-sm text-label-sm">phút</span>
                    </div>
                  </div>
                </div>
                <div className="mt-2 bg-surface-container-low p-space-sm rounded-xl flex flex-col gap-1">
                  <div className="flex justify-between items-center text-label-sm font-label-sm text-on-surface-variant">
                    <span>Đường cong duy trì dự kiến (Ebbinghaus)</span>
                    <span className="text-secondary font-bold">R = 94%</span>
                  </div>
                  <div className="w-full h-14 flex items-center justify-center">
                    <svg className="w-full h-full text-secondary" fill="none" viewBox="0 0 280 48">
                      <path
                        d="M0 8 C40 10, 70 38, 100 40 C130 42, 160 16, 190 20 C220 24, 250 8, 280 12"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                      />
                      <circle className="fill-primary" cx="100" cy="40" r="3.5" />
                      <circle className="fill-secondary" cx="190" cy="20" r="3.5" />
                      <circle className="fill-secondary" cx="280" cy="12" r="3.5" />
                    </svg>
                  </div>
                  <div className="flex justify-between text-[10px] text-on-surface-variant font-mono">
                    <span>Hôm nay (10m)</span>
                    <span>Ngày 1 (+24h)</span>
                    <span>Ngày 3 (+72h)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-space-xl p-space-md bg-surface-container-lowest rounded-2xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-space-md">
            <div className="flex items-center gap-space-md w-full sm:w-auto">
              <button
                className="px-space-md py-2.5 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-highest transition-colors font-title-sm text-title-sm flex items-center justify-center gap-1.5 w-full sm:w-auto"
                type="button"
                onClick={() => setDraft(true)}
              >
                <span className="material-symbols-outlined text-[18px]">bookmark_border</span>
                <span>{draft ? 'Đã lưu nháp' : 'Lưu Bản Nháp'}</span>
              </button>
              <button
                className="px-space-md py-2.5 rounded-xl text-on-surface-variant hover:text-error hover:bg-surface-container transition-colors font-title-sm text-title-sm flex items-center justify-center gap-1.5 w-full sm:w-auto"
                type="button"
                onClick={() => navigate('/vocabulary')}
              >
                <span>Hủy Bỏ</span>
              </button>
            </div>
            <div className="flex items-center gap-space-sm w-full sm:w-auto justify-end">
              <span className="font-label-sm text-label-sm text-on-surface-variant hidden md:inline">
                {' '}
                Nhấn{' '}
                <kbd className="px-2 py-1 rounded bg-surface-container text-on-surface font-mono text-[11px] shadow-sm">
                  Ctrl + Enter
                </kbd>{' '}
                để kích hoạt{' '}
              </span>
              <button
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-space-xl py-3 rounded-xl bg-primary-container text-on-primary font-title-sm text-title-sm hover:opacity-95 shadow-[0_4px_16px_rgba(190,18,60,0.3)] transition-all active:scale-[0.99]"
                id="btnSubmitVocab"
                type="button"
                onClick={confirmAdd}
              >
                <span className="material-symbols-outlined text-[22px]">publish</span>
                <span>{saved ? 'Đã nạp thành công!' : 'Xác Nhận & Nạp Vào Chu Kỳ SRS'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
