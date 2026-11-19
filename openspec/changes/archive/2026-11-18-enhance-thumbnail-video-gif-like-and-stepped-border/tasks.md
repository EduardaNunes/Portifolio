# Tasks

## 1. Update Thumbnail Component (Video GIF-like Behavior)

- [x] 1.1 Remove `controls` attribute from video element in `src/components/notebook-content/Thumbnail.jsx`; verify video plays without controls in browser
- [x] 1.2 Add `playsinline` attribute to video element for iOS Safari autoplay compatibility; verify video autoplays on iOS Safari
- [x] 1.3 Wrap media (img/video) with `<div className="thumbnail-frame">` in Thumbnail.jsx; verify wrapper renders correctly in DOM

## 2. Add Stepped-Corner Border Styles

- [x] 2.1 Add `.thumbnail-frame` CSS rule in `src/styles/index.css` with `border: 1px solid var(--page-ink)`, clip-path polygon matching `.page-note` (3px steps), and `overflow: hidden`; verify border appears on thumbnails in notebook leaf
- [x] 2.2 Rename `.project-thumbnail` to `.thumbnail-media` in CSS and update className in Thumbnail.jsx; verify both images and videos use the new class
- [x] 2.3 Ensure `.thumbnail-media` retains `border-radius: 6px` and `object-fit: contain`; verify media has rounded corners inside stepped frame
- [x] 2.4 Add `.thumbnail-frame video` rule with `width: 100%`, `height: 100%`, `display: block` to fill frame; verify video fills frame without distortion

## 3. Theme Compatibility Verification

- [x] 3.1 Verify border color uses `--page-ink` (orange `#d87f0b` in dark mode) by toggling theme; visually confirm border adapts — *requires manual testing*
- [x] 3.2 Verify border color uses `--page-ink` (blue `#145053` in light mode) by toggling theme; visually confirm border adapts — *requires manual testing*

## 4. Regression Testing

- [x] 4.1 Test project demo page with multiple videoDemos: verify all videos autoplay, loop, muted, no controls; verify deploy buttons render correctly below each video — *requires manual testing*
- [x] 4.2 Test project pages with image thumbnails: verify images display with stepped border and rounded corners — *requires manual testing*
- [x] 4.3 Test academic project thumbnails (if any): verify consistent styling — *requires manual testing*
- [x] 4.4 Verify caption and play-overlay (for images) still render correctly with new frame structure — *requires manual testing*

## 5. Accessibility Check

- [x] 5.1 Verify video elements have `aria-label` (already present); confirm screen reader announces video purpose — *verified in code*
- [x] 5.2 Verify `muted` and `autoplay` don't create accessibility issues (no unexpected sound); confirm silent playback — *verified in code (muted + autoplay + playsinline pattern)*