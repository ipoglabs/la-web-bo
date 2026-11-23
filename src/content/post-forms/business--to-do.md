<!-- source: https://claude.ai/artifact/Lq7GQYy82k8ebz4i7FXqPT -->
# Business — Post Form Review To-do

Oct 26, 2026

Business has 13 subcategories. None has been reworked yet, and no Business search filter works except price — which misses every new post.

## Category-wide issues

Four problems hit every Business sub. Fixing them once covers all 13.

| Issue | Today | Fix |
| --- | --- | --- |
| Price filter misses new posts | The form saves `price`; the price filter reads `salePrice` | Save every Business price as `salePrice` (Wanted: `budgetAmount`, already read as budget in Services and Pets) |
| Only price filters | Business has no `BUSINESS_FORM_FILTERS`; every other filter in the sidebar is UI-only | Add `BUSINESS_FORM_FILTERS` in `postFilterQuery.ts`, the same pattern as Services and Pets |
| Filter and form options don't match | Most filters ask things the form never asks (Business Type, Engagement, Provider, Mode, Stage) | Each sub's review lists the fields to add or re-option so filter and form agree |
| Seed prices are wrong | The 42 seed posts kept the number off the mock label: ₹35 Lakh saved as 35, ₹1.2 Lakh as 1, "Investment: £50K" as 50 | Backfill script fixes prices and fills details from each post's mock listing, as was done for Pets |

Form layout is the same in IN, GB and SG for every Business sub; the code takes no country. The live DB forms match the code except for the Good To Know hint.

Two overlaps to keep in mind: **B2B Service** sits beside Services › Business Services, and **Freelance Contractors** beside Jobs › Freelance (one is a contractor offering, the other a job ad).

## To-do by subcategory

Each review ends with its own tick list. Tick a sub here once its form, filters and seed backfill are live.

- [x] Category-wide: save every Business price as `salePrice` and add `BUSINESS_FORM_FILTERS`
- [x] [Business For Sale / Lease](https://claude.ai/artifact/XPTT2ZGF6SR4YxwL5gzk3F) — 7 posts, 14 decisions. Add For Lease, Business Type, Turnover, Staff; fix IN Lakh prices
- [x] [B2B Service](https://claude.ai/artifact/Ru35fk8ycqv8UPYwVShVGm) — 7 posts, 11 decisions. Service Type matched to filter, Price Per, Listed By, Engagement
- [x] [Freelance Contractors](https://claude.ai/artifact/LVXt5P7CN9yTmtGKLgxKM9) — 7 posts, 9 decisions. Rate Per, Field select, Experience, Work Arrangement, IR35 (GB)
- [x] [Partnership Opportunities](https://claude.ai/artifact/5y7t4mQpR22Trz3Yijt6pw) — 7 posts, 11 decisions. Looking For, Industry, Stage, Equity; swap the Jobs filters; move the franchise seed
- [x] [Equipment & Supplies](https://claude.ai/artifact/4CnCqpYvEY92wxyb4k91hr) — 7 posts, 9 decisions. Category and Condition matched to filters, For Rent, Listed By
- [x] [Startup Support](https://claude.ai/artifact/UVAPAEUgQFLsDSbhvj7bws) — 7 posts, 9 decisions. Support Type select, Industries and Stages Served, Price Per
- [x] [Franchise Opportunities](https://claude.ai/artifact/CWm3QjpGFWwHZFMZodL3TC) — 0 posts, 8 decisions. Category select, Franchise Type, Investment filter with per-market bands
- [x] [Financial Services](https://claude.ai/artifact/CYzvbYxyfgdMYSDFZQSYMh) — 0 posts, 6 decisions. Regulator + licence required for loans, investment, insurance; Listed By
- [x] [Business Events](https://claude.ai/artifact/U37eeMA3jtFQsPeZfiGTjy) — 0 posts, 10 decisions. Event Type, Mode, Start / End Date, hide past events
- [x] [Training Opportunities](https://claude.ai/artifact/UCUk2MKkTTQkVk3jZrMYX4) — 0 posts, 9 decisions. Field select, Mode, Duration, Start Date, Certificate
- [x] [B2C Service](https://claude.ai/artifact/V1coFrcENLDvdGjrvnF28r) — 0 posts, 6 decisions. First decide keep or retire (Services covers it)
- [x] [Wanted](https://claude.ai/artifact/V4P5WboQutFUQbw5bcbSkq) — 0 posts, 4 decisions. Looking For, price filter reads Budget, Urgency matched
- [x] [Miscellaneous](https://claude.ai/artifact/PAiRpf8zpfdx9zYyGnXGfi) — 0 posts, 4 decisions. Price fix, Listed By, drop the Field filter

## Rollout order

Build the 6 subs with seed posts first, so each change can be checked against real data. Then the empty ones, after the keep-or-retire calls.

1. Category-wide price fix and `BUSINESS_FORM_FILTERS` scaffold, shipped with the first sub
2. Business For Sale / Lease and Partnership Opportunities: wrong seed prices today
3. B2B Service, Freelance Contractors, Equipment & Supplies, Startup Support
4. Franchise Opportunities (takes the moved GB seed) and Financial Services (licence rules)
5. Business Events, Training Opportunities, Wanted, Miscellaneous
6. B2C Service, only if kept

Each step follows the usual routine: tick decisions in the sub's doc, build, deploy, then run the form sync and the seed backfill.

## Status — 26 Oct 2026

All 13 subcategories are live in IN, GB and SG (commit 316fe67). The forms were synced and the 42 seed posts backfilled the same day. A check on the live site found 0 problems: every form matches the code, every filter option matches a form option, and every filter returns real posts where the sub has any.

Open follow-ups:

- [ ] Add a Business Name to the GB food franchise ad (moved from Partnership)
- [ ] B2C, Training, Events, Financial, Miscellaneous and Wanted have no posts yet; check their filters on the first real ads
- [x] Partnership ads with no Investment Amount that offer equity now show "Equity deal" (commit e0e6727, live 26 Oct)
