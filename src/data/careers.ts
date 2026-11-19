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
 * Open roles currently hiring at Prepyo. Every role is remote, within Nepal.
 * Interns are paid a monthly stipend; junior roles a monthly salary.
 * Keep each list short: three plain bullets a learner can scan in seconds.
 */
export const OPEN_ROLES: Role[] = [
  {
    id: 'junior-developer',
    title: 'Junior Developer',
    team: 'Engineering',
    location: 'Remote (Nepal)',
    type: 'FULL_TIME',
    typeLabel: 'Full-time',
    salary: 'NPR 22K / month',
    description: 'Build the features students use every day, from practice tasks to results.',
    responsibilities: [
      'Build features in our React web app',
      'Write Go API endpoints and SQL',
      'Fix bugs students report',
    ],
    requirements: [
      'Projects in JavaScript or React',
      'Basic SQL and Git',
      'A portfolio or GitHub to show',
    ],
    datePosted: '2026-11-19',
    validThrough: '2027-02-28',
  },
  {
    id: 'developer-intern',
    title: 'Developer Intern',
    team: 'Engineering',
    location: 'Remote (Nepal)',
    type: 'INTERN',
    typeLabel: 'Internship',
    salary: 'NPR 10K / month',
    description: 'Learn by shipping small, real changes to the Prepyo app.',
    responsibilities: [
      'Fix layouts and small UI tasks',
      'Write tests for existing features',
      'Learn our API with code review',
    ],
    requirements: [
      'Built something with HTML, CSS and JS',
      'Curious and asks questions early',
      'Regular hours each week',
    ],
    datePosted: '2026-11-19',
    validThrough: '2027-02-28',
  },
  {
    id: 'lead-generation-executive',
    title: 'Lead Generation Executive',
    team: 'Sales & Partnerships',
    location: 'Remote (Nepal)',
    type: 'FULL_TIME',
    typeLabel: 'Full-time',
    salary: 'NPR 22K / month',
    description: 'Find consultancies and institutes that could use Prepyo, and book demos with them.',
    responsibilities: [
      'Build lists of consultancies and institutes',
      'Reach out by phone, email and WhatsApp',
      'Book demos and track every lead',
    ],
    requirements: [
      'Confident in Nepali and English',
      'Organised and follows up on time',
      'Sales or outreach experience is a plus',
    ],
    datePosted: '2026-11-19',
    validThrough: '2027-02-28',
  },
  {
    id: 'seo-intern',
    title: 'SEO Intern',
    team: 'Marketing',
    location: 'Remote (Nepal)',
    type: 'INTERN',
    typeLabel: 'Internship',
    salary: 'NPR 10K / month',
    description: 'Help students find Prepyo when they search for exam preparation.',
    responsibilities: [
      'Research what students search for',
      'Write and improve blog posts',
      'Track results in Search Console',
    ],
    requirements: [
      'Clear written English',
      'Interest in how search works',
      'Careful with facts',
    ],
    datePosted: '2026-11-19',
    validThrough: '2027-02-28',
  },
  {
    id: 'marketing-intern',
    title: 'Marketing Intern',
    team: 'Marketing',
    location: 'Remote (Nepal)',
    type: 'INTERN',
    typeLabel: 'Internship',
    salary: 'NPR 10K / month',
    description: 'Share Prepyo with students on social media, with short videos and study tips.',
    responsibilities: [
      'Post videos on Instagram, TikTok and Facebook',
      'Write captions in Nepali and English',
      'Reply to comments and messages',
    ],
    requirements: [
      'Active on social media',
      'Basic editing in CapCut or Canva',
      'Writes well in Nepali and English',
    ],
    datePosted: '2026-11-19',
    validThrough: '2027-02-28',
  },
];

/** Why the work is worth doing, one line each. */
export const WORK_HIGHLIGHTS = [
  {
    icon: 'lucide:target',
    title: 'Real impact',
    body: 'Your work helps students pass the test that shapes their plans.',
  },
  {
    icon: 'lucide:map-pin',
    title: 'Built for Nepal',
    body: 'Rupee pricing, eSewa and Khalti, and content made for students here.',
  },
  {
    icon: 'lucide:globe',
    title: 'Work from anywhere',
    body: 'Every role is remote, anywhere in Nepal.',
  },
];

/** What an open application should contain. */
export const APPLICATION_STEPS = [
  'The role or work you want to do',
  'A link to your work: GitHub, portfolio or writing',
  'Your CV (optional)',
];
