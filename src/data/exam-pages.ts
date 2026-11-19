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
  /** Time shown on the card; "" shows the scoring badge instead. Guessed from the name when omitted. */
  timing?: string;
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
  /** ISO date the page's content was last reviewed, emitted as `dateModified`. */
  updated: string;
  eyebrow: string;
  /** Starts with `name`, which is the part the hero highlights. */
  h1: string;
  standfirst: string;
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
}

const PAYMENTS_TRUST = { icon: 'lucide:wallet', label: 'eSewa & Khalti accepted' };
const FREE_TRUST = { icon: 'lucide:gift', label: 'Free plan to start' };

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
  primaryCta: { label: 'Take the free diagnostic', href: appUrl('/diagnostic') },
  testOwner: 'Pearson',
  chartMode: 'pte',
  mockup: { tag: 'PTE 79+', label: 'Estimated score', value: '86 / 90', lines: ['Fluency: 88', 'Pronunciation: 90'] },
  trust: [
    { icon: 'lucide:check-circle', label: 'Scored on Pearson’s published criteria' },
    { icon: 'lucide:zap', label: 'Instant AI feedback' },
    PAYMENTS_TRUST,
    FREE_TRUST,
  ],
  format: [
    { label: 'Delivery', value: 'On a computer, at a test centre' },
    { label: 'Structure', value: 'Speaking & Writing, Reading, Listening — one sitting' },
    { label: 'Length', value: 'About 2 hours 15 minutes, 22 task types' },
    { label: 'Score range', value: '10–90, on the Global Scale of English' },
    { label: 'Results', value: 'Usually within 48 hours' },
    { label: 'Common target', value: '79+ overall (about IELTS 8.0)' },
  ],
  scoring: [
    'PTE reports one overall score from 10 to 90 and a score for each of the four communicative skills — listening, reading, speaking and writing. Since August 2025, AI scoring works alongside human review, and memorised templates are detected and penalised.',
    'Most tasks are integrated, meaning one task feeds more than one score. Read Aloud counts towards both reading and speaking; Write from Dictation counts towards both listening and writing. This is why a single weak skill drags down parts of the report you were not expecting, and why practising each section in isolation misleads you.',
    'The 79 target comes from Australia’s old rules, which treated 79 in each skill as superior English. For PTE tests taken from 7 August 2025, the Department of Home Affairs instead asks for at least 69 in listening, 70 in reading, 85 in writing and 88 in speaking. 79 overall is still a useful goal: Pearson’s July 2025 concordance places PTE 79–85 at IELTS 8.0.',
  ],
  taskTypes: [
    { skill: 'speaking', name: 'Read Aloud', blurb: 'Scored for both content and how clearly you say it — the task where pronunciation and pace show up first.' },
    { skill: 'speaking', name: 'Repeat Sentence', blurb: 'Short memory and fluency task. Marks come from how much of the sentence you reproduce, not a perfect accent.' },
    { skill: 'speaking', name: 'Describe Image', blurb: 'Forty seconds to turn a chart into fluent speech. A repeatable structure beats improvising every time.' },
    { skill: 'speaking', name: 'Re-tell Lecture', blurb: 'Listening and speaking in one task. Your note-taking method matters more here than your vocabulary.' },
    { skill: 'speaking', name: 'Answer Short Question', timing: '', blurb: 'Hear a simple question and answer it in a word or a few words.' },
    { skill: 'speaking', name: 'Summarize Group Discussion', timing: '', blurb: 'New in August 2025: hear several speakers discuss a topic, then summarise the main points and views aloud.' },
    { skill: 'speaking', name: 'Respond to a Situation', blurb: 'New in August 2025: speak a natural reply to an everyday situation, with the right tone for who you are talking to.' },
    { skill: 'writing', name: 'Summarize Written Text', blurb: 'One sentence, strict word count. Grammar and form are scored as heavily as content.' },
    { skill: 'writing', name: 'Write Essay', timing: '20 mins', blurb: 'Twenty minutes, a set structure, and marks for development, coherence and range.' },
    { skill: 'reading', name: 'Reading & Writing: Fill in the Blanks', timing: '', blurb: 'Choose the right word for each gap from a drop-down list. Grammar and collocation do most of the work.' },
    { skill: 'reading', name: 'Multiple Choice, Multiple Answers', timing: '', blurb: 'Read a passage and pick every correct option. Wrong picks cost marks, so guessing does not pay.' },
    { skill: 'reading', name: 'Re-order Paragraphs', timing: '', blurb: 'Pure logic and cohesion. The fastest reading marks to recover once you see the pattern.' },
    { skill: 'reading', name: 'Reading: Fill in the Blanks', timing: '', blurb: 'Drag words from a box into the gaps in a paragraph. There are more words than gaps.' },
    { skill: 'reading', name: 'Multiple Choice, Single Answer', timing: '', blurb: 'Read a passage and choose the one best answer.' },
    { skill: 'listening', name: 'Summarize Spoken Text', blurb: 'Fifty to seventy words from a lecture you hear once.' },
    { skill: 'listening', name: 'Multiple Choice, Multiple Answers', timing: '', blurb: 'Hear a recording and pick every correct option. Wrong picks cost marks here too.' },
    { skill: 'listening', name: 'Fill in the Blanks', timing: '', blurb: 'Type the missing words into a transcript as the recording plays. Spelling counts.' },
    { skill: 'listening', name: 'Highlight Correct Summary', timing: '', blurb: 'Hear a recording and choose the paragraph that summarises it best.' },
    { skill: 'listening', name: 'Multiple Choice, Single Answer', timing: '', blurb: 'Hear a recording and choose the one correct answer.' },
    { skill: 'listening', name: 'Select Missing Word', timing: '', blurb: 'The last word of the recording is replaced by a beep. Choose the word that completes it.' },
    { skill: 'listening', name: 'Highlight Incorrect Words', timing: '', blurb: 'Follow a transcript as you listen and click the words that differ from what is said.' },
    { skill: 'listening', name: 'Write from Dictation', blurb: 'Short, high-value, and the densest source of recoverable marks in the test.' },
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
      question: 'How much does the PTE Academic exam cost in Nepal?',
      answer:
        'As of October 2026, PTE Academic costs USD 220 plus 13% VAT (about USD 248.60), which works out at roughly NPR 32,000–33,000 depending on the exchange rate. Check the current price on Pearson’s booking page before you pay.',
    },
    {
      question: 'Where can I take PTE Academic in Nepal?',
      answer:
        'Pearson runs test centres in Kathmandu and several other Nepali cities. Book through Pearson’s official site, where you can see every centre and its open dates.',
    },
    {
      question: 'Can I practise PTE for free on Prepyo?',
      answer:
        'Yes. The free plan includes one full mock test, five practice sub-tests a day across every skill, your mistake bank and your progress.',
    },
  ],
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
  primaryCta: { label: 'Take the free diagnostic', href: appUrl('/diagnostic') },
  testOwner: 'the IELTS partners',
  chartMode: 'ielts',
  mockup: { tag: 'Band 8.0', label: 'Estimated band', value: '8.5 / 9.0', lines: ['Task: 8.5', 'Lexical: 8.5'] },
  trust: [
    { icon: 'lucide:check-circle', label: 'Marked on the IELTS band descriptors' },
    { icon: 'lucide:zap', label: 'Instant AI feedback' },
    PAYMENTS_TRUST,
    FREE_TRUST,
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
    { skill: 'speaking', name: 'Speaking Part 1', timing: '4–5 mins', blurb: 'The examiner asks about you, your home, work or studies. Short, natural answers with a reason or example.' },
    { skill: 'speaking', name: 'Speaking Part 2 (Cue Card)', timing: '3–4 mins', blurb: 'One minute to prepare, then up to two minutes on a topic card. Keeping going is half the score.' },
    { skill: 'speaking', name: 'Speaking Part 3 (Discussion)', timing: '4–5 mins', blurb: 'Abstract questions linked to your Part 2 topic. Explain, compare and justify, not just describe.' },
    { skill: 'writing', name: 'Writing Task 1', timing: '20 mins', blurb: 'Describe a chart, map or process in at least 150 words. Selecting and grouping the data is what is being marked.' },
    { skill: 'writing', name: 'Writing Task 2', timing: '40 mins', blurb: 'A 250-word essay carrying twice the marks of Task 1. Position, development and structure decide the band.' },
    { skill: 'reading', name: 'Multiple choice', timing: '', blurb: 'Choose one answer, or several, from the options. Rewards ruling out distractors over hunting for keywords.' },
    { skill: 'reading', name: 'True / False / Not Given', timing: '', blurb: 'The reading question type that costs the most marks, almost always for confusing False with Not Given.' },
    { skill: 'reading', name: 'Yes / No / Not Given', timing: '', blurb: 'The same idea applied to the writer’s views and claims rather than to facts.' },
    { skill: 'reading', name: 'Matching information', timing: '', blurb: 'Find which lettered paragraph contains a given detail. Not the same as matching headings.' },
    { skill: 'reading', name: 'Matching headings', timing: '', blurb: 'Tests whether you can find a paragraph’s main idea rather than a matching word.' },
    { skill: 'reading', name: 'Matching features', timing: '', blurb: 'Match statements to people, dates or places in the passage. A letter can be used more than once.' },
    { skill: 'reading', name: 'Matching sentence endings', timing: '', blurb: 'Complete each sentence with the ending that agrees with the passage.' },
    { skill: 'reading', name: 'Sentence completion', timing: '', blurb: 'Fill each gap with words from the passage. Word limits are strict and spelling counts.' },
    { skill: 'reading', name: 'Summary, note, table and flow-chart completion', timing: '', blurb: 'Complete a summary or diagram of the text with words from it, or from a box of options.' },
    { skill: 'reading', name: 'Diagram label completion', timing: '', blurb: 'Label a diagram of a process or object using words from the passage.' },
    { skill: 'reading', name: 'Short-answer questions', timing: '', blurb: 'Answer factual questions in a few words taken from the text.' },
    { skill: 'listening', name: 'Form and note completion', timing: '', blurb: 'Fill in a form or notes as you hear names, numbers and details, usually in Part 1.' },
    { skill: 'listening', name: 'Multiple choice', timing: '', blurb: 'Choose the right option while the speaker talks round the wrong ones.' },
    { skill: 'listening', name: 'Map and plan labelling', timing: '', blurb: 'Follow directions around a map or plan. Losing your place costs several marks at once.' },
    { skill: 'listening', name: 'Table, flow-chart and summary completion', timing: '', blurb: 'Type the missing words into a table, flow-chart or summary as you listen.' },
    { skill: 'listening', name: 'Diagram labelling', timing: '', blurb: 'Label the parts of a machine, device or process from what you hear.' },
    { skill: 'listening', name: 'Short-answer questions', timing: '', blurb: 'Answer each question in a few words from the recording.' },
    { skill: 'listening', name: 'Matching', timing: '', blurb: 'Match each item you hear about to an option from a list.' },
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
      question: 'How much does the IELTS exam cost in Nepal?',
      answer:
        'As of October 2026, IELTS Academic and General Training cost NPR 36,000 at both the British Council and IDP in Nepal, and IELTS for UKVI costs NPR 36,400. Fees change, so confirm on the British Council or IDP site when you book.',
    },
    {
      question: 'Where can I take IELTS in Nepal?',
      answer:
        'The British Council and IDP both run IELTS in Kathmandu, with test locations in other cities including Pokhara, Chitwan, Butwal and Biratnagar.',
    },
    {
      question: 'Does Prepyo cover IELTS General Training?',
      answer:
        'Prepyo’s IELTS track covers IELTS Academic. Listening and Speaking are shared with General Training, so that practice transfers, but the Reading and Writing Task 1 material is Academic.',
    },
  ],
};

