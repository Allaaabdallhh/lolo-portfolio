import type { LoloSectionNumber } from "@/config/lolo-sections"

export function SectionIndex({
  number,
  label,
  chapter,
  headingId,
}: {
  number: LoloSectionNumber
  label: string
  chapter?: string
  headingId: string
}) {
  return (
    <div
      className="lolo-section-index"
      data-section-index={number}
      data-section-heading={headingId}
      aria-hidden="true"
    >
      <span className="lolo-section-number">{number}</span>
      <span className="lolo-section-slash">/</span>
      <span className="lolo-section-label">{label}</span>
      <span className="lolo-section-rule" />
      {chapter && <span className="lolo-section-chapter">{chapter}</span>}
    </div>
  )
}
