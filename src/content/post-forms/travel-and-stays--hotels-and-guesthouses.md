<!-- source: https://claude.ai/artifact/5uSbeWMcnspa6z9y8hALXZ -->
# Travel & Stays › Hotels & Guesthouses — Post Form Review

Oct 27, 2026

Hotels, B&Bs, guesthouses and serviced apartments. Star Rating was a filter the form never asked, and the form shared Holiday Rentals' fields.

## Posts

7 live: the UK has 3 (4★ South Kensington hotel £125, Harrogate B&B £68, Canary Wharf serviced apartment £110), India has 2 Kerala guesthouses (₹2,800, ₹1,500), Singapore a Peranakan shophouse and a budget room.

## Form changes

| Field | Before | After |
| --- | --- | --- |
| Type | — | Required: Hotel / Guesthouse / B&B / Hostel / Homestay / Serviced Apartment / Resort / Other |
| Star Rating | — | 1–5★ or Not rated |
| Rooms | — | Single / Double / Twin / Family / Dorm / Suite |
| Free Cancellation | — | Yes / No |
| Name | Optional | Required |
| Price | `rateNightly` | `salePrice` + Price Per: night / week / month |

## Filters

Type (new), Star Rating, Free Cancellation (new) and Must Have (new), all connected.

## Checklist

- [x] Ask Type and Star Rating; connect the filters.
- [x] Free Cancellation with a filter.
- [x] Price as `salePrice` per night.
- [x] Backfill the 7 seeds.
