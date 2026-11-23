<!-- source: https://claude.ai/artifact/GkpWnPErpn1w1mmpzSLyna -->
# Electronics & Tech › Computer Parts & Components — Post Form Review

Oct 28, 2026

Parts now ask the Component, so the Component filter can match. Before, the form never asked it and the price saved as `price`.

## Posts

7 live: the UK has 3 (RTX 3080 Founders Edition, Corsair DDR5 32GB kit, Samsung 990 Pro 2TB); India and Singapore have 2 each, an 8GB graphics card and an ATX motherboard, and Singapore's copy India's. Singapore's get a Sim Lim Square / Bugis meet-up line.

## Form changes

| Field | Before | After |
| --- | --- | --- |
| Component | Not asked | GPU, CPU, RAM, SSD / HDD, Motherboard, PSU, Case, Cooling, Other; required |
| Brand, Model | Text | Text |
| Capacity / Spec | Not asked | Text, e.g. 16GB, 2TB, 850W |
| Condition | 5 steps + For Parts | Same |
| Warranty | None / Under / Extended | Same |
| Price | Saved as `price` | Saved as `salePrice` |

## Filters

Component (adds Case and Cooling), Condition and Delivery, each reading the field the form saves. Before: Component and Condition, neither connected.

## Checklist

- [x] Form: Component, Capacity / Spec, `salePrice`.
- [x] Filters rewritten and wired; live in `6f26b1e`.
- [x] Backfill: all 7 posts filled, all text swaps applied.
- [x] Every filter option agrees on the database and the live site.
- [x] Synced the 3 forms; they match the code.
