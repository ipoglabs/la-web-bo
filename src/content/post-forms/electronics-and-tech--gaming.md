<!-- source: https://claude.ai/artifact/U11WgAAKtquuXiaoCmgBik -->
# Electronics & Tech › Gaming — Post Form Review

Oct 28, 2026

Gaming now asks Type, and Platform saves the values the filter searches, so both filters can match. Before, the form saved Platform as "PlayStation" while the filter searched "ps", and never asked the Item Type the filter offered.

## Posts

7 live: the UK has 3 (PS5 Disc bundle, custom gaming PC, Secretlab Titan EVO chair); India and Singapore have 2 each, a "Gaming Console — 1TB" and a wireless headset, and Singapore's copy India's. The backfill names India's console a PS5 Slim and Singapore's an Xbox Series X.

## Form changes

| Field | Before | After |
| --- | --- | --- |
| Type | Not asked | Console, Game, Controller, VR Headset, Gaming PC, Gaming Chair & Desk, Accessory, Other; required |
| Platform | PlayStation / Xbox / Nintendo / PC / Other, saved as the label | Same list plus Mobile, saved as the filter's values; required, hidden for chairs |
| Brand, Model | Text | Text |
| Condition | 5 steps + For Parts | Same |
| Warranty | None / Under / Extended | Dropped: rarely relevant to games and accessories |
| Price | Saved as `price` | Saved as `salePrice` |

## Filters

Platform (adds Other), Type (adds VR, Gaming PC, Chair & Desk, Other), Condition and Delivery, each reading the field the form saves. Before: Platform, Item Type and Condition, none connected.

## Checklist

- [x] Form: Type, Platform values, `salePrice`.
- [x] Filters rewritten and wired; live in `6f26b1e`.
- [x] Backfill: all 7 posts filled, all 6 text swaps applied.
- [x] Every filter option agrees on the database and the live site.
- [x] Synced the 3 forms; they match the code.
