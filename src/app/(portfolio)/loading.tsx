import { Container } from "@/components/layout/primitives"

export default function Loading() {
  return (
    <main id="main-content">
      <Container className="py-(--section-space)">
        <p role="status">Loading page…</p>
      </Container>
    </main>
  )
}
