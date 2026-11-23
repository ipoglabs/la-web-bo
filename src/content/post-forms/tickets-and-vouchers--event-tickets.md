<!-- source: https://claude.ai/artifact/BDKkoQBT2Do1p6KKbQq9PE -->
# Tickets & Vouchers › Event Tickets — Post Form Review

Oct 28, 2026

The Event Type and When filters searched fields nobody filled, and past events stayed listed forever. The form now asks Event Type, Seating and Ticket Type, the event date is required, and an event drops out of search once it's over. In the UK the face value and block / row / seat are required, as the Consumer Rights Act 2015 (s.90) requires of resellers.

## Posts

7 live: the UK has 3 (Glastonbury weekend, Coldplay at BST Hyde Park, The Prodigy at the O2), all dated in 2026 and now past (Glastonbury didn't run in 2026); India and Singapore have 2 each, a music festival pair and a comedy night, with no date or venue.

## Form changes

| Field | Before | After |
| --- | --- | --- |
| Event Type | Not asked | Music / Concert, Festival, Theatre & Musicals, Comedy, Exhibition, Kids & Family, Other; required |
| Event Date | Date, required | Date, required; the event drops out of search after it |
| Last Day | Not asked | Date; festivals |
| Venue | Text | Text, required |
| Number of Tickets | Quantity | Number, required |
| Seating | Not asked | Standing, Seated, VIP / Hospitality; required |
| Block / Row / Seat | Text | Text; required in the UK |
| Ticket Type | Not asked | Official app transfer, E-ticket, Paper, Other; required |
| Restrictions | Not asked | Text, e.g. ID must match, 18+ |
| Face Value | Currency | Per ticket; required in the UK |
| Price | Asking Price, saved as `price` | Asking Price per ticket, saved as `salePrice` |

## Filters

Event Type (adds Kids & Family), When (next 7 days / 30 days / 3 months, now reads the Event Date), Seating (new), Official app transfer only (new). Before: Event Type and When, neither connected.

## Checklist

- [x] Form: Event Type, Seating, Ticket Type, UK face value and seat, `salePrice`.
- [x] Filters rewritten and wired; past events drop out; live in 4df17b2.
- [x] Backfill: all 7 posts dated and filled; UK ads moved to their 2027 editions.
- [x] Every filter option agrees on the database and the live site.
- [x] Synced the 3 forms; they match the code.
