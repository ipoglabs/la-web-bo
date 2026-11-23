<!-- source: https://claude.ai/artifact/QJJsnVAqdrxxaYYTgaSv2W -->
# Food & Dining › Restaurant Deals — Post Form Review

Oct 27, 2026

Restaurants posting set menus, brunch deals and offers. It now works like Special Offers: the card shows the deal, and every deal has an end date.

## Posts

7 live: the UK has 3 (£22 set lunch, bottomless brunch £45, BYOB with no corkage), India has 2 Spice Route deals (weekday lunch ₹299, weekend brunch ₹899), and Singapore copies of both.

## Form changes

| Field | Before | After |
| --- | --- | --- |
| Deal Type | Free-text "Discount / Deal" | Required, the same 13 kinds as Special Offers |
| Discount | Text ("20% off") | Number, % off |
| Price | Optional `price` | Deal Price (`salePrice`) and Was |
| Meals | — | Breakfast / Brunch / Lunch / Dinner / Drinks |
| When | — | Valid Days & Times, Booking Needed |
| Valid Until | Optional | Required |
| Restaurant | Provider name, free-text cuisine | Restaurant Name (required), Cuisine and Dietary pick-lists |

## Filters

Cuisine, Deal Type and Meals (new), all connected. Cards show "20% off", the deal price, or the deal ("Special rate", "Bundle deal").

## Checklist

- [x] Deal Type and % off like Special Offers; card shows the deal.
- [x] Valid Until required; seeds valid to 31 Dec 2026.
- [x] Cuisine pick-list; Cuisine, Deal Type and Meals filters.
- [x] Backfill the 7 seeds; give the 2 Singapore copies a local detail.
