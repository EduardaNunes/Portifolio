/**
 * StudiesPage Component
 *
 * Displays the Studies ("Estudos" / "Studies") section with academic/student achievements,
 * educational institutions, courses, and certifications.
 *
 * @param {Object} props - Component props
 * @param {Array} props.education - Array of education/certification objects
 * @param {Array} props.projects - Array of research/academic projects
 */
import React from 'react'

const StudiesPage = ({ education, projects }) => {
  return (
    <div className="studies-page">
      <h2>Estudos / Studies</h2>

      {/* Education Section */}
      <section className="education-section">
        <h3>Formação Acadêmica / Academic Background</h3>
        <ul className="education-list">
          {education && education.map((item, index) => (
            <li key={index} className="education-item">
              <span className="institution">{item.institution}</span>
              <span className="degree">{item.degree}</span>
              <span className="dates">{item.dates}</span>
              {item.description && <p className="description">{item.description}</p>}
            </li>
          ))}
        </ul>
      </section>

      {/* Courses Section */}
      <section className="courses-section">
        <h3>Cursos / Courses</h3>
        <ul className="courses-list">
          {courses && courses.map((course, index) => (
            <li key={index} className="course-item">
              <span className="course-name">{course.name}</span>
              <span className="provider">{course.provider}</span>
              <span className="completion">{course.completion ? 'Concluído' : 'Em andamento'}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Research and Projects */}
      <section className="projects-section">
        <h3>Projetos Acadêmicos / Academic Projects</h3>
        <ul className="academic-projects-list">
          {projects && projects.map((project, index) => (
            <li key={index} className="academic-project-item">
              <span className="project-title">{project.title}</span>
              <span className="project-desc">{project.description}</span>
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                  Ver projeto →
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
