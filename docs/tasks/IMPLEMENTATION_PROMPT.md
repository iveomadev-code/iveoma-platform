# Iveoma Development Network — Impact Page Implementation
## Prompt for Antigravity IDE

---

## Project Context

Next.js application on Vercel at `iveoma-platform-kwt1.vercel.app`.
You are making targeted edits to two pages only:
- `/impact` — main Impact page
- `/impact/evidence` — Evidence sub-page

Read all three supporting documents before touching any code:
- `CONTENT_CHANGES.md` — exact copy for every text change, new card, and replacement
- `STRUCTURE_CHANGES.md` — what to remove, move, add, and restructure
- `DATA_CORRECTIONS.md` — factual corrections to dates, stats, and labels

---

## Full Change List

### /impact page — 9 changes

| # | Change | Reference |
|---|---|---|
| 1 | Rewrite hero tagline | CONTENT_CHANGES A |
| 2 | Edit stats bar — remove 2 stats, reword 1 | CONTENT_CHANGES B |
| 3 | Remove large 2,000+ display block | STRUCTURE_CHANGES B |
| 4 | Replace Education vault card content entirely | CONTENT_CHANGES C |
| 5 | Replace Health Systems vault card content entirely | CONTENT_CHANGES D |
| 6 | Replace Healthcare (Veritas) vault card content | CONTENT_CHANGES E |
| 7 | Review Resilience card for overlap — see note | CONTENT_CHANGES F |
| 8 | Add 3 new vault cards (Holy Rosary, Health Walk, Learning Centre) | CONTENT_CHANGES G H I |
| 9 | Create Excellent Hope Hospital card shell (Healthcare) | CONTENT_CHANGES J |
| 10 | Remove "Embedded in cultural fabric" section → move to /about | STRUCTURE_CHANGES D |
| 11 | Replace removed section with single anchor line | CONTENT_CHANGES K |

### /impact/evidence page — 5 changes

| # | Change | Reference |
|---|---|---|
| 1 | Remove opening stats block | STRUCTURE_CHANGES E |
| 2 | Rewrite hero subheading | CONTENT_CHANGES L |
| 3 | Add 3 new timeline entries | STRUCTURE_CHANGES G |
| 4 | Fix Veritas date 2023 → 2024 | DATA_CORRECTIONS C |
| 5 | Fix "20+ Years" stat card | CONTENT_CHANGES M + DATA_CORRECTIONS D |
| 6 | Remove closing stats block | STRUCTURE_CHANGES F |

### /about page — 1 change

| # | Change | Reference |
|---|---|---|
| 1 | Receive the 3 community blocks moved from /impact | STRUCTURE_CHANGES D |

---

## Critical Rules

- Use COVID-19 everywhere the 2020 crisis response is described. Never use Ebola. See DATA_CORRECTIONS A.
- Do not change any component names, file structure, routing, or styling.
- Do not alter navigation, footer, or any page not listed above.
- Preserve all existing images, links, and vault filter functionality.
- The Excellent Hope Hospital card body text is pending — create the shell only, leave body as a code comment placeholder.
- The three pull quotes in the new card content are IDN editorial voice — do not attribute to named individuals.
- Do not add new dependencies.

---

## Definition of Done

All changes implemented. Both pages render without errors. No unlisted content has been removed. The /about page contains the three community blocks. The vault shows all new cards under the correct filter tags.
