<!-- source: https://claude.ai/artifact/9ed1QwLntn3HXDYJuSUM2D -->
# Jobs › Freelance — Post Form Review

Oct 21, 2026

The Freelance form is the same in IN, GB and SG. The biggest gaps: Company is required though many gigs come from individuals, Project Type has only 5 choices, and Contract Duration is free text.

## Current fields

The Freelance form has 12 fields today. Only 3 are required: Adv Title, Adv Details and Company.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2000 characters |
| 3 | Good To Know | goodToKnow | goodToKnow | No | Seller's own label / value points |
| 4 | Company | company | text | Yes | Max 200 characters |
| 5 | Project Type | projectType | select | No | Web Development, Design, Writing, Marketing, Other |
| 6 | Engagement | engagement | select | No | One-off, Ongoing, Project |
| 7 | Work Mode | workMode | select | No | On-site, Hybrid, Remote |
| 8 | Budget Type | budgetType | select | No | Fixed, Hourly. Half width |
| 9 | Budget | budgetAmount | currency | No | Min 1, half width |
| 10 | Contract Duration | contractDuration | text | No | Free text, placeholder "e.g. 3 months" |
| 11 | Skills | skills | multiselect | No | JavaScript, React, Node.js, TypeScript, SQL, Python, Communication, Leadership, Sales, Customer Service |
| 12 | Apply Link | applyLink | text | No | Placeholder "https://", any text accepted |

There are 7 Freelance posts (IN 2, GB 3, SG 2), all seed samples. All 3 GB budgets are two numbers run together (e.g. 400600).

The search offers Field, Experience Level, Engagement, Budget Type and Work Arrangement filters plus Budget. Engagement, Budget Type and Budget work; the other three match nothing.

## Field type changes

Six existing fields should change. The most important: Project Type gives way to the shared Job Category, so the Field filter works.

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Company | required | Label "Client / Company", optional | Many freelance gigs are posted by individuals, who have no company |
| Project Type | 5 choices | Replace with Job Category (shared Jobs list, required). Old values map across: Web Development → IT & Tech, Design → Creative & Design, Writing and Marketing → Sales & Marketing or Creative & Design | The Field search filter matches nothing today, and 5 choices miss video, translation, accounting and more |
| Engagement | One-off, Ongoing, Project | Labels "One-off task", "Fixed-term project", "Ongoing" (stored values unchanged) | "One-off" and "Project" read as the same thing |
| Contract Duration | free text | Select: Under 1 week, 1–4 weeks, 1–3 months, 3–6 months, 6+ months | Free text can't be filtered |
| Skills | 10 fixed choices, mostly tech | Tags: type your own, max 10 | Freelancers search by skill more than any other field |
| Apply Link | any text | Must be a web link starting with https:// | A typo or an email address gives seekers a link that doesn't open. Needs a small code change before the DB sync |

## New fields to add

Freelance can add 4 fields with no new field types. Experience Level matters most: the search already has a filter for it.

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Posted By | select | Business, Individual | All | Yes | Tells freelancers who they'd invoice; pairs with Client / Company becoming optional |
| Experience Level | select | Entry, Mid, Senior, Lead, Manager. IN shows Fresher for Entry | All | No | The Experience Level search filter has nothing to match today |
| Start Date | date + Immediately chip | — | All | No | Urgent gigs are the norm in freelance |
| Application Deadline | date | — | All | No | Full Time and Part Time have it; Freelance doesn't |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [x] Company becomes "Client / Company", optional
- [x] Replace Project Type with Job Category (required) and widen the Field filter to match
- [x] Clearer Engagement labels
- [x] Contract Duration as a select
- [x] Skills as type-your-own tags, max 10
- [x] Apply Link must be a web link
- [x] Add Posted By (required)
- [x] Add Experience Level
- [x] Add Start Date with Immediately
- [x] Add Application Deadline
- [x] Wire the Work Arrangement filter to Work Mode (search only)
- [x] Fix the 3 GB seed budgets that are two numbers run together

## Built — 21 Oct 2026

All 12 items are live in IN, GB and SG (commit c960055). Where the build differs from the suggestion:

- Posted By is saved as Listed By (Business or Individual), like the other Jobs forms.
- The search's Engagement filter uses the new labels too.
- Listings now show the Freelance budget, with "/ hr" when it's hourly. Before this, cards showed no budget at all.
- Work Arrangement was already wired with Full Time (commit e21d627).
- Existing posts: all 7 seed budgets moved from Salary to Budget. The 3 GB run-together budgets kept their lower end (£400, £250, £550), and one SG budget of 0 was dropped. No post had a Project Type to carry over.
