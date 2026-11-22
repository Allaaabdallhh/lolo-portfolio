import { servePreviewImage } from "@/lib/lolo-preview-image"

export const dynamic = "force-dynamic"

export function GET(request: Request) {
  return servePreviewImage(request, "phase-03-portrait")
}
