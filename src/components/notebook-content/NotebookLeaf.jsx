import React from 'react'
import NotebookSection from './NotebookSection'

/**
 * Renders one fixed notebook leaf.
 *
 * Every populated narrative leaf receives its marker label as `title`.
 * Blank leaves receive no title prop. Sections arrive already sliced by the
 * layout module, so this component never measures or paginates.
 */
export default function NotebookLeaf({ title, sections = [], labels = {} }) {
  return (
    <div className="notebook-content-leaf pixel-art-container">
      {title && <h2 className="page-title">{title}</h2>}

      {sections.map((section) => (
        <NotebookSection key={section.id} section={section} labels={labels} />
      ))}
    </div>
  )
}
