# UI Implementation Plan

Status: analysis complete, no application code modified yet. Waiting for approval before implementation begins.

## 1. Existing project architecture

### Repository structure

The project is a monorepo with separate frontend and backend boundaries:

- `frontend/` — React + TypeScript + Vite SPA
- `backend/` — Express + TypeScript + Prisma + PostgreSQL
- `stitch-ui/` — source-of-truth visual designs generated from Google Stitch
- `docs/` — architecture, setup, and database documentation
- `database/` — database-related supporting artifacts

### Frontend baseline

Current frontend foundation already exists in `frontend/`:

- Vite + React 19 + TypeScript
- Tailwind CSS via `@tailwindcss/postcss`
- `react-router-dom` for route configuration
- `axios` for API calls
- `lucide-react` for icons
- global design tokens in `src/index.css`

Key frontend architecture already in place:

- `src/App.tsx` wraps the app with `RouterProvider`
- `src/routes/router.tsx` contains route groups for auth, app-shell, and focused practice flows
- `src/layouts/AppLayout.tsx`, `AuthLayout.tsx`, and `FocusLayout.tsx` define layout shells
- `src/pages/` contains the existing core pages: `DashboardPage`, `LoginPage`, `RegisterPage`, `VocabularyListPage`, `VocabularyAddPage`, `VocabularyEditPage`, `VocabularyDetailPage`, `ReviewPage`, `ExercisePage`, `StatisticsPage`, `SettingsPage`
- `src/components/` has reusable UI pieces such as `Sidebar`, `Topbar`, `MobileNav`, `PageHeader`, `SearchBar`, `StatCard`, `VocabularyTable`, `VocabularyCard`, `Flashcard`, and shared UI primitives under `src/components/ui/`

### Backend baseline

The backend is intentionally minimal at this phase and should not be rewritten:

- Express server with `cors` and JSON middleware
- route mounting under `/api`
- health route exists: `GET /api/health`
- Prisma schema handles `User`, `Vocabulary`, and `UserVocabulary`
- DB design is intentionally conservative; no broad schema changes should be made unless absolutely required during the later UI integration phase

### Design system currently present

The app already includes a coherent design token system in `src/index.css`:

- warm ivory canvas
- primary red / cinnabar accent
- navy text palette
- serif + sans type pairing
- rounded card system and soft shadows
- focus-visible state styles

This aligns with the Imperial Scholar Minimalist direction described in the Stitch design package.

## 2. Frontend architecture

### Existing route and layout model

The current app uses a three-layout route shell:

- `/login`, `/register` under `AuthLayout`
- dashboard and learning pages under `AppLayout`
- review/exercise flows under `FocusLayout`

This structure is suitable for the Stitch integration and should be extended rather than replaced.

### Existing page responsibilities

Current pages already cover part of the final app:

- Dashboard overview screen
- Vocabulary list and CRUD flows
- Review flow
- Exercise flow
- Statistics and settings pages

This means the integration strategy should reuse these pages and expand them to match the Wood/Scholar visual system, instead of introducing a completely separate app shell.

### Existing shared UI library

The app already contains important reusable building blocks:

- `Button`
- `Card`
- `Input`
- `Select`
- `Textarea`
- `Modal`
- `EmptyState`
- `ProgressBar`
- `Badge`
- `Toast`
- `SearchBar`
- `PageHeader`
- `Sidebar`, `Topbar`, `MobileNav`

These should be considered the shared component layer and not re-created randomly.

## 3. Stitch screen inventory

The Stitch design set is the source of truth for all visual UI work. The folders under `stitch-ui/` include the following screen groups:

### Auth / landing

1. `01_trang_gi_i_thi_u_ch_o_m_ng_landing_page` — landing page / welcome intro
2. `02_03_ng_nh_p_ng_k_hanzisrs` — login/register/auth flow
3. `dashboard_t_ng_quan_ti_ng_trung` — dashboard overview reference
4. `kho_t_v_ng_th_m_t_th_ng_minh` — vocabulary bank / smart vocabulary collection
5. `luy_n_c_u_ch_m_ph_t_m_ai` — sentence practice and AI-assisted practice reference
6. `luy_n_t_p_a_chi_u_srs_quiz` — SRS practice / quiz page

### Core learning

