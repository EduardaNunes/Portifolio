import React from 'react'
import styles from './BlocksBlock.module.css'

export function BlocksBlock({ block }) {
  return (
    <div className={styles.pageField}>
      <span className={styles.fieldLabel}>{block.name}</span>
      <span className={styles.fieldValue}>
        {(block.items ?? []).map((item, index) => (
          <span key={index} className={styles.pageChip}>
            {item}
          </span>
        ))}
      </span>
    </div>
  )
}