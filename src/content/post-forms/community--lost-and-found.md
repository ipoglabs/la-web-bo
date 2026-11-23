<!-- source: https://claude.ai/artifact/CnVKYTQbBtAryGSQJqW8C5 -->
# Community › Lost & Found — Post Form Review

Oct 26, 2026

Lost & Found asks lost or found, a date and a place. It never asks what the item is, which is the one thing the search sidebar filters on.

## Current fields

The form is the same in IN, GB and SG.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Title | `name` | text | Yes |  |
| 2 | Description | `description` | richtext | Yes |  |
| 3 | Good To Know | `goodToKnow` | goodToKnow | No |  |
| 4 | Report Type | `reportType` | select | Yes | Lost, Found |
| 5 | Date | `lfDate` | date | Yes |  |
| 6 | Last Seen Location | `lastSeenLocation` | text | Yes |  |

7 seed posts (IN 2, GB 3, SG 2). None has a report type, date or place saved; it is all in the title and description. The GB lost wallet has its £50 reward saved as a price, so the card shows "£50". The other six show "£0", "₹0" or "S$0". Two seeds, the IN and SG "Found Golden Retriever" ads, are pets.

The sidebar has 2 filters: Status (Lost, Found) and Item Category (Pet, Documents, Electronics, Keys, Bag, Jewellery, Clothing, Vehicle, Other). Neither does anything today, and the form has no Item Category.

## Field type changes

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Last Seen Location | Label "Last Seen Location" | Label "Location", hint "Where it was lost or found" | A found ad isn't "last seen"; the form can't change a label by report type |
| Price | Saved on seeds as `salePrice` | No price at all; Reward instead (below) | Nothing here is for sale |

## New fields to add

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Item Category | select | Documents, Electronics, Keys, Bag / Wallet, Jewellery, Clothing, Vehicle / Bike, Other | All | Yes | Matches the Item Category filter |
| Reward | currency |  | All | No, Lost only | GB wallet seed offers one; shows on the card as Pets › Lost & Found does |

Pet is left out of Item Category on purpose: Pets › Lost & Found has species, breed and microchip fields. A hint under Item Category would point pet owners there.

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [ ] Add Item Category, matched to the filter
- [ ] Leave Pet out and point pet ads to Pets › Lost & Found (filter drops Pet too)
- [ ] Move the IN and SG "Found Golden Retriever" seeds to Pets › Lost & Found
- [ ] Add Reward, shown for Lost only
- [ ] Card shows "Reward £X", or "Lost" / "Found" when there is none
- [ ] Rename Last Seen Location to Location
- [ ] Wire the Status and Item Category filters
- [ ] Backfill the 7 seeds: report type, date, place, item, and the GB £50 as a reward
