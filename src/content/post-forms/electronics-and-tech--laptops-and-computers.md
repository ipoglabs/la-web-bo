<!-- source: https://claude.ai/artifact/Di7gKNvhE4MKr62KGUQGFM -->
# Electronics & Tech › Laptops & Computers — Post Form Review

Oct 28, 2026

Laptops and computers now ask Type and pick Brand from a list, so the Type and Brand filters can match. Before, the form never asked Type, Brand was free text, and the price saved as `price`.

## Posts

7 live: the UK has 3 (Dell XPS 15, MacBook Pro 14 M3 Pro, Lenovo IdeaPad 5); India and Singapore have 2 each, a "Refurbished Laptop — i5" and a "Desktop PC — Ryzen 5", and Singapore's copy India's. None had a type, brand or condition. The backfill names India's laptop a Dell Latitude 5420 and Singapore's an HP EliteBook 840 G8; the desktops are Brand Other, "Custom build".

## Form changes

| Field | Before | After |
| --- | --- | --- |
| Type | Not asked | Laptop, Desktop, All-in-One, Mini PC, Monitor, Other; required |
| Brand | Free text | Apple, Dell, HP, Lenovo, Asus, Acer, MSI, Microsoft, Samsung, Other (asks the name); required |
| Model | Text | Text |
| Processor, RAM, Storage | Text, always shown | Text, shown for computers only (not monitors) |
| Screen Size | Text, always shown | Text, shown for laptops, all-in-ones and monitors |
| Condition | 5 steps + For Parts | Same |
| Warranty | None / Under / Extended | Same |
| Price | Saved as `price` | Saved as `salePrice` |

## Filters

Type (now several at once, with Monitor and Other), Brand (adds Acer, MSI, Microsoft, Samsung), Condition and Delivery, each reading the field the form saves. Before: Type, Brand and Condition, none connected.

## Checklist

- [x] Form: Type, Brand list, specs shown by type, `salePrice`.
- [x] Filters rewritten and wired; live in `6f26b1e`.
- [x] Backfill: all 7 posts filled, all 6 text swaps applied.
- [x] Every filter option agrees on the database and the live site.
- [x] Synced the 3 forms; they match the code.
