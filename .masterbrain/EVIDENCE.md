# Evidence — Lars Riedel Website 1.0.0

| Check | State | Evidence |
|---|---|---|
| Factory bootstrap | PASS | CAF 1.17.0, MasterBrain 4.6.1, BigBrain 1.1.0 loaded from current canonical Dropbox paths |
| Source facts | PASS | Sport Speaker profile, Olympics Atlanta 1996 result, published career overview checked 2026-09-11 |
| JavaScript syntax | PASS | `node --check dist/script.js` |
| Local asset integrity | PASS | all referenced PNG/WebP/SVG assets present and decodable |
| Desktop rendered layout | PASS | browser-rendered at 1363×936; all sections visited, images decoded, no horizontal overflow, hero safe area corrected |
| Mobile rendered layout | PASS | browser-rendered in a 390×844 synthetic viewport; long-display overflow fixed, horizontal movement blocked, sticky CTA visible |
| Mobile navigation | PASS | open state, accessible name, Escape close and body scroll lock verified |
| Funnel interaction | PASS | Business-Talk CTA set URL hash to `#anfrage` and preselected the correct form option |
| FAQ interaction | PASS | first disclosure opened from its summary control |
| Contrast | PASS | sampled WCAG contrast ratios: paper/ink 17.19:1, muted/ink 8.11:1, gold/ink 10.08:1 |
| Reduced motion | CODE REVIEW PASS | explicit `prefers-reduced-motion` rules remove motion and reveal content; OS-level emulation not run |
| Browser runtime | PASS | no page-origin runtime exception observed; one unrelated browser-extension metadata error ignored |
| Physical iPhone/Safari | NOT TESTED | viewport/browser simulation does not equal a physical device |
| Legal release | BLOCKED | final operator and mandatory legal details not supplied |
| Image/personality rights | BLOCKED | generated likeness requires Lars/management approval or replacement |
| Private deployment | PASS | version 1 published owner-private at `lars-riedel-speaker.o-some.chatgpt.site` |

## Candidate 1.1.0 — Diskus Visual Story

| Check | State | Evidence |
|---|---|---|
| CAF continuation | PASS | Existing-project route used; rollback branch `feat/diskus-visual-story`; no production deployment performed |
| New visual assets | PASS | Three person-free Diskus scenes generated, art-directed and delivered as responsive WebP pairs (27–96 KB) |
| Asset integrity | PASS | All six WebP variants decoded with expected dimensions; all page-local references resolved |
| JavaScript syntax | PASS | `node --check dist/script.js` |
| Desktop rendered layout | PASS | 1363×936 browser render; Keynote, Atlanta and trajectory scene inspected with zero horizontal overflow |
| Scroll choreography | PASS | Page progress, bounded parallax, orbit rotation, SVG trajectory drawing and travelling discus changed with scroll position |
| Reveal reliability | PASS | Browser-discovered clipped-element observer edge case fixed with a geometry-based scroll fallback |
| Mobile rendered layout | PASS | 390×844 synthetic viewport; responsive 900 px assets loaded, no horizontal movement, fixed conversion CTA retained |
| Mobile navigation | PASS | Open state and section navigation verified; menu closes after selection |
| Funnel interaction | PASS | Business-Talk CTA navigated to `#anfrage` and selected `Business-Talk` in the format field |
| Reduced motion | CODE REVIEW PASS | Final visual state, disabled parallax and completed trajectory encoded under `prefers-reduced-motion` |
| Browser runtime | PASS | No page-origin runtime errors; browser-extension metadata noise excluded |
| Production release | PASS | Successfully published owner-private at `https://lars-riedel-speaker.o-some.chatgpt.site` |
