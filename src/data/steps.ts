/**
 * The four steps drawn by HowItWorksSection.
 *
 * Extracted so the same titles and descriptions can be emitted as HowTo
 * structured data. The styling fields stay with the content because the
 * section renders one card per step and each card is themed by index.
 */
export interface Step {
  step: string;
  badge: string;
  title: string;
  desc: string;
  icon: string;
  /** Which way the branch leaves the root. */
  side: 'left' | 'right';
  /** Accent text colour. Deepened vs the brand hue so 10px badge text clears AA. */
  accent: string;
  /** Tinted fill behind the marker and badge. */
  tint: string;
  /** Ring around the numbered marker. */
  ring: string;
  /** Border tint on hover. */
  hoverBorder: string;
  /** Literal colour for the SVG branch, which cannot use a Tailwind class. */
  hex: string;
  chips: { label: string; icon: string }[];
}

// Read order is 01 02 / 03 04, so the odd steps hang left and the even ones
// right. The step number lives on the marker, so it is deliberately absent
// from the titles: it used to appear three times per card.
export const STEPS: Step[] = [
  {
    step: '01',
    badge: 'Diagnostic scan',
    title: 'Take a free test',
    desc: 'Adaptive scan maps your baseline across all 4 skills in 20 minutes.',
    icon: 'lucide:scan',
    side: 'left',
    accent: 'text-[#4a53d9] dark:text-indigo-400',
    tint: 'bg-[#5865F2]/10',
    ring: 'ring-[#5865F2]/25',
    hoverBorder: 'hover:border-[#5865F2]/50',
    hex: '#5865F2',
    chips: [
      { label: '4-Skill Baseline', icon: 'lucide:bar-chart-2' },
      { label: 'Weakness Map', icon: 'lucide:crosshair' },
    ],
  },
  {
    step: '02',
    badge: 'Targeted practice',
    title: 'Practise weak spots',
    desc: 'Daily targeted drills with instant pronunciation & rubric AI feedback.',
    icon: 'lucide:cpu',
    side: 'right',
    accent: 'text-amber-700 dark:text-amber-400',
    tint: 'bg-amber-500/10',
    ring: 'ring-amber-500/25',
    hoverBorder: 'hover:border-amber-500/50',
    hex: '#f59e0b',
    chips: [
      { label: 'Mistake Bank', icon: 'lucide:book-marked' },
      { label: 'Fluency Waveform', icon: 'lucide:activity' },
    ],
  },
  {
    step: '03',
    badge: 'Exam simulation',
    title: 'Sit a full mock',
    desc: 'Authentic Pearson & IDP exam pressure with instant band report.',
    icon: 'lucide:play-circle',
    side: 'left',
    accent: 'text-purple-600 dark:text-purple-400',
    tint: 'bg-purple-500/10',
    ring: 'ring-purple-500/25',
    hoverBorder: 'hover:border-purple-500/50',
    hex: '#a855f7',
    chips: [
      { label: 'Real Exam Timing', icon: 'lucide:timer' },
      { label: '3-Sec Marking', icon: 'lucide:zap' },
    ],
  },
  {
    step: '04',
    badge: 'Target mastery',
    title: 'Book the real exam',
    desc: 'Lock in PTE 79+ or IELTS Band 8.0 confidence before test day.',
    icon: 'lucide:trophy',
    side: 'right',
    accent: 'text-cyan-700 dark:text-cyan-400',
    tint: 'bg-cyan-500/10',
    ring: 'ring-cyan-500/25',
    hoverBorder: 'hover:border-cyan-500/50',
    hex: '#06b6d4',
    chips: [
      { label: 'PTE 79+ / IELTS 8.0', icon: 'lucide:award' },
      { label: 'Test-Day Ready', icon: 'lucide:shield-check' },
    ],
  },
];
