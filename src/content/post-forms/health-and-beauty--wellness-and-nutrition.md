<!-- source: https://claude.ai/artifact/LTp1CUKeTLTDz6jzmoHmNW -->
# Health & Beauty › Wellness & Nutrition — Post Form Review

Oct 27, 2026

Meditation classes, nutritionists, acupuncture, Ayurveda, massage and retreats. Every live ad is a service, but the filter searched supplements and vitamins with a Condition, so no ad could match.

## Posts

7 live: the UK has 3 (Soho meditation £15/class, nutritionist £80, Greenwich acupuncture £70), India has 2 Ananda ads (3-day Panchakarma ₹4,500, deep tissue massage ₹1,800) and Singapore 2 (Sentosa retreat S$320, deep tissue massage S$120, a copy of India's).

## Form changes

| Field | Before | After |
| --- | --- | --- |
| Type | — | Required: Meditation & Mindfulness / Nutrition & Diet / Massage Therapy / Ayurveda & Traditional / Acupuncture / Retreats / Other — same as the filter |
| Mode | Optional | Required: In-person / Online / Both |
| Price | Saved as `price` | Saved as `salePrice`, plus Price Per: session / class / package / person / starting from |
| Kept |  | Provider, Qualifications, Availability |

## Filters

Type (rebuilt for services), Mode (replaces Condition) and price — all now connected.

## Checklist

- [x] Rebuild the Type filter around the services sellers post; add Type (required) to the form.
- [x] Drop the Condition filter; add Mode.
- [x] Save the price as `salePrice` and add Price Per (category-wide).
- [x] Backfill Type, Mode, Price Per, qualifications and provider on the 7 seeds; give the Singapore massage copy a local detail.
