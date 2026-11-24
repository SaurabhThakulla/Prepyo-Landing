/**
 * The four steps drawn by HowItWorksSection.
 *
 * Extracted so the same titles and descriptions can be emitted as HowTo
 * structured data. The colour stays with the content because each step is
 * themed by index.
 */
export interface Step {
  step: string;
  title: string;
  desc: string;
  icon: string;
  /** Literal colour for the icon circle, the step block and the path, which cannot use a Tailwind class. */
  hex: string;
}

// The steps climb left to right in the brand blurple, deepening; each keeps
// white text at 4.5:1 or more. The step number lives on the step
// block, so it is deliberately absent from the titles.
export const STEPS: Step[] = [
  {
    step: '01',
    title: 'Take a free test',
    desc: 'Adaptive scan maps your baseline across all 4 skills in 20 minutes.',
    icon: 'lucide:scan',
    hex: '#5865F2',
  },
  {
    step: '02',
    title: 'Practise weak spots',
    desc: 'Daily targeted drills with instant pronunciation & rubric AI feedback.',
    icon: 'lucide:cpu',
    hex: '#4f5bdf',
  },
  {
    step: '03',
    title: 'Sit a full mock',
    desc: 'Authentic Pearson & IDP exam pressure with instant band report.',
    icon: 'lucide:play-circle',
    hex: '#4752c4',
  },
  {
    step: '04',
    title: 'Book the real exam',
    desc: 'Lock in PTE 79+ or IELTS Band 8.0 confidence before test day.',
    icon: 'lucide:trophy',
    hex: '#3d47ab',
  },
];
