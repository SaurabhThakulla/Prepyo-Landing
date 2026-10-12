import { FAQS } from '@/data/faq';
import { EXACT_PLANS } from '@/data/pricing';
import { appUrl, asset, CONTACT_EMAIL } from '@/consts';

/**
 * What Danfe, the helper in the corner of the landing page, can answer.
 *
 * The site is static, so there is no model behind the chat: a question is
 * matched against this list in the browser and the nearest answer is shown.
 * That is also why the answers are built from the FAQ and pricing data rather
 * than written again here — Danfe must never say something the page does not.
 */
export interface DanfeAnswer {
  question: string;
  answer: string;
  /** Words a visitor might use for this topic that the question itself lacks. */
  keywords: string[];
  link?: { href: string; label: string };
  /** Offered as a one-tap question when the chat opens. */
  suggested?: boolean;
}

const faq = (question: string) => {
  const match = FAQS.find(entry => entry.question === question);
  if (!match) throw new Error(`Danfe refers to an FAQ that no longer exists: "${question}"`);
  return match;
};

const [freePlan, ...paidPlans] = EXACT_PLANS;
// A paid plan's subtitle reads "One-time · 7 days"; the duration is the part
// worth saying, since the sentence already says the payment is a single one.
const priceList = paidPlans
  .map(plan => `${plan.name} is NPR ${plan.priceNPR} for ${plan.subtitle.split('·').pop()!.trim()}`)
  .join(', ');

export const DANFE_ANSWERS: DanfeAnswer[] = [
  {
    question: 'How much does it cost?',
    answer: `${freePlan.name} is free. The paid plans are single payments, not subscriptions: ${priceList}.`,
    keywords: ['price', 'pricing', 'plan', 'plans', 'npr', 'rupees', 'rs', 'fee', 'fees', 'paid', 'expensive', 'cheap', 'subscription'],
    link: { href: '#pricing', label: 'Compare the plans' },
    suggested: true,
  },
  {
    ...faq('What do I get for free?'),
    keywords: ['free', 'trial', 'demo', 'try', 'without', 'paying'],
    suggested: true,
  },
  {
    ...faq('How accurate is the AI score?'),
    keywords: ['accurate', 'accuracy', 'score', 'scoring', 'trust', 'real', 'reliable', 'marking', 'band', 'examiner'],
    link: { href: asset('/how-scoring-works/'), label: 'Read how the scoring works' },
    suggested: true,
  },
  {
    question: 'Should I take PTE or IELTS?',
    answer:
      'It depends on where you are applying and which format suits you. We compared the two for students in Nepal: format, scoring, fees and result times.',
    keywords: ['which', 'vs', 'versus', 'easier', 'better', 'choose', 'difference', 'compare'],
    link: { href: asset('/blog/pte-vs-ielts-nepal/'), label: 'Read PTE vs IELTS' },
    suggested: true,
  },
  {
    ...faq('How do I pay from Nepal?'),
    keywords: ['pay', 'payment', 'esewa', 'khalti', 'bank', 'card', 'dollar', 'billing', 'renew'],
  },
  {
    ...faq('Can I practise both PTE and IELTS?'),
    keywords: ['both', 'switch', 'change', 'practice', 'practise', 'two'],
  },
  {
    ...faq('Do you work with consultancies and institutes?'),
    keywords: ['consultancy', 'institute', 'academy', 'class', 'batch', 'teacher', 'students', 'school', 'bulk'],
  },
  {
    question: 'How do I start?',
    answer:
      'Create a free account, choose PTE or IELTS, and sit your first full mock test. Your score comes back when you finish.',
    keywords: ['start', 'begin', 'signup', 'sign', 'register', 'account', 'join', 'login'],
    link: { href: appUrl('/'), label: 'Get started free' },
  },
];

/** Shown when nothing in the list is a close enough match. */
export const DANFE_FALLBACK: Pick<DanfeAnswer, 'answer' | 'link'> = {
  answer: 'I do not have an answer to that yet. Email us and a person on the team will reply.',
  link: { href: `mailto:${CONTACT_EMAIL}`, label: CONTACT_EMAIL },
};
