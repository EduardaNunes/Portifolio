/**
 * AboutMePage Component
 *
 * Displays one leaf of the About Me spread. The left leaf holds the heading,
 * technical skills and soft skills; the right leaf holds the professional
 * results. All text is received already localized from the page model.
 *
 * @param {Object} props
 * @param {'left'|'right'} [props.side='left']
 */
import React from 'react'

const AboutMePage = ({
  side = 'left',
  heading,
  labels = {},
  skills = [],
  softSkills = [],
  results = [],
}) => {
  if (side === 'right') {
    return (
      <div className="about-me-page about-me-page-right">
        <section className="results-section">
          <h3>{labels.results}</h3>
          <ul className="results-list">
            {results.map((result, index) => (
              <li key={index} className="result-item">
                <span className="result-title">{result.title}</span>
                <span className="result-desc">{result.description}</span>
                {result.link && (
                  <a href={result.link} target="_blank" rel="noopener noreferrer" className="result-link">
                    {result.title} →
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>
      </div>
    )
  }

  return (
    <div className="about-me-page about-me-page-left">
      <h2>{heading}</h2>

      <section className="skills-section">
        <h3>{labels.skills}</h3>
        <ul className="skills-list">
          {skills.map((skill, index) => (
            <li key={index} className="skill-item">
              <span className="skill-name">{skill.name}</span>
              <span className="skill-tags">{skill.tags ? skill.tags.join(', ') : ''}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="soft-skills-section">
        <h3>{labels.softSkills}</h3>
        <ul className="soft-skills-list">
          {softSkills.map((skill, index) => (
            <li key={index} className="soft-skill-item">
              <span className="soft-skill-name">{skill.name}</span>
              <span className="soft-skill-desc">{skill.description}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default AboutMePage
