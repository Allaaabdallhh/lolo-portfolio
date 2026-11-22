import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { ReactNode } from "react"
import { EditorialHeading } from "@/components/layout/primitives"
import { buttonVariants } from "@/components/ui/button"
import { httpsUrl } from "@/lib/safe-url"
import type { PortfolioImage } from "@/types/portfolio"
import { CardShell, CircuitFrame, ImageFrame } from "./primitives"

const gallerySizes = "(max-width: 639px) 90vw, (max-width: 1023px) 45vw, 380px"

export function CircuitTrace() {
  return (
    <span
      aria-hidden="true"
      className="circuit-trace absolute inset-x-6 top-0 h-px bg-rose-circuit"
    />
  )
}

export function CircuitFrameCard({
  title,
  icon,
  children,
}: {
  title: string
  icon: ReactNode
  children: ReactNode
}) {
  return (
    <CircuitFrame className="glow-border h-full">
      <CircuitTrace />
      <CardShell className="border-0">
        <span
          aria-hidden="true"
          className="grid size-10 place-items-center rounded-md bg-secondary text-primary"
        >
          {icon}
        </span>
        <EditorialHeading as="h3" size="h3">
          {title}
        </EditorialHeading>
        <div className="type-body-sm text-muted-foreground">{children}</div>
      </CardShell>
    </CircuitFrame>
  )
}

export function EditorialPortraitCard({
  image,
  caption,
}: {
  image: PortfolioImage
  caption: string
}) {
  return (
    <CardShell className="border-s-4 border-s-rose-circuit">
      <ImageFrame
        image={image}
        caption={caption}
        sizes={gallerySizes}
        imageClassName="aspect-[4/3]"
      />
    </CardShell>
  )
}

export function GalleryPlaqueCard({
  image,
  title,
  issuer,
  verificationUrl,
}: {
  image: PortfolioImage
  title: string
  issuer: string
  verificationUrl?: string
}) {
  const verification = httpsUrl.safeParse(verificationUrl)
  return (
    <CardShell className="border-t-2 border-t-champagne">
      <ImageFrame
        image={image}
        sizes={gallerySizes}
        imageClassName="aspect-video"
      />
      <EditorialHeading as="h3" size="h3">
        {title}
      </EditorialHeading>
      <p className="type-body-sm text-muted-foreground">{issuer}</p>
      {verification.success && (
        <a
          className={buttonVariants({
            variant: "outline",
            className: "mt-auto self-start",
          })}
          href={verification.data}
        >
          Verify certificate <ArrowUpRight aria-hidden="true" />
        </a>
      )}
    </CardShell>
  )
}

export function FeatureCaseStudyCard({
  image,
  title,
  summary,
  metadata,
  action,
}: {
  image: PortfolioImage
  title: string
  summary: string
  metadata?: ReactNode
  action?: { href: `/${string}`; label: string }
}) {
  return (
    <CardShell>
      <ImageFrame
        image={image}
        sizes={gallerySizes}
        imageClassName="aspect-video"
      />
      {metadata && (
        <div className="type-caption text-muted-foreground">{metadata}</div>
      )}
      <EditorialHeading as="h3" size="h3">
        {title}
      </EditorialHeading>
      <p className="type-body-sm text-muted-foreground">{summary}</p>
      {action && (
        <Link
          href={action.href}
          className={buttonVariants({ className: "mt-auto self-start" })}
        >
          {action.label}
        </Link>
      )}
    </CardShell>
  )
}

export type TimelineMilestone = {
  id: string
  title: string
  dateLabel: string
  dateTime?: string
  description?: string
}

export function TimelineRailCard({
  milestones,
  horizontal = false,
}: {
  milestones: readonly TimelineMilestone[]
  horizontal?: boolean
}) {
  return (
    <CardShell>
      <ol
        className={
          horizontal
            ? "grid grid-cols-1 sm:auto-cols-fr sm:grid-flow-col sm:grid-cols-none"
            : "grid"
        }
      >
        {milestones.map(
          ({ id, title, dateLabel, dateTime, description }, index) => (
            <li
              key={id}
              className={
                horizontal
                  ? "relative border-s border-border ps-6 pb-5 last:pb-0 sm:border-s-0 sm:border-t sm:ps-0 sm:pe-4 sm:pt-6"
                  : "relative border-s border-border ps-6 pb-5 last:pb-0"
              }
            >
              <span
                className="absolute start-0 top-0 grid size-5 -translate-x-1/2 place-items-center rounded-full bg-secondary text-xs font-bold text-primary rtl:translate-x-1/2"
                aria-hidden="true"
              >
                {index + 1}
              </span>
              {dateTime ? (
                <time
                  dateTime={dateTime}
                  className="type-caption text-muted-foreground"
                >
                  {dateLabel}
                </time>
              ) : (
                <span className="type-caption text-muted-foreground">
                  {dateLabel}
                </span>
              )}
              <EditorialHeading as="h3" size="h3">
                {title}
              </EditorialHeading>
              {description && (
                <p className="type-body-sm text-muted-foreground">
                  {description}
                </p>
              )}
            </li>
          ),
        )}
      </ol>
    </CardShell>
  )
}
