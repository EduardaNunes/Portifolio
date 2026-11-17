# Spec Delta

## MODIFIED Requirements

### Requirement: Page title presentation
Every populated narrative notebook leaf SHALL display a centered marker page title at the top of the leaf with no background, border, or box — only the ink-colored text, sized responsively with clamp() and vertically spaced from following content. Project-title leaves retain their project titles. Blank leaves have no title.

#### Scenario: Section spread left leaf shows page title
- **WHEN** any populated left leaf of About Me, Career, Studies, or Contact renders
- **THEN** an `h2.page-title` displays the localized marker name centered at the top with font-size clamp(0.95rem, 3vw, 1.45rem), line-height 1.2, ink color, no border/background, and margin-bottom 0.9rem

#### Scenario: Section spread right leaf shows page title when single group
- **WHEN** a populated right leaf renders for a narrative marker
- **THEN** it displays that marker's name as the page title instead of omitting a title or using a section label as the title

#### Scenario: Right leaf with multiple groups retains only section labels
- **WHEN** a populated right narrative leaf contains one or more component groups
- **THEN** the marker name remains its only page title and every group label uses the smaller `page-label` presentation

#### Scenario: Project left leaf shows project title centered
- **WHEN** a project spread left leaf renders
- **THEN** the project name appears as centered `h2.page-title` replacing the previous left-aligned boxed header

#### Scenario: Continuation narrative leaf uses marker title
- **WHEN** a populated narrative leaf renders on a later page pair
- **THEN** it retains the same marker page title with page-title styling rather than a smaller running-head label

#### Scenario: Blank leaf has no title
- **WHEN** a leaf has no content because its paired side is exhausted
- **THEN** it contains no `page-title` or `page-label` heading

### Requirement: Section label presentation
Section groupings within a populated notebook leaf SHALL be introduced below the page title by an uppercase centered label with a pixel-stepped decorative underline, using the soft ink color and a size smaller than the page title. A section label MUST NOT be promoted to page-title styling merely because it is the only grouping on a leaf.

#### Scenario: Section label renders with pixel-stepped underline
- **WHEN** a `page-label` element renders for a content section
- **THEN** it displays uppercase text, centered, letter-spacing 0.06em, font-size clamp(0.5rem, 1.3vw, 0.62rem), soft ink color, with a ::after decorative underline consisting of two dotted segments: full width 2px line plus a 50%-width 2px line offset by 25% and 2px down, creating a pixel-stepped appearance

#### Scenario: Single section retains medium hierarchy
- **WHEN** a populated leaf contains exactly one section with a group label
- **THEN** the marker name remains the large page title and the group label remains a smaller `page-label` below it

#### Scenario: Section label spacing
- **WHEN** a `page-label` follows a page title or another section's content
- **THEN** it has margin-top 0.9rem and margin-bottom 0.5rem to separate from adjacent content
