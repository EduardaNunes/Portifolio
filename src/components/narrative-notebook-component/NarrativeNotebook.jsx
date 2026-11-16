/**
 * NarrativeNotebook Component
 *
 * Renders a centered notebook (about 80vw x 80vh) with a horizontal track of
 * pages. Each page is a snap point; navigation happens through the left
 * section markers, the right category tabs (Projects only) or the bottom
 * corner zones.
 *
 * @param {Object} props
 * @param {Array} props.pages Flat page descriptors: { id, section, element }
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
  pages = [],
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
  const [currentPage, setCurrentPage] = useState(0)
  const [direction, setDirection] = useState(null)
  const previousCategory = useRef(activeCategory)
  const totalPages = pages.length
  const safePage = totalPages === 0 ? 0 : Math.min(currentPage, totalPages - 1)
  const current = pages[safePage]
  const currentSection = current?.section
  const isProjects = currentSection === 'projects'

  const goToPage = useCallback(
    (index) => {
      if (totalPages === 0) return
      const clamped = Math.max(0, Math.min(index, totalPages - 1))
      if (clamped === safePage) return
      setDirection(clamped > safePage ? 'forward' : 'backward')
      setCurrentPage(clamped)
      onNavigation?.(clamped)
    },
    [safePage, totalPages, onNavigation],
  )

  useEffect(() => {
    setCurrentPage((previous) => Math.min(previous, Math.max(0, totalPages - 1)))
  }, [totalPages])

  useEffect(() => {
    if (previousCategory.current === activeCategory) return
    previousCategory.current = activeCategory
    const firstProject = pages.findIndex((page) => page.section === 'projects')
    if (firstProject >= 0) {
      setDirection('forward')
      setCurrentPage(firstProject)
    }
  }, [activeCategory, pages])

  useEffect(() => {
    if (!direction) return undefined
    const timer = window.setTimeout(() => setDirection(null), 420)
    return () => window.clearTimeout(timer)
  }, [direction])

  const handleMarkerClick = (sectionId) => {
    const index = pages.findIndex((page) => page.section === sectionId)
    if (index >= 0) goToPage(index)
  }

  if (!isOpen) {    return (
      <section id="notebook-section" className="notebook-section">
        <div className="notebook-shell is-closed" aria-hidden="true" />
      </section>
    )
  }

  return (
    <section id="notebook-section" className="notebook-section">
      <div className="notebook-shell" data-direction={direction || undefined}>
        <div
          className="notebook-track"
          style={{ transform: `translateX(-${safePage * 100}%)` }}
          onTransitionEnd={(event) => {
            if (event.propertyName === 'transform') setDirection(null)
          }}
        >
          {pages.map((page, index) => (
            <div
              key={page.id}
              className="notebook-page"
              data-active={index === safePage ? 'true' : undefined}
              aria-hidden={index === safePage ? undefined : 'true'}
            >
              {page.element}
            </div>
          ))}
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

        <button
          type="button"
          className="corner-zone left"
          onClick={() => goToPage(safePage - 1)}
          aria-label={previousLabel}
          disabled={safePage === 0}
        />
        <button
          type="button"
          className="corner-zone right"
          onClick={() => goToPage(safePage + 1)}
          aria-label={nextLabel}
          disabled={safePage >= totalPages - 1}
        />
      </div>
    </section>
  )
}

export default NarrativeNotebook
