<!-- source: https://claude.ai/artifact/6rcAj3smf5gkpqqs6LsW1v -->
# Education › Language Classes — Post Form Review

Oct 26, 2026

Language Classes asks the language as free text. The sidebar's Language filter offers five fixed languages, none of which the form can match, and the most-taught languages differ in each market.

## Current fields

The form is the same in IN, GB and SG.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | `name` | text | Yes |  |
| 2 | Adv Details | `description` | richtext | Yes |  |
| 3 | Good To Know | `goodToKnow` | goodToKnow | No |  |
| 4 | Business / Provider Name | `providerName` | text | No |  |
| 5 | Language | `subject` | text | Yes | Free text |
| 6 | Level | `level` | text | No | Free text |
| 7 | Qualification | `qualification` | text | No |  |
| 8 | Mode | `mode` | select | No | Online, In Person (saved `offline`), Both |
| 9 | Availability | `availability` | text | No |  |
| 10 | Fee | `price` | currency | Yes | Min 1 |

7 seed posts (IN 2, GB 3, SG 2): French and Japanese JLPT N5 (IN and SG), Mandarin, IELTS prep and British Sign Language (GB). Fees are right but the cards drop "/ term" and "/ 6-week course". Three of the seven (Japanese twice, BSL) aren't in the filter list at all.

The sidebar has 1 filter: Language (English, Hindi, Mandarin, French, Spanish, Other). It does nothing today.

## Field type changes

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Language | text | select, per market. IN: English, Hindi, French, German, Spanish, Japanese, Mandarin, Other. GB: English (ESOL), French, Spanish, German, Mandarin, Japanese, Arabic, British Sign Language, Other. SG: English, Mandarin, Malay, Tamil, Japanese, Korean, French, Other | Matches a Language filter trimmed per market |
| Level | text | select: Beginner, Intermediate, Advanced, All Levels | Can be filtered |
| Mode | Saves `offline` / `both` | Format: In Person, Online, Both, saved `inperson` | Same list as the other Education subs |
| Fee | Saved as `price` | Saved as `salePrice` | Price filter reads it |

## New fields to add

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Exam Prep | select | None, IELTS, TOEFL, JLPT, HSK, DELF / DALF, Other | All | No | Three seeds prepare for an exam |
| Class Size | select | One-to-one, Small group (up to 10), Class | All | No | Mocks give max 8 and max 10 |
| Fee Per | select | Hour, Term, Full course, Month | All | No | Seeds are per term or per course |
| Schedule | text | e.g. Tue evenings, 10 weeks | All | No | Every GB mock gives one |
| Native Speaker Teacher | select | Yes, No | All | No | Two GB mocks lead with it |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [ ] Language becomes a select per market, with the filter trimmed to match each market
- [ ] Level becomes a select, with a Level filter
- [ ] Mode becomes Format, with a Format filter
- [ ] Add Exam Prep, with a filter
- [ ] Add Class Size, Schedule and Native Speaker Teacher
- [ ] Save Fee as `salePrice` and add Fee Per; card shows "£150 / course"
- [ ] Wire the filters
- [ ] Backfill the 7 seeds from the mocks
