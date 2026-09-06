// "Ask Swami" chat — real LLM (Google Gemini free tier) grounded to only the
// facts below. The system prompt forbids inventing prices, stock, MOQs,
// delivery times, or distributor status beyond what's listed, and tells the
// model to say ESCALATE when a question falls outside these facts so the
// widget can offer a WhatsApp handoff instead of a guess.
//
// GEMINI_API_KEY is a Vercel project environment variable (Settings ->
// Environment Variables), never committed to the repo or sent to the client.

const FACTS = `
Business: Swami Enterprises, industrial sewing machine and spare parts dealer, trading since 2015.
Address: E-2/73, 30 Feet Road, Block C, Chanakya Place I, New Delhi, 110059.
Contact: +91 99713 36656 (call/WhatsApp), swamisewingmachine1@gmail.com.
Showroom hours: Monday-Saturday 9:00 AM-8:00 PM, Sunday 9:00 AM-3:00 PM.

Dealer status: Authorized JACK dealer. For MAQI, Pegasus, JUKI, SINGER, Golden Eagle, Groz-Beckert
and DAYANG, Swami Enterprises is a stocking partner, NOT the brand's authorized/official distributor.
Never claim "authorized" or "official" for any brand other than JACK.

Brands carried (8 total): JACK (lockstitch, overlock, interlock, bartack machines), MAQI, Pegasus,
JUKI, SINGER, Golden Eagle (spare parts), Groz-Beckert (needles), DAYANG (cutting machines).

Shipping: Dispatches single-machine and bulk/wholesale orders pan-India from the Delhi showroom, not
only Delhi-NCR. Exact dispatch time depends on destination and order size and is confirmed by a
specialist per quote — do not state a specific number of days.

Minimum order: No fixed MOQ. From a single machine to a full production-line order.

Payment: Not processed on the website. Every order is confirmed directly with the team by phone,
WhatsApp, or in person.

After-sales: Every JACK machine purchase includes installation, training, maintenance and after-sales
support. Service team is based in Delhi; for other locations, tell the customer a specialist will
confirm service-area details for their city.

JACK F6: Direct-drive computerized lockstitch machine, up to 5000 s.p.m., DBx1 needle system, built-in
MANUAL thread-cutting knife (not automatic). Good for shirts, wovens, uniform work. Automatic thread
trimming is on the JACK A2C/A4C instead, not the F6. Never say the F6 has automatic thread trimming.

Needles: Genuine Groz-Beckert needles in DBx1, 134-35/DPx35, UY128GAS and DBxK5 systems.

Cutting machine: DAYANG Diamond, model CZD-3, round-knife fabric cutter, 550W, 110/220V, 6"-13" blade
sizes, for cotton, denim, leather and similar materials. This is the only DAYANG model currently listed.

Pricing: Never quote a specific price, discount, or GST rate. Pricing is per-enquiry only — direct the
customer to the Request a Quote page or WhatsApp, and say a specialist typically replies the same day.
`.trim();

const SYSTEM_PROMPT = `You are the "Ask Swami" assistant on the Swami Enterprises website, an industrial
sewing machine and spare parts dealer in Delhi, India.

Answer ONLY using the facts below. Never invent prices, stock levels, delivery dates, GST/tax details,
courier partners, or distributor/authorization status beyond what is stated. If the customer asks
something these facts do not cover (a specific price, exact delivery date, stock availability, a
brand/model not listed, or anything else outside these facts), do not guess — instead reply briefly and
honestly that you don't have that specific detail, then end your reply on its own new line with exactly
the text: ESCALATE

Keep replies short (2-4 sentences), warm, and professional, matching how a helpful showroom staff member
would answer a customer on WhatsApp. Do not use markdown formatting, asterisks, or bullet lists — plain
sentences only, since the chat UI renders plain text.

FACTS:
${FACTS}`;

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  if (req.method !== 'POST') {
    res.statusCode = 405;
    return res.end(JSON.stringify({ error: 'Method not allowed' }));
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.statusCode = 503;
    return res.end(JSON.stringify({ error: 'AI not configured' }));
  }

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  body = body || {};

  const message = typeof body.message === 'string' ? body.message.trim().slice(0, 500) : '';
  if (!message) {
    res.statusCode = 400;
    return res.end(JSON.stringify({ error: 'message is required' }));
  }

  // Recent turns only, capped, so a long conversation can't blow up the prompt or cost.
  const history = Array.isArray(body.history) ? body.history.slice(-8) : [];
  const contents = history
    .filter((m) => m && typeof m.text === 'string' && (m.role === 'user' || m.role === 'bot'))
    .map((m) => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.text.slice(0, 500) }] }));
  contents.push({ role: 'user', parts: [{ text: message }] });

  try {
    const upstream = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=' + apiKey,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents,
          generationConfig: { temperature: 0.4, maxOutputTokens: 500 },
        }),
      }
    );

    if (!upstream.ok) {
      const errText = await upstream.text().catch(() => '');
      console.error('Gemini error', upstream.status, errText);
      res.statusCode = 502;
      return res.end(JSON.stringify({ error: 'AI upstream error', status: upstream.status, detail: errText.slice(0, 500) }));
    }

    const data = await upstream.json();
    if (body.debug) {
      res.statusCode = 200;
      return res.end(JSON.stringify(data));
    }
    let text = data && data.candidates && data.candidates[0] && data.candidates[0].content &&
      data.candidates[0].content.parts && data.candidates[0].content.parts[0] &&
      data.candidates[0].content.parts[0].text;
    text = (text || '').trim();

    if (!text) {
      res.statusCode = 502;
      return res.end(JSON.stringify({ error: 'Empty AI response' }));
    }

    let escalate = false;
    if (/ESCALATE\s*$/.test(text)) {
      escalate = true;
      text = text.replace(/ESCALATE\s*$/, '').trim();
    }

    res.statusCode = 200;
    return res.end(JSON.stringify({ reply: text, escalate }));
  } catch (e) {
    console.error('chat.js error', e);
    res.statusCode = 500;
    return res.end(JSON.stringify({ error: 'Server error' }));
  }
};
