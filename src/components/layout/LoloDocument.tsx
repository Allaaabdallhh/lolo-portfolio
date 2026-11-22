import type { ReactNode } from "react"
import localFont from "next/font/local"
import type { LoloLocale } from "@/i18n/lolo"
import "@/app/globals.css"
import "@/styles/lolo.css"
import "@/styles/lolo-enhancements.css"
import "@/styles/lolo-story.css"
import "@/styles/lolo-cinematic.css"
import "@/styles/lolo-work.css"
import "@/styles/lolo-signature.css"
import "@/styles/lolo-finish.css"

const anton = localFont({
  src: "../../app/fonts/anton.woff2",
  weight: "400",
  display: "swap",
  variable: "--lolo-anton",
})
const onest = localFont({
  src: "../../app/fonts/onest.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--lolo-onest",
})

export default function LoloDocument({
  children,
  locale,
}: {
  children: ReactNode
  locale: LoloLocale
}) {
  return (
    <html lang={locale} className={`${anton.variable} ${onest.variable}`}>
      <body className="lolo-body">{children}</body>
    </html>
  )
}
