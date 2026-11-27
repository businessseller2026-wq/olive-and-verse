'use client';
import { useState } from 'react';

// variant "band": one-line email box (home, blog). variant "full": name + email + opt-in (free page).
export default function SignupForm({ variant = 'band', source = 'site', onSuccess, buttonLabel = 'Send it to me' }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [newsletter, setNewsletter] = useState(true);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  async function submit(e) {
    e.preventDefault();
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, newsletter: variant === 'band' ? true : newsletter, source }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong.');
      setStatus('done');
      onSuccess?.(data);
    } catch (err) {
      setError(err.message);
      setStatus('idle');
    }
  }

  if (status === 'done' && !onSuccess) {
    return <p role="status" style={{ fontSize: 17 }}>Thank you! Check your inbox for your free printable.</p>;
  }

  const id = `email-${source}`;
  if (variant === 'full') {
    return (
      <form onSubmit={submit} className="card" style={{ gap: 12 }}>
        <label htmlFor={`name-${source}`} style={{ fontSize: 14, fontWeight: 500 }}>First name</label>
        <input id={`name-${source}`} className="input" value={name} onChange={(e) => setName(e.target.value)} autoComplete="given-name" />
        <label htmlFor={id} style={{ fontSize: 14, fontWeight: 500 }}>Email address</label>
        <input id={id} type="email" required className="input" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
        <label className="check" style={{ fontSize: 14, color: 'var(--muted)' }}>
          <input type="checkbox" checked={newsletter} onChange={(e) => setNewsletter(e.target.checked)} />
          Also send me the weekly verse email
        </label>
        {error && <p className="error" role="alert">{error}</p>}
        <button className="btn btn-green" disabled={status === 'sending'}>{status === 'sending' ? 'Unlocking…' : buttonLabel}</button>
      </form>
    );
  }

  return (
    <form onSubmit={submit} className="stack" style={{ gap: 10 }}>
      <label htmlFor={id} style={{ fontSize: 14, fontWeight: 500 }}>Email address</label>
      <div className="row" style={{ gap: 10 }}>
        <input id={id} type="email" required className="input" style={{ flex: 1, minWidth: 220, width: 'auto' }} placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
        <button className="btn btn-gold" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : buttonLabel}</button>
      </div>
      {error && <p role="alert" style={{ color: '#FFD9CF' }}>{error}</p>}
    </form>
  );
}
