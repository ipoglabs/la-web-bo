<!-- source: https://claude.ai/artifact/JCHMbRB9rMVHwMq5X2cpGc -->
# Services › Creative Services — Post Form Review

Oct 22, 2026

The Creative Services form is the same in IN, GB and SG. The biggest gaps: it has no posts at all, Service Type doesn't match the Service filter, and there's no portfolio link.

## Current fields

The Creative Services form has 8 fields today. 4 are required: Adv Title, Adv Details, Service Type and Price.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Adv Title | name | text | Yes | Max 100 characters |
| 2 | Adv Details | description | richtext | Yes | Max 2000 characters |
| 3 | Good To Know | goodToKnow | goodToKnow | No | Seller's own label / value points |
| 4 | Service Type | serviceType | select | Yes | Graphic Design, Photography, Videography, Writing, Music & Audio, Web Design, Other |
| 5 | Skills / Tools | skills | tags | No | Type your own |
| 6 | Rate Type | rateType | select | No | Hourly, Per Project, Per Day |
| 7 | Price | price | currency | Yes | Min 1, half width |
| 8 | Availability | availability | text | No | Max 200 characters, Placeholder "e.g. Mon–Sat, 9am–6pm", half width |

There are no Creative Services posts yet, not even seed samples.

The search offers Service and How filters. Neither works today: the Service filter (id creative\_type) offers Video Editing, Copywriting and Social Media, which the form doesn't, and the form offers Writing, Music & Audio and Web Design, which the filter doesn't.

## Field type changes

3 existing fields should change. The most important: Price saves to the field search reads, so the price filter works.

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Price | saved as `price` | Save as `salePrice`, the field listing prices and the price filter read | The price filter searches `salePrice`, so new posts would never match it. There are no posts yet, so nothing needs migrating |
| Service Type | 7 choices | Photography, Videography, Video Editing, Graphic Design, Copywriting, Social Media, Music & Audio, Web Design, Other | Covers both the form's and the Service filter's values |
| Rate Type | Hourly, Per Project, Per Day | Hourly, Per day, Per project, Per event | Photographers and videographers price per event |

## New fields to add

Creative Services can add 4 fields with no new field types.

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Listed By | select | Freelancer, Studio / Agency | All | Yes | Clients choose between one person and a team |
| Portfolio Link | text (web link) | — | All | No | Creative work is hired on past work; buyers ask for it first |
| Occasions | multiselect | Wedding, Events, Portrait, Product, Real Estate, Corporate | All | No | Shown for Photography and Videography; the main way buyers narrow them down |
| Service Mode | multiselect | On location, Studio, Remote | All | No | The How search filter has nothing to match today |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [x] Save Price as `salePrice` so the price filter finds new posts
- [x] Service Type covering the form's and the filter's values
- [x] Rate Type adds Per event
- [x] Add Listed By (required)
- [x] Add Portfolio Link (web link)
- [x] Add Occasions (Photography / Videography)
- [x] Add Service Mode
- [x] Wire the Service and How filters (search only)
- [x] Add seed posts (IN 2, GB 3, SG 2) like the other subcategories

## Built — 22 Oct 2026

All 9 ticked items are live in IN, GB and SG (commit 74d37e8). Where the build differs from the suggestion:

- Service Mode's On location, Studio and Remote are saved as the How filter's Home Visit, In-person and Online.
- The Service search filter gained Music & Audio, Web Design and Other.
- Listings show the price as "/ hr", "/ day", "/ project" or "/ event" from Rate Type.
- Seed posts: 7 new posts (IN: Mumbai wedding photographer, Bengaluru logo designer; GB: London wedding videographer, freelance copywriter, Manchester product photography; SG: corporate event photographer, video editor), each owned by a new mock seller account. They were added straight to the database by scripts/seed-creative-services-posts.ts, not to the mock catalog files.
