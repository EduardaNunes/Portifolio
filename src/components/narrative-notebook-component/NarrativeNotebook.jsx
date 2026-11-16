/**
 * NarrativeNotebook Component
 *
 * Renders a centered notebook (about 80vw x 80vh) as an open book: the
 * horizontal track holds one spread per view, and each spread shows two
 * facing leaves (left and right). Navigation happens through the left section
 * markers, the right category tabs (Projects only) or the bottom corner zones.
 *
 * @param {Object} props
 * @param {Array} props.spreads Spread descriptors: { id, section, left, right }
 * @param {Array} props.sections Left marker descriptors: { id, label }
 * @param {Array} props.categories Right category tabs: { id, label, count }
 * @param {string|null} props.activeCategory
 * @param {Function} props.onCategorySelect
 * @param {boolean} props.isOpen
 * @param {Function} [props.onNavigation]
 * @param {string} [props.previousLabel]
 * @param {string} [props.nextLabel]
 * @param {string} [props.emptyCategoryLabel]
 */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import ProjectsSection from './ProjectsSection'

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
  emptyCategoryLabel = 'Nenhum projeto nesta categoria',
}) => {
  const [currentSpread, setCurrentSpread] = useState(0)
  const [direction, setDirection] = useState(null)
  const previousCategory = useRef(activeCategory)
  const totalSpreads = spreads.length
  const safeSpread = totalSpreads === 0 ? 0 : Math.min(currentSpread, totalSpreads - 1)
  const current = spreads[safeSpread]
  const currentSection = current?.section
  const isProjects = currentSection === 'projects'

  const goToSpread = useCallback(
    (index) => {
      if (totalSpreads === 0) return
      const clamped = Math.max(0, Math.min(index, totalSpreads - 1))
      if (clamped === safeSpread) return
      setDirection(clamped > safeSpread ? 'forward' : 'backward')
      setCurrentSpread(clamped)
      onNavigation?.(clamped)
    },
    [safeSpread, totalSpreads, onNavigation],
  )

  useEffect(() => {
    setCurrentSpread((previous) => Math.min(previous, Math.max(0, totalSpreads - 1)))
  }, [totalSpreads])

  useEffect(() => {
    if (previousCategory.current === activeCategory) return
    previousCategory.current = activeCategory
    const firstProject = spreads.findIndex((spread) => spread.section === 'projects')
    if (firstProject >= 0) {
      setDirection('forward')
      setCurrentSpread(firstProject)
    }
  }, [activeCategory, spreads])

  useEffect(() => {
    if (!direction) return undefined
    const timer = window.setTimeout(() => setDirection(null), 420)
    return () => window.clearTimeout(timer)
  }, [direction])

  const handleMarkerClick = (sectionId) => {
    const index = spreads.findIndex((spread) => spread.section === sectionId)
    if (index >= 0) goToSpread(index)
  }

  if (!isOpen) {
    return (
      <section id="notebook-section" className="notebook-section">
        <div className="notebook-frame">
          <div className="notebook-shell is-closed" aria-hidden="true" />
        </div>
      </section>
    )
  }

  return (
    <section id="notebook-section" className="notebook-section">
      <div className="notebook-frame">
        <div className="notebook-shell" data-direction={direction || undefined}>
          <div
            className="notebook-track"
            style={{ transform: `translateX(-${safeSpread * 100}%)` }}
            onTransitionEnd={(event) => {
              if (event.propertyName === 'transform') setDirection(null)
            }}
          >
            {spreads.map((spread, index) => (
              <article
                key={spread.id}
                className="notebook-spread"
                data-active={index === safeSpread ? 'true' : undefined}
                aria-hidden={index === safeSpread ? undefined : 'true'}
              >
                <div className="notebook-leaf left">{spread.left}</div>
                <div className="notebook-leaf right">{spread.right}</div>
              </article>
            ))}
          </div>

          <button
            type="button"
            className="corner-zone left"
            onClick={() => goToSpread(safeSpread - 1)}
            aria-label={previousLabel}
            disabled={safeSpread === 0}
          />
          <button
            type="button"
            className="corner-zone right"
            onClick={() => goToSpread(safeSpread + 1)}
            aria-label={nextLabel}
            disabled={safeSpread >= totalSpreads - 1}
          />
        </div>

        <div className="sidebar-markers">
          {sections.map((section) => {
            const isCurrent = section.id === currentSection
            return (
              <button
                key={section.id}
                type="button"
                className={`sidebar-marker ${isCurrent ? 'current' : ''}`}
                data-tooltip={section.label}
                aria-label={section.label}
                onClick={() => handleMarkerClick(section.id)}
              />
            )
          })}
        </div>

        {isProjects && (
          <ProjectsSection
            categories={categories}
            activeCategory={activeCategory}
            onCategorySelect={onCategorySelect}
            emptyCategoryLabel={emptyCategoryLabel}
          />
        )}
      </div>
    </section>
  )
}

export default NarrativeNotebook
