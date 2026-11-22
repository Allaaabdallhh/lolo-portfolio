"use client"

import { motion } from "motion/react"
import type { ReactNode } from "react"
import { motionTokens } from "@/config/motion"
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion"

export function ReducedMotion({
  children,
}: {
  children: (reduced: boolean) => ReactNode
}) {
  return children(usePrefersReducedMotion())
}

export function HoverLift({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <ReducedMotion>
      {(reduced) => (
        <motion.div
          className={className}
          whileHover={
            reduced
              ? undefined
              : { y: -motionTokens.lift, scale: motionTokens.hoverScale }
          }
          transition={{
            duration: motionTokens.fast,
            ease: [...motionTokens.ease],
          }}
        >
          {children}
        </motion.div>
      )}
    </ReducedMotion>
  )
}
