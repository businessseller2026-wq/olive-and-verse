'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/components/CartProvider';
import { LICENSES } from '@/data/products';
import { formatPrice } from '@/lib/site';

export default function CartView({ catalog }) {
  const { items, remove, ready } = useCart();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  if (!ready) return null;
  const lines = items
    .map((i) => {
      const p = catalog[i.slug];
      if (!p) return null;
      const price = i.license === 'group' ? p.groupPrice : p.price;
      return price == null ? null : { ...i, name: p.name, price };
    })
    .filter(Boolean);
  const total = lines.reduce((s, l) => s + l.price, 0);

  async function checkout() {
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: lines.map(({ slug, license }) => ({ slug, license })) }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || 'Checkout is not available right now.');
      window.location.href = data.url;
    } catch (e) {
      setError(e.message);
      setBusy(false);
    }
  }

  if (!lines.length) {
    return (
      <div className="stack" style={{ alignItems: 'flex-start' }}>
        <p className="muted" style={{ fontSize: 18 }}>Your cart is empty.</p>
        <Link href="/shop" className="btn btn-green">Browse printables</Link>
      </div>
    );
  }

  return (
    <div className="stack" style={{ gap: 24 }}>
      <div>
        {lines.map((l) => (
          <div key={`${l.slug}-${l.license}`} className="cart-line">
            <div className="stack" style={{ gap: 4 }}>
              <Link href={`/shop/${l.slug}`} style={{ fontFamily: 'var(--serif)', fontSize: 20, color: 'var(--ink)', textDecoration: 'none' }}>{l.name}</Link>
              <span className="small">{LICENSES[l.license].name} license · Printable download</span>
            </div>
            <span style={{ fontWeight: 600 }}>{formatPrice(l.price)}</span>
            <button type="button" className="btn btn-outline btn-sm" onClick={() => remove(l.slug, l.license)} aria-label={`Remove ${l.name}`}>Remove</button>
          </div>
        ))}
      </div>
      <div className="between" style={{ alignItems: 'center' }}>
        <p style={{ fontSize: 22 }}>Total <strong>{formatPrice(total)}</strong></p>
        <button type="button" className="btn btn-green" style={{ minHeight: 52, fontSize: 17 }} onClick={checkout} disabled={busy}>
          {busy ? 'Opening secure checkout…' : 'Check out'}
        </button>
      </div>
      {error && <p className="error" role="alert">{error}</p>}
      <p className="small">You&apos;ll pay on Stripe&apos;s secure checkout page. Your downloads appear right after payment and are emailed to you.</p>
    </div>
  );
}
