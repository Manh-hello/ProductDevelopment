import AppShell from '../layouts/AppShell';
import usePracticeNext from '../lib/usePracticeFlow';

export default function TranslationHubPage() {
  const goNext = usePracticeNext();

  return (
    <AppShell>
      <div className="flex flex-col w-full">
        <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md mb-space-lg">
          <div className="flex items-center gap-space-sm">
            <div className="inline-flex p-1 bg-surface-container rounded-xl shadow-sm">
              <button
                className="px-space-md py-space-xs rounded-lg font-title-sm text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-space-xs"
                type="button"
              >
                <span className="material-symbols-outlined text-base">translate</span>
                <span>Trung → Việt (Thuận)</span>
              </button>
              <button
                className="px-space-md py-space-xs rounded-lg bg-surface-container-lowest font-title-sm text-primary-container font-bold shadow-sm flex items-center gap-space-xs"
                type="button"
              >
                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                  edit_note
                </span>
                <span>Việt → Trung (Nghịch • Active Production)</span>
              </button>
            </div>
            <span className="hidden md:inline-block px-space-sm py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm tracking-wide uppercase">
              {' '}
              Nâng Cao{' '}
            </span>
          </div>
          <div className="flex items-center gap-space-md bg-surface-container-lowest px-space-md py-space-xs rounded-xl shadow-sm">
            <div className="flex items-center gap-space-xs text-on-surface">
              <span className="font-headline-md text-headline-md font-bold text-primary-container">08</span>
              <span className="font-label-md text-label-md text-on-surface-variant">/ 10 câu</span>
            </div>
            <div className="w-28 h-2 bg-surface-container-high rounded-full overflow-hidden">
              <div className="h-full bg-secondary rounded-full" style={{ width: '80%' }}></div>
            </div>
            <div className="flex items-center gap-1 font-label-md text-tertiary">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                stars
              </span>
              <span>+35 XP</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container text-on-surface font-label-sm">
              <span className="material-symbols-outlined text-xs">speed</span>
              <span>HSK 3+</span>
            </div>
          </div>
        </section>
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-gutter">
          <div className="xl:col-span-7 flex flex-col gap-space-lg">
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary-fixed/20 rounded-full blur-2xl pointer-events-none"></div>
              <div className="flex items-center justify-between mb-space-sm">
                <div className="flex items-center gap-space-xs">
                  <span className="w-2 h-2 rounded-full bg-primary-container"></span>
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
                    Câu Nguồn Ngữ Nghĩa (Tiếng Việt)
                  </span>
                </div>
                <span className="font-label-sm text-label-sm text-primary-container font-bold bg-primary-fixed/40 px-2 py-0.5 rounded-md">
                  {' '}
                  Yêu cầu tự nhiên • Giữ trật tự ngữ pháp{' '}
                </span>
              </div>
              <blockquote className="font-headline-xl text-headline-xl text-on-surface my-space-sm leading-relaxed tracking-tight">
                {' '}
                “Nếu ngày mai trời mưa, chúng tôi sẽ không đi leo núi cùng với giáo viên Vương.”{' '}
              </blockquote>
              <div className="mt-space-md pt-space-md flex flex-wrap items-center gap-space-sm">
                <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-tertiary">lightbulb</span> Cấu trúc buộc
                  dùng:{' '}
                </span>
                <span className="px-space-sm py-1 bg-surface-container rounded-lg font-title-sm text-title-sm font-semibold text-primary">
                  {' '}
                  如果……就……{' '}
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-normal">(Rúguǒ… jiù…)</span>
                </span>
                <span className="px-space-sm py-1 bg-surface-container rounded-lg font-title-sm text-title-sm text-on-surface">
                  {' '}
                  下雨 <span className="font-label-sm text-label-sm text-on-surface-variant">(xiàyǔ)</span>
                </span>
                <span className="px-space-sm py-1 bg-surface-container rounded-lg font-title-sm text-title-sm text-on-surface">
                  {' '}
                  爬山 <span className="font-label-sm text-label-sm text-on-surface-variant">(páshān)</span>
                </span>
                <span className="px-space-sm py-1 bg-surface-container rounded-lg font-title-sm text-title-sm text-on-surface">
                  {' '}
                  跟……一起 <span className="font-label-sm text-label-sm text-on-surface-variant">(gēn… yìqǐ)</span>
                </span>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-primary-container">keyboard_alt</span>
                  <label
                    className="font-title-sm text-title-sm font-bold text-on-surface"
                    htmlFor="chinese-translation-input"
                  >
                    {' '}
                    Bản Dịch Tiếng Trung Của Bạn (Hanzi Production){' '}
                  </label>
                </div>
                <div className="flex items-center gap-space-xs">
                  <span className="font-label-sm text-label-sm text-secondary font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">spellcheck</span> IME Pinyin Hỗ Trợ{' '}
                  </span>
                </div>
              </div>
              <div className="relative bg-surface-container-low rounded-xl p-space-md focus-within:bg-surface-container-lowest focus-within:shadow-md transition-all">
                <textarea
                  className="w-full bg-transparent text-headline-md font-display-character text-on-surface focus:outline-none resize-none leading-relaxed"
                  id="chinese-translation-input"
                  placeholder="Nhập câu dịch bằng Hán tự tại đây..."
                  rows={3}
                  defaultValue={`如果明天下雨，我们就不跟王老师一起去爬山。`}
                />
                <div className="flex flex-wrap items-center justify-between gap-space-xs pt-space-xs mt-space-xs bg-surface-container-high/40 p-space-xs rounded-lg">
                  <div className="flex items-center gap-1 text-on-surface-variant font-label-sm">
                    <span className="font-bold">Ký tự thanh điệu nhanh:</span>
                    <div className="inline-flex gap-1">
                      <button
                        className="w-6 h-6 rounded bg-surface-container-lowest text-on-surface font-title-sm flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all"
                        type="button"
                      >
                        ā
                      </button>
                      <button
                        className="w-6 h-6 rounded bg-surface-container-lowest text-on-surface font-title-sm flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all"
                        type="button"
                      >
                        á
                      </button>
                      <button
                        className="w-6 h-6 rounded bg-surface-container-lowest text-on-surface font-title-sm flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all"
                        type="button"
                      >
                        ǎ
                      </button>
                      <button
                        className="w-6 h-6 rounded bg-surface-container-lowest text-on-surface font-title-sm flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all"
                        type="button"
                      >
                        à
                      </button>
                      <button
                        className="w-6 h-6 rounded bg-surface-container-lowest text-on-surface font-title-sm flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all"
                        type="button"
                      >
                        ǐ
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-space-xs font-label-sm text-on-surface-variant">
                    <span>Độ dài: 22 ký tự</span>
                    <span>•</span>
                    <span className="text-secondary font-semibold">Đã lưu bản nháp</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-space-md pt-space-xs">
                <div className="flex items-center gap-space-xs">
                  <button
                    className="px-space-md py-space-sm bg-surface-container text-on-surface rounded-lg font-title-sm hover:bg-surface-container-high transition-colors flex items-center gap-space-xs"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-base">volume_up</span>
                    <span>Nghe Giọng Mẫu CCTV</span>
                  </button>
                  <button
                    className="px-space-md py-space-sm bg-surface-container text-on-surface rounded-lg font-title-sm hover:bg-surface-container-high transition-colors flex items-center gap-space-xs"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-base">bookmark_add</span>
                    <span>Lưu Sổ Tay Bản Dịch</span>
                  </button>
                </div>
                <div className="flex items-center gap-space-sm">
                  <span className="hidden sm:inline-block font-label-sm text-on-surface-variant">
                    Nhấn [Ctrl + Enter]
                  </span>
                  <button
                    className="px-space-lg py-space-sm bg-primary-container text-on-primary font-title-sm font-bold rounded-lg shadow-sm hover:bg-primary transition-transform active:scale-95 flex items-center gap-space-xs"
                    type="button"
                    onClick={goNext}
                  >
                    <span className="material-symbols-outlined text-base">verified</span>
                    <span>Nộp Bài Dịch • Phân Tích AI</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-tertiary">auto_stories</span>
                  <span>Đối Sánh Bản Dịch Mẫu 3 Cấp Độ</span>
                </h3>
                <span className="font-label-sm text-label-sm text-on-surface-variant font-normal">
                  Chuẩn hoá ngữ cảnh xã giao &amp; văn phong
                </span>
              </div>
              <div className="flex flex-col gap-space-sm">
                <div className="p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface font-label-sm font-bold uppercase">
                      Cấp 1 • Khẩu ngữ hàng ngày (Thông dụng)
                    </span>
                    <span className="font-label-sm text-on-surface-variant">Lược bớt thành phần phụ</span>
                  </div>
                  <p className="font-display-character text-headline-md text-on-surface mt-1">
                    {' '}
                    如果明天下雨，我们就不去爬山了。{' '}
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant italic">
                    {' '}
                    “Rúguǒ míngtiān xiàyǔ, wǒmen jiù bù qù páshān le.”{' '}
                  </p>
                </div>
                <div className="p-space-md rounded-xl bg-secondary-container/20 flex flex-col gap-1 relative overflow-hidden">
                  <div className="absolute right-3 top-3">
                    <span className="inline-flex items-center gap-1 text-secondary font-label-sm font-bold bg-surface-container-lowest px-2 py-0.5 rounded-full shadow-sm">
                      <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>
                        task_alt
                      </span>{' '}
                      Khớp Bản Dịch Của Bạn{' '}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-sm font-bold uppercase">
                      Cấp 2 • Chuẩn Văn Phong HSK 3 - 4 (Mục tiêu chính)
                    </span>
                  </div>
                  <p className="font-display-character text-headline-md text-secondary font-bold mt-1">
                    {' '}
                    如果明天下雨，我们就不跟王老师一起去爬山。{' '}
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant italic">
                    {' '}
                    “Rúguǒ míngtiān xiàyǔ, wǒmen jiù bù gēn Wáng lǎoshī yìqǐ qù páshān.”{' '}
                  </p>
                </div>
                <div className="p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-sm font-bold uppercase">
                      Cấp 3 • Văn Phong Thư Tịch • Cổ Kính (Ngoại diễn)
                    </span>
                    <span className="font-label-sm text-tertiary font-bold">Thư từ nghệ thuật</span>
                  </div>
                  <p className="font-display-character text-headline-md text-tertiary mt-1">
                    {' '}
                    假若明日有雨，吾等便不与王师同行登高。{' '}
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant italic">
                    {' '}
                    “Jiǎruò míngrì yǒu yǔ, wúděng biàn bù yǔ Wángshī tóngxíng dēnggāo.”{' '}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="xl:col-span-5 flex flex-col gap-space-lg">
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <div className="w-8 h-8 rounded-lg bg-secondary-container text-secondary flex items-center justify-center">
                    <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                      analytics
                    </span>
                  </div>
                  <div>
                    <h3 className="font-title-sm text-title-sm font-bold text-on-surface">Đánh Giá Trực Tiếp AI</h3>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">
                      Phân tích cấu trúc theo thời gian thực
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-headline-xl text-headline-xl font-bold text-secondary">98</span>{' '}
                  <span className="font-label-sm text-on-surface-variant">/100</span>
                </div>
              </div>
              <div className="flex flex-col gap-space-xs pt-space-xs">
                <div className="flex justify-between items-center font-label-sm">
                  <span className="text-on-surface font-semibold">Độ trung thực nghĩa gốc (Fidelity)</span>
                  <span className="text-secondary font-bold">Xuất sắc (98%)</span>
                </div>
                <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                  <div className="h-full bg-secondary rounded-full" style={{ width: '98%' }}></div>
                </div>
                <div className="flex justify-between items-center font-label-sm pt-space-xs">
                  <span className="text-on-surface font-semibold">Trật tự ngữ pháp Hán ngữ</span>
                  <span className="text-secondary font-bold">Chuẩn tuyệt đối</span>
                </div>
                <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                  <div className="h-full bg-secondary rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
              <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
                <div className="flex items-center gap-1 font-label-md text-secondary font-bold">
                  <span className="material-symbols-outlined text-base">check_circle</span>
                  <span>Trật tự ngữ pháp không bị nhiễm ngữ Việt:</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface leading-relaxed">
                  {' '}
                  Học viên đã đặt cụm giới từ chỉ đối tượng{' '}
                  <span className="font-bold text-primary-container">“跟王老师一起”</span> trước động từ chính{' '}
                  <span className="font-bold text-primary-container">“去爬山”</span>. Tránh được lỗi sai phổ biến khi
                  dịch word-by-word từ tiếng Việt (*qù páshān gēn Wáng lǎoshī).{' '}
                </p>
              </div>
              <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
                <div className="flex items-center gap-1 font-label-md text-tertiary font-bold">
                  <span className="material-symbols-outlined text-base">rule</span>
                  <span>Vị trí của phó từ “就” (Jiù):</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface leading-relaxed">
                  {' '}
                  Phó từ “就” đứng sau chủ ngữ vế hai (“我们”) và trước phó từ phủ định “不” → Cấu trúc:{' '}
                  <span className="font-mono text-primary font-bold">Chủ ngữ + 就 + 不 + …</span> là mẫu câu chuẩn xác
                  nhất của văn phong hiện đại.{' '}
                </p>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-primary-container">psychology</span>
                  <h3 className="font-title-sm text-title-sm font-bold text-on-surface">Biến Động Trí Nhớ SRS</h3>
                </div>
                <span className="font-label-sm text-label-sm text-secondary font-bold bg-secondary-container/40 px-2 py-0.5 rounded-full">
                  {' '}
                  +1 Cấp Bậc Ôn Tập{' '}
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                {' '}
                Dịch thành công trong ngữ cảnh này giúp củng cố vững chắc các nút mạng trí nhớ sau:{' '}
              </p>
              <div className="grid grid-cols-1 gap-space-xs">
                <div className="p-space-sm bg-surface-container-low rounded-lg flex items-center justify-between hover:bg-surface-container transition-colors">
                  <div className="flex items-center gap-space-sm">
                    <span className="font-display-character text-headline-md text-on-surface">爬山</span>
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md text-on-surface font-bold">páshān</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Leo núi • Vận động</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-space-sm">
                    <div className="flex flex-col items-end">
                      <span className="font-label-sm text-secondary font-bold">Thành thục (Guru)</span>
                      <span className="font-label-sm text-on-surface-variant">Ôn lại sau 14 ngày</span>
                    </div>
                    <span className="material-symbols-outlined text-secondary text-base">arrow_upward</span>
                  </div>
                </div>
                <div className="p-space-sm bg-surface-container-low rounded-lg flex items-center justify-between hover:bg-surface-container transition-colors">
                  <div className="flex items-center gap-space-sm">
                    <span className="font-display-character text-headline-md text-on-surface">雨</span>
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md text-on-surface font-bold">yǔ</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Mưa • Bộ Vũ (Radical 173)
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-space-sm">
                    <div className="flex flex-col items-end">
                      <span className="font-label-sm text-primary-container font-bold">Bậc Thầy (Master)</span>
                      <span className="font-label-sm text-on-surface-variant">Ôn lại sau 30 ngày</span>
                    </div>
                    <span className="material-symbols-outlined text-primary-container text-base">arrow_upward</span>
                  </div>
                </div>
                <div className="p-space-sm bg-surface-container-low rounded-lg flex items-center justify-between hover:bg-surface-container transition-colors">
                  <div className="flex items-center gap-space-sm">
                    <span className="font-display-character text-headline-md text-on-surface">如果</span>
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md text-on-surface font-bold">rúguǒ</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Liên từ • Giả thuyết</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-space-sm">
                    <div className="flex flex-col items-end">
                      <span className="font-label-sm text-secondary font-bold">Thành thục (Guru)</span>
                      <span className="font-label-sm text-on-surface-variant">Ôn lại sau 12 ngày</span>
                    </div>
                    <span className="material-symbols-outlined text-secondary text-base">arrow_upward</span>
                  </div>
                </div>
              </div>
              <div className="mt-space-xs p-space-sm bg-primary-fixed/20 rounded-lg flex items-center gap-space-sm">
                <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center font-display-character font-bold text-primary-container text-title-sm">
                  {' '}
                  雨{' '}
                </div>
                <div className="flex flex-col text-on-surface">
                  <span className="font-label-md font-bold">Ghi nhớ bộ thủ: Bộ Vũ (雨)</span>
                  <span className="font-label-sm text-on-surface-variant">
                    Mô phỏng những giọt mưa rơi từ bầu trời. Chiếm 82% chữ liên quan đến khí tượng.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="mt-space-xl pt-space-md flex flex-col sm:flex-row items-center justify-between text-on-surface-variant gap-space-sm">
          <div className="flex items-center gap-space-xs font-label-sm">
            <span className="material-symbols-outlined text-sm text-secondary">workspace_premium</span>
            <span>Hệ thống SRS đang áp dụng thuật toán SuperMemo SM-2 tinh chỉnh cho ngữ pháp biên dịch.</span>
          </div>
          <div className="flex items-center gap-space-md font-label-sm">
            <span className="hover:text-primary transition-colors cursor-pointer">
              Đổi sang chế độ luyện phát âm (Speech-to-Text)
            </span>
            <span>•</span>
            <span className="hover:text-primary transition-colors cursor-pointer">Báo lỗi câu dịch này</span>
          </div>
        </footer>
      </div>
    </AppShell>
  );
}
