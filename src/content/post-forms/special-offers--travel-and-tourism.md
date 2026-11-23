<!-- source: https://claude.ai/artifact/NoTxVXMSYeCnixX93wxdmr -->
# Special Offers › Travel & Tourism — Post Form Review

Oct 27, 2026

Flight, hotel and holiday-package deals. Buyers filter by what is on offer (flights, hotels, packages). Before this review the form asked Domestic / International / Adventure while the filter searched Flights / Hotels / Packages, so nothing could match.

## Posts

7 live: the UK has 3 (£89 flight sale, 30% off a Westminster hotel, £899pp Algarve package), India has 2 (30% off domestic flights, ₹2,000 off Goa resorts) and Singapore has 2 (30% off regional flights, S$80 off Bintan resorts). 4 had the % or amount off in `salePrice`. The UK flight sale said "Book by 30 June".

## Form changes

| Field | Before | After |
| --- | --- | --- |
| Type | Tour Type: Domestic / International / Adventure / Cruise / Honeymoon | Type (required): Flights / Hotels / Holiday Packages / Activities & Tours / Car Rental / Cruise / Other — same as the filter |
| Accommodation, Transport | Two selects | Removed; Type covers them |
| Dates | Start / End Date | Travel From / Travel To |
| Itinerary | Itinerary / Inclusions | What's Included |
| Deal Type, Discount %, Redeem At, Valid Until, Offer Price | See the To-do | Category-wide changes |
| Kept |  | Destination, Duration, Agency, Coupon, Link, Terms |

## Filters

Type, Deal Type, Min Discount and price — all now connected.

## Checklist

- [x] Replace Tour Type with Type (required), values matching the Type filter, and connect it. Add Cruise to the filter.
- [x] Remove Accommodation and Transport.
- [x] Add Deal Type (required) and connect the filter (category-wide).
- [x] Add Discount % and connect Min Discount (category-wide).
- [x] Add Redeem At (category-wide).
- [x] Save Offer Price as `salePrice` and add "Was" (category-wide).
- [x] Make Valid Until required (category-wide).
- [x] Backfill Type, Deal Type, Discount, Destination and Valid Until on the 7 seeds; move the UK flight sale's dates to 2027.
