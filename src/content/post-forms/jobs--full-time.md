<!-- source: https://claude.ai/artifact/UPzNiRvvj1uK19gMqvqQyT -->
# Jobs › Full Time — Post Form Review

Oct 21, 2026

The Full Time form is the same in IN, GB and SG except Benefits. The biggest gaps: the Field and Experience Level search filters have nothing to match, and Salary is a single number.

## Current fields

The Full Time form has 12 fields today. Only 3 are required: Adv Title, Adv Details and Company.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2000 characters |
| 3 | Good To Know | goodToKnow | goodToKnow | No | Seller's own label / value points |
| 4 | Company | company | text | Yes | Max 200 characters |
| 5 | Salary | salary | currency | No | Min 1, half width |
| 6 | Pay Period | salaryPeriod | select | No | Per hour, Per month, Per year. Starts on Per year in GB, Per month in IN and SG |
| 7 | Experience | experience | text | No | Free text, placeholder "e.g. 2-4 years" |
| 8 | Work Mode | workMode | select | No | On-site, Hybrid, Remote |
| 9 | Skills | skills | multiselect | No | JavaScript, React, Node.js, TypeScript, SQL, Python, Communication, Leadership, Sales, Customer Service |
| 10 | Benefits | benefits | multiselect | No | All: Health Insurance, Paid Time Off, Remote Friendly, Bonus. IN adds Provident Fund, Gratuity, Travel Allowance. GB adds Pension Scheme, Cycle to Work, Season Ticket Loan. SG adds CPF Contribution, Flexi Benefits, Transport Allowance |
| 11 | Application Deadline | deadline | date | No | Half width |
| 12 | Apply Link | applyLink | text | No | Placeholder "https://", any text accepted |

There are 7 Full Time posts (IN 2, GB 3, SG 2), all seed samples. Both SG salaries are two numbers run together (65008500, 32003800).

The search offers Field, Experience Level and Work Arrangement filters. None of them works today: the form has no Field, Experience is free text, and Work Arrangement isn't wired to Work Mode.

## Field type changes

Five existing fields should change. The most important: Experience becomes a choice, so the Experience Level filter can match it.

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Salary | one number | Salary From and Salary To (To must be at least From). Pay Period stays beside them | Most job ads quote a range, and the seed posts typed ranges into one box (65008500) |
| Experience | free text, e.g. "2-4 years" | Experience Level select: Entry, Mid, Senior, Lead, Manager. IN shows "Fresher" for Entry (same stored value) | The same values as the Experience Level search filter, which matches nothing today |
| Skills | 10 fixed choices, mostly tech | Tags: type your own, max 10 | A chef, driver or nurse job has no skill to pick |
| Benefits | includes Remote Friendly | Remove Remote Friendly | Work Mode already says it, and the two can disagree |
| Apply Link | any text | Must be a web link starting with https:// | A typo or an email address gives seekers a link that doesn't open. Needs a small code change before the DB sync |

## New fields to add

Full Time can add 6 fields with no new field types. Job Category matters most: it gives the Field filter something to match on every Jobs search.

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Listed By | select | IN: Employer, Consultancy. GB and SG: Employer, Recruitment Agency | All | Yes | Seekers on Naukri, Reed and JobStreet filter agencies in or out |
| Job Category | select (dropdown) | IT & Tech, Finance & Accounts, Sales & Marketing, Engineering, Healthcare, Education, Admin & Office, Creative & Design, Hospitality & Food, Retail, Driving & Logistics, Construction & Trades, Customer Service, Other | All | Yes | The Field search filter has nothing to match today. The filter would gain the new categories |
| Openings | number | 1–999 | All | No | Shows bulk hiring ("5 openings"), common on Indian job sites |
| Start Date | date + Immediately chip | — | All | No | "Immediate joiner" is a top line on job ads |
| Minimum Education | select | 10th Pass, 12th Pass, Diploma / ITI, Graduate, Post Graduate, Any | IN | No | Naukri and Apna ask for it, and many IN jobs are screened on it |
| Visa Sponsorship | select | Yes, No | GB | No | Skilled Worker sponsorship decides whether many applicants can apply at all |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [x] Salary as a From – To range
- [x] Experience as an Experience Level select (IN says Fresher)
- [x] Skills as type-your-own tags, max 10
- [x] Remove Remote Friendly from Benefits
- [x] Apply Link must be a web link
- [x] Add Listed By (required)
- [x] Add Job Category (required) and widen the Field filter to match
- [x] Add Openings
- [x] Add Start Date with Immediately
- [x] Add Minimum Education (IN)
- [x] Add Visa Sponsorship (GB)
- [x] Wire the Work Arrangement filter to Work Mode (search only)
- [x] Fix the 2 SG seed salaries that are two numbers run together

## Built — 21 Oct 2026

All 13 ticked items are live in IN, GB and SG (commit e21d627). Where the build differs from the suggestion:

- Salary From, Salary To and Pay Period sit on one row. Listings show the range, e.g. "S$6,500 – S$8,500 / mo".
- A salary search matches any ad whose range overlaps the filter's range, still compared per month.
- Field and Experience Level filter Full Time only; other Jobs searches ignore them until their forms save them.
- Work Arrangement now filters every Jobs search whose form saves Work Mode (all except Wanted).
- Older posts with typed experience (e.g. "2-4 years") must re-pick Experience Level on their next edit.
- Existing posts: the 2 SG seed salaries were split into From and To (S$6,500–8,500 and S$3,200–3,800).
