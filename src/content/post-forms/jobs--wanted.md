<!-- source: https://claude.ai/artifact/BDK7Rty7yFPV6YCP65HR1q -->
# Jobs › Wanted — Post Form Review

Oct 21, 2026

Jobs Wanted is a seeker's ad, the same in IN, GB and SG. The biggest gaps: it requires the seeker's full name on a public ad, and none of its 4 search filters matches what the form saves.

## Current fields

The Wanted form has 11 fields today. Only 3 are required: Adv Title, Adv Details and Your Name.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2000 characters |
| 3 | Good To Know | goodToKnow | goodToKnow | No | Seller's own label / value points |
| 4 | Your Name | candidateName | text | Yes | Max 200 characters, shown on the ad |
| 5 | Employment Type | employmentType | select | No | Full Time, Part Time, Internship, Freelance, Temporary, Contract |
| 6 | Experience | experience | text | No | Free text, half width |
| 7 | Expected Salary | salary | currency | No | Min 1, half width |
| 8 | Pay Period | salaryPeriod | select | No | Per hour, Per month, Per year. Starts on Per year in GB, Per month in IN and SG |
| 9 | Available From | available\_from | date | No | Half width |
| 10 | Skills | skills | multiselect | No | JavaScript, React, Node.js, TypeScript, SQL, Python, Communication, Leadership, Sales, Customer Service |
| 11 | Preferred Locations | preferred\_locations | tags | No | Any text, no limit on count |

There are 7 Wanted posts (IN 2, GB 3, SG 2), all seed samples. 2 GB salaries are two numbers run together (4500055000, 3800045000).

The search offers Looking For, Field, Experience Level and Work Arrangement filters plus Salary per month. Only Salary per month works. Looking For uses different values (fulltime, intern, temp) from Employment Type (full-time, internship, temporary).

## Field type changes

Six existing fields should change. The most important: Your Name stops being required on a public ad.

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Your Name | required, shown on the ad | Remove: the ad already shows the poster's profile name | A full name on a public job-seeker ad invites spam and scams |
| Employment Type | one choice | "Open To": several choices, same options. Search maps its Looking For values to them | Seekers are often open to full or part time; the filter matches nothing today |
| Experience | free text | Experience Level select: Entry, Mid, Senior, Lead, Manager. IN shows Fresher for Entry | The Experience Level search filter matches nothing today |
| Available From | date only | Date + Immediately chip | "Immediate joiner" is what employers scan for |
| Skills | 10 fixed choices, mostly tech | Tags: type your own, max 10 | Skills are the main thing a seeker sells |
| Preferred Locations | any text, no limit | Place names only, max 5 | Keeps the list readable and searchable |

## New fields to add

Wanted can add 5 fields with no new field types. Job Category and Preferred Work Mode matter most: the search already has filters for them.

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Job Category | select (dropdown) | Same list as Full Time: IT & Tech … Customer Service, Other | All | Yes | The Field search filter has nothing to match today |
| Preferred Work Mode | multiselect | On-site, Hybrid, Remote | All | No | The Work Arrangement search filter has nothing to match today |
| Highest Education | select | 10th Pass, 12th Pass, Diploma / ITI, Graduate, Post Graduate | IN | No | Indian employers screen on it first |
| Right to Work | select | GB: Yes, Need sponsorship. SG: Citizen / PR, Have a work pass, Need a work pass | GB, SG | No | Decides whether an employer can hire at all |
| Languages | tags | Type your own, max 5 | All | No | Customer-facing jobs in IN and SG ask for specific languages |

A CV upload would need a new file field type, so it's not in this list.

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [ ] Remove Your Name
- [ ] Employment Type becomes multi-choice "Open To", and the Looking For filter matches it
- [ ] Experience as an Experience Level select (IN says Fresher)
- [ ] Available From with Immediately
- [ ] Skills as type-your-own tags, max 10
- [ ] Preferred Locations: place names only, max 5
- [ ] Add Job Category (required) and widen the Field filter to match
- [ ] Add Preferred Work Mode and wire the Work Arrangement filter to it
- [ ] Add Highest Education (IN)
- [ ] Add Right to Work (GB, SG)
- [ ] Add Languages
- [ ] Fix the 2 GB seed salaries that are two numbers run together

## Built — 21 Oct 2026

All 12 items are live in IN, GB and SG (commit f33bb5f). Where the build differs from the suggestion:

- Open To keeps the Employment Type key, now a list; the search's Looking For values (fulltime, intern, temp) are translated to it.
- Preferred Work Mode is saved apart from Work Mode, so a seeker can pick several.
- Existing posts: 4 run-together salaries kept their lower end (GB £45,000, £38,000, £600; SG S$5,500). No seed post had a name, Employment Type, Experience or Work Mode to carry over.
