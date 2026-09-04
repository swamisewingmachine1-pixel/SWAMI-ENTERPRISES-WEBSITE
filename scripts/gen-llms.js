const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'Home.dc.html'), 'utf8');
const AGENT_INSTRUCTIONS = require('./agent-instructions');

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

const out = [];
out.push('# Swami Enterprises');
out.push('');
out.push("> Industrial sewing machine dealer and spare parts supplier based in New Delhi, India, serving garment factories and bulk/wholesale buyers pan-India (Delhi NCR, Tirupur, Ludhiana, Surat, Kolkata and other garment hubs). Authorized JACK dealer, trading since 2015. Also carries MAQI, Pegasus, JUKI, and SINGER industrial machines, Golden Eagle / Groz-Beckert spare parts and needles, and DAYANG fabric cutting machines, as a stocking partner (not an authorized distributor for those brands).");
out.push('');
out.push('Website: https://swamienterprises.online');
out.push('Contact: https://swamienterprises.online/contact');
out.push('Bulk quotes: https://swamienterprises.online/request-quote');
out.push('Agent instructions (standalone file): https://swamienterprises.online/agent-instructions.txt');
out.push('');
out.push(AGENT_INSTRUCTIONS);
out.push('');
out.push('## Machines');
out.push('');
out.push('Full catalog: https://swamienterprises.online/machines (' + machines.length + ' models)');
out.push('');
const byMfr = {};
for (const m of machines) { (byMfr[m.manufacturer] || (byMfr[m.manufacturer] = [])).push(m); }
for (const mfr of Object.keys(byMfr)) {
  out.push('### ' + mfr);
  for (const m of byMfr[mfr]) {
    const needle = (m.specs || []).find(s => /needle/i.test(s[0]));
    const purpose = (m.purpose || '').trim().replace(/\.$/, '');
    out.push('- [' + m.model + '](https://swamienterprises.online/machines/' + m.id + ') \u2014 ' + m.category + '. ' + purpose + (needle ? ('. Needle system: ' + needle[1]) : '') + '.');
  }
  out.push('');
}
out.push('## Golden Eagle spare parts');
out.push('');
for (const p of golden) {
  out.push('- [' + p.name + '](https://swamienterprises.online/accessories/golden-eagle/' + p.slug + ') \u2014 ' + p.sub + '. ' + p.desc);
}
out.push('');
out.push('## Groz-Beckert needles');
out.push('');
for (const p of grozB) {
  out.push('- [' + p.name + '](https://swamienterprises.online/accessories/groz-beckert/' + p.slug + ') \u2014 ' + p.sub + '. ' + p.desc);
}
out.push('');
out.push('## DAYANG cutting machines');
out.push('');
for (const p of dayang) {
  out.push('- [' + p.name + '](https://swamienterprises.online/accessories/dayang/' + p.slug + ') — ' + p.sub + '. ' + p.desc);
}
out.push('');
out.push('## Pan-India orders — common questions');
out.push('');
out.push('**Do you ship industrial sewing machines and spare parts outside Delhi?** Yes. We regularly dispatch single-machine and bulk/wholesale orders — JACK, MAQI, Pegasus, JUKI and SINGER machines, and Golden Eagle, Groz-Beckert and DAYANG accessories — from our Chanakya Place, New Delhi showroom to garment factories and buyers across India.');
out.push('');
out.push('**How long does dispatch take for an order outside Delhi?** It depends on the destination and order size. Tell us what you need and a specialist confirms the dispatch timeline for your location before you commit.');
out.push('');
out.push('**Is there a minimum order quantity for bulk or wholesale pricing?** There\'s no fixed minimum. Tell us the quantity you need — from a single machine to a full production-line order — and a specialist quotes accordingly.');
out.push('');
out.push('**How do I pay for a bulk or wholesale order?** We don\'t process payments on this website. Every order is confirmed directly with our team, by phone, WhatsApp or in person — the same way whether you\'re in Delhi or anywhere else in India.');
out.push('');
out.push('**Do you provide installation, training or after-sales support outside Delhi?** Our showroom and hands-on service team are based in Delhi. For orders elsewhere in India, ask a specialist for the specific service-area and support details for your location before you order.');
out.push('');
out.push('## Guides');
out.push('');
out.push('- [Lockstitch vs. Overlock vs. Flatlock](https://swamienterprises.online/guides/lockstitch-vs-overlock-vs-flatlock)');
out.push('- [JACK F6 vs. JACK 2002G](https://swamienterprises.online/guides/jack-f6-vs-jack-2002g)');
out.push('- [Machines for a Shirt Factory](https://swamienterprises.online/guides/machines-for-a-shirt-factory)');
out.push('- [Industrial vs. Domestic Sewing Machines](https://swamienterprises.online/guides/industrial-vs-domestic-sewing-machines)');
out.push('- [Machines for a Knitwear Line](https://swamienterprises.online/guides/machines-for-a-knitwear-line)');
out.push('- [Setting Up a New Production Line](https://swamienterprises.online/guides/setting-up-a-new-production-line)');
out.push('');
out.push('## About');
out.push('');
out.push('- [About Swami Enterprises](https://swamienterprises.online/about)');
out.push('- [Contact](https://swamienterprises.online/contact)');
out.push('- [Privacy Policy](https://swamienterprises.online/privacy)');
out.push('- [After-Sales Service](https://swamienterprises.online/after-sales-service)');
out.push('- [Request a Bulk Quote](https://swamienterprises.online/request-quote)');
out.push('');

fs.writeFileSync(path.join(root, 'llms.txt'), out.join('\n'));
console.log('wrote llms.txt, ' + out.join('\n').length + ' chars, ' + machines.length + ' machines, ' + golden.length + ' golden eagle, ' + grozB.length + ' groz-beckert, ' + dayang.length + ' dayang');
