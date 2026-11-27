import { PageBanner } from '@/components/bits';
import ShopGrid from './ShopGrid';
import { shopItems, SERIES, AUDIENCES } from '@/data/products';

export const metadata = { title: 'Shop', description: 'Printable Bible study journals and verse art, plus paperbacks on Amazon.' };

export default async function Shop({ searchParams }) {
  const sp = await searchParams;
  return (
    <>
      <PageBanner crumb="Shop" title="Shop" sub="Printable journals download right away. Paperbacks are printed and shipped by Amazon." />
      <section>
        <div className="wrap" style={{ paddingTop: 48, paddingBottom: 88 }}>
          <ShopGrid items={shopItems()} series={SERIES} audiences={AUDIENCES} initialType={sp?.type ? String(sp.type) : null} />
        </div>
      </section>
    </>
  );
}
