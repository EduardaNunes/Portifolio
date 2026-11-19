import React from 'react'
import Thumbnail from '../Thumbnail/Thumbnail'
import { LinkIcon } from '../LinkIcon/LinkIcon'
import { resolveAssetPath } from '../../../utils/assetPath'
import styles from './ProjectDemoBlock.module.css'

export function ProjectDemoBlock({ block, labels }) {
  const videoDemos = block.videoDemos
  const legacyImage = block.images?.[0]
  const legacyImageSrc = legacyImage ? resolveAssetPath(legacyImage.src) : undefined

  // If videoDemos is present and non-empty, render each video demo vertically
  if (videoDemos && videoDemos.length > 0) {
    return (
      <div className={styles.projectDemoBlock}>
        <section className={styles.demoShowcaseSection}>
          {videoDemos.map((demo, index) => (
            <div key={index} className={styles.videoDemoEntry}>
              <Thumbnail
                src={resolveAssetPath(demo.src)}
                alt={demo.alt || demo.caption || 'Project demo'}
                caption={demo.caption}
              />
              {demo.deployLink && (
                <a
                  href={demo.deployLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.projectDeployBtn}
                  aria-label={`${labels.viewDeploy ?? labels.deploy ?? 'Deploy'}: ${demo.caption ?? ''}`}
                >
                  <LinkIcon name="external" />
                  <span>{labels.viewDeploy ?? labels.deploy ?? 'Deploy'}</span>
                </a>
              )}
            </div>
          ))}
        </section>
      </div>
    )
  }

  // Fallback to legacy images[0] + single deployLink
  return (
    <div className={styles.projectDemoBlock}>
      <section className={styles.demoShowcaseSection}>
        {legacyImage ? (
          <>
            <Thumbnail
              src={legacyImageSrc}
              alt={legacyImage.alt || legacyImage.caption || 'Project demo'}
              caption={legacyImage.caption}
              video={legacyImage.video}
            />
          </>
        ) : (
          <div className={styles.noThumbnailPlaceholder}>
            <p>{labels.noThumbnail}</p>
          </div>
        )}
      </section>

      {block.deployLink && (
        <a
          href={block.deployLink}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.projectDeployBtn}
          aria-label={`${labels.viewDeploy ?? labels.deploy ?? 'Deploy'}: ${legacyImage?.caption ?? ''}`}
        >
          <LinkIcon name="external" />
          <span>{labels.viewDeploy ?? labels.deploy ?? 'Deploy'}</span>
        </a>
      )}
    </div>
  )
}