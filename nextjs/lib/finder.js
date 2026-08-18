// Ported directly from the live site's Machine Finder logic (Home.dc.html) — same questions,
// same matching/narrowing rules, same spec-highlight reasoning. Kept as pure functions so the
// recommendation logic is identical regardless of which UI calls it.
export const finderSteps = [
  { key: 'product', title: 'What are you making?', options: ['Shirts & Light Wovens', 'Denim & Heavy Fabrics', 'Jackets & Outerwear', 'Bags & Leather Goods', 'Home Textiles', 'Something else'] },
  { key: 'material', title: 'What material do you work with most?', options: ['Light woven fabric', 'Medium-weight fabric', 'Heavy or denim fabric', 'Leather or synthetic'] },
  { key: 'operation', title: 'What operation do you need?', options: ['Straight lockstitch', 'Overlock / edge finishing', 'Interlock / flat seaming', 'Reinforced heavy-duty stitching'] },
  { key: 'scale', title: 'What is your production scale?', options: ['Just starting out', 'Small workshop', 'Factory-scale production'] },
  { key: 'priority', title: 'What matters most to you?', options: ['Speed', 'Precision', 'Durability', 'Ease of use'] },
];

export function matchedMachines(machines, answers) {
  const opMap = { 'Straight lockstitch': 'lockstitch', 'Overlock / edge finishing': 'overlock', 'Interlock / flat seaming': 'interlock', 'Reinforced heavy-duty stitching': 'bartack' };
  const opTag = opMap[answers.operation];
  let matches = opTag ? machines.filter((m) => m.operations.includes(opTag)) : [];
  if (matches.length > 1 && answers.material === 'Heavy or denim fabric') {
    const heavy = matches.filter((m) => m.applications.some((a) => /denim|heavy|leather/i.test(a)) || /heavy|denim/i.test(m.purpose));
    if (heavy.length) matches = heavy;
  }
  if (matches.length > 1 && answers.scale === 'Just starting out') {
    const simpler = matches.filter((m) => !/computerized|AI|intelligent/i.test(m.purpose));
    if (simpler.length) matches = simpler;
  }
  return matches;
}

export function specHighlight(m) {
  if (!m.specs || !m.specs.length) return null;
  const wanted = ['Max sewing speed', 'Needle', 'Motor', 'Feature', 'Best for'];
  for (const label of wanted) {
    const found = m.specs.find(([k]) => k === label);
    if (found) return `${label.toLowerCase()}: ${found[1]}`;
  }
  return null;
}

export function buildRecommendation(machines, answers) {
  const matches = matchedMachines(machines, answers);
  if (!matches.length) {
    return "We don't have a verified match for that exact combination yet — a Swami specialist can confirm the right machine for your production.";
  }
  const scale = (answers.scale || 'your setup').toLowerCase();
  const priority = answers.priority ? answers.priority.toLowerCase() : null;
  const details = matches.slice(0, 3).map((m) => {
    const h = specHighlight(m);
    return h ? `${m.model} (${h})` : m.model;
  }).join('; ');
  let out = `Based on the operation you selected, ${details} ${matches.length > 1 ? 'are' : 'is'} suited to this kind of work.`;
  if (priority) out += ` Since ${priority} matters most to you, ask the specialist to weigh that specifically when narrowing between them.`;
  out += ` A specialist can confirm the right one for ${scale}.`;
  return out;
}
