import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { BrandLogo } from "@/components/brand/BrandLogo"
import { cairoReading } from "@/components/sections/hero/CairoTime"
import { LetterReveal } from "@/components/motion/LetterReveal"
import { lolo } from "@/i18n/lolo"

describe("LOLO branding and localization", () => {
  it.each(["dark", "light", "accent"] as const)(
    "serves the %s SVG with the requested accessible name",
    (variant) => {
      render(<BrandLogo variant={variant} label="LOLO at home" />)
      expect(screen.getByRole("img", { name: "LOLO at home" })).toHaveAttribute(
        "src",
        `/brand/lolo-${variant}.svg`,
      )
    },
  )

  it("gives split letters one accessible heading", () => {
    render(<LetterReveal lines={["ALAA", "ABDALLAH"]} />)
    expect(screen.getByRole("heading", { level: 1 })).toHaveAccessibleName(
      "ALAA ABDALLAH",
    )
  })

  it("keeps the English and German dictionary shapes aligned", () => {
    expect(Object.keys(lolo.de)).toEqual(Object.keys(lolo.en))
    expect(Object.keys(lolo.de.greeting)).toEqual(Object.keys(lolo.en.greeting))
    expect(Object.keys(lolo.de.certificates)).toEqual(
      Object.keys(lolo.en.certificates),
    )
    expect(lolo.de.role).toBe(
      "Ingenieurabsolventin für Computer- und Kommunikationstechnik",
    )
  })

  it.each([
    ["2026-01-15T05:00:00.000Z", "07:00", "morning"],
    ["2026-07-15T11:25:00.000Z", "14:25", "afternoon"],
    ["2026-01-15T19:10:00.000Z", "21:10", "evening"],
  ])(
    "formats %s in Cairo civil time for both locales",
    (stamp, time, period) => {
      for (const locale of ["en", "de"] as const)
        expect(cairoReading(new Date(stamp), locale)).toEqual({
          time,
          period,
          stamp,
        })
    },
  )
})
