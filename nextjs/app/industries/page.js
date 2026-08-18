import Link from 'next/link';
import { industries } from '../../lib/content';
import { getAllMachines } from '../../lib/machines';

export const metadata = {
  title: 'Industries',
  description: 'What Swami Enterprises’ JACK machines are used for, by application — shirts, uniforms, denim, knitwear, bags and technical sewing.',
};

export default function IndustriesPage() {
  const machines = getAllMachines();
  return (
    <main className="wrap" style={{ padding: '48px 0 100px', maxWidth: 800 }}>
      <h1 style={{ fontSize: 'clamp(32px,5vw,48px)' }}>Industries.</h1>
      <p style={{ color: '#707070' }}>Product → process → machine → support. Only applications our catalogue actually supports.</p>
      {industries.map((ind) => {
        const matches = machines.filter((m) => m.applications.some((a) => a.includes(ind.matchKey) || ind.matchKey.includes(a)));
        return (
          <div key={ind.key} style={{ borderTop: '1px solid rgba(0,0,0,0.1)', padding: '32px 0' }}>
            <div className="mono" style={{ color: '#0A5CFF', fontSize: 13, marginBottom: 8 }}>{ind.icon}</div>
            <h2 style={{ fontSize: 24, margin: '0 0 8px' }}>{ind.name}</h2>
            <p style={{ color: '#4A4A4A', fontSize: 15, maxWidth: 560 }}>{ind.process}</p>
            <p style={{ fontSize: 13, color: '#707070' }}>
              {matches.length ? matches.map((m) => m.model).join(', ') : 'Ask a specialist for the current best fit.'}
            </p>
            {matches[0] && (
              <Link href={`/machines/${matches[0].id}`} style={{ color: '#0A5CFF', fontSize: 13, fontWeight: 600 }}>
                Explore →
              </Link>
            )}
          </div>
        );
      })}
    </main>
  );
}
