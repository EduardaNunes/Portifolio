# Spec Delta

## Purpose

Ensure all project texts and names are standardized to English, with exceptions for the Portuguese translation script shown to users.

## ADDED Requirements

### Requirement: All project texts and names use English

The system SHALL use English for all texts and names throughout the project, except for the script responsible for translating Portuguese content shown to users.

#### Scenario: English text in source files

- **WHEN** auditing source files for non-English texts
- **THEN** any Portuguese or other non-English text is flagged for translation or removal

#### Scenario: Exception for Portuguese translation script

- **WHEN** reviewing the translation script responsible for Portuguese content shown to users
- **THEN** the script is allowed to contain Portuguese texts and names as its purpose is translation

#### Scenario: Non-English names regularized

- **WHEN** finding project names, identifiers, or labels not in English
- **THEN** they are regularized to English equivalents

### Requirement: Translation script remains in Portuguese

The system SHALL allow the translation script to contain Portuguese texts and names since its purpose is to provide Portuguese translations to users.

#### Scenario: Portuguese translation script not flagged

- **WHEN** auditing the translation script for non-English texts
- **THEN** the script is exempt from the English-only standard and is not modified

#### Scenario: Translation script functions correctly

- **WHEN** the translation script is used to show content to users
- **THEN** Portuguese content is displayed correctly without being regularized to English