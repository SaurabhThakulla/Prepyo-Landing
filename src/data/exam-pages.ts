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
import { appUrl, type ExamType } from '@/consts';

export type Skill = 'speaking' | 'writing' | 'reading' | 'listening';

export interface TaskType {
  name: string;
  blurb: string;
  /** Which filter tab the task sits under. Guessed from the name when omitted. */
  skill?: Skill;
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
  /** Social card for this page, site-relative. */
  ogImage: string;
  /** ISO date the page's content was last reviewed. Shown on the page and as `dateModified`. */
  updated: string;
  eyebrow: string;
  /** Starts with `name`, which is the part the hero highlights. */
  h1: string;
  standfirst: string;
  /** The "What is …?" section — the definitional passage answer engines quote. */
  intro: string[];
  primaryCta: { label: string; href: string };
  /** Who sets the test, for the "at a glance" caption. */
  testOwner: string;
  /** The at-a-glance table. */
  format: { label: string; value: string }[];
  scoring: string[];
  /** Which radar chart to show; omitted for tests with no speaking or writing. */
  chartMode?: 'pte' | 'ielts';
  /** The illustrative score card in the hero. */
  mockup: { tag: string; label: string; value: string; lines: [string, string] };
  trust: { icon: string; label: string }[];
  taskTypes: TaskType[];
  prepBlocks: PrepBlock[];
  faqs: Faq[];
  /** Link across to a related page, for people still deciding. */
  sibling: { label: string; href: string; blurb: string; cta: string };
}

const PAYMENTS_TRUST = { icon: 'lucide:wallet', label: 'eSewa & Khalti accepted' };
const STUDENTS_TRUST = { icon: 'lucide:users', label: '100+ students' };

export const PTE_PAGE: ExamPage = {
  slug: '/pte-academic-preparation/',
  exam: 'PTE',
  name: 'PTE Academic',
  courseName: 'PTE Academic Preparation',
  title: 'PTE Academic Preparation in Nepal — Mocks & Scoring | Prepyo',
  metaDescription:
    'Prepare for PTE Academic from Nepal with full mock exams, task-by-task practice and scoring on the official criteria. Start free, pay with eSewa or Khalti.',
  ogImage: '/images/og-pte.jpg',
  updated: '2026-10-04',
  eyebrow: 'Free diagnostic test',
  h1: 'PTE Academic preparation, built for students in Nepal',
  standfirst:
    'Every task type, the real timings, and a score breakdown that tells you which part of the test is costing you points.',
  intro: [
    'PTE Academic is taken on a computer and marked by automated scoring, which is why results usually reach you within 48 hours. It is accepted for study and visa applications in Australia, New Zealand, the UK and Canada.',
    'The scoring is also what makes it hard to prepare for on paper. Your speaking score depends on things a notebook cannot show you — how fluently you spoke, how clearly you pronounced each word, whether you hesitated. You need to hear the recording back and see where the marks went.',
    'That is the gap Prepyo fills: you practise the actual task, you get the breakdown straight away, and the tasks you keep losing marks on come back until they stop being weak spots.',
  ],
  primaryCta: { label: 'Take the free diagnostic', href: appUrl('/diagnostic') },
  testOwner: 'Pearson',
  chartMode: 'pte',
  mockup: { tag: 'PTE 79+', label: 'Estimated score', value: '86 / 90', lines: ['Fluency: 88', 'Pronunciation: 90'] },
  trust: [
    { icon: 'lucide:check-circle', label: 'Scored on Pearson’s published criteria' },
    { icon: 'lucide:zap', label: 'Instant AI feedback' },
    PAYMENTS_TRUST,
    STUDENTS_TRUST,
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
    cta: 'Switch to IELTS',
  },
};

