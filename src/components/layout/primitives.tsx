import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/utils"

export function Container({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[calc(var(--content-max)+var(--page-gutter)*2)] px-(--page-gutter)",
        className,
      )}
      {...props}
    />
  )
}

export function SectionShell({
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section className={cn("py-(--section-space)", className)} {...props} />
  )
}

const headingSizes = {
  display: "type-display-xl",
  large: "type-display-lg",
  h1: "type-h1",
  h2: "type-h2",
  h3: "type-h3",
} as const

type EditorialHeadingProps = ComponentProps<"h1"> & {
  as?: "h1" | "h2" | "h3" | "h4"
  size?: keyof typeof headingSizes
}

export function EditorialHeading({
  as: Tag = "h2",
  size = "h2",
  className,
  ...props
}: EditorialHeadingProps) {
  return (
    <Tag
      className={cn(
        "font-display font-semibold tracking-[-0.035em] text-balance",
        headingSizes[size],
        className,
      )}
      {...props}
    />
  )
}

export function SectionHeading({
  id,
  title,
  description,
}: {
  id: string
  title: string
  description?: ReactNode
}) {
  return (
    <div className="mb-(--grid-gap) max-w-(--reading-max) space-y-2">
      <EditorialHeading id={id}>{title}</EditorialHeading>
      {description && <p className="text-muted-foreground">{description}</p>}
    </div>
  )
}

export function ResponsiveGrid({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-(--grid-gap) sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
      {...props}
    />
  )
}

export function SectionDivider({ className, ...props }: ComponentProps<"hr">) {
  return <hr className={cn("border-border", className)} {...props} />
}

export function VisuallyHidden({
  className,
  ...props
}: ComponentProps<"span">) {
  return <span className={cn("sr-only", className)} {...props} />
}
