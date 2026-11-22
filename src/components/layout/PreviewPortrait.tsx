"use client"

import Image, { type ImageLoaderProps, type ImageProps } from "next/image"

function portraitLoader({ src, width }: ImageLoaderProps) {
  if (width <= 480) return `${src}?w=480`
  if (width <= 720) return `${src}?w=720`
  return `${src}?w=960`
}

export function PreviewPortrait({
  className,
  alt,
  ...image
}: Pick<
  ImageProps,
  "src" | "alt" | "width" | "height" | "sizes" | "className"
>) {
  return (
    <figure className={className}>
      <Image {...image} alt={alt} loader={portraitLoader} />
    </figure>
  )
}
