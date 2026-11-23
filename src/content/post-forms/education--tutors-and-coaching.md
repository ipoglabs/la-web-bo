<!-- source: https://claude.ai/artifact/ViVwLUCsvWbu5r8fHtZoZa -->
# Education › Tutors & Coaching — Post Form Review

Oct 26, 2026

Tutors & Coaching asks a free-text subject and level. Services › Tutoring asks the same thing properly: subject and level lists, exam board, lesson format and fee per hour. The two should share one field set.

## Current fields

The form is the same in IN, GB and SG.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | `name` | text | Yes |  |
| 2 | Adv Details | `description` | richtext | Yes |  |
| 3 | Good To Know | `goodToKnow` | goodToKnow | No |  |
| 4 | Business / Provider Name | `providerName` | text | No |  |
| 5 | Subject | `subject` | text | Yes | Free text |
| 6 | Level | `level` | text | No | Free text |
| 7 | Qualification | `qualification` | text | No |  |
| 8 | Mode | `mode` | select | No | Online, In Person (saved `offline`), Both |
| 9 | Availability | `availability` | text | No |  |
| 10 | Fee | `price` | currency | Yes | Min 1 |

7 seed posts (IN 2, GB 3, SG 2): maths and science, spoken English, A-Level physics, 11+ prep and a SEN specialist. Fees are right but all are hourly, and the cards show a bare "£45". All three GB mocks say "Enhanced DBS checked" and offer a free first lesson; none of it is saved.

The sidebar has 2 filters: Subject (Maths, Science, English, Languages, Arts, Other) and Mode (In-person, Online, Both). Neither does anything today. Services › Tutoring's filters are Subject (adds Music, Coding), Level (Primary, Secondary, College, Adult) and How.

## Field type changes

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Subject | text | Subjects multiselect: Maths, Science, English, Languages, Music, Coding, Other; Other asks which | Same list as Services › Tutoring; tutors teach several |
| Level | text | Level multiselect in each market's words (IN 10th / 12th, GB GCSE / A-Level, SG PSLE / O-Level) | Same as Services › Tutoring; search groups them as Primary, Secondary, College, Adult |
| Mode | Online, In Person, Both | Service Mode: At my place, Student's home, Online | Home visits are the main question for tutors |
| Fee | Saved as `price`, required | Saved as `salePrice`, required | Price filter reads it |

## New fields to add

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Fee Per | select | Hour, Session, Month | All | No | Every seed is per hour |
| Exam Board / Curriculum | multiselect | IN: CBSE, ICSE, State, IB, IGCSE; GB: AQA, Edexcel, OCR, IB; SG: MOE, IB, IGCSE | All | No | Same as Services › Tutoring; the GB physics tutor lists three boards |
| Lesson Format | multiselect | One-to-one, Small group | All | No | Two IN/SG seeds offer both |
| Background Check | select | GB: Enhanced DBS; IN: Police verification; SG: None common. Values: Checked, Not checked | All | No | Parents look for it first; every GB mock has it |
| Free Trial Lesson | select | Yes, No | All | No | All three GB mocks offer one |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [ ] Use the Services › Tutoring field set here (Subjects, Level, Exam Board, Lesson Format, Service Mode)
- [ ] Filters follow: Subject gains Music and Coding and drops Arts; add Level; Mode becomes How (At my place, Home visit, Online)
- [ ] Save Fee as `salePrice` and add Fee Per; card shows "£45 / hr"
- [ ] Add Background Check ("DBS Check" in GB, "Police Verification" in IN)
- [ ] Add Free Trial Lesson
- [ ] Wire the Subject, Level and How filters
- [ ] Backfill the 7 seeds from the mocks, all priced per hour
