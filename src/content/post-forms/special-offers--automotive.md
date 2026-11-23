<!-- source: https://claude.ai/artifact/5fQLMxBTRBKM7GB2P8Vbhr -->
# Special Offers › Automotive — Post Form Review

Oct 27, 2026

Garage, car wash, tyre and insurance deals. There are no live posts yet. Before this review the form was a car-for-sale form (Year, KMs, Fuel Type) while the filters searched the service (Workshop, Car Wash, Tyres) and the vehicle it's for.

## Form changes

| Field | Before | After |
| --- | --- | --- |
| Service | — | Required: Workshop & Servicing / Car Wash & Detailing / Tyres & Rims / Insurance / Accessories / EV Charging / Vehicle Purchase / Other — same as the filter |
| For Vehicle | Vehicle Type: one of Car / Motorcycle / Truck / Van | Pick any: Car / Motorcycle / Van / Truck, the filter's values |
| Make, Model | Always asked | Only for Vehicle Purchase |
| Year, KMs, Condition, Fuel Type | Asked | Removed |
| Garage / Dealer | — | Added |
| Deal Type, Discount %, Redeem At, Valid Until, Offer Price | See the To-do | Category-wide changes |

## Filters

Service, For Vehicle, Deal Type, Min Discount and price — all now connected. Grooming is dropped from Service (no seller would pick it for vehicles); Vehicle Purchase and Other are added.

## Checklist

- [x] Add Service (required) with the filter's values and connect it.
- [x] Turn Vehicle Type into For Vehicle (pick any) and connect its filter.
- [x] Show Make and Model only for Vehicle Purchase; remove Year, KMs, Condition and Fuel Type.
- [x] Add Deal Type (required) and connect the filter; Deal Type filter added to this sub (category-wide).
- [x] Add Discount % and connect Min Discount (category-wide).
- [x] Add Redeem At; save Offer Price as `salePrice` with "Was"; make Valid Until required (category-wide).
- [x] No seed posts to backfill.
