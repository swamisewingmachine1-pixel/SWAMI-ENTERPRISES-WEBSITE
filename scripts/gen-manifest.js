const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'Home.dc.html'), 'utf8');

function grab(varName) {
  const start = html.indexOf(varName + ' = [');
  const arrStart = html.indexOf('[', start);
  let depth = 0, i = arrStart;
  for (; i < html.length; i++) {
    if (html[i] === '[') depth++;
    if (html[i] === ']') { depth--; if (depth === 0) { i++; break; } }
  }
  return new Function('return ' + html.slice(arrStart, i))();
}

const machines = grab('machines');
const golden = grab('goldenEagleProducts');
const grozB = grab('grozBeckertProducts');
const dayang = grab('dayangProducts');
const BASE = 'https://swamienterprises.online';

const manifest = {};

function specsTable(specs) {
  if (!specs || !specs.length) return '';
  return specs.map(s => '| ' + s[0] + ' | ' + s[1] + ' |').join('\n');
}

// ---- Machines ----
for (const m of machines) {
  const brand = m.manufacturer || 'JACK';
  const dealerPhrase = brand === 'JACK' ? 'authorized JACK dealer, New Delhi' : (brand + ' partner, New Delhi');
  let md = '# ' + m.model + '\n\n';
  md += '**Brand:** ' + brand + '  \n**Category:** ' + m.category + '\n\n';
  md += (m.purpose || '') + '\n\n';
  if (m.highlightTags && m.highlightTags.length) {
    md += '## Highlights\n\n' + m.highlightTags.map(t => '- ' + t).join('\n') + '\n\n';
  }
  if (m.specs && m.specs.length) {
    md += '## Specifications\n\n| Spec | Value |\n| --- | --- |\n' + specsTable(m.specs) + '\n\n';
  }
  md += 'Available from Swami Enterprises, ' + dealerPhrase + '. [Request a quote](' + BASE + '/request-quote) or [contact us](' + BASE + '/contact).\n';
  manifest['/machines/' + m.id] = {
    title: m.model + ' — Swami Enterprises',
    description: (m.purpose || '').split('.')[0] + '.',
    markdown: md,
  };
}

// ---- Accessories ----
for (const p of golden.concat(grozB).concat(dayang)) {
  const brand = p.brand || 'Golden Eagle';
  const brandSlug = brand === 'Groz-Beckert' ? 'groz-beckert' : brand === 'DAYANG' ? 'dayang' : 'golden-eagle';
  let md = '# ' + p.name + '\n\n';
  md += '**Brand:** ' + brand + (p.sub ? ('  \n**' + p.sub + '**') : '') + '\n\n';
  md += (p.desc || '') + '\n\n';
  if (p.specs && p.specs.length) {
    md += '## Specifications\n\n| Spec | Value |\n| --- | --- |\n' + specsTable(p.specs) + '\n\n';
  }
  md += 'Genuine ' + brand + ' product, stocked by Swami Enterprises, New Delhi. [Request a quote](' + BASE + '/request-quote) or [contact us](' + BASE + '/contact).\n';
  manifest['/accessories/' + brandSlug + '/' + p.slug] = {
    title: p.name + ' — ' + brand + ' — Swami Enterprises',
    description: p.desc,
    markdown: md,
  };
}

