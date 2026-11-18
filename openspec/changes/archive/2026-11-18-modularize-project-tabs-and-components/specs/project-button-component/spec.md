# Spec Delta

## Purpose

A reusable component that renders the "VER REPOSITÓRIO" action button with configurable icon, text, and link. Used by project demos to provide a consistent repository link button across the notebook.

## ADDED Requirements

### Requirement: ProjectButton renders a styled action button

The component SHALL render an `<a>` element styled as a unified notebook action button (uppercase text, 2px solid border, square corners, minimum height, paper background, ink text, hover invert).

#### Scenario: Button renders with icon, text, and link

- **WHEN** the component receives `{ icon: 'github', text: 'Ver Repositório', link: 'https://github.com/user/repo' }`
- **THEN** an anchor element renders with the GitHub icon, the text "VER REPOSITÓRIO", and href set to the link

#### Scenario: Button opens link in new tab for external URLs

- **WHEN** the link is an external HTTPS URL
- **THEN** the anchor has `target="_blank"` and `rel="noopener noreferrer"`

#### Scenario: Button handles mailto links without new tab

- **WHEN** the link starts with `mailto:`
- **THEN** the anchor does NOT have `target="_blank"` or `rel="noopener noreferrer"`

### Requirement: ProjectButton uses supported icon set

The icon prop SHALL accept one of the supported icon names: `github`, `external`, `linkedin`, `email`. An unknown icon SHALL fall back to the `external` icon.

#### Scenario: GitHub icon renders

- **WHEN** icon is `github`
- **THEN** the GitHub SVG icon appears in the button

#### Scenario: External icon renders

- **WHEN** icon is `external`
- **THEN** the external link SVG icon appears in the button

#### Scenario: Unknown icon falls back

- **WHEN** icon is an unsupported value
- **THEN** the external icon renders without error

### Requirement: ProjectButton integrates with notebook theming

The component SHALL use the existing notebook CSS variables (`--notebook-highlight-color`, `--paper-bg`, `--paper-accent`, `--paper-text`) for styling so it matches the unified action button appearance in both dark and light themes.

#### Scenario: Button uses orange border in dark theme

- **WHEN** the site is in dark theme
- **THEN** the button border is orange (`--notebook-highlight-color`) and hover background is orange

#### Scenario: Button uses blue border in light theme

- **WHEN** the site is in light theme
- **THEN** the button border is blue (`--paper-accent`) and hover background is blue

#### Scenario: Button text inverts on hover

- **WHEN** the user hovers the button
- **THEN** the button background becomes the accent color and text/icon become the paper background color

### Requirement: ProjectButton replaces LinksBlock variant project-repo

The component SHALL fully replace the `LinksBlock` rendering when `variant === 'project-repo'`. The `LinksBlock` component SHALL no longer handle the `project-repo` variant.

#### Scenario: Repository link uses ProjectButton

- **WHEN** a project has a `repoLink` in its demo block
- **THEN** the left leaf renders a ProjectButton with the repository link instead of a LinksBlock variant

#### Scenario: LinksBlock no longer handles project-repo

- **WHEN** a links block with variant `project-repo` would be rendered
- **THEN** the build uses ProjectButton instead and LinksBlock does not receive that variant