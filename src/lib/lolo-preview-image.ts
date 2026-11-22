import { existsSync } from "node:fs"
import { readFile } from "node:fs/promises"
import { join } from "node:path"

const directory = () => join(process.cwd(), "assets/hero")
type Portrait = "alaa-contact" | "phase-03-portrait" | "alaa-graduation"

export function hasPreviewImage(portrait: Portrait) {
  return (
    process.env.NODE_ENV === "development" &&
    existsSync(join(directory(), `${portrait}.webp`))
  )
}

export async function servePreviewImage(request: Request, portrait: Portrait) {
  if (process.env.NODE_ENV !== "development")
    return new Response(null, { status: 404 })

  const width = new URL(request.url).searchParams.get("w")
  const variant =
    portrait === "alaa-contact" && (width === "480" || width === "720")
      ? `-${width}`
      : ""
  try {
    return new Response(
      await readFile(join(directory(), `${portrait}${variant}.webp`)),
      {
        headers: {
          "Content-Type": "image/webp",
          "Cache-Control": "private, no-store",
          "X-Robots-Tag": "noindex",
        },
      },
    )
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT")
      return new Response(null, { status: 404 })
    throw error
  }
}
