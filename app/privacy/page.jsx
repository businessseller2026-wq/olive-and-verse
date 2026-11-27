import InfoPage from '@/components/InfoPage';
import { SITE } from '@/lib/site';

export const metadata = { title: 'Privacy' };

// NOTE: plain-language starter policy. Have it reviewed before launch.
export default function Privacy() {
  return (
    <InfoPage title="Privacy">
      <h2>What we collect</h2>
      <ul>
        <li>Your name and email when you sign up for free printables or emails.</li>
        <li>Your name, email and order details when you buy. Card details go straight to Stripe; we never see them.</li>
        <li>Basic, cookie-free visit counts to see which pages are useful.</li>
      </ul>
      <h2>How we use it</h2>
      <p>To deliver your downloads, send emails you asked for, and answer your questions. We do not sell your information.</p>
      <h2>Services we use</h2>
      <p>Stripe (payments), Supabase (order records and file delivery), Resend (email) and Vercel (hosting).</p>
      <h2>Your choices</h2>
      <p>Every email has an unsubscribe link. To see or delete your information, email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
    </InfoPage>
  );
}
