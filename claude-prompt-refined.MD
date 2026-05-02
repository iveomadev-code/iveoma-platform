# DESIGN DIRECTIVE — IVEOMA DEVELOPMENT NETWORK
## Senior Creative Direction for $500,000-Tier Institutional Platform

---

You are acting as a senior design director on retainer to a private institutional development foundation, not an NGO. You are not giving options. You are issuing a directive.

I need a **consolidated, decisive design directive** for a specific live platform built in **Next.js 16 (App Router) with Framer Motion**, styled using inline styles and global CSS variables. The implementation agent is Antigravity — an autonomous AI developer. Your output must be immediately executable, not conceptual.

---

## THE PLATFORM CONTEXT

**Iveoma Development Network** is a high-discipline development institution operating in Ebonyi State and Abuja, Nigeria. It is not a charity. It is not a startup. It is not a cause-based brand. It is a structured, evidence-based development engine that funds school facilities, deploys crisis healthcare infrastructure, builds civic digital hubs, and mobilises capital for medical centres.

Their audience is: development finance officers, international institutional partners, state-level policymakers, and high-net-worth diaspora investors. The site must command the same authority as UNDP, Brookings, or GIZ — but with African cultural identity embedded into the visual language.

### Current Technical Architecture:
- **Pages live**: Home, About, Impact (`/impact`), Programmes, Get Involved (`/get-involved`), Contact (`/contact`)
- **Impact page** features: 400vh pinned-scroll case study stack, animated metrics (AnimatedMetric), TechnicalNarrativeModal with image gallery slider, Systemic Scale data grid (ImpactCluster)
- **Design tokens in use**:
  - `--font-heading-monumental`: **Clash Display** (just applied globally)
  - `--font-body`: Aktiv Grotesk
  - `--primary`: `#1B5C8E` (Deep Authority Blue)
  - `--midnight-navy`: `#0D3A5C`
  - `--muted-gold`: `#C9A96E` (Champagne Gold accent)
  - `--ice-blue`: `#F0F5FA`
  - `--action-red`: `#E0292B`

### Current Design Strengths (Protect These):
- Pinned-scroll case study architecture with physics-based Framer Motion transitions
- Institutional stat panels (AnimatedMetric) with vertical dividers and compressed 1.1 line-height
- Technical Narrative modal with glassmorphism backdrop and evidence-based image gallery
- Champagne gold `#C9A96E` as the sole accent — surgically applied, never overused
- Systemic Scale section with ImpactCluster data grid
- Clash Display just deployed as the heading font — this must now be leveraged, not wasted

---

## THE CORE RISK THIS PLATFORM FACES

Left unchecked, this site will drift into the following failure modes:

1. **The Polished NGO Trap**: Clean layout, blue palette, gold accents, metric callouts — indistinguishable from every Nigerian development foundation site
2. **Clash Display Misuse**: Applying a high-contrast geometric font to standard stacked card layouts negates its power. It must be used at scale, with contrast, with intentional negative space
3. **Card Grid Recurrence**: Get Involved and Contact pages currently feature recognisable 3-column card grids. These undercut the architectural credibility of the Impact page
4. **Ambient Inconsistency**: The Impact page has cinematic physics-based transitions. Other pages do not. The experience is fragmented — premium in one place, functional in another
5. **Imagery Passivity**: Background images are currently used at low opacity (0.05–0.4) as texture. This is safe but timid. Authentic field documentation deserves editorial foreground placement
6. **Narrative Flatness**: The data is remarkable (2,000+ beneficiaries, 7 hospitals, 8 schools, medical centre from scratch) but is currently presented as metrics, not as architecture. The story needs to hit harder before the numbers appear

---

## DESIGN DIRECTIVE

### 1. CORE VISUAL PHILOSOPHY — 4 INVIOLABLE PRINCIPLES

**I. Institutional Evidence, Not Emotional Plea**
Every section must feel like an impact prospectus, not a campaign. Headlines state facts. Body copy provides operational context. CTAs offer partnership, not sympathy. The emotional weight comes from scale and precision — not from color or imagery alone.

**II. Typography as Architecture**
Clash Display at large scale (clamp 64px → 120px) is the primary structural element of every hero and transition section. It is not decorative — it is load-bearing. Headings must have enough air around them to feel monumental. Never stack two headings at similar sizes.

**III. Space as Institutional Authority**
Sections must breathe. Padding minimums: 160px vertical on desktop. Sections with critical data should have 240px top padding. The emptiness communicates confidence. An institution that needs to fill every pixel with content is an institution that does not trust its own story.

**IV. Motion as Evidence, Not Entertainment**
Framer Motion transitions must feel like a system revealing itself — physics-based, spring-driven, purposeful. Metrics count up when in view. Sections don't bounce or pop — they arrive with weight. The pinned-scroll case study architecture on the Impact page is the motion gold standard for this platform. Everything else should aspire to that level of intentionality.

