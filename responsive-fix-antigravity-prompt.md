# Iveoma Responsive Fix — Antigravity Implementation Prompt

> **Paste this entire file into Antigravity as a single prompt.**
> The project is the live `iveoma-web` Next.js 16 codebase at the user's repo root.
> Goal: make the site responsive across small mobile → 4K desktop **without redesigning the desktop or laptop look**. Mobile and tablet are the only experiences that need to change.

---

## 0. Project context Antigravity must know before writing any code

- Stack: **Next.js 16.2.4 (app router) + React 19 + Framer Motion + GSAP + Tailwind directives in `globals.css`**.
- This is **not** the Next.js you have in training data — read `node_modules/next/dist/docs/` if you hit unknown APIs (per `AGENTS.md`).
- Styling is a hybrid of **inline `style={{}}` objects, scoped `<style jsx>` blocks, CSS variables defined in `src/app/globals.css`, and a small set of utility classes** (`.container`, `.section-pad`, `.btn`, `.btn-link`, `.hero-split-grid`, `.contact-grid-responsive`, `.inquiry-grid`, `.metric-row`, etc.).
- Spacing is driven by these CSS variables (already defined in `globals.css`):
  ```
  --sp-container:    80px   (≥1025px)
  --sp-container-md: 48px   (≤1024px)
  --sp-container-sm: 24px   (≤768px)
  --sp-section:      96px   (≥1025px)
  --sp-section-md:   72px   (≤1024px)
  --sp-section-sm:   48px   (≤768px)
  ```
  **Most of the bugs come from components ignoring these variables and hardcoding `padding: '160px 80px'`, `padding: '0 80px'`, fixed `fontSize: '48px'` headings, and fixed-pixel grid gaps.**
- Existing breakpoints used (inconsistently): `1400px`, `1200px`, `1150px`, `1024px`, `991px`, `768px`, `640px`, `480px`. Antigravity must standardize on the breakpoint set defined below.

---

## 1. Diagnosis — what is actually broken on mobile

These were confirmed against a real device screen recording at **382 × 850 px** (large mobile), and against the source code. Treat each item as a real, reproducible bug — not a hypothesis.

### 1.1 Whole-page horizontal overflow
Multiple sections push content past `100vw`, so the entire page can be scrolled sideways. On the recording, headlines like `"...ntellectual Property and ...orial Integrity"` and cards labeled `"PROTOCOL"` / `"...APITAL"` are visible only after a horizontal scroll. The `<html>` and `<body>` elements have no `overflow-x: hidden` guard, and several inline `style` blocks emit fixed widths or fixed paddings wider than the viewport.

**Origin files (non-exhaustive):**
- `src/app/about/AboutPageClient.tsx` — `padding: '160px 80px'` and `padding: '140px 80px'` on `<section>` tags (lines ~233, 417, 480), plus `width: '800px'` on inner blocks (~627).
- `src/app/funding/FundingPageClient.tsx` — every section uses `padding: '160px 0'` and inner `padding: '0 80px'` (lines ~99, 147, 185, 195+).
- `src/app/programmes/ProgrammesPageClient.tsx` — pillar grids set `gridTemplateColumns: 'repeat(4, 1fr)'` (~287) and `'repeat(3, 1fr)'` (~581) without proper collapse rules until `768px`.
- `src/components/InsightsSection.tsx` — `.insights-section { padding: 96px 80px; }` with a fixed `width: 220px` thumbnail column (~108) that does not shrink.
- `src/components/ImpactSpotlight.tsx` — `width: '600px'` on an inner block (~195).

### 1.2 Hero is cropped / cramped
- `src/components/HeroSection.tsx`:
  - `height: 'calc(100dvh + 100px)'` + `paddingTop: '400px'` forces the hero to the viewport but pushes the headline below the fold on mobile.
  - The three "insight markers" (`3 / Autonomous Communities Reached`, `8 / Secondary Schools Supported`, `2,000+ / Women & Widows Stabilized`) sit in a single `display: flex; gap: 40px` row that overflows the right edge on 380 px viewports — confirmed in the recording.
  - The hero "split grid" (headlines | divider | sub-copy + CTAs) only collapses at `≤1024px`. Between `768–1024px` (tablets) it still tries to render side-by-side at low widths.
  - The `<motion.h1>` uses `fontSize: clamp(40px, 6vw, 80px)` — the `40px` floor is too large for `≤360px` devices, and the headline `"Sustainable Futures."` overflows the right edge.

### 1.3 Navigation bar gets clipped
- `src/components/NavBar.tsx`:
  - The bar uses `padding: '0 var(--sp-container) ...'` which becomes `0 24px` on mobile — fine, but the **logo height is fixed at `72px`** and the row also contains a Donate button + Search icon + Menu icon. On small phones the Donate button (`.tablet-cta`) only hides at `≤480px`, so devices in the **481–600 px range** show all four elements compressed and the menu icon partially clipped.
  - The mobile drawer uses `padding: '24px var(--sp-container)'` and renders a duplicate logo at `height: 72px`. In the recording, the drawer's backdrop is too transparent and the underlying scroll position bleeds through (logo appears doubled — frame at ~2:05 of the recording).
  - There is **no `position: sticky` / `top: env(safe-area-inset-top)` handling** for iOS notch — the bar sits flush with the status bar and feels clipped.
  - On scroll the bar shrinks from `100px → 80px`, but the hero is offset with `marginTop: -100px` to overlap. On mobile after scroll, this leaves a `~20px` gap of the hero image visible at top.

