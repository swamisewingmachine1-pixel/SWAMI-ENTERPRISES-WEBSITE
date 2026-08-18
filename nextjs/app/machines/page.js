import Link from 'next/link';
import Image from 'next/image';
import { getCategories } from '../../lib/machines';

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

      <div className="grid-cats">
        {categories.map((group) => (
          <div key={group.cat}>
            <div className="cat-heading">{group.cat}</div>
            {group.items.map((m) => (
              <Link key={m.id} href={`/machines/${m.id}`} className="machine-row">
                <div className="panel" style={{ padding: 16 }}>
                  <div style={{ position: 'relative', aspectRatio: '1/1' }}>
                    <Image src={'/' + m.imgSrc} alt={m.model} fill style={{ objectFit: 'contain' }} sizes="260px" />
                  </div>
                </div>
                <div>
                  <div className="machine-title">{m.model}</div>
                  <div className="machine-desc">{m.purpose}</div>
                  <div style={{ marginTop: 12, color: '#0A5CFF', fontSize: 13, fontWeight: 600 }}>Explore →</div>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
