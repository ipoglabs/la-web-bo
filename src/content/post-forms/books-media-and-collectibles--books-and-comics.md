<!-- source: https://claude.ai/artifact/S6vNtFVNased5iTdSyJmpt -->
# Books, Media & Collectibles › Books & Comics — Post Form Review

Oct 28, 2026

The old form asked Genre as free text, so the Genre filter matched nothing anyone typed. Type is now a list, the same in the form and the filter, and the form adds Format, Language (each market's own list) and Number of Items for sets and bundles.

## Posts

7 live: the UK has 3 (the 41-novel Discworld set, an 18-book GCSE & A-Level bundle, 60 Dark Horse Star Wars comics); India and Singapore have 2 each, a 10-paperback novel set and a 15-issue comic bundle, and Singapore's copy India's.

## Form changes

| Field | Before | After |
| --- | --- | --- |
| Type | Genre, free text | Fiction, Non-Fiction, Comics & Graphic Novels, Manga, Children's, Textbooks & Study Guides, Other; required |
| Author | Text | Text |
| Format | Not asked | Paperback, Hardback, Single Issues, Box Set / Collection |
| Language | Not asked | India: English + 7 Indian languages; UK: English; Singapore: English, Chinese, Malay, Tamil; plus Other |
| Number of Items | Not asked | Number, for sets and bundles |
| Condition | 5 steps + Collectible | 5 steps (Brand New to Heavily Used) |
| Price | Saved as `price` | Saved as `salePrice` |

## Filters

Type (adds Manga, split from Comics), Condition and Delivery, each reading the field the form saves. Before: Genre and Condition, neither connected.

## Checklist

- [x] Form: Type list, Format, Language, Number of Items, `salePrice`.
- [x] Filters rewritten and wired; live in e6b5d5b.
- [x] Backfill: all 7 posts filled, all text swaps applied.
- [x] Every filter option agrees on the database and the live site.
- [x] Synced the 3 forms; they match the code.