### 1.4 Section paddings waste space and clip content
- Sections that use the `.section-pad` utility scale correctly (96 → 72 → 48 px vertical) — these are fine.
- Sections that **bypass** `.section-pad` and hardcode `padding: '160px 0'` / `'160px 80px'` / `'140px 80px'` are the offenders. They produce:
  - 160 px of empty top/bottom space on a 380 px-wide phone (≈ 42% of the height before content starts).
  - Inner blocks anchored to `padding: '0 80px'` — leaving ~220 px usable width on a 380 px viewport — which is why headings are clipped and body text wraps to one or two words per line (recording at the "Technical Collabora…" frame and "across regional boundaries / and / systemic / domains" frame).

### 1.5 Typography scale not mobile-first
- Many `<h2>` headings use **fixed pixel** sizes (`'42px'`, `'48px'`, `'56px'`) — see `app/funding/FundingPageClient.tsx` lines ~107, ~155, ~205. On mobile they overflow because they exceed the column width. The codebase already proves the pattern works with `clamp()` (HeroSection h1, StatsBar number, metric-value), it's simply not applied consistently.
- `<h1>` `clamp(40px, 6vw, 80px)` — floor too high for `<360px`; should be `clamp(32px, 8vw, 80px)`.
- Body copy at `fontSize: 18px` inside hero-descriptor (`ContactPageClient.tsx` line ~144) is fine, but the descriptor's `paddingLeft: 40px` + left border survive on mobile and crowd the text against the right edge.

### 1.6 Grids that don't collapse at the right breakpoint
- `Footer.tsx` — `1.2fr 1fr 1fr 1fr` collapses to `1fr 1fr` at `≤1024px` and `1fr` at `≤768px`. Acceptable, but the `gap: 64px` is preserved when the grid becomes 1-col on mobile, producing 64 px of vertical padding between columns. Reduce.
- `app/about/AboutPageClient.tsx` `philosophy-triad` — `repeat(3, 1fr)` with `gap: 64px`. The `@media (max-width: 768px)` rule collapses to single column with `gap: 48px` — fine, but tablet (`≤1024px`) only shrinks `gap: 32px` and stays 3-column → cards crush.
- `app/impact/ImpactPageClient.tsx` — `legitimacy-grid: repeat(3, 1fr)` (~292), `legitimacy-header: 1fr 1fr` (~255). No mobile / tablet rule visible in the file's `<style jsx>`. Cards squash side-by-side on 700 px tablets.
- `app/partner/PartnerPageClient.tsx` — `repeat(3, 1fr)` (~162), `1fr 1.3fr` `dialogue-grid` (~199) with `gap: '120px'`. No collapse defined.
- `components/StatsBar.tsx` — `gridTemplateColumns: 'repeat(3, 1fr)'` (~96) with no media query collapse. Numbers stay 3-up at 380 px.

### 1.7 Cards that overflow
- `app/funding/FundingPageClient.tsx` — Account cards (`AccountCard`) likely use `padding: 32–48px` and a fixed `fontFamily: var(--font-numbers)` for the bank account number at large size. On 380 px the number `5071194200` is cropped on the right (confirmed in the recording).
- `components/ImpactStories.tsx` — Detail panels use `padding: '48px 40px'` (~420), evidence block `padding: '32px'` with `gridTemplateColumns: repeat(3, 1fr)` (~461) — three numeric stats in 3 columns inside a 380 px – 64 px = 316 px wide card collapses each stat to ~95 px.
- `components/InsightsSection.tsx` — fixed `width: '220px'` thumbnail column inside the editorial row never shrinks.

### 1.8 Mobile drawer / overlay issues
- `NavBar.tsx` mobile drawer:
  - `backgroundColor: 'rgba(15, 42, 68, 0.98)'` + `backdropFilter: 'blur(20px)'` — the **blur fails on Safari/Chrome iOS during transform** (Framer Motion `y: -20` animation), so during the 0.4 s open animation the underlying page bleeds through visibly. Use opaque background `#0F2A44` while the drawer is open.
  - Drawer body `padding: '24px var(--sp-container)'` puts logo + close at `24px 24px` (mobile) — fine, but the nav links use `fontSize: '32px'` which is too tight on `<360 px` (e.g. `Programmes` runs to ~270 px width, leaves ~70 px right margin only). Use `clamp(26px, 8vw, 36px)`.
  - The drawer does not lock body scroll for **iOS Safari rubber-banding** (only `document.body.style.overflow = 'hidden'`). Add `position: fixed; inset: 0` lock.

### 1.9 Search overlay
- `NavBar.tsx` `SearchOverlay`:
  - `padding: '40px'` on the outer `<motion.div>` is too much on mobile.
  - `position: 'absolute'; top: '40px'; right: '40px'` for the close button overlaps the search input on `<480 px` because the input's `fontSize: clamp(32px, 6vw, 64px)` still floors at 32 px.

### 1.10 Other concrete bugs
- `src/app/globals.css` line 387 redefines `.section-pad` with `padding: clamp(80px, 10vw, 160px) var(--sp-container)` **after** the responsive `.section-pad` rules (lines 157-174), so the cascade picks the **non-responsive** clamp version. This is why some sections feel oversized on mobile.
- `src/app/globals.css` defines `.hero-split-grid` twice (lines 374 and 488). The second definition wins (`grid-template-columns: 1.2fr 1fr; gap: 80px`) but the responsive collapse rule (~495–504) is correct. Just delete the duplicate `.hero-split-grid` and `.section-pad` to restore the responsive cascade.
- `<html>` and `<body>` need `overflow-x: clip` (modern, paint-only clip) plus `width: 100%; max-width: 100vw` to stop horizontal scrolling caused by transient overflowing children.

