<!-- source: https://claude.ai/artifact/1WL34oKXzWzRrvxYG647cp -->
# Sports & Outdoors — Post Form Review To-do

Oct 27, 2026

Sports & Outdoors has 6 subcategories and 42 live posts, 7 in each. The UK has 18, India 12 and Singapore 12; 10 of Singapore's are word-for-word copies of India's. The four gear subs shared one form that asked Type as free text ("e.g. Treadmill, Cricket Bat") and saved the price as `price`, while the ads and the price filter use `salePrice`. None of the 8 search filters was connected, and 6 of them (gym Type, Sport, Activity twice, Gender, coaching Type) asked things the forms never did. Coaching had no Price Per, so £40 a session and ₹6,000 a month looked alike. This review gives each sub its own fields, connects every filter, adds bike sizes, and prices coaching per session / hour / month.

## Status — 27 Oct 2026

All 6 subcategories are built and pushed (commit `fa42568`). The 18 live forms (6 × India, UK, Singapore) still need syncing, and the 42 seed ads backfilling.

- [x] Code: forms, filters, Price Per on coaching cards.
- [x] Checked in code: build, lint and type-check pass; every filter option is a form option.
- [x] Backfill dry run: all 42 seed ads found, every value is a form option and visible, every required field is filled, and all 10 Singapore text changes apply.
- [x] Sync the 18 forms.
- [x] Run the backfill.
- [x] Check every filter option on the database and the live site: 387 of 387 agree, 117 with ads; 18 of 18 forms match the code (28 Oct 2026).

## Category-wide issues

These affect every Sports & Outdoors subcategory. Each one is also in each subcategory's checklist.

| Issue | Before | Fix (built) |
| --- | --- | --- |
| Search filters did nothing | 8 filters across 6 subs, none connected to the database. | 24 filters, each reading the field the form saves. |
| Filters never asked | Gym Type, Sport, Activity (Outdoor and Water), Gender and coaching Type were filters the forms never asked. | All asked; Sport, Activity and Type required. |
| Type was free text | "e.g. Treadmill, Cricket Bat" typed in; the filter searched fixed values. | One Type list per sub, the same in the form and the filter. |
| Price in the wrong field | Gear saved `price`; the seeds and the price filter use `salePrice`. | Every sub saves `salePrice`. |
| Coaching prices without a unit | "£40" a session and "₹6,000" a month looked alike. | Price Per on coaching: "£40 / session", "₹6,000 / mo". |
| Condition didn't match | Filter offered New / Used against a 5-step scale. | Same 5 steps on form and filter, on every gear sub. |
| Seed posts were bare | None of the 42 had a type, sport or condition; 10 Singapore ads copied India's. | Backfilled from each ad's text; the Singapore copies get a local detail. |

## To-do by subcategory

- [x] [Fitness Equipment](https://claude.ai/artifact/DrFfCQRxwBqKD8AtTmc3zx) — 7 posts. Type list, 5-step Condition filter, Buyer Must Collect, Delivery.
- [x] [Team Sports](https://claude.ai/artifact/4TV4BENg8r2V3HCd84YT7G) — 7 posts. Sport, Type, Size, Condition.
- [x] [Outdoor & Adventure](https://claude.ai/artifact/LRt84dQwe55vPfBigBST7h) — 7 posts. Activity, Type, bike type, frame and wheel size.
- [x] [Water Sports](https://claude.ai/artifact/VYKGxHty66cRvb8VNnYGf5) — 7 posts. Activity, Type, Size, Inflatable.
- [x] [Sportswear & Footwear](https://claude.ai/artifact/Bj6SZr2bHLJ3esTD7canef) — 7 posts. For, Type, 5-step Condition filter.
- [x] [Fitness Classes & Coaching](https://claude.ai/artifact/MjEwzsLitHDwZvqt9aSnCD) — 7 posts. Type, Mode, Levels, Free Trial, price per session / hour / month.

## Competitor check (OLX, Gumtree, Carousell)

Checked 2026-10-27.

| Site | What it asks for sports & outdoors |
| --- | --- |
| OLX India | Sports & Hobbies split into Gym & Fitness, Sports Equipment and Bicycles; filters are price, and brand for bicycles. |
| Gumtree UK | Sports, Leisure & Travel has 37 subs; the biggest are Bicycles (39k ads, split by bike type: Mountain, Road, Kids, Hybrid, BMX, Folding, Gravel…), Fitness & Gym (21k), Golf (14k), Camping & Hiking (11k), Ball & Racquet Sports (10k), Water Sports (9k) and Fishing (6k). Filters: Price, Condition, Brand, Colour, Seller type, Delivery. |
| Carousell SG | Couldn't be checked directly (Cloudflare bot check). From other sources, Sports Equipment covers bicycles, fitness, golf, racket sports, camping and water sports, with price, condition, brand and meet-up / delivery. |

**Takeaway.** Bikes are the biggest sports category on Gumtree and we had no bike fields; golf and fishing are big too and had no home. Everyone filters on Condition, Brand and Delivery.

### Recommended, built into this rework

- [x] **Bike type** (Mountain / Road / Hybrid / Gravel / BMX / Folding / Electric / Kids), with a filter, plus **frame and wheel size** (Gumtree).
- [x] **Golf** as a sport, **Fishing** and **Ski & Snow** as activities (Gumtree subs).
- [x] **Rugby, Hockey, Table Tennis, Netball / Volleyball** in Sport.
- [x] **5-step Condition** with a filter on every gear sub (Gumtree, Carousell).
- [x] **Delivery** filter and Deal Method (Gumtree, Carousell).
- [x] **Brand and Model** on gear (Gumtree, OLX bicycles).
- [x] **Buyer Must Collect** for heavy gym kit.
- [x] **Mode, Levels, Free Trial and Price Per** on coaching.

### Not recommended

- **A separate Bicycles subcategory.** Worth doing given Gumtree's volume, but it changes the category picker and URLs; for now bikes live under Outdoor & Adventure with their own filter. Raise it as its own change.
- **Colour filter.** Gumtree has it, but sports buyers rarely search on it; the description covers it.
- **Seller type (private / business).** Belongs on the account, as decided for Health & Beauty.
