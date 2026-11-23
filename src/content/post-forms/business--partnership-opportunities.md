<!-- source: https://claude.ai/artifact/5y7t4mQpR22Trz3Yijt6pw -->
# Business › Partnership Opportunities — Post Form Review

Oct 26, 2026

The form is the same in IN, GB and SG. The biggest gaps: it can't say who is wanted (co-founder, investor, partner), its search filters are copied from Jobs, and the price filter reads a field this form never saves.

## Current fields

The form has 5 fields today. 3 are required: Adv Title, Adv Details and Project Type.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2000 characters |
| 3 | Good To Know | goodToKnow | goodToKnow | No | Seller's own label / value points |
| 4 | Project Type | projectType | text | Yes | Half width |
| 5 | Budget | budgetAmount | currency | No | Min 0, half width |

There are 7 posts (IN 2, GB 3, SG 2), all seed samples with only a title and a price. Their prices are wrong: ₹50 Lakh investment was saved as 50, and "Investment: £50K" as 50. One GB seed, "Food Franchise Opportunity — Proven Brand", belongs in Franchise Opportunities. The mock listings give sector, stage, equity, role needed and commitment.

The search offers Field, Engagement (One-off, Project, Ongoing) and Work Arrangement (On-site, Hybrid, Remote). None of them works, and they describe a job, not a partnership. The price filter reads `salePrice`, but the form saves Budget as `budgetAmount`.

## Field type changes

2 existing fields should change.

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Project Type | free text | Looking For select (required): Co-founder, Investor, Business Partner, Joint Venture, Other | The question every partnership ad answers first |
| Budget | `budgetAmount`, labelled Budget | Rename Investment Amount; the price filter reads `budgetAmount` for this sub | Seeds state investment sought or offered, not a budget |

## New fields to add

Partnership Opportunities can add 6 fields with no new field types.

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Industry | select | Tech, F&B, Retail, Services, Healthcare, Education, Other | All | Yes | Same list as Startup Support's Industry filter; every seed states a sector |
| Stage | select | Idea, MVP, Early Revenue, Growth, Established | All | No | Seeds say "MVP / pre-seed" and "Post-Revenue" |
| Offering | multiselect | Equity, Profit share, Revenue share, Salary | All | No | What the partner gets back |
| Equity Offered | number | 0–100, unit % | All | No | Seeds offer 18% and 25–40% |
| Role Needed | text | e.g. "CTO / Tech Co-Founder" | All | No | Shown when Looking For is Co-founder or Business Partner |
| Commitment | select | Full-time, Part-time, Flexible | All | No | Seeds say "Full-time preferred" |

The search filters should change to match: Looking For, Industry and Stage in place of Field, Engagement and Work Arrangement.

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [ ] Replace Project Type with Looking For (required)
- [ ] Rename Budget to Investment Amount; the price filter reads `budgetAmount`
- [ ] Add Industry (required)
- [ ] Add Stage
- [ ] Add Offering
- [ ] Add Equity Offered
- [ ] Add Role Needed (Co-founder and Business Partner only)
- [ ] Add Commitment
- [ ] Swap the search filters to Looking For, Industry and Stage, and wire them
- [ ] Move the GB food franchise seed to Franchise Opportunities
- [ ] Backfill the seed posts: fix investment amounts and fill details from their mock listings

## Built — 26 Oct 2026

All 11 items are built in IN, GB and SG (commit 316fe67). The search filters are now Looking For, Industry and Stage.

- Existing posts: the 6 remaining seeds got Looking For, Industry, Stage and Offering. Investment asks moved to Investment Amount with the right values (₹50 Lakh now ₹5,000,000). The GB food franchise seed moved to Franchise Opportunities. Checked on the DB: Co-founder finds 3; F&B with a 50,000 minimum finds the 2 cloud kitchens.
