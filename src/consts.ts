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

/**
 * Base URL of the API. Only the public `/subscriptions/plans` endpoint is called
 * from here and it needs no session, but the browser still enforces CORS, so
 * this site's origin must be listed in the backend's ALLOWED_ORIGINS.
 *
 * This goes through the app's /api/v1 proxy rather than straight at the Go
 * service, so there is one public hostname to keep in that allowlist.
 */
export const API_BASE_URL = (
  import.meta.env.PUBLIC_API_BASE_URL ?? 'https://dashboard.prepyo.online/api/v1'
).replace(/\/$/, '');

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

/** Mirrors the SubscriptionPlan shape returned by GET /subscriptions/plans. */
export interface SubscriptionPlan {
  id: string;
  name: string;
  priceNPR: number;
  durationMonths: number;
  durationDays: number;
  bonusDays: number;
  features: string[];
  aiEvaluationsPerDay: number;
  mockTestsIncluded: number;
  isPopular: boolean;
}
