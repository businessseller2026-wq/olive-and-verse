import { PageBanner } from './bits';

export default function InfoPage({ title, sub, children }) {
  return (
    <>
      <PageBanner crumb={title} title={title} sub={sub} />
      <section>
        <div className="narrow prose" style={{ paddingTop: 56, paddingBottom: 88 }}>{children}</div>
      </section>
    </>
  );
}
