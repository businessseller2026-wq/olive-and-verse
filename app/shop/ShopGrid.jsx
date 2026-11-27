'use client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { formatPrice } from '@/lib/site';

const TYPES = ['Printable download', 'Paperback (Amazon)', 'Bundles'];
const BADGE = { 'Printable download': 'Instant download', 'Paperback (Amazon)': 'Paperback · Amazon', Bundles: 'Bundle' };
const BG = { 'Printable download': ['#EBE0D0', '#2A2924'], 'Paperback (Amazon)': ['#2F3B26', '#F5ECE1'], Bundles: ['#E2D3B8', '#2A2924'] };

export default function ShopGrid({ items, series, audiences, initialType }) {
  const [types, setTypes] = useState(initialType && TYPES.includes(initialType) ? [initialType] : []);
  const [aud, setAud] = useState([]);
  const [ser, setSer] = useState([]);
  const [sort, setSort] = useState('featured');

  const toggle = (list, set, v) => set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const shown = useMemo(() => {
    let r = items.filter(
      (i) => (!types.length || types.includes(i.type)) && (!aud.length || i.audience.some((a) => aud.includes(a))) && (!ser.length || ser.includes(i.series))
    );
    if (sort === 'price') r = [...r].sort((a, b) => (a.price ?? 1e9) - (b.price ?? 1e9));
    if (sort === 'name') r = [...r].sort((a, b) => a.name.localeCompare(b.name));
    return r;
  }, [items, types, aud, ser, sort]);

  const Group = ({ title, options, list, set }) => (
    <fieldset className="filter">
      <legend>{title}</legend>
      {options.map((o) => (
        <label key={o.value} className="check">
          <input type="checkbox" checked={list.includes(o.value)} onChange={() => toggle(list, set, o.value)} />
          {o.label}
        </label>
      ))}
    </fieldset>
  );

  return (
    <div className="shop-layout">
      <aside aria-label="Filters">
        <p className="eyebrow">Filter</p>
        <Group title="Type" options={TYPES.map((t) => ({ value: t, label: t }))} list={types} set={setTypes} />
        <Group title="For" options={audiences.map((a) => ({ value: a, label: a }))} list={aud} set={setAud} />
        <Group title="Series" options={series.map((s) => ({ value: s.id, label: s.name }))} list={ser} set={setSer} />
        {(types.length || aud.length || ser.length) > 0 && (
          <button type="button" className="btn btn-outline btn-sm" onClick={() => { setTypes([]); setAud([]); setSer([]); }}>Clear filters</button>
        )}
      </aside>
      <div className="results">
        <div className="between" style={{ alignItems: 'center' }}>
          <p className="small" role="status">{shown.length} product{shown.length === 1 ? '' : 's'}</p>
          <label className="row" style={{ gap: 10, fontSize: 15 }}>
            Sort by
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="input" style={{ width: 'auto', minHeight: 44 }}>
              <option value="featured">Featured</option>
              <option value="name">Name</option>
              <option value="price">Price: low to high</option>
            </select>
          </label>
        </div>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '36px 28px' }}>
          {shown.map((p) => {
            const [bg, ink] = BG[p.type];
            const inner = (
              <>
                <div className="thumb" style={{ background: bg }}>
                  <span className="badge">{BADGE[p.type]}</span>
                  {p.image ? (
                    <img className="photo" src={p.image} alt="" />
                  ) : (
                    <>
                      <img src="/images/wreath.webp" alt="" style={{ width: 72, height: 70, objectFit: 'contain' }} />
                      <p style={{ fontFamily: 'var(--serif)', fontSize: 18, lineHeight: 1.25, textAlign: 'center', color: ink }}>{p.name}</p>
                    </>
                  )}
                </div>
                <h2 style={{ fontSize: 19, lineHeight: 1.3 }}>{p.name}</h2>
                <p className="small">{p.sub}</p>
                <p style={{ fontWeight: 600 }}>
                  {p.type === 'Paperback (Amazon)' ? (p.external ? 'See price on Amazon' : 'Amazon link coming soon') : formatPrice(p.price) || 'Price coming soon'}
                </p>
              </>
            );
            return p.external ? (
              <a key={p.key} href={p.href} target="_blank" rel="noopener noreferrer" className="post-card">{inner}</a>
            ) : (
              <Link key={p.key} href={p.href} className="post-card">{inner}</Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
