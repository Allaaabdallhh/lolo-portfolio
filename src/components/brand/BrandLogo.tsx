import Image from "next/image"

type BrandLogoProps = {
  variant?: "dark" | "light" | "accent"
  size?: "navigation" | "intro"
  label?: string
}

export function BrandLogo({
  variant = "dark",
  size = "navigation",
  label = "LOLO",
}: BrandLogoProps) {
  return (
    <Image
      unoptimized
      className={`lolo-logo lolo-logo--${size}`}
      src={`/brand/lolo-${variant}.svg`}
      width={193}
      height={80}
      alt={label}
    />
  )
}