7. `06_th_m_t_v_ng_th_ng_minh_qu_t_ai_add_vocab` — add vocabulary with AI-assisted input
8. `07_chi_ti_t_t_v_ng_l_ch_s_tr_nh` — vocabulary detail and history
9. `08_ch_nh_s_a_t_v_ng_m_o_nh_edit_vocabulary` — edit vocabulary screen
10. `09_trung_t_m_luy_n_t_p_a_chi_u_practice_hub` — study/practice hub
11. `11_tr_c_nghi_m_ng_c_b_y_t_h_nh_reverse_quiz` — reverse quiz
12. `12_luy_n_pinyin_thanh_i_u_pinyin_practice` — pinyin practice
13. `13_k_t_qu_luy_n_t_p_srs_impact` — SRS result / impact screen
14. `14_n_t_p_h_ng_ng_y_srs_flashcard` — daily review flashcard
15. `15_s_p_x_p_c_u_ng_ph_p_h_n_ng_sentence_ordering` — sentence ordering exercise
16. `15_tr_ng_th_i_ho_n_th_nh_n_t_p_srs_empty_state` — empty state / completion state
17. `16_luy_n_i_n_t_h_t_h_n_ng_fill_in_the_blank` — fill-in-the-blank exercise
18. `16_17_luy_n_i_n_t_d_ch_c_u_2_chi_u_translation` — translation / bilingual practice
19. `17_luy_n_d_ch_c_u_2_chi_u_chuy_n_s_u_translation_hub` — translation hub
20. `17_luy_n_t_c_u_ng_c_nh_ch_m_ng_ph_p_ai_sentence_creation` — sentence creation with AI checking
21. `18_luy_n_vi_t_n_t_b_t_thu_n_stroke_order` — stroke order / writing exercise
22. `19_luy_n_nghe_ph_n_x_ch_p_ch_nh_t_listening` — listening exercise variant
23. `19_luy_n_nghe_ph_n_x_m_thanh_listening` — listening alternate screen
24. `20_luy_n_n_i_ch_m_ph_t_m_ai_speaking_phonetics` — speaking + phonetics
25. `21_th_ng_k_ph_n_t_ch_ti_n_statistics` — statistics dashboard
26. `22_b_ng_th_nh_t_ch_hu_n_ch_ng_achievements` — achievements / badges
27. `23_trung_t_m_th_ng_b_o_l_ch_tr_nh_nh_c_n_srs` — notification / schedule center
28. `24_c_i_t_h_th_ng_t_y_bi_n_h_c_t_p_settings` — settings screen

### Design system source file

`stitch-ui/imperial_scholar_minimalist/DESIGN.md` defines the locked system rules:

- visual system: Imperial Scholar Minimalist
- type pair: `Noto Serif` for display characters and `Plus Jakarta Sans` for interface text
- color palette derived from cinnabar, jade, parchment, warm amber
- spacing system, rounded corners, card depth, and badge conventions
- component guidance for buttons, flashcards, inputs, and mastery bars

This file is the design-system source of truth and should be treated as authoritative when implementing screens.

## 4. Route mapping

The route set should preserve the current app structure while extending to all Stitch UI flows. Proposed route organization:

- `/` — landing page
- `/login` — login screen
- `/register` — register screen
- `/dashboard` — overview dashboard
- `/vocabulary` — vocabulary bank list
- `/vocabulary/new` — add new vocabulary
- `/vocabulary/:id` — vocabulary detail
- `/vocabulary/:id/edit` — vocabulary edit screen
- `/practice` — practice hub
- `/practice/quiz` — SRS quiz / assessment flow
- `/practice/reverse` — reverse quiz
- `/practice/pinyin` — pinyin practice
- `/practice/result` — result / impact screen
- `/review` — daily review / flashcard review
- `/review/empty` — empty state screen
- `/practice/sentence-ordering` — sentence ordering
- `/practice/fill-blank` — fill-in-the-blank
- `/practice/translation` — translation practice
- `/practice/translation/hub` — translation hub
- `/practice/sentence` — sentence creation + AI checking
- `/practice/writing` — stroke order / writing
- `/practice/listening` — listening practice
- `/practice/speaking` — speaking + phonetics
- `/statistics` — statistics overview
- `/achievements` — achievements
- `/notifications` — SRS notification / learning schedule center
- `/settings` — settings

### Route consistency with current app

The current router already includes `/login`, `/register`, `/dashboard`, `/vocabulary`, `/vocabulary/new`, `/vocabulary/:id`, `/vocabulary/:id/edit`, `/review`, `/statistics`, and `/settings`, which is a strong base. The main work is extending it with practice-focused routes and the remaining Stitch screens without breaking the current app architecture.

## 5. Shared components to reuse and preserve

These existing shared components should be reused where visually compatible:

- `AppLayout`
- `AuthLayout`
- `FocusLayout`
- `Sidebar`
- `Topbar`
- `MobileNav`
- `PageHeader`
- `Button`
- `Card`
- `Badge`
- `Input`
- `Select`
- `Textarea`
- `Modal`
- `Toast`
- `ProgressBar`
- `StatCard`
- `VocabularyCard`
- `VocabularyTable`
- `Flashcard`
- `ExerciseOption`
- `SearchBar`

### Important reuse rule

