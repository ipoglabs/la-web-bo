<!-- source: https://claude.ai/artifact/SU14hqXK8ymx8bKyiDJkSt -->
# Community › General / Others — Post Form Review

Oct 26, 2026

General / Others asks only a title and a description. It is the catch-all, so it also catches ads that have a better home elsewhere.

## Current fields

The form is the same in IN, GB and SG.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Title | `name` | text | Yes |  |
| 2 | Description | `description` | richtext | Yes |  |
| 3 | Good To Know | `goodToKnow` | goodToKnow | No |  |

7 seed posts (IN 2, GB 3, SG 2). All show "£0", "₹0" or "S$0". Three of them have a better home:

- IN and SG "Office Carpool Group" → Community › Rideshare & Carpool, which is empty today
- GB "Free Soil & Compost" → Free / Giveaway
- GB "Parking Space Swap" → stays; it is a neighbour-to-neighbour ask

The IN and SG book clubs and the GB guitar-for-Spanish skill share fit here.

The sidebar has 2 filters: Topic (Local Tips, Neighbourhood, Services, Charity, Swap / Exchange, Other) and Post Type (Sharing, Asking, Offering). Neither does anything today.

## Field type changes

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Price | Seeds saved with `salePrice` 0 | No price; card shows "Free" | Nothing here is for sale |

## New fields to add

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Topic | select | Local Tips, Neighbourhood, Clubs & Groups, Skill Swap, Charity, Other | All | Yes | Matches the Topic filter; Clubs & Groups for the book clubs; Swap becomes Skill Swap |
| Post Type | select | Sharing, Asking, Offering | All | Yes | Matches the Post Type filter |

The filter's "Services" topic is dropped: services ads belong in Services.

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [ ] Add Topic, with Clubs & Groups added and Services dropped, form and filter alike
- [ ] Add Post Type, matched to the filter
- [ ] Card shows "Free" instead of a zero price
- [ ] Move the IN and SG carpool seeds to Rideshare & Carpool
- [ ] Move the GB free soil seed to Free / Giveaway
- [ ] Wire both filters
- [ ] Backfill the remaining seeds' topic and post type
