<!-- source: https://claude.ai/artifact/9AAufnjuaY6Ghybch8619i -->
# Pets › Accessories — Post Form Review

Oct 23, 2026

The Accessories form is the same in IN, GB and SG. The biggest gaps: the price filter misses every new post, and none of the For Animal, Condition or Category filters works because their options don't match the form.

## Current fields

The Accessories form has 7 fields today. 4 are required: Adv Title, Adv Details, Category and Price.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2000 characters |
| 3 | Good To Know | goodToKnow | goodToKnow | No | Seller's own label / value points |
| 4 | Category | partsCategory | select | Yes | Food, Toys, Bedding, Grooming, Cage / Tank, Others |
| 5 | Brand | brand | text | No | Max 200 characters, half width |
| 6 | Condition | condition | select | No | New, Gently Used, Used |
| 7 | Price | price | currency | Yes | Min 1, half width |

There are 7 Accessories posts (IN 2, GB 3, SG 2), all seed samples with only a title and a price: crates, cat trees and an aquarium. None has a value for any detail field above.

The search offers For Animal, Condition and Category filters. None of them works today: Pets filters only on price. Category offers Food & Treats, Cage & Housing, Clothing, Toys, Health & Care, Grooming and Travel & Carry, which only partly overlap the form's 6. Condition offers New, Like New, Used and For Parts against the form's New, Gently Used, Used. The form has no For Animal at all.

## Field type changes

3 existing fields should change. The most important: Price saves to the field search reads, so the price filter works.

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Price | saved as `price` | Save as `salePrice`, the field listing prices and the price filter read | The price filter searches `salePrice`, so new posts never match it. The seed posts already use `salePrice`, so nothing needs migrating |
| Category | 6 choices, ends in "Others", key `partsCategory` | Food & Treats, Toys, Bedding, Cage & Housing, Aquarium & Tank, Clothing, Health & Care, Grooming, Travel & Carry, Other; key `accessoryCategory` | Matches the Category filter and fixes "Others". `partsCategory` is the Vehicles parts key; no post has a value, so the rename needs no migration |
| Condition | New, Gently Used, Used | New, Like New, Used | Matches the Condition filter (drop For Parts from the Pets filter) and the wording other goods forms use |

## New fields to add

Accessories can add 3 fields with no new field types.

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| For Animal | multiselect | Dog, Cat, Bird, Fish, Rabbit, Reptile, Small Animal, Other | All | Yes | The For Animal search filter has nothing to match; a crate or toy is for a specific animal |
| Size | select | Small, Medium, Large, Extra Large | All | No | Crates, beds and clothing are bought by size |
| Listed By | select | Individual, Pet Shop | All | No | Separates one-off sellers from shops |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [x] Save Price as `salePrice` so the price filter finds new posts
- [x] Category options matched to the Category filter, "Others" → "Other", key renamed to `accessoryCategory`
- [x] Condition options matched to the Condition filter
- [x] Add For Animal (required)
- [x] Add Size
- [x] Add Listed By
- [x] Wire the For Animal, Condition and Category filters (search only)
- [x] Backfill details on the 7 seed posts so the new filters have something to match

## Built — 23 Oct 2026

All 8 ticked items are live in IN, GB and SG (commit 545e34c). Where the build differs from the suggestion:

- The Category filter gained Bedding and Aquarium & Tank to match the form; Other stays form-only.
- The Condition filter drops For Parts on Pets Accessories only.
- Existing posts: the 7 seed posts got Category, For Animal and Listed By, plus Condition, Size and Brand where their mock listing gave them. Checked live: Aquarium & Tank finds the Juwel tank; Like New + Cat finds the cat tree.