---

## 2. Breakpoint strategy (canonical — adopt across the codebase)

Antigravity must replace the ad-hoc breakpoints (`1400 / 1200 / 1150 / 1024 / 991 / 768 / 640 / 480`) with this six-tier system. Define them as CSS variables and class hooks at the top of `src/app/globals.css`:

| Tier            | Range            | Container px | Section py | Headline floor | Headline ceil | Notes                                                |
|-----------------|------------------|--------------|------------|----------------|---------------|------------------------------------------------------|
| `xs` small mobile | `≤ 374px`      | 16           | 48         | 28             | 36            | iPhone SE, small Androids                            |
| `sm` mobile     | `375–479px`      | 20           | 56         | 32             | 44            | Standard phones                                      |
| `md` large mobile | `480–639px`    | 24           | 64         | 36             | 52            | Phablets / iPhone Pro Max                            |
| `lg` tablet     | `640–1023px`     | 40           | 80         | 44             | 64            | iPad portrait, small tablets                         |
| `xl` laptop     | `1024–1279px`    | 56           | 96         | 56             | 72            | iPad Pro landscape, MacBook 13                       |
| `2xl` desktop   | `≥ 1280px`       | 80           | 96–160     | 64             | 96            | **DO NOT TOUCH the visual design here.**             |

Implementation: keep `--sp-container`, `--sp-container-md`, `--sp-container-sm` and ADD `--sp-container-xs: 16px`. Wire them through media queries that target the tiers above. **Do not introduce new `max-width: 991px` or `max-width: 1150px` rules.**

```css
:root {
  --sp-container:      80px;
  --sp-container-lg:   56px;
  --sp-container-md:   40px;
  --sp-container-sm:   24px;
  --sp-container-xs:   16px;
  --sp-section:        96px;
  --sp-section-md:     72px;
  --sp-section-sm:     56px;
  --sp-section-xs:     40px;
}

@media (max-width: 1279px) { :root { --sp-container: var(--sp-container-lg); } }
@media (max-width: 1023px) { :root { --sp-container: var(--sp-container-md); --sp-section: var(--sp-section-md); } }
@media (max-width: 639px)  { :root { --sp-container: var(--sp-container-sm); --sp-section: var(--sp-section-sm); } }
@media (max-width: 374px)  { :root { --sp-container: var(--sp-container-xs); --sp-section: var(--sp-section-xs); } }
```

After this lands, **every component that today writes `padding: '160px 80px'` or `padding: '0 80px'` must be migrated to use these variables.**

---

## 3. Mobile-first layout rules (apply to every component)

1. **Default styles target `xs` (≤374px).** Every breakpoint above is a `min-width` upgrade. Antigravity should refactor each component's local `<style jsx>` to **start small and scale up**, not start at desktop and try to retrofit `max-width` overrides.
2. **No fixed pixel widths over 280px in inline styles.** Replace `width: '600px'`, `width: '800px'`, `width: '220px'` with `width: 100%; max-width: …`.
3. **No `padding: '160px 80px'` in inline styles.** Replace with `className="section-pad"` or `padding: 'var(--sp-section) var(--sp-container)'`.
4. **All headlines use `clamp()`.** Mandatory pattern:
   ```ts
   fontSize: 'clamp(28px, 6.5vw, 56px)' // h2
   fontSize: 'clamp(32px, 8vw, 80px)'   // h1
   fontSize: 'clamp(20px, 4vw, 28px)'   // h3
   ```
5. **All grids must define a 1-column fallback at `≤639px`** and a 2-column fallback at `640–1023px` for any grid that has 3+ columns.
6. **All horizontal flex rows containing 3+ items must `flex-wrap: wrap` and have `gap: clamp(12px, 3vw, 40px)`.**
7. **All cards must be `min-width: 0`** to let their content shrink. Add `min-width: 0` on grid items as the default to prevent overflow caused by long unbroken strings (account numbers, URLs, headlines).
8. **All long unbroken strings (account numbers, emails, URLs) must `overflow-wrap: anywhere; word-break: break-word;`**.
9. **All images: `max-width: 100%; height: auto; display: block`.**
10. **All sections must have `overflow-x: clip`** (modern, paint-only — does not create a scroll container).

---

## 4. Tablet-specific layout improvements (640–1023px)

Tablets are currently the worst tier because most components only have a `≤1024px` rule that often does nothing meaningful. Apply:

- **Footer:** keep 4 columns `lg` (1024+), drop to **2 columns at ≤1023px**, drop to **1 column at ≤639px**. Reduce `gap` from `64px → 40px → 32px`.
- **`philosophy-triad` / 3-column "pillar" grids** in About / Impact / Partner: collapse to **2 columns at ≤1023px** (currently they stay 3-up until 768px). At ≤639px → 1 column.
- **Hero split** (HeroSection, EvidencePageClient, ContactPageClient, PartnerPageClient `dialogue-grid`): **single column at ≤1023px**. Hide vertical dividers. Remove the `paddingLeft: 40px; borderLeft` block on hero descriptors when stacked.
- **StatsBar:** 3-up at ≥1024, **3-up but smaller fontSize** at 640–1023, **stacked 1-up at ≤639** (do not try to squeeze 3 large numbers into a 380 px row).
- **NavBar:** keep desktop layout to `≥1024px`. Below that, hide desktop nav, show mobile drawer. Eliminate the awkward `≤991px` boundary — use `≤1023px` instead.
- **Programmes pillars `repeat(4, 1fr)`:** 4 → 2 → 1 across `xl / lg / sm`. Avoid the `1150px` middle breakpoint.
- **Inquiry / Contact form `inquiry-grid: 1fr 1.3fr; gap: 120px`:** 2-col at ≥1024, 1-col at ≤1023, gap reduces to 48px.

