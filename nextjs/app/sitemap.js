import { getAllMachines } from '../lib/machines';

export default function sitemap() {
  const base = 'https://swamienterprises.online';
  const staticPages = ['', '/machines', '/about'].map((p) => ({
    url: base + p,
    lastModified: new Date(),
  }));
  const machinePages = getAllMachines().map((m) => ({
    url: `${base}/machines/${m.id}`,
    lastModified: new Date(),
  }));
  return [...staticPages, ...machinePages];
}
