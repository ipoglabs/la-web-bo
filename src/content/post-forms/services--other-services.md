<!-- source: https://claude.ai/artifact/Rv656okkKtHkFSjVjKWdmW -->
# Services › Other Services — Post Form Review

Oct 22, 2026

The Other Services form is the same in IN, GB and SG. The biggest gaps: Service Type's choices (Repair, Consultancy, Miscellaneous) say almost nothing, and the Type filter offers Photography and Videography, which belong to Creative Services.

## Current fields

The Other Services form has 6 fields today. 3 are required: Adv Title, Adv Details and Price.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2000 characters |
| 3 | Good To Know | goodToKnow | goodToKnow | No | Seller's own label / value points |
| 4 | Service Type | serviceType | select | No | Repair, Consultancy, Miscellaneous, Other |
| 5 | Price | price | currency | Yes | Min 1, half width |
| 6 | Availability | availability | text | No | Max 200 characters, Placeholder "e.g. Mon–Sat, 9am–6pm", half width |

There are 7 Other Services posts (IN 2, GB 3, SG 2), all seed samples with only a title and a price. None has a value for any detail field above.

The search offers Type and How filters. Neither works today: the Type filter (Photography, Videography, Moving, Pet Care, Event Mgmt, Other) matches none of the form's choices except Other.

## Field type changes

2 existing fields should change. The most important: Price saves to the field search reads, so the price filter works.

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Price | saved as `price` | Save as `salePrice`, the field listing prices and the price filter read | The price filter searches `salePrice`, so new posts never match it. The seed posts already use `salePrice`, so nothing needs migrating |
| Service Type | Repair, Consultancy, Miscellaneous, Other | Moving & Packing, Event Planning, Laundry & Dry Cleaning, Tailoring & Alterations, Driver Hire, Courier & Errands, Pet Care, Repair, Other | Common services with no subcategory of their own. The Type filter would lose Photography and Videography (Creative Services) and gain these |

## New fields to add

Other Services can add 4 fields with no new field types.

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Listed By | select | Individual, Company | All | Yes | Matches the other Services forms |
| Price Per | select | Per hour, Per job, Per item, Starting from | All | No | Says what the price covers |
| Service Mode | multiselect | At my place, Home visit, Online | All | No | The How search filter has nothing to match today |
| Years of Experience | select | Under 1 year, 1–3 years, 3–5 years, 5–10 years, 10+ years | All | No | Most other Services forms ask it |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [x] Save Price as `salePrice` so the price filter finds new posts
- [x] Service Type with real choices, and the Type filter matched to it
- [x] Add Listed By (required)
- [x] Add Price Per
- [x] Add Service Mode
- [x] Add Years of Experience
- [x] Wire the Type and How filters (search only)
- [x] Backfill details on the 7 seed posts so the new filters have something to match

## Built — 22 Oct 2026

All 8 ticked items are live in IN, GB and SG (commit 74d37e8). Where the build differs from the suggestion:

- The Type search filter lost Photography and Videography and gained every new Service Type.
- Listings show the price as "/ hr", "/ job", "/ item" or "From …" from Price Per.
- Existing posts: the 7 seed posts got Service Type, Listed By, Service Mode and Price Per. Most seeds don't fit the new types: painting and cleaning are Other, carpentry is Repair, ironing is Laundry and dog grooming is Pet Care. The painting ads (priced per sq.ft) use Starting from.
