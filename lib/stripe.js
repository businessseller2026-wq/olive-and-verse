import Stripe from 'stripe';
import { getSellable } from '@/data/products';

let stripe = null;

export function getStripe() {
  if (stripe) return stripe;
  if (!process.env.STRIPE_SECRET_KEY) return null;
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  return stripe;
}

// Cart items are stored on the Stripe session as "slug:p,slug:g" (p = personal, g = group)
export function encodeItems(items) {
  return items.map((i) => `${i.slug}:${i.license === 'group' ? 'g' : 'p'}`).join(',');
}

export function decodeItems(str) {
  if (!str) return [];
  return str
    .split(',')
    .map((part) => {
      const [slug, l] = part.split(':');
      const product = getSellable(slug);
      if (!product) return null;
      const license = l === 'g' ? 'group' : 'personal';
      return { slug, license, product, files: product.files?.[license] || [] };
    })
    .filter(Boolean);
}

export async function getPaidSession(sessionId) {
  const s = getStripe();
  if (!s || !sessionId || !/^cs_[A-Za-z0-9_]+$/.test(sessionId)) return null;
  try {
    const session = await s.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== 'paid') return null;
    return session;
  } catch {
    return null;
  }
}
