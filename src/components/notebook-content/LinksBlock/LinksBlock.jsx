import React from 'react'
import { LinkIcon } from '../LinkIcon/LinkIcon'
import styles from './LinksBlock.module.css'

export function LinksBlock({ block }) {
  return (
    <ul className={styles.socialLinksSection}>
      {(block.items ?? []).map((item, index) => {
        const isMailto = item.link.startsWith('mailto:')
        return (
          <li key={index} className={styles.socialLinkRow}>
            <span className={styles.socialLinkField}>
              <LinkIcon name={item.icon} />
              <span className={styles.fieldLabel}>{item.name}</span>
            </span>
            <a
              href={item.link}
              className={`${styles.socialLink} ${item.icon}`}
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