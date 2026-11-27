import { NextResponse } from 'next/server';
import { getSellable, LICENSES } from '@/data/products';
import { getStripe, encodeItems } from '@/lib/stripe';
import { SITE } from '@/lib/site';

export async function POST(req) {
  const stripe = getStripe();
  if (!stripe) return NextResponse.json({ error: 'Checkout is not set up yet.' }, { status: 503 });

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Bad request.' }, { status: 400 });
  }
  const raw = Array.isArray(body?.items) ? body.items.slice(0, 30) : [];

  // Prices always come from the server catalog, never from the browser.
  const seen = new Set();
  const items = [];
  for (const i of raw) {
    const license = i?.license === 'group' ? 'group' : 'personal';
    const p = getSellable(String(i?.slug || ''));
    if (!p) continue;
    const price = license === 'group' ? p.groupPrice : p.price;
    const key = `${p.slug}:${license}`;
    if (price == null || seen.has(key)) continue;
    seen.add(key);
    items.push({ slug: p.slug, license, name: p.name, price });
  }
  if (!items.length) return NextResponse.json({ error: 'Your cart has no items that can be bought yet.' }, { status: 400 });

  const encoded = encodeItems(items);
  if (encoded.length > 500) return NextResponse.json({ error: 'Too many items for one order. Please split it into two orders.' }, { status: 400 });

  const origin = process.env.NEXT_PUBLIC_SITE_URL || req.headers.get('origin') || SITE.url;
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: items.map((i) => ({
        quantity: 1,
        price_data: {
          currency: 'usd',
          unit_amount: i.price,
          product_data: { name: `${i.name} (Printable)`, description: `${LICENSES[i.license].name} license · digital download` },
        },
      })),
      metadata: { items: encoded },
      payment_intent_data: { metadata: { items: encoded } },
      allow_promotion_codes: true,
      ...(process.env.STRIPE_AUTOMATIC_TAX === 'true' ? { automatic_tax: { enabled: true } } : {}),
      success_url: `${origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
    });
    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error('checkout error', e?.message);
    return NextResponse.json({ error: 'Could not start checkout. Please try again.' }, { status: 500 });
  }
}