---

## 5. Specific fixes — by file & concern

### 5.1 `src/app/globals.css`

1. **Delete the duplicate `.section-pad` rule on line 387** (`padding: clamp(80px, 10vw, 160px) var(--sp-container)`). It overrides the responsive version above it.
2. **Delete the duplicate `.hero-split-grid` block on lines 488–493**. The first definition (line 374) plus the responsive collapse (line 381) is correct.
3. Add at the very top of the file:
   ```css
   html, body {
     overflow-x: clip;
     max-width: 100vw;
   }
   img, video, svg { max-width: 100%; height: auto; display: block; }
   * { min-width: 0; }
   ```
4. Add `--sp-container-xs`, `--sp-section-xs`, and the breakpoint cascade from §2.
5. In `.btn`, change `padding: 14px 38px` to `padding: clamp(12px, 1.5vw, 14px) clamp(22px, 4vw, 38px)`. Buttons feel oversized on mobile.
6. In `.contact-grid-responsive` add a tablet rule:
   ```css
   @media (max-width: 1023px) { .contact-grid-responsive { grid-template-columns: repeat(2, 1fr); gap: 40px; } }
   @media (max-width: 639px)  { .contact-grid-responsive { grid-template-columns: 1fr; gap: 32px; } }
   ```
7. In `.metric-row` (line 397): set `gap: clamp(24px, 4vw, 64px)`.
8. In `.metric-node` (line 404): set `padding-left: clamp(16px, 2vw, 24px); min-width: 0`.

### 5.2 `src/components/NavBar.tsx`

1. **Standardize the mobile breakpoint to `1023px`.** Replace the cascade `1200 → 1024 → 991 → 480` inside `<style jsx>` with `1279 → 1023 → 479`. Hide `.desktop-nav` at `≤1023px` and show `.mobile-nav-toggle`.
2. **Logo height responsive:** change `<img style={{ height: '72px', ... }} />` to `style={{ height: 'clamp(48px, 9vw, 72px)', width: 'auto' }}`. Same for the duplicate logo inside the mobile drawer.
3. **NavBar height responsive:** the `motion.nav` `animate={{ height: scrolled ? 80 : 100 }}` is too tall on small phones. Use `height: scrolled ? 'clamp(56px, 8vh, 80px)' : 'clamp(64px, 10vh, 100px)'`. Update `HeroSection.tsx` `marginTop: '-100px'` to use `marginTop: 'calc(-1 * var(--nav-height-base, 100px))'` driven by a CSS variable that the NavBar updates on resize, OR simpler: set `marginTop: 'clamp(-100px, -10vh, -64px)'`.
4. **Safe-area:** add `paddingTop: 'env(safe-area-inset-top)'` to the `motion.nav` style so the bar respects the iPhone notch.
5. **Donate button on mobile:** the `.tablet-cta` should hide at `≤639px` (not `≤480px`). On `xs`, only the search icon and the hamburger should be visible alongside the logo.
6. **Mobile drawer fixes:**
   - Replace `backgroundColor: 'rgba(15, 42, 68, 0.98)'` with `backgroundColor: '#0F2A44'` (fully opaque). Keep the `backdropFilter: 'blur(20px)'` for the safe-area frosted look on iOS.
   - Add `overscrollBehavior: 'contain'` and `WebkitOverflowScrolling: 'touch'` to the drawer container.
   - Replace nav link `fontSize: '32px'` with `fontSize: 'clamp(26px, 8vw, 36px)'` and `lineHeight: 1.1`.
   - Reduce `marginTop: '80px'` (above the nav links) to `marginTop: 'clamp(32px, 6vh, 80px)'`.
   - Add `gap: 'clamp(20px, 4vh, 40px)'` instead of fixed `40px`.
   - Lock body scroll with the proven pattern:
     ```ts
     useEffect(() => {
       if (mobileMenuOpen) {
         const y = window.scrollY;
         document.body.style.position = 'fixed';
         document.body.style.top = `-${y}px`;
         document.body.style.width = '100%';
       } else {
         const y = document.body.style.top;
         document.body.style.position = '';
         document.body.style.top = '';
         document.body.style.width = '';
         if (y) window.scrollTo(0, parseInt(y || '0') * -1);
       }
     }, [mobileMenuOpen]);
     ```
7. **Search overlay:** change outer `padding: '40px'` to `padding: 'clamp(20px, 5vw, 40px)'`. Move the close button to `top: 'clamp(20px, 4vw, 40px); right: same'`. Reduce input `fontSize: 'clamp(28px, 8vw, 64px)'`.

### 5.3 `src/components/HeroSection.tsx`

