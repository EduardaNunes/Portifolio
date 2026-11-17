import React from 'react'
import BlockRenderer from './blockRenderers'

/** Renders one content section: optional subheader plus its typed blocks. */
export default function NotebookSection({ section, labels = {} }) {
  if (!section || !Array.isArray(section.content) || section.content.length === 0) return null

  return (
    <section className="notebook-content-section">
      {section.subHeader && <h3 className="page-label">{section.subHeader}</h3>}
      {section.content.map((block, index) => (
        <BlockRenderer key={index} block={block} labels={labels} />
      ))}
    </section>
  )
}
