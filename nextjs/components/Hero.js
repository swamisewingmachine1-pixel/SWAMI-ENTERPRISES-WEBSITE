'use client';

import Image from 'next/image';
import Link from 'next/link';

// Same cinematic sequence as the live site's hero (void label -> statement -> machine reveal)
// but staged as a timed entrance on load instead of scroll-jacked/scrubbed — same visual
// language and same real copy, a simpler (and more broadly reliable) animation mechanism.
export default function Hero() {
  return (
    <div
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: 640,
        overflow: 'hidden',
        background: 'radial-gradient(120% 90% at 50% 30%, #1a1a1a 0%, #050505 70%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '0 24px',
      }}
    >
      <div
        className="mono hero-void"
        style={{ fontSize: 11, letterSpacing: '0.28em', color: '#5A5A5A', position: 'absolute', top: '18%' }}
      >
        SWAMI ENTERPRISES — AUTHORIZED JACK DEALER
      </div>

      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div
          className="hero-glow"
          style={{
            width: '60vw', height: '60vw', maxWidth: 820, maxHeight: 820, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(10,92,255,0.22) 0%, rgba(10,92,255,0.08) 40%, rgba(10,92,255,0) 70%)',
            filter: 'blur(2px)',
          }}
        />
      </div>

      <div className="hero-statement" style={{ maxWidth: 1100 }}>
        <h1 style={{ fontWeight: 800, fontSize: 'clamp(34px,6.5vw,84px)', lineHeight: 1.05, color: '#F7F7F5', letterSpacing: '-0.02em', margin: 0 }}>
          Engineering what<br />holds together.
        </h1>
        <p style={{ fontSize: 'clamp(15px,1.6vw,18px)', color: '#B0B0B0', maxWidth: 560, margin: '26px auto 0', lineHeight: 1.6 }}>
          We bring JACK&rsquo;s industrial sewing technology to India&rsquo;s makers — from the first machine to a full production line.
        </p>
      </div>

      <div className="hero-machine" style={{ width: 'min(920px,94vw)', marginTop: 40 }}>
        <div style={{ position: 'relative', height: 'clamp(280px,42vw,460px)' }}>
          <Image
            src="/uploads/f6-cutout-final.png"
            alt="JACK F6 industrial sewing machine"
            fill
            style={{ objectFit: 'contain', filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.35))' }}
            priority
          />
        </div>
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginTop: 28, flexWrap: 'wrap' }}>
          <Link href="/machines/jack-f6" className="btn btn-light">Explore the F6</Link>
          <Link href="/finder" style={{ padding: '15px 28px', color: '#F7F7F5', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
            Find your machine →
          </Link>
        </div>
      </div>

      <div
        className="mono hero-scroll-cue"
        style={{ position: 'absolute', bottom: 28, fontSize: 10, letterSpacing: '0.2em', color: '#4A4A4A' }}
      >
        SCROLL
      </div>

      <style>{`
        @keyframes heroVoidIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes heroStatementIn { from { opacity: 0; transform: translateY(18px) scale(0.98); filter: blur(6px); } to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); } }
        @keyframes heroMachineIn { from { opacity: 0; transform: translateY(40px) scale(0.94) perspective(1400px) rotateY(-8deg); } to { opacity: 1; transform: translateY(0) scale(1) perspective(1400px) rotateY(0deg); } }
        @keyframes heroGlowIn { from { opacity: 0; transform: scale(0.7); } to { opacity: 1; transform: scale(1); } }
        @keyframes heroFade { from { opacity: 0; } to { opacity: 1; } }
        .hero-void { animation: heroVoidIn 0.7s ease 0.1s both; }
        .hero-glow { animation: heroGlowIn 1.6s ease 0.2s both; }
        .hero-statement { animation: heroStatementIn 1s ease 0.35s both; }
        .hero-machine { animation: heroMachineIn 1.1s cubic-bezier(0.16,1,0.3,1) 0.75s both; }
        .hero-scroll-cue { animation: heroFade 0.6s ease 1.6s both; }
        @media (prefers-reduced-motion: reduce) {
          .hero-void, .hero-glow, .hero-statement, .hero-machine, .hero-scroll-cue { animation: none; opacity: 1; transform: none; filter: none; }
        }
      `}</style>
    </div>
  );
}
