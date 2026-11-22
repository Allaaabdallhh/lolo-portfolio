export const certificates = [
  {
    id: "course",
    status: "completed",
    title: "HCIA-AI V3.5 Course",
    issuer: "Huawei Talent Online",
    kind: "course",
    date: "2024-08-21",
    preview: { width: 388, height: 690 },
    full: { width: 591, height: 1052 },
  },
  {
    id: "attendance",
    status: "completed",
    title: "HCIA-AI Learning Course",
    issuer: "Huawei ICT Academy · SH.A.",
    kind: "attendance",
    from: "2024-08-04",
    to: "2024-08-15",
    preview: { width: 540, height: 300 },
    full: { width: 828, height: 460 },
  },
] as const

export function countCompletedCertificates(
  records: readonly {
    status: "completed" | "pending" | "in-progress" | "planned"
  }[] = certificates,
) {
  return records.filter(({ status }) => status === "completed").length
}
