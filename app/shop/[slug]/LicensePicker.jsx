'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/components/CartProvider';
import { LICENSES } from '@/data/products';
import { formatPrice } from '@/lib/site';

export default function LicensePicker({ slug, price, groupPrice }) {
  const [lic, setLic] = useState('personal');
  const [added, setAdded] = useState(false);
  const cart = useCart();
  const options = [
    { id: 'personal', price },
    { id: 'group', price: groupPrice },
  ];
  const current = options.find((o) => o.id === lic);
  const buyable = current.price != null;

  return (
    <div className="stack" style={{ gap: 18 }}>
      <p style={{ fontSize: 28, fontWeight: 600 }}>{formatPrice(current.price) || 'Price coming soon'}</p>
      <fieldset style={{ border: 0, margin: 0, padding: 0 }} className="stack">
        <legend style={{ padding: '0 0 10px', fontWeight: 600, fontSize: 15 }}>License</legend>
        {options.map((o) => (
          <button key={o.id} type="button" className="license" aria-pressed={lic === o.id} onClick={() => { setLic(o.id); setAdded(false); }}>
            <span className="stack" style={{ gap: 4 }}>
              <span style={{ fontWeight: 600, fontSize: 16 }}>{LICENSES[o.id].name}</span>
              <span className="small">{LICENSES[o.id].desc}</span>
            </span>
            <span style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>{formatPrice(o.price) || '—'}</span>
          </button>
        ))}
      </fieldset>
      {added ? (
        <div className="row">
          <Link href="/cart" className="btn btn-green">Go to cart</Link>
          <span role="status" className="small">Added to your cart.</span>
        </div>
      ) : (
        <button type="button" className="btn btn-green" style={{ minHeight: 52, fontSize: 17 }} disabled={!buyable} onClick={() => { cart.add(slug, lic); setAdded(true); }}>
          {buyable ? 'Add to cart' : 'Coming soon'}
        </button>
      )}
    </div>
  );
}
