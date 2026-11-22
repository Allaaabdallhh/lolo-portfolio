export type CalendarDate = { year: number; month: number; day: number }

export const dayMs = 86_400_000

const cairoFormatter = new Intl.DateTimeFormat("en", {
  timeZone: "Africa/Cairo",
  calendar: "gregory",
  numberingSystem: "latn",
  year: "numeric",
  month: "numeric",
  day: "numeric",
})

export function cairoDate(now: Date): CalendarDate {
  const parts = cairoFormatter.formatToParts(now)
  const read = (part: "year" | "month" | "day") =>
    Number(parts.find(({ type }) => type === part)?.value)
  return { year: read("year"), month: read("month"), day: read("day") }
}

export function calendarDay({ year, month, day }: CalendarDate) {
  return Date.UTC(year, month - 1, day) / dayMs
}

export function nextCairoMidnight(now: Date) {
  const currentDay = calendarDay(cairoDate(now))
  let low = now.getTime()
  let high = low + 27 * 3_600_000
  while (high - low > 1) {
    const middle = Math.floor((low + high) / 2)
    if (calendarDay(cairoDate(new Date(middle))) === currentDay) low = middle
    else high = middle
  }
  return high
}
