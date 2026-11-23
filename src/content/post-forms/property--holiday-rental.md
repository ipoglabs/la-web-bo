<!-- source: https://claude.ai/artifact/WWgWFNMLbD7UJsq8tbZJF9 -->
# Property › Holiday Rental — Post Form Review

Oct 12, 2026

## Current fields

The Holiday Rental form has 12 fields today. The Nightly rate is required; Weekly and Monthly are optional.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2000 characters |
| 3 | Good To Know | goodToKnow | goodToKnow | No | Seller's own label / value points |
| 4 | Holiday Property Type | holidayType | select | Yes | IN: Villa, Beach House, Cottage, Resort, Guest House, Farm Stay, Treehouse, Other. GB: Cottage, Cabin, B&B, Farmhouse, Guest House, Country Home, Other. SG: Serviced Apartment, Villa, Hotel Room, Guest House, Hostel, Other |
| 5 | Guests | guests | select | No | 1–7, 8+ |
| 6 | Beds | beds | select | No | 1, 2, 3, 4, 5+ |
| 7 | Baths | baths | select | No | 1, 2, 3, 4, 5+ |
| 8 | Nightly | rateNightly | currency | Yes | Min 1, third width |
| 9 | Weekly | rateWeekly | currency | No | Min 0 |
| 10 | Monthly | rateMonthly | currency | No | Min 0 |
| 11 | Amenities | amenities | multiselect | No | IN: 12 items (WiFi, Pool, AC, Free Parking, BBQ, Private Beach, Pet Friendly…). GB: 12 items (WiFi, Parking, Fireplace, Hot Tub, Pet Friendly, Children Friendly…). SG: 12 items (WiFi, Pool, AC, Near MRT, Balcony, Pet Friendly…) |
| 12 | House Rules | house\_rules | multiselect | No | Smoking Allowed, Pets Allowed, Parties Allowed, Children Friendly |

## Field type changes

Four existing fields should change. The biggest issue is in Singapore, where letting homes for under 3 months is against the law.

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Nightly (SG) | Required nightly rate | In SG, make Monthly the required rate, hide Nightly and Weekly, and add a 3-month minimum stay note | Private homes in SG can't be let for under 3 months, and HDB flats for under 6 months (URA / HDB rules, from memory, worth checking). Nightly SG listings put sellers at risk |
| Holiday Property Type (SG) | Includes Hotel Room and Hostel | Keep only Serviced Apartment and Other | Licensed hotels and hostels are the only legal short stays in SG, and they don't post on classifieds |
| Guests | 1–7, 8+ | 1–15, 16+ | Villas, farm stays and country homes often sleep 10–20 |
| House Rules | Children Friendly is a rule; Pets Allowed is also an amenity | Remove Children Friendly and Pet Friendly from Amenities. Keep them only as House Rules | The same thing can be ticked twice in two places today |

## New fields to add

Holiday Rental needs 7 new fields. Minimum stay and check-in / check-out times are on every holiday-let site.

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Minimum Stay | select | 1, 2, 3, 7 nights, 1 month, 3 months | All (SG fixed to 3 months+) | No | Guests filter out places that need a week |
| Check-in Time | select | 12 pm – 8 pm in hourly steps, Flexible | All | No | Standard on Airbnb and Booking.com |
| Check-out Time | select | 8 am – 12 pm in hourly steps, Flexible | All | No | Pairs with Check-in |
| Cleaning Fee | currency | — | All | No | A common extra charge. Shown with the rates so guests see the full price |
| Security Deposit | currency | — | All | No | Many hosts take a refundable deposit |
| Bedrooms | select | 1, 2, 3, 4, 5+ | All | No | Today "Beds" is ambiguous: beds or bedrooms? Keep Beds as beds and add Bedrooms |
| Distance to Beach / Attraction | text | e.g. "5 min walk to Baga Beach" | IN, GB | No | Location pull is the main reason guests pick a holiday let |

Optional later: Seasonal Rates (peak / off-peak) and an Availability Calendar.

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [x] SG: Monthly rate required, hide Nightly / Weekly, 3-month minimum
- [x] SG: drop Hotel Room and Hostel types
- [x] Guests: extend to 16+
- [x] Remove Children / Pet Friendly from Amenities (keep in House Rules)
- [x] Add Minimum Stay
- [x] Add Check-in + Check-out Time
- [x] Add Cleaning Fee
- [x] Add Security Deposit
- [x] Add Bedrooms (separate from Beds)
- [x] Add Distance to Beach / Attraction (IN, GB)

## Built — 14 Oct 2026

All 10 items were built and are live in IN, GB and SG (commit 94d3f93). Where the build differs from the suggestion:

- SG types: only Hotel Room and Hostel were removed. Villa and Guest House stay (the table above suggested keeping only Serviced Apartment and Other).
- SG has no Minimum Stay or Distance to Beach field. Its Monthly rate carries the note "Homes in Singapore can't be let for less than 3 months."
- Check-in, Check-out and Minimum Stay sit in a new "Stay" section.
- No existing posts needed changes.
- Open: confirm the SG 3-month rule, which came from memory.

## Search filters — 14 Oct 2026

The Holiday Rental search now uses the new fields.

- The form gained a required Listed By (Owner, Agent, Property Manager), so the Listed by filter now works.
- Stay Length matches listings whose Minimum Stay fits: Weekend up to 2 nights, Weekly up to 7, Monthly up to a month. SG's monthly-only listings appear under Monthly.
- The price filter reads "Price per night" (IN, GB) or "Price per month" (SG). SG listings have no nightly rate, so it compares their monthly rate.
- Price steps per market: ₹500 – ₹1 L, £50 – £2,000 per night; S$1,000 – S$20,000 per month.
- The filter panel now shows the filters that are applied.
