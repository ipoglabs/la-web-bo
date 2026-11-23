<!-- source: https://claude.ai/artifact/CqwoSEjmfEpvU4nXXMyUsx -->
# Pets › Adoption — Post Form Review

Oct 23, 2026

The Adoption form is the same in IN, GB and SG. The biggest gaps: the price filter misses every new post, none of the Animal, Age, Vaccinated or Gender filters works, and adopters can't see whether a pet is neutered or good with children.

## Current fields

The Adoption form has 11 fields today. 3 are required: Adv Title, Adv Details and Pet Type.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2000 characters |
| 3 | Good To Know | goodToKnow | goodToKnow | No | Seller's own label / value points |
| 4 | Pet Name | petName | text | No | Max 200 characters, half width |
| 5 | Pet Type | petType | select | Yes | Dog, Cat, Bird, Fish, Rabbit, Other |
| 6 | Breed | breed | text | No | Max 200 characters, half width |
| 7 | Age | age | text | No | Placeholder "e.g. 3 months", half width |
| 8 | Gender | gender | select | No | Male, Female |
| 9 | Size | size | select | No | Small, Medium, Large |
| 10 | Vaccination | vaccination | select | No | Vaccinated, Partially Vaccinated, Not Vaccinated |
| 11 | Adoption Fee | price | currency | No | Min 0, half width |

There are 7 Adoption posts (IN 2, GB 3, SG 2), all seed samples with only a title and a fee. None has a value for any detail field above.

The search offers Animal, Age, Vaccinated and Gender filters. None of them works today: Pets filters only on price. Animal offers Small Animal, which the form lacks. Vaccinated offers Yes / No / Not Sure, which doesn't match the form's three options.

## Field type changes

4 existing fields should change. The most important: Adoption Fee saves to the field search reads, so the price filter works.

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Adoption Fee | saved as `price` | Save as `salePrice`; 0 shows as "Free" | The price filter searches `salePrice`, so new posts never match it. The seed posts already use `salePrice`, so nothing needs migrating |
| Pet Type | 6 choices | Dog, Cat, Bird, Fish, Rabbit, Reptile, Small Animal, Other | Matches the Animal search filter; same list as For Sale |
| Age | free text, e.g. "3 months" | Age Group select: Baby, Young, Adult, Senior, plus optional Exact Age text | Matches the Age search filter. Free text can't be filtered |
| Vaccinated filter | Yes, No, Not Sure | Fully, Partly, Not vaccinated, matching the form | The filter and form options don't line up, so the filter can't be wired as it stands |

## New fields to add

Adoption can add 5 fields with no new field types.

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Listed By | select | Owner, Rescue / Shelter | All | Yes | Adopters treat a rescue charity differently from a private rehome |
| Neutered / Spayed | select | Yes, No | All | No | The GB seeds lead with it; most rescues neuter before rehoming |
| Microchipped | select | Yes, No | All | No | Required for dogs in GB; adopters ask everywhere |
| Good With | multiselect | Children, Dogs, Cats, Other pets | All | No | The first question adopters ask about a rescue |
| House-trained | select | Yes, No | All | No | Seeds mention house / litter training in the title |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [x] Save Adoption Fee as `salePrice` so the price filter finds new posts
- [x] Pet Type options matched to the Animal filter (add Reptile, Small Animal)
- [x] Age as an Age Group select, plus optional Exact Age text
- [x] Vaccinated filter options changed to match the form
- [x] Add Listed By (required)
- [x] Add Neutered / Spayed
- [x] Add Microchipped
- [x] Add Good With
- [x] Add House-trained
- [x] Wire the Animal, Age, Vaccinated and Gender filters (search only)
- [x] Backfill details on the 7 seed posts so the new filters have something to match

## Built — 23 Oct 2026

All 11 ticked items are live in IN, GB and SG (commit 545e34c). Where the build differs from the suggestion:

- A fee of 0 shows as "Free" on listings (the GB greyhound, a donation to the rescue).
- The Vaccinated filter now reads Fully, Partly, Not vaccinated, the form's own three options.
- Existing posts: the 7 seed posts got Pet Type, Breed, Breed Type, Age Group, Listed By and Neutered, plus vaccination, microchip, House-trained and Good With where their mock listing gave them. Checked live: Vaccinated = Fully finds all 3 GB posts; Cat + Baby finds the IN kitten.
