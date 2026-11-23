<!-- source: https://claude.ai/artifact/UWx9LUNRFqnhcykqJ7LJHZ -->
# Health & Beauty › Salons & Spas — Post Form Review

Oct 27, 2026

Hair salons, day spas and mobile beauty therapists. Most offer several services, so the form now asks a list rather than one Type. Before this review it asked neither, and a mobile therapist couldn't say they come to you.

## Posts

7 live: the UK has 3 (Mayfair day spa from £60, Islington colour salon from £45, SE London mobile nails/lashes/waxing from £35), India has 2 Glamour Salon ads (90-min spa package ₹3,500, haircut ₹1,200) and Singapore copies of the 2 India ads.

## Form changes

| Field | Before | After |
| --- | --- | --- |
| Services | — | Required, pick any: Hair / Nails / Lashes & Brows / Waxing & Threading / Makeup / Facials & Skincare / Massage / Spa Packages / Other — same as the filter |
| Home Visits | — | Yes / No |
| Mode | Online / In Person / Both, optional | Required: In-person / Online / Both |
| Price | Saved as `price` | Saved as `salePrice`, plus Price Per: session / hour / package / starting from |
| Kept |  | Provider, Qualifications, Availability |

## Filters

Service (Lashes & Brows, Waxing, Makeup and Spa Packages added), Home Visits (new) and price — all now connected.

## Checklist

- [x] Add Services (pick any, required) and connect the Service filter.
- [x] Add Home Visits with a "Comes to you" filter.
- [x] Make Mode required with the shared values (category-wide).
- [x] Save the price as `salePrice` and add Price Per (category-wide).
- [x] Backfill Services, Home Visits, Mode and Price Per on the 7 seeds; give the 2 Singapore copies a local detail.
