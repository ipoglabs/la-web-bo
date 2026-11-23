<!-- source: https://claude.ai/artifact/BCTjtmBjZQ5XA9vZtMUNZv -->
# Electronics & Tech › TVs & Audio — Post Form Review

Oct 28, 2026

TVs & Audio now asks Type and, for TVs, a Screen Size band, so both filters can match. Before, the form never asked Type and took the screen size as free text ("e.g. 55 inch") while the filter searched bands. The 50–65" and 65"+ bands also overlapped at 65".

## Posts

7 live: the UK has 3 (Sony HT-A7000 soundbar, Samsung 65" QN90A, and a 200-LP vinyl record collection); India and Singapore have 2 each, a 55" 4K TV and a 2.1 soundbar, and Singapore's copy India's.

**Misfiled ad.** "Vinyl Record Collection — 200+ LPs" (`tech-tv-03`, £825) isn't TV or audio kit. It belongs in Books, Media & Collectibles › Vinyl Records. The backfill moved it there.

## Form changes

| Field | Before | After |
| --- | --- | --- |
| Type | Not asked | TV, Projector, Soundbar, Speakers, Hi-Fi & Turntables, Headphones, Earbuds, Home Cinema, Other; required |
| Screen Size | Free text | Under 32", 32–49", 50–64", 65" and over; required, TVs only |
| Brand, Model | Text | Text |
| Condition | 5 steps + For Parts | Same |
| Warranty | None / Under / Extended | Same |
| Price | Saved as `price` | Saved as `salePrice` |

## Filters

Type, Screen Size, Condition and Delivery, each reading the field the form saves. Before: Type, Screen Size and Condition, none connected.

## Checklist

- [x] Form: Type, Screen Size band, `salePrice`.
- [x] Filters rewritten and wired; live in `6f26b1e`.
- [x] Backfill: 6 posts filled.
- [x] Moved the vinyl collection to Books, Media & Collectibles › Vinyl Records.
- [x] Every filter option agrees on the database and the live site.
- [x] Synced the 3 forms; they match the code.
