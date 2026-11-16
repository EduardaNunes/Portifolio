/**
 * StudiesPage Component
 *
 * Displays the Studies section with academic background, courses and academic
 * projects. All text is received already localized.
 */
import React from 'react'

const StudiesPage = ({ heading, labels = {}, education = [], courses = [], projects = [] }) => {
  return (
    <div className="studies-page">
      <h2>{heading}</h2>

      <section className="education-section">
        <h3>{labels.education}</h3>
        <ul className="education-list">
          {education.map((item, index) => (
            <li key={index} className="education-item">
              <span className="institution">{item.institution}</span>
              <span className="degree">{item.degree}</span>
              <span className="dates">{item.dates}</span>
              {item.description && <p className="description">{item.description}</p>}
            </li>
          ))}
        </ul>
      </section>

      <section className="courses-section">
        <h3>{labels.courses}</h3>
        <ul className="courses-list">
          {courses.map((course, index) => (
            <li key={index} className="course-item">
              <span className="course-name">{course.name}</span>
              <span className="provider">{course.provider}</span>
              <span className="completion">{course.completion ? '✓' : '…'}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="projects-section">
        <h3>{labels.projects}</h3>
        <ul className="academic-projects-list">
          {projects.map((project, index) => (
            <li key={index} className="academic-project-item">
              <span className="project-title">{project.title}</span>
              <span className="project-desc">{project.description}</span>
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
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

export default StudiesPage
