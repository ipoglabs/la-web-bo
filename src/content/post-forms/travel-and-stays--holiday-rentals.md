<!-- source: https://claude.ai/artifact/KXX496hMWxc4bLQFdUSFmy -->
# Travel & Stays › Holiday Rentals — Post Form Review

Oct 27, 2026

Villas, flats and cottages let by the night, week or month. Buyers filter by property type, bedrooms and how long they can stay. Before this review the form asked none of those, and the price was saved where the filter doesn't look.

## Posts

7 live: the UK has 3 (Tuscan villa £1,800 / week, Edinburgh flat £95 / night, Algarve apartment £650 / week), India has 2 Goa lets (3BHK villa ₹8,500, 1BHK ₹3,500), and Singapore had copies of them in Sentosa, now in Bintan and Batam.

## Form changes

| Field | Before | After |
| --- | --- | --- |
| Property Type | — | Required: Apartment / Villa / Cottage / Private Room / Caravan / Other |
| Bedrooms | — | Required number |
| Lets | — | Required: Nightly / Weekends / Weekly / Monthly, plus Minimum Stay |
| Sleeps | Max Guests | Kept |
| Amenities | Labels as values | Filter values, adds Hot Tub and Washing Machine |
| Licence | — | Scottish short-term let licence (UK); Singapore 3-month rule in the hint |
| Price | `rateNightly` | `salePrice` + Price Per: night / week / month |

## Filters

Property Type, Bedrooms (new), Lets and Must Have (new), all connected.

## Checklist

- [x] Ask Property Type, Bedrooms and Lets; connect their filters.
- [x] Price as `salePrice` per night, week or month.
- [x] Must Have filter on amenities.
- [x] Licence and Singapore rule.
- [x] Backfill the 7 seeds; move the Singapore lets overseas.
