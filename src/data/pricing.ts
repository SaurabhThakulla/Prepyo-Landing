/**
 * Pricing shown on the marketing site.
 *
 * Extracted from SubscriptionSection so the Product/Offer structured data can
 * be generated from the same numbers the cards render. Two copies of a price
 * is how a page ends up advertising one figure to Google and another to the
 * visitor.
 */
export interface ExactPricingPlan {
  id: string;
  name: string;
  /** The exams the plan is premium on. */
  exams: string;
  priceNPR: number;
  subtitle: string;
  popular: boolean;
  cta: string;
  features: string[];
}

/**
 * These must agree with the `plans` table (migrations 000205 and 000206),
 * which is what checkout charges and the app enforces. Nothing here is
 * fetched — the two live in separate repositories — so a change to plan
 * quotas has to be made in both. Abhyas and Taiyari are no longer sold.
 */
export const EXACT_PLANS: ExactPricingPlan[] = [
  {
    id: "free",
    name: "Basic",
    exams: "Every exam",
    priceNPR: 0,
    subtitle: "Free forever, nothing to buy",
    popular: false,
    cta: "Continue for free",
    features: [
      "PTE, IELTS, EPS-TOPIK and JLPT practice",
      "5 practice tasks a day",
      "5 AI gradings a month",
      "1 full mock exam",
      "Limited AI tutor",
    ],
  },
  {
    id: "elite_asia",
    name: "EPS-TOPIK & JLPT Premium",
    exams: "Korean and Japanese",
    priceNPR: 249,
    subtitle: "One-time · 30 days",
    popular: false,
    cta: "Get Premium",
    features: [
      "Everything in Basic",
      "Unlimited EPS-TOPIK and JLPT practice",
      "Help in English on every item",
      "AI tutor",
      "IELTS and PTE stay on Basic",
    ],
  },
  {
    id: "elite",
    name: "IELTS & PTE Premium",
    exams: "Every exam",
    priceNPR: 499,
    subtitle: "One-time · 30 days",
    popular: true,
    cta: "Get Premium",
    features: [
      "Everything in EPS-TOPIK & JLPT Premium",
      "Unlimited IELTS and PTE practice",
      "1,100 AI gradings for speaking & writing",
      "12 full mock exams",
      "Maximum AI tutor",
      "Priority evaluation queue",
    ],
  },
];
