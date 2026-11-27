import InfoPage from '@/components/InfoPage';
import { SITE } from '@/lib/site';

export const metadata = { title: 'FAQ & Download Help' };

export default function Help() {
  return (
    <InfoPage title="FAQ & Download Help">
      <h2>Where are my downloads?</h2>
      <p>Right after checkout you&apos;ll land on a page with your download buttons. We also email you a link to that page. Keep the email: the link keeps working.</p>
      <h2>What paper size are the printables?</h2>
      <p>Each printable comes in US Letter and A4.</p>
      <h2>Is anything shipped?</h2>
      <p>No. Printables are digital files. Paperbacks are sold and shipped by Amazon.</p>
      <h2>Which Bible translation do you use?</h2>
      <p>The King James Version, with a plain-language line from the World English Bible, British Edition. Both are public domain.</p>
      <h2>Can I get a refund?</h2>
      <p>Because files are delivered instantly, sales are final. If a file won&apos;t open or something is wrong, email us and we&apos;ll make it right.</p>
      <h2>Still need help?</h2>
      <p>Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
    </InfoPage>
  );
}
