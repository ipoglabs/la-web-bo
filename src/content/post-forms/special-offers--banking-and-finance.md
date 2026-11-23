<!-- source: https://claude.ai/artifact/4YkQ2pHHmwJEfzwBRpqF6P -->
# Special Offers › Banking & Finance — Post Form Review

Oct 27, 2026

Credit card, savings, loan and account-switching offers. Buyers filter by product first. Before this review the form used "Deal Type" for the product, its values didn't match the Product filter, and no filter was connected.

## Posts

7 live: the UK has 3 (0% purchase card, 5.2% AER savings, £200 business-account switch), India has 2 HDFC offers (10% cashback, zero forex markup) and Singapore has the same 2 from DBS. All 7 had a cashback %, rate or reward in `salePrice`, so cards showed "£200", "₹10".

## Form changes

| Field | Before | After |
| --- | --- | --- |
| Product | "Deal Type": Loan / Credit Card / Investment / Insurance / Savings / Other | Product (required): Credit Card / Loan / Insurance / Savings Account / Investment / Current / Business Account / Other — same values as the filter |
| Deal Type | (used for the product) | Required, the 13 deal kinds incl. Cashback, Special Rate, 0% Instalments |
| Discount | Free text | Number, % off |
| Offer Price | Saved as `price` | Saved as `salePrice`, plus "Was" |
| Redeem At | — | Required: In-store / Online / Both |
| Valid Until | Optional | Required |
| Kept |  | Bank, Interest Rate, Tenure, Min/Max Amount, Eligibility, Documents, Coupon, Link, Terms |

## Filters

Product, Deal Type, Min Discount and price — all now connected.

## Checklist

- [x] Rename the product field to Product (required), values matching the Product filter, and connect the filter.
- [x] Add Current / Business Account (the UK switch offer).
- [x] Add Deal Type (required) and connect the Deal Type filter (category-wide).
- [x] Add Discount % and connect Min Discount (category-wide).
- [x] Add Redeem At (category-wide).
- [x] Save Offer Price as `salePrice` and add "Was" (category-wide).
- [x] Make Valid Until required (category-wide).
- [x] Cards show "10% off" or "Cashback", not the discount as a price (category-wide).
- [x] Backfill Product, Deal Type, Discount, Redeem At, Bank, Interest Rate and Valid Until on the 7 seeds; remove the wrong prices.
