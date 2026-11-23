<!-- source: https://claude.ai/artifact/BtFE61GGbQLwMNG4PEbyAv -->
# Free & Giveaway › Food — Post Form Review

Oct 26, 2026

Surplus food: homemade meals, bread, garden produce, tins. Food is the only Free form that asks for a date (Best Before), but nothing uses that date. Ads stay up after the food has gone off, and the form doesn't ask what type of food it is or which diets it suits, which the filters search on.

## Current fields

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2,000 characters |
| 3 | Good to Know | goodToKnow | goodToKnow | No |  |
| 4 | Best Before | deadline | date | Yes |  |
| 5 | Pickup Availability | availability | text | No | Placeholder "e.g. Weekday evenings" |

**Posts:** 7 live. India has 2 (vegetarian homemade meals "today only" and fresh bread), the UK has 3 (an OLIO food share with tins, bread and veg; courgettes and tomatoes left at a front gate; eggs, kale and chard from an allotment), and Singapore has 2 (halal meals and bread, copied from India). None of them has a Best Before date, even though the form requires one. The diet (vegetarian, halal) only shows up in the text.

**Filters:** Type (Fresh Produce, Packaged, Cooked Meal, Baked Goods, Other) and Dietary (Vegetarian, Vegan, Halal, Gluten-Free). Neither is connected to the database, and the form asks neither.

## Field type changes

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Best Before | Required date, used for nothing | Same field, with the hint "For cooked food, the day it must be eaten by". The ad is hidden the day after the date. | Stops expired food from showing in search. |
| Dietary filter | Vegetarian / Vegan / Halal / Gluten-Free | India adds Jain and Eggless | Common asks in India. |
| Pickup Availability label | "Pickup Availability" everywhere | UK: "Collection Times". India and Singapore: "Pickup Times" | "Collection" is the UK word. |

## New fields to add

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Food Type | select | Fresh Produce / Packaged / Cooked Meal / Baked Goods / Other | All | Yes | Lets the Type filter work. Has the hint "Homemade food: say when it was made. Never give away food past its Use By date." |
| Dietary | multiselect | Vegetarian / Vegan / Halal / Gluten-Free (+ Jain / Eggless in India) | All | No | Lets the Dietary filter work. |
| Allergens | text | e.g. Contains nuts, dairy, eggs | All | No | Basic safety for homemade food. |
| Amount | text | e.g. 12 eggs, 3 portions | All | No | Every ad states it in the text today. |
| Collection Method | select | Arrange a time / Left out, help yourself | All | No | The courgettes ad is "take what you like from the front gate": no need to message first. |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [ ] Add Food Type (required, with the safety hint) and connect the Type filter.
- [ ] Add Dietary (with Jain and Eggless in India) and connect the Dietary filter.
- [ ] Hide Food ads the day after Best Before, and add the cooked-food hint.
- [ ] Add Allergens.
- [ ] Add Amount.
- [ ] Add Collection Method.
- [ ] Relabel Pickup Availability (UK "Collection Times", India and Singapore "Pickup Times").
- [ ] Show "Free" on cards instead of "£0" (category-wide).
- [ ] Backfill Food Type, Dietary, Best Before and pickup times for the 7 seed posts. Best Before goes a few weeks ahead so the seeds stay visible.
