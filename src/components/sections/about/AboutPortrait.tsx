import { PreviewPortrait } from "@/components/layout/PreviewPortrait"

export function AboutPortrait({ alt }: { alt: string }) {
  return (
    <PreviewPortrait
      className="lolo-editorial-portrait"
      src="/images/about/alaa-editorial-portrait.webp"
      width={793}
      height={1043}
      sizes="(max-width: 767px) calc(100vw - 38px), (max-width: 1280px) 42vw, 520px"
      alt={alt}
    />
  )
}
