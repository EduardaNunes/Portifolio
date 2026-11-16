/**
 * CareerPage Component
 *
 * Displays the Career section with professional trajectory, current role focus
 * and career goals. All text is received already localized.
 */
import React from 'react'

const CareerPage = ({ heading, labels = {}, currentRole, timeline = [], goals = [] }) => {
  return (
    <div className="career-page">
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

export default CareerPage
