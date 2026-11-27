'use client';
import Link from 'next/link';
import { useState } from 'react';
import { NAV, SITE } from '@/lib/site';
import { useCart } from './CartProvider';

export default function Header() {
  const [open, setOpen] = useState(false);
  const cart = useCart();
  const count = cart?.items.length || 0;
  return (
    <header className="site-header">
      <div className="wrap" style={{ position: 'relative' }}>
        <Link href="/" className="brand">
          <img src="/images/wreath.webp" alt="" />
          <span>{SITE.name}</span>
        </Link>
        <nav className={`nav${open ? ' open' : ''}`} aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)}>{n.label}</Link>
          ))}
        </nav>
        <div className="row" style={{ gap: 4, flexWrap: 'nowrap' }}>
          <Link href="/blog" className="icon-btn" aria-label="Search the blog">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg>
          </Link>
          <Link href="/cart" className="icon-btn" aria-label={`Cart, ${count} item${count === 1 ? '' : 's'}`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M5 7h14l-1.5 12h-11z" /><path d="M9 7a3 3 0 0 1 6 0" /></svg>
            {count > 0 && <span className="cart-count">{count}</span>}
          </Link>
          <button type="button" className="icon-btn menu-toggle" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          </button>
        </div>
      </div>
    </header>
  );
}
