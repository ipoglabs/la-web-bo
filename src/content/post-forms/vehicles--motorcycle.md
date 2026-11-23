<!-- source: https://claude.ai/artifact/84oTWMsk4tCTRXgbw4QN9m -->
# Vehicles › Motorcycle — Post Form Review

Oct 18, 2026

The Motorcycle form has no Bike Type, so a scooter and a sports bike look the same in search. GB mileage is in km, and there's no MOT (GB) or COE (SG).

## Current fields

The Motorcycle form has 17 fields today. Only 6 are required: Adv Title, Adv Details, Make, Model, Year and Price.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2000 characters |
| 3 | Good To Know | goodToKnow | goodToKnow | No | Seller's own label / value points |
| 4 | Make | make | text | Yes | Free text, half width |
| 5 | Model | model | text | Yes | Free text, half width |
| 6 | Year | year | number | Yes | 1900–2100, half width |
| 7 | KMs Driven | kms | number | No | Unit km in every country |
| 8 | Engine Capacity | engineCapacity | number | No | Unit cc, 1–20,000, half width |
| 9 | Color | color | text | No | Free text, half width |
| 10 | Fuel Type | fuelType | select | No | IN: Petrol, Electric. GB and SG: Petrol, Electric, Hybrid |
| 11 | Transmission | transmission | select | No | Manual, Automatic |
| 12 | Condition | condition | select | No | New, Used |
| 13 | Price | salePrice | currency | Yes | Min 1 |
| 14 | Owner Type | ownerType | select | No | First Owner, Second Owner, Third Owner or more |
| 15 | Registration Number | registrationNumber | text | No | Half width, shown on the ad |
| 16 | Insurance Valid Till | insuranceValidTill | date | No | Half width |
| 17 | Service History | serviceHistory | select | No | Full, Partial, None |

There are 2 motorcycle posts, both saved under the old subcategory name "Bikes" with no country.

## Field type changes

Eight existing fields should change. As with Cars, GB mileage should be in miles.

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| KMs Driven | km in every country | GB: label "Mileage", unit miles. IN and SG keep km | UK bikes and listings use miles |
| Make | free text | Select per country, plus Other. IN: Hero, Honda, Bajaj, TVS, Royal Enfield, Yamaha, Suzuki, KTM, Ather, Ola. GB and SG: Honda, Yamaha, Kawasaki, Suzuki, BMW, Triumph, Ducati, Harley-Davidson, KTM, Vespa | Typos split search today |
| Color | free text | Select: Black, White, Red, Blue, Grey, Silver, Green, Other | Makes colour a filter |
| Fuel Type | Hybrid in GB and SG | Petrol, Electric in every country | Hybrid motorbikes are almost unknown; the option invites mistakes |
| Transmission | Manual, Automatic | IN labels "Geared" and "Gearless (scooter)", same stored values | Indian buyers use those words |
| Insurance Valid Till | all countries | IN only. GB gets MOT Expiry, SG gets COE Expiry (new fields below) | MOT and COE are what GB and SG buyers check |
| Registration Number | shown on the ad, all countries | GB: keep. IN: replace with Registration State (RTO). SG: remove | A full plate on a public ad identifies the owner |
| Owner Type | IN wording everywhere | GB: "Previous Owners" 1, 2, 3, 4+. SG: "No. of Owners" 1, 2, 3+ | Match local wording |

## New fields to add

Motorcycle can add 6 fields with no new field types. Bike Type is the gap buyers notice first.

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Bike Type | select | Scooter, Commuter, Sports, Cruiser, Adventure / Touring, Off-road, Moped | All | Yes | Scooter and sports-bike buyers never want each other's results |
| Listed By | select | Owner, Dealer | All | Yes | Same as Cars and Property |
| Negotiable | select | Yes, No (default No) | All | No | Same as Property To Buy |
| MOT Expiry | date | — | GB | No | Bikes over 3 years old need one |
| COE Expiry | date | — | SG | Yes in SG | Bike value in SG depends on COE time left |
| Registration State (RTO) | select | Indian states | IN | No | Replaces the plate number |

No licence class field is needed: SG classes 2B, 2A and 2, and GB categories A1, A2 and A, all follow Engine Capacity. Search can offer them as a filter worked out from cc.

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [x] GB: Mileage in miles
- [x] Make as a select per country (Model stays text)
- [x] Color as a select
- [x] Fuel Type: Petrol, Electric only
- [x] IN: Geared / Gearless labels
- [x] Insurance Valid Till in IN only
- [x] Registration Number: GB keep, IN replace with RTO state, SG remove
- [x] Owner Type wording per country
- [x] Add Bike Type (required)
- [x] Add Listed By (required)
- [x] Add Negotiable
- [x] Add MOT Expiry (GB)
- [x] Add COE Expiry, required (SG)
- [x] Licence class filter in search, worked out from cc
- [x] Move the 2 old "Bikes" posts to Motorcycle and give them a country

## Built — 18 Oct 2026

All 15 ticked items are live in IN, GB and SG (commits 914df1f and 72c50fe). Where the build differs from the suggestion:

- Make is a dropdown of 14–16 makes per market. Picking Other asks for the make.
- The 2 old "Bikes" posts were deleted smoke-test posts with no location. They moved to Motorcycle and were given India. The dev smoke-test seed now writes Motorcycle / India too.
- Licence class is a search filter worked out from Engine Capacity: GB A1 / learner (up to 125cc), A2 (126–500cc), A (over 500cc); SG Class 2B (up to 200cc), 2A (201–400cc), 2 (over 400cc). India shows plain cc bands. GB A2 is really set by power (35 kW), so 500cc is an approximation.

## Search filters — 18 Oct 2026

Motorcycle search now uses the new fields: Listed by, Bike Type, Condition, Engine Size / Licence Class, Year, Mileage (km, or miles in GB), Fuel Type, Transmission (Geared / Gearless in IN), Owners, Color, and COE Left in SG. There is no Make filter yet: filters can only be chips, and a make list needs a dropdown filter.
