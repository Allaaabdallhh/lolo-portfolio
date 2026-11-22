"use client"

import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { CustomEase } from "gsap/CustomEase"
import { useRef, useState, type ReactNode } from "react"
import { BrandLogo } from "@/components/brand/BrandLogo"

gsap.registerPlugin(useGSAP, CustomEase)

const visitedKey = "lolo:phase-03-intro"
const introEase = CustomEase.create("loloWipe", "0.22,1,0.36,1")
const revealEase = CustomEase.create("loloReveal", "0.16,1,0.3,1")

export function CinematicLoader({
  children,
  skipLabel,
}: {
  children: ReactNode
  skipLabel: string
}) {
  const scope = useRef<HTMLDivElement>(null)
  const content = useRef<HTMLDivElement>(null)
  const overlay = useRef<HTMLDivElement>(null)
  const wordmark = useRef<HTMLDivElement>(null)
  const counter = useRef<HTMLSpanElement>(null)
  const skip = useRef<() => void>(null)
  const [dismissed, setDismissed] = useState(false)

  useGSAP(
    (_, contextSafe) => {
      const page = content.current
      const screen = overlay.current
      const brand = wordmark.current
      const digits = counter.current
      if (!page || !screen || !brand || !digits || !contextSafe) return

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      if (reduced.matches || document.hidden || Boolean(location.hash)) return
      try {
        if (sessionStorage.getItem(visitedKey)) return
      } catch {
        // The intro remains usable when storage is unavailable.
      }

      const originalOverflow = document.body.style.overflow
      const originalInert = page.inert
      let complete = false
      let timeout = 0
      let timeline: gsap.core.Timeline | undefined

      const restoreAccess = () => {
        screen.hidden = true
        page.inert = originalInert
        document.body.style.overflow = originalOverflow
        window.clearTimeout(timeout)
      }

      const finish = contextSafe((animate: boolean) => {
        if (complete) return
        complete = true
        const focusWasInIntro = screen.contains(document.activeElement)
        restoreAccess()
        detachListeners()
        try {
          sessionStorage.setItem(visitedKey, "1")
        } catch {
          /* Storage is optional. */
        }
        setDismissed(true)
        if (focusWasInIntro)
          page
            .querySelector<HTMLElement>("main")
            ?.focus({ preventScroll: true })
        if (!animate) {
          timeline?.kill()
          return
        }

        const reveal = gsap.timeline({
          defaults: { clearProps: "transform,opacity", ease: revealEase },
        })
        for (const [index, line] of Array.from(
          page.querySelectorAll("[data-lolo-line]"),
        ).entries()) {
          reveal.from(
            line.querySelectorAll("[data-lolo-letter]"),
            { yPercent: 104, opacity: 0, duration: 0.79, stagger: 0.05 },
            index * 0.19,
          )
        }
        reveal.from(
          page.querySelectorAll(
            ".lolo-brand-link, .lolo-nav-links a, .lolo-nav-actions",
          ),
          { y: -7, opacity: 0, duration: 0.36, stagger: 0.045 },
          0.2,
        )
        reveal.call(
          () => {
            page.querySelector(".lolo-title")?.classList.add("lolo-title-lit")
          },
          [],
          0.98,
        )
        const portrait = page.querySelector("[data-lolo-portrait]")
        if (portrait)
          reveal.from(
            portrait,
            { y: 28, scale: 1.065, opacity: 0, duration: 1.05 },
            0.2,
          )
        reveal.from(
          page.querySelectorAll("[data-lolo-meta]"),
          { y: 12, opacity: 0, duration: 0.5, stagger: 0.2 },
          0.46,
        )
      })

      const skipIntro = () => finish(false)
      const onVisibility = () => {
        if (document.hidden) skipIntro()
      }
      const onMotion = () => {
        if (reduced.matches) skipIntro()
      }
      const onKey = (event: KeyboardEvent) => {
        if (event.key === "Escape") skipIntro()
      }
      const detachListeners = () => {
        window.removeEventListener("keydown", onKey)
        document.removeEventListener("visibilitychange", onVisibility)
        reduced.removeEventListener("change", onMotion)
      }

      try {
        const value = { percent: 0 }
        timeline = gsap.timeline({
          paused: true,
          onComplete: () => finish(true),
        })
        timeline.from(brand, {
          yPercent: 102,
          duration: 0.35,
          ease: revealEase,
        })
        timeline.to(
          value,
          {
            percent: 100,
            duration: 1.85,
            ease: "none",
            onUpdate: () => {
              digits.textContent = String(Math.round(value.percent))
            },
          },
          0.25,
        )
        timeline.to(screen.querySelector("[data-lolo-intro-center]"), {
          opacity: 0,
          duration: 0.3,
          ease: "power1.out",
        })
        timeline.to(screen, { yPercent: -100, duration: 0.58, ease: introEase })
        skip.current = skipIntro
        window.addEventListener("keydown", onKey)
        document.addEventListener("visibilitychange", onVisibility)
        reduced.addEventListener("change", onMotion)
        screen.hidden = false
        page.inert = true
        document.body.style.overflow = "hidden"
        timeout = window.setTimeout(skipIntro, 4500)
        timeline.play()
      } catch {
        skipIntro()
      }

      return () => {
        restoreAccess()
        skip.current = null
        timeline?.kill()
        detachListeners()
      }
    },
    { scope },
  )

  useGSAP(
    () => {
      const stage = scope.current?.querySelector<HTMLElement>(".lolo-stage")
      const portrait = stage?.querySelector<HTMLElement>("[data-lolo-parallax]")
      if (!stage || !portrait) return
      const media = gsap.matchMedia()
      media.add(
        "(min-width: 64rem) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.set(portrait, { transformPerspective: 900 })
          const options = { duration: 0.58, ease: "power3.out" }
          const x = gsap.quickTo(portrait, "x", options)
          const y = gsap.quickTo(portrait, "y", options)
          const rotateX = gsap.quickTo(portrait, "rotationX", options)
          const rotateY = gsap.quickTo(portrait, "rotationY", options)
          const halo = stage.querySelector("[data-lolo-halo]")
          const haloX = halo ? gsap.quickTo(halo, "x", options) : undefined
          const haloY = halo ? gsap.quickTo(halo, "y", options) : undefined
          const title = stage.querySelector(".lolo-title")
          const titleX = title ? gsap.quickTo(title, "x", options) : undefined
          let visible = false
          const reset = () => {
            x(0)
            y(0)
            rotateX(0)
            rotateY(0)
            titleX?.(0)
            haloX?.(0)
            haloY?.(0)
          }
          const observer = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting
            if (!visible) reset()
          })
          observer.observe(stage)
          const move = (event: PointerEvent) => {
            if (!visible || document.hidden || event.pointerType !== "mouse")
              return
            const bounds = stage.getBoundingClientRect()
            const horizontal = gsap.utils.clamp(
              -1,
              1,
              ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
            )
            const vertical = gsap.utils.clamp(
              -1,
              1,
              ((event.clientY - bounds.top) / bounds.height) * 2 - 1,
            )
            x(horizontal * 6)
            y(vertical * 6)
            rotateX(vertical * -3.4)
            rotateY(horizontal * 3.4)
            titleX?.(-horizontal * 3)
            haloX?.(-horizontal * 12)
            haloY?.(-vertical * 8)
          }
          stage.addEventListener("pointermove", move, { passive: true })
          stage.addEventListener("pointerleave", reset)
          document.addEventListener("visibilitychange", reset)
          return () => {
            observer.disconnect()
            stage.removeEventListener("pointermove", move)
            stage.removeEventListener("pointerleave", reset)
            document.removeEventListener("visibilitychange", reset)
          }
        },
      )
      return () => media.revert()
    },
    { scope },
  )

  return (
    <div ref={scope}>
      <div ref={content}>{children}</div>
      {!dismissed && (
        <div className="lolo-loader" data-lolo-loader ref={overlay} hidden>
          <div
            className="lolo-loader-content"
            data-lolo-intro-center
            aria-hidden="true"
          >
            <div className="lolo-loader-mask">
              <div ref={wordmark}>
                <BrandLogo size="intro" label="" />
              </div>
            </div>
            <p className="lolo-loader-percent">
              <span ref={counter} data-lolo-percent>
                0
              </span>
              <i>%</i>
            </p>
          </div>
          <button
            className="lolo-intro-skip"
            type="button"
            onClick={() => skip.current?.()}
          >
            {skipLabel}
          </button>
        </div>
      )}
    </div>
  )
}
