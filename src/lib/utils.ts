import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind classes so a caller's override wins over a component default
 * (e.g. `rounded-2xl` passed into a button whose base is `rounded-lg`).
 *
 * This only ever runs in Astro frontmatter, so it costs nothing at runtime —
 * the browser receives a plain, already-resolved class attribute.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
