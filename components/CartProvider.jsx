'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);
const KEY = 'ov-cart';

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // [{ slug, license }]
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || '[]');
      if (Array.isArray(saved)) setItems(saved);
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch {}
  }, [items, ready]);

  const add = (slug, license) =>
    setItems((cur) => (cur.some((i) => i.slug === slug && i.license === license) ? cur : [...cur, { slug, license }]));
  const remove = (slug, license) => setItems((cur) => cur.filter((i) => !(i.slug === slug && i.license === license)));
  const clear = () => setItems([]);

  return <CartContext.Provider value={{ items, add, remove, clear, ready }}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
