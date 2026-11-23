<!-- source: https://claude.ai/artifact/LUXKNsdMTNUTaBFbroBQs1 -->
# Musical Instruments — Post Form Review To-do

Oct 28, 2026

Musical Instruments has 6 subcategories and 42 live posts, 7 in each. The UK has 18, India 12 and Singapore 12; all 12 of Singapore's are word-for-word copies of India's. Every sub shared one form, Brand / Model / Condition, so the Type filter on all 6 searched a field nobody filled, and the price saved as `price` while the price filter reads `salePrice`. None of the 12 search filters was connected. This review gives each sub its own Type list (with harmonium, tabla, bansuri and sitar for India), adds the details buyers search on, and connects 23 filters.

## Status — 28 Oct 2026

All 6 subcategories are live (commit `b25f115`) and the 42 seed ads are backfilled. All 18 live forms are synced and match the code.

- [x] Code: forms, filters, filter wiring, backfill script.
- [x] Checked in code: build and lint pass; every filter option is a form option.
- [x] Backfill dry run: all 42 posts found, every value is a form option and visible, every required field is filled, and every text swap applies.
- [x] Commit and push; production deploy live.
- [x] Run the backfill: 42 ads filled; a re-run changes nothing.
- [x] Check every filter option on the database and the live site: 381 of 381 agree, 104 with ads.
- [x] Sync the 18 forms: 18 of 18 match the code; the live site serves the new forms.

## Category-wide issues

These affect every Musical Instruments subcategory. Each one is also in each subcategory's checklist.

| Issue | Before | Fix (built) |
| --- | --- | --- |
| Search filters did nothing | 12 filters across 6 subs, none connected to the database. | 23 filters, each reading the field the form saves. |
| Type never asked | Every sub filtered on a Type the shared form never asked. | A Type list per sub, required, the same in the form and the filter. |
| No Indian instruments | India's tabla and bansuri could only be "Other"; no harmonium or sitar anywhere. | Harmonium, Tabla / Dholak / Mridangam, Bansuri & Shehnai and Sitar / Veena / Sarod Types. |
| Price in the wrong field | Saved `price`; the seeds and the price filter use `salePrice`. | Every sub saves `salePrice`. |
| Condition didn't match | Filter offered New / Like New / Good / Fair; the form had 5 steps + Vintage. | Same 6 steps (Brand New to For Parts) on form and filter; Vintage dropped, as it's an age, not a condition. |
| No Delivery filter | Deal Method was asked but never searchable. | Delivery filter on every sub. |
| Seed posts were bare | None of the 42 had a type, brand or condition; Singapore's copied India's. | Backfilled from each ad's text; India's and Singapore's generic guitars get a real brand and model, and the Singapore copies a local detail. |

## To-do by subcategory

- [x] [Guitars & Bass](https://claude.ai/artifact/Tf6UGoAfoSrW3Dgj8kWpuC) — 7 posts. Type, Brand list and filter, Strings, Left-handed.
- [x] [Keyboards & Piano](https://claude.ai/artifact/QbDXqcxGwto8rk3RtR7XQD) — 7 posts. Type (adds Harmonium), Keys, Weighted.
- [x] [Drums & Percussion](https://claude.ai/artifact/VwUq7ZoSMai5nQLzLqVeVR) — 7 posts. Type (adds Tabla / Dholak), Pieces / Sizes.
- [x] [DJ & Audio Gear](https://claude.ai/artifact/6g3GUevMYRjkfoUuwTfeZu) — 7 posts. Type (adds studio kit).
- [x] [Wind, Brass & Strings](https://claude.ai/artifact/4N1NjoteRyBbk84FfYLwEw) — 7 posts. Type (adds Bansuri, Sitar), Size, Key / Pitch.
- [x] [Accessories](https://claude.ai/artifact/FRWzTRYDKv6XCg3ztEPiPa) — 7 posts. Type (adds Sheet Music), For.

## Competitor check (Gumtree, OLX, Carousell)

Checked 2026-10-28.

| Site | What it asks for musical instruments |
| --- | --- |
| [Gumtree UK — Guitars & Accessories](https://www.gumtree.com/guitars) | Split by type: Guitars 9,007 ads, Other Guitars & Accessories 2,144, Bass Amplifiers 536, Cases 279, Parts 106, Bass Effects 101. Filters: Price, Condition, Seller type, Delivery. |
| [OLX India — Musical Instruments](https://www.olx.in/batala_g4059071/musical-instruments_c714) | Filters couldn't be read. Listings include harmoniums, tablas, a dilruba and Yamaha and Cort guitars. |
| Carousell SG | Couldn't be checked directly (bot check). |

**Takeaway.** Gumtree's instrument filter is the subcategory itself (guitar vs bass vs amp), which our Type filter now matches; OLX India sellers list Indian classical instruments we had no place for.

### Recommended, built into this rework

- [x] **Type per sub**, including amps and cases (Gumtree's subcategories).
- [x] **Harmonium, tabla, bansuri, sitar** as Types (OLX India listings).
- [x] **6-step Condition** and **Delivery** filters (Gumtree).
- [x] **Left-handed** guitar filter, **Keys** on keyboards and **Size** on violins and cellos: the specs buyers can't do without.

### Not recommended

- **Separate Amps or Indian Instruments subcategories.** Changes the category picker and URLs; the Type filter covers them.
- **Seller type (private / business).** Belongs on the account, as decided for Health & Beauty.

Sources: [Gumtree Guitars & Accessories](https://www.gumtree.com/guitars), [OLX India Musical Instruments (Batala)](https://www.olx.in/batala_g4059071/musical-instruments_c714), [OLX India Musical Instruments (Malerkotla)](https://www.olx.in/malerkotla_g4059086/musical-instruments_c714).
