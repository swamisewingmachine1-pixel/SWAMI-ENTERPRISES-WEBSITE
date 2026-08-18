'use client';

import { useState } from 'react';

export default function MobileNav({ color = '#151515' }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Menu"
        style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color }}
      >
        ☰
      </button>
      {open && (
        <div
          style={{
            position: 'fixed', inset: 0, background: '#050505', zIndex: 1002,
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            padding: '80px clamp(28px,8vw,60px)', gap: 26,
          }}
        >
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            style={{ position: 'absolute', top: 26, right: 28, color: '#F7F7F5', fontSize: 24, background: 'none', border: 'none', cursor: 'pointer' }}
          >
            ×
          </button>
          {[
            ['Home', '/'],
            ['Machines', '/machines'],
            ['Find Your Machine', '/finder'],
            ['Compare', '/compare'],
            ['Industries', '/industries'],
            ['Solutions', '/solutions'],
            ['About', '/about'],
            ['Contact', '/contact'],
          ].map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} style={{ fontSize: 28, fontWeight: 600, color: '#F7F7F5' }}>
              {label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
