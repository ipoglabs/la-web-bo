<!-- source: https://claude.ai/artifact/47yLveYzNwqphRmsGY71mu -->
# Vehicles › Boats — Post Form Review

Oct 18, 2026

The Boats form is short: 11 fields. It is missing Engine Hours, the number used-boat buyers check first, plus hull, berths and trailer.

## Current fields

The Boats form has 11 fields today, the same in IN, GB and SG. Only 4 are required: Adv Title, Adv Details, Boat Type and Price. There is no History section.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2000 characters |
| 3 | Good To Know | goodToKnow | goodToKnow | No | Seller's own label / value points |
| 4 | Boat Type | boatType | select | Yes | Motor, Sail, Yacht, Fishing, Jet Ski, Other |
| 5 | Make | make | text | No | Free text, half width |
| 6 | Model | model | text | No | Free text, half width |
| 7 | Year | year | number | No | 1900–2100, half width |
| 8 | Length | lengthFt | number | No | Unit ft, 1–1000, half width |
| 9 | Engine Type | engineType | select | No | Inboard, Outboard, None |
| 10 | Condition | condition | select | No | New, Used, Refurbished |
| 11 | Price | salePrice | currency | Yes | Min 1 |

There are no Boats posts yet, so changes need no data migration.

## Field type changes

Three existing fields should change. Boat Type is missing common types, including GB's narrowboats.

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Boat Type | Motor, Sail, Yacht, Fishing, Jet Ski, Other | Add Speedboat, RIB / Inflatable, Houseboat. GB adds Narrowboat | RIBs and narrowboats are large markets with their own buyers |
| Engine Type | Inboard, Outboard, None | Add Sterndrive and Jet | Common engine set-ups that don't fit today's options |
| Condition | New, Used, Refurbished | New, Used | "Refurbished" is a parts term |

## New fields to add

Boats can add 11 fields with no new field types. Engine Hours matters most: for a used boat it plays the part mileage plays for a car.

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Engine Hours | number, unit hrs | — | All | No | The main wear figure for a used boat |
| Engine Power | number, unit hp | — | All | No | Key spec for motor boats |
| Fuel Type | select | Petrol, Diesel, Electric, None | All | No | Running cost and fuel-dock access depend on it |
| Hull Material | select | GRP / Fibreglass, Aluminium, Steel, Wood, Inflatable | All | No | Upkeep and value depend on it |
| Berths | number | — | All | No | How many can sleep aboard; a top filter for cruisers |
| Max Passengers | number | — | All | No | Day-boat buyers filter on it |
| Trailer Included | select | Yes, No | All | No | Small boats are often sold with a trailer |
| Mooring Included | select | Yes, No | GB, SG | No | A transferable mooring adds real value |
| Listed By | select | Owner, Broker, Dealer | All | Yes | Boats are often sold through brokers |
| VAT Paid | select | Yes, No | GB | No | GB buyers check VAT status on bigger boats |
| Negotiable | select | Yes, No (default No) | All | No | Same as Property To Buy |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [x] Boat Type: add Speedboat, RIB / Inflatable, Houseboat; Narrowboat in GB
- [x] Engine Type: add Sterndrive and Jet
- [x] Condition: New, Used only
- [x] Add Engine Hours
- [x] Add Engine Power
- [x] Add Fuel Type
- [x] Add Hull Material
- [x] Add Berths + Max Passengers
- [x] Add Trailer Included
- [x] Add Mooring Included (GB, SG)
- [x] Add Listed By (required)
- [x] Add VAT Paid (GB)
- [x] Add Negotiable

## Built — 18 Oct 2026

All 13 ticked items are live in IN, GB and SG (commit e7c6a5b). Where the build differs from the suggestion:

- Make and Model stay optional free text (not on the list).
- Mooring Included shows in GB and SG; VAT Paid in GB only; Narrowboat in GB only.
- Fuel Type also offers None (for sail-only boats).
- There were no Boats posts, so nothing needed migrating.

## Search filters — 18 Oct 2026

Boats search now uses the new fields: Listed by (with Broker), Boat Type, Condition, Year, Length (up to 20 ft to over 40 ft), Engine Hours (up to 250 to 2,000 hrs), Hull Material, Engine, Fuel Type, Berths, Trailer included, plus Mooring included in GB and SG.
