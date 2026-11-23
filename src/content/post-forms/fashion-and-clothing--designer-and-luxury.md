<!-- source: https://claude.ai/artifact/6qipEdfAQrPjqYsyKR5xkh -->
# Fashion & Clothing › Designer & Luxury — Post Form Review

Oct 26, 2026

Designer bags, coats, scarves and accessories. At these prices, buyers' first question is whether the item is genuine, and the form doesn't ask for any proof. The filters offer Brand and Category, but the form asks neither in a form they can match.

## Status — 26 Oct 2026

All 8 decisions are built and live (commit `f47796e`). The Louis Vuitton Speedy moved here from Bags & Accessories, so this subcategory now has 8 posts (4 in the UK, 2 each in India and Singapore), all backfilled. Checked on the database and the live site: every option of the Designer, Category, Proof of Authenticity and Condition filters returns exactly the matching ads, and the live form matches the code in all three markets. The price filter works too: over £500 in the UK returns only the £650 Burberry and the £680 LV.

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

**Posts:** 7 live. The UK has 3 (a Burberry trench coat at £650, a Gucci Dionysus bag at £480, and a Hermès Twilly scarf, new in box, at £95), India has 2 (an "authenticated designer handbag" with no brand named, and designer sunglasses), and Singapore has copies of the 2 India ads. None of them has a brand, condition or proof of authenticity filled.

**Filters:** Brand (Louis Vuitton, Gucci, Prada, Chanel, Hermès, Other Luxury), Category (Bag, Watch, Shoes, Clothing, Jewellery) and Condition (New, Excellent, Good, Signs of Wear). None is connected to the database. Brand is free text in the form, so it could never match.

## Field type changes

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Price | Saved as `price` | Saved as `salePrice` | The price filter reads `salePrice`, so new ads never show in a price search. |
| Brand | Free text, optional | Designer select, required: Louis Vuitton / Gucci / Prada / Chanel / Hermès / Dior / Burberry / Rolex / Cartier / Other designer. Other designer asks for the name. | Lets the Brand filter work. |
| Category filter | No accessories | Adds Accessories (scarves, sunglasses, belts) | The Hermès scarf and the sunglasses have nowhere to go today. |
| Condition filter | Its own scale: New / Excellent / Good / Signs of Wear | The form's 5 steps (with "New with Tags") | Designer had a fourth Condition scale. |
| For | Saves `male` / `female` / `unisex` | Saves `men` / `women` / `unisex` | Matches the other Fashion filters. |
| Color | US spelling | "Colour" | All three markets use British spelling. |

## New fields to add

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Category | select | Bag / Clothing / Shoes / Watch / Jewellery / Accessories | All | Yes | Lets the Category filter work. |
| Proof of Authenticity | select | Original receipt / Authenticity certificate / Authenticated by a service / No proof | All | Yes | The first thing buyers ask. Has the hint "Replicas and copies are removed." Gets its own filter. |
| What's Included | multiselect | Box / Dust bag / Receipt / Cards & papers | All | No | Adds value at resale. Every UK ad mentions it. |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [x] Add Category (required) and connect the Category filter, with Accessories added.
- [x] Make Brand a required designer select and connect the Brand filter.
- [x] Add Proof of Authenticity (required), with its filter and the replicas hint.
- [x] Add What's Included.
- [x] Save For as `men` / `women` / `unisex`, and relabel Color as "Colour".
- [x] Use the form's 5-step Condition scale (with "New with Tags") in the filter and connect it (category-wide).
- [x] Save the price as `salePrice` so new ads show in price searches (category-wide).
- [x] Backfill Category, Brand, Proof of Authenticity, What's Included and Condition for the seed posts.
