/**
 * ProjectLeftPage Component
 *
 * Displays the left page of a project with metadata: title, description,
 * tech stack tags and repository link. Labels are received localized.
 */
import React from 'react'

const ProjectLeftPage = ({
  title,
  description,
  techStack = [],
  repoUrl,
  sourceCodeLink,
  labels = {},
}) => {
  return (
    <div className="project-left-page">
      <h2 className="project-title">{title}</h2>

      <section className="description-section">
        <p className="project-description">{description}</p>
      </section>

      <section className="tech-stack-section">
        <span className="tech-stack-label">{labels.techStack}</span>
        <div className="tech-tags-container">
          {techStack.map((tech, index) => (
            <span key={index} className="tech-tag">{tech}</span>
          ))}
        </div>
      </section>

      <section className="repo-section">
        <a
          href={sourceCodeLink || repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="repo-link-button"
        >
          <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.013-1.416-4.013-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.93 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.926.43.312.833 1.123.833 2.246v3.095c0 .319.193.694.802.576 4.765-1.589 8.199-6.086 8.199-11.388 0-6.627-5.373-12-12-12z" />
          </svg>
          <span>{labels.viewSource}</span>
        </a>
      </section>
    </div>
  )
}

export default ProjectLeftPage
