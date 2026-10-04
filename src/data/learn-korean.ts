/**
 * The Learn Korean course, as described on /learn-korean/.
 *
 * Mirrors the units in the app (src/data/learnKorean in the app repo), in the
 * order they are taught. Lesson titles are listed rather than counted, so the
 * page cannot advertise a number of lessons the course does not have.
 */
import type { Faq } from '@/data/faq';

export interface CourseUnit {
  title: string;
  description: string;
  lessons: string[];
}

export const LEARN_KOREAN_UPDATED = '2026-10-04';

export const COURSE_UNITS: CourseUnit[] = [
  {
    title: 'Hangul',
    description: 'The Korean alphabet. Learn the letters, build syllables and read your first words.',
    lessons: ['Vowels', 'Consonants', 'Syllables', 'Reading', 'First words'],
  },
  {
    title: 'Basic Korean',
    description: 'Greetings, people, everyday words and your first sentences.',
    lessons: ['Greetings', 'People', 'Common words', 'Verbs', 'Simple sentences'],
  },
  {
    title: 'Grammar essentials',
    description: 'Turn words into sentences: who does what, where, when, and how to say no.',
    lessons: [
      'I am… (은/는, 예요)',
      'Subject (이/가)',
      'Object (을/를)',
      'Polite verbs (-아요/어요)',
      'Places (에, 에서)',
      'Saying no (안, 못)',
      'The past (-았어요/었어요)',
      'Now and later',
    ],
  },
  {
    title: 'EPS vocabulary',
    description: 'The work words the test is full of: numbers, time, the workplace, tools, machines and safety.',
    lessons: ['Numbers & time', 'Workplace', 'Tools', 'Machines', 'Safety'],
  },
  {
    title: 'Daily life',
    description: 'Get by outside work: shopping, getting around, the hospital, the bank and food.',
    lessons: ['Shopping', 'Transport', 'Hospital', 'Bank', 'Food'],
  },
  {
    title: 'Construction',
    description: 'The site, its materials and machines, the work itself, and staying safe up high.',
    lessons: [],
  },
  {
    title: 'Agriculture & livestock',
    description: 'Crops and fields, farm tools, animals and the daily work of a farm.',
    lessons: [],
  },
  {
    title: 'Fishery',
    description: 'Boats and the sea, the catch, the work on deck, the weather, and fish farms.',
    lessons: [],
  },
  {
    title: 'EPS-TOPIK',
    description: 'Every task in the test, one lesson each: what it is, how to answer it, and a few easy questions in its style.',
    lessons: [],
  },
];

export const LEARN_KOREAN_FAQS: Faq[] = [
  {
    question: 'Do I need to know any Korean to start?',
    answer:
      'No. The course starts with Hangul, the Korean alphabet — vowels, consonants and how they join into syllables — and only moves on once you can read your first words.',
  },
  {
    question: 'Is the Learn Korean course free?',
    answer:
      'Yes, the whole Learn Korean course is included on the free plan. Paid plans add Help in English on EPS-TOPIK practice questions.',
  },
  {
    question: 'Does the course cover the vocabulary for my job in Korea?',
    answer:
      'It has units for construction, agriculture and livestock, and fishery, alongside general workplace vocabulary — numbers, time, tools, machines and safety — that every sector uses.',
  },
  {
    question: 'How is the course different from EPS-TOPIK practice?',
    answer:
      'The course teaches the language, a few minutes at a time. EPS-TOPIK practice tests you on the exam’s own question types. Most learners start with the course and add practice once they can read Hangul comfortably.',
  },
  {
    question: 'Does the course include listening?',
    answer:
      'Yes. Half of EPS-TOPIK is listening, so units come with listening questions as well as reading ones.',
  },
];
