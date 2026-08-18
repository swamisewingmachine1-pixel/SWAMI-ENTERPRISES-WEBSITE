'use client';

import { useState } from 'react';
import { track } from '@vercel/analytics';

// No backend/database exists for this site, so this composes the real submission into a
// WhatsApp message rather than pretending to save it somewhere it wouldn't actually go.
export default function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  function submit(e) {
    e.preventDefault();
    track('contact_submitted', { hasMessage: !!message });
    const text = `Hi Swami Enterprises, my name is ${name} (${phone}).\n\n${message || "I'd like to know more about your machines."}`;
    window.open('https://wa.me/919971336656?text=' + encodeURIComponent(text), '_blank');
    setSent(true);
  }

  if (sent) {
    return (
      <div className="panel" style={{ padding: 32, marginTop: 24 }}>
        <div style={{ fontWeight: 700, fontSize: 18 }}>Opening WhatsApp…</div>
        <div style={{ color: '#707070', fontSize: 14, marginTop: 8 }}>
          If it didn&rsquo;t open automatically, message us directly at{' '}
          <a href="https://wa.me/919971336656" style={{ color: '#0A5CFF' }}>+91 99713 36656</a>.
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 420, marginTop: 24 }}>
      <input
        type="text" required placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}
        style={{ padding: 14, border: '1px solid rgba(0,0,0,0.18)', background: 'transparent', fontSize: 14, fontFamily: 'Manrope, sans-serif' }}
      />
      <input
        type="tel" required placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)}
        style={{ padding: 14, border: '1px solid rgba(0,0,0,0.18)', background: 'transparent', fontSize: 14, fontFamily: 'Manrope, sans-serif' }}
      />
      <textarea
        placeholder="What are you looking for?" value={message} onChange={(e) => setMessage(e.target.value)} rows={4}
        style={{ padding: 14, border: '1px solid rgba(0,0,0,0.18)', background: 'transparent', fontSize: 14, fontFamily: 'Manrope, sans-serif', resize: 'vertical' }}
      />
      <button type="submit" className="btn btn-dark" style={{ border: 'none', marginTop: 8 }}>Send via WhatsApp</button>
    </form>
  );
}
