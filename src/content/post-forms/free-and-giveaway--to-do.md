<!-- source: https://claude.ai/artifact/E786y8v9uuo4AMvLidEdjE -->
# Free & Giveaway — Post Form Review To-do

Oct 26, 2026

Free & Giveaway has 6 subcategories and 43 live posts across India, the UK and Singapore. Every form is the same short one: title, details, Good to Know, Condition and Pickup Availability. Food is the only exception: it swaps Condition for a required Best Before date. Each subcategory has its own review below. Tick the decisions you want built, then say "build all".

## Status — 26 Oct 2026

All 6 subcategories are live (commit 06d9ad9), with every decision built. The 18 forms are synced and the 43 seed posts are backfilled. The duplicate soil ad (comm-gen-01) is marked deleted. Checks: every active post has its required fields, and all 227 filter options return the right posts on the live site. Every Free card now shows "Free".

Open follow-ups:

- The Food seed posts have Best Before set to 31 Dec 2026, so all 7 leave search after that date. Move the date on, or replace them with fresh seeds.
- The rest of the marketplace (Home & Furniture, Fashion, Electronics & Tech and others) still has the old Condition filter (New / Like New / Used / For Parts), which doesn't match the forms' 5-step scale.

## Competitor check — Oct 28, 2026

Compared against Olio (food and non-food sharing), Trash Nothing / Freecycle, Gumtree Freebies and Carousell. What they ask that we didn't:

| Gap | Who does it | What we built |
| --- | --- | --- |
| How the item is handed over | Olio and Trash Nothing are built around pickup arrangements; Olio has doorstep "help yourself" pickups | **Collection Method** (required) on all 6 subs: Arrange a time / Left out, help yourself / Can drop off nearby. New **Collection** filter on every sub. Food already had the first two. |
| Fire safety label (UK) | UK charities and reuse shops refuse sofas and mattresses without the permanent label (Furniture and Furnishings (Fire Safety) Regulations 1988) | **Fire Safety Label Attached** (Yes / No) on UK Furniture, shown for Seating and Bed & Mattress |
| How food should be stored | Olio asks sharers to say how food has been kept | **Keep In** on Food: Cupboard (room temp) / Fridge / Freezer |

Not built: Trash Nothing's "Request" posts (people asking for free items). That would be a new ad type across the whole category, so it needs a product decision first.

- [x] Code: form fields, Collection filter, backfill (all 42 live seeds get a Collection Method; 7 Food seeds get Keep In; the UK sofa gets its fire label)
- [x] Commit, push, deploy
- [x] Sync the 18 forms and run the backfill
- [x] Verify every filter option on the DB and the live site

## Category-wide issues

These affect every Free subcategory. They are in each subcategory's Decisions list too, so ticking them in any one doc counts.

| Issue | Today | Fix |
| --- | --- | --- |
| Price on cards | Every Free card shows "£0", "₹0" or "S$0". | Show "Free" on every Free & Giveaway card. |
| Search filters do nothing | There are 15 filters across the 6 subcategories (Item Type, Condition, For, Dietary, Age Group, and others), but none of them are connected to the database. Picking one still shows every post. Checked live: Furniture with Item Type = Sofa / Chair returns all 3 UK posts. | Connect every filter to the field the form saves, as we did for Pets, Business, Community and Education. |
| Condition doesn't match | The form asks Brand New / Like New / Lightly Used / Well Used / Heavily Used. The filters offer Good / Fair / Worn, or Working / For Parts on Electronics. None of these values match. | Use the form's 5-step scale in the filters too. Electronics also gets a separate Working Status field. |
| Subcategory fields are missing | The search filters ask for Item Type, For, Age Group, Food Type and Dietary, but the forms never collect them, so they could never match. | Add these fields to the forms (see each subcategory). |
| Seed posts are bare | 42 of the 43 posts have no Condition, Best Before date or Pickup Availability. The soil ad moved in from Community is the one exception: it has Pickup Availability only. | Backfill these from each ad's own text. |
| Duplicate soil ad (UK) | The UK General list has the same Streatham garden soil and compost ad twice: the original (free-gen-02) and the copy moved over from Community (comm-gen-01). | Delete the moved copy (comm-gen-01) and keep the original. |
| India and Singapore posts are copies | India and Singapore have the same 12 ads, word for word ("Wooden Dining Table — Seats 4, Minor Wear" in both). | The backfill gives Singapore its own local details (areas, HDB pickup) without changing the items. |
| No "gone by" date | Givers often have a deadline ("By Friday", "Moving abroad"), but only Food asks for a date. Ads stay up after the item has gone. | Add an optional Must Go By date to the non-Food forms. Hide Food posts once Best Before has passed and other posts once Must Go By has passed. |

## To-do by subcategory

- [x] [Furniture](https://claude.ai/artifact/CrdojeeFjBhfQTZUiqPKxX) — 7 posts, 9 decisions. Item Type, Dimensions, Collection Access, Must Go By.
- [x] [Clothing](https://claude.ai/artifact/2UXdU7fV1bfekxsNGNTJeR) — 7 posts, 9 decisions. For (Men / Women / Kids / Unisex), Clothing Type, Size, Single or Bundle.
- [x] [Electronics](https://claude.ai/artifact/7mAeNfcRKpMJa22dSjbsU1) — 7 posts, 9 decisions. Item Type, required Working Status, Condition made optional, Brand, What's Included.
- [x] [Food](https://claude.ai/artifact/BtFE61GGbQLwMNG4PEbyAv) — 7 posts, 9 decisions. Food Type, Dietary, Allergens, Amount; hide ads after Best Before.
- [x] [Kids Items](https://claude.ai/artifact/HAmQMMd3EKQQDDU1xzgsaZ) — 7 posts, 8 decisions. Item Type with the car-seat hint, Age Group, Pushchair / Stroller wording.
- [x] [General](https://claude.ai/artifact/XYFTnz7hgvahcnMdgTGcCZ) — 8 posts, 9 decisions. Category, Amount, Condition made optional, delete the duplicate soil ad.

## Rollout order

1. Category-wide first: "Free" on cards, the 5-step Condition scale in the filters, and the Pickup Availability relabel. These touch every subcategory.
2. Food: hiding expired ads matters most here, and the safety hints go in.
3. Electronics and Kids Items: the new required fields (Working Status, Item Type) and their hints.
4. Furniture, Clothing and General.
5. Seed backfill (including the Singapore details and the duplicate soil ad), then check every filter live.

Same routine as Community and Education: build all, commit and push, deploy, sync the 18 forms, run the backfill, then check every subcategory on the DB and the live site.
