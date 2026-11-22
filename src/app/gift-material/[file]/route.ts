import { readFile } from "node:fs/promises"
import { findGiftMaterial } from "@/lib/lolo-material"

export const dynamic = "force-dynamic"

export async function GET(
  _: Request,
  context: RouteContext<"/gift-material/[file]">,
) {
  if (process.env.NODE_ENV !== "development")
    return new Response(null, { status: 404 })
  const material = findGiftMaterial((await context.params).file)
  if (!material) return new Response(null, { status: 404 })
  try {
    return new Response(await readFile(material.path), {
      headers: {
        "Content-Type": material.type,
        "Cache-Control": "private, no-store",
        "X-Robots-Tag": "noindex",
        ...(material.type === "application/pdf"
          ? { "Content-Disposition": 'inline; filename="Alaa-Abdallah-CV.pdf"' }
          : {}),
      },
    })
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT")
      return new Response(null, { status: 404 })
    throw error
  }
}
