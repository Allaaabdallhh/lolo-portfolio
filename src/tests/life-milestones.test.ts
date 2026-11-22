import { describe, expect, it } from "vitest"
import {
  cairoDate,
  nextCairoMidnight,
  type CalendarDate,
} from "@/lib/dates/cairo-calendar"
import { lifeMilestones } from "@/lib/dates/life-milestones"

const date = (stamp: string): CalendarDate => {
  const [year, month, day] = stamp.split("-").map(Number)
  return { year, month, day }
}
const birth = date("2000-09-12")

describe("Cairo life milestones", () => {
  it.each([
    ["2000-09-12", 0, 0, 0, "2000-09-12"],
    ["2024-02-28", 23, 8569, 197, "2024-09-12"],
    ["2024-02-29", 23, 8570, 196, "2024-09-12"],
    ["2024-03-01", 23, 8571, 195, "2024-09-12"],
    ["2026-09-10", 25, 9494, 2, "2026-09-12"],
    ["2026-09-11", 25, 9495, 1, "2026-09-12"],
    ["2026-09-12", 26, 9496, 0, "2026-09-12"],
    ["2026-11-21", 26, 9566, 295, "2027-09-12"],
    ["2026-12-31", 26, 9606, 255, "2027-09-12"],
    ["2027-09-11", 26, 9860, 1, "2027-09-12"],
  ])(
    "counts full civil days and anniversaries for %s",
    (stamp, age, days, until, next) => {
      expect(lifeMilestones(date(stamp), birth, 2)).toEqual({
        age,
        daysSinceBirth: days,
        daysUntilNextBirthday: until,
        nextBirthday: date(next),
        completedCertificates: 2,
      })
    },
  )

  it.each([
    ["2026-01-20T21:59:59.900Z", "2026-01-20T22:00:00.000Z", "2026-01-21"],
    ["2026-05-23T20:59:59.000Z", "2026-05-23T21:00:00.000Z", "2026-05-24"],
    ["2026-04-23T21:44:00.000Z", "2026-04-23T22:00:00.000Z", "2026-04-24"],
  ])(
    "finds Cairo's next calendar rollover from %s",
    (stamp, rollover, next) => {
      const boundary = nextCairoMidnight(new Date(stamp))
      expect(new Date(boundary).toISOString()).toBe(rollover)
      expect(cairoDate(new Date(boundary))).toEqual(date(next))
      expect(cairoDate(new Date(boundary - 1))).not.toEqual(date(next))
    },
  )
})
