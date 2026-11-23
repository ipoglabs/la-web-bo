<!-- source: https://claude.ai/artifact/23fthJrzd3yn5Tm5pSzNr5 -->
# Community › Announcement — Post Form Review

Oct 26, 2026

Announcement asks only a title and a description. The sidebar filters on type, who it is from and urgency, and old notices never leave the list.

## Current fields

The form is the same in IN, GB and SG.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Title | `name` | text | Yes |  |
| 2 | Description | `description` | richtext | Yes |  |
| 3 | Good To Know | `goodToKnow` | goodToKnow | No |  |

7 seed posts (IN 2, GB 3, SG 2): water cuts, a road closure, a planning notice, recycling centre hours and two residents' AGMs. All show "£0" or "₹0"; the mocks say "Notice" or "FREE". The GB mocks list dates, a reason, a reference and a comment deadline; none of it is saved. The three GB notices are dated July, so they are already stale.

The sidebar has 3 filters: Type (Community, Government, Emergency, Road Closure, Infrastructure, Event, General), From (Member, Local Authority, NGO, Business) and Urgency (Normal, Urgent, Critical). None does anything today.

From and Urgency are self-declared. Anyone can post as "Local Authority" or mark a notice Critical, which matters most for Emergency notices.

## Field type changes

None; the form has no fields beyond the basics.

## New fields to add

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Announcement Type | select | Community, Government, Emergency, Road Closure, Infrastructure, Event, General | All | Yes | Matches the Type filter |
| Posted By | select | Resident, On behalf of a council or authority, Charity / NGO, Business | All | Yes | Matches the From filter; "on behalf of" doesn't claim to be the council |
| Urgency | select | Normal, Urgent, Critical | All | No, defaults to Normal | Matches the filter; saved in the existing `urgency` field |
| From Date | date |  | All | No | When a closure or cut starts |
| Until Date | date |  | All | No | Lets notices drop out once over |
| Reference | text | e.g. planning ref 26/01234 | All | No | Planning and council notices always carry one |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [ ] Add Announcement Type, matched to the filter
- [ ] Add Posted By with "On behalf of" wording; filter labels follow it
- [ ] Add Urgency
- [ ] Only allow Critical for Emergency notices
- [ ] Add From Date and Until Date, and hide notices once Until Date has passed
- [ ] Add Reference
- [ ] Card shows "Notice" instead of a zero price
- [ ] Wire all 3 filters
- [ ] Backfill the 7 seeds, with the GB dates moved forward
