<!-- source: https://claude.ai/artifact/J8CxitTKjsis1JvandjPjs -->
# Property › To Buy — Post Form Review

Oct 12, 2026

## Current fields

The To Buy form has 14 fields today, the same in IN, GB and SG except where the options column says otherwise. Only 4 are required.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2000 characters |
| 3 | Good To Know | goodToKnow | goodToKnow | No | Seller's own label / value points |
| 4 | Property Type | propertyType | select | Yes | IN: Apartment / Flat, Independent House, Villa, Plot / Land, Commercial, Other. GB: Flat / Apartment, Terraced, Semi-Detached, Detached, Bungalow, Maisonette, Other. SG: HDB Flat, Condominium, Executive Condo, Landed, Shophouse, Other |
| 5 | Sale Price | salePrice | currency | Yes | Min 1, half width |
| 6 | Negotiable | negotiable | select | No | Yes / No |
| 7 | Built-up Area | builtup\_area | number (sq ft) | No | Min 1 |
| 8 | Carpet Area | carpet\_area | number (sq ft) | No | Must be ≤ Built-up Area |
| 9 | Beds | beds | select | No | Studio, 1, 2, 3, 4, 5+ |
| 10 | Baths | baths | select | No | 1, 2, 3, 4, 5+ |
| 11 | Property Age | age | text | No | Free text, e.g. "5 years", max 30 characters |
| 12 | Ownership | ownership | select | No | IN: Freehold, Leasehold, Power of Attorney. GB: Freehold, Leasehold, Shared Ownership. SG: Freehold, 99-Year Leasehold, 999-Year Leasehold |
| 13 | Facilities | facilities | multiselect | No | Lift, Security, Power Backup, Water Supply, Fire Safety (same list in all countries) |
| 14 | Amenities | amenities | multiselect | No | IN: Parking, Gym, Swimming Pool, Garden, Power Backup, Club House. GB: Parking, Garden, Garage, Balcony, Double Glazing, Central Heating. SG: Parking, Swimming Pool, Gym, BBQ Pit, Near MRT, Security |

Field types the form supports: text, richtext, textarea, number, currency, date, select (chips), multiselect (chips), tags.

## Field type changes

Six existing fields should change. The biggest fix is Property Age: it's free text, so buyers can't filter by it.

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Property Age | text ("5 years") | select: Under construction, New (0–1 yr), 1–5 yrs, 5–10 yrs, 10–20 yrs, 20+ yrs | Free text can't be filtered or compared. A select matches OLX, Rightmove and PropertyGuru |
| Negotiable | select Yes / No | Keep select, but default to No and place it right under Sale Price | Two chips for one yes / no is fine. Only the position and default change |
| Property Type (IN) | Includes Plot / Land and Commercial | Remove Plot / Land and Commercial. Add Builder Floor and Penthouse | Land and Commercial have their own subcategories. Builder Floor is a common Indian listing type |
| Beds | Studio, 1–5+ | Hide when Property Type is Plot / Land or Commercial | A plot has no bedrooms. Needs a new "show only when" rule in the form |
| Facilities + Amenities | Two multiselects; Facilities is the same in every country | Merge into one Amenities multiselect per country | Sellers don't know which list Lift vs Gym belongs in. Power Backup and Security appear in both lists |
| Carpet Area | Shown in all countries | Show in IN only. Rename Built-up Area to Floor Area in GB and SG | Carpet area is an Indian term. GB and SG listings show one floor area |

## New fields to add

To Buy can add 8 fields with no new field types. Furnishing, Floor and Listed By are the main gaps compared with OLX, Rightmove and PropertyGuru.

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Furnishing | select | Furnished, Semi-Furnished, Unfurnished | All | No | One of the first filters buyers use. To Rent already has it |
| Floor | select | Ground, 1–9, 10+ | All | No | Matters for flats. Reuse the Commercial floor field |
| Total Floors | select | 1–9, 10+ | All | No | Pairs with Floor. Floor must be ≤ Total Floors (rule already exists) |
| Parking Spaces | select | None, 1, 2, 3, 4, 5+ | All | No | A count is more useful than a Parking amenity tick |
| Facing | select | North, South, East, West, North-East, North-West, South-East, South-West | IN | No | Vastu direction is a key filter on Indian portals |
| Listed By | select | Owner, Agent, Builder | All | Yes | Buyers filter out agents. Needed for trust and the "no brokers" search |
| Tenure Remaining | number (years) | Shown when Ownership is a leasehold | GB, SG | No | Lease length changes price a lot in GB and for SG 99-year flats |
| Council Tax Band / EPC Rating | select | A–H / A–G | GB | No | Rightmove and Zoopla show both. EPC must be shown on UK sale listings |

Optional later: Availability (Ready to move / Under construction) for IN, and HDB Town for SG.

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [x] Property Age: change free text to a select
- [x] Negotiable: default No, move under Sale Price
- [x] Property Type (IN): drop Plot / Land and Commercial, add Builder Floor and Penthouse
- [x] Beds / Baths: hide for plots (needs a new "show only when" rule)
- [x] Merge Facilities into Amenities
- [x] Carpet Area: IN only; rename to Floor Area in GB and SG
- [x] Add Furnishing
- [x] Add Floor + Total Floors
- [x] Add Parking Spaces
- [x] Add Facing (IN)
- [x] Add Listed By (required)
- [x] Add Tenure Remaining (GB, SG)
- [x] Add Council Tax Band + EPC Rating (GB)

## Built — 14 Oct 2026

All 13 ticked items are live in IN, GB and SG (commit 9f1f372). Where the build differs from the suggestion:

- Beds / Baths: the "show only when" rule was built, but not put on Beds / Baths. With Plot / Land and Commercial removed from Property Type, no To Buy type is a plot.
- Tenure Remaining shows only for leaseholds: GB Leasehold and Shared Ownership, SG both leasehold terms.
- Listed By "Builder" reads "Developer" in GB and SG.
- Existing posts: 2 had Facilities moved into Amenities; 1 typed age "5" became "1–5 yrs".

## Search filters — 14 Oct 2026

The To Buy search now uses the new fields.

- Listed by (Owner / Agent / Builder) filters on the form's Listed By.
- Price steps are sized for sale prices per market: ₹5 L – ₹20 Cr, £50,000 – £10M, S$300,000 – S$20M. India shows lakh / crore.
- The price filter uses the market's currency instead of £ everywhere, and the filter panel now shows the filters that are applied.
