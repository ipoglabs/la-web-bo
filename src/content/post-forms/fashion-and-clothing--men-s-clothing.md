<!-- source: https://claude.ai/artifact/U47n5Rga69q3cGKDh9nX69 -->
# Fashion & Clothing › Men's Clothing — Post Form Review

Oct 26, 2026

Men's shirts, jeans, jackets, suits and bundles. Buyers search by type and size first. Today Size is free text and Type isn't asked, so neither can be filtered, and both filters do nothing.

## Status — 26 Oct 2026

All 7 decisions are built and live (commit `f47796e`). The form is synced for India, the UK and Singapore, and the 7 seed posts are backfilled. Checked on the database and the live site: every option of the Type, Size and Condition filters returns exactly the matching ads, and the live form matches the code in all three markets.

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
| 9 | Price | price | currency | Yes | Saved as `price`, but the price filter reads `salePrice` |
| 10 | Negotiable | negotiable | select | No | Yes / No |
| 11 | Deal Method | dealMethod | multiselect | No | Meet-up / Collection, Delivery / Courier |

**Posts:** 7 live. The UK has 3 (a bundle of 5 Ted Baker shirts at £75, a Canada Goose parka at £550, and an Arc'teryx hoody at £55), India has 2 (new slim jeans, size 32, and a navy blazer, size 40), and Singapore has copies of the 2 India ads. None of them has Condition, Brand, Size or Colour filled.

**Filters:** Type (T-Shirts & Tops, Shirts, Jeans & Trousers, Jackets & Coats, Suits & Formal, Sportswear, Other) and Condition (Any, New with tags, Like New, Good, Fair). Neither is connected to the database. The form never asks Type, and the Condition values don't match the form's.

## Field type changes

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Price | Saved as `price` | Saved as `salePrice` | The price filter reads `salePrice`, so new ads never show in a price search. |
| Size | Free text | Size select: XS / S / M / L / XL / XXL / 3XL / Mixed sizes. Plus Size Details (text) for the exact fit, e.g. "40R", "W32 L30". | A select can be filtered; the exact fit still has a place. |
| Condition | "Brand New" first | "New with Tags" first; the rest unchanged | The term fashion buyers search for. The values stay the same. |
| Condition filter | New with tags / Like New / Good / Fair | The form's 5 steps | The filter can never match what sellers pick today. |
| Color | US spelling | "Colour" | All three markets use British spelling. |
| Type filter | No knitwear or shorts | Adds Knitwear and Shorts. Suits & Formal becomes Suits & Blazers. | Jumpers and sweaters are common listings. |

## New fields to add

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Type | select | T-Shirts & Tops / Shirts / Knitwear / Jeans & Trousers / Shorts / Jackets & Coats / Suits & Blazers / Sportswear / Other | All | Yes | Lets the Type filter work. |
| Single or Bundle | select | Single item / Bundle | All | No | The Ted Baker ad is a bundle of 5 shirts. |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [x] Add Type (required) and connect the Type filter, with Knitwear and Shorts added.
- [x] Turn Size into a select with a Size filter, and add Size Details.
- [x] Add Single or Bundle.
- [x] Relabel Color as "Colour".
- [x] Use the form's 5-step Condition scale (with "New with Tags") in the filter and connect it (category-wide).
- [x] Save the price as `salePrice` so new ads show in price searches (category-wide).
- [x] Backfill Type, Size, Brand, Colour and Condition for the 7 seed posts.
