<!-- source: https://claude.ai/artifact/BdtScTKRof7fCZS6XVwBu4 -->
# Vehicles › Parts & Accessories — Post Form Review

Oct 18, 2026

The Parts form doesn't say which kind of vehicle a part is for, so car and bike parts mix in search. Its 6 part categories are too broad.

## Current fields

The Parts & Accessories form has 8 fields today, the same in IN, GB and SG. Only 4 are required: Adv Title, Adv Details, Parts Category and Price.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2000 characters |
| 3 | Good To Know | goodToKnow | goodToKnow | No | Seller's own label / value points |
| 4 | Parts Category | partsCategory | select | Yes | Engine, Electrical, Interior, Exterior, Tyres, Others |
| 5 | Brand | brand | text | No | Free text, half width |
| 6 | Condition | condition | select | No | New, Used, Refurbished |
| 7 | Compatible With | compatibility | tags | No | Free tags, "Type a make/model and press Enter" |
| 8 | Price | salePrice | currency | Yes | Min 1 |

There are no Parts & Accessories posts yet, so changes need no data migration.

## Field type changes

Two existing fields should change. Parts Category is too broad to search by.

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Parts Category | Engine, Electrical, Interior, Exterior, Tyres, Others | Engine & Transmission, Brakes & Suspension, Electrical & Lighting, Body & Exterior, Interior, Wheels & Tyres, Audio & Electronics, Accessories, Tools, Other | "Electrical" and "Exterior" each cover hundreds of different parts. Wheels belong with Tyres |
| Condition | New, Used, Refurbished | Add "For Parts / Not Working" | Broken parts sell for salvage and need to be marked |

## New fields to add

Parts can add 8 fields with no new field types. For Vehicle Type matters most: it stops car and bike parts mixing in search.

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| For Vehicle Type | select | Car, Motorcycle, Van, Truck, Boat, Universal | All | Yes | The first filter a parts buyer needs |
| Genuine or Aftermarket | select | Genuine (OEM), Aftermarket | All | No | Genuine parts sell for more; buyers filter on it |
| Part Number | text | — | All | No | The most exact way to match a part |
| Quantity | number | — | All | No | Tyres and wheels are usually sold in sets |
| Tyre Size | text, e.g. 205/55 R16 | — | All | No | Show only when Parts Category is Wheels & Tyres. Tyre buyers search by size |
| Deal Method | multiselect | Meet-up / Collection, Delivery / Courier | All | No | Reuse the Marketplace field; small parts are often posted |
| Listed By | select | Private, Trade | All | Yes | Breakers and parts shops are a big share of sellers |
| Negotiable | select | Yes, No (default No) | All | No | Same as Property To Buy |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [x] Parts Category: the 10 narrower categories
- [x] Condition: add For Parts / Not Working
- [x] Add For Vehicle Type (required)
- [x] Add Genuine or Aftermarket
- [x] Add Part Number
- [x] Add Quantity
- [x] Add Tyre Size (Wheels & Tyres only)
- [x] Add Deal Method
- [x] Add Listed By (required)
- [x] Add Negotiable

## Built — 18 Oct 2026

All 10 ticked items are live in IN, GB and SG (commit d7fcc21). Where the build differs from the suggestion:

- The new categories keep the old saved values (Engine, Electrical, Interior, Exterior, Tyres, Others), so existing data needed no migration.
- For Vehicle Type also offers Universal.
- Tyre Size shows only when Parts Category is Wheels & Tyres.
- Condition keeps Refurbished and adds For Parts / Not Working.

## Search filters — 18 Oct 2026

Parts search now uses the new fields: Listed by (Private / Trade), For Vehicle, Category, Condition, Genuine or Aftermarket, and Delivery available. Picking a vehicle type also finds Universal parts.