/**
 * EPS-TOPIK. The question types mirror the app's own syllabus
 * (syllabus-topics.json in the app repo), so the page never lists a task the
 * practice bank does not have.
 *
 * Test composition and the selection rule are from HRD Korea's own EPS-TOPIK
 * page (epstopik.hrdkorea.or.kr), checked October 2026.
 *
 * Deliberately not stated until confirmed against the current notice for
 * Nepal — sources disagree, and answer engines would quote it back:
 * TODO(confirm): exam fee in NPR, test venue, and the skills test.
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
    { label: 'Questions', value: '40 — 20 reading, 20 listening, multiple choice' },
    { label: 'Length', value: '50 minutes — 25 reading, 25 listening' },
    { label: 'Score', value: 'Out of 100 — 50 reading, 50 listening' },
    { label: 'Selection', value: 'Ranked by score within each industry’s quota' },
  ],
  scoring: [
    'EPS-TOPIK has 40 multiple-choice questions — 20 reading and 20 listening — worth 50 points each section, 100 in total. Every answer is marked against a key, so there is no examiner judgement involved.',
    'There is no single pass mark. HRD Korea uses relative evaluation: candidates must score above the lowest score set for their industry, and are then selected in order of merit until that industry’s quota for the round is filled. Every extra point moves you up the list.',
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
      question: 'How is EPS-TOPIK scored, and what is the pass mark?',
      answer:
        'The test has 40 questions — 20 reading, 20 listening — scored out of 100. There is no fixed pass mark: HRD Korea ranks candidates by score within each industry, and those above the industry’s lowest score are selected in order of merit until the quota is filled.',
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
};

/**
 * JLPT N5, the only level the app's bank covers (scripts/generate_jlpt_bank.py
 * in the backend repo, one practice set for each of the 14 N5 item types).
 *
 * Test sections, times, scoring and pass marks are from the Japan Foundation
 * and JEES (jlpt.jp/e/guideline/testsections.html and results.html), checked
 * November 2026. Test centres in Nepal are not stated: confirm them first.
 */
