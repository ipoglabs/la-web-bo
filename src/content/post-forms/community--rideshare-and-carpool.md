<!-- source: https://claude.ai/artifact/K2kWMCxBstSoeBApMzUC6M -->
# Community › Rideshare & Carpool — Post Form Review

Oct 26, 2026

Rideshare is the best-fitted Community form: it already asks offering or seeking, from, to, seats and cost. It lacks only the route type the sidebar filters on, and none of the filters is wired.

## Current fields

The form is the same in IN, GB and SG.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Title | `name` | text | Yes |  |
| 2 | Description | `description` | richtext | Yes |  |
| 3 | Good To Know | `goodToKnow` | goodToKnow | No |  |
| 4 | I am | `rideType` | select | Yes | Offering a ride, Looking for a ride; saved in attributes |
| 5 | From | `fromLocation` | text | Yes | Saved in attributes |
| 6 | To | `toLocation` | text | Yes | Saved in attributes |
| 7 | Date | `startDate` | date | No |  |
| 8 | Seats | `seatsAvailable` | number | No | Min 1; saved in attributes |
| 9 | Cost per Seat | `price` | currency | No | Min 0 |

No posts yet. Two seeds belong here: the IN "Office Carpool Group — Adyar to OMR" and SG "Toa Payoh to Raffles Place" ads, both filed under General / Others.

The sidebar has 3 filters: Route Type (Daily Commute, One-way, Weekend Trip, Outstation), Seats (1, 2, 3, 4+) and Offering / Seeking. The last two match form fields already; Route Type has none.

In all three markets, charging more than a share of fuel and tolls can make a driver a taxi without a licence. The form says nothing about it.

## Field type changes

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Cost per Seat | Saved as `price` | Saved as `salePrice`, hint "Share of fuel and tolls only" | Turns the price filter on; keeps it cost-sharing |
| Seats | "Seats" for both | Hint: seats free when offering, seats needed when looking | One field, two meanings |
| Date | One date | Required for One-way and Weekend Trip only | A daily commute has no single date |

## New fields to add

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Route Type | select | Daily Commute, One-way, Weekend Trip, Outstation (IN) / Long Distance (GB, SG) | All | Yes | Matches the Route Type filter |
| Days | multiselect | Mon–Sun | All | No, Daily Commute only | Commuters match on days |
| Departure Time | text | e.g. 8:15 am | All | No | Every carpool ad gives one |
| Return Trip | select | Yes, No | All | No | Commutes usually run both ways |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [ ] Add Route Type, matched to the filter (Outstation shown as Long Distance in GB and SG)
- [ ] Add Days, shown for Daily Commute
- [ ] Add Departure Time and Return Trip
- [ ] Date required only for One-way and Weekend Trip
- [ ] Save Cost per Seat as `salePrice`, turn the price filter on, add the cost-sharing hint
- [ ] Card shows "£X / seat", or "Free ride" when 0
- [ ] Wire all 3 filters
- [ ] Move the IN and SG carpool seeds here from General / Others and fill their route
