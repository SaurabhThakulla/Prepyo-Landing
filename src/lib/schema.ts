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
import { asset } from '@/consts';

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
    description:
      'PTE Academic, IELTS Academic and Japanese language test preparation built for students in Nepal, with full-length mock exams marked against the official band descriptors.',
    areaServed: { '@type': 'Country', name: 'Nepal' },
    knowsLanguage: ['en', 'ne'],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'Institutions and consultancies',
        email: 'institutes@prepyo.np',
        areaServed: 'NP',
        availableLanguage: ['English', 'Nepali'],
      },
    ],
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
    hiringOrganization: { '@id': organizationId(site) },
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
              addressLocality: role.location,
              addressCountry: 'NP',
            },
          },
        }),
  };
}
