<!-- source: https://claude.ai/artifact/Cjp7jgD599BFLsAoC6cCZy -->
# Health & Beauty — Post Form Review To-do

Oct 27, 2026

Health & Beauty has 6 subcategories and 35 live posts in 5 of them (Mental Health & Counselling has none). Five are services and one, Beauty Products, sells items. Every form now asks the Type its filter searches, and every filter reads what the form saves.

## Status — 27 Oct 2026

All 6 subcategories are built and live (commits `590af02` and `3ad83c9`). All 18 live forms (6 × India, UK, Singapore) are synced and match the code, and all 35 seed ads are backfilled. All 278 filter options give the same results on the database and the live site; 63 of them return ads.

- [x] Code: forms, filters, Price Per on cards.
- [x] Checked in code: every filter option is a form option, with the same label, in all 3 markets.
- [x] Backfill dry run: all 35 seed ads found; all 9 Singapore text changes apply.
- [x] Sync the 18 forms.
- [x] Run the backfill.
- [x] Check every filter option on the database and the live site.

## Category-wide issues

These affect every Health & Beauty subcategory. Each one is also in each subcategory's checklist.

| Issue | Before | Fix (built) |
| --- | --- | --- |
| Search filters did nothing | 8 filters across the 6 subcategories, none connected to the database. | Every filter now reads the field the form saves. |
| Type never asked | Every filter searched a Type (Gym / Yoga, Hair / Nails, Doctor / Dentist…); the forms never asked it. | Every form asks Type (Salons: the Services offered). |
| Price filter missed new ads | The form saved the price as `price`; the price filter reads `salePrice`. The seeds use `salePrice`. | The form saves `salePrice`. |
| Prices without a unit | A £30 monthly gym showed as "£30"; a 3-day Ayurveda package as "₹4,500". | New Price Per (per month, class, session, visit, package, or "Starting from"); cards show "£30 / mo", "From £45". |
| Mode values didn't match | The form saved Online / In Person / Both as `online` / `in-person` / `both`; the Format filter searched `inperson` / `online` / `hybrid`. | One Mode (In-person / Online / Both), now required. The Mode filter is on every service sub, and "Both" shows under either. |
| Wellness filter was for products | Wellness filtered Supplements / Vitamins / Protein, but all 7 ads are services (meditation, nutritionist, acupuncture, Ayurveda, massage, retreats). | Wellness Type lists those services. |
| Seed posts were bare | None of the 35 posts had Type, Mode, Condition or provider. 9 Singapore ads were word-for-word copies of India's. | Backfilled from each ad's text; the Singapore copies get a local detail (Tanjong Pagar, Toa Payoh, Tiong Bahru…). |

## To-do by subcategory

- [x] [Fitness Classes & Training](https://claude.ai/artifact/MGeZ1ro6KyCvwDzwewjCCG) — 7 posts. Type, required Mode, Price Per (£30 / mo).
- [x] [Salons & Spas](https://claude.ai/artifact/UWx9LUNRFqnhcykqJ7LJHZ) — 7 posts. Services (pick any), Home Visits.
- [x] [Medical & Therapy](https://claude.ai/artifact/PDRqAknVRaZuZ5MV7JGwRc) — 7 posts. Type with Health Checks and Eye Care, Home Visits; Counselling moved to Mental Health.
- [x] [Beauty Products](https://claude.ai/artifact/LDLtNZW1T4XrswJTTdsM9n) — 7 posts. Type, beauty Condition (New, Sealed…), Expiry Date, Receipt.
- [x] [Wellness & Nutrition](https://claude.ai/artifact/LTp1CUKeTLTDz6jzmoHmNW) — 7 posts. Type rebuilt for services; Condition filter dropped.
- [x] [Mental Health & Counselling](https://claude.ai/artifact/FVmD3642HAM2f5WUDYQiZB) — no posts. Type, shared Mode filter.

## Competitor check (OLX, Gumtree, Carousell)

Checked 2026-10-27.

| Site | What it asks for Health & Beauty |
| --- | --- |
| OLX India | Services › Health & Beauty has one filter, Type (Fitness & Wellness, Salon Services, Health & Safety, Others). No price, no mode. Many ads are home salon and mehndi artists. Gyms sit under Sports & Hobbies. |
| Gumtree UK | Service ads have no structured fields: services tags, location, a description and a "Request a quote" button. There is no price. Subcategories we don't have: Tattooing & Piercing, Alternative Therapies, Chiropodists, Make Up Artists. For-sale Health & Beauty filters: Price, Condition, Seller type, Delivery available. |
| Carousell SG | Couldn't be checked directly (Cloudflare bot check). From other sources, listings ask for title, price, condition (5 steps), brand and deal method. |

**Takeaway.** We already ask more than all three: Type, Mode, Home visits, Price per, qualifications, expiry and receipt. The gaps are price on request (Gumtree's default), who a service is for (important for ladies-only salons and gyms in IN and SG), a delivery filter, and a few missing types.

### Recommended: add

- [x] **Price on request** for every service sub. Add "Price on request" to Price Per and make Price optional. The card shows "Price on request".
- [x] **Suitable for**: All / Women only / Men only, on Fitness, Salons & Spas and Wellness. Add a filter too.
- [x] **Free trial / first session free** (yes/no) on every service sub. Add a filter too.
- [x] **Delivery filter** on Beauty Products. It reads the Deal Method the form already saves, so no new field is needed.
- [x] **New types:**
  - Salons: Bridal & Mehndi, Tattoo & Piercing.
  - Wellness: Reiki & Energy Healing.
  - Medical: Podiatry / Chiropody.
- [x] **Languages spoken** on Medical and Mental Health, each market's own list (India: English, Hindi, Tamil, Telugu…; UK: English, Polish, Urdu…; Singapore: English, Mandarin, Malay, Tamil…). Language filter too.

All six built in commit `3ad83c9`. The seed backfill also fills Suitable For (Everyone) and Languages Spoken on the medical seeds.

### Not recommended

- **Seller type (private/business).** This belongs on the account, not the form. Check whether account type already covers it before adding a field.
- **Supplements and medical equipment as product types.** These are regulated in IN and SG, so they need a policy check first.
- **Insurance accepted.** Too UK-specific and low value.
