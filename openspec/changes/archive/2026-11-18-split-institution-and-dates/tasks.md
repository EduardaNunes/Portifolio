# Tasks

## 1. CSS Changes for Position-Meta Layout

- [x] 1.1 Update `.position-meta` CSS in `src/styles/index.css` to add explicit width percentages (65% for company, 35% for dates) and ensure flex shrink behavior
- [x] 1.2 Update `.position-company` to include `min-width: 0` and `overflow-wrap: anywhere` for proper text wrapping
- [x] 1.3 Update `.position-dates` to maintain `margin-left: auto` for right-alignment within the 35% width container
- [x] 1.4 Add media query for screens max-width: 600px to stack position-company and position-dates vertically at full width

## 2. Verification

- [x] 2.1 Verify the changes display correctly by running the development server and checking position-meta layout with long institution names
- [x] 2.2 Test that "Universidade Federal de Juiz de Fora - UFJF" wraps properly without overlapping the dates
- [x] 2.3 Verify the 65/35 width split on screens wider than 600px
- [x] 2.4 Verify vertical stacking on screens 600px or narrower without vertical gap
- [x] 2.5 Verify no white spaces at top of dates or bottom of institution name (padding removed)