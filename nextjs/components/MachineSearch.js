'use client';

import { useMemo, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { track } from '@vercel/analytics';

// Client-side filter over the full (server-rendered) machine list — the unfiltered list is
// already in the initial HTML for crawlers/no-JS; this only adds interactive narrowing on top.
export default function MachineSearch({ categories }) {
  const [query, setQuery] = useState('');
  const trackTimer = useRef(null);

  const flat = useMemo(() => categories.flatMap((g) => g.items), [categories]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categories;
    const order = categories.map((g) => g.cat);
    const matches = flat.filter((m) => m.searchTerms.some((t) => t.includes(q) || q.includes(t)));
    return order
      .map((cat) => ({ cat, items: matches.filter((m) => m.category === cat) }))
      .filter((g) => g.items.length > 0);
  }, [query, categories, flat]);

  useEffect(() => {
    if (!query.trim()) return;
    clearTimeout(trackTimer.current);
    trackTimer.current = setTimeout(() => {
      track('search', { query: query.trim().toLowerCase(), resultCount: filtered.reduce((n, g) => n + g.items.length, 0) });
    }, 600);
    return () => clearTimeout(trackTimer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by model, category or application — try “F6”, “lockstitch”, “denim”"
        style={{
          width: '100%', maxWidth: 640, marginTop: 32, padding: '16px 0', border: 'none',
          borderBottom: '1px solid rgba(0,0,0,0.2)', background: 'transparent', fontSize: 16,
          fontFamily: 'Manrope, sans-serif', color: '#151515', outline: 'none',
        }}
      />

      {filtered.length === 0 && (
        <div style={{ marginTop: 40, maxWidth: 480 }}>
          <div style={{ fontWeight: 700, fontSize: 18 }}>No exact match for &ldquo;{query}&rdquo;.</div>
          <div style={{ fontSize: 14, color: '#4A4A4A', marginTop: 8 }}>
            Our published catalogue is growing. A specialist can confirm what fits your production today.
          </div>
        </div>
      )}

      <div className="grid-cats">
        {filtered.map((group) => (
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
    </div>
  );
}
