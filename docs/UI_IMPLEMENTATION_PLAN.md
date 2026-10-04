# UI Implementation Plan — Tích hợp thiết kế Stitch "Imperial Scholar Minimalist"

Trạng thái: **DRAFT — chờ duyệt. Chưa có code ứng dụng nào bị thay đổi để tạo tài liệu này.**

---

## 0. Giả định quan trọng cần xác nhận trước

Yêu cầu gốc nói "I have an existing Chinese vocabulary learning web application" và trỏ tới `./stitch-ui/`. Trong phiên làm việc này, dự án hiện có **chính là** `chinese-vocabulary-app` mà chúng ta đã xây ở Phase 2–4 trước đó trong cùng cuộc trò chuyện (backend Express + Prisma + PostgreSQL, frontend React + Vite + Tailwind với bộ UI cam/navy do tôi tự thiết kế). Toàn bộ phân tích dưới đây dựa trên giả định đó. Nếu bạn có một repo khác ngoài phiên này, cần upload lại để tôi đối chiếu chính xác.

---

## 1. Kiến trúc dự án hiện tại

```
chinese-vocabulary-app/
├── backend/        Express + TypeScript + Prisma + PostgreSQL
│   ├── src/{config,controllers,routes,middlewares,services,validators,types,utils}
│   └── prisma/schema.prisma   → models: User, Vocabulary, UserVocabulary
├── frontend/       React 19 + TypeScript + Vite + Tailwind v4
├── docs/
└── database/
```

**Backend hiện có:** chỉ `GET /api/health`. Chưa có authentication, chưa có Vocabulary CRUD API thật (đúng theo lộ trình gốc — các API này thuộc Phase 3–4 chưa triển khai). Theo yêu cầu #11 của bạn, **backend sẽ không bị đụng tới** trong phần tích hợp UI này.

**Prisma schema hiện có** chỉ 3 bảng cơ bản (`users`, `vocabularies`, `user_vocabularies`) với các field tối thiểu (hanzi, pinyin, meaning, example, mastery, interval, nextReview...). Bảng này **không có** field cho: XP, streak, SRS stage/ease-factor chi tiết, radical breakdown, mnemonic, stroke order, achievements, notifications... Đây là khoảng cách dữ liệu lớn giữa DB thật và những gì UI Stitch hiển thị — xem mục 8–9.

## 2. Kiến trúc frontend hiện tại

- **Routing:** `react-router-dom` v7, `createBrowserRouter`, định nghĩa tập trung tại `src/routes/router.tsx`, dùng 3 layout: `AuthLayout`, `AppLayout`, `FocusLayout`.
- **Styling:** Tailwind v4 qua `@theme` trong `src/index.css` (không dùng `tailwind.config.js` — khác với Stitch, xem mục 5).
- **Icon:** `lucide-react` — **khác với Stitch** (Stitch dùng Google Material Symbols Outlined qua font, xem mục 5.4).
- **Component có sẵn** (`src/components/`, `src/components/ui/`): `Button`, `Input`, `Textarea`, `Select`, `Card`, `Badge`, `ProgressBar` (+ `CircularProgress`), `Modal`, `Toast` (+ `ToastProvider`), `EmptyState`, `LoadingSkeleton`, `PageHeader`, `SearchBar`, `StatCard`, `VocabularyCard`, `VocabularyTable`, `Flashcard`, `ExerciseOption`, `WeeklyChart`, `Sidebar`, `MobileNav`, `Topbar`.
- **Pages có sẵn:** Login, Register, Dashboard, VocabularyList, VocabularyAdd, VocabularyEdit, VocabularyDetail, Review, Exercise, Statistics, Settings — **toàn bộ dùng bộ màu cam/navy tự thiết kế, sẽ bị thay thế hoàn toàn bằng thiết kế Stitch** theo yêu cầu của bạn.
- **Data:** mock data tại `src/data/mockVocabulary.ts`, `mockActivity.ts`, types tại `src/types/`.

