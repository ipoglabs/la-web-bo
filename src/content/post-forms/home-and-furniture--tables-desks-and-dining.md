<!-- source: https://claude.ai/artifact/357YVwGrqTMHQmGD8djGBi -->
# Home & Furniture › Tables, Desks & Dining — Post Form Review

Oct 26, 2026

Dining tables and sets, desks, coffee tables and chairs. Most listings here are a table with chairs, and the number of seats is what buyers look for first. Today the form doesn't ask it.

## Current fields

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2,000 characters |
| 3 | Good to Know | goodToKnow | goodToKnow | No |  |
| 4 | Condition | condition | select | Yes | Brand New / Like New / Lightly Used / Well Used / Heavily Used |
| 5 | Brand | brand | text | No |  |
| 6 | Material | material | text | No |  |
| 7 | Dimensions | dimensions | text | No | e.g. 180 x 90 x 75 cm |
| 8 | Price | price | currency | Yes | Saved as `price`, but the price filter reads `salePrice` |
| 9 | Negotiable | negotiable | select | No | Yes / No |
| 10 | Deal Method | dealMethod | multiselect | No | Meet-up / Collection, Delivery / Courier |

**Posts:** 7 live. The UK has 3 (a marble-effect dining table with 6 chairs at £550, an oak dining table with 6 chairs at £320, and an electric standing desk at £280), India has 2 (a 6-seater dining set and a glass coffee table), and Singapore has copies of the 2 India ads. None of them has Condition, Brand, Material or Dimensions filled.

**Filters:** Type (Dining Table, Desk, Coffee Table, Side Table, Dining Chair, Office Chair) and Condition (Any, New, Like New, Good, Fair). Neither is connected to the database. The form never asks Type.

## Field type changes

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Price | Saved as `price` | Saved as `salePrice` | The price filter reads `salePrice`, so new ads never show in a price search. |
| Type filter | No option for a table sold with chairs | Adds Dining Set (Table + Chairs) and Other | 3 of the 7 ads are dining sets. |
| Condition filter | New / Like New / Good / Fair | The form's 5 steps: Brand New … Heavily Used | The filter can never match what sellers pick today. |

## New fields to add

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Type | select | Dining Table / Dining Set (Table + Chairs) / Desk / Coffee Table / Side Table / Dining Chairs / Office Chair / Other | All | Yes | Lets the Type filter work. |
| Seats | select | 2 / 4 / 6 / 8+ | All | No | Shown for dining tables and sets. Gets its own filter. |
| Height Adjustable | select | Yes / No | All | No | Shown for desks. Standing desks are a common search. |
| Assembly | select | Assembled / Flat-packed / Needs dismantling | All | No | Large tables often need the legs taking off to move. |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [ ] Add Type (required) and connect the Type filter, with Dining Set added.
- [ ] Add Seats, with a Seats filter.
- [ ] Add Height Adjustable.
- [ ] Add Assembly.
- [ ] Use the form's 5-step Condition scale in the filter and connect it (category-wide).
- [ ] Save the price as `salePrice` so new ads show in price searches (category-wide).
- [ ] Backfill Type, Seats, Material, Dimensions and Condition for the 7 seed posts.
