<!-- source: https://claude.ai/artifact/KzoXExejD9CuienheZDtnL -->
# Books, Media & Collectibles › DVDs & Blu-ray — Post Form Review

Oct 28, 2026

The filter offered Format (DVD, Blu-ray, 4K) but the form never asked it, and Genre was free text. Both are now lists, the same in the form and the filter, plus TV Series and World Cinema genres for box sets and foreign-film collections.

## Posts

7 live: the UK has 3 (the Marvel Phases 1–3 Blu-ray set, Breaking Bad + Better Call Saul on Blu-ray, 150 classic-film DVDs); India and Singapore have 2 each, a Blu-ray trilogy and a 20-DVD collection, and Singapore's copy India's.

## Form changes

| Field | Before | After |
| --- | --- | --- |
| Format | Not asked | DVD, Blu-ray, 4K UHD, Mixed; required |
| Genre | Free text | Action & Adventure, Comedy, Drama, Sci-Fi & Fantasy, Horror & Thriller, Kids & Family, TV Series, World Cinema, Other; required |
| Number of Items | Not asked | Number, for collections |
| Condition | 5 steps + Collectible | 5 steps (Brand New to Heavily Used) |
| Price | Saved as `price` | Saved as `salePrice` |

## Filters

Format (adds Mixed), Genre (adds TV Series, World Cinema), Condition and Delivery, each reading the field the form saves. Before: Genre, Format and Condition, none connected.

## Checklist

- [x] Form: Format, Genre list, Number of Items, `salePrice`.
- [x] Filters rewritten and wired; live in e6b5d5b.
- [x] Backfill: all 7 posts filled, all text swaps applied.
- [x] Every filter option agrees on the database and the live site.
- [x] Synced the 3 forms; they match the code.
