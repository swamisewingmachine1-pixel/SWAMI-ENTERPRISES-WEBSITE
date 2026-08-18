import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAllMachines, getMachine, getRelatedMachines } from '../../../lib/machines';
import TrackedLink from '../../../components/TrackedLink';
import ViewTracker from '../../../components/ViewTracker';

export function generateStaticParams() {
  return getAllMachines().map((m) => ({ id: m.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const m = getMachine(id);
  if (!m) return {};
  return {
    title: m.model,
    description: `${m.model} — ${m.purpose} Real specifications, official product photography${m.youtubeId ? ' and video' : ''}. Authorized Jack dealer, Swami Enterprises, New Delhi.`,
    openGraph: {
      title: `${m.model} — Swami Enterprises`,
      description: m.purpose,
      images: ['/' + m.imgSrc],
    },
  };
}

export default async function MachinePage({ params }) {
  const { id } = await params;
  const m = getMachine(id);
  if (!m) notFound();
  const related = getRelatedMachines(m.id);

  return (
    <main className="wrap" style={{ padding: '48px 0 100px' }}>
      <ViewTracker event="product_view" props={{ id: m.id, model: m.model, category: m.category }} />
      <Link href="/machines" className="mono" style={{ fontSize: 12, letterSpacing: '0.1em', color: '#707070' }}>
        ← MACHINES
      </Link>
      <h1 style={{ fontSize: 'clamp(36px,7vw,72px)', margin: '16px 0 4px', fontWeight: 800 }}>{m.model}</h1>
      <div className="mono" style={{ color: '#0A5CFF', fontSize: 13, marginBottom: 32 }}>{m.category.toUpperCase()}</div>

      <div className="panel" style={{ padding: 'clamp(20px,3vw,40px)', maxWidth: 640 }}>
        <div style={{ position: 'relative', aspectRatio: '4/3' }}>
          <Image src={'/' + m.imgSrc} alt={m.model} fill style={{ objectFit: 'contain' }} priority />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16, margin: '28px 0 40px', flexWrap: 'wrap' }}>
        <TrackedLink
          href="https://wa.me/919971336656"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-dark"
          event="whatsapp_click"
          props={{ location: 'product', machine: m.id }}
        >
          Talk to a Specialist
        </TrackedLink>
        <Link href="/machines" className="btn btn-light">See related machines</Link>
      </div>

      {m.youtubeId && (
        <div style={{ maxWidth: 800, borderRadius: 18, overflow: 'hidden', position: 'relative', paddingTop: '45%', marginBottom: 48, background: '#0A0A0A' }}>
          <iframe
            src={`https://www.youtube.com/embed/${m.youtubeId}`}
            title={`${m.model} — official JACK product video`}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      <p style={{ fontSize: 18, maxWidth: 640, lineHeight: 1.5 }}>{m.purpose}</p>
      <p style={{ color: '#707070', fontSize: 14 }}>Operation: {m.operations.join(', ')}.</p>

      {m.specs && m.specs.length > 0 && (
        <div style={{ maxWidth: 640, marginTop: 40 }}>
          <div className="mono" style={{ fontSize: 12, letterSpacing: '0.1em', color: '#707070', marginBottom: 12 }}>
            TECHNICAL SPECIFICATIONS
          </div>
          <table className="spec-table">
            <tbody>
              {m.specs.map(([label, value]) => (
                <tr key={label}>
                  <td>{label}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {m.detailItems && m.detailItems.length > 0 && (
        <div style={{ marginTop: 56 }}>
          <div className="mono" style={{ fontSize: 12, letterSpacing: '0.1em', color: '#707070', marginBottom: 16 }}>DETAIL</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24, maxWidth: 900 }}>
            {m.detailItems.map((d) => (
              <div key={d.id} className="panel" style={{ overflow: 'hidden' }}>
                <div style={{ position: 'relative', aspectRatio: '4/3' }}>
                  <Image src={'/' + d.src} alt={d.label} fill style={{ objectFit: 'contain' }} sizes="300px" />
                </div>
                <div style={{ padding: 16 }}>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{d.label}</div>
                  <div style={{ fontSize: 13, color: '#707070', marginTop: 4 }}>{d.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: 48 }}>
        {m.applications.map((a) => (
          <span key={a} className="chip">{a}</span>
        ))}
      </div>

      {related.length > 0 && (
        <div style={{ marginTop: 64 }}>
          <div className="mono" style={{ fontSize: 12, letterSpacing: '0.1em', color: '#707070', marginBottom: 16 }}>RELATED MACHINES</div>
          {related.map((rm) => (
            <Link key={rm.id} href={`/machines/${rm.id}`} className="machine-row" style={{ gridTemplateColumns: '80px 1fr', maxWidth: 500 }}>
              <div style={{ position: 'relative', aspectRatio: '1/1' }}>
                <Image src={'/' + rm.imgSrc} alt={rm.model} fill style={{ objectFit: 'contain' }} sizes="80px" />
              </div>
              <div>
                <div style={{ fontWeight: 700 }}>{rm.model}</div>
                <div style={{ fontSize: 13, color: '#707070' }}>{rm.category}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
