// Curated business-event log, separate from Vercel Analytics. Vercel
// Analytics remains the source of truth for pageviews/full behavioral
// detail — it has no read API on the current plan, so /admin/intelligence
// can't query it directly. This log exists ONLY so the admin dashboard has
// something real to show for demand-side counts (product views, searches,
// compares, WhatsApp/call clicks) without needing a paid analytics API.
// Deliberately NOT logging every event Vercel Analytics already tracks
// (e.g. generic pageviews) — only the handful that matter for business
// intelligence, and the list is capped so a single Redis Cloud free tier
// (30MB) doesn't fill up on a low-traffic site over time.
const { kvRpush, kvLrange, kvLtrim, kvLlen } = require('./_kv');

const ALLOWED = new Set(['product_view', 'search', 'compare_started', 'whatsapp_click', 'call_click', 'quote_started', 'generate_lead', 'finder_started', 'finder_completed']);
const MAX_EVENTS = 5000;
const KEY = 'events:log';

function clean(str, max) { return typeof str === 'string' ? str.trim().slice(0, max) : ''; }

function isAuthorized(req) {
  const expected = process.env.ADMIN_DASHBOARD_PASSWORD;
  if (!expected) return false;
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  return token === expected;
}

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    if (req.method === 'POST') {
      let body = req.body;
      if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
      body = body || {};
      const name = clean(body.name, 40);
      if (!ALLOWED.has(name)) { res.statusCode = 400; return res.end(JSON.stringify({ error: 'Event not in curated list' })); }
      // No PII accepted here at all — only business-context fields.
      const event = {
        name,
        at: new Date().toISOString(),
        machine: clean(body.machine, 60),
        industry: clean(body.industry, 60),
        source: clean(body.source, 40),
        medium: clean(body.medium, 40),
        page: clean(body.page, 200),
      };
      await kvRpush(KEY, JSON.stringify(event));
      const len = await kvLlen(KEY);
      if (len > MAX_EVENTS) await kvLtrim(KEY, len - MAX_EVENTS, -1);
      res.statusCode = 201;
      return res.end(JSON.stringify({ ok: true }));
    }

    if (req.method === 'GET') {
      if (!isAuthorized(req)) { res.statusCode = 401; return res.end(JSON.stringify({ error: 'Unauthorized' })); }
      const raw = (await kvLrange(KEY, 0, -1)) || [];
      const events = raw.map((r) => { try { return JSON.parse(r); } catch (e) { return null; } }).filter(Boolean);
      res.statusCode = 200;
      return res.end(JSON.stringify({ events }));
    }

    res.statusCode = 405;
    return res.end(JSON.stringify({ error: 'Method not allowed' }));
  } catch (e) {
    res.statusCode = 500;
    return res.end(JSON.stringify({ error: e.message || 'Server error' }));
  }
};
