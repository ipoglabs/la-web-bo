<!-- source: https://claude.ai/artifact/7GpJCongvkpz8LRQmhf9Ay -->
# Property › For Students — Post Form Review

Oct 12, 2026

## Current fields

The For Students form has 12 fields today. Only 4 are required, and there is no move-in date or contract length.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2000 characters |
| 3 | Good To Know | goodToKnow | goodToKnow | No | Seller's own label / value points |
| 4 | Property Type | propertyType | select | Yes | IN: Hostel, PG, Shared Apartment, Student Apartment, Co-living. GB: Student Halls, Shared House, En-Suite Room, Studio Flat, Co-living. SG: Student Hostel, Shared HDB, Co-living, Serviced Room, Other |
| 5 | Rent | rentPrice | currency | Yes | Min 1, period not stated |
| 6 | Deposit | deposit | currency | No | Min 0 |
| 7 | Beds | beds | select | No | 1, 2, 3, 4, 5+ |
| 8 | Baths | baths | select | No | 1, 2, 3, 4, 5+ |
| 9 | Occupancy | occupancy | select | No | IN / SG: Single, Double Sharing, Triple Sharing, Dormitory. GB: Single, Double, Shared Room, Studio |
| 10 | Gender Preference | gender\_pref | select | No | Boys, Girls, Co-ed |
| 11 | Facilities | facilities | multiselect | No | IN: 12 items (WiFi, Study Table, Laundry, Housekeeping, Meals, AC, RO Water…). GB: 8 items (WiFi, Study Desk, Laundry, Bike Storage…). SG: 8 items (WiFi, Study Desk, Laundry, Near MRT…) |
| 12 | Amenities | amenities | multiselect | No | IN: Lift, Parking, Garden, Terrace, Balcony, 24x7 Security. GB: Lift, Parking, Garden, Games Room, 24/7 Security, Gym. SG: Lift, Parking, Pool, Common Room, 24x7 Security, Lounge |

## Field type changes

Four existing fields should change. Beds and Baths fit badly here: students rent a bed or a room, not a whole flat.

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Beds, Baths | Bed and bath counts | Replace with Bathroom: Attached / En-suite, Shared | A hostel or PG ad can't answer "how many beds" in a useful way. Students filter by private bathroom |
| Rent | currency, period not stated | Add Rent Period: per month (IN, SG), per week (GB) | UK student rent is quoted per week |
| Gender Preference | Boys, Girls, Co-ed | Make it required for IN and SG (PG / hostel types) | Indian PGs and hostels are single-gender. Students filter on it first |
| Facilities + Amenities | Two lists | Merge into one list per country, and move Meals Included to its own field | Sellers can't tell which list an item belongs in. Meals changes the price, so it needs its own field |

## New fields to add

For Students needs 7 new fields. Move-in date, contract length and bills are what students compare first.

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Available From | date | — | All | Yes | Students search by term start date |
| Contract Length | select | 1 term, 1 semester, 6 months, 1 academic year (\~44 weeks), 1 year, Flexible | All | No | Student contracts follow the academic year, not the 11-month or 1-year leases |
| Bills Included | select | All bills, Some bills, None | All | No | A top filter on UK student portals |
| Meals Included | select | None, Breakfast, Breakfast + Dinner, All meals | IN, SG | No | Changes the real price of a PG |
| Nearby College / University | text | e.g. "University of Manchester" | All | No | Students search by their campus |
| Distance to Campus | select | Walking (< 1 km), 1–3 km, 3–5 km, 5+ km | All | No | Easier to compare than free text |
| Listed By | select | Owner, Agent, PG / Hostel Operator, University | All | Yes | Builds trust and lets students filter |

Optional later: Curfew / Gate Closing Time for IN PGs, and Guarantor Required for GB.

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [x] Replace Beds / Baths with Bathroom (Attached / Shared)
- [x] Add Rent Period (per week in GB)
- [x] Gender Preference required in IN and SG
- [x] Merge Facilities into Amenities
- [x] Add Available From (required)
- [x] Add Contract Length
- [x] Add Bills Included
- [x] Add Meals Included (IN, SG)
- [x] Add Nearby College / University
- [x] Add Distance to Campus
- [x] Add Listed By (required)

## Built — 14 Oct 2026

All 11 items were built and are live in IN, GB and SG (commit 7507f4b). Where the build differs from the suggestion:

- Rent Period is GB only (per week / per month); IN and SG show "per month".
- Bathroom reads "Attached" in IN and "En-suite" in GB and SG.
- Listed By's operator option reads "PG / Hostel Operator" (IN), "Accommodation Provider" (GB), "Hostel Operator" (SG).
- Bills Included: All bills / Some bills / None.
- The merged Amenities list keeps both "Security/CCTV" and "24x7 Security" (or the GB / SG equivalents).
- No existing posts needed changes.

## Search filters — 14 Oct 2026

The For Students search now uses the new fields.

- Listed by offers Owner, Agent, Hostel / PG Operator and University, matching the form ("Helping Hand" removed).
- The price filter reads "Price per month"; GB weekly rents are compared as monthly amounts.
- Price steps per market: ₹2,000 – ₹50,000, £300 – £3,000, S$500 – S$4,000, in the market's currency.
- The filter panel now shows the filters that are applied.
