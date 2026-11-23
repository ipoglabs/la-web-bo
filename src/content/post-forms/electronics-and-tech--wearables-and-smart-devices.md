<!-- source: https://claude.ai/artifact/YQgM5jttym74ELAPaCJ9zg -->
# Electronics & Tech › Wearables & Smart Devices — Post Form Review

Oct 28, 2026

Wearables now ask Type, so the Type filter can match. Before, the form never asked it and the price saved as `price`.

## Posts

7 live: the UK has 3 (Apple Watch Series 9 45mm, Garmin Forerunner 265, WHOOP 4.0); India and Singapore have 2 each, a generic smartwatch and fitness band, and Singapore's copy India's.

## Form changes

| Field | Before | After |
| --- | --- | --- |
| Type | Not asked | Smartwatch, Fitness Tracker, Smart Ring, Smart Speaker, Smart Display, Smart Home, Other; required |
| Brand, Model | Text | Text |
| Size | Not asked | Text, e.g. 45mm, ring size 9 |
| Condition | 5 steps + For Parts | Same |
| Warranty | None / Under / Extended | Same |
| Price | Saved as `price` | Saved as `salePrice` |

## Filters

Type (adds Smart Ring and Smart Home), Condition and Delivery, each reading the field the form saves. Before: Type and Condition, neither connected.

## Checklist

- [x] Form: Type, Size, `salePrice`.
- [x] Filters rewritten and wired; live in `6f26b1e`.
- [x] Backfill: all 7 posts filled, all text swaps applied.
- [x] Every filter option agrees on the database and the live site.
- [x] Synced the 3 forms; they match the code.
