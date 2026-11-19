import React from 'react'
import styles from './PositionsBlock.module.css'

function formatDates(item, labels) {
  const from = item.fromDate?.trim()
  const to = item.toDate?.trim()
  if (from && to) return `${from} — ${to}`
  if (from) return `${from} — ${labels.currentPosition ?? ''}`.trim()
  return to || ''
}

export function PositionsBlock({ block, labels }) {
  return (
    <ul className={styles.positionsList}>
      {(block.items ?? []).map((item, index) => {
        const dates = formatDates(item, labels)
        return (
          <li key={index} className={styles.positionItem}>
            <div className={styles.positionTitle}>
              <span className={styles.fieldValue}>{item.position}</span>
            </div>

            <div className={styles.positionMeta}>
              <span className={styles.positionCompany}>{item.company}</span>
              {dates && <span className={styles.positionDates}>{dates}</span>}
            </div>

            {item.description && <p className={styles.positionDesc}>{item.description}</p>}
          </li>
        )
      })}
    </ul>
  )
}