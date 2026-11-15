# Design

## Context

See [proposal.md](../proposal.md) - Why for motivation. The current portfolio has a single-section header view with theme toggle, language switcher, and animated clouds. This change introduces the second section with notebook-style navigation via scroll-snap behavior and page-turning animations.

## Goals / Non-Goals

**Goals:**
- Create smooth scroll-snap transition from header to content section (one viewport at a time)
- Implement notebook metaphor with left sidebar markers and right category tabs (for Projects section)
- Enable sequential navigation via corner clicks throughout all pages
- Support two-page project layouts with explicit deploy links on right page
- Maintain localization support (pt-BR/en) for all text content

**Non-Goals:**
- Touch swipe gestures (corner clicks only for desktop/mobile compatibility)
- Complex touch optimization beyond basic click handling
- Custom scroll libraries (use CSS scroll-snap + native browser APIs)

## Decisions

### Scroll Snap Implementation
**Decision**: Use CSS `scroll-snap-type: y mandatory` on container with `scroll-snap-align: start`  
**Rationale**: Native browser API, no dependencies, handles momentum scrolling naturally. Alternatives (IntersectionObserver for scroll detection) would add complexity without improving user experience.

### Page Layout Structure
**Decision**: Notebook container centers at ~80% viewport dimensions (max-width: 80vw, max-height: 80vh) maintaining aspect ratio; each page within = 100% of container width  
**Rationale**: Provides a more readable presentation that doesn't dominate the entire screen while preserving consistent behavior. Alternative: full-screen pages would feel overwhelming on wide screens and not preserve proportional balance.

### Marker Visibility Toggle Pattern
**Decision**: Only ONE marker invisible at a time - the current page's marker, all others visible  
**Rationale**: Provides clear visual feedback about current position while maintaining navigation affordances. This is different from typical accordion patterns where selected items hide their indicators.

### Deploy Link Positioning
**Decision**: Top-right area prominence with distinct styling and full URL clickable behavior  
**Rationale**: Follows common UI patterns for action buttons (top-right for secondary actions), maintains visual hierarchy on demo pages. Alternative: bottom-left would compete with corner navigation zone.

### Navigation via Corner Clicks
**Decision**: Left 15% of notebook width × bottom 60px = previous page, Right 15% of notebook width × bottom 60px = next page  
**Rationale**: Clear affordance relative to the centered notebook container that doesn't interfere with content (top portion displays projects/contacts), respects container boundaries within ~80% viewport. Alternative: full-screen edge detection would need to account for new centered layout.

### Two-Page Project Layout
**Decision**: Left page = metadata (title, description, tech stack, repo link); Right page = demo (video/image thumbnail + PLAY button overlay + EXPLICIT DEPLOY LINK)  
**Rationale**: Separates informational content from interactive preview. The deploy link on right page is essential for user reachability outside the portfolio.

### Category Filter Behavior
**Decision**: Category tabs in Projects section use same toggle pattern as left markers - clicking hides selected marker, shows previous selection  
**Rationale**: Maintains consistent interaction model throughout UI. User always sees one "active" category at a time.

## Risks / Trade-offs

[Risk: Scroll snap may conflict with fixed/sticky elements] → Mitigation: Use CSS `position: sticky` with proper overflow containment; ensure fixed header uses separate scrolling container if needed.

[Risk: Animation timing (300-400ms) may feel slow on fast connections] → Mitigation: Browser handles animation natively via CSS transitions; users can pause/abort via drag. Alternative would be JS-driven animations but that adds complexity.

[Risk: Deploy link visibility on right page may be obscured by video/image content] → Mitigation: Use overlay positioning with z-index layering above media elements; ensure sufficient padding from edges.

[Risk: Corner navigation zones may interfere with mobile gestures] → Mitigation: Zone dimensions (15% × 60px) are conservative enough to not conflict with standard swipe areas (bottom 100px minimum for iOS/Android).

## Migration Plan

### Deployment Steps
1. Create new React components in `src/components/NarrativeNotebook.jsx` with centered ~80% container and sub-components
2. Update `App.jsx` to include scroll container with `scroll-snap-type: y mandatory` and notebook section below Clouds component
3. Create project data structure in `src/data/projects.js` with category assignments
4. Style notebook container with CSS scroll-snap, centered layout (max-width: 80vw, max-height: 80vh), and page animations (CSS module or styled-component)
5. Update translations for new content areas if needed

### Rollback Strategy
If issues arise:
1. Revert commits to `openspec/changes/add-narrative-notebook/` and corresponding source files
2. Remove newly added components from `src/components/`
3. Restore original `App.jsx` structure without notebook section
4. Test basic portfolio functionality (header, clouds, theme toggle still work)

### Open Questions
- What exact styling should the deploy link use? (primary CTA vs secondary link?) → Pending design system review
- Should we implement lazy-loading for project images to improve initial paint? → Can be added later if performance testing shows issues
