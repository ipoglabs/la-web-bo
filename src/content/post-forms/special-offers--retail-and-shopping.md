<!-- source: https://claude.ai/artifact/3J2594NozmQ58AdKaY3XeQ -->
# Special Offers › Retail & Shopping — Post Form Review

Oct 27, 2026

Store sales, loyalty deals and grocery offers. The old form asked Model, Size, Colour and Condition as if selling one item, and never asked the shop Category the filter searches.

## Posts

7 live: the UK has 3 (50% off fashion, 20% off at Ember & Oak Boutique, double loyalty points), India has 2 Big Bazaar offers (50% off apparel & home, Buy 1 Get 1 groceries) and Singapore the same 2 from NTUC FairPrice. All 7 had the % in `salePrice` (BOGO showed as ₹11). Two said June/July 2026.

## Form changes

| Field | Before | After |
| --- | --- | --- |
| Category | — | Required: Fashion / Electronics / Home & Living / Beauty / Sports / Kids / Groceries / Other — same as the filter |
| Store / Brand | Brand | Store / Brand |
| Model, Size, Colour, Condition, Delivery | Asked | Removed — an offer isn't one item |
| Redeem At | — | Required, and the Redeem At filter is connected |
| Deal Type, Discount %, Valid Until, Offer Price | See the To-do | Category-wide changes |
| Kept |  | Return Policy, Coupon, Link, Terms |

## Filters

Category, Deal Type, Redeem At, Min Discount and price — all now connected.

## Checklist

- [x] Add Category (required) and connect the Category filter.
- [x] Replace Brand with Store / Brand; remove Model, Size, Colour, Condition and Delivery.
- [x] Add Redeem At and connect the Redeem At filter; "Both" shows under In-store and Online.
- [x] Add Deal Type (required) and connect the filter (category-wide).
- [x] Add Discount % and connect Min Discount (category-wide).
- [x] Save Offer Price as `salePrice` and add "Was"; make Valid Until required (category-wide).
- [x] Backfill Category, Deal Type, Discount, Redeem At, Store and Valid Until on the 7 seeds; move the June/July dates to December.
