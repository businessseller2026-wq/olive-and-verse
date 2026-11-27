// Olive and Verse catalog.
// Edit this file to add titles, prices, Amazon links and images.
//
// price / groupPrice: in cents (e.g. 799 = $7.99). Leave null until set;
//   a printable with no price shows "Price coming soon" and can't be bought.
// amazonUrl: the paperback's Amazon link. null = "Amazon link coming soon".
// image: a path under /public (e.g. '/images/products/soap-women.jpg'), or null.
// files: paths inside the private Supabase Storage bucket "downloads".
//   personal = the files a Personal license buyer gets,
//   group    = the files a Church & Group license buyer gets.

export const SERIES = [
  { id: '31-days', name: '31 Days', desc: 'A month of guided study in one book of the Bible.' },
  { id: 'soap', name: 'SOAP Study', desc: 'Scripture, Observation, Application, Prayer.' },
  { id: 'prayer', name: 'Prayer Journals', desc: 'Guided pages for daily prayer.' },
  { id: '365', name: '365 Daily Verse', desc: 'One verse and reflection for every day of the year.' },
  { id: 'memory', name: 'Scripture Memory', desc: 'Learn and review one verse at a time.' },
  { id: 'more', name: 'More journals', desc: 'Sermon notes, kids, teens and couples.' },
];

export const AUDIENCES = ['Women', 'Men', 'Kids & Teens', 'Couples', 'Everyone'];

const title = (o) => ({
  price: null,
  groupPrice: null,
  amazonUrl: null,
  image: null,
  printable: true,
  paperback: true,
  featured: false,
  summary: '',
  inside: '[Page count] pages.',
  files: { personal: [], group: [] },
  ...o,
});

export const TITLES = [
  title({ slug: '31-days-in-proverbs', name: '31 Days in Proverbs', series: '31-days', audience: ['Everyone'], featured: true,
    summary: 'A month of daily study in Proverbs, one chapter a day.' }),
  title({ slug: '31-days-in-psalms', name: '31 Days in Psalms', series: '31-days', audience: ['Everyone'],
    summary: 'A month of daily study in the Psalms.' }),
  title({ slug: 'womens-soap-study-journal', name: "Women's SOAP Study Journal", series: 'soap', audience: ['Women'], featured: true,
    summary: 'Guided pages for Scripture, Observation, Application and Prayer.',
    inside: '[Page count] pages: how-to guide, SOAP study pages, prayer list and reading log.' }),
  title({ slug: 'prayer-journal-for-women', name: 'Prayer Journal for Women', series: 'prayer', audience: ['Women'], featured: true,
    summary: 'Guided prayer pages with space for requests and answers.' }),
  title({ slug: '365-daily-verse-journal', name: '365 Daily Verse Journal', series: '365', audience: ['Everyone'], featured: true,
    summary: 'One verse and reflection for every day of the year.' }),
  title({ slug: '365-daily-verse-journal-women', name: '365 Daily Verse Journal for Women', series: '365', audience: ['Women'],
    summary: 'A year of daily verses and reflection pages for women.' }),
  title({ slug: '365-daily-verse-journal-men', name: '365 Daily Verse Journal for Men', series: '365', audience: ['Men'],
    summary: 'A year of daily verses and reflection pages for men.' }),
  title({ slug: 'scripture-memory-journal-women', name: 'Scripture Memory Journal for Women', series: 'memory', audience: ['Women'],
    summary: 'Learn and review one verse at a time.' }),
  title({ slug: 'scripture-memory-journal-men', name: 'Scripture Memory Journal for Men', series: 'memory', audience: ['Men'],
    summary: 'Learn and review one verse at a time.' }),
  title({ slug: 'sermon-notes-journal', name: 'Sermon Notes Journal', series: 'more', audience: ['Everyone'],
    summary: 'Pages for taking notes during church.' }),
  title({ slug: 'kids-bible-journal', name: 'Kids Bible Journal', series: 'more', audience: ['Kids & Teens'],
    summary: 'Simple Bible journal pages for kids.' }),
  title({ slug: 'teens-bible-journal', name: 'Teens Bible Journal', series: 'more', audience: ['Kids & Teens'],
    summary: 'Bible journal pages for teens.' }),
  title({ slug: 'couples-devotional', name: 'Couples Devotional', series: 'more', audience: ['Couples'],
    summary: 'Devotional pages to read and pray through together.' }),
];

export const BUNDLES = [
  { slug: '31-days-series-bundle', name: '31 Days Series Bundle', series: '31-days', audience: ['Everyone'],
    includes: ['31-days-in-proverbs', '31-days-in-psalms'], price: null, groupPrice: null, image: null,
    summary: 'Every 31 Days printable in one download.', inside: 'All 31 Days printables.',
    files: { personal: [], group: [] } },
];

// Everything sold as a download on this site (printables + bundles)
export function getSellable(slug) {
  const t = TITLES.find((x) => x.slug === slug && x.printable);
  if (t) return { ...t, kind: 'printable' };
  const b = BUNDLES.find((x) => x.slug === slug);
  if (b) return { ...b, kind: 'bundle' };
  return null;
}

export function allSellableSlugs() {
  return [...TITLES.filter((t) => t.printable).map((t) => t.slug), ...BUNDLES.map((b) => b.slug)];
}

// Cards for the Shop page
export function shopItems() {
  const items = [];
  for (const t of TITLES) {
    if (t.printable) items.push({ key: `${t.slug}-p`, slug: t.slug, name: t.name, type: 'Printable download', series: t.series, audience: t.audience, sub: 'Printable · US Letter + A4', price: t.price, image: t.image, href: `/shop/${t.slug}` });
    if (t.paperback) items.push({ key: `${t.slug}-b`, slug: t.slug, name: t.name, type: 'Paperback (Amazon)', series: t.series, audience: t.audience, sub: '6 x 9 paperback', price: null, image: t.image, href: t.amazonUrl || '/books', external: !!t.amazonUrl });
  }
  for (const b of BUNDLES) items.push({ key: `${b.slug}-x`, slug: b.slug, name: b.name, type: 'Bundles', series: b.series, audience: b.audience, sub: 'Printable bundle', price: b.price, image: b.image, href: `/shop/${b.slug}` });
  return items;
}

export const LICENSES = {
  personal: { name: 'Personal use', desc: 'For you and your household' },
  group: { name: 'Church & Group', desc: 'Print copies for one church or study group' },
};
