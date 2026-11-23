<!-- source: https://claude.ai/artifact/TAZSEF1f1C4NiFZBQkAjCJ -->
# Property › Land for Sale / Lease — Post Form Review

Oct 12, 2026

## Current fields

The Land form has 9 fields today. Despite the name, it only takes a sale price, and its Property Type list is for buildings, not land.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2000 characters |
| 3 | Good To Know | goodToKnow | goodToKnow | No | Seller's own label / value points |
| 4 | Property Type | propertyType | select | No | IN: Apartment / Flat, Independent House, Villa, Plot / Land, Commercial, Other. GB: Flat, Terraced, Semi-Detached, Detached, Bungalow, Maisonette, Other. SG: HDB Flat, Condominium, Executive Condo, Landed, Shophouse, Other |
| 5 | Plot Area | plot\_area | number (sq ft) | Yes | Min 1, max 10,000,000 sq ft |
| 6 | Expected Price | salePrice | currency | Yes | Min 1 |
| 7 | Negotiable | negotiable | select | No | Yes / No |
| 8 | Ownership | ownership | select | No | IN: Freehold, Leasehold, Power of Attorney. GB: Freehold, Leasehold, Shared Ownership. SG: Freehold, 99-Year Leasehold, 999-Year Leasehold |
| 9 | Amenities | amenities | multiselect | No | IN: Parking, Lift, Power Backup, Security, Water Supply, Balcony, Garden, Gym, Pool, Club House. GB: Parking, Garden, Garage, Balcony, Double Glazing, Central Heating, Security, EPC A/B. SG: Parking, Pool, Gym, BBQ Pit, Security, Near MRT, Balcony, Garden |

## Field type changes

Four existing fields should change. The form needs land-specific options in place of the building options it has today.

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Property Type | Building types (Flat, Villa, HDB, Condo…) | Land Type. IN: Residential Plot, Agricultural Land, Commercial Plot, Industrial Plot, Farm House Plot. GB: Building Plot, Agricultural / Farmland, Paddock, Woodland, Development Land. SG: Landed Plot, Industrial Land, Other | You can't post a flat in a Land form. Make it required |
| Plot Area | sq ft only | Add Area Unit: sq ft, sq yd, acre, cent, guntha, bigha (IN); sq ft, acre, hectare (GB); sq ft, sq m (SG) | Indian land is sold in acres, cents or gunthas. UK land in acres. Converting to sq ft is error-prone |
| Expected Price | Sale only | Show when Listing For = Sale. Lease shows Lease Rent + Lease Period | The subcategory says "Sale / Lease" but leases can't be posted |
| Amenities | Building amenities (Lift, Gym, Pool, Double Glazing, EPC) | Land features: Road Access, Corner Plot, Boundary Wall, Water Connection, Electricity Connection, Gated Community | A plot has no lift or gym |

## New fields to add

Land needs 8 new fields. Listing For, plot size and approval status are what land buyers check first.

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Listing For | select | Sale, Lease | All | Yes | Decides which price fields show |
| Lease Rent + Lease Period | currency + select | per month, per year; 1, 3, 5, 10, 30+ years | All (when Lease) | Lease Rent yes | Lets lease listings be posted |
| Plot Length × Width | number + number (ft) | — | IN | No | Indian plots are described as e.g. 30 × 40 ft |
| Facing | select | 8 directions | IN | No | Vastu direction matters for plots |
| Road Width | number (ft) | — | IN | No | Decides what can be built and the price |
| Approval Status | select | IN: DTCP, HMDA, BDA / BMRDA, RERA, Panchayat, Not approved. GB: Full planning permission, Outline permission, No permission | IN, GB | No | Approved plots sell for far more. Buyers filter on it |
| Boundary Wall / Fencing | select | Yes, No | All | No | Common question on land ads |
| Listed By | select | Owner, Agent, Builder / Developer | All | Yes | Lets buyers filter out brokers |

Optional later: Survey Number for IN (often asked but sensitive to show publicly).

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [x] Property Type → Land Type per country (required)
- [x] Add Area Unit to Plot Area
- [x] Add Listing For (Sale / Lease) with Lease Rent + Lease Period
- [x] Amenities → land features
- [x] Add Plot Length × Width (IN)
- [x] Add Facing (IN)
- [x] Add Road Width (IN)
- [x] Add Approval Status (IN, GB)
- [x] Add Boundary Wall / Fencing
- [x] Add Listed By (required)

## Built — 14 Oct 2026

All 10 items were built and are live in IN, GB and SG (commit be3f29b). Where the build differs from the suggestion:

- Plot Area is saved in the seller's chosen unit, not converted. Search doesn't filter on plot area, so nothing breaks. Listings show the unit as its own "Area Unit" row.
- Lease Rent uses the shared rent price key, with a required Rent Period (per month / per year).
- "Boundary Wall" was left out of Land Features, since it's now its own field.
- No existing posts needed changes.

## Search filters — 14 Oct 2026

The Land search now uses the new fields.

- The For Sale / For Lease filter matches Listing For. Older land posts count as sales.
- The price range compares the sale price for sales and the monthly rent for leases (per year converted). With "For Lease" picked the filter reads "Price per month".
- Listed by (Owner / Agent / Builder) filters on the form's Listed By.
- Price steps per market: sale ₹5 L – ₹20 Cr, £50,000 – £10M, S$300,000 – S$20M; lease steps when For Lease is picked.
- The filter panel now shows the filters that are applied.
