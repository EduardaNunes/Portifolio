# Proposal

## Why

The project contains mixed-language texts and identifiers (Portuguese and English) which creates inconsistencies, makes the codebase harder to maintain for English-speaking contributors, and contradicts the goal of having a single-source-language project. All user-facing texts and internal names should use a single language to improve clarity, reduce duplication, and streamline future internationalization efforts.

## What Changes

- Standardize all project texts and names to English, except for the translation script responsible for Portuguese content shown to users.
- Regularize any scripts currently outside this pattern to comply with the English-only standard for texts/names.
- Update all affected files to reflect the new language convention.

## Capabilities

### New Capabilities

- `language-standardization`: Ensure all project texts and names are standardized to English, with exceptions for the Portuguese translation script.

### Modified Capabilities

- (No existing capabilities modified - this is a new language convention enforcement.)

## Impact

- Affected code: All source files, configuration, scripts, and documentation containing non-English texts or names.
- Scripts to regularize: Any scripts outside the Portuguese translation exception.
- No API, dependency, navigation, or content-model changes are expected, but all text-bearing files must be audited and updated.