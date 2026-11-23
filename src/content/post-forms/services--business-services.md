<!-- source: https://claude.ai/artifact/YEum22tVG6JGrNSChYiFCn -->
# Services › Business Services — Post Form Review

Oct 22, 2026

The Business Services form is the same in IN, GB and SG. The biggest gaps: Service Type is free text, so the Service filter can't match it, and nothing beyond the title and details is required.

## Current fields

The Business Services form has 7 fields today. 2 are required: Adv Title and Adv Details.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2000 characters |
| 3 | Good To Know | goodToKnow | goodToKnow | No | Seller's own label / value points |
| 4 | Service Type | serviceType | text | No | Max 200 characters, Placeholder "e.g. Accounting, Legal, Marketing" |
| 5 | Price (per hour / session) | price | currency | No | Min 0, half width |
| 6 | Experience | experience | text | No | Max 200 characters, Placeholder "e.g. 5 years", half width |
| 7 | Availability | availability | text | No | Max 200 characters, Placeholder "e.g. Mon–Sat, 9am–6pm", half width |

There are 7 Business Services posts (IN 2, GB 3, SG 2), all seed samples with only a title and a price. None has a value for any detail field above.

The search offers Service and Provider filters. Neither works today: Service Type is free text and the form has no Provider.

## Field type changes

3 existing fields should change. The most important: Service Type becomes a choice, so the Service filter can match it.

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Service Type | free text, optional | Required select: Accounting & Tax, Legal, Marketing, IT Support, HR & Payroll, Company Registration, Logistics, Security, Consulting, Printing, Other | Matches the Service search filter's values, plus HR and company registration, both common requests |
| Price | labelled "Price (per hour / session)", optional, saved as `price` | Label "Price", still optional, with Price Per beside it. Saved as `salePrice` | The price filter searches `salePrice`, so new posts never match it. Retainers and fixed fees are as common as hourly rates, and many firms quote per job |
| Experience | free text, e.g. "5 years" | Years of Experience select: Under 1 year, 1–3 years, 3–5 years, 5–10 years, 10+ years | Free text can't be compared or filtered, and sellers type it in many ways |

## New fields to add

Business Services can add 4 fields with no new field types.

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Listed By | select | Freelancer, Agency, Company | All | Yes | The Provider search filter offers these three |
| Price Per | select | Per hour, Per month (retainer), Per project, Fixed fee | All | No | Says what the price covers |
| Service Mode | multiselect | Online, In-person | All | No | Much business work is done remotely |
| Business Registration No. | text | IN: GSTIN · GB: Companies House No. · SG: UEN | All | No | A registration number builds trust for paid professional services |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [x] Save Price as `salePrice` so the price filter finds new posts, labelled "Price" (stays optional)
- [x] Service Type as a required select matched to the Service filter
- [x] Experience as a Years of Experience select
- [x] Add Listed By (required)
- [x] Add Price Per
- [x] Add Service Mode
- [x] Add Business Registration No. (GSTIN / Companies House / UEN)
- [x] Wire the Service and Provider filters (search only)
- [x] Backfill details on the 7 seed posts so the new filters have something to match

## Built — 22 Oct 2026

All 9 ticked items are live in IN, GB and SG (commit de8acf8). Where the build differs from the suggestion:

- Service Type also offers Virtual Assistant / Admin: a GB seed post is a virtual PA, which no other option fits.
- Listings show Price Per as a suffix ("£150 / mo", "£25 / hr"); a Fixed fee shows the price alone.
- The registration number field is labelled GSTIN in IN, Companies House No. in GB and UEN in SG. It isn't checked against any register.
- Service Mode is asked but not searchable: Business Services has no How filter.
- Existing posts: the 7 seed posts got Service Type, Listed By and Price Per, plus Service Mode and experience where their mock listing gave them.
