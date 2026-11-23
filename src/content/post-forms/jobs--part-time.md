<!-- source: https://claude.ai/artifact/NQciBDdumeYZfEh8DkVNSG -->
# Jobs › Part Time — Post Form Review

Oct 21, 2026

The Part Time form is the same in IN, GB and SG. The biggest gaps: Working Hours is free text, pay can only be hourly, and the Field and Experience Level filters have nothing to match.

## Current fields

The Part Time form has 11 fields today. Only 3 are required: Adv Title, Adv Details and Company.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2000 characters |
| 3 | Good To Know | goodToKnow | goodToKnow | No | Seller's own label / value points |
| 4 | Company | company | text | Yes | Max 200 characters |
| 5 | Hourly Rate | hourlyRate | currency | No | Min 1, half width |
| 6 | Working Hours | workingHours | text | No | Free text, placeholder "e.g. 20 hrs/week" |
| 7 | Work Mode | workMode | select | No | On-site, Hybrid, Remote |
| 8 | Shifts | shifts | multiselect | No | Morning, Evening, Night, Weekend, Rotational |
| 9 | Skills | skills | multiselect | No | JavaScript, React, Node.js, TypeScript, SQL, Python, Communication, Leadership, Sales, Customer Service |
| 10 | Application Deadline | deadline | date | No | Half width |
| 11 | Apply Link | applyLink | text | No | Placeholder "https://", any text accepted |

There are 8 Part Time posts (IN 2, GB 3, SG 3), 7 of them seed samples. Two GB rates are typed ranges run together (2030, 1822).

The search offers Field, Experience Level and Work Arrangement filters plus Pay per hour. Only Pay per hour works today.

## Field type changes

Five existing fields should change. The most important: Working Hours becomes a number, so pay and hours can be compared.

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Working Hours | free text, e.g. "20 hrs/week" | Hours per Week: number, 1–48 | Free text can't be compared or filtered |
| Hourly Rate | per hour only | IN: Pay + Pay Period (Per hour, Per day, Per month), starts on Per month. GB and SG keep Hourly Rate | Indian part-time jobs are mostly quoted per month (e.g. ₹8,000 / month). Search would convert to hourly using Hours per Week |
| Shifts | Morning, Evening, Night, Weekend, Rotational | Shift: Morning, Afternoon, Evening, Night, Rotational. New Days field (below) takes Weekend | "Weekend" is a day, not a time of day; a Saturday morning job needs both |
| Skills | 10 fixed choices, mostly tech | Tags: type your own, max 10 | A shop or café job has no skill to pick |
| Apply Link | any text | Must be a web link starting with https:// | A typo or an email address gives seekers a link that doesn't open. Needs a small code change before the DB sync |

## New fields to add

Part Time can add 6 fields with no new field types. Job Category and Experience Level matter most: the search already has filters for them.

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Listed By | select | IN: Employer, Consultancy. GB and SG: Employer, Recruitment Agency | All | Yes | Seekers filter agencies in or out |
| Job Category | select (dropdown) | Same list as Full Time: IT & Tech … Customer Service, Other | All | Yes | The Field search filter has nothing to match today |
| Experience Level | select | Entry, Mid, Senior, Lead, Manager. IN shows Fresher for Entry | All | No | The Experience Level search filter has nothing to match today |
| Days | multiselect | Weekdays, Weekends, Flexible | All | No | Students and second-job seekers search by days first |
| Start Date | date + Immediately chip | — | All | No | Part-time roles are often filled the same week |
| Student Friendly | select | Yes, No | All | No | A top filter on part-time sites (e.g. Indeed's "student" jobs) |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [x] Working Hours as Hours per Week (number)
- [x] IN: Pay with a Pay Period instead of Hourly Rate
- [x] Shift without Weekend (Afternoon added)
- [x] Skills as type-your-own tags, max 10
- [x] Apply Link must be a web link
- [x] Add Listed By (required)
- [x] Add Job Category (required) and widen the Field filter to match
- [x] Add Experience Level
- [x] Add Days
- [x] Add Start Date with Immediately
- [x] Add Student Friendly
- [x] Wire the Work Arrangement filter to Work Mode (search only)

## Built — 21 Oct 2026

All 12 ticked items are live in IN, GB and SG (commit 801ae98). Where the build differs from the suggestion:

- Pay per hour search turns IN monthly or daily pay into an hourly rate using Hours per Week, or 20 hours when it's blank.
- Work Arrangement was already wired with Full Time (commit e21d627).
- Existing posts: the 2 IN hourly rates moved to Pay per hour; 3 GB rates moved to Hourly Rate, with the run-together ones kept at their lower end (2030 → £20, 1822 → £18); one SG post's Work Mode was fixed.
- One SG post has Working Hours "10-12h / week", which isn't one number, so its Hours per Week is blank until the seller edits it.
