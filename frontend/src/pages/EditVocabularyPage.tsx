import { Link, useNavigate, useParams } from 'react-router-dom';
import AppShell from '../layouts/AppShell';
import useStoredState from '../lib/useStoredState';

export default function EditVocabularyPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [, setDeleted] = useStoredState<number[]>('hanzi.deleted', []);
  const save = () => navigate(`/vocabulary/${id}`);
  const removeWord = () => {
    const idx = Number(id) - 1;
    if (!Number.isNaN(idx)) setDeleted((d) => (d.includes(idx) ? d : [...d, idx]));
    navigate('/vocabulary');
  };

  return (
    <AppShell>
      <div className="flex flex-col w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md mb-space-lg">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-on-surface-variant font-label-md text-label-md"
          >
            <Link className="hover:text-primary transition-colors flex items-center gap-1" to="/vocabulary">
              <span className="material-symbols-outlined text-[16px]">auto_stories</span>
              <span>Kho Từ Vựng</span>
            </Link>
            <span className="text-surface-container-highest">/</span>
            <span className="text-on-surface-variant">
              Chi tiết từ: <span className="font-headline-xl text-primary font-semibold">老师</span> (lǎoshī)
            </span>
            <span className="text-surface-container-highest">/</span>
            <span className="text-primary font-bold">Chỉnh sửa &amp; Cá nhân hóa</span>
          </nav>
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-secondary-container/40 text-on-secondary-container font-label-sm text-label-sm shadow-sm">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            <span className="font-bold">SRS Cấp độ: Master</span>
            <span className="text-secondary/60">•</span>
            <span>Chu kỳ: 14 ngày</span>
            <span className="text-secondary/60">•</span>
            <span className="font-semibold text-secondary">Đúng 82.4% (28/34 lượt)</span>
          </div>
        </div>
        <div className="relative bg-surface-container-lowest rounded-xl p-space-lg md:p-space-xl shadow-sm mb-space-xl overflow-hidden">
          <div className="absolute -right-6 -bottom-8 select-none pointer-events-none opacity-[0.04] text-[180px] font-headline-xl text-primary leading-none">
            {' '}
            師{' '}
          </div>
          <div className="relative z-10 max-w-4xl flex flex-col gap-space-xs">
            <div className="inline-flex items-center gap-2 text-primary font-label-sm text-label-sm uppercase tracking-widest font-bold">
              <span className="material-symbols-outlined text-[18px]">tune</span>
              <span>Học Giả Cá Nhân Hóa Dữ Liệu Học Thuật</span>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-on-surface font-bold tracking-tight">
              {' '}
              Hiệu Chỉnh Dữ Liệu &amp; Mẹo Nhớ Riêng Cho Chữ{' '}
              <span className="text-primary font-headline-xl font-bold">“老师”</span>
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mt-1">
              {' '}
              Tùy biến nghĩa học thuật, bổ sung câu ví dụ sát với mục tiêu công việc/học tập thực tế và tự tạo mẹo nhớ
              liên tưởng độc bản giúp tăng{' '}
              <span className="text-secondary font-bold font-title-sm">
                40% khả năng kích hoạt phản xạ truy xuất não bộ
              </span>
              .{' '}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-xl items-start pb-28">
          <div className="xl:col-span-7 flex flex-col gap-space-lg">
            <section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between pb-space-sm">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[22px]">spellcheck</span>
                  <h2 className="font-title-sm text-title-sm font-bold text-on-surface tracking-tight">
                    Cấu Trúc Hán Tự Chuẩn
                  </h2>
                </div>
                <span className="inline-flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm bg-surface-container px-2.5 py-1 rounded-full">
                  <span className="material-symbols-outlined text-[14px] text-secondary">verified</span>
                  <span>Khóa chuẩn từ điển HSK 3.0</span>
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-space-md items-center bg-surface-container-low p-space-md rounded-xl">
                <div className="md:col-span-5 flex flex-col items-center justify-center p-space-md bg-surface-container-lowest rounded-lg shadow-sm text-center">
                  <div className="relative group">
                    <span className="font-display-character text-display-character text-primary select-none font-bold leading-none tracking-normal">
                      {' '}
                      老师{' '}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm">
                    <span className="px-2 py-0.5 rounded bg-surface-container font-semibold">老 (6 nét)</span>
                    <span className="text-outline-variant">+</span>
                    <span className="px-2 py-0.5 rounded bg-surface-container font-semibold">巾 (3 nét)</span>
                  </div>
                  <button
                    className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-fixed text-on-primary-fixed font-label-md text-label-md hover:bg-primary-fixed-dim transition-all shadow-sm"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px] text-primary">volume_up</span>
                    <span>TTS Giọng Bắc Kinh Chuẩn</span>
                  </button>
                </div>
                <div className="md:col-span-7 flex flex-col gap-space-sm">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-label-md text-label-md font-bold text-on-surface">Phiên âm Pinyin</label>
                      <span className="font-label-sm text-label-sm text-primary">
                        Chọn thanh: ǎ · ā · á · à · ō · ó
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-lowest text-on-surface font-title-sm text-title-sm focus:outline-none focus:bg-surface-container-high transition-all shadow-sm"
                        type="text"
                        defaultValue="lǎoshī"
                      />{' '}
                      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                        keyboard
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="font-label-md text-label-md font-bold text-on-surface mb-1 block">
                      Âm Hán Việt tương ứng
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md focus:outline-none focus:bg-surface-container-high transition-all shadow-sm"
                        type="text"
                        defaultValue="Lão Sư"
                      />
                      <span className="shrink-0 px-3 py-2 bg-surface-container rounded-lg font-label-sm text-label-sm text-on-surface-variant font-semibold">
                        {' '}
                        Tông Nôm{' '}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-1 text-on-surface-variant font-body-sm text-body-sm">
                    <span className="material-symbols-outlined text-[16px] text-secondary">info</span>
                    <span>
                      Bộ thủ cốt lõi: <strong className="text-on-surface">Bộ Lão (老)</strong> &amp;{' '}
                      <strong className="text-on-surface">Bộ Cân (巾)</strong>
                    </span>
                  </div>
                </div>
              </div>
            </section>
            <section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[22px]">menu_book</span>
                  <h2 className="font-title-sm text-title-sm font-bold text-on-surface tracking-tight">
                    Định Nghĩa Học Thuật Cá Nhân Hóa
                  </h2>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Hỗ trợ Markdown cơ bản</span>
              </div>
              <div className="flex flex-col gap-space-xs">
                <label className="font-label-md text-label-md font-bold text-on-surface">
                  Nghĩa tiếng Việt chi tiết
                </label>
                <textarea
                  className="w-full p-3.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:bg-surface-container transition-all resize-none shadow-sm leading-relaxed"
                  rows={3}
                  defaultValue={`Người làm nghề dạy học, giảng dạy kiến thức hoặc truyền thụ kỹ năng chuyên môn; còn dùng như danh xưng tôn kính dành cho bậc tiền bối, học giả hoặc người hướng dẫn.`}
                />
              </div>
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <label className="font-label-md text-label-md font-bold text-on-surface">
                    Thẻ phân loại chuyên ngành &amp; Ngữ cảnh
                  </label>
                  <span className="font-label-sm text-label-sm text-primary cursor-pointer hover:underline">
                    + Gợi ý tag
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 p-2.5 rounded-lg bg-surface-container-low">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container-highest text-on-surface font-label-md text-label-md">
                    <span className="text-primary font-bold">#</span> Nghề nghiệp{' '}
                    <button className="material-symbols-outlined text-[14px] text-on-surface-variant hover:text-error ml-1">
                      close
                    </button>
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container-highest text-on-surface font-label-md text-label-md">
                    <span className="text-primary font-bold">#</span> HSK 1{' '}
                    <button className="material-symbols-outlined text-[14px] text-on-surface-variant hover:text-error ml-1">
                      close
                    </button>
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container-highest text-on-surface font-label-md text-label-md">
                    <span className="text-primary font-bold">#</span> Giao tiếp trang trọng{' '}
                    <button className="material-symbols-outlined text-[14px] text-on-surface-variant hover:text-error ml-1">
                      close
                    </button>
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary-container/40 text-secondary font-label-md text-label-md">
                    <span className="font-bold">+</span> Học đường{' '}
                  </span>
                  <input
                    className="bg-transparent border-none text-body-sm font-body-sm text-on-surface px-2 focus:outline-none placeholder:text-on-surface-variant"
                    placeholder="Nhập thêm tag..."
                    type="text"
                  />
                </div>
              </div>
            </section>
            <section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[22px]">format_quote</span>
                  <div>
                    <h2 className="font-title-sm text-title-sm font-bold text-on-surface tracking-tight">
                      Câu Ví Dụ Ngữ Cảnh Thực Tế
                    </h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Luyện câu trong bối cảnh đời thực để ghi nhớ bền vững
                    </p>
                  </div>
                </div>
                <button
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-highest hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-all shadow-sm"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px] text-primary">psychology</span>
                  <span>AI Context Generator</span>
                </button>
              </div>
              <div className="flex flex-col gap-space-sm">
                <div className="group p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex flex-col gap-2">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-headline-lg text-headline-md font-bold text-on-surface tracking-wide">
                          我是老师。
                        </span>
                        <button
                          className="w-7 h-7 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm hover:scale-105 transition-transform"
                          title="Nghe câu này"
                        >
                          <span className="material-symbols-outlined text-[16px]">volume_up</span>
                        </button>
                      </div>
                      <div className="font-label-md text-label-md text-primary font-semibold">Wǒ shì lǎoshī.</div>
                      <div className="font-body-md text-body-md text-on-surface-variant">
                        Tôi là giáo viên. (Mẫu câu cơ bản khẳng định vị thế)
                      </div>
                    </div>
                    <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                      <button
                        className="p-1.5 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container-lowest transition-all"
                        title="Chỉnh sửa"
                      >
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button
                        className="p-1.5 rounded text-on-surface-variant hover:text-error hover:bg-surface-container-lowest transition-all"
                        title="Xóa"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="group p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex flex-col gap-2">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-headline-lg text-headline-md font-bold text-on-surface tracking-wide">
                          王老师是我们的汉语老师。
                        </span>
                        <button
                          className="w-7 h-7 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm hover:scale-105 transition-transform"
                          title="Nghe câu này"
                        >
                          <span className="material-symbols-outlined text-[16px]">volume_up</span>
                        </button>
                      </div>
                      <div className="font-label-md text-label-md text-primary font-semibold">
                        Wáng lǎoshī shì wǒmen de hànyǔ lǎoshī.
                      </div>
                      <div className="font-body-md text-body-md text-on-surface-variant">
                        Thầy Vương là giáo viên tiếng Trung của chúng tôi.
                      </div>
                    </div>
                    <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                      <button
                        className="p-1.5 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container-lowest transition-all"
                        title="Chỉnh sửa"
                      >
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button
                        className="p-1.5 rounded text-on-surface-variant hover:text-error hover:bg-surface-container-lowest transition-all"
                        title="Xóa"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="w-full py-3 px-4 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-title-sm text-title-sm flex items-center justify-center gap-2 transition-all"
                type="button"
              >
                <span className="material-symbols-outlined text-primary text-[20px]">add_circle</span>
                <span>Thêm câu ví dụ gắn liền công việc / đời sống cá nhân</span>
              </button>
            </section>
          </div>
          <div className="xl:col-span-5 flex flex-col gap-space-lg">
            <section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-[22px]">lightbulb</span>
                  <h2 className="font-title-sm text-title-sm font-bold text-on-surface tracking-tight">
                    Mẹo Nhớ Mnemonic Độc Bản
                  </h2>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
                  {' '}
                  Hiệu Ứng Trí Nhớ Vị Trí{' '}
                </span>
              </div>
              <div className="p-space-sm bg-surface-container-low rounded-lg flex flex-col gap-1">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-tertiary">history_edu</span> Mẹo gợi ý từ
                  Chiết tự kinh điển:{' '}
                </span>
                <p className="font-body-sm text-body-sm text-on-surface italic leading-relaxed">
                  {' '}
                  “Người cao tuổi học rộng đức dày (<strong className="text-primary not-italic">Lão 老</strong>), tay
                  cầm thước và khăn cờ hiệu (<strong className="text-primary not-italic">Cân 巾</strong>) dẫn dắt môn đệ
                  từng bước thành tài.”{' '}
                </p>
              </div>
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <label className="font-label-md text-label-md font-bold text-on-surface">
                    Mẹo liên tưởng của riêng bạn
                  </label>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Chỉ mình bạn nhìn thấy</span>
                </div>
                <textarea
                  className="w-full p-3.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:bg-surface-container transition-all shadow-sm resize-none leading-relaxed"
                  placeholder="Nhập câu chuyện đời thực, hình ảnh liên tưởng hoặc cảm xúc ấn tượng..."
                  rows={4}
                  defaultValue={`Nhớ đến thầy Nam dạy Toán cấp 3: thầy cao gầy, tóc bạc hoa râm (Lão) và trên tay lúc nào cũng cầm chiếc khăn lau bảng màu xanh (Cân) để xóa sạch những định lý sai sót.`}
                />
              </div>
              <div className="flex flex-col gap-space-xs">
                <label className="font-label-md text-label-md font-bold text-on-surface">
                  Kích hoạt giác quan não bộ
                </label>
                <div className="flex flex-wrap gap-2">
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-highest text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-all">
                    <input defaultChecked className="accent-primary rounded" type="checkbox" />
                    <span>Thị Giác (#HìnhẢnh)</span>
                  </label>
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-highest text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-all">
                    <input defaultChecked className="accent-primary rounded" type="checkbox" />
                    <span>Kỷ Niệm (#CảmXúc)</span>
                  </label>
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-highest text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-all">
                    <input className="accent-primary rounded" type="checkbox" />
                    <span>Thính Giác (#ÂmThanh)</span>
                  </label>
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-highest text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-all">
                    <input className="accent-primary rounded" type="checkbox" />
                    <span>Vận Động (#ChữViết)</span>
                  </label>
                </div>
              </div>
            </section>
            <section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[22px]">model_training</span>
                  <h2 className="font-title-sm text-title-sm font-bold text-on-surface tracking-tight">
                    Cấu Hình Thuật Toán SRS
                  </h2>
                </div>
                <span
                  className="material-symbols-outlined text-on-surface-variant text-[18px]"
                  title="Tùy biến nhịp lặp lại thông minh SM-2 tùy theo cảm nhận"
                >
                  help_outline
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="font-label-md text-label-md font-bold text-on-surface">
                    Độ khó cảm nhận (Subjective Factor)
                  </span>
                  <span className="font-label-sm text-label-sm font-bold text-secondary px-2 py-0.5 rounded bg-secondary-container/40">
                    Bình Thường (2.4x)
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    className="py-2 px-3 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md flex flex-col items-center gap-0.5 transition-all"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px] text-secondary">
                      sentiment_very_satisfied
                    </span>
                    <span>Rất Dễ (+3.0x)</span>
                  </button>
                  <button
                    className="py-2 px-3 rounded-lg bg-secondary text-on-secondary font-label-md text-label-md flex flex-col items-center gap-0.5 shadow-sm font-bold"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">sentiment_satisfied</span>
                    <span>Bình Thường (2.4x)</span>
                  </button>
                  <button
                    className="py-2 px-3 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md flex flex-col items-center gap-0.5 transition-all"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px] text-primary">sentiment_dissatisfied</span>
                    <span>Khó Khăn (1.8x)</span>
                  </button>
                </div>
              </div>
              <div className="pt-space-xs flex flex-col gap-space-sm">
                <label className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low cursor-pointer hover:bg-surface-container transition-all">
                  <div className="flex flex-col">
                    <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                      Đặt lại chu kỳ về đầu (Reset Stage)
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Đưa về trạng thái Mới Học nếu bạn liên tục nhận diện sai
                    </span>
                  </div>
                  <input className="w-5 h-5 accent-primary rounded cursor-pointer" type="checkbox" />
                </label>
                <label className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low cursor-pointer hover:bg-surface-container transition-all">
                  <div className="flex flex-col">
                    <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                      Ưu tiên trong phiên Luyện Nghe / Luyện Viết
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Tăng tần suất xuất hiện trong các bài test chuyên sâu
                    </span>
                  </div>
                  <input defaultChecked className="w-5 h-5 accent-primary rounded cursor-pointer" type="checkbox" />
                </label>
              </div>
            </section>
            <section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-sm">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-error text-[20px]">warning</span>
                <h3 className="font-label-md text-label-md uppercase font-bold tracking-wider text-error">
                  Khu Vực Quản Lý Kho Dữ Liệu
                </h3>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-normal">
                {' '}
                Thực hiện lưu trữ nếu từ này đã thuộc lòng vĩnh viễn hoặc xóa bỏ hoàn toàn khỏi kế hoạch học kỳ hiện
                tại.{' '}
              </p>
              <div className="flex items-center gap-space-sm mt-1">
                <button
                  className="flex-1 py-2 px-3 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface font-label-md text-label-md flex items-center justify-center gap-1.5 transition-all"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">archive</span>
                  <span>Đưa Vào Lưu Trữ</span>
                </button>
                <button
                  className="py-2 px-3 rounded-lg bg-error-container text-on-error-container font-label-md text-label-md flex items-center justify-center gap-1.5 hover:opacity-90 transition-all font-semibold"
                  type="button"
                  onClick={removeWord}
                >
                  <span className="material-symbols-outlined text-[18px]">delete_forever</span>
                  <span>Xóa Khỏi Lộ Trình</span>
                </button>
              </div>
            </section>
          </div>
        </div>
        <footer className="fixed bottom-0 left-72 right-0 bg-surface-container-lowest/95 backdrop-blur-md px-gutter py-3.5 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] z-30 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
            <span className="material-symbols-outlined text-[18px] text-secondary">cloud_done</span>
            <span>Đồng bộ tức thì với Cloud học giả HanziSRS</span>
            <span className="hidden md:inline text-surface-container-highest">•</span>
            <span className="hidden md:inline font-mono">Phiên bản #08-edit-vocab</span>
          </div>
          <div className="flex items-center gap-space-sm w-full sm:w-auto justify-end">
            <button
              className="px-space-md py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-title-sm text-title-sm transition-all"
              type="button"
              onClick={() => navigate(`/vocabulary/${id}`)}
            >
              {' '}
              Hủy Thay Đổi{' '}
            </button>
            <button
              className="inline-flex items-center gap-1.5 px-space-md py-2.5 rounded-lg bg-surface-container-highest hover:bg-surface-container-high text-on-surface font-title-sm text-title-sm transition-all shadow-sm"
              type="button"
              onClick={() => navigate('/review')}
            >
              <span className="material-symbols-outlined text-[18px]">visibility</span>
              <span>Xem Thẻ Flashcard</span>
            </button>
            <button
              className="inline-flex items-center gap-2 px-space-lg py-2.5 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-title-sm text-title-sm shadow-[0_4px_14px_rgba(190,18,60,0.28)] hover:scale-[1.01] transition-all font-bold"
              type="button"
              onClick={save}
            >
              <span className="material-symbols-outlined text-[20px]">bookmark_added</span>
              <span>Lưu Thay Đổi &amp; Cập Nhật SRS</span>
            </button>
          </div>
        </footer>
      </div>
    </AppShell>
  );
}
