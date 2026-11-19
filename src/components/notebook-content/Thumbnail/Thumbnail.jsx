import React from 'react'
import { resolveAssetPath, isVideoFile } from '../../../utils/assetPath'
import { LinkIcon } from '../LinkIcon/LinkIcon'
import styles from './Thumbnail.module.css'

/**
 * Thumbnail
 *
 * Renders an image or video thumbnail with optional caption and play overlay.
 * Used by project demos to display media consistently.
 * When deployLink is provided, the thumbnail becomes a clickable link with hover overlay.
 *
 * @param {Object} props
 * @param {string} props.src - Media source path (required)
 * @param {string} props.alt - Alt text for accessibility (required)
 * @param {string} [props.caption] - Optional caption displayed below media
 * @param {boolean} [props.video] - Whether media is a video; inferred from source when omitted
 * @param {string} [props.deployLink] - Optional deploy URL; makes thumbnail clickable
 * @param {string} [props.deployHoverText] - Text to show in hover overlay
 * @param {boolean} [props.isPreviewOnly] - True when no deploy link available
 */
export default function Thumbnail({ src, alt, caption, video, deployLink, deployHoverText, isPreviewOnly }) {
  if (!src) {
    return null
  }

  const shouldRenderVideo = video ?? isVideoFile(src)
  const resolvedSrc = resolveAssetPath(src)
  const hasDeployLink = !!deployLink

  // Determine hover text - deployHoverText already contains correct i18n translation
  const hoverText = deployHoverText ?? (isPreviewOnly ? 'Preview Only :)' : 'Ver Deploy')

  const frameContent = shouldRenderVideo ? (
    <video
      src={resolvedSrc}
      className={styles.media}
      autoPlay
      loop
      muted
      playsInline
      aria-label={alt}
    />
  ) : (
    <>
      <img
        src={resolvedSrc}
        alt={alt}
        className={styles.media}
      />
      {/* Keep existing play overlay for images without deploy link */}
      {!hasDeployLink && (
        <div className={styles.playOverlay} aria-hidden="true">
          <LinkIcon name="external" />
        </div>
      )}
    </>
  )

  const renderFrame = () => (
    <div className={styles.frame}>
      {frameContent}
      {/* Hover overlay for deploy/preview - text only, no icon */}
      {(hasDeployLink || isPreviewOnly) && (
        <div className={styles.hoverOverlay} aria-hidden="true">
          <span className={styles.hoverText}>{hoverText}</span>
        </div>
      )}
    </div>
  )

  // Build clickableFrame class with modifier for deploy link
  const clickableFrameClass = hasDeployLink
    ? `${styles.clickableFrame} ${styles.hasDeployLink}`
    : styles.clickableFrame

  return (
    <div className={styles.container}>
      {hasDeployLink ? (
        <a
          href={deployLink}
          target="_blank"
          rel="noopener noreferrer"
          className={clickableFrameClass}
          aria-label={hoverText}
        >
          {renderFrame()}
        </a>
      ) : (
        <div className={clickableFrameClass}>
          {renderFrame()}
        </div>
      )}

      {caption && <p className={styles.caption}>{caption}</p>}
    </div>
  )
}