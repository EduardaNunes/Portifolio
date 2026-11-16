/**
 * NarrativeNotebook Component
 *
 * Renders a centered notebook (about 80vw x 80vh) as an open book: a base
 * spread holds the two facing leaves while a half-page layer physically turns
 * around the spine during navigation. Navigation happens through the left page
 * tabs, the right category tabs (Projects only) or the bottom corner zones.
 *
 * @param {Object} props
 * @param {Array} props.spreads Spread descriptors: { id, section, left, right }
 * @param {Array} props.sections Left page-tab descriptors: { id, label, accent }
 * @param {Array} props.categories Right category tabs: { id, label, count }
 * @param {string|null} props.activeCategory
 * @param {Function} props.onCategorySelect
 * @param {boolean} props.isOpen
 * @param {Function} [props.onNavigation]
 * @param {string} [props.previousLabel]
 * @param {string} [props.nextLabel]
 * @param {string} [props.sectionsLabel]
 * @param {string} [props.emptyCategoryLabel]
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import PageTurn from './PageTurn'
import ProjectsSection from './ProjectsSection'

const TURN_DURATION = 420

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
}

function SectionIcon({ sectionId }) {
  const paths = ICON_PATHS[sectionId] ?? ICON_PATHS.about

  return (
    <svg
      className="page-tab-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths.map((path) => (
        <path key={path} d={path} />
      ))}
    </svg>
  )
}

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

const NarrativeNotebook = ({
  spreads = [],
  sections = [],
  categories = [],
  activeCategory = null,
  onCategorySelect,
  isOpen = false,
  onNavigation,
  previousLabel = 'Página anterior',
  nextLabel = 'Próxima página',
  sectionsLabel = 'Seções do caderno',
  emptyCategoryLabel = 'Nenhum projeto nesta categoria',
}) => {
  const [currentSpread, setCurrentSpread] = useState(0)
  const [turn, setTurn] = useState(null)
  const turningRef = useRef(false)
  const previousCategory = useRef(activeCategory)
  const totalSpreads = spreads.length
  const safeSpread = totalSpreads === 0 ? 0 : Math.min(currentSpread, totalSpreads - 1)
  const current = spreads[safeSpread]
  const currentSection = current?.section
  const isProjects = currentSection === 'projects'
  const currentLabel = sections.find((section) => section.id === currentSection)?.label ?? ''

  const commitSpread = useCallback(
    (index) => {
      setCurrentSpread(index)
      onNavigation?.(index)
    },
    [onNavigation],
  )

  const goToSpread = useCallback(
    (index) => {
      if (totalSpreads === 0 || turningRef.current) return
      const clamped = Math.max(0, Math.min(index, totalSpreads - 1))
      if (clamped === safeSpread) return

      if (prefersReducedMotion()) {
        commitSpread(clamped)
        return
      }

      // Set synchronously so rapid clicks in the same frame cannot stack turns.
      turningRef.current = true
      setTurn({
        from: safeSpread,
        to: clamped,
        direction: clamped > safeSpread ? 'forward' : 'backward',
      })
    },
    [commitSpread, safeSpread, totalSpreads],
  )

  const handleTurnFinish = useCallback(() => {
    if (!turn) return
    turningRef.current = false
    commitSpread(turn.to)
    setTurn(null)
  }, [commitSpread, turn])

  useEffect(() => {
    setCurrentSpread((previous) => Math.min(previous, Math.max(0, totalSpreads - 1)))
  }, [totalSpreads])

  useEffect(() => {
    if (previousCategory.current === activeCategory) return
    previousCategory.current = activeCategory
    turningRef.current = false
    setTurn(null)
    const firstProject = spreads.findIndex((spread) => spread.section === 'projects')
    if (firstProject >= 0) setCurrentSpread(firstProject)
  }, [activeCategory, spreads])

  const handleMarkerClick = (sectionId) => {
    const index = spreads.findIndex((spread) => spread.section === sectionId)
    if (index >= 0) goToSpread(index)
  }

  if (!isOpen) {
    return (
      <section id="notebook-section" className="notebook-section" data-snap-section>
        <div className="notebook-frame">
          <div className="notebook-shell is-closed" aria-hidden="true" />
        </div>
      </section>
    )
  }

  const turnSpreads =
    turn && spreads[turn.from] && spreads[turn.to]
      ? { from: spreads[turn.from], to: spreads[turn.to] }
      : null
  const isForward = turn?.direction === 'forward'
  const baseLeft = turnSpreads
    ? isForward
      ? turnSpreads.from
      : turnSpreads.to
    : current
  const baseRight = turnSpreads
    ? isForward
      ? turnSpreads.to
      : turnSpreads.from
    : current
  const turningFront = turnSpreads ? (isForward ? turnSpreads.from : turnSpreads.to) : null
  const turningBack = turnSpreads ? (isForward ? turnSpreads.to : turnSpreads.from) : null

  return (
    <section id="notebook-section" className="notebook-section" data-snap-section>
      <div className="notebook-frame">
        <div className="notebook-shell">
          <div className="notebook-stage">
            {baseLeft && baseRight && (
              <div className="notebook-spread">
                <div key={`${baseLeft.id}-left`} className="notebook-leaf left">
                  {baseLeft.left}
                </div>
                <div key={`${baseRight.id}-right`} className="notebook-leaf right">
                  {baseRight.right}
                </div>
              </div>
            )}

            {turnSpreads && turningFront && turningBack && (
              <PageTurn
                key={`${turn.from}-${turn.to}`}
                direction={turn.direction}
                duration={TURN_DURATION}
                onFinish={handleTurnFinish}
                front={
                  <div key={`${turningFront.id}-front`} className="notebook-leaf right">
                    {turningFront.right}
                  </div>
                }
                back={
                  <div key={`${turningBack.id}-back`} className="notebook-leaf left">
                    {turningBack.left}
                  </div>
                }
              />
            )}
          </div>

          <button
            type="button"
            className="corner-zone left"
            onClick={() => goToSpread(safeSpread - 1)}
            aria-label={previousLabel}
            disabled={safeSpread === 0 || Boolean(turn)}
          />
          <button
            type="button"
            className="corner-zone right"
            onClick={() => goToSpread(safeSpread + 1)}
            aria-label={nextLabel}
            disabled={safeSpread >= totalSpreads - 1 || Boolean(turn)}
          />
        </div>

        <nav className="page-tabs" aria-label={sectionsLabel}>
          {sections.map((section) => {
            const isCurrent = section.id === currentSection
            return (
              <button
                key={section.id}
                type="button"
                className={`page-tab${isCurrent ? ' current' : ''}`}
                style={{ '--tab-accent': section.accent }}
                data-tooltip={section.label}
                aria-label={section.label}
                aria-current={isCurrent ? 'page' : undefined}
                tabIndex={isCurrent ? -1 : undefined}
                onClick={() => handleMarkerClick(section.id)}
              >
                <SectionIcon sectionId={section.id} />
              </button>
            )
          })}
        </nav>

        {isProjects && (
          <ProjectsSection
            categories={categories}
            activeCategory={activeCategory}
            onCategorySelect={onCategorySelect}
            emptyCategoryLabel={emptyCategoryLabel}
          />
        )}

        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {currentLabel}
        </p>
      </div>
    </section>
  )
}

export default NarrativeNotebook
