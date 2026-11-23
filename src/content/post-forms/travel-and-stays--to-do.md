<!-- source: https://claude.ai/artifact/DBWbfKqkhBApWznjwACNwa -->
# Travel & Stays — Post Form Review To-do

Oct 27, 2026

Travel & Stays has 6 subcategories and 42 live posts, 7 in each. The UK has 18, India 12 and Singapore 12; 5 of Singapore's are word-for-word copies of India's, and 2 offer nightly lets of Singapore homes, which the law doesn't allow. The stay forms saved the price as `rateNightly`, while every ad and the price filter use `salePrice`, so cards showed "£95" with no "/ night". None of the 8 search filters was connected, and 6 of them asked things the forms never did (property type, lets, star rating, tour type, domestic / international, setting). This review gives each sub its own fields, connects every filter, prices everything with a Price Per, and adds the licences sellers need.

## Status — 27 Oct 2026

All 6 subcategories are built and pushed (commit `da655e2`). The 18 live forms are synced and the 42 seed ads backfilled. Verified: all 18 forms match the code, and all 270 filter options give the same ads on the database and the live site (93 of them with ads).

- [x] Code: forms, filters, Price Per on cards (adds per application).
- [x] Checked in code: all 261 filter options are form options in every market.
- [x] Backfill dry run: all 42 seed ads found, every value is a form option, and all 6 Singapore text changes apply.
- [x] Sync the 18 forms.
- [x] Run the backfill.
- [x] Check every filter option on the database and the live site.

## Category-wide issues

These affect every Travel & Stays subcategory. Each one is also in each subcategory's checklist.

| Issue | Before | Fix (built) |
| --- | --- | --- |
| Search filters did nothing | 8 filters across 6 subs, none connected to the database. | 19 filters, each reading the field the form saves. |
| Filters never asked | Property Type, Lets, Star Rating, Tour Type, Domestic / International and Setting were filters the forms never asked. | All asked, required where they are the main choice. |
| Stay prices in the wrong field | Rentals and hotels saved `rateNightly`; the seeds and the price filter use `salePrice`. | Every sub saves `salePrice`. |
| Prices without a unit | "£95" for a night, "£650" for a week, "£3,499" for a person. | Price Per on every sub; cards show "£95 / night", "£650 / week", "£3,499 / person". |
| Option values didn't match | Travel Services saved Transport / Guide / Tickets; the filter searched Transfer / Car Hire. Accessories had New / Used against a 5-step condition. | One list per sub, the same in the form and the filter. |
| Singapore short lets | 2 Singapore ads let homes by the night; Singapore homes can't be let for under 3 months. | Moved to Bintan and Batam (a ferry ride away); the form says the rule. |
| Licences not asked | Nothing on ATOL (UK packages with flights), STB (Singapore travel agents) or Scottish short-let licences. | Asked on the forms that need them, with a hint. |
| Seed posts were bare | None of the 42 had a type or price unit; 5 Singapore ads were word-for-word copies of India's. | Backfilled from each ad's text; the Singapore copies get a local detail. |

## To-do by subcategory

- [x] [Holiday Rentals](https://claude.ai/artifact/KXX496hMWxc4bLQFdUSFmy) — 7 posts. Property Type, Bedrooms, Lets, price per night / week / month; Singapore lets moved overseas.
- [x] [Hotels & Guesthouses](https://claude.ai/artifact/5uSbeWMcnspa6z9y8hALXZ) — 7 posts. Type, Star Rating, Free Cancellation.
- [x] [Tour Packages](https://claude.ai/artifact/4fGGFYJerQKXeaoqQy8MWC) — 7 posts. Tour Type, Domestic / International, Days, Includes, operator licence.
- [x] [Staycations & Day Trips](https://claude.ai/artifact/XCWPXBFnLKq5TfBaGzAWLd) — 7 posts. Type, Setting, Nights, Pet Friendly.
- [x] [Travel Services](https://claude.ai/artifact/GFUPMEtUYCha2YbQuDxEoQ) — 7 posts. One service list for form and filter, price per application / trip / year.
- [x] [Travel Accessories](https://claude.ai/artifact/5Pz8YfbUaSJujyungTRKFm) — 7 posts. Type, 5-step Condition filter, Cabin Size, Delivery.

## Competitor check (OLX, Gumtree, Carousell)

Checked 2026-10-27.

| Site | What it asks for travel |
| --- | --- |
| OLX India | No travel or holiday-rental category. |
| Gumtree UK | Holiday Rentals (under Property) filter on Rent per week or month, Number of bedrooms, Seller type and Property type (Apartment, Home, Caravan, Mobile Home, Lodge). Luggage filters on Price, Condition, Seller type and Delivery available. |
| Carousell SG | Couldn't be checked directly (Cloudflare bot check). From other sources, travel listings are mostly luggage and travel vouchers with the standard price, condition and deal method. |

**Takeaway.** Gumtree is the only one with structured travel fields, and its Holiday Rentals filters (bedrooms, property type including caravans and lodges, price per week) are the gaps we had. Booking sites (Booking.com, Airbnb, MakeMyTrip) are the better comparison for hotels and tours: star rating, free cancellation, what's included.

### Recommended, built into this rework

- [x] **Bedrooms** on Holiday Rentals, with a 1+ / 2+ / 3+ / 4+ filter (Gumtree).
- [x] **Caravan / Lodge** and **Private Room** property types (Gumtree).
- [x] **Price per week / month** for rentals, not only per night (Gumtree).
- [x] **Must Have** amenities filter (pool, hot tub, pet friendly, parking…), matching stays with all of them.
- [x] **Free Cancellation** on hotels, with a filter (Booking.com).
- [x] **Includes** on tours (flights, hotels, meals, guide, transfers), with a filter.
- [x] **Licences**: ATOL / ABTA in the UK, STB in Singapore, IATA / Ministry of Tourism in India; Scottish short-term let licence.
- [x] **Singapore rule** on Holiday Rentals: no home lets under 3 months.
- [x] **Cabin Size** on luggage, with a filter, and the 5-step condition scale (Gumtree, Carousell).
- [x] **Delivery** filter on accessories (Gumtree).

### Not recommended

- **Check-in / check-out dates and a calendar.** Needs a booking system; Available covers it for now.
- **Seller type (private / business).** Belongs on the account, as decided for Health & Beauty.
- **Guest reviews and ratings.** Comes from the platform, not the form.
