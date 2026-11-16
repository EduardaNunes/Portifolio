# Design

## Context

The cloud background is currently implemented in `src/components/Clouds.jsx` and styled via `.clouds` in `src/styles/index.css`. The `.clouds` section has `height: 100vh` and `position: absolute; top: 0; width: 100vw`, limiting it to one viewport height. The notebook section is a separate component (`NarrativeNotebook`) with its own `min-height: 100vh`.

## Goals / Non-Goals

**Goals:**
- Extend the cloud background to cover the full document height (approximately 200vh to cover both header and notebook sections)
- Maintain smooth cloud animation across the extended height
- Ensure clouds are visible behind both the header hero section and the notebook section
- Preserve existing cloud density and animation behavior

**Non-Goals:**
- Changing the number or density of clouds
- Modifying the cloud animation logic or speed
- Restructuring the notebook component or layout
- Adding new visual elements beyond the cloud background

## Decisions

- **Change `.clouds` height from `100vh` to `200vh`**: This extends the cloud layer to cover approximately two viewport heights, sufficient to span the header and notebook sections. The exact height may need adjustment based on total document height.
- **Keep `position: absolute; top: 0; width: 100vw`**: Maintain the existing positioning strategy so clouds remain fixed at the top of the document and span full width.
- **Adjust cloud top positions**: The individual cloud `top` values in `Clouds.jsx` are calculated as `${(100 / CLOUD_COUNT) * index}vh`. With the extended height, these will naturally distribute clouds across the taller background.
- **No change to cloud count**: Keep `CLOUD_COUNT = 20` to maintain the same visual density; clouds will be spread across a taller area.

## Risks / Trade-offs

- **[Risk] Clouds may appear too sparse if height is significantly increased**: Mitigation: Adjust `CLOUD_COUNT` or individual top positions if needed after implementation.
- **[Risk] Animation may look different at extended height**: Mitigation: Test the animation across both sections to ensure smoothness.
- **[Trade-off] Extending to 200vh is an estimate**: The actual needed height may vary; consider making it a CSS variable or adjusting based on actual document structure.