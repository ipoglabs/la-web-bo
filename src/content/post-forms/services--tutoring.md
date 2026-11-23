<!-- source: https://claude.ai/artifact/EcDzRmEb9CvgXvgbMkBm3K -->
# Services › Tutoring — Post Form Review

Oct 22, 2026

The Tutoring form is the same in IN, GB and SG, but school levels differ by country. The biggest gaps: Subject is free text, Level uses Indian school names in every country, and no filter works.

## Current fields

The Tutoring form has 10 fields today. 4 are required: Adv Title, Adv Details, Subject and Fee.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2000 characters |
| 3 | Good To Know | goodToKnow | goodToKnow | No | Seller's own label / value points |
| 4 | Subject | subject | text | Yes | Max 200 characters |
| 5 | Level | level | select | No | Primary, Secondary, Higher Secondary, College, Competitive Exams |
| 6 | Mode | mode | select | No | Online, In Person, Both |
| 7 | Qualification | qualification | text | No | Max 200 characters, half width |
| 8 | Experience | experience | text | No | Max 200 characters, Placeholder "e.g. 5 years", half width |
| 9 | Fee | price | currency | Yes | Min 1, half width |
| 10 | Availability | availability | text | No | Max 200 characters, Placeholder "e.g. Mon–Sat, 9am–6pm", half width |

There are 7 Tutoring posts (IN 2, GB 3, SG 2), all seed samples with only a title and a price. None has a value for any detail field above.

The search offers Subject, Level and How filters. None of them works today: Subject is free text, Level isn't wired, and Mode (Online, In Person, Both) doesn't match How. The Level filter offers Adult, which the form doesn't.

## Field type changes

5 existing fields should change. The most important: Price saves to the field search reads, so the price filter works.

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Price | saved as `price` | Save as `salePrice`, the field listing prices and the price filter read | The price filter searches `salePrice`, so new posts never match it. The seed posts already use `salePrice`, so nothing needs migrating |
| Subject | required free text | Required multiselect: Maths, Science, English, Languages, Music, Coding, Other, with an Other Subject text shown when Other is picked | The same values as the Subject search filter. Most tutors teach more than one subject |
| Level | one choice, Indian levels everywhere | Multiselect per country. IN: Primary, Middle School, Secondary (10th), Higher Secondary (12th), College, Competitive Exams, Adult · GB: Primary, KS3, GCSE, A-Level, University, Adult · SG: Primary (PSLE), Secondary (O-Level), JC (A-Level), IB, Poly / University, Adult | "Higher Secondary" means nothing in GB or SG. Each level is stored under the filter's Primary / Secondary / College / Adult value |
| Mode | Online, In Person, Both | Service Mode multiselect: At my place, Student's home, Online | Matches the How search filter. Home tuition is the norm in IN and SG |
| Experience | free text, e.g. "5 years" | Years of Experience select: Under 1 year, 1–3 years, 3–5 years, 5–10 years, 10+ years | Free text can't be compared or filtered, and sellers type it in many ways |

## New fields to add

Tutoring can add 6 fields with no new field types.

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Curriculum / Board | multiselect | IN: CBSE, ICSE, State Board, IB, IGCSE · GB: AQA, Edexcel, OCR, IB · SG: MOE, IB, IGCSE | All | No | Parents search by board or exam board |
| Lesson Format | multiselect | One-to-one, Small group | All | No | Group classes cost less and parents compare the two |
| Price Per | select | Per hour, Per session, Per month | All | No | Tutors in IN often charge monthly, in GB and SG hourly |
| Tutor Type | select | Part-time tutor, Full-time tutor, Current / former school teacher | All | No | SG parents pay by tutor type (PT, FT, ex-MOE), and IN and GB parents ask too |
| DBS Checked | select | Yes, No | GB | No | UK parents expect a DBS check for anyone teaching children |
| Free Trial Lesson | select | Yes, No | All | No | A common deciding point for parents |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [x] Save Price as `salePrice` so the price filter finds new posts
- [x] Subject as a required multiselect matched to the Subject filter (+ Other Subject)
- [x] Level as a per-country multiselect, stored as the filter's values
- [x] Mode → Service Mode (At my place, Student's home, Online)
- [x] Experience as a Years of Experience select
- [x] Add Curriculum / Board
- [x] Add Lesson Format
- [x] Add Price Per
- [x] Add Tutor Type
- [x] Add DBS Checked (GB)
- [x] Add Free Trial Lesson
- [x] Wire the Subject, Level and How filters (search only)
- [x] Backfill details on the 7 seed posts so the new filters have something to match

## Built — 22 Oct 2026

All 13 ticked items are live in IN, GB and SG (commit b084f5d). Where the build differs from the suggestion:

- Each level keeps its own value (GCSE, O-Level, Higher Secondary…). The Level filter groups them: Primary; Secondary = Middle School to A-Level, JC, IB and Competitive Exams; College = College, University, Poly; Adult.
- The Level filter shows "University" for College in GB and "Poly / University" in SG.
- Curriculum is labelled Exam Board in GB.
- Subjects and Level are saved as new lists; the old single Subject and Level values were empty on every post.
- Other Subject appears whenever Other is one of the ticked subjects. This needed a small change to how forms show conditional fields, deployed before the sync.
- Existing posts: the 7 seed posts got Subjects, Level, Service Mode and Price Per, plus Curriculum, Tutor Type, DBS, Free Trial and experience where their mock listing gave them.
