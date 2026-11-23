<!-- source: https://claude.ai/artifact/LhJivSHBSubruR3d5ihMvf -->
# Services › Home Services — Post Form Review

Oct 22, 2026

The Home Services form is the same in IN, GB and SG. The biggest gaps: the price filter misses every new post, and none of the Service, Frequency or Provider filters works.

## Current fields

The Home Services form has 7 fields today. 4 are required: Adv Title, Adv Details, Service Type and Service Charge.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2000 characters |
| 3 | Good To Know | goodToKnow | goodToKnow | No | Seller's own label / value points |
| 4 | Service Type | serviceType | select | Yes | Cleaning, Plumbing, Electrical, Carpentry, Pest Control, Gardening, Painting, Others |
| 5 | Service Charge | price | currency | Yes | Min 1, half width |
| 6 | Experience | experience | text | No | Max 200 characters, Placeholder "e.g. 5 years", half width |
| 7 | Availability | availability | text | No | Max 200 characters, Placeholder "e.g. Mon–Sat, 9am–6pm", half width |

There are 7 Home Services posts (IN 2, GB 3, SG 2), all seed samples with only a title and a price. None has a value for any detail field above.

The search offers Service, Frequency and Provider filters. None of them works today: Service is not wired to Service Type, and the form has no Frequency or Provider. The Service filter's options (Renovation, AC Service, Landscaping, Handyman) don't match the form's either.

## Field type changes

3 existing fields should change. The most important: Price saves to the field search reads, so the price filter works.

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Price | saved as `price` | Save as `salePrice`, the field listing prices and the price filter read | The price filter searches `salePrice`, so new posts never match it. The seed posts already use `salePrice`, so nothing needs migrating |
| Service Type | 8 choices, ends in "Others" | Cleaning, Plumbing, Electrical, Carpentry, Painting, Renovation, Pest Control, Appliance Repair, Gardening / Landscaping, Handyman, Other. IN and SG add AC Service; GB adds Heating & Boiler | Matches the Service search filter and fixes "Others" (every other form says "Other") |
| Experience | free text, e.g. "5 years" | Years of Experience select: Under 1 year, 1–3 years, 3–5 years, 5–10 years, 10+ years | Free text can't be compared or filtered, and sellers type it in many ways |

## New fields to add

Home Services can add 6 fields with no new field types.

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Listed By | select | Individual, Company | All | Yes | The Provider search filter offers Individual and Company |
| Price Per | select | Per visit, Per hour, Per job, Starting from | All | No | A price alone doesn't say if it's per visit, per hour or for the whole job |
| Frequency | multiselect | One-time, Weekly, Fortnightly, Monthly | All | No | The Frequency search filter has nothing to match. Cleaners and gardeners offer regular visits |
| Same-day / Emergency | select | Yes, No | All | No | Plumbers and electricians are often hired for urgent call-outs |
| Insured | select | Yes, No | All | No | Customers want to know damage is covered |
| Registration No. | text | Gas Safe or NICEIC number | GB | No | UK customers check Gas Safe for gas work and NICEIC for electrical work |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [x] Save Price as `salePrice` so the price filter finds new posts
- [x] Service Type options matched to the Service filter (IN/SG AC Service, GB Heating & Boiler), "Others" → "Other"
- [x] Experience as a Years of Experience select
- [x] Add Listed By (required)
- [x] Add Price Per
- [x] Add Frequency
- [x] Add Same-day / Emergency
- [x] Add Insured
- [x] Add Registration No. (GB)
- [x] Wire the Service, Frequency and Provider filters (search only)
- [x] Backfill details on the 7 seed posts so the new filters have something to match

## Built — 22 Oct 2026

All 11 ticked items are live in IN, GB and SG (commit 0f190ad). Where the build differs from the suggestion:

- Price Per also offers Per day: the GB painter seed is priced per day. Listings show it as a suffix ("£60 / hr"), or "From ₹299" for Starting from.
- The Service filter shows AC Service in IN and SG and Heating & Boiler in GB only.
- The Gas Safe / NICEIC No. field asks for the number as text; it isn't checked against the registers.
- Existing posts: the 7 seed posts got Service Type, Listed By, Price Per and Frequency, plus Same-day, Insured, registration number and experience where their mock listing gave them.
