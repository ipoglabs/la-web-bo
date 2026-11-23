<!-- source: https://claude.ai/artifact/UGLjdZiAHkawkxWhYzXq9Q -->
# Tickets & Vouchers › Travel Vouchers — Post Form Review

Oct 28, 2026

The Type and Destination filters searched fields the form never asked, and Destination offered "Europe", which means nothing in India or Singapore. The form now asks Type (adds Rail), Where (Domestic, Short-haul / Regional, Worldwide), a Travel Date for fixed bookings and whether the name can be changed. A voucher drops out of search once it expires or its travel date passes.

## Posts

7 live: the UK has 3 (Eurostar to Paris in July 2026, now past; a British Airways £300 eVoucher; a Premier Inn 3-night break); India has a Goa resort stay and a flight voucher, Singapore a Bintan resort stay and a flight voucher.

## Form changes

| Field | Before | After |
| --- | --- | --- |
| Type | Not asked | Hotel, Flight, Rail, Package Holiday, Car Hire, Other; required |
| Airline / Hotel / Operator | Provider, optional | Required |
| Where | Not asked | Domestic, Short-haul / Regional, Worldwide / Any route |
| Travel Date | Not asked | Date, for a fixed booking |
| Valid Until | Date | Date |
| Name Change Allowed | Not asked | Yes / No; flights, rail, packages |
| Voucher | Not asked | E-voucher / credit, Physical voucher, Booking in my name |
| Original Value | Face Value | Currency |
| Price | Asking Price, saved as `price` | Saved as `salePrice` |

## Filters

Type (adds Rail), Where (Europe → Short-haul / Regional, so it works in every market). Before: Type and Destination, neither connected.

## Checklist

- [x] Form: Type, Where, Travel Date, Name Change, Voucher, `salePrice`.
- [x] Filters rewritten and wired; expired and past bookings drop out; live in 4df17b2.
- [x] Backfill: all 7 posts filled; Eurostar moved to July 2027.
- [x] Every filter option agrees on the database and the live site.
- [x] Synced the 3 forms; they match the code.
