<!-- source: https://claude.ai/artifact/4N1NjoteRyBbk84FfYLwEw -->
# Musical Instruments › Wind, Brass & Strings — Post Form Review

Oct 28, 2026

Wind, Brass & Strings now asks Type and, for violins and cellos, the size, so both filters can match. Parents buying for a child search on size (3/4, 1/2) more than anything else. Bansuri and sitar get their own Types.

## Posts

7 live: the UK has 3 (Yamaha YFL-222 flute, Conn-Selmer Prelude clarinet, 3/4 student violin outfit); India and Singapore have 2 each, a 4/4 violin and a bamboo bansuri, and Singapore's copy India's.

## Form changes

| Field | Before | After |
| --- | --- | --- |
| Type | Not asked | Violin / Viola, Cello / Double Bass, Flute, Clarinet, Saxophone, Trumpet / Cornet, Trombone & Low Brass, Bansuri & Shehnai, Sitar / Veena / Sarod, Other; required |
| Brand, Model | Text | Text |
| Size | Not asked | 4/4, 3/4, 1/2, 1/4, 1/8 or smaller; violins and cellos |
| Key / Pitch | Not asked | Text, e.g. Bb, Eb alto; wind and brass |
| Condition | 5 steps + Vintage | 5 steps + For Parts |
| Price | Saved as `price` | Saved as `salePrice` |

## Filters

Type (adds Trombone, Bansuri, Sitar), Size (new), Condition and Delivery, each reading the field the form saves. Before: Type and Condition, neither connected.

## Checklist

- [x] Form: Type, Size, Key / Pitch, `salePrice`.
- [x] Filters rewritten and wired; live in `b25f115`.
- [x] Backfill: all 7 posts filled, all text swaps applied.
- [x] Every filter option agrees on the database and the live site.
- [x] Synced the 3 forms; they match the code.
