/**
 * CareerPage Component
 *
 * Displays one leaf of the Career spread. The left leaf holds the current role
 * and professional timeline; the right leaf holds the future goals.
 *
 * @param {Object} props
 * @param {'left'|'right'} [props.side='left']
 */
import React from 'react'

const CareerPage = ({ side = 'left', heading, labels = {}, currentRole, timeline = [], goals = [] }) => {
  if (side === 'right') {
    return (
      <div className="career-page career-page-right pixel-art-container">
        <section className="goals-section pixel-art-entry-list">
          <h3 className="pixel-art-header destaque">{labels.goals}</h3>
          <ul className="goals-list">
            {goals.map((goal, index) => (
              <li key={index} className="goal-item pixel-art-entry">
                <span className="goal-title pixel-art-entry-label">{goal}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    )
  }

  return (
    <div className="career-page career-page-left pixel-art-container">
      <h2 className="pixel-art-header">{heading}</h2>

      <section className="current-role-section pixel-art-entry">
        <p className="role-intro pixel-art-entry-label">{currentRole}</p>
      </section>

      <section className="timeline-section pixel-art-entry-list">
        <h3 className="pixel-art-header destaque">{labels.timeline}</h3>
        <ul className="timeline-list">
          {timeline.map((position, index) => (
            <li key={index} className="timeline-item pixel-art-entry">
              <span className="position-title pixel-art-entry-label">{position.title}</span>
              <span className="position-company pixel-art-entry-value">{position.company}</span>
              <span className="position-duration pixel-art-entry-value">{position.duration}</span>
              <p className="position-desc pixel-art-entry-value">{position.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default CareerPage