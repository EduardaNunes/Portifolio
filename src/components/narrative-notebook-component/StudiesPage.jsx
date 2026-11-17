/**
 * StudiesPage Component
 *
 * Displays one leaf of the Studies marker. The left leaves hold the academic
 * background; the right leaves hold courses and academic projects. A marker may
 * render several page pairs, so each leaf receives only its own slice. The first
 * left leaf renders the page title; continuation leaves render a running head.
 *
 * @param {Object} props
 * @param {'left'|'right'} [props.side='left']
 * @param {string} [props.heading] Page heading (first left leaf only)
 * @param {string} [props.runningHead] Existing heading reused as continuation label
 */
import React from 'react'

const StudiesPage = ({
  side = 'left',
  heading,
  runningHead,
  labels = {},
  education = [],
  courses = [],
  projects = [],
}) => {
  if (side === 'right') {
    return (
      <div className="studies-page studies-page-right pixel-art-container">
        {runningHead && <p className="page-label">{runningHead}</p>}

        {courses.length > 0 && (
          <section className="courses-section">
            <h3 className="page-label">{labels.courses}</h3>
            <ul className="courses-list page-list">
              {courses.map((course, index) => (
                <li key={index} className="course-item page-list-item">
                  <span
                    className={`page-marker${course.completion ? ' is-done' : ''}`}
                    aria-hidden="true"
                  />
                  <span className="course-body">
                    <span className="course-name">{course.name}</span>
                    <span className="provider">{course.provider}</span>
                  </span>
                  <span className="sr-only">{course.completion ? '✓' : '…'}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {projects.length > 0 && (
          <section className="projects-section">
            <h3 className="page-label">{labels.projects}</h3>
            <ul className="academic-projects-list page-list">
              {projects.map((project, index) => (
                <li key={index} className="academic-project-item page-list-item">
                  <span className="academic-project-body">
                    <span className="academic-project-title">{project.title}</span>
                    <span className="project-desc">{project.description}</span>
                    {project.link && (
                      <span className="page-actions">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link page-action"
                        >
                          →
                        </a>
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    )
  }

  return (
    <div className="studies-page studies-page-left pixel-art-container">
      {heading ? (
        <h2 className="page-title">{heading}</h2>
      ) : (
        runningHead && <p className="page-label">{runningHead}</p>
      )}

      {education.length > 0 && (
        <section className="education-section">
          <h3 className="page-label">{labels.education}</h3>
          <ul className="education-list">
            {education.map((item, index) => (
              <li key={index} className="education-item">
                <div className="page-field">
                  <span className="field-value">{item.institution}</span>
                </div>
                <div className="page-field-pair">
                  <div className="page-field">
                    <span className="field-value">{item.degree}</span>
                  </div>
                  <div className="page-field">
                    <span className="field-value">{item.dates}</span>
                  </div>
                </div>
                {item.description && (
                  <div className="page-note">
                    <p>{item.description}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

export default StudiesPage
