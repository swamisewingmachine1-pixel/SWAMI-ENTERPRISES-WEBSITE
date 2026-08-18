import Link from 'next/link';
import Image from 'next/image';
import { getMachine, getCategories } from '../lib/machines';

export default function HomePage() {
  const f6 = getMachine('jack-f6');
  const categories = getCategories();

  return (
    <main>
      <section className="hero">
        <div className="mono" style={{ fontSize: 12, letterSpacing: '0.16em', color: '#707070', marginBottom: 16 }}>
          AUTHORIZED JACK SHOWROOM &middot; CHANAKYA PLACE, NEW DELHI
        </div>
        <h1>Engineering what holds together.</h1>
        <p>We bring JACK&rsquo;s industrial sewing technology to India&rsquo;s makers — from the first machine to a full production line.</p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/machines" className="btn btn-dark">Explore Machines</Link>
          <a href="https://wa.me/919971336656" target="_blank" rel="noopener noreferrer" className="btn btn-light">
            Talk to Swami
          </a>
        </div>
      </section>

      {f6 && (
        <section className="wrap" style={{ padding: '40px 0 80px' }}>
          <div className="panel" style={{ padding: 'clamp(24px,4vw,48px)', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 40, alignItems: 'center' }}>
            <div style={{ position: 'relative', aspectRatio: '4/3' }}>
              <Image src={'/' + f6.imgSrc} alt={f6.model} fill style={{ objectFit: 'contain' }} priority />
            </div>
            <div>
              <div className="mono" style={{ fontSize: 12, color: '#0A5CFF', marginBottom: 8 }}>{f6.category.toUpperCase()}</div>
              <h2 style={{ fontSize: 'clamp(24px,3vw,36px)', margin: 0 }}>{f6.model}</h2>
              <p style={{ color: '#4A4A4A', fontSize: 15, lineHeight: 1.6 }}>{f6.purpose}</p>
              <Link href={`/machines/${f6.id}`} className="btn btn-dark">Explore the F6 →</Link>
            </div>
          </div>
        </section>
      )}

      <section className="wrap" style={{ padding: '0 0 100px' }}>
        <h2 className="mono" style={{ fontSize: 12, letterSpacing: '0.16em', color: '#707070', marginBottom: 24 }}>
          THE FULL RANGE — {categories.reduce((n, c) => n + c.items.length, 0)} MACHINES
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          {categories.map((c) => (
            <Link key={c.cat} href="/machines" className="panel" style={{ padding: 24, display: 'block' }}>
              <div style={{ fontWeight: 800, fontSize: 20 }}>{c.cat}</div>
              <div style={{ color: '#707070', fontSize: 13, marginTop: 6 }}>{c.items.length} machines</div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
