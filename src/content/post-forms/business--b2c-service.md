<!-- source: https://claude.ai/artifact/V1coFrcENLDvdGjrvnF28r -->
# Business › B2C Service — Post Form Review

Oct 26, 2026

The form is the same in IN, GB and SG and has no posts yet. The first question is whether to keep it: the Services category already covers home, health, education and event services for consumers.

## Current fields

The form has 7 fields today. 2 are required: Adv Title and Adv Details.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2000 characters |
| 3 | Good To Know | goodToKnow | goodToKnow | No | Seller's own label / value points |
| 4 | Target Audience | targetAudience | text | No | Half width |
| 5 | Availability | availability | text | No | Half width |
| 6 | Price / Rate | price | currency | No | Min 0, half width |
| 7 | Website | website | text | No | Placeholder "https://", half width |

There are no posts and no mock listings.

The search offers Service (Home Services, Health & Beauty, Education, Events, Repairs, Delivery, Other), How (In-person, Home Visit, Online) and Provider (Individual, Company). None of them works, and the form asks none of them.

## Field type changes

2 existing fields should change.

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Price / Rate | saved as `price`, no unit | Save as `salePrice`, plus Price Per: Per visit, Per hour, Per job, Per month, Starting from | The price filter searches `salePrice` |
| Target Audience | free text | Remove; Service Type takes its place | A B2C ad's audience is the public by definition; nothing can filter on free text |

## New fields to add

B2C Service can add 3 fields with no new field types.

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Service Type | select | Home Services, Health & Beauty, Education, Events, Repairs, Delivery, Other | All | Yes | Backs the Service filter |
| Service Mode | multiselect | In-person, Home Visit, Online | All | No | Backs the How filter |
| Listed By | select | Individual, Company | All | Yes | Backs the Provider filter |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [ ] Keep B2C Service (if not, hide it from the category picker and point sellers to Services)
- [ ] Save Price as `salePrice` and add Price Per
- [ ] Remove Target Audience
- [ ] Add Service Type (required) and wire the Service filter
- [ ] Add Service Mode and wire the How filter
- [ ] Add Listed By (required) and wire the Provider filter

## Built — 26 Oct 2026

All 6 items are built in IN, GB and SG (commit 316fe67); B2C Service is kept. It has no posts yet, so the filters are checked only by query, not on real ads.
