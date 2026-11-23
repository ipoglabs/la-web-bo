<!-- source: https://claude.ai/artifact/4CnCqpYvEY92wxyb4k91hr -->
# Business › Equipment & Supplies — Post Form Review

Oct 26, 2026

The form is the same in IN, GB and SG. The biggest gaps: Item Category and Condition use different options from their filters, there is no For Rent option, and the price filter misses every new post.

## Current fields

The form has 9 fields today. 3 are required: Adv Title, Adv Details and Price.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2000 characters |
| 3 | Good To Know | goodToKnow | goodToKnow | No | Seller's own label / value points |
| 4 | Item Category | itemCategory | select | No | Machinery, Tools, Office Supplies, Construction Equipment, Other |
| 5 | Condition | condition | select | No | New, Used, Refurbished |
| 6 | Brand | brand | text | No | Half width |
| 7 | Model | model | text | No | Half width |
| 8 | Quantity | quantity | number | No | Min 1, half width |
| 9 | Price | price | currency | Yes | Min 1, half width |

There are 7 posts (IN 2, GB 3, SG 2), all seed samples with only a title and a price. One IN price is wrong: ₹1.2 Lakh was saved as 1. The GB photocopier seed is a lease at £65 / month, which the form can't say.

The search offers Action (For Sale, For Rent, Wanted), Category (Industrial, Office, Kitchen & F&B, Medical & Lab, Construction, IT & Tech, Retail, Other) and Condition (New, Like New, Used, For Parts). None of them works. Category and Item Category share only Other; Condition shares New and Used.

## Field type changes

3 existing fields should change. The most important: Price saves to the field search reads, so the price filter works.

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Price | saved as `price` | Save as `salePrice`, plus Price Per when For Rent: Per day, Per week, Per month | The price filter searches `salePrice`; the lease seed is per month |
| Item Category | 5 options | Industrial, Office, Kitchen & F&B, Medical & Lab, Construction, IT & Tech, Retail, Other (required) | Matches the Category search filter; both kitchen seeds have no category today |
| Condition | 3 options | New, Like New, Used, Refurbished, For Parts; add Refurbished to the filter too | Matches the Condition search filter |

## New fields to add

Equipment & Supplies can add 4 fields with no new field types.

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Listing Type | select | For Sale, For Rent / Lease | All | Yes | Backs the Action filter. Wanted ads go to Business › Wanted, so the filter drops its Wanted option |
| Listed By | select | Private, Dealer | All | Yes | Clearance lots and dealers price very differently |
| Collection / Delivery | select | Collection only, Delivery available, Delivery & installation | All | No | Every seed states collection terms |
| Warranty | select | Yes, No | All | No | Common question on new and refurbished stock |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [ ] Save Price as `salePrice` so the price filter finds new posts
- [ ] Add Price Per when Listing Type is For Rent
- [ ] Item Category options matched to the Category filter (required)
- [ ] Condition options matched to the Condition filter (add Refurbished to the filter)
- [ ] Add Listing Type (required), wire the Action filter and drop its Wanted option
- [ ] Add Listed By (required)
- [ ] Add Collection / Delivery
- [ ] Add Warranty
- [ ] Backfill the 7 seed posts: fix the ₹1.2 Lakh price and fill category, condition and brand from their mock listings

## Built — 26 Oct 2026

All 9 items are built in IN, GB and SG (commit 316fe67). The Action filter now offers For Sale and For Rent; Condition adds Refurbished.

- Existing posts: all 7 seeds got Listing Type, Listed By, Category and Condition where known; the ₹1.2 Lakh price is fixed. Checked on the DB: For Rent finds the GB photocopier lease; Refurbished + Kitchen finds the 2 kitchen sets.
