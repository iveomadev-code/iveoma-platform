# STRUCTURE_CHANGES.md
## Sections to remove, move, or restructure
## Updated to incorporate Esther's narrative document

---

## Section A — /impact hero layout
No structural change. Copy edit only — see CONTENT_CHANGES.md Section A.

---

## Section B — Remove the large 2,000+ display block on /impact

**Location:** The section rendering a large "2,000+" display number followed by:
> "Vulnerable women — widows and indigent women — stabilised through direct socio-economic palliatives and essential supplies during severe economic lockdowns."

**Action:** Remove this entire section block.
**Reason:** Stat already in the stats bar above. Repeating it as a display block is redundant.
**Do not move this content elsewhere.** Simply remove the block.

---

## Section C — Vault card replacements and additions

### Part 1 — Replace existing card content
Four existing vault cards need their content replaced entirely.
See CONTENT_CHANGES.md Sections C, D, E, F for exact replacement copy per card.
The card component structure (image, tag, title, location, body) stays the same.
Only the text values inside change.

### Part 2 — Add three new vault cards
Add cards for:
1. Sir & Lady Nwani Chuku Hall — Holy Rosary College (Education tag)
2. Annual Health Walk (Health Systems tag)
3. Sir Nwani & Lady Akanele Chuku Learning and Development Centre (Education tag)

See CONTENT_CHANGES.md Sections G, H, I for full content of each new card.

Use the same card component pattern already in the vault.
These cards should appear under their respective filter tags.

### Part 3 — Create Excellent Hope Hospital card
Create a new Healthcare-tagged card for Excellent Hope Hospital & Maternity.
Content is pending from the IDN team — create the card shell only.
See CONTENT_CHANGES.md Section J.

### Part 4 — Vault pagination
With new cards added, the vault will have more than 6 cards.
Ensure the existing pagination (Page 1 of 2) updates correctly to reflect the new total.

---

## Section D — Remove "Embedded in the cultural fabric" section

**Location:** Full section on /impact between Evidence Vault and CTA. Contains:
- Label: "Institutional Legitimacy"
- Heading: "Embedded in the cultural fabric."
- Subtext: "Unlike external agencies..."
- Pull quote: "Social capital is the currency of sustainable change."
- Three community blocks: Okposi Okwu · Mgbom N'Achara · Iri ji ovuru

**Action:** Remove from /impact. Replace with single anchor line — see CONTENT_CHANGES.md Section K.

**Move the three community blocks to /about.**
Place them in whichever section discusses community roots or governance.
If no suitable section exists, append before the footer CTA on /about.
Do not delete this content from the codebase — relocate it.

---

## Section E — Remove opening stats block on /impact/evidence

**Location:** Stats block at top of /impact/evidence showing:
2,000+ · 4 Strategic pillars · 3 Communities · 100% Traceable · 20+ Years active

**Action:** Remove entirely.
**Reason:** These are already on /impact. Repeating them at the top of /evidence makes the page feel like a loop.
After removal, page flows directly from hero heading into the Infrastructure Growth timeline.

---

## Section F — Remove closing stats block on /impact/evidence

**Location:** Section at the bottom of /impact/evidence above the footer.
Large "100%" display number + "Traceable impact — every intervention documented..."
Followed by: 4 Strategic pillars · 3 Autonomous communities · 20+ Years operating

**Action:** Remove this entire closing block.
**Reason:** Fourth appearance of these stats across both pages.
The CTA should follow directly after the evidence content ends.

---

## Section G — Update /impact/evidence Infrastructure Growth timeline

Add the following entries to the timeline in chronological order.
Use the same entry format already in the timeline (year · title · description):

| Year | Title | One-line description |
|---|---|---|
| 2020 | COVID-19 Community Response | Handwash basins, sanitizers, masks, and emergency cash relief deployed across Okposi and Ebonyi State during the pandemic. |
| 2021 | Sir & Lady Nwani Chuku Hall — Holy Rosary College | Assembly hall consecrated by Bishop Michael Okoro on 13 July 2021, named in honour of the founder's parents. |
| 2021–2025 | Iveoma Annual Health Walk | Five consecutive annual health walks in Okposi, growing into one of the community's most attended yearly events. |

Update existing entry:
| Year | Change |
|---|---|
| 2023 → 2024 | Dr. Nkata Nwani Chuku Medical Centre — change year to 2024 |

---

## Section H — No changes to vault filter tabs
The filter tabs (All · Education · Technology · Resilience · Healthcare · Peace-Building · Health Systems) stay as-is.
New cards are tagged using the existing tagging pattern in the codebase.

---

## Section I — No changes to navigation, footer, or any other page
Except: the three community blocks moved from /impact to /about (Section D above).
No other pages are affected.
