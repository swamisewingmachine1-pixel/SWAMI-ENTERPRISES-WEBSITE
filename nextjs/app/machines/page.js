import { getCategories } from '../../lib/machines';
import MachineSearch from '../../components/MachineSearch';

export const metadata = {
  title: 'Machines',
  description: 'The full JACK industrial sewing machine range stocked by Swami Enterprises — lockstitch, overlock, interlock and bartack machines with real specifications.',
};

export default function MachinesPage() {
  const categories = getCategories();
  return (
    <main className="wrap" style={{ padding: '48px 0 100px' }}>
      <h1 style={{ fontSize: 'clamp(32px,5vw,48px)', margin: 0 }}>Machines.</h1>
      <p style={{ color: '#707070', maxWidth: 520 }}>The full JACK range Swami Enterprises stocks or can order — with real, verified specifications.</p>
      <MachineSearch categories={categories} />
    </main>
  );
}
