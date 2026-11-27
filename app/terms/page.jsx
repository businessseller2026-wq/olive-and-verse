import Link from 'next/link';
import InfoPage from '@/components/InfoPage';
import { SITE } from '@/lib/site';

export const metadata = { title: 'Terms of Use' };

// NOTE: plain-language starter terms. Have them reviewed before launch.
export default function Terms() {
  return (
    <InfoPage title="Terms of Use">
      <p>{SITE.name} is a brand of {SITE.company}. By using this site or buying from it, you agree to these terms.</p>
      <h2>Digital products</h2>
      <p>Printables are licensed, not sold. Your license type (Personal or Church &amp; Group) sets how you may use them. See <Link href="/licenses">Licenses</Link>.</p>
      <h2>Payments</h2>
      <p>Payments are processed by Stripe. We never see or store your card number.</p>
      <h2>Paperbacks</h2>
      <p>Paperback books are sold, printed and shipped by Amazon under Amazon&apos;s terms.</p>
      <h2>Refunds</h2>
      <p>Digital files are delivered instantly, so sales are final. If a file is faulty, contact us and we will fix or replace it.</p>
      <h2>Copyright</h2>
      <p>All designs and text on this site are © {SITE.company}, except Scripture, which is from public-domain translations.</p>
      <h2>Contact</h2>
      <p><a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
    </InfoPage>
  );
}
