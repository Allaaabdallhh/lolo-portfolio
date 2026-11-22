"use client"

import { motion } from "motion/react"
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion"
import { SectionIndex } from "@/components/layout/SectionIndex"
import { loloSectionOrder } from "@/config/lolo-sections"
import { focusAreas } from "@/data/focus"
import { focusCopy } from "@/i18n/lolo-focus-graduation"
import type { LoloLocale } from "@/i18n/lolo"

const icons = {
  code: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  cpu: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
      <path d="M9 1h6v2H9V1Zm0 21h6v2H9v-2Zm-9 0h2v2H9v-2Zm21 0h2v2h-2v-2Z" />
    </svg>
  ),
  network: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="2" />
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  ),
  settings: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  ),
  lightbulb: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M12 2a6 6 0 0 0-6 6v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a6 6 0 0 0-6-6Z" />
      <path d="M12 22v-2" />
    </svg>
  ),
  brain: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M12 2a4 4 0 0 0-4 4c0 1.1.9 2 2 2s2-.9 2-2a4 4 0 0 1 8 0c0 1.1.9 2 2 2s2-.9 2-2a4 4 0 0 0-4-4Z" />
      <path d="M6 10a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-8Z" />
      <path d="M9 14h6M9 18h6" />
    </svg>
  ),
} as const

export function FocusAreasSection({ locale }: { locale: LoloLocale }) {
  const copy = focusCopy[locale]
  const reducedMotion = usePrefersReducedMotion()

  return (
    <section
      id="focus"
      className="lolo-focus-section"
      aria-labelledby="focus-heading"
    >
      <div className="lolo-wrap lolo-focus-inner">
        <SectionIndex
          number={loloSectionOrder.focus}
          label={copy.index}
          headingId="focus-heading"
        />
        <header className="lolo-focus-heading">
          <h2 id="focus-heading">{copy.title}</h2>
          <p>{copy.intro}</p>
        </header>
        <div className="lolo-focus-grid" role="list">
          {focusAreas.map((area, index) => {
            const itemCopy = copy.items[area.id]
            const Icon = icons[area.icon as keyof typeof icons]
            return (
              <motion.article
                key={area.id}
                className="lolo-focus-card"
                role="listitem"
                initial={reducedMotion ? false : { opacity: 0, y: 30 }}
                animate={reducedMotion ? false : { opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                }}
              >
                <div className="lolo-focus-card-inner">
                  <div className="lolo-focus-icon" aria-hidden="true">
                    {Icon}
                  </div>
                  <h3>{itemCopy.title}</h3>
                  <p>{itemCopy.desc}</p>
                  <ul className="lolo-focus-tags" aria-label={itemCopy.title}>
                    {itemCopy.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
                <div className="lolo-focus-glow" aria-hidden="true" />
              </motion.article>
            )
          })}
        </div>
        <a className="lolo-focus-bridge" href="#education">
          {copy.bridge}
        </a>
      </div>
    </section>
  )
}
