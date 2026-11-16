/**
 * ProjectsSection Component
 *
 * Right-side category sidebar for the Projects section. Categories use the same
 * mirrored `NotebookTab` as the left section markers; the active category stays
 * visible and expanded. It only filters the project list; page rendering lives
 * in the spread model.
 *
 * @param {Object} props
 * @param {Array} props.categories [{ id, label, icon, accent, count }]
 * @param {string|null} props.activeCategory
 * @param {Function} props.onCategorySelect
 * @param {string} [props.emptyCategoryLabel]
 */
import React from 'react'
import NotebookTab from './NotebookTab'

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
          <NotebookTab
            key={category.id}
            side="right"
            icon={category.icon ?? 'projects'}
            label={category.label}
            active={isSelected}
            accent={category.accent}
            onSelect={() => onCategorySelect?.(isSelected ? null : category.id)}
          />
        )
      })}

      {selectedCategory && selectedCategory.count === 0 && (
        <p className="empty-category-state">{emptyCategoryLabel}</p>
      )}
    </aside>
  )
}

export default ProjectsSection
