# First Experiment Plan (not running yet)

## Chosen experiment: CTA wording on the F6 page

**HYPOTHESIS**: "Request a Quote" generates more quote-starts than
"Get Pricing" on the JACK F6 page specifically — the site's highest-
intent, highest-traffic product page once real traffic exists.

Why this one, not a different experiment: it's the cheapest to run (one
text string), the F6 page is the single page most likely to reach
statistical relevance first (it's the featured product), and the
metric it affects (`quote_started`) is already tracked correctly
(confirmed in Phase 5's production validation) — no new instrumentation
needed to run it.

**CONTROL**: "Request a Quote" (current copy)
**VARIANT**: "Get Pricing"
**PRIMARY METRIC**: `quote_started` event rate per `product_view` on
`/machines/jack-f6`
**SECONDARY METRIC**: `generate_lead` rate (does the wording change who
clicks, or also who actually finishes the form)
**SUCCESS CONDITION**: Variant's quote-start rate is meaningfully higher
with enough volume to trust the difference isn't noise (not a fixed
percentage claimed in advance — determine this against actual traffic
once it exists, not a number invented now)
**MINIMUM DATA REQUIREMENT**: at minimum several hundred real
`product_view` events on the F6 page before drawing any conclusion — a
handful of visits is statistical noise, not a result
**WHEN TO START**: only after 2-3 weeks of real production traffic per
the Phase 7 plan — not before. Current traffic is near-zero (mostly
Phase 5's test data); running this now would produce a meaningless
result and risk making a real decision off noise.
