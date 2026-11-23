<!-- source: https://claude.ai/artifact/AjMtUr7eSRor2ZXMouJ4nz -->
# Vehicles › Electric Vehicles — Post Form Review

Oct 18, 2026

The EV form has no History section and no battery health, the two things used-EV buyers check. An electric car can also be posted under Cars, which splits search.

## Current fields

The Electric Vehicles form has 14 fields today, the same in IN, GB and SG. Only 6 are required: Adv Title, Adv Details, Vehicle Type, Make, Model and Price.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2000 characters |
| 3 | Good To Know | goodToKnow | goodToKnow | No | Seller's own label / value points |
| 4 | Vehicle Type | vehicleType | select | Yes | Car, Motorcycle / Scooter, Bicycle, Other |
| 5 | Make | make | text | Yes | Free text, half width |
| 6 | Model | model | text | Yes | Free text, half width |
| 7 | Year | year | number | No | 1900–2100, half width |
| 8 | KMs Driven | kms | number | No | Unit km in every country |
| 9 | Battery Capacity | batteryCapacity | number | No | Unit kWh, 0–1000, half width |
| 10 | Range | rangeKm | number | No | Unit km, 0–5000, half width |
| 11 | Charging Type | chargingType | select | No | AC, DC Fast, Both |
| 12 | Color | color | text | No | Free text, half width |
| 13 | Condition | condition | select | No | New, Used, Refurbished |
| 14 | Price | salePrice | currency | Yes | Min 1 |

There are no Electric Vehicles posts yet, so changes need no data migration.

## Field type changes

Seven existing fields should change. Charging Type is the least clear: "AC, DC Fast, Both" doesn't say which plug the car takes.

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Vehicle Type | Car, Motorcycle / Scooter, Bicycle, Other | Add Van. IN adds Three-wheeler | E-rickshaws are a large Indian EV market |
| Year | optional | Required, except for Bicycle | Cars requires it; used-EV value depends on battery age |
| KMs Driven + Range | km in every country | GB: miles for both. IN and SG keep km | UK EVs and listings use miles |
| Charging Type | AC, DC Fast, Both | Charging Port select (IN: Type 2, CCS2, Bharat, Other. GB and SG: Type 2, CCS2, CHAdeMO, Other) + DC Fast Charging Yes / No | Buyers need to know which public chargers fit |
| Make | free text | Select per country, plus Other. Model stays free text | Typos split search today |
| Color | free text | Select: White, Black, Silver, Grey, Blue, Red, Other | Makes colour a filter |
| Condition | New, Used, Refurbished | New, Used | "Refurbished" is a parts term |

## New fields to add

EV can add 7 items with no new field types. Battery Health matters most: for a used EV it's what mileage is for a petrol car.

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| History section | section | Owner Type, Registration, Service History, plus Insurance (IN), MOT Expiry (GB), COE Expiry (SG) | All | As on Cars | Cars, Motorcycle and Van all have it; EV doesn't. Hidden for Bicycle |
| Battery Health | number, unit % | 0–100 | All | No | The main wear figure for a used EV |
| Battery Warranty Until | date | — | All | No | Most EV batteries carry an 8-year warranty buyers ask about |
| Charger Included | select | Yes, No | All | No | A home charger is worth a lot to buyers |
| Motor Power | number, unit kW | — | All | No | Key spec, missing today |
| Listed By | select | Owner, Dealer | All | Yes | Same as Cars and Property |
| Negotiable | select | Yes, No (default No) | All | No | Same as Property To Buy |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [x] Electric cars: keep the EV subcategory, and have Cars search with Fuel Type = Electric also show EV cars
- [x] Vehicle Type: add Van; Three-wheeler in IN
- [x] Year required (not for Bicycle)
- [x] GB: Mileage and Range in miles
- [x] Replace Charging Type with Charging Port + DC Fast Charging
- [x] Make as a select per country (Model stays text)
- [x] Color as a select
- [x] Condition: New, Used only
- [x] Add the History section (not for Bicycle)
- [x] Add Battery Health
- [x] Add Battery Warranty Until
- [x] Add Charger Included
- [x] Add Motor Power
- [x] Add Listed By (required)
- [x] Add Negotiable

## Built — 18 Oct 2026

All 15 ticked items are live in IN, GB and SG (commit 52b8c9c). Where the build differs from the suggestion:

- For a Bicycle, Year and the whole History section are hidden, so a bicycle never has to fill a required Year or COE Expiry.
- Make is a dropdown of 13–17 EV makes per market, covering cars and two-wheelers. Picking Other asks for the make.
- Charging Port options: IN Type 2, CCS2, Bharat (AC / DC), Other; GB and SG Type 2, CCS2, CHAdeMO, Other.
- The charger field is labelled "Home Charger Included".
- There were no EV posts, so nothing needed migrating.

## Search filters — 18 Oct 2026

EV search now uses the new fields: Listed by, Vehicle Type, Condition, Year, Mileage, Range (km, or miles in GB), Battery Health, Charging Port, DC fast charging, Charger included, Owners, Color, and COE Left in SG.

Cars search with Fuel Type = Electric now also shows electric cars posted under Electric Vehicles. Only cars come through: EV bikes, vans and bicycles stay out.
