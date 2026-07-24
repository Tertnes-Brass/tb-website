# Design QA — ultrawide hero scaling

## Comparison target

- Source visual truth: `/var/folders/70/2mznst7x2hgbt4nc49zm4f0m0000gn/T/codex-clipboard-f9ec10b4-cfe0-4da2-ba61-18fb855d743b.png`
- Normalized source crop: `/private/tmp/tb-hero-ultrawide-reference-crop.png`
- Implementation screenshot: `/private/tmp/tb-hero-ultrawide-dark-after.png`
- Full-view comparison: `/private/tmp/tb-hero-ultrawide-comparison.png`
- Focused typography comparison: `/private/tmp/tb-hero-ultrawide-focus-comparison.png`
- Route and state: `/`, dark theme
- CSS viewport: `3166 × 1340`
- Source crop pixels: `3166 × 1340`
- Implementation pixels: `3166 × 1340`
- Density normalization: screenshots were compared 1:1 because both artifacts matched the CSS viewport dimensions.

## Findings

- No actionable P0, P1, or P2 findings remain.
- The ultrawide heading now renders at `94.98px`, up from the previous desktop cap of `80px`, while preserving the intended four-line wrap.
- The content frame grows from `1200px` to `1600px` above `1600px`, moving the copy from the visually undersized centered column into the image's dark negative space.
- The hero grows to `896px` at the reference viewport, giving the enlarged copy enough vertical breathing room.
- Body copy renders at `22px`; buttons use `16.8px` text and a `56px` minimum height.
- The heading, lede, buttons, and facts remain clear of the primary pin faces.
- No horizontal overflow, blocking overlay, or browser console errors were found.

## Required fidelity surfaces

- Fonts and typography: Existing family, weight, letter spacing, and line height are preserved. The ultrawide scale and hierarchy now match the physical size of the hero.
- Spacing and layout rhythm: The larger content frame and hero height correct the excessive empty margin around the copy without changing desktop or mobile breakpoints.
- Colors and visual tokens: Theme tokens and contrast are unchanged in light and dark mode.
- Image quality and asset fidelity: The existing responsive WebP artwork remains untouched. Ultrawide dark mode loads `pins-stage-1600.webp`; mobile loads `pins-stage-960.webp`.
- Copy and content: Heading, body copy, calls to action, and facts are unchanged.

## Responsive evidence

- Ultrawide `3166 × 1340`: heading `94.98px`, hero `896px`, no horizontal overflow.
- Desktop `1440 × 900`: heading `74.88px`; the ultrawide rule does not apply.
- Mobile `390 × 844`: heading `46.8px`, stacked `4:3` image, no horizontal overflow.

## Interaction and runtime checks

- Theme toggle successfully switched from light to dark mode.
- “Se program” navigated to `/program/` and browser back returned to `/`.
- Browser console errors: none.
- Blocking dialogs or overlays: none.

## Comparison history

1. Initial P2: the text composition was visually undersized on the supplied ultrawide screenshot because the heading stopped scaling at `80px` and the content frame stopped at `1200px`.
2. Fix: added a `min-width: 100rem` layout tier with a `1600px` content frame, heading scaling up to `100px`, larger supporting copy and controls, and a hero height up to `896px`.
3. Post-fix evidence: the full-view and focused comparisons show a stronger text-to-image ratio while preserving the original copy, wrapping, colors, artwork, and interaction hierarchy.

## Follow-up polish

- P3: A dedicated panoramic source image could reduce the amount of vertical crop on extremely wide, short displays, but it is not required for the current text-scaling fix.

final result: passed
