// Self-check for middleware.js (the India redirect): node scripts/check-middleware.mjs
import assert from 'node:assert/strict';

const { default: middleware, regionTarget, config } = await import(new URL('../middleware.js', import.meta.url).href);
const req = (headers = {}, path = '/') => new Request('https://www.prepyo.online' + path, { headers });
const chrome = 'Mozilla/5.0 (Windows NT 10.0) Chrome/130 Safari/537.36';

assert.equal(config.matcher, '/');
assert.equal(regionTarget(req({ 'x-vercel-ip-country': 'IN', 'user-agent': chrome })), '/in/');
assert.equal(regionTarget(req({ 'x-vercel-ip-country': 'NP', 'user-agent': chrome })), null);
assert.equal(regionTarget(req({ 'user-agent': chrome })), null, 'no country header (local) stays');
assert.equal(regionTarget(req({ 'x-vercel-ip-country': 'IN', 'user-agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)' })), null, 'crawlers stay');
assert.equal(regionTarget(req({ 'x-vercel-ip-country': 'IN', 'user-agent': chrome, cookie: 'a=1; prepyo-region=np' })), null, 'chose Nepal');
assert.equal(regionTarget(req({ 'x-vercel-ip-country': 'NP', 'user-agent': chrome, cookie: 'prepyo-region=in' })), '/in/', 'chose India');
assert.equal(regionTarget(req({ 'x-vercel-ip-country': 'IN', 'user-agent': chrome, cookie: 'xprepyo-region=np' })), '/in/', 'other cookie names ignored');

const res = middleware(req({ 'x-vercel-ip-country': 'IN', 'user-agent': chrome }, '/?utm_source=ig'));
assert.equal(res.status, 307);
assert.equal(res.headers.get('location'), '/in/?utm_source=ig');
assert.equal(res.headers.get('cache-control'), 'private, no-store');
assert.equal(middleware(req({ 'x-vercel-ip-country': 'NP', 'user-agent': chrome })), undefined);
console.log('middleware checks passed');
