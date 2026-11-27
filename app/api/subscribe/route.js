import { NextResponse } from 'next/server';
import { addContact, sendFreebieEmail } from '@/lib/email';
import { supabaseAdmin, publicFileUrl } from '@/lib/supabase';
import { FREEBIES } from '@/data/freebies';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Bad request.' }, { status: 400 });
  }
  const email = String(body?.email || '').trim().toLowerCase().slice(0, 200);
  const name = String(body?.name || '').trim().slice(0, 80);
  const newsletter = body?.newsletter !== false;
  const source = String(body?.source || 'site').slice(0, 60);
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });

  const db = supabaseAdmin();
  if (db) {
    await db.from('subscribers').upsert({ email, name: name || null, newsletter, source }, { onConflict: 'email' }).then(() => {}, () => {});
  }
  try {
    await addContact({ email, name, newsletter });
  } catch (e) {
    console.error('resend contact failed', e?.message);
  }
  const items = FREEBIES.map((f) => ({ title: f.title, url: f.file ? publicFileUrl('free', f.file) : null }));
  try {
    await sendFreebieEmail({ to: email, name, items });
  } catch (e) {
    console.error('freebie email failed', e?.message);
  }
  return NextResponse.json({ ok: true });
}
