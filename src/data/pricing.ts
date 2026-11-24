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
  /** After the price; "/ 30 days" when left out. */
  period?: string;
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

/**
 * UPSC CDS and NCC plans, shown to visitors in India, priced in Indian rupees
 * (the field, like the backend column, is called priceNPR). The CDS ones must
 * agree with the `plans` rows of migration 000215. The NCC ones are the user's
 * prices of 2026-11-24 and have no `plans` row yet. Kept out of EXACT_PLANS so the
 * Nepal page, its FAQ and its structured data are unchanged.
 */
export const INDIA_PLANS: ExactPricingPlan[] = [
  {
    id: "free",
    name: "Basic",
    exams: "UPSC CDS and NCC",
    priceNPR: 0,
    subtitle: "Free forever, nothing to buy",
    popular: false,
    cta: "Continue for free",
    features: [
      "CDS and NCC practice",
      "5 practice tasks a day",
      "1 full mock exam",
      "UPSC 1/3 negative marking",
    ],
  },
  {
    id: "cds_monthly",
    name: "CDS Monthly",
    exams: "UPSC CDS",
    priceNPR: 199,
    subtitle: "One-time · 30 days",
    popular: false,
    cta: "Get CDS Monthly",
    features: [
      "30 days of UPSC CDS",
      "Every CDS paper, English, GK and Maths",
      "Answer keys and explanations",
      "Mistake Notebook",
    ],
  },
  {
    id: "cds_annual",
    name: "CDS 1-Year Pass",
    exams: "UPSC CDS",
    priceNPR: 1199,
    period: "/ year",
    subtitle: "One-time · 365 days",
    popular: true,
    cta: "Get the 1-Year Pass",
    features: [
      "365 days of UPSC CDS",
      "Every CDS paper, English, GK and Maths",
      "Answer keys and explanations",
      "Mistake Notebook",
    ],
  },
  {
    id: "ncc_b",
    name: "NCC B Certificate",
    exams: "NCC",
    priceNPR: 199,
    subtitle: "One-time · 30 days",
    popular: false,
    cta: "Get NCC B",
    features: [
      "30 days of NCC B certificate practice",
      "Full timed practice papers",
      "Answer keys and explanations",
      "Mistake Notebook",
    ],
  },
  {
    id: "ncc_c",
    name: "NCC C Certificate",
    exams: "NCC",
    priceNPR: 299,
    subtitle: "One-time · 30 days",
    popular: false,
    cta: "Get NCC C",
    features: [
      "30 days of NCC C certificate practice",
      "Full timed practice papers",
      "Answer keys and explanations",
      "Mistake Notebook",
    ],
  },
];
