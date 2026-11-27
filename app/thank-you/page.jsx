import Link from 'next/link';
import { PageBanner } from '@/components/bits';
import { getPaidSession, decodeItems } from '@/lib/stripe';
import ClearCart from './ClearCart';

export const metadata = { title: 'Thank you', robots: { index: false } };
export const dynamic = 'force-dynamic';

export default async function ThankYou({ searchParams }) {
  const sp = await searchParams;
  const sessionId = sp?.session_id ? String(sp.session_id) : '';
  const session = await getPaidSession(sessionId);

  if (!session) {
    return (
      <>
        <PageBanner crumb="Order" title="We couldn't find that order" />
        <section><div className="narrow stack" style={{ paddingTop: 48, paddingBottom: 88 }}>
          <p className="muted">If you just paid, wait a moment and refresh this page. Still stuck? Email us and we&apos;ll send your files.</p>
          <Link href="/shop" className="btn btn-outline" style={{ alignSelf: 'flex-start' }}>Back to the shop</Link>
        </div></section>
      </>
    );
  }

  const lines = decodeItems(session.metadata?.items);
  const email = session.customer_details?.email;
  return (
    <>
      <ClearCart />
      <PageBanner crumb="Order" title="Thank you!" sub={`Your downloads are below. We also emailed the link${email ? ` to ${email}` : ''}.`} />
      <section>
        <div className="narrow stack" style={{ maxWidth: 860, paddingTop: 48, paddingBottom: 88, gap: 0 }}>
          {lines.map((l) => (
            <div key={`${l.slug}-${l.license}`} className="cart-line" style={{ gridTemplateColumns: '1fr auto' }}>
              <div className="stack" style={{ gap: 4 }}>
                <span style={{ fontFamily: 'var(--serif)', fontSize: 20 }}>{l.product.name}</span>
                <span className="small">{l.license === 'group' ? 'Church & Group' : 'Personal'} license</span>
              </div>
              <div className="row" style={{ justifyContent: 'flex-end', gap: 8 }}>
                {l.files.length ? (
                  l.files.map((f, idx) => (
                    <a key={f} className="btn btn-green btn-sm" href={`/api/download?${new URLSearchParams({ session_id: session.id, slug: l.slug, license: l.license, file: String(idx) })}`}>
                      Download {f.split('/').pop().replace(/\.[a-z0-9]+$/i, '').replace(/[-_]+/g, ' ')}
                    </a>
                  ))
                ) : (
                  <span className="small">Files are being prepared. We&apos;ll email them to you.</span>
                )}
              </div>
            </div>
          ))}
          <p className="small" style={{ marginTop: 24 }}>Bookmark this page or keep the email: the links always work for your order.</p>
        </div>
      </section>
    </>
  );
}
