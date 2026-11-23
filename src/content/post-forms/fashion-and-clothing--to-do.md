<!-- source: https://claude.ai/artifact/QEe3aE9rwE2kK8yjB84vxG -->
# Fashion & Clothing — Post Form Review To-do

Oct 26, 2026

Fashion & Clothing has 8 subcategories and 56 live posts: 3 in the UK and 2 each in India and Singapore per subcategory. All 8 use the same form: Condition, Brand, Size, Colour and Material, plus For on every subcategory except Men's and Women's (Bags and Jewellery skip Size). After that come Price, Negotiable and Deal Method. Each subcategory has its own review below. Tick the decisions you want built, then say "build all".

## Status — 26 Oct 2026

All 8 subcategories are built and live (commit `f47796e`). All 24 forms (8 subcategories × India, UK, Singapore) are synced, and all 56 seed ads are backfilled. The Louis Vuitton Speedy is now in Designer & Luxury, and the Singapore ads have their own local details.

- **Forms:** all 24 live forms match the code.
- **Filters:** every option of every filter in each subcategory and market (504 searches) returns exactly the ads the database holds for it. With no filter, the 24 lists also match.
- **Seed ads:** each of the 56 ads is found by every filter value it has (189 checks), on the database and on the live site.
- **Price:** the filter reads `salePrice`, which the form now saves. Checked live: over £500 in UK Designer returns only the £650 Burberry and the £680 LV.
- **Known gap:** the Manolo Blahnik heels (EU 38.5) have no Shoe Size, since the list has no half sizes; the exact size is in Size Details.

## Category-wide issues

These affect every Fashion & Clothing subcategory. They are in each subcategory's Decisions list too, so ticking them in any one doc counts.

| Issue | Today | Fix |
| --- | --- | --- |
| Price filter misses new ads | The form saves the price as `price`, but the price filter reads `salePrice`. The seed posts use `salePrice`, so only ads posted through the form are missed. | Save the price as `salePrice`, as Home & Furniture now does. |
| Search filters do nothing | There are 19 filters across the 8 subcategories, but none of them are connected to the database. Checked live: Men's Clothing with Type = Shirts or Condition = Good still returns all 3 UK posts. | Connect every filter to the field the form saves. |
| Three Condition scales | The form asks Brand New / Like New / Lightly Used / Well Used / Heavily Used. The filters use three other scales: New with tags / Like New / Good / Fair; New / Like New / Good / Fair; and Designer's New / Excellent / Good / Signs of Wear. None of these values match the form's. | Use the form's 5 steps everywhere. In Fashion, "Brand New" reads "New with Tags", the term buyers look for. |
| "For" never matches | The form saves Men / Women / Unisex as `male` / `female` / `unisex`. The filters search `men` / `women` / `kids`. | Save `men` / `women` / `unisex` (plus `kids` where kids' items belong), matching the filters. |
| Type is never asked | Every subcategory filters by Type (or Era, Brand, Category), but the form never asks for any of these. | Add Type to every form, plus the details each subcategory needs (see each doc). |
| Size can't be filtered | Size is free text ("M", "UK 14", "40R", "W32 L30"), so it can't be filtered. | Clothing gets a Size select (XS–3XL) plus Size Details for the exact fit. Shoes get each market's size system. |
| Seed posts are bare | None of the 56 posts has Condition, Brand, Size, Colour or For filled. The details are only in the text. | Backfill these from each ad's own text. |
| India and Singapore posts are copies | India and Singapore have the same 16 ads, word for word, with only the price converted. | The backfill gives Singapore its own local details without changing the items. |

## To-do by subcategory

- [x] [Men's Clothing](https://claude.ai/artifact/U47n5Rga69q3cGKDh9nX69) — 7 posts, 7 decisions. Type, Size select with Size Details, Single or Bundle.
- [x] [Women's Clothing](https://claude.ai/artifact/L3FHhgpBdLstwgxfiCXQ4L) — 7 posts, 7 decisions. Type, Size select with Size Details, Single or Bundle.
- [x] [Traditional & Ethnic Wear](https://claude.ai/artifact/Giyjsa1bVzVef5CqzV28qR) — 7 posts, 8 decisions. Type in each market's terms (abaya, African wear, kebaya, baju kurung), For values fixed, Occasion, Fabric.
- [x] [Shoes & Footwear](https://claude.ai/artifact/CyqCDxQfmWVnQpvPg6ZZQf) — 7 posts, 8 decisions. Type, For required and fixed, Shoe Size in each market's system, Original Box.
- [x] [Bags & Accessories](https://claude.ai/artifact/1LD1QNESbxViAVM5N27t51) — 7 posts, 8 decisions. Type, Material select, For values fixed; Louis Vuitton seed moves to Designer.
- [x] [Jewellery & Watches](https://claude.ai/artifact/Yb7SGX5AwZFKzz3XuWXYXj) — 7 posts, 9 decisions. Type, Metal, Gold Purity in each market's marking, Movement, Box & Papers.
- [x] [Designer & Luxury](https://claude.ai/artifact/6qipEdfAQrPjqYsyKR5xkh) — 7 posts, 8 decisions. Category, designer Brand select, required Proof of Authenticity, What's Included.
- [x] [Vintage & Preloved](https://claude.ai/artifact/2gMCoFaXejFMDh5VPFpNBi) — 7 posts, 8 decisions. Era (with Recent Preloved), Type, Condition filter added, Size select.

## Rollout order

1. Category-wide first: save the price as `salePrice`, the 5-step Condition scale (with "New with Tags") in every filter, the For values, and "Colour". These touch every subcategory.
2. Men's, Women's and Vintage: the shared Size select.
3. Shoes & Footwear and Jewellery & Watches: the per-market fields (Shoe Size, Gold Purity).
4. Traditional & Ethnic Wear, Bags & Accessories, and Designer & Luxury.
5. Seed backfill (including the Singapore details and the Louis Vuitton move), then check every filter live.

Same routine as Home & Furniture: build all, commit and push, deploy, sync the 24 forms, run the backfill, then check every subcategory on the DB and the live site.
