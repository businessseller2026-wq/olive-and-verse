import { SITE } from '@/lib/site';

export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/cart', '/thank-you'] }],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
