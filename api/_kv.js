// Redis client wrapper for the leads store. Uses a real TCP connection via
// KV_REDIS_URL (the connection string Vercel's "Redis" marketplace
// integration provides) rather than Upstash's REST API — different
// products expose different credentials, and this project's Storage tab
// is connected to Redis Cloud, not Upstash. One shared connection is
// reused across invocations on a warm serverless instance instead of
// reconnecting per request.
const { createClient } = require('redis');

let clientPromise = null;

function getClient() {
  const url = process.env.KV_REDIS_URL;
  if (!url) {
    throw new Error('Redis not configured — set KV_REDIS_URL (see docs/ADMIN_SETUP.md)');
  }
  if (!clientPromise) {
    const client = createClient({ url });
    client.on('error', (err) => console.error('Redis client error', err));
    clientPromise = client.connect().then(() => client);
  }
  return clientPromise;
}

module.exports = {
  kvSet: async (key, value) => {
    const client = await getClient();
    return client.set(key, JSON.stringify(value));
  },
  kvGet: async (key) => {
    const client = await getClient();
    const raw = await client.get(key);
    return raw ? JSON.parse(raw) : null;
  },
  kvRpush: async (key, value) => {
    const client = await getClient();
    return client.rPush(key, value);
  },
  kvLrange: async (key, start, stop) => {
    const client = await getClient();
    return client.lRange(key, start, stop);
  },
};