export const IELTS_PAGE: ExamPage = {
  slug: '/ielts-academic-preparation/',
  exam: 'IELTS',
  name: 'IELTS Academic',
  courseName: 'IELTS Academic Preparation',
  title: 'IELTS Academic Preparation in Nepal — Mocks & Feedback | Prepyo',
  metaDescription:
    'Prepare for IELTS Academic from Nepal with full-length mock tests, Writing and Speaking feedback against the official band descriptors, and a free diagnostic.',
  ogImage: '/images/og-ielts.jpg',
  updated: '2026-10-04',
  eyebrow: 'Free diagnostic test',
  h1: 'IELTS Academic preparation, built for students in Nepal',
  standfirst:
    'Four skills, nine bands, and public descriptors that say exactly what separates a 6.5 from an 8.0. Practise against them.',
  intro: [
    'IELTS Academic is the most widely accepted English test for universities and visas worldwide, and the one most Nepali students meet first. It is marked in bands from 0 to 9, in half-band steps, across Listening, Reading, Writing and Speaking.',
    'Its great advantage for anyone studying alone is that the marking is public. IELTS publishes the band descriptors examiners work from — four criteria for Writing, four for Speaking — so the difference between the band you have and the band you want is written down.',
    'Most candidates never read them. Prepyo marks your work against those same criteria and shows which one is holding your band down, because "write better essays" is not a study plan and "your coherence is a band below your vocabulary" is.',
  ],
  primaryCta: { label: 'Take the free diagnostic', href: appUrl('/diagnostic') },
  testOwner: 'the IELTS partners',
  chartMode: 'ielts',
  mockup: { tag: 'Band 8.0', label: 'Estimated band', value: '8.5 / 9.0', lines: ['Task: 8.5', 'Lexical: 8.5'] },
  trust: [
    { icon: 'lucide:check-circle', label: 'Marked on the IELTS band descriptors' },
    { icon: 'lucide:zap', label: 'Instant AI feedback' },
    PAYMENTS_TRUST,
    STUDENTS_TRUST,
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
    cta: 'Switch to PTE',
  },
};

/**
 * EPS-TOPIK. The question types mirror the app's own syllabus
 * (syllabus-topics.json in the app repo), so the page never lists a task the
 * practice bank does not have.
 *
 * Deliberately not stated until confirmed against HRD Korea's current notice
 * for Nepal — each is a number answer engines would quote back:
 * TODO(confirm): question count per section, test length, score scale,
 * pass/cut-off rule, exam fee in NPR, test venue, and the skills test.
 */
