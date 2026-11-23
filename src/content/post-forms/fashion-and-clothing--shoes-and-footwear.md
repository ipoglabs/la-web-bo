<!-- source: https://claude.ai/artifact/CyqCDxQfmWVnQpvPg6ZZQf -->
# Fashion & Clothing › Shoes & Footwear — Post Form Review

Oct 26, 2026

Trainers, heels, formal shoes and boots. Shoe size is the one detail every buyer filters on, and each market uses its own size system. Today Size is free text and there's no size filter.

## Status — 26 Oct 2026

All 8 decisions are built and live (commit `f47796e`). Shoe Size is UK 3–13 in the UK, UK / India 3–12 in India and EU 35–46 in Singapore; the Singapore seed ads now give EU sizes. The 7 seed posts are backfilled. Checked on the database and the live site: every option of the For, Type, Shoe Size and Condition filters returns exactly the matching ads in each market, and the live form matches the code.

One gap: the Manolo Blahnik heels are EU 38.5, and the list has no half sizes, so they have no Shoe Size (the exact size is in Size Details) and don't show under a Shoe Size filter.

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

**Posts:** 7 live. The UK has 3 (Air Jordan 1s in UK 9 at £220, Manolo Blahnik pumps in EU 38.5 at £280, and New Balance 990v5s in UK 8 at £65), India has 2 (black leather formal shoes in size 9 and white unisex sneakers in size 8), and Singapore has copies of the 2 India ads. None of them has Condition, Brand, Size or For filled.

**Filters:** Gender (Any, Men, Women, Kids), Type (Trainers / Sneakers, Boots, Heels, Sandals, Formal, Slippers) and Condition (Any, New, Like New, Good, Fair). None is connected to the database. Gender searches `men` / `women`, but the form saves `male` / `female`.

## Field type changes

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Price | Saved as `price` | Saved as `salePrice` | The price filter reads `salePrice`, so new ads never show in a price search. |
| For | Saves `male` / `female` / `unisex`; optional | Saves `men` / `women` / `kids` / `unisex`; required | Matches the filter. Shoe sizes depend on who they're for. |
| Size | Free text | Shoe Size select in each market's system: UK 3–13 in the UK, UK / India 3–12 in India, EU 35–46 in Singapore. Plus Size Details (text) for half sizes or other systems. | Each market's own sizes, and a filter can use them. |
| Type filter | No flats or sports shoes | Adds Flats & Loafers, Sports Shoes and Other | Common listings. |
| Condition filter | New / Like New / Good / Fair | The form's 5 steps (with "New with Tags") | The filter can never match what sellers pick today. |
| Color | US spelling | "Colour" | All three markets use British spelling. |

## New fields to add

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Type | select | Trainers & Sneakers / Boots / Heels / Flats & Loafers / Sandals / Formal / Sports Shoes / Slippers / Other | All | Yes | Lets the Type filter work. |
| Original Box | select | Yes / No | All | No | Matters for trainers and designer shoes; 2 UK ads mention it. |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [x] Add Type (required) and connect the Type filter, with the new options.
- [x] Save For as `men` / `women` / `kids` / `unisex`, make it required, and connect the For filter.
- [x] Add Shoe Size in each market's system, with a Shoe Size filter, plus Size Details.
- [x] Add Original Box.
- [x] Relabel Color as "Colour".
- [x] Use the form's 5-step Condition scale (with "New with Tags") in the filter and connect it (category-wide).
- [x] Save the price as `salePrice` so new ads show in price searches (category-wide).
- [x] Backfill Type, For, Shoe Size, Brand and Condition for the 7 seed posts.
