<!-- source: https://claude.ai/artifact/U37eeMA3jtFQsPeZfiGTjy -->
# Business › Business Events — Post Form Review

Oct 26, 2026

The form is the same in IN, GB and SG and has no posts yet. The biggest gaps: no event type or mode, so neither filter works; Venue is required even for a webinar; and a multi-day trade show can give only one date.

## Current fields

The form has 7 fields today. 4 are required: Adv Title, Adv Details, Event Date and Venue.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2000 characters |
| 3 | Good To Know | goodToKnow | goodToKnow | No | Seller's own label / value points |
| 4 | Event Date | startDate | date | Yes | Half width |
| 5 | Venue | venue | text | Yes | Half width |
| 6 | Entry Fee | price | currency | No | Min 0, half width |
| 7 | Website | website | text | No | Placeholder "https://", half width |

There are no posts and no mock listings.

The search offers Event Type (Networking, Conference, Trade Show, Workshop, Webinar) and Mode (In-person, Online, Hybrid). Neither works, and the form asks neither.

## Field type changes

4 existing fields should change. The most important: Entry Fee saves to the field search reads, so the price filter works.

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Entry Fee | saved as `price` | Save as `salePrice`; 0 shows as "Free" | The price filter searches `salePrice`; many networking events are free |
| Event Date | one date | Start Date (required) + optional End Date | Trade shows and conferences run several days |
| Venue | required | Required only when Mode is In-person or Hybrid | A webinar has no venue |
| Website | labelled Website | Rename Registration Link | Attendees need where to book |

## New fields to add

Business Events can add 5 fields with no new field types.

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Event Type | select | Networking, Conference, Trade Show, Workshop, Webinar, Other | All | Yes | Backs the Event Type filter |
| Mode | select | In-person, Online, Hybrid | All | Yes | Backs the Mode filter |
| Start Time | text | e.g. "6:30 pm" | All | No | A date alone isn't enough to attend |
| Capacity | number | 1–10,000 | All | No | Signals size and scarcity |
| Organised By | select | Organiser, Venue, Community group, Company | All | No | Shows who runs it |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [ ] Save Entry Fee as `salePrice`; 0 shows as Free
- [ ] Split Event Date into Start Date (required) and End Date
- [ ] Venue required only for In-person and Hybrid
- [ ] Rename Website to Registration Link
- [ ] Add Event Type (required) and wire the Event Type filter
- [ ] Add Mode (required) and wire the Mode filter
- [ ] Add Start Time
- [ ] Add Capacity
- [ ] Add Organised By
- [ ] Hide event ads from search once End Date (or Start Date) has passed

## Built — 26 Oct 2026

All 10 items are built in IN, GB and SG (commit 316fe67). Ended events drop out of the Business Events search; they still count on the Business category page. There are no posts yet, so the filters are checked only by query.
