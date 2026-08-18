import { getAllMachines } from '../../lib/machines';
import CompareTool from '../../components/CompareTool';

export const metadata = {
  title: 'Compare Machines',
  description: 'Compare JACK sewing machines side by side — real specifications, verified data.',
};

export default function ComparePage() {
  const machines = getAllMachines();
  return (
    <main className="wrap" style={{ padding: '48px 0 100px', textAlign: 'center' }}>
      <div className="mono" style={{ fontSize: 11, letterSpacing: '0.16em', color: '#707070' }}>COMPARE</div>
      <h1 style={{ fontSize: 'clamp(34px,6vw,64px)', margin: '12px 0' }}>Compare machines.</h1>
      <p style={{ color: '#707070', maxWidth: 560, margin: '0 auto' }}>
        Pick any three machines. We only show fields we can verify — a specialist confirms anything else.
      </p>
      <CompareTool machines={machines} />
    </main>
  );
}
