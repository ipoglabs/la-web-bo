<!-- source: https://claude.ai/artifact/SF5o8Ah2jNSN2sJxYT1S8m -->
# Electronics & Tech — Post Form Review To-do

Oct 28, 2026

Electronics & Tech has 8 subcategories and 49 live posts: 7 in each, except Tech Accessories, which has none. The UK has 21, India 14 and Singapore 14; all 14 of Singapore's are word-for-word copies of India's. The form never asked the Type that 7 of the 8 subs filter on, took Brand, Storage and Screen Size as free text against fixed filter options, and saved the price as `price` while the price filter reads `salePrice`. None of the 20 search filters was connected. This review gives each sub its own Type list, picks Brand from a list on phones, laptops and cameras, and connects 31 filters.

## Status — 28 Oct 2026

All 8 subcategories are built and live (commit `6f26b1e`). The 49 seed ads are backfilled, the vinyl ad moved, and 7 Tech Accessories ads added. All 24 live forms (8 × India, UK, Singapore) are synced and match the code.

- [x] Code: forms, filters, filter wiring, backfill and seed scripts.
- [x] Checked in code: build and lint pass; every filter option is a form option.
- [x] Backfill dry run: every value is a form option and visible, every required field is filled, and every text swap applies.
- [x] Commit and push; production deploy live.
- [x] Run the backfill: 48 ads filled, the vinyl ad moved, 7 Tech Accessories ads added; a re-run changes nothing.
- [x] Check every filter option on the database and the live site: 495 of 495 agree, 143 with ads.
- [x] Sync the 24 forms: 24 of 24 match the code; the live site serves the new forms.

## Category-wide issues

These affect every Electronics & Tech subcategory. Each one is also in each subcategory's checklist.

| Issue | Before | Fix (built) |
| --- | --- | --- |
| Search filters did nothing | 20 filters across 8 subs, none connected to the database. | 31 filters, each reading the field the form saves. |
| Type never asked | 7 subs filtered on a Type the form never asked. | A Type list per sub, required, the same in the form and the filter. |
| Free text against fixed filters | Brand, Storage and Screen Size were typed in; the filters searched fixed values. | Lists on the form: Brand on phones, laptops and cameras; Storage on phones; Screen Size band on TVs. |
| Platform value mismatch | Gaming saved "PlayStation"; the filter searched "ps". | The form saves the filter's values. |
| Price in the wrong field | Saved `price`; the seeds and the price filter use `salePrice`. | Every sub saves `salePrice`. |
| Condition didn't match | Filter offered New / Like New / Good / Fair against a 6-step scale. | Same 6 steps (Brand New to For Parts) on form and filter. |
| No Delivery filter | Deal Method was asked but never searchable. | Delivery filter on every sub. |
| Seed posts were bare | None of the 49 had a type, brand or condition; India's and Singapore's were generic ("Smartphone — 128GB") and Singapore's copied India's. | Backfilled from each ad's text; generic ads get a real brand and model, and the Singapore copies a local detail. |

## To-do by subcategory

- [x] [Mobile Phones & Tablets](https://claude.ai/artifact/U5C19jUSVkjKdBae3iMAi1) — 7 posts. Type, Brand list, Storage list, Network, Battery Health.
- [x] [Laptops & Computers](https://claude.ai/artifact/Di7gKNvhE4MKr62KGUQGFM) — 7 posts. Type (adds Monitor), Brand list, specs shown by type.
- [x] [TVs & Audio](https://claude.ai/artifact/BCTjtmBjZQ5XA9vZtMUNZv) — 7 posts, 1 misfiled. Type, Screen Size band for TVs.
- [x] [Gaming](https://claude.ai/artifact/U11WgAAKtquuXiaoCmgBik) — 7 posts. Type, Platform values fixed.
- [x] [Cameras & Photography](https://claude.ai/artifact/Ryh3BPiMMqxEQQVKZcJhtW) — 7 posts. Type, Brand list and filter, Shutter Count, Lens Mount.
- [x] [Computer Parts & Components](https://claude.ai/artifact/GkpWnPErpn1w1mmpzSLyna) — 7 posts. Component, Capacity / Spec.
- [x] [Wearables & Smart Devices](https://claude.ai/artifact/YQgM5jttym74ELAPaCJ9zg) — 7 posts. Type, Size.
- [x] [Tech Accessories](https://claude.ai/artifact/X21jcZ6xXeUZ9p5cfXdTeX) — no posts. Type, Compatible With.

## Competitor check (Gumtree, OLX, Carousell)

Checked 2026-10-28.

| Site | What it asks for electronics |
| --- | --- |
| [Gumtree UK — Mobile Phones](https://www.gumtree.com/mobile-phones) | 14,865 ads. Brand is the subcategory: Apple iPhone 8,860, Samsung 3,835, Google 410, Nokia 336, Motorola 211, Honor 120, Xiaomi 107. Filters: Price, Condition, Colour, Storage Capacity, Seller type, Delivery. |
| [Gumtree UK — Computers & Software](https://www.gumtree.com/computers-software) | 34,926 ads (34,331 computers and laptops). Filters: Price, Condition, Seller type, Delivery. |
| OLX India | Couldn't be checked: its pages timed out twice. |
| Carousell SG | Couldn't be checked directly (bot check). Third-party sources say listings carry condition (Brand New to Heavily Used), brand, model, storage, and meet-up or delivery. |

**Takeaway.** Brand and storage are how people shop for phones; every site filters on Condition and Delivery, and none asks hardware specs as filters.

### Recommended, built into this rework

- [x] **Brand from a list** on phones, laptops and cameras, with a filter (Gumtree's phone subs, Carousell).
- [x] **Storage** list and filter on phones (Gumtree, Carousell).
- [x] **6-step Condition** with a filter, plus For Parts (Gumtree, Carousell).
- [x] **Delivery** filter (Gumtree, Carousell).
- [x] **Network: Unlocked** on phones, as UK buyers check it.
- [x] **Colour** on phones (Gumtree), as a form field.

### Not recommended

- **Brand as subcategories (Gumtree's way).** Changes the category picker and URLs; the Brand filter does the same job.
- **Colour filter.** Gumtree has it, but the colour is in the ad; add it later if buyers ask.
- **Seller type (private / business).** Belongs on the account, as decided for Health & Beauty.

Sources: [Gumtree Mobile Phones](https://www.gumtree.com/mobile-phones), [Gumtree Computers & Software](https://www.gumtree.com/computers-software), [Carousell seller guide](https://www.getonecart.com/how-to-sell-on-carousell/), [Carousell listing fields](https://apify.com/crawloop/carousell-scraper.md).

## Decisions for you

- [x] **Misfiled vinyl ad.** "Vinyl Record Collection — 200+ LPs" (`tech-tv-03`, UK, £825) moved to Books, Media & Collectibles › Vinyl Records.
- [x] **Empty Tech Accessories.** 7 seed ads added (3 UK, 2 India, 2 Singapore), filled in with the new form's fields.
