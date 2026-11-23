<!-- source: https://claude.ai/artifact/G8FPm41CdUQW6anwJHzmZ8 -->
# Jobs › Temporary / Seasonal — Post Form Review

Oct 21, 2026

The Temporary / Seasonal form is the same in IN, GB and SG. The biggest gaps: the Duration search filter has nothing to match, there is no Apply Link, and Pay Period starts on Per month where temp pay is hourly or daily.

## Current fields

The Temporary / Seasonal form has 11 fields today. Only 3 are required: Adv Title, Adv Details and Company.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2000 characters |
| 3 | Good To Know | goodToKnow | goodToKnow | No | Seller's own label / value points |
| 4 | Company | company | text | Yes | Max 200 characters |
| 5 | Work Mode | workMode | select | No | On-site, Hybrid, Remote |
| 6 | Start Date | startDate | date | No | Half width |
| 7 | End Date | endDate | date | No | Half width |
| 8 | Working Hours | workingHours | text | No | Free text, no placeholder |
| 9 | Pay | salary | currency | No | Min 1, half width |
| 10 | Pay Period | salaryPeriod | select | No | Per hour, Per day, Per week, Per month. Starts on Per month everywhere |
| 11 | Skills | skills | multiselect | No | JavaScript, React, Node.js, TypeScript, SQL, Python, Communication, Leadership, Sales, Customer Service |

There are 7 Temporary / Seasonal posts (IN 2, GB 3, SG 2), all seed samples. 3 of them have no pay saved.

The search offers Field, Duration and Work Arrangement filters plus Salary per month. Only Salary per month works today.

## Field type changes

Four existing fields should change. The most important: Pay Period starts on how temp pay is really quoted in each market.

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Pay Period | starts on Per month everywhere | Starts on Per day in IN, Per hour in GB and SG | Temp and seasonal pay is quoted daily in India and hourly in the UK and Singapore |
| Working Hours | free text, no placeholder | Hours per Week: number, 1–60 | Free text can't be compared or filtered |
| Start Date | date only | Date + Immediately chip | Temp cover is usually needed now |
| Skills | 10 fixed choices, mostly tech | Tags: type your own, max 10 | Warehouse, harvest and event jobs have no skill to pick |

## New fields to add

Temporary / Seasonal can add 6 fields with no new field types. Duration and Job Category matter most: the search already has filters for them.

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Duration | select | Under 1 month, 1–3 months, 3–6 months, 6–12 months | All | No | The same buckets as the Duration search filter, which matches nothing today |
| Job Category | select (dropdown) | Same list as Full Time: IT & Tech … Customer Service, Other | All | Yes | The Field search filter has nothing to match today |
| Listed By | select | IN: Employer, Consultancy. GB and SG: Employer, Recruitment Agency | All | Yes | Most UK temp work comes through agencies; seekers filter on it |
| Openings | number | 1–999 | All | No | Seasonal hiring is often in bulk ("20 pickers") |
| Application Deadline | date | — | All | No | Seasonal intakes close before the season starts |
| Apply Link | text, must be a web link | — | All | No | Every other Jobs form has it except Wanted |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [ ] Pay Period starts on Per day (IN) / Per hour (GB, SG)
- [ ] Working Hours as Hours per Week (number)
- [ ] Start Date with Immediately
- [ ] Skills as type-your-own tags, max 10
- [ ] Add Duration and wire the Duration filter to it
- [ ] Add Job Category (required) and widen the Field filter to match
- [ ] Add Listed By (required)
- [ ] Add Openings
- [ ] Add Application Deadline
- [ ] Add Apply Link
- [ ] Wire the Work Arrangement filter to Work Mode (search only)

## Built — 21 Oct 2026

All 11 items are live in IN, GB and SG (commit 3978774). Where the build differs from the suggestion:

- End Date stays beside Start Date; this review didn't suggest removing it.
- Duration saves the search filter's own buckets, so the Duration filter matches it directly.
- Work Arrangement was already wired with Full Time (commit e21d627).
- Existing posts: the migration moves seed hourly rates to Pay per hour, gives Pay with no period Per day (IN) or Per hour (GB, SG), and fills Duration and Job Category from the title where it says them.
