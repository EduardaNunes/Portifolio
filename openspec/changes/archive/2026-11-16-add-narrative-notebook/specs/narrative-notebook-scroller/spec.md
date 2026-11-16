# Spec Delta

## Purpose

Controls the two-section scroll experience: the document stays locked until the first Play activation, then snaps one full viewport at a time with smooth movement, hidden scrollbars and no horizontal document scroll.

## ADDED Requirements

### Requirement: Auto-scroll on play button click with full-snap transition
**When** user clicks the Play button in the header section  
**Then** the document MUST unlock and the page MUST scroll downward by exactly 100vh to the notebook content section, using smooth ease-out transition (300-500ms duration), snapping to viewport boundary so only ONE section is visible at a time - never overlapping  

#### Scenario: Initial scroll to content section
- **WHEN** the page has only the header/clouds section visible and user clicks Play
- **THEN** the document unlocks and viewport scrolls down 100vh to reveal the top of the notebook content section, with snap ensuring full-screen transition

#### Scenario: Scroll transition completes at boundary
- **WHEN** auto-scroll animation finishes
- **THEN** scroll position has a multiple of 100vh offset from start (modulo tolerance of ±5px), next scroll snap event can trigger

#### Scenario: No section overlap during transition
- **WHEN** auto-scroll is in progress
- **THEN** only one section is ever fully visible; previous section fades out before new one fades in

### Requirement: Initial scroll lock until Play
Before the first Play activation, the document MUST NOT scroll in any direction. Play is the only entry point to the content section. After the first activation, scrolling stays unlocked for the rest of the session.

#### Scenario: Page loads locked at the top
- **WHEN** the page loads for the first time
- **THEN** the document is positioned at the top and attempts to scroll with wheel, keyboard or touch do not move it

#### Scenario: Play unlocks scrolling
- **WHEN** the user clicks Play for the first time
- **THEN** scrolling is unlocked and the page scrolls to the notebook section

#### Scenario: Unlocked scrolling is permanent for the session
- **WHEN** the user scrolls back up to the header after opening the notebook
- **THEN** the page can scroll down and up again as many times as desired, without pressing Play again

#### Scenario: Reload restores the lock
- **WHEN** the page is reloaded
- **THEN** the document starts locked at the top until Play is clicked again

### Requirement: Viewport snap scrolling
**When** user scrolls or programmatically scrolls the page  
**THEN** scroll MUST snap to nearest viewport boundary with CSS scroll-snap enabled  

#### Scenario: User scrolls downward past midpoint
- **WHEN** user scrolls past 50% of the way to the next section
- **THEN** scroll snaps to that next section immediately

#### Scenario: Auto-scroll targets exact boundary
- **WHEN** auto-scroll animation completes
- **THEN** final scroll position has a multiple of 100vh offset from start (modulo tolerance of ±5px)

### Requirement: Smooth scroll behavior
**When** any scrolling operation occurs (user input or programmatic)  
**THEN** scrolling MUST use the browser's native smooth scrolling with CSS `scroll-behavior: smooth`  

#### Scenario: Scroll direction reverses mid-animation
- **WHEN** auto-scroll is in progress and user scrolls upward quickly
- **THEN** scroll behavior transitions smoothly to user-initiated upward scroll

### Requirement: Scroll container isolation
**When** page contains multiple scrollable areas  
**THEN** only the main content area MUST respond to snap scrolling; fixed/sticky elements remain visible  

#### Scenario: Fixed header overlay during scroll
- **WHEN** user is viewing notebook content section (after auto-scroll)
- **THEN** original header remains accessible via fixed positioning and overlays as needed

### Requirement: Hidden scrollbars and vertical-only document scroll
The document scroll container MUST hide its scrollbars at all times, MUST clip horizontal overflow, and MUST keep `scroll-snap-type: y mandatory` between the two sections once unlocked.

#### Scenario: No scrollbars are visible
- **WHEN** the user scrolls the unlocked document in either direction
- **THEN** no vertical or horizontal scrollbar is rendered

#### Scenario: Horizontal document movement is blocked
- **WHEN** the user attempts a horizontal drag or trackpad gesture
- **THEN** the document does not move sideways and the vertical snap remains intact

### Requirement: Mouse wheel moves one section per gesture
When the document is unlocked, a mouse-wheel gesture MUST move to the next or previous section using the same smooth movement as Play. A gesture moves exactly one section, and a leaf that can still scroll in that direction keeps its internal scroll until the leaf reaches its edge.

#### Scenario: Wheel down advances one section
- **WHEN** the user performs a downward wheel gesture on the header or on a leaf already at its bottom edge
- **THEN** the document moves to the next section exactly once

#### Scenario: Wheel up returns one section
- **WHEN** the user performs an upward wheel gesture on the notebook section or on a leaf already at its top edge
- **THEN** the document moves to the previous section exactly once

#### Scenario: Long leaf keeps the wheel
- **WHEN** the pointer is over a notebook leaf that can still scroll in the wheel direction
- **THEN** the leaf scrolls internally and the document section does not change

#### Scenario: Wheel is inert before Play
- **WHEN** the document is still locked and the user performs a wheel gesture
- **THEN** neither the document nor the notebook moves

## MODIFIED Requirements

## REMOVED Requirements
