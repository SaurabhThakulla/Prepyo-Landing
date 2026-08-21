# Prepyo Landing

The public marketing site for [Prepyo](https://prepyo.np) — Nepal's AI-powered PTE Academic and IELTS preparation platform.

It was split out of the Next.js app (`prepyo-app`) so the pages a first-time
visitor sees are plain static HTML, with no React bundle, no auth context and no
session check standing between them and the page.

## Stack

| | |
|---|---|
| Framework | [Astro](https://astro.build) 5, static output |
| Styling | Tailwind CSS 3 via PostCSS, same design tokens as the app |
| Icons | `astro-icon` + `@iconify-json/lucide`, inlined as SVG at build |
| Runtime JS | A few hundred bytes of hand-written vanilla script — no framework ships to the browser |

## Getting started

```bash
npm install
npm run dev
```

The dev server runs on <http://localhost:4321>.

| Command | Does |
|---|---|
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Build the static site into `dist/` |
| `npm run preview` | Serve `dist/` locally to check the built output |
| `npm run check` | Type-check the `.astro` and `.ts` files |

## Configuration

Copy `.env.example` to `.env` and adjust:

| Variable | Default | Purpose |
|---|---|---|
| `PUBLIC_APP_URL` | `http://localhost:3000` | Where the Next.js app lives. Every sign-up / login / dashboard link is an absolute URL into it. |
| `PUBLIC_API_BASE_URL` | `http://localhost:8080/api/v1` | The Go API. Used for the single public request this site makes. |

Both are `PUBLIC_` prefixed because they are inlined into the built output.
Nothing secret belongs in either.

### The pricing section needs CORS

Pricing is fetched from `GET /subscriptions/plans` at runtime rather than
hardcoded, so a visitor never sees a price that checkout will not honour. That
request is cross-origin, so this site's origin has to be in the backend's
`ALLOWED_ORIGINS` list:

```bash
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:4321
```

If the request fails, the pricing section removes itself rather than showing a
stale number.

## Structure

```
src/
  pages/index.astro          the landing page, one section per component
  layouts/Layout.astro       html shell, fonts, meta tags, nav + footer
  components/
    Nav.astro                sticky nav, exam dropdown, theme toggle, mobile menu
    Footer.astro
    Hero.astro
    ExamsSection.astro       #products
    FeaturesSection.astro    #features
    HowItWorksSection.astro  #how-it-works
    PricingSection.astro     #pricing, the one section that calls the API
    TrustBadges.astro
    InstitutionsSection.astro #institutions
    FAQSection.astro         #faq, accordion
    FinalCTA.astro
    Button.astro             the app's button styles as an Astro component
    SectionHeading.astro     the eyebrow + title + description block
  scripts/
    exam-state.ts            PTE/IELTS choice, shared between nav and exam cards
    scroll-to.ts             smooth-scroll for the in-page `/#section` links
  styles/global.css          Tailwind entry + the app's HSL theme tokens
```

### How the interactive bits work

The app used React context for these; here they are small scripts:

- **Theme** — an inline script in `<head>` reads `localStorage['prepyo-theme']`
  and sets `.dark` on `<html>` before first paint, so there is no flash. Which
  sun/moon icon shows is decided by CSS, not JavaScript.
- **Exam choice** — `scripts/exam-state.ts` keeps the PTE/IELTS selection in
  `localStorage` and broadcasts a `prepyo:exam-change` event, which is all the
  nav dropdown and the exam cards need to stay in sync. The app writes the real
  `targetExam` to the profile once someone has an account.
- **FAQ accordion** and **nav menus** — plain class toggles on the elements
  Astro already rendered.

## Deploying

`npm run build` emits a fully static `dist/`, deployable to any static host
(Netlify, Vercel, Cloudflare Pages, S3, nginx). Set `PUBLIC_APP_URL` and
`PUBLIC_API_BASE_URL` in the build environment first — they are read at build
time, not at runtime.