---

### 2. LAYOUT & SPATIAL SYSTEM

**Vertical Rhythm Rule**: No two adjacent sections should share the same background tone without a structured transition. Sequence must alternate: `#FFFFFF` → `#F0F5FA` → `#0D3A5C` → `#FFFFFF`. This prevents the page from reading as a single flat scroll.

**Grid Philosophy**: The 12-column grid is the skeleton, not the box. Pull headlines outside container bounds. Allow statistics to bleed toward the edge. Use intentional asymmetry — left-weighted text + right-weighted image is standard. Subvert it deliberately at key moments (centered, monumental, isolated statements).

**Section Archetypes (in order of authority)**:
1. **Monumental Statement**: Full-width, centered, oversized Clash Display, nothing else. No subtext. No CTAs. Just the sentence.
2. **Evidence Split**: 40/60 or 60/40 horizontal split. Left: data or headline. Right: photographic field documentation. No border between them.
3. **Systemic Data Grid**: Metric rows with vertical dividers, 1.1 line-height labels, compressed spacing. Never use colored backgrounds on individual metric cells.
4. **Narrative Flow**: Body copy + pullquote + evidence footnote. No cards. No icons.

**Never Use**:
- 3-column card grids for primary content sections
- Icon + heading + paragraph card triads
- Section containers with visible borders or background fills that create "box" perception
- Hero sections where headline + subtext + button appear as a vertically stacked column with equal spacing between them

---

### 3. VISUAL LANGUAGE — EXECUTION SPECIFICATIONS

**Typography**

| Role | Font | Size | Weight | Treatment |
|------|------|------|--------|-----------|
| Hero H1 | Clash Display | clamp(64px, 10vw, 128px) | 600–700 | No letter-spacing. Tight line-height: 0.95–1.0 |
| Section H2 | Clash Display | clamp(40px, 5vw, 72px) | 600 | Line-height: 1.0–1.1. Max-width: 700px |
| Sub-section H3 | Clash Display | 22–28px | 500 | Used sparingly. Never stacked |
| Eyebrow label | Aktiv Grotesk | 11px | 700 | UPPERCASE. 0.14em letter-spacing. Gold `#C9A96E` |
| Body narrative | Aktiv Grotesk | 17–20px | 400 | Line-height: 1.5. Max-width: 640px |
| Modal body | Aktiv Grotesk | 16–17px | 400 | Line-height: 1.4 (already implemented) |
| Metric value | Clash Display | 56–80px | 700 | No decoration |

**Color Behaviour** (not palette — how it is used)

- `#0D3A5C` (Midnight Navy): Reserved for the two highest-authority sections only — the Hero and the Institutional Legitimacy/CTA section. Do not use it for cards, stats, or utility sections.
- `#1B5C8E` (Deep Blue): Primary text on white/ice-blue backgrounds. All H2 headings. Never use as a fill color on large surface areas.
- `#C9A96E` (Champagne Gold): Eyebrow labels, active metric states, evidence bullet markers, CTA underline on hover. Maximum 3 uses per viewport. No gradients.
- `#F0F5FA` (Ice Blue): The institutional "pause" background. Use between high-density sections for decompression.
- `#FFFFFF`: The primary surface. Most of the site. Restraint is the luxury.

**Image Treatment**

Authentic field documentation only. Three application modes:
1. **Editorial Foreground**: 16:9 or 3:2 crop, full-width or 60% column. No overlay. No opacity reduction. The image speaks for itself.
2. **Atmospheric Background**: `mix-blend-mode: overlay` at opacity 0.3–0.5 over a dark scrim. Used in the Institutional Legitimacy section (already implemented). Never used to fill content sections.
3. **Gallery Evidence**: Inside the TechnicalNarrativeModal only. Cinematic slide transition (already implemented). Keep.

Never apply stock-style lifestyle imagery. Never use images as decorative background fills on white sections.

---

### 4. MOTION PHILOSOPHY — FRAMER MOTION SPECIFICATION

The motion system has one rule: **motion reveals, it does not entertain**.

**Spring configuration** (already in use — maintain this):
```js
{ type: 'spring', stiffness: 80, damping: 20 }
```

**Entry Transitions**: `y: 20 → 0, opacity: 0 → 1`. Delay increases by 0.1s per staggered sibling. Never exceed 0.4s delay for above-fold content.

**The Pinned Scroll Stack** (Impact page): This is the design benchmark. One case study at a time, driven by scroll progress. Do not simplify it. Do not collapse it on mobile — instead reduce the sticky height and allow vertical stacking.

