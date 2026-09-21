// Generates sitemap.xml from the same data arrays gen-llms.js/gen-manifest.js read, plus a
// fixed list of static routes — so a new machine/accessory/location can never again go missing
// from the sitemap the way /accessories once did. Existing <lastmod> dates are preserved for
// any URL that was already listed (an editorial signal we don't want to reset to "today" just
// because the generator ran); only genuinely new URLs get today's date. Product pages also get
// a real <image:image> entry (their own actual photo) for Google Images indexing — no stock or
// placeholder images, and pages with no real photo of their own (locations, guides) get none.
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'Home.dc.html'), 'utf8');
const BASE = 'https://swamienterprises.online';

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
const locations = grab('locations');

const existing = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const existingDates = {};
for (const m of existing.matchAll(/<loc>(https:\/\/swamienterprises\.online[^<]*)<\/loc><lastmod>([^<]*)<\/lastmod>/g)) {
  existingDates[m[1]] = m[2];
}
const today = new Date().toISOString().slice(0, 10);
function dateFor(url) { return existingDates[url] || today; }

const entries = [];
function add(urlPath, imageUrl) {
  const url = BASE + urlPath;
  entries.push({ url, lastmod: dateFor(url), image: imageUrl ? BASE + '/' + imageUrl : null });
}

// ---- Static pages ----
add('/');
add('/machines');
add('/finder');
add('/compare');
add('/industries');
add('/solutions');
add('/about');
add('/contact');
add('/locations');
for (const loc of locations) add('/locations/' + loc.slug);
add('/privacy');
add('/request-quote');
add('/start-a-project');
add('/after-sales-service');
add('/accessories');
add('/accessories/golden-eagle');
add('/accessories/groz-beckert');
add('/accessories/dayang');
add('/industrial-sewing-machines');
const guideSlugs = [
  'lockstitch-vs-overlock-vs-flatlock',
  'jack-f6-vs-jack-2002g',
  'machines-for-a-shirt-factory',
  'industrial-vs-domestic-sewing-machines',
  'machines-for-a-knitwear-line',
  'setting-up-a-new-production-line',
];
for (const slug of guideSlugs) add('/guides/' + slug);

// ---- Machines (with their own real photo) ----
for (const m of machines) add('/machines/' + m.id, m.imgSrc);

// ---- Accessories (with their own real photo) ----
for (const p of golden) add('/accessories/golden-eagle/' + p.slug, p.src);
for (const p of grozB) add('/accessories/groz-beckert/' + p.slug, p.src);
for (const p of dayang) add('/accessories/dayang/' + p.slug, p.src);

const lines = ['<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">'];
for (const e of entries) {
  if (e.image) {
    lines.push(`<url><loc>${e.url}</loc><lastmod>${e.lastmod}</lastmod><image:image><image:loc>${e.image}</image:loc></image:image></url>`);
  } else {
    lines.push(`<url><loc>${e.url}</loc><lastmod>${e.lastmod}</lastmod></url>`);
  }
}
lines.push('</urlset>', '');

fs.writeFileSync(path.join(root, 'sitemap.xml'), lines.join('\n'));
console.log('wrote sitemap.xml with ' + entries.length + ' URLs (' + entries.filter(e => e.image).length + ' with image tags)');
