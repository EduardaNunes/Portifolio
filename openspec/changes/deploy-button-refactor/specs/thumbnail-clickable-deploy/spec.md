# Spec Delta

## Purpose

Makes thumbnails clickable links that navigate to deploy URLs when a deploy link is provided, eliminating the need for separate deploy buttons.

## ADDED Requirements

### Requirement: Thumbnail navigates to deploy link when clicked
When a thumbnail has an associated deploy link, clicking the thumbnail SHALL navigate to that URL in a new tab.

#### Scenario: Click thumbnail with deploy link opens deploy URL
- **WHEN** user clicks on a thumbnail that has a deploy link
- **THEN** the browser opens the deploy link in a new tab

#### Scenario: Thumbnail without deploy link does not navigate
- **WHEN** user clicks on a thumbnail without a deploy link
- **THEN** no navigation occurs

### Requirement: Thumbnail indicates clickability when deploy link exists
When a thumbnail has a deploy link, it SHALL visually indicate it is clickable (cursor change, hover state).

#### Scenario: Cursor changes to pointer on hover when deploy link exists
- **WHEN** user hovers over a thumbnail with a deploy link
- **THEN** cursor changes to pointer

#### Scenario: Cursor remains default when no deploy link
- **WHEN** user hovers over a thumbnail without a deploy link
- **THEN** cursor remains default