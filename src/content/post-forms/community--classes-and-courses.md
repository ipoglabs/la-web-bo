<!-- source: https://claude.ai/artifact/AWij1hopgJ8uAr9wif6aiz -->
# Community › Classes & Courses — Post Form Review

Oct 26, 2026

Classes & Courses asks a qualification and a duration, both as required free text. The sidebar filters on fixed lists for both, so no typed answer can ever match.

## Current fields

The form is the same in IN, GB and SG.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Title | `name` | text | Yes |  |
| 2 | Description | `description` | richtext | Yes |  |
| 3 | Good To Know | `goodToKnow` | goodToKnow | No |  |
| 4 | Qualification Awarded | `qualification` | text | Yes |  |
| 5 | Duration | `durationText` | text | Yes | e.g. 8 weeks |
| 6 | Mode | `mode` | select | No | Online, In Person (saved `offline`), Hybrid |
| 7 | Fee | `price` | currency | No | Min 0 |

No posts yet in any country.

The sidebar has 2 filters: Qualification (Certificate, Diploma, Workshop, None) and Duration (Any, Under 1 week, 1–4 weeks, 1–3 months, 3+ months). Neither does anything today, and there is no price filter or mode filter.

Qualification Awarded is required, so a free workshop with no certificate has to type something. Business › Training covers the same ground for work skills; this sub suits local and hobby courses.

## Field type changes

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Qualification Awarded | text, required | select: Certificate, Diploma, Workshop (no award), None; required | Matches the filter; "None" is a real answer |
| Duration | text, required | select: Under 1 week, 1–4 weeks, 1–3 months, 3+ months; required | Matches the Duration filter |
| Mode | Saves `offline` | Format: In Person, Online, Hybrid, saved `inperson` | Same list as every other Community sub |
| Fee | Saved as `price` | Saved as `salePrice` | Turns the price filter on |

## New fields to add

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Subject | select | Same list as Classes: Music, Art, Dance, Fitness, Language, Cooking, Academic, Other | All | Yes | Lets one Subject filter cover both class subs |
| Start Date | date |  | All | No | Courses start on a set day; lets past intakes drop out |
| Awarding Body | text | e.g. City & Guilds | All | No, Certificate or Diploma only | What a certificate is worth depends on who issues it |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [ ] Qualification becomes a select, matched to the filter
- [ ] Duration becomes a select, matched to the filter
- [ ] Mode becomes Format (In Person, Online, Hybrid), with a Format filter
- [ ] Save Fee as `salePrice` and turn the price filter on
- [ ] Add Subject, shared with Classes, with a Subject filter
- [ ] Add Start Date
- [ ] Add Awarding Body for Certificate and Diploma
- [ ] Wire the Qualification and Duration filters
