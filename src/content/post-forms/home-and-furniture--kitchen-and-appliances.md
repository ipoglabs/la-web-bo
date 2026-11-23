<!-- source: https://claude.ai/artifact/7Pj89JaqpoQf1xo6pCYJJk -->
# Home & Furniture › Kitchen & Appliances — Post Form Review

Oct 26, 2026

Fridges, washing machines, ovens, air conditioners and small kitchen appliances. Buyers care about the type, model, size and running costs. The form asks for Material instead, and both filters do nothing.

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

**Posts:** 7 live. The UK has 3 (a KitchenAid stand mixer at £320, a Nespresso Vertuo at £95, and an Instant air fryer oven, new in box, at £110), India has 2 (a 300 L double-door fridge and a 25 L convection microwave), and Singapore has copies of the 2 India ads. None of them has Condition, Brand or Warranty filled.

**Filters:** Type (Fridge / Freezer, Washing Machine, Dishwasher, Microwave / Oven, Hob / Cooker, Vacuum / Air Purifier, Small Appliances) and Condition (Any, New, Like New, Good, Fair). Neither is connected to the database. The form never asks Type.

## Field type changes

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Price | Saved as `price` | Saved as `salePrice` | The price filter reads `salePrice`, so new ads never show in a price search. |
| Material | Free text | Removed | Doesn't apply to appliances. |
| Type filter | No air conditioners, dryers, water purifiers or cookware | Adds Tumble Dryer, Air Conditioner, Water Purifier (India and Singapore), Cookware & Kitchenware and Other | Air conditioners and water purifiers are big sellers in India and Singapore. |
| Condition filter | New / Like New / Good / Fair | The form's 5 steps: Brand New … Heavily Used | The filter can never match what sellers pick today. |

## New fields to add

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Type | select | Fridge & Freezer / Washing Machine / Tumble Dryer / Dishwasher / Microwave & Oven / Hob & Cooker / Air Conditioner / Water Purifier / Vacuum & Air Purifier / Small Kitchen Appliances / Cookware & Kitchenware / Other | All (Water Purifier not in the UK) | Yes | Lets the Type filter work. |
| Model | text | e.g. Artisan 5KSM175 | All | No | Buyers look up the model's specs and reviews. |
| Energy Rating | select | UK: A–G. India: 1–5 Star (BEE). Singapore: 1–5 Ticks (NEA). | All | No | Shown for large appliances (fridges, washers, dryers, dishwashers, air conditioners). Each market's own label. |
| Capacity | text | e.g. 300 L, 8 kg, 1.5 ton | All | No | Fridge litres, washer kilos, AC tonnage: the main spec for large appliances. |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [ ] Add Type (required) and connect the Type filter, with the new options.
- [ ] Add Model.
- [ ] Add Energy Rating in each market's own terms.
- [ ] Add Capacity.
- [ ] Remove Material.
- [ ] Use the form's 5-step Condition scale in the filter and connect it (category-wide).
- [ ] Save the price as `salePrice` so new ads show in price searches (category-wide).
- [ ] Backfill Type, Brand, Model, Capacity and Condition for the 7 seed posts.
