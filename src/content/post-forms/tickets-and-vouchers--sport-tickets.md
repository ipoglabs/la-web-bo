<!-- source: https://claude.ai/artifact/X8XrEAnmfoUdowvoVc8uU4 -->
# Tickets & Vouchers › Sport Tickets — Post Form Review

Oct 28, 2026

Same form as Event Tickets, with Sport in place of Event Type. Two UK seed ads couldn't lawfully be sold as written: football tickets may only be resold through the club (Criminal Justice and Public Order Act 1994 s.166), and London Marathon places can't be transferred at all. In the UK the Sport field now says so.

## Posts

7 live: the UK has 3 (Arsenal v Man City, a Wimbledon Centre Court debenture seat, a London Marathon 2027 charity place); India has a cricket pair and a football match, Singapore a football pair and a rugby match, none with a date or venue.

## Form changes

| Field | Before | After |
| --- | --- | --- |
| Sport | Not asked | Football, Cricket, Tennis, F1 / Motorsport, Boxing / MMA, Rugby, Other; required. UK hint: football only through the club's exchange |
| Event Date, Last Day, Venue, Number of Tickets | As Event Tickets | As Event Tickets |
| Seating | Not asked | Standing, Seated, VIP / Hospitality; required |
| Block / Row / Seat, Face Value | Optional | Required in the UK |
| Ticket Type | Not asked | Official app transfer, E-ticket, Paper, Other; required |
| Price | Asking Price, saved as `price` | Asking Price per ticket, saved as `salePrice` |

## Filters

Sport, When (now reads the Event Date), Seating (new), Official app transfer only (new); a match that's over drops out of search. Before: Sport and When, neither connected.

## Seed ads changed

- **Arsenal v Man City**: moved to 13 March 2027 and now says it's listed on Arsenal's official Ticket Exchange (buyer needs a membership), the only lawful way to resell it.
- **London Marathon place**: became 2 grandstand seats at The Mall finish (£90 each), as race places can't be transferred.
- **Wimbledon**: moved to 2027 and to Day 11, the day of the ladies' semi-finals (Day 10 has none).

## Checklist

- [x] Form: Sport, Seating, Ticket Type, UK face value, seat and football hint, `salePrice`.
- [x] Filters rewritten and wired; past matches drop out; live in 4df17b2.
- [x] Backfill: all 7 posts dated and filled; the 3 UK ads changed as above.
- [x] Every filter option agrees on the database and the live site.
- [x] Synced the 3 forms; they match the code.
