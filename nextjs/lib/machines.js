import { machines } from './machines-data';

export function getAllMachines() {
  return machines;
}

export function getMachine(id) {
  return machines.find((m) => m.id === id) || null;
}

export function getRelatedMachines(id, limit = 3) {
  const m = getMachine(id);
  if (!m) return [];
  return machines.filter((x) => x.id !== id && x.category === m.category).slice(0, limit);
}

export function getCategories() {
  const order = ['Lockstitch', 'Overlock', 'Interlock / Coverstitch', 'Pattern / Bartack'];
  return order
    .map((cat) => ({ cat, items: machines.filter((m) => m.category === cat) }))
    .filter((g) => g.items.length > 0);
}
