/**
 * NotebookTab
 *
 * Shared page-tab used by the left section markers and by the right project
 * category markers. The only difference between the two sides is the mirrored
 * geometry and expansion direction.
 *
 * @param {Object} props
 * @param {'left'|'right'} [props.side]
 * @param {string} [props.icon] Icon key (section id or category key)
 * @param {string} props.label Accessible name and inline expanded label
 * @param {boolean} [props.active]
 * @param {string} [props.accent] Existing palette accent for the tab strip
 * @param {Function} [props.onSelect]
 */

const ICON_PATHS = {
  about: [
    'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z',
    'M4.5 20a7.5 7.5 0 0 1 15 0',
  ],
  career: [
    'M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7',
    'M4 7h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Z',
    'M3 12h18',
  ],
  studies: [
    'm3 8 9-4 9 4-9 4-9-4Z',
    'M7 10v4.5c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5V10',
    'M21 8v5',
  ],
  projects: [
    'M3.5 7A1.5 1.5 0 0 1 5 5.5h4l2 2h8A1.5 1.5 0 0 1 20.5 9v8.5A1.5 1.5 0 0 1 19 19H5a1.5 1.5 0 0 1-1.5-1.5V7Z',
  ],
  contact: [
    'M4 5.5h16A1.5 1.5 0 0 1 21.5 7v10a1.5 1.5 0 0 1-1.5 1.5H4A1.5 1.5 0 0 1 2.5 17V7A1.5 1.5 0 0 1 4 5.5Z',
    'm3 7 9 6 9-6',
  ],
  ai: [
    'M7 8h10a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z',
    'M12 4v4',
    'M9 13h.01',
    'M15 13h.01',
    'M9 17h6',
    'M4 12H2',
    'M22 12h-2',
  ],
  games: [
    'M7 8h10a4 4 0 0 1 3.9 4.9l-1 5A3 3 0 0 1 17 20h-1.5l-1.5-2h-4l-1.5 2H7a3 3 0 0 1-2.9-2.1l-1-5A4 4 0 0 1 7 8Z',
    'M8 11v3',
    'M6.5 12.5h3',
    'M15.5 12h.01',
    'M18 14h.01',
  ],
  webdev: [
    'm8 6-5 6 5 6',
    'm16 6 5 6-5 6',
    'm14 4-4 16',
  ],
  backend: [
    'M4 5h16v5H4z',
    'M4 14h16v5H4z',
    'M7 7.5h.01',
    'M7 16.5h.01',
    'M10 7.5h6',
    'M10 16.5h6',
  ],
}

export default function NotebookTab({
  side = 'left',
  icon = 'about',
  label,
  active = false,
  accent,
  onSelect,
}) {
  const paths = ICON_PATHS[icon] ?? ICON_PATHS.about
  const isCategory = side === 'right'

  return (
    <button
      type="button"
      className={`notebook-tab ${side}${active ? ' is-active' : ''}`}
      style={accent ? { '--tab-accent': accent } : undefined}
      aria-label={label}
      aria-current={active ? 'page' : undefined}
      aria-pressed={active}
      onClick={onSelect}
    >
      <span className="notebook-tab-icon" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--tab-icon-ink)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          focusable="false"
        >
          {paths.map((path) => (
            <path key={path} d={path} />
          ))}
        </svg>
      </span>
      <span className="notebook-tab-label">{label}</span>
    </button>
  )
}
