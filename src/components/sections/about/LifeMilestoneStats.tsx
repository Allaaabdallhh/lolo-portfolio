"use client"

import { Award } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion"
import { storyCopy } from "@/i18n/lolo-story"
import type { LoloLocale } from "@/i18n/lolo"
import {
  cairoDate,
  calendarDay,
  nextCairoMidnight,
  type CalendarDate,
} from "@/lib/dates/cairo-calendar"
import { lifeMilestones } from "@/lib/dates/life-milestones"

function useCairoToday() {
  const [today, setToday] = useState<CalendarDate | null>(null)

  useEffect(() => {
    let timer: number
    const refresh = () => {
      window.clearTimeout(timer)
      const now = new Date()
      const date = cairoDate(now)
      setToday((previous) =>
        previous && calendarDay(previous) === calendarDay(date)
          ? previous
          : date,
      )
      timer = window.setTimeout(
        refresh,
        nextCairoMidnight(now) - now.getTime() + 40,
      )
    }
    const onVisible = () => {
      if (!document.hidden) refresh()
    }
    timer = window.setTimeout(refresh, 0)
    document.addEventListener("visibilitychange", onVisible)
    window.addEventListener("focus", refresh)
    return () => {
      window.clearTimeout(timer)
      document.removeEventListener("visibilitychange", onVisible)
      window.removeEventListener("focus", refresh)
    }
  }, [])

  return today
}

export function LifeMilestoneStats({
  locale,
  birthDate,
  credentials,
}: {
  locale: LoloLocale
  birthDate: CalendarDate
  credentials: number
}) {
  const { stats } = storyCopy[locale]
  const reduced = usePrefersReducedMotion()
  const today = useCairoToday()
  const values = useMemo(
    () => (today ? lifeMilestones(today, birthDate, credentials) : null),
    [today, birthDate, credentials],
  )
  const numbers = useMemo(() => new Intl.NumberFormat(locale), [locale])
  const grid = useRef<HTMLDListElement>(null)
  const played = useRef(false)

  useEffect(() => {
    const root = grid.current
    if (
      !root ||
      !values ||
      reduced ||
      played.current ||
      !("IntersectionObserver" in window)
    )
      return
    let frame = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        played.current = true
        const start = performance.now()
        const fields = Array.from(
          root.querySelectorAll<HTMLElement>("[data-stat-value]"),
        )
        const paint = (now: number) => {
          const t = Math.max(0, Math.min((now - start) / 560, 1))
          for (const element of fields) {
            const exact = Number(element.dataset.statValue)
            element.textContent = numbers.format(
              Math.round(exact * (1 - (1 - t) ** 3)),
            )
          }
          if (t < 1) frame = requestAnimationFrame(paint)
        }
        frame = requestAnimationFrame(paint)
      },
      { threshold: 0.15 },
    )
    observer.observe(root)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      root
        .querySelectorAll<HTMLElement>("[data-stat-value]")
        .forEach((element) => {
          element.textContent = numbers.format(
            Number(element.dataset.statValue),
          )
        })
    }
  }, [values, reduced, numbers])

  const entries = [
    { key: "age", label: stats.age, value: values?.age },
    { key: "days", label: stats.lived, value: values?.daysSinceBirth },
    {
      key: "birthday",
      label: stats.birthday,
      value: values?.daysUntilNextBirthday,
    },
    { key: "credentials", label: stats.credentials, value: credentials },
  ]
  const birthday = values?.nextBirthday
  const birthdayLabel =
    birthday &&
    new Intl.DateTimeFormat(locale, {
      dateStyle: "medium",
      timeZone: "UTC",
    }).format(
      new Date(Date.UTC(birthday.year, birthday.month - 1, birthday.day)),
    )

  return (
    <div className="lolo-milestones">
      <h3>{stats.title}</h3>
      <dl ref={grid} className="lolo-milestone-grid">
        {entries.map(({ key, label, value }) => {
          const rendered = value === undefined ? "—" : numbers.format(value)
          return (
            <div key={key} className="lolo-milestone" data-stat={key}>
              <dt>
                {key === "credentials" && (
                  <Award size={15} aria-hidden="true" />
                )}
                {label}
              </dt>
              <dd>
                <span className="sr-only">{rendered}</span>
                <span data-stat-value={value} aria-hidden="true">
                  {rendered}
                </span>
                {key === "birthday" && birthdayLabel && (
                  <small>
                    {value === 0 ? stats.celebration : birthdayLabel}
                  </small>
                )}
              </dd>
            </div>
          )
        })}
      </dl>
      <p>{stats.note}</p>
    </div>
  )
}
