<!-- source: https://claude.ai/artifact/2gMCoFaXejFMDh5VPFpNBi -->
# Fashion & Clothing › Vintage & Preloved — Post Form Review

Oct 26, 2026

Vintage denim, retro bags and recent preloved pieces. Vintage buyers search by era, and the Era filter is there, but the form never asks for one. Recent preloved items (like the Reiss suit) don't fit any era, and there's no Condition filter at all.

## Status — 26 Oct 2026

All 8 decisions are built and live (commit `f47796e`). The form is synced for India, the UK and Singapore, and the 7 seed posts are backfilled. Checked on the database and the live site: every option of the Era, Type and Condition filters returns exactly the matching ads, and the live form matches the code in all three markets.

## Current fields

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2,000 characters |
| 3 | Good to Know | goodToKnow | goodToKnow | No |  |
| 4 | Condition | condition | select | Yes | Brand New / Like New / Lightly Used / Well Used / Heavily Used |
| 5 | Brand | brand | text | No |  |
| 6 | Size | size | text | No |  |
| 7 | Color | color | text | No | US spelling |
| 8 | Material | material | text | No |  |
| 9 | For | gender | select | No | Men / Women / Unisex, saved as `male` / `female` / `unisex` |
| 10 | Price | price | currency | Yes | Saved as `price`, but the price filter reads `salePrice` |
| 11 | Negotiable | negotiable | select | No | Yes / No |
| 12 | Deal Method | dealMethod | multiselect | No | Meet-up / Collection, Delivery / Courier |

**Posts:** 7 live. The UK has 3 (1990s deadstock Levi's 501s at £55, an 80s Levi's trucker jacket at £45, and a Reiss suit worn once at £150), India has 2 (a 90s-style denim jacket and a retro leather satchel), and Singapore has copies of the 2 India ads. None of them has Condition, Brand, Size or For filled.

**Filters:** Era (60s / 70s, 80s, 90s, Y2K) and Type (Clothing, Shoes, Accessories, Jewellery). Neither is connected to the database, and there's no Condition filter.

## Field type changes

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Price | Saved as `price` | Saved as `salePrice` | The price filter reads `salePrice`, so new ads never show in a price search. |
| Era filter | 60s / 70s, 80s, 90s, Y2K | 1970s & Earlier / 1980s / 1990s / 2000s (Y2K) / Recent Preloved | Covers older pieces and recent preloved items like the Reiss suit. |
| Type filter | Clothing / Shoes / Accessories / Jewellery | Clothing / Shoes / Bags & Accessories / Jewellery | The satchel is a bag. |
| Size | Free text | Size select (XS–3XL / Mixed), plus Size Details, e.g. "W32 L30" | Matches Men's and Women's. |
| For | Saves `male` / `female` / `unisex` | Saves `men` / `women` / `unisex` | Matches the other Fashion filters. |
| Color | US spelling | "Colour" | All three markets use British spelling. |

## New fields to add

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Era | select | 1970s & Earlier / 1980s / 1990s / 2000s (Y2K) / Recent Preloved | All | Yes | Lets the Era filter work. |
| Type | select | Clothing / Shoes / Bags & Accessories / Jewellery | All | Yes | Lets the Type filter work. |
| Condition filter | filter | The form's 5 steps (with "New with Tags") | All | — | Every other Fashion subcategory has one. |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [x] Add Era (required) and connect the Era filter, with the new options.
- [x] Add Type (required) and connect the Type filter.
- [x] Add a Condition filter.
- [x] Turn Size into a select with Size Details.
- [x] Save For as `men` / `women` / `unisex`, and relabel Color as "Colour".
- [x] Use the form's 5-step Condition scale (with "New with Tags") (category-wide).
- [x] Save the price as `salePrice` so new ads show in price searches (category-wide).
- [x] Backfill Era, Type, Size, Brand, For and Condition for the 7 seed posts.
