import { readFile } from "node:fs/promises"
import { hasGiftPortrait, portraitPath } from "@/lib/lolo-portrait"

export const dynamic = "force-dynamic"

export async function GET() {
  if (process.env.NODE_ENV !== "development" || !hasGiftPortrait())
    return new Response(null, { status: 404 })
  try {
    return new Response(await readFile(portraitPath), {
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "private, no-store",
        "X-Robots-Tag": "noindex",
      },
    })
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT")
      return new Response(null, { status: 404 })
    throw error
  }
}
