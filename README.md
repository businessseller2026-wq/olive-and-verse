# Olive and Verse

Website, blog and printable shop for Olive and Verse, a brand of Stem Work LLC.
Built with Next.js, Stripe (checkout), Supabase (orders and file delivery), Resend (email) and Vercel (hosting).

## Everyday edits

| To change… | Edit |
|---|---|
| Titles, prices, Amazon links, product images, download files | `data/products.js` |
| Free printables | `data/freebies.js` |
| Blog posts | add a `.md` file to `content/posts/` (copy the sample post's top section) |
| Tagline, contact email, Scripture credit | `lib/site.js` |
| About page story | `app/about/page.jsx` |

Prices are in cents (`799` = $7.99). A printable with no price shows "Price coming soon" and can't be bought.

## Paid files

1. Upload PDFs to the **private** Supabase Storage bucket `downloads` (for example `soap-women/soap-women-letter.pdf`).
2. List the paths under that product's `files.personal` and `files.group` in `data/products.js`.

Buyers get download buttons on the thank-you page and in their email. Each click checks the Stripe payment, then hands out a 10-minute link.

## Setup

1. Supabase: run `supabase/schema.sql` in the SQL Editor.
2. Vercel: import this repo, add the variables in `.env.example`.
3. Stripe: add a webhook to `https://oliveandverse.com/api/stripe-webhook` for `checkout.session.completed` and `checkout.session.async_payment_succeeded`.
4. Resend: verify the oliveandverse.com domain.

Scripture rule: KJV plus a World English Bible (British Edition) line only. No copyrighted translations.
