<!-- source: https://claude.ai/artifact/WwgqSiVbvP6JM2qqFKLLub -->
# Property › New Projects / Off-Plan — Post Form Review

Oct 12, 2026

## Current fields

The New Projects form has 9 fields today, the fewest with Land. Only Starting Price is required beyond the basics.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2000 characters |
| 3 | Good To Know | goodToKnow | goodToKnow | No | Seller's own label / value points |
| 4 | Property Type | propertyType | select | No | Same as To Buy. IN: Apartment, Independent House, Villa, Plot / Land, Commercial, Other. GB: Flat, Terraced, Semi-Detached, Detached, Bungalow, Maisonette, Other. SG: HDB Flat, Condominium, Executive Condo, Landed, Shophouse, Other |
| 5 | Developer Name | developerName | text | No | Max 100 characters |
| 6 | Possession Date | possessionDate | date | No | Exact day picker |
| 7 | Starting Price | salePrice | currency | Yes | Min 1 |
| 8 | Built-up Area | builtup\_area | number (sq ft) | No | Min 1 |
| 9 | Amenities | amenities | multiselect | No | Same as To Buy. IN: Parking, Gym, Pool, Garden, Power Backup, Club House. GB: Parking, Garden, Garage, Balcony, Double Glazing, Central Heating. SG: Parking, Pool, Gym, BBQ Pit, Near MRT, Security |

## Field type changes

Five existing fields should change. A project sells many unit sizes at a range of prices, but the form only takes one.

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Starting Price | One price | Price From + Price To (To must be ≥ From) | Project ads show a range, e.g. ₹65 L – ₹1.2 Cr. The ≥ rule already exists (Wanted budget) |
| Built-up Area | One area | Area From + Area To | Same reason: units come in several sizes |
| Possession Date | Exact date | Month + year, or a select: Ready to move, Within 6 months, 2026 … 2030 | Developers announce a quarter or a month, not a day |
| Property Type | Includes Plot / Land, Commercial, HDB Flat | IN: Apartment, Villa, Plot, Row House. GB: Flats, Houses, Mixed. SG: Condominium, Executive Condo, Landed (no HDB) | New HDB flats are sold by HDB, not posted on classifieds. Make the field required |
| Developer Name | Optional | Required | Buyers judge new projects by the developer first |

## New fields to add

New Projects needs 7 new fields. Registration number and unit configurations are the most important.

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| RERA Number | text | e.g. P51800012345 | IN | Yes | Indian law requires the RERA number on every new-project ad |
| Unit Configurations | multiselect | IN: 1, 2, 3, 4, 5+ BHK, Plots. GB / SG: Studio, 1, 2, 3, 4, 5+ bed | All | Yes | Buyers search by BHK / bedroom count |
| Project Name | text | e.g. "Prestige Lakeside" | All | Yes | Buyers search projects by name. Today it's only in the title |
| Construction Status | select | New launch, Under construction, Ready to move | All | Yes | A main filter on 99acres, Rightmove New Homes and PropertyGuru |
| Total Units | number | — | All | No | Shows project size |
| Tenure | select | IN: Freehold, Leasehold. GB: Freehold, Leasehold, Shared Ownership. SG: Freehold, 99-Year, 999-Year | All | No | SG buyers filter freehold vs 99-year first |
| Buyer Incentives | text | e.g. "Stamp duty paid" | GB | No | UK new-build ads lead with incentives |

Optional later: Brochure upload (PDF) and Floor Plans as their own photo group.

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [x] Starting Price → Price From + Price To
- [x] Built-up Area → Area From + Area To
- [x] Possession Date → month / year or a select
- [x] Property Type: project types per country (required, no HDB)
- [x] Developer Name required
- [x] Add RERA Number (IN, required)
- [x] Add Unit Configurations (required)
- [x] Add Project Name (required)
- [x] Add Construction Status (required)
- [x] Add Total Units
- [x] Add Tenure
- [x] Add Buyer Incentives (GB)

## Built — 14 Oct 2026

All 12 items were built and are live in IN, GB and SG (commit ed3bfaf). Where the build differs from the suggestion:

- Possession is a select: Within 6 months, or a year 2026–2030. It's hidden when Construction Status is "Ready to move".
- Price From stays the sale price, so listing cards and search keep working. Cards show only the "from" price.
- Tenure leaves out Power of Attorney in India.
- One GB post has an invalid Property Type ("HDB"); its seller will be asked to re-pick on the next edit.
- Open: the Possession year list stops at 2030 and will need extending.

## Search filters — 14 Oct 2026

The New Projects search now uses the new fields.

- The form gained a required Listed By (Developer / Agent), so the Listed by filter now works.
- Completion: "Ready Now" uses Construction Status. "< 1 Year", "1–2 Years" and "2 Years+" count from today to the end of the Possession year, and "Within 6 months" counts as under a year.
- Price steps are sized for sale prices per market (₹5 L – ₹20 Cr, £50,000 – £10M, S$300,000 – S$20M) and filter on Price From.
- The filter panel now shows the filters that are applied.
