# Proposal

## Why

The institution name "Universidade Federal de Juiz de Fora - UFJF" is too long and overflows the container, overlapping with the date text (from/to) in the position metadata. The current layout does not properly separate the company name from the dates, causing visual clutter and readability issues.

## What Changes

- Modify the CSS `.position-meta` flex container to allocate 80% width to the company name and 20% width to the dates
- Add `overflow-wrap: anywhere` and appropriate width constraints to ensure text wrapping when content exceeds the allocated space
- Ensure the `.position-company` and `.position-dates` elements respect the 80/20 width split and wrap gracefully on narrow screens

## Capabilities

### New Capabilities

- `layout/position-meta`: Control the width allocation and wrapping behavior of position metadata (company name and dates) in the notebook layout

### Modified Capabilities

- (none - this change introduces new layout behavior)

## Impact

- CSS changes in `src/styles/index.css` affecting `.position-meta`, `.position-company`, and `.position-dates`
- No API changes or breaking changes
- Affects the visual presentation of educational/work experience entries in the portfolio