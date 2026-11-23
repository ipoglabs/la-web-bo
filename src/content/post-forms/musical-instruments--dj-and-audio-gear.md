<!-- source: https://claude.ai/artifact/6g3GUevMYRjkfoUuwTfeZu -->
# Musical Instruments › DJ & Audio Gear — Post Form Review

Oct 28, 2026

DJ & Audio Gear now asks Type, so the Type filter can match. Studio kit (audio interfaces, studio monitors, microphones) gets its own Types; the UK's Focusrite bundle had nowhere to go before.

## Posts

7 live: the UK has 3 (Pioneer DDJ-800, Technics SL-1200MK2 pair with Vestax mixer, Focusrite Scarlett 2i2 bundle); India and Singapore have 2 each, a 2-channel controller and a 1000W PA speaker, and Singapore's copy India's.

## Form changes

| Field | Before | After |
| --- | --- | --- |
| Type | Not asked | DJ Controller, Turntables, Mixer, CDJ / Media Player, PA & Speakers, Studio Monitors, Audio Interface, Microphones, Headphones, Other; required |
| Brand, Model | Text | Text |
| Condition | 5 steps + Vintage | 5 steps + For Parts |
| Price | Saved as `price` | Saved as `salePrice` |

## Filters

Type (adds CDJ, Studio Monitors, Audio Interface, Microphones), Condition and Delivery, each reading the field the form saves. Before: Type and Condition, neither connected.

## Checklist

- [x] Form: Type, `salePrice`.
- [x] Filters rewritten and wired; live in `b25f115`.
- [x] Backfill: all 7 posts filled, all text swaps applied.
- [x] Every filter option agrees on the database and the live site.
- [x] Synced the 3 forms; they match the code.