If a shared component already works correctly, do not rewrite it only to match a new screen. Only change a shared component when the change is genuinely global and safe across all screens.

## 6. New components to add as part of the design integration

The design package suggests many reusable units that are likely needed for the Stitch screens. Proposed new shared or page-scoped structure:

### Layout / shell components

- `AppShell` (if a deeper shell abstraction is needed)
- `SecondarySidebar` or `PracticeSidebar` for learning flows
- `SectionHeader`
- `PageHero`
- `MobileTabBar`

### Vocabulary-specific components

- `WordCard`
- `WordMetaChip`
- `MeaningBlock`
- `ExampleBlock`
- `WordHistoryTimeline`
- `AIInputPanel`

### Practice-specific components

- `PracticeCard`
- `QuestionHeader`
- `AnswerOption`
- `AnswerFeedback`
- `ProgressStepper`
- `AudioButton`
- `PinyinKeypad`
- `ReadingPromptCard`
- `SentenceOrderingTile`
- `TranslationPanel`
- `WritingGrid`
- `SpeakingRecorderButton`

### Progress / gamification components

- `XPBadge`
- `StreakBadge`
- `SRSBadge`
- `AchievementCard`
- `MasteryRing` / `MasteryMeter`
- `ReviewQueueItem`

These should be implemented as reusable UI modules rather than copy-pasted content across pages.

## 7. Page structure to implement in phases

The page organization should follow the current architecture and expand existing conventions.

### `src/pages/auth/`

- `LandingPage.tsx`
- `LoginPage.tsx`
- `RegisterPage.tsx`

### `src/pages/dashboard/`

- `DashboardPage.tsx`
- `OverviewPage.tsx` (if needed for future split)

### `src/pages/vocabulary/`

- `VocabularyListPage.tsx`
- `VocabularyAddPage.tsx`
- `VocabularyDetailPage.tsx`
- `VocabularyEditPage.tsx`

### `src/pages/practice/`

- `PracticeHubPage.tsx`
- `SrsQuizPage.tsx`
- `ReverseQuizPage.tsx`
- `PinyinPracticePage.tsx`
- `PracticeResultPage.tsx`
- `SentenceOrderingPage.tsx`
- `FillBlankPage.tsx`
- `TranslationPage.tsx`
- `TranslationHubPage.tsx`
- `SentenceCreationPage.tsx`
- `WritingPracticePage.tsx`
- `ListeningPage.tsx`
- `SpeakingPage.tsx`

### `src/pages/review/`

- `ReviewPage.tsx`
- `ReviewEmptyStatePage.tsx`
- `NotificationCenterPage.tsx`

### `src/pages/statistics/`

- `StatisticsPage.tsx`
- `AchievementsPage.tsx`
- `SettingsPage.tsx`

This is an adaptation of the project’s existing structure and should be used only when a page clearly needs to be split for readability or scale.

## 8. Data requirements

The UI should be built around typed data contracts rather than direct inline markup payloads. Recommended data domains:

- `UserProfile`
- `VocabularyItem`
- `StudyDeck`
- `ReviewCard`
- `PracticeQuestion`
- `PracticeResult`
- `Achievement`
- `Notification`
- `DailySummary`
- `StatisticsSnapshot`

### Core front-end data needs

- vocabulary detail view: hanzi, pinyin, meaning, examples, history, tags, mastery
- dashboard: today’s progress, due review queue, recent words, streak, session stats
- practice flow: question list, current index, selected answer, correct answer, explanation, progress
- statistics: weekly activity, mastery split, study streak, comprehension rate
- settings: profile options and learning preferences

## 9. Mock data requirements

Because backend APIs are not yet implemented for most features, the UI should use typed mock data and clearly separate mock-only data from real API-driven data.

Recommended strategy:

- keep mock data in `src/data/`
- define TypeScript interfaces in `src/types/`
- label mock data with comments such as `// mock data for UI development only`
- keep API integration boundaries centralized under `src/services/`

### Suggested mock datasets

- `mockVocabulary.ts` — vocabulary bank and queue items
- `mockPractice.ts` — practice sessions, questions, and results
- `mockStatistics.ts` — weekly activity/charts plus mastery data
- `mockAchievements.ts` — badge list and progress states
- `mockNotifications.ts` — review schedule / reminders
- `mockProfile.ts` — user settings and avatar metadata

The current project already contains `mockVocabulary.ts` and `mockActivity.ts`, which should be extended rather than replaced.

## 10. API integration points

The project’s current API layer is minimal and intentionally lightweight. The UI integration should avoid inventing new business logic or backend shape beyond the design phase.

### Existing integration point

- `frontend/src/services/api.ts` is the shared Axios instance

### Planned future integration points

- authentication endpoints for login/register
- vocabulary CRUD endpoints
- review queue endpoint
- exercise question endpoints
- statistics aggregate endpoint
- achievements / progress endpoint
- settings endpoint

