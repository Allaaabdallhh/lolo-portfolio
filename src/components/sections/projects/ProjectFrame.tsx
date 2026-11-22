"use client"

import type { PointerEvent, ReactNode } from "react"

function setPerspective(event: PointerEvent<HTMLElement>) {
  if (
    event.pointerType !== "mouse" ||
    !window.matchMedia(
      "(min-width: 64rem) and (hover: hover) and (prefers-reduced-motion: no-preference)",
    ).matches
  )
    return

  const target = event.currentTarget
  const rect = target.getBoundingClientRect()
  const clamp = (value: number) => Math.max(-1, Math.min(1, value))
  const x = clamp((2 * (event.clientX - rect.left)) / rect.width - 1)
  const y = clamp((2 * (event.clientY - rect.top)) / rect.height - 1)
  target.style.setProperty("--project-tilt-x", `${y * -0.75}deg`)
  target.style.setProperty("--project-tilt-y", `${x * 0.9}deg`)
}

function resetPerspective(event: PointerEvent<HTMLElement>) {
  event.currentTarget.style.removeProperty("--project-tilt-x")
  event.currentTarget.style.removeProperty("--project-tilt-y")
}

export function ProjectFrame({ children }: { children: ReactNode }) {
  return (
    <article
      className="lolo-project-feature"
      onPointerMove={setPerspective}
      onPointerLeave={resetPerspective}
    >
      {children}
    </article>
  )
}