1. Change `height: 'calc(100dvh + 100px)'` to `minHeight: 'clamp(560px, 90dvh, 980px)'`. Lets the hero grow with content on tiny phones and prevents headline clipping.
2. Change `paddingTop: '400px'` to `paddingTop: 'clamp(120px, 24dvh, 400px)'`.
3. Hero h1 `fontSize: 'clamp(40px, 6vw, 80px)'` → `'clamp(32px, 8vw, 80px)'`.
4. The "insights" row (`display: 'flex'; gap: '40px'`):
   - Add `flexWrap: 'wrap'; rowGap: '12px'; gap: 'clamp(16px, 3vw, 40px)'`.
   - At `≤639px`, drop the third insight's label-and-number line — keep only the value with a 2-word label, OR stack the row vertically.
   - Insight number `fontSize: '16px'` → `'clamp(13px, 2vw, 16px)'`. Insight label `fontSize: '11px'` is fine but add `flex: '0 1 auto; min-width: 0'`.
5. The hero grid `display: 'flex'; gap: '64px'`:
   - Already has `flex-direction: column` at `≤1024px`. Push that breakpoint down to `≤1023px` and add an explicit single-column rule at `≤639px` with `gap: 32px`.
   - Hide the vertical divider when stacked: `.hero-grid > div:nth-child(2) { display: none; }` at `≤1023px`.
6. The right column `flex: '0 0 35%'` becomes `flex: 1 1 100%; padding-bottom: 0` when stacked.
7. Sub-copy `<motion.p>` `fontSize: 'clamp(15px, 1.4vw, 18px)'` → `'clamp(15px, 3.5vw, 18px)'` (1.4vw is too small on mobile).
8. CTA row `display: 'flex'; gap: '16px'; flexWrap: 'wrap'`: add `width: '100%'`. On `≤479px`, both buttons should `flex: 1 1 100%` to span full width.

### 5.4 `src/components/Footer.tsx`

1. `gridTemplateColumns: '1.2fr 1fr 1fr 1fr'; gap: '64px'`: keep desktop. Add tablet+mobile via `<style jsx>`:
   ```css
   @media (max-width: 1023px) { .footer-top-grid { grid-template-columns: 1fr 1fr !important; gap: 40px !important; } }
   @media (max-width: 639px)  { .footer-top-grid { grid-template-columns: 1fr !important; gap: 32px !important; margin-bottom: 56px !important; } }
   ```
   (The current `≤1024px` and `≤768px` rules are close — just align to the canonical breakpoints.)
2. Brand paragraph `maxWidth: '260px'`: change to `maxWidth: '320px'` and add `width: 100%`.
3. Footer bottom row: keep existing column-stacked layout at `≤768px` but reduce `gap: 24px` to `gap: 16px` on `xs`.
4. Add `min-width: 0` to every immediate child of the grid.

### 5.5 `src/app/funding/FundingPageClient.tsx` (highest-impact file)

**This page is responsible for the worst overflow seen in the recording (clipped account numbers).** Fix:

1. Replace **every** `<section style={{ padding: '160px 0', ... }}>` with `className="section-pad"` and remove the inline `padding`.
2. Replace **every** inner `<div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 80px' }}>` with `<div className="container">`.
3. Headlines:
   - "The 100% Impact Guarantee." `fontSize: '42px'` → `'clamp(28px, 5.5vw, 42px)'`.
   - "Direct Institutional Transfers." `fontSize: '48px'` → `'clamp(28px, 6vw, 48px)'`.
   - "Beyond capital, we seek collaboration." `fontSize: '56px'` → `'clamp(32px, 7vw, 56px)'`.
4. Funding grid `1fr 1fr; gap: '48px'` collapses to `1fr` only at `≤991px`. Standardize to `≤1023px`.
5. **`AccountCard` component (in the same file or imported):**
   - Add `min-width: 0` to the card root.
   - Account number rendering must `font-size: clamp(20px, 5vw, 36px); word-break: break-all; line-height: 1.1; letter-spacing: 0.02em`.
   - Card `padding` must be `padding: clamp(20px, 4vw, 48px)`.
6. The bottom info pill `padding: '48px'` → `padding: 'clamp(24px, 4vw, 48px)'`.
7. The grid `1fr 1fr; gap: 120px` on the Stewardship Prospectus must collapse to `1fr; gap: 56px` at `≤1023px`.

### 5.6 `src/app/about/AboutPageClient.tsx`

1. Replace **every** `<section style={{ padding: '160px 80px', ... }}>` and `'140px 80px'` with `className="section-pad"`.
2. Replace inner `<div style={{ maxWidth: '1180px', margin: '0 auto' }}>` with `<div className="container">`.
3. `philosophy-triad`: add **tablet rule** `@media (max-width: 1023px) { .philosophy-triad { grid-template-columns: 1fr 1fr !important; gap: 40px !important; } }` before the existing 768px rule.
4. The leadership-grid `repeat(2, minmax(0, 1fr))` is already mobile-safe (uses `minmax(0, 1fr)`). Just confirm `gap: 24px` shrinks to `gap: 16px` at `≤479px`.
5. Modal `gridTemplateColumns: '38% 62%'` (line ~1015): collapse to `1fr` at `≤1023px`. Modal `padding: '40px 80px 24px'` (~562) and `padding: '48px 80px 80px'` (~580) → `padding: clamp(24px, 5vw, 80px)`.
6. Hero `width: '800px'` (~627) → `width: 100%; max-width: 800px`.

### 5.7 `src/app/programmes/ProgrammesPageClient.tsx`

