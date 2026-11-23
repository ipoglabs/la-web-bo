<!-- source: https://claude.ai/artifact/CLHVKiaG5JBX5gFp9oP5Fp -->
# Baby & Kids — Post Form Review To-do

Oct 27, 2026

Baby & Kids has 6 subcategories and 42 live posts, 7 in each. The UK has 18, India 12 and Singapore 12; most of Singapore's are word-for-word copies of India's. The form was one shared "item" form that saved the price as `price`, while the ads and the price filter use `salePrice`, and asked Age Group as free text, so none of the 4-band Age filters could match. None of the 10 search filters was connected, and 3 of them (gear Type, Care Type, Activity) asked things the forms never did. Childcare and classes had no Price Per, and nothing on Ofsted, ECDA, background checks or first aid. This review gives each sub its own fields, connects every filter, and prices services per hour / month / session.

## Status — 27 Oct 2026

All 6 subcategories are built and pushed (commit `15eeeea`). The 18 live forms are synced and the 42 seed ads backfilled. Verified: all 18 forms match the code, and all 315 filter options give the same ads on the database and the live site (132 of them with ads).

- [x] Code: forms, filters, Price Per on cards.
- [x] Checked in code: build and lint pass; every filter option is a form option.
- [x] Backfill dry run: all 42 seed ads found, every value is a form option, every required field is filled, and all 9 Singapore text changes apply.
- [x] Sync the 18 forms.
- [x] Run the backfill.
- [x] Check every filter option on the database and the live site.

## Category-wide issues

These affect every Baby & Kids subcategory. Each one is also in each subcategory's checklist.

| Issue | Before | Fix (built) |
| --- | --- | --- |
| Search filters did nothing | 10 filters across 6 subs, none connected to the database. | 22 filters, each reading the field the form saves. |
| Filters never asked | Gear Type, Care Type and Activity were filters the forms never asked. | All asked and required. |
| Age didn't match | Age Group was free text ("3-5 years"); the filter searched 0–2 / 3–5 / 6–9 / 10+. | Age is a select with the filter's bands; services pick several. |
| Price in the wrong field | Items saved `price`; the seeds and the price filter use `salePrice`. | Every sub saves `salePrice`. |
| Service prices without a unit | "£8" an hour and "£1,618" a month looked alike. | Price Per on childcare and classes: "£8 / hr", "£5 / session". |
| Condition didn't match | Filter offered New / Used against a 4-step scale. | 5-step scale on form and filter. |
| Safety and checks not asked | Nothing on Ofsted, ECDA, DBS / police checks, first aid, or car seat history. | Asked per market; car seats ask safety standard and accident history. |
| Seed posts were bare | None of the 42 had a type, age or condition; most Singapore ads copied India's. | Backfilled from each ad's text; 9 Singapore copies get a local detail. |

## To-do by subcategory

- [x] [Toys & Games](https://claude.ai/artifact/WeiuwHDpp3ydove5iArYHN) — 7 posts. Type, Age, 5-step Condition, Complete, Delivery.
- [x] [Baby Gear & Equipment](https://claude.ai/artifact/RPc5usBVMhU4cuVbzRJpPb) — 7 posts. Type, car seat safety standard and accident history.
- [x] [Baby & Kids Clothing](https://claude.ai/artifact/DrhP6WQhQyBxDy37GM5UCb) — 7 posts. Type (Bundle first), Age, For, Condition.
- [x] [School Supplies & Books](https://claude.ai/artifact/KtRwfGU6xf4vCvbqyT5M4e) — 7 posts. Type, Age, School / Grade.
- [x] [Childcare & Nurseries](https://claude.ai/artifact/TYmoe6axHdYXcCi8r9FnhC) — 7 posts. Care Type, Ages, Hours, registration and checks per market, price per hour / month.
- [x] [Kids Classes & Activities](https://claude.ai/artifact/BWrbZQ1QuyM4dY9VPterSN) — 7 posts. Activity, Ages, Mode, Free Trial, price per session / term.

## Competitor check (OLX, Gumtree, Carousell)

Checked 2026-10-27.

| Site | What it asks for baby & kids |
| --- | --- |
| OLX India | No dedicated baby category; kids' items go under general For Sale with price and condition only. |
| Gumtree UK | Baby & Kids Stuff filters on Price, Condition, Brand, Colour, Material, Seller type and Delivery, with subs for Toys, Kids Clothes, Nursery Furniture, Prams & Strollers and Outdoor Toys. Childcare (Babysitting, Nannies, Childminders, Children's Activities) has no extra filters. |
| Carousell SG | Couldn't be checked directly (Cloudflare bot check). From other sources, Babies & Kids listings use the standard price, condition, brand and meet-up / delivery fields. |

**Takeaway.** Nobody has structured age or childcare fields. Gumtree's Brand, Condition and Delivery are what parents filter on for goods; for childcare the gap is trust (registration, checks, first aid), which no competitor asks.

### Recommended, built into this rework

- [x] **Brand** on every item sub (Gumtree).
- [x] **5-step Condition** on form and filter (Gumtree, Carousell).
- [x] **Delivery** filter and Deal Method (Gumtree, Carousell).
- [x] **Type per sub**: prams, car seats, cots; LEGO, board games; bundles, dresses (Gumtree subs).
- [x] **Age bands** as a select, matching the filter.
- [x] **Car seat** safety standard (i-Size / R44) and "never in an accident".
- [x] **Childcare checks**: Ofsted URN (UK), ECDA licence (Singapore), DBS / police verification, paediatric first aid.
- [x] **Babysitting** as a care type (Gumtree).
- [x] **Price Per** on childcare and classes; **Free Trial** and **Mode** on classes.

### Not recommended

- **Colour and Material filters.** Gumtree has them, but kids' items are mostly bundles; the description covers it.
- **Seller type (private / business).** Belongs on the account, as decided for Health & Beauty.
- **Ofsted rating lookup.** Needs the Ofsted API; the URN lets parents check it themselves.
