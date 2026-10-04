import { Link, useNavigate, useParams } from 'react-router-dom';
import AppShell from '../layouts/AppShell';
import { speak } from '../lib/speak';

export default function VocabularyDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <AppShell>
      <div className="flex flex-col w-full gap-space-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md pb-space-xs">
          <div className="flex items-center gap-space-sm">
            <Link
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-all font-title-sm text-title-sm"
              to="/vocabulary"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span>Kho từ vựng</span>
            </Link>
            <span className="text-on-surface-variant font-label-sm text-label-sm">/</span>
            <div className="flex items-center gap-2">
              <span className="font-headline-md text-headline-md text-on-surface">Chi tiết từ:</span>
              <span className="font-headline-xl text-headline-xl text-primary font-bold tracking-tight">老师</span>
              <span className="font-label-md text-label-md text-on-surface-variant bg-surface-container px-2.5 py-0.5 rounded-full">
                lǎoshī
              </span>
            </div>
          </div>
          <div className="flex items-center gap-space-sm self-start sm:self-auto">
            <button
              className="inline-flex items-center gap-1.5 px-space-md py-2 rounded-lg bg-surface-container-highest text-on-surface font-title-sm text-title-sm hover:bg-surface-dim transition-all shadow-sm"
              type="button"
              onClick={() => navigate(`/vocabulary/${id}/edit`)}
            >
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">edit</span>
              <span>Chỉnh sửa</span>
            </button>
            <button
              className="inline-flex items-center gap-1.5 px-space-md py-2 rounded-lg bg-primary text-on-primary font-title-sm text-title-sm hover:opacity-90 transition-all shadow-md"
              type="button"
              onClick={() => navigate('/review')}
            >
              <span className="material-symbols-outlined text-[18px]">bolt</span>
              <span>Luyện nhanh từ này</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start">
          <div className="xl:col-span-7 flex flex-col gap-space-lg">
            <div className="relative bg-surface-container-lowest rounded-xl p-space-lg shadow-sm overflow-hidden">
              <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-primary/5 pointer-events-none blur-3xl"></div>
              <div className="absolute right-6 top-6 select-none opacity-5 font-headline-xl text-[140px] leading-none text-primary pointer-events-none">
                {' '}
                師{' '}
              </div>
              <div className="relative z-10 flex flex-col gap-space-md">
                <div className="flex flex-wrap items-center justify-between gap-space-sm">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-bold tracking-wider">
                      HSK 1
                    </span>
                    <span className="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">
                      Danh từ (Noun)
                    </span>
                    <span className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
                      Từ ghép 2 âm tiết
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-on-surface-variant">
                    <span className="font-label-sm text-label-sm">ID:</span>
                    <span className="font-label-sm text-label-sm font-bold text-on-surface">#HZ-01048</span>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md pt-space-xs">
                  <div className="flex items-baseline gap-space-md">
                    <h1 className="font-display-character text-display-character text-primary tracking-tight font-bold select-all leading-none">
                      {' '}
                      老师{' '}
                    </h1>
                    <div className="flex flex-col">
                      <span className="font-headline-xl text-headline-xl text-on-surface font-semibold tracking-normal">
                        lǎoshī
                      </span>
                      <span className="font-body-md text-body-md text-on-surface-variant italic">
                        Âm Hán Việt: <strong className="text-on-surface font-bold">Lão Sư</strong>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      aria-label="Phát âm chuẩn"
                      className="w-12 h-12 rounded-full bg-primary-container text-on-primary flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-md"
                      type="button"
                      onClick={() => speak('老师')}
                    >
                      <span className="material-symbols-outlined text-[24px]">volume_up</span>
                    </button>
                    <button
                      aria-label="Phát âm chậm"
                      className="w-10 h-10 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center hover:bg-surface-container-highest transition-all shadow-sm"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[20px]">slow_motion_video</span>
                    </button>
                    <button
                      aria-label="Thêm vào danh sách yêu thích"
                      className="w-10 h-10 rounded-full bg-surface-container-high text-primary flex items-center justify-center hover:bg-surface-container-highest transition-all shadow-sm"
                      type="button"
                    >
                      <span
                        className="material-symbols-outlined text-[20px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    </button>
                  </div>
                </div>
                <div className="mt-space-xs bg-surface-container-low p-space-md rounded-lg flex flex-col gap-space-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                      Định nghĩa ngữ nghĩa chính
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Tần suất xuất hiện: Rất cao (Top 500)
                    </span>
                  </div>
                  <p className="font-body-lg text-body-lg text-on-surface font-medium leading-relaxed">
                    {' '}
                    Người làm nghề dạy học, giảng dạy kiến thức hoặc truyền thụ kỹ năng trong trường học, học viện; thầy
                    giáo, cô giáo.{' '}
                  </p>
                  <div className="text-on-surface-variant font-body-sm text-body-sm flex items-center gap-2">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                    <span>
                      Sắc thái: Trang trọng, tôn kính. Trong văn hóa Trung Hoa hiện đại, xưng hô "老师" còn mở rộng để
                      biểu thị sự kính trọng với chuyên gia, nghệ sĩ, tiền bối trong ngành.
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary font-bold">
                    <span className="material-symbols-outlined text-[20px]">account_tree</span>
                  </div>
                  <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                    Cấu Tạo Hán Tự &amp; Chiết Tự (Etymology)
                  </h2>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Phương pháp Lục Thư (六书)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                <div className="bg-surface-container-low rounded-lg p-space-md flex flex-col gap-space-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-space-sm">
                      <span className="font-display-character-mobile text-headline-xl text-primary font-bold">老</span>
                      <div className="flex flex-col">
                        <span className="font-title-sm text-title-sm font-bold text-on-surface">lǎo (Lão)</span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          Bộ Lão (耂 / 老) · 6 nét
                        </span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-surface-container-highest font-label-sm text-label-sm text-on-surface-variant">
                      Hội ý
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                    {' '}
                    Hình tượng người già râu tóc dài, lưng gập xuống và chống gậy (匕 biến âm). Biểu thị bậc cao niên
                    đầy đặn kinh nghiệm, sự từng trải và tri thức uyên thâm cần được tôn kính.{' '}
                  </p>
                </div>
                <div className="bg-surface-container-low rounded-lg p-space-md flex flex-col gap-space-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-space-sm">
                      <span className="font-display-character-mobile text-headline-xl text-primary font-bold">师</span>
                      <div className="flex flex-col">
                        <span className="font-title-sm text-title-sm font-bold text-on-surface">shī (Sư)</span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">Bộ Cân (巾) · 6 nét</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-surface-container-highest font-label-sm text-label-sm text-on-surface-variant">
                      Hình thanh
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                    {' '}
                    Dạng phồn thể là 師. Nguyên thủy mang nghĩa quân đội, đạo quân (nơi có cờ xí '巾' và tướng lĩnh chỉ
                    huy). Sau phái sinh nghĩa người dẫn đường, người chỉ dẫn khuôn phép mực thước.{' '}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary font-bold">
                    <span className="material-symbols-outlined text-[20px]">draw</span>
                  </div>
                  <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                    Thứ Tự Nét Viết (Stroke Order)
                  </h2>
                </div>
                <button
                  className="inline-flex items-center gap-1 font-label-md text-label-md text-primary font-bold hover:underline"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">replay</span>
                  <span>Xem hoạt ảnh động</span>
                </button>
              </div>
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                  <span>
                    Chữ 1: <strong className="text-on-surface">老</strong> (Tổng cộng 6 nét - Quy tắc: Ngang trước sổ
                    sau, trên trước dưới sau)
                  </span>
                  <span className="text-primary font-bold">Nét thứ 4 là nét phẩy dài</span>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  <div className="h-20 rounded-lg bg-surface-container-low flex flex-col items-center justify-center relative group hover:bg-surface-container transition-all">
                    <span className="font-headline-xl text-headline-md text-on-surface-variant/40">一</span>
                    <span className="absolute bottom-1 font-label-sm text-label-sm text-on-surface-variant">
                      1. Ngang
                    </span>
                  </div>
                  <div className="h-20 rounded-lg bg-surface-container-low flex flex-col items-center justify-center relative group hover:bg-surface-container transition-all">
                    <span className="font-headline-xl text-headline-md text-on-surface-variant/60">十</span>
                    <span className="absolute bottom-1 font-label-sm text-label-sm text-on-surface-variant">2. Sổ</span>
                  </div>
                  <div className="h-20 rounded-lg bg-surface-container-low flex flex-col items-center justify-center relative group hover:bg-surface-container transition-all">
                    <span className="font-headline-xl text-headline-md text-on-surface-variant/70">土</span>
                    <span className="absolute bottom-1 font-label-sm text-label-sm text-on-surface-variant">
                      3. Ngang
                    </span>
                  </div>
                  <div className="h-20 rounded-lg bg-surface-container-low flex flex-col items-center justify-center relative group hover:bg-surface-container transition-all">
                    <span className="font-headline-xl text-headline-md text-primary font-bold">耂</span>
                    <span className="absolute bottom-1 font-label-sm text-label-sm text-primary font-bold">
                      4. Phẩy
                    </span>
                  </div>
                  <div className="h-20 rounded-lg bg-surface-container-low flex flex-col items-center justify-center relative group hover:bg-surface-container transition-all">
                    <span className="font-headline-xl text-headline-md text-on-surface-variant">耂'</span>
                    <span className="absolute bottom-1 font-label-sm text-label-sm text-on-surface-variant">
                      5. Quát
                    </span>
                  </div>
                  <div className="h-20 rounded-lg bg-surface-container-low flex flex-col items-center justify-center relative group hover:bg-surface-container transition-all bg-primary-fixed/30">
                    <span className="font-headline-xl text-headline-md text-primary font-bold">老</span>
                    <span className="absolute bottom-1 font-label-sm text-label-sm text-primary font-bold">
                      6. Hoàn tất
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-space-xs mt-space-xs">
                <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                  <span>
                    Chữ 2: <strong className="text-on-surface">师</strong> (Giản thể: 6 nét - Trọng tâm: Nét sổ thẳng
                    đứng cân đối)
                  </span>
                  <span className="text-secondary font-bold">Thường sai ở nét 2 &amp; 3</span>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  <div className="h-20 rounded-lg bg-surface-container-low flex flex-col items-center justify-center relative">
                    <span className="font-headline-xl text-headline-md text-on-surface-variant/40">丨</span>
                    <span className="absolute bottom-1 font-label-sm text-label-sm text-on-surface-variant">
                      1. Sổ phẩy
                    </span>
                  </div>
                  <div className="h-20 rounded-lg bg-surface-container-low flex flex-col items-center justify-center relative">
                    <span className="font-headline-xl text-headline-md text-on-surface-variant/60">刂</span>
                    <span className="absolute bottom-1 font-label-sm text-label-sm text-on-surface-variant">
                      2. Sổ phẩy
                    </span>
                  </div>
                  <div className="h-20 rounded-lg bg-surface-container-low flex flex-col items-center justify-center relative">
                    <span className="font-headline-xl text-headline-md text-on-surface-variant/70">一</span>
                    <span className="absolute bottom-1 font-label-sm text-label-sm text-on-surface-variant">
                      3. Ngang
                    </span>
                  </div>
                  <div className="h-20 rounded-lg bg-surface-container-low flex flex-col items-center justify-center relative">
                    <span className="font-headline-xl text-headline-md text-on-surface-variant">冂</span>
                    <span className="absolute bottom-1 font-label-sm text-label-sm text-on-surface-variant">
                      4. Quát
                    </span>
                  </div>
                  <div className="h-20 rounded-lg bg-surface-container-low flex flex-col items-center justify-center relative">
                    <span className="font-headline-xl text-headline-md text-on-surface-variant">巾</span>
                    <span className="absolute bottom-1 font-label-sm text-label-sm text-on-surface-variant">
                      5. Ngang gập
                    </span>
                  </div>
                  <div className="h-20 rounded-lg bg-surface-container-low flex flex-col items-center justify-center relative bg-secondary-fixed/30">
                    <span className="font-headline-xl text-headline-md text-secondary font-bold">师</span>
                    <span className="absolute bottom-1 font-label-sm text-label-sm text-secondary font-bold">
                      6. Sổ huyền kim
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary font-bold">
                    <span className="material-symbols-outlined text-[20px]">chat</span>
                  </div>
                  <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                    3 Câu Ví Dụ Thực Tế Phong Phú
                  </h2>
                </div>
                <span className="font-label-sm text-label-sm text-secondary font-bold">Giọng đọc bản xứ AI</span>
              </div>
              <div className="flex flex-col gap-space-sm">
                <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col gap-1.5 hover:bg-surface-container transition-all">
                  <div className="flex items-start justify-between gap-space-sm">
                    <div className="flex flex-col">
                      <p className="font-title-sm text-title-sm text-on-surface font-bold">
                        {' '}
                        王<span className="text-primary underline decoration-2 underline-offset-4">老师</span>
                        是我们的汉语老师。{' '}
                      </p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        {' '}
                        Wáng <strong className="text-primary">lǎoshī</strong> shì wǒmen de hànyǔ lǎoshī.{' '}
                      </p>
                    </div>
                    <button
                      aria-label="Nghe câu ví dụ 1"
                      className="w-9 h-9 rounded-full bg-surface-container-highest text-on-surface flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all shrink-0"
                      type="button"
                      onClick={() => speak('老师')}
                    >
                      <span className="material-symbols-outlined text-[18px]">volume_up</span>
                    </button>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface font-medium pt-1">
                    {' '}
                    Thầy Vương là thầy giáo dạy tiếng Trung của chúng tôi.{' '}
                  </p>
                </div>
                <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col gap-1.5 hover:bg-surface-container transition-all">
                  <div className="flex items-start justify-between gap-space-sm">
                    <div className="flex flex-col">
                      <p className="font-title-sm text-title-sm text-on-surface font-bold">
                        {' '}
                        今天<span className="text-primary underline decoration-2 underline-offset-4">老师</span>
                        讲的语法，我完全听懂了。{' '}
                      </p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        {' '}
                        Jīntiān <strong className="text-primary">lǎoshī</strong> jiǎng de yǔfǎ, wǒ wánquán tīng dǒng
                        le.{' '}
                      </p>
                    </div>
                    <button
                      aria-label="Nghe câu ví dụ 2"
                      className="w-9 h-9 rounded-full bg-surface-container-highest text-on-surface flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all shrink-0"
                      type="button"
                      onClick={() => speak('老师')}
                    >
                      <span className="material-symbols-outlined text-[18px]">volume_up</span>
                    </button>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface font-medium pt-1">
                    {' '}
                    Ngữ pháp hôm nay cô giáo giảng, tôi đã hoàn toàn hiểu hết rồi.{' '}
                  </p>
                </div>
                <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col gap-1.5 hover:bg-surface-container transition-all">
                  <div className="flex items-start justify-between gap-space-sm">
                    <div className="flex flex-col">
                      <p className="font-title-sm text-title-sm text-on-surface font-bold">
                        {' '}
                        李先生是书法界的资深
                        <span className="text-primary underline decoration-2 underline-offset-4">老师</span>。{' '}
                      </p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        {' '}
                        Lǐ xiānsheng shì shūfǎ jiè de zīshēn <strong className="text-primary">lǎoshī</strong>.{' '}
                      </p>
                    </div>
                    <button
                      aria-label="Nghe câu ví dụ 3"
                      className="w-9 h-9 rounded-full bg-surface-container-highest text-on-surface flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all shrink-0"
                      type="button"
                      onClick={() => speak('老师')}
                    >
                      <span className="material-symbols-outlined text-[18px]">volume_up</span>
                    </button>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface font-medium pt-1">
                    {' '}
                    Ông Lý là một bậc thầy/tiền bối kỳ cựu trong giới thư pháp.{' '}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="xl:col-span-5 flex flex-col gap-space-lg">
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[22px]">psychology</span>
                  <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                    Hồ Sơ Trí Nhớ Spaced Repetition
                  </h2>
                </div>
                <span className="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold shadow-sm">
                  {' '}
                  Master Lv.2{' '}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-space-md bg-surface-container-low p-space-md rounded-lg">
                <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
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
                      strokeDasharray="72, 100"
                      strokeLinecap="round"
                      strokeWidth="3.5"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="font-headline-lg text-headline-lg font-bold text-on-surface leading-none">
                      72%
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">Độ bền</span>
                  </div>
                </div>
                <div className="flex flex-col justify-center gap-space-xs w-full">
                  <div className="flex items-center justify-between">
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Lịch sử trả lời:</span>
                    <span className="font-title-sm text-title-sm font-bold text-on-surface">14 Đúng / 3 Sai</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Tỷ lệ chính xác:</span>
                    <span className="font-title-sm text-title-sm font-bold text-secondary">82.4%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden flex mt-1">
                    <div className="h-full bg-secondary" style={{ width: '82.4%' }}></div>
                    <div className="h-full bg-error" style={{ width: '17.6%' }}></div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-space-sm">
                <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-1">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    Lần ôn gần nhất
                  </span>
                  <div className="flex items-center gap-1.5 text-on-surface font-title-sm text-title-sm font-bold">
                    <span className="material-symbols-outlined text-[16px] text-secondary">check_circle</span>
                    <span>14/10/2023</span>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Đạt kết quả Đúng (Good)</span>
                </div>
                <div className="p-space-sm rounded-lg bg-primary-fixed/40 flex flex-col gap-1">
                  <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-bold">
                    Lần ôn tiếp theo
                  </span>
                  <div className="flex items-center gap-1.5 text-primary font-title-sm text-title-sm font-bold">
                    <span className="material-symbols-outlined text-[16px] text-primary">event</span>
                    <span>17/10/2023</span>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Khoảng cách SRS: <strong className="text-on-surface">3 ngày</strong>
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[22px]">radar</span>
                  <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                    Đánh Giá Năng Lực 6 Chiều
                  </h2>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Phân tích thực học</span>
              </div>
              <div className="flex flex-col gap-space-sm">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between text-on-surface font-label-md text-label-md">
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-secondary">visibility</span>
                      <span>Nhận diện mặt chữ</span>
                    </span>
                    <span className="font-bold text-secondary">95% (Rất vững)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
                    <div className="h-full bg-secondary" style={{ width: '95%' }}></div>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between text-on-surface font-label-md text-label-md">
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-secondary">spellcheck</span>
                      <span>Pinyin &amp; Thanh điệu</span>
                    </span>
                    <span className="font-bold text-secondary">90%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
                    <div className="h-full bg-secondary" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between text-on-surface font-label-md text-label-md">
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-secondary">headphones</span>
                      <span>Nghe hiểu phản xạ</span>
                    </span>
                    <span className="font-bold text-secondary">85%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
                    <div className="h-full bg-secondary" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="flex flex-col gap-1 bg-error-container/30 p-2 rounded-lg">
                  <div className="flex items-center justify-between text-on-surface font-label-md text-label-md">
                    <span className="flex items-center gap-1.5 text-error font-bold">
                      <span className="material-symbols-outlined text-[16px]">edit_note</span>
                      <span>Viết tay &amp; Nét thuận</span>
                    </span>
                    <span className="font-bold text-error">65% (Điểm yếu cần củng cố)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
                    <div className="h-full bg-error" style={{ width: '65%' }}></div>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between text-on-surface font-label-md text-label-md">
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-on-surface-variant">menu_book</span>
                      <span>Đặt câu &amp; Ngữ pháp</span>
                    </span>
                    <span className="font-bold text-on-surface">75%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
                    <div className="h-full bg-tertiary" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between text-on-surface font-label-md text-label-md">
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-secondary">mic</span>
                      <span>Phát âm khẩu hình</span>
                    </span>
                    <span className="font-bold text-secondary">80%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
                    <div className="h-full bg-secondary" style={{ width: '80%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-[22px]">lightbulb</span>
                  <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                    Mẹo Nhớ Mnemonic &amp; Ghi Chú
                  </h2>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
                  AI Gợi Ý
                </span>
              </div>
              <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col gap-space-xs">
                <div className="flex items-center gap-2 text-tertiary font-title-sm text-title-sm font-bold">
                  <span className="material-symbols-outlined text-[18px]">auto_stories</span>
                  <span>Câu chuyện liên tưởng (Mnemonic Story)</span>
                </div>
                <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                  {' '}
                  "Người <strong className="text-primary font-bold">Lão (老)</strong> thành cầm khăn{' '}
                  <strong className="text-primary font-bold">Cân (巾)</strong> lau bảng trên bục giảng để chỉ bảo đạo
                  làm quân <strong className="text-primary font-bold">Sư (师)</strong>."{' '}
                </p>
                <div className="text-on-surface-variant font-label-sm text-label-sm mt-1">
                  {' '}
                  Mẹo phân biệt: Chữ 师 có nét sổ thẳng kéo dài tựa như cây thước kẻ của thầy giáo.{' '}
                </div>
              </div>
              <div className="flex flex-col gap-space-xs">
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">
                  {' '}
                  Ghi chú cá nhân của Minh Quân{' '}
                </label>
                <div className="relative">
                  <textarea
                    className="w-full p-space-sm rounded-lg bg-surface-container-low border-none text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm focus:outline-none focus:bg-surface-container-lowest focus:shadow-md transition-all resize-none"
                    placeholder="Viết kinh nghiệm, từ dễ nhầm lẫn hoặc lưu ý riêng của bạn..."
                    rows={3}
                    defaultValue={`Thường viết nhầm nét 3 và 4 của chữ 师. Nhớ kỹ: Nét sổ bên trái hơi phẩy nhẹ trước khi viết nét gập!`}
                  />
                  <button
                    className="absolute right-2 bottom-2 px-3 py-1 rounded bg-primary text-on-primary font-label-sm text-label-sm font-bold hover:opacity-90 shadow-sm transition-all"
                    type="button"
                  >
                    {' '}
                    Lưu ghi chú{' '}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
