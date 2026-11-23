<!-- source: https://claude.ai/artifact/QCC5YpXaNzkFA3gR2qAoE8 -->
# Special Offers › Health & Wellness — Post Form Review

Oct 27, 2026

Gym, spa, yoga and online GP offers. Before this review the form asked Fitness / Nutrition / Therapy while the filter searched Gym / Spa / Salon / Dental, so no offer could match.

## Posts

7 live: the UK has 3 (gym £19.99/month, was £35; spa day £45, was £110; free first online GP consultation), India has 2 Cult.fit offers (3 months free, 50% off yoga) and Singapore the same 2 from Fitness First. 5 had a % or a count in `salePrice`.

## Form changes

| Field | Before | After |
| --- | --- | --- |
| Type | Category: Fitness / Nutrition / Mental Health / Wellness Products / Therapy / Other | Type (required): Gym / Yoga & Fitness Classes / Spa & Massage / Salon / Dental / Optical / Pharmacy / Medical / Mental Health / Other — same as the filter |
| Redeem At | — | Required, and the Redeem At filter is connected |
| Deal Type, Discount %, Valid Until, Offer Price | See the To-do | Category-wide changes; "Was" carries the gym's £35 and the spa's £110 |
| Kept |  | Provider, Mode, Certifications, Coupon, Link, Terms |

## Filters

Type, Deal Type, Redeem At, Min Discount and price — all now connected.

## Checklist

- [x] Type (required) with the filter's values, adding Yoga & Fitness Classes; connect the Type filter.
- [x] Add Redeem At and connect its filter.
- [x] Add Deal Type (required) and connect the filter (category-wide).
- [x] Add Discount % and connect Min Discount (category-wide).
- [x] Save Offer Price as `salePrice` with "Was"; make Valid Until required (category-wide).
- [x] Backfill Type, Deal Type, Discount, Was, Mode and Valid Until on the 7 seeds; remove the wrong prices.
