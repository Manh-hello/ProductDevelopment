import AppShell from '../layouts/AppShell';
import usePracticeNext from '../lib/usePracticeFlow';

export default function SentenceCreationPage() {
  const goNext = usePracticeNext();

  return (
    <AppShell>
      <div className="flex flex-col w-full gap-space-lg pb-12">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm uppercase tracking-widest">
              <span className="hover:text-primary transition-colors cursor-pointer">Luyện Tập Đa Chiều</span>
              <span>/</span>
              <span className="text-primary font-bold">Đặt Câu Tự Do &amp; Chấm Ngữ Pháp AI</span>
              <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-semibold text-[10px]">
                Câu 19 / 20
              </span>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-on-surface font-bold tracking-tight flex items-center gap-3">
              {' '}
              Thư Phòng Luận Cú{' '}
              <span className="text-xs font-normal px-2.5 py-1 rounded-md bg-primary-fixed text-on-primary-fixed font-title-sm tracking-normal">
                Thực Chiến Hán Ngữ
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-space-sm self-start lg:self-center">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-lowest shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary"></span>
              </span>
              <span className="font-label-md text-label-md text-on-surface font-semibold">
                AI Grammar Evaluator v4.2
              </span>
              <span className="text-xs text-on-surface-variant">| Sẵn sàng phân tích</span>
            </div>
            <button className="h-9 px-3 rounded-lg bg-surface-container-high text-on-surface hover:bg-surface-variant flex items-center gap-1.5 font-label-md text-label-md transition-colors">
              <span className="material-symbols-outlined text-[18px]">help_outline</span>
              <span>Quy tắc chấm</span>
            </button>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-xl bg-surface-container-low p-space-md shadow-sm">
          <div className="absolute right-0 top-0 translate-x-6 -translate-y-6 w-48 h-48 rounded-full bg-primary/5 blur-2xl pointer-events-none"></div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md relative z-10">
            <div className="flex items-start gap-space-md">
              <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center font-display-character text-2xl font-bold shadow-md shrink-0">
                {' '}
                令{' '}
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold uppercase">
                    Nhiệm vụ cốt lõi
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Chủ đề: Học đường &amp; Đời sống học thuật
                  </span>
                </div>
                <p className="font-title-sm text-title-sm text-on-surface font-semibold">
                  {' '}
                  Tự đặt 1 câu hoàn chỉnh có sử dụng từ khóa bắt buộc:{' '}
                  <span className="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-bold inline-block mx-1">
                    「 老师 」(lǎoshī)
                  </span>{' '}
                  kết hợp cấu trúc câu giới từ{' '}
                  <span className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-bold inline-block mx-1">
                    「 在 」(zài)
                  </span>{' '}
                  hoặc câu chữ{' '}
                  <span className="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface font-bold inline-block mx-1">
                    「 把 」(bǎ)
                  </span>
                  .{' '}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-on-surface-variant shrink-0 bg-surface-container px-4 py-2.5 rounded-lg">
              <div className="flex flex-col text-right">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                  Yêu cầu tối thiểu
                </span>
                <span className="font-title-sm text-title-sm font-bold text-on-surface">
                  ≥ 6 Chữ Hán + Dấu 「，。」
                </span>
              </div>
              <span
                className="material-symbols-outlined text-secondary text-2xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg">
          <div className="xl:col-span-8 flex flex-col gap-space-lg">
            <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col gap-space-md relative overflow-hidden">
              <div className="absolute right-4 bottom-4 text-surface-container font-display-character text-8xl select-none pointer-events-none opacity-40">
                {' '}
                文{' '}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-xl">edit_note</span>
                  <span className="font-title-sm text-title-sm font-bold text-on-surface">Bản Thảo Sáng Tác</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold">
                    Auto-Syncing
                  </span>
                </div>
                <button
                  className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high transition-all text-on-surface"
                  id="ttsButton"
                >
                  <span className="material-symbols-outlined text-primary text-[18px] group-hover:scale-110 transition-transform">
                    volume_up
                  </span>
                  <span className="font-label-md text-label-md font-medium">Phát âm câu AI (TTS)</span>
                  <span className="flex items-end gap-0.5 h-3 ml-1">
                    <span className="w-0.5 h-1.5 bg-primary animate-pulse"></span>
                    <span className="w-0.5 h-3 bg-primary animate-pulse delay-75"></span>
                    <span className="w-0.5 h-2 bg-primary animate-pulse delay-150"></span>
                  </span>
                </button>
              </div>
              <div className="bg-surface-container-low rounded-xl p-3.5 flex flex-col gap-1">
                <div className="flex items-center justify-between text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">
                  <span>Phiên Âm Pinyin Thời Gian Thực</span>
                  <span className="text-secondary flex items-center gap-1 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>Thanh điệu chuẩn hóa{' '}
                  </span>
                </div>
                <div className="font-body-lg text-body-lg text-primary tracking-wide font-medium select-all">
                  {' '}
                  Wáng lǎoshī zài jiàoshì lǐ nàixīn de gěi xuéshēngmen jiǎngkè.{' '}
                </div>
              </div>
              <div className="relative flex flex-col">
                <textarea
                  className="w-full bg-transparent font-display-character text-2xl lg:text-3xl text-on-surface placeholder:text-outline/40 focus:outline-none resize-none leading-relaxed tracking-wide"
                  id="sentenceEditor"
                  placeholder="Gõ câu Hán tự tại đây..."
                  rows={3}
                  defaultValue={`王老师在教室里耐心地给学生们讲课。`}
                />
                <div className="h-0.5 w-full bg-surface-container-highest mt-2"></div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 text-on-surface-variant font-body-sm text-body-sm pt-1">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-on-surface font-semibold">
                    <span className="material-symbols-outlined text-[16px] text-primary">pin</span> 16 Hán tự{' '}
                  </span>
                  <span>•</span>
                  <span className="text-secondary font-medium">3 cấu trúc cú pháp lồng ghép</span>
                  <span>•</span>
                  <span className="px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-bold text-xs">
                    HSK 3+
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <span className="material-symbols-outlined text-[15px] text-secondary">check_circle</span>
                  <span>Đã thỏa mãn tất cả tiêu chí bắt buộc</span>
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm pt-space-xs">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-label-sm text-label-sm text-on-surface-variant mr-1">Chèn dấu:</span>
                  <button className="h-8 px-2.5 rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-bold text-sm transition-colors">
                    ，
                  </button>
                  <button className="h-8 px-2.5 rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-bold text-sm transition-colors">
                    。
                  </button>
                  <button className="h-8 px-2.5 rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-bold text-sm transition-colors">
                    ？
                  </button>
                  <button className="h-8 px-2.5 rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-bold text-sm transition-colors">
                    ！
                  </button>
                  <button className="h-8 px-2 rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-bold text-sm transition-colors">
                    “ ”
                  </button>
                  <button className="h-8 px-2 rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-bold text-sm transition-colors">
                    《 》
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface font-title-sm text-title-sm transition-colors flex items-center gap-1">
                    <span className="material-symbols-outlined text-[18px]">refresh</span>
                    <span>Làm mới</span>
                  </button>
                  <button className="px-4 py-1.5 rounded-lg bg-primary-container text-on-primary font-title-sm text-title-sm hover:opacity-95 shadow-sm transition-all flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                    <span>Phân tích lại</span>
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-2 flex-wrap">
                <span className="text-xs font-semibold text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-tertiary">lightbulb</span> Gợi ý mở
                  rộng:{' '}
                </span>
                <span className="cursor-pointer px-2.5 py-1 rounded-full bg-surface-container hover:bg-primary-fixed hover:text-on-primary-fixed text-on-surface text-xs transition-colors">
                  {' '}
                  耐心 (nàixīn • kiên nhẫn){' '}
                </span>
                <span className="cursor-pointer px-2.5 py-1 rounded-full bg-surface-container hover:bg-primary-fixed hover:text-on-primary-fixed text-on-surface text-xs transition-colors">
                  {' '}
                  讲课 (jiǎngkè • giảng bài){' '}
                </span>
                <span className="cursor-pointer px-2.5 py-1 rounded-full bg-surface-container hover:bg-primary-fixed hover:text-on-primary-fixed text-on-surface text-xs transition-colors">
                  {' '}
                  回答 (huídá • trả lời){' '}
                </span>
                <span className="cursor-pointer px-2.5 py-1 rounded-full bg-surface-container hover:bg-primary-fixed hover:text-on-primary-fixed text-on-surface text-xs transition-colors">
                  {' '}
                  认真 (rènzhēn • chăm chỉ){' '}
                </span>
              </div>
            </div>
            <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col gap-space-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md p-space-md rounded-xl bg-surface-container-low">
                <div className="flex items-center gap-space-md">
                  <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-surface-container-highest"
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
                        strokeDasharray="96, 100"
                        strokeLinecap="round"
                        strokeWidth="3.5"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="font-headline-lg text-title-sm font-bold text-on-surface leading-none">96</span>
                      <span className="text-[9px] text-on-surface-variant font-semibold">/100</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-headline-md text-headline-md font-bold text-on-surface">
                        Xuất Sắc • Chuẩn Hàn Lâm
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-[10px] font-bold">
                        Grade A+
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      {' '}
                      Ngữ pháp kết hợp chuẩn xác, không có lỗi cấu trúc hoặc ngữ cảnh sai lệch.{' '}
                    </p>
                  </div>
                </div>
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-surface-container-highest">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                    Độ tin cậy ngữ pháp
                  </span>
                  <span className="font-title-sm text-title-sm font-bold text-secondary">99.4% Chắc Chắn</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                <div className="p-space-md rounded-xl bg-surface-container flex flex-col gap-space-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[20px]">account_tree</span>
                      <span className="font-title-sm text-title-sm font-bold text-on-surface">
                        Cấu Trúc Cú Pháp (Syntax)
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm font-bold text-secondary px-2 py-0.5 rounded bg-secondary-container">
                      Chuẩn 100%
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    {' '}
                    Trật tự khối vị ngữ tuân thủ nghiêm ngặt nguyên lý Hán ngữ chuẩn:{' '}
                  </p>
                  <div className="p-2.5 rounded-lg bg-surface-container-lowest text-xs font-mono text-on-surface space-y-1">
                    <div className="text-primary font-semibold">Chủ ngữ (王老师)</div>
                    <div className="text-on-surface-variant pl-2">↳ + Trạng ngữ nơi chốn [在教室里]</div>
                    <div className="text-on-surface-variant pl-4">↳ + Trạng ngữ phương thức [耐心地]</div>
                    <div className="text-on-surface-variant pl-6">↳ + Giới từ đối tượng [给学生们]</div>
                    <div className="text-secondary font-semibold pl-8">↳ + Vị ngữ động tân [讲课]</div>
                  </div>
                </div>
                <div className="p-space-md rounded-xl bg-surface-container flex flex-col gap-space-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary text-[20px]">verified_user</span>
                      <span className="font-title-sm text-title-sm font-bold text-on-surface">Sử Dụng Trợ Từ "地"</span>
                    </div>
                    <span className="font-label-sm text-label-sm font-bold text-secondary px-2 py-0.5 rounded bg-secondary-fixed">
                      Chính Xác Tuyệt Đối
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    {' '}
                    Bạn đã sử dụng chuẩn xác trợ từ kết cấu <span className="font-bold text-primary">「 地 」</span> sau
                    tính từ miêu tả trạng thái <span className="font-bold text-on-surface">「 耐心 」</span> (kiên nhẫn)
                    nhằm bổ nghĩa cho hành động <span className="font-bold text-on-surface">「 讲课 」</span>.{' '}
                  </p>
                  <div className="mt-auto p-2 rounded bg-surface-container-lowest text-xs text-on-surface-variant">
                    {' '}
                    💡 <span className="font-semibold text-on-surface">Tránh bẫy:</span> 64% người học HSK 3 nhầm thành{' '}
                    <span className="text-error line-through">耐心的</span> hoặc{' '}
                    <span className="text-error line-through">耐心得</span>.{' '}
                  </div>
                </div>
                <div className="p-space-md rounded-xl bg-surface-container flex flex-col gap-space-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-tertiary text-[20px]">psychology</span>
                      <span className="font-title-sm text-title-sm font-bold text-on-surface">
                        Độ Tự Nhiên Khẩu Ngữ
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm font-bold text-tertiary px-2 py-0.5 rounded bg-tertiary-fixed">
                      94% Bản Xứ
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    {' '}
                    Cách kết hợp phương vị từ <span className="font-bold text-on-surface">「 ...里 」</span> kết hợp cấu
                    trúc <span className="font-bold text-on-surface">「 在... 」</span> tạo phong thái tự nhiên, tương
                    đồng phát ngôn chuẩn mực của giáo viên tại Bắc Kinh.{' '}
                  </p>
                  <div className="w-full bg-surface-container-highest rounded-full h-1.5 mt-2 overflow-hidden">
                    <div className="bg-tertiary h-1.5 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                </div>
                <div className="p-space-md rounded-xl bg-surface-container flex flex-col gap-space-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[20px]">military_tech</span>
                      <span className="font-title-sm text-title-sm font-bold text-on-surface">
                        Mức Độ Thách Thức HSK
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm font-bold text-primary px-2 py-0.5 rounded bg-primary-fixed">
                      Vượt Ngưỡng HSK 2
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    {' '}
                    Yêu cầu bài tập là HSK 2, nhưng sự góp mặt của các đơn vị từ vựng{' '}
                    <span className="font-bold text-on-surface">「 耐心 」</span> (HSK 4) và cụm li hợp{' '}
                    <span className="font-bold text-on-surface">「 讲课 」</span> (HSK 4) giúp bạn đạt điểm tối đa.{' '}
                  </p>
                  <div className="flex items-center gap-2 mt-auto text-xs text-secondary font-bold">
                    <span className="material-symbols-outlined text-[16px]">trending_up</span>
                    <span>Cấp độ đo lường: HSK 3.8</span>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-surface-container-low p-space-md flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[20px]">magic_button</span>
                    <span className="font-title-sm text-title-sm font-bold text-on-surface">
                      Gợi Ý Nâng Cao Văn Phong (AI Polishing)
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">So sánh đối sánh</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                  <div className="p-3.5 rounded-lg bg-surface-container-lowest flex flex-col gap-1.5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-label-sm text-secondary font-bold uppercase">
                        Câu của bạn (Hiện tại)
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-semibold">
                        Trong sáng • Chuẩn ngữ âm
                      </span>
                    </div>
                    <p className="font-display-character text-lg text-on-surface">王老师在教室里耐心地给学生们讲课。</p>
                    <p className="text-xs text-on-surface-variant italic">
                      Thầy Vương ở trong lớp học kiên nhẫn giảng bài cho học sinh.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-lg bg-surface-container-lowest flex flex-col gap-1.5 shadow-sm relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-label-sm text-primary font-bold uppercase">
                        Văn Khí Hàn Lâm (HSK 5-6)
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-semibold">
                        Hàn Lâm • Biểu Cảm
                      </span>
                    </div>
                    <p className="font-display-character text-lg text-primary font-semibold">
                      王老师正在教室里循循善诱地为学生答疑解惑。
                    </p>
                    <p className="text-xs text-on-surface-variant italic">
                      Thầy Vương đang tận tụy dẫn dắt chỉ bảo, giải đáp mọi khúc mắc cho học sinh trong giảng đường.
                    </p>
                    <div className="pt-1 flex items-center gap-2 text-[11px] text-tertiary">
                      <span className="material-symbols-outlined text-[14px]">auto_stories</span>
                      <span>Thành ngữ 「 循循善诱 」(từng bước chỉ dẫn tận tâm) thay cho 「 耐心 」</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="xl:col-span-4 flex flex-col gap-space-lg">
            <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-xl">psychology_alt</span>
                  <span className="font-title-sm text-title-sm font-bold text-on-surface">Từ Vựng Củng Cố SRS</span>
                </div>
                <span className="font-label-sm text-label-sm font-bold text-secondary">+3 Kích hoạt</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                {' '}
                Việc vận dụng thực tế từ vựng vào câu văn hoàn chỉnh giúp gia tăng cấp số nhân thời gian phân rã ký ức
                (Memory Retention).{' '}
              </p>
              <div className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-surface-container-lowest flex items-center justify-center font-display-character text-lg font-bold text-primary shadow-sm">
                      {' '}
                      老师{' '}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-title-sm text-title-sm font-bold text-on-surface leading-snug">lǎoshī</span>
                      <span className="text-xs text-on-surface-variant">Giáo viên, thầy/cô giáo</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-label-sm text-label-sm font-bold text-secondary">+17% SRS Boost</span>
                    <span className="text-[11px] text-on-surface-variant">75% ➔ 92%</span>
                  </div>
                </div>
                <div className="w-full bg-surface-container-highest rounded-full h-2 overflow-hidden flex">
                  <div className="bg-secondary-fixed h-full" style={{ width: '75%' }}></div>
                  <div className="bg-secondary h-full animate-pulse" style={{ width: '17%' }}></div>
                </div>
                <div className="flex justify-between items-center text-[10px] text-on-surface-variant uppercase font-semibold">
                  <span>Cấp độ: Guru</span>
                  <span className="text-secondary font-bold">Chuyển sang: Master</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-surface-container-lowest flex items-center justify-center font-display-character text-lg font-bold text-on-surface shadow-sm">
                      {' '}
                      教室{' '}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-title-sm text-title-sm font-bold text-on-surface leading-snug">
                        jiàoshì
                      </span>
                      <span className="text-xs text-on-surface-variant">Phòng học, giảng đường</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-[10px] font-bold">
                    Củng cố HSK 2
                  </span>
                </div>
                <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
                  <div className="bg-secondary h-full" style={{ width: '88%' }}></div>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-display-character text-lg font-bold shadow-sm">
                      {' '}
                      耐心{' '}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-title-sm text-title-sm font-bold text-on-surface leading-snug">nàixīn</span>
                      <span className="text-xs text-on-surface-variant">Kiên nhẫn, nhẫn nại</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-[10px] font-bold">
                    Mở khóa HSK 3
                  </span>
                </div>
                <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
                  <div className="bg-primary h-full" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
            <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-xl">workspace_premium</span>
                  <span className="font-title-sm text-title-sm font-bold text-on-surface">
                    Thành Tích &amp; Thống Kê
                  </span>
                </div>
                <span className="font-label-sm text-label-sm font-bold text-tertiary">Tuần Này</span>
              </div>
              <div className="flex items-center gap-space-md p-3.5 rounded-xl bg-surface-container-low">
                <div className="flex flex-col">
                  <span className="font-headline-lg text-headline-lg font-bold text-on-surface">
                    28<span className="text-sm font-normal text-on-surface-variant">/50</span>
                  </span>
                  <span className="text-xs text-on-surface-variant">Câu ngữ cảnh hoàn thành</span>
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-on-surface">Tiến trình tuần</span>
                    <span className="text-tertiary">56%</span>
                  </div>
                  <div className="w-full bg-surface-container-highest rounded-full h-2 overflow-hidden">
                    <div className="bg-tertiary h-full rounded-full" style={{ width: '56%' }}></div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-xl bg-tertiary-fixed flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-on-tertiary-fixed">
                    <span className="material-symbols-outlined text-[18px]">bolt</span>
                    <span className="font-title-sm text-title-sm font-bold">+35 XP</span>
                  </div>
                  <span className="text-[11px] text-on-tertiary-fixed-variant font-medium">Học Giả Thượng Hạng</span>
                </div>
                <div className="p-3 rounded-xl bg-primary-fixed flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-on-primary-fixed">
                    <span className="material-symbols-outlined text-[18px]">military_tech</span>
                    <span className="font-title-sm text-title-sm font-bold">Huy Hiệu Mới</span>
                  </div>
                  <span className="text-[11px] text-on-primary-fixed-variant font-medium">"Văn Ý Tương Thông"</span>
                </div>
              </div>
              <div className="text-xs text-on-surface-variant p-3 rounded-lg bg-surface-container flex items-start gap-2">
                <span className="material-symbols-outlined text-[16px] text-primary shrink-0 mt-0.5">
                  tips_and_updates
                </span>
                <span>
                  Tip: Hãy thử sử dụng kết cấu bổ ngữ kết quả (như 听懂, 看见) ở câu kế tiếp để nâng điểm ngữ pháp lên
                  HSK 4.
                </span>
              </div>
            </div>
            <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col gap-space-sm">
              <button className="w-full py-2.5 px-4 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-title-sm text-title-sm font-semibold transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[20px]">bookmark_add</span>
                <span>Lưu vào Sổ Tay Câu Mẫu</span>
              </button>
              <div className="flex items-center gap-2">
                <button
                  className="flex-1 py-3 px-4 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface font-title-sm text-title-sm font-bold transition-colors flex items-center justify-center gap-1.5"
                  onClick={goNext}
                >
                  <span className="material-symbols-outlined text-[20px]">skip_next</span>
                  <span>Đổi Đề Mới</span>
                </button>
                <button
                  className="flex-[2] py-3 px-4 rounded-lg bg-primary-container text-on-primary font-title-sm text-title-sm font-bold hover:opacity-95 shadow-md shadow-primary/20 transition-all flex items-center justify-center gap-2"
                  onClick={goNext}
                >
                  <span>Hoàn Tất &amp; Ghi Điểm SRS</span>
                  <span className="text-[11px] px-1.5 py-0.5 rounded bg-on-primary/20 font-mono">↵ Enter</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