**Kết luận quan trọng:** vì bộ UI hiện tại là do tôi tự thiết kế ở phiên trước (không phải "hệ thống cũ đã hoạt động tốt cần bảo toàn" theo tinh thần mục #10 của bạn — nó chưa từng được bạn duyệt là "production" và giờ bị thay bằng Stitch), tôi coi hầu hết các **page** hiện tại là sẽ bị viết lại hoàn toàn về mặt giao diện. Điều tôi sẽ **giữ nguyên** là kiến trúc: cấu trúc thư mục, cách tổ chức routing tập trung, khuôn mẫu tách `pages/ ` vs `components/`, cách viết mock data có type rõ ràng — vì đây là quy ước dự án, không phải "thiết kế".

---

## 3. Kiểm kê toàn bộ 28 màn hình Stitch

Đã mở và đối chiếu **screen.png** của tất cả các thư mục, đọc `DESIGN.md`, và kiểm tra `tailwind.config` nhúng trong từng `code.html`. Bảng dưới ánh xạ từng thư mục Stitch → số thứ tự theo yêu cầu của bạn → route đề xuất.

| # | Tên trong yêu cầu | Thư mục Stitch | Route đề xuất | Layout | Ghi chú |
|---|---|---|---|---|---|
| 01 | Landing Page | `01_trang_gioi_thieu...` | `/` | Không sidebar (public) | Trang giới thiệu công khai, đầy đủ hero/pricing/testimonial |
| 02/03 | Login / Register | `02_03_dang_nhap_dang_ky...` | `/login`, `/register` | Không sidebar | 1 file HTML chứa cả 2 tab (Đăng nhập / Đăng ký) trong 1 card, kèm panel thương hiệu bên trái |
| 04 | Dashboard | `dashboard_tong_quan...` | `/dashboard` | AppLayout | Hero chào mừng, 4 metric card, "6 Chiều Kỹ Năng", thử thách hôm nay, từ cần củng cố, biểu đồ tăng trưởng, spotlight Hán tự |
| 05 | Vocabulary Bank | `kho_tu_vung_them_tu...` | `/vocabulary` | AppLayout | Bảng từ vựng + bộ lọc nâng cao + 3 card phân tích cuối trang. **Screenshot của thư mục này chụp luôn modal "Thêm từ AI" đang mở đè lên** — đây là **biến thể rút gọn** của màn 06 (quick-add modal), khác với trang đầy đủ 06 |
| 06 | Add Vocabulary (AI) | `06_them_tu_vung_thong_minh...` | `/vocabulary/new` | AppLayout | Trang **rất phức tạp**: OCR/CSV import, phân tích AI, chiết tự, mnemonic, chọn SRS profile, dự báo đường cong quên lãng |
| 07 | Vocabulary Detail | `07_chi_tiet_tu_vung...` | `/vocabulary/:id` | AppLayout | Hồ sơ SRS, chiết tự, stroke order, 6-chiều năng lực, mnemonic, 3 câu ví dụ |
| 08 | Edit Vocabulary | `08_chinh_sua_tu_vung...` | `/vocabulary/:id/edit` | AppLayout | Cá nhân hoá mnemonic, cấu hình SRS riêng cho từ, sticky save-bar dưới đáy |
| 09 | Practice Hub | `09_trung_tam_luyen_tap...` | `/practice` | AppLayout | Điểm vào của 6 dạng luyện tập + phiên "Dynamic Mixing" đề xuất |
| 10 | SRS Quiz | `luyen_tap_da_chieu_srs_quiz` | `/practice/quiz` | AppLayout | Phiên trộn 6 tầng phản xạ, có tab con "Chiều 1..6", đây là bài **quiz thuận chính** (nghĩa → chọn Hán tự) |
| 11 | Reverse Quiz | `11_trac_nghiem_nguoc...` | `/practice/reverse` | AppLayout | Chọn Hán tự đúng nghĩa, có "bẫy tự hình" (chữ dễ nhầm) |
| 12 | Pinyin Practice | `12_luyen_pinyin_thanh_dieu...` | `/practice/pinyin` | AppLayout | Chọn pinyin đúng + chọn thanh điệu + quy tắc biến điệu thanh 3 |
| 13 | Practice Result | `13_ket_qua_luyen_tap_srs...` | `/practice/result` | AppLayout | Tổng kết phiên: độ chính xác, từ cần ôn ngay, tác động SRS |
| 14 | Daily Review | `14_on_tap_hang_ngay_srs...` | `/review` | AppLayout | Flashcard Again/Hard/Good/Easy, có đường quên lãng riêng cho từ + lịch phân bổ 7 ngày |
| 15 | SRS Empty State | `15_trang_thai_hoan_thanh...` | `/review/empty` | AppLayout | Trạng thái "đã ôn hết" khi queue rỗng — không phải trang riêng mà là **state** của `/review` khi `queue.length === 0` |
| 15b | Sentence Ordering | `15_sap_xep_cau_ngu_phap...` | `/practice/sentence-ordering` | AppLayout | Kéo-thả khối từ theo cấu trúc ngữ pháp, kèm sơ đồ cây cú pháp |
| 16 | Fill in the Blank | `16_luyen_dien_tu_hu_tu...` | `/practice/fill-blank` | AppLayout* | *Dùng biến thể sidebar/topbar khác (xem mục 5.3 — cần quyết định) |
| 16/17 | Translation (kết hợp) | `16_17_luyen_dien_tu_dich_cau...` | gộp vào `/practice/translation` (tab "Điền khuyết") | AppLayout* | Cùng biến thể sidebar như 16 |
| 17 | Translation Hub | `17_luyen_dich_cau_chuyen_sau...` | `/practice/translation` (tab "Dịch chuyên sâu") | AppLayout* | Cùng biến thể sidebar như 16. **16/17 và 17 trùng lặp một phần** — đề xuất gộp thành 1 route với 2 tab thay vì 2 route riêng |
| 17b | Sentence Creation + AI | `17_luyen_tao_cau...` | `/practice/sentence` | AppLayout | Đặt câu tự do + AI chấm ngữ pháp |
| 18 | Stroke Order / Writing | `18_luyen_viet_net_but_thuan...` | `/practice/writing` | AppLayout | Canvas viết nét có lưới Mễ Tự Cách, chấm điểm AI |
| 19a | Listening (Dictation) | `19_luyen_nghe_..._chep_chinh_ta` | `/practice/listening` (mode=dictation) | AppLayout | Nghe → chép chính tả từng cụm âm |
| 19b | Listening (Alt.) | `19_luyen_nghe_..._am_thanh` | `/practice/listening` (mode=recognition) | AppLayout | Nghe → chọn trắc nghiệm, có câu mở rộng |
| 20 | Speaking + Phonetics | `20_luyen_noi_cham_phat_am_ai` | `/practice/speaking` | AppLayout | Ghi âm, so sánh sóng âm, chấm điểm AI theo 4 tiêu chí |
| 21 | Statistics | `21_thong_ke_phan_tich...` | `/statistics` | AppLayout | Radar 6 kỹ năng, top lỗ hổng kiến thức, biểu đồ tăng trưởng |
| 22 | Achievements | `22_bang_thanh_tich_huan_chuong` | `/achievements` | AppLayout | Huy hiệu theo nhóm, bảng xếp hạng đồng môn, cân bằng lục giác |
| 23 | Notifications / Schedule | `23_trung_tam_thong_bao...` | `/notifications` | AppLayout* | Cùng biến thể sidebar như 16/17 |
| 24 | Settings | `24_cai_dat_he_thong...` | `/settings` | AppLayout | 3 tab: hồ sơ, thuật toán SRS + mục tiêu, âm thanh/giao diện |
| — | *(trùng lặp, xem ghi chú)* | `luy_n_c_u_ch_m_ph_t_m_ai` | không tạo route riêng | — | Gộp 3 tab (sắp xếp câu / đặt câu AI / nói-chấm điểm) — **trùng chức năng với màn 15b + 17b + 20**. Đề xuất: **không triển khai riêng**, coi đây là bản nháp sớm hơn của Stitch. Sẽ báo lại thay vì tự quyết định xoá |

**Tổng cộng đã inspect: 28/28 thư mục** (bao gồm cả 2 thư mục trùng lặp nêu trên).

---

## 4. Route Architecture (đề xuất chính thức)

```
/                              Landing (public)
/login                         Login
/register                      Register

/dashboard                     Dashboard

/vocabulary                    Vocabulary Bank
/vocabulary/new                Add Vocabulary (AI)
/vocabulary/:id                Vocabulary Detail
/vocabulary/:id/edit           Edit Vocabulary

/practice                      Practice Hub
/practice/quiz                 SRS Quiz (thuận)
/practice/reverse              Reverse Quiz
/practice/pinyin               Pinyin Practice
/practice/result               Practice Result
/practice/sentence-ordering    Sentence Ordering
/practice/fill-blank           Fill in the Blank
/practice/translation          Translation Hub (gộp 16/17 + 17)
/practice/sentence             Sentence Creation + AI
/practice/writing              Stroke Order / Writing
/practice/listening            Listening (2 mode: dictation / recognition)
/practice/speaking             Speaking + Phonetics

/review                        Daily Review (SRS Flashcard)
/review/empty                  (state, không phải route riêng — xem mục 3)

/statistics                    Statistics
/achievements                  Achievements
/notifications                 Notification / Schedule Center
/settings                      Settings
```

Giữ nguyên quy ước đặt tên hiện có của dự án (`/vocabulary/:id/edit`, kebab-case, số nhiều cho danh sách) — khớp với route cũ đã dùng ở Phase 4, không cần đổi convention.

---

## 5. Design System — nguồn sự thật & các điểm cần quyết định

### 5.1. Bảng màu chính thức (từ `tailwind.config` nhúng trong code.html — đầy đủ hơn DESIGN.md)

Lưu ý quan trọng: **`DESIGN.md` và `code.html` không dùng chung một bộ tên token**. `DESIGN.md` mô tả tường thuật với tên "Imperial Cinnabar `#BE123C`" là primary, nhưng trong `code.html` thực tế, giá trị `#be123c` được gán cho token `primary-container`, còn `primary` thực dùng `#95002a` (đậm hơn). Tôi sẽ dùng **bộ token trong `code.html`** làm nguồn sự thật kỹ thuật (vì đó là cái thực sự được dùng để build UI), và dùng `DESIGN.md` để hiểu **ý nghĩa/vai trò** của từng màu:

```
primary:                 #95002a   (nút chính, active nav — đậm hơn mô tả trong DESIGN.md)
primary-container:       #be123c   (accent nổi bật hơn, badge quan trọng)
on-primary / on-primary-container: #ffffff / #ffd0d2
secondary:                #006c4a   (Jade — mastery, đúng)
secondary-container:      #82f5c1
tertiary:                 #703a00   (Amber — streak, cảnh báo)
tertiary-container:       #934e00
tertiary-fixed:           #ffdcc3   (nền pill streak 🔥)
background / surface:     #faf9f7
surface-container-lowest: #ffffff
surface-container-low:    #f4f3f1
surface-container:        #efeeec
surface-container-high:   #e9e8e6
surface-container-highest:#e3e2e0
on-surface:                #1a1c1b
on-surface-variant:        #5b4041
outline / outline-variant: #8f6f70 / #e3bdbf
error / error-container:   #ba1a1a / #ffdad6
```

→ Đây thực chất là bảng màu **Material Design 3 (M3) color roles** đầy đủ — nhiều hơn hẳn 8 màu tóm tắt trong DESIGN.md. **Đề xuất: đưa nguyên bộ token M3 này vào theme của dự án** (qua `@theme` trong `index.css`, giữ đúng tên biến `primary`, `on-primary`, `surface-container-*`... để code sau này dễ đối chiếu ngược với `code.html` gốc khi cần tra cứu).

Đã xác nhận: **bộ màu giống hệt nhau ở toàn bộ 28/28 màn hình** — không có xung đột màu giữa các screen.

### 5.2. Typography

Khớp với DESIGN.md: **Noto Serif** cho hiển thị Hán tự (`display-character`, `headline-xl`), **Plus Jakarta Sans** cho UI/tiếng Việt. Toàn bộ fontSize/lineHeight/letterSpacing lấy nguyên theo bảng trong DESIGN.md (đã trích ở trên) — sẽ đưa vào theme dưới dạng named font-size tokens (`text-display-character`, `text-headline-xl`, `text-title-sm`...) thay vì chỉ dùng size px rời rạc, để code trong page gọi đúng class Stitch đã dùng.

**Xung đột với dự án hiện tại:** phông chữ hiện tại của tôi cũng đã dùng Plus Jakarta Sans (trùng may mắn), nhưng dùng **Noto Sans SC** cho Hán tự thay vì **Noto Serif**. Sẽ đổi sang Noto Serif để khớp Stitch.

### 5.3. ⚠️ Xung đột: 2 biến thể AppLayout khác nhau trong chính bộ Stitch

Khi so khớp `<aside>` (sidebar) và header giữa các screen, phát hiện **hai biến thể thương hiệu/nav khác nhau**, không phải một:

**Biến thể A (đa số — 24/26 screen có sidebar):**
- Logo "汉字通 HANZISRS", dòng phụ "● SRS Spaced Repetition"
- Nav: Dashboard & Tổng Quan / Kho Từ Vựng Cá Nhân / Luyện Tập & SRS / Luyện Câu & Phát Âm / Thống Kê & Tiến Độ / Cài Đặt
- Topbar: search bar lớn bên trái + pill "streak 🔥" + pill "XP ⚡" + pill "từ cần ôn 🔔" + nút "Thêm từ mới" + avatar tên đầy đủ "Minh Quân · Lv.5 Học Giả"
- Sidebar footer: mini progress "Độ thuần thục SRS"

**Biến thể B (3 screen: 16, 16/17, 23):**
- Logo "汉字通 HanziSRS" nhỏ hơn, dòng phụ "VIỆN KHẢO CỨU HÁN TỰ"
- Nav: Tổng Quan Học Tập / Điền Từ Khuyết Thiếu / Dịch Thuật 2 Chiều / Thông Báo & Lịch Nhắc (**đây là nav "cục bộ" theo flow luyện nâng cao**, không phải nav toàn cục)
- Topbar: không có search bar, pill rút gọn ("Chuỗi 18 ngày", "96 thẻ đến hạn"), avatar chỉ 2 ký tự "NH"
- Không có sidebar footer progress

**Đề xuất xử lý (cần bạn xác nhận):** Biến thể A là navigation toàn cục thật sự (xuất hiện ở Dashboard, Vocabulary, Practice Hub, hầu hết bài luyện, Statistics, Achievements, Settings — tức là các trang "gốc" của mỗi mục). Biến thể B nhiều khả năng là Stitch tạo nav "theo ngữ cảnh" cho riêng luồng "Luyện tập nâng cao" (Điền từ/Dịch) — một dạng sub-navigation. Tôi đề xuất **dùng AppLayout với Biến thể A cho toàn bộ ứng dụng** (nhất quán, đúng tinh thần "một AppLayout dùng chung"), và tái hiện nội dung/nav-item của Biến thể B như một **thanh tab phụ bên trong nội dung trang** (không thay sidebar/topbar toàn cục) khi vào nhóm "Luyện tập nâng cao". Đây là quyết định ảnh hưởng tới nhiều trang nên tôi **sẽ không tự làm** — trình bày ở đây để bạn duyệt trước khi tôi code Phase 2 (Global Layout).

### 5.4. ⚠️ Xung đột: Icon system

Stitch dùng **Google Material Symbols Outlined** (font icon, ví dụ `grid_view`, `auto_stories`, `model_training`) ở toàn bộ 28/28 screen. Dự án hiện tại dùng **`lucide-react`** (SVG component). Hai bộ icon có hình dạng/độ dày nét khác nhau — nếu giữ lucide, giao diện sẽ lệch khỏi ảnh chụp Stitch dù màu/layout đúng.

**Đề xuất:** thêm Google Material Symbols Outlined qua `<link>` font (giống cách Stitch nhúng), tạo 1 component `<Icon name="grid_view" />` mỏng để dùng nhất quán, thay thế dần các icon lucide hiện có trong Sidebar/Topbar/Button khi viết lại theo Stitch. Đây là thay đổi ảnh hưởng **toàn cục** (mọi page dùng icon) — nêu ở đây để duyệt trước, không tự ý đổi.

### 5.5. Border radius, shadow, spacing

Lấy nguyên theo DESIGN.md mục `rounded`, `spacing`, và phần "Elevation & Depth" / "Shapes" — sẽ ánh xạ trực tiếp vào `@theme` (`--radius-*`, `--shadow-level-1/2/3`, `--spacing-space-*`). Không có xung đột với quy ước hiện tại (dự án hiện tại đặt tên token khác nhưng cùng loại giá trị) — sẽ **thay giá trị**, không thay cấu trúc file `index.css`.

---

## 6. Shared Components — kiểm kê từ Stitch, đối chiếu với component có sẵn

| Component Stitch | Có sẵn trong dự án? | Hành động |
|---|---|---|
| AppLayout (sidebar+topbar) | Có (`AppLayout.tsx`) | Viết lại nội dung Sidebar/Topbar theo Stitch, giữ nguyên vị trí file |
| Sidebar | Có | Viết lại theo biến thể A (mục 5.3) |
| Topbar | Có | Viết lại: thêm pill streak/XP/due, đổi search bar style |
| MobileNav | Có | **Cảnh báo:** không tìm thấy pattern bottom-nav mobile riêng trong bất kỳ screen.png/code.html nào của Stitch (xem mục 14) — cần quyết định giữ MobileNav tự thiết kế hay bỏ |
| PageHeader | Có | Điều chỉnh style cho khớp token mới, breadcrumb dùng nhiều ở Stitch (`Kho Từ Vựng / Chi tiết từ...`) — cần thêm hỗ trợ breadcrumb |
| Button (primary/secondary/ghost) | Có | Cập nhật màu, radius `0.5rem`, theo đúng 3 biến thể DESIGN.md mô tả |
| Card | Có | Cập nhật shadow theo 3 cấp "Level 1/2/3" trong DESIGN.md |
| Badge / Pill (SRS stage, streak) | Có (`Badge.tsx`) — nhưng thiếu biến thể "SRS Stage" (Apprentice/Guru/Master/Enlightened/Burned) | Mở rộng `Badge` thêm tone cho 5 SRS stage màu riêng |
| Input / Select / Textarea | Có | Cập nhật style token, giữ nguyên logic |
| Modal | Có | Cập nhật shadow "Level 3", giữ nguyên logic |
| Toast | Có | Cập nhật style |
| ProgressBar (linear) | Có | Có sẵn — Stitch dùng nhiều progress bar phân đoạn nhiều màu (segmented) — cần thêm biến thể "segmented" |
| CircularProgress | Có | Giữ, cập nhật màu |
| SearchBar | Có | Cập nhật style |
| StatCard | Có | Cập nhật style (Stitch: icon nhỏ góc trên, số lớn, xu hướng %) |
| VocabularyCard / VocabularyTable | Có | Viết lại đáng kể — bảng Stitch phức tạp hơn nhiều (nhiều cột: SRS stage, độ chính xác, ngày ôn tiếp theo, action icon) |
| Flashcard | Có | Viết lại theo bố cục Study Flashcard trong DESIGN.md (padding 36px desktop, radius 24px, chip radical/SRS ở top) |
| ExerciseOption | Có | Giữ cấu trúc, cập nhật màu đúng/sai theo token mới |
| **AudioButton** | Chưa có | **Tạo mới** — nút phát âm dùng lặp lại ở gần như mọi màn (detail, quiz, flashcard, speaking...) |
| **ExerciseCard** | Có phần tương đương (`Card` + nội dung riêng từng page) | Không tạo riêng nếu `Card` đã đủ dùng — sẽ đánh giá lại khi code từng bài luyện |
| **QuestionProgress** | Chưa có (đang là code lặp lại "Câu X/Y" + progress bar) | **Tạo mới** — thanh tiến trình câu hỏi dùng chung cho 6+ bài luyện |
| **AnswerOption** | Trùng với `ExerciseOption` đã có | Không tạo trùng — dùng lại `ExerciseOption`, mở rộng props nếu cần (ví dụ hiển thị pinyin phụ) |
| **AnswerFeedback** | Chưa có (đang lặp lại UI "Chính xác hoàn hảo +10 XP...") | **Tạo mới** — banner phản hồi đúng/sai dùng chung |
| **ReviewCard** | Trùng phần lớn với `Flashcard` đã có | Mở rộng `Flashcard` thay vì tạo mới, vì cùng vai trò |
| **XPBadge / StreakBadge** | Chưa có (hiện là pill lặp lại trong Topbar) | **Tạo mới** — 2 component pill nhỏ, dùng ở Topbar + nhiều trang gamification |
| **AchievementCard** | Chưa có | **Tạo mới** — riêng cho trang Achievements |
| **RadicalBreakdownCard, MnemonicCard, StrokeOrderGrid, VoiceWaveform, SyntaxTreeDiagram** | Chưa có | Các component **rất chuyên biệt** chỉ dùng ở 1–2 trang (Detail/Edit, Writing, Speaking, Sentence Ordering) — sẽ tạo cục bộ trong thư mục feature tương ứng, không đưa vào `ui/` dùng chung, vì không tái sử dụng chéo |

**Quy tắc áp dụng theo yêu cầu #10 của bạn:** những component đã hoạt động đúng logic (state, handler) như `Modal`, `Toast`, `ExerciseOption`, `Flashcard` — tôi sẽ **chỉ đổi style/props mở rộng**, không viết lại logic, không đổi tên file, không đổi cách import ở nơi khác dùng chúng.

---

## 7. Cấu trúc thư mục đề xuất (điều chỉnh từ gợi ý của bạn cho khớp quy ước hiện tại)

Dự án hiện tại **không** tách `pages/auth`, `pages/dashboard`... theo sub-folder — toàn bộ page nằm phẳng trong `src/pages/*.tsx`. Giữ nguyên quy ước phẳng này (đổi sang nested folder là một refactor không cần thiết, trái với yêu cầu #10 "không refactor không liên quan"). Điều chỉnh:

```
frontend/src/
├── components/
│   ├── ui/                 (đã có — mở rộng thêm)
│   ├── layout/              (MỚI — di dời Sidebar/Topbar/MobileNav/PageHeader vào đây)
│   ├── vocabulary/          (MỚI — VocabularyCard, VocabularyTable, RadicalBreakdownCard, MnemonicCard...)
│   ├── practice/            (MỚI — QuestionProgress, AnswerFeedback, StrokeOrderGrid, VoiceWaveform, SyntaxTreeDiagram...)
│   ├── review/              (MỚI — mở rộng Flashcard tại đây)
│   ├── dashboard/           (MỚI — WeeklyChart, SkillRadar, DailyChallengeList...)
│   ├── statistics/          (MỚI — biểu đồ riêng cho trang Statistics)
│   └── gamification/        (MỚI — XPBadge, StreakBadge, AchievementCard)
├── pages/                   (giữ phẳng, chỉ thêm file mới — KHÔNG tạo sub-folder auth/dashboard/...)
├── data/                    (giữ — nơi chứa mock data, đặt tên rõ theo domain: mockAchievements.ts, mockNotifications.ts...)
├── services/                (giữ — nơi sẽ nối API thật sau này)
├── types/                   (giữ — mở rộng thêm types cho SRS stage, achievement, notification...)
├── routes/                  (giữ)
└── layouts/                 (giữ — AppLayout, AuthLayout; FocusLayout có thể không cần nữa vì mọi practice/review page của Stitch đều dùng AppLayout, xem mục 3)
```

Lý do di dời Sidebar/Topbar/PageHeader/MobileNav vào `components/layout/`: hiện chúng nằm lẫn trực tiếp trong `components/`, việc tách thư mục con là gọn cấu trúc hợp lý khi số lượng component tăng mạnh (từ ~20 lên ước tính 45–55 component sau khi làm hết 28 màn), không phải đổi kiến trúc.

---

## 8. Yêu cầu dữ liệu & Mock Data

Hầu hết màn hình Stitch hiển thị dữ liệu **vượt xa** những gì Prisma schema hiện có lưu trữ. Toàn bộ phần sau sẽ là **typed mock data**, đánh dấu rõ bằng comment `// MOCK DATA — sẽ thay bằng API khi backend hỗ trợ`:

| Nhóm dữ liệu | Field cần | Trạng thái |
|---|---|---|
| User profile mở rộng | level, danh xưng ("Học Giả"), avatar, XP, streak ngày | Không có trong `User` hiện tại → mock |
| SRS chi tiết | SRS stage (Apprentice/Guru/Master/Enlightened/Burned), ease factor, FSRS params, độ bền trí nhớ (%), dự báo đường cong quên lãng | Chỉ có `mastery`, `interval`, `nextReview` cơ bản → mock phần nâng cao |
| Chiết tự Hán tự | bộ thủ, số nét, ý nghĩa từng bộ phận, hình ảnh Mi Zi Ge | Không có → mock, gắn theo `vocabularyId` |
| Mnemonic | câu chuyện liên tưởng, do AI gợi ý hoặc user tự viết | Không có field → mock |
| Audio | URL phát âm chuẩn, bản ghi âm user | Không có → mock (dùng Web Speech API hoặc audio giả lập cho UI, không tích hợp TTS thật) |
| Exercise/Quiz | câu hỏi, đáp án, loại bài, kết quả từng lần làm | Không có bảng `exercises`/`exercise_results` → toàn bộ mock |
| Achievements | danh sách huy hiệu, điều kiện mở khoá, tiến độ | Không có → mock |
| Notifications | danh sách thông báo, lịch nhắc | Không có → mock |
| Statistics/Radar | % theo 6 kỹ năng, top lỗi hay nhầm | Suy ra được một phần từ `correctCount`/`wrongCount` nhưng không đủ chi tiết theo "kỹ năng" → mock |
| Leaderboard đồng môn | danh sách user khác, XP, rank | Không có khái niệm multi-user leaderboard → mock hoàn toàn |

**Nguyên tắc:** mọi mock data đặt trong `src/data/mock*.ts`, có `interface`/`type` riêng trong `src/types/`, và mọi page đọc dữ liệu qua 1 lớp hàm giả lập kiểu `getDashboardData()` (trả Promise hoặc trực tiếp) để sau này thay bằng `services/xxxApi.ts` gọi API thật **mà không cần sửa page**.

## 9. Điểm tích hợp API tương lai (chỉ ghi nhận, không tạo bây giờ)

Theo yêu cầu #11/#12/#13, không tạo API mới. Ghi nhận để tương lai:
- `POST /api/ai/vocabulary` — cho nút "AI Trích Xuất & Phân Tích" ở trang Add Vocabulary
- `POST /api/ai/check-sentence` — cho Sentence Creation, Translation
- `POST /api/ai/pronunciation-score` — cho Speaking
- Mở rộng `UserVocabulary` với field SRS chi tiết (ease factor, FSRS state) khi triển khai thuật toán SRS thật
- Bảng mới (không tạo bây giờ): `achievements`, `user_achievements`, `notifications`, `exercise_sessions`

Ở giai đoạn này, các nút gọi AI (ví dụ "AI Trích Xuất & Phân Tích", "AI Grammar Evaluator") sẽ là **UI placeholder**: bấm vào hiện trạng thái loading giả lập ngắn rồi hiển thị **kết quả mock có sẵn**, không gọi service thật, không tự bịa response "thông minh" ngoài dữ liệu mock cố định.

## 10. Chiến lược Responsive

DESIGN.md quy định rõ breakpoint (desktop 1280px/12 cột, tablet 768px/8 cột, mobile 375px/4 cột) và "Focused SRS Deck Layout" giới hạn `max-width: 680px` cho màn hình luyện tập. Sẽ áp dụng đúng các mốc này qua Tailwind breakpoints chuẩn (`sm/md/lg/xl`) ánh xạ gần nhất với 375/768/1280.

**Khoảng trống cần lưu ý (mục 14 gốc "Preserve responsive behavior... use existing Stitch mobile references"):** toàn bộ 28 `screen.png` đều là **ảnh chụp ở độ phân giải desktop/tablet rộng**, không có bộ ảnh chụp riêng cho mobile. Code.html có một số class responsive (`sm:`, `xl:hidden`...) cho gợi ý, nhưng không đủ để suy ra chính xác bố cục mobile Stitch "dự định". Tôi sẽ:
1. Dùng các class responsive đã có sẵn trong `code.html` làm cơ sở chính (không tự sáng tác).
2. Với phần thiếu (ví dụ: sidebar 288px cố định không thể hiển thị nguyên trên màn 375px), áp dụng giải pháp thu gọn tối thiểu và hợp lý nhất theo tinh thần M3 (drawer ẩn/hiện), và **báo cáo rõ đây là phần tôi phải tự suy ra**, không phải sao chép từ Stitch.

## 11. Các Phase triển khai (theo đúng thứ tự bạn yêu cầu)

| Phase | Nội dung | Điều kiện dừng trước khi qua phase kế |
|---|---|---|
| 1 | Design system: màu M3 đầy đủ, font Noto Serif + Plus Jakarta Sans, Material Symbols, cập nhật `ui/` components | typecheck pass, build pass, so ảnh Button/Card/Badge với Stitch |
| 2 | Global Layout: Sidebar biến thể A, Topbar, PageHeader (+breadcrumb), quyết định MobileNav | so ảnh Dashboard shell (sidebar+topbar) với screenshot |
| 3 | Auth: Landing, Login, Register | so ảnh với 3 screenshot tương ứng |
| 4 | Core: Dashboard, Vocabulary List, Add Vocabulary (AI UI), Vocabulary Detail, Edit Vocabulary | so ảnh 5 screenshot |
| 5 | Practice: Hub, Quiz, Reverse Quiz, Pinyin, Result | so ảnh 5 screenshot |
| 6 | Review: Daily Review + Empty State, Notifications | so ảnh 3 screenshot |
| 7 | Advanced: Sentence Ordering, Fill Blank, Translation Hub, Sentence Creation, Writing, Listening (2 mode), Speaking | so ảnh 8 screenshot, xử lý quyết định mục 5.3 cho nhóm này |
| 8 | Progress: Statistics, Achievements, Settings | so ảnh 3 screenshot |

Sau mỗi phase sẽ báo cáo theo đúng format bạn quy định (Completed / Files Created / typecheck / so sánh hình / vấn đề phát hiện), và **dừng chờ xác nhận trước khi qua phase kế** như bạn yêu cầu.

## 12. Xung đột & Quyết định cần bạn duyệt trước khi code (tổng hợp)

1. **Hai biến thể Sidebar/Topbar khác nhau trong Stitch** (mục 5.3) — đề xuất dùng biến thể A toàn cục, biến thể B thành tab phụ trong nội dung.
2. **Icon system:** lucide-react (hiện tại) → Material Symbols Outlined (Stitch) — cần đổi để khớp hình, ảnh hưởng mọi page.
3. **Màn `kho_tu_vung` chụp đè modal "Add Vocab" lên trên** — cần tôi tách 2 phần (bảng nền vs modal) khi code, có thể lệch nhẹ so với ý đồ gốc nếu bảng nền bị modal che khuất một phần dữ liệu trong ảnh.
4. **16/17 và 17 trùng lặp một phần** — đề xuất gộp thành 1 route 2 tab thay vì 2 route.
5. **`luy_n_c_u_ch_m_ph_t_m_ai` trùng lặp với 15b+17b+20** — đề xuất bỏ qua, không tạo route riêng.
6. **Không có bộ ảnh mobile riêng** — phần bố cục mobile cho các trang có sidebar cố định 288px sẽ do tôi tự suy luận hợp lý, sẽ nêu rõ khi trình bày từng phase thay vì âm thầm tự quyết.
7. **`FocusLayout` hiện tại có thể thừa** — vì mọi màn luyện tập/ôn tập của Stitch đều giữ sidebar đầy đủ (không có chế độ "immersive không sidebar" như bản tôi tự thiết kế trước đó). Đề xuất: **không xoá** `FocusLayout.tsx` ngay (tránh phá vỡ import hiện có), nhưng sẽ không dùng nó cho các route mới; sẽ hỏi lại nếu bạn muốn dọn dẹp sau khi hoàn thành toàn bộ 8 phase.

## 13. Component/khu vực phải giữ nguyên, không sửa khi làm phase khác

Theo yêu cầu #10, khi làm 1 phase, các phần sau **không được đụng tới** trừ khi phase đó chính là phase liên quan:
- Toàn bộ `backend/` (mọi phase)
- `prisma/schema.prisma` (mọi phase)
- Logic điều hướng trong `routes/router.tsx` ngoài việc **thêm** route mới (không xoá/đổi route đã duyệt ở phase trước)
- Component đã hoàn thiện ở phase trước (ví dụ: sau Phase 1 xong `Button`/`Card`, Phase 4 chỉ được *dùng*, không được sửa style `Button` nữa trừ khi phát hiện thiếu biến thể — lúc đó sẽ báo cáo trước khi sửa, đúng tinh thần "giải thích trước khi sửa risky")

## 14. Việc cần bạn xác nhận trước khi tôi bắt đầu code Phase 1

- [ ] Đồng ý cách xử lý xung đột Sidebar/Topbar (mục 12.1)
- [ ] Đồng ý đổi icon system sang Material Symbols Outlined (mục 12.2)
- [ ] Đồng ý gộp 16/17 + 17 thành 1 route (mục 12.4)
- [ ] Đồng ý bỏ qua screen trùng lặp `luy_n_c_u_ch_m_ph_t_m_ai` (mục 12.5)
- [ ] Xác nhận route architecture ở mục 4
- [ ] Xác nhận cấu trúc thư mục ở mục 7

**Tôi dừng ở đây, chưa viết bất kỳ code ứng dụng nào, chờ bạn duyệt kế hoạch này.**
