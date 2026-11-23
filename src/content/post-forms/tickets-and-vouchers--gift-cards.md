<!-- source: https://claude.ai/artifact/NHWdTQwzSimnUuabcC5aYi -->
# Tickets & Vouchers › Gift Cards — Post Form Review

Oct 28, 2026

The Retailer filter searched a field the form never asked. The form now asks Retailer Type and whether it's a digital code or a physical card, and the card balance is required, so buyers can see the discount. An expired card drops out of search.

## Posts

7 live: the UK has 3 (John Lewis £250, Amazon £100, Tastecard Premium); India and Singapore have 2 each, a shopping-mall card and a restaurant-chain card, with no store named.

## Form changes

| Field | Before | After |
| --- | --- | --- |
| Store / Brand | Text, required | Text, required |
| Retailer Type | Not asked | Fashion, Electronics, Food & Drink, Beauty, Travel, Gaming, Cinema & Entertainment, General / Shopping; required |
| Format | Not asked | Digital code, Physical card; required |
| Valid Until | Date | Date; blank = never expires; expired cards drop out of search |
| Card Balance | Face Value, optional | Required |
| Price | Asking Price, saved as `price` | Saved as `salePrice` |

## Filters

Retailer (adds Cinema & Entertainment), Format (new). Before: Retailer, not connected.

## Checklist

- [x] Form: Retailer Type, Format, Card Balance, `salePrice`.
- [x] Filters rewritten and wired; expired cards drop out; live in 4df17b2.
- [x] Backfill: all 7 posts filled; India's and Singapore's name a store.
- [x] Every filter option agrees on the database and the live site.
- [x] Synced the 3 forms; they match the code.
