<!-- source: https://claude.ai/artifact/LgwNozkGV37zzPFk5UKDes -->
# Home & Furniture › Storage & Shelving — Post Form Review

Oct 26, 2026

Bookcases, cube units, cabinets and racks: mostly flat-pack furniture, often sold several at a time. The form doesn't ask the type, whether it comes apart, or how many units are included.

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

**Posts:** 7 live. The UK has 3 (a chrome wire shelving unit at £75, an IKEA KALLAX at £60, and 3 IKEA BILLY bookcases at £95), India has 2 (a lockable 3-door cabinet and a 5-tier bookshelf), and Singapore has copies of the 2 India ads. None of them has Condition, Brand, Material or Dimensions filled, even though every UK ad gives its size.

**Filters:** Type (Bookcase / Shelf, Cabinet, Storage Box, Rack, Cubby / Cube Unit) and Condition (Any, New, Like New, Good, Fair). Neither is connected to the database. The form never asks Type.

## Field type changes

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Price | Saved as `price` | Saved as `salePrice` | The price filter reads `salePrice`, so new ads never show in a price search. |
| Type filter | No TV units or shoe racks | Adds TV Unit, Shoe Rack and Other. Cabinet becomes Cabinet & Sideboard. | Both are common listings. |
| Condition filter | New / Like New / Good / Fair | The form's 5 steps: Brand New … Heavily Used | The filter can never match what sellers pick today. |

## New fields to add

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Type | select | Bookcase & Shelving / Cube Unit / Cabinet & Sideboard / TV Unit / Shoe Rack / Rack & Utility Shelving / Storage Boxes / Other | All | Yes | Lets the Type filter work. |
| Assembly | select | Assembled / Flat-packed / Needs dismantling | All | No | Most of these are flat-pack. Buyers need to know if they must take it apart. |
| Number of Units | number |  | All | No | The 3 BILLY bookcases are sold together. |
| Colour | text | e.g. White | All | No | Every UK ad names the colour. |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [ ] Add Type (required) and connect the Type filter, with the new options.
- [ ] Add Assembly.
- [ ] Add Number of Units.
- [ ] Add Colour.
- [ ] Use the form's 5-step Condition scale in the filter and connect it (category-wide).
- [ ] Save the price as `salePrice` so new ads show in price searches (category-wide).
- [ ] Backfill Type, Brand, Dimensions, Colour and Condition for the 7 seed posts.