1. Standardize the breakpoint cascade to `1279 / 1023 / 639 / 374` (currently `1400 / 1150 / 1024 / 768 / 640`).
2. `pillar-static-grid: repeat(4, 1fr)`: 4 → 2 at `≤1023` → 1 at `≤639`.
3. `pillar-detail-grid: 1.2fr 1fr; gap: 80px; minHeight: 440px`: collapse to `1fr; gap: 32px`; remove `minHeight` on mobile.
4. `protocol-row: repeat(3, 1fr)`: 3 → 2 at `≤1023` → 1 at `≤639`. Reduce `gap: clamp(20px, 3vw, 32px)`.

### 5.8 `src/app/impact/ImpactPageClient.tsx`

1. `legitimacy-header: 1fr 1fr; gap: 80px; marginBottom: 100px`: 1 col at `≤1023px`, gap → 48px, marginBottom → `clamp(48px, 8vw, 100px)`.
2. `legitimacy-grid: repeat(3, 1fr); gap: 40px`: 2 cols at `≤1023`, 1 col at `≤639`, gap → `clamp(20px, 3vw, 40px)`.
3. Audit any inline `<section style={{ padding: ... }}>` and migrate to `.section-pad`.

### 5.9 `src/app/contact/ContactPageClient.tsx`

1. The `hero-descriptor` has `paddingLeft: '40px'; borderLeft: '1px solid rgba(255,255,255,0.15)'; marginTop: '48px'`. **Strip the `paddingLeft` and `borderLeft` at `≤1023px`** (move to a `<style jsx>` block). Otherwise the right column's text gets crushed against the left border on tablets.
2. `hero-split-grid` already collapses correctly via `globals.css` (after deduping) — confirm it.
3. `contact-grid-responsive` is fixed in §5.1.7.
4. Form fields `padding: '16px 0'` is fine. Add `width: 100%; min-width: 0` to each field's outer container.

### 5.10 `src/app/partner/PartnerPageClient.tsx`

1. `dialogue-grid: 1fr 1.3fr; gap: 120px; alignItems: start`: 1 col at `≤1023px`, gap → 56px.
2. The `repeat(3, 1fr)` block (~162) and inner `1fr 1fr; gap: 32px` (~234): 3 → 2 → 1 across breakpoints.

### 5.11 `src/components/InsightsSection.tsx`

1. The image column `width: '220px'; flexShrink: 0`: change to `flex: '0 0 clamp(120px, 30vw, 220px)'` and on mobile (`≤639px`), drop the image column or stack it above the text (`flex-direction: column`).
2. `.insights-section { padding: 96px 80px }`: replace with `padding: var(--sp-section) var(--sp-container)` so it follows the cascade.

### 5.12 `src/components/ImpactSpotlight.tsx`

1. Inner block `width: '600px'` (~195): change to `width: 100%; max-width: 600px`.
2. The `whiteSpace: 'nowrap'` on "Active Empowerment / Ebonyi State" (~264) — keep nowrap on desktop, but at `≤639px` drop to `whiteSpace: 'normal'` to allow wrapping.

### 5.13 `src/components/ImpactStories.tsx`

1. Detail panel `padding: '48px 40px'` → `padding: 'clamp(24px, 4vw, 48px) clamp(20px, 4vw, 40px)'`.
2. Evidence block `gridTemplateColumns: 'repeat(3, 1fr)'; padding: 32px` → at `≤639px` make it `1fr`, padding `20px`.
3. Filter & Sort sidebar (`minWidth: 160px`, ~199) — confirm container is allowed to shrink with `flex-wrap: wrap`.
4. The pillar grid `1fr 1fr; gap: 40px` (~427) → `1fr; gap: 24px` at `≤639px`.

### 5.14 `src/components/StatsBar.tsx`

1. `gridTemplateColumns: 'repeat(3, 1fr)'`: add tablet+mobile rules — `repeat(3, 1fr)` at `≥1024`, `repeat(3, 1fr)` with smaller `fontSize` at `640–1023`, `1fr` stacked at `≤639`.
2. Each stat cell `padding: '0 24px'; borderRight`: at `≤639px` set `padding: '24px 0'; border-right: none; border-bottom: 1px solid rgba(10,34,55,0.1)`.

### 5.15 `src/app/impact/evidence/EvidencePageClient.tsx`

1. Container padding `padding: '36px 80px 28px 80px'` (~216): replace with `padding: 'var(--sp-section-md) var(--sp-container)'`.
2. `hero-grid: 1fr 1fr; gap: 80px` and `timeline-grid: repeat(4, 1fr)`: collapse to 1 col / 2 col / 1 col across the breakpoint tiers.
3. `education-grid: repeat(3, 1fr)`: 3 → 2 → 1.
4. `metrics-grid: 1fr 1fr; gap: 24px`: 1fr at `≤639px`.
5. Inline `whiteSpace: 'nowrap'` on "Infrastructure Growth" (~257): drop on mobile.

---

## 6. Navigation bar fixes — full spec

| Tier   | Layout                                                                              |
|--------|--------------------------------------------------------------------------------------|
| 2xl    | Logo · 5 nav links · search · Donate                                                  |
| xl     | Same as 2xl, slightly tighter gaps (`gap: 24px → 32px`)                              |
| lg     | **Switch to mobile drawer.** Show: logo · search · Donate (compact) · hamburger      |
| md     | Same as lg                                                                           |
| sm     | logo · search · hamburger (Donate hidden, surfaced inside drawer)                    |
| xs     | logo (smaller, 48px) · hamburger only (search and Donate inside drawer)              |

