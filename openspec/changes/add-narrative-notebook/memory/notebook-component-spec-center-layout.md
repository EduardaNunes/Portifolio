---
name: centered-notebook-layout
description: Notebook dimensionado para ~80% da tela com aspect ratio preservado
metadata:
  type: project
---

# Centered Notebook Layout with Aspect Ratio Preservation

## Change Summary
Atualização do `spec.md` em `openspec/changes/add-narrative-notebook/specs/narrative-notebook-component/spec.md` para corrigir o dimensionamento e posicionamento do caderno.

## Changes Made

### spec.md Updates
1. **Purpose section** (line 5): Changed from "exactly 100% viewport width (100vw)" to "approximately 80% viewport width (80vw) in a centered container that maintains aspect ratio (~80vw by ~80vh max-height), without distortion on wide or narrow screens"

2. **Requirement: Notebook layout structure** (lines 9-23): 
   - Updated requirement to specify each page occupies approximately 80% of viewport width with max-width: 80vw and maintains aspect ratio
   - Container now has ~80% dimensions (~80vw max-width by ~80vh max-height)
   - All scenarios updated to reflect centered layout behavior

### design.md Updates
1. **Page Layout Structure decision** (line 27-29): Changed from "exactly 100% viewport width" to "Notebook container centers at ~80% viewport dimensions (max-width: 80vw, max-height: 80vh) maintaining aspect ratio; each page within = 100% of container width"

2. **Navigation via Corner Clicks decision** (line 39-41): Updated to specify zones relative to notebook container width instead of viewport

3. **Deployment Steps** (lines 63-68): Added centered layout styling (max-width: 80vw, max-height: 80vh)

4. Added new section **MODIFIED Decisions** documenting all changes

### tasks.md
No updates needed - tasks remain valid for implementation with new layout dimensions.

## Rationale
The centered ~80% layout provides a more readable presentation that doesn't dominate the entire screen, especially on wide screens. It preserves proportional balance while maintaining consistent scroll-snap behavior and predictable animations. The aspect ratio is preserved so the notebook doesn't appear stretched or distorted on different screen sizes.

## Related Files
- `openspec/changes/add-narrative-notebook/specs/narrative-notebook-component/spec.md` - Updated specifications
- `openspec/changes/add-narrative-notebook/design.md` - Updated design decisions
- `openspec/changes/add-narrative-notebook/tasks.md` - No changes needed, tasks remain valid

## Implementation Notes
When implementing this change:
1. Create a centered container with `max-width: 80vw` and `max-height: 80vh`
2. Use `aspect-ratio: 1/1` or maintain proportional scaling within the container
3. Each page fills 100% of its parent container width
4. Update corner navigation zones to be relative to notebook width, not viewport
