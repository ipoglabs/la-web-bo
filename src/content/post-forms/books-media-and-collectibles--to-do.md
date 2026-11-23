<!-- source: https://claude.ai/artifact/99Ubv8sRakRqnY6r5T1ZMd -->
# Books, Media & Collectibles — Post Form Review To-do

Oct 28, 2026

Books, Media & Collectibles has 5 subcategories and 36 posts: the UK has 16, India 10 and Singapore 10, and all 10 of Singapore's are word-for-word copies of India's. Every sub shared one form, Condition plus a free-text Genre or Era, and the price saved as `price` while the price filter reads `salePrice`. None of the 11 search filters was connected. This review gives each sub its own form, grades vinyl on the Goldmine scale, and connects 21 filters.

## Status — 28 Oct 2026

All 5 subcategories are live (commit e6b5d5b) and the 36 seed ads are backfilled. All 15 live forms are synced and match the code.

- [x] Code: forms, filters, filter wiring, backfill script.
- [x] Checked in code: build and lint pass; every filter option is a form option.
- [x] Backfill dry run: all 34 posts found, every value is a form option and visible, every required field is filled, and every text swap applies; the 2 turntables fit the TVs & Audio form.
- [x] Commit and push (e6b5d5b, backfill fix 53661cc); production deploy live.
- [x] Run the backfill: 34 ads filled and 2 moved; a re-run changes nothing. (First run wrote Number of Items top-level, which the Post model drops; fixed to save it under attributes, as the form does.)
- [x] Check every filter option on the database and the live site: 258 of 258 agree, 97 with ads.
- [x] Sync the 15 forms: 15 of 15 match the code; the live site serves the new forms.

## Category-wide issues

These affect every Books, Media & Collectibles subcategory. Each one is also in each subcategory's checklist.

| Issue | Before | Fix (built) |
| --- | --- | --- |
| Search filters did nothing | 11 filters across 5 subs, none connected to the database. | 21 filters, each reading the field the form saves. |
| Genre and Type were free text | Books, vinyl and DVDs typed a Genre; games and collectibles never asked a Type. | A list per sub, required, the same in the form and the filter. |
| Vinyl graded like furniture | Condition on the general scale; filter offered Mint / Good / Fair. | Goldmine grades (Mint to G), record and sleeve. |
| Price in the wrong field | Saved `price`; the seeds and the price filter use `salePrice`. | Every sub saves `salePrice`. |
| Condition didn't match | Filter offered New / Like New / Good / Fair (and Complete / Incomplete on games); the form had 5 steps + Collectible. | Same 5 steps (Brand New to Heavily Used) on form and filter; Collectible dropped, as it's a kind of item, not a condition. |
| No Delivery filter | Deal Method was asked but never searchable. | Delivery filter on every sub. |
| Misfiled ads | India's and Singapore's "Vintage Turntable" sat in Vinyl Records. | Moved to Electronics & Tech › TVs & Audio as Hi-Fi. |
| Seed posts were bare | None of the 36 had a genre, format or condition; Singapore's copied India's. | Backfilled from each ad's text; the Singapore copies get a local detail. |

## To-do by subcategory

- [x] [Books & Comics](https://claude.ai/artifact/S6vNtFVNased5iTdSyJmpt) — 7 posts. Type list (adds Manga), Format, Language, Number of Items.
- [x] [Vinyl Records](https://claude.ai/artifact/ArbWuFRJN3TgWjZ6HLbnEd) — 6 posts after the moves. Genre list, Format, Pressing, Goldmine grades.
- [x] [DVDs & Blu-ray](https://claude.ai/artifact/KzoXExejD9CuienheZDtnL) — 7 posts. Format, Genre list (adds TV Series).
- [x] [Board Games & Puzzles](https://claude.ai/artifact/4L3abdvXnBoH6PhcrCRmnV) — 7 posts. Type, Players, Pieces, All Pieces Included.
- [x] [Collectibles & Memorabilia](https://claude.ai/artifact/7MdiKbBLPist1u1dNniTVh) — 7 posts. Type (adds Trading Cards, LEGO), Certificate.

## Competitor check (Gumtree, Discogs)

Checked 2026-10-28.

| Site | What it asks |
| --- | --- |
| [Gumtree UK — Books, Comics & Magazines](https://www.gumtree.com/books-comics-magazines) | Split by type: Books 27,269 ads, Comics 1,437, Magazines 1,399, Audio Books 175. Filters: Price, Condition, Seller type, Delivery. |
| [Goldmine grading guide](https://www.goldminemag.com/collector-resources/record-grading-101) | The record-trade standard (also Discogs'): Mint, Near Mint, VG+, VG, G+, G, Fair, Poor, record and sleeve graded separately. |

**Takeaway.** Gumtree splits books by kind, which our Type list now matches; record buyers expect Goldmine grades, which the vinyl form now uses.

### Recommended, built into this rework

- [x] **Type or Genre list per sub**, including Comics and Manga (Gumtree's split).
- [x] **Goldmine Record and Sleeve Grade** for vinyl.
- [x] **Condition** and **Delivery** filters (Gumtree).
- [x] **All Pieces Included** for games and **Certificate** for signed items: what second-hand buyers ask first.

### Not recommended

- **Separate Magazines or Audio Books subcategories.** Changes the category picker and URLs; Other covers them until there are ads.
- **Seller type (private / business).** Belongs on the account, as decided for Health & Beauty.
