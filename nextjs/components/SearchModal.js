'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { track } from '@vercel/analytics';
import { industries, solutions } from '../lib/content';
import { getAllMachines } from '../lib/machines';

export default function SearchModal() {
  const machines = getAllMachines();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    function onKey(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
        setQuery('');
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const q = query.trim().toLowerCase();
  const machineHits = useMemo(
    () => (q ? machines.filter((m) => m.searchTerms.some((t) => t.includes(q) || q.includes(t))) : []),
    [q, machines]
  );
  const industryHits = q ? industries.filter((i) => i.name.toLowerCase().includes(q)) : [];
  const solutionHits = q ? solutions.filter((s) => s.name.toLowerCase().includes(q)) : [];

  useEffect(() => {
    if (!q) return;
    const t = setTimeout(() => track('search', { query: q, resultCount: machineHits.length }), 600);
    return () => clearTimeout(t);
  }, [q, machineHits.length]);

  function go(href) {
    setOpen(false);
    router.push(href);
  }

  if (!open) return null;

  return (
    <div
      onClick={() => setOpen(false)}
      style={{ position: 'fixed', inset: 0, zIndex: 3000, background: '#F7F7F5', padding: '14vh 24px 40px', overflowY: 'auto' }}
    >
      <div style={{ maxWidth: 680, margin: '0 auto' }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Swami Enterprises"
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: 26, color: '#151515', fontFamily: 'Manrope, sans-serif' }}
          />
          <button onClick={() => setOpen(false)} style={{ color: '#8A8A8A', fontSize: 13, background: 'none', border: 'none', cursor: 'pointer' }}>ESC</button>
        </div>

        <div style={{ marginTop: 36 }}>
          {!q && (
            <>
              <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color: '#8A8A8A', marginBottom: 16 }}>QUICK LINKS</div>
              {[['Explore Machines', '/machines'], ['Find Your Machine', '/finder'], ['Industries', '/industries'], ['Solutions', '/solutions'], ['Compare Machines', '/compare']].map(([label, href]) => (
                <div key={href} onClick={() => go(href)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', cursor: 'pointer' }}>
                  <span>→</span>
                  <span style={{ fontWeight: 600, fontSize: 15 }}>{label}</span>
                </div>
              ))}
            </>
          )}

          {q && machineHits.length === 0 && industryHits.length === 0 && solutionHits.length === 0 && (
            <div>
              <div style={{ color: '#4A4A4A', fontSize: 15 }}>No matching machines or solutions.</div>
              <div style={{ display: 'flex', gap: 20, marginTop: 20, flexWrap: 'wrap' }}>
                <span onClick={() => go('/machines')} style={{ fontSize: 13, cursor: 'pointer', borderBottom: '1px solid rgba(0,0,0,0.2)' }}>Explore Machines</span>
                <span onClick={() => go('/finder')} style={{ fontSize: 13, cursor: 'pointer', borderBottom: '1px solid rgba(0,0,0,0.2)' }}>Find Your Machine</span>
              </div>
            </div>
          )}

          {machineHits.length > 0 && (
            <div style={{ marginBottom: 28 }}>
              <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color: '#8A8A8A', marginBottom: 12 }}>MACHINES</div>
              {machineHits.map((m) => (
                <div key={m.id} onClick={() => go(`/machines/${m.id}`)} style={{ padding: '14px 0', borderTop: '1px solid rgba(0,0,0,0.08)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 600 }}>{m.model}</div>
                    <div style={{ fontSize: 13, color: '#707070', marginTop: 4 }}>{m.category}</div>
                  </div>
                  <span style={{ color: '#0A5CFF', fontSize: 16 }}>→</span>
                </div>
              ))}
            </div>
          )}
          {industryHits.length > 0 && (
            <div style={{ marginBottom: 28 }}>
              <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color: '#8A8A8A', marginBottom: 12 }}>INDUSTRIES</div>
              {industryHits.map((i) => (
                <div key={i.key} onClick={() => go('/industries')} style={{ padding: '14px 0', borderTop: '1px solid rgba(0,0,0,0.08)', cursor: 'pointer' }}>
                  <div style={{ fontSize: 18, fontWeight: 600 }}>{i.name}</div>
                </div>
              ))}
            </div>
          )}
          {solutionHits.length > 0 && (
            <div>
              <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color: '#8A8A8A', marginBottom: 12 }}>SOLUTIONS</div>
              {solutionHits.map((s) => (
                <div key={s.key} onClick={() => go('/solutions')} style={{ padding: '14px 0', borderTop: '1px solid rgba(0,0,0,0.08)', cursor: 'pointer' }}>
                  <div style={{ fontSize: 18, fontWeight: 600 }}>{s.name}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
