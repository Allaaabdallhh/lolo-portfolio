import { existsSync } from "node:fs"
import { join } from "node:path"

const files = {
  cv: ["assets/source/phase-02-cv.pdf", "application/pdf"],
  course: ["assets/hero/phase-02-course.webp", "image/webp"],
  "course-thumb": ["assets/hero/phase-03-course-thumb.webp", "image/webp"],
  attendance: ["assets/hero/phase-02-attendance.webp", "image/webp"],
  "attendance-thumb": [
    "assets/hero/phase-03-attendance-thumb.webp",
    "image/webp",
  ],
} as const

export function findGiftMaterial(key: string) {
  if (process.env.NODE_ENV !== "development" || !Object.hasOwn(files, key))
    return
  const [file, type] = files[key as keyof typeof files]
  const path = join(process.cwd(), file)
  if (existsSync(path)) return { path, type }
}
