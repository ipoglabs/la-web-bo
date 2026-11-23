<!-- source: https://claude.ai/artifact/LKFxtbsr9W3UXQAkHQkX3m -->
# Pets › Lost & Found — Post Form Review

Oct 23, 2026

The Lost & Found form is the same in IN, GB and SG. The biggest gaps: the search shows a price filter that makes no sense here, the form has no Reward or Size, and none of the Status, Animal or Size filters works.

## Current fields

The Lost & Found form has 9 fields today. 6 are required: Adv Title, Adv Details, Report Type, Pet Type, Last Seen / Found Date and Last Seen Location.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2000 characters |
| 3 | Good To Know | goodToKnow | goodToKnow | No | Seller's own label / value points |
| 4 | Report Type | reportType | select | Yes | Lost, Found |
| 5 | Pet Type | petType | select | Yes | Dog, Cat, Bird, Fish, Rabbit, Other |
| 6 | Breed | breed | text | No | Max 200 characters, half width |
| 7 | Color | color | text | No | Max 200 characters, half width |
| 8 | Last Seen / Found Date | lfDate | date | Yes | Half width |
| 9 | Last Seen Location | lastSeenLocation | text | Yes | Max 200 characters |

There are 7 Lost & Found posts (IN 2, GB 3, SG 2), all seed samples with only a title and a `salePrice`. On the lost posts that number is a reward (e.g. ₹5,000, £200); found posts have 0. The form has no Reward field, so new posts can't offer one.

The search offers Status, Animal and Size filters, plus a price range. None of the three works today: Pets filters only on price. Animal offers only Dog, Cat, Bird and Other, fewer than the form. The form has no Size at all.

## Field type changes

2 existing fields should change.

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Pet Type | 6 choices | Dog, Cat, Bird, Fish, Rabbit, Reptile, Small Animal, Other; Animal filter gets the same list | Same list as the other Pets forms; the GB seed is a lost parrot |
| Last Seen Location | label says "Last Seen" for found pets too | Label "Last Seen / Found Location" | Matches the date field's label; found posts are about where the pet was found |

## New fields to add

Lost & Found can add 5 fields with no new field types.

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Size | select | Small, Medium, Large | All | No | The Size search filter has nothing to match |
| Pet Name | text | Name it answers to | All | No | Lost-pet ads lead with the name (seed: "Monty") |
| Gender | select | Male, Female, Unknown | All | No | Helps a finder confirm a match |
| Microchipped | select | Yes, No, Unknown | All | No | A vet or shelter can scan a found pet; tells finders to try |
| Reward | currency | Min 0 | All | No | Lost posts offer rewards today only through the hidden `salePrice` |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [x] Pet Type options and Animal filter matched to the full Pets list
- [x] Rename Last Seen Location to "Last Seen / Found Location"
- [x] Add Size
- [x] Add Pet Name
- [x] Add Gender
- [x] Add Microchipped
- [x] Add Reward, and move the seed posts' `salePrice` into it
- [x] Hide the price filter on Lost & Found search
- [x] Wire the Status, Animal and Size filters (search only)
- [x] Backfill details on the 7 seed posts so the new filters have something to match

## Built — 23 Oct 2026

All 10 ticked items are live in IN, GB and SG (commit 545e34c). Where the build differs from the suggestion:

- Listings show "Reward £200" when a reward is set, otherwise "Lost" or "Found".
- Gender and Microchipped add an Unknown option, since a finder often can't tell.
- Existing posts: the 7 seed posts got Report Type, Pet Type and Location, plus breed, colour, name, gender, size, microchip and date where their mock listing gave them. Lost posts' prices moved to Reward; found posts' 0 was dropped. Checked live: Found, Bird and Small each find the right GB post.
