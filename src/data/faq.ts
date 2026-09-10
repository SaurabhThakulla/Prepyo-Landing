/**
 * The questions answered on the landing page.
 *
 * These live here rather than inside FAQSection because they are rendered
 * twice: once as the visible accordion, and once as FAQPage structured data.
 * Google requires the two to match, so they have to come from one array —
 * an answer edited in the component alone would quietly make the markup a lie.
 */
export interface Faq {
  question: string;
  answer: string;
}

export const FAQS: Faq[] = [
  {
    question: 'How accurate is the AI score?',
    answer:
      'Prepyo marks your work against the official PTE and IELTS band descriptors — the same checklist an examiner uses. Treat it as a close estimate to study against, not a guaranteed exam score.',
  },
  {
    question: 'How do I pay from Nepal?',
    answer: 'In rupees, with eSewa, Khalti, Fonepay QR or mobile banking. No dollar card needed.',
  },
  {
    question: 'Can I practise both PTE and IELTS?',
    answer: 'Yes. Switch between them any time. Your progress and mistakes are saved separately for each.',
  },
  {
    question: 'What do I get for free?',
    answer:
      'One full mock test, five practice sub-tests a day across every skill, your mistake bank and your progress. Upgrade when you need more.',
  },
  {
    question: 'Do you work with consultancies and institutes?',
    answer:
      'Yes. Run your whole batch on Prepyo and track their results in one place. Email institutes@prepyo.np.',
  },
];
