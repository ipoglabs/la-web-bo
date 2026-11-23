<!-- source: https://claude.ai/artifact/BBHA57wjqgYxyUgv1QuoEk -->
# Food & Dining › Tiffin Services — Post Form Review

Oct 27, 2026

Daily meal subscriptions delivered to home or office. Buyers filter by veg / non-veg and plan length. Before this review the form never asked the plan, though Plan was a filter, and a ₹3,000 monthly plan showed as "₹3,000".

## Posts

7 live: the UK has 3 (East London dal-roti tiffin £6, macro meal prep £9, Afro-Caribbean lunches £9), India has 2 Annapurna plans (office tiffin ₹3,000 / month, low-calorie ₹3,800), and Singapore near copies of both.

## Form changes

| Field | Before | After |
| --- | --- | --- |
| Plans | — | Required: Trial / One-off, Daily, Weekly, Monthly |
| Meals | — | Breakfast / Lunch / Dinner |
| Delivery | Yes / No | Delivery Days, Delivery Area, Collection / Delivery |
| Cuisine, Dietary | Free text, labels | Pick-lists matching the filters; Dietary required |
| Kitchen | Provider name | Kitchen Name, licence, UK hygiene rating |
| Price | `price` | `salePrice` + Price Per: meal / day / week / month |

## Filters

Dietary, Plan (One-off is now Trial / One-off), Meals and Cuisine (new), all connected.

## Checklist

- [x] Ask Plans (required) and connect the Plan filter.
- [x] Dietary required with the filter's values.
- [x] Add Meals, Delivery Days and Area.
- [x] Price per meal / day / week / month.
- [x] Backfill the 7 seeds; give the 2 Singapore copies a local detail.
