<!-- source: https://claude.ai/artifact/7mAeNfcRKpMJa22dSjbsU1 -->
# Free & Giveaway › Electronics — Post Form Review

Oct 26, 2026

Free electronics: old TVs, computers, printers. For a free gadget the big question is whether it still works, and today the form doesn't ask.

## Current fields

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2,000 characters |
| 3 | Good to Know | goodToKnow | goodToKnow | No |  |
| 4 | Condition | condition | select | Yes | Brand New / Like New / Lightly Used / Well Used / Heavily Used |
| 5 | Pickup Availability | availability | text | No | Placeholder "e.g. Weekday evenings" |

**Posts:** 7 live. India has 2 (a working CRT TV and an old desktop for parts), the UK has 3 (a working Sony CRT TV, a Dell desktop that won't boot, and an Epson printer with no ink), and Singapore has copies of the 2 India ads. None of them has Condition or Pickup Availability filled. 2 of the 7 are "for parts", which only shows up in the title.

**Filters:** Item Type (Phone / Tablet, Laptop / PC, TV / Monitor, Console / Games, Kitchen Gadget, Other) and Condition (Any, Working, For Parts). Neither is connected to the database. The form asks neither, and its Condition scale doesn't include Working or For Parts.

## Field type changes

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Condition | Required | Optional | Whether it works matters more than how it looks. Working Status (below) takes over as the required question. |
| Condition filter | Any / Working / For Parts | Replaced by a Working Status filter | These are working states, not conditions. |
| Item Type filter | Has no printer or audio option; "Kitchen Gadget" | Adds Audio & Speakers and Printers & Accessories. "Kitchen Gadget" becomes "Home & Kitchen Appliance" (it takes over Furniture's Appliance option). | The UK printer has nowhere to go today. |
| Pickup Availability label | "Pickup Availability" everywhere | UK: "Collection Times". India and Singapore: "Pickup Times" | "Collection" is the UK word. |

## New fields to add

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Item Type | select | Phone & Tablet / Laptop & PC / TV & Monitor / Audio & Speakers / Console & Games / Printers & Accessories / Home & Kitchen Appliance / Other | All | Yes | Lets the Item Type filter work. Phones and computers get the hint "Wipe your data and sign out of your accounts first." |
| Working Status | select | Fully working / Partly working / Not working (for parts) | All | Yes | The first thing a taker asks. Gets its own filter. |
| Brand | text | e.g. Sony, Dell | All | No | Every UK ad names the brand. |
| What's Included | text | e.g. Remote, charger, cables | All | No | The UK ads mention remotes and missing inks. |
| Must Go By | date |  | All | No | The ad is hidden once the date passes. |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [ ] Add Item Type (required, with the data-wipe hint) and connect the Item Type filter.
- [ ] Add Working Status (required) and replace the Condition filter with a Working Status filter.
- [ ] Make Condition optional.
- [ ] Add Brand.
- [ ] Add What's Included.
- [ ] Add Must Go By and hide the ad once it passes.
- [ ] Relabel Pickup Availability (UK "Collection Times", India and Singapore "Pickup Times").
- [ ] Show "Free" on cards instead of "£0" (category-wide).
- [ ] Backfill Item Type, Working Status, Brand and pickup times for the 7 seed posts.
