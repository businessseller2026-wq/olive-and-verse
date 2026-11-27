import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSellable, allSellableSlugs, SERIES, TITLES } from '@/data/products';
import LicensePicker from './LicensePicker';

export function generateStaticParams() {
  return allSellableSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getSellable(slug);
  if (!p) return {};
  return { title: `${p.name} (Printable)`, description: p.summary };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const p = getSellable(slug);
  if (!p) notFound();
  const series = SERIES.find((s) => s.id === p.series);
  const included = p.kind === 'bundle' ? TITLES.filter((t) => p.includes.includes(t.slug)) : [];

  return (
    <>
      <section>
        <div className="wrap" style={{ paddingTop: 32 }}>
          <nav aria-label="Breadcrumb" className="small"><Link href="/">Home</Link> / <Link href="/shop">Shop</Link> / {p.name}</nav>
        </div>
        <div className="wrap grid cols-auto-340" style={{ paddingTop: 32, paddingBottom: 72, gap: 56, alignItems: 'start' }}>
          <div className="img-ph" style={{ aspectRatio: '4 / 5', flexDirection: 'column', gap: 16 }}>
            {p.image ? (
              <img src={p.image} alt={`${p.name} printable pages`} />
            ) : (
              <>
                <img src="/images/wreath.webp" alt="" style={{ width: 150, height: 145, objectFit: 'contain' }} />
                <p style={{ fontFamily: 'var(--serif)', fontSize: 30, textAlign: 'center', textTransform: 'none', letterSpacing: 0, color: 'var(--ink)', padding: '0 24px' }}>{p.name}</p>
              </>
            )}
          </div>
          <div className="stack" style={{ gap: 22 }}>
            <p className="eyebrow">{p.kind === 'bundle' ? 'Printable bundle' : 'Printable download'}{series ? ` · ${series.name}` : ''}</p>
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 44px)', lineHeight: 1.12 }}>{p.name} (Printable)</h1>
            <p className="muted" style={{ fontSize: 17, lineHeight: 1.65 }}>{p.summary} Print at home or at a print shop.</p>
            <LicensePicker slug={p.slug} price={p.price} groupPrice={p.groupPrice} />
            <div className="stack muted" style={{ gap: 8, fontSize: 15 }}>
              <p>✓ Instant download after checkout</p>
              <p>✓ US Letter and A4 PDFs included</p>
              <p>✓ Scripture from the KJV and World English Bible</p>
            </div>
            {p.kind === 'printable' && p.paperback && (
              <div className="bg-linen between" style={{ padding: '18px 20px', alignItems: 'center' }}>
                <span style={{ fontSize: 15 }}>Prefer a bound book? <strong>The 6 x 9 paperback is on Amazon.</strong></span>
                {p.amazonUrl ? (
                  <a href={p.amazonUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">Buy on Amazon</a>
                ) : (
                  <span className="btn btn-outline btn-sm disabled">Link coming soon</span>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
      <section style={{ background: 'var(--cream-2)' }} className="border-top">
        <div className="wrap grid cols-auto-280" style={{ paddingTop: 64, paddingBottom: 64, gap: 40 }}>
          <div className="stack" style={{ gap: 12 }}>
            <h2 className="h-sm">What&apos;s inside</h2>
            <p className="muted" style={{ lineHeight: 1.65 }}>{p.inside}</p>
            {included.length > 0 && (
              <ul className="muted" style={{ margin: 0, paddingLeft: 20 }}>
                {included.map((t) => <li key={t.slug}><Link href={`/shop/${t.slug}`}>{t.name}</Link></li>)}
              </ul>
            )}
          </div>
          <div className="stack" style={{ gap: 12 }}>
            <h2 className="h-sm">How it works</h2>
            <p className="muted" style={{ lineHeight: 1.65 }}>Check out, then download your PDFs from the confirmation page or your email. No physical item is shipped.</p>
          </div>
          <div className="stack" style={{ gap: 12 }}>
            <h2 className="h-sm">License terms</h2>
            <p className="muted" style={{ lineHeight: 1.65 }}>Personal: print for yourself and your household. Church &amp; Group: print copies for one church or study group. Reselling or sharing the files is not allowed. <Link href="/licenses">Full license details</Link></p>
          </div>
        </div>
      </section>
    </>
  );
}
