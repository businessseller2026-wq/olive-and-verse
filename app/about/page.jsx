import Link from 'next/link';
import { Verse, PSALM_119_105, SignupBand } from '@/components/bits';
import { SITE } from '@/lib/site';

export const metadata = { title: 'About', description: 'About Olive and Verse: Bible study journals rooted in Scripture.' };

export default function About() {
  return (
    <>
      <section className="bg-green" style={{ position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', right: -40, top: 0, bottom: 0, width: '46%', background: 'url(/images/branch.webp) no-repeat right center / contain', opacity: 0.75 }} />
        <div className="wrap stack" style={{ position: 'relative', paddingTop: 80, paddingBottom: 80, gap: 16 }}>
          <nav aria-label="Breadcrumb" className="small" style={{ color: 'var(--on-green-2)' }}><Link href="/">Home</Link> / About</nav>
          <h1 className="h-lg" style={{ maxWidth: 620 }}>About {SITE.name}</h1>
          <p style={{ fontSize: 24, color: '#EDE3D2' }}>{SITE.tagline}</p>
        </div>
      </section>
      <section>
        <div className="narrow stack" style={{ paddingTop: 72, paddingBottom: 72, gap: 24, fontSize: 18, lineHeight: 1.75 }}>
          <h2 style={{ fontSize: 34 }}>Why we make these journals</h2>
          {/* TODO(Renee): replace with your own story */}
          <p>[Your story: why you started Olive and Verse and who it&apos;s for.]</p>
          <h2 style={{ fontSize: 34, marginTop: 16 }}>The name</h2>
          <p>The olive tree stands for peace and steady growth. The verse is God&apos;s word, the root it grows from.</p>
          <Verse {...PSALM_119_105} />
        </div>
      </section>
      <section className="bg-linen">
        <div className="wrap grid cols-auto-280" style={{ paddingTop: 72, paddingBottom: 72 }}>
          <div className="stack" style={{ gap: 10 }}>
            <h3 style={{ fontSize: 24 }}>Scripture we use</h3>
            <p className="muted" style={{ lineHeight: 1.65 }}>Every journal uses the King James Version, with a plain-language line from the World English Bible. Both are public domain.</p>
          </div>
          <div className="stack" style={{ gap: 10 }}>
            <h3 style={{ fontSize: 24 }}>For everyone</h3>
            <p className="muted" style={{ lineHeight: 1.65 }}>Journals for women, men, kids, teens and couples, plus church and group licenses.</p>
          </div>
          <div className="stack" style={{ gap: 10 }}>
            <h3 style={{ fontSize: 24 }}>Print or paperback</h3>
            <p className="muted" style={{ lineHeight: 1.65 }}>Download a printable today, or order the paperback from Amazon.</p>
          </div>
        </div>
      </section>
      <SignupBand source="about" />
    </>
  );
}
