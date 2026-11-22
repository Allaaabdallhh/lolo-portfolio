# Asset manifest

| Asset                                             | Status                         | Location or owner action                                                   |
| ------------------------------------------------- | ------------------------------ | -------------------------------------------------------------------------- |
| Portrait and About images                         | Pending                        | Provide approved photos and usage permission                               |
| Graduation imagery                                | Pending                        | Confirm photo ownership and consent before adding                          |
| Project media                                     | Pending                        | Provide approved screenshots and credits                                   |
| Certificates                                      | Pending                        | Confirm completed, in-progress, and planned entries and publication rights |
| CV                                                | Pending                        | Supply approved public document with private details reviewed              |
| Brand marks                                       | Pending                        | Approve the final identity and confirm rights to third-party marks         |
| Social preview                                    | Pending                        | Approve after public visual direction is established                       |
| Circuit illustration and favicon                  | Local development fixtures     | Original decorative artwork in `public/images/placeholders` and `src/app`  |
| Cormorant Garamond, Manrope, IBM Plex Sans Arabic | Vendored from Fontsource 5.3.0 | WOFF2 files and accompanying SIL Open Font Licenses in `src/app/fonts`     |

The fixture images contain no personal materials or credentials. Use approved dimensions, alt text, captions where useful, and responsive derivatives when adding real content.

## LOLO Phase 04 provenance

All five images came from the owner-provided `LOLO_PHASE_04_VISUAL_STORY_PACKAGE`. The unmodified source files remain in its local `source-assets` directory. The package directory is ignored by Git because it also contains personal material.

| Supplied original            | Verified role                                                               | Delivery location                                                                                              |
| ---------------------------- | --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `QS.jpg`                     | Al-Qanah Mixed Primary School sign                                          | `public/images/about/primary-al-qanah.webp`                                                                    |
| `image(20261121-213902).png` | Suez Modern Girls Preparatory School gate and sign                          | `public/images/about/preparatory-modern-girls.webp`                                                            |
| `image(20261121-213717).png` | Suez Girls Secondary School entrance. The sign-based name is used publicly. | `public/images/about/secondary-suez-girls.webp`                                                                |
| `image(20261121-214030).png` | El Shorouk Academy Information Systems Center reference graphic             | `public/images/about/shorouk-academy-reference.webp`                                                           |
| `IMG-20261121-WA0010.jpg`    | Formal navy outfit editorial portrait, used in About                        | Local `assets/hero/alaa-editorial-portrait.webp` and resized 480px and 720px WebPs, served in development only |

The four institutional WebPs are copied byte-for-byte from the supplied derivatives and use Next.js responsive optimization. The private portrait uses the supplied 960 × 1280 master and proportional 480 × 640 and 720 × 960 derivatives. The approved Hero cutout is separate and retained. Confirm rights to publish the institutional images and approval for personal materials prior to public deployment.

## LOLO Phase 05 Contact portrait

The owner-supplied `IMG-20261122-WA0000.jpg` is preserved byte-for-byte as `assets/source/phase-05-contact.jpg` (1086 × 1448). Contact uses cropped WebP derivatives from the same photograph at 480, 720 and 793 pixels wide. The portrait keeps the subject, candlelit steps and drapery, and is served only in development. No retouching or generative editing was applied. The approved Hero and About images, the four institutional images, and original certificate files retain their existing source paths.

## Three-phase roadmap Phase 1

See [asset sources and licenses](ASSET_SOURCES.md) for the Skills marks and the original Automatic Warehouse Logistics concept illustration. Hero and Education retain the owner-supplied source media. The case study's original project media is still pending.
