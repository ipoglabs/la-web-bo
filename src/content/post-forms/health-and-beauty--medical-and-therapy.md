<!-- source: https://claude.ai/artifact/PDRqAknVRaZuZ5MV7JGwRc -->
# Health & Beauty › Medical & Therapy — Post Form Review

Oct 27, 2026

GP clinics, dentists, physiotherapists and health checks. Before this review the form never asked Type, and the filter's Counselling option belonged in Mental Health & Counselling.

## Posts

7 live: the UK has 3 (Harley Street GP £150, Clapham dentist £65, Hackney sports physio £85), India has 2 Dr. Sharma's Clinic ads (GP ₹500, 45-parameter health check ₹2,999) and Singapore copies of the 2 India ads from Dr. Tan's Clinic.

## Form changes

| Field | Before | After |
| --- | --- | --- |
| Type | — | Required: GP / Doctor / Dentist / Physiotherapy / Health Checks / Eye Care / Specialist / Other — same as the filter |
| Home Visits | — | Yes / No |
| Qualifications | Qualification | Qualifications / Registration (e.g. CQC, GDC, HCPC) |
| Mode | Optional | Required: In-person / Online / Both |
| Price | Saved as `price` | Saved as `salePrice`, plus Price Per: visit / session / package / starting from |

## Filters

Type (Counselling moved out; Health Checks, Eye Care and Specialist added), Mode, Home Visits and price — all now connected.

## Checklist

- [x] Add Type (required) and connect the Type filter; move Counselling to Mental Health.
- [x] Add Home Visits and its filter.
- [x] Make Mode required with the shared values; add the Mode filter.
- [x] Save the price as `salePrice` and add Price Per (category-wide).
- [x] Backfill Type, Mode, Price Per, registration and provider on the 7 seeds; give the 2 Singapore copies a local detail.
