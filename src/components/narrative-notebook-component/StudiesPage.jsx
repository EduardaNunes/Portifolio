/**
 * StudiesPage Component
 *
 * Displays one leaf of the Studies spread. The left leaf holds the academic
 * background; the right leaf holds courses and academic projects.
 *
 * @param {Object} props
 * @param {'left'|'right'} [props.side='left']
 */
import React from 'react'

const StudiesPage = ({ side = 'left', heading, labels = {}, education = [], courses = [], projects = [] }) => {
  if (side === 'right') {
    return (
      <div className="studies-page studies-page-right pixel-art-container">
        <section className="courses-section pixel-art-entry-list">
          <h3 className="pixel-art-header">{labels.courses}</h3>
          <ul className="courses-list">
            {courses.map((course, index) => (
              <li key={index} className="course-item pixel-art-entry">
                <span className="course-name pixel-art-entry-label">{course.name}</span>
                <span className="provider pixel-art-entry-value">{course.provider}</span>
                <span className="completion pixel-art-entry-value">{course.completion ? '✓' : '…'}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="projects-section pixel-art-entry-list">
          <h3 className="pixel-art-header">{labels.projects}</h3>
          <ul className="academic-projects-list">
            {projects.map((project, index) => (
              <li key={index} className="academic-project-item pixel-art-entry">
                <span className="project-title pixel-art-entry-label">{project.title}</span>
                <span className="project-desc pixel-art-entry-value">{project.description}</span>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link pixel-art-entry-action">
                    →
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
    <div className="studies-page studies-page-left pixel-art-container">
      <h2 className="pixel-art-header">{heading}</h2>

      <section className="education-section pixel-art-entry-list">
        <h3 className="pixel-art-header">{labels.education}</h3>
        <ul className="education-list">
          {education.map((item, index) => (
            <li key={index} className="education-item pixel-art-entry">
              <span className="institution pixel-art-entry-label">{item.institution}</span>
              <span className="degree pixel-art-entry-value">{item.degree}</span>
              <span className="dates pixel-art-entry-value">{item.dates}</span>
              {item.description && <p className="description pixel-art-entry-value">{item.description}</p>}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default StudiesPage