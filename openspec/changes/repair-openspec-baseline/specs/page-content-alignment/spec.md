# Spec Delta

## REMOVED Requirements

### Requirement: Page side layout supports contentAlign property

**Reason**: The property was specified but never implemented. No page side in the layout configuration declares `contentAlign`, and no component reads it, so the requirement has never described real system behavior.

**Migration**: No migration needed. Pages keep their current top-aligned layout, which is the documented default (`start`). If vertical alignment becomes necessary later, reintroduce it as a new capability together with the implementation.

### Requirement: Leaf component applies contentAlign from layout

**Reason**: `NotebookLeaf` never received a `contentAlign` prop and `buildNotebookPages.js` never forwarded one. The requirement describes an interface that does not exist.

**Migration**: No migration needed. Callers that would have passed `contentAlign` can continue to rely on the leaf's default top alignment.
