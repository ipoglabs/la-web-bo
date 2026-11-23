<!-- source: https://claude.ai/artifact/WaqHJFUPPqpXmD6rKR4G5n -->
# Education › Schools & Colleges — Post Form Review

Oct 26, 2026

Schools & Colleges has no search filters at all, and four of its seven seed posts aren't schools. It needs a clear purpose before new fields.

## Current fields

The form is the same in IN, GB and SG.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | `name` | text | Yes |  |
| 2 | Adv Details | `description` | richtext | Yes |  |
| 3 | Good To Know | `goodToKnow` | goodToKnow | No |  |
| 4 | Business / Provider Name | `providerName` | text | No |  |
| 5 | Type | `educationType` | select | No | School, College, University, Vocational, Other |
| 6 | Board / Affiliation | `qualification` | text | No |  |
| 7 | Availability | `availability` | text | No |  |
| 8 | Fees | `price` | currency | Yes | Min 1 |

7 seed posts (IN 2, GB 3, SG 2):

- IN and SG admissions counselling (₹5,000 / S$300 per session), and IN and SG college or university application help (₹8,000 / S$500 per package): consultancy services, not schools
- GB weekend drama school (from £80 / term) and an after-school tuition centre (£85 / month)
- GB sixth-form open evening (free, 3 July 2026, now past); the form's required fee of at least 1 means it couldn't be posted today

The sidebar has no filters.

## Field type changes

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Type | School, College, University, Vocational, Other | Institution Type in each market's words: Nursery / Pre-school, Primary, Secondary, Sixth Form (GB) / Junior College (SG) / Higher Secondary (IN), College / University, Tuition Centre, Activity School, Vocational | Covers what the seeds actually are |
| Board / Affiliation | text, saved as `qualification` | Curriculum multiselect: IN CBSE, ICSE, State, IB, IGCSE; GB National Curriculum, IB, Independent; SG MOE, IB, IGCSE | Parents filter by board, IN especially |
| Fees | Saved as `price`, required | Saved as `salePrice`, optional | Open days and state schools are free |
| Availability | text | Remove | Not a school question |

## New fields to add

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Ad Type | select | Admissions Open, Open Day / Event, Places Available | All | Yes | An open evening and an admissions ad need different fields |
| Event Date | date |  | All | Yes, Open Day only | Lets past open days drop out of search |
| Ages / Levels | text | e.g. Ages 5–18, KS2 & KS3 | All | No | Every seed gives one |
| Fees Per | select | Term, Year, Month | All | No | Seeds are per term and per month |
| Inspection / Accreditation | text | e.g. Ofsted Good | All | No | The GB drama school lists its Ofsted grade |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [ ] Keep this sub for institutions: admissions, open days and places
- [ ] Move the 4 IN / SG admissions and application-help seeds to Services › Education & Learning
- [ ] Type becomes Institution Type, in each market's words, with a filter
- [ ] Board / Affiliation becomes Curriculum, with a filter
- [ ] Add Ad Type, with a filter, and Event Date for open days; hide past open days
- [ ] Add Ages / Levels and Inspection / Accreditation
- [ ] Save Fees as `salePrice`, make them optional, add Fees Per; card shows "Free" when blank
- [ ] Remove Availability
- [ ] Backfill the 3 GB seeds; move the open evening to 2027
