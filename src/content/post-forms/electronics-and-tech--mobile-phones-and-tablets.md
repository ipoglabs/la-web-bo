<!-- source: https://claude.ai/artifact/U5C19jUSVkjKdBae3iMAi1 -->
# Electronics & Tech › Mobile Phones & Tablets — Post Form Review

Oct 28, 2026

Phones and tablets now ask Type, Brand from a list, Storage from a list and Network, so all 6 search filters can match. Before, Brand and Storage were free text the filters' fixed options never matched, Type was never asked, and the price saved as `price`, which the price filter doesn't read.

## Posts

7 live: the UK has 3 (iPhone 16 Pro, Pixel 7, Galaxy Tab S9 FE); India and Singapore have 2 each, a generic "Smartphone — 128GB" and "10-inch Tablet — 64GB", and Singapore's are word-for-word copies of India's. None had a type, brand, storage or condition. The backfill names India's as a Samsung Galaxy A35 and a Lenovo Tab M10, Singapore's as a Xiaomi Redmi Note 13 and a Samsung Galaxy Tab A8, and adds a local meet-up line to Singapore's.

## Form changes

| Field | Before | After |
| --- | --- | --- |
| Type | Not asked | Smartphone / Tablet / Basic phone, required |
| Brand | Free text | Apple, Samsung, Google, OnePlus, Xiaomi, OPPO, vivo, realme, Motorola, Nokia, Other (asks the name); required |
| Model | Text | Text |
| Storage | Free text "e.g. 128 GB" | 32GB or less, 64, 128, 256, 512GB, 1TB+; required |
| RAM | Text | Text |
| Network | Not asked | Unlocked / Locked to a network / Wi-Fi only |
| Battery Health | Not asked | Text, e.g. 94% |
| Colour | Text | Text |
| Condition | 5 steps + For Parts | Same |
| Warranty | None / Under / Extended | Same |
| Price | Saved as `price` | Saved as `salePrice` |

## Filters

Type, Brand, Storage, Network (Unlocked), Condition and Delivery, each reading the field the form saves. Before: Brand, Storage and a New / Like New / Good / Fair Condition, none connected.

## Checklist

- [x] Form: Type, Brand list, Storage list, Network, Battery Health, `salePrice`.
- [x] Filters rewritten and wired; live in `6f26b1e`.
- [x] Backfill: all 7 posts filled, all 10 text swaps applied.
- [x] Every filter option agrees on the database and the live site.
- [x] Synced the 3 forms (India, UK, Singapore); they match the code.
