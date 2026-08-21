// @ts-check
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

// The marketing site is fully static — every section renders at build time and
// the only runtime JavaScript is the handful of inline scripts that drive the
// nav, the theme toggle, the FAQ accordion and the live pricing fetch.
export default defineConfig({
  site: 'https://prepyo.np',
  integrations: [
    // Renders lucide icons as inline SVG at build time, so no icon library
    // ships to the browser.
    icon({ include: { lucide: ['*'] } }),
  ],
});
