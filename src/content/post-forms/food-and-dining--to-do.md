<!-- source: https://claude.ai/artifact/H5sUQFEkydHStSQLn4aVUQ -->
# Food & Dining — Post Form Review To-do

Oct 27, 2026

Food & Dining has 6 subcategories and 42 live posts, 7 in each sub. The UK has 18, India 12, Singapore 12, and 9 of Singapore's are near copies of India's. Five subs share one service form, and Restaurant Deals uses a slight variant of it: free-text Cuisine, Dietary Options saved as labels, Delivery yes/no and a price saved as `price`. None of the 7 search filters is connected to the database. This review gives each sub its own fields, connects every filter, and adds what food buyers check first: the kitchen's licence or registration, allergens, and collection or delivery.

## Status — 27 Oct 2026

All 6 subcategories are built and pushed (commit `35b759f`). The 18 live forms (6 × India, UK, Singapore) still need syncing, and the 42 seed ads backfilling.

- [x] Code: forms, filters, Price Per on cards (adds per kg, per box, per dozen), Restaurant Deals cards show the deal.
- [x] Checked in code: all 470 filter options are form options in every market, with each market's own cuisines, dietary options and delivery apps.
- [x] Backfill dry run: all 42 seed ads found, every value is a form option, and all 9 Singapore text changes apply.
- [x] Sync the 18 forms.
- [x] Run the backfill.
- [x] Check every filter option on the database and the live site.
- [x] Verified 27 Oct: all 18 forms match the code, and all 470 filter options give the same ads on the database and the live site (123 of them with ads).

## Category-wide issues

These affect every Food & Dining subcategory. Each one is also in each subcategory's checklist.

| Issue | Before | Fix (built) |
| --- | --- | --- |
| Search filters did nothing | 7 filters across 5 subs, none connected to the database; Cloud Kitchens had none. | 22 filters across all 6 subs, each reading the field the form saves. |
| Cuisine was free text | Typed "Indian", "south indian", "Biryani"…, so the Cuisine filter couldn't match. | Cuisine is a pick-list in each market's words (North Indian / South Indian / Mughlai in India; British, African & Caribbean in the UK; Peranakan, Malay in Singapore). |
| Dietary saved as labels | "Vegetarian", "Non-Vegetarian"; the filter searched `veg`, `nonveg`. | Same values as the filter. Jain and Eggless only where buyers use them. |
| Price filter missed new ads | The form saved `price`; the price filter reads `salePrice`. | Saved as `salePrice`. |
| Prices without a unit | A ₹3,000 tiffin and a £35 caterer showed no "/ month" or "/ person". | New Price Per on every sub; cards show "₹3,000 / mo", "£35 / person", "₹1,500 / kg". |
| Filters never asked | Event Type, Tiffin Plan and Bake Type were filters the form never asked. | All asked, required where they are the main choice. |
| No food safety info | Nothing on licence, allergens or hygiene. | Licence / registration in every market (FSSAI, council, SFA), the UK Food Hygiene Rating, the 14 allergens. |
| Delivery yes/no | Couldn't say collection only, and no filter. | Collection / Delivery, with a Delivery filter. |
| Seed posts were bare | None of the 42 had cuisine, dietary or price unit; 9 Singapore ads were near copies of India's. | Backfilled from each ad's text; the Singapore copies get a local detail. |

## To-do by subcategory

- [x] [Home Cooked Meals](https://claude.ai/artifact/NCUieLAcs4GELtwRzrCfRH) — 7 posts. Cuisine and Dietary pick-lists, Meals, Collection / Delivery.
- [x] [Catering Services](https://claude.ai/artifact/M3EhuxF62J9o4tqUPBHSif) — 7 posts. Events, Service Style, guests, price per person or on request.
- [x] [Tiffin Services](https://claude.ai/artifact/BBHA57wjqgYxyUgv1QuoEk) — 7 posts. Plans, Meals, delivery days and area, price per month.
- [x] [Restaurant Deals](https://claude.ai/artifact/QJJsnVAqdrxxaYYTgaSv2W) — 7 posts. Deal Type and % off like Special Offers, Valid Until required.
- [x] [Cloud Kitchens](https://claude.ai/artifact/9XC6GpcZijV5FDaxWoRTD3) — 7 posts. Order On (Swiggy, Deliveroo, GrabFood…), first filters for this sub.
- [x] [Baked Goods & Desserts](https://claude.ai/artifact/XpnLqASyq6JUTgdbKrUMtf) — 7 posts. Type, Custom Orders, price per kg / box / dozen.

## Competitor check (OLX, Gumtree, Carousell)

Checked 2026-10-27.

| Site | What it asks for food |
| --- | --- |
| OLX India | No food category. Tiffin and catering ads sit in Services › Other with no food fields. |
| Gumtree UK | Services › Food & Drink: Takeaways, Restaurants, Bakery, Cafes, Other. The only filter is location; ads are service tags (Commercial Catering, Catering Van Hire) and "Request a quote". |
| Carousell SG | Couldn't be checked directly (Cloudflare bot check). It has a Food & Drinks category for home bakes and local eats; from other sources, listings ask for title, price, description and deal method only. |

**Takeaway.** None of the three asks anything food-specific, so food safety, dietary and allergens are where we can lead. The fields buyers check first, and what regulators expect, were all missing. Food delivery apps (Swiggy, Zomato, Deliveroo, GrabFood) are the better comparison: they show cuisine, veg / non-veg, a licence number (FSSAI in India) and the UK hygiene rating.

### Recommended, built into this rework

- [x] **Food licence / registration** in every market: FSSAI No. (India, required by law to sell food), council registration (UK), SFA licence (Singapore, home businesses exempt).
- [x] **Food Hygiene Rating** 0–5 (UK only); UK buyers look for it first.
- [x] **Contains Allergens**: the 14 allergens UK law requires sellers to declare.
- [x] **Collection / Delivery**, with a Delivery filter, replacing Delivery yes/no.
- [x] **Order On** for cloud kitchens (Swiggy, Zomato / Deliveroo, Uber Eats, Just Eat / GrabFood, foodpanda), with a filter.
- [x] **Guests From / Up To**, **Service Style** and **Service Staff Included** for caterers, plus "Price on request".
- [x] **Order Notice** (e.g. "order by 6pm for next day") for home cooks and bakers.
- [x] **Custom Orders** for bakers, with a filter, and "Per kg" pricing (how cakes sell in India).
- [x] **Eggless** and **Jain** dietary options in India, Eggless in Singapore.

### Not recommended

- **Calories / macros.** Only meal-prep sellers use them, and they fit in the description.
- **Full ingredients list.** Too long for a form field; allergens cover the safety part.
- **Hygiene rating filter.** Most UK home cooks are awaiting inspection, so the filter would hide nearly every ad.
