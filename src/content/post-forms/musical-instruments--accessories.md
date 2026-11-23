<!-- source: https://claude.ai/artifact/FRWzTRYDKv6XCg3ztEPiPa -->
# Musical Instruments › Accessories — Post Form Review

Oct 28, 2026

Accessories now ask Type and which instrument they're for, so a guitarist can filter out drum hardware. Sheet music gets its own Type; the UK's ABRSM book bundle had nowhere to go before.

## Posts

7 live: the UK has 3 (ABRSM piano books, Hercules guitar stands, K&M music stands); India and Singapore have 2 each, guitar strings and a hard guitar case, and Singapore's copy India's.

## Form changes

| Field | Before | After |
| --- | --- | --- |
| Type | Not asked | Strings & Reeds, Pedals & Effects, Cases & Bags, Stands & Mounts, Cables & Leads, Tuners & Metronomes, Sheet Music & Books, Other; required |
| For | Not asked | Guitar & Bass, Keyboard & Piano, Drums, Orchestral Strings, Wind & Brass, DJ & Studio, Any / General; required |
| Brand | Text | Text |
| Model | Text | Dropped: the title carries it |
| Condition | 5 steps + Vintage | 5 steps + For Parts |
| Price | Saved as `price` | Saved as `salePrice` |

## Filters

Type (Microphones moved to DJ & Audio Gear; adds Cables, Tuners, Sheet Music), For (new), Condition and Delivery, each reading the field the form saves. Before: Type and Condition, neither connected.

## Checklist

- [x] Form: Type, For, `salePrice`.
- [x] Filters rewritten and wired; live in `b25f115`.
- [x] Backfill: all 7 posts filled, all text swaps applied.
- [x] Every filter option agrees on the database and the live site.
- [x] Synced the 3 forms; they match the code.
