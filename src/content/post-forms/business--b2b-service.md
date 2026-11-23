<!-- source: https://claude.ai/artifact/Ru35fk8ycqv8UPYwVShVGm -->
# Business › B2B Service — Post Form Review

Oct 26, 2026

The form is the same in IN, GB and SG. The biggest gaps: Industry uses different options from the Service filter, the price has no unit (per parcel, per month), and none of the Service, Provider or Engagement filters works.

## Current fields

The form has 7 fields today. 3 are required: Adv Title, Adv Details and Business Name.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2000 characters |
| 3 | Good To Know | goodToKnow | goodToKnow | No | Seller's own label / value points |
| 4 | Business Name | company | text | Yes | Half width |
| 5 | Industry | industry | select | No | Manufacturing, Logistics, Wholesale, Consulting, IT Services, Other |
| 6 | Price / Rate | price | currency | No | Min 0, half width |
| 7 | Website | website | text | No | Placeholder "https://", half width |

There are 7 posts (IN 2, GB 3, SG 2), all seed samples with only a title and a price. Their mock listings price per kg, per parcel, per month or per visit, but only the number was kept. 3 seeds say "Quote on request" and were saved as 0.

The search offers Service (IT & Tech, Legal, Accounting, Marketing, Logistics, HR & Recruitment, Security, Consulting, Facility Mgmt, Other), Provider (Individual, Agency, Company) and Engagement (One-off, Project-based, Retainer). None of them works. Industry shares only Logistics, Consulting and Other with the Service filter.

This sub overlaps with Services › Business Services, which was reworked on 22 Oct with the same Service and Provider filters.

## Field type changes

2 existing fields should change. The most important: Price saves to the field search reads, so the price filter works.

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Price / Rate | saved as `price`, no unit | Save as `salePrice`, plus Price Per: Per hour, Per day, Per month (retainer), Per project, Per unit, Starting from, Price on request | The price filter searches `salePrice`; seeds price per parcel, per kg and per month |
| Industry | 6 options | Service Type select (required): IT & Tech, Legal, Accounting, Marketing, Logistics, HR & Recruitment, Security, Consulting, Facility Mgmt, Other | Matches the Service search filter |

## New fields to add

B2B Service can add 6 fields with no new field types.

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Listed By | select | Individual, Agency, Company | All | Yes | Backs the Provider filter |
| Engagement | select | One-off, Project-based, Retainer | All | No | Backs the Engagement filter; seeds say "Monthly rolling" |
| Coverage | text | e.g. "UK-wide (remote)" | All | No | Every seed states where it serves |
| Minimum Contract | text | e.g. "12 months", "20 parcels/week" | All | No | Seeds state minimum terms and volumes |
| Accreditations | tags | e.g. ISO 9001, CIPD | All | No | Seeds list ISO 9001, Safe Contractor, CIPD Level 7 |
| Insured | select | Yes, No | All | No | Seeds state PI and public liability cover |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [ ] Keep B2B Service separate from Services › Business Services (if not, retire this sub and move its posts)
- [ ] Save Price as `salePrice` so the price filter finds new posts
- [ ] Add Price Per, including Price on request
- [ ] Replace Industry with Service Type matched to the Service filter (required)
- [ ] Add Listed By (required) and wire the Provider filter
- [ ] Add Engagement and wire the Engagement filter
- [ ] Add Coverage
- [ ] Add Minimum Contract
- [ ] Add Accreditations
- [ ] Add Insured
- [ ] Backfill the 7 seed posts: Price Per, Service Type and details from their mock listings

## Built — 26 Oct 2026

All 11 items are built in IN, GB and SG (commit 316fe67); B2B Service stays beside Services › Business Services.

- Price on request shows on the listing instead of a price.
- Existing posts: all 7 seeds got Service Type, Listed By, Engagement and Price Per. The 3 "Quote on request" seeds now show Price on request instead of 0. Checked on the DB: Logistics + Company finds 3 posts; Project-based finds the 2 sourcing ads.
