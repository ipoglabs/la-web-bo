<!-- source: https://claude.ai/artifact/JMMNKbDWeKdTW9T59Jdthq -->
# Home & Furniture › Sofas & Seating — Post Form Review

Oct 26, 2026

Sofas, armchairs and recliners. Buyers search by type, number of seats and covering, and need to know if a sofa will fit through the door. Today the form asks none of these, and both filters do nothing.

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

**Posts:** 7 live. The UK has 3 (a DFS corner sofa at £1,200, an IKEA KIVIK 3-seater with armchair at £650, and a John Lewis 2-seater in velvet at £290), India has 2 (a grey 3-seater and a leatherette recliner), and Singapore has copies of the 2 India ads. None of them has Condition, Brand, Material or Dimensions filled.

**Filters:** Type (Sofa, Armchair, Ottoman, Sofa Bed, Bench) and Condition (Any, New, Like New, Good, Fair). Neither is connected to the database. The form never asks Type, and the Condition values don't match the form's.

## Field type changes

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Price | Saved as `price` | Saved as `salePrice` | The price filter reads `salePrice`, so new ads never show in a price search. |
| Material | Free text | Upholstery: Fabric / Leather / Faux Leather / Velvet / Other | Buyers filter by covering; free text can't be filtered. |
| Condition filter | New / Like New / Good / Fair | The form's 5 steps: Brand New … Heavily Used | The filter can never match what sellers pick today. |
| Type filter | Sofa / Armchair / Ottoman / Sofa Bed / Bench | Adds Corner Sofa, Recliner and Other. Ottoman becomes Footstool & Ottoman. | The DFS corner sofa and the recliner have nowhere to go. |

## New fields to add

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Type | select | Sofa / Corner Sofa / Sofa Bed / Armchair / Recliner / Footstool & Ottoman / Bench / Other | All | Yes | Lets the Type filter work. |
| Seats | select | 1 / 2 / 3 / 4 / 5+ | All | No | The first thing every ad mentions. Gets its own filter. |
| Colour | text | e.g. Light grey | All | No | Every UK ad names the colour. |
| Assembly | select | Assembled / Flat-packed / Needs dismantling | All | No | Tells buyers if it will fit through their door. |
| Pet & Smoke Free Home | select | Yes / No | All | No | A common question for second-hand upholstery. |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [ ] Add Type (required) and connect the Type filter, with the new options.
- [ ] Add Seats, with a Seats filter.
- [ ] Replace Material with Upholstery, with an Upholstery filter.
- [ ] Add Colour.
- [ ] Add Assembly.
- [ ] Add Pet & Smoke Free Home.
- [ ] Use the form's 5-step Condition scale in the filter and connect it (category-wide).
- [ ] Save the price as `salePrice` so new ads show in price searches (category-wide).
- [ ] Backfill Type, Seats, Upholstery, Condition and Brand for the 7 seed posts.
