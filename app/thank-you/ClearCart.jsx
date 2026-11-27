'use client';
import { useEffect } from 'react';
import { useCart } from '@/components/CartProvider';

export default function ClearCart() {
  const cart = useCart();
  useEffect(() => {
    if (cart?.ready) cart.clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart?.ready]);
  return null;
}