**What to Remove**:
- `whileHover: scale > 1.02` on any text or card — it reads as startup-era delight
- Bounce easing (`stiffness > 200`) on any reveal animation
- Opacity-only transitions that have no spatial component

**What to Add** (on existing pages):
- Parallax drift on hero background gradients (already on Impact page — replicate across Contact and Get Involved hero sections)
- Stagger entrance for the office cards on Contact page
- `useInView` with `once: true, margin: "-80px"` for all below-fold section entrances

---

### 5. ANTI-TEMPLATE ENFORCEMENT — NON-NEGOTIABLE

| ❌ NEVER DO THIS | ✅ DO THIS INSTEAD |
|---|---|
| 3-column feature card grid | Asymmetric evidence split with single featured stat and body copy |
| Icon + title + 2-line paragraph card | Full-width narrative paragraph with an inset pullquote |
| "Donate Now" primary CTA | "Explore Partnership" / "Submit Inquiry" / "Review Our Model" |
| Background image at 5–10% opacity as decorative texture | Full editorial image in foreground with structural composition |
| Repeated section heading pattern: Eyebrow → H2 → Para → CTA | Vary the entry: sometimes just the H2. Sometimes just the metric. Sometimes just the image. |
| Equal-height card rows | Intentionally irregular row heights. Let content dictate height. |
| Generic gradient (blue to white, top to bottom) | Color shifts via background-color change between sections, not gradients |
| Animation on every element | Reserved animation — most elements are static. Motion marks moments of significance. |
| Clash Display at body size | Clash Display only at headline scale. Body copy in Aktiv Grotesk always. |

---

### 6. PAGE-SPECIFIC DIRECTIVES

**Impact Page** (highest priority — most advanced)
- Already architecturally strong. Protect the pinned case study stack.
- The hero paragraph is now condensed correctly. The data strip beneath it (2000+, 8 Schools, 7 Hospitals) must maintain extreme typographic contrast against the dark hero — check that Clash Display is loading correctly at those metric values.
- The Systemic Scale section (ImpactCluster grid) must not be touched — it is working. Ensure the `1px` vertical dividers between stat and label are preserved.

**Get Involved Page** (needs elevation)
- The 3-column EngagementCard grid must be redesigned. Replace with a vertical, alternating split-layout: Left column with headline + body copy, right column with a field image or data pullout. Stagger the splits left/right for each pillar.
- The inquiry form is appropriately restrained. Increase the surrounding negative space — current padding of 64px inside the card is correct, but the outer section needs 200px vertical padding to breathe.

**Contact Page** (needs elevation)
- The Office Cards (Ebonyi, Abuja) should not feel like hotel location cards. Redesign as a horizontal data manifest: city name in large Clash Display, with address/contact details in a tight column beside it. Full-width, no card borders.
- The dark section with the contact form is the correct call. Increase the glassmorphism intensity on the form container — `backdrop-filter: blur(20px)` and `background: rgba(255,255,255,0.04)`.

**NavBar**: Already strong. Ensure Clash Display does not apply to the nav links — those should stay in Aktiv Grotesk at 11px uppercase for navigation precision. Clash Display in the nav would be too heavy.

---

### 7. ANTIGRAVITY-SPECIFIC EXECUTION NOTES

When implementing this directive, Antigravity must:

1. **Think in sections, not components.** Each section is a chapter. It must have one narrative purpose. Do not combine two ideas in one section.

2. **Clash Display needs space.** Every time you place a Clash Display headline, verify that there is at minimum 80px of breathing room above and below it. If it is touching another element at less than 40px, it is wrong.

3. **Do not default to grid.** When a section needs to present 3 items, consider whether they can be presented as a sequence (stacked vertically with varying indentation) rather than a grid. The grid is the default. The sequence is the editorial choice.

4. **Validate every background fill.** If you are placing a section on `#F0F5FA`, the previous section must not also be on `#F0F5FA`. Enforce alternation.

5. **Metrics are not decorative.** When rendering AnimatedMetric, the number is the headline. The label is the body copy. They are not equal. The number should be at minimum 3x the visual weight of the label.

6. **Never add icons to replace prose.** The current icon usage in Get Involved (Handshake, Zap, Globe) is already a weakness. They are permissible, but they must not be the primary visual element of their section. Replace or subordinate.

7. **The modal is the deepest layer.** TechnicalNarrativeModal is the most premium experience on the platform. It should feel like entering an executive reading room. Protect its whitespace, its image gallery, and its typographic hierarchy.

---

**Tone of this directive**: Decided. Non-negotiable. There is one right answer for each of these decisions. Find it and build it.

The platform must leave every visitor — whether a development finance officer in London or a community leader in Agunabani — with the absolute certainty that Iveoma knows what it is doing, and that working with it is the most structurally sound decision they will make.
