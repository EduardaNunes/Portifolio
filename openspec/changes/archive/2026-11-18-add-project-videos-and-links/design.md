# Design

## Context

See proposal.md for motivation. The current system uses a `projectDemo` block with an `images` array (supporting one image/video) and optional `repoLink`/`deployLink`. The renderer (`ProjectDemoBlock` in `blockRenderers.jsx`) displays a single thumbnail/video and a single deploy button. The `Thumbnail` component auto-detects video from file extension. Content validation (`validateContent.js`) enforces the current schema.

ProgramADA uniquely needs two videos with two deploy links. Other projects need one video + one deploy link (or just repo link). Video files exist in `public/Videos/` for: TicTacToe, SnowBattle, ProgramADAs_SalaDeAula, ProgramADAs_MiniGameCafe, PixelPaint, MageBattle, Esbugalhado.

## Goals / Non-Goals

**Goals:**
- Extend `projectDemo` schema to support `videoDemos` array for multi-video projects
- Update renderer to display multiple videos vertically with individual deploy buttons
- Update validation to accept new structure
- Populate pt.json and eng.json with all videos and links
- Maintain backward compatibility with existing `images` + single `deployLink` pattern

**Non-Goals:**
- Change the notebook layout or page flow
- Modify the Thumbnail component's video playback behavior
- Add new video files (they already exist in public/Videos/)
- Change the marker registry or layout configuration

## Decisions

### 1. Schema Extension: Add `videoDemos` array to `projectDemo` block

**Decision**: Add optional `videoDemos` array to `projectDemo` block. Each entry: `{ src, alt, caption?, deployLink? }`. When present, `videoDemos` takes precedence over `images` for rendering.

**Rationale**: 
- Minimal change to existing schema
- Clear separation: `images` for legacy single-demo, `videoDemos` for multi-demo
- `videoDemos` entries mirror `images` entry structure but with per-entry `deployLink`

**Alternatives considered**:
- Replace `images` with `demos` array: Breaking change, requires migrating all projects
- Add `deployLinks` array parallel to `images`: Complex validation, unclear mapping
- Make `deployLink` an array on `projectDemo`: Doesn't associate links with specific videos

### 2. Renderer: Modify `ProjectDemoBlock` to handle `videoDemos`

**Decision**: Update `ProjectDemoBlock` in `blockRenderers.jsx` to:
- Check for `videoDemos` first; if present and non-empty, map over entries
- For each entry, render `Thumbnail` + conditional deploy button
- Fall back to current `images[0]` + single `deployLink` logic if no `videoDemos`

**Rationale**: Keeps rendering logic centralized, maintains single component for project demos.

**Alternatives considered**:
- New `MultiVideoDemoBlock` component: More code duplication
- Modify `Thumbnail` to accept array: Thumbnail is a single-media component

### 3. Validation: Update `validateContent.js`

**Decision**: Extend validation to:
- Accept `videoDemos` array in `projectDemo`
- Validate each entry has required `src`
- Allow either `images` or `videoDemos` (or both, with `videoDemos` taking precedence)
- Keep existing `images` validation for backward compatibility

**Rationale**: Ensures content integrity at build time, catches missing fields early.

### 4. Content Population: Map videos to projects (unchanged)

Same as before - map existing video files to projects based on filename.

### 5. Language Files: Update both pt.json and eng.json

Apply identical structure changes to both language files. Only text content (captions, alt text) differs between languages.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| `videoDemos` vs `images` confusion for future maintainers | Clear documentation in schema validation; `videoDemos` takes precedence |
| Validation may miss edge cases (both arrays empty) | Explicit validation: at least one of `images` or `videoDemos` must be declared |
| Deploy links may break over time | Links are in content files, easily updatable without code changes |

## Migration Plan

1. Update `validateContent.js` schema for `projectDemo` block
2. Update `ProjectDemoBlock` renderer for `videoDemos`
3. Update `pt.json` and `eng.json` with all videos and links
4. Run validation to confirm no errors
5. Test render in dev mode

Rollback: Revert content files and renderer changes; validation schema is backward compatible.

## Open Questions

None - all decisions resolved.