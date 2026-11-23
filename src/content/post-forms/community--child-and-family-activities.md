<!-- source: https://claude.ai/artifact/QCHkHSwed64Zd9bTeAtwSY -->
# Community › Child & Family Activities — Post Form Review

Oct 26, 2026

Child & Family asks a date, a free-text age group and a fee. The sidebar filters on activity type, fixed age bands, cost and format; only cost has anything to read, and it isn't wired.

## Current fields

The form is the same in IN, GB and SG.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Title | `name` | text | Yes |  |
| 2 | Description | `description` | richtext | Yes |  |
| 3 | Good To Know | `goodToKnow` | goodToKnow | No |  |
| 4 | Date | `startDate` | date | No |  |
| 5 | Age Group | `ageGroup` | text | No | e.g. 5-10 years; saved in attributes |
| 6 | Fee | `price` | currency | No | Min 0 |

7 seed posts (IN 2, GB 3, SG 2): playgroups, an after-school art club, parent support groups and a babysitting exchange. GB fees (£2, £12) are right but saved as `salePrice`; the rest show "£0" or "₹0". Most are weekly, so a single Date doesn't fit them. The GB mocks list days, time, venue, ages and booking; none of it is saved.

The sidebar has 4 filters: Activity Type (Playdate, Classes, Sports, Arts & Crafts, Educational, Camps, Cultural, Birthday, Other), Age Group (Baby 0–2, 3–5, 6–9, 10–12, Teen), Cost (Free, Paid) and Format (In Person, Online). None does anything today.

The babysitting exchange is an unpaid swap between parents. Paid childcare belongs in Services, which asks about checks and experience.

## Field type changes

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Age Group | text | multiselect: Baby 0–2, 3–5, 6–9, 10–12, Teen, Parents | Matches the filter; an art club for 5–11 spans two bands; parent groups have no child age |
| Date | One date | Keep as Start Date, plus How Often (below) | Weekly groups need a pattern, not a day |
| Fee | Saved as `price` | Saved as `salePrice` | Turns the price filter on |

## New fields to add

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Activity Type | select | Playgroup / Playdate, Classes, Sports, Arts & Crafts, Educational, Camps, Cultural, Birthday, Support Group, Other | All | Yes | Matches the filter; Support Group added for 3 of the 7 seeds |
| How Often | select | One-off, Weekly, Monthly, Several dates | All | No | Most seeds are weekly |
| Time | text | e.g. Tues & Thurs 10–12 | All | No | Every GB mock gives one |
| Format | select | In Person, Online | All | Yes | Matches the Format filter |
| Booking Needed | select | Yes, No | All | No | Two GB mocks say no booking |
| Fee Per | select | Session, Term, Month | All | No | "£12" alone doesn't say per what |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [ ] Age Group becomes a multiselect, matched to the filter, with Parents added
- [ ] Add Activity Type, with Support Group added to form and filter
- [ ] Add How Often and Time
- [ ] Add Format
- [ ] Add Booking Needed
- [ ] Save Fee as `salePrice`, add Fee Per, turn the price filter on
- [ ] Cost filter reads Fee; card shows "Free" when it is 0 or blank
- [ ] Hint under the title: paid childcare goes in Services
- [ ] Wire all 4 filters
- [ ] Backfill the 7 seeds from the mocks
