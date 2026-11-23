<!-- source: https://claude.ai/artifact/PCXDuhmWEGJ7re7WhbGd1V -->
# Tickets & Vouchers › Experience Days — Post Form Review

Oct 28, 2026

The Activity filter searched a field the form never asked. The form now asks Activity and who it's for (1, 2, or a group), the thing gift buyers search on, and adds Flying & Ballooning for the balloon and helicopter vouchers. An expired voucher drops out of search.

## Posts

7 live: the UK has 3 (Silverstone supercar laps, a Virgin balloon flight for 2, Savoy afternoon tea for 2); India has a balloon ride and a spa day, Singapore a helicopter tour and a spa day, valid for "6 months" or "3 months" from no date.

## Form changes

| Field | Before | After |
| --- | --- | --- |
| Activity | Not asked | Adventure, Flying & Ballooning, Driving, Spa & Wellness, Fine Dining, Cooking, Creative, Other; required |
| Provider | Text | Text |
| For | Not asked | 1 person, 2 people, Family / Group; required |
| Voucher | Not asked | E-voucher, Physical voucher, Booking in my name |
| Valid Until | Date | Date; expired vouchers drop out of search |
| Original Price | Face Value | Currency |
| Price | Asking Price, saved as `price` | Saved as `salePrice` |

## Filters

Activity (adds Flying & Ballooning), For (new). Before: Activity, not connected.

## Checklist

- [x] Form: Activity, For, Voucher, `salePrice`.
- [x] Filters rewritten and wired; expired vouchers drop out; live in 4df17b2.
- [x] Backfill: all 7 posts filled with a Valid Until date.
- [x] Every filter option agrees on the database and the live site.
- [x] Synced the 3 forms; they match the code.
