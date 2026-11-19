import React from 'react'
import { LinkIcon } from '../LinkIcon/LinkIcon'
import styles from './ProjectButton.module.css'

/**
 * ProjectButton
 *
 * Renders the "VER REPOSITÓRIO" action button with configurable icon, text, and link.
 * Uses the unified notebook action button styling.
 *
 * @param {Object} props
 * @param {'github'|'external'|'linkedin'|'email'} props.icon - Icon name (required)
 * @param {string} props.text - Button text, e.g., "Ver Repositório" (required)
 * @param {string} props.link - URL or mailto: link (required)
 */
export default function ProjectButton({ icon, text, link }) {
  const isMailto = link?.startsWith('mailto:')

  return (
    <a
      href={link}
      className={`${styles.repoBtn} page-action ${icon}`}
      aria-label={text}
      {...(isMailto ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
    >
      <LinkIcon name={icon} />
      <span>{text}</span>
    </a>
  )
}