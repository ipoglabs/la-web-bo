<!-- source: https://claude.ai/artifact/DrhP6WQhQyBxDy37GM5UCb -->
# Baby & Kids › Baby & Kids Clothing — Post Form Review

Oct 27, 2026

Kids' clothes, mostly bundles. The Age Group and Gender filters existed, but Age Group was free text on the form, and none of the filters was connected to the database.

## Posts

7 live: the UK has 3 (boys bundle age 3–4 £30, girls party dresses £22, baby winter bundle £18), India has 2 (summer wear bundle ₹1,200, kurta pyjama set ₹1,500), and Singapore copies of both.

## Form changes

| Field | Before | After |
| --- | --- | --- |
| Type | — | Required: Bundle / Tops / Trousers & Shorts / Dresses & Skirts / Coats & Jackets / Sleepwear / Traditional & Festive / Shoes / Other |
| Age | Free text | Required: 0–12 months / 1–3 / 4–7 / 8–14 yrs |
| For | Optional | Required: Boy / Girl / Unisex |
| Condition | 4 steps | Required, 5 steps |
| Size, Brand | Kept | Kept (Size with an example) |
| Price | `price` | `salePrice`, Negotiable, Deal Method |

## Filters

Type (new), Age, For, Condition (5 steps) and Delivery (new), all connected.

## Checklist

- [x] Ask Type, with Bundle first (most kids' clothing ads are bundles).
- [x] Age as a select with the filter's bands; For required.
- [x] Condition filter matches the form's 5 steps.
- [x] Price as `salePrice`; Delivery filter.
- [x] Backfill the 7 seeds; give a Singapore copy a local detail.
