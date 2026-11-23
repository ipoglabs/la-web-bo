<!-- source: https://claude.ai/artifact/GPBFtghTfHVCBYuTmAVKC2 -->
# Services › Education & Learning — Post Form Review

Oct 22, 2026

The Education & Learning form is the same in IN, GB and SG. The biggest gaps: Education Type includes Tutoring, which has its own subcategory, and its values don't match the Category or Format filters.

## Current fields

The Education & Learning form has 10 fields today. 3 are required: Adv Title, Adv Details and Fees.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2000 characters |
| 3 | Good To Know | goodToKnow | goodToKnow | No | Seller's own label / value points |
| 4 | Education Type | educationType | select | No | Tutoring, Coaching, Online Course, School, Language, Professional |
| 5 | Subject / Course | subject | text | No | Max 200 characters, half width |
| 6 | Qualification | qualification | text | No | Max 200 characters, half width |
| 7 | Mode | mode | select | No | Online, In Person, Both |
| 8 | Experience | experience | text | No | Max 200 characters, Placeholder "e.g. 5 years", half width |
| 9 | Fees | price | currency | Yes | Min 1, half width |
| 10 | Availability | availability | text | No | Max 200 characters, Placeholder "e.g. Mon–Sat, 9am–6pm", half width |

There are 7 Education & Learning posts (IN 2, GB 3, SG 2), all seed samples with only a title and a price. None has a value for any detail field above.

The search offers Category, Format and How filters. None of them works today: Education Type (Tutoring, Coaching, Online Course, School, Language, Professional) mixes subject and format, so it matches neither Category (Languages, Music, Arts & Crafts…) nor Format (Class, Workshop, Course, One-on-one).

## Field type changes

5 existing fields should change. The most important: Price saves to the field search reads, so the price filter works.

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Price | saved as `price` | Save as `salePrice`, the field listing prices and the price filter read | The price filter searches `salePrice`, so new posts never match it. The seed posts already use `salePrice`, so nothing needs migrating |
| Education Type | Tutoring, Coaching, Online Course, School, Language, Professional | Category select: Languages, Music, Arts & Crafts, Dance, Tech & Coding, Cooking, Business Skills, Personal Development, Exam Coaching, Other | Matches the Category search filter. Tutoring moves out: it has its own subcategory |
| Subject / Course | optional text | Course Name, required text | Without it the ad doesn't say what is taught |
| Mode | Online, In Person, Both | Service Mode multiselect: At my place, Home visit, Online | Matches the How search filter |
| Experience | free text | Remove | Qualification and the ad text already cover it for a course |

## New fields to add

Education & Learning can add 6 fields with no new field types.

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Format | select | Class, Workshop, Course, One-to-one | All | Yes | The Format search filter has nothing to match today |
| Age Group | multiselect | Kids, Teens, Adults, All ages | All | No | Parents and adults look for different classes |
| Duration | text | e.g. 8 weeks, 2 days | All | No | A course price means little without its length |
| Start Date | date + Ongoing chip | — | All | No | Batches start on set dates; ongoing classes say so |
| Price Per | select | Per class, Per month, Full course | All | No | Says what the fee covers |
| Certificate | select | Yes, No | All | No | Learners ask whether they get a certificate at the end |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [x] Save Price as `salePrice` so the price filter finds new posts
- [x] Education Type → Category matched to the Category filter (Tutoring removed)
- [x] Subject / Course → Course Name (required)
- [x] Mode → Service Mode (At my place, Home visit, Online)
- [x] Remove Experience
- [x] Add Format (required)
- [x] Add Age Group
- [x] Add Duration
- [x] Add Start Date with Ongoing
- [x] Add Price Per
- [x] Add Certificate
- [x] Wire the Category, Format and How filters (search only)
- [x] Backfill details on the 7 seed posts so the new filters have something to match

## Built — 22 Oct 2026

All 13 ticked items are live in IN, GB and SG (commit ca3ac24). Where the build differs from the suggestion:

- The Category search filter gained Dance, Exam Coaching and Other, so every Category value in the form can be searched.
- Course Name keeps the old Subject / Course slot, so any course name already entered carries over.
- Listings show the fee as "/ class", "/ mo" or "/ course" from Price Per.
- Existing posts: the 7 seed posts got Category, Course Name, Format, Service Mode, Age Group and Price Per, plus Duration, Start Date (PSLE: Ongoing) and Certificate (PRINCE2) where their ad gave them. JEE, NEET, PSLE and O-Level are Exam Coaching. The IELTS ad is priced per hour, so it uses Per class.
