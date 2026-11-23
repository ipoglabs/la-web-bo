<!-- source: https://claude.ai/artifact/6TwEHT4ExoWcZ9L8hDhcUC -->
# Community › Volunteering & Charity — Post Form Review

Oct 26, 2026

Volunteering asks one free-text Availability field. The sidebar filters on cause, commitment, skills and format, none of which the form asks.

## Current fields

The form is the same in IN, GB and SG.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Title | `name` | text | Yes |  |
| 2 | Description | `description` | richtext | Yes |  |
| 3 | Good To Know | `goodToKnow` | goodToKnow | No |  |
| 4 | Availability | `availability` | text | No | e.g. Weekends |

7 seed posts (IN 2, GB 3, SG 2): food bank shifts, litter picks, tutoring and digital help for seniors. All show "£0" or "₹0" on the card; the mocks say "Volunteer opportunity". The GB mocks list DBS checks, training, minimum age and sign-up; none of it is saved.

The sidebar has 4 filters: Cause (Environment, Animal Welfare, Education, Healthcare, Elderly Care, Children, Disaster Relief, Poverty, Other), Commitment (Any, One-off, Recurring), Skills Needed (None, Teaching, Tech, Medical, Cooking, Driving, Admin) and Format (Any, In Person, Online). None does anything today.

## Field type changes

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Availability | text, "e.g. Weekends" | Keep, hint "When volunteers are needed, e.g. Saturdays 9–12" | Says what is needed, not when the poster is free |
| Price | Seeds saved with `salePrice` 0 | No price; card shows "Volunteer" | Nothing here is paid |

## New fields to add

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Cause | select | Environment, Animal Welfare, Education, Healthcare, Elderly Care, Children, Disaster Relief, Poverty, Other | All | Yes | Matches the Cause filter |
| Commitment | select | One-off, Recurring | All | Yes | Matches the Commitment filter |
| Skills Needed | multiselect | Teaching, Tech, Medical, Cooking, Driving, Admin | All | No | Matches the filter; blank means none needed |
| Format | select | In Person, Online | All | Yes | Matches the Format filter |
| Minimum Age | number |  | All | No | Every GB mock gives one |
| Background Check | select | Not needed, Provided, Must have one | All | No | GB: DBS; IN: police verification; SG: none common |
| Training Provided | select | Yes, No | All | No | Two GB mocks mention it |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [ ] Add Cause, matched to the filter
- [ ] Add Commitment, matched to the filter
- [ ] Add Skills Needed (multi); filter "None" finds posts with none ticked
- [ ] Add Format, matched to the filter
- [ ] Add Minimum Age
- [ ] Add Background Check (labelled "DBS Check" in GB)
- [ ] Add Training Provided
- [ ] Card shows "Volunteer" instead of a zero price
- [ ] Wire all 4 filters
- [ ] Backfill the 7 seeds from the mocks
