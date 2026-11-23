<!-- source: https://claude.ai/artifact/VzSyyAhD7aE2pKd1JmVFCJ -->
# Community › Classes — Post Form Review

Oct 26, 2026

Classes asks a free-text subject, a level, a mode and a fee. The sidebar filters on a fixed subject list and a mode, and neither matches what the form saves.

## Current fields

The form is the same in IN, GB and SG.

| # | Label | Key | Type | Required | Options / notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Title | `name` | text | Yes |  |
| 2 | Description | `description` | richtext | Yes |  |
| 3 | Good To Know | `goodToKnow` | goodToKnow | No |  |
| 4 | Subject | `subject` | text | Yes | Free text |
| 5 | Level | `level` | select | No | Beginner, Intermediate, Advanced, All Levels |
| 6 | Mode | `mode` | select | No | Online, In Person (saved `offline`), Hybrid |
| 7 | Fee | `price` | currency | No | Min 0 |

No posts yet in any country. The GB language exchange and skill-share seeds sit in Events and General instead.

The sidebar has 2 filters: Subject (Music, Art, Dance, Fitness, Language, Cooking, Academic, Other) and Mode (In Person, Online). Neither does anything today, there is no price filter, and Mode has no Hybrid.

Classes sits close to **Classes & Courses** next door, Services › Education & Learning (paid tutors) and Business › Training. The split that works: Classes is a local, ongoing class anyone can join; Classes & Courses is a fixed course with a certificate.

## Field type changes

| Field | Today | Suggested | Why |
| --- | --- | --- | --- |
| Subject | text | select: Music, Art, Dance, Fitness, Language, Cooking, Academic, Other | Matches the Subject filter |
| Mode | Saves `offline` | Format: In Person, Online, Hybrid, saved `inperson` | Matches the filter; filter gains Hybrid |
| Fee | Saved as `price` | Saved as `salePrice` | Turns the price filter on |

## New fields to add

| Suggested field | Type | Options | Countries | Required | Why |
| --- | --- | --- | --- | --- | --- |
| Fee Per | select | Class, Month, Term, Course | All | No | "£12" alone doesn't say per what; shows on the card as "/ class" |
| Schedule | text | e.g. Tuesdays 6 pm | All | No | The first thing people ask |
| Age Group | select | Kids, Teens, Adults, All Ages | All | No | Kids' classes otherwise drift to Child & Family |

## Decisions needed

Tick the ones to build. Unticked items stay as they are today.

- [ ] Keep Classes as its own sub (ongoing local classes), separate from Classes & Courses
- [ ] Subject becomes a select, matched to the filter
- [ ] Mode becomes Format (In Person, Online, Hybrid); filter gains Hybrid
- [ ] Save Fee as `salePrice` and turn the price filter on
- [ ] Add Fee Per
- [ ] Add Schedule
- [ ] Add Age Group
- [ ] Wire the Subject and Format filters
