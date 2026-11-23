<!-- source: https://claude.ai/artifact/UVAPAEUgQFLsDSbhvj7bws -->
# Business › Startup Support — Post Form Review

Oct 26, 2026

The form is the same in IN, GB and SG. The biggest gaps: Support Type is free text, one price field means both "price" and "funding required", and none of the Support, Industry or Stage filters works.

## Current fields

The form has 6 fields today. 3 are required: Adv Title, Adv Details and Support Type.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2000 characters |
| 3 | Good To Know | goodToKnow | goodToKnow | No | Seller's own label / value points |
| 4 | Support Type | serviceType | text | Yes | Full width |
| 5 | Availability | availability | text | No | Half width |
| 6 | Price / Funding Required | price | currency | No | Min 0, half width |

There are 7 posts (IN 2, GB 3, SG 2), all seed samples with only a title and a price. Their mock listings price per month or per workshop; one GB seed (Innovate UK Edge) is free.

The search offers Support (Mentoring, Funding, Incubator, Accelerator, Co-working, Legal, Networking, Tech Support), Industry (Tech, F&B, Retail, Services, Healthcare, Education, Other) and Stage (Idea, MVP, Early Revenue, Growth). None of them works, and the form asks none of them as options.

## Field type changes

3 existing fields should change. The most important: Price saves to the field search reads, so the price filter works.

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Price / Funding Required | saved as `price` | Rename Price, save as `salePrice`, plus Price Per: Per session, Per month, Per programme, Equity only. 0 shows as "Free" | The price filter searches `salePrice`. A founder seeking funding posts in Partnership Opportunities |
| Support Type | free text | Select (required), the Support filter's 8 options plus Other | Matches the Support search filter |
| Availability | free text | Remove | Nothing in the seeds uses it; Format and Price Per say more |

## New fields to add

Startup Support can add 5 fields with no new field types.

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Industries Served | multiselect | All industries, Tech, F&B, Retail, Services, Healthcare, Education, Other | All | No | Backs the Industry filter; "All industries" matches every pick |
| Stages Served | multiselect | Idea, MVP, Early Revenue, Growth | All | No | Backs the Stage filter; seeds say "Pre-seed to Series A" |
| Format | select | In-person, Online, Hybrid | All | No | Seeds offer 1:1, cohort and remote |
| Takes Equity | select | Yes, No | All | No | Incubators and accelerators often do; founders need to know |
| Listed By | select | Individual mentor, Organisation, Government programme | All | Yes | The Innovate UK seed is a government programme |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [ ] Rename to Price, save as `salePrice`, add Price Per; 0 shows as Free
- [ ] Support Type as a select matched to the Support filter (required)
- [ ] Remove Availability
- [ ] Add Industries Served and wire the Industry filter
- [ ] Add Stages Served and wire the Stage filter
- [ ] Add Format
- [ ] Add Takes Equity
- [ ] Add Listed By (required)
- [ ] Backfill the 7 seed posts: Price Per, Support Type and details from their mock listings

## Built — 26 Oct 2026

All 9 items are built in IN, GB and SG (commit 316fe67). "All industries" in Industries Served matches every Industry search.

- Existing posts: all 7 seeds got Support Type, Listed By, Industries, Format and Price Per. The Innovate UK seed shows Free. Checked on the DB: Tech + MVP finds 5; Co-working finds 3.
