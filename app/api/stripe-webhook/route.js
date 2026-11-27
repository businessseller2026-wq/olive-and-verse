import { NextResponse } from 'next/server';
import { getStripe, decodeItems } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';
import { sendPurchaseEmail } from '@/lib/email';

export async function POST(req) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) return NextResponse.json({ error: 'not configured' }, { status: 503 });

  const body = await req.text();
  let event;
  try {
    event = stripe.webhooks.constructEvent(body, req.headers.get('stripe-signature'), secret);
  } catch (e) {
    return NextResponse.json({ error: `Bad signature` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
    const session = event.data.object;
    if (session.payment_status !== 'paid') return NextResponse.json({ ok: true });
    const email = session.customer_details?.email || session.customer_email;
    const lines = decodeItems(session.metadata?.items);
    const db = supabaseAdmin();

    let alreadyEmailed = false;
    if (db) {
      const { data: existing } = await db.from('orders').select('email_sent').eq('stripe_session_id', session.id).maybeSingle();
      alreadyEmailed = !!existing?.email_sent;
      await db.from('orders').upsert(
        {
          stripe_session_id: session.id,
          email,
          name: session.customer_details?.name || null,
          amount_total: session.amount_total,
          currency: session.currency,
          items: lines.map((l) => ({ slug: l.slug, license: l.license, name: l.product.name })),
        },
        { onConflict: 'stripe_session_id' }
      );
    }

    if (!alreadyEmailed) {
      try {
        await sendPurchaseEmail({ to: email, lines, sessionId: session.id });
        if (db) await db.from('orders').update({ email_sent: true }).eq('stripe_session_id', session.id);
      } catch (e) {
        console.error('purchase email failed', e?.message);
      }
    }
  }
  return NextResponse.json({ ok: true });
}
