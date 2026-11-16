# Spec Delta

## MODIFIED Requirements

### Requirement: Category navigation uses page-turn transactions

Project-category markers MUST use the same forward/backward page-turn transaction and turn lock as spread navigation when they change project content. The turn MUST execute even when the clamped target index equals the current index, if the visual content of the spread has changed.

#### Scenario: Category change turns the project spread
- **WHEN** a user selects a different project category through a right-side marker
- **THEN** the project content changes through the same page-turn animation and turn lock used for spread navigation

#### Scenario: Category selection preserves filtering
- **WHEN** a project category turn completes
- **THEN** the selected category remains active and the project spread reflects that category's filtered content

#### Scenario: Category turn executes when indices match but content differs
- **WHEN** a category change reconstructs the spreads array and the clamped target index equals the current index
- **THEN** a page-turn animation still executes with the visually current spread as the origin and the new category's first project spread as the destination, and the turn sound plays