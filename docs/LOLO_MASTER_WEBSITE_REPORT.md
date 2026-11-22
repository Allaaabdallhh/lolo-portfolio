# LOLO master website enhancement

## Baseline

The existing `pnpm dev` server answered on [HTTPS port 3000](https://localhost:3000/) before implementation. The live starting page already used the requested photo mapping. The largest gaps were a flat skills panel rhythm, a project feature without depth or problem context, and a graduation story with unverified details and no usable ceremony image.

## Changes

- Hero retains the original blue-dress cutout, independent name and ambient layers, and the one-pass light sweep. Pointer rotation is capped at 3.4 degrees per axis. Touch and reduced-motion users get the stable composition.
- About keeps the brown-dress photo and frames the biography around the documented degree and project contribution. The date and certificate counters use the existing data and privacy rules.
- Skills still has 13 individually expandable cards. The cards use larger icon wells, distinct engineering symbols, localized evidence labels, and a brief focus or hover edge sweep. Java and Arduino have neutral glyphs. Focus Area copy was aligned with the same evidence.
- The warehouse case study has a wider concept illustration, an automation context, and a small fine-pointer perspective. The documented servo motors and drivers remain visible. Original project photos, results and a repository URL remain unavailable.
- The new graduation feature pairs the 2025 milestone with three authentic school images and four documented education stages. It omits unverifiable course durations, ceremony details and claims about grades or awards. The final Academy stage uses typography and does not repurpose the Information Systems Center mark.
- Footer retains the white-suit portrait and the centered LOLO signature. A desktop technology marquee has a pause and resume control. The same six technologies appear in a static row for reduced-motion or mobile users.
- Personal portraits, contact details and date-based profile counters follow the existing private-preview rules.

## Evidence

Before and after captures are in `artifacts/lolo-qa/master-enhancement/{before,after}`, including 360, 390, 768, 1024 and 1440px. The captures are ignored by Git because they include personal preview content. This phase is local. GitHub review is documented separately.

- The HTTPS server remained active and both locale routes returned 200. A temporary CSS property appeared and disappeared in the same document over hot reload.
- Strict TypeScript, ESLint, formatting, production build, 31 Vitest tests and 31 Playwright tests passed. This includes the three portrait placements, the accessible graduation path, the project dialog, and the marquee pause and reduced-motion controls.
- Chromium screenshots matched the five required widths without horizontal overflow. The sampled axe checks reported no violations. The synthetic full-page capture emitted a dev LCP hint for the lazy About photo after scrolling into the section; the photo decodes and is intentionally lazy on the initial home view. No Lighthouse run was performed.
