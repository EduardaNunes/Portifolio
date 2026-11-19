# Design

## Context

The project marker (`projects`) currently has pages and needs to be revised to have 0 pages, skipping directly to the next marker (Ia and automations). The `isMarkerActive` function in `NarrativeNotebook.jsx` needs updating. Deploy buttons in `ProjectDemoBlock.jsx` currently render below thumbnails and need to move below repository navigation buttons. ProgramADA has two deploy links that need distinct labels.

## Goals / Non-Goals

**Goals:**
- Projects marker renders with 0 pages and skips to next marker in navigation
- Projects marker can remain active/selected alongside right-side markers
- Deploy buttons reposition from below thumbnails to below repository buttons
- ProgramADA deploy buttons get distinct labels: "Jogar" and "Jogar MiniGame"

**Non-Goals:**
- Changing the underlying deploy link URLs
- Rewriting the entire notebook navigation system
- Modifying other project markers' behavior

## Decisions

1. **Project marker zero pages**: Update `isMarkerActive` in `NarrativeNotebook.jsx` to allow projects marker to be active when a right-side marker is active, and adjust navigation to skip projects pages.

2. **Deploy button positioning**: Modify `ProjectDemoBlock.jsx` to render the deploy anchor element after the `ProjectRepoBlock` component instead of within the thumbnail section.

3. **ProgramADA deploy labels**: Update the deploy link rendering in `ProjectDemoBlock.jsx` to accept a `buttonLabel` prop, and update the ProgramADA content in `pt.json` and `eng.json` to specify different labels for each video demo.

## Risks / Trade-offs

- **Risk**: Changing `isMarkerActive` logic could affect other marker interactions. Mitigation: Test all marker combinations.
- **Risk**: Repositioning deploy buttons may affect layout on different screen sizes. Mitigation: Use CSS flexbox and ensure responsive design.
- **Risk**: Changing button labels may confuse users familiar with "Deploy". Mitigation: The new labels "Jogar" and "Jogar MiniGame" are more specific to the ProgramADA context.