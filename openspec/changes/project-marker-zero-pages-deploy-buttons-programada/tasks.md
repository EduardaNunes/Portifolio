# Tasks

## 1. Project Marker Zero Pages

- [x] 1.1 Update `isMarkerActive` function in `src/components/narrative-notebook-component/NarrativeNotebook.jsx` to allow projects marker to remain active/selected when a right-side marker is active, while having 0 pages
- [x] 1.2 Adjust navigation logic to skip directly to the next marker (Ia and automations) when projects marker is current and has 0 pages
- [x] 1.3 Test that projects marker can be active simultaneously with right-side markers
- [x] 1.4 Test navigation skips projects pages and proceeds to next marker

## 2. Deploy Button Positioning

- [x] 2.1 Modify `src/components/notebook-content/ProjectDemoBlock/ProjectDemoBlock.jsx` to render deploy buttons below repository navigation buttons instead of below thumbnails
- [x] 2.2 Update CSS styles in `ProjectDemoBlock.module.css` if needed for the new layout
- [x] 2.3 Test that deploy buttons appear in the new position across different screen sizes
- [x] 2.4 Verify existing repository button functionality remains intact

## 3. ProgramADA Deploy Labels

- [x] 3.1 Update ProgramADA content in `src/content/pt.json` to add `buttonLabel` field for each video demo: "Jogar" for general playtest and "Jogar MiniGame" for MiniGame Café
- [x] 3.2 Update ProgramADA content in `src/content/eng.json` with the same `buttonLabel` fields
- [x] 3.3 Modify `ProjectDemoBlock.jsx` to read the `buttonLabel` from demo props and use it for the deploy button span text
- [x] 3.4 Test that "Jogar" label appears for the general playtest deploy link
- [x] 3.5 Test that "Jogar MiniGame" label appears for the MiniGame Café deploy link