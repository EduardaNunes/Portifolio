# Design

## Context

The portfolio currently uses two data files in `src/data/`:
- `profile.js` - Contains all localized content for About Me, Career, Studies, Contact sections, plus UI labels
- `projects.js` - Contains project data with categories and helper functions

Both files export data structures consumed by the `narrative-notebook-component` components (`AboutMePage.jsx`, `CareerPage.jsx`, `StudiesPage.jsx`, `ProjectsSection.jsx`, `ContactPage.jsx`, `ProjectLeftPage.jsx`, `ProjectRightPage.jsx`).

The new content from the attached files significantly expands and updates the data while maintaining the same structure. No component interface changes are needed - only the data content changes.

## Goals / Non-Goals

**Goals:**
- Replace `src/data/profile.js` with the new profile data (expanded skills, soft skills, results, career timeline, studies, contact info, and updated labels for both pt/eng)
- Replace `src/data/projects.js` with the new projects data (updated project list with problem→solution→result descriptions, same categories but different projects)
- Ensure all thumbnail image paths in projects reference existing or placeholder images
- Maintain backward compatibility with existing component consumers

**Non-Goals:**
- No changes to component rendering logic
- No changes to navigation, page turn animations, or theme handling
- No new dependencies or build configuration changes
- No changes to the `translations.js` file (profile data is separate from UI translations)

## Decisions

### 1. Direct data file replacement
**Decision**: Replace the entire content of `profile.js` and `projects.js` with the new data structures.
**Rationale**: The new data maintains the exact same exported structure (`profileData` object with `pt`/`eng` keys, `projects` array with same field names). Components consume these exports directly, so a drop-in replacement works without any component changes.
**Alternative considered**: Incremental updates to specific fields. Rejected because the new data restructures several sections (skills categories, soft skills, results format) making incremental edits more error-prone than full replacement.

### 2. Thumbnail image handling
**Decision**: Keep the `thumbnailUrl` paths as specified in the new projects.js, assuming the SVG files exist in `/public/images/projects/`. If missing, the components already handle missing thumbnails via the `noThumbnail` label.
**Rationale**: The new data references specific SVG files (e.g., `/images/projects/programadas.svg`). The existing component logic in `ProjectLeftPage.jsx`/`ProjectRightPage.jsx` already has fallback handling for missing images.
**Alternative considered**: Add placeholder images as part of this change. Rejected - image assets are separate from content updates and can be added later.

### 3. Category consistency
**Decision**: The `PROJECT_CATEGORIES` object remains identical (IA_AUTOMACAOES, JOGOS, WEBDEV, BACKEND). The new projects.js uses the same keys.
**Rationale**: The `ProjectsSection.jsx` and category filtering logic depend on these exact category keys. Keeping them unchanged ensures zero impact on filtering behavior.

### 4. Localization structure
**Decision**: Maintain the exact same `pt`/`eng` structure in `profileData`. All new content includes both languages.
**Rationale**: The `useLanguage` hook and components expect this structure. The new data provides complete translations for all new fields.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Missing thumbnail SVGs cause broken images | Components already have fallback (`noThumbnail` label); verify images exist post-deployment |
| New content exceeds layout space (longer descriptions) | Components use scrollable areas; test with new content lengths |
| Category "IA e Automações" becomes empty (0 projects) | Spec already handles empty category state; "Nenhum projeto nesta categoria" message displays |
| LinkedIn/GitHub/email URL changes break contact links | URLs are simple strings; verify links work after deployment |
| `getCategorizedProjects` helper uses fragile `category.split(' ')[0]` logic | This helper is in the replaced file; new projects.js should fix or maintain it |

## Migration Plan

1. Replace `src/data/profile.js` with new content
2. Replace `src/data/projects.js` with new content
3. Verify all thumbnail SVG files exist in `public/images/projects/` (add placeholders if needed)
4. Run dev server and visually verify all 5 sections + project spreads in both languages
5. Test category filtering for all 4 categories
6. Deploy to preview environment for final validation

**Rollback**: Revert the two data files to previous versions (git checkout).