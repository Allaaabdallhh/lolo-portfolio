"use client"

import { useEffect, useState } from "react"
import { lolo, type LoloLocale } from "@/i18n/lolo"

export function cairoReading(date: Date, locale: LoloLocale) {
  const formatter = new Intl.DateTimeFormat(locale, {
    timeZone: "Africa/Cairo",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  })
  const hour = Number(
    formatter.formatToParts(date).find((part) => part.type === "hour")?.value,
  )
  const period =
    hour >= 18 || hour < 5 ? "evening" : hour < 12 ? "morning" : "afternoon"
  return {
    time: formatter.format(date),
    period,
    stamp: date.toISOString(),
  } as const
}

export function CairoTime({
  locale,
  kind,
}: {
  locale: LoloLocale
  kind: "greeting" | "clock"
}) {
  const [reading, setReading] = useState<ReturnType<
    typeof cairoReading
  > | null>(null)
  const copy = lolo[locale]

  useEffect(() => {
    const update = () => setReading(cairoReading(new Date(), locale))
    const initial = window.setTimeout(update, 0)
    const interval = window.setInterval(update, 1000 * 15)
    return () => {
      window.clearTimeout(initial)
      window.clearInterval(interval)
    }
  }, [locale])

  if (kind === "greeting")
    return (
      <>
        {copy.greeting[reading?.period ?? "afternoon"]} <strong>Alaa</strong>
      </>
    )

  return (
    <span className="lolo-clock">
      <span className="lolo-clock-dot" aria-hidden="true" />
      <span>{copy.cairoTime}</span>
      <time dateTime={reading?.stamp}>{reading?.time ?? "—"}</time>
    </span>
  )
}
