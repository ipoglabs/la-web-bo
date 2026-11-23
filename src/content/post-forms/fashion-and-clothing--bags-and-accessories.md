<!-- source: https://claude.ai/artifact/1LD1QNESbxViAVM5N27t51 -->
# Fashion & Clothing › Bags & Accessories — Post Form Review

Oct 26, 2026

Handbags, backpacks, wallets, belts, sunglasses and scarves. Buyers choose by bag type and material (leather or not). The form asks neither in a way that can be filtered.

## Status — 26 Oct 2026

All 8 decisions are built and live (commit `f47796e`). The Louis Vuitton Speedy has moved to Designer & Luxury, so this subcategory now has 6 posts (2 in each market), all backfilled. Checked on the database and the live site: every option of the Type, Material and Condition filters returns exactly the matching ads, and the live form matches the code in all three markets.

## Current fields

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2,000 characters |
| 3 | Good to Know | goodToKnow | goodToKnow | No |  |
| 4 | Condition | condition | select | Yes | Brand New / Like New / Lightly Used / Well Used / Heavily Used |
| 5 | Brand | brand | text | No |  |
| 6 | Color | color | text | No | US spelling |
| 7 | Material | material | text | No |  |
| 8 | For | gender | select | No | Men / Women / Unisex, saved as `male` / `female` / `unisex` |
| 9 | Price | price | currency | Yes | Saved as `price`, but the price filter reads `salePrice` |
| 10 | Negotiable | negotiable | select | No | Yes / No |
| 11 | Deal Method | dealMethod | multiselect | No | Meet-up / Collection, Delivery / Courier |

**Posts:** 7 live. The UK has 3 (a Louis Vuitton Speedy 30 at £680, a Mulberry Bayswater tote at £295, and an Eastpak backpack at £45), India has 2 (a tan leather handbag and a 40 L travel backpack), and Singapore has copies of the 2 India ads. None of them has Condition, Brand, Material or For filled. The Louis Vuitton bag would fit better in Designer & Luxury.

**Filters:** Type (Handbag, Backpack, Wallet, Belt, Sunglasses, Scarf / Hat, Other) and Condition (Any, New, Like New, Good, Fair). Neither is connected to the database. The form never asks Type.

## Field type changes

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Price | Saved as `price` | Saved as `salePrice` | The price filter reads `salePrice`, so new ads never show in a price search. |
| Material | Free text | Select: Leather / Faux Leather / Canvas / Nylon & Fabric / Other | Leather vs not is a key filter. |
| For | Saves `male` / `female` / `unisex` | Saves `men` / `women` / `unisex` | Matches the other Fashion filters. |
| Type filter | One "Handbag" option; no totes, crossbody bags or luggage | Handbag / Shoulder & Crossbody / Tote / Backpack / Wallets & Purses / Luggage & Travel Bags / Belts / Sunglasses / Scarves & Hats / Other | The tote and the travel backpack have clearer homes. |
| Condition filter | New / Like New / Good / Fair | The form's 5 steps (with "New with Tags") | The filter can never match what sellers pick today. |
| Color | US spelling | "Colour" | All three markets use British spelling. |

## New fields to add

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Type | select | See the Type filter above | All | Yes | Lets the Type filter work. |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [x] Add Type (required) and connect the Type filter, with the new options.
- [x] Turn Material into a select, with a Material filter.
- [x] Save For as `men` / `women` / `unisex`.
- [x] Move the Louis Vuitton seed ad to Designer & Luxury.
- [x] Relabel Color as "Colour".
- [x] Use the form's 5-step Condition scale (with "New with Tags") in the filter and connect it (category-wide).
- [x] Save the price as `salePrice` so new ads show in price searches (category-wide).
- [x] Backfill Type, Material, Brand, Colour and Condition for the seed posts.
