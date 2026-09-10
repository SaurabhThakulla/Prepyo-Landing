import type { APIRoute } from 'astro';
import { asset } from '@/consts';

/**
 * robots.txt is generated rather than dropped in `public/` because the one line
 * that matters — the sitemap URL — has to be absolute, and the origin differs
 * per deploy (production domain, Vercel preview, GitHub Pages sub-path).
 * A hand-written file would point previews at production.
 */
export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL('https://prepyo.online');
  const sitemap = new URL(asset('/sitemap-index.xml'), origin).href;

  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${sitemap}`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
