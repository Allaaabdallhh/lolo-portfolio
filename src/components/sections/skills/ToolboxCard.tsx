"use client"

import type { PointerEvent, ReactNode } from "react"

function moveSpotlight(event: PointerEvent<HTMLElement>) {
  if (
    event.pointerType !== "mouse" ||
    !window.matchMedia(
      "(hover: hover) and (prefers-reduced-motion: no-preference)",
    ).matches
  )
    return
  const card = event.currentTarget
  const bounds = card.getBoundingClientRect()
  card.style.setProperty("--spot-x", `${event.clientX - bounds.left}px`)
  card.style.setProperty("--spot-y", `${event.clientY - bounds.top}px`)
}

export function ToolboxCard({
  id,
  children,
}: {
  id: string
  children: ReactNode
}) {
  return (
    <details
      className="lolo-skill-card"
      data-skill={id}
      onPointerMove={moveSpotlight}
    >
      {children}
    </details>
  )
}
