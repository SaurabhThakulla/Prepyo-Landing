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
export const CAREERS_EMAIL = 'careers@prepyo.np';

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
 * Empty on purpose: nothing is advertised that is not actually open. Add a
 * role here and the page grows a listing, an anchor and its structured data.
 */
export const OPEN_ROLES: Role[] = [];

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
