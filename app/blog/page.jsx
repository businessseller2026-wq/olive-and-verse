import Link from 'next/link';
import { getAllPosts, CATEGORIES, slugifyCategory, formatDate } from '@/lib/posts';
import { SignupBand } from '@/components/bits';

export const metadata = { title: 'Blog', description: 'Bible study how-tos, short devotionals and free printables.' };

const PER_PAGE = 9;

export default async function BlogIndex({ searchParams }) {
  const sp = await searchParams;
  const q = (sp?.q || '').toString().trim();
  const cat = (sp?.cat || '').toString();
  const page = Math.max(1, parseInt(sp?.page || '1', 10) || 1);

  let posts = getAllPosts();
  if (cat) posts = posts.filter((p) => slugifyCategory(p.category) === cat);
  if (q) {
    const ql = q.toLowerCase();
    posts = posts.filter((p) => `${p.title} ${p.excerpt} ${p.content}`.toLowerCase().includes(ql));
  }
  const showFeatured = !q && !cat && page === 1 && posts.length > 0;
  const featured = showFeatured ? posts[0] : null;
  const rest = showFeatured ? posts.slice(1) : posts;
  const pages = Math.max(1, Math.ceil(rest.length / PER_PAGE));
  const shown = rest.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const link = (p) => `/blog?${new URLSearchParams({ ...(cat && { cat }), ...(q && { q }), page: String(p) })}`;

  return (
    <>
      <section className="bg-green">
        <div className="wrap stack" style={{ paddingTop: 64, paddingBottom: 64, alignItems: 'center', textAlign: 'center' }}>
          <p className="eyebrow">The Olive and Verse blog</p>
          <h1 className="h-lg">Study and reflect</h1>
          <p style={{ fontSize: 18, color: 'var(--on-green-2)', maxWidth: 560 }}>Bible study how-tos, short devotionals and free printables to use with your journal.</p>
          <form action="/blog" className="row" style={{ justifyContent: 'center', width: '100%', maxWidth: 520, marginTop: 8, gap: 10 }}>
            <label htmlFor="blog-q" className="sr-only">Search the blog</label>
            <input id="blog-q" name="q" type="search" defaultValue={q} placeholder="Search posts" className="input" style={{ flex: 1, minWidth: 220, width: 'auto' }} />
            <button className="btn btn-gold">Search</button>
          </form>
        </div>
      </section>

      <nav aria-label="Blog categories" style={{ borderBottom: '1px solid var(--line)' }}>
        <div className="wrap row" style={{ justifyContent: 'center', paddingTop: 18, paddingBottom: 18, gap: 10 }}>
          <Link href="/blog" className={`pill${!cat ? ' active' : ''}`}>All posts</Link>
          {CATEGORIES.map((c) => (
            <Link key={c} href={`/blog?cat=${slugifyCategory(c)}`} className={`pill${cat === slugifyCategory(c) ? ' active' : ''}`}>{c}</Link>
          ))}
        </div>
      </nav>

      {featured && (
        <section>
          <div className="wrap" style={{ paddingTop: 64, paddingBottom: 32 }}>
            <Link href={`/blog/${featured.slug}`} className="post-card grid cols-auto-340" style={{ gap: 40, alignItems: 'center' }}>
              <div className="img-ph" style={{ aspectRatio: '3 / 2' }}>
                {featured.image ? <img src={featured.image} alt="" /> : <img src="/images/wreath.webp" alt="" style={{ width: 160, height: 155, objectFit: 'contain' }} />}
              </div>
              <div className="stack">
                <p className="eyebrow">Featured · {featured.category}</p>
                <h2 className="h-md">{featured.title}</h2>
                <p className="muted" style={{ fontSize: 17, lineHeight: 1.6 }}>{featured.excerpt}</p>
                <p className="small">{formatDate(featured.date)} · {featured.minutes} min read</p>
                <span style={{ fontWeight: 600, color: 'var(--green)' }}>Read the post →</span>
              </div>
            </Link>
          </div>
        </section>
      )}

      <section>
        <div className="wrap stack" style={{ paddingTop: 32, paddingBottom: 88, gap: 32 }}>
          {(q || cat) && <p className="small">{posts.length} post{posts.length === 1 ? '' : 's'} found{q ? ` for “${q}”` : ''}.</p>}
          {shown.length > 0 && <h2 style={{ fontSize: 32 }}>{q || cat ? 'Posts' : 'Latest posts'}</h2>}
          {posts.length === 0 && <p className="muted">No posts yet. Check back soon.</p>}
          <div className="grid cols-auto-300" style={{ gap: '40px 32px' }}>
            {shown.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="post-card">
                <div className="img-ph" style={{ aspectRatio: '3 / 2' }}>{p.image ? <img src={p.image} alt="" /> : 'Olive and Verse'}</div>
                <p className="eyebrow" style={{ fontSize: 12 }}>{p.category}</p>
                <h3 style={{ fontSize: 24, lineHeight: 1.3 }}>{p.title}</h3>
                <p className="muted" style={{ fontSize: 15 }}>{p.excerpt}</p>
              </Link>
            ))}
          </div>
          {pages > 1 && (
            <nav aria-label="Pages" className="row" style={{ justifyContent: 'center', gap: 8 }}>
              {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                <Link key={n} href={link(n)} aria-current={n === page ? 'page' : undefined} className={`btn btn-sm ${n === page ? 'btn-green' : 'btn-outline'}`}>{n}</Link>
              ))}
            </nav>
          )}
        </div>
      </section>
      <SignupBand source="blog" />
    </>
  );
}
