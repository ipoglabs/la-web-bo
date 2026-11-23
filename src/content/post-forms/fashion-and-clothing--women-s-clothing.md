<!-- source: https://claude.ai/artifact/L3FHhgpBdLstwgxfiCXQ4L -->
# Fashion & Clothing › Women's Clothing — Post Form Review

Oct 26, 2026

Women's dresses, tops, coats and bundles. As in Men's, buyers search by type and size, and today neither can be filtered. Two of the three UK ads are bundles.

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

**Posts:** 7 live. The UK has 3 (6 summer dresses in size 10 at £60, a Prada trench coat in UK 12 at £480, and 8 smart-casual pieces in size 12 at £40), India has 2 (a cropped denim jacket in S and a floral cotton dress in M), and Singapore has copies of the 2 India ads. None of them has Condition, Brand, Size or Colour filled.

**Filters:** Type (Tops & Blouses, Dresses, Skirts, Jeans & Trousers, Jackets & Coats, Activewear, Other) and Condition (Any, New with tags, Like New, Good, Fair). Neither is connected to the database. The form never asks Type.

## Field type changes

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Price | Saved as `price` | Saved as `salePrice` | The price filter reads `salePrice`, so new ads never show in a price search. |
| Size | Free text | Size select: XS / S / M / L / XL / XXL / 3XL / Mixed sizes. Plus Size Details (text), e.g. "UK 12", "EU 40". | A select can be filtered; the exact size still has a place. |
| Condition | "Brand New" first | "New with Tags" first; the rest unchanged | The term fashion buyers search for. |
| Condition filter | New with tags / Like New / Good / Fair | The form's 5 steps | The filter can never match what sellers pick today. |
| Color | US spelling | "Colour" | All three markets use British spelling. |
| Type filter | No knitwear or workwear | Adds Knitwear and Workwear & Suits | Common listings, such as the smart-casual bundle. |

## New fields to add

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Type | select | Tops & Blouses / Dresses / Skirts / Jeans & Trousers / Knitwear / Jackets & Coats / Workwear & Suits / Activewear / Other | All | Yes | Lets the Type filter work. |
| Single or Bundle | select | Single item / Bundle | All | No | 2 of the 3 UK ads are bundles. |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [x] Add Type (required) and connect the Type filter, with Knitwear and Workwear added.
- [x] Turn Size into a select with a Size filter, and add Size Details.
- [x] Add Single or Bundle.
- [x] Relabel Color as "Colour".
- [x] Use the form's 5-step Condition scale (with "New with Tags") in the filter and connect it (category-wide).
- [x] Save the price as `salePrice` so new ads show in price searches (category-wide).
- [x] Backfill Type, Size, Brand, Colour and Condition for the 7 seed posts.
