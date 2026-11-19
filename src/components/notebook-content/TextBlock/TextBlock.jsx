import React from 'react'
import styles from './TextBlock.module.css'

export function TextBlock({ block }) {
  return (
    <div className={styles.pageNote}>
      {block.title && <span className={styles.noteTitle}>{block.title}</span>}
      <p>{block.text}</p>
      {block.link && (
        <div className={styles.pageActions}>
          <a
            href={block.link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.pageAction}
          >
            {block.link.label}
          </a>
        </div>
      )}
    </div>
  )
}