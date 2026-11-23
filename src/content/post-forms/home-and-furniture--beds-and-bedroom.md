<!-- source: https://claude.ai/artifact/Pw2dNCkx718oKY32Xyria1 -->
# Home & Furniture › Beds & Bedroom — Post Form Review

Oct 26, 2026

Beds, mattresses, wardrobes and drawers. Bed size is the deciding detail, and every market names sizes differently. The Bed Size filter today only has UK sizes, so India's two queen-size ads could never match it.

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

**Posts:** 7 live. The UK has 3 (a superking ottoman bed at £280, an IKEA PAX wardrobe at £350, and an oak chest of drawers at £195), India has 2 (a queen-size storage bed frame and a queen memory foam mattress), and Singapore has copies of the 2 India ads. None of them has Condition, Brand, Material or Dimensions filled.

**Filters:** Bed Size (Single, Double, King, Super King), Item Type (Bed Frame, Mattress, Wardrobe, Chest / Drawers, Bedside Table) and Condition (Any, New, Like New, Good, Fair). None is connected to the database. The form asks neither Bed Size nor Item Type.

## Field type changes

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Price | Saved as `price` | Saved as `salePrice` | The price filter reads `salePrice`, so new ads never show in a price search. |
| Bed Size filter | Single / Double / King / Super King everywhere | UK: Single / Small Double / Double / King / Super King. India: Single / Double / Queen / King. Singapore: Single / Super Single / Queen / King. | Each market's own sizes. India and Singapore sell queen beds. |
| Item Type filter | No combined bed + mattress; no dressing table | Adds Bed with Mattress, Dressing Table and Other | Common listings with nowhere to go today. |
| Condition filter | New / Like New / Good / Fair | The form's 5 steps: Brand New … Heavily Used | The filter can never match what sellers pick today. |

## New fields to add

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Item Type | select | Bed Frame / Mattress / Bed with Mattress / Wardrobe / Chest of Drawers / Bedside Table / Dressing Table / Other | All | Yes | Lets the Item Type filter work. |
| Bed Size | select | Each market's sizes (see above) | All | Yes, for beds and mattresses | Only shown for beds and mattresses. Lets the Bed Size filter work. |
| Mattress Type | select | Memory Foam / Pocket Sprung / Latex / Coir / Other | All (Coir in India only) | No | Shown for mattresses. Coir is common in India. |
| Storage Bed | select | Yes / No | All | No | Shown for bed frames. Ottoman and drawer beds are a common search. |
| Assembly | select | Assembled / Flat-packed / Needs dismantling | All | No | Wardrobes and beds often need taking apart to move. |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [ ] Add Item Type (required) and connect the Item Type filter, with the new options.
- [ ] Add Bed Size with each market's sizes, and connect the Bed Size filter.
- [ ] Add Mattress Type.
- [ ] Add Storage Bed.
- [ ] Add Assembly.
- [ ] Use the form's 5-step Condition scale in the filter and connect it (category-wide).
- [ ] Save the price as `salePrice` so new ads show in price searches (category-wide).
- [ ] Backfill Item Type, Bed Size, Condition and Brand for the 7 seed posts.
