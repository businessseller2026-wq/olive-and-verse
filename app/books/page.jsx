import Link from 'next/link';
import { PageBanner, Cover } from '@/components/bits';
import { SERIES, TITLES } from '@/data/products';

export const metadata = { title: 'Journals & Books', description: 'Bible study journals as 6 x 9 paperbacks on Amazon and as printables.' };

export default function Books() {
  return (
    <>
      <PageBanner crumb="Books" title="Journals & Books" sub="Every journal comes as a 6 x 9 paperback on Amazon, and most also come as a printable you can download here." />
      <section>
        <div className="wrap" style={{ paddingTop: 24 }}>
          <nav aria-label="Jump to series" className="row" style={{ gap: 10, padding: '16px 0', borderBottom: '1px solid var(--line)' }}>
            {SERIES.map((s) => <a key={s.id} href={`#${s.id}`} className="pill">{s.name}</a>)}
          </nav>
        </div>
        <div className="wrap stack" style={{ paddingTop: 32, paddingBottom: 88, gap: 56 }}>
          {SERIES.map((s) => {
            const books = TITLES.filter((t) => t.series === s.id && t.paperback);
            if (!books.length) return null;
            return (
              <div key={s.id} id={s.id} className="stack" style={{ gap: 22, scrollMarginTop: 90 }}>
                <div className="stack" style={{ gap: 6 }}>
                  <h2 style={{ fontSize: 34 }}>{s.name}</h2>
                  <p className="muted">{s.desc}</p>
                </div>
                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
                  {books.map((b) => (
                    <article key={b.slug} className="card row" style={{ padding: 20, gap: 18, alignItems: 'flex-start', flexWrap: 'nowrap' }}>
                      <Cover name={b.name} image={b.image} size="sm" />
                      <div className="stack" style={{ gap: 10, minWidth: 0 }}>
                        <h3 style={{ fontSize: 19, lineHeight: 1.3 }}>{b.name}</h3>
                        <div className="row" style={{ gap: 8 }}>
                          {b.amazonUrl ? (
                            <a href={b.amazonUrl} target="_blank" rel="noopener noreferrer" className="btn btn-green btn-sm" style={{ fontSize: 13, padding: '0 14px' }}>Buy on Amazon</a>
                          ) : (
                            <span className="btn btn-green btn-sm disabled" style={{ fontSize: 13, padding: '0 14px' }}>Amazon soon</span>
                          )}
                          {b.printable && <Link href={`/shop/${b.slug}`} className="btn btn-outline btn-sm" style={{ fontSize: 13, padding: '0 14px' }}>Printable</Link>}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
