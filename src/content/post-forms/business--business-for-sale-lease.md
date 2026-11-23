<!-- source: https://claude.ai/artifact/XPTT2ZGF6SR4YxwL5gzk3F -->
# Business › Business For Sale / Lease — Post Form Review

Oct 26, 2026

The form is the same in IN, GB and SG. The biggest gaps: there is no way to say "for lease", the price filter misses every new post, and none of the Action, Business Type, Annual Revenue or Staff Size filters works.

## Current fields

The form has 5 fields today. 3 are required: Adv Title, Adv Details and Asking Price.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2000 characters |
| 3 | Good To Know | goodToKnow | goodToKnow | No | Seller's own label / value points |
| 4 | Asking Price | price | currency | Yes | Min 1, half width |
| 5 | Ownership | ownership | select | No | Sole Proprietor, Partnership, Private Limited, LLP, Other |

There are 7 posts (IN 2, GB 3, SG 2), all seed samples with only a title and a price. The IN prices are wrong: ₹35 Lakh was saved as 35 and ₹18 Lakh as 18. The GB seeds carry turnover, profit, lease, staff and reason for sale in their mock listing.

The search offers Action (For Sale / For Lease), Business Type (F&B, Retail, E-commerce, Services, Manufacturing, Healthcare, Education, Tech, Other), Annual Revenue (Pre-revenue, < 100k, 100k–500k, 500k–1M, 1M+) and Staff Size (Solo, 1-5, 6-20, 21-50, 50+). None of them works, and the form asks none of them. The revenue bands ignore currency: 100k is £100,000 in GB but only ₹1 Lakh in IN.

## Field type changes

3 existing fields should change. The most important: Price saves to the field search reads, so the price filter works.

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Asking Price | saved as `price` | Save as `salePrice` | The price filter searches `salePrice`. Seeds already use it; the IN seed values need fixing |
| Asking Price | one label | "Asking Price" for sale, "Premium / Rent" for lease | A lease ad prices the premium or the rent, not the business |
| Ownership | one list for all markets | Rename Legal Structure. IN: Sole Proprietorship, Partnership, Private Limited, LLP. GB: Sole Trader, Partnership, Limited Company, LLP. SG: Sole Proprietorship, Partnership, Pte Ltd, LLP. Plus Other | Each market names its company types differently |

## New fields to add

Business For Sale can add 11 fields with no new field types.

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Listing Type | select | For Sale, For Lease | All | Yes | Backs the Action filter; the sub is called Sale / Lease but can't say lease |
| Business Type | select | F&B, Retail, E-commerce, Services, Manufacturing, Healthcare, Education, Tech, Other | All | Yes | Backs the Business Type filter |
| Listed By | select | Owner, Broker | All | Yes | Every seed is a broker; buyers want to know |
| Annual Turnover | currency | Amount | All | No | Backs the Annual Revenue filter; every GB seed states it |
| Net Profit | currency | Amount per year | All | No | The second question every buyer asks |
| Staff | number | 0–10,000 | All | No | Backs the Staff Size filter (0 = Solo) |
| Years Established | number | 0–200 | All | No | Seeds say "3 Years Old" in the title |
| Premises | select | Leasehold, Freehold, Home-based, Online only | All | No | Changes the deal; the online agency seed has no premises |
| Lease Remaining | text | e.g. "3 years, £22K pa" | All | No | Shown when Premises is Leasehold |
| Included in Sale | multiselect | Stock, Equipment, Licences, Staff, Client base, Website / Domain, IP | All | No | Seeds list licences, systems and client base |
| Reason for Sale | text | Max 100 characters | All | No | Every GB seed gives one |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [ ] Save Asking Price as `salePrice` so the price filter finds new posts
- [ ] Add Listing Type (For Sale / For Lease, required) and wire the Action filter
- [ ] Price label changes to Premium / Rent when Listing Type is For Lease
- [ ] Rename Ownership to Legal Structure, with each market's company types
- [ ] Add Business Type (required) and wire the Business Type filter
- [ ] Add Listed By (Owner, Broker; required)
- [ ] Add Annual Turnover and wire the Annual Revenue filter, with per-market bands (IN in Lakh / Crore)
- [ ] Add Net Profit
- [ ] Add Staff and wire the Staff Size filter
- [ ] Add Years Established
- [ ] Add Premises, plus Lease Remaining when Leasehold
- [ ] Add Included in Sale
- [ ] Add Reason for Sale
- [ ] Backfill the 7 seed posts: fix IN prices (Lakh to full rupees) and fill details from their mock listings

## Built — 26 Oct 2026

All 14 items are built in IN, GB and SG (commit 316fe67). Where the build differs from the suggestion:

- The form can't relabel a field, so Price stays one field with the hint "For a lease, the premium or the rent". A lease ad then picks Price Per: One-off premium or Per month.
- Annual Revenue bands: IN shows < 25 Lakh, 25 Lakh – 1 Crore, 1 – 5 Crore, 5 Crore+; GB and SG keep the 100k bands.
- Existing posts: all 7 seeds got Listing Type, Listed By and Business Type, plus turnover, staff, premises and reason for sale where the mock listing gave them. The IN prices are fixed (₹35 Lakh now ₹3,500,000). Checked on the DB: For Sale + F&B finds the 3 cafés; Staff = Solo finds the GB laundromat.
