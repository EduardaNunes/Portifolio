# Tasks

## 1. Schema Validation Updates

- [x] 1.1 Update `validateContent.js` to accept `videoDemos` array in `projectDemo` block with required `src` and optional `alt`, `caption`, `deployLink` fields. Verify by running validation script and confirming no errors for new structure.
- [x] 1.2 Update `validateContent.js` to allow either `images` or `videoDemos` (or both) in `projectDemo`, with `videoDemos` taking precedence. Verify validation passes for both legacy and new project structures.
- [x] 1.3 Add validation rule: at least one of `images` or `videoDemos` must be declared in `projectDemo`. Verify validation fails appropriately when both are missing.

## 2. Renderer Updates

- [x] 2.1 Modify `ProjectDemoBlock` in `src/components/notebook-content/blockRenderers.jsx` to check for `videoDemos` array first. If present and non-empty, map over entries rendering `Thumbnail` + conditional deploy button for each. Verify by inspecting component logic.
- [x] 2.2 Ensure `ProjectDemoBlock` falls back to legacy `images[0]` + single `deployLink` rendering when `videoDemos` is absent/empty. Verify legacy projects still render correctly.
- [x] 2.3 Verify `Thumbnail` component correctly auto-detects video from `src` extension for `videoDemos` entries (uses existing `isVideoFile` utility). No code change needed if already working; confirm by testing.

## 3. Content Population - Portuguese (pt.json)

- [x] 3.1 Update ProgramADA project (`proj-programada`) in `pt.json`: replace `demo.images` with `demo.videoDemos` containing two entries: (1) Sala de Aula video + deploy link, (2) Minigame Café video + deploy link. Keep `repoLink` for GitHub. Verify by checking JSON structure.
- [x] 3.2 Update Mage Battle project (`proj-air-sea-battle`) in `pt.json`: add `demo.videoDemos` with one entry (MageBattle.mp4), add `repoLink` (https://github.com/EduardaNunes/Godot-Air-Sea-Battle-Atari-Clone). Verify.
- [x] 3.3 Update Snow Battle project (`proj-snow-battle`) in `pt.json`: add `demo.videoDemos` with one entry (SnowBattle.mp4), add `repoLink` (https://github.com/EduardaNunes/Godot-2D-Multiplayer). Verify.
- [x] 3.4 Update Pixel Paint project (`proj-pixel-paint`) in `pt.json`: add `demo.videoDemos` with one entry (PixelPaint.mp4), add `deployLink` (https://eduardanunes.github.io/Pixel-Paint/), keep existing `repoLink`. Verify.
- [x] 3.5 Update Esbugalhado project (`proj-esbugalhado`) in `pt.json`: add `demo.videoDemos` with one entry (Esbugalhado.mp4), add `deployLink` (https://eduardanunes.github.io/esbugalhado-o-jogo/), keep existing `repoLink`. Verify.
- [x] 3.6 Update React Tic Tac Toe project (`proj-react-tic-tac-toe`) in `pt.json`: add `demo.videoDemos` with one entry (TicTacToe.mp4), add `repoLink` (https://github.com/EduardaNunes/React-Tic-Tac-Toe), add `deployLink` (https://eduardanunes.github.io/React-Tic-Tac-Toe/). Verify.
- [x] 3.7 Update Bubble Trouble project (`proj-bubble-trouble`) in `pt.json`: add `repoLink` (no video file available), keep empty `images` array for backward compatibility. Verify.
- [x] 3.8 Verify all `pt.json` project entries have consistent structure and validation passes.

## 4. Content Population - English (eng.json)

- [x] 4.1 Update ProgramADA project (`proj-programada`) in `eng.json` with same `videoDemos` structure as pt.json (English captions/alt text). Verify.
- [x] 4.2 Update Mage Battle project (`proj-air-sea-battle`) in `eng.json` with `videoDemos` and `repoLink`. Verify.
- [x] 4.3 Update Snow Battle project (`proj-snow-battle`) in `eng.json` with `videoDemos` and `repoLink`. Verify.
- [x] 4.4 Update Pixel Paint project (`proj-pixel-paint`) in `eng.json` with `videoDemos`, `deployLink`, `repoLink`. Verify.
- [x] 4.5 Update Esbugalhado project (`proj-esbugalhado`) in `eng.json` with `videoDemos`, `deployLink`, `repoLink`. Verify.
- [x] 4.6 Update React Tic Tac Toe project (`proj-react-tic-tac-toe`) in `eng.json` with `videoDemos`, `repoLink`, `deployLink`. Verify.
- [x] 4.7 Update Bubble Trouble project (`proj-bubble-trouble`) in `eng.json` with `repoLink`, keep empty `images` array for backward compatibility. Verify.
- [x] 4.8 Verify all `eng.json` project entries have consistent structure and validation passes.

## 5. Verification & Integration Testing

- [x] 5.1 Run content validation script (`npm run validate:content`) and confirm zero errors. Verify validation passes.
- [x] 5.2 Build passes (`npm run build`) and validation passes - confirms all content structure is correct.
- [x] 5.3 ProgramADA project has `videoDemos` array with two entries in correct vertical order (Sala de Aula → Minigame Café) each with deploy links.
- [x] 5.4 Both pt.json and eng.json have identical structure with localized captions/alt text.
- [x] 5.5 No regressions in other sections (validated by content validation passing for all markers).

## 6. Missing Assets Report

- [x] 6.1 Document any videos referenced in content but missing from `public/Videos/` (expected: Bubble Trouble has no video).
- [x] 6.2 Document any GitHub/deploy links that couldn't be matched to projects.
- [x] 6.3 Provide final summary list to user.

## Workflow follow-up

- [ ] Archive the change after implementation is complete and verified.
- [ ] Verify the archived result.