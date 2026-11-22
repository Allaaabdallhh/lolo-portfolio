# Rose Circuit design system

## Color

`src/styles/tokens.css` is the palette source. Tailwind utilities and shadcn components resolve to the same variables.

| Role                      | Color                             | Use                                 |
| ------------------------- | --------------------------------- | ----------------------------------- |
| Background                | `#FCF9F7`                         | Page canvas                         |
| Surface                   | `#FFFFFF`                         | Cards and controls                  |
| Elevated                  | `#FFFDFB`                         | Raised surfaces                     |
| Ink                       | `#29252C`                         | Primary text                        |
| Muted text                | `#746C74`                         | Supporting copy on light surfaces   |
| Primary / on primary      | `#753B51` / `#FFFFFF`             | Primary actions and links           |
| Blush                     | `#F3E4E7`                         | Secondary surfaces                  |
| Muted rose                | `#D8A7B1`                         | Decorative traces and surfaces      |
| Champagne                 | `#C5A47E`                         | Plaque accents                      |
| Border / control border   | `#E8DADD` / `#9B7E88`             | Hairlines and actionable boundaries |
| Focus                     | `#984867`                         | Visible keyboard outline            |
| Success / warning / error | `#2E654A` / `#805716` / `#A43B44` | Status text with explicit labels    |

Use muted rose and champagne for decoration. Pair foreground tokens with their assigned surfaces. Keep readable labels on all states and preserve the focus outline when extending a control. Checked WCAG contrast ratios include ink on canvas (14.36:1), muted text on canvas (4.84:1), muted text on white (5.07:1), primary action text (8.40:1), focus outline on canvas (5.79:1), and control border on canvas (3.49:1).

## Typography and layout

The display scale is fluid, from Display XL and LG through headings 1–3. Manrope covers body LG, base, SM, caption, and label. IBM Plex Sans Arabic loads when a matching language run is rendered. Use an explicit language and direction on Arabic content. The default content area caps at 1,200px inside fluid gutters. Shared variables control section space, card padding, grid gaps, navigation height, and layer order. Grid defaults to one column below 640px, two from 640px, and three from 1024px.

## Components

- Layout primitives provide container width, section landmarks, heading hierarchy, divider, and visually hidden labels.
- Button variants cover primary, secondary, outline, ghost, destructive, and link. Use IconButton with an accessible name. Use Chip and StatusBadge for concise metadata and status.
- Radix provides keyboard interactions for navigation, dialog, and tooltip. Every dialog needs a title and description. Tooltip text supplements a control's accessible name.
- Circuit Frame uses corner traces and glow. Editorial Portrait includes a caption and offset border. Gallery Plaque reserves space for issuer and a validated HTTPS verification link. Feature Case Study includes metadata and a project action. Timeline Rail preserves list order in both layouts.
- ImageFrame requires an explicit alt value, dimensions, and responsive sizes. Use an empty alt value for an image whose information is fully redundant.

## Motion and accessibility

Use Motion for small pointer interactions and GSAP with ScrollTrigger for finite scroll reveals. Keep both engines on separate elements. Typical durations are 180, 280, and 600 ms. Reveals start close to their resting position and remain legible throughout. CSS and client motion honor the operating-system preference. Use keyboard navigation, a visible focus outline, semantic landmarks, responsive media, and explicit disabled states. Content remains in the server HTML before scripts run.

## Performance targets

Target Lighthouse Performance 90+, Accessibility 95+, Best Practices 95+, and SEO 95+ on the finished public homepage. Measure the production build with mobile Lighthouse defaults and record the browser, throttling, route, and median of three cold runs before claiming a score.

## LOLO Phase 04 editorial system

LOLO uses the black, off-white and orange palette in `src/styles/lolo.css`, with a dedicated editorial layer in `src/styles/lolo-story.css`. Section indexes receive a number from the explicit `loloSectionOrder`, a localized label and a heading ID. The outlined desktop number becomes a compact solid number on phones. The story bridge and education rail share the same thin orange rule.

The About portrait has a 3:4 frame with an orange double-corner detail and a grid of four private statistics. Desktop places the portrait beside the biography. Mobile places the narrative first, the portrait second, and the two-column milestones last. Institution images use controlled mattes and contain framing. The academy graphic rests on a light matte to preserve the printed design.

The timeline preserves chronological DOM order across layouts. Photo reveals run once as cards enter the viewport and the rail signal uses document scrolling for its position. Reduced-motion and no-script sessions retain the visible content and chronological order.

## LOLO Phase 05 cinematic refinements

Intro, The Story, Education, Certificates, Contact and Closing use the same index component and locale keys. The shared color and typography tokens remain in `src/styles/lolo.css`. The desktop active navigation rule slides between measured link bounds. Keyboard location is reflected by focus and the current location by `aria-current`.

Hero portrait movement is capped at six pixels and two degrees per axis. It resets when the pointer leaves or the page stops being visible. The sequence uses the same portrait cutout, letter mask and one orange sweep. Reduced motion renders all content immediately and suppresses the pointer transform and scroll reveals.

Education has a centered circuit rail and staggered columns from 56rem up, with a side rail and single column below. The school photos keep their real colors, responsive sizes and semantic labels. The full-photo reader exposes the uncropped image and restores focus on dismissal. The graduation graphic keeps its Information Systems Center credit. Certificate plaques use the original credential thumbnails, and wider readers put the full image alongside its metadata. Contact uses a warm matte matching the About portrait and footer borders.

## Three-phase roadmap Phase 1

The Engineering Toolbox uses dark teal frames and an SVG circuit trace. Programming occupies the largest cell, while hardware and topics occupy shorter neighboring cards. The disclosures are available by keyboard and touch. On a fine pointer, each frame can show a subtle local radial light. Reduced motion leaves the trace, cards, and all content visible.

Featured Projects uses steel-blue framing and a one-time scroll-linked image mask. The illustration caption remains visible in the feature and reader. The case study stacks below 48rem and shares the project's existing dialog focus and Escape behavior.

The Hero pairing uses a gold rim, orange name sweep and an opposing title offset capped at three pixels. Education retains the original orange rail and adds a fill synchronized with the gold node. On mobile the rail stays at the leading edge. Cards preserve legible signs and open their complete source images.
