import Link from 'next/link';
import SignupForm from './SignupForm';

export function Divider({ width = 360 }) {
  return (
    <div className="divider" aria-hidden="true" style={{ width }}>
      <span /><i /><span />
    </div>
  );
}

export function Verse({ kjv, web, reference }) {
  return (
    <figure className="verse-figure">
      <blockquote>“{kjv}”</blockquote>
      <p className="muted" style={{ fontSize: 16 }}>{web}</p>
      <figcaption>{reference} · KJV &amp; WEB</figcaption>
    </figure>
  );
}

export const PSALM_119_105 = {
  kjv: 'Thy word is a lamp unto my feet, and a light unto my path.',
  web: 'Your word is a lamp to my feet, and a light for my path.',
  reference: 'Psalm 119:105',
};

export function PageBanner({ crumb, title, sub }) {
  return (
    <section className="bg-green">
      <div className="wrap stack" style={{ paddingTop: 56, paddingBottom: 56, gap: 12 }}>
        <nav aria-label="Breadcrumb" className="small" style={{ color: 'var(--on-green-2)' }}>
          <Link href="/">Home</Link> / {crumb}
        </nav>
        <h1 className="h-lg">{title}</h1>
        {sub && <p style={{ fontSize: 18, color: 'var(--on-green-2)', maxWidth: 640 }}>{sub}</p>}
      </div>
    </section>
  );
}

export function Cover({ name, image, size = 'md' }) {
  return (
    <div className="cover" style={size === 'sm' ? { width: 84, padding: 10, boxShadow: 'none', flex: 'none' } : undefined}>
      {image ? (
        <img className="photo" src={image} alt={`${name} cover`} />
      ) : (
        <>
          <img src="/images/wreath.webp" alt="" style={size === 'sm' ? { width: 54, height: 52, objectFit: 'contain' } : { width: 92, height: 90, objectFit: 'contain' }} />
          {size !== 'sm' && <p>{name}</p>}
        </>
      )}
    </div>
  );
}

export function SignupBand({ source = 'band' }) {
  return (
    <section className="bg-green">
      <div className="wrap grid cols-auto-340" style={{ paddingTop: 80, paddingBottom: 80, gap: 40, alignItems: 'center' }}>
        <div className="stack">
          <p className="eyebrow">Free printable</p>
          <h2 style={{ fontSize: 40 }}>Free printables in your inbox</h2>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: '#E8E0D0' }}>Join the list for free downloads, plus a weekly verse and new printables.</p>
        </div>
        <SignupForm source={source} />
      </div>
    </section>
  );
}
