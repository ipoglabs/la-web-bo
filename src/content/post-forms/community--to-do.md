<!-- source: https://claude.ai/artifact/GNRoAfqYcLmJ8vzVx5cvQp -->
# Community — Post Form Review To-do

Oct 26, 2026

Community has 10 subcategories. None has been reworked yet, and no Community search filter works, not even price. Six subs hold the 42 seed posts (7 each); Classes, Classes & Courses, Rideshare & Carpool and Wanted are empty.

## Category-wide issues

Six problems hit every Community sub. Fixing them once covers all 10.

| Issue | Today | Fix |
| --- | --- | --- |
| No filter works | Community has no `COMMUNITY_FORM_FILTERS`; all 27 sidebar filters are UI-only | Add `COMMUNITY_FORM_FILTERS` in `postFilterQuery.ts`, the same pattern as Business and Pets |
| No price filter | `community: null` turns price off, yet Events, Classes, Courses, Child & Family and Rideshare all ask a fee | Turn price on for those five subs only; keep it off for the rest |
| Fee saved in the wrong field | The form saves `price`; seed posts and every other category use `salePrice` | Save every Community fee as `salePrice` |
| Filters ask what the form never asks | Event Type, Item Category, Cause, Announcement Type, Activity Type and more have no form field | Each sub's review lists the fields to add or re-option so filter and form agree |
| Mode values don't match | Form Mode saves `offline`; the filters ask `inperson` | One shared Format list (In Person / Online / Hybrid) for form and filters |
| Free shows as a zero price | A fee of 0 shows "£0" or "₹0" on the card; the mocks say Free, Free entry or Volunteer opportunity | Fee 0 or no fee shows "Free"; Lost & Found shows its reward or Lost / Found, as Pets does |

Form layout is the same in IN, GB and SG; the code takes no country. All 30 live DB forms match the code.

Seed posts carry only a title, a description and a price, so every detail in the mocks (dates, venues, ages, causes) is lost. Three seeds sit in the wrong place: the IN and SG "Office Carpool Group" ads belong in Rideshare & Carpool, and the GB £50 wallet reward is saved as a price.

Two overlaps to keep in mind: **Classes** and **Classes & Courses** cover nearly the same ads, and a lost or found pet belongs in Pets › Lost & Found (the IN and SG "Found Golden Retriever" seeds).

## To-do by subcategory

Each review ends with its own tick list. Tick a sub here once its form, filters and seed backfill are live.

- [x] Category-wide: save every Community fee as `salePrice`, turn price on for the five fee subs, one shared Format list, add `COMMUNITY_FORM_FILTERS`
- [x] [Lost & Found](https://claude.ai/artifact/CnVKYTQbBtAryGSQJqW8C5) — 7 posts, 8 decisions. Item Category, Reward, move the two pet seeds to Pets
- [x] [Events](https://claude.ai/artifact/5eCUb6ctEvK1EvsE1AqdL3) — 7 posts, 10 decisions. Event Type, Format, End Date, Suitable For, hide ended events
- [x] [Classes](https://claude.ai/artifact/VzSyyAhD7aE2pKd1JmVFCJ) — 0 posts, 8 decisions. Kept beside Classes & Courses; Subject select, Fee Per, Schedule
- [x] [Volunteering & Charity](https://claude.ai/artifact/6TwEHT4ExoWcZ9L8hDhcUC) — 7 posts, 10 decisions. Cause, Commitment, Skills Needed, Format, Background Check
- [x] [Classes & Courses](https://claude.ai/artifact/AWij1hopgJ8uAr9wif6aiz) — 0 posts, 8 decisions. Qualification and Duration as selects, Subject, Start Date
- [x] [Announcement](https://claude.ai/artifact/23fthJrzd3yn5Tm5pSzNr5) — 7 posts, 9 decisions. Type, Posted By, Urgency, Until Date, hide past notices
- [x] [Child & Family Activities](https://claude.ai/artifact/QCHkHSwed64Zd9bTeAtwSY) — 7 posts, 10 decisions. Age bands, Activity Type, How Often, Fee Per
- [x] [General / Others](https://claude.ai/artifact/SU14hqXK8ymx8bKyiDJkSt) — 7 posts, 7 decisions. Topic, Post Type, move 3 seeds out
- [x] [Rideshare & Carpool](https://claude.ai/artifact/K2kWMCxBstSoeBApMzUC6M) — 0 posts, 8 decisions. Route Type, Days, cost-sharing hint; takes the 2 carpool seeds
- [x] [Wanted](https://claude.ai/artifact/7mBcdo6wxtyzr5fxZf6JdZ) — 0 posts, 6 decisions. Looking For, Budget, Needed By, own filter id

## Rollout order

Build the 6 subs with seed posts first, so each change can be checked against real data. Seed moves go with the sub that receives them.

1. Category-wide fee fix, shared Format list and `COMMUNITY_FORM_FILTERS` scaffold, shipped with the first sub
2. Events and Child & Family Activities: they have fees, so they prove the price filter
3. Lost & Found (pet seeds move to Pets) and Announcement (hide past notices)
4. Volunteering & Charity and General / Others
5. Rideshare & Carpool, taking the 2 carpool seeds from General / Others
6. Classes & Courses and Wanted
7. Classes, only if kept

Each step follows the usual routine: tick decisions in the sub's doc, build, deploy, then run the form sync and the seed backfill.

## Status — 26 Oct 2026

All 10 subcategories are live in IN, GB and SG (commit 92fb2d8). All 30 forms were synced and the 42 seed posts backfilled the same day. A check on the live site found 0 problems: every form matches the code, and every filter returns the right posts where the sub has any. Cards now read Free, Volunteer, Notice, Reward £X or £X / session instead of £0.

Five seeds moved: the IN and SG carpools to Rideshare & Carpool, the IN and SG golden retrievers to Pets › Lost & Found, and the GB free soil to Free / Giveaway. Past-dated seed events and notices were moved a year on so they stay listed.

Three changes go beyond the review docs:

- Only Emergency notices can be Critical; they save it as a separate alert level, which the Urgency filter also reads
- Events gained Repeats, so weekly meetups don't drop out after their first date
- Rideshare: a cost of 0 shows "Free ride", a blank cost shows "Split costs"

Open follow-ups:

- [ ] Every Free / Giveaway card shows "£0" (not just the moved soil ad); show "Free" instead
- [ ] The moved soil ad has no Condition, which the Free / Giveaway form requires
- [ ] Classes, Classes & Courses and Wanted have no posts yet, and GB has no rideshare ads; check their filters on the first real ads
