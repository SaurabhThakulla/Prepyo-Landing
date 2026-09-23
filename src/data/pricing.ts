/**
 * Pricing shown on the marketing site.
 *
 * Extracted from SubscriptionSection so the Product/Offer structured data can
 * be generated from the same numbers the table renders. Two copies of a price
 * is how a page ends up advertising one figure to Google and another to the
 * visitor.
 */
export interface ExactPricingPlan {
  id: string;
  name: string;
  /** English sense of the Nepali name, so it never depends on knowing the word. */
  gloss: string;
  priceNPR: number;
  /** Original price before discount — shown as a strikethrough. Omit for free. */
  originalPriceNPR?: number;
  subtitle: string;
  popular: boolean;
  cta: string;
}

/**
 * These must agree with the `plans` table, which is what checkout actually
 * charges and what the app enforces. Nothing here is fetched — the two live in
 * separate repositories — so a change to plan quotas has to be made in both.
 *
 * Names are the learner's journey: Suru (start), Abhyas (practice), Taiyari
 * (preparation), Udaan (take-off). Roman script rather than Devanagari because
 * the site's fonts carry no Devanagari and would fall back to a broken face.
 *
 * `subtitle` is the plan's real duration. It used to read "Per month" on all
 * four, which was wrong on all four: nothing here renews, and the durations are
 * lifetime, 7, 33 and 97 days.
 */
export const EXACT_PLANS: ExactPricingPlan[] = [
  {
    id: "free",
    name: "Suru",
    gloss: "Start",
    priceNPR: 0,
    subtitle: "Free forever",
    popular: false,
    cta: "Get Started",
  },
  {
    id: "weekly",
    name: "Abhyas",
    gloss: "Practice",
    priceNPR: 99,
    subtitle: "One-time · 7 days",
    popular: false,
    cta: "Get Started",
  },
  {
    id: "pro",
    name: "Taiyari",
    gloss: "Preparation",
    priceNPR: 299,
    subtitle: "One-time · 33 days",
    popular: true,
    cta: "Get Started",
  },
  {
    id: "elite",
    name: "Udaan",
    gloss: "Take-off",
    priceNPR: 999,
    subtitle: "One-time · 33 days",
    popular: false,
    cta: "Get Started",
  },
];

/**
 * Values are positional: index 0 is Suru, 3 is Udaan.
 *
 * Every number here is what the backend enforces, matching the subscription comparison table.
 * Mock periods are stated because the two models differ: the free mock is
 * lifetime, paid allowances reset each calendar month.
 */
export const FEATURES: { label: string; values: (string | boolean)[] }[] = [
  { label: "Practice sub-tests per day", values: ["5", "40", "50", "Unlimited"] },
  {
    label: "Section mock tests",
    values: [false, "10 / week", "20 / calendar month", "Unlimited"],
  },
  {
    label: "Full mock exams",
    values: ["1 lifetime", "2", "5 / calendar month", "Unlimited"],
  },
  {
    label: "AI tutor messages",
    values: ["10 / day", "100 / day", "100 / day", "Unlimited"],
  },
  { label: "Sentence-level rewrites", values: [false, true, true, true] },
  { label: "AI score breakdown", values: ["Basic", "Standard", true, true] },
  { label: "Bonus prep days", values: [false, false, "+3 days", "+3 days"] },
  {
    label: "Access duration",
    values: ["Lifetime", "7 days", "33 days", "33 days"],
  },
];
