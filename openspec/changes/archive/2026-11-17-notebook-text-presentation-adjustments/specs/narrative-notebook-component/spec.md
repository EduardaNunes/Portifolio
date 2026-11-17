# Spec Delta

## MODIFIED Requirements

### Requirement: Explicit deploy link on project right page
**When** project right page is rendered (second page of a two-page project layout)  
**THEN** a prominent deploy/preview link button MUST appear, clearly labeled with icon and URL, styled with the unified paper-like action button appearance (uppercase, 2px border, fixed minimum height, hover color invert)  
**WHEN** user clicks the deploy link  
**THEN** browser navigates to the deployed version or opens in new tab

#### Scenario: Deploy link prominence
- **WHEN** viewing project right page (video/image showcase)
- **THEN** deploy link is positioned prominently at its existing absolute top-right position, styled as a unified page-action button (uppercase text, 2px ink border, paper background, hover inverts to ink background with paper text), maintaining its current placement and z-order

#### Scenario: Deploy link visibility respects viewport
- **WHEN** notebook scrolls/animates to new page
- **THEN** deploy link remains visible and accessible on the right page as part of content layout with the unified button style

#### Scenario: Unified action button style across all notebook leaves
- **WHEN** any notebook leaf renders action buttons (repository links, contact buttons, deploy link, accept/deny actions)
- **THEN** all share the same visual style: uppercase, 2px solid ink border, square corners, minimum 1.9rem height, 0.25rem/0.6rem padding, paper background, ink text, hover inverts to ink background with paper text, focus-visible outline of 2px in paper-text color