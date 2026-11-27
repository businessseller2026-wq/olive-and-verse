import Link from 'next/link';
import { Divider, Cover, SignupBand, PSALM_119_105 } from '@/components/bits';
import { TITLES } from '@/data/products';
import { getAllPosts, formatDate } from '@/lib/posts';
import { SITE } from '@/lib/site';

export default function Home() {
  const featured = TITLES.filter((t) => t.featured).slice(0, 4);
  const posts = getAllPosts().slice(0, 3);
  return (
    <>
      <section className="hero bg-green">
        <div className="corner" aria-hidden="true" style={{ left: -20, top: -10, transform: 'scaleX(-1) rotate(8deg)' }} />
        <div className="corner" aria-hidden="true" style={{ right: -20, top: -10, transform: 'rotate(-8deg)' }} />
        <div className="corner" aria-hidden="true" style={{ left: -20, bottom: -20, transform: 'scale(-1,-1) rotate(-8deg)' }} />
        <div className="corner" aria-hidden="true" style={{ right: -20, bottom: -20, transform: 'scaleY(-1) rotate(8deg)' }} />
        <div className="hero-inner">
          <img src="/images/wreath.webp" alt="Olive and Verse logo: olive wreath with a gold cross" style={{ width: 230, height: 223, objectFit: 'contain' }} />
          <h1 className="h-xl">{SITE.name}</h1>
          <p style={{ fontSize: 28, color: '#EDE3D2' }}>{SITE.tagline}</p>
          <Divider />
          <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--on-green-2)', maxWidth: 540 }}>
            Bible study journals, printable verse cards and devotional resources for women, men, kids and families.
          </p>
          <div className="row" style={{ justifyContent: 'center', marginTop: 6 }}>
            <Link href="/shop" className="btn btn-gold">Shop printables</Link>
            <Link href="/books" className="btn btn-outline-light">Browse journals</Link>
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="narrow stack" style={{ paddingTop: 88, paddingBottom: 88, textAlign: 'center', alignItems: 'center', gap: 18 }}>
          <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 34, lineHeight: 1.35 }}>“{PSALM_119_105.kjv}”</p>
          <p style={{ fontSize: 17, color: 'var(--muted-2)' }}>{PSALM_119_105.web}</p>
          <p className="eyebrow">{PSALM_119_105.reference} · KJV &amp; WEB</p>
        </div>
      </section>

      <section className="bg-cream border-top">
        <div className="wrap section stack" style={{ gap: 40 }}>
          <div className="stack" style={{ gap: 10 }}>
            <p className="eyebrow">The shop</p>
            <h2 className="h-md">Find what you need</h2>
          </div>
          <div className="grid cols-auto-280" style={{ gap: 28 }}>
            <Link href="/shop" className="card">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#5E6140" strokeWidth="1.4" aria-hidden="true"><path d="M7 3h7l5 5v13H7z" /><path d="M14 3v5h5" /><path d="M10 13h6M10 17h6" /></svg>
              <h3 className="h-sm">Printables &amp; PNGs</h3>
              <p className="muted">Instant-download journals, verse cards, reading plans and art. US Letter and A4.</p>
              <span style={{ fontWeight: 600, color: 'var(--green)' }}>Shop downloads →</span>
            </Link>
            <Link href="/books" className="card">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#5E6140" strokeWidth="1.4" aria-hidden="true"><path d="M4 5h6a2 2 0 0 1 2 2v13a2 2 0 0 0-2-2H4z" /><path d="M20 5h-6a2 2 0 0 0-2 2v13a2 2 0 0 1 2-2h6z" /></svg>
              <h3 className="h-sm">Journals &amp; Books</h3>
              <p className="muted">Printed paperbacks, sold and shipped by Amazon.</p>
              <span style={{ fontWeight: 600, color: 'var(--green)' }}>See the books →</span>
            </Link>
            <div className="card dashed">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#5E6140" strokeWidth="1.4" aria-hidden="true"><path d="M5 8h11v8a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z" /><path d="M16 10h1.5a2.5 2.5 0 0 1 0 5H16" /></svg>
              <h3 className="h-sm">Shirts &amp; Mugs</h3>
              <p className="muted">Verse apparel and gifts, printed to order.</p>
              <span className="eyebrow">Coming soon</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-linen">
        <div className="wrap section stack" style={{ gap: 40 }}>
          <div className="between">
            <div className="stack" style={{ gap: 10 }}>
              <p className="eyebrow">Journals</p>
              <h2 className="h-md">Featured journals</h2>
            </div>
            <Link href="/books" style={{ fontWeight: 600 }}>View all books →</Link>
          </div>
          <div className="grid cols-auto-240" style={{ gap: 28 }}>
            {featured.map((t) => (
              <article key={t.slug} className="stack">
                <Cover name={t.name} image={t.image} />
                <h3 style={{ fontSize: 20 }}>{t.name}</h3>
                <p className="muted" style={{ fontSize: 15 }}>{t.summary}</p>
                <div className="row" style={{ gap: 10 }}>
                  {t.amazonUrl ? (
                    <a href={t.amazonUrl} className="btn btn-green btn-sm" target="_blank" rel="noopener noreferrer">Buy on Amazon</a>
                  ) : (
                    <span className="btn btn-green btn-sm disabled">Amazon link soon</span>
                  )}
                  <Link href={`/shop/${t.slug}`} className="btn btn-outline btn-sm">Printable version</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {posts.length > 0 && (
        <section className="bg-cream">
          <div className="wrap section stack" style={{ gap: 40 }}>
            <div className="between">
              <div className="stack" style={{ gap: 10 }}>
                <p className="eyebrow">From the blog</p>
                <h2 className="h-md">Study and reflect</h2>
              </div>
              <Link href="/blog" style={{ fontWeight: 600 }}>All posts →</Link>
            </div>
            <div className="grid cols-auto-300">
              {posts.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="post-card">
                  <div className="img-ph" style={{ aspectRatio: '3 / 2' }}>{p.image ? <img src={p.image} alt="" /> : 'Olive and Verse'}</div>
                  <p className="eyebrow" style={{ fontSize: 12 }}>{p.category}</p>
                  <h3 style={{ fontSize: 24, lineHeight: 1.3 }}>{p.title}</h3>
                  <p className="small">{formatDate(p.date)}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <SignupBand source="home" />
    </>
  );
}
