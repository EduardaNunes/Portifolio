import React from 'react'
import { LinkIcon } from './LinkIcon/LinkIcon'
import { BlocksBlock } from './BlocksBlock/BlocksBlock'
import { TextBlock } from './TextBlock/TextBlock'
import { PositionsBlock } from './PositionsBlock/PositionsBlock'
import { EmailBlock } from './EmailBlock/EmailBlock'
import { LinksBlock } from './LinksBlock/LinksBlock'
import { ListBlock } from './ListBlock/ListBlock'
import { ProjectDemoBlock } from './ProjectDemoBlock/ProjectDemoBlock'
import { ProjectRepoBlock } from './ProjectRepoBlock/ProjectRepoBlock'

// Re-export all block components for backward compatibility
export {
  LinkIcon,
  BlocksBlock,
  TextBlock,
  PositionsBlock,
  EmailBlock,
  LinksBlock,
  ListBlock,
  ProjectDemoBlock,
  ProjectRepoBlock,
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