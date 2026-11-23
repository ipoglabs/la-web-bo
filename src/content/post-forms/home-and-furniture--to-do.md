<!-- source: https://claude.ai/artifact/AGbrRFhfiaZmqPjWkUpS68 -->
# Home & Furniture — Post Form Review To-do

Oct 26, 2026

Home & Furniture has 8 subcategories and 56 live posts: 3 in the UK and 2 each in India and Singapore per subcategory. All 8 use the same form: Condition, Brand, Material and Dimensions, plus Warranty for Kitchen & Appliances and DIY. After that come Price, Negotiable and Deal Method. Each subcategory has its own review below. Tick the decisions you want built, then say "build all".

## Status — 26 Oct 2026

All 8 subcategories are live (commit 104350f), with every decision built. The 24 forms are synced and the 56 seed posts are backfilled. Checks:

- Every post has its required fields, and every saved value is one the form offers.
- All 420 filter options return the right posts, both on the database and on the live site.
- The forms now save the price as `salePrice`, so new ads show up in price searches.

Open follow-up:

- The other 10 marketplace categories (Baby & Kids, Books, Electronics & Tech, Fashion, Food & Dining, Health & Beauty, Musical Instruments, Sports, Tickets, Travel) still save the price as `price`, so their new ads still miss price searches. The fix is the same one-line change in each form.

## Category-wide issues

These affect every Home & Furniture subcategory. They are in each subcategory's Decisions list too, so ticking them in any one doc counts.

| Issue | Today | Fix |
| --- | --- | --- |
| Price filter misses new ads | The form saves the price as `price`, but the price filter reads `salePrice`. The 56 seed posts use `salePrice`, so they filter fine, but any ad posted through the form would never show up in a price search. | The form saves `salePrice`, as Services does since its rework. No posts need moving: none has `price` today. |
| Search filters do nothing | There are 17 filters across the 8 subcategories (Type, Item Type, Bed Size and Condition), but none of them are connected to the database. Checked live: Sofas & Seating with Type = Sofa or Condition = Fair still returns all 3 UK posts. | Connect every filter to the field the form saves, as we did for Free & Giveaway. |
| Condition doesn't match | The form asks Brand New / Like New / Lightly Used / Well Used / Heavily Used. The filters offer New / Like New / Good / Fair, with different values (`like_new` instead of `like-new`). | Use the form's 5-step scale in the filters. |
| Type is never asked | Every subcategory has a Type filter (and Beds has Bed Size), but the form never asks for either. | Add Type to every form, plus the details each subcategory needs (see each doc). |
| Same fields everywhere | Material shows for fridges and drills, and Dimensions for cushions. Nothing asks about seats, bed size, energy rating or power source. | Give each subcategory its own fields. |
| Seed posts are bare | None of the 56 posts has Condition, Brand, Material, Dimensions or Deal Method filled. The details are only in the text. | Backfill these from each ad's own text. |
| India and Singapore posts are copies | India and Singapore have the same 16 ads, word for word, with only the price converted. | The backfill gives Singapore its own local details (HDB, delivery, areas) without changing the items. |
| Big items need delivery info | Deal Method offers Meet-up / Collection or Delivery / Courier, but for a sofa or wardrobe buyers also need to know if it comes apart and whether it's on an upper floor. | Add Assembly (Assembled / Flat-packed / Needs dismantling) to the furniture subcategories. |
| Name mismatch | The search filters say "Home Décor & Accessories"; the category picker says "Home Decor & Accessories". | Use "Home Decor & Accessories" everywhere. |

## To-do by subcategory

- [x] [Sofas & Seating](https://claude.ai/artifact/JMMNKbDWeKdTW9T59Jdthq) — 7 posts, 9 decisions. Type, Seats, Upholstery instead of Material, Colour, Assembly, Pet & Smoke Free Home.
- [x] [Beds & Bedroom](https://claude.ai/artifact/Pw2dNCkx718oKY32Xyria1) — 7 posts, 8 decisions. Item Type, Bed Size in each market's sizes (adds Queen and Super Single), Mattress Type, Storage Bed.
- [x] [Tables, Desks & Dining](https://claude.ai/artifact/357YVwGrqTMHQmGD8djGBi) — 7 posts, 7 decisions. Type with Dining Set, Seats, Height Adjustable, Assembly.
- [x] [Kitchen & Appliances](https://claude.ai/artifact/7Pj89JaqpoQf1xo6pCYJJk) — 7 posts, 8 decisions. Type (adds AC, water purifier), Model, Energy Rating in each market's terms, Capacity; Material removed.
- [x] [Storage & Shelving](https://claude.ai/artifact/LgwNozkGV37zzPFk5UKDes) — 7 posts, 7 decisions. Type, Assembly, Number of Units, Colour.
- [x] [Home Decor & Accessories](https://claude.ai/artifact/SvMCyxkJ5HwC2posSt522k) — 7 posts, 7 decisions. Type (adds Festive & Seasonal), Sold As, Colour, "Decor" spelling.
- [x] [Garden & Outdoor](https://claude.ai/artifact/4HpT3bE8ESELip6mqA8M78) — 7 posts, 7 decisions. Type (adds mowers and sheds), Power Source, BBQ Fuel, Seats.
- [x] [DIY, Tools & Hardware](https://claude.ai/artifact/Fd7xY5DqQERjaxYRSwJEfd) — 7 posts, 9 decisions. Type, Power Source, Batteries & Charger, Model, Amount; Material and Dimensions removed.

## Rollout order

1. Category-wide first: save the price as `salePrice` and use the 5-step Condition scale in the filters. Both touch every subcategory.
2. Beds & Bedroom and Kitchen & Appliances: the per-market fields (Bed Size, Energy Rating).
3. Sofas & Seating, Tables, Desks & Dining, and Storage & Shelving: the furniture fields (Type, Seats, Assembly).
4. Home Decor, Garden & Outdoor, and DIY.
5. Seed backfill (including the Singapore details), then check every filter live.

Same routine as Free & Giveaway: build all, commit and push, deploy, sync the 24 forms, run the backfill, then check every subcategory on the DB and the live site.
