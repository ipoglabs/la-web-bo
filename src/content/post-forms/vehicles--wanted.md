<!-- source: https://claude.ai/artifact/QCAFQN7Bd3s4JufRje2YZT -->
# Vehicles › Wanted — Post Form Review

Oct 18, 2026

The Wanted form can't ask for a boat or an EV, and shows Fuel Type and Transmission even when someone wants parts.

## Current fields

The Vehicles Wanted form has 10 fields today, the same in IN, GB and SG except Fuel Type. Only 4 are required: Adv Title, Adv Details, Vehicle Category and Max Budget.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2000 characters |
| 3 | Good To Know | goodToKnow | goodToKnow | No | Seller's own label / value points |
| 4 | Vehicle Category | vehicleType | select | Yes | Car, Motorcycle, Van, Truck, Parts |
| 5 | Preferred Make | make | text | No | Free text, half width |
| 6 | Preferred Model | model | text | No | Free text, half width |
| 7 | Min Year | year | number | No | 1900–2100, half width |
| 8 | Max Budget | maxBudget | currency | Yes | Min 1, half width |
| 9 | Fuel Type | fuelType | select | No | Car fuel list per country |
| 10 | Transmission | transmission | select | No | Manual, Automatic |

There are no Vehicles Wanted posts yet, so changes need no data migration.

## Field type changes

Four existing fields should change. Min Year is the subtle one: it is saved under the same key as a seller's Year.

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Vehicle Category | Car, Motorcycle, Van, Truck, Parts | Add Boat and Electric Vehicle, so it matches the 7 selling subcategories | Boat and EV buyers can't post a Wanted ad today |
| Fuel Type + Transmission | always shown | Show only for Car, Van, Truck and Electric Vehicle (Fuel Type also for Motorcycle) | They make no sense for Parts or Boat |
| Preferred Make | free text | Same make select as Cars, plus Any | Lets sellers' makes match buyers' |
| Min Year | saved as "year" | Save as "minYear" | A search for 2020 cars treats a "2020 or newer" request as an actual 2020 car |

## New fields to add

Wanted can add 6 fields with no new field types. Each helps a seller tell quickly whether they have a match.

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Max Mileage | number | km in IN and SG, miles in GB | All | No | The second thing a used-vehicle buyer limits, after budget |
| Body Type | select | Same list as Cars | All | No | Show only for Car. "Wants an SUV" is the most common request |
| Condition | select | New, Used, Any | All | No | Dealers want to know whether a new vehicle is wanted |
| Buying From | select | Owner, Dealer, Any | All | No | Matches Listed By on the selling forms |
| Part Wanted | text | — | All | No | Show only for Parts. The part name or number |
| Needed By | select | As soon as possible, Within a month, Just looking | All | No | Sellers reply first to buyers ready to buy |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [x] Vehicle Category: add Boat and Electric Vehicle
- [x] Fuel Type + Transmission only for vehicle categories
- [x] Preferred Make as the Cars make select
- [x] Min Year saved as minYear
- [x] Add Max Mileage
- [x] Add Body Type (Car only)
- [x] Add Condition
- [x] Add Buying From
- [x] Add Part Wanted (Parts only)
- [x] Add Needed By

## Built — 18 Oct 2026

All 10 ticked items are live in IN, GB and SG (commit fe6e61c). Where the build differs from the suggestion:

- Fuel Type shows for Car, Motorcycle, Van and Truck; Transmission for Car, Van and Truck. Neither shows for Electric Vehicle, Boat or Parts.
- Make, Model and Min Year are hidden when the buyer wants Parts. Preferred Make offers Any first.
- Max Mileage is in km, or miles in GB, and shows for road vehicles only.
- There were no Wanted posts, so nothing needed migrating.

## Search filters — 18 Oct 2026

Wanted search now filters on Looking For, Condition, Buying From and Needed By. The price filter is labelled "Max Budget" and compares the buyer's budget. A buyer who chose Any condition or Any seller shows under both choices.
