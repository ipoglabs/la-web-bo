<!-- source: https://claude.ai/artifact/V4P5WboQutFUQbw5bcbSkq -->
# Business › Wanted — Post Form Review

Oct 26, 2026

The form is the same in IN, GB and SG and has no posts yet. The biggest gap: it can't say what is wanted (a business, equipment, a supplier, an investor). The price filter also reads `salePrice` while Budget saves to `budgetAmount`.

## Current fields

The form has 5 fields today. 2 are required: Adv Title and Adv Details.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2000 characters |
| 3 | Good To Know | goodToKnow | goodToKnow | No | Seller's own label / value points |
| 4 | Budget | budgetAmount | currency | No | Min 0, half width |
| 5 | Urgency | urgency | select | No | Immediate, Within a Month, Flexible |

There are no posts and no mock listings.

The search offers Field (the Jobs list) and Urgency (Immediate, This week, Flexible). Neither works. Urgency's middle option differs: the form saves Within a Month, the filter sends This week.

## Field type changes

2 existing fields should change.

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Budget | `budgetAmount`, not read by search | Keep the key; the price filter reads `budgetAmount` for this sub | Same as Services › Wanted and Pets › Wanted |
| Urgency | Immediate, Within a Month, Flexible | Immediate, This week, Within a month, Flexible, in the form and the filter | The form and the filter must offer the same options |

## New fields to add

Wanted can add 2 fields with no new field types.

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Looking For | select | Business to buy, Business to lease, Equipment & supplies, Service provider, Partner / Investor, Franchise, Commercial premises, Other | All | Yes | The question every Wanted ad answers first; replaces the Field filter |
| Industry | select | Tech, F&B, Retail, Services, Manufacturing, Healthcare, Education, Other | All | No | Narrows a business or supplier search |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [ ] Price filter reads Budget (`budgetAmount`) for this sub
- [ ] Urgency options matched in form and filter, and wire the Urgency filter
- [ ] Add Looking For (required); swap the Field filter for a Looking For filter and wire it
- [ ] Add Industry and an Industry filter

## Built — 26 Oct 2026

All 4 items are built in IN, GB and SG (commit 316fe67). Urgency is Immediate, This week, Within a month, Flexible in both the form and the filter. There are no posts yet, so the filters are checked only by query.
