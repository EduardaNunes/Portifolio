import React from 'react'
import ProjectButton from '../ProjectButton/ProjectButton'

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