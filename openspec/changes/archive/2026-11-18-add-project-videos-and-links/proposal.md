# Proposal

## Why

The portfolio currently lacks video demonstrations and deploy links for most projects. Only the ProgramADA project has a single video and deploy link. The user has video files in `public/Videos/` for all game and web projects, and specific GitHub/deploy URLs for each project. The ProgramADA project uniquely has two videos that must display in vertical sequence: Video 1 → Deploy Button 1 → Video 2 → Deploy Button 2.

## What Changes

- **Add videos to all projects** in both `pt.json` and `eng.json` content files, using the video files from `public/Videos/`
- **Add GitHub repository links and deploy links** to each project as specified by the user
- **ProgramADA special handling**: Support two videos in vertical order, each with its own deploy button (ProgramADAs-Playtest and ProgramADA-MiniGame-Cafe-PlayTest)
- **Modify projectDemo block structure** to support multiple video+deploy pairs for projects that need it
- **Update validation** to handle the new projectDemo structure

## Capabilities

### New Capabilities

- `project-multi-video-demo`: Support for projects with multiple videos, each with an associated deploy link, rendered in vertical sequence on the demo leaf

### Modified Capabilities

- `marker-content-schema`: The `projectDemo` block type needs to support an array of `videoDemos` (each with `src`, `alt`, `caption`, `deployLink`) in addition to the existing `images` array, for backward compatibility and for multi-video projects
- `narrative-content-pages`: Project spread layout must render multiple video demos with their deploy links in vertical order on the right leaf when `videoDemos` is present.

## Impact

- **Content files**: `src/content/pt.json` and `src/content/eng.json` - all project entries in `games`, `webdev`, and `backend` categories
- **Content schema**: `marker-content-schema` spec and validation logic in `src/content/validateContent.js`
- **Renderer**: `src/components/notebook-content/blockRenderers.jsx` - `ProjectDemoBlock` component