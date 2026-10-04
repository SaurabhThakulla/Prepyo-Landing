/**
 * The 7-day price comparison under the pricing table.
 *
 * Every competitor figure here was read off a page that is linked in `source`,
 * on the date in PRICES_CHECKED. Naming another company's price is a factual
 * claim about them: if a figure cannot be traced to a page, it does not go in,
 * and the comparison is price and plan length only — no ticks and crosses for
 * features we have not verified they lack.
 *
 * Re-check every row before changing PRICES_CHECKED. Prices move.
 */
import { EXACT_PLANS } from '@/data/pricing';

export const PRICES_CHECKED = '2026-10-04';

export interface PriceRow {
  name: string;
  /** The plan compared: 7 days, or the nearest length on offer. */
  plan: string;
  price: string;
  note?: string;
  source?: { label: string; href: string };
  isPrepyo?: boolean;
}

const weekly = EXACT_PLANS.find(plan => plan.id === 'weekly')!;

export const PRICE_ROWS: PriceRow[] = [
  {
    name: 'Prepyo',
    plan: '7 days',
    price: `NPR ${weekly.priceNPR}`,
    note: 'PTE and IELTS. A free plan is also available.',
    isPrepyo: true,
  },
  {
    name: 'APEUni VIP',
    plan: '7 days',
    price: 'NPR 749',
    note: 'Price from APE Nepal, a local reseller.',
    source: { label: 'apenepal.org', href: 'https://apenepal.org/apeuni-vip-nepal' },
  },
  {
    name: 'Gurully Prime',
    plan: '7 days',
    price: 'NPR 900',
    note: 'PTE & Duolingo plan. Their IELTS & CELPIP 7-day plan is NPR 300.',
    source: { label: 'gurully.com', href: 'https://www.gurully.com/pricing' },
  },
  {
    name: 'AlfaPTE Premium',
    plan: '10 days',
    price: 'No 7-day plan',
    note: 'Plans run for 10, 30, 60 or 90 days.',
    source: { label: 'alfapte.com', href: 'https://alfapte.com/pricing-plans/subscription' },
  },
];
