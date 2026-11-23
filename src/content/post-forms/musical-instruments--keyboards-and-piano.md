<!-- source: https://claude.ai/artifact/QbDXqcxGwto8rk3RtR7XQD -->
# Musical Instruments › Keyboards & Piano — Post Form Review

Oct 28, 2026

Keyboards now ask Type and the number of keys, so both filters can match. Harmonium, the instrument OLX India sellers list most often here, now has its own Type.

## Posts

7 live: the UK has 3 (Roland RD-88, Yamaha P-125, Nord Stage 3 88); India and Singapore have 2 each, a generic 88-key digital piano and a 61-key keyboard, and Singapore's copy India's.

## Form changes

| Field | Before | After |
| --- | --- | --- |
| Type | Not asked | Digital Piano, Stage Piano, Portable Keyboard, Synthesiser, MIDI Controller, Acoustic Piano, Organ, Harmonium, Accordion, Other; required |
| Brand, Model | Text | Text |
| Keys | Not asked | 25–37, 49, 61, 73–76, 88; not for harmonium or accordion |
| Weighted Keys | Not asked | Yes / No; electronic keyboards only |
| Reeds / Octaves | Not asked | Text; harmonium and accordion only |
| Buyer Must Collect | Not asked | Yes / No; acoustic pianos and organs |
| Condition | 5 steps + Vintage | 5 steps + For Parts |
| Price | Saved as `price` | Saved as `salePrice` |

## Filters

Type (adds Stage Piano, MIDI, Acoustic Piano, Harmonium), Keys (new), Condition and Delivery, each reading the field the form saves. Before: Type and Condition, neither connected.

## Checklist

- [x] Form: Type, Keys, Weighted, Reeds, Buyer Must Collect, `salePrice`.
- [x] Filters rewritten and wired; live in `b25f115`.
- [x] Backfill: all 7 posts filled, all text swaps applied.
- [x] Every filter option agrees on the database and the live site.
- [x] Synced the 3 forms; they match the code.
