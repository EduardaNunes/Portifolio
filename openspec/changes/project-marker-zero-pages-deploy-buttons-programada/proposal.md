# Proposal

## Why

The project marker currently has pages that need to be revised to skip directly to the next markers (Ia and automations) while maintaining the ability to stay active/selected when a right-side marker is active. Additionally, deploy button positioning needs to be reorganized, and ProgramADA needs distinct button labels for its two deploy links.

## What Changes

1. **Project marker with 0 pages**: The `projects` marker should skip directly to the next marker (Ia and automations) in the navigation sequence. The `isMarkerActive` function in `NarrativeNotebook.jsx` should be updated so that the projects marker can remain active/selected simultaneously with a right-side marker being active/selected.

2. **Deploy button positioning**: Deploy buttons currently rendered below thumbnails in `ProjectDemoBlock.jsx` should be repositioned to appear below the repository navigation buttons (`ProjectRepoBlock`) instead.

3. **ProgramADA deploy button labels**: The ProgramADA project has two deploy links in its video demos. The button text should be changed from generic "Deploy" to "Jogar" for the general playtest link and "Jogar MiniGame" for the MiniGame Café link.

## Capabilities

### New Capabilities

- `project-marker/zero-pages`: The projects marker should have 0 pages and skip directly to the next marker while maintaining active/selected state compatibility with right-side markers.
- `deploy-button/positioning`: Deploy buttons should reposition from below thumbnails to below repository navigation buttons.
- `programada/deploy-labels`: ProgramADA project deploy buttons should have distinct labels: "Jogar" for general playtest and "Jogar MiniGame" for the MiniGame Café link.

### Modified Capabilities

- `narrative-right-sections`: Update the `isMarkerActive` logic to allow projects marker to be active when a right-side marker is active.

## Impact

- `src/components/narrative-notebook-component/NarrativeNotebook.jsx` - Update `isMarkerActive` function
- `src/components/notebook-content/ProjectDemoBlock/ProjectDemoBlock.jsx` - Reposition deploy buttons
- `src/content/pt.json` and `src/content/eng.json` - Update deploy link labels for ProgramADA