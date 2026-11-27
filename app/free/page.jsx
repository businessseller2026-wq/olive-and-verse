import { PageBanner } from '@/components/bits';
import FreeLibrary from './FreeLibrary';
import { FREEBIES } from '@/data/freebies';
import { publicFileUrl } from '@/lib/supabase';

export const metadata = { title: 'Free Printables', description: 'Free Bible verse cards, study pages and reading plans.' };

export default function FreePage() {
  const items = FREEBIES.map((f) => ({ ...f, url: f.file ? publicFileUrl('free', f.file) : null }));
  return (
    <>
      <PageBanner crumb="Free Printables" title="Free Printables" sub="Sign up once and get every free printable, plus a weekly verse by email." />
      <FreeLibrary items={items} />
    </>
  );
}
