import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Blog posts: one Markdown file each in src/content/blog/. The file name is
 * the URL slug, so renaming a file changes its address — don't, once a post
 * is live.
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    /** Meta description: keep it between 120 and 155 characters. */
    description: z.string().max(160),
    /** ISO dates. Bump `updated` whenever the facts in a post are re-checked. */
    published: z.string(),
    updated: z.string(),
    /** Which exam the post is about, for the card label. */
    exam: z.enum(['PTE', 'IELTS', 'PTE & IELTS', 'EPS-TOPIK']),
    /** Social card, site-relative. */
    ogImage: z.string(),
    /** Questions answered at the end of the post, emitted as FAQPage markup. */
    faqs: z.array(z.object({ question: z.string(), answer: z.string() })).default([]),
  }),
});

export const collections = { blog };
