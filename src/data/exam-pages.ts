/**
 * Long-form content for the two exam pages.
 *
 * These exist as separate routes rather than anchors on the landing page
 * because "PTE preparation Nepal" and "IELTS preparation Nepal" are different
 * searches by different people, and one URL trying to rank for both competes
 * with itself. Each page owns its own title, description, H1 and Course markup.
 *
 * Everything stated about the exams themselves is limited to what the test
 * owners publish. Nothing here claims a score, a pass rate or a correlation
 * Prepyo has not measured.
 */
import type { Faq } from '@/data/faq';
import type { ExamType } from '@/consts';

export interface TaskType {
  name: string;
  blurb: string;
}

export interface PrepBlock {
  title: string;
  body: string;
  icon: string;
}

export interface ExamPage {
  slug: string;
  exam: ExamType;
  /** Display name of the exam. */
  name: string;
  /** Course name for structured data. */
  courseName: string;
  title: string;
  metaDescription: string;
  h1: string;
  standfirst: string;
  intro: string[];
  /** The at-a-glance table. */
  format: { label: string; value: string }[];
  scoring: string[];
  taskTypes: TaskType[];
  prepBlocks: PrepBlock[];
  faqs: Faq[];
  /** Link across to the other exam, for people still deciding. */
  sibling: { label: string; href: string; blurb: string };
}

export const PTE_PAGE: ExamPage = {
  slug: '/pte-academic-preparation/',
  exam: 'PTE',
  name: 'PTE Academic',
  courseName: 'PTE Academic Preparation',
  title: 'PTE Academic Preparation in Nepal — Practice, Mocks & Scoring | Prepyo',
  metaDescription:
    'Prepare for PTE Academic from Nepal with full-length mock exams, task-by-task practice and scoring against the official criteria. Start free, pay with eSewa or Khalti.',
  h1: 'PTE Academic preparation, built for students in Nepal',
  standfirst:
    'Every task type, the real timings, and a score breakdown that tells you which part of the test is costing you points.',
  intro: [
    'PTE Academic is taken on a computer and marked by automated scoring, which is why results usually reach you within 48 hours. It is accepted for study and visa applications in Australia, New Zealand, the UK and Canada.',
    'The scoring is also what makes it hard to prepare for on paper. Your speaking score depends on things a notebook cannot show you — how fluently you spoke, how clearly you pronounced each word, whether you hesitated. You need to hear the recording back and see where the marks went.',
    'That is the gap Prepyo fills: you practise the actual task, you get the breakdown straight away, and the tasks you keep losing marks on come back until they stop being weak spots.',
  ],
  format: [
    { label: 'Delivery', value: 'On a computer, at a test centre' },
    { label: 'Structure', value: 'Speaking & Writing, Reading, Listening — one sitting' },
    { label: 'Length', value: 'About two hours' },
    { label: 'Score range', value: '10–90, on the Global Scale of English' },
    { label: 'Results', value: 'Usually within 48 hours' },
    { label: 'Common target', value: '79+ in each communicative skill' },
  ],
  scoring: [
    'PTE reports one overall score from 10 to 90, four communicative skills — listening, reading, speaking, writing — and a set of enabling skills covering grammar, oral fluency, pronunciation, spelling, vocabulary and written discourse.',
    'Most tasks are integrated, meaning one task feeds more than one score. Read Aloud counts towards both reading and speaking; Write from Dictation counts towards both listening and writing. This is why a single weak skill drags down parts of the report you were not expecting, and why practising each section in isolation misleads you.',
    'The 79 target is not arbitrary. Australia’s skilled-migration points test treats 79 in each of the four communicative skills as superior English, which is the band most applicants mean when they say "PTE 79+".',
  ],
  taskTypes: [
    { name: 'Read Aloud', blurb: 'Scored for both content and how clearly you say it — the task where pronunciation and pace show up first.' },
    { name: 'Repeat Sentence', blurb: 'Short memory and fluency task. Marks come from how much of the sentence you reproduce, not a perfect accent.' },
    { name: 'Describe Image', blurb: 'Forty seconds to turn a chart into fluent speech. A repeatable structure beats improvising every time.' },
    { name: 'Re-tell Lecture', blurb: 'Listening and speaking in one task. Your note-taking method matters more here than your vocabulary.' },
    { name: 'Summarize Written Text', blurb: 'One sentence, strict word count. Grammar and form are scored as heavily as content.' },
    { name: 'Write Essay', blurb: 'Twenty minutes, a set structure, and marks for development, coherence and range.' },
    { name: 'Re-order Paragraphs', blurb: 'Pure logic and cohesion. The fastest reading marks to recover once you see the pattern.' },
    { name: 'Fill in the Blanks', blurb: 'Reading and listening variants. Knowing which words go together does most of the work.' },
    { name: 'Summarize Spoken Text', blurb: 'Fifty to seventy words from a lecture you hear once.' },
    { name: 'Write from Dictation', blurb: 'Short, high-value, and the densest source of recoverable marks in the test.' },
  ],
  prepBlocks: [
    {
      title: 'Full-length mocks with real timings',
      body: 'Sit the whole test in the order and under the clock you will face at the centre, then read a section-by-section breakdown instead of a single number.',
      icon: 'lucide:play-circle',
    },
    {
      title: 'A pronunciation score for every word',
      body: 'Record a Read Aloud, then see which words pulled the score down, how fast you spoke and where you paused — the parts of a speaking score you cannot judge for yourself.',
      icon: 'lucide:mic',
    },
    {
      title: 'Marked against the published criteria',
      body: 'Writing and speaking are scored against the criteria Pearson publishes, with the reason for each deduction shown next to your answer rather than a bare figure.',
      icon: 'lucide:clipboard-check',
    },
    {
      title: 'A mistake bank that brings tasks back',
      body: 'Every question you get wrong is kept and returned to you later, so weak task types get more of your time and the ones you have mastered get less.',
      icon: 'lucide:book-marked',
    },
  ],
  faqs: [
    {
      question: 'How long does PTE Academic preparation usually take?',
      answer:
        'It depends on where your English sits now and how far that is from your target. Start with a diagnostic so you are working from your real baseline rather than a guess, then give the weakest skill the largest share of your practice time.',
    },
    {
      question: 'Will my Nepali accent lower my PTE speaking score?',
      answer:
        'PTE scores intelligibility, not accent. What costs marks is unclear individual sounds, hesitation and uneven pace — all of which show up in a word-by-word pronunciation breakdown, and all of which are fixable with practice.',
    },
    {
      question: 'Is PTE easier than IELTS?',
      answer:
        'Neither is easier — they are different. PTE is entirely computer-marked and returns results faster; IELTS has a speaking test with a human examiner. Choose on which format suits you and what your university or visa route accepts.',
    },
    {
      question: 'Can I practise PTE for free on Prepyo?',
      answer:
        'Yes. The free plan includes one full mock test, five practice sub-tests a day across every skill, your mistake bank and your progress.',
    },
  ],
  sibling: {
    label: 'IELTS Academic preparation',
    href: '/ielts-academic-preparation/',
    blurb: 'Still deciding between the two? Read what IELTS Academic asks for and how it is scored.',
  },
};

