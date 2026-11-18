# Spec: Layout Position-Meta

## Purpose

Control the width allocation and wrapping behavior of position metadata (company name and dates) in the notebook layout, ensuring the institution name gets 80% width and dates get 20% width, with proper text wrapping when content exceeds allocated space.

## Requirements

### Requirement: Width Split for Position Meta

The `.position-meta` container SHALL allocate 80% width to the company name (`.position-company`) and 20% width to the dates (`.position-dates`) when displayed on the same line.

#### Scenario: Eighty/twenty width split on wide screens

- **WHEN** the screen width is greater than 600px
- **THEN** `.position-company` renders at 80% width and `.position-dates` renders at 20% width, displayed on the same line

#### Scenario: Eighty/twenty width split on narrow screens

- **WHEN** the screen width is 600px or less
- **THEN** `.position-company` and `.position-dates` each take full width (100%), stacked vertically, with `.position-company` appearing first

### Requirement: Text Wrapping for Long Institution Names

The `.position-company` SHALL use `overflow-wrap: anywhere` to allow long institution names like "Universidade Federal de Juiz de Fora - UFJF" to wrap to the next line when they exceed the allocated 80% width.

#### Scenario: Long institution name wraps properly

- **WHEN** the institution name exceeds the 80% width container
- **THEN** the text wraps to the next line without overflowing or overlapping with the dates

### Requirement: Dates Maintain 20% Width Constraint

The `.position-dates` SHALL maintain a maximum width of 20% of the parent container and SHALL NOT overflow beyond the available space.

#### Scenario: Dates respect 20% width limit

- **WHEN** the dates text is short (e.g., "Set 2023 — Jul 2027")
- **THEN** the dates occupy no more than 20% width and remain on the same line as the institution name

#### Scenario: Dates wrap when too long for 20% width

- **WHEN** the dates text is very long and cannot fit in 20% width
- **THEN** the dates wrap to the next line, still maintaining proper separation from the institution name