Implementation rules:
- One canonical breakpoint for the desktop→mobile switch: **1023px**.
- One canonical breakpoint to hide the in-bar Donate button: **639px**.
- One canonical breakpoint to hide the in-bar search icon: **374px**.
- NavBar height respects `env(safe-area-inset-top)`.
- Drawer always uses opaque background.
- Drawer locks body scroll using `position: fixed; top: -y` pattern (§5.2.6).
- Drawer footer pins a Donate button + secondary link list ("Privacy Protocol", "Institutional Terms") at the bottom on tall screens.

---

## 7. Preventing horizontal scroll & content clipping (global guarantees)

Add these once and Antigravity is allowed to assume they hold:

```css
/* globals.css — top of file */
html, body { overflow-x: clip; max-width: 100vw; }
* { min-width: 0; }
img, video, svg, iframe { max-width: 100%; height: auto; display: block; }
.container, .section-pad, section, main, article, aside { box-sizing: border-box; }
.long-string { overflow-wrap: anywhere; word-break: break-word; }
```

Then audit each component and:
- Wrap long unbroken strings (account numbers, emails, URLs, NIN, BVN-style) with `className="long-string"`.
- Replace any `display: flex` row that contains 3+ items with `flex-wrap: wrap; gap: clamp(...)`.
- Replace any `position: absolute` child whose parent has no width constraint with a `position: relative` child or a parent that has `width: 100%; overflow: hidden`.

---

## 8. Rules for preserving the desktop / laptop design (DO NOT CROSS)

Antigravity is forbidden from changing any of the following at `≥1024px` viewports:

1. Type scale: `clamp()` ceilings (the upper bound) must remain identical to the existing `clamp()` ceilings or to current fixed pixel sizes. Only the floor and the middle `vw` value change.
2. Color palette and CSS variables in `globals.css` `:root`.
3. Section ordering on every page.
4. Hero composition (split grid with vertical divider, headline + sub-copy + CTAs) at desktop.
5. NavBar composition: logo · 5 nav links · search · Donate.
6. Footer composition: 4-column grid + bottom row.
7. Animations (Framer Motion springs, GSAP scroll triggers) — durations and easings stay.
8. The "Shree Devanagari 714" numbers font and Inter Tight headings.
9. The architectural noise overlay, parallax, vertical dividers, and `.metric-node::before` rule.
10. Card shadow and border-radius values **at desktop**. They may shrink on mobile.

In short: a screenshot at 1440 × 900 of the new build must be **pixel-equivalent** to the current production build. Diff via Percy/Chromatic if available.

---

## 9. Testing matrix (must pass before opening a PR)

Manually verify on Chrome DevTools device emulation **and** at least one real iOS Safari + one real Android Chrome session.

| Device                  | Width × Height | Tier  | What to verify                                                                  |
|-------------------------|----------------|-------|----------------------------------------------------------------------------------|
| iPhone SE (1st gen)     | 320 × 568      | xs    | No horizontal scroll. Hero headline fits. NavBar shows logo + hamburger only.    |
| iPhone SE (3rd gen)     | 375 × 667      | sm    | Hero stats wrap. Footer single-column. No clipped headlines.                     |
| iPhone 14 / 15          | 390 × 844      | sm    | Notch / safe area respected. Drawer covers full viewport, no bleed.              |
| iPhone 15 Pro Max       | 430 × 932      | md    | Donate button visible in NavBar. Bank account numbers render fully.              |
| Pixel 7                 | 412 × 915      | md    | All sections respect `var(--sp-container)`. Tap targets ≥ 44 × 44.               |
| iPad Mini (portrait)    | 768 × 1024     | lg    | 4-col footer collapses to 2. Hero stacks. Pillar grid 2-up.                      |
| iPad Pro 11" (portrait) | 834 × 1194     | lg    | Same. Confirm `dialogue-grid` is 1 col.                                          |
| iPad Pro 11" (landscape)| 1194 × 834     | xl    | Desktop nav reappears. 4-col footer reappears.                                   |
| MacBook 13"             | 1280 × 800     | xl    | Desktop layout intact, no regression vs main branch.                             |
| MacBook 16"             | 1536 × 960     | 2xl   | **Pixel-compare against current production**. Must match.                        |
| Desktop 1080p           | 1920 × 1080    | 2xl   | Same.                                                                            |
| Desktop 1440p           | 2560 × 1440    | 2xl   | Same. `.container` caps at 1200 px, side gutters scale via `--sp-container`.     |

For each device:
1. Scroll the entire homepage. Verify no horizontal scroll. Verify the page does not "jump" sideways.
2. Open the mobile drawer. Verify the underlying page is fully covered, body scroll is locked, drawer scroll works, ESC / X close the drawer, body scroll position is restored.
3. Open the search overlay (`/` key on desktop, search icon on mobile). Verify input is reachable and not overlapped by the close button.
4. Visit `/`, `/about`, `/programmes`, `/impact`, `/impact/evidence`, `/funding`, `/partner`, `/contact`, `/privacy`, `/terms`. Take a screenshot of each, top to bottom.
5. Run Lighthouse Mobile on `/` and `/funding`. Performance ≥ 85, Best Practices ≥ 95, Accessibility ≥ 95.

---

## 10. Phased implementation plan (Antigravity must follow this order)

**Phase 0 — branch & baseline (1 commit)**
- Create branch `responsive-fix/iveoma`.
- Commit a Percy / Chromatic / `@playwright/test` screenshot snapshot of the current production at desktop widths (1280 / 1440 / 1920) to use as the immutable visual baseline for §8.

