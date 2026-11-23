<!-- source: https://claude.ai/artifact/UCUk2MKkTTQkVk3jZrMYX4 -->
# Business › Training Opportunities — Post Form Review

Oct 26, 2026

The form is the same in IN, GB and SG and has no posts yet. Training Type is free text and none of the Field, Mode or Duration filters works. It overlaps with Services › Education & Learning; this sub should stay for professional and workplace training.

## Current fields

The form has 6 fields today. 3 are required: Adv Title, Adv Details and Training Type.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2000 characters |
| 3 | Good To Know | goodToKnow | goodToKnow | No | Seller's own label / value points |
| 4 | Training Type | serviceType | text | Yes | Full width |
| 5 | Availability | availability | text | No | Half width |
| 6 | Price | price | currency | No | Min 0, half width |

There are no posts and no mock listings.

The search offers Field (IT & Tech, Finance, Sales & Mktg, Engineering, Healthcare, Education, Admin & Ops, Creative, Hospitality), Mode (In-person, Online, Hybrid) and Duration (< 1 day, 1-3 days, 1-4 weeks, 1-3 months). None of them works.

## Field type changes

3 existing fields should change.

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Price | saved as `price` | Save as `salePrice`, plus Price Per: Per person, Per group, Full course | The price filter searches `salePrice` |
| Training Type | free text | Field select (required), the Field filter's 9 options plus Other | Matches the Field search filter |
| Availability | free text | Start Date: date, or "Ongoing / self-paced" chip | A course has a start date; free text can't be sorted |

## New fields to add

Training Opportunities can add 5 fields with no new field types.

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Mode | select | In-person, Online, Hybrid | All | Yes | Backs the Mode filter |
| Duration | select | Under 1 day, 1–3 days, 1–4 weeks, 1–3 months, Over 3 months | All | No | Backs the Duration filter; adds Over 3 months to it |
| Certificate | select | Accredited certificate, Certificate of completion, None | All | No | The first question for professional training |
| Seats | number | 1–500 | All | No | Group size; classes fill up |
| Listed By | select | Trainer, Training Company, Institution | All | Yes | Shows who stands behind the course |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [ ] Keep Training Opportunities beside Services › Education & Learning, for professional training only
- [ ] Save Price as `salePrice` and add Price Per
- [ ] Replace Training Type with a Field select (required) and wire the Field filter
- [ ] Replace Availability with Start Date (date or Ongoing)
- [ ] Add Mode (required) and wire the Mode filter
- [ ] Add Duration and wire the Duration filter (add Over 3 months)
- [ ] Add Certificate
- [ ] Add Seats
- [ ] Add Listed By (required)

## Built — 26 Oct 2026

All 9 items are built in IN, GB and SG (commit 316fe67). The Duration filter adds 3+ months. There are no posts yet, so the filters are checked only by query.
