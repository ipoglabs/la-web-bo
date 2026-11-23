<!-- source: https://claude.ai/artifact/3LkZvuKVYfSoTCmSBFoh84 -->
# Property › Room Rental — Post Form Review

Oct 12, 2026

## Current fields

The Room Rental form has 11 fields today. It is the only Property form where Available From is required.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2000 characters |
| 3 | Good To Know | goodToKnow | goodToKnow | No | Seller's own label / value points |
| 4 | Room Type | type | select | Yes | IN: Single Room, Shared Room, PG, Hostel, Other. GB: Single Room, Double Room, En-Suite Room, Studio, Other. SG: Master Room, Common Room, Single Room, Entire Unit, Other |
| 5 | Rent | rent | currency | Yes | Min 1. Key is `rent`, not `rentPrice` like the other rent forms |
| 6 | Deposit | deposit | currency | No | Min 0 |
| 7 | Available From | available\_from | date | Yes | Half width |
| 8 | Preferred Tenants | preferred\_tenants | select | No | Any, Students, Working Professionals, Family |
| 9 | Gender Preference | gender\_pref | select | No | Any, Male, Female |
| 10 | Amenities | amenities | multiselect | No | IN: WiFi, Attached Bathroom, AC, Kitchen Access, Washing Machine, TV, Balcony, Parking, Housekeeping, Meals. GB: WiFi, Bills Included, Central Heating, Kitchen Access, Washing Machine, TV, Parking, Garden, Pets Allowed. SG: WiFi, AC, Kitchen Access, Washing Machine, TV, Parking, Near MRT, Cooking Allowed |
| 11 | House Rules | rules | multiselect | No | Smoking Allowed, Pets Allowed, Visitors Allowed, Cooking Allowed |

## Field type changes

Five existing fields should change. Room Type mixes rooms with whole places (PG, Hostel, Entire Unit), and those belong in other subcategories.

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Room Type | IN: PG, Hostel. SG: Entire Unit. GB: Studio | Remove PG and Hostel (For Students), Entire Unit and Studio (To Rent) | The same place can be posted in two subcategories, which splits search |
| Rent key | `rent` | Rename to `rentPrice`, like To Rent / Commercial / Students | One key lets search sort and filter all rents together. Needs a one-off data move for old posts |
| Rent | Period not stated | Add Rent Period: per month (IN, SG), per week or per month (GB) | UK room rents are often per week |
| Amenities | Bills Included (GB) and Cooking Allowed (SG) are ticks; Attached Bathroom is a tick | Bills Included becomes its own field. Cooking Allowed stays only in House Rules. Attached Bathroom becomes its own field | These change the price or the choice. They are also duplicated across lists |
| Gender Preference | Any, Male, Female | Any, Male only, Female only, Couples welcome | SG and IN room ads often accept couples. Students form uses Boys / Girls: align the wording |

## New fields to add

Room Rental needs 7 new fields. Bathroom, bills and flatmates are what room-seekers check first on SpareRoom and Carousell.

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Bathroom | select | Attached / En-suite, Shared | All | No | Replaces the Attached Bathroom tick. Top filter on SpareRoom |
| Bills Included | select | All bills, Some bills, None | All | No | Changes the real price. Replaces the GB tick |
| Furnishing | select | Furnished, Unfurnished | All | No | Standard on every room site |
| Minimum Stay | select | 1, 3, 6, 12 months, Flexible | All (SG HDB: 6 months+) | No | Filters short vs long stays |
| Current Flatmates | select | 0, 1, 2, 3, 4, 5+ | All | No | Room-seekers want to know how many people they'll share with |
| Property Type | select | IN: Apartment, House. GB: Flat, House. SG: HDB, Condo, Landed | All | No | SG prices differ a lot between HDB and condo rooms |
| Listed By | select | Owner / Live-in landlord, Current tenant, Agent | All | Yes | Room ads are often posted by a flatmate. Seekers filter out agents |

Optional later: Air Conditioning (SG, IN) as its own Yes / No and a Lock-in Period for IN.

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [x] Room Type: remove PG, Hostel, Entire Unit, Studio
- [x] Rename `rent` to `rentPrice` (with a data move for old posts)
- [x] Add Rent Period (GB per week)
- [x] Clean Amenities (move Bills / Bathroom / Cooking out)
- [x] Gender Preference: add Couples welcome
- [x] Add Bathroom
- [x] Add Bills Included
- [x] Add Furnishing
- [x] Add Minimum Stay
- [x] Add Current Flatmates
- [x] Add Property Type
- [x] Add Listed By (required)

## Built — 14 Oct 2026

All 12 items were built and are live in IN, GB and SG (commit 0783f0d). Where the build differs from the suggestion:

- Rent is now saved as `rentPrice`, so room rents show up in search price filters. (Search doesn't sort by price yet.) No existing posts needed the data move.
- GB's "Pets Allowed" amenity tick was also removed, since it's already a House Rule.
- Listed By: Owner / Live-in landlord, Current tenant, Agent.
- Bathroom uses the same options as For Students.
- In SG, Minimum Stay carries the note "Rooms in HDB flats must be let for at least 6 months."
- Open: confirm the SG 6-month HDB rule, which came from memory.

## Search filters — 14 Oct 2026

The Room Rental search now uses the new fields.

- Listed by offers Owner / Live-in landlord, Current tenant and Agent, matching the form ("Helping Hand" removed).
- The price filter reads "Price per month"; GB weekly rents are compared as monthly amounts.
- Price steps per market: ₹2,000 – ₹50,000, £300 – £3,000, S$500 – S$4,000, in the market's currency.
- The filter panel now shows the filters that are applied.
