# Tasks

## 1. Update Clouds component positioning

- [ ] 1.1 Review `src/components/Clouds.jsx` - understand current cloud generation and positioning logic
- [ ] 1.2 Modify `.clouds` CSS height from `100vh` to `200vh` in `src/styles/index.css` to extend background coverage
- [ ] 1.3 Verify cloud top positions distribute correctly across the extended height (20 clouds across ~200vh vs 100vh)
- [ ] 1.4 Test the visual result: ensure clouds are visible behind both header and notebook sections

## 2. Verify and test the change

- [ ] 2.1 Run the development server and confirm clouds span full document height
- [ ] 2.2 Scroll from header to notebook and verify visual continuity
- [ ] 2.3 Check cloud animation runs smoothly across the extended height
- [ ] 2.3 Ensure no clipping or visual artifacts at the header/notebook boundary