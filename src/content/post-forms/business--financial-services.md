<!-- source: https://claude.ai/artifact/CYzvbYxyfgdMYSDFZQSYMh -->
# Business › Financial Services — Post Form Review

Oct 26, 2026

The form is the same in IN, GB and SG and has no posts yet. The biggest gap is trust: loan, investment and insurance ads are regulated in all three markets, but the licence field is optional and doesn't say which regulator. The form also has no price, so the price filter has nothing to read.

## Current fields

The form has 9 fields today. 3 are required: Adv Title, Adv Details and Service Type.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2000 characters |
| 3 | Good To Know | goodToKnow | goodToKnow | No | Seller's own label / value points |
| 4 | Service Type | serviceType | select | Yes | Accounting, Tax, Investment, Loan, Insurance, Other |
| 5 | Company Name | company | text | No | Half width |
| 6 | License / Registration No. | licenseNumber | text | No | Half width |
| 7 | Years of Experience | experience | text | No | Half width |
| 8 | Pricing Model | pricingModel | select | No | Fixed, Hourly, Commission, Custom |
| 9 | Website | website | text | No | Placeholder "https://", half width |

There are no posts and no mock listings.

The search offers Service (Business Loans, Investment, Insurance, Accounting, Tax Advisory, Other) and Provider (Individual, Company). Neither works. Service Type is close: only Loan is saved as `loan` where the filter sends `loans`.

## Field type changes

3 existing fields should change.

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Service Type | `loan` | Save as `loans` (Business Loans); keep the other 5 | Matches the Service search filter |
| Years of Experience | free text | number, 0–60 | Free text can't be compared; Pet Care made the same change |
| License / Registration No. | optional, no regulator | Regulator select + number, required for Loans, Investment and Insurance. IN: SEBI, RBI, IRDAI, ICAI. GB: FCA, ICAEW, ACCA, CIOT. SG: MAS, ISCA, ACRA | Each market licenses these services; unlicensed loan ads are a common scam |

## New fields to add

Financial Services can add 3 fields with no new field types.

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Listed By | select | Individual, Firm | All | Yes | Backs the Provider filter |
| Price | currency | Saved as `salePrice`, optional | All | No | Gives the price filter something to read; many ads quote a starting fee |
| Price Per | select | Per hour, Per month, Per return / filing, Fixed fee, Starting from | All | No | Pairs with Pricing Model for fee-based services |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [ ] Service Type saves `loans` for Business Loans; wire the Service filter
- [ ] Years of Experience as a number
- [ ] Add a Regulator select beside the licence number, per market
- [ ] Require Regulator and licence number for Loans, Investment and Insurance
- [ ] Add Listed By (required) and wire the Provider filter
- [ ] Add an optional Price saved as `salePrice`, with Price Per

## Built — 26 Oct 2026

All 6 items are built in IN, GB and SG (commit 316fe67). Regulated By and Licence No. show, and are required, only for Business Loans, Investment and Insurance. Accounting, Tax and Other show an optional Professional Body (IN: ICAI, ICSI; GB: ICAEW, ACCA, CIOT, AAT; SG: ISCA, ACRA filing agent) and Membership No. There are no posts yet.
