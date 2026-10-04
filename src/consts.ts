import launch from '@/data/launch.json';

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

export type ExamType = 'PTE' | 'IELTS' | 'EPS_TOPIK' | 'JAPANESE';

/**
 * Whether the Korean track (EPS-TOPIK practice and the Learn Korean course) is
 * live in the app at dashboard.prepyo.online.
 *
 * While it is false the Korean pages still build, so they can be previewed,
 * but they are marked noindex, left out of the sitemap and llms.txt, and not
 * linked from the nav, footer or exam cards — advertising a course people
 * cannot open is worse for search than not mentioning it. Flip it to true on
 * the day the app ships Korean to production.
 *
 * It lives in src/data/launch.json because astro.config.mjs reads it too, to
 * keep the pages out of the sitemap.
 */
export const KOREAN_LIVE: boolean = launch.koreanLive;

/** Public inboxes. Both are forwarded; never publish the address behind them. */
export const CONTACT_EMAIL = 'contact@prepyo.online';
export const BILLING_EMAIL = 'billing@prepyo.online';

/** Prepyo's own profiles, used for the footer and the Organization `sameAs`. */
export const SOCIAL_LINKS = [
  { label: 'Instagram', icon: 'lucide:instagram', href: 'https://www.instagram.com/tryprepyo.online/' },
  { label: 'Facebook', icon: 'lucide:facebook', href: 'https://www.facebook.com/profile.php?id=61594471394788' },
];

export const FOUNDER_NAME = 'Saurabh Thakulla';
/** The founder's public profile, for the Person `sameAs` on authored posts. */
export const FOUNDER_URL = 'https://github.com/SaurabhThakulla';

/**
 * The Google Business Profile. A `cid` link rather than the share.google short
 * link, because the cid is the listing's permanent id and resolves without a
 * redirect chain.
 */
export const GOOGLE_BUSINESS_URL = 'https://maps.google.com/?cid=9715452498547421698';

/** Must match the Google Business Profile word for word — search engines compare the two. */
export const BUSINESS_ADDRESS = {
  streetAddress: 'Ward no 1',
  addressLocality: 'Tikapur',
  addressRegion: 'Sudurpashchim Province',
  postalCode: '10901',
  addressCountry: 'NP',
};


/**
 * A link to a section of the landing page from anywhere on the site.
 *
 * The landing page's own links stay bare fragments so the smooth-scroll script
 * can claim them; every other page needs the base path in front, or the link
 * resolves against the sub-page and goes nowhere.
 */
export function homeSection(id: string): string {
  return `${BASE_PATH}#${id}`;
}
