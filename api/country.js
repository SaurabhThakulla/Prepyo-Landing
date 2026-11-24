/**
 * GET /api/country → { "country": "IN" }: the visitor's country as Vercel sees
 * it from their IP (ISO 3166-1 alpha-2), or null when unknown. The careers page
 * uses it to show remote roles as "Remote (<their country>)".
 *
 * A Vercel Function, so it runs only on Vercel (not under astro dev). Never
 * cached: the answer depends on who asks.
 */
export default function handler(request, response) {
  const country = request.headers['x-vercel-ip-country'];
  response.setHeader('Cache-Control', 'private, no-store');
  response.status(200).json({ country: typeof country === 'string' && /^[A-Z]{2}$/.test(country) ? country : null });
}
