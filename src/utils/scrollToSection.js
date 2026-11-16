/**
 * Scrolls the closest scrollable ancestor to the given section.
 *
 * This is the shared movement used by the Play button and by the mouse-wheel
 * navigation, so both land on the exact same section boundary.
 *
 * @param {HTMLElement|null|undefined} target
 * @param {{ behavior?: ScrollBehavior }} [options]
 */
export function scrollToSection(target, { behavior } = {}) {
  if (!target) return

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  target.scrollIntoView({
    behavior: behavior ?? (prefersReducedMotion ? 'auto' : 'smooth'),
    block: 'start',
  })
}
