import type { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Foundation preview",
  robots: { index: false, follow: false },
}

export default async function FoundationPage() {
  if (process.env.NODE_ENV !== "development") notFound()
  const { FoundationPreview } = await import("./preview")
  return <FoundationPreview />
}
