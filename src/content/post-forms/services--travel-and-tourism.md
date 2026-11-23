<!-- source: https://claude.ai/artifact/Ww7uXWA1CeXEYBPmUGhrpi -->
# Services › Travel & Tourism — Post Form Review

Oct 22, 2026

The Travel & Tourism form is the same in IN, GB and SG. The biggest gaps: Service Type doesn't match the Service filter, the form has no Domestic / International, and the licences each market requires aren't asked for.

## Current fields

The Travel & Tourism form has 10 fields today. 3 are required: Adv Title, Adv Details and Price.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2000 characters |
| 3 | Good To Know | goodToKnow | goodToKnow | No | Seller's own label / value points |
| 4 | Service Type | serviceType | select | No | Tour, Package, Guide, Transport, Other |
| 5 | Destination | destination | text | No | Max 200 characters, half width |
| 6 | Duration | durationText | text | No | Max 200 characters, Placeholder "e.g. 3 nights / 4 days", half width |
| 7 | Package Details | packageDetails | textarea | No | Max 1000 characters |
| 8 | Agency Name | agencyName | text | No | Max 200 characters, half width |
| 9 | Price | price | currency | Yes | Min 1, half width |
| 10 | Availability | availability | text | No | Max 200 characters, Placeholder "e.g. Mon–Sat, 9am–6pm", half width |

There are 7 Travel & Tourism posts (IN 2, GB 3, SG 2), all seed samples with only a title and a price. None has a value for any detail field above.

The search offers Service and Destination filters. Neither works today: Service Type (Tour, Package, Guide, Transport, Other) differs from the filter (Tour Guide, Travel Agent, Visa Assistance, Airport Transfer, Trip Planning), and Destination needs Domestic or International, which the form doesn't ask.

## Field type changes

5 existing fields should change. The most important: Price saves to the field search reads, so the price filter works.

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Price | saved as `price` | Save as `salePrice`, the field listing prices and the price filter read | The price filter searches `salePrice`, so new posts never match it. The seed posts already use `salePrice`, so nothing needs migrating |
| Service Type | Tour, Package, Guide, Transport, Other | Required select: Tour Package, Tour Guide, Travel Agent / Bookings, Visa Assistance, Airport Transfer, Car / Coach Hire, Trip Planning, Other | Covers every value of the Service search filter |
| Duration | free text, e.g. "3 nights / 4 days" | Nights number + Days number, shown for Tour Package | Lets packages be compared and sorted by length |
| Package Details | 1000-character text box | Remove | Repeats Adv Details; sellers write the itinerary there |
| Availability | free text | Rename to "Travel Dates" | "Mon–Sat, 9am–6pm" doesn't fit a tour |

## New fields to add

Travel & Tourism can add 5 fields with no new field types.

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Destination Type | select | Domestic, International | All | No | The Destination search filter has nothing to match today |
| Inclusions | multiselect | Flights, Hotel, Meals, Transfers, Sightseeing, Guide | All | No | Buyers compare packages by what's included. Shown for Tour Package |
| Price Per | select | Per person, Per group, Per day, Per trip | All | No | Package prices are usually per person |
| ATOL Protected | select | Yes, No | GB | No | UK law requires ATOL for packages with flights, and buyers look for it |
| STB Licence No. | text | — | SG | No | Travel agents in Singapore must hold a Singapore Tourism Board licence |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [x] Save Price as `salePrice` so the price filter finds new posts
- [x] Service Type as a required select covering the Service filter
- [x] Duration as Nights + Days numbers (Tour Package)
- [x] Remove Package Details
- [x] Availability → Travel Dates
- [x] Add Destination Type
- [x] Add Inclusions (Tour Package)
- [x] Add Price Per
- [x] Add ATOL Protected (GB)
- [x] Add STB Licence No. (SG)
- [x] Wire the Service and Destination filters (search only)
- [x] Backfill details on the 7 seed posts so the new filters have something to match

## Built — 22 Oct 2026

All 12 ticked items are live in IN, GB and SG (commit 74d37e8). Where the build differs from the suggestion:

- The Service search filter gained Tour Package, Car / Coach Hire and Other, so every Service Type in the form can be searched.
- Days can't be fewer than Nights.
- Listings show the price as "/ person", "/ group", "/ day" or "/ trip" from Price Per.
- Existing posts: the 7 seed posts got Service Type, Destination, Destination Type and Price Per. The four holiday packages (Goa, Kerala, Bali, Bangkok) also got Nights, Days and Inclusions, and the UK trip planner got ATOL Protected. The packages use Per trip, since their ads said "/ package".
