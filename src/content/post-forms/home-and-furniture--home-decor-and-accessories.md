<!-- source: https://claude.ai/artifact/SvMCyxkJ5HwC2posSt522k -->
# Home & Furniture › Home Decor & Accessories — Post Form Review

Oct 26, 2026

Wall art, lamps, rugs, mirrors and ornaments. Decor is often sold in pairs or sets, and the form doesn't ask the type or whether it's a set. The search filters also spell the subcategory differently ("Décor") from the category picker.

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

**Posts:** 7 live. The UK has 3 (a large abstract canvas at £120, 3 botanical framed prints at £45, and a pair of rewired brass lamps at £85), India has 2 (a set of 3 canvas prints and a ceramic table lamp), and Singapore has copies of the 2 India ads. None of them has Condition, Brand, Material or Dimensions filled. 3 of the 7 are pairs or sets.

**Filters:** Type (Rugs & Carpets, Curtains & Blinds, Wall Art, Mirrors, Cushions & Throws, Lighting, Plants & Pots, Other) and Condition (Any, New, Like New, Good, Fair). Neither is connected to the database. The form never asks Type.

## Field type changes

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Price | Saved as `price` | Saved as `salePrice` | The price filter reads `salePrice`, so new ads never show in a price search. |
| Subcategory name in filters | "Home Décor & Accessories" | "Home Decor & Accessories" | Matches the category picker. |
| Type filter | No vases, clocks or festive decor | Adds Vases & Ornaments, Clocks and Festive & Seasonal. Plants & Pots becomes Indoor Plants & Pots. | Festive decor (Diwali lights, Christmas decorations) is a big seasonal seller. Garden plants live in Garden & Outdoor. |
| Condition filter | New / Like New / Good / Fair | The form's 5 steps: Brand New … Heavily Used | The filter can never match what sellers pick today. |

## New fields to add

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Type | select | Rugs & Carpets / Curtains & Blinds / Wall Art & Prints / Mirrors / Cushions & Throws / Lamps & Lighting / Vases & Ornaments / Clocks / Indoor Plants & Pots / Festive & Seasonal / Other | All | Yes | Lets the Type filter work. |
| Sold As | select | Single / Pair / Set | All | No | 3 of the 7 ads are pairs or sets. |
| Colour | text | e.g. Ochre & teal | All | No | Decor is chosen to match a room. |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [ ] Add Type (required) and connect the Type filter, with the new options.
- [ ] Add Sold As.
- [ ] Add Colour.
- [ ] Spell the subcategory "Home Decor & Accessories" in the filters.
- [ ] Use the form's 5-step Condition scale in the filter and connect it (category-wide).
- [ ] Save the price as `salePrice` so new ads show in price searches (category-wide).
- [ ] Backfill Type, Sold As, Dimensions and Condition for the 7 seed posts.
