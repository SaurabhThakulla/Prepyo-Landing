// @ts-check
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

// Where the site is served from differs by host: Vercel, Netlify and a custom
// domain all serve it at the root, while GitHub Pages serves a project repo
// from /<repo>/. Root is the default because it is the normal case — the Pages
// workflow is the one place that overrides it.
//
// Getting this wrong is not subtle: every asset URL is built from it, so a
// mismatch 404s the stylesheet and the page renders as bare HTML.
const base = process.env.PUBLIC_BASE_PATH || '/';

// Vercel exposes the deployment's own hostname at build time, so canonical and
// Open Graph URLs stay correct on preview deploys as well as production.
const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
const site = process.env.PUBLIC_SITE_URL || (vercelHost ? `https://${vercelHost}` : 'https://prepyo.np');

// The marketing site is fully static — every section renders at build time and
// the only runtime JavaScript is the handful of inline scripts that drive the
// nav, the theme toggle, the FAQ accordion and the live pricing fetch.
export default defineConfig({
  site,
  base,
  integrations: [
    // Renders lucide icons as inline SVG at build time, so no icon library
    // ships to the browser.
    icon({ include: { lucide: ['*'] } }),
  ],
});
