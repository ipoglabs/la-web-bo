<!-- source: https://claude.ai/artifact/DhgutLXw69Di58bpataMEh -->
# Pets › Wanted — Post Form Review

Oct 23, 2026

The Wanted form is the same in IN, GB and SG. The biggest gaps: the price filter can't see Budget, the form has no Looking To, and none of the Looking to, Animal or Breed filters works.

## Current fields

The Wanted form has 9 fields today. 3 are required: Adv Title, Adv Details and Type of Pet Wanted.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2000 characters |
| 3 | Good To Know | goodToKnow | goodToKnow | No | Seller's own label / value points |
| 4 | Type of Pet Wanted | wantedPetType | select | Yes | Dog, Cat, Bird, Fish, Rabbit, Other |
| 5 | Breed Preference | breedPreference | text | No | Max 200 characters, half width |
| 6 | Preferred Age | agePreference | text | No | Max 200 characters, half width |
| 7 | Gender Preference | genderPreference | select | No | Male, Female, Any |
| 8 | Size Preference | sizePreference | select | No | Small, Medium, Large, Any |
| 9 | Budget | budget | currency | No | Min 0, half width |

There are 7 Wanted posts (IN 2, GB 3, SG 2), all seed samples with only a title and a `salePrice`. 4 want a pet; 2 want a pet sitter and 1 wants a second-hand aquarium, which this form can't describe.

The search offers Looking to (Buy, Adopt, Stud / Mate), Animal and Breed (Pure / Mixed) filters. None of them works today: Pets filters only on price, and the form has no Looking To or Breed Type. Animal offers Reptile and Small Animal, which the form lacks.

## Field type changes

3 existing fields should change. The most important: the price filter reads Budget, so it works.

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Budget | saved as `budget`; the price filter reads `salePrice` | Keep `budget` and point the price filter at it (as Services › Wanted does with `budgetAmount`); move the seed posts' `salePrice` into `budget` | New posts never match the price filter today |
| Type of Pet Wanted | 6 choices | Label "Pet Type"; Dog, Cat, Bird, Fish, Rabbit, Reptile, Small Animal, Other | Matches the Animal filter and the other Pets forms |
| Preferred Age | free text | Age Group select: Baby, Young, Adult, Senior, Any | Same groups as For Sale and Adoption; free text can't be filtered |

## New fields to add

Wanted can add 2 fields with no new field types.

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Looking To | select | Buy, Adopt, Stud / Mate, Pet Care, Accessories | All | Yes | The Looking to filter has nothing to match. Pet Care and Accessories fit the sitter and aquarium seeds; add both to the filter too |
| Breed Type | select | Pure Breed, Mixed Breed, Any | All | No | The Breed search filter offers Pure and Mixed |

When Looking To is Pet Care or Accessories, Breed, Age, Gender and Size don't apply. The form shows every field for now; skipping them is fine since none is required.

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [x] Point the price filter at `budget` and move the seed posts' `salePrice` into it
- [x] Rename Type of Pet Wanted to Pet Type and match the Animal filter list
- [x] Preferred Age as an Age Group select
- [x] Add Looking To (required), with Pet Care and Accessories added to the filter
- [x] Add Breed Type
- [x] Wire the Looking to, Animal and Breed filters (search only)
- [x] Backfill details on the 7 seed posts so the new filters have something to match

## Built — 23 Oct 2026

All 7 ticked items are live in IN, GB and SG (commit 545e34c). Where the build differs from the suggestion:

- A Wanted ad with Breed Type = Any also matches a Pure or Mixed search.
- The pet sitter seeds (IN, SG) have Pet Type = Other, since they want care for an unnamed pet.
- Existing posts: the 7 seed posts got Looking To and Pet Type, plus breed and size preferences where their mock listing gave them; their prices moved to Budget. Checked live: Accessories finds the aquarium wanted ad; Mixed finds the rabbit (Any); IN price up to ₹1,000 finds the pet sitter.
