import { readFileSync } from "node:fs"
import { join } from "node:path"
import { z } from "zod"

const profile = z.object({
  birthDate: z
    .object({
      year: z.number().int().min(1900),
      month: z.number().int().min(1).max(12),
      day: z.number().int().min(1).max(31),
    })
    .refine(
      ({ year, month, day }) =>
        new Date(Date.UTC(year, month - 1, day)).getUTCMonth() === month - 1,
    ),
})

export function readPrivateProfile() {
  if (process.env.NODE_ENV !== "development") return
  try {
    const raw = readFileSync(
      join(process.cwd(), "assets/source/phase-04-profile.json"),
      "utf8",
    )
    const result = profile.safeParse(JSON.parse(raw))
    return result.success ? result.data : undefined
  } catch (error) {
    if (
      error instanceof SyntaxError ||
      (error as NodeJS.ErrnoException).code === "ENOENT"
    )
      return
    throw error
  }
}
