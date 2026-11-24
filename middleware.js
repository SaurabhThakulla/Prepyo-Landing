/**
 * Vercel Routing Middleware: visitors from India who open the home page are
 * sent to the India home page (/in/, UPSC CDS and NCC). Runs only on "/".
 *
 * - The visitor's own choice wins: the footer's Nepal / India links set the
 *   `prepyo-region` cookie, and "np" keeps them on "/".
 * - Search engines and link previews are never redirected, so both pages stay
 *   crawlable; the hreflang links tell search engines which country gets which.
 * - 307, not 301: "/" has not moved, it is only a different page per country.
 *
 * Vercel sets `x-vercel-ip-country` from the IP. Locally (astro dev) this file
 * does not run, and on GitHub Pages neither: "/" then simply stays "/".
 */

export const config = { matcher: '/' };

const BOTS = /bot|crawl|spider|slurp|facebookexternalhit|embedly|preview|lighthouse|whatsapp|telegram/i;

/** Where "/" should send this request: "/in/" or null to stay. */
export function regionTarget(request) {
  const cookie = request.headers.get('cookie') ?? '';
  const choice = /(?:^|;\s*)prepyo-region=(np|in)(?:;|$)/.exec(cookie)?.[1];
  if (choice) return choice === 'in' ? '/in/' : null;
  if (BOTS.test(request.headers.get('user-agent') ?? '')) return null;
  return request.headers.get('x-vercel-ip-country') === 'IN' ? '/in/' : null;
}

export default function middleware(request) {
  const target = regionTarget(request);
  // Nothing returned: the request goes on to the static page.
  if (!target) return;
  const url = new URL(request.url);
  return new Response(null, {
    status: 307,
    // Keeps ?utm_… and the like; never cached, since it depends on who asks.
    headers: { Location: target + url.search, 'Cache-Control': 'private, no-store' },
  });
}
