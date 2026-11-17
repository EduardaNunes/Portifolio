/**
 * AboutMePage Component
 *
 * Displays one leaf of the About Me marker. The left leaves hold technical
 * skills and soft skills; the right leaves hold professional results. A marker
 * may render several page pairs, so each leaf receives only its own slice.
 * The first leaf of a side renders the page title; a continuation leaf renders
 * a running head built from the existing localized heading.
 *
 * @param {Object} props
 * @param {'left'|'right'} [props.side='left']
 * @param {string} [props.heading] Page heading (first leaf only)
 * @param {string} [props.runningHead] Existing heading reused as continuation label
 */
import React from 'react'

const AboutMePage = ({
  side = 'left',
  heading,
  runningHead,
  labels = {},
  skills = [],
  softSkills = [],
  results = [],
}) => {
  if (side === 'right') {
    return (
      <div className="about-me-page about-me-page-right pixel-art-container">
        {runningHead ? (
          <p className="page-label">{runningHead}</p>
        ) : (
          <h2 className="page-title">{labels.results}</h2>
        )}

        {results.length > 0 && (
          <section className="results-section">
            <ul className="results-list">
              {results.map((result, index) => (
                <li key={index} className="result-item">
                  <div className="page-note">
                    <span className="note-title">{result.title}</span>
                    <p>{result.description}</p>
                    {result.link && (
                      <div className="page-actions">
                        <a
                          href={result.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="result-link page-action"
                        >
                          {result.title} →
                        </a>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    )
  }

  return (
    <div className="about-me-page about-me-page-left pixel-art-container">
      {heading ? (
        <h2 className="page-title">{heading}</h2>
      ) : (
        runningHead && <p className="page-label">{runningHead}</p>
      )}

      {skills.length > 0 && (
        <section className="skills-section">
          <h3 className="page-label">{labels.skills}</h3>
          <ul className="skills-list">
            {skills.map((skill, index) => (
              <li key={index} className="skill-item page-field">
                <span className="skill-name field-label">{skill.name}</span>
                <span className="skill-tags field-value">
                  {(skill.tags || []).map((tag, tagIndex) => (
                    <span key={tagIndex} className="page-chip">
                      {tag}
                    </span>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {softSkills.length > 0 && (
        <section className="soft-skills-section">
          <h3 className="page-label">{labels.softSkills}</h3>
          <ul className="soft-skill-list">
            {softSkills.map((skill, index) => (
              <li key={index} className="soft-skill-item page-field">
                <span className="soft-skill-name field-label">{skill.name}</span>
                <span className="soft-skill-desc field-value">{skill.description}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

export default AboutMePage
