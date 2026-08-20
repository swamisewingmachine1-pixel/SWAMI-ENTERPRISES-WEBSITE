// Internal growth workspace: SEO opportunities, content briefs, customer
// questions, and prospects. All admin-only (same ADMIN_DASHBOARD_PASSWORD
// as leads), all just structured note-taking — there is no scoring, no
// scraping, no auto-generated content here. The value is entirely in what
// the owner types in over time; this just gives it a real, queryable home
// instead of scattered notes.
const { kvSet, kvGet, kvRpush, kvLrange } = require('./_kv');

const KINDS = {
  opportunity: {
    fields: ['opportunity', 'intent', 'product', 'industry', 'location', 'competition', 'commercialIntent', 'existingPage', 'priority', 'status', 'notes'],
    statuses: ['IDEA', 'RESEARCHING', 'READY', 'BUILDING', 'PUBLISHED', 'MEASURING', 'IMPROVE'],
  },
  brief: {
    fields: ['title', 'intent', 'audience', 'product', 'industry', 'location', 'questions', 'requiredInfo', 'internalLinks', 'cta', 'status'],
    statuses: ['IDEA', 'RESEARCHING', 'READY', 'WRITING', 'PUBLISHED'],
  },
  question: {
    fields: ['question', 'source', 'industry', 'product', 'location', 'intent', 'frequency', 'commercialValue', 'status'],
    statuses: ['UNVALIDATED', 'VALIDATED', 'CONTENT_BRIEFED', 'PUBLISHED'],
  },
  prospect: {
    fields: ['company', 'industry', 'city', 'website', 'contactRole', 'source', 'status', 'nextFollowUp', 'notes'],
    statuses: ['PROSPECT', 'CONTACTED', 'RESPONDED', 'QUALIFIED', 'MEETING', 'QUOTATION', 'WON', 'LOST'],
  },
};

function isAuthorized(req) {
  const expected = process.env.ADMIN_DASHBOARD_PASSWORD;
  if (!expected) return false;
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  return token === expected;
}
function clean(str, max) { return typeof str === 'string' ? str.trim().slice(0, max) : ''; }

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    if (!isAuthorized(req)) { res.statusCode = 401; return res.end(JSON.stringify({ error: 'Unauthorized' })); }

    const kind = String(req.query.kind || '');
    const def = KINDS[kind];
    if (!def) { res.statusCode = 400; return res.end(JSON.stringify({ error: 'Unknown kind. Use one of: ' + Object.keys(KINDS).join(', ') })); }
    const indexKey = 'growth:' + kind + ':index';

    if (req.method === 'GET') {
      const ids = (await kvLrange(indexKey, 0, -1)) || [];
      const items = (await Promise.all(ids.map((id) => kvGet('growth:' + kind + ':' + id)))).filter(Boolean);
      items.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
      res.statusCode = 200;
      return res.end(JSON.stringify({ items, fields: def.fields, statuses: def.statuses }));
    }

    if (req.method === 'POST' && !req.query.id) {
      let body = req.body;
      if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
      body = body || {};
      const id = (globalThis.crypto && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(36).slice(2);
      const item = { id, kind, createdAt: new Date().toISOString() };
      def.fields.forEach((f) => { item[f] = clean(body[f], 2000); });
      await kvSet('growth:' + kind + ':' + id, item);
      await kvRpush(indexKey, id);
      res.statusCode = 201;
      return res.end(JSON.stringify({ item }));
    }

    if (req.method === 'PATCH' && req.query.id) {
      const id = String(req.query.id);
      const item = await kvGet('growth:' + kind + ':' + id);
      if (!item) { res.statusCode = 404; return res.end(JSON.stringify({ error: 'Not found' })); }
      let body = req.body;
      if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
      body = body || {};
      def.fields.forEach((f) => { if (body[f] !== undefined) item[f] = clean(body[f], 2000); });
      item.updatedAt = new Date().toISOString();
      await kvSet('growth:' + kind + ':' + id, item);
      res.statusCode = 200;
      return res.end(JSON.stringify({ item }));
    }

    res.statusCode = 405;
    return res.end(JSON.stringify({ error: 'Method not allowed' }));
  } catch (e) {
    res.statusCode = 500;
    return res.end(JSON.stringify({ error: e.message || 'Server error' }));
  }
};
