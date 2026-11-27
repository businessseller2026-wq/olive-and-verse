import { NextResponse } from 'next/server';
import { getPaidSession, decodeItems } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';

// GET /api/download?session_id=cs_...&slug=...&license=personal|group&file=0
// Checks the Stripe session is paid and includes this item, then redirects to a short-lived signed link.
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('session_id');
  const slug = searchParams.get('slug');
  const license = searchParams.get('license') === 'group' ? 'group' : 'personal';
  const fileIndex = parseInt(searchParams.get('file') || '0', 10);

  const session = await getPaidSession(sessionId);
  if (!session) return new NextResponse('This download link is not valid. Please contact us for help.', { status: 403 });

  const line = decodeItems(session.metadata?.items).find((l) => l.slug === slug && l.license === license);
  const path = line?.files?.[fileIndex];
  if (!path) return new NextResponse('File not found. Please contact us for help.', { status: 404 });

  const db = supabaseAdmin();
  if (!db) return new NextResponse('Downloads are not set up yet.', { status: 503 });
  const { data, error } = await db.storage.from('downloads').createSignedUrl(path, 600, { download: true });
  if (error || !data?.signedUrl) return new NextResponse('Could not create the download. Please try again.', { status: 500 });

  db.from('download_log').insert({ stripe_session_id: session.id, slug, license, file_path: path }).then(() => {}, () => {});
  return NextResponse.redirect(data.signedUrl, 302);
}
