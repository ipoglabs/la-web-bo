<!-- source: https://claude.ai/artifact/Giyjsa1bVzVef5CqzV28qR -->
# Fashion & Clothing › Traditional & Ethnic Wear — Post Form Review

Oct 26, 2026

Sarees, kurtas, lehengas, abayas, kebayas and more. What's worn differs a lot between markets: the UK ads include an abaya and a Nigerian agbada, which the Type filter has no option for. Most pieces are bought for an occasion, which the form doesn't ask.

## Status — 26 Oct 2026

All 8 decisions are built and live (commit `f47796e`). The form is synced for India, the UK and Singapore, each with its own Type list, and the 7 seed posts are backfilled (the Singapore ones now mention Deepavali and Little India). Checked on the database and the live site: every option of the Type, For, Occasion and Condition filters returns exactly the matching ads in each market, and the live form matches the code.

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

**Posts:** 7 live. The UK has 3 (a Kanjivaram silk saree at £85, a Nigerian agbada set at £45, and an embroidered abaya at £65), India has 2 (a Banarasi silk saree and a men's kurta pyjama set), and Singapore has copies of the 2 India ads. None of them has Condition, Size, Colour or For filled.

**Filters:** Type (Saree, Kurta / Salwar, Lehenga, Sherwani, Kebaya, Cheongsam, Other), Gender (Any, Women, Men, Kids) and Condition (Any, New with tags, Like New, Good, Fair). None is connected to the database. Gender searches `women` / `men` / `kids`, but the form saves `female` / `male`.

## Field type changes

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Price | Saved as `price` | Saved as `salePrice` | The price filter reads `salePrice`, so new ads never show in a price search. |
| For | Saves `male` / `female` / `unisex`; no Kids | Saves `men` / `women` / `kids`, labelled "For" in the filter too | Matches the filter. Kids' festive wear is common. |
| Type filter | Same list everywhere; no abaya or African wear | India: Saree / Kurta & Salwar / Lehenga / Sherwani / Other. UK: adds Abaya and African Wear. Singapore: Saree / Kurta & Salwar / Kebaya / Baju Kurung / Cheongsam / Other. | Each market's own traditional wear. |
| Material | "Material" | "Fabric" (e.g. Banarasi silk) | The word sellers use for sarees and kurtas. |
| Size | Free text | Size select: XS–3XL / Free Size / Mixed sizes, plus Size Details | Sarees are "free size". |
| Condition filter | New with tags / Like New / Good / Fair | The form's 5 steps (with "New with Tags") | The filter can never match what sellers pick today. |
| Color | US spelling | "Colour" | All three markets use British spelling. |

## New fields to add

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Type | select | Each market's list (see above) | All | Yes | Lets the Type filter work. |
| Occasion | select | Wedding / Festive / Party / Everyday | All | No | Most pieces are bought for an occasion. Gets its own filter. |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [x] Add Type (required) with each market's list, and connect the Type filter.
- [x] Save For as `men` / `women` / `kids` and connect the For filter.
- [x] Add Occasion, with an Occasion filter.
- [x] Relabel Material as "Fabric" and Color as "Colour".
- [x] Turn Size into a select (with Free Size), and add Size Details.
- [x] Use the form's 5-step Condition scale (with "New with Tags") in the filter and connect it (category-wide).
- [x] Save the price as `salePrice` so new ads show in price searches (category-wide).
- [x] Backfill Type, For, Occasion, Fabric, Size and Condition for the 7 seed posts.