**Phase 1 — global foundations (1 commit, low risk)**
- Edit `src/app/globals.css`:
  1. Delete the duplicate `.section-pad` and `.hero-split-grid` (§5.1.1, §5.1.2).
  2. Add `html, body { overflow-x: clip }`, `* { min-width: 0 }`, image defaults, container vars (§5.1.3, §5.1.4).
  3. Add canonical breakpoint cascade for `--sp-container` and `--sp-section` (§2).
  4. Update `.btn` padding to `clamp()` (§5.1.5).
  5. Add `.contact-grid-responsive` tablet rule (§5.1.6) and `.metric-row`/`.metric-node` rules (§5.1.7-8).
- Verify desktop pixel-identical at 1440. Smoke-test mobile.

**Phase 2 — NavBar (1 commit)**
- Refactor `src/components/NavBar.tsx` per §5.2 and §6.
- Verify safe-area, drawer scroll lock, drawer opacity, search overlay padding.
- Manual test on iPhone 14 (real device or Xcode simulator).

**Phase 3 — Hero (1 commit)**
- Refactor `src/components/HeroSection.tsx` per §5.3.
- Verify headline fits at 320px, 375px, 430px, 768px, 1024px, 1440px.

**Phase 4 — Footer (1 commit)**
- Refactor `src/components/Footer.tsx` per §5.4.

**Phase 5 — Funding page (1 commit, highest user-facing impact)**
- Refactor `src/app/funding/FundingPageClient.tsx` per §5.5.
- Verify the bank account numbers render fully on iPhone SE (320 px).

**Phase 6 — About / Impact / Programmes / Partner / Contact / Privacy / Terms (1 commit per page)**
- Apply §5.6 → §5.10 each to its own commit so a regression on one page doesn't block the others.

**Phase 7 — Shared components (1 commit)**
- `InsightsSection`, `ImpactSpotlight`, `ImpactStories`, `StatsBar`, `EvidencePageClient` per §5.11 → §5.15.

**Phase 8 — Audit pass (1 commit)**
- `grep` the codebase for the following patterns and fix any leftovers:
  - `padding: '160px` , `padding: '140px` , `padding: '0 80px` → migrate to vars
  - `fontSize: '4[0-9]px'`, `'5[0-9]px'`, `'6[0-9]px'` → migrate to `clamp()`
  - `width: '6[0-9]+px'`, `'7[0-9]+px'`, `'8[0-9]+px'` → check that `max-width` is set
  - `gridTemplateColumns: 'repeat\(3, 1fr\)'` and `'repeat\(4, 1fr\)'` → confirm a tablet collapse rule exists in the same file's `<style jsx>` block
  - `whiteSpace: 'nowrap'` → confirm it's intentional on mobile

**Phase 9 — Test matrix**
- Run §9 in full. Attach screenshots to the PR.
- Run `pnpm build` (or `npm run build`) and verify no TypeScript / ESLint errors.
- Lighthouse Mobile ≥ targets in §9.

**Phase 10 — Visual regression**
- Diff against the Phase 0 baseline at `≥1280px`. Any non-trivial diff is a blocker.
- Open the PR with the device matrix screenshots and the visual regression report.

---

## 11. Acceptance criteria (Antigravity must self-verify)

- [ ] Zero horizontal scroll on every page from 320 px to 4096 px.
- [ ] Every headline fits its container; no text is clipped at any breakpoint.
- [ ] NavBar fits the viewport at every width and respects iOS safe area.
- [ ] Mobile drawer is fully opaque, locks body scroll, and restores it on close.
- [ ] Bank account numbers in `/funding` render fully on iPhone SE (320 px).
- [ ] Footer is 1-col at `≤639px`, 2-col at `640–1023px`, 4-col at `≥1024px`.
- [ ] Pillar / Triad / Legitimacy / Stat grids are 1-col at `≤639`, 2-col at `640–1023`, 3-or-more at `≥1024`.
- [ ] No `padding: '160px 80px'` or `padding: '0 80px'` strings remain in any `*.tsx` file.
- [ ] Every `<h1>`, `<h2>`, `<h3>` inline `style` uses `clamp(...)`.
- [ ] Pixel-equivalent desktop at `≥1280px` against the Phase 0 baseline.
- [ ] `pnpm build` succeeds. `pnpm lint` succeeds.

---

## 12. Notes on what NOT to do

- Do not introduce Tailwind responsive utility classes mid-component. The codebase mixes inline styles with `<style jsx>`; mixing in Tailwind responsive prefixes will fragment the system. Stick with `<style jsx>` and CSS variables.
- Do not adopt a CSS-in-JS runtime library. Performance budget is already tight.
- Do not change Framer Motion animation parameters. Only change layout values.
- Do not introduce a new design library. The brand system in `globals.css` is the source of truth.
- Do not refactor file names, route folders, or page client components' export shape. Only edit the inline styles and the `<style jsx>` blocks.
- Do not add new fonts.
- Do not hide content on mobile to "fix" overflow. Reflow it.

---

## 13. Hand-off summary for the human reviewer

After Antigravity completes Phase 9, the reviewer should:
1. Open the deployed preview on a real iPhone and a real Android device.
2. Walk every page top to bottom, looking for clipped text or sideways scroll.
3. Open the mobile drawer and the search overlay.
4. On desktop, A/B compare against production by stacking screenshots — they should be visually identical at `≥1280px`.

If anything fails the acceptance criteria in §11, Antigravity reverts the failing phase and re-attempts, instead of patching forward. Each phase is a discrete commit — that's deliberate, so reverts are cheap.

— END OF PROMPT —
