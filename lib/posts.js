import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

// Blog posts are Markdown files in /content/posts.
// Front matter: title, date (YYYY-MM-DD), category, excerpt, image (optional), draft (optional), product (optional title slug)
export const CATEGORIES = ['Bible Study', 'Devotionals', 'Prayer', 'Verse Reflections', 'Family Faith', 'Free Printables'];

const DIR = path.join(process.cwd(), 'content', 'posts');

export function slugifyCategory(c) {
  return c.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function readingTime(text) {
  return Math.max(1, Math.round(text.split(/\s+/).length / 220));
}

export function getAllPosts() {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const raw = fs.readFileSync(path.join(DIR, f), 'utf8');
      const { data, content } = matter(raw);
      return {
        slug: f.replace(/\.md$/, ''),
        title: data.title || f,
        date: data.date ? String(data.date instanceof Date ? data.date.toISOString().slice(0, 10) : data.date) : '',
        category: data.category || 'Bible Study',
        excerpt: data.excerpt || '',
        image: data.image || null,
        product: data.product || null,
        draft: !!data.draft,
        minutes: readingTime(content),
        content,
      };
    })
    .filter((p) => !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug) {
  const p = getAllPosts().find((x) => x.slug === slug);
  if (!p) return null;
  return { ...p, html: marked.parse(p.content) };
}

export function formatDate(d) {
  if (!d) return '';
  const dt = new Date(`${d}T12:00:00`);
  return dt.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}
