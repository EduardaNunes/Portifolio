# page-content-alignment Specification

## Purpose
Enables configurable vertical alignment (top, center, bottom) of page content within notebook leaves via layout configuration. This addresses the issue where pages with a single video have excessive empty space at the bottom.

## Requirements

### Requirement: Page side layout supports contentAlign property
Each page side (left/right) in the layout configuration MAY declare an optional `contentAlign` property. Valid values are `start` (top-aligned, default), `center` (vertically centered), and `end` (bottom-aligned). When specified, the leaf's content SHALL be aligned accordingly using flexbox `justify-content` on the leaf container.

#### Scenario: Layout with contentAlign center centers page content
- **WHEN** a page side in layout.js has `{ contentAlign: "center" }`
- **THEN** the corresponding notebook leaf renders its content vertically centered

#### Scenario: Layout with contentAlign end aligns page content to bottom
- **WHEN** a page side in layout.js has `{ contentAlign: "end" }`
- **THEN** the corresponding notebook leaf renders its content bottom-aligned

#### Scenario: Layout without contentAlign defaults to start
- **WHEN** a page side in layout.js omits `contentAlign`
- **THEN** the corresponding notebook leaf renders its content top-aligned (default)

### Requirement: Leaf component applies contentAlign from layout
The `NotebookLeaf` component SHALL receive a `contentAlign` prop (from the layout configuration via `buildNotebookPages.js`) and apply it as a CSS class or inline style to achieve the vertical alignment.

#### Scenario: NotebookLeaf with contentAlign center uses flex center
- **WHEN** NotebookLeaf receives `contentAlign: "center"`
- **THEN** the leaf's content container has `justify-content: center` (or equivalent)

#### Scenario: NotebookLeaf with contentAlign end uses flex end
- **WHEN** NotebookLeaf receives `contentAlign: "end"`
- **THEN** the leaf's content container has `justify-content: flex-end` (or equivalent)

#### Scenario: NotebookLeaf with default alignment uses flex start
- **WHEN** NotebookLeaf receives no `contentAlign` or `contentAlign: "start"`
- **THEN** the leaf's content container has `justify-content: flex-start` (or equivalent)
