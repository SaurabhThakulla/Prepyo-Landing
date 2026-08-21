// @ts-check
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

// GitHub Pages serves a project repo from a sub-path (/Prepyo-Online/), not the
// domain root, so `base` has to be set or every asset resolves one level too
// high. Both values are overridable for a custom-domain build, where the site
// sits at the root and PUBLIC_BASE_PATH should be "/".
const site = process.env.PUBLIC_SITE_URL || 'https://saurabhthakulla.github.io';
const base = process.env.PUBLIC_BASE_PATH || '/Prepyo-Online';

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
