<!-- source: https://claude.ai/artifact/HHkxAyqTJpfjY1caKMVEBe -->
# Services › Wanted — Post Form Review

Oct 22, 2026

The Services Wanted form is the same in IN, GB and SG. The biggest gaps: it doesn't ask which kind of service is wanted, so the Looking For filter can't work, and the price filter ignores Budget.

## Current fields

The Wanted form has 6 fields today. 3 are required: Adv Title, Adv Details and Service Needed.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2000 characters |
| 3 | Good To Know | goodToKnow | goodToKnow | No | Seller's own label / value points |
| 4 | Service Needed | serviceType | text | Yes | Max 200 characters |
| 5 | Budget | budgetAmount | currency | No | Min 0, half width |
| 6 | Urgency | urgency | select | No | Immediate, Within a Week, Flexible |

There are 7 Wanted posts (IN 2, GB 3, SG 2), all seed samples with only a title and a price. None has a value for any detail field above.

The search offers Looking For and How filters. Neither works today: the form has no service category, and How isn't asked. The price filter searches `salePrice`, but Budget saves `budgetAmount`. Looking For also misses Creative Services.

## Field type changes

3 existing fields should change. The most important: the price filter reads Budget.

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Budget | saved as `budgetAmount`, which no search reads | Keep the key; point the price filter at `budgetAmount` (as Vehicles › Wanted uses `maxBudget`) | A budget search finds no Wanted ad today |
| Service Needed | required free text | Keep, renamed "What do you need?", optional once Looking For is added | Looking For carries the category; this adds the detail |
| Urgency | Immediate, Within a Week, Flexible | Needed By: date + Immediately chip | Providers can plan around a date; "Within a Week" goes stale |

## New fields to add

Wanted can add 3 fields with no new field types.

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Looking For | select | Home Services, Business Services, Health & Fitness, Tutoring, Education & Learning, Travel & Tourism, Food & Dining, Technology & Gadgets, Creative Services, Other | All | Yes | The Looking For search filter has nothing to match today |
| Budget Per | select | Per hour, Per visit, Total | All | No | A budget alone doesn't say what it covers |
| Service Mode | multiselect | At provider's place, Home visit, Online | All | No | The How search filter has nothing to match today |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [x] Point the price filter at Budget (`budgetAmount`)
- [x] Service Needed → "What do you need?" (optional)
- [x] Urgency → Needed By date with Immediately
- [x] Add Looking For (required) and add Creative Services to the filter
- [x] Add Budget Per
- [x] Add Service Mode
- [x] Wire the Looking For and How filters (search only)
- [x] Backfill details on the 7 seed posts so the new filters have something to match

## Built — 22 Oct 2026

All 8 ticked items are live in IN, GB and SG (commit 74d37e8). Where the build differs from the suggestion:

- Listings show the budget with "/ hr" or "/ visit" from Budget Per; Total shows the amount alone.
- The Looking For search filter gained Creative.
- Existing posts: the seed posts had their budget saved as a price, so the backfill copied it into Budget, which the price filter now reads. All 7 got Looking For, Service Mode and Budget Per; the two plumbers and the landscaper got Needed By: Immediately. The bridal makeup post's wedding date has passed, so it has no Needed By.
