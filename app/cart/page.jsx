import { PageBanner } from '@/components/bits';
import CartView from './CartView';
import { allSellableSlugs, getSellable } from '@/data/products';

export const metadata = { title: 'Cart', robots: { index: false } };

export default function CartPage() {
  const catalog = Object.fromEntries(
    allSellableSlugs().map((s) => {
      const p = getSellable(s);
      return [s, { name: p.name, price: p.price, groupPrice: p.groupPrice }];
    })
  );
  return (
    <>
      <PageBanner crumb="Cart" title="Your cart" />
      <section>
        <div className="narrow" style={{ maxWidth: 860, paddingTop: 48, paddingBottom: 88 }}>
          <CartView catalog={catalog} />
        </div>
      </section>
    </>
  );
}
