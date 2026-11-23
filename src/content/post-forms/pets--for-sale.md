<!-- source: https://claude.ai/artifact/9if8yXELtQuCDRpLGNuXSz -->
# Pets › For Sale — Post Form Review

Oct 23, 2026

The For Sale form is the same in IN, GB and SG. The biggest gaps: the price filter misses every new post, and none of the Animal, Age, Breed or Gender filters works.

## Current fields

The For Sale form has 10 fields today. 4 are required: Adv Title, Adv Details, Pet Type and Price.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2000 characters |
| 3 | Good To Know | goodToKnow | goodToKnow | No | Seller's own label / value points |
| 4 | Pet Type | petType | select | Yes | Dog, Cat, Bird, Fish, Rabbit, Other |
| 5 | Breed | breed | text | No | Max 200 characters, half width |
| 6 | Age | age | text | No | Placeholder "e.g. 3 months", half width |
| 7 | Gender | gender | select | No | Male, Female |
| 8 | Size | size | select | No | Small, Medium, Large |
| 9 | Vaccination | vaccination | select | No | Vaccinated, Partially Vaccinated, Not Vaccinated |
| 10 | Price | price | currency | Yes | Min 1, half width |

There are 7 For Sale posts (IN 2, GB 3, SG 2), all seed samples with only a title and a price. None has a value for any detail field above.

The search offers Animal, Age, Breed and Gender filters. None of them works today: Pets filters only on price. Animal also offers Reptile and Small Animal, which the form lacks (the GB bearded dragon seed has nowhere to go). Age is Baby / Young / Adult / Senior and Breed is Pure / Mixed, but the form asks both as free text.

## Field type changes

3 existing fields should change. The most important: Price saves to the field search reads, so the price filter works.

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Price | saved as `price` | Save as `salePrice`, the field listing prices and the price filter read | The price filter searches `salePrice`, so new posts never match it. The seed posts already use `salePrice`, so nothing needs migrating |
| Pet Type | 6 choices | Dog, Cat, Bird, Fish, Rabbit, Reptile, Small Animal, Other | Matches the Animal search filter. Small Animal covers hamsters and guinea pigs |
| Age | free text, e.g. "3 months" | Age Group select: Baby (under 6 months), Young (6 months–2 years), Adult (2–7 years), Senior (7+ years). Keep the exact age as an optional Exact Age text | Matches the Age search filter. Free text can't be filtered |

## New fields to add

For Sale can add 8 fields with no new field types.

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Listed By | select | Owner, Breeder, Pet Shop | All | Yes | Buyers want to know if it's a family litter or a business |
| Breed Type | select | Pure Breed, Mixed Breed | All | No | The Breed search filter offers Pure and Mixed |
| Ready to Leave | date | Date, or "Ready now" chip | All | No | Puppy and kitten ads are often posted before the litter can leave |
| Available | number | 1–20 | All | No | Litters sell several at a time ("2 Girls Left") |
| Microchipped | select | Yes, No | All | No | Dogs must be microchipped before sale in GB; buyers ask everywhere |
| Neutered / Spayed | select | Yes, No | All | No | Common question for older pets |
| Registered / Papers | select | Yes, No | All | No | Seeds mention KCI (IN), KC / TICA (GB) and AVS (SG) papers |
| Breeder Licence No. | text | Licence number | GB, SG | No | GB breeders need a council licence and show its number in ads; SG breeders hold an AVS licence |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [x] Save Price as `salePrice` so the price filter finds new posts
- [x] Pet Type options matched to the Animal filter (add Reptile, Small Animal)
- [x] Age as an Age Group select, plus optional Exact Age text
- [x] Add Listed By (required)
- [x] Add Breed Type
- [x] Add Ready to Leave
- [x] Add Available (number in litter)
- [x] Add Microchipped
- [x] Add Neutered / Spayed
- [x] Add Registered / Papers
- [x] Add Breeder Licence No. (GB, SG)
- [x] Wire the Animal, Age, Breed and Gender filters (search only)
- [x] Backfill details on the 7 seed posts so the new filters have something to match

## Built — 23 Oct 2026

All 13 ticked items are live in IN, GB and SG (commit 545e34c). Where the build differs from the suggestion:

- Exact Age keeps the old `age` key, so nothing needed migrating; Age Group is new.
- Breeder Licence No. asks for the number as text; it isn't checked against council or AVS registers.
- Existing posts: the 7 seed posts got Pet Type, Breed, Breed Type, Age Group and Listed By, plus gender, vaccination, papers, microchip, Ready to Leave and Available where their mock listing gave them. Checked live: Animal = Reptile finds the bearded dragon; Baby + Pure finds the 2 GB litters.
