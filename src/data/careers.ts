/**
 * Careers content.
 *
 * `OPEN_ROLES` is the one array to edit when a position opens or closes. The
 * page renders an open-application state while it is empty, and emits
 * JobPosting structured data for every role once it is not — so listing a role
 * here is all that is needed for it to be eligible for Google Jobs.
 *
 * Dates are ISO so they can go straight into that markup. `validThrough` is
 * required by Google for a posting to keep appearing; a role past its date
 * should be removed from this array rather than left to expire quietly.
 */

/** Where applications go. */
export const CAREERS_EMAIL = 'careers@prepyo.online';

export interface Role {
  /** Used in the URL fragment, e.g. #frontend-engineer. */
  id: string;
  title: string;
  /** e.g. "Engineering", "Content". */
  team: string;
  /** e.g. "Kathmandu", "Remote (Nepal)". */
  location: string;
  /** e.g. "Full-time", "Part-time", "Internship". */
  type: 'FULL_TIME' | 'PART_TIME' | 'CONTRACTOR' | 'INTERN';
  typeLabel: string;
  /** e.g. "NPR 90K - 150K / month" */
  salary?: string;
  /** A paragraph or two, plain text. */
  description: string;
  responsibilities: string[];
  requirements: string[];
  /** ISO date the role was posted. */
  datePosted: string;
  /** ISO date the listing should come down. */
  validThrough: string;
}

/**
 * Open roles currently hiring at Prepyo.
 */
export const OPEN_ROLES: Role[] = [
  {
    id: 'senior-software-developer',
    title: 'Senior Software Developer',
    team: 'Engineering',
    location: 'Kathmandu / Hybrid',
    type: 'FULL_TIME',
    typeLabel: 'Full-time',
    salary: 'NPR 100K – 170K / month',
    description:
      'Own the core test engine and real-time audio evaluation pipeline powering thousands of daily PTE and IELTS mock exams across Nepal.',
    responsibilities: [
      'Scale real-time speech evaluation and audio recording streaming with sub-3s latencies.',
      'Maintain reliable integrations with Supabase, Nepali payment gateways (eSewa, Khalti), and exam state synchronization.',
      'Optimize Web Audio API and client-side audio capture across low-bandwidth mobile and desktop browsers.',
      'Architect robust automated test suites guaranteeing scoring accuracy and question pool integrity.',
    ],
    requirements: [
      '3+ years of professional full-stack development experience with TypeScript, Node.js, and modern frontend frameworks.',
      'Strong grasp of relational databases (PostgreSQL/Supabase) and async event processing.',
      'Experience with web media/audio APIs or AI model inference is a huge plus.',
      'Self-driven mindset, attention to latency, and pride in writing clean, reliable code.',
    ],
    datePosted: '2026-09-01',
    validThrough: '2026-12-31',
  },
  {
    id: 'junior-ui-ux-fullstack-designer',
    title: 'Junior UI/UX Fullstack Designer',
    team: 'Design & Frontend',
    location: 'Kathmandu / Remote',
    type: 'FULL_TIME',
    typeLabel: 'Full-time',
    salary: 'NPR 50K – 90K / month',
    description:
      'Design and craft distraction-free, pixel-perfect exam interfaces and practice drills that mirror official Pearson and Cambridge exam software.',
    responsibilities: [
      'Design clean UI layouts, design systems, and responsive test interfaces for mobile and desktop.',
      'Translate Figma design tokens and component specs directly into semantic HTML and modern CSS/Tailwind.',
      'Work closely with students and tutors to conduct usability tests on real mock exams.',
      'Polish micro-animations, loading states, and accessible keyboard navigation for timed tests.',
    ],
    requirements: [
      'Strong portfolio showcasing UI/UX product design, web applications, or interactive interfaces.',
      'Proficiency in Figma and hands-on ability to code frontend components (HTML, CSS/Tailwind, JavaScript).',
      'Sharp eye for typography, whitespace, hierarchy, and micro-interactions.',
      'Deep empathy for students under high exam pressure.',
    ],
    datePosted: '2026-09-10',
    validThrough: '2026-12-31',
  },
  {
    id: 'pte-ielts-curriculum-specialist',
    title: 'PTE & IELTS Academic Content Specialist',
    team: 'Curriculum & Content',
    location: 'Kathmandu / Hybrid',
    type: 'FULL_TIME',
    typeLabel: 'Full-time',
    salary: 'NPR 60K – 100K / month',
    description:
      'Lead our item-authoring team to create authentic, Pearson and Cambridge-aligned mock questions, rubrics, and sentence rewrite models.',
    responsibilities: [
      'Develop and review authentic PTE Academic and IELTS Academic practice drills and full-length exam question sets.',
      'Calibrate AI automated marking rubrics against official CEFR and Pearson Global Scale of English benchmarks.',
      'Author high-scoring model answers, sentence rewrites, and detailed grammatical explanation guides.',
      'Analyze student common mistakes in Nepal and build targeted remedial drill tracks.',
    ],
    requirements: [
      'Demonstrated high score in PTE Academic (84+) or IELTS Academic (Band 8.0+), or equivalent English language teaching credentials.',
      'Experience teaching or developing test-preparation materials for Nepali students.',
      'Meticulous attention to spelling, punctuation, academic register, and test timing constraints.',
      'Ability to write structured, engaging educational content.',
    ],
    datePosted: '2026-09-15',
    validThrough: '2026-12-31',
  },
];

/** What the team is actually building, drawn from the product itself. */
export const WORK_HIGHLIGHTS = [
  {
    icon: 'lucide:target',
    title: 'Work that is measured',
    body: 'Every feature here is judged against one thing: whether a student walks into the test centre better prepared than they would have been. That makes it unusually easy to tell good work from busy work.',
  },
  {
    icon: 'lucide:map-pin',
    title: 'Built for Nepal first',
    body: 'Rupee pricing, eSewa and Khalti, and material written for students applying from here — not a foreign product with a local coat of paint. Knowing the audience is part of the job.',
  },
  {
    icon: 'lucide:scale',
    title: 'Claims we can defend',
    body: 'Scores are estimates and the site says so. If you have ever been asked to round a number up in a marketing meeting, you will understand why that matters to us.',
  },
];

/** What an open application should contain. */
export const APPLICATION_STEPS = [
  'Tell us which part of Prepyo you would want to work on, and why that one.',
  'Send whatever shows your work best — a repository, a portfolio, writing you are proud of, results you got somewhere else.',
  'A CV is welcome but it is the least interesting thing in the email.',
];
