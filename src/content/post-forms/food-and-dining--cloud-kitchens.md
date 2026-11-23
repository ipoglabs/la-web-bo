<!-- source: https://claude.ai/artifact/9XC6GpcZijV5FDaxWoRTD3 -->
# Food & Dining › Cloud Kitchens — Post Form Review

Oct 27, 2026

Delivery-only kitchens selling through food apps. Before this review the sub had no filters at all, and the form never asked which apps a kitchen is on.

## Posts

7 live: the UK has 3 (Smash Burger Co, Tonkotsu Ramen Lab, Vegan Vibes Kitchen), India has 2 FlavorFast dishes (biryani ₹280, mixed grill ₹350), Singapore has Katong laksa and a satay platter.

## Form changes

| Field | Before | After |
| --- | --- | --- |
| Order On | — | Required, each market's apps: Swiggy, Zomato / Deliveroo, Uber Eats, Just Eat / GrabFood, foodpanda, Deliveroo, plus Order Direct |
| Delivery Area | — | Text |
| Cuisine, Dietary | Free text, labels | Pick-lists matching the filters |
| Kitchen | Provider name | Brand Name (required), licence, UK hygiene rating, Opening Hours |
| Price | `price` | "Dishes From" (`salePrice`) + Price Per: starting from / dish / meal |

## Filters

Cuisine, Dietary and Order On, all new and connected.

## Checklist

- [x] Add Order On (required) with a filter, per market.
- [x] Cuisine and Dietary filters.
- [x] Price "from", per dish or per meal.
- [x] Backfill the 7 seeds.
