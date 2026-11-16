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
import NotebookTab from './NotebookTab'
import PageTurn from './PageTurn'
import ProjectsSection from './ProjectsSection'

const TURN_DURATION = 420

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
  const [pendingSection, setPendingSection] = useState(null)
  const turningRef = useRef(false)
  const previousCategory = useRef(activeCategory)
  // Track the spread that is visually on screen (for category-turn origin)
  const visualSpreadRef = useRef(spreads[0] ?? null)
  const totalSpreads = spreads.length
  const safeSpread = totalSpreads === 0 ? 0 : Math.min(currentSpread, totalSpreads - 1)
  const current = spreads[safeSpread]
  const currentSection = current?.section
  // During a turn, use the pending target section for immediate tab anchoring
  const effectiveSection = pendingSection ?? currentSection
  const isProjects = effectiveSection === 'projects'
  const currentLabel = sections.find((section) => section.id === effectiveSection)?.label ?? ''

  const commitSpread = useCallback(
    (index) => {
      setCurrentSpread(index)
      onNavigation?.(index)
    },
    [onNavigation],
  )

  const goToSpread = useCallback(
    (index, options = {}) => {
      if (totalSpreads === 0 || turningRef.current) return
      const clamped = Math.max(0, Math.min(index, totalSpreads - 1))
      // When force is true, allow the turn even if the clamped index equals
      // the current safeSpread (e.g., category change reconstructs spreads and
      // indices collide but visual content has changed).
      if (clamped === safeSpread && !options.force) return

      const targetSection = spreads[clamped]?.section
      if (targetSection) setPendingSection(targetSection)

      if (prefersReducedMotion()) {
        commitSpread(clamped)
        visualSpreadRef.current = spreads[clamped] ?? null
        setPendingSection(null)
        return
      }

      // Set synchronously so rapid clicks in the same frame cannot stack turns.
      turningRef.current = true
      setTurn({
        from: safeSpread,
        to: clamped,
        direction: clamped > safeSpread ? 'forward' : 'backward',
        fromSpread: options.fromSpread ?? null,
      })
    },
    [commitSpread, safeSpread, totalSpreads, spreads],
  )

  const handleTurnFinish = useCallback(() => {
    if (!turn) return
    turningRef.current = false
    commitSpread(turn.to)
    visualSpreadRef.current = spreads[turn.to] ?? null
    setTurn(null)
    setPendingSection(null)
  }, [commitSpread, turn, spreads])

  useEffect(() => {
    setCurrentSpread((previous) => Math.min(previous, Math.max(0, totalSpreads - 1)))
  }, [totalSpreads])

  useEffect(() => {
    if (previousCategory.current === activeCategory) return
    previousCategory.current = activeCategory
    turningRef.current = false
    setTurn(null)
    const firstProject = spreads.findIndex((spread) => spread.section === 'projects')
    if (firstProject >= 0) {
      // Use the visually current spread as the turn origin for category changes.
      // Force the turn even if the clamped index equals the current spread,
      // because the category change means the visual content has changed.
      goToSpread(firstProject, { force: true, fromSpread: visualSpreadRef.current })
    }
  }, [activeCategory, spreads, goToSpread])

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

  // For category turns, the "from" spread may not be in the new spreads array
  const fromSpreadForTurn = turn?.fromSpread ?? (turnSpreads?.from ?? null)
  const toSpreadForTurn = turnSpreads?.to ?? null

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
  const turningFront = toSpreadForTurn
  const turningBack = fromSpreadForTurn

  return (
    <section id="notebook-section" className="notebook-section" data-snap-section>
      <div className="notebook-frame">
        <div className="notebook-shell">
          <div className="notebook-page-stack left" aria-hidden="true" />
          <div className="notebook-page-stack right" aria-hidden="true" />
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

            {/* Corner navigation arrows - positioned on the white leaf */}
            <button
              type="button"
              className="corner-zone left"
              onClick={() => goToSpread(safeSpread - 1)}
              aria-label={previousLabel}
              disabled={safeSpread === 0 || Boolean(turn)}
              aria-hidden={safeSpread === 0 || Boolean(turn)}
            />
            <button
              type="button"
              className="corner-zone right"
              onClick={() => goToSpread(safeSpread + 1)}
              aria-label={nextLabel}
              disabled={safeSpread >= totalSpreads - 1 || Boolean(turn)}
              aria-hidden={safeSpread >= totalSpreads - 1 || Boolean(turn)}
            />
          </div>
        </div>

        <nav className="page-tabs" aria-label={sectionsLabel}>
          {sections.map((section) => (
            <NotebookTab
              key={section.id}
              side="left"
              icon={section.id}
              label={section.label}
              active={section.id === effectiveSection}
              accent={section.accent}
              onSelect={() => handleMarkerClick(section.id)}
            />
          ))}
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
