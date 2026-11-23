<!-- source: https://claude.ai/artifact/SRnyogrRbpAyu1TkvuuYwz -->
# Education › Online Courses — Post Form Review

Oct 26, 2026

Online Courses asks a free-text topic, duration and qualification. The sidebar filters on a fixed category list, which nothing the form saves can match.

## Current fields

The form is the same in IN, GB and SG.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | `name` | text | Yes |  |
| 2 | Adv Details | `description` | richtext | Yes |  |
| 3 | Good To Know | `goodToKnow` | goodToKnow | No |  |
| 4 | Business / Provider Name | `providerName` | text | No |  |
| 5 | Course Topic | `subject` | text | Yes | Free text |
| 6 | Duration | `durationText` | text | No |  |
| 7 | Qualification | `qualification` | text | No |  |
| 8 | Availability | `availability` | text | No | e.g. Mon–Sat, 9am–6pm |
| 9 | Fee | `price` | currency | Yes | Min 1 |

7 seed posts (IN 2, GB 3, SG 2): web development (IN, GB, SG), digital marketing (IN, GB, SG) and PMP exam prep (GB). Fees are right (₹12,999, £1,499, S$1,200). The mocks list duration, certificate, live or self-paced, start date and refund policy; none of it is saved. The GB digital marketing course is in person or online, so "Online" in the name doesn't always hold.

The sidebar has 1 filter: Category (Tech, Business, Design, Languages, Other). It does nothing today.

Availability ("Mon–Sat, 9am–6pm") is a shop-hours field from the shared service form; it means nothing for a course.

## Field type changes

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Course Topic | text | Category select: Tech & Coding, Business & Marketing, Design & Creative, Languages, Exam Prep & Certification, Other | Matches the Category filter; PMP and IELTS-style courses need Exam Prep |
| Duration | text | select: Under 1 month, 1–3 months, 3–6 months, 6+ months, Self-paced | Can be filtered |
| Qualification | text | Certificate select: Accredited, Certificate of completion, None | Every mock says which it is |
| Availability | text | Remove | Meaningless for a course |
| Fee | Saved as `price` | Saved as `salePrice` | Price filter reads it |

## New fields to add

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Format | select | Self-paced, Live online, Self-paced + live, In person or online | All | Yes | The first thing buyers check |
| Start Date | date | Chip: "Start any time" | All | No | GB mocks list a September or August start |
| Fee Per | select | Full course, Month | All | No | GB mocks say "/ course"; some sell monthly |
| Pay in Instalments | select | Yes, No | All | No | GB bootcamp offers 3 × £500 |
| Refund Policy | text | e.g. 14-day money-back | All | No | Every GB mock gives one; GB and SG buyers have a legal cooling-off for online purchases |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [ ] Course Topic becomes Category; filter gains Exam Prep & Certification
- [ ] Duration becomes a select, with a Duration filter
- [ ] Qualification becomes Certificate, with a Certificate filter
- [ ] Add Format, with a Format filter
- [ ] Remove Availability
- [ ] Add Start Date, Fee Per, Pay in Instalments and Refund Policy
- [ ] Save Fee as `salePrice`; card shows "£1,499 / course"
- [ ] Rename the sub "Courses" (it already holds in-person courses)
- [ ] Wire the filters
- [ ] Backfill the 7 seeds from the mocks
