import Image from "next/image"
import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import type { PortfolioImage } from "@/types/portfolio"

export function CardShell({ className, ...props }: ComponentProps<"article">) {
  return (
    <article
      className={cn(
        "flex h-full flex-col gap-3 rounded-lg border border-card-border bg-card p-(--card-padding) text-card-foreground",
        className,
      )}
      {...props}
    />
  )
}

export function GlassSurface({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-surface/85 p-(--card-padding) backdrop-blur-sm",
        className,
      )}
      {...props}
    />
  )
}

export function CircuitFrame({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "circuit-frame relative rounded-lg border border-card-border",
        className,
      )}
      {...props}
    />
  )
}

export function GlowBorder({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "glow-border rounded-lg border border-card-border",
        className,
      )}
      {...props}
    />
  )
}

type ImageFrameProps = {
  image: PortfolioImage
  sizes: string
  loading?: "eager" | "lazy"
  caption?: string
  className?: string
  imageClassName?: string
}

export function ImageFrame({
  image,
  sizes,
  loading,
  caption,
  className,
  imageClassName,
}: ImageFrameProps) {
  return (
    <figure className={cn("min-w-0", className)}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        loading={loading}
        className={cn(
          "h-auto w-full rounded-md bg-muted object-cover",
          imageClassName,
        )}
      />
      {caption && (
        <figcaption className="type-caption mt-2 text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
