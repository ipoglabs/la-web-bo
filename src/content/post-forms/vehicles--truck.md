<!-- source: https://claude.ai/artifact/7BrLzkiAiabPoBtbvUHCBv -->
# Vehicles › Truck — Post Form Review

Oct 18, 2026

The Truck form mixes units (Payload in tons, GVWR in kg) and lacks the terms each market sorts trucks by: wheels and permit in IN, weight class and VAT in GB.

## Current fields

The Truck form has 19 fields today, the same in IN, GB and SG except Fuel Type. Only 6 are required: Adv Title, Adv Details, Make, Model, Year and Price.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2000 characters |
| 3 | Good To Know | goodToKnow | goodToKnow | No | Seller's own label / value points |
| 4 | Make | make | text | Yes | Free text, half width |
| 5 | Model | model | text | Yes | Free text, half width |
| 6 | Year | year | number | Yes | 1900–2100, half width |
| 7 | KMs Driven | kms | number | No | Unit km in every country |
| 8 | Payload | payloadCapacity | number | No | Unit tons, 0–500, half width |
| 9 | GVWR | gvwr | number | No | Unit kg, 0–1,000,000, half width |
| 10 | Body Type | bodyType | select | No | Tipper, Box, Flatbed, Tanker, Trailer |
| 11 | Axle Config | axleConfig | select | No | 4x2, 6x2, 6x4, 8x2, 8x4 |
| 12 | Fuel Type | fuelType | select | No | Car fuel list. IN: Petrol, Diesel, CNG, Electric, Hybrid. GB: Petrol, Diesel, Electric, Hybrid, LPG. SG: Petrol, Diesel, Electric, Hybrid, CNG |
| 13 | Transmission | transmission | select | No | Manual, Automatic, AMT |
| 14 | Condition | condition | select | No | New, Used, Refurbished |
| 15 | Price | salePrice | currency | Yes | Min 1 |
| 16 | Owner Type | ownerType | select | No | First Owner, Second Owner, Third Owner or more |
| 17 | Registration Number | registrationNumber | text | No | Half width, shown on the ad |
| 18 | Insurance Valid Till | insuranceValidTill | date | No | Half width |
| 19 | Service History | serviceHistory | select | No | Full, Partial, None |

There are no Truck posts yet, so changes need no data migration.

## Field type changes

Nine existing fields should change. The most important: Payload and GVWR use different units, and "GVWR" is jargon.

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Payload + GVWR | Payload in tons, GVWR in kg | Both in tonnes. Rename GVWR to "Gross Vehicle Weight". GB: GVW as a select: 3.5t, 7.5t, 12t, 18t, 26t, 32t, 44t | Two units side by side cause typos. GB trucks are sold and licensed by weight class |
| KMs Driven | km in every country | GB: label "Mileage", unit miles. IN and SG keep km | UK trucks use miles |
| Make | free text | Select per country, plus Other. IN: Tata, Ashok Leyland, Mahindra, Eicher, BharatBenz. GB and SG: Volvo, Scania, DAF, Mercedes-Benz, MAN, Iveco, Isuzu, Hino | Typos split search today |
| Body Type | 5 options | Add Curtainsider, Refrigerated, Tractor Unit, Dropside, Car Transporter, Other | Common body types are missing; "Trailer" alone doesn't cover tractor units |
| Fuel Type | car fuel list (Petrol, Hybrid, LPG) | Diesel, CNG, LNG, Electric. GB drops CNG | Petrol and hybrid trucks are rare; LNG is missing |
| Condition | New, Used, Refurbished | New, Used | "Refurbished" is a parts term |
| Insurance Valid Till | all countries | IN only. GB gets Annual Test Expiry, SG gets COE Expiry (new fields below) | What GB and SG buyers check |
| Registration Number | shown on the ad, all countries | GB: keep. IN: replace with Registration State (RTO). SG: remove | A full plate on a public ad identifies the owner |
| Owner Type | IN wording everywhere | GB: "Previous Owners" 1, 2, 3, 4+. SG: "No. of Owners" 1, 2, 3+ | Match local wording |

## New fields to add

Truck can add 10 fields with no new field types. In IN, trucks are sorted by wheels and permit; in GB, by weight class, emissions and VAT.

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Listed By | select | Owner, Dealer | All | Yes | Same as Cars and Property |
| Number of Wheels | select | 4, 6, 10, 12, 14, 16, 18, 22 | IN | Yes in IN | Indian buyers search "10 wheeler", not by axle config |
| Permit Type | select | National, State, None | IN | No | Decides where the truck can run |
| Emission Standard | select | IN: BS IV, BS VI. GB and SG: Euro 4, Euro 5, Euro 6 | All | No | Older standards are banned or charged in city low-emission zones |
| Cab Type | select | Day Cab, Sleeper Cab | All | No | Long-haul buyers filter on it |
| Price Includes VAT | select | Yes, No (+VAT) | GB | Yes in GB | GB trade trucks are priced "+VAT", which adds 20% |
| Negotiable | select | Yes, No (default No) | All | No | Same as Property To Buy |
| Annual Test Expiry | date | — | GB | No | GB trucks need a yearly roadworthiness test (the truck MOT) |
| COE Expiry | date | — | SG | Yes in SG | Goods-vehicle value in SG depends on COE time left |
| Registration State (RTO) | select | Indian states | IN | No | Replaces the plate number |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [x] Payload + Gross Vehicle Weight both in tonnes; GB weight-class select
- [x] GB: Mileage in miles
- [x] Make as a select per country (Model stays text)
- [x] Body Type: add the 6 missing types
- [x] Fuel Type: Diesel, CNG, LNG, Electric
- [x] Condition: New, Used only
- [x] Insurance Valid Till in IN only
- [x] Registration Number: GB keep, IN replace with RTO state, SG remove
- [x] Owner Type wording per country
- [x] Add Listed By (required)
- [x] Add Number of Wheels, required, + Permit Type (IN)
- [x] Add Emission Standard
- [x] Add Cab Type
- [x] Add Price Includes VAT, required (GB)
- [x] Add Negotiable
- [x] Add Annual Test Expiry (GB)
- [x] Add COE Expiry, required (SG)

## Built — 18 Oct 2026

All 17 ticked items are live in IN, GB and SG (commit 2bc8875). Where the build differs from the suggestion:

- Make is a dropdown of 10 truck makes per market. Picking Other asks for the make.
- Gross Vehicle Weight: IN and SG type tonnes; GB picks a class (3.5t, 7.5t, 12t, 18t, 26t, 32t, 44t).
- Transmission stays Manual / Automatic / AMT in every market, since AMT trucks are common everywhere.
- There were no Truck posts, so nothing needed migrating.

## Search filters — 18 Oct 2026

Truck search now uses the new fields: Listed by, Body Type, Condition, Gross Weight (bands from up to 3.5t to over 26t; GB classes are matched too), Payload, Year, Mileage (truck bands up to 750,000 km, or miles in GB), Fuel Type, Emission Standard (BS in IN, Euro elsewhere), Cab Type and Owners, plus Wheels and Permit in IN and COE Left in SG.
