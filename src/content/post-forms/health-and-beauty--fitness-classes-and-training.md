<!-- source: https://claude.ai/artifact/MGeZ1ro6KyCvwDzwewjCCG -->
# Health & Beauty › Fitness Classes & Training — Post Form Review

Oct 27, 2026

Gyms, yoga studios, CrossFit boxes and personal trainers. Buyers filter by type of training first. Before this review the form never asked Type, and prices showed without "/ month".

## Posts

7 live: the UK has 3 IronCore Fitness ads (gym £30/month, hot yoga £75/month, CrossFit £120/month), India has 2 FitZone ads (gym ₹2,500, morning yoga ₹1,200) and Singapore copies of the 2 India ads.

## Form changes

| Field | Before | After |
| --- | --- | --- |
| Type | — | Required: Gym / Yoga / Pilates / CrossFit / Personal Trainer / Group Classes / Martial Arts / Dance Fitness / Other — same as the filter |
| Mode | Online / In Person / Both, optional | Required: In-person / Online / Both |
| Price | Saved as `price` | Saved as `salePrice`, plus Price Per: month / class / session / package / starting from |
| Kept |  | Provider, Qualifications, Availability |

## Filters

Type (Group Classes, Martial Arts and Dance Fitness added), Mode (new) and price — all now connected.

## Checklist

- [x] Add Type (required) and connect the Type filter.
- [x] Make Mode required with the filter's values; add the Mode filter.
- [x] Save the price as `salePrice` and add Price Per (category-wide).
- [x] Backfill Type, Mode, Price Per and provider on the 7 seeds; give the 2 Singapore copies a local detail.
