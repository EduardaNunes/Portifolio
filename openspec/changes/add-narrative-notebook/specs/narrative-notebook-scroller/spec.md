# Spec Delta

## Purpose

Controls scroll-snap behavior and auto-scroll transition from the header section to the notebook content area, ensuring users always view one complete viewport at a time with smooth scrolling animation.

## ADDED Requirements

### Requirement: Auto-scroll on play button click with full-snap transition
**When** user clicks the Play button in the header section  
**Then** the page automatically scrolls downward by exactly 100vh to the notebook content section, using smooth ease-out transition (300-500ms duration), snapping to viewport boundary so only ONE section is visible at a time - never overlapping  

#### Scenario: Initial scroll to content section
- **WHEN** the page has only the header/clouds section visible and user clicks Play
- **THEN** viewport scrolls down 100vh to reveal the top of the notebook content section, with snap ensuring full-screen transition

#### Scenario: Scroll transition completes at boundary
- **WHEN** auto-scroll animation finishes
- **THEN** scroll position has a multiple of 100vh offset from start (modulo tolerance of ±5px), next scroll snap event can trigger

#### Scenario: No section overlap during transition
- **WHEN** auto-scroll is in progress
- **THEN** only one section is ever fully visible; previous section fades out before new one fades in

### Requirement: Viewport snap scrolling
**When** user scrolls or programmatically scrolls the page  
**THEN** scroll must snap to nearest viewport boundary with CSS scroll-snap enabled  

#### Scenario: User scrolls downward past midpoint
- **WHEN** user scrolls past 50% of the way to the next section
- **THEN** scroll snaps to that next section immediately

#### Scenario: Auto-scroll targets exact boundary
- **WHEN** auto-scroll animation completes
- **THEN** final scroll position has a multiple of 100vh offset from start (modulo tolerance of ±5px)

### Requirement: Smooth scroll behavior
**When** any scrolling operation occurs (user input or programmatic)  
**THEN** browser's native smooth scrolling is used with CSS `scroll-behavior: smooth`  

#### Scenario: Scroll direction reverses mid-animation
- **WHEN** auto-scroll is in progress and user scrolls upward quickly
- **THEN** scroll behavior transitions smoothly to user-initiated upward scroll

### Requirement: Scroll container isolation
**When** page contains multiple scrollable areas  
**THEN** only the main content area responds to snap scrolling; fixed/sticky elements remain visible  

#### Scenario: Fixed header overlay during scroll
- **WHEN** user is viewing notebook content section (after auto-scroll)
- **THEN** original header remains accessible via fixed positioning and overlays as needed

## MODIFIED Requirements

None

## REMOVED Requirements

None
