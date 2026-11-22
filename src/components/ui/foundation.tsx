import type { ComponentProps } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type IconButtonProps = Omit<
  ComponentProps<typeof Button>,
  "size" | "aria-label"
> & { label: string }

export function IconButton({ label, className, ...props }: IconButtonProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      className={cn("size-11", className)}
      {...props}
      aria-label={label}
    />
  )
}

const statusStyles = {
  ready: "bg-secondary text-secondary-foreground",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  error: "bg-destructive/10 text-destructive",
} as const

export function StatusBadge({
  tone = "ready",
  className,
  ...props
}: ComponentProps<typeof Badge> & { tone?: keyof typeof statusStyles }) {
  return (
    <Badge
      variant="secondary"
      className={cn(statusStyles[tone], className)}
      {...props}
    />
  )
}

export function Chip({ className, ...props }: ComponentProps<typeof Badge>) {
  return (
    <Badge
      variant="outline"
      className={cn("rounded-full bg-surface text-muted-foreground", className)}
      {...props}
    />
  )
}
