<!-- source: https://claude.ai/artifact/CfYcyFmJMEuRW3grwdQEsQ -->
# Services › Technology & Gadgets — Post Form Review

Oct 22, 2026

The Technology & Gadgets form is the same in IN, GB and SG. The biggest gaps: Service Type leans to software work, while the Service filter is about repairs, and repairs don't ask for warranty or turnaround.

## Current fields

The Technology & Gadgets form has 8 fields today. 4 are required: Adv Title, Adv Details, Service Type and Price.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2000 characters |
| 3 | Good To Know | goodToKnow | goodToKnow | No | Seller's own label / value points |
| 4 | Service Type | serviceType | select | Yes | IT Support, Software Development, Web Design, Networking, Repair, Consulting, Other |
| 5 | Skills / Tools | skills | tags | No | Type your own |
| 6 | Rate Type | rateType | select | No | Hourly, Daily, Monthly, Per Project, Negotiable |
| 7 | Price | price | currency | Yes | Min 1, half width |
| 8 | Availability | availability | text | No | Max 200 characters, Placeholder "e.g. Mon–Sat, 9am–6pm", half width |

There are 7 Technology & Gadgets posts (IN 2, GB 3, SG 2), all seed samples with only a title and a price. None has a value for any detail field above.

The search offers Service and How filters. Neither works today: Service Type (IT Support, Software Development, Web Design, Networking, Repair, Consulting) shares only IT Support with the filter (Phone Repair, Laptop Repair, Smart Home, Data Recovery, IT Support, 3D Printing).

## Field type changes

4 existing fields should change. The most important: Price saves to the field search reads, so the price filter works.

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Price | saved as `price` | Save as `salePrice`, the field listing prices and the price filter read | The price filter searches `salePrice`, so new posts never match it. The seed posts already use `salePrice`, so nothing needs migrating |
| Service Type | 7 choices, one "Repair" | Phone Repair, Laptop / PC Repair, Smart Home & CCTV, Networking & Wi-Fi, Data Recovery, IT Support, Software & Web Development, 3D Printing, Other | Covers every value of the Service search filter and splits repairs by device |
| Skills / Tools | tags | Brands / Devices tags, max 10 | Repair customers look for their brand (Apple, Samsung, Dell) |
| Rate Type | includes "Negotiable" | Per repair, Hourly, Daily, Per project. Negotiable removed | Negotiable isn't a rate; it says nothing about what the price covers |

## New fields to add

Technology & Gadgets can add 4 fields with no new field types.

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Listed By | select | Individual, Shop / Company | All | Yes | Customers trust a shop with an address differently from a freelancer |
| Service Mode | multiselect | Walk-in, Doorstep, Remote | All | No | The How search filter has nothing to match today |
| Warranty | select | None, 30 days, 90 days, 6 months+ | All | No | Repair buyers ask about warranty first. Shown for repair types |
| Turnaround | select | Same day, 1–2 days, 3+ days | All | No | How long the device is gone. Shown for repair types |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [x] Save Price as `salePrice` so the price filter finds new posts
- [x] Service Type covering the Service filter, repairs split by device
- [x] Skills / Tools → Brands / Devices tags
- [x] Rate Type without Negotiable, Per repair added
- [x] Add Listed By (required)
- [x] Add Service Mode (Walk-in, Doorstep, Remote)
- [x] Add Warranty (repairs)
- [x] Add Turnaround (repairs)
- [x] Wire the Service and How filters (search only)
- [x] Backfill details on the 7 seed posts so the new filters have something to match

## Built — 22 Oct 2026

All 10 ticked items are live in IN, GB and SG (commit 74d37e8). Where the build differs from the suggestion:

- Warranty and Turnaround appear for Phone Repair, Laptop / PC Repair and Data Recovery.
- Service Mode's Walk-in, Doorstep and Remote are saved as the How filter's In-person, Home Visit and Online.
- The Service search filter gained Networking, Software & Web and Other.
- Listings show the price as "/ repair", "/ hr", "/ day" or "/ project" from Rate Type.
- Existing posts: the 7 seed posts got Service Type, Listed By, Service Mode and Rate Type, plus Brands, Warranty and Turnaround where their ad gave them. Listed By is a guess from each ad.
