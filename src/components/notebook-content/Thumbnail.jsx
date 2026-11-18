import React from 'react'
import { resolveAssetPath, isVideoFile } from '../../utils/assetPath'
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
 * @param {boolean} [props.video] - Whether media is a video; inferred from source when omitted
 */
export default function Thumbnail({ src, alt, caption, video }) {
  if (!src) {
    return null
  }

  const shouldRenderVideo = video ?? isVideoFile(src)
  const resolvedSrc = resolveAssetPath(src)

  return (
    <div className="thumbnail-container">
      {shouldRenderVideo ? (
        <div className="thumbnail-frame">
          <video
            src={resolvedSrc}
            className="thumbnail-media"
            loop
            muted
            playsinline
            aria-label={alt}
          />
        </div>
      ) : (
        <div className="thumbnail-frame">
          <img
            src={resolvedSrc}
            alt={alt}
            className="thumbnail-media"
          />
          <div className="play-overlay" aria-hidden="true">
            <LinkIcon name="external" />
          </div>
        </div>
      )}

      {caption && <p className="thumbnail-caption">{caption}</p>}
    </div>
  )
}