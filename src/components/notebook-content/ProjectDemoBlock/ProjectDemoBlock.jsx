import React from 'react'
import Thumbnail from '../Thumbnail/Thumbnail'
import { resolveAssetPath } from '../../../utils/assetPath'
import styles from './ProjectDemoBlock.module.css'

export function ProjectDemoBlock({ block, labels }) {
  // block is the demo object with videoDemos/images and deployLinks
  const videoDemos = block.videoDemos
  const legacyImage = block.images?.[0]
  const legacyImageSrc = legacyImage ? resolveAssetPath(legacyImage.src) : undefined
  const deployLinks = block.deployLinks ?? []

  // Helper to get deploy info for a demo by index
  const getDeployInfo = (index) => {
    if (deployLinks[index]) {
      return deployLinks[index]
    }
    // Fallback for legacy single deployLink
    if (deployLinks.length === 1 && index === 0) {
      return deployLinks[0]
    }
    return { deployLink: null, deployHoverText: labels.previewOnly ?? 'Apenas Visualização :)', isPreviewOnly: true }
  }

  // If videoDemos is present and non-empty, render each video demo vertically
  if (videoDemos && videoDemos.length > 0) {
    return (
      <div className={styles.projectDemoBlock}>
        <section className={styles.demoShowcaseSection}>
          {videoDemos.map((demo, index) => {
            const deployInfo = getDeployInfo(index)
            return (
              <div key={index} className={styles.videoDemoEntry}>
                <Thumbnail
                  src={resolveAssetPath(demo.src)}
                  alt={demo.alt || demo.caption || 'Project demo'}
                  caption={demo.caption}
                  deployLink={deployInfo.deployLink}
                  deployHoverText={deployInfo.deployHoverText}
                  isPreviewOnly={deployInfo.isPreviewOnly}
                />
              </div>
            )
          })}
        </section>
      </div>
    )
  }

  // Fallback to legacy images[0] + single deployLink
  const deployInfo = getDeployInfo(0)
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
              deployLink={deployInfo.deployLink}
              deployHoverText={deployInfo.deployHoverText}
              isPreviewOnly={deployInfo.isPreviewOnly}
            />
          </>
        ) : (
          <div className={styles.noThumbnailPlaceholder}>
            <p>{labels.noThumbnail}</p>
          </div>
        )}
      </section>
    </div>
  )
}