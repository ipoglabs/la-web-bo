<!-- source: https://claude.ai/artifact/7MdiKbBLPist1u1dNniTVh -->
# Books, Media & Collectibles › Collectibles & Memorabilia — Post Form Review

Oct 28, 2026

The Type filter (Sports, Music, Coins, Stamps…) searched a field the form never asked. The form now asks Type, adds Trading Cards and Toys & LEGO, and asks for a Certificate of Authenticity, which buyers of signed items look for first.

## Posts

7 live: the UK has 3 (all 66 Royal Mint 50p coins, a 1966 World Cup Final programme collection, a retired LEGO Millennium Falcon 10179); India and Singapore have 2 each, a 25-coin collection and a signed, framed cricket bat with certificate, and Singapore's copy India's.

## Form changes

| Field | Before | After |
| --- | --- | --- |
| Type | Not asked | Sports, Music, Film & TV, Coins & Notes, Stamps, Trading Cards, Toys & LEGO, Art & Prints, Other; required |
| Year / Era | Text | Text |
| Certificate of Authenticity | Not asked | Yes / No |
| Number of Items | Not asked | Number, for collections |
| Condition | 5 steps + Collectible | 5 steps (Brand New to Heavily Used) |
| Price | Saved as `price` | Saved as `salePrice` |

## Filters

Type (adds Trading Cards, Toys & LEGO), With certificate (new), Condition and Delivery, each reading the field the form saves. Before: Type and Condition, neither connected.

## Checklist

- [x] Form: Type, Certificate of Authenticity, Number of Items, `salePrice`.
- [x] Filters rewritten and wired; live in e6b5d5b.
- [x] Backfill: all 7 posts filled, all text swaps applied.
- [x] Every filter option agrees on the database and the live site.
- [x] Synced the 3 forms; they match the code.