// ---- Guides (transcribed from the real page content) ----
const guides = {
  '/guides/lockstitch-vs-overlock-vs-flatlock': {
    title: 'Lockstitch vs Overlock vs Flatlock: Which Machine for Which Job',
    md: `# Lockstitch vs Overlock vs Flatlock: Which Machine for Which Job

If you're setting up or expanding a production line, this is usually the first real decision: these three machine types do different jobs, and most garments need more than one of them.

## Lockstitch — builds the seam

A lockstitch machine uses two threads that interlock to form a strong, flat seam. This is the machine that actually constructs the garment — the main seams on shirts, trousers, and most woven fabric. It's the standard starting point for a new production line making wovens.

## Overlock — finishes the edge

Overlock (serger) machines use 3–5 threads to sew, trim, and wrap the raw edge of fabric in one pass, stopping it from fraying. On knitwear, side seams and panel joins are typically overlocked, not lockstitched — the stitch itself has built-in stretch, which a lockstitch seam doesn't. If lockstitch builds the garment, overlock finishes it.

## Flatlock — hems and stretch seams

Flatlock machines butt two fabric edges together with no overlap, giving a flat seam that lies smoothly against the skin — the reason it's standard for hemming knitwear (T-shirts, activewear) and for stretch seams that need to move with the fabric. Denim production sometimes uses flatlock for reinforced, high-durability seams.

## A typical knitwear line needs all three

Lockstitch to build, overlock to finish the edges, flatlock to hem — this is normal, not overbuying. A shirt or trouser line making wovens can often start with lockstitch alone and add the others as the work demands it.

Relevant machine: [JACK F6](${BASE}/machines/jack-f6) (lockstitch). See the [full machine range](${BASE}/machines).

[Request a Quote](${BASE}/request-quote) · [Use the Machine Finder](${BASE}/finder)
`,
  },
  '/guides/jack-f6-vs-jack-2002g': {
    title: 'JACK F6 vs JACK 2002G: Which Lockstitch Machine Do You Need',
    md: `# JACK F6 vs JACK 2002G: Which Lockstitch Machine Do You Need

Both are computerized lockstitch machines from JACK. The real difference isn't quality — it's what each one is built to handle.

## JACK F6 — speed, for lighter material

Built-in silent servo motor, up to 5000 stitches per minute, automatic thread trimmer. This is the machine for high-speed, consistent production runs on shirts, wovens, and uniforms — work where speed and stitch consistency matter more than handling very heavy material.

## JACK 2002G — heavier material, larger stitch

Large-hook lockstitch, up to 3000 stitches per minute — slower than the F6, but with a 12mm max stitch length (vs the F6's 5mm) and a heavier DPx17 22# needle. It's positioned for shirts, jeans, non-woven bags, and shoes — material the F6 isn't built for.

## The actual decision

If you're running high-speed shirt/woven production and don't need to handle heavy material, the F6's speed is the advantage. If your line needs to handle heavier fabric, bags, or footwear-adjacent material, the 2002G's stitch length and needle size matter more than the F6's extra speed. This is a material-and-speed tradeoff, not a better-vs-worse comparison.

| Spec | JACK F6 | JACK 2002G |
| --- | --- | --- |
| Max speed | 5000 s.p.m. | 3000 s.p.m. |
| Max stitch length | 5mm | 12mm |
| Needle | DBx1, 11-18# | DPx17, 22# |
| Best for | Shirts, wovens, uniforms | Shirts, jeans, bags, shoes |

[View JACK F6](${BASE}/machines/jack-f6) · [View JACK 2002G](${BASE}/machines/jack-2002g) · [Compare side by side](${BASE}/compare)

[Request a Quote](${BASE}/request-quote)
`,
  },
  '/guides/machines-for-a-shirt-factory': {
    title: 'What Machines Does a Shirt Factory Actually Need',
    md: `# What Machines Does a Shirt Factory Actually Need

Shirts are wovens, not knits — that changes which machines actually matter, compared to a knitwear line.

## The core machine: high-speed lockstitch

Shirt seams — collars, cuffs, body panels, side seams — are lockstitched, not overlocked. A woven fabric doesn't fray the way a knit does, and doesn't need the stretch an overlock/flatlock seam gives. A computerized lockstitch machine built for speed (the JACK F6's 5000 s.p.m., for example) is the actual core of a shirt line.

## What most shirt lines add next

Buttonholing and bartacking are the two operations a pure lockstitch machine doesn't do — both are real, separate operations on a shirt (buttonholes, and reinforcement points like pocket corners). Whether you need dedicated machines for these from day one depends on your actual volume — worth confirming with a Swami specialist for your specific case.

## What a shirt line does NOT need

Overlock and flatlock machines — essential for knitwear — aren't the core need here, since woven shirt fabric doesn't require edge-finishing or stretch seams the way knits do. Don't buy a knitwear-oriented setup for a shirt line.

Relevant reading: [JACK F6](${BASE}/machines/jack-f6) · [Lockstitch vs Overlock vs Flatlock](${BASE}/guides/lockstitch-vs-overlock-vs-flatlock) · [F6 vs 2002G](${BASE}/guides/jack-f6-vs-jack-2002g)

[Request a Quote](${BASE}/request-quote) · [Use the Machine Finder](${BASE}/finder)
`,
  },
  '/guides/industrial-vs-domestic-sewing-machines': {
    title: 'Industrial vs Domestic Sewing Machines: What Actually Changes',
    md: `# Industrial vs Domestic Sewing Machines: What Actually Changes

Not a "better vs worse" question — a domestic machine and an industrial one are built for genuinely different jobs.

## Duty cycle is the real difference

A domestic machine is built to run intermittently — a home user sews for minutes at a time. An industrial machine like the JACK F6 is built to run continuously through an 8+ hour shift, at up to 5000 stitches per minute, without the motor or mechanism degrading. That sustained duty cycle, not the stitch itself, is what separates the two categories.

## Speed and consistency at scale

Industrial machines hold consistent stitch quality at production speed — a domestic machine's stitch quality typically degrades well before it reaches industrial speeds, because it isn't built to sustain them. For a single garment, this barely matters. Across a production run, it's the difference between consistent output and rework.

## When you genuinely need to upgrade

If you're sewing for personal use or very low volume, a domestic machine is genuinely the right tool — not a lesser one. The upgrade point is volume and consistency: once you're running production hours, not occasional sessions, the duty-cycle gap becomes the actual bottleneck, not the sewer's skill.

[View JACK F6](${BASE}/machines/jack-f6) · [Find your machine](${BASE}/finder)

[Request a Quote](${BASE}/request-quote)
`,
  },
  '/guides/machines-for-a-knitwear-line': {
    title: 'What Machines Does a Knitwear Line Actually Need',
    md: `# What Machines Does a Knitwear Line Actually Need

Knitwear is the one category where a single machine genuinely isn't enough — here's why, and what the real sequence looks like.

## Why knits need more than lockstitch

Knit fabric stretches and frays differently from woven fabric. A pure lockstitch seam has no give — on a knit garment it can pucker or snap under stretch. That's why a real knitwear line runs three machine types together, not one.

## Lockstitch — where the seam doesn't need to stretch

Still used for parts of a knit garment that don't flex — attaching labels, some closures. A high-speed lockstitch machine like the JACK F6 covers this role.

## Overlock — the main seam

Side seams and panel joins on knitwear are overlocked, not lockstitched — the stitch itself has built-in stretch and trims/wraps the raw edge in one pass, which is exactly what a knit edge needs. The JACK E4S is a multi-thread overlock machine built for this.

## Interlock/coverstitch — hems that move with the fabric

Hems on T-shirts and activewear need a flat seam that stretches with the body, not a rigid one — that's an interlock/coverstitch job. The JACK W4, a cylinder-bed interlock machine, is built for this specifically.

A real knitwear starting setup: [JACK F6](${BASE}/machines/jack-f6) (lockstitch) · [JACK E4S](${BASE}/machines/jack-e4s) (overlock) · [JACK W4](${BASE}/machines/jack-w4) (interlock)

[Request a Quote](${BASE}/request-quote) · [Compare Machines](${BASE}/compare)
`,
  },
  '/guides/setting-up-a-new-production-line': {
    title: 'Setting Up a New Production Line: The Real Machine Sequence',
    md: `# Setting Up a New Production Line: The Real Machine Sequence

The order that actually matters when you're starting from zero — what to buy first, and what genuinely waits.

## Start with what you're actually making

The starting machine depends entirely on the product, not on what's popular. Shirts and wovens start with a high-speed lockstitch machine alone. Knitwear needs lockstitch, overlock and interlock together from day one — see the knitwear guide for why that's not optional for knits specifically.

## Buy for your real volume, not your hoped-for volume

A single high-speed industrial machine covers real production volume that a domestic machine can't — see the industrial-vs-domestic guide for the actual duty-cycle reasoning. Don't buy a second or third machine of the same type until the first is genuinely the bottleneck.

## What can genuinely wait

Specialized operations — buttonholing, bartacking, dedicated cutting equipment — are real, separate purchases most new lines add once volume justifies a dedicated machine for that one operation, not on day one. Whether that threshold has been reached for your specific plan is exactly the kind of question worth asking a specialist before committing, since it depends on your real numbers, not a general rule.

[Use the Machine Finder](${BASE}/finder) or [talk to a specialist](${BASE}/contact) — this is a production-planning conversation as much as a purchase.

[Request a Quote](${BASE}/request-quote) · [Browse Machines](${BASE}/machines)
`,
  },
};
for (const [p, g] of Object.entries(guides)) {
  manifest[p] = { title: g.title + ' — Swami Enterprises', description: g.title, markdown: g.md };
}

