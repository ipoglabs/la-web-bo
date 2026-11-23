<!-- source: https://claude.ai/artifact/4fGGFYJerQKXeaoqQy8MWC -->
# Travel & Stays › Tour Packages — Post Form Review

Oct 27, 2026

Guided and self-guided tours. Buyers filter by group or private, domestic or abroad, and what's included. Before this review Tour Type and Domestic / International were filters the form never asked, and Duration was free text.

## Posts

7 live: the UK has 3 (Japan 10 days £3,499, Morocco 7 days £1,299, Iceland 5 days £1,899), India has 2 (Himalayan trek ₹15,000, Beas rafting ₹2,500), Singapore 2 Bali tours.

## Form changes

| Field | Before | After |
| --- | --- | --- |
| Domestic / International | — | Required |
| Tour Type | — | Required: Group / Private / Self-guided |
| Days | Free-text duration | Required number, plus Departure Dates |
| Includes | Free-text inclusions | Flights / Hotels / Meals / Guide / Transfers / Activities / Visa, and an Itinerary box |
| Operator | Optional agency name | Required, with ATOL / ABTA (UK), STB (Singapore), IATA / Ministry of Tourism (India) |
| Price | Saved as `price` | `salePrice` + Price Per: person / group / starting from |

## Filters

Tour Type, Destination (domestic / international) and Includes (new), all connected.

## Checklist

- [x] Ask Tour Type and Domestic / International; connect the filters.
- [x] Days and Includes, with an Includes filter.
- [x] Operator licence per market.
- [x] Price per person as `salePrice`.
- [x] Backfill the 7 seeds.
