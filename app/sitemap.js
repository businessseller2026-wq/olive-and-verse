import { SITE } from '@/lib/site';
import { getAllPosts } from '@/lib/posts';
import { allSellableSlugs } from '@/data/products';

export default function sitemap() {
  const base = SITE.url;
  const pages = ['', '/shop', '/books', '/free', '/blog', '/about', '/licenses', '/help', '/terms', '/privacy'].map((p) => ({ url: `${base}${p}` }));
  const products = allSellableSlugs().map((s) => ({ url: `${base}/shop/${s}` }));
  const posts = getAllPosts().map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: p.date || undefined }));
  return [...pages, ...products, ...posts];
}
