<!-- source: https://claude.ai/artifact/KNMN4i2dXyjrphP2iX3uvx -->
# Property › Commercial — Post Form Review

Oct 12, 2026

## Current fields

The Commercial form has 20 fields today, the most of any Property subcategory. It is rent-only: there is no way to post a commercial property for sale.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2000 characters |
| 3 | Good To Know | goodToKnow | goodToKnow | No | Seller's own label / value points |
| 4 | Property Type | propertyType | select | Yes | IN: Office, Shop, Warehouse, Showroom, Industrial, Co-working. GB: Office, Retail Unit, Warehouse, Industrial Unit, Co-working, Workshop. SG: Office, Retail Space, Warehouse, Industrial, Co-working, Shophouse |
| 5 | Rent | rentPrice | currency | Yes | Min 1, period not stated |
| 6 | Deposit | deposit | currency | No | Min 0 |
| 7 | Maintenance | maintenance | currency | No | Min 0 |
| 8 | Built-up Area | builtup\_area | number (sq ft) | No | Min 1 |
| 9 | Carpet Area | carpet\_area | number (sq ft) | No | Must be ≤ Built-up Area |
| 10 | Floor | floor | select | No | Ground, 1–9, 10+. Must be ≤ Total Floors |
| 11 | Total Floors | totalFloors | select | No | 1–9, 10+ |
| 12 | Washrooms | washrooms | select | No | None, 1–4, 5+ |
| 13 | Parking Spaces | parkingSpaces | select | No | None, 1–4, 5+ |
| 14 | Furnishing | furnishing | select | No | Furnished, Semi-Furnished, Unfurnished (same in all countries) |
| 15 | Pantry | pantry | select | No | Yes / No |
| 16 | Power Backup | powerBackup | select | No | Yes / No |
| 17 | Available From | available\_from | date | No | Half width |
| 18 | Lease Term | leaseTerm | select | No | IN: 1, 3, 6, 11 months, 1 yr, 2 yrs, 3+ yrs. GB / SG: same without 11 months |
| 19 | Facilities | facilities | multiselect | No | IN: Parking, Lift, Power Backup, Security/CCTV, Fire Safety, Visitor Parking. GB: Parking, Lift, Security/CCTV, Fire Safety, Loading Bay, Disabled Access. SG: Parking, Lift, Security/CCTV, Fire Safety, Visitor Parking, Loading Bay |
| 20 | Amenities | amenities | multiselect | No | IN: WiFi, AC, Cafeteria, Conference Room, Reception, 24x7 Access. GB: WiFi, AC, Conference Room, Reception, Kitchen, 24/7 Access. SG: WiFi, AC, Conference Room, Reception, 24x7 Access, Cafeteria |

## Field type changes

The main change is a Listing For switch (Rent / Sale) that decides which price fields show. Five other fields should change as well.

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Rent (required) | Always shown | Show only when Listing For = Rent. Show Sale Price + Negotiable when Listing For = Sale | Shops, offices and warehouses are sold as often as rented. Needs a "show only when" rule |
| Rent | currency, period not stated | Add Rent Period: per month, per sq ft per year (GB), per sq ft per month (SG) | GB commercial rent is quoted per year or per sq ft per year. SG uses per sq ft per month |
| Maintenance | currency, all countries | IN only. GB: Service Charge + Business Rates. SG: Service Charge | Each market names this cost differently |
| Furnishing | Furnished / Semi / Unfurnished | Office Fit-out: Bare Shell, Warm Shell, Fully Fitted, Plug and Play | Furnishing is a home term. Commercial portals use fit-out levels |
| Pantry, Power Backup | Two Yes / No selects | Move into Facilities as ticks. Power Backup IN only | Two separate questions for two ticks. Power Backup is already in the IN Facilities list |
| Carpet Area | All countries | IN only. Built-up Area becomes Floor Area in GB and SG | Carpet area is an Indian term |

## New fields to add

Commercial needs 6 new fields. Listing For is the one that unlocks sale listings.

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Listing For | select | Rent, Sale | All | Yes | Decides which price fields show |
| Sale Price + Negotiable | currency + select | Yes / No | All (when Sale) | Sale Price yes | Same fields as To Buy |
| Listed By | select | Owner, Agent, Builder | All | Yes | Buyers and tenants filter out brokers |
| Use Class | select | E (commercial), B2 (industrial), B8 (storage), Sui Generis | GB | No | UK planning class decides what the unit may be used for |
| Zoning | select | Commercial, Industrial B1, Industrial B2, Business Park | SG | No | URA zoning decides allowed use in SG |
| Ceiling Height | number (ft) | — | All (warehouse, industrial) | No | Key spec for warehouses. Show only for those types |

Optional later: Frontage (ft) for shops, and Lock-in Period (months) for IN.

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [x] Add Listing For (Rent / Sale) with Sale Price + Negotiable for sale
- [x] Add Rent Period per country
- [x] Maintenance: IN only; Service Charge (+ Business Rates in GB)
- [x] Furnishing → Office Fit-out levels
- [x] Pantry and Power Backup → Facilities ticks
- [x] Carpet Area: IN only; Floor Area in GB and SG
- [x] Add Listed By (required)
- [x] Add Use Class (GB)
- [x] Add Zoning (SG)
- [x] Add Ceiling Height (warehouse / industrial)

## Built — 14 Oct 2026

All 10 ticked items are live in IN, GB and SG (commit e3af1f1). Where the build differs from the suggestion:

- Rent Period: GB per month / per year / per sq ft per year; SG per month / per sq ft per month; IN is always per month. Listing prices show the matching suffix.
- Service Charge and Business Rates are per year in GB; Service Charge is per month in SG.
- Fit-out keeps the old furnishing key, so filters keep working.
- A Pantry tick was added for IN and SG only; GB already has Kitchen under Amenities.
- Ceiling Height also shows for GB's Workshop type.
- Also fixed: on new posts, a hidden field (e.g. Rent on a sale listing) could still be saved.

## Search filters — 14 Oct 2026

The Commercial search now uses the new fields.

- The Rent / Sale filter matches Listing For. Older posts count as rent, since the form used to be rent-only.
- The price range compares the monthly rent for rent listings (per year and per-sq-ft rents converted) and the sale price for sales. With "Any" it matches either.
- With "For Rent" picked, the filter reads "Price per month" with rent steps; with "For Sale" it uses sale-price steps.
- Listed by (Owner / Agent / Builder) filters on the form's Listed By.
- The filter panel now shows the filters that are applied.
