import InfoPage from '@/components/InfoPage';
import { SITE } from '@/lib/site';

export const metadata = { title: 'Licenses' };

export default function Licenses() {
  return (
    <InfoPage title="Licenses" sub="What you can do with Olive and Verse printables.">
      <h2>Personal use</h2>
      <p>Print as many copies as you need for yourself and the people in your household.</p>
      <h2>Church &amp; Group</h2>
      <p>Print copies for the members of one church, small group, Bible study, class or ministry.</p>
      <h2>Not allowed with either license</h2>
      <ul>
        <li>Selling, sharing or posting the files, printed or digital.</li>
        <li>Uploading the files to shared drives or websites others can reach.</li>
        <li>Claiming the designs as your own.</li>
      </ul>
      <p>Need a license for several churches or a larger ministry? Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
    </InfoPage>
  );
}
