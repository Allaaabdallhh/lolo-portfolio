"use client"

import Image from "next/image"
import { Pause, Play } from "lucide-react"
import { useState } from "react"

const stack = [
  { name: "Next.js", icon: "nextdotjs.svg" },
  { name: "React", icon: "react.svg" },
  { name: "TypeScript", icon: "typescript.svg" },
  { name: "Tailwind CSS", icon: "tailwindcss.svg" },
  { name: "GSAP", icon: "gsap.svg" },
  { name: "Motion", icon: "motion.png" },
]

function StackItems() {
  return stack.map(({ name, icon }) => (
    <li key={icon}>
      <Image
        src={`/logos/stack/${icon}`}
        width={24}
        height={24}
        alt=""
        unoptimized
      />
      <span>{name}</span>
    </li>
  ))
}

export function BuildStack({
  label,
  pause,
  resume,
}: {
  label: string
  pause: string
  resume: string
}) {
  const [paused, setPaused] = useState(false)
  return (
    <div className="lolo-built-stack" data-paused={paused}>
      <div className="lolo-stack-heading">
        <h3>{label}</h3>
        <button
          type="button"
          className="lolo-stack-pause"
          onClick={() => setPaused(!paused)}
          aria-label={paused ? resume : pause}
        >
          {paused ? (
            <Play size={15} aria-hidden="true" />
          ) : (
            <Pause size={15} aria-hidden="true" />
          )}
        </button>
      </div>
      <div className="lolo-stack-window">
        <div className="lolo-stack-track">
          <ul aria-label={label}>
            <StackItems />
          </ul>
          <ul aria-hidden="true" className="lolo-stack-repeat">
            <StackItems />
          </ul>
        </div>
      </div>
    </div>
  )
}
