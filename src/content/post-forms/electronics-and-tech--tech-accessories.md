<!-- source: https://claude.ai/artifact/X21jcZ6xXeUZ9p5cfXdTeX -->
# Electronics & Tech › Tech Accessories — Post Form Review

Oct 28, 2026

Tech Accessories now asks Type and what the item fits, so the Type filter can match. It had no posts in any market; 7 seed ads now fill it.

## Posts

7 seed ads added 2026-10-28 (`scripts/seed-tech-accessories-posts.ts`), already filled in with the new fields: the UK has an Anker 737 power bank, an Apple MagSafe case and a Samsung T7 Shield SSD; India a Xiaomi power bank and a Logitech keyboard and mouse; Singapore a TP-Link Deco mesh 3-pack and a Ugreen 100W charger.

## Form changes

| Field | Before | After |
| --- | --- | --- |
| Type | Not asked | Cases & Covers, Chargers & Power Banks, Cables & Adapters, Keyboards, Mice, External Drives & Memory, Printers & Scanners, Routers & Networking, Other; required |
| Brand | Text | Text |
| Model | Text | Dropped: the title carries it for accessories |
| Compatible With | Not asked | Text, e.g. iPhone 15, USB-C laptops |
| Condition | 5 steps + For Parts | Same |
| Warranty | None / Under / Extended | Dropped |
| Price | Saved as `price` | Saved as `salePrice` |

## Filters

Type (adds Drives, Printers, Networking; Chargers now include power banks), Condition (all 6 steps, was 3) and Delivery, each reading the field the form saves. Before: Type and Condition, neither connected.

## Checklist

- [x] Form: Type, Compatible With, `salePrice`.
- [x] Filters rewritten and wired; live in `6f26b1e`.
- [x] 7 seed ads added.
- [x] Every filter option agrees on the database and the live site.
- [x] Synced the 3 forms; they match the code.
