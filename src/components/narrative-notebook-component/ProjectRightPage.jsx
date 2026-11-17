/**
 * ProjectRightPage Component
 *
 * Displays the right page of a project with the demo showcase and an explicit
 * deploy link. Labels are received localized.
 */
import React from 'react'

const ProjectRightPage = ({
  thumbnailUrl,
  deployUrl,
  projectTitle,
  labels = {},
  showVideoControls = true,
}) => {
  const isVideo = Boolean(
    thumbnailUrl && (thumbnailUrl.endsWith('.mp4') || thumbnailUrl.includes('video')),
  )

  return (
    <div className="project-right-page pixel-art-container">
      {deployUrl && (
        <a
          href={deployUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="deploy-link prominent-deploy-btn page-action"
          aria-label={`Deploy link for ${projectTitle}`}
        >
          <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 19H5V5h14v14zm-7-3c-.76 0-1.38.62-1.38 1.38S11.94 20 12.63 20h.74c.76 0 1.38-.62 1.38-1.38s-.62-1.38-1.38-1.38zm-5.49-6.5c1.6-3.1 5.07-3.1 6.67 0 .5.9.16 2.05-.75 2.45S12.06 12.08 12 11s-.47-2.06-1.4-2.46c-.93-.4-1.27-1.55-.75-2.45z" />
          </svg>
          <span className="deploy-link-text">→</span>
        </a>
      )}

      <section className="demo-showcase-section pixel-art-media-frame">
        {thumbnailUrl ? (
          <>
            <div className="thumbnail-container">
              {isVideo ? (
                <video
                  src={thumbnailUrl}
                  controls
                  className="project-thumbnail"
                  loop
                  muted
                />
              ) : (
                <img
                  src={thumbnailUrl}
                  alt={`${projectTitle || 'Project'} demo`}
                  className="project-thumbnail"
                />
              )}

              {showVideoControls && !isVideo && (
                <div className="play-overlay">
                  <svg className="play-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              )}
            </div>

            {projectTitle && <p className="thumbnail-caption">{projectTitle}</p>}
          </>
        ) : (
          <div className="no-thumbnail-placeholder">
            <p>{labels.noThumbnail}</p>
          </div>
        )}
      </section>

      <section className="additional-info-section">
        <div className="page-field">
          <span className="field-label">{labels.demo}</span>
          <span className="field-value">{projectTitle || '—'}</span>
        </div>
      </section>
    </div>
  )
}

export default ProjectRightPage