export const IELTS_PAGE: ExamPage = {
  slug: '/ielts-academic-preparation/',
  exam: 'IELTS',
  name: 'IELTS Academic',
  courseName: 'IELTS Academic Preparation',
  title: 'IELTS Academic Preparation in Nepal — Mocks & Band Feedback | Prepyo',
  metaDescription:
    'Prepare for IELTS Academic from Nepal with full-length mock tests, Writing and Speaking feedback against the official band descriptors, and a free diagnostic.',
  h1: 'IELTS Academic preparation, built for students in Nepal',
  standfirst:
    'Four skills, nine bands, and public descriptors that say exactly what separates a 6.5 from an 8.0. Practise against them.',
  intro: [
    'IELTS Academic is the most widely accepted English test for universities and visas worldwide, and the one most Nepali students meet first. It is marked in bands from 0 to 9, in half-band steps, across Listening, Reading, Writing and Speaking.',
    'Its great advantage for anyone studying alone is that the marking is public. IELTS publishes the band descriptors examiners work from — four criteria for Writing, four for Speaking — so the difference between the band you have and the band you want is written down.',
    'Most candidates never read them. Prepyo marks your work against those same criteria and shows which one is holding your band down, because "write better essays" is not a study plan and "your coherence is a band below your vocabulary" is.',
  ],
  format: [
    { label: 'Delivery', value: 'On paper or on a computer, at a test centre' },
    { label: 'Listening', value: '30 minutes, four recorded parts' },
    { label: 'Reading', value: '60 minutes, three long passages' },
    { label: 'Writing', value: '60 minutes — Task 1 and Task 2' },
    { label: 'Speaking', value: '11–14 minutes with an examiner' },
    { label: 'Score range', value: 'Bands 0–9, in half bands' },
  ],
  scoring: [
    'Writing is marked on four equally weighted criteria: Task Achievement or Task Response, Coherence and Cohesion, Lexical Resource, and Grammatical Range and Accuracy. Speaking uses four of its own: Fluency and Coherence, Lexical Resource, Grammatical Range and Accuracy, and Pronunciation.',
    'Because the four are averaged, one weak criterion caps the whole skill. A candidate with strong vocabulary and disorganised paragraphs can land on the same band as one with plain vocabulary and a clear structure — and only one of those two problems takes a weekend to fix.',
    'Task 2 carries twice the weight of Task 1 in the Writing band, which is the single most useful thing to know before deciding where to spend your practice time.',
  ],
  taskTypes: [
    { name: 'Writing Task 1', blurb: 'Describe a chart, map or process in at least 150 words. Selecting and grouping the data is what is being marked.' },
    { name: 'Writing Task 2', blurb: 'A 250-word essay carrying twice the marks of Task 1. Position, development and structure decide the band.' },
    { name: 'Speaking Parts 1–3', blurb: 'Introduction, a two-minute long turn from a cue card, then abstract discussion. Fluency is scored across all three.' },
    { name: 'True / False / Not Given', blurb: 'The reading question type that costs the most marks, almost always for confusing False with Not Given.' },
    { name: 'Matching Headings', blurb: 'Tests whether you can find a paragraph’s main idea rather than a matching word.' },
    { name: 'Sentence & summary completion', blurb: 'Word limits are strict and spelling counts, in both Reading and Listening.' },
    { name: 'Multiple choice', blurb: 'Appears in both Reading and Listening, and rewards eliminating distractors over hunting for keywords.' },
    { name: 'Map and diagram labelling', blurb: 'A Listening task where losing your place costs several marks at once.' },
  ],
  prepBlocks: [
    {
      title: 'Feedback against the band descriptors',
      body: 'Your essay comes back marked on all four Writing criteria, with the sentences responsible for each one highlighted, so you can see which criterion is capping your band.',
      icon: 'lucide:clipboard-check',
    },
    {
      title: 'Speaking practice you can hear back',
      body: 'Answer Part 2 cue cards under the real timing, then review your own recording with pace, pauses and per-word pronunciation marked.',
      icon: 'lucide:mic',
    },
    {
      title: 'Full-length mock tests',
      body: 'All four skills in one sitting, under exam timing, with a band estimate per skill and every question you lost marks on kept for review.',
      icon: 'lucide:play-circle',
    },
    {
      title: 'Sentence-level rewrites',
      body: 'See a stronger version of your own sentence alongside what you wrote, with the grammar or cohesion reason for the change spelled out.',
      icon: 'lucide:pen-tool',
    },
  ],
  faqs: [
    {
      question: 'What is a good IELTS band for universities abroad?',
      answer:
        'Most undergraduate and postgraduate courses ask for an overall 6.0 to 7.0 with a minimum in each skill, and competitive programmes ask for more. Check the requirement for your specific course and country — the per-skill minimum is what usually catches applicants out.',
    },
    {
      question: 'Should I take IELTS on paper or on a computer?',
      answer:
        'The test content and the band scale are identical. Computer-delivered sittings are offered more often and results come back sooner; paper suits candidates who prefer to annotate the reading passages by hand.',
    },
    {
      question: 'How is IELTS Writing actually marked?',
      answer:
        'On four equally weighted criteria — Task Achievement, Coherence and Cohesion, Lexical Resource, and Grammatical Range and Accuracy — which are averaged into the Writing band. Task 2 carries twice the weight of Task 1.',
    },
    {
      question: 'Does Prepyo cover IELTS General Training?',
      answer:
        'Prepyo’s IELTS track covers IELTS Academic. Listening and Speaking are shared with General Training, so that practice transfers, but the Reading and Writing Task 1 material is Academic.',
    },
  ],
  sibling: {
    label: 'PTE Academic preparation',
    href: '/pte-academic-preparation/',
    blurb: 'Comparing the two? Read how PTE Academic is structured and scored.',
  },
};

export const EXAM_PAGES: ExamPage[] = [PTE_PAGE, IELTS_PAGE];
