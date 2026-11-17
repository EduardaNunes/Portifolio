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
      <div className="about-me-page about-me-page-right pixel-art-container">
        <section className="results-section pixel-art-entry-list">
          <h3 className="pixel-art-header destaque">{labels.results}</h3>
          <ul className="results-list">
            {results.map((result, index) => (
              <li key={index} className="result-item pixel-art-entry">
                <span className="result-title pixel-art-entry-label">{result.title}</span>
                <span className="result-desc pixel-art-entry-value">{result.description}</span>
                {result.link && (
                  <a href={result.link} target="_blank" rel="noopener noreferrer" className="result-link pixel-art-entry-action">
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
    <div className="about-me-page about-me-page-left pixel-art-container">
      <h2 className="pixel-art-header">{heading}</h2>

      <section className="skills-section pixel-art-entry-list">
        <h3 className="pixel-art-header destaque">{labels.skills}</h3>
        <ul className="skills-list">
          {skills.map((skill, index) => (
            <li key={index} className="skill-item pixel-art-entry">
              <span className="skill-name pixel-art-entry-label">{skill.name}</span>
              <span className="skill-tags pixel-art-entry-value">{skill.tags ? skill.tags.join(', ') : ''}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="soft-skills-section pixel-art-entry-list">
        <h3 className="pixel-art-header destaque">{labels.softSkills}</h3>
        <ul className="soft-skill-list">
          {softSkills.map((skill, index) => (
            <li key={index} className="soft-skill-item pixel-art-entry">
              <span className="soft-skill-name pixel-art-entry-label">{skill.name}</span>
              <span className="soft-skill-desc pixel-art-entry-value">{skill.description}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default AboutMePage