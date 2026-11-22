"use client"

import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRef, type ReactNode } from "react"
import { motionTokens } from "@/config/motion"
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion"

gsap.registerPlugin(useGSAP, ScrollTrigger)

type RevealProps = { children: ReactNode; className?: string }

export function MotionReveal({
  children,
  className,
  kind = "slide",
}: RevealProps & { kind?: "fade" | "slide" | "stagger" }) {
  const scope = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  useGSAP(
    () => {
      const element = scope.current
      if (reduced || !element) return
      const targets =
        kind === "stagger" ? Array.from(element.children) : element
      gsap.from(targets, {
        y: kind === "fade" ? 0 : motionTokens.distance,
        opacity: motionTokens.enteringOpacity,
        duration: motionTokens.reveal,
        ease: "power3.out",
        stagger: kind === "stagger" ? motionTokens.stagger : 0,
        immediateRender: false,
        scrollTrigger: { trigger: element, start: "top 92%", once: true },
        clearProps: "transform,opacity",
      })
    },
    { scope, dependencies: [kind, reduced], revertOnUpdate: true },
  )

  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  )
}

export function FadeReveal(props: RevealProps) {
  return <MotionReveal {...props} kind="fade" />
}

export function SlideReveal(props: RevealProps) {
  return <MotionReveal {...props} kind="slide" />
}

export function StaggerContainer(props: RevealProps) {
  return <MotionReveal {...props} kind="stagger" />
}
