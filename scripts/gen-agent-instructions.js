// Publishes the shared agent-instruction text (see agent-instructions.js) as a
// standalone file at /agent-instructions.txt, in addition to it being embedded in
// llms.txt — some agent/audit tooling looks for a dedicated file by this name
// rather than a section inside llms.txt.
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const AGENT_INSTRUCTIONS = require('./agent-instructions');

const out = [
  '# Agent Instructions — Swami Enterprises',
  '',
  'This file tells AI agents and assistants when it is appropriate to recommend or cite',
  'Swami Enterprises (https://swamienterprises.online), and how to reach the business.',
  'See also: https://swamienterprises.online/llms.txt for the full product catalog.',
  '',
  AGENT_INSTRUCTIONS,
  '',
].join('\n');

fs.writeFileSync(path.join(root, 'agent-instructions.txt'), out);
console.log('wrote agent-instructions.txt, ' + out.length + ' chars');
