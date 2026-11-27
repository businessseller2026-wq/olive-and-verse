import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts, getPost, formatDate, slugifyCategory } from '@/lib/posts';
import { TITLES } from '@/data/products';
import { Cover, SignupBand } from '@/components/bits';

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt, openGraph: { title: post.title, description: post.excerpt, images: post.image ? [post.image] : [] } };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const product = post.product ? TITLES.find((t) => t.slug === post.product) : null;
  const related = getAllPosts().filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <article>
        <div className="narrow stack" style={{ paddingTop: 56, paddingBottom: 40, gap: 18 }}>
          <nav aria-label="Breadcrumb" className="small">
            <Link href="/blog">Blog</Link> / <Link href={`/blog?cat=${slugifyCategory(post.category)}`}>{post.category}</Link>
          </nav>
          <p className="eyebrow">{post.category}</p>
          <h1 className="h-lg" style={{ lineHeight: 1.1 }}>{post.title}</h1>
          <p className="small">{formatDate(post.date)} · {post.minutes} min read</p>
        </div>
        {post.image && (
          <div className="wrap" style={{ maxWidth: 1040 }}>
            <div className="img-ph" style={{ aspectRatio: '16 / 7' }}><img src={post.image} alt="" /></div>
          </div>
        )}
        <div className="narrow prose" style={{ paddingTop: 48, paddingBottom: 24, maxWidth: 680 }} dangerouslySetInnerHTML={{ __html: post.html }} />

        {product && (
          <div className="narrow" style={{ maxWidth: 680, paddingTop: 16, paddingBottom: 56 }}>
            <div className="bg-green row" style={{ padding: 28, gap: 24, alignItems: 'center' }}>
              <Cover name={product.name} image={product.image} size="sm" />
              <div className="stack" style={{ flex: 1, minWidth: 220, gap: 10 }}>
                <p className="eyebrow" style={{ fontSize: 12 }}>Use it with</p>
                <p style={{ fontFamily: 'var(--serif)', fontSize: 24 }}>{product.name}</p>
                <div className="row" style={{ gap: 10 }}>
                  {product.amazonUrl && <a href={product.amazonUrl} target="_blank" rel="noopener noreferrer" className="btn btn-gold btn-sm">Buy on Amazon</a>}
                  <Link href={`/shop/${product.slug}`} className="btn btn-outline-light btn-sm">Printable version</Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {related.length > 0 && (
          <div className="border-top">
            <div className="wrap stack" style={{ paddingTop: 56, paddingBottom: 80, gap: 28 }}>
              <h2 style={{ fontSize: 32 }}>Keep reading</h2>
              <div className="grid cols-auto-280">
                {related.map((p) => (
                  <Link key={p.slug} href={`/blog/${p.slug}`} className="post-card">
                    <div className="img-ph" style={{ aspectRatio: '3 / 2' }}>{p.image ? <img src={p.image} alt="" /> : 'Olive and Verse'}</div>
                    <p className="eyebrow" style={{ fontSize: 12 }}>{p.category}</p>
                    <h3 style={{ fontSize: 22, lineHeight: 1.3 }}>{p.title}</h3>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </article>
      <SignupBand source={`post-${post.slug}`} />
    </>
  );
}
