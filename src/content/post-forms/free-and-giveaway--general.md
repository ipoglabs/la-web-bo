<!-- source: https://claude.ai/artifact/XYFTnz7hgvahcnMdgTGcCZ -->
# Free & Giveaway › General — Post Form Review

Oct 26, 2026

Everything else: moving boxes, garden soil, household bits, old books. Today the form makes Condition required, which doesn't fit soil or used boxes. The Category filter repeats subcategories that already exist (Furniture, Clothing, Electronics).

## Current fields

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2,000 characters |
| 3 | Good to Know | goodToKnow | goodToKnow | No |  |
| 4 | Condition | condition | select | Yes | Brand New / Like New / Lightly Used / Well Used / Heavily Used |
| 5 | Pickup Availability | availability | text | No | Placeholder "e.g. Weekday evenings" |

**Posts:** 8 live. India has 2 (a household box lot and 15 moving boxes), the UK has 4 (25 moving boxes "by Friday", garden soil and compost, a 1975 encyclopaedia set, and the same soil ad again: comm-gen-01, moved over from Community), and Singapore has copies of the 2 India ads. Only comm-gen-01 has anything filled (Pickup Availability). None has Condition.

**Filters:** Category (Furniture, Clothing, Electronics, Books / Media, Tools, Garden, Other) and Condition (Any, Good, Fair, Worn). Neither is connected to the database. The form doesn't ask Category, and the Condition values don't match.

## Field type changes

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Condition | Required | Optional | Soil, compost and used boxes don't have a condition. |
| Condition filter | Any / Good / Fair / Worn | The form's 5 steps: Brand New … Heavily Used | The filter can never match what sellers pick today. |
| Category filter | Furniture / Clothing / Electronics / Books / Tools / Garden / Other | Drops Furniture, Clothing and Electronics (they have their own subcategories). Adds Household & Kitchen, Moving & Packing, DIY & Building, Hobbies & Crafts. | Matches what's actually posted here: boxes, household bits, soil. |
| Pickup Availability label | "Pickup Availability" everywhere | UK: "Collection Times". India and Singapore: "Pickup Times" | "Collection" is the UK word. |

## New fields to add

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Category | select | Household & Kitchen / Moving & Packing / Books & Media / Tools / Garden / DIY & Building / Hobbies & Crafts / Other | All | Yes | Lets the Category filter work. |
| Amount | text | e.g. 25 boxes, 10 bags | All | No | Every ad here is a quantity of something. |
| Must Go By | date |  | All | No | "Collection by Friday" today only shows in the title. The ad is hidden once the date passes. |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [ ] Add Category (required) and connect the Category filter, with the new options.
- [ ] Make Condition optional.
- [ ] Use the form's 5-step Condition scale in the filter and connect it.
- [ ] Add Amount.
- [ ] Add Must Go By and hide the ad once it passes.
- [ ] Relabel Pickup Availability (UK "Collection Times", India and Singapore "Pickup Times").
- [ ] Delete the duplicate soil ad (comm-gen-01) and keep free-gen-02.
- [ ] Show "Free" on cards instead of "£0" (category-wide).
- [ ] Backfill Category, Amount and pickup times for the seed posts.
