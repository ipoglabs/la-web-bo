<!-- source: https://claude.ai/artifact/2oworrxCAt5Ejc2sSeoeBU -->
# Jobs › Internship — Post Form Review

Oct 21, 2026

The Internship form is the same in IN, GB and SG. The biggest gaps: Stipend doesn't say it's per month, it still shows for unpaid internships, and End Date repeats Duration.

## Current fields

The Internship form has 12 fields today. Only 3 are required: Adv Title, Adv Details and Company.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2000 characters |
| 3 | Good To Know | goodToKnow | goodToKnow | No | Seller's own label / value points |
| 4 | Company | company | text | Yes | Max 200 characters |
| 5 | Work Mode | workMode | select | No | On-site, Hybrid, Remote |
| 6 | Duration | duration | select | No | 1, 2, 3, 6, 12 months. Half width |
| 7 | Start Date | startDate | date | No | Half width |
| 8 | End Date | endDate | date | No | Half width |
| 9 | Stipend Type | stipendType | select | No | Unpaid, Stipend, Salary. Half width |
| 10 | Stipend | stipendAmount | currency | No | Min 0, half width. No period shown |
| 11 | Skills | skills | multiselect | No | JavaScript, React, Node.js, TypeScript, SQL, Python, Communication, Leadership, Sales, Customer Service |
| 12 | Apply Link | applyLink | text | No | Placeholder "https://", any text accepted |

There are 7 Internship posts (IN 2, GB 3, SG 2), all seed samples. The GB stipends (£20,000–£24,000) look yearly, but search reads them as monthly.

The search offers Field, Stipend, Duration and Work Arrangement filters plus Stipend per month. Stipend, Duration and Stipend per month work; Field and Work Arrangement match nothing.

## Field type changes

Seven existing fields should change. The most important: Stipend says "per month" and shows only for paid internships.

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Stipend | no period, always shown | Label "Stipend (per month)". Shown only when Stipend Type isn't Unpaid | Search compares it per month; the GB seed posts typed yearly figures. An unpaid internship has nothing to enter |
| Stipend Type | Unpaid, Stipend, Salary | IN: Unpaid, Stipend. GB and SG: Unpaid, Paid (Paid saves as "stipend"). Salary removed | "Stipend" is Indian wording; Stipend and Salary already search as the same "Paid" |
| Stipend Type (GB) | Unpaid allowed with no note | Keep Unpaid, with a hint: most UK interns count as workers and must get the National Minimum Wage | An unpaid UK internship is usually only legal as part of a course |
| End Date | separate date | Remove: Start Date + Duration give it | Two fields that can disagree (a 3-month internship ending after 6) |
| Start Date | date only | Date + Immediately chip | Many internships start as soon as someone is picked |
| Skills | 10 fixed choices, mostly tech | Tags: type your own, max 10 | Interns in sales, design or hospitality have no skill to pick |
| Apply Link | any text | Must be a web link starting with https:// | A typo or an email address gives seekers a link that doesn't open. Needs a small code change before the DB sync |

## New fields to add

Internship can add 5 fields with no new field types. Job Category matters most: the Field filter has nothing to match today.

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Job Category | select (dropdown) | Same list as Full Time: IT & Tech … Customer Service, Other | All | Yes | The Field search filter has nothing to match today |
| Hours | select | Full-time, Part-time | All | No | Students need to know if it fits around classes; Internshala lists part-time internships separately |
| Open To | select | Current students, Recent graduates, Both | All | No | Saves applications from people who don't qualify |
| Job Offer Possible | select | Yes, No. IN label "Pre-Placement Offer (PPO)" | All | No | A PPO is a top reason Indian students pick an internship |
| Application Deadline | date | — | All | No | Internship intakes close on a date; Full Time and Part Time already have it |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [ ] Stipend labelled per month, shown only when paid
- [ ] Stipend Type: IN Unpaid / Stipend, GB and SG Unpaid / Paid; drop Salary
- [ ] GB: minimum-wage hint on Unpaid
- [ ] Remove End Date
- [ ] Start Date with Immediately
- [ ] Skills as type-your-own tags, max 10
- [ ] Apply Link must be a web link
- [ ] Add Job Category (required) and widen the Field filter to match
- [ ] Add Hours (Full-time / Part-time)
- [ ] Add Open To
- [ ] Add Job Offer Possible (IN: PPO)
- [ ] Add Application Deadline
- [ ] Wire the Work Arrangement filter to Work Mode (search only)
- [ ] Fix the 3 GB seed stipends that are yearly figures

## Built — 21 Oct 2026

All 14 items are live in IN, GB and SG (commit e35bc3f). Where the build differs from the suggestion:

- Paid in GB and SG saves as "stipend", the same value as India's Stipend, so search reads one value.
- Listing cards now show the stipend with "/ mo", or "Unpaid".
- Work Arrangement was already wired with Full Time (commit e21d627).
- Existing posts: the migration moves seed stipends from Salary to Stipend and divides the 3 GB yearly figures by 12 (£22,000 → £1,833). It drops End Date and fills Duration and Job Category from the title where it says them.
