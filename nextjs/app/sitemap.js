import { getAllMachines } from '../lib/machines';

export default function sitemap() {
  const base = 'https://swamienterprises.online';
  const staticPages = ['', '/machines', '/finder', '/compare', '/industries', '/solutions', '/about', '/contact'].map((p) => ({
    url: base + p,
    lastModified: new Date(),
  }));
  const machinePages = getAllMachines().map((m) => ({
    url: `${base}/machines/${m.id}`,
    lastModified: new Date(),
  }));
  return [...staticPages, ...machinePages];
}
