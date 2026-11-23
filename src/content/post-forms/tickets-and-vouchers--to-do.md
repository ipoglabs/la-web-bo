<!-- source: https://claude.ai/artifact/XTpAkfivdSCEc1tPhBocMc -->
# Tickets & Vouchers — Post Form Review To-do

Oct 28, 2026

Tickets & Vouchers has 5 subcategories and 35 posts, 7 in each: the UK has 15, India 10 and Singapore 10, and Singapore's mostly mirror India's. Tickets shared one form and vouchers another; none asked the kind of event, sport, retailer, activity or voucher, so none of the 8 search filters could match, and the price saved as `price` while the price filter reads `salePrice`. Past events and expired vouchers stayed listed forever, and 6 UK ads were dated in 2026 and already past. This is the last of the 4 categories that had no review.

## Status — 28 Oct 2026

All 5 subcategories are live (commit 4df17b2) and the 35 seed ads are backfilled. All 15 live forms are synced and match the code.

- [x] Code: forms, filters, filter wiring, past-event and expiry drop-out, backfill script.
- [x] Checked in code: build and lint pass; every filter option is a form option.
- [x] Backfill dry run: all 35 posts found; every value is a form option and visible, every required field is filled, every date is after today, every text swap applies, and every top-level key is a Post model path (the rest go under attributes).
- [x] Commit and push (4df17b2); production deploy live.
- [x] Run the backfill: 35 ads filled; a re-run changes nothing.
- [x] Check every filter option on the database and the live site: 174 of 174 agree, 61 with ads (When ranges and past/expired drop-out included).
- [x] Sync the 15 forms: 15 of 15 match the code; the live site serves the new forms.

## Category-wide issues

These affect every Tickets & Vouchers subcategory. Each one is also in each subcategory's checklist.

| Issue | Before | Fix (built) |
| --- | --- | --- |
| Search filters did nothing | 8 filters across 5 subs, none connected to the database. | 14 filters, each reading the field the form saves. |
| Kind never asked | No Event Type, Sport, Retailer, Activity or Voucher Type on any form. | Required on every sub, the same list in the form and the filter. |
| Past events stayed listed | Nothing dropped out of search; "When" filtered nothing. | Events drop out after their date (or Last Day); vouchers after Valid Until; bookings after the travel date. When reads the Event Date. |
| UK resale law | Face value and seat optional; nothing on football. | UK: face value and block / row / seat required (Consumer Rights Act 2015 s.90); Sport hint says football tickets only resell through the club (CJPOA 1994 s.166). |
| Price in the wrong field | Saved `price`; the seeds and the price filter use `salePrice`. | Every sub saves `salePrice`; tickets price per ticket. |
| Stale and unlawful seed ads | 6 UK ads dated in 2026 and past; an Arsenal resale and a London Marathon place that can't lawfully be sold. | Moved to 2027; Arsenal listed via the club's exchange; Marathon place became grandstand seats. |
| Seed posts were bare | None of the 35 had a date, venue, type or provider; India's and Singapore's were generic. | Backfilled; India's and Singapore's get real venues and providers and a 2027 date. |

## To-do by subcategory

- [x] [Event Tickets](https://claude.ai/artifact/BDKkoQBT2Do1p6KKbQq9PE) — 7 posts. Event Type, Seating, Ticket Type, UK face value and seat.
- [x] [Sport Tickets](https://claude.ai/artifact/X8XrEAnmfoUdowvoVc8uU4) — 7 posts. Sport, UK football hint; 3 UK seed ads changed.
- [x] [Gift Cards](https://claude.ai/artifact/NHWdTQwzSimnUuabcC5aYi) — 7 posts. Retailer Type, Format, Card Balance.
- [x] [Experience Days](https://claude.ai/artifact/PCXDuhmWEGJ7re7WhbGd1V) — 7 posts. Activity (adds Flying), For.
- [x] [Travel Vouchers](https://claude.ai/artifact/UGLjdZiAHkawkxWhYzXq9Q) — 7 posts. Type (adds Rail), Where, Travel Date, Name Change.

## Competitor check and the law

Checked 2026-10-28.

| Source | What it says |
| --- | --- |
| [Gumtree UK — Tickets](https://www.gumtree.com/tickets) | 835 ads: Concerts 541, Comedy & Theatre 112, Sports 88, Days Out 60, Travel 34. Filters: Price, Seller type, Location only. |
| [Consumer Rights Act 2015 s.90 (notes)](https://www.legislation.gov.uk/ukpga/2015/15/section/90/notes) | A reseller must give the seat or standing area (area, block, row, seat), any restriction on who may use it, and the face value. |
| [CJPOA 1994 s.166](https://www.legislation.gov.uk/ukpga/1994/33/section/166) | Selling, offering or advertising a ticket for a designated football match without the organiser's written authority is an offence. |
| [London Marathon 2027 terms (charity)](https://www.shootingstar.org.uk/app/uploads/2026/04/London-Marathon-2027-Terms-Conditions-1.pdf) | Places are not transferable; running on another person's entry means disqualification. |

**Takeaway.** Gumtree splits tickets by kind but filters only on price; our kind, date and seating filters go further. In the UK the law, not competitors, sets what a ticket ad must show.

### Recommended, built into this rework

- [x] **Kind per sub** (Gumtree's split) and **When** on the event date.
- [x] **Past events and expired vouchers drop out** of search.
- [x] **UK face value and seat required**, and the **football hint**.
- [x] **Official app transfer** filter: the safest way to buy a resold ticket.

### Not recommended

- **Blocking football tickets in the UK outright.** The hint and the club-exchange wording cover it; a block needs the designated-match list. Revisit if such ads appear.
- **A price cap at face value.** Not required by UK law outside football; the face value is shown so buyers can judge.
- **Seller type (private / business).** Belongs on the account, as decided for Health & Beauty.
