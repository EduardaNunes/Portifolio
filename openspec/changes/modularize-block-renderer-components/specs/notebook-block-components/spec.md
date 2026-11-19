# Spec Delta

## Purpose

Provides modular, self-contained block components for rendering notebook content blocks. Each block component owns its markup, logic, and styling, enabling independent development, testing, and maintenance of notebook content types.

## ADDED Requirements

### Requirement: Block components are independently importable
Each block component SHALL be available as a named export from its own file under `src/components/notebook-content/blocks/` and SHALL be re-exported from `blockRenderers.jsx` for backward compatibility.

#### Scenario: Import individual block component
- **WHEN** importing `BlocksBlock` from `'../components/notebook-content/blocks/BlocksBlock'`
- **THEN** the component is available and renders correctly

#### Scenario: Backward compatible imports from blockRenderers
- **WHEN** importing `{ BlocksBlock }` from `'../components/notebook-content/blockRenderers'`
- **THEN** the component is available and renders identically

### Requirement: Each block component has co-located styles
Each block component SHALL have its styles defined in a CSS module file co-located with the component (e.g., `BlocksBlock.module.css`) containing only styles relevant to that block.

#### Scenario: Block styles are scoped
- **WHEN** a block component renders
- **THEN** its styles do not leak to other blocks or global styles

#### Scenario: Block styles use existing CSS custom properties
- **WHEN** block styles reference colors, spacing, or typography
- **THEN** they use existing CSS custom properties (--paper-bg, --paper-text, --page-ink, etc.) rather than hardcoded values

### Requirement: LinkIcon is a shared utility component
The `LinkIcon` component SHALL be available as a named export from `src/components/notebook-content/blocks/LinkIcon.jsx` and SHALL be used by blocks that need social/external link icons (LinksBlock, ProjectDemoBlock, ProjectRepoBlock via ProjectButton, Thumbnail).

#### Scenario: LinkIcon renders correct SVG for each type
- **WHEN** LinksBlock renders with item.icon = "github"
- **THEN** the GitHub SVG path is rendered

#### Scenario: LinkIcon falls back to external for unknown types
- **WHEN** LinksBlock renders with item.icon = "unknown"
- **THEN** the external link SVG path is rendered

### Requirement: BlocksBlock renders categorized items as chips
The `BlocksBlock` component SHALL render a label and a series of chip elements for each item in `block.items`.

#### Scenario: BlocksBlock with items
- **WHEN** block = { type: 'blocks', name: 'Habilidades', items: ['React', 'TypeScript'] }
- **THEN** renders field label "Habilidades:" and two chips with text "React" and "TypeScript"

#### Scenario: BlocksBlock with empty items
- **WHEN** block.items is empty or undefined
- **THEN** renders only the field label with no chips

### Requirement: TextBlock renders title, text, and optional link
The `TextBlock` component SHALL render an optional title, paragraph text, and an optional action link with label.

#### Scenario: TextBlock with all fields
- **WHEN** block = { type: 'text', title: 'Sobre', text: 'Descrição', link: { url: '/url', label: 'Ver mais' } }
- **THEN** renders title, paragraph, and action link with label "Ver mais"

#### Scenario: TextBlock without link
- **WHEN** block.link is undefined
- **THEN** renders only title and paragraph without action section

### Requirement: PositionsBlock renders position entries with company, dates, and description
The `PositionsBlock` component SHALL render a list of position items, each with position title, company, formatted date range, and optional description.

#### Scenario: PositionsBlock with full data
- **WHEN** block.items contains position with fromDate, toDate, company, position, description
- **THEN** renders formatted date range (e.g., "jan 2023 — dez 2024"), company, and description

#### Scenario: PositionsBlock with current position
- **WHEN** block.items contains position with fromDate but no toDate
- **THEN** renders date range with "Atual" or localized equivalent (e.g., "jan 2023 — Atual")

#### Scenario: Localized labels for current position
- **WHEN** labels.currentPosition is provided
- **THEN** uses that label instead of hardcoded "Atual"/"Current"

### Requirement: EmailBlock renders email with mailto action
The `EmailBlock` component SHALL render the email address and a mailto action button with localized label.

#### Scenario: EmailBlock renders correctly
- **WHEN** block = { type: 'email', email: 'test@example.com' }
- **THEN** renders email text and a button with mailto: link and localized message label

### Requirement: LinksBlock renders social links with icons
The `LinksBlock` component SHALL render a list of social links, each with an icon, name, and URL. External links open in new tab; mailto links do not.

#### Scenario: LinksBlock with multiple links
- **WHEN** block.items = [{ name: 'GitHub', icon: 'github', link: 'https://github.com/user' }, { name: 'Email', icon: 'email', link: 'mailto:test@example.com' }]
- **THEN** renders two rows with correct icons, GitHub opens in new tab, Email uses mailto

### Requirement: ListBlock renders list items with optional detail and checklist support
The `ListBlock` component SHALL render a list of items, each with text, optional detail, and optional checked state for checklists.

#### Scenario: ListBlock with simple strings
- **WHEN** block.items = ['Item 1', 'Item 2']
- **THEN** renders two list items with circle markers and text

#### Scenario: ListBlock with objects and detail
- **WHEN** block.items = [{ text: 'Item', detail: 'Detail text' }]
- **THEN** renders item with text and detail in muted color

#### Scenario: ListBlock with checklist items
- **WHEN** block.items = [{ text: 'Task', done: true }]
- **THEN** renders item with filled circle marker (check state)

### Requirement: ProjectDemoBlock renders video demos or legacy images with deploy link
The `ProjectDemoBlock` component SHALL render video demos (multiple, vertical stack) when `block.videoDemos` is present, or fall back to legacy single image/video with single deploy link.

#### Scenario: ProjectDemoBlock with videoDemos
- **WHEN** block.videoDemos = [{ src: 'video.mp4', caption: 'Demo', deployLink: 'https://deploy.url' }]
- **THEN** renders video thumbnail with caption and deploy button

#### Scenario: ProjectDemoBlock with legacy images
- **WHEN** block.images = [{ src: 'image.png', caption: 'Demo' }] and block.deployLink = 'https://deploy.url'
- **THEN** renders image thumbnail with caption and deploy button

#### Scenario: ProjectDemoBlock with no media
- **WHEN** block has no videoDemos, no images
- **THEN** renders placeholder with localized "noThumbnail" label

### Requirement: ProjectRepoBlock renders repository button via ProjectButton
The `ProjectRepoBlock` component SHALL render a `ProjectButton` with the first item's icon, name, and link.

#### Scenario: ProjectRepoBlock renders button
- **WHEN** block.items = [{ icon: 'github', name: 'Repo', link: 'https://github.com/user/repo' }]
- **THEN** renders ProjectButton with github icon, "Repo" text, and link

#### Scenario: ProjectRepoBlock with no items returns null
- **WHEN** block.items is empty
- **THEN** returns null (renders nothing)

### Requirement: BlockRenderer registry routes by block.type
The `BlockRenderer` default export SHALL route to the correct block component based on `block.type` using the RENDERERS registry.

#### Scenario: BlockRenderer dispatches to correct component
- **WHEN** BlockRenderer receives { type: 'text', text: 'Hello' }
- **THEN** renders TextBlock with the block data

#### Scenario: Unknown block type returns null
- **WHEN** BlockRenderer receives { type: 'unknown' }
- **THEN** returns null