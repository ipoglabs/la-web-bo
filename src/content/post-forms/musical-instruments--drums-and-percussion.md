<!-- source: https://claude.ai/artifact/VwUq7ZoSMai5nQLzLqVeVR -->
# Musical Instruments › Drums & Percussion — Post Form Review

Oct 28, 2026

Drums now ask Type, so the Type filter can match. Indian percussion (tabla, dholak, mridangam) gets its own Type; before, the India seed tabla could only be "Other".

## Posts

7 live: the UK has 3 (Pearl Export EXX shell pack, Roland TD-07DMK, Zildjian A Custom cymbals); India and Singapore have 2 each, a 5-piece kit and a sheesham tabla set, and Singapore's copy India's.

## Form changes

| Field | Before | After |
| --- | --- | --- |
| Type | Not asked | Acoustic Kit, Electronic Kit, Snare, Cymbals, Hardware & Pedals, Cajon, Bongos / Congas / Djembe, Tabla / Dholak / Mridangam, Other; required |
| Brand, Model | Text | Text |
| Pieces / Sizes | Not asked | Text, e.g. 5-piece, 22" bass |
| Condition | 5 steps + Vintage | 5 steps + For Parts |
| Price | Saved as `price` | Saved as `salePrice` |

## Filters

Type (adds Snare, Cymbals, Hardware, Indian percussion), Condition and Delivery, each reading the field the form saves. Before: Type and Condition, neither connected.

## Checklist

- [x] Form: Type, Pieces / Sizes, `salePrice`.
- [x] Filters rewritten and wired; live in `b25f115`.
- [x] Backfill: all 7 posts filled, all text swaps applied.
- [x] Every filter option agrees on the database and the live site.
- [x] Synced the 3 forms; they match the code.
