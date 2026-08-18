import Link from 'next/link';
import { solutions, serviceItems } from '../../lib/content';

export const metadata = {
  title: 'Solutions',
  description: 'We don’t just sell machines — installation, training, maintenance, spare parts and technical support from Swami Enterprises.',
};

export default function SolutionsPage() {
  return (
    <main className="wrap" style={{ padding: '48px 0 100px', maxWidth: 800 }}>
      <h1 style={{ fontSize: 'clamp(32px,5vw,48px)' }}>We don&rsquo;t just sell machines.</h1>
      <p style={{ color: '#707070' }}>We help you find the right one for the job.</p>
      {solutions.map((sol) => (
        <div key={sol.key} style={{ borderTop: '1px solid rgba(0,0,0,0.1)', padding: '28px 0' }}>
          <h2 style={{ fontSize: 20, margin: '0 0 8px' }}>{sol.name}</h2>
          <p style={{ color: '#4A4A4A', fontSize: 15 }}>{sol.desc}</p>
        </div>
      ))}

      <div style={{ marginTop: 56 }}>
        <div className="mono" style={{ fontSize: 11, letterSpacing: '0.16em', color: '#707070', marginBottom: 24 }}>SERVICE, DELHI</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 32 }}>
          {serviceItems.map((sv) => (
            <div key={sv.title} style={{ borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: 16 }}>
              <div style={{ fontWeight: 700 }}>{sv.title}</div>
              <div style={{ fontSize: 14, color: '#707070', marginTop: 6 }}>{sv.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 56 }}>
        <Link href="/finder" className="btn btn-dark">Find your machine</Link>
      </div>
    </main>
  );
}
