# Design QA — Wirkung crop and official logo

## Evidence

- Source visual truth: `/workspace/scratch/9249fa83ee04/upload/45C95ED8-6739-43FE-8B7A-5B108EE30237.jpeg`
- Source pixels: 707 × 1536, iPhone screenshot at approximately 2× density; content region normalized to 354 × 586 CSS px for comparison.
- Implementation: browser-rendered local preview in the active cloud browser; mobile art-directed comparison at 354 × 586 CSS px and desktop verification at 1280 × 800 CSS px. The browser screenshot surface did not expose a persistent filesystem export path.
- State: `WIRKUNG BEGINNT JETZT` section, header visible, counters/reveals in final state.
- Combined comparison: source screenshot and mobile implementation were rendered together in one browser QA surface before cleanup.
- Focused comparison: the impact image, headline, CTA and header logo were large enough in the combined 354 px comparison; no additional crop was needed.

## Findings and comparison history

### Pass 1 — blocked

- [P1] The original mobile crop showed particles but hid almost the entire discus and impact point.
- [P2] The header used a CSS approximation instead of the supplied approved brand asset.

Fixes made:

- Split the mobile section into an upper image stage and lower copy stage, moved the focal point to the right, and added a controlled vertical fade.
- Preserved the cinematic full-width composition on desktop with a refined focal position.
- Replaced the CSS-drawn mark with the supplied gold transparent SVG signet from the customer's `[Logo]` folder and reused it for the favicon/footer.

### Pass 2 — passed

- Mobile evidence shows the complete discus face and visible ground impact above the headline without collision.
- Desktop evidence shows the full impact, readable copy, unobstructed CTA and balanced left/right composition.
- No actionable P0/P1/P2 visual issue remained in the changed scope.

## Required fidelity surfaces

- Fonts and typography: existing display/body system preserved; mobile headline line-height and wrapping remain readable with no overlap.
- Spacing and layout rhythm: mobile image/copy zones have a clear transition; desktop spacing remains unchanged except for the improved focal balance.
- Colors and tokens: dark/gold system preserved; official logo uses the supplied digital gold `#E1B975`.
- Image quality and asset fidelity: original high-resolution impact image retained; responsive crop is authored per breakpoint; official vector logo asset used.
- Copy/content: unchanged.

## Interactions and runtime

- Primary impact CTA rendered and remained available; the persistent mobile inquiry CTA stayed visible.
- Desktop navigation rendered correctly. Mobile menu code and opaque overlay were preserved outside the changed scope.
- Browser console: no site-origin errors; only an unrelated browser-extension metadata warning appeared during the QA wrapper run.
- Static JavaScript syntax check and whitespace check passed.

## Follow-up polish

- None required for this scoped adjustment.

final result: passed
