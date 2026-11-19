# deploy-button/positioning Specification

## Purpose

Defines the deploy button repositioning from below thumbnails to below repository navigation buttons.

## Requirements

### Requirement: Deploy buttons positioned below repository buttons

The system SHALL render deploy buttons below the repository navigation buttons instead of below thumbnails in project demonstrations.

#### Scenario: Deploy buttons below repo buttons

- **WHEN** viewing a project demo with thumbnails and a repository link
- **THEN** the deploy button SHALL appear below the "Ver Repositório" button, not below the thumbnail

### Requirement: Maintain deploy button visibility

The system SHALL ensure deploy buttons remain accessible and visible after repositioning.

#### Scenario: Deploy button visible after repositioning

- **WHEN** a project demo is displayed with repositioned layout
- **THEN** the deploy button SHALL be visible below the repository navigation area