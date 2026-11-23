<!-- source: https://claude.ai/artifact/4HpT3bE8ESELip6mqA8M78 -->
# Home & Furniture › Garden & Outdoor — Post Form Review

Oct 26, 2026

Garden furniture, barbecues, mowers and tools, plants and planters. For power tools and barbecues, what powers them matters most, and the form doesn't ask.

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

**Posts:** 7 live. The UK has 3 (a Weber charcoal BBQ at £85, a 4-seat rattan set at £350, and a Bosch cordless mower, strimmer and blower bundle at £220), India has 2 (a set of 3 ceramic planters and a 2-seater wooden bench), and Singapore has copies of the 2 India ads. None of them has Condition, Brand, Material or Dimensions filled.

**Filters:** Type (Garden Furniture, BBQ & Grills, Gardening Tools, Plants & Seeds, Pots & Planters, Decking / Fencing) and Condition (Any, New, Like New, Good, Fair). Neither is connected to the database. The form never asks Type.

## Field type changes

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Price | Saved as `price` | Saved as `salePrice` | The price filter reads `salePrice`, so new ads never show in a price search. |
| Type filter | No mowers or power tools; no sheds | Adds Lawnmowers & Power Tools, Sheds & Storage and Other. Gardening Tools becomes Hand Tools. | The Bosch mower bundle has nowhere to go today. |
| Condition filter | New / Like New / Good / Fair | The form's 5 steps: Brand New … Heavily Used | The filter can never match what sellers pick today. |

## New fields to add

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Type | select | Garden Furniture / BBQ & Grills / Lawnmowers & Power Tools / Hand Tools / Plants & Seeds / Pots & Planters / Sheds & Storage / Decking & Fencing / Other | All | Yes | Lets the Type filter work. |
| Power Source | select | Petrol / Corded Electric / Cordless (Battery) / Manual | All | No | Shown for mowers and power tools. Gets its own filter. |
| BBQ Fuel | select | Charcoal / Gas / Electric | All | No | Shown for barbecues. |
| Seats | select | 2 / 4 / 6 / 8+ | All | No | Shown for garden furniture. |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [ ] Add Type (required) and connect the Type filter, with the new options.
- [ ] Add Power Source, with a Power Source filter.
- [ ] Add BBQ Fuel.
- [ ] Add Seats.
- [ ] Use the form's 5-step Condition scale in the filter and connect it (category-wide).
- [ ] Save the price as `salePrice` so new ads show in price searches (category-wide).
- [ ] Backfill Type, Power Source, Brand, Material and Condition for the 7 seed posts.
