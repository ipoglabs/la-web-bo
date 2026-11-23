<!-- source: https://claude.ai/artifact/HAmQMMd3EKQQDDU1xzgsaZ -->
# Free & Giveaway › Kids Items — Post Form Review

Oct 26, 2026

Outgrown toys, books, pushchairs and highchairs. Parents search by item and by their child's age. The filters offer both, but the form asks neither.

## Current fields

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2,000 characters |
| 3 | Good to Know | goodToKnow | goodToKnow | No |  |
| 4 | Condition | condition | select | Yes | Brand New / Like New / Lightly Used / Well Used / Heavily Used |
| 5 | Pickup Availability | availability | text | No | Placeholder "e.g. Weekday evenings" |

**Posts:** 7 live. India has 2 (a toys bundle and a stroller), the UK has 3 (a Chicco highchair, a Mountain Buggy pushchair with flat tyres, and 50+ picture books for ages 3–7), and Singapore has copies of the 2 India ads. None of them has Condition or Pickup Availability filled.

**Filters:** Item Type (Clothing, Toys, Gear, Books, Other), Age Group (0–2, 3–5, 6–12, 12+ yrs) and Condition (Any, Good, Fair). None is connected to the database. The form asks only Condition, and with different values.

## Field type changes

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Condition filter | Any / Good / Fair | The form's 5 steps: Brand New … Heavily Used | The filter can never match what sellers pick today. |
| Item Type filter | "Gear" | UK: "Pushchairs & Gear". India and Singapore: "Strollers & Gear". Adds Nursery & Feeding. | Clearer, and in each market's own words. The highchair has a clear home. |
| Pickup Availability label | "Pickup Availability" everywhere | UK: "Collection Times". India and Singapore: "Pickup Times" | "Collection" is the UK word. |

## New fields to add

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Item Type | select | Toys & Games / Pushchairs (UK) or Strollers (India, Singapore) & Gear / Nursery & Feeding / Books / Clothing / Other | All | Yes | Lets the Item Type filter work. Has the hint "Car seats: only if it has never been in an accident." |
| Age Group | multiselect | 0–2 / 3–5 / 6–12 / 12+ yrs | All | No | Lets the Age Group filter work. A bundle can span ages. |
| Must Go By | date |  | All | No | The ad is hidden once the date passes. |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [ ] Add Item Type (required, with the car-seat hint) and connect the Item Type filter.
- [ ] Add Age Group and connect the Age Group filter.
- [ ] Use the form's 5-step Condition scale in the filter and connect it.
- [ ] Use each market's word for pushchairs or strollers, and add Nursery & Feeding.
- [ ] Add Must Go By and hide the ad once it passes.
- [ ] Relabel Pickup Availability (UK "Collection Times", India and Singapore "Pickup Times").
- [ ] Show "Free" on cards instead of "£0" (category-wide).
- [ ] Backfill Item Type, Age Group, Condition and pickup times for the 7 seed posts.
