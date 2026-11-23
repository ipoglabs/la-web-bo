<!-- source: https://claude.ai/artifact/7mBcdo6wxtyzr5fxZf6JdZ -->
# Community › Wanted — Post Form Review

Oct 26, 2026

Community › Wanted asks only a title and a description. The sidebar has one filter, Looking For, which shares its id with General / Others' Topic filter but uses different options.

## Current fields

The form is the same in IN, GB and SG.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Title | `name` | text | Yes |  |
| 2 | Description | `description` | richtext | Yes |  |
| 3 | Good To Know | `goodToKnow` | goodToKnow | No |  |

No posts yet in any country.

The sidebar has 1 filter, Looking For (Volunteering, Classes, Event, Other), saved under `gen_category`, the same id General / Others uses for Topic. It does nothing today.

Other Wanted subs (Services, Business, Pets) ask what is wanted, a budget and how soon. This one asks none of them.

## Field type changes

None; the form has no fields beyond the basics.

## New fields to add

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Looking For | select | Volunteers, A Class or Teacher, People for an Event or Group, A Venue or Space, A Lift / Ride, Other | All | Yes | Matches the filter, with options people actually post |
| Budget | currency |  | All | No | Saved as `budgetAmount`, read by the price filter as in Services and Business › Wanted |
| Needed By | select | As soon as possible, Within a week, Within a month, Flexible | All | No | Same urgency list as Business › Wanted |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [ ] Add Looking For, with the new option list in form and filter
- [ ] Give the filter its own id (`looking_for`), so it no longer shares `gen_category`
- [ ] Add Budget, read by the price filter
- [ ] Add Needed By, with a matching filter
- [ ] Card shows the budget, or "Wanted" when there is none
- [ ] Wire the filters
