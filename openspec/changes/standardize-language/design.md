# Design

## Context

The project currently contains mixed-language texts and identifiers (Portuguese and English) across source files, configuration, and scripts. The goal is to standardize all user-facing texts and internal names to English for consistency and maintainability, while preserving the Portuguese translation script that is responsible for showing content to users in Portuguese.

## Goals / Non-Goals

**Goals:**
- Standardize all project texts and names to English
- Identify and exception the Portuguese translation script from regularization
- Regularize all scripts currently outside the English-only pattern
- Create an audit process to find and fix non-English texts/names

**Non-Goals:**
- Do not modify the Portuguese translation script's purpose or functionality
- Do not change the logical behavior of the application
- Do not remove any existing functionality

## Decisions

- **English as the standard language**: All new texts and names must be in English. Existing non-English texts should be translated or removed unless they are in the translation script.
- **Translation script exception**: The script responsible for Portuguese translation to users is explicitly exempt from regularization and may remain in Portuguese.
- **Regularization approach**: Scripts and files outside the pattern will be audited and either translated to English or have their non-English texts documented as exceptions.

## Risks / Trade-offs

- [Risk: Large number of files to audit and update] → Prioritize critical files first; use automated search for non-English texts.
- [Risk: Translation script maintenance] → Ensure the translation script is clearly documented as an exception and not accidentally modified.
- [Trade-off: Short-term effort for long-term consistency] → The initial regularization requires time but reduces future technical debt.

## Migration Plan

1. Audit all project files for non-English texts and names.
2. Identify the Portuguese translation script and mark it as exempt.
3. Translate or remove non-English texts from all other files.
4. Verify the translation script still functions correctly with Portuguese content.
5. Update any configuration or documentation to reflect the new language standard.
6. Build and test the application to ensure no text-related regressions.