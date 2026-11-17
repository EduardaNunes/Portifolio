# notebook-page-flow Specification

## Purpose
Defines how narrative notebook content maps onto fixed, non-scrolling leaves: deterministic slicing, continuation page pairs within a marker, running heads on continuation leaves, and navigation across every generated pair.

## Requirements

### Requirement: Notebook leaves are fixed pages
Notebook leaves SHALL behave as fixed paper pages: no vertical or horizontal scrolling, no visible or reachable scrollbar, and no wheel, touch, or keyboard input may change the visible content of a leaf. Content that does not fit is a pagination defect and MUST NOT become a scrollable region.

#### Scenario: Leaf ignores scroll input
- **WHEN** the pointer wheel, a touch drag, PageDown, or an arrow key acts on a focused notebook leaf
- **THEN** the leaf produces no scroll offset and its visible content does not move

#### Scenario: No scrollbar on any leaf
- **WHEN** any leaf is rendered at 484×885 in Portuguese or English
- **THEN** no vertical or horizontal scrollbar appears inside the leaf, no input produces a scroll offset, and every text fragment remains fully visible and clear of the reserved corner-navigation area at the bottom of the page

### Requirement: Overflow continues on additional page pairs
Content that does not fit a leaf SHALL continue on the next page pair owned by the same marker, in reading order. The marker SHALL declare as many page pairs as the content requires, and no content may be truncated, ellipsized, or omitted to make a page fit.

#### Scenario: Content spills to a continuation pair
- **WHEN** a marker's left or right slice exceeds the visible leaf
- **THEN** the marker renders an additional page pair immediately after the current one and the remaining slice appears on the corresponding leaf of that pair

#### Scenario: Reading order is preserved across pairs
- **WHEN** content is split into slices
- **THEN** every item appears exactly once, in the same order as the source data, and no item is duplicated across pairs

#### Scenario: No content is dropped to make it fit
- **WHEN** a continuation pair is rendered
- **THEN** every source item remains present somewhere in the marker and no text is truncated with an ellipsis or clipped inside a leaf

### Requirement: Slices are authored deterministically
Leaf content SHALL be sliced from the existing localized data when notebook pages are built. Each page pair SHALL declare the bounded subset it renders, boundaries SHALL be chosen so the longest supported locale fits at the narrowest supported viewport, and the runtime MUST NOT measure rendered height or generate pairs dynamically.

#### Scenario: Pair declares its slice
- **WHEN** the notebook pages are built
- **THEN** each page pair carries the bounded subset of items it renders and each page component receives only that subset

#### Scenario: Slices fit both locales at the narrowest viewport
- **WHEN** the notebook is viewed at 484×885 with Portuguese and with English content
- **THEN** every leaf shows its complete slice without scrolling, without clipped text, and without content overlapping the corner-navigation area

#### Scenario: No runtime pagination
- **WHEN** the notebook renders or changes spread
- **THEN** no layout measurement, reflow loop, or dynamic pair generation occurs

### Requirement: Continuation leaves keep their context
A continuation leaf SHALL identify its context with a running head assembled from existing localized copy: the marker heading rendered as a section label, plus the continuing group label when its slice starts inside a labeled group. The full page title MUST appear only on the first leaf of a marker side, and no new copy keys may be introduced.

#### Scenario: First leaf keeps the page title
- **WHEN** the first leaf of a marker side renders
- **THEN** it shows the existing page title, including the single-group promotion, exactly as before

#### Scenario: Continuation leaf shows a running head
- **WHEN** a continuation leaf renders
- **THEN** it shows the marker's localized heading as a section label instead of the page title, and repeats the enclosing group label when its slice begins mid-group

#### Scenario: Running head reuses existing strings
- **WHEN** the running head is rendered in either locale
- **THEN** its text comes from the existing section heading or group label, with no new translation or profile keys

### Requirement: Continuation pairs stay in the navigation sequence
Every page pair produced by continuation SHALL participate in the flattened global sequence in marker order. Corner navigation, marker selection, index bounds, and page-turn animation MUST treat continuation pairs like any other pair.

#### Scenario: Corner navigation reaches continuation pairs
- **WHEN** the user selects the next corner from a marker's first pair
- **THEN** the continuation pair is displayed with the standard page turn before the next marker

#### Scenario: Marker selection opens the first pair
- **WHEN** the user selects the tab of a marker that owns several pairs
- **THEN** the notebook opens that marker's first pair and the continuation pairs follow it

#### Scenario: Sequence order is preserved
- **WHEN** continuation pairs exist in several markers
- **THEN** each marker's pairs stay consecutive and in declared order, and adjacent markers are not interleaved

### Requirement: Exhausted sides render blank paper
When one leaf of a continuation pair has no remaining slice, that leaf SHALL render blank paper with no invented copy, no filler content, and no placeholder text. The pair SHALL remain a normal navigable spread.

#### Scenario: Exhausted side renders blank paper
- **WHEN** a continuation pair has content only on one side
- **THEN** the other leaf shows only its paper background and decorations

#### Scenario: Blank leaf still turns
- **WHEN** the user navigates into or out of a pair with a blank leaf
- **THEN** the standard page-turn behavior and marker state apply without error
