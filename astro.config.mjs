// @ts-check
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

// Where the site is served from differs by host: Vercel, Netlify and a custom
// domain all serve it at the root, while GitHub Pages serves a project repo
// from /<repo>/. Root is the default because it is the normal case — the Pages
// workflow is the one place that overrides it.
const base = process.env.PUBLIC_BASE_PATH || '/';

// Vercel exposes the deployment's own hostname at build time, so canonical and
// Open Graph URLs stay correct on preview deploys as well as production.
const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
const site = process.env.PUBLIC_SITE_URL || (vercelHost ? `https://${vercelHost}` : 'https://prepyo.online');

/**
 * Vite plugin that intercepts and suppresses Windows locked-file EBUSY errors
 * on root system files (e.g. C:\DumpStack.log.tmp) preventing dev server crash.
 * @type {import('vite').Plugin}
 */
const suppressEbusyPlugin = {
  name: 'suppress-ebusy',
  configureServer(server) {
    server.watcher.on('error', (error) => {
      if (error && /** @type {any} */ (error).code === 'EBUSY') {
        return;
      }
      console.error(error);
    });
  },
};

// The marketing site is fully static — every section renders at build time and
// the only runtime JavaScript is the handful of inline scripts that drive the
// nav, the theme toggle and the FAQ accordion.
//
// Pricing is not fetched. It is written into SubscriptionSection.astro and has
// to be kept in step with the `plans` table by hand.
export default defineConfig({
  site,
  base,
  integrations: [
    // Renders lucide icons as inline SVG at build time, so no icon library
    // ships to the browser.
    icon({ include: { lucide: ['*'] } }),
  ],
  vite: {
    plugins: [suppressEbusyPlugin],
    server: {
      fs: {
        strict: true,
      },
      watch: {
        ignored: [
          '**/DumpStack.log.tmp',
          '**/hiberfil.sys',
          '**/pagefile.sys',
          '**/node_modules/**',
          '**/.git/**',
        ],
      },
    },
  },
});
