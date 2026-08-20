# UTM Naming Convention

Use these exactly — the value is consistency, not cleverness. First-touch
UTM is captured automatically by the site (`Home.dc.html`, `sw-utm` in
localStorage) and shown on every lead in `/admin/leads`, so a wrong/
inconsistent value here means wrong attribution there.

| Channel | utm_source | utm_medium | utm_campaign | utm_content |
|---|---|---|---|---|
| Instagram post/story | `instagram` | `social` | short slug, e.g. `jack_a6` | what specifically, e.g. `demo_01`, `story_swipe` |
| YouTube video | `youtube` | `video` | same campaign slug as the product it's about | `demo_01` |
| LinkedIn post | `linkedin` | `social` | `b2b_factory` or product slug | `post_01` |
| WhatsApp broadcast/status | `whatsapp` | `social` | campaign slug | — |
| Email | `email` | `outbound` | campaign slug, e.g. `factory_outreach` | `sequence_01` |
| Google Ads (if ever run) | `google` | `cpc` | ad group name | ad variant |
| Business card / print | `print` | `offline` | — | — |

Rules:
- All lowercase, underscores not spaces or dashes-in-source.
- `utm_campaign` should match across every channel promoting the same
  thing — that's what lets you compare "Instagram vs YouTube for the Jack
  A6 push," not just look at each channel in isolation.
- Don't tag internal links (nav, footer) — only external promotion.
- Full link example:
  `https://swamienterprises.online/machines/jack-a6?utm_source=instagram&utm_medium=social&utm_campaign=jack_a6&utm_content=demo_01`
