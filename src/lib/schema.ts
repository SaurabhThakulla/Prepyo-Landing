/**
 * JSON-LD builders for the marketing site.
 *
 * Every node is built from the same arrays the page renders — FAQs, plans,
 * steps, exam tracks — because Google treats structured data that disagrees
 * with the visible page as spam, and a hand-written copy of a price or an
 * answer is a copy that will be wrong within a release or two.
 *
 * Nodes are emitted together in one `@graph` so they can reference each other
 * by `@id` instead of repeating the organisation on every page.
 */
import type { Faq } from '@/data/faq';
import type { ExamPage } from '@/data/exam-pages';
import type { Role } from '@/data/careers';
import { EXACT_PLANS } from '@/data/pricing';
import { STEPS } from '@/data/steps';
import {
  asset,
  BILLING_EMAIL,
  BUSINESS_ADDRESS,
  CONTACT_EMAIL,
  FOUNDER_NAME,
  FOUNDER_URL,
  GOOGLE_BUSINESS_URL,
  KOREAN_LIVE,
  SOCIAL_LINKS,
} from '@/consts';

export type JsonLdNode = Record<string, unknown>;

/** Stable `@id`s, so a node defined on one page can be referenced from another. */
export const organizationId = (site: URL) => `${site.href}#organization`;
export const websiteId = (site: URL) => `${site.href}#website`;

const abs = (site: URL, path: string) => new URL(asset(path), site).href;

export function organization(site: URL): JsonLdNode {
  return {
    '@type': 'EducationalOrganization',
    '@id': organizationId(site),
    name: 'Prepyo',
    url: site.href,
    logo: {
      '@type': 'ImageObject',
      url: abs(site, '/prepyo-logo.webp'),
      width: 545,
      height: 176,
    },
    description: KOREAN_LIVE
      ? 'PTE Academic, IELTS Academic and EPS-TOPIK Korean test preparation built for learners in Nepal, with full-length mock exams and practice marked against the published criteria.'
      : 'PTE Academic and IELTS Academic test preparation built for students in Nepal, with full-length mock exams marked against the published band descriptors.',
    email: CONTACT_EMAIL,
    founder: founder(site),
    sameAs: [...SOCIAL_LINKS.map(link => link.href), GOOGLE_BUSINESS_URL],
    address: { '@type': 'PostalAddress', ...BUSINESS_ADDRESS },
    hasMap: GOOGLE_BUSINESS_URL,
    areaServed: { '@type': 'Country', name: 'Nepal' },
    knowsLanguage: KOREAN_LIVE ? ['en', 'ne', 'ko'] : ['en', 'ne'],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: CONTACT_EMAIL,
        areaServed: 'NP',
        availableLanguage: ['English', 'Nepali'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'billing support',
        email: BILLING_EMAIL,
        areaServed: 'NP',
        availableLanguage: ['English', 'Nepali'],
      },
    ],
  };
}

export const founderId = (site: URL) => `${site.href}#founder`;

export function founder(site: URL): JsonLdNode {
  return {
    '@type': 'Person',
    '@id': founderId(site),
    name: FOUNDER_NAME,
    jobTitle: 'Founder',
    sameAs: [FOUNDER_URL],
  };
}

export function website(site: URL): JsonLdNode {
  return {
    '@type': 'WebSite',
    '@id': websiteId(site),
    url: site.href,
    name: 'Prepyo',
    inLanguage: 'en',
    publisher: { '@id': organizationId(site) },
  };
}

/**
 * The platform itself, with one Offer per plan.
 *
 * No `aggregateRating`: Google requires ratings to come from reviews it can
 * verify, and an invented one is a manual-action risk rather than a shortcut.
 */
export function softwareApplication(site: URL): JsonLdNode {
  const pricingUrl = `${site.href}#pricing`;

  return {
    '@type': 'SoftwareApplication',
    '@id': `${site.href}#app`,
    name: 'Prepyo',
    url: site.href,
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web browser',
    inLanguage: 'en',
    publisher: { '@id': organizationId(site) },
    offers: EXACT_PLANS.map(plan => ({
      '@type': 'Offer',
      name: `${plan.name} (${plan.gloss})`,
      description: plan.subtitle,
      price: String(plan.priceNPR),
      priceCurrency: 'NPR',
      url: pricingUrl,
      availability: 'https://schema.org/InStock',
    })),
  };
}

/**
 * The page itself, carrying the date its content was last reviewed — the
 * freshness signal answer engines weigh when two sources disagree.
 */
