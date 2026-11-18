import React from 'react'
import { LinkIcon } from './blockRenderers'

/**
 * Thumbnail
 *
 * Renders an image or video thumbnail with optional caption and play overlay.
 * Used by project demos to display media consistently.
 *
 * @param {Object} props
 * @param {string} props.src - Media source path (required)
 * @param {string} props.alt - Alt text for accessibility (required)
 * @param {string} [props.caption] - Optional caption displayed below media
 * @param {boolean} [props.video=false] - Whether media is a video
 */
export default function Thumbnail({ src, alt, caption, video = false }) {
  if (!src) {
    return null
  }

  return (
    <div className="thumbnail-container">
      {video ? (
        <video
          src={src}
          controls
          className="project-thumbnail"
          loop
          muted
          aria-label={alt}
        />
      ) : (
        <>
          <img
            src={src}
            alt={alt}
            className="project-thumbnail"
          />
          <div className="play-overlay" aria-hidden="true">
            <LinkIcon name="external" />
          </div>
        </>
      )}

      {caption && <p className="thumbnail-caption">{caption}</p>}
    </div>
  )
}