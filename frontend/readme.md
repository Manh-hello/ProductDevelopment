# HanziSRS (React + TypeScript + Tailwind)

Triển khai từ `stitch-ui.zip` (29 màn hình Stitch). UI giữ nguyên thiết kế gốc.

    npm install
    npm run dev      # http://localhost:5173
    npm run build    # tsc + vite build

## Cấu trúc
- `src/pages/*` – 29 trang, markup chuyển nguyên văn từ Stitch (class giữ nguyên).
- `src/layouts/` – `AppShell` + Sidebar/Header. Stitch sinh 4 họ shell khác nhau (A, B1/B2, C1/C2, D); giữ cả 4 để khớp thiết kế.
- `src/lib/` – `speak` (Web Speech), `usePracticeFlow` (chuỗi bài luyện), `useStoredState`.
- `tailwind.config.js` – lấy nguyên từ cấu hình Stitch.

## Routes
/ · /auth · /dashboard · /vocabulary · /vocabulary/new · /vocabulary/:id · /vocabulary/:id/edit ·
/practice (+ /multi /quiz /reverse-quiz /pinyin /sentence-order /fill-blank /translation /translation-hub
/sentence-creation /writing /dictation /listening /speaking /result) · /sentences · /review · /review/complete ·
/statistics · /achievements · /notifications · /settings
