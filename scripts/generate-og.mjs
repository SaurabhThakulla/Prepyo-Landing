/**
 * Renders the 1200x630 social cards into public/images/: the site-wide cover
 * and one per exam page, so a shared exam link previews as that exam rather
 * than as the homepage.
 *
 * Kept as a script rather than hand-made files so the cards can be regenerated
 * when a headline changes. sharp is already present as an Astro dependency.
 *
 * Run with: npm run og
 */
import sharp from 'sharp';

const W = 1200, H = 630;

const CARDS = [
  {
    file: 'og-cover.jpg',
    title: ['PTE 79+ &amp; IELTS 8.0', 'with full mock exams.'],
    sub: ['Mock exams and practice marked against the published', 'band descriptors. Built for students in Nepal.'],
    pill: 'eSewa · Khalti · Fonepay',
  },
  {
    file: 'og-pte.jpg',
    title: ['PTE Academic preparation', 'built for Nepal.'],
    sub: ['Every task type, full mocks with real timings, and', 'scoring on Pearson’s published criteria.'],
    pill: 'Start free · eSewa · Khalti',
  },
  {
    file: 'og-ielts.jpg',
    title: ['IELTS Academic preparation', 'built for Nepal.'],
    sub: ['Writing and Speaking feedback on the four band', 'descriptors, and full-length mock tests.'],
    pill: 'Start free · eSewa · Khalti',
  },
  {
    file: 'og-eps-topik.jpg',
    title: ['EPS-TOPIK preparation', 'for work in Korea.'],
    sub: ['Learn Korean from Hangul, then practise every reading', 'and listening question type with Korean audio.'],
    pill: 'Start free · eSewa · Khalti',
  },
];

const svgFor = ({ title, sub, pill }) => {
  const pillWidth = Math.round(pill.length * 7.1 + 44);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0b1220"/>
      <stop offset="55%" stop-color="#111c3a"/>
      <stop offset="100%" stop-color="#1b2a5e"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.85" cy="0.15" r="0.7">
      <stop offset="0%" stop-color="#5865F2" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#5865F2" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="rule" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#5865F2"/>
      <stop offset="100%" stop-color="#38bdf8"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <g font-family="Segoe UI, Arial, Helvetica, sans-serif">
    <text x="80" y="292" font-size="76" font-weight="700" fill="#ffffff" letter-spacing="-1.5">${title[0]}</text>
    <text x="80" y="378" font-size="76" font-weight="700" fill="#8fb8ff" letter-spacing="-1.5">${title[1]}</text>

    <rect x="80" y="424" width="132" height="6" rx="3" fill="url(#rule)"/>

    <text x="80" y="492" font-size="31" font-weight="400" fill="#c3cee6">${sub[0]}</text>
    <text x="80" y="536" font-size="31" font-weight="400" fill="#c3cee6">${sub[1]}</text>

    <g transform="translate(80, 556)">
      <rect x="0" y="0" width="${pillWidth}" height="42" rx="21" fill="#ffffff" fill-opacity="0.08" stroke="#ffffff" stroke-opacity="0.16"/>
      <text x="${pillWidth / 2}" y="28" font-size="19" font-weight="600" fill="#e7edfa" text-anchor="middle">${pill}</text>
    </g>
  </g>
</svg>`;
};

const logo = await sharp('public/prepyo-logo-dark.webp').resize({ width: 300 }).png().toBuffer();

for (const card of CARDS) {
  const out = `public/images/${card.file}`;
  await sharp(Buffer.from(svgFor(card)))
    .composite([{ input: logo, top: 74, left: 78 }])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(out);

  const meta = await sharp(out).metadata();
  console.log('written', out, meta.width + 'x' + meta.height, meta.size + ' bytes');
}
