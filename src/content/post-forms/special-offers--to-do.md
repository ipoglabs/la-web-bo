<!-- source: https://claude.ai/artifact/6JZpHa6ewChteFjsEBHmvP -->
# Special Offers — Post Form Review To-do

Oct 27, 2026

Special Offers has 12 subcategories and 56 live posts in 8 of them (Entertainment, Home & Living, Automotive and Miscellaneous have none). Every offer now asks Deal Type, Discount %, Redeem At and Valid Until, and every search filter reads what the form saves.

## Status — 27 Oct 2026

All 12 subcategories are built and live on the site (commit `32857ed`). All 36 live forms (12 × India, UK, Singapore) are synced and match the code, and all 56 seed ads are backfilled. All 1,026 filter options give the same results on the database and the live site; 198 of them return ads.

- [x] Code: forms, filters, card labels, Google price data.
- [x] Checked in code: every filter option equals a form option, with the same label, in all 3 markets.
- [x] Backfill dry run: all 56 seed ads found and updated, none missing.
- [x] Sync the 36 forms.
- [x] Run the backfill.
- [x] Check every filter option on the database and the live site.

## Category-wide issues

These affect every Special Offers subcategory. Each one is also in each subcategory's checklist.

| Issue | Before | Fix (built) |
| --- | --- | --- |
| Search filters did nothing | 44 filters across the 12 subcategories, none connected to the database. | Every filter now reads the field the form saves. |
| Cards showed the discount as a price | 47 of the 56 seeds kept a discount or count in `salePrice`: "10% cashback" showed as £10/₹10, "Buy 1 Get 1" as ₹11. | Cards show "40% off", the offer price, or the deal ("Free trial", "Cashback"). The bad prices are removed. |
| Price filter missed new ads | The form saved Offer Price as `price`; the price filter reads `salePrice`. | Offer Price saves as `salePrice`. |
| Deal Type never asked | The Deal Type filter (% Off, Buy 1 Get 1, Cashback…) had nothing to match. Banking used "Deal Type" for its product. | New required Deal Type on every offer, 13 kinds. Banking's product is now "Product". |
| Min Discount couldn't work | Discount was free text ("20% off"). | New Discount (% off) number field; Min Discount 10/20/30/50% matches it. |
| Redeem At never asked | The Redeem At filter had nothing to match. | New required Redeem At: In-store / Online / Both. "Both" offers show under In-store and Online. |
| Type lists didn't match | Each form's category list used different values from its filter (e.g. Health: Fitness/Nutrition vs Gym/Spa/Salon). | One list per subcategory, the same in the form and the filter. |
| Wrong fields for an offer | Retail asked Size, Colour and Condition; Automotive asked Year and KMs, as if selling one item. | Fields describe the offer and the business. |
| No end date required | Valid Until was optional. | Valid Until is required. |
| Seed dates had passed | 6 seeds said June/July 2026. | Dates moved to December 2026; all 56 valid until 31 Dec 2026. |

## To-do by subcategory

- [x] [Banking & Finance](https://claude.ai/artifact/4YkQ2pHHmwJEfzwBRpqF6P) — 7 posts. Product matching its filter, Current / Business Account, Special Rate.
- [x] [Travel & Tourism](https://claude.ai/artifact/NoTxVXMSYeCnixX93wxdmr) — 7 posts. Type (Flights / Hotels / Packages…) replaces Domestic / International.
- [x] [Retail & Shopping](https://claude.ai/artifact/3J2594NozmQ58AdKaY3XeQ) — 7 posts. Category added; single-item fields removed.
- [x] [Food & Dining](https://claude.ai/artifact/BsGrMcaDvC8yjvuZFJzfSj) — 7 posts. Cuisine select, Available For, Free Delivery.
- [x] [Electronics & Gadgets](https://claude.ai/artifact/TGzG97CGi8G2QpEGyVPCzu) — 7 posts. Product values fixed, shared Deal Type with Trade-in and 0% Instalments.
- [x] [Health & Wellness](https://claude.ai/artifact/QCC5YpXaNzkFA3gR2qAoE8) — 7 posts. Type (Gym / Spa / Salon…) replaces Fitness / Nutrition.
- [x] [Education & Learning](https://claude.ai/artifact/P3N7FbqYraNeP3bYZmV2ga) — 7 posts. Category and Format values match the filters.
- [x] [Holiday & Seasonal Offers](https://claude.ai/artifact/L7pK47qkjB5CAUDJRYcGDh) — 7 posts. Occasion in each market's terms (Deepavali, Hari Raya, Black Friday).
- [x] [Entertainment](https://claude.ai/artifact/VXsaHoWTeCwkNBzBJZb8Ji) — no posts. Type values fixed, Format added.
- [x] [Home & Living](https://claude.ai/artifact/JaD2iXaVrSuijePA1SpPfK) — no posts. Category shared with the filter; single-item fields removed.
- [x] [Automotive](https://claude.ai/artifact/5fQLMxBTRBKM7GB2P8Vbhr) — no posts. Service and For Vehicle replace the car-for-sale fields.
- [x] [Miscellaneous](https://claude.ai/artifact/UpETiCdxpMKdCvecNUJqbm) — no posts. Category and Business Name added.

## Competitor check (OLX, Gumtree, Carousell)

Checked 2026-10-27.

None of the three has a deals or offers category. OLX India and Gumtree UK have no deal fields at all; businesses post offers as normal ads with the details in the description. Carousell SG couldn't be checked directly (Cloudflare bot check), and other sources show no offers section there either. Special Offers is a LokalAds difference, so our form already goes further than any of them: deal type, % off, was/now price, redemption, coupon code and deadline.

The useful comparison is with deal sites (Groupon UK, nearbuy IN, Fave SG). Their vouchers commonly show three things we don't ask.

### Recommended: add

- [x] **Minimum spend** (optional currency field), e.g. "₹500 off on orders above ₹2,999".
- [x] **Who can use it**: Everyone / New customers only / Members only. Add a filter too, so people can hide new-customer-only deals.
- [x] **Starts on** (optional date) for upcoming sales. Until that date, the card shows "Starts 1 Nov".

All three built in commit `3ad83c9`. Who Can Use It is required, with a filter on every subcategory. The card shows "20% off · starts 1 Nov" until the offer starts. The re-run backfill sets 5 seeds to New customers only and 51 to Everyone, and gives 4 seeds a minimum spend (₹199, S$15, ₹20,000, S$800).

- [x] Re-sync the 36 Special Offers forms and re-run the backfill.
- [x] Verified 27 Oct: all 36 forms match the code, and all 1,134 filter options give the same ads on the database and the live site (222 of them with ads).

### Not recommended

- **Per-customer limit and valid days/times.** These vary too much to structure, and Terms already covers them.
- **Limited quantity / while stocks last.** Rarely filtered on; it fits in Terms.