// ---- Static pages (hand-written, real content only) ----
manifest['/'] = {
  title: 'Swami Enterprises — Industrial Sewing Machines & Bulk Spare Parts, Pan-India',
  description: 'Authorized JACK dealer based in Delhi, supplying industrial sewing machines and genuine spare parts to garment factories and bulk buyers across India.',
  markdown: fs.readFileSync(path.join(root, 'llms.txt'), 'utf8'),
};
manifest['/about'] = {
  title: 'About — Swami Enterprises',
  description: 'Swami Enterprises — authorized JACK sewing machine dealer, Chanakya Place, New Delhi, trading since 2015.',
  markdown: `# About Swami Enterprises

Swami Enterprises is a Delhi-based partner for industrial sewing machines and accessories — including JACK, MAQI, Pegasus, JUKI, SINGER, Golden Eagle, Groz-Beckert, and DAYANG — helping people choose, install and maintain the right equipment for how they actually produce. We supply single machines and bulk/wholesale orders to garment factories and buyers across India, not just Delhi-NCR.

## What we do

We help you find the right machine for your work — from JACK — and the right spares and accessories to run it, like genuine Golden Eagle parts, then keep it all running — installation, training, maintenance, technical support and after-sales, all in one place.

## Founder

Dinesh Jaglain, founder of Swami Enterprises: brothers Dinesh and Rajesh Jaglain started Swami Enterprises as a single counter on 30 Feet Road; today, garment units across Chanakya Place call them first when a line goes down. Nothing leaves the shop untested — every machine is checked, threaded and run, then backed with repair, servicing and AMC for as long as it's owned.

## Direct from JACK

Our team meets JACK's factory and leadership directly, including the 2024 JACK India Core Distributors Conference at JACK's headquarters in China — not through a middleman.

[Contact us](${BASE}/contact) · [Request a Quote](${BASE}/request-quote)
`,
};
manifest['/contact'] = {
  title: 'Contact Us — Swami Enterprises',
  description: 'Contact Swami Enterprises — showroom address, phone, WhatsApp and email for our Chanakya Place, New Delhi showroom.',
  markdown: `# Contact Swami Enterprises

Swami Enterprises is a real shop with a physical showroom in Chanakya Place, New Delhi — not a call centre. Every enquiry, whether by phone, WhatsApp, email or in person, is answered by someone who actually knows the machines.

## Showroom address

E-2/73, 30 Feet Road, Block C, Chanakya Place I, New Delhi, 110059, India

## Phone & WhatsApp

+91 99713 36656 · +91 99901 01097

## Email

swamisewingmachine1@gmail.com

## Showroom hours

Monday – Saturday: 9:00 AM – 8:00 PM
Sunday: 9:00 AM – 3:00 PM

[Request a Quote](${BASE}/request-quote)
`,
};
manifest['/privacy'] = {
  title: 'Privacy Policy — Swami Enterprises',
  description: 'Swami Enterprises\u2019 privacy policy \u2014 what information we collect through swamienterprises.online and how it is used.',
  markdown: `# Privacy Policy

Last updated: 2 September 2026

## Who we are

Swami Enterprises is an industrial sewing machine and spare parts dealer based at E-2/73, 30 Feet Road, Block C, Chanakya Place I, New Delhi, 110059, India. This policy covers information collected through swamienterprises.online.

## What we collect, and why

When you submit the Request a Quote form or the contact/message form, we collect the details you type in — name, company name, phone number, email address, city, machine interest and requirements. This is sent to us so a specialist can follow up with you directly, by WhatsApp, phone or email. We don't sell this information or share it with anyone outside Swami Enterprises.

If you click a WhatsApp or Call link, you leave this site and continue the conversation directly on WhatsApp or your phone's dialer — we only see what you choose to send us there.

## Analytics and cookies

We use Vercel Web Analytics for aggregate, anonymized traffic patterns, and Microsoft Clarity for session recordings and heatmaps (Clarity masks sensitive form field content by default). Neither tool is used to identify you personally or to sell data to third parties.

## No online payments

This site does not process payments, and we never ask for card, bank or UPI details through a web form. All orders and payments are handled directly with our team, by phone, WhatsApp or in person at the showroom.

## Your choices

To ask what information we hold about you, or to have it deleted, email swamisewingmachine1@gmail.com or call +91 99713 36656.

[Contact Us](${BASE}/contact)
`,
};
manifest['/after-sales-service'] = {
  title: 'After-Sales Service — Swami Enterprises',
  description: 'Installation, training, maintenance, genuine spare parts, technical support and AMC — after-sales service from Swami Enterprises.',
  markdown: `# After-Sales Service

Every machine from Swami Enterprises comes with installation, training, maintenance, genuine spare parts, technical support and after-sales service.

- **Installation** — delivered, threaded, tested and running on your floor, ready on day one.
- **Training** — operators trained on the machine so it runs correctly from the first shift.
- **Maintenance & AMC** — on-site AMC and scheduled upkeep in Delhi to keep downtime short.
- **Genuine Spare Parts** — stocked direct for JACK machines, plus Golden Eagle and Groz-Beckert accessories and DAYANG cutting machines.
- **Technical Support** — direct access to people who know the machines.
- **After-Sales** — support continues after delivery.

[Contact us](${BASE}/contact) for service-area and warranty details for your location.
`,
};
manifest['/request-quote'] = {
  title: 'Request a Quote — Swami Enterprises',
  description: 'Request a quote from Swami Enterprises — authorized JACK dealer, New Delhi.',
  markdown: `# Request a Quote

Tell Swami Enterprises what you need and a specialist reviews every request personally — no automated quotes. Expect a reply on WhatsApp or by phone, usually the same day.

The form collects: full name, company name (optional), phone/WhatsApp, email (optional), city, industry, machine(s) of interest, quantity required, timeline, and any additional requirements.

Or call +91 99713 36656 / +91 99901 01097 directly, or see the [full contact page](${BASE}/contact).
`,
};
manifest['/machines'] = {
  title: 'Machines — Swami Enterprises',
  description: 'The full industrial sewing machine range stocked by Swami Enterprises.',
  markdown: `# Machines

The full industrial sewing machine range stocked by Swami Enterprises — ${machines.length} models across JACK, MAQI, Pegasus, JUKI and SINGER, covering lockstitch, overlock, interlock/coverstitch and bartack machines. See [llms.txt](${BASE}/llms.txt) for the complete list with links, or [request a quote](${BASE}/request-quote) for a specific model.
`,
};
manifest['/accessories'] = {
  title: 'Accessories & Spare Parts — Swami Enterprises',
  description: 'Genuine accessories, spare parts and cutting machines from Golden Eagle, Groz-Beckert and DAYANG, stocked by Swami Enterprises.',
  markdown: `# Accessories & Spare Parts

Genuine accessories, spare parts and cutting machines from Golden Eagle, Groz-Beckert and DAYANG — needles, blades, presser feet, thread cutters, bobbins, hooks, folders, fabric cutting machines and more. See [Golden Eagle products](${BASE}/accessories/golden-eagle), [Groz-Beckert needles](${BASE}/accessories/groz-beckert) and [DAYANG cutting machines](${BASE}/accessories/dayang), or the full list in [llms.txt](${BASE}/llms.txt).
`,
};
manifest['/accessories/golden-eagle'] = {
  title: 'Golden Eagle Accessories — Swami Enterprises',
  description: 'Genuine Golden Eagle spares and accessories, stocked by Swami Enterprises.',
  markdown: `# Golden Eagle Accessories

${golden.length} genuine Golden Eagle spares and accessories stocked by Swami Enterprises — needles, cutting blades, abrasive belts, presser feet, bobbins, hooks and folders. See [llms.txt](${BASE}/llms.txt) for the full list with links.
`,
};
manifest['/accessories/groz-beckert'] = {
  title: 'Groz-Beckert Needles — Swami Enterprises',
  description: 'Genuine Groz-Beckert industrial sewing machine needles, stocked by Swami Enterprises.',
  markdown: `# Groz-Beckert Needles

Genuine Groz-Beckert industrial sewing machine needles, stocked by Swami Enterprises, including real needle-system compatibility matching to machines we sell. See [llms.txt](${BASE}/llms.txt) for the full list with links.
`,
};
manifest['/accessories/dayang'] = {
  title: 'DAYANG Cutting Machines — Swami Enterprises',
  description: 'Round-knife fabric cutting machines from DAYANG, stocked by Swami Enterprises.',
  markdown: `# DAYANG Cutting Machines

Round-knife fabric cutting machines from DAYANG (Zhejiang DAYANG Sewing Machine Co., Ltd), stocked by Swami Enterprises, New Delhi — a DAYANG stocking partner, not an authorized distributor. See [llms.txt](${BASE}/llms.txt) for the full list with links.
`,
};
manifest['/industries'] = {
  title: 'Industries — Swami Enterprises',
  description: 'What Swami Enterprises\u2019 machines are used for \u2014 shirts, uniforms, denim, knitwear, bags and technical sewing.',
  markdown: `# Industries

What Swami Enterprises' machines are used for — shirts, uniforms, denim, knitwear, bags and technical sewing. See the [buying guides](${BASE}/guides/lockstitch-vs-overlock-vs-flatlock) for which machine type fits which product, or [browse machines](${BASE}/machines).
`,
};
manifest['/solutions'] = {
  title: 'Solutions — Swami Enterprises',
  description: 'Installation, training, maintenance, spare parts and technical support from Swami Enterprises.',
  markdown: `# Solutions

We don't just sell machines — installation, training, maintenance, spare parts and technical support from Swami Enterprises. See [After-Sales Service](${BASE}/after-sales-service) for details.
`,
};
manifest['/finder'] = {
  title: 'Find Your Machine — Swami Enterprises',
  description: 'A short, honest questionnaire based on Swami Enterprises\u2019 verified machine data to find the right machine for your production.',
  markdown: `# Find Your Machine

A short, honest questionnaire based on Swami Enterprises' verified machine data to help find the right machine for your production. Use the interactive finder at ${BASE}/finder, or [request a quote](${BASE}/request-quote) and describe what you make directly.
`,
};
manifest['/compare'] = {
  title: 'Compare Machines — Swami Enterprises',
  description: 'Compare sewing machines side by side \u2014 real, verified specifications from Swami Enterprises.',
  markdown: `# Compare Machines

Compare machines side by side using real, verified specifications from Swami Enterprises. Use the interactive comparison tool at ${BASE}/compare, or see [llms.txt](${BASE}/llms.txt) for full specs on every model.
`,
};
manifest['/industrial-sewing-machines'] = {
  title: 'Industrial Sewing Machines Built for Serious Production — Swami Enterprises',
  description: 'Genuine JACK industrial sewing machines for garment manufacturers, tailoring businesses, factories and workshops.',
  markdown: `# Industrial Sewing Machines Built for Serious Production

Genuine JACK industrial sewing machines for garment manufacturers, tailoring businesses, factories and workshops. Get expert guidance choosing the right machine — authorized JACK dealer, New Delhi. [Browse machines](${BASE}/machines) or [request a quote](${BASE}/request-quote).
`,
};

fs.writeFileSync(path.join(root, 'route-manifest.json'), JSON.stringify(manifest, null, 0));
console.log('wrote route-manifest.json with ' + Object.keys(manifest).length + ' routes, ' + fs.statSync(path.join(root, 'route-manifest.json')).size + ' bytes');
