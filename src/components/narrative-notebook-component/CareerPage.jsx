/**
 * CareerPage Component
 *
 * Displays one leaf of the Career marker. The left leaves hold the current role
 * and professional timeline; the right leaf holds the future goals. A marker may
 * render several page pairs, so each leaf receives only its own slice. The first
 * leaf of a side renders the page title; a continuation leaf renders a running
 * head built from the existing localized heading.
 *
 * @param {Object} props
 * @param {'left'|'right'} [props.side='left']
 * @param {string} [props.heading] Page heading (first leaf only)
 * @param {string} [props.runningHead] Existing heading reused as continuation label
 */
import React from 'react'

const CareerPage = ({
  side = 'left',
  heading,
  runningHead,
  labels = {},
  currentRole,
  timeline = [],
  goals = [],
}) => {
  if (side === 'right') {
    return (
      <div className="career-page career-page-right pixel-art-container">
        {runningHead ? (
          <p className="page-label">{runningHead}</p>
        ) : (
          <h2 className="page-title">{labels.goals}</h2>
        )}

        {goals.length > 0 && (
          <section className="goals-section">
            <ul className="goals-list page-list">
              {goals.map((goal, index) => (
                <li key={index} className="goal-item page-list-item">
                  <span className="page-marker" aria-hidden="true" />
                  <span className="goal-title">{goal}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    )
  }

  return (
    <div className="career-page career-page-left pixel-art-container">
      {heading ? (
        <h2 className="page-title">{heading}</h2>
      ) : (
        runningHead && <p className="page-label">{runningHead}</p>
      )}

      {currentRole && (
        <section className="current-role-section">
          <div className="page-note">
            <p className="role-intro">{currentRole}</p>
          </div>
        </section>
      )}

      {timeline.length > 0 && (
        <section className="timeline-section">
          <h3 className="page-label">{labels.timeline}</h3>
          <ul className="timeline-list">
            {timeline.map((position, index) => (
              <li key={index} className="timeline-item">
                <div className="page-field timeline-title">
                  <span className="field-value">{position.title}</span>
                </div>
                <div className="page-field-pair">
                  <div className="page-field">
                    <span className="field-value">{position.company}</span>
                  </div>
                  <div className="page-field">
                    <span className="field-value">{position.duration}</span>
                  </div>
                </div>
                <p className="position-desc">{position.description}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

export default CareerPage
