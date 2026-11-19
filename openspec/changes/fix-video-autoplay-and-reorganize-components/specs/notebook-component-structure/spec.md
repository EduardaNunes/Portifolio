# Spec Delta

## Purpose

Defines the standardized folder-per-component organization for notebook content components. Each component owns its folder with co-located JSX and CSS module, enabling clear ownership, easier navigation, and consistent patterns across the notebook content layer.

## ADDED Requirements

### Requirement: Each notebook content component has its own folder
Every component in `src/components/notebook-content/` SHALL reside in its own named folder (e.g., `LinkIcon/`, `BlocksBlock/`, `ProjectButton/`, `Thumbnail/`). The folder SHALL contain the component's JSX file and its CSS module (if applicable).

#### Scenario: LinkIcon component in own folder
- **WHEN** importing LinkIcon from `'../components/notebook-content/LinkIcon/LinkIcon'`
- **THEN** the component is available and renders correctly

#### Scenario: BlocksBlock component in own folder with CSS module
- **WHEN** importing BlocksBlock from `'../components/notebook-content/BlocksBlock/BlocksBlock'`
- **THEN** the component is available and its styles are scoped via CSS module

### Requirement: No blocks/ intermediate directory
The `src/components/notebook-content/blocks/` directory SHALL NOT exist. All components SHALL be direct children of `notebook-content/`.

#### Scenario: No blocks directory in import paths
- **WHEN** blockRenderers.jsx imports block components
- **THEN** import paths use `'./BlocksBlock/BlocksBlock'` not `'./blocks/BlocksBlock'`

### Requirement: ProjectButton and Thumbnail follow same pattern
`ProjectButton` and `Thumbnail` (which are notebook content components) SHALL each have their own folder with co-located CSS modules, following the same pattern as block components.

#### Scenario: ProjectButton has own folder with styles
- **WHEN** importing ProjectButton from `'../components/notebook-content/ProjectButton/ProjectButton'`
- **THEN** component is available and its styles are in `ProjectButton.module.css`

#### Scenario: Thumbnail has own folder with styles
- **WHEN** importing Thumbnail from `'../components/notebook-content/Thumbnail/Thumbnail'`
- **THEN** component is available and its styles are in `Thumbnail.module.css`

### Requirement: CSS modules co-located with components
Each component's styles SHALL be in a `.module.css` file inside the component's folder, not in the global `src/styles/index.css`.

#### Scenario: BlocksBlock styles in BlocksBlock.module.css
- **WHEN** BlocksBlock renders
- **THEN** its styles come from `BlocksBlock.module.css` (scoped via CSS modules)

#### Scenario: Global CSS no longer contains block component styles
- **WHEN** inspecting `src/styles/index.css`
- **THEN** no block-specific class selectors (e.g., `.page-field`, `.positions-list`, `.project-demo-block`) are present

### Requirement: Barrel exports from blockRenderers.jsx maintained
The `blockRenderers.jsx` file SHALL continue to re-export all block components and the `BlockRenderer` default export for backward compatibility.

#### Scenario: Existing imports from blockRenderers still work
- **WHEN** code imports `{ BlocksBlock }` from `'../components/notebook-content/blockRenderers'`
- **THEN** the component resolves correctly