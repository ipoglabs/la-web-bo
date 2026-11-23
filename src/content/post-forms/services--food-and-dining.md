<!-- source: https://claude.ai/artifact/Y8ibyXZEJiuoLJcBdzgLt8 -->
# Services › Food & Dining — Post Form Review

Oct 22, 2026

The Food & Dining form is the same in IN, GB and SG. The biggest gaps: Restaurant and Cloud Kitchen belong to the Food & Dining category, not a service, and neither the Service nor the For Event filter works.

## Current fields

The Food & Dining form has 8 fields today. 3 are required: Adv Title, Adv Details and Price.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2000 characters |
| 3 | Good To Know | goodToKnow | goodToKnow | No | Seller's own label / value points |
| 4 | Service Type | serviceType | select | No | Home Cooked, Tiffin, Catering, Restaurant, Cloud Kitchen |
| 5 | Cuisine Type | cuisineType | text | No | Max 200 characters, half width |
| 6 | Price | price | currency | Yes | Min 1, half width |
| 7 | Dietary Options | dietaryOptions | multiselect | No | Vegetarian, Vegan, Non-Vegetarian, Halal, Jain, Gluten-Free |
| 8 | Delivery Available | deliveryAvailable | select | No | Yes, No |

There are 7 Food & Dining posts (IN 2, GB 3, SG 2), all seed samples with only a title and a price. None has a value for any detail field above. One real user post ("Home cook", pending) was saved before the DB form with subcategory "Food & Dining" and no country, so no Services search shows it.

The search offers Service and For Event filters. Neither works today: Service Type (Home Cooked, Tiffin, Catering, Restaurant, Cloud Kitchen) differs from the filter (Catering, Personal Chef, Meal Prep, Baking, Bartending), and the form has no events.

## Field type changes

5 existing fields should change. The most important: Price saves to the field search reads, so the price filter works.

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Price | saved as `price` | Save as `salePrice`, the field listing prices and the price filter read | The price filter searches `salePrice`, so new posts never match it. The seed posts already use `salePrice`, so nothing needs migrating |
| Service Type | Home Cooked, Tiffin, Catering, Restaurant, Cloud Kitchen | Required select: Home Cooked Meals, Tiffin / Meal Subscription (GB, SG: Meal Prep), Catering, Personal Chef, Baking & Cakes, Bartending, Other | Matches the Service search filter. Restaurants and cloud kitchens are listed in the Food & Dining category |
| Cuisine Type | free text | Cuisine tags, max 5 | Most cooks offer several cuisines |
| Dietary Options | same 6 everywhere | IN: Vegetarian, Vegan, Non-Vegetarian, Jain, Eggless, Gluten-Free · GB and SG: Vegetarian, Vegan, Halal, Gluten-Free, Dairy-Free, Nut-Free | Jain and Eggless matter in IN; allergens matter in GB and SG |
| Delivery Available | Yes, No | Delivery / Pickup select: Delivery, Pickup, Both | Says how the customer gets the food |

## New fields to add

Food & Dining can add 4 fields with no new field types.

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Occasions | multiselect | Daily Meals, Wedding, Corporate, Birthday, Party | All | No | The For Event search filter has nothing to match today |
| Price Per | select | Per plate / person, Per meal, Per month, Per order | All | No | Tiffin is priced monthly, catering per plate |
| Minimum Order | number (guests) | 1–10,000 | All | No | Caterers have a minimum headcount |
| Food Licence | IN: text · GB: select · SG: text | IN: FSSAI Registration No. · GB: Food Hygiene Rating 0–5 · SG: SFA Licence No. | All | No | Each market requires home food sellers to register, and buyers check it |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [x] Save Price as `salePrice` so the price filter finds new posts
- [x] Service Type as a required select matched to the Service filter (Restaurant and Cloud Kitchen removed)
- [x] Cuisine Type as tags, max 5
- [x] Dietary Options per country
- [x] Delivery Available → Delivery / Pickup
- [x] Add Occasions
- [x] Add Price Per
- [x] Add Minimum Order
- [x] Add Food Licence (FSSAI / Hygiene Rating / SFA)
- [x] Wire the Service and For Event filters (search only)
- [x] Move the pending "Home cook" post to food\_dining in IN
- [x] Backfill details on the 7 seed posts so the new filters have something to match

## Built — 22 Oct 2026

All 12 ticked items are live in IN, GB and SG (commit 74d37e8). Where the build differs from the suggestion:

- Cuisine Type is saved as a new list; the old single Cuisine Type value carries over on the Home cook post.
- The Service search filter gained Home Cooked and Other, and shows Meal Prep as "Tiffin / Meal Prep" in IN. For Event gained Party.
- Listings show the price as "/ plate", "/ meal", "/ mo" or "/ order" from Price Per.
- The Home cook post is now Food & Dining in IN, with Service Type Home Cooked, Cuisine Karaikudi and Delivery. It is still pending approval.
- Existing posts: the 7 seed posts got Service Type, Occasions and Price Per, plus Cuisine, Dietary Options, Delivery, Minimum Order and Hygiene Rating where their ad gave them. Both tiffin plans are Meal Prep; the private chef uses Per order.
