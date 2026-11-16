/**
 * ProjectRightPage Component
 *
 * Displays the right page of a project with demo showcase (video/image thumbnail),
 * Play button overlay, and EXPLICIT DEPLOY LINK prominently displayed.
 *
 * @param {Object} props - Component props
 * @param {string} props.thumbnailUrl - URL to project demo video or image
 * @param {string} props.deployUrl - URL to deployed/production version of project
 * @param {string} props.projectTitle - Project title for caption
 * @param {boolean} props.showVideoControls - Whether to show video thumbnail controls
 */
import React from 'react'

const ProjectRightPage = ({ thumbnailUrl, deployUrl, projectTitle, showVideoControls = true }) => {
  return (
    <div className="project-right-page">
      {/* EXPLICIT DEPLOY LINK - Prominently displayed in top-right area */}
      <a
        href={deployUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="deploy-link prominent-deploy-btn"
        aria-label={`Deploy link for ${projectTitle}`}
      >
        <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 19H5V5h14v14zm-7-3c-.76 0-1.38.62-1.38 1.38S11.94 20 12.63 20h.74c.76 0 1.38-.62 1.38-1.38s-.62-1.38-1.38-1.38zm-5.49-6.5c1.6-3.1 5.07-3.1 6.67 0 .5.9.16 2.05-.75 2.45S12.06 12.08 12 11s-.47-2.06-1.4-2.46c-.93-.4-1.27-1.55-.75-2.45z" />
        </svg>
        <span className="deploy-link-text">Ver deploy / View deployment →</span>
      </a>

      {/* Demo Showcase Thumbnail */}
      <section className="demo-showcase-section">
        {thumbnailUrl ? (
          /* Video or Image Thumbnail */
          <>
            <div className="thumbnail-container">
              {thumbnailUrl.endsWith('.mp4') || thumbnailUrl.includes('video') || thumbnailUrl.includes('.mp4') ? (
                /* Video Thumbnail Placeholder */
                <video
                  src={thumbnailUrl}
                  poster=""
                  controls
                  className="project-thumbnail"
                  loop
                  muted
                />
              ) : (
                /* Image Thumbnail */
                <img
                  src={thumbnailUrl}
                  alt={`${projectTitle || 'Project'} demo`}
                  className="project-thumbnail"
                />
              )}

              {/* Play Button Overlay (if applicable) */}
              {showVideoControls && thumbnailUrl.includes('image') && (
                <div className="play-overlay">
                  <svg className="play-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span className="play-text">Ver demo</span>
                </div>
              )}
            </div>

            {/* Caption */}
            {projectTitle && (
              <p className="thumbnail-caption">{projectTitle}</p>
            )}
          </>
        ) : (
          /* Empty/No Thumbnail State */
          <div className="no-thumbnail-placeholder">
            <p>Nenhum thumbnail disponível / No thumbnail available</p>
          </div>
        )}
      </section>

      {/* Additional Project Info (optional) */}
      <section className="additional-info-section">
        <span className="info-label">Demo Preview:</span>
        <span className="info-value">{projectTitle || 'Project demo showcase'}</span>
      </section>
    </div>
  )
}

export default ProjectRightPage
