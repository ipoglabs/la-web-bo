<!-- source: https://claude.ai/artifact/CWm3QjpGFWwHZFMZodL3TC -->
# Business › Franchise Opportunities — Post Form Review

Oct 26, 2026

The form is the same in IN, GB and SG and is already the richest Business form. Its gaps are search: Industry is free text, there is no franchise type, and the price filter can't see Investment Required.

## Current fields

The form has 11 fields today. 5 are required: Adv Title, Adv Details, Business Name, Industry and Investment Required.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2000 characters |
| 3 | Good To Know | goodToKnow | goodToKnow | No | Seller's own label / value points |
| 4 | Business Name | company | text | Yes | Half width |
| 5 | Industry | industry | text | Yes | Half width |
| 6 | Investment Required | investmentRequired | currency | Yes | Min 1, half width |
| 7 | Franchise Fee | franchiseFee | currency | No | Min 0, half width |
| 8 | Royalty Fee | royaltyFee | number | No | Unit %, 0–100, half width |
| 9 | Existing Outlets | numberOfOutlets | number | No | 0–100,000, half width |
| 10 | Location Availability | locationAvailability | text | No | Full width |
| 11 | Training & Support | trainingSupport | textarea | No | Full width |

There are no posts here. One GB seed in Partnership Opportunities, "Food Franchise Opportunity — Proven Brand, 3 London Sites" (from £25,000), belongs in this sub.

The search offers Category (F&B, Retail, Education, Services, Fitness, Healthcare, Beauty, Other), Investment (< 50k, 50k–200k, 200k–500k, 500k+) and Type (Unit Franchise, Master Franchise, Area Dev). None of them works. The Investment bands ignore currency: 50k is £50,000 in GB but under ₹51,000 in IN, where franchises run to Lakhs and Crores.

## Field type changes

2 existing fields should change.

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Industry | free text | Category select (required): F&B, Retail, Education, Services, Fitness, Healthcare, Beauty, Other | Matches the Category search filter |
| Investment Required | `investmentRequired`, not read by search | Keep the key; the price filter and the Investment filter read it for this sub, with per-market bands | The price filter reads `salePrice`, so franchises never match |

## New fields to add

Franchise Opportunities can add 4 fields with no new field types.

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Franchise Type | multiselect | Unit Franchise, Master Franchise, Area Developer | All | Yes | Backs the Type filter; a brand often offers more than one |
| Space Required | number | IN, GB: sq ft. SG: sq m | All | No | The first fit check for a site |
| Payback Period | number | Months, 1–120 | All | No | Investors compare on it |
| Exclusive Territory | select | Yes, No | All | No | The GB seed offers territory exclusivity |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [ ] Replace Industry with a Category select (required) and wire the Category filter
- [ ] Price filter reads Investment Required for this sub
- [ ] Wire the Investment filter, with per-market bands (IN in Lakh / Crore)
- [ ] Add Franchise Type (required) and wire the Type filter
- [ ] Add Space Required
- [ ] Add Payback Period
- [ ] Add Exclusive Territory
- [ ] Move the GB food franchise seed here from Partnership Opportunities

## Built — 26 Oct 2026

All 8 items are built in IN, GB and SG (commit 316fe67). Where the build differs from the suggestion:

- Investment bands: IN shows < 10 Lakh, 10 – 50 Lakh, 50 Lakh – 1 Crore, 1 Crore+; GB and SG keep the 50k bands.
- The listing shows "Investment £25,000" in place of a price.
- The moved GB food franchise seed has no Business Name; whoever next edits it must add one. Checked on the DB: F&B + < 50k finds it.
