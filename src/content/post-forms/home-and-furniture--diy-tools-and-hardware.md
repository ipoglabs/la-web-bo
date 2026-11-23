<!-- source: https://claude.ai/artifact/Fd7xY5DqQERjaxYRSwJEfd -->
# Home & Furniture › DIY, Tools & Hardware — Post Form Review

Oct 26, 2026

Power tools, hand tools, measuring kit and building materials. For cordless tools, buyers want to know if batteries and a charger are included or if it's the bare tool only. The form asks for Material instead.

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
| 8 | Warranty | warranty | select | No | No Warranty / Under Warranty / Extended Warranty |
| 9 | Price | price | currency | Yes | Saved as `price`, but the price filter reads `salePrice` |
| 10 | Negotiable | negotiable | select | No | Yes / No |
| 11 | Deal Method | dealMethod | multiselect | No | Meet-up / Collection, Delivery / Courier |

**Posts:** 7 live. The UK has 3 (a DeWalt 18V drill and impact driver twin pack at £180, a Kärcher pressure washer at £120, and a Bosch laser level at £85), India has 2 (an 18V cordless drill and a 45-piece tool kit), and Singapore has copies of the 2 India ads. None of them has Condition, Brand or Warranty filled.

**Filters:** Type (Power Tools, Hand Tools, Plumbing, Electrical, Flooring, Paint, Other) and Condition (Any, New, Like New, Good, Fair). Neither is connected to the database. The form never asks Type.

## Field type changes

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Price | Saved as `price` | Saved as `salePrice` | The price filter reads `salePrice`, so new ads never show in a price search. |
| Material | Free text | Removed | Doesn't apply to tools. |
| Dimensions | Shown for all | Removed | Doesn't apply to most tools. Amount (below) covers materials. |
| Type filter | No measuring tools, ladders or building materials | Adds Measuring & Levelling, Ladders & Access and Building Materials. Paint becomes Paint & Decorating; Flooring becomes Flooring & Tiles. | The Bosch laser level has nowhere to go today. |
| Condition filter | New / Like New / Good / Fair | The form's 5 steps: Brand New … Heavily Used | The filter can never match what sellers pick today. |

## New fields to add

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Type | select | Power Tools / Hand Tools / Measuring & Levelling / Ladders & Access / Plumbing / Electrical / Flooring & Tiles / Paint & Decorating / Building Materials / Other | All | Yes | Lets the Type filter work. |
| Power Source | select | Corded / Cordless (Battery) / Petrol / Manual | All | No | Shown for power tools. Gets its own filter. |
| Batteries & Charger | select | Included / Tool only | All | No | Shown for cordless tools. The first question on any cordless tool. |
| Model | text | e.g. DCD796 | All | No | Buyers check the model's specs. |
| Amount | text | e.g. 12 m², 20 tiles, 5 L | All | No | Shown for flooring, paint and building materials. |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [ ] Add Type (required) and connect the Type filter, with the new options.
- [ ] Add Power Source, with a Power Source filter.
- [ ] Add Batteries & Charger.
- [ ] Add Model.
- [ ] Add Amount.
- [ ] Remove Material and Dimensions.
- [ ] Use the form's 5-step Condition scale in the filter and connect it (category-wide).
- [ ] Save the price as `salePrice` so new ads show in price searches (category-wide).
- [ ] Backfill Type, Power Source, Batteries & Charger, Brand, Model and Condition for the 7 seed posts.
