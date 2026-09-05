/**
 * Where the marketing site points people once they want to actually use Prepyo.
 *
 * The landing site is deployed separately from the Next.js app, so every
 * "Sign up" / "Login" / "Dashboard" link has to be an absolute URL into that
 * app rather than a same-site path. Its "/" is the sign-in screen.
 *
 * The default is production rather than localhost: a wrong default here is
 * invisible in dev and ships broken links, so the deployed value is the one
 * that costs nothing to get right. Point it elsewhere with a local .env.
 */
export const APP_URL = (import.meta.env.PUBLIC_APP_URL ?? 'https://dashboard.prepyo.online').replace(/\/$/, '');

/** Builds an absolute link into the Next.js app. */
export function appUrl(path: string): string {
  return `${APP_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * The path this site is served from — "/" on a custom domain, "/Prepyo-Online/"
 * on GitHub Pages.
 *
 * Astro rewrites the asset URLs it generates itself, but a path written by hand
 * in markup (`/images/hero.jpg`) is left alone and would resolve against the
 * domain root, so those go through `asset()` instead.
 */
export const BASE_PATH = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

/** Resolves a file in `public/` against the deployed base path. */
export function asset(path: string): string {
  return `${BASE_PATH}${path.replace(/^\//, '')}`;
}

export type ExamType = 'PTE' | 'IELTS';

