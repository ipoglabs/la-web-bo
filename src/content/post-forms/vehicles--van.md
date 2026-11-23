<!-- source: https://claude.ai/artifact/AoCmVtQ1R7VLVyafyweorR -->
# Vehicles › Van — Post Form Review

Oct 18, 2026

The Van form is built like a car form. It is missing what van buyers check first: Van Type, Payload and, in GB, whether the price includes VAT.

## Current fields

The Van form has 17 fields today, the same in IN, GB and SG except Fuel Type. Only 6 are required: Adv Title, Adv Details, Make, Model, Year and Price.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2000 characters |
| 3 | Good To Know | goodToKnow | goodToKnow | No | Seller's own label / value points |
| 4 | Make | make | text | Yes | Free text, half width |
| 5 | Model | model | text | Yes | Free text, half width |
| 6 | Year | year | number | Yes | 1900–2100, half width |
| 7 | KMs Driven | kms | number | No | Unit km in every country |
| 8 | Seating Capacity | seatingCapacity | number | No | 1–100, half width |
| 9 | Color | color | text | No | Free text, half width |
| 10 | Fuel Type | fuelType | select | No | IN: Petrol, Diesel, CNG, Electric, Hybrid. GB: Petrol, Diesel, Electric, Hybrid, LPG. SG: Petrol, Diesel, Electric, Hybrid, CNG |
| 11 | Transmission | transmission | select | No | Manual, Automatic, AMT (all countries) |
| 12 | Condition | condition | select | No | New, Used, Refurbished |
| 13 | Price | salePrice | currency | Yes | Min 1 |
| 14 | Owner Type | ownerType | select | No | First Owner, Second Owner, Third Owner or more |
| 15 | Registration Number | registrationNumber | text | No | Half width, shown on the ad |
| 16 | Insurance Valid Till | insuranceValidTill | date | No | Half width |
| 17 | Service History | serviceHistory | select | No | Full, Partial, None |

There are 2 Van posts: 1 SG and 1 with no country.

## Field type changes

Nine existing fields should change. Most match the Cars review; Seating Capacity and Condition are van-specific.

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| KMs Driven | km in every country | GB: label "Mileage", unit miles. IN and SG keep km | UK vans and listings use miles |
| Make | free text | Select per country, plus Other. Model stays free text | Typos split search today |
| Color | free text | Select: White, Silver, Grey, Black, Blue, Red, Other | Makes colour a filter |
| Seating Capacity | number, 1–100 | Select: 2, 3, 5, 6, 7, 8, 9+ | Chips are quicker; 100 seats is a typo |
| Transmission | AMT in every country | AMT in IN only. GB and SG: Manual, Automatic | AMT is an Indian term |
| Condition | New, Used, Refurbished | New, Used | "Refurbished" is a parts term, not a van one |
| Insurance Valid Till | all countries | IN only. GB gets MOT Expiry, SG gets COE Expiry (new fields below) | MOT and COE are what GB and SG buyers check |
| Registration Number | shown on the ad, all countries | GB: keep. IN: replace with Registration State (RTO). SG: remove | A full plate on a public ad identifies the owner |
| Owner Type | IN wording everywhere | GB: "Previous Owners" 1, 2, 3, 4+. SG: "No. of Owners" 1, 2, 3+ | Match local wording |

## New fields to add

Van can add 10 fields with no new field types. Van Type and Payload come first; in GB, so does VAT.

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Van Type | select | Panel Van, Minibus, Luton / Box, Crew / Double Cab, Pickup, Refrigerated, Camper | All | Yes | A minibus buyer and a cargo-van buyer want different ads |
| Listed By | select | Owner, Dealer | All | Yes | Same as Cars and Property |
| Payload | number, unit kg | — | All | No | The main spec for cargo vans |
| Price Includes VAT | select | Yes, No (+VAT) | GB | Yes in GB | GB trade vans are priced "+VAT", which adds 20% |
| Wheelbase | select | Short (SWB), Medium (MWB), Long (LWB) | GB | No | Standard GB van filter |
| Roof Height | select | Low, Medium, High | GB | No | Standard GB van filter |
| Negotiable | select | Yes, No (default No) | All | No | Same as Property To Buy |
| MOT Expiry | date | — | GB | No | Vans over 3 years old need one |
| COE Expiry | date | — | SG | Yes in SG | Goods-vehicle value in SG depends on COE time left |
| Registration State (RTO) | select | Indian states | IN | No | Replaces the plate number |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [x] GB: Mileage in miles
- [x] Make as a select per country (Model stays text)
- [x] Color as a select
- [x] Seating Capacity as a select
- [x] AMT in IN only
- [x] Condition: New, Used only
- [x] Insurance Valid Till in IN only
- [x] Registration Number: GB keep, IN replace with RTO state, SG remove
- [x] Owner Type wording per country
- [x] Add Van Type (required)
- [x] Add Listed By (required)
- [x] Add Payload
- [x] Add Price Includes VAT, required (GB)
- [x] Add Wheelbase + Roof Height (GB)
- [x] Add Negotiable
- [x] Add MOT Expiry (GB)
- [x] Add COE Expiry, required (SG)
- [x] Give the Van post with no country a country

## Built — 18 Oct 2026

All 18 ticked items are live in IN, GB and SG (commit a0a043e). Where the build differs from the suggestion:

- Make is a dropdown of 9–13 van makes per market. Picking Other asks for the make.
- Seats options are 2, 3, 5, 6, 7, 8 and 9+ (9+ is saved as 9).
- Payload is in kg, up to 50,000.
- The Van post with no country ("rent", Thanjavur) was given India from its address. Its typed make "2001" became Make = Other / 2001 and its colour became White. Its Owner Type "single" matches no option, so the seller re-picks it on their next edit.

## Search filters — 18 Oct 2026

Van search now uses the new fields: Listed by, Van Type, Condition, Year, Mileage (km, or miles in GB), Payload, Seats, Fuel Type, Transmission (AMT in IN only), Owners, Color, plus Wheelbase and Roof Height in GB and COE Left in SG. Checked on the live site: Color = White finds the Thanjavur van.
