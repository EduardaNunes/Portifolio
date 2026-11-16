/**
 * CareerPage Component
 *
 * Displays the Career ("Carreira" / "Career") section with professional trajectory,
 * current role focus, and career goals.
 *
 * @param {Object} props - Component props
 * @param {Array} props.timeline - Array of career position objects with title,
 *   company, duration, and description
 * @param {string} props.currentRole - Current job title/intro
 */
import React from 'react'

const CareerPage = ({ timeline, currentRole }) => {
  return (
    <div className="career-page">
      <h2>Carreira / Career</h2>

      {/* Current Role Introduction */}
      <section className="current-role-section">
        <p className="role-intro">{currentRole}</p>
      </section>

      {/* Experience Timeline */}
      <section className="timeline-section">
        <h3>Trajetória Profissional / Professional Timeline</h3>
        <ul className="timeline-list">
          {timeline && timeline.map((position, index) => (
            <li key={index} className="timeline-item">
              <span className="position-title">{position.title}</span>
              <span className="position-company">{position.company}</span>
              <span className="position-duration">{position.duration}</span>
              <p className="position-desc">{position.description}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Future Goals */}
      <section className="goals-section">
        <h3>Objetivos Futuros / Future Goals</h3>
        <ul className="goals-list">
          {goals && goals.map((goal, index) => (
            <li key={index} className="goal-item">{goal}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default CareerPage
