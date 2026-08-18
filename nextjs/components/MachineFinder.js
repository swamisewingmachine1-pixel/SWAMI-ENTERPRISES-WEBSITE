'use client';

import { useState } from 'react';
import Link from 'next/link';
import { track } from '@vercel/analytics';
import { finderSteps, matchedMachines, buildRecommendation } from '../lib/finder';

export default function MachineFinder({ machines }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const done = step >= finderSteps.length;

  function answer(key, value) {
    track('finder_answer', { step: key, value });
    const next = { ...answers, [key]: value };
    setAnswers(next);
    const nextStep = step + 1;
    if (nextStep >= finderSteps.length) {
      const matches = matchedMachines(machines, next);
      track('finder_completed', {
        answers: JSON.stringify(next),
        matchCount: matches.length,
        matches: matches.map((m) => m.id).join(','),
      });
    }
    setStep(nextStep);
  }

  function restart() {
    track('finder_restart');
    setStep(0);
    setAnswers({});
  }

  if (done) {
    const matches = matchedMachines(machines, answers);
    const text = buildRecommendation(machines, answers);
    return (
      <div style={{ marginTop: 56, maxWidth: 640 }}>
        <div className="mono" style={{ fontSize: 11, letterSpacing: '0.16em', color: '#707070', marginBottom: 20 }}>
          YOUR PRODUCTION PROFILE
        </div>
        {finderSteps.map((s) => (
          <div key={s.key} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderTop: '1px solid rgba(0,0,0,0.1)', fontSize: 13 }}>
            <span style={{ color: '#707070' }}>{s.title}</span>
            <span style={{ fontWeight: 600 }}>{answers[s.key]}</span>
          </div>
        ))}
        <div className="panel" style={{ background: '#151515', color: '#F7F7F5', padding: 28, marginTop: 28 }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: '0.12em', color: '#8A8A8A', marginBottom: 12 }}>
            RECOMMENDED MACHINE{matches.length !== 1 ? 'S' : ''}
          </div>
          <div style={{ fontWeight: 700, fontSize: 18 }}>
            {matches.length ? matches.map((m) => m.model).join(', ') : 'Ask a specialist'}
          </div>
          <div className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', color: '#8A8A8A', marginTop: 16, marginBottom: 6 }}>WHY IT MAY FIT</div>
          <div style={{ fontSize: 14, lineHeight: 1.7 }}>{text}</div>
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
          {matches.map((m) => (
            <Link key={m.id} href={`/machines/${m.id}`} className="btn btn-dark">
              View the {m.model}
            </Link>
          ))}
          <a href="https://wa.me/919971336656" target="_blank" rel="noopener noreferrer" className="btn btn-light">
            Talk to a Specialist
          </a>
          <button onClick={restart} className="btn btn-light" style={{ border: 'none', cursor: 'pointer' }}>
            Start over
          </button>
        </div>
      </div>
    );
  }

  const current = finderSteps[step];
  return (
    <div style={{ marginTop: 56, maxWidth: 560 }}>
      <div className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', color: '#707070', marginBottom: 8 }}>
        STEP {step + 1} OF {finderSteps.length}
      </div>
      {step > 0 && (
        <button onClick={() => setStep(step - 1)} className="mono" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 11, color: '#707070', padding: 0, marginBottom: 16 }}>
          ← BACK
        </button>
      )}
      <h2 style={{ fontSize: 'clamp(24px,3vw,32px)', margin: '0 0 24px' }}>{current.title}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {current.options.map((opt) => (
          <button
            key={opt}
            onClick={() => answer(current.key, opt)}
            className="btn"
            style={{
              textAlign: 'left', padding: '22px 0', border: 'none', borderTop: '1px solid rgba(0,0,0,0.1)',
              background: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 'clamp(18px,2.4vw,24px)', color: '#151515',
            }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
