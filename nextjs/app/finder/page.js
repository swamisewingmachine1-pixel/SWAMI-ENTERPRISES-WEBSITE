import { getAllMachines } from '../../lib/machines';
import MachineFinder from '../../components/MachineFinder';

export const metadata = {
  title: 'Find Your Machine',
  description: 'A short, honest questionnaire based on Swami Enterprises’ verified JACK machine data — not a sales form.',
};

export default function FinderPage() {
  const machines = getAllMachines();
  return (
    <main className="wrap" style={{ padding: '48px 0 100px' }}>
      <div className="mono" style={{ fontSize: 11, letterSpacing: '0.16em', color: '#707070' }}>MACHINE INTELLIGENCE</div>
      <h1 style={{ fontSize: 'clamp(32px,5vw,48px)', margin: '12px 0 4px' }}>Find your machine.</h1>
      <p style={{ color: '#707070', maxWidth: 480 }}>A short, honest questionnaire based on our verified machine data — not a sales form.</p>
      <MachineFinder machines={machines} />
    </main>
  );
}
