<!-- source: https://claude.ai/artifact/ArbWuFRJN3TgWjZ6HLbnEd -->
# Books, Media & Collectibles › Vinyl Records — Post Form Review

Oct 28, 2026

Record buyers grade on the Goldmine scale (Mint, Near Mint, VG+, VG, G+, G), record and sleeve separately; the old form asked a general Condition and the filter offered Mint / Good / Fair, which matched nothing. The form now grades on Goldmine, asks Format and Pressing, and Genre is a list. India's and Singapore's "Vintage Turntable" ads move to Electronics & Tech › TVs & Audio, and the UK's 200-LP collection, moved here from TVs & Audio in the Electronics rework, gets its details.

## Posts

6 after the moves: the UK has 4 (120 classic rock & soul LPs, an original Sade Diamond Life, 200 Northern Soul 45s, a 200+ LP soul / jazz / rock collection); India and Singapore have 1 each, an original-pressing rock LP, and Singapore's copies India's.

## Form changes

| Field | Before | After |
| --- | --- | --- |
| Genre | Free text | Rock, Pop, Soul / R&B & Funk, Jazz & Blues, Electronic & Dance, Hip-Hop, Classical, Bollywood & Indian, Other; required |
| Artist | Text | Text |
| Format | Not asked | LP / Album, 7" Single, 12" Single / EP, Box Set, Collection / Job Lot; required |
| Pressing | Not asked | Original, Reissue, Mixed |
| Number of Items | Not asked | Number, for collections |
| Record Grade | Condition, 5 steps + Collectible | Goldmine: Mint, Near Mint, VG+, VG, G+, G or worse; required |
| Sleeve Grade | Not asked | Same Goldmine scale |
| Price | Saved as `price` | Saved as `salePrice` |

## Filters

Genre (adds Hip-Hop, Bollywood & Indian), Format (new), Original pressings (new), Record Grade and Delivery, each reading the field the form saves. Before: Genre and Condition, neither connected.

## Checklist

- [x] Form: Genre list, Format, Pressing, Goldmine grades, `salePrice`.
- [x] Filters rewritten and wired; live in e6b5d5b.
- [x] Backfill: all 4 UK posts and 2 copies filled; both turntables moved to TVs & Audio with its fields.
- [x] Every filter option agrees on the database and the live site.
- [x] Synced the 3 forms; they match the code.