export const EPS_PAGE: ExamPage = {
  slug: '/eps-topik-preparation/',
  exam: 'EPS_TOPIK',
  name: 'EPS-TOPIK',
  courseName: 'EPS-TOPIK Korean Preparation',
  title: 'EPS-TOPIK Preparation in Nepal — Korean Practice | Prepyo',
  metaDescription:
    'Prepare for EPS-TOPIK from Nepal: every reading and listening question type with Korean audio, Korean lessons from Hangul up, and help in English.',
  ogImage: '/images/og-eps-topik.jpg',
  updated: '2026-10-04',
  eyebrow: 'Korean for work in South Korea',
  h1: 'EPS-TOPIK preparation, built for workers in Nepal',
  standfirst:
    'Every reading and listening question type in the test, Korean audio on listening practice, and a course that starts from the alphabet.',
  intro: [
    'EPS-TOPIK — the Employment Permit System Test of Proficiency in Korean — is the language test South Korea uses to hire workers from partner countries, Nepal among them. It is run by the Human Resources Development Service of Korea (HRD Korea), and passing it is the first step towards a job in Korea under the Employment Permit System.',
    'The test has two sections, reading and listening, and every question is multiple choice. There is no speaking and no writing. That makes it a very learnable test — but only once you have heard enough everyday and workplace Korean to follow a recording you hear just twice.',
    'Prepyo covers both halves: a Learn Korean course that starts at Hangul and works up to the vocabulary the test uses, and practice for every question type, with Korean audio and help in English when you are stuck.',
  ],
  primaryCta: { label: 'Start practising free', href: appUrl('/') },
  testOwner: 'HRD Korea',
  mockup: { tag: 'EPS-TOPIK', label: 'Practice score', value: '18 / 20', lines: ['Reading: 9 / 10', 'Listening: 9 / 10'] },
  trust: [
    { icon: 'lucide:check-circle', label: 'Every reading & listening question type' },
    { icon: 'lucide:headphones', label: 'Korean audio' },
    { icon: 'lucide:languages', label: 'Help in English' },
    PAYMENTS_TRUST,
  ],
  format: [
    { label: 'Full name', value: 'Employment Permit System Test of Proficiency in Korean' },
    { label: 'Run by', value: 'HRD Korea (Human Resources Development Service of Korea)' },
    { label: 'Used for', value: 'Work in South Korea under the Employment Permit System' },
    { label: 'Sections', value: 'Reading and Listening — no speaking or writing' },
    { label: 'Question style', value: 'Multiple choice, four options' },
    { label: 'Listening', value: 'Each recording is played twice' },
  ],
  scoring: [
    'Every question is multiple choice and marked against an answer key, so there is no examiner judgement involved. Your result comes down to how many reading and listening questions you answer correctly.',
    'That makes the score unusually honest to practise for. A wrong answer is not a matter of style; it is a word you did not know, a grammar ending you misread, or a number you missed in a recording — and each of those can be drilled.',
    'Listening is the half that self-study most often neglects, because reading Korean can be learned from a book and hearing it at speed cannot. That is why every listening question on Prepyo comes with Korean audio rather than a script to read.',
  ],
  taskTypes: [
    { skill: 'reading', name: 'Picture to word or sentence', blurb: 'Look at a picture and choose the word or sentence that matches it.' },
    { skill: 'reading', name: 'Correct underlined grammar', blurb: 'Choose the sentence whose underlined part is correct — particles and verb endings decide it.' },
    { skill: 'reading', name: 'Signs, notices and charts', blurb: 'Read a workplace sign, notice or chart and answer a question about it.' },
    { skill: 'reading', name: 'Related word', blurb: 'Choose the word or meaning that goes with the one given.' },
    { skill: 'reading', name: 'Fill in the blank', blurb: 'Choose the word or phrase that best completes the sentence.' },
    { skill: 'reading', name: 'Word from description', blurb: 'Read a short description and choose the word it describes.' },
    { skill: 'reading', name: 'Passage topic', blurb: 'Read a short passage and choose what it is about.' },
    { skill: 'reading', name: 'Matching statement', blurb: 'Read a text and choose the statement that agrees with it.' },
    { skill: 'reading', name: 'Description to picture', blurb: 'Read a description and choose the picture that matches.' },
    { skill: 'listening', name: 'Choose what you heard', blurb: 'Listen and choose the word or sentence you heard.' },
    { skill: 'listening', name: 'Listen and choose the picture', blurb: 'Listen and choose the picture that matches what was said.' },
    { skill: 'listening', name: 'Choose the right reply', blurb: 'Hear a question and choose the reply that answers it.' },
    { skill: 'listening', name: 'What comes next', blurb: 'Listen and choose what the speaker says next.' },
    { skill: 'listening', name: 'Numbers, dates and prices', blurb: 'Catch a number, date or price and match it to a picture.' },
    { skill: 'listening', name: 'Picture question', blurb: 'Look at a picture, hear a question about it and choose the answer.' },
    { skill: 'listening', name: 'Dialogue comprehension', blurb: 'Follow a short conversation and answer a question about it.' },
  ],
  prepBlocks: [
    {
      title: 'Learn Korean from the alphabet',
      body: 'Short lessons of a few minutes each: Hangul, basic Korean, grammar essentials, EPS vocabulary, daily life, and the words used in construction, agriculture and fishery.',
      icon: 'lucide:languages',
    },
    {
      title: 'Every question type in the test',
      body: 'Reading and listening practice for each task type in EPS-TOPIK, written to the test’s format, so nothing on the day is a surprise.',
      icon: 'lucide:list-checks',
    },
    {
      title: 'Korean audio on listening practice',
      body: 'Listening questions play Korean audio, so you train your ear on the sound of the language instead of reading a transcript.',
      icon: 'lucide:headphones',
    },
    {
      title: 'Help in English when you are stuck',
      body: 'On paid plans, any practice question can be shown in English — what was said or written, the question and all four choices — so a wrong answer becomes a lesson.',
      icon: 'lucide:book-a',
    },
  ],
  faqs: [
    {
      question: 'What is EPS-TOPIK?',
      answer:
        'The Employment Permit System Test of Proficiency in Korean. It is the Korean language test that workers from Nepal and other partner countries take to apply for jobs in South Korea under the Employment Permit System. It is run by HRD Korea.',
    },
    {
      question: 'Does EPS-TOPIK have speaking or writing?',
      answer:
        'No. It tests reading and listening only, and every question is multiple choice. That is why Prepyo’s EPS-TOPIK practice has no speaking or writing — your time goes on the two skills that are actually scored.',
    },
    {
      question: 'I don’t know any Korean. Where do I start?',
      answer:
        'With Hangul, the Korean alphabet. The Learn Korean course starts there — vowels, consonants and syllables — before moving on to basic words, grammar and the workplace vocabulary the test uses.',
    },
    {
      question: 'Can I prepare for EPS-TOPIK without joining an academy?',
      answer:
        'Yes. Learn to read Hangul first, then practise each question type and go back over the questions you got wrong. Whether you study alone or alongside an academy, the test only measures what you can read and hear.',
    },
    {
      question: 'Is EPS-TOPIK practice free on Prepyo?',
      answer:
        'You can start free with practice questions and the Learn Korean course. Paid plans add Help in English, which shows any practice question in English.',
    },
    {
      question: 'Is there a full EPS-TOPIK mock test?',
      answer:
        'Not yet. Full-length EPS-TOPIK mock tests are in development. For now Prepyo covers every question type through practice, alongside the Learn Korean course.',
    },
  ],
  sibling: {
    label: 'Learn Korean from scratch',
    href: '/learn-korean/',
    blurb: 'New to Korean? Start with Hangul and work up to the vocabulary EPS-TOPIK uses.',
    cta: 'Start with Hangul',
  },
};

export const EXAM_PAGES: ExamPage[] = [PTE_PAGE, IELTS_PAGE, EPS_PAGE];
