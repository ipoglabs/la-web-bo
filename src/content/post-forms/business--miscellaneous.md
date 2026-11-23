<!-- source: https://claude.ai/artifact/PAiRpf8zpfdx9zYyGnXGfi -->
# Business › Miscellaneous — Post Form Review

Oct 26, 2026

The form is the same in IN, GB and SG and has no posts yet. As the catch-all it should stay light: fix the price, add Listed By, and drop the Field filter it can't support.

## Current fields

The form has 6 fields today. 2 are required: Adv Title and Adv Details.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2000 characters |
| 3 | Good To Know | goodToKnow | goodToKnow | No | Seller's own label / value points |
| 4 | Service Type | serviceType | text | No | Full width |
| 5 | Availability | availability | text | No | Half width |
| 6 | Price | price | currency | No | Min 0, half width |

There are no posts and no mock listings.

The search offers only Field (IT & Tech, Finance, Sales & Mktg, Engineering, Healthcare, Education, Admin & Ops, Creative, Hospitality). It doesn't work, and a job field doesn't fit a catch-all business ad.

## Field type changes

2 existing fields should change.

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Price | saved as `price` | Save as `salePrice`, plus Price Per: Per item, Per hour, Per month, Starting from | The price filter searches `salePrice` |
| Service Type | labelled Service Type | Rename What's Offered, keep as optional text | A misc ad may be a product, not a service |

## New fields to add

Miscellaneous needs 1 new field.

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Listed By | select | Individual, Business | All | No | The one thing every buyer asks |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [ ] Save Price as `salePrice` and add Price Per
- [ ] Rename Service Type to What's Offered
- [ ] Add Listed By
- [ ] Remove the Field filter (Miscellaneous filters on price only)

## Built — 26 Oct 2026

All 4 items are built in IN, GB and SG (commit 316fe67). Miscellaneous now filters on price only. There are no posts yet.
