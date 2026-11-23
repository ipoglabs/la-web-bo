<!-- source: https://claude.ai/artifact/L7pK47qkjB5CAUDJRYcGDh -->
# Special Offers › Holiday & Seasonal Offers — Post Form Review

Oct 27, 2026

Festival and seasonal sales. Buyers filter by occasion first, and occasions differ by market. Before this review the form never asked the occasion, and the filter showed Chinese New Year in India and Diwali under that name in Singapore.

## Posts

7 live: the UK has 3 (60% off summer sale, 40% off back to school, 70% off garden clearance), India has 2 (Diwali 60% off, New Year 25% off) and Singapore 2 (Deepavali 60% off, New Year 25% off). All 7 had the % in `salePrice`.

## Form changes

| Field | Before | After |
| --- | --- | --- |
| Occasion | — | Required, in each market's terms (below) |
| Category | Holiday Packages / Seasonal Sale / Special Offers / Other | Required: Shopping / Home & Garden / Travel / Dining / Entertainment / Gifts / Other — same as the filter |
| Dates | Starts / Ends | Sale Starts; Valid Until is the end |
| Deal Type, Discount %, Redeem At, Offer Price | See the To-do | Category-wide changes |

| Market | Occasions |
| --- | --- |
| India | Diwali, Eid, Christmas, New Year, Independence Day, Valentine's, Back to School, Summer Sale, Mid-Year Sale, Year-End Sale, Other |
| UK | Christmas, New Year, Black Friday, Easter, Eid, Diwali, Chinese New Year, Valentine's, Back to School, Summer Sale, Mid-Year Sale, Year-End Sale, Other |
| Singapore | Chinese New Year, Hari Raya, Deepavali, Christmas, New Year, National Day, Valentine's, Back to School, Great Singapore Sale, Mid-Year Sale, Year-End Sale, Other |

## Filters

Occasion (per market, same words as the form), Category, Deal Type, Min Discount and price — all now connected.

## Checklist

- [x] Add Occasion (required) with each market's list; the filter shows the same list per market.
- [x] Category (required) with the filter's values; connect it.
- [x] Replace Starts / Ends with Sale Starts plus Valid Until.
- [x] Add Deal Type (required) and connect the filter (category-wide).
- [x] Add Discount % and connect Min Discount (category-wide).
- [x] Add Redeem At; save Offer Price as `salePrice`; make Valid Until required (category-wide).
- [x] Backfill Occasion, Category, Deal Type, Discount and Valid Until on the 7 seeds.
