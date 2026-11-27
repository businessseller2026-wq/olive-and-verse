import Link from 'next/link';
import { SITE } from '@/lib/site';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="wrap stack" style={{ paddingTop: 56, paddingBottom: 40, gap: 32 }}>
        <div className="cols">
          <div className="stack" style={{ gap: 10 }}>
            <div className="row" style={{ gap: 12 }}>
              <img src="/images/wreath.webp" alt="" style={{ width: 48, height: 48, objectFit: 'contain' }} />
              <span style={{ fontFamily: 'var(--serif)', fontSize: 24 }}>{SITE.name}</span>
            </div>
            <p className="muted" style={{ fontSize: 15 }}>{SITE.tagline}</p>
          </div>
          <nav aria-label="Footer">
            <div>
              <strong>Shop</strong>
              <Link href="/shop">Printables</Link>
              <Link href="/books">Books</Link>
              <Link href="/shop?type=Bundles">Bundles</Link>
              <Link href="/licenses">Church &amp; group licenses</Link>
            </div>
            <div>
              <strong>Help</strong>
              <Link href="/help">FAQ &amp; download help</Link>
              <a href={`mailto:${SITE.email}`}>Contact</a>
              <Link href="/terms">Terms of use</Link>
              <Link href="/privacy">Privacy</Link>
            </div>
          </nav>
        </div>
        <div className="legal">
          <p>{SITE.scriptureCredit}</p>
          <p>Copyright {year} {SITE.company}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
