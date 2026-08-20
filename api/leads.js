// Lead storage + admin API. One file, method-routed, no framework — matches
// the rest of this project (static site + a couple of serverless functions,
// not a full backend). Data model: each lead is a JSON blob at key
// `lead:<id>`; `leads:index` is a Redis LIST of ids in creation order so
// listing never needs a SCAN.
//
// Auth model: everything except POST (public lead submission) requires
// `Authorization: Bearer <ADMIN_DASHBOARD_PASSWORD>`. This is a single
// shared password, not real multi-user auth with sessions/roles — that is
// the honest state of it. Documented in docs/ADMIN_SETUP.md. Good enough
// for one owner checking a dashboard; not what you'd want with a sales team
// of more than a couple of trusted people sharing one password.
const { kvSet, kvGet, kvRpush, kvLrange } = require('./_kv');

const STATUSES = ['NEW', 'CONTACTED', 'QUALIFIED', 'QUOTATION', 'NEGOTIATION', 'WON', 'LOST'];
const LOST_REASONS = ['Price', 'Competitor', 'Timing', 'No response', 'Requirement changed', 'Other'];

function isAuthorized(req) {
  const expected = process.env.ADMIN_DASHBOARD_PASSWORD;
  if (!expected) return false; // fail closed — no password configured means no access, not open access
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  return token === expected;
}

// Transparent, documented priority rules (Phase 8) — no ML/AI scoring.
// Each signal is a fixed, visible reason so a salesperson can see *why* a
// lead is HIGH, not just trust a black-box number.
function computePriority(lead) {
  const reasons = [];
  const qty = parseInt(lead.quantity, 10);
  if (qty && qty >= 10) reasons.push('quantity >= 10');
  if (lead.timeline === 'Immediately') reasons.push('immediate timeline');
  if (lead.companyName) reasons.push('business lead');
  if (reasons.length >= 2) return { level: 'HIGH', reasons };
  if (reasons.length === 1) return { level: 'MEDIUM', reasons };
  return { level: 'LOW', reasons: [] };
}

function clean(str, max) {
  return typeof str === 'string' ? str.trim().slice(0, max) : '';
}

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'POST' && !req.query.id) {
    // Public endpoint — the /request-quote form calls this. Validate and
    // cap every field server-side; never trust the client payload as-is.
    let body = req.body;
    if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
    body = body || {};

    const fullName = clean(body.fullName, 120);
    const phone = clean(body.phone, 30);
    if (!fullName || !phone) {
      res.statusCode = 400;
      return res.end(JSON.stringify({ error: 'fullName and phone are required' }));
    }
    if (!/^[\d\s+()-]{6,20}$/.test(phone)) {
      res.statusCode = 400;
      return res.end(JSON.stringify({ error: 'phone looks invalid' }));
    }

    const id = (globalThis.crypto && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(36).slice(2);
    const lead = {
      id,
      createdAt: new Date().toISOString(),
      fullName,
      companyName: clean(body.companyName, 120),
      phone,
      email: clean(body.email, 120),
      city: clean(body.city, 80),
      industry: clean(body.industry, 60),
      machine: clean(body.machine, 60),
      quantity: clean(body.quantity, 20),
      timeline: clean(body.timeline, 60),
      requirements: clean(body.requirements, 1000),
      source: clean(body.source, 40) || 'direct',
      medium: clean(body.medium, 40) || 'none',
      campaign: clean(body.campaign, 60),
      landingPage: clean(body.landingPage, 200),
      status: 'NEW',
      notes: [],
      followUpDate: '',
      lastContactedAt: '',
      quotation: null,
      wonLost: null,
    };
    lead.priority = computePriority(lead);

    await kvSet('lead:' + id, lead);
    await kvRpush('leads:index', id);

    res.statusCode = 201;
    return res.end(JSON.stringify({ id }));
  }

  // Everything below is the admin surface — auth required.
  if (!isAuthorized(req)) {
    res.statusCode = 401;
    return res.end(JSON.stringify({ error: 'Unauthorized' }));
  }

  if (req.method === 'GET') {
    const ids = (await kvLrange('leads:index', 0, -1)) || [];
    const leads = (await Promise.all(ids.map((id) => kvGet('lead:' + id)))).filter(Boolean);
    leads.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
    res.statusCode = 200;
    return res.end(JSON.stringify({ leads, statuses: STATUSES, lostReasons: LOST_REASONS }));
  }

  if (req.method === 'PATCH' && req.query.id) {
    const id = String(req.query.id);
    const lead = await kvGet('lead:' + id);
    if (!lead) { res.statusCode = 404; return res.end(JSON.stringify({ error: 'Lead not found' })); }

    let body = req.body;
    if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
    body = body || {};

    if (body.status) {
      if (!STATUSES.includes(body.status)) { res.statusCode = 400; return res.end(JSON.stringify({ error: 'Invalid status' })); }
      lead.status = body.status;
      lead.lastContactedAt = new Date().toISOString();
      if (body.status === 'WON' && body.wonLost) {
        lead.wonLost = { type: 'WON', orderValue: clean(String(body.wonLost.orderValue || ''), 20), orderDate: clean(body.wonLost.orderDate, 20), machine: clean(body.wonLost.machine, 60), quantity: clean(body.wonLost.quantity, 20) };
      }
      if (body.status === 'LOST' && body.wonLost) {
        const reason = LOST_REASONS.includes(body.wonLost.reason) ? body.wonLost.reason : 'Other';
        lead.wonLost = { type: 'LOST', reason, notes: clean(body.wonLost.notes, 300) };
      }
    }
    if (body.followUpDate !== undefined) lead.followUpDate = clean(body.followUpDate, 20);
    if (body.note) {
      const text = clean(body.note, 500);
      if (text) lead.notes.push({ text, at: new Date().toISOString() });
    }
    if (body.quotation) {
      lead.quotation = {
        number: clean(body.quotation.number, 40), date: clean(body.quotation.date, 20),
        machine: clean(body.quotation.machine, 60), quantity: clean(body.quotation.quantity, 20),
        price: clean(body.quotation.price, 40), gst: clean(body.quotation.gst, 20),
        delivery: clean(body.quotation.delivery, 60), validity: clean(body.quotation.validity, 40),
        paymentTerms: clean(body.quotation.paymentTerms, 120), notes: clean(body.quotation.notes, 300),
      };
    }
    lead.priority = computePriority(lead);

    await kvSet('lead:' + id, lead);
    res.statusCode = 200;
    return res.end(JSON.stringify({ lead }));
  }

  res.statusCode = 405;
  return res.end(JSON.stringify({ error: 'Method not allowed' }));
};
