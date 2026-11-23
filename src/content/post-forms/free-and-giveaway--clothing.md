<!-- source: https://claude.ai/artifact/2UXdU7fV1bfekxsNGNTJeR -->
# Free & Giveaway › Clothing — Post Form Review

Oct 26, 2026

Free clothes, mostly bundles. The search filter asks who the clothes are for, but the form never asks, and it doesn't ask for a size either. Every ad has to put both in the title.

## Current fields

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2,000 characters |
| 3 | Good to Know | goodToKnow | goodToKnow | No |  |
| 4 | Condition | condition | select | Yes | Brand New / Like New / Lightly Used / Well Used / Heavily Used |
| 5 | Pickup Availability | availability | text | No | Placeholder "e.g. Weekday evenings" |

**Posts:** 7 live. India has 2 (4 winter jackets and 6 sarees), the UK has 3 (a men's bundle in M/L, a kids' bundle for ages 2–4, and women's workwear in size 14), and Singapore has 2 (jackets and traditional dresses, copied from India). None of them has Condition or Pickup Availability filled. All 7 are bundles, not single items.

**Filters:** For (Men, Women, Kids) and Condition (Any, Good, Fair, Worn). Neither is connected to the database. The form doesn't ask who the clothes are for, and the Condition values don't match.

## Field type changes

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Condition filter | Any / Good / Fair / Worn | The form's 5 steps: Brand New … Heavily Used | The filter can never match what sellers pick today. |
| For filter | Men / Women / Kids | Adds Unisex | Bundles are often mixed. |
| Pickup Availability label | "Pickup Availability" everywhere | UK: "Collection Times". India and Singapore: "Pickup Times" | "Collection" is the UK word. |

## New fields to add

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| For | select | Men / Women / Kids / Unisex | All | Yes | Lets the For filter work. |
| Clothing Type | select | Tops / Bottoms / Dresses / Outerwear / Shoes / Traditional Wear / Mixed Bundle | All | No | India and Singapore have traditional wear (sarees). The UK label is "Occasion Wear" instead. |
| Size | text | e.g. M/L, UK 14, Age 2–4 | All | No | Every UK ad puts the size in its title today. |
| Single or Bundle | select | Single item / Bundle | All | No | Takers want to know if they must take the whole lot. |
| Must Go By | date |  | All | No | The ad is hidden once the date passes. |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [ ] Add For (required) and connect the For filter, with Unisex added.
- [ ] Use the form's 5-step Condition scale in the filter and connect it.
- [ ] Add Clothing Type, with a matching filter.
- [ ] Add Size.
- [ ] Add Single or Bundle.
- [ ] Add Must Go By and hide the ad once it passes.
- [ ] Relabel Pickup Availability (UK "Collection Times", India and Singapore "Pickup Times").
- [ ] Show "Free" on cards instead of "£0" (category-wide).
- [ ] Backfill For, Size, Condition and pickup times for the 7 seed posts.
