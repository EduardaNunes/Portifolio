import React from 'react'
import styles from './ListBlock.module.css'

export function ListBlock({ block }) {
  return (
    <ul className={styles.pageList}>
      {(block.items ?? []).map((item, index) => {
        const entry = typeof item === 'string' ? { text: item } : item
        const isChecklist = typeof item === 'object' && item.done !== undefined
        return (
          <li key={index} className={styles.pageListItem}>
            <span className={`${styles.pageMarker}${entry.done ? ` ${styles.isDone}` : ''}`} aria-hidden="true" />
            <span className={styles.listBody}>
              <span>{entry.text}</span>
              {entry.detail && <span className={styles.listDetail}>{entry.detail}</span>}
            </span>
            {isChecklist && <span className="sr-only">{entry.done ? '✓' : '…'}</span>}
          </li>
        )
      })}
    </ul>
  )
}