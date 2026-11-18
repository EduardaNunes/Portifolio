import React from 'react'
import Thumbnail from './Thumbnail'
import ProjectButton from './ProjectButton'
import { resolveAssetPath } from '../../utils/assetPath'

const LINK_ICON_PATHS = {
  linkedin: [
    'M20.447 20.452h-3.554v-5.561c0-1.428-.92-2.357-2.388-2.357-1.456 0-2.457.931-2.457 2.36v5.557h-3.554v-11h3.554V9.733c0-.448.198-.711.542-.884 1.664-.83 3.06-.245 3.06 1.205v1.431h3.554z',
  ],
  github: [
    'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.013-1.416-4.013-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.93 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.926.43.312.833 1.123.833 2.246v3.095c0 .319.193.694.802.576 4.765-1.589 8.199-6.086 8.199-11.388 0-6.627-5.373-12-12-12z',
  ],
  email: [
    'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
  ],
  external: [
    'M19 19H5V5h14v14zm-7-3c-.76 0-1.38.62-1.38 1.38S11.94 20 12.63 20h.74c.76 0 1.38-.62 1.38-1.38s-.62-1.38-1.38-1.38zm-5.49-6.5c1.6-3.1 5.07-3.1 6.67 0 .5.9.16 2.05-.75 2.45S12.06 12.08 12 11s-.47-2.06-1.4-2.46c-.93-.4-1.27-1.55-.75-2.45z',
  ],
}

export function LinkIcon({ name }) {
  const paths = LINK_ICON_PATHS[name] ?? LINK_ICON_PATHS.external
  return (
    <svg className="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      {paths.map((path) => (
        <path key={path} d={path} />
      ))}
    </svg>
  )
}

export function BlocksBlock({ block }) {
  return (
    <div className="page-field">
      <span className="field-label">{block.name}</span>
      <span className="field-value">
        {(block.items ?? []).map((item, index) => (
          <span key={index} className="page-chip">
            {item}
          </span>
        ))}
      </span>
    </div>
  )
}

export function TextBlock({ block }) {
  return (
    <div className="page-note">
      {block.title && <span className="note-title">{block.title}</span>}
      <p>{block.text}</p>
      {block.link && (
        <div className="page-actions">
          <a
            href={block.link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="page-action"
          >
            {block.link.label}
          </a>
        </div>
      )}
    </div>
  )
}

function formatDates(item, labels) {
  const from = item.fromDate?.trim()
  const to = item.toDate?.trim()
  if (from && to) return `${from} — ${to}`
  if (from) return `${from} — ${labels.currentPosition ?? ''}`.trim()
  return to || ''
}

export function PositionsBlock({ block, labels }) {
  return (
    <ul className="positions-list page-list">
      {(block.items ?? []).map((item, index) => {
        const dates = formatDates(item, labels)
        return (
          <li key={index} className="position-item">
            <div className="position-title">
              <span className="field-value">{item.position}</span>
            </div>

            <div className="position-meta">
              <span className="position-company">{item.company}</span>
              {dates && <span className="position-dates">{dates}</span>}
            </div>

            {item.description && <p className="position-desc">{item.description}</p>}
          </li>
        )
      })}
    </ul>
  )
}

export function EmailBlock({ block, labels }) {
  return (
    <div className="email-block">
      <div className="page-field contact-email">
        <span className="field-value">{block.email}</span>
      </div>
      <div className="contact-actions page-actions">
        <a className="contact-btn page-action" href={`mailto:${block.email}`}>
          {labels.message}
        </a>
      </div>
    </div>
  )
}

export function LinksBlock({ block }) {
  return (
    <ul className="social-links-section page-list">
      {(block.items ?? []).map((item, index) => {
        const isMailto = item.link.startsWith('mailto:')
        return (
          <li key={index} className="social-link-row page-list-item">
            <span className="social-link-field page-field">
              <LinkIcon name={item.icon} />
              <span className="field-label">{item.name}</span>
            </span>
            <a
              href={item.link}
              className={`social-link ${item.icon} page-action`}
              aria-label={item.name}
              {...(isMailto ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
            >
              <span aria-hidden="true">→</span>
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export function ProjectRepoBlock({ block, labels }) {
  const item = block.items?.[0]
  if (!item) return null

  return (
    <ProjectButton
      icon={item.icon}
      text={item.name}
      link={item.link}
    />
  )
}

export function ListBlock({ block }) {
  return (
    <ul className="page-list">
      {(block.items ?? []).map((item, index) => {
        const entry = typeof item === 'string' ? { text: item } : item
        const isChecklist = typeof item === 'object' && item.done !== undefined
        return (
          <li key={index} className="page-list-item">
            <span className={`page-marker${entry.done ? ' is-done' : ''}`} aria-hidden="true" />
            <span className="list-body">
              <span>{entry.text}</span>
              {entry.detail && <span className="list-detail">{entry.detail}</span>}
            </span>
            {isChecklist && <span className="sr-only">{entry.done ? '✓' : '…'}</span>}
          </li>
        )
      })}
    </ul>
  )
}

export function ProjectDemoBlock({ block, labels }) {
  const image = block.images?.[0]
  const imageSrc = image ? resolveAssetPath(image.src) : undefined

  return (
    <div className="project-demo-block">
      <section className="demo-showcase-section pixel-art-media-frame">
        {image ? (
          <>
            <Thumbnail
              src={imageSrc}
              alt={image.alt || image.caption || 'Project demo'}
              caption={image.caption}
              video={image.video}
            />
          </>
        ) : (
          <div className="no-thumbnail-placeholder">
            <p>{labels.noThumbnail}</p>
          </div>
        )}
      </section>

      {block.deployLink && (
        <a
          href={block.deployLink}
          target="_blank"
          rel="noopener noreferrer"
          className="project-deploy-btn page-action"
          aria-label={`${labels.viewDeploy ?? labels.deploy ?? 'Deploy'}: ${image?.caption ?? ''}`}
        >
          <LinkIcon name="external" />
          <span>{labels.viewDeploy ?? labels.deploy ?? 'Deploy'}</span>
        </a>
      )}
    </div>
  )
}

const RENDERERS = {
  blocks: BlocksBlock,
  text: TextBlock,
  positions: PositionsBlock,
  email: EmailBlock,
  links: LinksBlock,
  list: ListBlock,
  projectDemo: ProjectDemoBlock,
  projectRepo: ProjectRepoBlock,
}

/** Draws a typed content block with the shared paper-page vocabulary. */
export default function BlockRenderer({ block, labels = {} }) {
  const Renderer = RENDERERS[block?.type]
  if (!Renderer) return null
  return <Renderer block={block} labels={labels} variant={block.variant} />
}
