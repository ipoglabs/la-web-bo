<!-- source: https://claude.ai/artifact/UjVxE8UYW1QAd84n7PKFzL -->
# Vehicles › Cars — Post Form Review

Oct 18, 2026

The Cars form treats all three markets the same. The biggest gaps: mileage is in km in GB, and there is no MOT (GB) or COE (SG).

## Current fields

The Cars form has 17 fields today, the same in IN, GB and SG except Fuel Type. Only 6 are required: Adv Title, Adv Details, Make, Model, Year and Price.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2000 characters |
| 3 | Good To Know | goodToKnow | goodToKnow | No | Seller's own label / value points |
| 4 | Make | make | text | Yes | Free text, half width |
| 5 | Model | model | text | Yes | Free text, half width |
| 6 | Year | year | number | Yes | 1900–2100, half width |
| 7 | KMs Driven | kms | number | No | Unit km in every country |
| 8 | Fuel Type | fuelType | select | No | IN: Petrol, Diesel, CNG, Electric, Hybrid. GB: Petrol, Diesel, Electric, Hybrid, LPG. SG: Petrol, Diesel, Electric, Hybrid, CNG |
| 9 | Transmission | transmission | select | No | Manual, Automatic, AMT (all countries) |
| 10 | Body Type | bodyType | select | No | SUV, Sedan, Hatchback, Coupe, MPV, Estate, Convertible, Pickup |
| 11 | Color | color | text | No | Free text, half width |
| 12 | Seats | seatingCapacity | number | No | 1–100, half width |
| 13 | Price | salePrice | currency | Yes | Min 1 |
| 14 | Owner Type | ownerType | select | No | First Owner, Second Owner, Third Owner or more |
| 15 | Registration Number | registrationNumber | text | No | Half width, shown on the ad |
| 16 | Insurance Valid Till | insuranceValidTill | date | No | Half width |
| 17 | Service History | serviceHistory | select | No | Full, Partial, None |

There are 3 Cars posts, all IN. 2 of them are saved under the old subcategory name "Car".

## Field type changes

Ten existing fields should change. The most important: KMs Driven is in km in GB, where every odometer and listing uses miles.

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| KMs Driven | km in every country | GB: label "Mileage", unit miles. IN and SG keep km | A GB "60,000" is read as km today, so search compares the wrong numbers |
| Make | free text | Select with the common makes per country, plus Other. Model stays free text | "Maruti", "Maruti Suzuki" and "maruti" become three makes, which splits search |
| Color | free text | Select: White, Black, Silver, Grey, Blue, Red, Brown, Green, Other | Makes colour a filter |
| Seats | number, 1–100 | Select: 2, 4, 5, 6, 7, 8+ | No car has 100 seats, and chips are quicker |
| Transmission | AMT in every country | AMT in IN only. GB and SG: Manual, Automatic | AMT is an Indian term |
| Body Type | same list everywhere | GB shows "Saloon" for Sedan (same stored value). IN adds MUV | Matches the words buyers use locally |
| Fuel Type | no Plug-in Hybrid | Add Plug-in Hybrid in all countries | Plug-in hybrids are a separate filter on the big car sites |
| Insurance Valid Till | all countries | IN only. GB gets MOT Expiry, SG gets COE Expiry (new fields below) | GB insurance stays with the owner. MOT and COE are what buyers check |
| Registration Number | shown on the ad, all countries | GB: keep (buyers run a history check on it). IN: replace with Registration State (RTO). SG: remove | A full plate on a public ad identifies the owner |
| Owner Type | IN wording everywhere | GB: "Previous Owners" 1, 2, 3, 4+. SG: "No. of Owners" 1, 2, 3+ | "First Owner" is Indian wording; GB counts keepers on the V5C |

## New fields to add

Cars can add 10 fields with no new field types. Listed By and the country checks (MOT in GB, COE in SG) matter most to buyers.

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Listed By | select | Owner, Dealer | All | Yes | "Private or dealer" is a top filter on car sites. Property already has it |
| Condition | select | New, Used | All | No | Motorcycle, Van and Truck have it; Cars doesn't |
| Negotiable | select | Yes, No (default No) | All | No | Property To Buy already has it |
| Engine Size | number | cc in IN and SG, litres in GB | All | No | A key spec, missing today |
| MOT Expiry | date | — | GB | No | Every UK used-car ad shows it |
| ULEZ Compliant | select | Yes, No | GB | No | Decides whether the car can drive in London without a daily charge |
| COE Expiry | date | — | SG | Yes in SG | Most of an SG car's value is the COE time left |
| Registration Date | date | — | SG | No | SG prices and depreciation count from it |
| Depreciation per Year | currency | — | SG | No | The main number SG buyers compare cars by |
| Registration State (RTO) | select | Indian states | IN | No | Replaces the plate number; re-registration cost depends on it |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [x] GB: Mileage in miles
- [x] Make as a select per country (Model stays text)
- [x] Color as a select
- [x] Seats as a select
- [x] AMT in IN only
- [x] GB "Saloon" label; IN adds MUV
- [x] Add Plug-in Hybrid to Fuel Type
- [x] Insurance Valid Till in IN only
- [x] Registration Number: GB keep, IN replace with RTO state, SG remove
- [x] Owner Type wording per country
- [x] Add Listed By (required)
- [x] Add Condition
- [x] Add Negotiable
- [x] Add Engine Size
- [x] Add MOT Expiry + ULEZ Compliant (GB)
- [x] Add COE Expiry (required), Registration Date, Depreciation per Year (SG)
- [x] Move the 2 old "Car" posts to Cars

## Built — 18 Oct 2026

All 17 ticked items are live in IN, GB and SG (commit 4bdaf60). Where the build differs from the suggestion:

- Make is a dropdown, not chips, because the lists are long (22 makes in IN, 28 in GB, 20 in SG). Picking Other asks for the make.
- Registration State (IN) is a dropdown of all 36 states and union territories.
- Seats 8+ is saved as 8.
- GB Engine Size is in litres, IN and SG in cc.
- Existing posts: the 2 old "Car" posts moved to Cars, and their Transmission was matched to the new options.
- Search filters on the new fields since commit 72c50fe (see below).

## Search filters — 18 Oct 2026

Cars search now uses the new fields: Listed by, Condition, Year, Mileage (km, or miles in GB), Fuel Type, Transmission, Body Type (Saloon in GB, MUV in IN), Owners, Seats, Color, plus ULEZ in GB and COE Left in SG. There is no Make filter yet: filters can only be chips, and a make list needs a dropdown filter.
