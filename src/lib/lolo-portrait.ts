import { existsSync } from "node:fs"
import { join } from "node:path"

export const portraitPath = join(
  process.cwd(),
  "assets",
  "hero",
  "alaa-navy-hero.webp",
)

export function hasGiftPortrait() {
  return process.env.NODE_ENV === "development" && existsSync(portraitPath)
}
