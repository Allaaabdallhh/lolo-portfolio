"use client"

import { useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import {
  ArrowLeft,
  ArrowRight,
  Box,
  Keyboard,
  MousePointer2,
} from "lucide-react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CardShell, GlowBorder } from "@/components/cards/primitives"
import {
  EditorialHeading,
  VisuallyHidden,
} from "@/components/layout/primitives"
import { HoverLift } from "@/components/motion/interaction"
import { SlideReveal } from "@/components/motion/reveal"
import { AccessibleModal } from "@/components/ui/accessible-modal"
import { Button } from "@/components/ui/button"
import { IconButton } from "@/components/ui/foundation"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion"

export function ControlSamples() {
  return (
    <TooltipProvider>
      <div className="flex flex-wrap items-center gap-3">
        <AccessibleModal
          trigger={
            <Button className="min-h-11">
              <Box aria-hidden="true" /> Open dialog
            </Button>
          }
          title="Dialog specimen"
          description="This dialog demonstrates keyboard focus, Escape to close, and focus return."
        >
          <p className="type-body-sm text-muted-foreground">
            Tab cycles through the available dialog controls.
          </p>
        </AccessibleModal>
        <Button variant="outline" asChild className="min-h-11">
          <a href="#cards">View card families</a>
        </Button>
        <Button variant="ghost" disabled className="min-h-11">
          Disabled
        </Button>
        <Tooltip>
          <TooltipTrigger asChild>
            <IconButton label="Jump to motion samples" asChild>
              <a href="#motion">
                <Keyboard aria-hidden="true" />
              </a>
            </IconButton>
          </TooltipTrigger>
          <TooltipContent>Jump to motion samples</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}

const carouselLabels = ["First frame", "Second frame", "Third frame"]

export function CarouselSample() {
  const reduced = usePrefersReducedMotion()
  const [emblaRef, embla] = useEmblaCarousel({ loop: true })
  const [selected, setSelected] = useState(0)

  const move = (direction: "prev" | "next") => {
    if (!embla) return
    if (direction === "next") embla.scrollNext(reduced)
    else embla.scrollPrev(reduced)
  }

  return (
    <CardShell aria-label="Carousel specimen" aria-roledescription="carousel">
      <div className="flex items-center justify-between gap-2">
        <EditorialHeading as="h3" size="h3">
          Carousel
        </EditorialHeading>
        <div className="flex gap-2">
          <IconButton
            label="Previous frame"
            disabled={!embla}
            onClick={() => move("prev")}
          >
            <ArrowLeft aria-hidden="true" />
          </IconButton>
          <IconButton
            label="Next frame"
            disabled={!embla}
            onClick={() => move("next")}
          >
            <ArrowRight aria-hidden="true" />
          </IconButton>
        </div>
      </div>
      <div ref={emblaRef} className="overflow-hidden rounded-md">
        <div className="flex touch-pan-y touch-pinch-zoom">
          {carouselLabels.map((label, index) => (
            <div
              key={label}
              className="min-w-0 flex-[0_0_100%] bg-secondary px-4 py-7 text-center font-semibold text-secondary-foreground"
              aria-hidden={selected !== index}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
      <VisuallyHidden aria-live="polite">
        {carouselLabels[selected]}
      </VisuallyHidden>
      {embla && <TrackCarouselSelection embla={embla} onSelect={setSelected} />}
    </CardShell>
  )
}

type EmblaCarouselType = NonNullable<ReturnType<typeof useEmblaCarousel>[1]>

function TrackCarouselSelection({
  embla,
  onSelect,
}: {
  embla: EmblaCarouselType
  onSelect: (index: number) => void
}) {
  useEffect(() => {
    const sync = () => onSelect(embla.selectedScrollSnap())
    embla.on("select", sync).on("reInit", sync)
    sync()
    return () => {
      embla.off("select", sync).off("reInit", sync)
    }
  }, [embla, onSelect])
  return null
}

export function MotionSample() {
  const reduced = usePrefersReducedMotion()
  const [mounted, setMounted] = useState(true)
  const [active, setActive] = useState<number>()

  return (
    <CardShell>
      <EditorialHeading as="h3" size="h3">
        Motion checks
      </EditorialHeading>
      <p className="type-body-sm text-muted-foreground">
        System preference{" "}
        <strong>{reduced ? "reduced motion" : "standard motion"}</strong>
      </p>
      <HoverLift className="w-fit">
        <Button variant="outline" className="min-h-11">
          <MousePointer2 aria-hidden="true" /> Hover to lift
        </Button>
      </HoverLift>
      <div id="scroll-fixture" className="flex min-h-17 items-center">
        {mounted && (
          <SlideReveal>
            <GlowBorder className="px-3 py-2 text-sm text-primary">
              Scroll reveal specimen
            </GlowBorder>
          </SlideReveal>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          aria-controls="scroll-fixture"
          className="min-h-11"
          onClick={() => {
            setMounted(!mounted)
            setActive(undefined)
          }}
        >
          {mounted ? "Unmount reveal" : "Mount reveal"}
        </Button>
        <Button
          variant="ghost"
          className="min-h-11"
          onClick={() => {
            setActive(ScrollTrigger.getAll().length)
          }}
        >
          Check triggers
        </Button>
      </div>
      {active !== undefined && (
        <p role="status" className="type-caption text-muted-foreground">
          Active reveal triggers: {active}
        </p>
      )}
    </CardShell>
  )
}
