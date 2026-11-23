<!-- source: https://claude.ai/artifact/4Xx6L2z3bcHjP2SQXoGRZR -->
# Services › Health & Fitness — Post Form Review

Oct 22, 2026

The Health & Fitness form is the same in IN, GB and SG. The biggest gaps: Service Type is free text, and Consultation Mode uses different values from the How filter, so neither filter works.

## Current fields

The Health & Fitness form has 10 fields today. 4 are required: Adv Title, Adv Details, Provider Name and Consultation Fee.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2000 characters |
| 3 | Good To Know | goodToKnow | goodToKnow | No | Seller's own label / value points |
| 4 | Provider Name | providerName | text | Yes | Max 200 characters, half width |
| 5 | Qualification | qualification | text | No | Max 200 characters, half width |
| 6 | Service Type | serviceType | text | No | Max 200 characters, Placeholder "e.g. Physiotherapy, Personal Training" |
| 7 | Consultation Mode | consultationMode | select | No | Online, In Person, Both |
| 8 | Consultation Fee | price | currency | Yes | Min 1, half width |
| 9 | Experience | experience | text | No | Max 200 characters, Placeholder "e.g. 5 years", half width |
| 10 | Availability | availability | text | No | Max 200 characters, Placeholder "e.g. Mon–Sat, 9am–6pm", half width |

There are 7 Health & Fitness posts (IN 2, GB 3, SG 2), all seed samples with only a title and a price. None has a value for any detail field above.

The search offers Service and How filters. Neither works today: Service Type is free text, and Consultation Mode (Online, In Person, Both) is not wired to How (In-person, Home Visit, Online). Health & Beauty is also its own category with Fitness Classes and Salons, so the two overlap.

## Field type changes

5 existing fields should change. The most important: Price saves to the field search reads, so the price filter works.

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Price | saved as `price` | Save as `salePrice`, the field listing prices and the price filter read | The price filter searches `salePrice`, so new posts never match it. The seed posts already use `salePrice`, so nothing needs migrating |
| Provider Name | required text | Remove | The seller's name already shows on every ad. A clinic's name belongs in the title |
| Service Type | free text | Required select: Personal Training, Yoga / Pilates, Massage, Spa, Nutrition, Physiotherapy, Mental Health, Meditation, Other | The same values as the Service search filter |
| Consultation Mode | Online, In Person, Both | Service Mode multiselect: At my place, Home visit, Online | Matches the How search filter. "Both" can't say which two |
| Experience | free text, e.g. "5 years" | Years of Experience select: Under 1 year, 1–3 years, 3–5 years, 5–10 years, 10+ years | Free text can't be compared or filtered, and sellers type it in many ways |

## New fields to add

Health & Fitness can add 4 fields with no new field types.

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Listed By | select | Individual, Studio / Clinic | All | Yes | Customers choose between a personal trainer and a gym or clinic |
| Price Per | select | Per session, Per month, Per package | All | No | Trainers sell single sessions, monthly plans and packs |
| Session Length | select | 30 min, 45 min, 60 min, 90 min | All | No | A session price means little without its length |
| Free Trial | select | Yes, No | All | No | A free first session is a common hook for trainers and studios |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [x] Save Price as `salePrice` so the price filter finds new posts
- [x] Remove Provider Name
- [x] Service Type as a required select matched to the Service filter
- [x] Consultation Mode → Service Mode (At my place, Home visit, Online)
- [x] Experience as a Years of Experience select
- [x] Add Listed By (required)
- [x] Add Price Per
- [x] Add Session Length
- [x] Add Free Trial
- [x] Wire the Service and How filters (search only)
- [x] Backfill details on the 7 seed posts so the new filters have something to match

## Built — 22 Oct 2026

All 11 ticked items are live in IN, GB and SG (commit b97f7ff). Where the build differs from the suggestion:

- The price keeps its label "Consultation Fee"; only where it's saved changed.
- Service Type and the Service filter both gained Other.
- Service Mode is stored with the How filter's values, so "At my place" matches its In-person option.
- Listings show Price Per as a suffix ("£15 / session", "£85 / mo").
- Existing posts: the 7 seed posts got Service Type, Listed By, Service Mode and Price Per, plus Free Trial where their mock listing offered one. None gave a Session Length.
