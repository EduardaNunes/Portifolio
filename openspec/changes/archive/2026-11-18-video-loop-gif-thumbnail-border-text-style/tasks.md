# Tasks

## 1. Video Autoplay Changes (Thumbnail.jsx)

- [x] 1.1 Remove `controls` prop from `<video>` element in `src/components/notebook-content/Thumbnail.jsx` and verify video no longer shows native controls
- [x] 1.2 Add `autoPlay` and `playsInline` props to `<video>` element and verify video autoplays on mount in browser
- [x] 1.3 Confirm `loop` and `muted` props remain and verify video loops continuously and stays muted

## 2. Stepped-Corner Border Styles (index.css)

- [x] 2.1 Create a reusable clip-path polygon for 3px stepped corners (matching `.page-note`) as a CSS custom property or utility class in `src/styles/index.css`
- [x] 2.2 Update `.project-thumbnail` to use the stepped-corner clip-path with `border: 1px solid var(--page-ink)` and verify both images and videos show the border
- [x] 2.3 Increase fallback `border-radius` from 6px to 8px on `.project-thumbnail` and verify rounded corners appear when clip-path is unsupported
- [x] 2.4 Ensure `.project-thumbnail` background remains `#f3efe8` (or transparent for videos) and verify no visual regression

## 3. Cross-Theme Verification

- [x] 3.1 Toggle between dark and light themes and verify thumbnail border color updates to match `--page-ink` in both themes
- [x] 3.2 Verify video autoplay behavior works identically in both themes

## 4. Integration Testing

- [x] 4.1 Navigate to a project spread with a video demo and verify: video autoplays, loops, muted, no controls, stepped-corner border visible
- [x] 4.2 Navigate to a project spread with an image demo and verify: image displays with stepped-corner border, no play overlay regression
- [x] 4.3 Test on mobile viewport (or device toolbar) and verify video plays inline (no fullscreen), border renders correctly
- [x] 4.4 Verify existing project thumbnails (career, studies, etc. if any use Thumbnail) still render correctly

## 5. Accessibility Check

- [x] 5.1 Verify `aria-label` on video still provides accessible name
- [x] 5.2 Confirm no keyboard traps introduced (video has no controls, but tab order should skip it naturally)
- [x] 5.3 Verify `prefers-reduced-motion` media query does not conflict (video autoplay is not an animation per se; no change needed but confirm)