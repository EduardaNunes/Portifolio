/**
 * AboutMePage Component
 *
 * Displays the About Me ("Sobre Mim" / "About Me") section with skills,
 * soft skills, and professional results in a combined layout.
 *
 * @param {Object} props - Component props
 * @param {Array} props.skills - Array of frontend development skill objects
 * @param {Array} props.softSkills - Array of soft skill objects
 * @param {Array} props.results - Array of professional achievements/results
 */
import React from 'react'

const AboutMePage = ({ skills, softSkills, results }) => {
  return (
    <div className="about-me-page">
      <h2>Sobre Mim / About Me</h2>

      {/* Skills Section */}
      <section className="skills-section">
        <h3>Habilidades Técnicas / Technical Skills</h3>
        <ul className="skills-list">
          {skills && skills.map((skill, index) => (
            <li key={index} className="skill-item">
              <span className="skill-name">{skill.name}</span>
              <span className="skill-tags">{skill.tags ? skill.tags.join(', ') : ''}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Soft Skills Section */}
      <section className="soft-skills-section">
        <h3>Habilidades Interpessoais / Soft Skills</h3>
        <ul className="soft-skills-list">
          {softSkills && softSkills.map((skill, index) => (
            <li key={index} className="soft-skill-item">
              <span className="soft-skill-name">{skill.name}</span>
              <span className="soft-skill-desc">{skill.description}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Professional Results Section */}
      <section className="results-section">
        <h3>Resultados Profissionais / Professional Results</h3>
        <ul className="results-list">
          {results && results.map((result, index) => (
            <li key={index} className="result-item">
              <span className="result-title">{result.title}</span>
              <span className="result-desc">{result.description}</span>
              {result.link && (
                <a href={result.link} target="_blank" rel="noopener noreferrer" className="result-link">
                  Ver mais →
                </a>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default AboutMePage
