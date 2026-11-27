import Link from 'next/link';

export default function NotFound() {
  return (
    <section>
      <div className="narrow stack" style={{ paddingTop: 96, paddingBottom: 96, alignItems: 'center', textAlign: 'center' }}>
        <img src="/images/wreath.webp" alt="" style={{ width: 120, height: 116, objectFit: 'contain' }} />
        <h1 className="h-md">Page not found</h1>
        <p className="muted">The page you were looking for isn&apos;t here.</p>
        <div className="row" style={{ justifyContent: 'center' }}>
          <Link href="/" className="btn btn-green">Go home</Link>
          <Link href="/shop" className="btn btn-outline">Visit the shop</Link>
        </div>
      </div>
    </section>
  );
}
