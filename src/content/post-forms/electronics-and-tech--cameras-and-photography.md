<!-- source: https://claude.ai/artifact/Ryh3BPiMMqxEQQVKZcJhtW -->
# Electronics & Tech › Cameras & Photography — Post Form Review

Oct 28, 2026

Cameras now ask Type and pick Brand from a list, so the Type filter works and a new Brand filter can match. Before, the form never asked Type and the price saved as `price`.

## Posts

7 live: the UK has 3 (Sony A7 IV, Godox AD200Pro studio kit, Canon EOS M50 Mark II); India and Singapore have 2 each, a generic "Mirrorless Camera — 24MP" and an aluminium tripod, and Singapore's copy India's. The backfill names India's camera a Sony ZV-E10 and Singapore's a Canon EOS R10.

## Form changes

| Field | Before | After |
| --- | --- | --- |
| Type | Not asked | DSLR, Mirrorless, Compact, Action Cam, Drone, Lens, Lighting & Flash, Tripod & Support, Accessory, Other; required |
| Brand | Free text | Canon, Sony, Nikon, Fujifilm, Panasonic, OM System / Olympus, GoPro, DJI, Godox, Other (asks the name); optional, as tripods and bags are often unbranded |
| Model | Text | Text |
| Shutter Count | Not asked | Text, DSLR and mirrorless only |
| Lens Mount | Not asked | Text, lenses only |
| Condition | 5 steps + For Parts | Same |
| Warranty | None / Under / Extended | Same |
| Price | Saved as `price` | Saved as `salePrice` |

## Filters

Type (adds Compact, Lighting, Tripod, Other), Brand (new), Condition and Delivery, each reading the field the form saves. Before: Type and Condition, neither connected.

## Checklist

- [x] Form: Type, Brand list, Shutter Count, Lens Mount, `salePrice`.
- [x] Filters rewritten and wired; live in `6f26b1e`.
- [x] Backfill: all 7 posts filled, all text swaps applied.
- [x] Every filter option agrees on the database and the live site.
- [x] Synced the 3 forms; they match the code.
