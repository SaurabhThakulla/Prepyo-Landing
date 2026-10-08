/**
 * Student testimonials shown on the home page.
 *
 * Every entry must be a real student's own words, copied as they sent it, with
 * their permission to show the name as written here. Never write or "tidy up"
 * a quote on a student's behalf, and never publish an email address.
 *
 * The section stays hidden while this list is empty.
 */
export interface Testimonial {
  /** The student's words, verbatim. */
  quote: string;
  /** As the student agreed to be named, e.g. "Bisesta T." */
  name: string;
  /** e.g. "PTE Academic", "IELTS Academic", "EPS-TOPIK". */
  exam: string;
  /** Optional, only if the student shared it, e.g. "Target 79" or "Scored 7.5". */
  detail?: string;
}

export const TESTIMONIALS: Testimonial[] = [];
