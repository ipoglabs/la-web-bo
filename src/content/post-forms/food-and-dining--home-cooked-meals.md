<!-- source: https://claude.ai/artifact/NCUieLAcs4GELtwRzrCfRH -->
# Food & Dining › Home Cooked Meals — Post Form Review

Oct 27, 2026

Home cooks selling meals for collection or local delivery. Buyers filter by cuisine and veg / non-veg first. Before this review, cuisine was free text and dietary was saved as labels, so neither filter could match.

## Posts

7 live: the UK has 3 (Ghanaian, South Indian, Polish, £7–£8 a meal), India has 2 from Lakshmi's Home Kitchen (South Indian thali ₹150, North Indian meal ₹180), Singapore has a Peranakan set and a copy of India's North Indian meal.

## Form changes

| Field | Before | After |
| --- | --- | --- |
| Cuisine | Free text | Required pick-list, several allowed, in each market's words |
| Dietary | Labels ("Vegetarian") | Required, filter values; Jain and Eggless in India |
| Meals | — | Breakfast / Lunch / Dinner / Snacks |
| Allergens | — | The 14 UK allergens |
| Kitchen | Provider name | Kitchen Name (required), licence / registration, UK hygiene rating, Order Notice, Days & Times |
| Delivery | Yes / No | Collection / Delivery (required) |
| Price | Saved as `price` | `salePrice` + Price Per: meal / plate / order / starting from |

## Filters

Cuisine, Dietary, Meals (new) and Delivery (new), all connected.

## Checklist

- [x] Cuisine as each market's pick-list; connect the Cuisine filter.
- [x] Dietary with the filter's values; connect the Dietary filter.
- [x] Add Meals and Delivery filters.
- [x] Add allergens, licence, hygiene rating (UK) and order notice.
- [x] Save the price as `salePrice` with Price Per.
- [x] Backfill the 7 seeds; give the Singapore copy a local detail.
