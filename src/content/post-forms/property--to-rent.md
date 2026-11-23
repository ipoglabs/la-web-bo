<!-- source: https://claude.ai/artifact/Hua6CbA8eAdgWrCjZKu1jX -->
# Property › To Rent — Post Form Review

Oct 12, 2026

## Current fields

The To Rent form has 14 fields today. Only 4 are required: Adv Title, Adv Details, Property Type and Rent.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2000 characters |
| 3 | Good To Know | goodToKnow | goodToKnow | No | Seller's own label / value points |
| 4 | Property Type | propertyType | select | Yes | IN: Apartment / Flat, Independent House, Villa, Studio, Other. GB: Flat / Apartment, Terraced, Semi-Detached, Detached, Studio, Bungalow, Other. SG: HDB Flat, Condominium, Executive Condo, Landed, Studio, Other |
| 5 | Rent | rentPrice | currency | Yes | Min 1, third width. No period shown (per month assumed) |
| 6 | Deposit | deposit | currency | No | Min 0 |
| 7 | Maintenance | maintenance | currency | No | Min 0 |
| 8 | Beds | beds | select | No | Studio, 1, 2, 3, 4, 5+ |
| 9 | Baths | baths | select | No | 1, 2, 3, 4, 5+ |
| 10 | Furnishing | furnishing | select | No | IN: Furnished, Semi-Furnished, Unfurnished. GB: Furnished, Part Furnished, Unfurnished. SG: Fully, Partially, Unfurnished |
| 11 | Available From | available\_from | date | No | Half width |
| 12 | Lease Term | leaseTerm | select | No | IN: 1, 3, 6, 11 months, 1 yr, 2 yrs, 3+ yrs. GB / SG: same without 11 months |
| 13 | Facilities | facilities | multiselect | No | Lift, Security, Power Backup, Water Supply, Fire Safety (same in all countries) |
| 14 | Amenities | amenities | multiselect | No | IN: Parking, Lift, Power Backup, Gym, Pool, Garden, Security, Water Supply, Club House, Balcony. GB: Parking, Garden, Garage, Balcony, Double Glazing, Central Heating, Security, Pets Allowed. SG: Parking, Pool, Gym, BBQ Pit, Garden, Security, Near MRT, Balcony |

## Field type changes

Five existing fields should change. The most important: Rent has no period, so a weekly GB rent and a monthly IN rent look the same.

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Rent | currency, period not stated | Keep currency and add a Rent Period select next to it: per month / per week (show the per-week option in GB only) | GB rents are often quoted per week (pw) and per month (pcm). Buyers compare the wrong numbers today |
| Maintenance | currency, all countries | IN only. In GB and SG replace it with Bills Included (select Yes / No / Some) | Maintenance charges are an Indian concept. GB and SG renters ask whether bills are included |
| Available From | date, optional | Required, with an "Immediately" chip as an option | Move-in date is the first thing renters check. Room Rental already requires it |
| Property Type | Includes Studio | Remove Studio, since Beds already has a Studio option | The same flat can be posted two ways today, which splits search results |
| Facilities + Amenities | Two lists; Facilities same in every country | Merge into one Amenities multiselect per country | Lift, Security, Power Backup and Water Supply appear in both IN lists |

## New fields to add

To Rent can add 8 fields with no new field types. Tenant preference and pets are the gaps renters filter on most.

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Rent Period | select | Per month, Per week | GB (IN and SG fixed to per month) | Yes in GB | Makes rents comparable (see Rent above) |
| Listed By | select | Owner, Agent | All | Yes | "No brokers" is a top filter in IN. GB agents must be identified |
| Preferred Tenants | select | Any, Family, Bachelors, Working Professionals, Students | IN, SG | No | Indian owners filter tenants by this. Room Rental already has it |
| Pets Allowed | select | Yes, No, By arrangement | All | No | GB has it as an amenity tick. A field makes it filterable everywhere |
| Floor + Total Floors | select | Ground, 1–9, 10+ / 1–9, 10+ | All | No | Matters for flats. Reuse the Commercial fields |
| Parking Spaces | select | None, 1, 2, 3+ | All | No | More useful than a Parking amenity tick |
| Bills Included | select | Yes, No, Some | GB, SG | No | Replaces Maintenance outside IN |
| Council Tax Band / EPC Rating | select | A–H / A–G | GB | No | Rightmove and Zoopla show both. EPC must be available to UK tenants |

Optional later: Minimum Stay for SG (HDB minimum rental period is 6 months), and Area / Size in all countries.

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [x] Add Rent Period (GB), required
- [x] Maintenance: IN only; Bills Included in GB and SG
- [x] Available From: required, with "Immediately"
- [x] Property Type: remove Studio (use Beds = Studio)
- [x] Merge Facilities into Amenities
- [x] Add Listed By (required)
- [x] Add Preferred Tenants (IN, SG)
- [x] Add Pets Allowed
- [x] Add Floor + Total Floors
- [x] Add Parking Spaces
- [x] Add Council Tax Band + EPC Rating (GB)

## Built — 14 Oct 2026

All 11 ticked items are live in IN, GB and SG (commit c56d077). Where the build differs from the suggestion:

- Rent Period is GB only (per month / per week). IN and SG show "per month" in the Rent box. Weekly rents show "/ week" on listings.
- Bills Included options are Yes / No / Some.
- GB's "Pets Allowed" amenity tick was removed, since Pets Allowed is now its own field.
- Parking Spaces: None, 1, 2, 3+.
- Existing posts: 2 had Facilities moved into Amenities.
- Search price filters now compare every rent as a monthly amount: weekly rents × 52 ÷ 12 (commit 1868de1).

## Search filters — 14 Oct 2026

The To Rent search now uses the new fields.

- The price filter reads "Price per month" and compares every rent as a monthly amount (weekly × 52 ÷ 12).
- Listed by offers Owner and Agent, matching the form ("Helping Hand" removed).
- Price steps per market: ₹2,000 – ₹5 L, £300 – £15,000, S$1,000 – S$20,000, in the market's currency.
- The filter panel now shows the filters that are applied.
