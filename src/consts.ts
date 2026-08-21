/**
 * Where the marketing site points people once they want to actually use Prepyo.
 *
 * The landing site is deployed separately from the Next.js app, so every
 * "Sign up" / "Login" / "Dashboard" link has to be an absolute URL into that
 * app rather than a same-site path.
 */
export const APP_URL = (import.meta.env.PUBLIC_APP_URL ?? 'http://localhost:3000').replace(/\/$/, '');

/**
 * Base URL of the Go API. Only the public `/subscriptions/plans` endpoint is
 * called from here, and it needs no session — but the browser still enforces
 * CORS, so this site's origin must be listed in the backend's ALLOWED_ORIGINS.
 */
export const API_BASE_URL = (import.meta.env.PUBLIC_API_BASE_URL ?? 'http://localhost:8080/api/v1').replace(/\/$/, '');

/** Builds an absolute link into the Next.js app. */
export function appUrl(path: string): string {
  return `${APP_URL}${path.startsWith('/') ? path : `/${path}`}`;
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
