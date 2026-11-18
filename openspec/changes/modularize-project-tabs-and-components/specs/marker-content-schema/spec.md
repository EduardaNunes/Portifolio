# Spec Delta

## MODIFIED Requirements

### Requirement: Project lists are ordered and category-owned

A category marker SHALL declare an ordered `projects` array. Each project SHALL have a unique `id`, a `title`, a `sections` array, and a `projectDemo` block. Every project SHALL belong to exactly one category marker and keep its declared order. Category markers SHALL also have a layout definition that maps each project to a page pair.

#### Scenario: Projects render once in order

- **WHEN** a category marker renders
- **THEN** each of its projects appears exactly once in the declared order

#### Scenario: Duplicate project id fails validation

- **WHEN** two projects share an id, including across categories
- **THEN** validation fails and identifies both occurrences

#### Scenario: Incomplete project fails validation

- **WHEN** a project omits its title, sections, or demo block
- **THEN** validation fails with the project id

#### Scenario: Category has layout definition

- **WHEN** a category marker is processed
- **THEN** it has a corresponding layout entry defining its page pairs

#### Scenario: Layout references valid project sections

- **WHEN** a category layout references a project's section id
- **THEN** that section exists in the project's sections array

## ADDED Requirements

### Requirement: Category layout coverage is validated

The build SHALL validate that every category marker (ai-automation, games, webdev, backend) has a layout definition in the layout module, and that every project in the category's content is referenced by the layout. Missing layout or unreferenced projects SHALL fail validation.

#### Scenario: Missing category layout fails

- **WHEN** a category marker has no layout entry
- **THEN** validation fails with the marker id

#### Scenario: Unreferenced project fails

- **WHEN** a project exists in content but is not referenced by the category's layout
- **THEN** validation fails with the project id and category marker id

#### Scenario: Valid layout passes

- **WHEN** all category markers have layouts referencing all their projects
- **THEN** validation passes for category layout coverage