import { Resend } from 'resend';
import { SITE } from './site';

let resend = null;
function client() {
  if (resend) return resend;
  if (!process.env.RESEND_API_KEY) return null;
  resend = new Resend(process.env.RESEND_API_KEY);
  return resend;
}

const FROM = () => process.env.EMAIL_FROM || `${SITE.name} <${SITE.email}>`;

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function shell(title, bodyHtml) {
  return `<!doctype html><html><body style="margin:0;background:#F7F1E8;font-family:Arial,Helvetica,sans-serif;color:#2A2924">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F7F1E8"><tr><td align="center" style="padding:32px 16px">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#FBF7F0;border:1px solid #E3D7C3">
<tr><td align="center" style="background:#2F3B26;padding:28px 24px">
<img src="${SITE.url}/images/wreath.png" width="72" height="72" alt="" style="display:block;margin:0 auto 10px">
<div style="font-family:Georgia,serif;font-size:28px;color:#F5ECE1">${SITE.name}</div>
</td></tr>
<tr><td style="padding:32px 32px 24px;font-size:16px;line-height:1.6">
<h1 style="font-family:Georgia,serif;font-weight:400;font-size:26px;margin:0 0 16px">${esc(title)}</h1>
${bodyHtml}
</td></tr>
<tr><td style="padding:20px 32px 28px;font-size:12px;color:#5B574E;border-top:1px solid #E3D7C3">
${SITE.scriptureCredit}<br>Copyright ${new Date().getFullYear()} ${SITE.company}. Questions? Reply to this email or write to ${SITE.email}.
</td></tr></table></td></tr></table></body></html>`;
}

const button = (href, label) =>
  `<a href="${href}" style="display:inline-block;background:#2F3B26;color:#F5ECE1;text-decoration:none;font-weight:bold;padding:12px 20px;border-radius:2px;margin:4px 0">${esc(label)}</a>`;

export async function sendPurchaseEmail({ to, lines, sessionId }) {
  const r = client();
  if (!r || !to) return { skipped: true };
  const list = lines
    .map(
      (l) =>
        `<p style="margin:0 0 6px"><strong>${esc(l.product.name)}</strong> (${l.license === 'group' ? 'Church &amp; Group' : 'Personal'} license)</p>`
    )
    .join('');
  const link = `${SITE.url}/thank-you?session_id=${encodeURIComponent(sessionId)}`;
  const html = shell(
    'Thank you for your order',
    `<p style="margin:0 0 16px">Your printables are ready to download.</p>${list}<p style="margin:20px 0">${button(link, 'Download your files')}</p>
<p style="margin:0;color:#5B574E;font-size:14px">Keep this email: the button above always takes you back to your downloads.</p>`
  );
  return r.emails.send({ from: FROM(), to, subject: `Your ${SITE.name} downloads`, html, replyTo: SITE.email });
}

export async function sendFreebieEmail({ to, name, items }) {
  const r = client();
  if (!r || !to) return { skipped: true };
  const list = items.length
    ? items.map((f) => `<p style="margin:0 0 10px">${f.url ? button(f.url, f.title) : `<strong>${esc(f.title)}</strong> (coming soon)`}</p>`).join('')
    : '';
  const html = shell(
    `Welcome${name ? `, ${name}` : ''}!`,
    `<p style="margin:0 0 16px">Here are your free printables from ${SITE.name}.</p>${list}<p style="margin:16px 0 0">You can also find them any time at <a href="${SITE.url}/free" style="color:#2F3B26">${SITE.url.replace(/^https?:\/\//, '')}/free</a>.</p>`
  );
  return r.emails.send({ from: FROM(), to, subject: `Your free printables from ${SITE.name}`, html, replyTo: SITE.email });
}

export async function addContact({ email, name, newsletter }) {
  const r = client();
  if (!r) return { skipped: true };
  const segment = process.env.RESEND_SEGMENT_ID;
  return r.contacts.create({
    email,
    firstName: name || undefined,
    unsubscribed: !newsletter,
    ...(segment ? { segments: [{ id: segment }] } : {}),
  });
}
