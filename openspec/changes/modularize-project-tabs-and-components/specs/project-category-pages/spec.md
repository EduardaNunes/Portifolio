# Spec Delta

## Purpose

Defines layout-driven page pairs for project category markers (IA e Automações, Jogos, WebDev, BackEnd), making them consistent with narrative markers. Each category marker declares its page pairs in the layout module, and each project within a category becomes a configured page pair resolved from content by stable section ids. The Projects marker remains the overview.

## ADDED Requirements

### Requirement: Category markers declare page pairs in layout

Each project category marker (ai-automation, games, webdev, backend) SHALL have its page pairs defined in the layout module, specifying left and right leaf content slices per pair. The layout SHALL reference project content by stable project id and section id.

#### Scenario: Category layout defines project pairs

- **WHEN** the layout module is loaded for a category marker
- **THEN** it contains an array of page pairs, each with left and right leaf specifications that reference project sections by id

#### Scenario: Layout references valid project content

- **WHEN** a category layout references a project id or section id
- **THEN** that project and section exist in the content document for the category

#### Scenario: Missing layout fails validation

- **WHEN** a category marker has no layout definition
- **THEN** validation fails with the marker id

### Requirement: Category page pairs resolve from content by stable ids

When building notebook pages, each category marker's page pairs SHALL be resolved by matching layout specifications to project content using stable project ids and section ids, exactly like narrative markers.

#### Scenario: Project left leaf shows metadata sections

- **WHEN** a category page pair's left leaf is resolved
- **THEN** it displays the project's title, description sections, tech stack blocks, and repository link via the ProjectButton component

#### Scenario: Project right leaf shows demo

- **WHEN** a category page pair's right leaf is resolved
- **THEN** it displays the project's demo image or video via the Thumbnail component and optional deploy link

#### Scenario: Project order follows layout declaration

- **WHEN** multiple page pairs exist for a category
- **THEN** they appear in the exact order declared in the layout

### Requirement: Projects marker remains overview

The Projects marker (id: projects, kind: overview) SHALL continue to render a single overview page pair summarizing all categories, without per-project page pairs.

#### Scenario: Projects overview shows category summary

- **WHEN** the Projects marker's page pair is rendered
- **THEN** it displays the category labels and project counts, and the first available project image as a thumbnail

#### Scenario: Projects overview does not list individual projects

- **WHEN** the Projects marker's page pair is rendered
- **THEN** it does not create a page pair per project

### Requirement: Active category highlights Projects tab

When any page pair belonging to a category marker (ai-automation, games, webdev, backend) is the current spread, the Projects marker tab on the left side SHALL also be active and expanded, alongside the active category tab on the right side.

#### Scenario: Dual active tabs for category

- **WHEN** the user navigates to a page pair in the Jogos category
- **THEN** both the Projetos left tab and the Jogos right tab are active and expanded

#### Scenario: Only Projects tab active for overview

- **WHEN** the user navigates to the Projects overview page pair
- **THEN** only the Projetos left tab is active; no right-side category tab is active

### Requirement: Category layout validation runs before rendering

The build SHALL validate that every category marker has a layout definition, every referenced project id exists in content, and every referenced section id exists in the project's sections. A failure SHALL identify the marker, project id, and section id responsible.

#### Scenario: Invalid category layout blocks the build

- **WHEN** validation finds a missing layout, unknown project id, or unknown section id
- **THEN** the build exits non-zero with a message locating the invalid entry

#### Scenario: Valid category layout produces pages

- **WHEN** validation passes for all category markers
- **THEN** page generation proceeds for those markers