<!-- source: https://claude.ai/artifact/B3B1qKNTbgPyX2q6QZQr8x -->
# Jobs — Post Form & Search Changes

Oct 14, 2026

Jobs posts now say how pay is quoted, and every Jobs search filters on the pay field its form saves. All changes are live in IN, GB and SG.

## Post forms

Five Jobs forms changed. New fields are optional; Pay Period starts on the market's usual period.

| Subcategory | Change | Choices | Why |
| --- | --- | --- | --- |
| Full Time | Pay Period added beside Salary | Per hour / Per month / Per year. Starts on Per year in GB, Per month in IN and SG | A salary alone doesn't say whether it's monthly or yearly |
| Wanted | Pay Period added beside Expected Salary | Same as Full Time | Same reason |
| Temporary / Seasonal | Pay Period added beside Pay | Per hour / Per day / Per week / Per month. Starts on Per month | Temporary pay is often hourly or daily |
| Freelance | Engagement added | One-off / Ongoing / Project | Lets the Engagement search filter match |
| Internship | Duration changed from free text to a choice | 1, 2, 3, 6 or 12 months | Lets the Duration search filter match |

Listings now show the pay period after the salary, e.g. "£36,000 / yr". Older posts have no period and show no suffix. No real posts needed migrating; the existing Jobs posts with pay are seed samples.

## Search filters

Before this change the Jobs price filter did nothing: search only handled Property. Each Jobs search now filters on its own pay field, in the market's currency.

| Search | Filter label | What it compares | Steps (IN · GB · SG) |
| --- | --- | --- | --- |
| Full Time, Temporary / Seasonal, Wanted | Salary per month | Salary converted to a monthly figure from its Pay Period: yearly ÷ 12, weekly × 52 ÷ 12, hourly and daily assume a 40-hour, 5-day week. No period counts as monthly | ₹5,000 – ₹10 L · £500 – £15,000 · S$500 – S$30,000 |
| Part Time | Pay per hour | Hourly rate as entered (hours vary too much for a monthly figure) | ₹50 – ₹2,000 · £5 – £100 · S$5 – S$100 |
| Freelance, Budget Type = Fixed or Any | Budget | Budget as entered | ₹1,000 – ₹10 L · £50 – £50,000 · S$50 – S$50,000 |
| Freelance, Budget Type = Hourly | Budget per hour | Hourly budgets only | Same as Part Time |
| Internship | Stipend per month | Stipend as entered | ₹2,000 – ₹1 L · £200 – £3,000 · S$200 – S$4,000 |

Other Jobs filters that now work:

- Freelance **Budget Type** (Any / Fixed / Hourly) is new, so a price range compares like with like.
- Freelance **Engagement** (One-off / Ongoing / Project) matches the form's new Engagement field.
- Internship **Stipend** (Paid / Unpaid) matches Stipend Type.
- Internship **Duration**: "3 months" matches up to 3 months, "6 months" and "12 months" match exactly.

Older seed posts that saved pay as a plain salary still match Freelance and Internship price ranges.

## Open items

- [ ] Hourly and daily pay assume a full-time week when converted to monthly. Part-time-hours posts in Full Time or Temporary could rank higher than they should.
- [ ] The other Jobs filters (Field, Experience, Work Arrangement, Temporary Duration) still do nothing; their forms don't save matching values.
- [ ] Older seed posts have no Pay Period, so their salaries count as monthly. Several hold two numbers run together (e.g. 4500055000).
