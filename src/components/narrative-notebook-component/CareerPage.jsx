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
      <div className="career-page career-page-right">
        <section className="goals-section">
          <h3>{labels.goals}</h3>
          <ul className="goals-list">
            {goals.map((goal, index) => (
              <li key={index} className="goal-item">{goal}</li>
            ))}
          </ul>
        </section>
      </div>
    )
  }

  return (
    <div className="career-page career-page-left">
      <h2>{heading}</h2>

      <section className="current-role-section">
        <p className="role-intro">{currentRole}</p>
      </section>

      <section className="timeline-section">
        <h3>{labels.timeline}</h3>
        <ul className="timeline-list">
          {timeline.map((position, index) => (
            <li key={index} className="timeline-item">
              <span className="position-title">{position.title}</span>
              <span className="position-company">{position.company}</span>
              <span className="position-duration">{position.duration}</span>
              <p className="position-desc">{position.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default CareerPage
