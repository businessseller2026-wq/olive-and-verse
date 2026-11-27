import { createClient } from '@supabase/supabase-js';

let admin = null;

// Server-only client with the service role key. Never import this into a client component.
export function supabaseAdmin() {
  if (admin) return admin;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  admin = createClient(url, key, { auth: { persistSession: false } });
  return admin;
}

export function publicFileUrl(bucket, path) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url || !path) return null;
  return `${url}/storage/v1/object/public/${bucket}/${path.split('/').map(encodeURIComponent).join('/')}`;
}
