import React from 'react'
import styles from './EmailBlock.module.css'

export function EmailBlock({ block, labels }) {
  return (
    <div className={styles.emailBlock}>
      <div className={styles.contactEmail}>
        <span className={styles.fieldValue}>{block.email}</span>
      </div>
      <div className={styles.contactActions}>
        <a className={styles.contactBtn} href={`mailto:${block.email}`}>
          {labels.message}
        </a>
      </div>
    </div>
  )
}