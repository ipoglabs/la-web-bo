<!-- source: https://claude.ai/artifact/BsGrMcaDvC8yjvuZFJzfSj -->
# Special Offers › Food & Dining — Post Form Review

Oct 27, 2026

Restaurant, café and delivery-app deals. Buyers filter by cuisine and by dine-in or delivery. Before this review Cuisine was free text and the form's Restaurant / Café / Delivery select didn't match either filter.

## Posts

7 live: the UK has 3 (2-for-1 mains in Clapham, 50% off meal kits, free coffee at The Arch Café), India has 2 Swiggy offers (40% off first 3 orders, free delivery) and Singapore the same 2 from foodpanda. All 7 had the % or a number in `salePrice`. Two said July 2026.

## Form changes

| Field | Before | After |
| --- | --- | --- |
| Cuisine | Free text, plus a Category select (Restaurant / Café / Delivery…) | Cuisine (required): Local / Asian / Western / Fusion / Fast Food / Café / Buffet / Other — same as the filter |
| Available For | Delivery: Yes / No / Via Apps | Dine-in / Takeaway / Delivery (pick any) — the filter's values |
| Deal Type | — | Required; adds Free Delivery |
| Discount %, Redeem At, Valid Until, Offer Price | See the To-do | Category-wide changes |
| Kept |  | Restaurant name, Opening Hours, Coupon, Link, Terms |

## Filters

Cuisine, Available For (was Meal Type), Deal Type, Min Discount and price — all now connected.

## Checklist

- [x] Turn Cuisine into a select (required) matching the Cuisine filter; remove the old Category select.
- [x] Replace Delivery with Available For and connect the filter.
- [x] Add Free Delivery to Deal Type.
- [x] Add Deal Type (required) and connect the filter (category-wide).
- [x] Add Discount % and connect Min Discount (category-wide).
- [x] Add Redeem At; save Offer Price as `salePrice`; make Valid Until required (category-wide).
- [x] Backfill Cuisine, Available For, Deal Type, Discount and Valid Until on the 7 seeds; move the July dates to December.
