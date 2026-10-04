import type { APIRoute } from 'astro';
import { asset, CONTACT_EMAIL, GOOGLE_BUSINESS_URL, KOREAN_LIVE, SOCIAL_LINKS } from '@/consts';
import { EPS_PAGE, IELTS_PAGE, PTE_PAGE } from '@/data/exam-pages';

/**
 * llms.txt (llmstxt.org): a plain summary of the site for language-model
 * crawlers, with the pages worth reading and what each one answers.
 *
 * Generated for the same reason robots.txt is — the links have to be absolute
 * and the origin differs per deploy — and so it follows KOREAN_LIVE instead of
 * advertising pages that are not launched.
 */
export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL('https://prepyo.online');
  const link = (path: string) => new URL(asset(path), origin).href;

  const exams = KOREAN_LIVE ? 'PTE Academic, IELTS Academic and EPS-TOPIK (Korean)' : 'PTE Academic and IELTS Academic';

  const pages = [
    `- [Prepyo home](${link('/')}): what Prepyo is, the plans and prices in NPR, and general FAQs.`,
    `- [${PTE_PAGE.name} preparation](${link(PTE_PAGE.slug)}): ${PTE_PAGE.metaDescription}`,
    `- [${IELTS_PAGE.name} preparation](${link(IELTS_PAGE.slug)}): ${IELTS_PAGE.metaDescription}`,
    ...(KOREAN_LIVE
      ? [
          `- [${EPS_PAGE.name} preparation](${link(EPS_PAGE.slug)}): ${EPS_PAGE.metaDescription}`,
          `- [Learn Korean](${link('/learn-korean/')}): a free beginner Korean course from Hangul to the EPS-TOPIK question types.`,
        ]
      : []),
    `- [How scoring works](${link('/how-scoring-works/')}): the criteria Prepyo marks answers against, and what an estimated score cannot tell you.`,
    `- [Careers](${link('/careers/')}): open roles at Prepyo.`,
  ];

  const body = [
    '# Prepyo',
    '',
    `> Prepyo is an online test-preparation platform for learners in Nepal, covering ${exams}. It offers full-length mock exams and task-by-task practice with instant AI feedback, scored against the criteria the test owners publish. Payments are in Nepali rupees via eSewa, Khalti and Fonepay.`,
    '',
    `Prepyo is independent: it is not affiliated with ${KOREAN_LIVE ? 'Pearson, IDP, the British Council, Cambridge or HRD Korea' : 'Pearson, IDP, the British Council or Cambridge'}, and its scores are estimates for practice, not official results.`,
    '',
    '## Pages',
    '',
    ...pages,
    '',
    '## Contact',
    '',
    `- Email: ${CONTACT_EMAIL}`,
    ...SOCIAL_LINKS.map(social => `- ${social.label}: ${social.href}`),
    `- Google Maps (Tikapur, Kailali, Nepal): ${GOOGLE_BUSINESS_URL}`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
