<!-- source: https://claude.ai/artifact/LVXt5P7CN9yTmtGKLgxKM9 -->
# Business › Freelance Contractors — Post Form Review

Oct 26, 2026

The form is the same in IN, GB and SG. The biggest gaps: the rate has no unit (every seed is per hour or per day), Service Type is free text, and none of the Field, Experience Level or Work Arrangement filters works.

## Current fields

The form has 7 fields today. 3 are required: Adv Title, Adv Details and Service Type.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2000 characters |
| 3 | Good To Know | goodToKnow | goodToKnow | No | Seller's own label / value points |
| 4 | Service Type | serviceType | text | Yes | Full width |
| 5 | Skills | skills | tags | No | "Type a skill and press Enter" |
| 6 | Availability | availability | text | No | Half width |
| 7 | Service Price | price | currency | No | Min 0, half width |

There are 7 posts (IN 2, GB 3, SG 2), all seed samples with only a title and a price. Their mock listings give skills, years of experience, day rate, availability date and, in GB, IR35 status.

The search offers Field (IT & Tech, Finance, Sales & Mktg, Engineering, Healthcare, Education, Admin & Ops, Creative, Hospitality), Experience Level (Entry, Mid, Senior, Lead, Manager) and Work Arrangement (On-site, Hybrid, Remote) — the same filters as Jobs. None of them works here.

This sub is the contractor's own offer; Jobs › Freelance is a client's job ad. Keep the two apart in the field labels.

## Field type changes

3 existing fields should change. The most important: Price saves to the field search reads, so the price filter works.

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Service Price | saved as `price`, no unit | Rename Rate, save as `salePrice`, plus Rate Per: Per hour, Per day, Per project | The price filter searches `salePrice`; seeds are ₹1,500/hr and £600/day |
| Service Type | free text | Field select (required), the Field filter's 9 options plus Other | Matches the Field search filter |
| Availability | free text | Available From: date, or "Available now" chip | Seeds say "From July 2026" and "Immediately" |

## New fields to add

Freelance Contractors can add 5 fields with no new field types.

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Experience Level | select | Entry, Mid, Senior, Lead, Manager | All | No | Backs the Experience Level filter |
| Years of Experience | number | 0–50 | All | No | Every seed states it |
| Work Arrangement | multiselect | On-site, Hybrid, Remote | All | No | Backs the Work Arrangement filter; seeds offer "Remote / Hybrid" |
| IR35 Status | select | Outside IR35, Inside IR35, Either | GB | No | Every GB seed states it; UK clients filter on it |
| Portfolio | text | Link, placeholder "https://" | All | No | Seeds say "Portfolio on request" |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [ ] Save the rate as `salePrice`, renamed Rate, and add Rate Per
- [ ] Replace Service Type text with a Field select (required) and wire the Field filter
- [ ] Replace Availability with Available From (date or Available now)
- [ ] Add Experience Level and wire the Experience Level filter
- [ ] Add Years of Experience
- [ ] Add Work Arrangement and wire the Work Arrangement filter
- [ ] Add IR35 Status (GB)
- [ ] Add Portfolio
- [ ] Backfill the 7 seed posts: Rate Per, Field, Skills and details from their mock listings

## Built — 26 Oct 2026

All 9 items are built in IN, GB and SG (commit 316fe67). Portfolio is a link field that must start with https://.

- Existing posts: all 7 seeds got Field, Skills, Work Arrangement and Rate Per; experience, IR35 and Available From where the mock listing gave them. Checked on the DB: IT + Senior finds 3 contractors; Remote finds 4.
