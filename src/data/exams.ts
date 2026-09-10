/**
 * The three exam tracks shown on the landing page.
 *
 * Extracted from ExamsSection because the PTE and IELTS pages need the same
 * card data — the skills list, the scoring scale, the target — and a second
 * copy would drift the moment a task list changed.
 */
import type { ExamType } from '@/consts';

export interface ExamStat {
  value: string;
  label: string;
}

export interface ExamCard {
  exam: ExamType;
  /** Path to this exam's own page, for the tracks that have one. */
  slug?: string;
  name: string;
  heading: string;
  targetLabel: string;
  scaleLabel: string;
  description: string;
  moreTasks: string;
  trackLabel: string;
  skills: string[];
  brandClass: string;
  dotColor: string;
  stats?: ExamStat[];
}

export const EXAMS: ExamCard[] = [
  {
    exam: 'PTE',
    slug: '/pte-academic-preparation/',
    name: 'PTE Academic',
    heading: 'What you’ll master for PTE 79+',
    targetLabel: '79+ goal',
    scaleLabel: 'Computer-marked · scored 10–90',
    description: 'Taken on a computer and marked by AI. Results usually arrive within 48 hours.',
    moreTasks: '+ 16 more task types',
    trackLabel: 'INSIDE THIS TRACK',
    skills: [
      'Read Aloud',
      'Repeat Sentence',
      'Summarize Written Text',
      'Write from Dictation',
    ],
    brandClass: 'text-[#1e4fe8] dark:text-[#1d4ed8]',
    dotColor: 'bg-[#1e4fe8] dark:bg-blue-400',
    stats: [{ value: '100+', label: 'Students' }],
  },
  {
    exam: 'IELTS',
    slug: '/ielts-academic-preparation/',
    name: 'IELTS Academic',
    heading: 'What you’ll master for Band 8.0',
    targetLabel: 'Band 8.0',
    scaleLabel: 'Examiner-marked · bands 0–9',
    description: 'The most widely accepted English test for universities and visas worldwide.',
    moreTasks: '+ 11 more task types',
    trackLabel: 'INSIDE THIS TRACK',
    skills: [
      'Writing Task 1 & 2',
      'True / False / Not Given',
      'Matching Headings',
      'Speaking Parts 1–3',
    ],
    brandClass: 'text-[#1e4fe8] dark:text-[#1d4ed8]',
    dotColor: 'bg-[#1e4fe8] dark:bg-blue-400',
  },
  {
    exam: 'JAPANESE',
    name: 'Japanese Language',
    heading: 'What you’ll master for JLPT N5–N1',
    targetLabel: 'JLPT N5–N1',
    scaleLabel: 'JLPT & NAT-TEST · N5–N1',
    description: 'Essential test preparation for universities and visas in Japan.',
    moreTasks: '+ 10 more task types',
    trackLabel: 'INSIDE THIS TRACK',
    skills: [
      'Kanji & vocabulary',
      'Grammar drills',
      'Reading comprehension',
      'Listening practice',
    ],
    brandClass: 'text-[#48567e] dark:text-[#323d5b]',
    dotColor: 'bg-[#48567e] dark:bg-indigo-400',
  },
];
