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
const { kvSet, kvGet, kvRpush, kvLrange, kvIncrWithExpiry } = require('./_kv');

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
  if (lead.leadType === 'enterprise_project') return computeEnterpriseScore(lead);
  const reasons = [];
  const qty = parseInt(lead.quantity, 10);
  if (qty && qty >= 10) reasons.push('quantity >= 10');
  if (lead.timeline === 'Immediately') reasons.push('immediate timeline');
  if (lead.companyName) reasons.push('business lead');
  if (reasons.length >= 2) return { level: 'HIGH', reasons };
  if (reasons.length === 1) return { level: 'MEDIUM', reasons };
  return { level: 'LOW', reasons: [] };
}

// Internal-only lead-quality score for enterprise project enquiries — never
// shown to the customer, only used to sort the admin dashboard. Every point
// has a visible reason for the same "no black box" reason as computePriority.
const HIGH_MACHINE_RANGES = ['51-100', '101-250', '250+'];
const URGENT_TIMELINES = ['Immediately', 'Within 30 days', '1-3 months'];
const DECISION_ROLES = ['Owner / Founder', 'Managing Director', 'Plant Head', 'Purchase / Procurement'];
function computeEnterpriseScore(lead) {
  let score = 0;
  const reasons = [];
  if (lead.machineRequirementRange === '250+') { score += 3; reasons.push('250+ machines'); }
  else if (lead.machineRequirementRange === '101-250' || lead.machineRequirementRange === '51-100') { score += 3; reasons.push('51+ machines'); }
  if (URGENT_TIMELINES.includes(lead.timeline)) { score += 2; reasons.push('timeline within 3 months'); }
  if (lead.projectType === 'New factory' || lead.projectType === 'New production line') { score += 2; reasons.push('new factory/line'); }
  if (DECISION_ROLES.includes(lead.role)) { score += 2; reasons.push('procurement/plant/owner role'); }
  if (lead.website) { score += 1; reasons.push('website provided'); }
  if (lead.installationRequired === 'Yes') { score += 1; reasons.push('installation required'); }
  if (lead.serviceRequired === 'Yes') { score += 1; reasons.push('service required'); }
  let level = 'enterprise_standard';
  if (score >= 7) level = 'enterprise_high';
  else if (score >= 4) level = 'enterprise_medium';
  return { level, score, reasons };
}

function clean(str, max) {
  return typeof str === 'string' ? str.trim().slice(0, max) : '';
}

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    return await handle(req, res);
  } catch (e) {
    // A misconfigured deploy (KV not connected yet, etc.) must fail as a
    // clean JSON error, not a raw platform crash page — this is the
    // difference between "the dashboard isn't set up yet" and looking like
    // the whole site is broken.
    res.statusCode = 500;
    return res.end(JSON.stringify({ error: e.message || 'Server error' }));
  }
};

async function handle(req, res) {
  if (req.method === 'POST' && !req.query.id) {
    // Public endpoint — the /request-quote form calls this. Validate and
    // cap every field server-side; never trust the client payload as-is.
    let body = req.body;
    if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
    body = body || {};

    // Honeypot: a real visitor never fills a field hidden with CSS/off-screen
    // positioning. A bot filling every input in the DOM will. Silently accept
    // (never tell the bot it was caught) but skip persistence.
    if (clean(body.website2, 200)) {
      res.statusCode = 201;
      return res.end(JSON.stringify({ id: 'ok' }));
    }
    const leadType = body.leadType === 'enterprise_project' ? 'enterprise_project' : 'machine_quote';
    const fullName = clean(body.fullName, 120);
    const phone = clean(body.phone, 30);
    const email = clean(body.email, 120);
    if (!fullName || !phone) {
      res.statusCode = 400;
      return res.end(JSON.stringify({ error: 'fullName and phone are required' }));
    }
    if (!/^[\d\s+()-]{6,20}$/.test(phone)) {
      res.statusCode = 400;
      return res.end(JSON.stringify({ error: 'phone looks invalid' }));
    }
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      res.statusCode = 400;
      return res.end(JSON.stringify({ error: 'email looks invalid' }));
    }
    // Rate limit: at most 5 submissions per phone number per hour. A genuine
    // buyer never needs more than that; a script retrying does.
    try {
      const hits = await kvIncrWithExpiry('ratelimit:leads:' + phone.replace(/\D/g, ''), 3600);
      if (hits > 5) {
        res.statusCode = 429;
        return res.end(JSON.stringify({ error: 'Too many submissions from this number. Please try again later or WhatsApp us directly.' }));
      }
    } catch (e) { /* Redis hiccup should never block a real lead from saving */ }

    const id = (globalThis.crypto && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(36).slice(2);
    const lead = {
      id,
      leadType,
      createdAt: new Date().toISOString(),
      fullName,
      companyName: clean(body.companyName, 120),
      phone,
      email,
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
      lastTouchSource: clean(body.lastTouchSource, 40),
      lastTouchMedium: clean(body.lastTouchMedium, 40),
      status: 'NEW',
      notes: [],
      followUpDate: '',
      lastContactedAt: '',
      quotation: null,
      wonLost: null,
    };

    if (leadType === 'enterprise_project') {
      if (!lead.companyName || !lead.city) {
        res.statusCode = 400;
        return res.end(JSON.stringify({ error: 'companyName and city are required for a project brief' }));
      }
      lead.role = clean(body.role, 60);
      lead.state = clean(body.state, 60);
      lead.factoryLocation = clean(body.factoryLocation, 160);
      lead.website = clean(body.website, 200);
      lead.projectType = clean(body.projectType, 60);
      lead.industries = Array.isArray(body.industries) ? body.industries.map((x) => clean(String(x), 60)).filter(Boolean).slice(0, 12) : [];
      lead.machineRequirementRange = clean(body.machineRequirementRange, 20);
      lead.dailyProductionTarget = clean(body.dailyProductionTarget, 80);
      lead.existingMachineCount = clean(body.existingMachineCount, 40);
      lead.currentBrands = clean(body.currentBrands, 160);
      lead.supportNeeds = Array.isArray(body.supportNeeds) ? body.supportNeeds.map((x) => clean(String(x), 60)).filter(Boolean).slice(0, 12) : [];
      lead.requirementDescription = clean(body.requirementDescription, 1500);
      lead.installationRequired = clean(body.installationRequired, 20);
      lead.serviceRequired = clean(body.serviceRequired, 20);
      lead.preferredContactMethod = clean(body.preferredContactMethod, 20);
      lead.preferredContactTime = clean(body.preferredContactTime, 20);
      lead.budgetRange = clean(body.budgetRange, 40);
      lead.sourcePage = clean(body.sourcePage, 60) || 'start-a-project';
      lead.status = 'NEW';
    }

    lead.priority = computePriority(lead);

    await kvSet('lead:' + id, lead);
    await kvRpush('leads:index', id);

    res.statusCode = 201;
    return res.end(JSON.stringify({ id, reference: 'SWM-PRJ-' + id.slice(0, 8).toUpperCase() }));
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
}
