---
name: Imperial Scholar Minimalist
colors:
  surface: '#faf9f7'
  surface-dim: '#dadad8'
  surface-bright: '#faf9f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f1'
  surface-container: '#efeeec'
  surface-container-high: '#e9e8e6'
  surface-container-highest: '#e3e2e0'
  on-surface: '#1a1c1b'
  on-surface-variant: '#5b4041'
  inverse-surface: '#2f3130'
  inverse-on-surface: '#f1f1ef'
  outline: '#8f6f70'
  outline-variant: '#e3bdbf'
  surface-tint: '#bb0f3a'
  primary: '#95002a'
  on-primary: '#ffffff'
  primary-container: '#be123c'
  on-primary-container: '#ffd0d2'
  inverse-primary: '#ffb2b7'
  secondary: '#006c4a'
  on-secondary: '#ffffff'
  secondary-container: '#82f5c1'
  on-secondary-container: '#00714e'
  tertiary: '#703a00'
  on-tertiary: '#ffffff'
  tertiary-container: '#934e00'
  on-tertiary-container: '#ffd2b1'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdadb'
  primary-fixed-dim: '#ffb2b7'
  on-primary-fixed: '#40000d'
  on-primary-fixed-variant: '#920029'
  secondary-fixed: '#85f8c4'
  secondary-fixed-dim: '#68dba9'
  on-secondary-fixed: '#002114'
  on-secondary-fixed-variant: '#005137'
  tertiary-fixed: '#ffdcc3'
  tertiary-fixed-dim: '#ffb77d'
  on-tertiary-fixed: '#2f1500'
  on-tertiary-fixed-variant: '#6e3900'
  background: '#faf9f7'
  on-background: '#1a1c1b'
  surface-variant: '#e3e2e0'
typography:
  display-character:
    fontFamily: Noto Serif
    fontSize: 96px
    fontWeight: '600'
    lineHeight: 112px
    letterSpacing: 0px
  display-character-mobile:
    fontFamily: Noto Serif
    fontSize: 64px
    fontWeight: '600'
    lineHeight: 76px
    letterSpacing: 0px
  headline-xl:
    fontFamily: Noto Serif
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Noto Serif
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  title-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: '0'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: '0'
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.06em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  margin: 2rem
  margin-sm: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system blends contemporary digital minimalism with classical East Asian aesthetic principles. It addresses serious learners, polyglots, university scholars, and professionals mastering Chinese characters (Hanzi) through spaced repetition (SRS). 

The emotional tone balances calm intellectual focus with crisp, celebratory gamification milestones. The interface eliminates cognitive noise, honoring the structural beauty of Chinese logograms while maintaining the velocity and tactile feedback expected of best-in-class educational platforms.

The style fuses:
- **Neo-Scholastic Minimalism:** Spacious parchment-inspired canvases, precise hairline separators, balanced typographic hierarchy, and generous negative space reminiscent of traditional calligraphy paper (*Xuan paper*).
- **Modern Tactile Gamification:** Crisp, elevated cards, dimensional micro-pills for SRS review stages (Apprentice, Guru, Master, Enlightened, Burned), vibrant reward meters, and tactile controls engineered for rapid mnemonic recall.

## Colors

The color system draws from classic imperial lacquerware, jade amulets, aged paper, and cinnabar seals:

- **Primary (`#BE123C` - Imperial Cinnabar):** Used for focal brand actions, core interactive controls, primary flashcard flips, active navigation highlights, and seal badges.
- **Secondary (`#059669` - Scholar Jade):** Denotes vocabulary mastery, correct SRS answers, completed review decks, and verified stroke order sequences.
- **Tertiary (`#D97706` - Warm Amber / Hearth Fire):** Represents active streaks, urgent review queues, warning states, and XP multipliers.
- **Neutral Surface Palette:**
  - Canvas / Foundation: `#F9F8F6` (Soft Warm Ivory)
  - Surface Pure: `#FFFFFF` (Crisp Porcelain White)
  - Surface Subdued: `#F1EFEA` (Pressed Rice Paper)
- **Text & Stroke Palette:**
  - Charcoal Primary: `#0F172A` (Ink Slate)
  - Charcoal Muted: `#475569` (Charcoal Wash)
  - Structural Border: `#E7E5E0` (Fine Calligraphic Border)

## Typography

The type system adopts a dual-engine hierarchy:
1. **Chinese Logograms and Hero Display:** Rendered via **Noto Serif** (aligned with Noto Serif SC/TC fallbacks). This delivers calligraphic stroke contrast, cultural authority, and optical poise for character review prompts, radical breakdowns, and classical proverbs.
2. **UI Navigation, Metadata, and English Descriptions:** Driven by **Plus Jakarta Sans**, providing high-legibility geometric clarity, open counters, and high distinction at small sizes across mobile and desktop.

Always display standalone characters with adequate vertical headroom (`display-character`) inside square bounding tiles (`aspect-ratio: 1/1`) to prevent ascender/descender clipping on complex multi-stroke radicals (e.g., 鬱, 龘).

## Layout & Spacing

