<!-- source: https://claude.ai/artifact/N7f9Lptb9rmvFk1mCaBCDQ -->
# Education › Study Materials — Post Form Review

Oct 26, 2026

Study Materials is the one Education sub that sells items: textbooks, guides and revision sets. It asks condition and a free-text subject, but not what kind of material or for which level.

## Current fields

The form is the same in IN, GB and SG.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | `name` | text | Yes |  |
| 2 | Adv Details | `description` | richtext | Yes |  |
| 3 | Good To Know | `goodToKnow` | goodToKnow | No |  |
| 4 | Condition | `condition` | select | Yes | Brand New, Like New, Lightly Used, Well Used, Heavily Used |
| 5 | Subject / Exam | `subject` | text | No |  |
| 6 | Price | `price` | currency | Yes | Min 1 |
| 7 | Negotiable | `negotiable` | select | No | Yes, No |
| 8 | Deal Method | `dealMethod` | multiselect | No | Meet-up / Collection, Delivery / Courier |

7 seed posts (IN 2, GB 3, SG 2): NCERT and Primary 6 sets, JEE and A-Level H2 prep, CGP GCSE guides, medical textbooks and ABRSM piano books. Prices are right. Most are bundles ("10 books, not split"), and the GB mocks offer postage at a set price; none of it is saved.

The sidebar has 2 filters: Type (Textbooks, Notes, Past Papers, Guides, Other) and Condition (New, Like New, Used, For Parts). Neither does anything today. Condition's values (`like_new`, `for_parts`) don't match the form's (`like-new`, `lightly-used`). Every marketplace category has this same Condition mismatch.

Notes and past papers raise a copying question: photocopied textbooks and most exam-board papers are copyright. A hint on the form keeps it to originals and the seller's own notes.

## Field type changes

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Condition | Filter values differ | Filter uses the form's five values | So the filter can match |
| Subject / Exam | text | Keep, hint "e.g. JEE Physics, GCSE Biology" | Too varied for a list |
| Price | Saved as `price` | Saved as `salePrice` | Price filter reads it |

## New fields to add

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Material Type | select | Textbooks, Revision Guides, Past Papers, My Own Notes, Other | All | Yes | Matches the Type filter; "My Own Notes" heads off copied ones |
| Level | select | IN: Primary, Secondary (10th), Higher Secondary (12th), Competitive Exams, University; GB: Primary, GCSE, A-Level, University, Professional; SG: Primary (PSLE), O-Level, A-Level, University, Professional | All | No | Buyers search by level; same words as Services › Tutoring |
| Number of Items | number |  | All | No | Most seeds are bundles |
| Sold As | select | Bundle only, Can split | All | No | Every GB mock says "not split" |
| Edition / Syllabus Year | text | e.g. 2024–25 | All | No | Old syllabus books are worth less |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [ ] Add Material Type, matched to the Type filter
- [ ] Add Level, in each market's words, with a Level filter
- [ ] Condition filter uses the form's values (and fix the same mismatch across marketplace later)
- [ ] Add Number of Items, Sold As and Edition / Syllabus Year
- [ ] Hint: originals and your own notes only, no photocopies
- [ ] Save Price as `salePrice`
- [ ] Wire the Type, Level and Condition filters
- [ ] Backfill the 7 seeds from the mocks
