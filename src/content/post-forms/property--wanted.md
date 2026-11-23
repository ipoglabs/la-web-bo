<!-- source: https://claude.ai/artifact/SPSQYuLCESP2ss66nzPGYj -->
# Property › Wanted — Post Form Review

Oct 12, 2026

## Current fields

The Wanted form has 11 fields today. It doesn't say whether the person wants to buy or rent, so a budget of 50,000 could mean either.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2000 characters |
| 3 | Good To Know | goodToKnow | goodToKnow | No | Seller's own label / value points |
| 4 | Looking For | propertyType | select | Yes | IN: Apartment, Independent House, Villa, Room / PG, Commercial, Plot / Land, Other. GB: Flat, Terraced, Semi-Detached, Detached, Room, Commercial, Other. SG: HDB Flat, Condominium, Landed, Room Rental, Commercial, Other |
| 5 | Min Budget | minBudget | currency | No | Min 1 |
| 6 | Max Budget | maxBudget | currency | No | Must be ≥ Min Budget |
| 7 | Min Area | minArea | number (sq ft) | No | Min 1 |
| 8 | Beds | beds | select | No | 1, 2, 3, 4, 5+ |
| 9 | Baths | baths | select | No | 1, 2, 3, 4, 5+ |
| 10 | Preferred Locations | preferred\_locations | tags | No | Up to 5 place names, per-country placeholder |
| 11 | Preferred Amenities | amenities | multiselect | No | IN: 10 items (Parking, Lift, Power Backup…). GB: 8 items (Parking, Garden, Garage, Pets Allowed…). SG: 8 items (Parking, Pool, Gym, Near MRT…) |

## Field type changes

Four existing fields should change. Most of them depend on a new Want To (Buy / Rent) field.

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Min / Max Budget | Plain amounts | Label as "Budget (per month)" when Want To = Rent, "Budget" when Buy. Make Max Budget required | Owners need to know the budget to reply. Today rent and buy budgets look the same |
| Beds | 1, 2, 3, 4, 5+ | Add Studio. Hide Beds / Baths when Looking For is Room, Commercial or Plot | A room or plot seeker can't answer bed counts |
| Min Area | sq ft only, shown for every type | Hide for Room. Add acre / cent / sq yd units when Looking For = Plot / Land | A room seeker has no area need. Land is asked for in acres, not sq ft |
| Preferred Amenities | Long multiselect | Keep, but limit to the 6 most useful per country | Seekers tick everything when the list is long, which makes it useless |

## New fields to add

Wanted needs 6 new fields. Want To (Buy / Rent) is the key one: owners can't reply sensibly without it.

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Want To | select | Buy, Rent | All | Yes | Decides the budget label and which owners the ad is for |
| Move-in By | select | Immediately, Within 1 month, 1–3 months, 3–6 months, Flexible | All | No | Owners reply first to people who can move soon |
| Furnishing | select | Any, Furnished, Semi / Part, Unfurnished | All (when Rent) | No | A top rental filter |
| Tenant Type | select | Family, Bachelor(s), Working Professional, Student, Couple | IN, SG (when Rent) | No | Indian and SG owners filter tenants by this |
| Pets | select | No pets, Have pets | All (when Rent) | No | Saves owners and seekers a wasted call |
| Agents may contact | select | Yes, No | All | No | Seekers often want owners only. Lets them say so up front |

Optional later: Loan Pre-approved (when Buy) and Occupants count (when Rent).

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [x] Add Want To (Buy / Rent), required
- [x] Budget label follows Want To; Max Budget required
- [x] Beds: add Studio; hide Beds and Baths for Room / Commercial / Plot
- [x] Min Area: hide for Room; land units for Plot
- [x] Trim Preferred Amenities to 6 per country
- [x] Add Move-in By
- [x] Add Furnishing (when Rent)
- [x] Add Tenant Type (IN, SG, when Rent)
- [x] Add Pets (when Rent)
- [x] Add Agents may contact

## Built — 14 Oct 2026

All 10 items were built and are live in IN, GB and SG (commit 36cef3d). Where the build differs from the suggestion:

- Rent budgets are their own fields, "Min / Max Budget (per month)", shown only for Rent. Buy keeps Min / Max Budget. Search doesn't filter on budget, so nothing else is affected.
- In IN, Plot / Land seekers get Min Plot Area with an Area Unit (acre, cent, guntha…).
- Preferred Amenities, 6 per country — IN: Parking, Lift, Power Backup, Security, Gym, Swimming Pool. GB: Parking, Garden, Garage, Balcony, Central Heating, Double Glazing. SG: Parking, Swimming Pool, Gym, Security, Near MRT, Balcony.
- GB's "Pets Allowed" amenity was dropped, since Pets is now a field.
- No existing posts needed changes.

## Search filters — 14 Oct 2026

The Wanted search now uses the new fields.

- Looking For: To Rent and To Buy match Want To; Room, Commercial and Land match the Looking For type.
- The price box was removed from the Wanted search. It never filtered anything, since budgets aren't searchable.
- The filter panel now shows the filters that are applied.
