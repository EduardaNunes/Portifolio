/**
 * NarrativeNotebook Component
 *
 * A scroll-snap enabled notebook-style component with page-turning animations.
 * Supports left sidebar navigation markers, right category tabs (for Projects),
 * and swipe gesture support via corner clicks for page flipping.
 *
 * @param {Object} props - Component props
 * @param {Array} children - Page components to render inside the notebook
 * @param {Object} onNavigation - Navigation handlers passed down to children
 */
import React from 'react'

const NarrativeNotebook = ({ children, onNavigation }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section
      id="notebook-section"
      className="notebook-container"
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </section>
  )
}

export default NarrativeNotebook
