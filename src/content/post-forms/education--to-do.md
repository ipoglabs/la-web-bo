<!-- source: https://claude.ai/artifact/XSvAf29c7WGc7LBbdX7xCB -->
# Education — Post Form Review To-do

Oct 26, 2026

Education has 5 subcategories with 35 seed posts, 7 each. None has been reworked yet. Only the price filter works, and it misses every new post.

## Category-wide issues

Six problems hit every Education sub. Fixing them once covers all 5.

| Issue | Today | Fix |
| --- | --- | --- |
| Price filter misses new posts | The form saves `price`; the price filter reads `salePrice` | Save every Education fee as `salePrice` |
| Only price filters | Education has no filter mapping; Subject, Mode, Category, Type, Condition and Language are UI-only | Add `EDUCATION_FORM_FILTERS` in `postFilterQuery.ts`, the same pattern as Community |
| Filters ask what the form never asks | Subject, Course Topic and Language are free text; the filters are fixed lists | Make them selects whose values match the filters |
| No "per" on fees | Mocks say £45 / hr, ₹6,500 / term, £120 / 6-week course; the form has no Fee Per, so cards show a bare £45 | Add Fee Per to the service subs |
| Values don't match | Mode saves `offline` / `both`, filter asks `inperson`; Condition saves `like-new`, `lightly-used`, filter asks `like_new`, `for_parts` | One Format list (In Person, Online, Both); Study Materials uses the item Condition filter other marketplace categories use |
| Fee required | Fee is required and must be at least 1, so the GB free sixth-form open evening can't be posted | Fee optional; blank or 0 shows "Free" |

Form layout is the same in IN, GB and SG; the code takes no country. All 15 live DB forms match the code.

Seed prices are right (£45, ₹12,999 and so on) but every one loses its "/ hr", "/ term" or "/ course". Every detail in the mocks (subjects, levels, exam boards, DBS checks, durations) is lost.

**Education overlaps three other places.** Services › Tutoring and Services › Education & Learning (both reworked, with subject, level and format filters), Community › Classes & Courses, and Business › Training. A tutor can post in Education › Tutors & Coaching or Services › Tutoring and be found by different filters in each. The first decision is whether Education keeps its service subs or becomes study materials and schools only.

## To-do by subcategory

Each review ends with its own tick list. Tick a sub here once its form, filters and seed backfill are live.

- [x] Decide first: keep Education's service subs beside Services › Tutoring and Education & Learning — kept, sharing Services' field lists
- [x] Category-wide: save every Education fee as `salePrice`, add Fee Per, one Format list, add `EDUCATION_FORM_FILTERS`
- [x] [Tutors & Coaching](https://claude.ai/artifact/ViVwLUCsvWbu5r8fHtZoZa) — 7 posts, 7 decisions. Services › Tutoring field set, Background Check, Free Trial Lesson
- [x] [Online Courses](https://claude.ai/artifact/SRnyogrRbpAyu1TkvuuYwz) (now "Courses") — 7 posts, 10 decisions. Category, Duration, Certificate, Format; drop Availability
- [x] [Study Materials](https://claude.ai/artifact/N7f9Lptb9rmvFk1mCaBCDQ) — 7 posts, 8 decisions. Material Type, Level, fix the Condition filter, bundles
- [x] [Schools & Colleges](https://claude.ai/artifact/WaqHJFUPPqpXmD6rKR4G5n) — 7 posts, 9 decisions. Institution Type, Curriculum, Ad Type; move 4 counselling seeds to Services
- [x] [Language Classes](https://claude.ai/artifact/6rcAj3smf5gkpqqs6LsW1v) — 7 posts, 8 decisions. Language per market, Level, Exam Prep, Fee Per

## Rollout order

All 5 subs have seed posts, so each change can be checked against real data.

1. The keep-or-merge call on Education vs Services
2. Category-wide fee fix, Fee Per and `EDUCATION_FORM_FILTERS` scaffold, shipped with the first sub
3. Tutors & Coaching and Language Classes: same shape, and Tutors reuses Services › Tutoring's lists
4. Online Courses
5. Study Materials (its Condition fix is the pattern for the rest of marketplace)
6. Schools & Colleges, with the 4 counselling seeds moving to Services

Each step follows the usual routine: tick decisions in the sub's doc, build, deploy, then run the form sync and the seed backfill.

## Status — 26 Oct 2026

All 5 subcategories are live in IN, GB and SG (commit 04fc963). All 15 forms were synced and the 35 seed posts backfilled the same day. A check on the database and the live site found 0 problems: every form matches the code, every filter returns the right posts, and cards now show "£45 / hr", "/ term", "/ course" or "Free".

- "Online Courses" is now "Courses" (same id, so links and posts are unchanged); the 3 old "Online Courses" forms were deleted
- The 4 IN and SG admissions-counselling seeds moved to Services › Education & Learning, so Schools & Colleges is GB-only for now
- The GB sixth-form open evening moved to 1 July 2027 so it stays listed

Open follow-ups:

- [ ] The IN and SG language classes don't say in person or online, so they don't appear under a Format filter
- [ ] The marketplace-wide Condition filter mismatch (fixed here for Study Materials) is still open in the other marketplace categories
