'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { track } from '@vercel/analytics';

const DEFAULTS = ['jack-f6', 'jack-a4c', 'jack-e4s'];
const PRIORITY = ['Max sewing speed', 'Needle', 'Motor', 'Max stitch length', 'Availability'];

export default function CompareTool({ machines }) {
  const [slots, setSlots] = useState(DEFAULTS);
  const byId = useMemo(() => Object.fromEntries(machines.map((m) => [m.id, m])), [machines]);
  const compareMachines = slots.map((id) => byId[id] || machines[0]);

  function setSlot(idx, id) {
    track('compare_slot_change', { slot: idx, id });
    setSlots((s) => {
      const next = [...s];
      next[idx] = id;
      return next;
    });
  }

  const specLabelOrder = [];
  compareMachines.forEach((m) => (m.specs || []).forEach(([k]) => { if (!specLabelOrder.includes(k)) specLabelOrder.push(k); }));
  const orderedLabels = [...PRIORITY.filter((p) => specLabelOrder.includes(p)), ...specLabelOrder.filter((l) => !PRIORITY.includes(l))].slice(0, 6);

  function sendToWhatsapp() {
    track('whatsapp_click', { view: 'compare', machines: compareMachines.map((m) => m.id).join(',') });
    const lines = compareMachines.map((m) => `• ${m.model} (${m.category}) — ${m.purpose}`).join('\n');
    const msg = `Hi Swami Enterprises, I'm interested in these machines:\n\n${lines}\n\nCan you share more details?`;
    window.open('https://wa.me/919971336656?text=' + encodeURIComponent(msg), '_blank');
  }

  return (
    <div>
      <div className="compare-pickers" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 20, maxWidth: 960, margin: '48px auto 0' }}>
        {slots.map((id, i) => {
          const m = byId[id] || machines[0];
          return (
            <div key={i}>
              <div style={{ position: 'relative' }}>
                <select
                  value={id}
                  onChange={(e) => setSlot(i, e.target.value)}
                  className="panel"
                  style={{
                    width: '100%', appearance: 'none', WebkitAppearance: 'none', border: '1px solid rgba(0,0,0,0.1)',
                    borderRadius: 14, padding: '16px 40px 16px 18px', fontFamily: 'Manrope, sans-serif', fontWeight: 700,
                    fontSize: 16, color: '#151515', cursor: 'pointer',
                  }}
                >
                  {machines.map((opt) => (
                    <option key={opt.id} value={opt.id}>{opt.model}</option>
                  ))}
                </select>
                <span style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#707070', fontSize: 11 }}>▼</span>
              </div>
              <div className="panel" style={{ marginTop: 16, padding: 8, overflow: 'hidden' }}>
                <div style={{ position: 'relative', aspectRatio: '4/3' }}>
                  <Image src={'/' + m.imgSrc} alt={m.model} fill style={{ objectFit: 'contain' }} sizes="300px" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 56, overflowX: 'auto' }}>
        <table style={{ width: '100%', maxWidth: 1080, margin: '0 auto', borderCollapse: 'collapse', minWidth: 640 }}>
          <tbody>
            <tr style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
              <td className="mono" style={{ padding: '16px 0', fontSize: 11, letterSpacing: '0.08em', color: '#707070' }}>CATEGORY</td>
              {compareMachines.map((m, i) => <td key={i} style={{ padding: '16px 20px', fontSize: 14 }}>{m.category}</td>)}
            </tr>
            <tr style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
              <td className="mono" style={{ padding: '16px 0', fontSize: 11, letterSpacing: '0.08em', color: '#707070' }}>OPERATION</td>
              {compareMachines.map((m, i) => <td key={i} style={{ padding: '16px 20px', fontSize: 14 }}>{m.operations.join(', ')}</td>)}
            </tr>
            <tr style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
              <td className="mono" style={{ padding: '16px 0', fontSize: 11, letterSpacing: '0.08em', color: '#707070' }}>APPLICATIONS</td>
              {compareMachines.map((m, i) => <td key={i} style={{ padding: '16px 20px', fontSize: 14 }}>{m.applications.join(', ')}</td>)}
            </tr>
            {orderedLabels.map((label) => (
              <tr key={label} style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
                <td className="mono" style={{ padding: '16px 0', fontSize: 11, letterSpacing: '0.08em', color: '#707070' }}>{label.toUpperCase()}</td>
                {compareMachines.map((m, i) => {
                  const found = (m.specs || []).find(([k]) => k === label);
                  return <td key={i} style={{ padding: '16px 20px', fontSize: 14 }}>{found ? found[1] : '—'}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ textAlign: 'center', marginTop: 40, display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
        <button onClick={sendToWhatsapp} className="btn" style={{ background: '#25D366', color: '#050505', border: 'none', cursor: 'pointer' }}>
          Send to WhatsApp
        </button>
      </div>
    </div>
  );
}