The layout is built upon an 8pt modular grid. Flashcard drill screens and dashboard views differ purposefully in density:

- **Global Framework:** Fluid responsive grid with desktop breakpoints at 1280px (12 columns, 24px gutter, 32px canvas margin), tablets at 768px (8 columns, 16px gutter, 24px canvas margin), and mobile at 375px+ (4 columns, 16px gutter, 16px canvas margin).
- **Focused SRS Deck Layout:** Constrained to a strict centered single column (`max-width: 680px`) with vertical layout breathing room to eliminate eye drift during high-speed character quizzing.
- **Rhythm Rules:** Vertical spacing between related components (e.g., Character -> Pinyin -> English Meaning) uses dense steps (`space-xs` and `space-sm`), while semantic sections (e.g., Mnemonic story -> Etymology breakdown) require distinct separation using `space-lg` to `space-xl`.

## Elevation & Depth

This system avoids heavy drop shadows, relying instead on warm ambient illumination that mimics natural gallery lighting on paper cards:

- **Level 0 (Floor Canvas):** `#F9F8F6` base background.
- **Level 1 (Resting Tiles & Cards):** `#FFFFFF` surface with a delicate, dual-layer shadow: `0 1px 2px rgba(15, 23, 42, 0.04), 0 4px 12px rgba(190, 18, 60, 0.02)` bordered by `#E7E5E0` hairline stroke (1px).
- **Level 2 (Hovered Card / Active Quiz Surface):** Elevated slightly via `0 8px 24px rgba(15, 23, 42, 0.06), 0 2px 6px rgba(15, 23, 42, 0.02)` and border transition to `#CBD5E1`.
- **Level 3 (Modals, Overlays, Sticky SRS Feedback Drawer):** Elevated with deep ambient softening: `0 20px 32px -4px rgba(15, 23, 42, 0.12), 0 8px 16px -4px rgba(15, 23, 42, 0.04)`.
- **Seal & Accent Elevation:** Gamified badge elements utilize saturated, low-spread color glows (e.g., streak fire button gains `0 2px 8px rgba(217, 119, 6, 0.25)`).

## Shapes

The design uses balanced, modern rounded geometry that softens technical study workflows while maintaining geometric discipline:

- **Standard Elements (Buttons, Inputs, Metric Tiles):** 0.5rem (8px).
- **Study Cards & Flashcard Containers:** `rounded-lg` at 1rem (16px) or `rounded-xl` at 1.5rem (24px) for expansive hero cards.
- **Micro-Indicators & Gamification Tags:** Pill-shaped (`rounded-full` / 9999px) for SRS rank markers, streaks, tone color chips, and quick-filter tag bars.
- **Character Stroke Practice Pads:** Square `rounded-xl` frames featuring subtle cross-hair inner guides (*Mi Zi Ge* / 米字格) rendered in `rgba(15, 23, 42, 0.06)`.

## Components

### Buttons
- **Primary:** Background `#BE123C`, text `#FFFFFF`, font `title-sm`, 0.5rem radius, padding `12px 24px`. On hover: subtle scale `1.01` and background `#9F1239`.
- **Secondary (Jade / Success):** Background `#059669`, text `#FFFFFF`, for review progression and correct confirmations.
- **Ghost / Outline:** 1px border `#E7E5E0`, background transparent, text `#0F172A`. On hover: background `#FFFFFF` with Level 1 shadow.

### SRS Gamification Pills & Badges
- **Pill Attributes:** Height 28px, padding `0 12px`, border-radius 9999px, font `label-sm`.
- **Streak Pill:** Background `#FEF3C7`, text `#B45309`, left icon 🔥 with glowing tertiary amber highlight.
- **SRS Stage Badges:**
  - *Apprentice:* Slate muted background (`#F1F5F9`, text `#475569`)
  - *Guru / Master:* Jade emerald tint (`#ECFDF5`, text `#047857`)
  - *Enlightened / Burned:* Imperial crimson tint (`#FFF1F2`, text `#BE123C`)

### Study Flashcards
- Crisp `#FFFFFF` surface, 1px solid `#E7E5E0`, radius 24px, generous interior padding (36px desktop, 20px mobile). 
- Top-anchored with radical and SRS category chips. Center-staged Hanzi logogram rendered using `display-character`. Hidden reveal container for Pinyin, audio pronunciation trigger, and mnemonic breakdown.

### Inputs & SRS Answer Bar
- Form inputs feature `#FFFFFF` background, 1px solid `#CBD5E1`, text `#0F172A`, radius 12px, vertical padding 14px.
- Focus state activates an outline with Imperial Vermilion tint (`box-shadow: 0 0 0 3px rgba(190, 18, 60, 0.15)`).
- Instant review answer bar transitions dynamically: turns `#ECFDF5` with `#059669` border on correct input, and `#FEF2F2` with `#DC2626` border on incorrect submission.

### Progress & Mastery Bars
- Track height 8px, full rounded ends, background `#E7E5E0`.
- Segmented fill: dynamically displays Apprentice, Guru, Master, and Burned percentages in sequenced colors (Slate -> Jade -> Gold -> Crimson).