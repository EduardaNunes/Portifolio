# Proposal

## Why

The notebook portfolio content needs to be updated with the latest professional profile data and project portfolio from the provided data files (`profile.js` and `projects.js`). The current implementation uses hardcoded or outdated content that doesn't reflect the current professional trajectory, skills, and projects. This update ensures the portfolio accurately represents the developer's current experience, technical stack, and project work across both Portuguese and English languages.

## What Changes

- **Update all notebook section content** (About Me, Career, Studies, Projects, Contact) with current data from `profile.js`
- **Update project portfolio** with current projects, categories, and metadata from `projects.js`
- **Maintain bilingual support** (Portuguese/English) with consistent structure across both locales
- **Update project categories** to match the new categorization: IA e Automações, Jogos, WebDev, BackEnd
- **Update UI labels and navigation text** for both languages
- **Ensure content follows the "problem → action → result" pattern** for project descriptions

## Capabilities

### New Capabilities
- None - this change updates content within existing capabilities

### Modified Capabilities
- `narrative-content-pages`: The content requirements for each spread (About Me, Career, Studies, Projects, Contact) are updated to reflect the new data structure and content from `profile.js` and `projects.js`. The existing "Content localization support" requirement continues to apply, but the actual content data it references is completely refreshed.

## Impact

**Affected code:**
- Data files: `src/data/profile.js` (or equivalent), `src/data/projects.js` (or equivalent)
- Components that consume this data: `NarrativeNotebook`, `NarrativeContentPages`, project category filtering
- No API changes, no breaking changes to component interfaces
- No dependency changes

**Systems:**
- Portfolio website content (both pt/eng locales)
- Project filtering by category
- Navigation and UI labels