/**
 * Smooth-scrolls to a section and updates the address bar without a navigation.
 *
 * The nav, footer and hero all link to `#section` anchors on this one page, and
 * they all want the same behaviour: no jump, and a shareable URL afterwards.
 */
export function scrollToSection(id: string): void {
  const element = document.getElementById(id);
  if (!element) return;

  element.scrollIntoView({ behavior: 'smooth' });
  window.history.pushState(null, '', `#${id}`);
}

/**
 * Wires every `<a href="#some-id">` inside `root` to scroll instead of jumping.
 * `onNavigate` lets a caller close its menu or dropdown at the same time.
 *
 * The links are bare fragments rather than `/#some-id` so they keep working
 * under a sub-path deploy like GitHub Pages, where "/" is not this site.
 *
 * `selector` narrows which anchors are claimed, so a caller that already
 * handles some of them itself can leave those alone.
 */
export function bindSectionLinks(
  root: ParentNode,
  onNavigate?: () => void,
  selector = 'a[href^="#"]',
): void {
  root.querySelectorAll<HTMLAnchorElement>(selector).forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      onNavigate?.();
      scrollToSection(link.getAttribute('href')!.slice(1));
    });
  });
}
