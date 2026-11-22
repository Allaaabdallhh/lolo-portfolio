"use client"

import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRef, type ReactNode } from "react"

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function TimelineMotion({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const root = scope.current
      if (!root) return
      const media = gsap.matchMedia()
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const desktop = window.matchMedia("(min-width: 56rem)")
        const photos = root.querySelectorAll("[data-education-photo]")
        for (const [index, photo] of photos.entries()) {
          gsap.from(photo, {
            clipPath: "inset(0 0 8% 0)",
            opacity: 0.66,
            x: () => (desktop.matches ? (index % 2 ? 9 : -9) : 0),
            y: 10,
            duration: 0.64,
            delay: index % 2 ? 0.05 : 0,
            ease: "power2.out",
            immediateRender: false,
            clearProps: "transform,opacity,clipPath",
            scrollTrigger: { trigger: photo, start: "top 91%", once: true },
          })
        }

        const final = root.querySelector('[data-final="true"] .lolo-checkpoint')
        if (final) {
          gsap.fromTo(
            final,
            { boxShadow: "0 0 0 6px rgb(255 106 31 / 24%)" },
            {
              boxShadow: "0 0 0 0px rgb(255 106 31 / 0%)",
              duration: 0.6,
              immediateRender: false,
              clearProps: "boxShadow",
              scrollTrigger: { trigger: final, start: "top 84%", once: true },
            },
          )
        }

        const rail = root.querySelector<HTMLElement>(".lolo-timeline-rail")
        const signal = rail?.querySelector<HTMLElement>(".lolo-timeline-signal")
        if (rail && signal) {
          const trace = rail.querySelector(".lolo-timeline-trace")
          const progress = gsap.timeline({
            scrollTrigger: {
              trigger: rail,
              start: "top 55%",
              end: "bottom 55%",
              scrub: true,
              invalidateOnRefresh: true,
            },
          })
          progress.to(
            signal,
            {
              y: () => Math.max(0, rail.clientHeight - signal.offsetHeight),
              ease: "none",
            },
            0,
          )
          if (trace)
            progress.fromTo(
              trace,
              { scaleY: 0 },
              { scaleY: 1, ease: "none" },
              0,
            )
        }
      })
      return () => media.revert()
    },
    { scope },
  )

  return (
    <div ref={scope} className="lolo-timeline">
      <div aria-hidden="true" className="lolo-timeline-rail">
        <span className="lolo-timeline-trace" />
        <span className="lolo-timeline-signal" />
      </div>
      {children}
    </div>
  )
}
