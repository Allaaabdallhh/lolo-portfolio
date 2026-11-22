import { describe, expect, it } from "vitest"
import { countCompletedCertificates } from "@/data/certificates"

describe("completed certificates", () => {
  it("counts the two supplied records", () => {
    expect(countCompletedCertificates()).toBe(2)
  })

  it("excludes planned and unfinished records", () => {
    expect(
      countCompletedCertificates([
        { status: "planned" },
        { status: "pending" },
        { status: "in-progress" },
        { status: "completed" },
      ]),
    ).toBe(1)
  })
})
