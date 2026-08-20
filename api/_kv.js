// Minimal Upstash/Vercel KV REST client — deliberately dependency-free (no
// @vercel/kv, no package.json, no build step) so the project stays a plain
// static site with a couple of serverless functions bolted on, not a real
// Node app. KV_REST_API_URL / KV_REST_API_TOKEN are populated automatically
// once a Vercel KV (Upstash Redis) store is connected to this project —
// see docs/ADMIN_SETUP.md. Every exported function throws if they're
// missing rather than silently no-op-ing, so a misconfigured deploy fails
// loudly in the API response instead of quietly losing leads.
const BASE = process.env.KV_REST_API_URL;
const TOKEN = process.env.KV_REST_API_TOKEN;

async function kv(command) {
  if (!BASE || !TOKEN) {
    throw new Error('KV not configured — set KV_REST_API_URL and KV_REST_API_TOKEN (see docs/ADMIN_SETUP.md)');
  }
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + TOKEN, 'Content-Type': 'application/json' },
    body: JSON.stringify(command),
  });
  const data = await res.json();
  if (data.error) throw new Error('KV error: ' + data.error);
  return data.result;
}

module.exports = {
  kvSet: (key, value) => kv(['SET', key, JSON.stringify(value)]),
  kvGet: async (key) => {
    const raw = await kv(['GET', key]);
    return raw ? JSON.parse(raw) : null;
  },
  kvRpush: (key, value) => kv(['RPUSH', key, value]),
  kvLrange: (key, start, stop) => kv(['LRANGE', key, start, stop]),
};
