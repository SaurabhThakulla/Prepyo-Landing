/**
 * Data behind the two score tools. Every figure here is copied from an
 * official source, named next to it; nothing is estimated or interpolated.
 * When a source is updated, change the figures and the `checked` date together.
 */

/**
 * Pearson's PTE Academic ↔ IELTS Academic concordance, Table 8 of
 * "Establishing score concordance between the enhanced PTE Academic and IELTS
 * Academic" (Hughes & Clesham, July 2025). It is for the enhanced PTE test in
 * use from August 2025. `null` means the study reports no PTE range for that
 * band (e.g. there is no PTE speaking or writing range for IELTS 9.0).
 */
export const CONCORDANCE_SOURCE = {
  name: 'Pearson concordance study, July 2025',
  url: 'https://www.pearsonpte.com/content/dam/ELL/pte/pearsonpte/pdfs/concordance-study-analysis-pte-academic-july-2025-web.pdf',
  scoringPage: 'https://www.pearsonpte.com/pte-academic/scoring/',
  checked: '2026-10-08',
};

export type Skill = 'overall' | 'listening' | 'reading' | 'speaking' | 'writing';

export const SKILLS: { id: Skill; label: string }[] = [
  { id: 'overall', label: 'Overall' },
  { id: 'listening', label: 'Listening' },
  { id: 'reading', label: 'Reading' },
  { id: 'speaking', label: 'Speaking' },
  { id: 'writing', label: 'Writing' },
];

type Range = [number, number] | null;

export const CONCORDANCE: { ielts: number; pte: Record<Skill, Range> }[] = [
  { ielts: 4.5, pte: { overall: [24, 30], listening: [26, 32], reading: [29, 35], speaking: [14, 23], writing: [17, 28] } },
  { ielts: 5.0, pte: { overall: [31, 38], listening: [33, 39], reading: [36, 41], speaking: [24, 38], writing: [29, 40] } },
  { ielts: 5.5, pte: { overall: [39, 46], listening: [40, 46], reading: [42, 47], speaking: [39, 53], writing: [41, 50] } },
  { ielts: 6.0, pte: { overall: [47, 54], listening: [47, 52], reading: [48, 53], speaking: [54, 65], writing: [51, 59] } },
  { ielts: 6.5, pte: { overall: [55, 62], listening: [53, 57], reading: [54, 58], speaking: [66, 75], writing: [60, 68] } },
  { ielts: 7.0, pte: { overall: [63, 70], listening: [58, 63], reading: [59, 64], speaking: [76, 82], writing: [69, 76] } },
  { ielts: 7.5, pte: { overall: [71, 78], listening: [64, 68], reading: [65, 69], speaking: [83, 87], writing: [77, 84] } },
  { ielts: 8.0, pte: { overall: [79, 85], listening: [69, 74], reading: [70, 74], speaking: [88, 89], writing: [85, 89] } },
  { ielts: 8.5, pte: { overall: [86, 89], listening: [75, 80], reading: [75, 80], speaking: [90, 90], writing: [90, 90] } },
  { ielts: 9.0, pte: { overall: [90, 90], listening: [81, 90], reading: [81, 90], speaking: null, writing: null } },
];

/**
 * IELTS overall band rule, from ielts.org ("IELTS scoring in detail"): the
 * average of the four section bands, rounded to the nearest half band, with
 * an average ending in .25 rounded up to the next half band and one ending in
 * .75 rounded up to the next whole band.
 */
export const IELTS_SOURCE = {
  name: 'IELTS scoring in detail (ielts.org)',
  url: 'https://ielts.org/take-a-test/your-results/ielts-scoring-in-detail',
  checked: '2026-10-08',
};

/** The worked examples ielts.org publishes, shown on the page as proof. */
export const IELTS_EXAMPLES = [
  { scores: [6.5, 6.5, 5.0, 7.0], average: 6.25, overall: 6.5 },
  { scores: [4.0, 3.5, 4.0, 4.0], average: 3.875, overall: 4.0 },
  { scores: [6.5, 6.5, 5.5, 6.0], average: 6.125, overall: 6.0 },
];

/** Section bands are multiples of 0.5, so the average is a multiple of 0.125 and exact in floating point. */
export function ieltsOverall(scores: number[]): number {
  const average = scores.reduce((sum, s) => sum + s, 0) / scores.length;
  return Math.floor(average * 2 + 0.5) / 2;
}
