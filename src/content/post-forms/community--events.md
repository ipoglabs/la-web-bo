<!-- source: https://claude.ai/artifact/5eCUb6ctEvK1EvsE1AqdL3 -->
# Community › Events — Post Form Review

Oct 26, 2026

Events asks a date, a venue and an entry fee. The sidebar filters on event type, cost, format and who it suits, none of which the form asks or the search reads.

## Current fields

The form is the same in IN, GB and SG.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Title | `name` | text | Yes |  |
| 2 | Description | `description` | richtext | Yes |  |
| 3 | Good To Know | `goodToKnow` | goodToKnow | No |  |
| 4 | Event Date | `startDate` | date | Yes |  |
| 5 | Venue | `venue` | text | Yes | Saved in attributes |
| 6 | Entry Fee | `price` | currency | No | Min 0 |

7 seed posts (IN 2, GB 3, SG 2). Fees are right (₹500, £5, S$15, the rest 0) but saved as `salePrice`, while new posts save `price`. The free ones show "£0" instead of "Free entry". No date or venue is saved, so past events never drop out.

The sidebar has 4 filters: Event Type (Music, Sports, Food, Arts, Wellness, Family, Networking, Comedy, Community, Other), Cost (Any, Free, Paid), Format (In Person, Online, Hybrid) and Suitable For (All Ages, Family, Adults, Kids). None does anything today, and there is no price filter.

## Field type changes

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Entry Fee | Saved as `price` | Saved as `salePrice` | Seeds and every other category use it; turns the price filter on |
| Venue | Required always | Required for In Person and Hybrid only | An online event has no venue |

## New fields to add

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Event Type | select | Music, Sports, Food, Arts, Wellness, Family, Networking, Comedy, Community, Other | All | Yes | Matches the Event Type filter |
| Format | select | In Person, Online, Hybrid | All | Yes | Matches the Format filter |
| Start Time | text | e.g. 6 pm | All | No | Every GB mock lists a time |
| End Date | date |  | All | No | Multi-day fairs; lets ended events drop out |
| Suitable For | select | All Ages, Family, Adults Only, Kids | All | No | Matches the Suitable For filter |
| Booking Needed | select | Yes, No | All | No | Two GB mocks say "No booking" |

Cost (Free / Paid) needs no field: it reads Entry Fee, 0 or blank is Free.

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [ ] Save Entry Fee as `salePrice` and turn the price filter on
- [ ] Add Event Type, matched to the filter
- [ ] Add Format; Venue required only when not Online
- [ ] Add Start Time
- [ ] Add End Date, and hide events once they have ended
- [ ] Add Suitable For, matched to the filter
- [ ] Add Booking Needed
- [ ] Cost filter reads Entry Fee; card shows "Free" when it is 0 or blank
- [ ] Wire the Event Type, Format and Suitable For filters
- [ ] Backfill the 7 seeds: date, venue, type, format, age and time from the mocks
