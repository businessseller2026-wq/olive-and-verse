export const SITE = {
  name: 'Olive and Verse',
  tagline: 'Rooted in Scripture. Growing in faith.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://oliveandverse.com',
  company: 'Stem Work LLC',
  email: 'hello@oliveandverse.com',
  scriptureCredit:
    'Scripture is from the KJV and the World English Bible, British Edition (public domain).',
};

export const NAV = [
  { href: '/shop', label: 'Shop' },
  { href: '/books', label: 'Books' },
  { href: '/free', label: 'Free Printables' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
];

export function formatPrice(cents) {
  if (cents == null) return null;
  return `$${(cents / 100).toFixed(2)}`;
}
