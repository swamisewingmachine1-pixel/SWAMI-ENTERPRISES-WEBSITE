// Plain-Node smoke tests for the agent-readiness fixes (no test framework in this
// project — see package.json). Run with: node tests/agent-readiness.test.js
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');

let failures = 0;
function test(name, fn) {
  try { fn(); console.log('  ok - ' + name); }
  catch (e) { failures++; console.error('  FAIL - ' + name + '\n    ' + e.message); }
}

console.log('vercel.json');
test('is valid JSON and has the markdown negotiation rewrite first', () => {
  const cfg = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8'));
  const first = cfg.rewrites[0];
  assert.strictEqual(first.destination, '/api/markdown');
  assert.ok(first.has && first.has[0].key === 'Accept');
  assert.ok(cfg.rewrites.some(r => r.source === '/contact'));
  assert.ok(cfg.rewrites.some(r => r.source === '/privacy'));
});
test('has a Vary header rule covering all routes', () => {
  const cfg = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8'));
  const rule = cfg.headers.find(h => h.headers.some(x => x.key === 'Vary'));
  assert.ok(rule, 'no Vary header rule found');
  const varyHeader = rule.headers.find(x => x.key === 'Vary');
  assert.ok(varyHeader.value.includes('Accept'));
});

console.log('route-manifest.json');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'route-manifest.json'), 'utf8'));
test('covers every static route also present in vercel.json', () => {
  const cfg = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8'));
  const staticRoutes = cfg.rewrites
    .filter(r => r.destination === '/Home.dc.html' && !r.source.includes(':'))
    .map(r => r.source);
  for (const r of staticRoutes) assert.ok(manifest[r], 'missing manifest entry for ' + r);
});
test('has an entry for every machine and accessory page', () => {
  const html = fs.readFileSync(path.join(root, 'Home.dc.html'), 'utf8');
  const idCount = (html.match(/\n\s*id: '(jack|ge-|gb-)/g) || []).length;
  assert.ok(Object.keys(manifest).length >= idCount, 'manifest has fewer entries than catalog items');
});
test('every entry has non-empty title, description, and markdown', () => {
  for (const [route, entry] of Object.entries(manifest)) {
    assert.ok(entry.title && entry.title.length > 0, route + ' missing title');
    assert.ok(entry.description && entry.description.length > 0, route + ' missing description');
    assert.ok(entry.markdown && entry.markdown.length > 20, route + ' markdown too short');
  }
});

console.log('api/markdown.js');
function fakeRes() {
  const res = { statusCode: 200, headers: {}, body: '' };
  res.setHeader = (k, v) => { res.headers[k] = v; };
  res.end = (b) => { res.body = b || ''; };
  return res;
}
test('returns 200 text/markdown with Vary header for a known route', async () => {
  const handler = require(path.join(root, 'api', 'markdown.js'));
  const req = { url: '/about' };
  const res = fakeRes();
  await handler(req, res);
  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(res.headers['Content-Type'], 'text/markdown; charset=utf-8');
  assert.strictEqual(res.headers['Vary'], 'Accept, Accept-Encoding');
  assert.ok(res.body.includes('Swami Enterprises'));
});
test('returns 200 for a machine detail route with real specs', async () => {
  const handler = require(path.join(root, 'api', 'markdown.js'));
  const req = { url: '/machines/jack-f6' };
  const res = fakeRes();
  await handler(req, res);
  assert.strictEqual(res.statusCode, 200);
  assert.ok(res.body.includes('JACK F6'));
  assert.ok(res.body.includes('Needle'));
});
test('returns a real 404 with a markdown recovery body for an unknown path', async () => {
  const handler = require(path.join(root, 'api', 'markdown.js'));
  const req = { url: '/this-path-does-not-exist' };
  const res = fakeRes();
  await handler(req, res);
  assert.strictEqual(res.statusCode, 404);
  assert.strictEqual(res.headers['Content-Type'], 'text/markdown; charset=utf-8');
  assert.ok(res.body.includes('llms.txt'));
  assert.ok(res.body.includes('sitemap.xml'));
});
test('normalizes a trailing slash to the same entry as without one', async () => {
  const handler = require(path.join(root, 'api', 'markdown.js'));
  const req = { url: '/about/' };
  const res = fakeRes();
  await handler(req, res);
  assert.strictEqual(res.statusCode, 200);
});

console.log('404.html');
test('exists and mentions recovery links', () => {
  const body = fs.readFileSync(path.join(root, '404.html'), 'utf8');
  assert.ok(body.includes('llms.txt'));
  assert.ok(body.includes('sitemap.xml'));
  assert.ok(body.includes('/machines'));
});

console.log('llms.txt');
test('has a literal "When to Use This" agent-instructions section', () => {
  const body = fs.readFileSync(path.join(root, 'llms.txt'), 'utf8');
  assert.ok(/## When to Use This/i.test(body));
  assert.ok(/Not a fit/i.test(body));
});

console.log('agent-instructions.txt');
test('exists as a standalone file with the same when-to-use guidance', () => {
  const body = fs.readFileSync(path.join(root, 'agent-instructions.txt'), 'utf8');
  assert.ok(/## When to Use This/i.test(body));
  assert.ok(body.includes('Request a Bulk Quote'));
  assert.ok(body.includes('swamienterprises.online/llms.txt'));
});
test('is referenced from Home.dc.html via <link rel="agent-instructions">', () => {
  const homeHtml = fs.readFileSync(path.join(root, 'Home.dc.html'), 'utf8');
  assert.ok(homeHtml.includes('<link rel="agent-instructions" href="https://swamienterprises.online/agent-instructions.txt">'));
});
test('agent-instructions.js is the single source shared by both outputs', () => {
  const shared = fs.readFileSync(path.join(root, 'scripts', 'agent-instructions.js'), 'utf8');
  const llms = fs.readFileSync(path.join(root, 'llms.txt'), 'utf8');
  const standalone = fs.readFileSync(path.join(root, 'agent-instructions.txt'), 'utf8');
  assert.ok(shared.includes('## When to Use This'));
  assert.ok(llms.includes('Buying a JACK industrial sewing machine'));
  assert.ok(standalone.includes('Buying a JACK industrial sewing machine'));
});

console.log('Home.dc.html');
const homeHtml = fs.readFileSync(path.join(root, 'Home.dc.html'), 'utf8');
test('has html lang attribute', () => {
  assert.ok(/<html lang="en">/.test(homeHtml));
});
test('LocalBusiness/Organization JSON-LD has name, description, and contactPoint', () => {
  const m = homeHtml.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  const data = JSON.parse(m[1]);
  assert.ok(data.name);
  assert.ok(data.description && data.description.length > 20);
  assert.ok(data.contactPoint && data.contactPoint.email && data.contactPoint.contactType);
  assert.ok(data.address);
  assert.ok(Array.isArray(data['@type']) && data['@type'].includes('Organization'));
  assert.ok(Array.isArray(data.alternateName) && data.alternateName.length > 0, 'missing alternateName for brand disambiguation');
  assert.strictEqual(data.foundingDate, '2015');
});
test('has a separate WebSite JSON-LD block for brand disambiguation', () => {
  const blocks = [...homeHtml.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
  const website = blocks.find(b => b['@type'] === 'WebSite');
  assert.ok(website, 'no WebSite JSON-LD block found');
  assert.strictEqual(website.name, 'Swami Enterprises');
  assert.ok(website.alternateName);
  assert.strictEqual(website.url, 'https://swamienterprises.online/');
});
test('dc-runtime script block still parses as valid JS', () => {
  const start = homeHtml.indexOf('<script type="text/x-dc" data-dc-script>');
  const contentStart = homeHtml.indexOf('>', start) + 1;
  const end = homeHtml.indexOf('</script>', contentStart);
  new Function('DCLogic', homeHtml.slice(contentStart, end));
});
test('has real Contact and Privacy views wired into routing', () => {
  assert.ok(/isContact: view === 'contact'/.test(homeHtml));
  assert.ok(/isPrivacy: view === 'privacy'/.test(homeHtml));
  assert.ok(/'\/contact': 'contact'/.test(homeHtml));
  assert.ok(/'\/privacy': 'privacy'/.test(homeHtml));
});
test('link rel="llms.txt" is present', () => {
  assert.ok(homeHtml.includes('<link rel="llms.txt" href="https://swamienterprises.online/llms.txt">'));
});

console.log('sitemap.xml');
test('includes /contact and /privacy', () => {
  const sm = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
  assert.ok(sm.includes('/contact</loc>'));
  assert.ok(sm.includes('/privacy</loc>'));
});

console.log('JACK F6 factual accuracy');
test('does not claim an automatic thread trimmer or automatic presser-foot lift (verified against jack-sewing.com: F6 is the "Basic" model — integrated knife is manual, foot lift is knee-operated; auto-trim is a named upsell on the A2C/A4C)', () => {
  const f6Match = homeHtml.match(/id: 'jack-f6',[\s\S]*?highlightTags: \[[^\]]*\]/);
  assert.ok(f6Match, 'could not find the jack-f6 catalog entry');
  const f6Block = f6Match[0];
  assert.ok(!/automatic thread trimmer/i.test(f6Block), 'F6 block still claims an automatic thread trimmer');
  assert.ok(!/auto (thread trim|presser-foot lift|foot lift)/i.test(f6Block), 'F6 block still claims an auto-trim or auto-lift feature');
  assert.ok(/manual/i.test(f6Block), 'F6 block should describe trimming/foot lift as manual');
});
test('the F6 vs 2002G guide does not claim F6 has an automatic thread trimmer', () => {
  const guideSection = homeHtml.slice(homeHtml.indexOf('GUIDE: JACK F6 VS JACK 2002G'), homeHtml.indexOf('GUIDE: MACHINES FOR A SHIRT FACTORY'));
  assert.ok(!/automatic thread trimmer/i.test(guideSection));
});

console.log('image-slot.js');
test('ignores an unresolved "{{ }}" template placeholder as src instead of fetching it', () => {
  const body = fs.readFileSync(path.join(root, 'image-slot.js'), 'utf8');
  assert.ok(/if \(\/\^\\\{\\\{\.\*\\\}\\\}\$\/\.test\(srcAttr\.trim\(\)\)\) srcAttr = '';/.test(body), 'missing the unresolved-placeholder guard in _render()');
});

if (failures) { console.error('\n' + failures + ' test(s) failed'); process.exit(1); }
console.log('\nAll tests passed');