export function webPage(
  site: URL,
  url: URL,
  page: { name: string; description: string; dateModified: string; about?: JsonLdNode; hasBreadcrumbs?: boolean },
): JsonLdNode {
  return {
    '@type': 'WebPage',
    '@id': `${url.href}#webpage`,
    url: url.href,
    name: page.name,
    description: page.description,
    inLanguage: 'en',
    dateModified: page.dateModified,
    isPartOf: { '@id': websiteId(site) },
    publisher: { '@id': organizationId(site) },
    ...(page.hasBreadcrumbs === false ? {} : { breadcrumb: { '@id': `${url.href}#breadcrumbs` } }),
    ...(page.about ? { about: page.about } : {}),
  };
}

export function faqPage(url: URL, faqs: Faq[]): JsonLdNode {
  return {
    '@type': 'FAQPage',
    '@id': `${url.href}#faq`,
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function howTo(url: URL): JsonLdNode {
  return {
    '@type': 'HowTo',
    '@id': `${url.href}#how-it-works`,
    name: 'Four steps to your target score',
    description:
      'One connected path that adapts to your progress, from first baseline to exam day.',
    step: STEPS.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.title,
      text: step.desc,
      url: `${url.href}#how-it-works`,
    })),
  };
}

export function course(site: URL, url: URL, page: ExamPage): JsonLdNode {
  return {
    '@type': 'Course',
    '@id': `${url.href}#course`,
    name: page.courseName,
    description: page.metaDescription,
    url: url.href,
    provider: { '@id': organizationId(site) },
    inLanguage: 'en',
    dateModified: page.updated,
    teaches: page.taskTypes.map(task => task.name),
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Online',
      inLanguage: 'en',
    },
    // The free tier is real, so the lowest price genuinely is zero.
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'NPR',
      category: 'Free tier',
      url: `${site.href}#pricing`,
      availability: 'https://schema.org/InStock',
    },
  };
}

export function breadcrumbs(url: URL, trail: { name: string; item: string }[]): JsonLdNode {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${url.href}#breadcrumbs`,
    itemListElement: trail.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.name,
      item: entry.item,
    })),
  };
}

/**
 * A single job listing.
 *
 * Google requires title, description, datePosted, validThrough,
 * hiringOrganization and a location — a posting missing any of them is simply
 * not eligible, so every field here is mandatory in the Role type rather than
 * optional. Remote roles use `jobLocationType` plus an applicant location
 * instead of a street address, which is what the spec asks for.
 */
export function jobPosting(site: URL, url: URL, role: Role): JsonLdNode {
  const remote = /remote/i.test(role.location);

  return {
    '@type': 'JobPosting',
    '@id': `${url.href}#${role.id}`,
    title: role.title,
    description: [role.description, ...role.responsibilities, ...role.requirements].join(' '),
    datePosted: role.datePosted,
    validThrough: role.validThrough,
    employmentType: role.type,
    // Spelled out rather than a bare @id: Google's job-posting check does not
    // follow references for required fields, and flags a posting with no
    // hiringOrganization.name as invalid.
    hiringOrganization: {
      '@type': 'Organization',
      '@id': organizationId(site),
      name: 'Prepyo',
      sameAs: site.href,
      logo: abs(site, '/prepyo-logo.webp'),
    },
    directApply: true,
    ...(remote
      ? {
          jobLocationType: 'TELECOMMUTE',
          applicantLocationRequirements: { '@type': 'Country', name: 'Nepal' },
        }
      : {
          jobLocation: {
            '@type': 'Place',
            address: {
              '@type': 'PostalAddress',
              // "Kathmandu / Hybrid" is display text; the address wants the place.
              addressLocality: role.location.split('/')[0].trim(),
              addressCountry: 'NP',
            },
          },
        }),
  };
}

/** Everything an exam page (PTE, IELTS, EPS-TOPIK) emits, in one place. */
export function examPageGraph(site: URL, url: URL, page: ExamPage): JsonLdNode[] {
  return [
    organization(site),
    website(site),
    webPage(site, url, {
      name: page.title,
      description: page.metaDescription,
      dateModified: page.updated,
      about: { '@id': `${url.href}#course` },
    }),
    course(site, url, page),
    faqPage(url, page.faqs),
    breadcrumbs(url, [
      { name: 'Home', item: site.href },
      { name: page.name, item: url.href },
    ]),
  ];
}

/** One blog post, authored by the founder. */
export function blogPosting(
  site: URL,
  url: URL,
  post: { title: string; description: string; published: string; updated: string; image: string },
): JsonLdNode {
  return {
    '@type': 'BlogPosting',
    '@id': `${url.href}#article`,
    headline: post.title,
    description: post.description,
    url: url.href,
    mainEntityOfPage: url.href,
    datePublished: post.published,
    dateModified: post.updated,
    inLanguage: 'en',
    image: abs(site, post.image),
    author: founder(site),
    publisher: { '@id': organizationId(site) },
    isPartOf: { '@id': websiteId(site) },
  };
}
