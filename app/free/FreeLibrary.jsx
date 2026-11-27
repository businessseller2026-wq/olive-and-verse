'use client';
import { useEffect, useState } from 'react';
import SignupForm from '@/components/SignupForm';

const KEY = 'ov-free-unlocked';

export default function FreeLibrary({ items }) {
  const [unlocked, setUnlocked] = useState(false);
  useEffect(() => {
    try { if (localStorage.getItem(KEY) === '1') setUnlocked(true); } catch {}
  }, []);
  const onSuccess = () => {
    setUnlocked(true);
    try { localStorage.setItem(KEY, '1'); } catch {}
  };

  return (
    <>
      <section>
        <div className="wrap grid cols-auto-340" style={{ paddingTop: 64, paddingBottom: 64, gap: 48, alignItems: 'center' }}>
          <div className="stack">
            <p className="eyebrow">How it works</p>
            <h2 style={{ fontSize: 38 }}>Enter your email, then download</h2>
            <ol className="muted stack" style={{ margin: 0, paddingLeft: 22, gap: 8, fontSize: 17, lineHeight: 1.6 }}>
              <li>Enter your email.</li>
              <li>The free library unlocks on this page.</li>
              <li>You&apos;ll also get the links by email to keep.</li>
            </ol>
          </div>
          {unlocked ? (
            <div className="card" role="status">
              <h3 className="h-sm">You&apos;re in!</h3>
              <p className="muted">Your free printables are below, and we&apos;ve emailed you the links too.</p>
            </div>
          ) : (
            <SignupForm variant="full" source="free-page" onSuccess={onSuccess} buttonLabel="Unlock the free library" />
          )}
        </div>
      </section>
      <section className="bg-linen">
        <div className="wrap stack" style={{ paddingTop: 72, paddingBottom: 88, gap: 32 }}>
          <h2 style={{ fontSize: 36 }}>What&apos;s in the free library</h2>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 28 }}>
            {items.map((f) => (
              <div key={f.title} style={{ background: 'var(--cream-2)', display: 'flex', flexDirection: 'column' }}>
                <div className="img-ph" style={{ aspectRatio: '4 / 3', background: 'var(--cream)', position: 'relative' }}>
                  <img src="/images/wreath.webp" alt="" style={{ width: 70, height: 68, objectFit: 'contain', opacity: 0.8 }} />
                  {!unlocked && (
                    <span className="badge" style={{ left: 'auto', right: 12, background: 'var(--green)', color: 'var(--on-green)' }}>Free with email</span>
                  )}
                </div>
                <div className="stack" style={{ padding: 20, gap: 8 }}>
                  <h3 style={{ fontSize: 20 }}>{f.title}</h3>
                  <p className="muted" style={{ fontSize: 15 }}>{f.desc}</p>
                  {unlocked && (f.url ? (
                    <a href={f.url} className="btn btn-green btn-sm" target="_blank" rel="noopener noreferrer" download>Download PDF</a>
                  ) : (
                    <span className="small">Coming soon</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