export const JLPT_PAGE: ExamPage = {
  slug: '/jlpt-preparation/',
  exam: 'JAPANESE',
  name: 'JLPT N5',
  courseName: 'JLPT N5 Japanese Preparation',
  title: 'JLPT N5 Preparation in Nepal — Japanese Practice | Prepyo',
  metaDescription:
    'Prepare for JLPT N5 from Nepal: practice for all 14 question types in vocabulary, grammar, reading and listening, with Japanese audio and help in English.',
  ogImage: '/images/og-jlpt.jpg',
  updated: '2026-11-19',
  eyebrow: 'Japanese for study and work in Japan',
  h1: 'JLPT N5 preparation, built for learners in Nepal',
  standfirst:
    'All 14 question types in the N5 test, Japanese audio on every listening question, and help in English when a question stops you.',
  primaryCta: { label: 'Start practising free', href: appUrl('/') },
  testOwner: 'the Japan Foundation and JEES',
  mockup: { tag: 'JLPT N5', label: 'Practice score', value: '120 / 180', lines: ['Language knowledge: 80 / 120', 'Listening: 40 / 60'] },
  trust: [
    { icon: 'lucide:check-circle', label: 'All 14 N5 question types' },
    { icon: 'lucide:headphones', label: 'Japanese audio' },
    { icon: 'lucide:languages', label: 'Help in English' },
    PAYMENTS_TRUST,
  ],
  format: [
    { label: 'Full name', value: 'Japanese-Language Proficiency Test' },
    { label: 'Run by', value: 'The Japan Foundation and Japan Educational Exchanges and Services (JEES)' },
    { label: 'Levels', value: 'Five, N1 (hardest) to N5 (easiest)' },
    { label: 'N5 sections', value: 'Vocabulary · Grammar and reading · Listening' },
    { label: 'N5 length', value: '90 minutes — 20 vocabulary, 40 grammar and reading, 30 listening' },
    { label: 'N5 score', value: 'Out of 180 — 120 language knowledge and reading, 60 listening' },
    { label: 'N5 pass', value: '80 overall, with at least 38 and 19 in the two parts' },
  ],
  scoring: [
    'N5 is reported in two parts: language knowledge (vocabulary and grammar) with reading, scored 0–120, and listening, scored 0–60, for 180 in all. Every question is multiple choice and marked against a key.',
    'To pass you need two things: 80 points overall, and at least the sectional pass mark in each part — 38 in language knowledge and reading, 19 in listening. A strong reading score cannot carry a listening score below 19, and missing any section fails the test.',
    'That is why the two halves need practising separately. Vocabulary and grammar build quickly with drills; listening only improves by hearing Japanese at speed, so every listening question on Prepyo plays Japanese audio rather than showing a script.',
  ],
  taskTypes: [
    { skill: 'reading', name: 'Kanji reading', blurb: 'Choose how the underlined kanji is read in hiragana.' },
    { skill: 'reading', name: 'Word writing', blurb: 'Choose how the underlined word, given in hiragana, is written.' },
    { skill: 'reading', name: 'Word in context', blurb: 'Choose the word that fits the gap in the sentence.' },
    { skill: 'reading', name: 'Same meaning', blurb: 'Choose the sentence that means the same as the one given.' },
    { skill: 'reading', name: 'Grammar form', blurb: 'Choose the particle or grammar form that completes the sentence.' },
    { skill: 'reading', name: 'Sentence order', blurb: 'Put four pieces of a sentence in order and choose the one that goes in the starred gap.' },
    { skill: 'reading', name: 'Text grammar', blurb: 'Fill the gaps in a short text so it reads correctly from start to finish.' },
    { skill: 'reading', name: 'Short passage', blurb: 'Read a short text, such as a note or message, and answer a question about it.' },
    { skill: 'reading', name: 'Longer passage', blurb: 'Read a longer text about daily life and answer questions on it.' },
    { skill: 'reading', name: 'Information search', blurb: 'Find the one piece of information you need in a notice, timetable or leaflet.' },
    { skill: 'listening', name: 'Task listening', blurb: 'Listen to a conversation and choose what the speaker will do next.' },
    { skill: 'listening', name: 'Key point listening', blurb: 'Listen for one key point, such as a reason or a time, and choose it.' },
    { skill: 'listening', name: 'What do you say', blurb: 'Look at a picture of a situation and choose what you would say in it.' },
    { skill: 'listening', name: 'Quick response', blurb: 'Hear a short line and choose the right reply straight away.' },
  ],
  prepBlocks: [
    {
      title: 'Every N5 question type',
      body: 'Vocabulary, grammar, reading and listening practice for each of the 14 item types the Japan Foundation lists for N5, written to the test’s format.',
      icon: 'lucide:list-checks',
    },
    {
      title: 'Japanese audio on listening',
      body: 'Listening questions play recorded Japanese, so you train your ear on the sound of the language instead of reading a transcript.',
      icon: 'lucide:headphones',
    },
    {
      title: 'Help in English when you are stuck',
      body: 'On Premium, any practice question can be shown in English — what was said or written, the question and all four choices — so a wrong answer becomes a lesson.',
      icon: 'lucide:book-a',
    },
    {
      title: 'Practise to both pass marks',
      body: 'Your dashboard tracks reading and listening separately, so you can see which half needs more work before it costs you a sectional pass mark.',
      icon: 'lucide:target',
    },
  ],
  faqs: [
    {
      question: 'What is the JLPT?',
      answer:
        'The Japanese-Language Proficiency Test. It certifies the Japanese of people whose first language is not Japanese, at five levels from N1 (hardest) to N5 (easiest). It is run by the Japan Foundation and Japan Educational Exchanges and Services.',
    },
    {
      question: 'Which JLPT levels does Prepyo cover?',
      answer:
        'N5, the first level. Every N5 question type has its own practice set. Higher levels are not covered yet.',
    },
    {
      question: 'How is JLPT N5 scored, and what is the pass mark?',
      answer:
        'N5 is scored out of 180: 120 for language knowledge (vocabulary and grammar) with reading, and 60 for listening. To pass you need 80 overall and at least 38 and 19 in those two parts.',
    },
    {
      question: 'Does JLPT have speaking or writing?',
      answer:
        'No. Every level tests language knowledge, reading and listening only, with multiple-choice questions. That is why Prepyo’s JLPT practice has no speaking or writing.',
    },
    {
      question: 'How long is the JLPT N5 test?',
      answer:
        'About 90 minutes: 20 minutes of vocabulary, 40 minutes of grammar and reading, and 30 minutes of listening. The Japan Foundation notes that listening can run slightly longer or shorter with the recordings.',
    },
    {
      question: 'Is JLPT practice free on Prepyo?',
      answer:
        'You can start free with a few practice questions a day. EPS-TOPIK & JLPT Premium adds unlimited JLPT practice and Help in English on every question.',
    },
  ],
};

export const EXAM_PAGES: ExamPage[] = [PTE_PAGE, IELTS_PAGE, EPS_PAGE, JLPT_PAGE];
