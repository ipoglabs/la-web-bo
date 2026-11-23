<!-- source: https://claude.ai/artifact/Yb7SGX5AwZFKzz3XuWXYXj -->
# Fashion & Clothing › Jewellery & Watches — Post Form Review

Oct 26, 2026

Necklaces, rings, bracelets and watches. For jewellery the metal and its purity set the value; for watches it's the movement and whether box and papers are included. The form asks none of these.

## Status — 26 Oct 2026

All 9 decisions are built and live (commit `f47796e`). Gold Purity shows only when Metal is Gold, in each market's marking (K in India, ct in the UK, 999/916 in Singapore); Movement and Box & Papers show only for watches. The 7 seed posts are backfilled. Checked on the database and the live site: every option of the Type, Metal and Condition filters returns exactly the matching ads, and the live form matches the code in all three markets.

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

**Posts:** 7 live. The UK has 3 (a 2022 Rolex Datejust 41 with box and papers at £8,200, a Pandora charm bracelet at £120, and a Tissot automatic at £295), India has 2 (a hallmarked sterling silver necklace and a men's automatic watch), and Singapore has copies of the 2 India ads. None of them has Condition, Brand, Material or For filled.

**Filters:** Type (Necklace, Earrings, Bracelet, Ring, Watch, Gold, Other) and Condition (Any, New, Like New, Good, Fair). Neither is connected to the database. "Gold" is a metal, not a type.

## Field type changes

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Price | Saved as `price` | Saved as `salePrice` | The price filter reads `salePrice`, so new ads never show in a price search. |
| Material | Free text | Metal: Gold / Silver / Platinum / Stainless Steel / Fashion / Costume / Other | The metal sets the value. Gets its own filter. |
| Type filter | Includes "Gold" | Drops Gold (now under Metal). Adds Jewellery Set. | A type and a metal are different questions. |
| For | Saves `male` / `female` / `unisex` | Saves `men` / `women` / `unisex` | Matches the other Fashion filters. |
| Condition filter | New / Like New / Good / Fair | The form's 5 steps (with "New with Tags") | The filter can never match what sellers pick today. |
| Color | US spelling | "Colour" | All three markets use British spelling. |

## New fields to add

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Type | select | Necklace / Earrings / Bracelet / Ring / Watch / Jewellery Set / Other | All | Yes | Lets the Type filter work. |
| Gold Purity | select | India: 24K / 22K / 18K / 14K (BIS hallmark). UK: 24ct / 22ct / 18ct / 14ct / 9ct. Singapore: 999 / 916 / 750 / 585. | All | No | Shown for gold. Each market's own marking. |
| Movement | select | Automatic / Quartz / Manual / Smartwatch | All | No | Shown for watches. |
| Box & Papers | select | Box and papers / Box only / Papers only / Neither | All | No | Shown for watches. A big factor in a watch's resale price. |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [x] Add Type (required, Gold moved to Metal) and connect the Type filter.
- [x] Replace Material with Metal, with a Metal filter.
- [x] Add Gold Purity in each market's marking.
- [x] Add Movement.
- [x] Add Box & Papers.
- [x] Save For as `men` / `women` / `unisex`, and relabel Color as "Colour".
- [x] Use the form's 5-step Condition scale (with "New with Tags") in the filter and connect it (category-wide).
- [x] Save the price as `salePrice` so new ads show in price searches (category-wide).
- [x] Backfill Type, Metal, Movement, Box & Papers, Brand and Condition for the 7 seed posts.
