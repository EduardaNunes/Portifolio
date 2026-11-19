import React from 'react'
import { resolveAssetPath, isVideoFile } from '../../../utils/assetPath'
import { LinkIcon } from '../LinkIcon/LinkIcon'
import styles from './Thumbnail.module.css'

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
    <div className={styles.container}>
      {shouldRenderVideo ? (
        <div className={styles.frame}>
          <video
            src={resolvedSrc}
            className={styles.media}
            autoPlay
            loop
            muted
            playsinline
            aria-label={alt}
          />
        </div>
      ) : (
        <div className={styles.frame}>
          <img
            src={resolvedSrc}
            alt={alt}
            className={styles.media}
          />
          <div className={styles.playOverlay} aria-hidden="true">
            <LinkIcon name="external" />
          </div>
        </div>
      )}

      {caption && <p className={styles.caption}>{caption}</p>}
    </div>
  )
}