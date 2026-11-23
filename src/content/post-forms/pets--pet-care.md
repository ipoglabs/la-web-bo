<!-- source: https://claude.ai/artifact/CJyn73fese66XGBLkcgpjE -->
# Pets › Pet Care — Post Form Review

Oct 23, 2026

The Pet Care form is the same in IN, GB and SG. The biggest gaps: the price filter misses every new post, and none of the Service, For Animal or How filters works.

## Current fields

The Pet Care form has 9 fields today. 5 are required: Adv Title, Adv Details, Service Type, Availability and Price.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2000 characters |
| 3 | Good To Know | goodToKnow | goodToKnow | No | Seller's own label / value points |
| 4 | Service Type | serviceType | select | Yes | Grooming, Training, Boarding, Walking, Vet, Other |
| 5 | Pet Type | petType | select | No | Dog, Cat, Bird, Fish, Rabbit, Other |
| 6 | Service Provider Name | serviceProviderName | text | No | Max 200 characters, half width |
| 7 | Experience | experience | text | No | Placeholder "e.g. 5 years", half width |
| 8 | Availability | availability | text | Yes | Max 200 characters, half width |
| 9 | Price | price | currency | Yes | Min 1, half width |

There are 7 Pet Care posts (IN 2, GB 3, SG 2), all seed samples with only a title and a price. None has a value for any detail field above. One more IN post ("Farm Animal Care & Boarding", July 2026) is saved under the subcategory `services` instead of `service`, so it never shows under Pet Care.

The search offers Service, For Animal and How filters. None of them works today: Pets filters only on price. Service offers Pet Hotel, Pet Sitting and Transport, which the form lacks. For Animal is single-pick on the form but multi-pick in search, and the form has no How (Walk-in / Home Visit) at all.

## Field type changes

5 existing fields should change. The most important: Price saves to the field search reads, so the price filter works.

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Price | saved as `price` | Save as `salePrice`, the field listing prices and the price filter read | The price filter searches `salePrice`, so new posts never match it. The seed posts already use `salePrice`, so nothing needs migrating |
| Service Type | 6 choices | Grooming, Boarding, Pet Sitting, Walking, Training, Vet, Transport, Other. Pet Hotel folds into Boarding (drop it from the filter) | Matches the Service search filter |
| Pet Type | single select | For Animals multiselect: Dog, Cat, Bird, Fish, Rabbit, Reptile, Small Animal, Other | Groomers and sitters take several animals; matches the For Animal filter |
| Experience | free text, e.g. "5 years" | Years of Experience select: Under 1 year, 1–3 years, 3–5 years, 5–10 years, 10+ years | Same as Services; free text can't be compared |
| Availability | required | Optional | Services made it optional; it's free text and blocks posting |

## New fields to add

Pet Care can add 5 fields with no new field types.

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Listed By | select | Individual, Business | All | Yes | Same as Services; owners compare a sitter with a kennel |
| Service Mode | multiselect | Walk-in, Home Visit | All | No | The How search filter has nothing to match. Seeds are doorstep groomers and home-visit vets |
| Price Per | select | Per session, Per hour, Per night, Per walk, Per visit, Starting from | All | No | A price alone doesn't say if boarding is per night or a walk per hour |
| Insured | select | Yes, No | All | No | Owners want to know vet bills or damage are covered |
| Licence No. | text | Council licence number | GB | No | Dog boarding, home boarding and day care need a council licence in England; the GB seed says "Licensed" |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [x] Save Price as `salePrice` so the price filter finds new posts
- [x] Service Type options matched to the Service filter (add Pet Sitting, Transport; Pet Hotel into Boarding)
- [x] Pet Type as a For Animals multiselect
- [x] Experience as a Years of Experience select
- [x] Make Availability optional
- [x] Add Listed By (required)
- [x] Add Service Mode
- [x] Add Price Per
- [x] Add Insured
- [x] Add Licence No. (GB)
- [x] Wire the Service, For Animal and How filters (search only)
- [x] Move the "Farm Animal Care & Boarding" post to `service` (or Services › Other)
- [x] Backfill details on the 7 seed posts so the new filters have something to match

## Built — 23 Oct 2026

All 13 ticked items are live in IN, GB and SG (commit 545e34c). Where the build differs from the suggestion:

- Listings show Price Per as a suffix ("£25 / night"), or "From £35" for Starting from.
- The "Farm Animal Care & Boarding" post moved to Pet Care as Boarding, for Other animals. It has no price, so it shows "Price on request".
- Existing posts: the 7 seed posts got Service Type, Listed By, For Animals, Service Mode and Price Per, plus Availability and Insured where their mock listing gave them. Checked live: Boarding and Home Visit each find their GB post; For Animal = Cat finds both SG posts.
