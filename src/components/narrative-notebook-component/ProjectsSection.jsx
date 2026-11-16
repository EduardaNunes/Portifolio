/**
 * ProjectsSection Component
 *
 * Right-side category sidebar for the Projects section. It only filters the
 * project list; page rendering lives in the flat page model so the notebook
 * can animate and count every project page (2 per project).
 *
 * @param {Object} props
 * @param {Array} props.categories [{ id, label, count }]
 * @param {string|null} props.activeCategory
 * @param {Function} props.onCategorySelect
 * @param {string} [props.emptyCategoryLabel]
 */
import React from 'react'

const ProjectsSection = ({
  categories = [],
  activeCategory = null,
  onCategorySelect,
  emptyCategoryLabel = 'Nenhum projeto nesta categoria',
}) => {
  const selectedCategory = categories.find((category) => category.id === activeCategory)

  return (
    <aside className="category-tabs" aria-label="Project categories">
      {categories.map((category) => {
        const isSelected = category.id === activeCategory
        return (
          <button
            key={category.id}
            type="button"
            className={`category-tab ${isSelected ? 'current' : ''}`}
            aria-pressed={isSelected}
            onClick={() => onCategorySelect?.(isSelected ? null : category.id)}
          >
            <span className="category-dot" aria-hidden="true" />
            <span className="category-name">{category.label}</span>
            <span className="category-count">{category.count}</span>
          </button>
        )
      })}

      {selectedCategory && selectedCategory.count === 0 && (
        <p className="empty-category-state">{emptyCategoryLabel}</p>
      )}
    </aside>
  )
}

export default ProjectsSection
