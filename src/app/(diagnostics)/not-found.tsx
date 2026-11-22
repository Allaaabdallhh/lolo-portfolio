import Link from "next/link"
import { Container, EditorialHeading } from "@/components/layout/primitives"

export default function NotFound() {
  return (
    <main id="main-content" className="py-(--section-space)">
      <Container className="space-y-4">
        <EditorialHeading as="h1" size="h1">
          Page not found
        </EditorialHeading>
        <Link
          href="/"
          className="inline-block font-semibold text-primary underline underline-offset-4"
        >
          Return home
        </Link>
      </Container>
    </main>
  )
}
