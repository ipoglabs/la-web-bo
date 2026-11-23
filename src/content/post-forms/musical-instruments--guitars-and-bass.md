<!-- source: https://claude.ai/artifact/Tf6UGoAfoSrW3Dgj8kWpuC -->
# Musical Instruments › Guitars & Bass — Post Form Review

Oct 28, 2026

Guitars now ask Type, pick Brand from a list, and say whether the guitar is left-handed, so all 5 filters can match. Before, the form asked only Brand, Model and Condition; the Type filter searched a field nobody filled, and the price saved as `price`.

## Posts

7 live: the UK has 3 (Fender Player Stratocaster, Martin D-10E, Yamaha Pacifica starter bundle); India and Singapore have 2 each, a generic solid-top acoustic and a 4-string bass with amp, and Singapore's copy India's. The backfill names India's a Yamaha FS800 and an Ibanez GSR180, Singapore's a Cort Earth 70 and a Squier Affinity P-Bass, with a local meet-up line.

## Form changes

| Field | Before | After |
| --- | --- | --- |
| Type | Not asked | Electric, Acoustic, Electro-Acoustic, Classical / Nylon, Bass, Ukulele, Amp, Other; required |
| Brand | Free text | Fender, Squier, Gibson, Epiphone, Yamaha, Ibanez, PRS, Martin, Taylor, Cort, Gretsch, Other (asks the name); required |
| Model | Text | Text |
| Strings | Not asked | 4, 5, 6, 7+, 12; guitars only |
| Left-handed | Not asked | Yes / No; guitars only |
| Comes With | Not asked | Text, e.g. hard case, strap, amp |
| Condition | 5 steps + Vintage | 5 steps + For Parts (Vintage is an age, not a condition) |
| Price | Saved as `price` | Saved as `salePrice` |

## Filters

Type, Brand (new), Left-handed (new), Condition and Delivery (new), each reading the field the form saves. Before: Type (4 options) and a New / Like New / Good / Fair Condition, neither connected.

## Checklist

- [x] Form: Type, Brand list, Strings, Left-handed, Comes With, `salePrice`.
- [x] Filters rewritten and wired; live in `b25f115`.
- [x] Backfill: all 7 posts filled, all text swaps applied.
- [x] Every filter option agrees on the database and the live site.
- [x] Synced the 3 forms (India, UK, Singapore); they match the code.
