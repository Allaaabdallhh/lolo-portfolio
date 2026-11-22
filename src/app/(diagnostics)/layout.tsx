import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"
import type { ReactNode } from "react"

import { site } from "@/config/site"
import "../globals.css"

const display = localFont({
  src: "../fonts/cormorant-garamond.woff2",
  variable: "--font-cormorant",
  weight: "300 700",
  preload: false,
  display: "swap",
})

const body = localFont({
  src: "../fonts/manrope.woff2",
  variable: "--font-manrope",
  weight: "200 800",
  preload: false,
  display: "swap",
})

const arabic = localFont({
  src: [
    { path: "../fonts/ibm-plex-sans-arabic.woff2", weight: "400" },
    { path: "../fonts/ibm-plex-sans-arabic-semibold.woff2", weight: "600" },
  ],
  variable: "--font-plex-arabic",
  preload: false,
  display: "swap",
})

export const metadata: Metadata = {
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  icons: { icon: "/icons/rose-circuit.ico" },
}

export const viewport: Viewport = { themeColor: site.themeColor }

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang={site.locale}
      dir="ltr"
      className={`${display.variable} ${body.variable} ${arabic.variable}`}
    >
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  )
}
