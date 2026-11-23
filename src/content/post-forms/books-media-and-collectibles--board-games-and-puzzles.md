<!-- source: https://claude.ai/artifact/4L3abdvXnBoH6PhcrCRmnV -->
# Books, Media & Collectibles › Board Games & Puzzles — Post Form Review

Oct 28, 2026

The old form never asked whether it was a game or a puzzle, how many could play, or whether every piece was there; the filter offered Players and a Complete / Incomplete "Condition". The form now asks Type, Players (games) or Pieces (puzzles), and All Pieces Included, the thing second-hand game buyers ask first.

## Posts

7 live: the UK has 3 (Catan with the 5–6 player and Seafarers expansions, Gloomhaven: Jaws of the Lion, 12 sealed Wasgij 1000-piece puzzles); India and Singapore have 2 each, a strategy board game and a 1000-piece puzzle, and Singapore's copy India's.

## Form changes

| Field | Before | After |
| --- | --- | --- |
| Type | Not asked | Board Game, Card Game, RPG & Miniatures, Jigsaw Puzzle, Other; required |
| Publisher / Brand | Brand, text | Text |
| Players | Not asked | Solo, 2, 2–4, 4+; games only |
| Pieces | Not asked | Under 500, 500, 1000, 1500+; puzzles only |
| Age | Age group | Text, e.g. 10+ |
| All Pieces Included | Not asked | Yes / No; required |
| Condition | 5 steps + Collectible | 5 steps (Brand New to Heavily Used) |
| Price | Saved as `price` | Saved as `salePrice` |

## Filters

Type (new), Players (adds Solo), All pieces included (was a Condition option), Condition and Delivery, each reading the field the form saves. Before: Players and Condition, neither connected.

## Checklist

- [x] Form: Type, Players, Pieces, All Pieces Included, `salePrice`.
- [x] Filters rewritten and wired; live in e6b5d5b.
- [x] Backfill: all 7 posts filled, all text swaps applied.
- [x] Every filter option agrees on the database and the live site.
- [x] Synced the 3 forms; they match the code.
