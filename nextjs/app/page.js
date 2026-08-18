import Link from 'next/link';
import Image from 'next/image';
import { getMachine } from '../lib/machines';
import { solutions } from '../lib/content';
import Hero from '../components/Hero';
import Reveal from '../components/Reveal';

const engineeringPoints = [
  { n: '01', title: 'Precision', desc: 'Digital control keeps stitch quality consistent — not dependent on the operator.' },
  { n: '02', title: 'Speed', desc: 'Automated trimming keeps the line moving between operations.' },
  { n: '03', title: 'Control', desc: 'Adjust settings directly from the panel — no mechanical guesswork.' },
];
const applicationRows = ['Shirts & Light Wovens', 'Uniforms & Institutional Garments', 'Light Denim & Workwear'];

export default function HomePage() {
  const f6 = getMachine('jack-f6');

  return (
    <main>
      <Hero />

      {/* STATEMENT */}
      <Reveal style={{ background: '#F7F7F5', padding: 'clamp(80px,14vw,160px) clamp(24px,8vw,120px)' }}>
        <div style={{ fontWeight: 700, fontSize: 'clamp(26px,4vw,48px)', lineHeight: 1.3, color: '#151515', maxWidth: 880 }}>
          A sewing machine is not just a tool. It is the difference between a workshop and a production line.
        </div>
      </Reveal>

      {/* MACHINE SPOTLIGHT */}
      {f6 && (
        <Reveal
          style={{
            background: '#0A0A0A', padding: 'clamp(60px,10vw,100px) clamp(24px,8vw,80px)',
            display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 'clamp(32px,6vw,80px)', alignItems: 'center',
          }}
        >
          <div style={{ position: 'relative', height: 'clamp(280px,40vw,460px)' }}>
            <Image src={'/' + f6.imgSrc} alt={f6.model} fill style={{ objectFit: 'contain', filter: 'drop-shadow(0 24px 32px rgba(0,0,0,0.4))' }} />
          </div>
          <div>
            <div className="mono" style={{ fontSize: 11, letterSpacing: '0.2em', color: '#0A5CFF', marginBottom: 18 }}>FEATURED MACHINE</div>
            <div style={{ fontWeight: 800, fontSize: 'clamp(32px,5vw,60px)', color: '#F7F7F5', letterSpacing: '-0.02em' }}>{f6.model}</div>
            <div className="mono" style={{ fontSize: 12, letterSpacing: '0.08em', color: '#8A8A8A', marginTop: 10 }}>COMPUTERIZED LOCKSTITCH MACHINE</div>
            <div style={{ fontSize: 15, color: '#B0B0B0', lineHeight: 1.7, marginTop: 20, maxWidth: 420 }}>{f6.purpose}</div>
            <Link href={`/machines/${f6.id}`} style={{ marginTop: 28, color: '#F7F7F5', fontSize: 14, display: 'inline-flex', gap: 8 }}>
              View the F6 →
            </Link>
          </div>
        </Reveal>
      )}

      {/* ENGINEERING */}
      <Reveal
        style={{
          background: '#F7F7F5', padding: 'clamp(70px,10vw,110px) clamp(24px,8vw,80px)',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 'clamp(32px,5vw,60px)',
        }}
      >
        {engineeringPoints.map((e) => (
          <div key={e.n}>
            <div className="mono" style={{ fontSize: 44, fontWeight: 500, color: '#0A5CFF' }}>{e.n}</div>
            <div style={{ fontWeight: 700, fontSize: 19, color: '#151515', marginTop: 14 }}>{e.title}</div>
            <div style={{ fontSize: 14, color: '#4A4A4A', lineHeight: 1.6, marginTop: 8 }}>{e.desc}</div>
          </div>
        ))}
      </Reveal>

      {/* APPLICATIONS */}
      <Reveal style={{ background: '#F7F7F5', padding: 'clamp(70px,10vw,110px) clamp(24px,8vw,80px)' }}>
        <div className="mono" style={{ fontSize: 11, letterSpacing: '0.2em', color: '#707070', marginBottom: 8 }}>WHAT YOU&rsquo;RE BUILDING</div>
        <div style={{ fontSize: 13, color: '#707070', marginBottom: 32, maxWidth: 520 }}>
          Commonly suited applications for machines like the F6 — a specialist confirms fit for your exact material.
        </div>
        {applicationRows.map((a) => (
          <Link
            key={a} href="/finder"
            style={{ display: 'block', padding: '22px 0', borderTop: '1px solid rgba(0,0,0,0.1)', fontWeight: 700, fontSize: 'clamp(22px,3vw,32px)', color: '#151515' }}
          >
            {a}
          </Link>
        ))}
      </Reveal>

      {/* SOLUTIONS */}
      <Reveal style={{ background: '#151515', padding: 'clamp(70px,10vw,110px) clamp(24px,8vw,80px)' }}>
        <div className="mono" style={{ fontSize: 11, letterSpacing: '0.2em', color: '#707070', marginBottom: 8 }}>HOWEVER YOU&rsquo;RE PRODUCING</div>
        <div style={{ fontSize: 13, color: '#8A8A8A', marginBottom: 32, maxWidth: 520 }}>
          We don&rsquo;t just sell machines — we help you find the right one for where your production is today.
        </div>
        {solutions.map((s) => (
          <Link
            key={s.key} href="/contact"
            style={{ display: 'block', padding: '22px 0', borderTop: '1px solid rgba(247,247,245,0.14)', fontWeight: 700, fontSize: 'clamp(22px,3vw,32px)', color: '#F7F7F5' }}
          >
            {s.name}
          </Link>
        ))}
      </Reveal>

      {/* FINDER TEASER */}
      <Reveal style={{ background: '#050505', padding: 'clamp(80px,12vw,140px) 24px', textAlign: 'center' }}>
        <div className="mono" style={{ fontSize: 11, letterSpacing: '0.2em', color: '#0A5CFF', marginBottom: 20 }}>MACHINE INTELLIGENCE</div>
        <div style={{ fontWeight: 700, fontSize: 'clamp(26px,4vw,46px)', color: '#F7F7F5', maxWidth: 720, margin: '0 auto', lineHeight: 1.25 }}>
          Not sure which machine fits your production?
        </div>
        <div style={{ fontSize: 15, color: '#8A8A8A', marginTop: 16 }}>Answer five quick questions built from our verified machine data.</div>
        <Link href="/finder" className="btn btn-light" style={{ marginTop: 36, display: 'inline-block', background: 'transparent', color: '#F7F7F5', border: '1px solid #F7F7F5' }}>
          Find your machine
        </Link>
      </Reveal>

      {/* ABOUT */}
      <Reveal
        style={{
          background: '#F7F7F5', padding: 'clamp(70px,10vw,110px) clamp(24px,8vw,80px)',
          display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 'clamp(32px,6vw,80px)', alignItems: 'center',
        }}
      >
        <div className="panel" style={{ height: 'clamp(220px,30vw,340px)', background: '#151515' }} />
        <div>
          <div className="mono" style={{ fontSize: 11, letterSpacing: '0.2em', color: '#707070', marginBottom: 18 }}>ABOUT SWAMI</div>
          <div style={{ fontWeight: 700, fontSize: 'clamp(24px,3.4vw,38px)', color: '#151515', lineHeight: 1.3, maxWidth: 560 }}>
            An authorized JACK dealer, built around people who understand machines.
          </div>
          <div style={{ fontSize: 15, color: '#4A4A4A', lineHeight: 1.7, marginTop: 20, maxWidth: 520 }}>
            We help businesses choose, install, and maintain the right sewing machinery for how they actually produce — not just what&rsquo;s on a spec sheet.
          </div>
          <Link href="/about" style={{ marginTop: 20, display: 'inline-block', color: '#0A5CFF', fontWeight: 600, fontSize: 14 }}>Read more →</Link>
        </div>
      </Reveal>
    </main>
  );
}