### Rule for this phase

Do not implement fake AI or fake learning logic. Use UI placeholders and clear interfaces for future integration, while keeping API contracts explicit and typed.

## 11. Responsive strategy

The final UI must work across desktop, tablet, and mobile without losing the design fidelity of the Stitch layouts.

### Breakpoint behavior

- Desktop: wide content shell, side navigation retained, larger cards and wider content density
- Tablet: compressed dashboard layouts, shorter content widths, preserved card hierarchy
- Mobile: collapsible navigation, stacked cards, simplified top bar, sticky bottom navigation if needed

### Visual preservation rules

- preserve the original spacing rhythm from the Stitch layout
- keep the same typography and hierarchy as the design
- retain fixed card proportions when the design calls for that
- respect the mobile references in the Stitch screens where they exist
- do not replace the design with a simplified or generic responsive variant

## 12. Implementation phases

The development work should proceed in phases, as specified in the brief.

### Phase 1 — Design system foundation

- confirm color tokens and sizing constants against the Stitch design
- lock typography pairings (`Noto Serif` + `Plus Jakarta Sans`)
- validate Tailwind token mapping against the Imperial Scholar Minimalist rules
- establish shared UI primitives for buttons, cards, inputs, badges, and progress elements

### Phase 2 — Global layout

- extend `AppLayout`, `AuthLayout`, and `FocusLayout`
- finalize `Sidebar`, `Topbar`, and `MobileNav`
- create page header and section shell patterns
- establish spacing and background behavior across screens

### Phase 3 — Authentication and landing screens

- landing page
- login screen
- register screen

### Phase 4 — Core learning pages

- dashboard
- vocabulary list
- add vocabulary
- vocabulary detail
- vocabulary edit

### Phase 5 — Practice screens

- practice hub
- SRS quiz
- reverse quiz
- pinyin practice
- practice result

### Phase 6 — Review and notifications

- daily review
- empty state
- AI/notification SRS schedule center

### Phase 7 — Advanced exercise flows

- sentence ordering
- fill-in-the-blank
- translation
- sentence creation
- writing
- listening
- speaking

### Phase 8 — Progress and settings

- statistics
- achievements
- settings

### After each phase

- run TypeScript type check
- run lint if available
- run the frontend locally
- verify no runtime errors
- compare implementation against the Stitch screenshot and fix visual differences before continuing

## 13. Potential conflicts and cautions

### 1. Existing UI vs Stitch design

The project already contains a usable design language, but the Stitch package is the visual source of truth. The integration must match the Stitch design and not drift toward a newer or simpler visual style.

### 2. Existing components may be close but not identical

The current `Button`, `Card`, `Sidebar`, `Topbar`, and page shell patterns are already in use. That is good; however, some of them may need slight styling refinements to match the Stitch system without altering their broader behavior.

### 3. Backend is not a target of this task

The task is primarily UI integration. The backend should remain intact unless no practical alternative exists. Do not rewrite Prisma schema or build new business logic just to make a screen appear functional.

### 4. AI and study logic are intentionally placeholders

Stitch screens with AI interfaces, SRS logic, and review logic should be implemented as UI-only placeholders with typed interfaces and clean seams for future integration.

### 5. Route naming must stay coherent

The app already has `review`, `exercises`, and `vocabulary` flows. New screen-specific routes should be clean and consistent with the app’s existing routing conventions, while still mapping to the Stitch screen set.

## 14. Components that must remain unchanged

The following should not be broadly altered unless a truly global issue is discovered during design matching:

- `src/routes/router.tsx`
- `src/layouts/AppLayout.tsx`
- `src/layouts/AuthLayout.tsx`
- `src/layouts/FocusLayout.tsx`
- `src/App.tsx`
- `src/index.css` design tokens unless a direct token mismatch is proven against the Stitch design system
- backend Prisma schema and server architecture
- the existing project-level monorepo layout

Any change to a shared component must be justified as a global design requirement and should be reviewed across all affected screens before implementation.

## 15. Implementation principles for the actual build

During actual UI implementation, the following rules will apply:

1. Preserve the Stitch visual source of truth.
2. Reuse existing project components before creating new ones.
3. Convert Stitch HTML into React/TypeScript structure rather than copying raw HTML into the app.
4. Use typed mock data for UI-only flows.
5. Keep business logic and API integration separated from visual presentation.
6. Validate each phase with type checking and local runtime inspection before moving on.
7. Stop and report if a design discrepancy appears to require a design decision rather than a simple UI translation.

## 16. Recommended next step

The next step is implementation approval. Once approved, the actual UI work will begin in the phased order above, starting with the design-system and global layout foundation, while preserving the established project architecture and the Stitch design rules.
