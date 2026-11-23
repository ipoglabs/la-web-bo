<!-- source: https://claude.ai/artifact/CrdojeeFjBhfQTZUiqPKxX -->
# Free & Giveaway › Furniture — Post Form Review

Oct 26, 2026

Free furniture: sofas, beds, tables, shelves. Today the form only asks for Condition, so nobody searching can tell a sofa from a bookshelf, and both search filters do nothing.

## Current fields

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2,000 characters |
| 3 | Good to Know | goodToKnow | goodToKnow | No |  |
| 4 | Condition | condition | select | Yes | Brand New / Like New / Lightly Used / Well Used / Heavily Used |
| 5 | Pickup Availability | availability | text | No | Placeholder "e.g. Weekday evenings" |

**Posts:** 7 live. India has 2 (a dining table and a bookshelf), the UK has 3 (an IKEA KALLAX, a sofa that needs reupholstering, and a coffee table with 2 bedside tables), and Singapore has copies of the 2 India ads. None of them has Condition or Pickup Availability filled. Every card shows "£0" / "₹0" / "S$0".

**Filters:** Item Type (Sofa / Chair, Bed / Mattress, Table / Desk, Wardrobe, Appliance, Other) and Condition (Any, Good, Fair, Worn). Neither is connected to the database, so both return every post. The form never asks for Item Type, and the filter's Condition values don't match the form's.

## Field type changes

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Condition filter | Any / Good / Fair / Worn | The form's 5 steps: Brand New … Heavily Used | The filter can never match what sellers pick today. |
| Item Type filter | Includes Wardrobe and Appliance | Storage (wardrobes, shelves, drawers) replaces Wardrobe. Appliance moves to Electronics. | The bookshelf and the KALLAX have nowhere to go; fridges and washing machines are electronics. |
| Pickup Availability label | "Pickup Availability" everywhere | UK: "Collection Times". India and Singapore: "Pickup Times" | "Collection" is the UK word; the UK ads all say "Collection Hackney" and the like. |

## New fields to add

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Item Type | select | Seating / Bed & Mattress / Table & Desk / Storage / Outdoor & Garden / Other | All | Yes | Lets the Item Type filter work. |
| Dimensions | text | e.g. 200 × 90 cm | All | No | Takers need to know if it fits through their door. |
| Collection Access | text | e.g. 2nd floor, no lift, can help carry | All | No | Heavy furniture: stairs and help decide if someone can take it. |
| Must Go By | date |  | All | No | Many givers are moving out ("Moving abroad"). The ad is hidden once the date passes. |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [ ] Add Item Type (required) and connect the Item Type filter.
- [ ] Use the form's 5-step Condition scale in the filter and connect it.
- [ ] Rename the Item Type filter options (Storage instead of Wardrobe; move Appliance to Electronics).
- [ ] Add Dimensions.
- [ ] Add Collection Access.
- [ ] Add Must Go By and hide the ad once it passes.
- [ ] Relabel Pickup Availability (UK "Collection Times", India and Singapore "Pickup Times").
- [ ] Show "Free" on cards instead of "£0" (category-wide).
- [ ] Backfill Item Type, Condition and pickup times for the 7 seed posts.
